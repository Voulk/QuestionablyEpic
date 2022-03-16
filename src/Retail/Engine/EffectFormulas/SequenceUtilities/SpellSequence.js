// General tools
import { convertPPMToUptime } from "Retail/Engine/EffectFormulas/EffectUtilities"
import { applyDiminishingReturns } from "General/Engine/ItemUtilities";
import Player from "General/Modules/Player/Player";

// import { applyPassiveTrinkets, applyActiveTrinkets } from "./Trinket";

// Import all non-class spell DBs for use
///// Trinket spell DB
///// Covenant spell DB

// Import tool for each class
import MonkSequenceTool from "./MonkSequenceTool";

var sequenceTool = null;

// -------------------------------------------------------
// ----         Sequencing setup process          --------
// -------------------------------------------------------

/** Sets up the player info, state and spellDB to use.
 * @param {object} sequenceSettings Settings provided when starting sequence
 * @param {object} playerInfo Player info to be initialized when starting the sequence.
 * @param {object} spec Spec in plain text, if no player provided.
*/
export const startSequence = (sequenceSettings = {}, spec = "NONE", stats = {}) => {
    let extraSpellDB = null;

    // Process sequence settings
    if (sequenceSettings.runCount == null) sequenceSettings.runCount = 1;
    if (sequenceSettings.contentType == null) sequenceSettings.contentType = "Raid";

    // Setup sequenceTool based on spec.
    switch(spec) {
        case ("Holy Paladin"):
            throw {name : "NotImplementedError", message : "Holy Paladin sequence tool not set or implemented"};
            break;
        case ("Restoration Druid"):
            throw {name : "NotImplementedError", message : "Restoration Druid sequence tool not set or implemented"};
            break;
        case ("Restoration Shaman"):
            throw {name : "NotImplementedError", message : "Restoration Shaman sequence tool not set or implemented"};
            break;
        case ("Mistweaver Monk"):
            sequenceTool = new MonkSequenceTool();
            break;
        case ("Discipline Priest"):
            throw {name : "NotImplementedError", message : "Discipline Priest sequence tool not set or implemented"};
            break;
        case ("Holy Priest"):
            throw {name : "NotImplementedError", message : "Holy Priest sequence tool not set or implemented"};
            break;
        default: 
            throw {name : "NotImplementedError", message : "No spec or incorrect spec, supplied: " + spec};
            // Return an error.
    }

    // Setup the state defaults
    let state = {t: 0, activeBuffs: [], healingDone: {}, damageDone: {}, manaSpent: 0, settings: sequenceSettings, tierHealingDone: {}}

    // Setup initial info based on soulbind, trinkets
    state = sequenceTool.applyLoadout(state);
    
    //player.getActiveItems("Trinket").forEach(trinket => {
    //    sequenceTool.applyTrinkets(state, trinket);
    //});
    //sequenceTool.applyConduits(state);

    // Once all relevant setup is completed, then iterate through sequence as required
    if (sequenceSettings.presetSequence) {
        state = runFixedCastSequence(state, stats, sequenceSettings.presetSequence); // Run a preset set of spells, suitable for Disc ramp for example
    }
    else {
        //runDynamicSequence(sequenceSettings) // TODO: Implement
    }

    // Reporting, allows us to get different output for each class as required.
    state.report = sequenceTool.getReport(state, sequenceSettings);

    // Return the state
    return state;
}

// -------------------------------------------------------
// ----         Stats information section         --------
// -------------------------------------------------------

/**
 * Get our players active stats. This is made up of our base stats + any buffs. 
 * Diminishing returns is not in play in this function. It's instead included when we get the stat multiplier itself. 
 * @param {} statArray Our active stats.
 * @param {*} buffs Our active buffs.
 * @returns 
 */
const getCurrentStats = (statArray, buffs) => {
    const statBuffs = buffs.filter(function (buff) {return buff.buffType === "stats"});
    statBuffs.forEach(buff => {
        statArray[buff.stat] = (statArray[buff.stat] || 0) + buff.value;
    });

    statArray = applyDiminishingReturns(statArray);

    // Multiplicative buffs
    const multBuffs = buffs.filter(function (buff) {return buff.buffType === "statsMult"});
    multBuffs.forEach(buff => {
        // Multiplicative Haste buffs need some extra code. 
        if (buff.stat === "haste") statArray["haste"] = ((statArray[buff.stat] / 32 / 100 + 1 * buff.value)-1) * 32 * 100
        else statArray[buff.stat] = (statArray[buff.stat] || 0) * buff.value;
        
    });

    // Additive buffs, eg 0.15 crit
    const rawBuffs = buffs.filter(function (buff) {return buff.buffType === "statsRaw"});
    rawBuffs.forEach(buff => {
        if (buff.stat === "haste") statArray[buff.stat] += buff.value * 32; // This shouldn't be used but for completion.. potentially this should be merged in and other formulas used within the above
        if (buff.stat === "crit") statArray[buff.stat] += buff.value * 35;
        if (buff.stat === "versatility") statArray[buff.stat] += buff.value * 40; 
        if (buff.stat === "mastery") statArray[buff.stat] += buff.value * sequenceTool.getMasteryScaling();
    });

    return statArray;
}

/**
 * Get a spells raw damage or healing. This is made up of it's coefficient, our intellect, and any secondary stats it scales with.
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB.  
 * @param {object} currentStats The current stats of the sim
 * @returns The raw damage or healing of the spell.
 */
 export const getSpellRaw = (spell, currentStats) => {
    return spell.coeff * currentStats.intellect * sequenceTool.getStatMult(currentStats, spell.secondaries); // Multiply our spell coefficient by int and secondaries.
}

/**
 * Get haste multiplier
 * @param {object} stats The current stats of the sim - this is after diminishing returns applied
 * @returns Haste multi (1.x)
 */
export const getHaste = (stats) => {  
    return 1 + stats.haste / 32 / 100;
}

/**
 * Get squareroot scaling
 * @param {object} targets The targets of the spell
 * @param {object} softCap The spell softcap
 * @returns Multiplier
 */
const getSqrt = (targets, softCap = 1) => {
    if (softCap === 1) return Math.sqrt(targets);
    else return Math.min(Math.sqrt(softCap / targets), 1)
}

// -------------------------------------------------------
// ----         Sequencing processes              --------
// -------------------------------------------------------

/**
 * Processes the spells damage, adds to the current state tracking.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 */
export const runDamage = (state, spell) => {
    let damMultiplier = sequenceTool.getDamMult(state, spell); // Get our damage multiplier (Schism, Sins etc);
    let damAddition = sequenceTool.getDamAddition(state, spell);

    // Apply armor to sim
    // TODO: Scale differently for dungeons
    if ('damageType' in spell && spell.damageType === "physical") damMultiplier *= 0.7
    const damageVal = (getSpellRaw(spell, state.currentStats) + damAddition) * damMultiplier;

    // Calculate the damage done
    state.damageDone[spell.name] = (state.damageDone[spell.name] || 0) + damageVal; 

    // This will handle atonement for Disc also
    sequenceTool.getSpecialDamage(state, spell, damageVal);
}

/**
 * Get a spells healing.
 * @param {} state The state for tracking information 
 * @param {} spell The spell being cast. Spell data is pulled from relevant class DB. 
 * @param {} spellName The identifier for the spell
 * @param {} specialMult Special multiplier, for partial ticks
 */
 export const runHeal = (state, spell, spellName, specialMult = 1) => {    
    // Multipliers, including covenant, conduit, tier etc
    // Additions, eg flat healing (Monk T28 4pc) 
    const healingMult = sequenceTool.getHealingMult(state, spell, spellName);
    const healingAddition = sequenceTool.getHealingAddition(state, spell, spellName);

    const targetMult = ('tags' in spell && spell.tags.includes('sqrt')) ? getSqrt(spell.targets, spell.softCap || 1) * spell.targets : spell.targets || 1;
    const healingVal = (getSpellRaw(spell, state.currentStats) + healingAddition) * (1 - spell.overheal) * healingMult * targetMult * specialMult;
    state.healingDone[spellName] = (state.healingDone[spellName] || 0) + healingVal; 

    // Run class specific heal processing
    sequenceTool.getSpecialHealing(state, spell, spellName, healingVal);
}

/**
 * Run a full cast sequence. This is where most of the work happens. It runs through a short ramp cycle in order to compare the impact of different trinkets, soulbinds, stat loadouts,
 * talent configurations and more. Any effects missing can be easily included where necessary or desired. 
 * @param {} state The state information
 * @param {} baseStats The players unbuffed stats
 * @param {} sequence A sequence of spells representing a ramp. Note that in two ramp cycles like alternating Fiend / Boon this function will cover one of the two (and can be run a second
 * time for the other).
 * @returns The expected healing of the full ramp.
 */
export const runFixedCastSequence = (state, baseStats, sequence, runcount = 1) => {
    // Let sequence repeat, for use with sustained healing
    let seq = [...sequence];
    for (var run = 1; run < runcount; run += 1)
    {
        seq = seq.concat(sequence);
    }

    // The length of any given sequence. Note that each ramp is calculated separately and then summed so this only has to cover a single ramp.
    // This is the length of time after a sequence begins that the healing is cut off.
    let nextSpell = 0;    
    let sequenceLength = 40; 
    sequenceLength *= runcount;

    for (var t = 0; state.t < sequenceLength; state.t += 0.01) {
        const healBuffs = state.activeBuffs.filter(function (buff) {return (buff.buffType === "heal" || buff.buffType === "function") && state.t >= buff.next})
        
        if (healBuffs.length > 0) {
            healBuffs.forEach((buff) => {
                let currentStats = {...baseStats};
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
            });  
        }

        // Handle removing of expiring hots
        const expiringHots = state.activeBuffs.filter(function (buff) {return buff.buffType === "heal" && state.t >= buff.expiration && buff.expiration != false})
        expiringHots.forEach(buff => {
            const tickRate = buff.tickRate / getHaste(state.currentStats)
            const partialTickPercentage = (buff.next - state.t) / tickRate;
            const spell = buff.attSpell;
            runHeal(state, spell, buff.name, partialTickPercentage)
        })

        // Handle activating any effects that end on expiry (Eg Lifebloom)
        const expiringActivation = state.activeBuffs.filter(function (buff) {return buff.buffType === "expiry" && state.t >= buff.expiration && buff.expiration != false})
        expiringActivation.forEach(buff => {
            const func = buff.attFunction;
            func(state);
        })

        // Clear slate of old buffs.
        state.activeBuffs = state.activeBuffs.filter(function (buff) {return state.t < buff.expiration || buff.expiration === false});

        // This is a check of the current time stamp against the tick our GCD ends and we can begin our queued spell.
        // It'll also auto-cast Ascended Eruption if Boon expired.
        if ((state.t > nextSpell && seq.length > 0))  {
            const spellName = seq.shift();
            const fullSpell = sequenceTool.spellDB[spellName];
            
            // Update current stats for this combat tick.
            // Effectively base stats + any current stat buffs.
            let currentStats = {...baseStats};
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
                    else if (spell.buffType === "heal" || spell.buffType === "damage") {
                        
                        // Simple initial tick implementation
                        if (spell.initialTick) {
                            if (spell.buffType === "heal") runHeal(state, spell, spellName);
                            if (spell.buffType === "damage") runDamage(state, spell, spellName);
                        }

                        const newBuff = {name: spellName, buffType: spell.buffType, attSpell: spell,
                            tickRate: spell.tickRate, next: state.t + (spell.tickRate / getHaste(state.currentStats))}
                        newBuff['expiration'] = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(state.currentStats)) : state.t + spell.buffDuration

                        state.activeBuffs.push(newBuff)
                    }
                    else if (spell.buffType === "function") {
                        const newBuff = {name: spellName, buffType: "function", attFunction: spell.function,
                            tickRate: spell.tickRate, next: state.t + (spell.tickRate / getHaste(state.currentStats))}
                        newBuff['expiration'] = spell.hastedDuration ? state.t + (spell.buffDuration / getHaste(state.currentStats)) : state.t + spell.buffDuration

                        state.activeBuffs.push(newBuff)
                    }
                    else if (spell.buffType === "expiry") {
                        const newBuff = {name: spellName, expiration: state.t + spell.buffDuration, buffType: "expiry"};
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

        }

        // Get the "real time" of the sequence's casts
        if (seq.length === 0 && state.sequenceLength === undefined) {
            state.sequenceLength = state.t; 
        }
    }

    return state;
}

/*
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
}*/



