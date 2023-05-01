// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { PALADINSPELLDB } from "./HolyPaladinSpellDB";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { getSqrt, addReport, extendBuff, checkBuffActive, removeBuffStack, getCurrentStats, getHaste, getSpellRaw, 
            getStatMult, GLOBALCONST, getBuffStacks, getHealth, getCrit, addBuff } from "../Generic/RampBase";



// Any settings included in this object are immutable during any given runtime. Think of them as hard-locked settings.
const discSettings = {
    chaosBrand: true
}


const PALADINCONSTANTS = {
    
    masteryMod: 1.5, 
    masteryEfficiency: 0.80, 
    baseMana: 50000,
    beaconOverhealing: 0.4,

    auraHealingBuff: 1.06,
    auraDamageBuff: 0.92,
    goldenHourHealing: 18000,
    enemyTargets: 1, 
    echoExceptionSpells: ['Echo', 'Emerald Communion', 'Blessing of the Bronze', 'Fire Breath', 'Living Flame D', "Temporal Anomaly", 'Disintegrate'], // These are spells that do not consume or otherwise interact with our Echo buff.

    

}

const apl = ["Avenging Wrath", "Divine Toll", "Light's Hammer", "Light of Dawn", "Holy Shock", "Crusader Strike", "Judgment", "Rest"]



/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} paladinSpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
 const applyLoadoutEffects = (paladinSpells, settings, talents, state, stats) => {

    // ==== Default Loadout ====
    // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
    // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
    // we don't have full information about a character.
    // As always, Top Gear is able to provide a more complete picture. 
    if (settings['DefaultLoadout']) {
        settings['T30_4'] = true;
        settings['T30_2'] = true;
    }

    if (settings['T30_2']) {
        paladinSpells["Holy Shock"].push({
            type: "function",
            runFunc: function (state, buff, paladinSpells) {
                // Roll Dice equal to crit chance.
                const roll = 0;
                const holyShockCritChance = getCrit(state.currentStats) - 1 + paladinSpells["Holy Shock"][0].statMods.crit;
                // If successful, reduce CD on Light's Hammer by 2s.
                console.log(holyShockCritChance)
                if (roll < getCrit(state.currentStats) - 1) {
                    const targetSpell = paladinSpells["Light's Hammer"];
                    targetSpell[0].activeCooldown -= 2;
                }
            }
        })
    }

    if (settings['T30_4']) {
        paladinSpells["Light's Hammer"][1].tickRate /= 2;
        paladinSpells["Light's Hammer"].push({
            name: "LH HoPo Gen",
            buffDuration: 12,
            type: "buff",
            buffType: 'function',
            stacks: false,
            tickRate: 4,
            hastedDuration: false,
            function: function (state, buff) {
                state.holyPower = Math.min(state.holyPower + 1, 5);
            }
        })
    }


    // Setup mana costs & cooldowns.
    for (const [key, value] of Object.entries(paladinSpells)) {
        const fullSpell = value;
        const spellInfo = fullSpell[0];


        if (spellInfo.targets && 'maxAllyTargets' in settings) Math.max(spellInfo.targets, settings.maxAllyTargets);
        if (!spellInfo.targets) spellInfo.targets = 1;
        if (spellInfo.cooldown) spellInfo.activeCooldown = 0;
        if (spellInfo.cost) spellInfo.cost = spellInfo.cost * PALADINCONSTANTS.baseMana / 100;

        if (settings.includeOverheal === "No") {
            value.forEach(spellSlice => {
                if ('expectedOverheal' in spellSlice) spellSlice.expectedOverheal = 0;

            })
 
        }
    }

    // Remember, if it adds an entire ability then it shouldn't be in this section. Add it to ramp generators in DiscRampGen.



    // ==== Tier Sets ====

    return paladinSpells;
}

const applyTalents = (state, spellDB, stats) => {
    const talents = Object.keys(state.talents);
    Object.keys(state.talents).forEach(talentName => {
        const talent = state.talents[talentName];
        if (talent.points > 0) {
            talent.runFunc(state, spellDB, talent.points, stats)
        }
    });

}


/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 3-12% damage buff depending on number of active atonements.
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getDamMult = (state, buffs, activeAtones, t, spellName, talents) => {
    let mult = PALADINCONSTANTS.auraDamageBuff;

    mult *= (buffs.filter(function (buff) {return buff.name === "Avenging Wrath"}).length > 0 ? 1.2 : 1); 

    return mult;
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
const getHealingMult = (state, t, spellName, talents) => {
    let mult = PALADINCONSTANTS.auraHealingBuff;

    mult *= (state.activeBuffs.filter(function (buff) {return buff.name === "Avenging Wrath"}).length > 0 ? 1.2 : 1); // Avenging Wrath

    return mult;
}




export const runHeal = (state, spell, spellName, compile = true) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.t, spellName, state.talents); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.sqrtMin) : spell.targets) || 1;
    const healingVal = getSpellRaw(spell, currentStats, PALADINCONSTANTS) * (1 - spell.expectedOverheal) * healingMult * targetMult;
    
    // Special cases
    if ('specialMult' in spell) healingVal *= spell.specialMult;

    // Beacon
    let beaconHealing = 0;
    if (state.beacon === "Beacon of Light") beaconHealing = healingVal * 0.5 * (1 - PALADINCONSTANTS.beaconOverhealing);
    else if (state.beacon === "Beacon of Faith") beaconHealing = healingVal * 0.35 * 2 * (1 - PALADINCONSTANTS.beaconOverhealing);

    // Compile healing and add report if necessary.
    if (compile) state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal;
    if (targetMult > 1) addReport(state, `${spellName} healed for ${Math.round(healingVal)} (tar: ${targetMult}, Exp OH: ${spell.expectedOverheal * 100}%)`)
    else addReport(state, `${spellName} healed for ${Math.round(healingVal)} (Exp OH: ${spell.expectedOverheal * 100}%)`)
    if (compile) state.healingDone["Beacon of Light"] = (state.healingDone["Beacon of Light"] || 0) + beaconHealing;


    return healingVal;
}

export const runDamage = (state, spell, spellName, atonementApp, compile = true) => {

    //const activeAtonements = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
    const damMultiplier = getDamMult(state, state.activeBuffs, 0, state.t, spellName, state.talents); // Get our damage multiplier (Schism, Sins etc);
    const damageVal = getSpellRaw(spell, state.currentStats, PALADINCONSTANTS) * damMultiplier;
    
    // This is stat tracking, the atonement healing will be returned as part of our result.
    if (compile) state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.
    addReport(state, `${spellName} dealt ${Math.round(damageVal)} damage`)
    return damageVal;
}

const canCastSpell = (state, spellDB, spellName) => {
    
    const spell = spellDB[spellName][0];
    let miscReq = true;
    const holyPowReq = (spell.holyPower + state.holyPower >= 0 ) || !spell.holyPower;
    const cooldownReq = (state.t >= spell.activeCooldown) || !spell.cooldown;
    if (spellName === "Hammer of Wrath") {
        if (!checkBuffActive(state.activeBuffs, "Avenging Wrath")) miscReq = false;
    } 
    //console.log("Checking if can cast: " + spellName + ": " + holyPowReq + cooldownReq)
    return cooldownReq && holyPowReq && miscReq;
}

const getSpellHPM = (state, spellDB, spellName) => {
    const spell = spellDB[spellName][0];
    const spellHealing = runHeal(state, spell, spellName, false)

    return spellHealing / spell.cost || 0;
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




const runSpell = (fullSpell, state, spellName, paladinSpells) => {

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
                const newSpell = paladinSpells[spell.storedSpell];
                runSpell(newSpell, state, spell.storedSpell, paladinSpells);
            }
            // The spell has a healing component. Add it's effective healing.
            // Power Word: Shield is included as a heal, since there is no functional difference for the purpose of this calculation.
            else if (spell.type === 'heal') {
                runHeal(state, spell, spellName)
            }
            
            
            // The spell has a damage component. Add it to our damage meter.
            else if (spell.type === 'damage') {
                runDamage(state, spell, spellName)
            }
            // 
            else if (spell.type === 'function') {
                spell.runFunc(state, spell, paladinSpells);
            }

            // The spell reduces the cooldown of another spell. 
            else if (spell.type === "cooldownReduction") {
                const targetSpell = paladinSpells[spell.targetSpell];
                targetSpell[0].activeCooldown -= spell.cooldownReduction;
            }
            // The spell extends the duration of a buff.
            // Note that this will extend all instances of the buff which is generally the functionality you're looking for.
            // Examples include Flourish, Evangelism, Zealot's Paragon etc.
            else if (spell.type === "extendBuff") {
                extendBuff(state.activeBuffs, 0, spell.targetSpell, spell.value)
            }

            // TODO: This needs to be converted to use the RampBase addBuff function. There are some unique ones here which could be converted to some kind of 
            // function run on buff gain.
            // The spell adds a buff to our player.
            // We'll track what kind of buff, and when it expires.
            else if (spell.type === "buff") {

                addReport(state, `Adding buff: ${spell.name}`);
                if (spell.buffType === "stats") {
                    state.activeBuffs.push({name: spellName, expiration: state.t + spell.buffDuration, buffType: "stats", value: spell.value, stat: spell.stat});
                }
                else if (spell.buffType === "statsMult") {
                    // If we already have the buff, set the duration to the max of what is remaining and the new duration.
                    // TODO: Overwriting buffs can work in a ton of different ways. This one is kind of custom built for Avenging Wrath + Awakening.
                    const buffExists = state.activeBuffs.filter(function (buff) {return buff.name === spell.name}).length;
                    if (buffExists) {
                        const buff = state.activeBuffs.filter(function (buff) {return buff.name === spell.name})[0];

                        //const buffDuration = buff[0].expiration - state.t;
                        //buff.expiration = Math.max(buffDuration, spell.buffDuration) + state.t;
                        buff.expiration = buff.expiration + spell.buffDuration;
                    }
                    else {
                        state.activeBuffs.push({name: spellName, expiration: state.t + spell.buffDuration, buffType: "statsMult", value: spell.value, stat: spell.stat});
                    }
                    
                }
                else if (spell.buffType === "damage" || spell.buffType === "heal") {     
                    const newBuff = {name: spell.name, buffType: spell.buffType, attSpell: spell,
                        tickRate: spell.tickRate, canPartialTick: spell.canPartialTick, next: state.t + (spell.tickRate / getHaste(state.currentStats))}
                    
                    newBuff['expiration'] = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(state.currentStats)) : state.t + spell.buffDuration    
                    state.activeBuffs.push(newBuff)

                }
                else if (spell.buffType === "function") {
                    const newBuff = {name: spell.name, buffType: spell.buffType, attSpell: spell,
                        tickRate: spell.tickRate, canPartialTick: spell.canPartialTick || false, 
                        next: state.t + (spell.tickRate / getHaste(state.currentStats))}
                    newBuff.attFunction = spell.function;

                    newBuff.expiration = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(state.currentStats)) : state.t + spell.buffDuration
                    
                    state.activeBuffs.push(newBuff);

                }
                else if (spell.buffType === "special") {
                    // Check if buff already exists, if it does add a stack.
                    const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === spell.name}).length;

                    if (spell.canStack === false || buffStacks === 0) {
                        const buff = {name: spell.name, expiration: (state.t  + spell.buffDuration) + (spell.castTime || 0), buffType: spell.buffType, 
                            value: spell.value, stacks: 1, canStack: spell.canStack, maxStacks: spell.maxStacks};
                    
                        if (spell.name === "Cycle of Life") {

                            buff.runEndFunc = true;
                            buff.runFunc = spell.runFunc;
                            buff.canPartialTick = true;

                        }


                        //if (spell.name === "Temporal Compression") console.log(buff);
                        state.activeBuffs.push(buff);
                    }
                    else {
    
                        const buff = state.activeBuffs.filter(buff => buff.name === spell.name)[0]

                        
                        if (buff.canStack) {
                            buff.stacks += 1;
                            if (buff.maxStacks) buff.stacks = Math.min(buff.stacks, buff.maxStacks);
                        }
                        addReport(state, `${spell.name} stacks: ${buff.stacks}`)
                    }


                }     
                // Spell amps are buffs that increase the amount of healing the next spell that meets the criteria. The criteria is defined in the buff itself by a function.
                // Examples might include Call of Ysera or Soul of the Forest.
                // Buffs that increase the healing of all spells could be handled here in future, but aren't currently. Those are generally much easier.

                // Buffs here support stacking and maxStacks properties.
                else if (spell.buffType === "spellAmp") {
                    
                    // Check if buff already exists, if it does add a stack.
                    const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === spell.name}).length;
                    //addReport(state, "Adding Buff: " + spell.name + " for " + spell.buffDuration + " seconds.");

                    if (buffStacks === 0) {
                        state.activeBuffs.push({name: spell.name, expiration: (state.t + spell.castTime + spell.buffDuration) || 999, 
                                                    buffType: "spellAmp", value: spell.value, stacks: spell.stacks || 1, canStack: spell.canStack,
                                                    buffedSpellName: spell.buffedSpellName
                                                    });
                    }
                    else {
                        const buff = state.activeBuffs.filter(buff => buff.name === spell.name)[0]

                        if (buff.canStack) buff.stacks += 1;
                    }
                }
                else {
                    state.activeBuffs.push({name: spellName, expiration: state.t + spell.castTime + spell.buffDuration});
                }
            }

            // These are special exceptions where we need to write something special that can't be as easily generalized.

            if (spell.holyPower) state.holyPower = Math.min(state.holyPower + spell.holyPower, 5);
            if (spell.cooldown) {

                if (spellName === "Holy Shock" && state.talents.sanctifiedWrath.points && checkBuffActive(state.activeBuffs, "Avenging Wrath")) spell.activeCooldown = state.t + (spell.cooldown / getHaste(state.currentStats) / 1.4);
                else if (spell.hastedCooldown) spell.activeCooldown = state.t + (spell.cooldown / getHaste(state.currentStats));
                else spell.activeCooldown = state.t + spell.cooldown;
            }
        }


 
        // Grab the next timestamp we are able to cast our next spell. This is equal to whatever is higher of a spells cast time or the GCD.
    }); 

    // Any post-spell code.
    if (spellName === "Dream Breath") state.activeBuffs = removeBuffStack(state.activeBuffs, "Call of Ysera");
    //if (spellName === "Verdant Embrace" && state.talents.callofYsera) addBuff(state, PALADINCONSTANTS.callOfYsera, "Call of Ysera");
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

            // Check if we need to begin Essence Recharge. We don't actually need to check if we're below
            // 6 Essence, since we'll never be able to cast a spell that costs Essence if we're at 6.
            if (checkBuffActive(state.activeBuffs, "EssenceGen") === false) {
                addBuff(state, PALADINCONSTANTS.essenceBuff, "EssenceGen");
            }
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

        if (castTime === 0 && spell.onGCD === true) castTime = 0; //return 1.5 / getHaste(currentStats);
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
export const runCastSequence = (sequence, stats, settings = {}, incTalents = {}) => {
    //console.log("Running cast sequence");

    // Flatten talents
    // Talents come with a lot of extra data we don't need like icons, max points and such.
    // This quick bit of code flattens it out by creating key / value pairs for name: points.
    // Can be removed to RampGeneral.
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        //talents[key] = value.points;
        talents[key] = value;
    }

    // Add base Mastery bonus.
    // We'd like to convert this to a % buff at some point since it will be incorrectly reduced by DR as-is.

    let state = {t: 0.01, report: [], activeBuffs: [], healingDone: {}, casts: {}, damageDone: {}, manaSpent: 0, settings: settings, talents: talents, reporting: true, holyPower: 5, beacon: "Beacon of Faith"};

    let currentStats = JSON.parse(JSON.stringify(stats));
    


    const sequenceLength = 100; // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    const seqType = "Auto" // Auto / Manual.

    let nextSpell = 0; // The time when the next spell cast can begin.
    let spellFinish = 0; // The time when the cast will finish. HoTs / DoTs can continue while this charges.
    let queuedSpell = "";
    const startTime = performance.now();
    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.

    const paladinSpells = applyLoadoutEffects(deepCopyFunction(PALADINSPELLDB), settings, talents, state, stats);
    applyTalents(state, paladinSpells, stats)

    state.currentStats = getCurrentStats(currentStats, state.activeBuffs)

    // Extra Settings
    if (settings.masteryEfficiency) PALADINCONSTANTS.masteryEfficiency = settings.masteryEfficiency;

    const seq = [...sequence];

    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        // ---- Heal over time and Damage over time effects ----
        // When we add buffs, we'll also attach a spell to them. The spell should have coefficient information, secondary scaling and so on. 
        // When it's time for a HoT or DoT to tick (state.t > buff.nextTick) we'll run the attached spell.
        // Note that while we refer to DoTs and HoTs, this can be used to map any spell that's effect happens over a period of time. 
        // This includes stuff like Shadow Fiend which effectively *acts* like a DoT even though it is technically not one.
        // You can also call a function from the buff if you'd like to do something particularly special. You can define the function in the specs SpellDB.
        const healBuffs = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "damage" || buff.buffType === "function") && state.t >= buff.next})
        if (healBuffs.length > 0) {
            healBuffs.forEach((buff) => {
               
                let currentStats = {...stats};
                state.currentStats = getCurrentStats(currentStats, state.activeBuffs)

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
                    func(state, spell);
                }

                if (buff.hasted || buff.hasted === undefined) buff.next = buff.next + (buff.tickRate / getHaste(state.currentStats));
                else buff.next = buff.next + (buff.tickRate);
            });  
        }

        // -- Partial Ticks --
        // When DoTs / HoTs expire, they usually have a partial tick. The size of this depends on how close you are to your next full tick.
        // If your Shadow Word: Pain ticks every 1.5 seconds and it expires 0.75s away from it's next tick then you will get a partial tick at 50% of the size of a full tick.
        // Note that some effects do not partially tick (like Fiend), so we'll use the canPartialTick flag to designate which do and don't. 
        const expiringHots = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "damage" || buff.runEndFunc) && state.t >= buff.expiration && buff.canPartialTick})
        expiringHots.forEach(buff => {

            if (buff.buffType === "heal" || buff.buffType === "damage") {
                const tickRate = buff.tickRate / getHaste(state.currentStats)
                const partialTickPercentage = (buff.next - state.t) / tickRate;
                const spell = buff.attSpell;
                spell.coeff = spell.coeff * partialTickPercentage;

                if (buff.buffType === "damage") runDamage(state, spell, buff.name);
                else if (buff.buffType === "healing") runHeal(state, spell, buff.name + "(hot)");
            }
            else if (buff.runEndFunc) buff.runFunc(state, buff);
        })

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
            else queuedSpell = genSpell(state, paladinSpells);

            const fullSpell = paladinSpells[queuedSpell];
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
            const fullSpell = paladinSpells[queuedSpell];

            spendSpellCost(fullSpell, state);

            runSpell(fullSpell, state, spellName, paladinSpells);
            state.casts[spellName] = (state.casts[spellName] || 0) + 1;

            // Check if Echo
            // If we have the Echo buff active, and our current cast is Echo compatible (this will probably change through Alpha) then:
            // - Recast the echo version of the spell (created at the start of runtime).
            // - The echo versions of spells are a weird mix of exception cases.
            if (checkBuffActive(state.activeBuffs, "Echo") &&  !(PALADINCONSTANTS.echoExceptionSpells.includes(spellName))) {
                // We have at least one Echo.

                // Check Echo number.
                const echoBuffs = state.activeBuffs.filter(function (buff) {return buff.name === "Echo"});

                // Our Echo buffs can be of different strengths (say, one comes from TA and one from a hard casted Echo).
                // Because of this we'll iterate through our buffs 1 by 1 so we can use the correct Echo value.
                for (let j = 0; j < echoBuffs.length; j++) {
                    
                    const echoBuff = echoBuffs[j];
                    
                    const echoSpell = JSON.parse(JSON.stringify(paladinSpells[spellName + "(Echo)"]));

                    echoSpell.forEach(effect => {
                        if ('coeff' in effect) effect.coeff = effect.coeff * echoBuff.value;
                        if ('value' in effect) effect.value = effect.value * echoBuff.value;
                    })

                    // Unfortunately functions are not copied over when we do our deep clone, so we'll have to manually copy them over.
                    if (spellName === "Reversion") echoSpell[0].function = paladinSpells["Reversion"][0].function;
                    runSpell(echoSpell, state, spellName + "(Echo)", paladinSpells)

                }

                // Remove all of our Echo buffs.
                state.activeBuffs =  state.activeBuffs.filter(function (buff) {return buff.name !== "Echo"})

            }

            // Cleanup
            queuedSpell = "";
            spellFinish = 0;
        }

        if (seq.length === 0 && queuedSpell === "" && healBuffs.length === 0) {
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

