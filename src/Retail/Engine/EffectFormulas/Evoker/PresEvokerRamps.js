// 
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { EVOKERSPELLDB } from "./PresEvokerSpellDB";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { checkBuffActive, removeBuffStack, getCurrentStats, getHaste, getSpellRaw, getStatMult, GLOBALCONST, getBuffStacks } from "../Generic/RampBase";

// Any settings included in this object are immutable during any given runtime. Think of them as hard-locked settings.
const discSettings = {
    chaosBrand: true
}

const getHealth = (stamina) => {
    return stamina * 20;
}

const EVOKERCONSTANTS = {
    
    masteryMod: 1.8, 
    masteryEfficiency: 0.92, 
    baseMastery: 0.14,
    baseMana: 10000,

    //CBT: {transferRate: 0.3, expectedOverhealing: 0.25},
    defaultEmpower: 4,
    auraHealingBuff: 1, 
    auraDamageBuff: 1, 

    enemyTargets: 1, 
    echoExceptionSpells: ['Echo', 'Blessing of the Bronze'], // These are spells that do not consume or otherwise interact with our Echo buff.

    essenceBurstBuff: {
        name: "Essence Burst",
        type: "buff",
        stacks: true,
        maxStacks: 2,
        expiration: 999,
        buffType: 'special',
    },
    exhilBurstBuff: {
        name: "Exhilirating Burst",
        type: "buff",
        stacks: false,
        buffDuration: 8,
        buffType: 'stats',
        stat: 'critMult',
        value: 0.5
    }

}

// Remove Temporal and add Essence Burst if necessary.
const triggerTemporal = (state) => {
    if (state.talents.sacralEmpowerment) triggerEssenceBurst(state);
    state.activeBuffs = state.activeBuffs.filter(buff => buff.name !== "Temporal Compression")
}

const triggerEssenceBurst = (state) => {
    console.log("TRIGGERED ESSENCE BURST");
    if (state.talents.exhiliratingBurst) {
        // If we're talented into Exhil Burst then also add that buff.
        // If we already have an Exhilirating Burst active then we'll just refresh it's duration instead.
        // If not, we'll create a new buff.
        const activeBuff = state.activeBuffs.filter(function (buff) {return buff.name === "Exhilirating Burst"});
        const exhilBurst = EVOKERCONSTANTS.exhilBurstBuff;
        if (activeBuff.length > 0) activeBuff.expiration = (state.t + exhilBurst.buffDuration);
        else {
            exhilBurst.expiration = (state.t + exhilBurst.buffDuration);
            state.activeBuffs.push(exhilBurst);
        }

    }

}

/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} shamanSpells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} talents The talents run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
 const applyLoadoutEffects = (evokerSpells, settings, talents, state, stats) => {

    // ==== Default Loadout ====
    // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
    // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
    // we don't have full information about a character.
    // As always, Top Gear is able to provide a more complete picture. 
    if (settings['DefaultLoadout']) {

    }

    // ==== Talents ====
    // Not all talents just make base modifications to spells, but those that do can be handled here.

    // Evoker Class Talents
    if (talents.bountifulBloom) evokerSpells['Emerald Blossom'][0].targets += 2;




    // Evoker Spec Talents
    if (talents.renewingBreath) evokerSpells['Dream Breath'].push({
        type: "buff",
        buffType: "heal",
        tickRate: 2,
        targets: 5,
        coeff: evokerSpells['Dream Breath'][0].coeff[EVOKERCONSTANTS.defaultEmpower] / 4,
        hastedHoT: false,
        buffDuration: 8,
        expectedOverheal: 0.52,
        secondaries: ['crit', 'vers', 'mastery']
    })
    if (talents.timelessMagic) evokerSpells['Reversion'][0].buffDuration += (2 * talents.timelessMagic);
    if (talents.timeLord) evokerSpells['Echo'][1].value += (0.1 * talents.timeLord);
    if (talents.flutteringSeedlings) evokerSpells['Emerald Blossom'].push({
        // TODO
        type: "heal",
        school: "green",
        coeff: (0.3 * talents.flutteringSeedlings),
        targets: 3, // 
        expectedOverheal: 0.25,
        secondaries: ['crit', 'vers', 'mastery']
    })
    if (talents.essenceBurst) evokerSpells['Living Flame'].push({...EVOKERCONSTANTS.essenceBurstBuff, chance: 0.2})
    if (talents.essenceStrike) evokerSpells['Azure Strike'].push({...EVOKERCONSTANTS.essenceBurstBuff, chance: 0.15})

    if (talents.lifeforceMender) {
        evokerSpells['Living Flame'][0].flatHeal = (getHealth(stats.stamina) * talents.lifeforceMender * 0.01);
        evokerSpells['Fire Breath'][0].flatDamage = (getHealth(stats.stamina) * talents.lifeforceMender * 0.01);
        evokerSpells['Living Flame D'][0].flatDamage = (getHealth(stats.stamina) * talents.lifeforceMender * 0.01);
    }
    if (talents.callOfYsera) evokerSpells['Rescue'].push({
        name: "Call of Ysera",
        type: "buff",
        stacks: false,
        expiration: 999,
        buffType: 'special',
    })
    if (talents.groveTender) {
        evokerSpells['Dream Breath'][0].cost *= 0.9;
        evokerSpells['Spiritbloom'][0].cost *= 0.9;
        evokerSpells['Emerald Blossom'][0].cost *= 0.9;
    }
    if (talents.cycleOfLife) {
        // This can possibly be handled by just multiplying healing during it's duration like with CBT.
        evokerSpells['Emerald Blossom'].push({
            name: "Cycle of Life",
            type: "buff",
            stacks: false,
            expiration: 10,
            buffType: 'special',
        })
    }




    // Setup mana costs & cooldowns.
    for (const [key, value] of Object.entries(evokerSpells)) {
        let spell = value[0];

        if (spell.empowered) {
            spell.castTime = spell.castTime[EVOKERCONSTANTS.defaultEmpower]
            if (spell.targets && typeof spell.targets === "object") spell.targets = spell.targets[EVOKERCONSTANTS.defaultEmpower];
            if (spell.coeff && typeof spell.coeff === "object") spell.coeff = spell.coeff[EVOKERCONSTANTS.defaultEmpower];
            if (spell.cooldown && typeof spell.cooldown === "object") spell.cooldown = spell.cooldown[EVOKERCONSTANTS.defaultEmpower];
            
            if (key === "Fire Breath") value[1].buffDuration = value[1].buffDuration[EVOKERCONSTANTS.defaultEmpower];
            //console.log(typeof spell.coeff)
        }

        if ('school' in spell && spell.school === "bronze" && talents.temporalCompression) {
            evokerSpells[key].push({
                name: "Temporal Compression",
                type: "buff",
                canStack: true,
                stacks: 0,
                maxStacks: 4,
                value: 0.05 * talents.temporalCompression,
                expiration: 999,
                buffType: 'special',
            })
        }
        if ('school' in spell && spell.school === "green" && talents.lushGrowth) spell.coeff *= (1 + 0.05 * talents.lushGrowth);

        if (!spell.targets) spell.targets = 1;
        if (spell.cooldown) spell.activeCooldown = 0;
        if (spell.cost) spell.cost = spell.cost * EVOKERCONSTANTS.baseMana / 100;
    }
    
    // Remember, if it adds an entire ability then it shouldn't be in this section. Add it to ramp generators in DiscRampGen.


    // ==== Legendaries ====

    return evokerSpells;
}


/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 3-12% damage buff depending on number of active atonements.
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getDamMult = (state, buffs, activeAtones, t, spellName, talents) => {
    let mult = EVOKERCONSTANTS.auraDamageBuff;
    
    mult *= (buffs.filter(function (buff) {return buff.name === "Avenging Wrath"}).length > 0 ? 1.2 : 1); 
    

    return mult; 
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
const getHealingMult = (state, t, spellName, talents) => {
    let mult = EVOKERCONSTANTS.auraHealingBuff;

    if ((spellName === "Dream Breath" || spellName === "Living Flame") && checkBuffActive(state.activeBuffs, "Call of Ysera")) {
        if (spellName === "Dream Breath") mult *= 1.4;
        if (spellName === "Living Flame" || spellName === "Living Flame D") mult *= 2;

        state.activeBuffs = removeBuffStack(state.activeBuffs, "Call of Ysera");

    } 
    
    
    return mult;
}




const getSqrt = (targets) => {
    return Math.sqrt(targets);
}


export const runHeal = (state, spell, spellName, compile = true) => {

    // Pre-heal processing
    const currentStats = state.currentStats;

    const healingMult = getHealingMult(state, state.t, spellName, state.talents); 
    const targetMult = (('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets) : spell.targets) || 1;
    const healingVal = getSpellRaw(spell, currentStats, EVOKERCONSTANTS) * (1 - spell.expectedOverheal) * healingMult * targetMult;
    
    //if (cloudburstActive) cloudburstHealing = (healingVal / (1 - spell.expectedOverheal)) * EVOKERCONSTANTS.CBT.transferRate * (1 - EVOKERCONSTANTS.CBT.expectedOverhealing);
    //console.log("V: " + healingVal + ". t:" + targetMult + ". HealingM: " + healingMult);
    
    if (compile) state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal;
    //if (compile) state.healingDone['Cloudburst Totem'] = (state.healingDone['Cloudburst Totem'] || 0) + cloudburstHealing;

    return healingVal;
}

export const runDamage = (state, spell, spellName, atonementApp, compile = true) => {

    //const activeAtonements = getActiveAtone(atonementApp, state.t); // Get number of active atonements.
    const damMultiplier = getDamMult(state, state.activeBuffs, 0, state.t, spellName, state.talents); // Get our damage multiplier (Schism, Sins etc);
    const damageVal = getSpellRaw(spell, state.currentStats, EVOKERCONSTANTS) * damMultiplier;
    
    // This is stat tracking, the atonement healing will be returned as part of our result.
    if (compile) state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.

    return damageVal;
}

const canCastSpell = (state, spellDB, spellName) => {
    
    const spell = spellDB[spellName][0];
    let miscReq = true;
    const holyPowReq = (spell.holyPower + state.holyPower > 0 ) || !spell.holyPower;
    const cooldownReq = (state.t > spell.activeCooldown) || !spell.cooldown;
    if (spellName === "Hammer of Wrath") {
        if (!checkBuffActive(state.activeBuffs, "Avenging Wrath")) miscReq = false;
    } 

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


const apl = ["Riptide", "Rest"]

const runSpell = (fullSpell, state, spellName) => {
    fullSpell.forEach(spell => {

        let canProceed = false

        if (spell.chance) {
            const roll = Math.random();
            canProceed = roll <= spell.chance;
        }
        else canProceed = true;



        // The spell has a healing component. Add it's effective healing.
        // Power Word: Shield is included as a heal, since there is no functional difference for the purpose of this calculation.
        if (spell.type === 'heal') {
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

        // The spell adds a buff to our player.
        // We'll track what kind of buff, and when it expires.
        else if (spell.type === "buff") {
            if (spell.buffType === "stats") {
                state.activeBuffs.push({name: spellName, expiration: state.t + spell.buffDuration, buffType: "stats", value: spell.value, stat: spell.stat});
            }
            else if (spell.buffType === "statsMult") {
                state.activeBuffs.push({name: spellName, expiration: state.t + spell.buffDuration, buffType: "statsMult", value: spell.value, stat: spell.stat});
            }
            else if (spell.buffType === "damage" || spell.buffType === "heal") {     
                const newBuff = {name: spellName, buffType: spell.buffType, attSpell: spell,
                    tickRate: spell.tickRate, canPartialTick: spell.canPartialTick, next: state.t + (spell.tickRate / getHaste(state.currentStats))}

                newBuff['expiration'] = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(currentStats)) : state.t + spell.buffDuration    
                state.activeBuffs.push(newBuff)

            }
            else if (spell.buffType === "function") {
                const newBuff = {name: spellName, buffType: spell.buffType, attSpell: spell,
                    tickRate: spell.tickRate, canPartialTick: spell.canPartialTick || false, 
                    next: state.t + (spell.tickRate / getHaste(state.currentStats))}
                 newBuff.attFunction = spell.function;
                 if (spellName === "Reversion") newBuff.expiration = (state.t + spell.castTime + (spell.buffDuration / (1 - 0.25)));

                 state.activeBuffs.push(newBuff);
            }
            else if (spell.buffType === "special") {


                // Check if buff already exists, if it does add a stack.
                const buffStacks = state.activeBuffs.filter(function (buff) {return buff.name === spell.name}).length;

                if (spell.canStack === false || buffStacks === 0) {
                    const buff = {name: spell.name, expiration: (state.t + spell.castTime + spell.buffDuration) || 999, buffType: spell.buffType, value: spell.value, stacks: spell.stacks || 1, canStack: spell.canStack}
                   
                    state.activeBuffs.push(buff);
                }
                else {
  
                    const buff = state.activeBuffs.filter(buff => buff.name === spell.name)[0]
                    
                    if (buff.canStack) buff.stacks += 1;
                }

                if (spell.name === "Essence Burst") {
                    triggerEssenceBurst(state);
                }
                

            }     
            else {
                state.activeBuffs.push({name: spellName, expiration: state.t + spell.castTime + spell.buffDuration});
            }
        }

        // These are special exceptions where we need to write something special that can't be as easily generalized.

        if (spell.holyPower) state.holyPower += spell.holyPower;
        if (spell.cooldown) spell.activeCooldown = state.t + (spell.cooldown / getHaste(state.currentStats));
        
        // Grab the next timestamp we are able to cast our next spell. This is equal to whatever is higher of a spells cast time or the GCD.
        
    }); 

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
    let state = {t: 0.01, activeBuffs: [], healingDone: {}, damageDone: {}, manaSpent: 0, settings: settings, talents: talents, reporting: true, essences: 5};

    const sequenceLength = 30; // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    const seqType = "Manual" // Auto / Manual.
    let atonementApp = []; // We'll hold our atonement timers in here. We keep them seperate from buffs for speed purposes.
    let nextSpell = 0;
    const startTime = performance.now();
    // Note that any talents that permanently modify spells will be done so in this loadoutEffects function. 
    // Ideally we'll cover as much as we can in here.
    const shamanSpells = applyLoadoutEffects(deepCopyFunction(EVOKERSPELLDB), settings, talents, state, stats);
    

    // Create Echo clones.
    for (const [spellName, spellData] of Object.entries(shamanSpells)) {
        
        // Make sure spell can be copied by Echo.
        // Right now this is almost anything but we'll expect them to make changes later in Alpha.
        if (!(EVOKERCONSTANTS.echoExceptionSpells.includes(spellName))) {
            let echoSpell = [...spellData];

            // Make any Echo changes necessary.

            // Save the new spell.
            shamanSpells[spellName+"(Echo)"] = echoSpell;
        }
    }


    const seq = [...sequence];

    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        // Check for any expired atonements. 
        
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
                    runHeal(state, spell, buff.name + "(hot)")
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
                buff.next = buff.next + (buff.tickRate / getHaste(state.currentStats));
            });  
        }

        // -- Partial Ticks --
        // When DoTs / HoTs expire, they usually have a partial tick. The size of this depends on how close you are to your next full tick.
        // If your Shadow Word: Pain ticks every 1.5 seconds and it expires 0.75s away from it's next tick then you will get a partial tick at 50% of the size of a full tick.
        // Note that some effects do not partially tick (like Fiend), so we'll use the canPartialTick flag to designate which do and don't. 
        const expiringHots = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "damage") && state.t >= buff.expiration && buff.canPartialTick})
        expiringHots.forEach(buff => {
            const tickRate = buff.tickRate / getHaste(state.currentStats)
            const partialTickPercentage = (buff.next - state.t) / tickRate;
            const spell = buff.attSpell;
            spell.coeff = spell.coeff * partialTickPercentage;
            
            if (buff.buffType === "damage") runDamage(state, spell, buff.name);
            else if (buff.buffType === "healing") runHeal(state, spell, buff.name + "(hot)")
        })

        // Remove any buffs that have expired. Note that we call this after we handle partial ticks. 
        state.activeBuffs = state.activeBuffs.filter(function (buff) {return buff.expiration > state.t});

        // This is a check of the current time stamp against the tick our GCD ends and we can begin our queued spell.
        // It'll also auto-cast Ascended Eruption if Boon expired.
        if ((state.t > nextSpell && seq.length > 0))  {

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);


            let spellName = "";
            if (seqType === "Manual") spellName = seq.shift();
            else spellName = genSpell(state, shamanSpells);

            const fullSpell = shamanSpells[spellName];

            // We'll iterate through the different effects the spell has.
            // Smite for example would just trigger damage (and resulting atonement healing), whereas something like Mind Blast would trigger two effects (damage,
            // and the absorb effect).
            state.manaSpent += fullSpell[0].cost || 0;

            runSpell(fullSpell, state, spellName);

            // Check if Echo
            // If we have the Echo buff active, and our current cast is Echo compatible (this will probably change through Alpha) then:
            // - Recast the echo version of the spell (created at the start of runtime).
            // - The echo versions of spells are a weird mix of exception cases.
            if (checkBuffActive(state.activeBuffs, "Echo") &&  !(EVOKERCONSTANTS.echoExceptionSpells.includes(spellName))) {
                // We have at least one Echo.

                // Check Echo number.
                const echoNum = state.activeBuffs.filter(function (buff) {return buff.name === "Echo"}).length;

                for (let j = 0; j < echoNum; j++) {
                    // Cast the Echo'd version of our spell j times.
                    
                    const echoSpell = shamanSpells[spellName + "(Echo)"]
                    runSpell(echoSpell, state, spellName + "(Echo)")
  
                }

                // Remove all of our Echo buffs.
                state.activeBuffs =  state.activeBuffs.filter(function (buff) {return buff.name !== "Echo"})

            }
 

            if ('castTime' in fullSpell[0]) {
                let castTime = fullSpell[0].castTime;

                if (fullSpell[0].empowered) {
                    // Empowered spells don't currently scale with haste.
                    if (checkBuffActive(state.activeBuffs, "Temporal Compression")) {
                        const buffStacks = getBuffStacks(state.activeBuffs, "Temporal Compression")
                        castTime *= (1 - 0.05 * buffStacks)
                        if (buffStacks === 4) triggerTemporal(state);
                    }
                    nextSpell += castTime; // Add Haste to empowered spells pls Blizzard.

                } 

                else if (castTime === 0 && fullSpell.onGCD === true) nextSpell += 1.5 / getHaste(currentStats);
                else nextSpell += (castTime / getHaste(currentStats));
            }
            else console.log("CAST TIME ERROR. Spell: " + spellName);
            
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

