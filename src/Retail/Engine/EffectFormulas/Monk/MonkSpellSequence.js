// 

import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import { MONKSPELLS } from "./MistweaverSpellDB";
import { convertPPMToUptime } from "Retail/Engine/EffectFormulas/EffectUtilities"
import { runRampTidyUp, getSqrt, addReport, getCurrentStats, getHaste, getSpellRaw, getStatMult, GLOBALCONST, 
            getHealth, getCrit, advanceTime, hasTalent, spendSpellCost, getSpellCastTime, queueSpell, deepCopyFunction, runSpell, getTalentValue } from "../Generic/RampGeneric/RampBase";

export const MONKCONSTANTS = {
    masteryMod: 6.93, 
    masteryEfficiency: 0.82, 
    baseMana: 250000,

    auraHealingBuff: 1.09,
    auraDamageBuff: 1,
    enemyTargets: 1, 
}


/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @schism 25% damage buff to primary target if Schism debuff is active.
 * @sins A 3-12% damage buff depending on number of active atonements.
 * @chaosbrand A 5% damage buff if we have Chaos Brand enabled in Disc Settings.
 * @AscendedEruption A special buff for the Ascended Eruption spell only. The multiplier is equal to 3% (4 with conduit) x the number of Boon stacks accrued.
 */
const getDamMult = (state, t, spellName, spell) => {
    let mult = 1

    if (spell.damageType === "physical")
    {
        mult *= 1.05 // Mystic Touch.

        if (hasTalent(state.talents, "martialInstincts")) mult *= (1 + getTalentValue(state.talents, "martialInstincts"))
    }

    if (hasTalent(state.talents, "ferocityOfXuen")) mult *= (1 + getTalentValue(state.talents, "ferocityOfXuen"))
        

    return mult; 
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @powerwordshield Gets a 200% buff if Rapture is active (modified by Exaltation if taken)
 * @ascendedEruption The healing portion also gets a buff based on number of boon stacks on expiry.
 */
const getHealingMult = (state, spellName, conduits) => {
    let mult = 1

    return mult;
}

/** Check if a specific buff is active. Buffs are removed when they expire so this is active buffs only.
 * @param buffs An array of buff objects.
 * @param buffName The name of the buff we're searching for.
 */
const checkBuffActive = (buffs, buffName) => {
    return buffs.filter(function (buff) {return buff.name === buffName}).length > 0;
}


/**
 * This function handles all of our effects that might change our spell database before the ramps begin.
 * It includes conduits, legendaries, and some trinket effects.
 * 
 * @param {*} spells Our spell database
 * @param {*} settings Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @param {*} conduits The conduits run in the current set.
 * @returns An updated spell database with any of the above changes made.
 */
const applyLoadoutEffects = (spells, settings, conduits, state) => {

    // Default Loadout
    // While Top Gear can automatically include everything at once, individual modules like Trinket Analysis require a baseline loadout
    // since if we compare trinkets like Bell against an empty loadout it would be very undervalued. This gives a fair appraisal when
    // we don't have full information about a character.
    // As always, Top Gear is able to provide a more complete picture. 

    if (settings['DefaultLoadout']) {

    }



    return spells;
}

export const runDamage = (state, spell, spellName) => {
    //const activeAtonements = getActiveAtone(atonementApp, t); // Get number of active atonements.
    let damMultiplier = getDamMult(state, state.t, spellName, spell); // Get our damage multiplier (Schism, Sins etc);
    //if ('damageType' in spell && spell.damageType === "physical") damMultiplier *= 0.7
    const damageVal = getSpellRaw(spell, state.currentStats, MONKCONSTANTS) * damMultiplier;

    state.damageDone[spellName] = (state.damageDone[spellName] || 0) + damageVal; // This is just for stat tracking.

    return damageVal;
    //if (reporting) console.log(getTime(state.t) + " " + spellName + ": " + damageVal + ". Buffs: " + JSON.stringify(state.activeBuffs));
}

export const runHeal = (state, spell, spellName, specialMult = 1) => {

    // Pre-heal processing
    const currentStats = state.currentStats;
    
    let healingMult = getHealingMult(state, spellName, state.conduits); 

    const targetMult = ('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.softCap || 1) * spell.targets : spell.targets || 1;
    const healingVal = getSpellRaw(spell, currentStats, MONKCONSTANTS) * (1 - spell.expectedOverheal) * healingMult * targetMult;
    state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal; 

    /*if (spell.mastery) {
        const masteryProc = MONKSPELLS['Gust of Mists'][0];
        runHeal(state, masteryProc, "Gust of Mists")
    }*/

    return healingVal;
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
export const runCastSequence = (sequence, stats, settings = {}, conduits, runcount = 1) => {
    //console.log("Running cast sequence");

    let state = {t: 0, activeBuffs: [], healingDone: {}, damageDone: {}, conduits: {}, manaSpent: 0, settings: settings, conduits: conduits, T284pcwindow: {}}

    let nextSpell = 0;
    let tracker = 0; 
    
    const spells = applyLoadoutEffects(deepCopyFunction(MONKSPELLS), state.settings, state.conduits, state)
    if (state.settings.legendaries.includes("Ancient Teachings of the Monastery"))
    {
        state.activeBuffs.push({name: "Ancient Teachings of the Monastery", buffType: "special", expiration: 999});
    }

    let seq = [...sequence];

    for (var run = 1; run < runcount; run += 1)
    {
        seq = seq.concat(sequence);
    }

    // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    // This is the length of time after a sequence begins that the healing is cut off.
    let sequenceLength = 40; 
    sequenceLength *= runcount;
    const reporting = true; // A flag to report our sequences to console. Used for testing. 

    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {

        const healBuffs = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "function") && state.t >= buff.next})
        
        if (healBuffs.length > 0) {
            healBuffs.forEach((buff) => {
                let currentStats = {...stats};
                state.currentStats = getCurrentStats(currentStats, state.activeBuffs)

                if (buff.buffType === "heal") {
                    const spell = buff.attSpell;
                    runHeal(state, spell, buff.name)
                }
                else if (buff.buffType === "function") {
                    const func = buff.attFunction;
                    func(state);
                }


                buff.next = buff.next + (buff.tickRate / getHaste(state.currentStats));
                //console.log("Buff next: " + buff.next);

    
            });  
        }

        const expiringHots = state.activeBuffs.filter(function (buff) {return buff.buffType === "heal" && state.t >= buff.expiration})
        expiringHots.forEach(buff => {
            const tickRate = buff.tickRate / getHaste(state.currentStats)
            const partialTickPercentage = (buff.next - state.t) / tickRate;
            const spell = buff.attSpell;
            runHeal(state, spell, buff.name, partialTickPercentage)
        })
        // Clear slate of old buffs.
        state.activeBuffs = state.activeBuffs.filter(function (buff) {return state.t < buff.expiration});

        // This is a check of the current time stamp against the tick our GCD ends and we can begin our queued spell.
        // It'll also auto-cast Ascended Eruption if Boon expired.
        if ((state.t > nextSpell && seq.length > 0))  {
            const spellName = seq.shift();
            const fullSpell = spells[spellName];
            

            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...stats};
            state.currentStats = getCurrentStats(currentStats, state.activeBuffs);
            state.manaSpent += (fullSpell[0].cost * state.currentStats.manaMod) || 0;

            // We'll iterate through the different effects the spell has.
            // Smite for example would just trigger damage (and resulting atonement healing), whereas something like Mind Blast would trigger two effects (damage,
            // and the absorb effect).
            fullSpell.forEach(spell => {
                
                // The spell has a healing component. Add it's effective healing.
                // Power Word: Shield is included as a heal, since there is no functional difference for the purpose of this calculation.
                if (spell.type === 'heal') {
                    runHeal(state, spell, spellName)
                }
                
                // The spell has a damage component. Add it to our damage meter, and heal based on how many atonements are out.
                else if (spell.type === 'damage') {
                    //const activeAtonements = getActiveAtone(atonementApp, t); // Get number of active atonements.

                    runDamage(state, spell, spellName)
                }

                // The spell adds a buff to our player.
                // We'll track what kind of buff, and when it expires.
                else if (spell.type === "buff") {
                    if (spell.buffType === "stats" || spell.buffType == "statsMult") {
                        state.activeBuffs.push({name: spellName, expiration: state.t + spell.buffDuration, buffType: spell.buffType, value: spell.value, stat: spell.stat});
                    }
                    else if (spell.buffType === "heal") {
                        const newBuff = {name: spellName, buffType: "heal", attSpell: spell,
                            tickRate: spell.tickRate, next: state.t + (spell.tickRate / getHaste(state.currentStats))}
                        newBuff['expiration'] = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(currentStats)) : state.t + spell.buffDuration

                        state.activeBuffs.push(newBuff)
                    }
                    else if (spell.buffType === "function") {
                        const newBuff = {name: spellName, buffType: "function", attFunction: spell.function,
                            tickRate: spell.tickRate, next: state.t + (spell.tickRate / getHaste(state.currentStats))}
                        newBuff['expiration'] = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(state.currentStats)) : state.t + spell.buffDuration

                        state.activeBuffs.push(newBuff)
                    }
                    else {
                        state.activeBuffs.push({name: spellName, expiration: state.t + spell.buffDuration});
                    }
                }
                else if (spell.type === "special") {
                    
                    spell.runFunc(state);
                }
   

            });   

            // This represents the next timestamp we are able to cast a spell. This is equal to whatever is higher of a spells cast time or the GCD.
            if (!('offGCD' in fullSpell[0])) nextSpell += fullSpell[0].castTime > 0 ? (fullSpell[0].castTime / getHaste(state.currentStats)) : 1.5 / getHaste(state.currentStats);
            //console.log("Current spell: " + spellName + ". Next spell at: " + nextSpell);
        }

        // Get the "real time" of the sequence's casts
        if (seq.length === 0 && state.sequenceLength === undefined) {
            state.sequenceLength = state.t; 
        }
    }


    // Add up our healing values (including atonement) and return it.

    const sumValues = obj => {
        if (Object.values(obj).length > 0) return Object.values(obj).reduce((a, b) => a + b);
        else return 0;
    }
    //printHealing(state.healingDone, sumValues, sequenceLength, state.manaSpent * 50000 / 100);
    //printDamage(state.damageDone, sumValues, sequenceLength, state.manaSpent * 50000 / 100)

    const totalHealing = sumValues(state.healingDone);
    const totalDamage = sumValues(state.damageDone);
    const manaSpent = state.manaSpent * 50000 / 100


    state.hpm = Math.round(totalHealing / manaSpent*100)/100; // Round to 2dp
    state.hps = Math.round(totalHealing / state.sequenceLength * 100)/100;  // Round to 2dp
    state.dps = Math.round(totalDamage / state.sequenceLength * 100)/100;  // Round to 2dp
    state.sequenceLength /= runcount;
    state.totalHealing = Math.round(totalHealing)
    state.total4pcWindow = Math.round(sumValues(state.T284pcwindow))
    state.totalDamage = Math.round(totalDamage)
    return state;

}

const printHealing = (healingDone, sumValues, duration, manaSpent) => {
    const totalHealing = sumValues(healingDone);
    const sources = {}

    for (const heal in healingDone) {
        sources[heal] = (Math.round(healingDone[heal]) + " (" + Math.round(healingDone[heal] / totalHealing * 10000)/100 + "%)")
    }
    console.log(sources);
    console.log("HPS: " + totalHealing / duration + ". HPM: " + totalHealing / manaSpent)
    console.log("Total Mana Spend: " + manaSpent + " (net " + ((duration / 5 * 2000) - manaSpent) + ")");
}

const printDamage = (damageDone, sumValues, duration, manaSpent) => {
    const totalDamage = sumValues(damageDone);
    const sources = {}

    for (const dam in damageDone) {
        sources[dam] = (Math.round(damageDone[dam]) + " (" + Math.round(damageDone[dam] / totalDamage * 10000)/100 + "%)")
    }
    console.log(sources);
    console.log("DPS: " + totalDamage / duration + ". DPM: " + totalDamage / manaSpent)
}


