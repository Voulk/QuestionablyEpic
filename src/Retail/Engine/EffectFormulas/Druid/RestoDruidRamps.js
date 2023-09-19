// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { DRUIDSPELLDB } from "./RestoDruidSpellDB";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { getSqrt, addReport, checkBuffActive, removeBuffStack, getCurrentStats, getHaste, getSpellRaw, getStatMult, GLOBALCONST, 
            getBuffStacks, getHealth, getCrit, addBuff, applyTalents, runBuffs } from "../Generic/RampBase";


const DRUIDCONSTANTS = {
    
    masteryMod: 0.5, 
    masteryEfficiency: 0.80, 
    baseMana: 250000,

    auraHealingBuff: 0.98,
    auraDamageBuff: 1.71,
    enemyTargets: 1, 
    echoExceptionSpells: [], // These are spells that do not consume or otherwise interact with our Echo buff.
}


/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} druidSpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
 const applyLoadoutEffects = (druidSpells, settings, talents, state, stats) => {

    // ==== Default Loadout ====
    // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
    // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
    // we don't have full information about a character.
    // As always, Top Gear is able to provide a more complete picture. 
    settings['DefaultLoadout'] = true;
    if (settings['DefaultLoadout']) {
        settings.t31_2 = true;
        settings.t31_4 = true;
    }



    // ==== Talents ====
    // Not all talents just make base modifications to spells, but those that do can be handled here.


    // Setup mana costs & cooldowns.

    for (const [key, value] of Object.entries(druidSpells)) {
        const fullSpell = value;
        const spellInfo = fullSpell[0];


        if ('school' in spellInfo && spellInfo.school === "bronze" && talents.temporalCompression) {
            druidSpells[key].push({
                name: "Temporal Compression",
                type: "buff",
                canStack: true,
                stacks: 1,
                maxStacks: 4,
                value: 0.05 * talents.temporalCompression,
                buffDuration: 999,
                buffType: 'special',
            })
        }
        if ('school' in spellInfo && spellInfo.school === "green" && talents.lushGrowth) {
            value.forEach(spellSlice => {
                if ('name' in spellSlice && (spellSlice.name === "Panacea" || spellSlice.name === "Fluttering Seedlings")) return; // Exception case.
                spellSlice.coeff *= (1 + 0.05 * talents.lushGrowth);
            });
        }

        if (spellInfo.targets && 'maxAllyTargets' in settings) Math.max(spellInfo.targets, settings.maxAllyTargets);
        if (!spellInfo.targets) spellInfo.targets = 1;
        if (spellInfo.cooldown) spellInfo.activeCooldown = 0;
        if (spellInfo.cost) spellInfo.cost = spellInfo.cost * DRUIDCONSTANTS.baseMana / 100;
       
        if (settings.includeOverheal === "No") {
            value.forEach(spellSlice => {
                if ('expectedOverheal' in spellSlice) spellSlice.expectedOverheal = 0;

            })
 
        }
    }

    if (settings.t31_2) {}
    if (settings.t31_4) {}


    // ==== Tier Sets ====

    return druidSpells;
}


/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 3-12% damage buff depending on number of active atonements.
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getDamMult = (state, buffs, activeAtones, t, spellName, talents) => {
    let mult = DRUIDCONSTANTS.auraDamageBuff;

    mult *= (buffs.filter(function (buff) {return buff.name === "Energy Loop"}).length > 0 ? 1.2 : 1);

    return mult;
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
const getHealingMult = (state, t, spellName, talents) => {
    let mult = DRUIDCONSTANTS.auraHealingBuff;
    
    return mult;
}


export const runHeal = (state, spell, spellName, compile = true) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.t, spellName, state.talents); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.sqrtMin) : spell.targets) || 1;
    const healingVal = getSpellRaw(spell, currentStats, DRUIDCONSTANTS) * (1 - spell.expectedOverheal) * healingMult * targetMult;
    
    //if (cloudburstActive) cloudburstHealing = (healingVal / (1 - spell.expectedOverheal)) * DRUIDCONSTANTS.CBT.transferRate * (1 - DRUIDCONSTANTS.CBT.expectedOverhealing);
    //console.log(spellName + ": " + healingVal + ". t:" + targetMult + ". HealingM: " + healingMult);
    
    // Special cases
    if ('specialMult' in spell) healingVal *= spell.specialMult;


    // Compile healing and add report if necessary.
    if (compile) state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal;
    if (targetMult > 1) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.expectedOverheal * 100}%)`)
    else addReport(state, `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.expectedOverheal * 100}%)`)

    return healingVal;
}

export const runDamage = (state, spell, spellName, atonementApp, compile = true) => {

    //const activeAtonements = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
    const damMultiplier = getDamMult(state, state.activeBuffs, 0, state.t, spellName, state.talents); // Get our damage multiplier (Schism, Sins etc);
    const damageVal = getSpellRaw(spell, state.currentStats, DRUIDCONSTANTS) * damMultiplier;
    
    // This is stat tracking, the atonement healing will be returned as part of our result.
    if (compile) state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.
    addReport(state, `${spellName} dealt ${Math.round(damageVal)} damage`)
    return damageVal;
}

const canCastSpell = (state, spellDB, spellName) => {
    
    const spell = spellDB[spellName][0];
    let miscReq = true;
    const essenceReq = (state.essence >= spell.essence ) || !spell.essence;
    const cooldownReq = (state.t > spell.activeCooldown) || !spell.cooldown;
    
    if (spellName === "Hammer of Wrath") {
        if (!checkBuffActive(state.activeBuffs, "Avenging Wrath")) miscReq = false;
    } 

    return cooldownReq && essenceReq && miscReq;
}


// It's time for a buff to tick, and it should do so here.
// This will also be called if a buff ticks on cast.
// This is relatively generic and can be used across specs. It does hook into runHeal files though.
const tickBuff = (state, buff, spellDB) => {
    if (buff.buffType === "heal") {
        const spell = buff.attSpell;
        runHeal(state, spell, buff.name + " (HoT)")
    }
    else if (buff.buffType === "damage") {
        const spell = buff.attSpell;
        runDamage(state, spell, buff.name)
    }
    else if (buff.buffType === "function") {
        const func = buff.attFunction;
        const spell = buff.attSpell;
        func(state, spell, buff);
    }

    if (buff.onTick) buff.onTick(state, buff, runSpell, spellDB);
    
}



export const genSpell = (state, spells) => {
    let spellName = ""

    const usableSpells = [...apl].filter(spell => canCastSpell(state, spells, spell));

    /*
    if (state.holyPower >= 3) {
        spellName = "Light of Dawn";
    }
    else {
        let possibleCasts = [{name: "Holy Shock", score: 0}, {name: "Flash of Light", score: 0}]

        possibleCasts.forEach(spellData => {
            if (canCastSpell(state, spells, spellData['name'])) {
                spellData.score = getSpellHPM(state, spells, spellData['name'])
            }
            else {
                spellData.score = -1;
            }
        });
        possibleCasts.sort((a, b) => (a.score < b.score ? 1 : -1));
        console.log(possibleCasts);
        spellName = possibleCasts[0].name;
    }
    console.log("Gen: " + spellName + "|");
    */
    return usableSpells[0];

}


const apl = ["Reversion", "Emerald Blossom", "Verdant Embrace", "Living Flame D", "Rest"]

const runSpell = (fullSpell, state, spellName, druidSpells) => {

    fullSpell.forEach(spell => {

        let canProceed = false

        if (spell.chance) {
            const roll = Math.random();
            canProceed = roll <= spell.chance;
        }
        else canProceed = true;

        if (canProceed) {
            // The spell casts a different spell. 
            if (spell.type === 'castSpell') {
                addReport(state, `Spell Proc: ${spellName}`)
                const newSpell = deepCopyFunction(druidSpells[spell.storedSpell]); // This might fail on function-based spells.
                if (spell.powerMod) {
                    newSpell[0].coeff = newSpell[0].coeff * spell.powerMod; // Increases or reduces the power of the free spell.
                    newSpell[0].flatHeal = (newSpell[0].flatHeal * spell.powerMod) || 0;
                    newSpell[0].flatDamage = (newSpell[0].flatDamage * spell.powerMod) || 0;
                }
                if (spell.targetMod) {
                    for (let i = 0; i < spell.targetMod; i++) {
                        runSpell(newSpell, state, spell.storedSpell, druidSpells);
                    }
                }
                else {
                    runSpell(newSpell, state, spell.storedSpell, druidSpells);
                }

                
            }
            // The spell has a healing component. Add it's effective healing.
            // Power Word: Shield is included as a heal, since there is no functional difference for the purpose of this calculation.
            else if (spell.type === 'heal') {
                runHeal(state, spell, spellName)
            }
            
            
            // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
            else if (spell.type === 'damage') {
                runDamage(state, spell, spellName)
            }
            // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
            else if (spell.type === 'function') {
                spell.runFunc(state, spell);
            }

            // TODO: This needs to be converted to use the RampBase addBuff function. There are some unique ones here which could be converted to some kind of 
            // function run on buff gain.
            // The spell adds a buff to our player.
            // We'll track what kind of buff, and when it expires.
            else if (spell.type === "buff") {
                const newBuff = addBuff(state, spell, spellName);
                if ('tickData' in spell && spell.tickData.tickOnCast) {tickBuff(state, newBuff, druidSpells) };
            }
            else if (spell.type === "extension") {
                state.activeBuffs.filter(buff => spell.extensionList.includes(buff.name)).forEach(buff => {
                    buff.expiration += spell.extensionDuration;
                })
            }

            // These are special exceptions where we need to write something special that can't be as easily generalized.

            if (spell.holyPower) state.holyPower += spell.holyPower;
            if (spell.cooldown) spell.activeCooldown = state.t + (spell.cooldown / getHaste(state.currentStats));
        
            }


 
        // Grab the next timestamp we are able to cast our next spell. This is equal to whatever is higher of a spells cast time or the GCD.
    }); 

    // Any post-spell code.
    if (spellName === "Dream Breath") state.activeBuffs = removeBuffStack(state.activeBuffs, "Call of Ysera");
    //if (spellName === "Verdant Embrace" && state.talents.callofYsera) addBuff(state, DRUIDCONSTANTS.callOfYsera, "Call of Ysera");
}

const spendSpellCost = (spell, state) => {
    if ('essence' in spell[0]) {
        if (checkBuffActive(state.activeBuffs, "Essence Burst")) {
            removeBuffStack(state.activeBuffs, "Essence Burst");
            addReport(state, `Essence Burst consumed!`);
            state.manaSpent += 0;
        }
        else {
            // Essence buff is not active. Spend Essence and mana.
            state.manaSpent += spell[0].cost;
            state.essence -= spell[0].essence;

        }
    } 
        
    else if ('cost' in spell[0]) state.manaSpent += spell[0].cost;
    else {
        // No cost. Do nothing.
    };    
}

const getSpellCastTime = (spell, state, currentStats) => {
    if ('castTime' in spell) {
        let castTime = spell.castTime;

        if (spell.empowered) {
            // Empowered spells don't currently scale with haste.
            if (checkBuffActive(state.activeBuffs, "Temporal Compression")) {
                const buffStacks = getBuffStacks(state.activeBuffs, "Temporal Compression")
                castTime *= (1 - 0.05 * buffStacks)
                if (buffStacks === 4) triggerTemporal(state);
            }

            castTime = castTime / getHaste(currentStats); // Empowered spells do scale with haste.
        } 

        else if (castTime === 0 && spell.onGCD === true) castTime = 0; //return 1.5 / getHaste(currentStats);
        else castTime = castTime / getHaste(currentStats);

        return castTime;
    }
    else console.log("CAST TIME ERROR. Spell: " + spellName);
}

/**
 * Run a full cast sequence. This is where most of the work happens. It runs through a short ramp cycle in order to compare the impact of different trinkets, soulbinds, stat loadouts,
 * talent configurations and more. Any effects missing can be easily included where necessary or desired.
 * @param {} sequence A sequence of spells representing a ramp. Note that in two ramp cycles like alternating Fiend / Boon this function will cover one of the two (and can be run a second
 * time for the other).
 * @param {*} stats A players base stats that are found on their gear. This doesn't include any effects which we'll apply in this function.
 * @param {*} settings Any special settings. We can include soulbinds, legendaries and more here. Trinkets should be included in the cast sequence itself and conduits are handled below.
 * @param {object} conduits Any conduits we want to include. The conduits object is made up of {ConduitName: ConduitLevel} pairs where the conduit level is an item level rather than a rank.
 * @returns The expected healing of the full ramp.
 */
export const runCastSequence = (sequence, stats, settings = {}, talents = {}) => {
    //console.log("Running cast sequence");

    // Flatten talents
    // Talents come with a lot of extra data we don't need like icons, max points and such.
    // This quick bit of code flattens it out by creating key / value pairs for name: points.
    // Can be removed to RampGeneral.
    /*
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        talents[key] = value.points;
    } */

    // Add base Mastery bonus.
    // We'd like to convert this to a % buff at some point since it will be incorrectly reduced by DR as-is.
    stats.mastery += 180;

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, damageDone: {}, manaSpent: 0, settings: settings, talents: talents, reporting: true, essence: 5};

    let currentStats = {...stats};
    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)


    const sequenceLength = 45; // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    const seqType = "Manual" // Auto / Manual.

    let nextSpell = 0; // The time when the next spell cast can begin.
    let spellFinish = 0; // The time when the cast will finish. HoTs / DoTs can continue while this charges.
    let queuedSpell = "";
    const startTime = performance.now();
    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.

    const druidSpells = applyLoadoutEffects(deepCopyFunction(DRUIDSPELLDB), settings, talents, state, stats);
    applyTalents(state, druidSpells, stats)

    // Extra Settings
    if (settings.masteryEfficiency) DRUIDCONSTANTS.masteryEfficiency = settings.masteryEfficiency;

    const seq = [...sequence];

    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        runBuffs(state, tickBuff, currentStats, druidSpells);

        // Remove any buffs that have expired. Note that we call this after we handle partial ticks. 
        state.activeBuffs = state.activeBuffs.filter(function (buff) {return buff.expiration > state.t});

        // This is a check of the current time stamp against the tick our GCD ends and we can begin our queued spell.
        // It'll also auto-cast Ascended Eruption if Boon expired.


        // Check if there is an ongoing cast and if there is, check if it's ended.
        // Check if the next spell is able to be cast, and if so, queue it.

        // If instant and on GCD: spellFinish = state.t, nextSpell = gcd / haste
        // If instant and off GCD: spellFinish = state.t, nextSpell = state.t + 0.01
        // If casted: spellFinish = state.t + castTime, nextSpell = state.t + 0.01

        if (seq.length > 0 && (state.t > nextSpell)) {
            // We don't have a spell queued. Queue one.

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            // If the sequence type is not "Auto" it should
            // follow the given sequence list
            if (seqType === "Manual") queuedSpell = seq.shift();
            // if its is "Auto", use genSpell to auto generate a cast sequence
            else queuedSpell = genSpell(state, druidSpells);

            const fullSpell = druidSpells[queuedSpell];
            const castTime = getSpellCastTime(fullSpell[0], state, currentStats);
            spellFinish = state.t + castTime - 0.01;
            if (fullSpell[0].castTime === 0) nextSpell = state.t + 1.5 / getHaste(currentStats);
            else if (fullSpell[0].channel) { nextSpell = state.t + castTime; spellFinish = state.t }
            else nextSpell = state.t + castTime;


        }
        if (queuedSpell !== "" && state.t >= spellFinish) {
            // We have a queued spell, check if it's finished.
            // Instant spells should proc this immediately.


            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);

            const spellName = queuedSpell;
            const fullSpell = druidSpells[queuedSpell];

            spendSpellCost(fullSpell, state);

            runSpell(fullSpell, state, spellName, druidSpells);

            // Check if Echo
            // If we have the Echo buff active, and our current cast is Echo compatible (this will probably change through Alpha) then:
            // - Recast the echo version of the spell (created at the start of runtime).
            // - The echo versions of spells are a weird mix of exception cases.
            if (checkBuffActive(state.activeBuffs, "Echo") &&  !(DRUIDCONSTANTS.echoExceptionSpells.includes(spellName))) {
                // We have at least one Echo.

                // Check Echo number.
                const echoBuffs = state.activeBuffs.filter(function (buff) {return buff.name === "Echo"});

                // Our Echo buffs can be of different strengths (say, one comes from TA and one from a hard casted Echo).
                // Because of this we'll iterate through our buffs 1 by 1 so we can use the correct Echo value.
                for (let j = 0; j < echoBuffs.length; j++) {
                    
                    const echoBuff = echoBuffs[j];
                    
                    const echoSpell = JSON.parse(JSON.stringify(druidSpells[spellName + "(Echo)"]));

                    echoSpell.forEach(effect => {
                        if ('coeff' in effect) effect.coeff = effect.coeff * echoBuff.value;
                        if ('value' in effect) effect.value = effect.value * echoBuff.value;
                    })

                    // Unfortunately functions are not copied over when we do our deep clone, so we'll have to manually copy them over.
                    if (spellName === "Reversion") echoSpell[0].function = druidSpells["Reversion"][0].function;
                    runSpell(echoSpell, state, spellName + "(Echo)", druidSpells)

                }

                // Remove all of our Echo buffs.
                state.activeBuffs =  state.activeBuffs.filter(function (buff) {return buff.name !== "Echo"})

            }

            // Cleanup
            queuedSpell = "";
            spellFinish = 0;
        }

        if (seq.length === 0 && queuedSpell === ""/* && healBuffs.length === 0 */) {
            // We have no spells queued, no DoTs / HoTs and no spells to queue. We're done.
            //state.t = 999;
        }
    }


    // Add up our healing values (including atonement) and return it.
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
    //state.activeBuffs = [];
    state.totalDamage = Object.keys(state.damageDone).length > 0 ? Math.round(sumValues(state.damageDone)) : 0;
    state.totalHealing = Object.keys(state.healingDone).length > 0 ? Math.round(sumValues(state.healingDone)) : 0;
    state.talents = {};
    state.hps = (state.totalHealing / sequenceLength);
    state.dps = (state.totalDamage / sequenceLength);
    state.hpm = (state.totalHealing / state.manaSpent) || 0;

    const endTime = performance.now();
    //console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
    return state;

}

// This is a boilerplate function that'll let us clone our spell database to avoid making permanent changes.
// We need this to ensure we're always running a clean DB, free from any changes made on previous runs.
const deepCopyFunction = (inObject) => {
    let outObject, value, key;
  
    if (typeof inObject !== "object" || inObject === null) {
      return inObject; // Return the value if inObject is not an object
    }
  
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
  
    for (key in inObject) {
      value = inObject[key];
  
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopyFunction(value);
    }
  
    return outObject;
  };

