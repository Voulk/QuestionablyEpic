// Import trinket DB
//import { TRINKETSDB } from "../Monk/MistweaverSpellDB";
import { convertPPMToUptime } from "../EffectUtilities";
import { runHeal } from "./SpellSequence";
import { trinket_data } from "../Generic/TrinketData";

// Defines all the functions the sequencer uses and all global modifiers
// This is only for functions that can change based on the class.
export default class BaseSequenceTool {
constructor(state, spellDB = null, player = null, talents = {}, conduits = [], conduitInfo = {}) { 
    // Set the spellDB for the sequencing tool
    this.spellDB = this.deepCopyFunction(spellDB);
    this.player = player; // This is to use player functions, like default stat weights
    this.talents = talents; // Talents and conduits applied here to cover anything that may affect non-class specific things.
    this.conduits = this.setupConduits(state, conduitInfo, conduits);
    this.applyLoadout(state);
}

// -------------------------------------------------------
// ----         Spell healing calc section        --------
// -------------------------------------------------------

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 */
getHealingMult(state, spell, spellName) {
    let mult = 1;

    const multiplierBuffList = ["Dream Delver", "Token of Appreciation", "Tea Time"];

    multiplierBuffList.forEach(buffName => {
        if (this.checkBuffActive(state.activeBuffs, buffName)) 
    {
        mult *= state.activeBuffs.filter(function (buff) {return buff.name === buffName})[0].value;
    }
    });

    return mult;
}

/** A healing spells healing addition. Adds this healing to the spell's raw healing.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 */
getHealingAddition (state, spell, spellName) {
    let addition = 0;
    return addition;
}

/** Special healing to be done based on the initial heal, eg Monk Mastery, Bonedust Brew
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 * @param {object} value The precalculated healing of the related spell.
 */
getSpecialHealing (state, spell, spellName, value) {
    if (this.checkBuffActive(state.activeBuffs, "Empowered Chrysalis")) {
        const chrysalisSize = (value / (1 - spell.overheal) * spell.overheal * 0.1)
        state.healingDone['Empowered Chrysalis'] = (state.healingDone['Empowered Chrysalis'] || 0) + chrysalisSize;
    }
}

// -------------------------------------------------------
// ----         Spell damage calc section         --------
// -------------------------------------------------------

/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
*/
getDamMult (state, spell, spellName) {
    let mult = 1;
    return mult;
}

/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
*/
getDamAddition (state, spell, spellName) {
    let addition = 0;
    return addition;
}

/** Special damage to be done based on the initial heal, eg Monk Bonedust Brew
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 * @param {object} value The precalculated damage of the related spell. 
 */
getSpecialDamage (state, spell, spellName, value) {
    
}

// -------------------------------------------------------
// ----         Special functions required        --------
// -------------------------------------------------------

/** Spend mana, this handles specific functions that scale off of that value
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 * @returns The mana spent by the spell
 */
spendMana (state, spell) {
    const manaSpent = (spell[0].cost * state.currentStats.manaMod) || 0;

    // Track mana for Manabound Mirror.
    const manaboundMirrorBuff = state.activeBuffs.filter(function (buff) {return buff.name === "Manabound Mirror"}).length;
    if (manaboundMirrorBuff != 0) {
        const buff = state.activeBuffs.filter(buff => buff.name === "Manabound Mirror")[0]
        buff.stacks += manaSpent * buff.coefficient;
        if (buff.stacks > buff.coefficient * 10) buff.stacks = buff.coefficient * 10;
    }

    return manaSpent;
}

/** Add the conduit info to the conduits list
 * @param {*} conduitInfo The info for a class' conduits
 * @param {*} conduits The list of desired conduits
 * @returns Returns the list of active conduits and effects
 */
 setupConduits (state, conduitInfo, conduits) {
    conduits.forEach(conduit => {
        if (conduitInfo[conduit.name]) {
            conduitInfo[conduit][0].value = conduitInfo[conduit][0].base + conduitInfo[conduit][0].coeff * state.settings.conduitsRank;
        } 
    });    

    return conduitInfo; 
 }

/** Get the conduit's value
 * @param {*} conduitName The conduit's name
 * @param {*} secondaryValue To get secondary value
 * @returns Returns the added multiplier for the value eg 0.05
 */
 getConduitMult(conduitName, secondaryValue = false) {
    if (secondaryValue) return this.conduits[conduitName][0].secondaryValue;
    return this.conduits[conduitName][0].value;
 }

// -------------------------------------------------------
// ----         Stats information section         --------
// -------------------------------------------------------

/**
 * Returns a spells stat multiplier based on which stats it scales with.
 * @param {*} statArray A characters current stats including any active buffs.
 * @param {*} stats The secondary stats a spell scales with. Pulled from it's SpellDB entry.
 * @returns An effective multiplier. For a spell that scales with both crit and vers this would just be crit x vers.
 */
getStatMult (currentStats, stats) {
    let mult = 1;
    if (stats.includes("vers")) mult *= (1 + currentStats['versatility'] / 40 / 100);
    if (stats.includes("crit")) mult *= (1.05 + currentStats['crit'] / 35 / 100);
    // Mastery calculated within each class
    return mult;
}

/** Check if a specific buff is active. Buffs are removed when they expire so this is active buffs only.
 * @param buffs An array of buff objects.
 * @param buffName The name of the buff we're searching for.
 */
checkBuffActive (buffs, buffName) {
    return buffs.filter(function (buff) {return buff.name === buffName}).length > 0;
}

// -------------------------------------------------------
// ----         Apply loadout info                --------
// -------------------------------------------------------
/**
 * This function handles all specific updates regarded to specific soulbinds.
 * 
 * @param {object} state The state for tracking information, includes the spec
 * @returns An updated state
 */
applyLoadout (state) {
    switch(state.settings.soulbind) {
        case ("Dreamweaver"):
            state.activeBuffs.push({name: "Empowered Chrysalis", expiration: false, buffType: "special", value: 0.15}); // 15% overhealing
            state.activeBuffs.push({name: "Dream Delver", expiration: false, buffType: "special", value: 1.03});
            break;
        case ("Theotar"): 
            // Add token healing
            const tokenHeal = { type: "heal", coeff: 1.5 * 1.04, overheal: 0.05, secondaries: ['vers'], targets: 4};
            const tickRate = 20;
            const newBuff = {name: "Token of Appreciation", buffType: "heal", attSpell: tokenHeal,
                tickRate: tickRate, next: state.t + tickRate}
            newBuff['expiration'] = false;
            state.activeBuffs.push(newBuff);
            
            state.activeBuffs.push({name: "Tea Time", expiration: false, buffType: "statsMult", value: 1.03, stat: "int"}); // Int doesn't scale with tier so not 3%, other stats scale worse
            break;
        case ("Kleia"):
            state.activeBuffs.push({name: "Pointed Courage", expiration: false, buffType: "statsRaw", value: 6, stat: 'crit'});
            state.activeBuffs.push({name: "Light the Path", expiration: false, buffType: "statsRaw", value: 5, stat: 'crit'});
            // state.activeBuffs.push({name: "Kleia", expiration: false, buffType: "stats", value: 385, stat: 'crit'});
            break;
        case ("Pelagos"):
            state.activeBuffs.push({name: "Newfound Resolve", expiration: false, buffType: "statsMult", value: 1 + convertPPMToUptime(1/1.5, 15) * 0.1, stat: 'intellect'});
            break;
        default: 
            // If only there was an option of no cov..
    }

    state = this.applyTrinkets(state);

    return state;
}

/**
 * Updates the spellDB to include any new spells (if there is some shared spells?)
 * @param {object} extraSpellDB Any additional spells to be added to the main spellDB
 */
addToSpellDB (extraSpellDB) {
    this.spellDB.push(extraSpellDB);
}

// -------------------------------------------------------
// ----         Trinkets section                  --------
// -------------------------------------------------------

/**
 * Updates the spellDB to include required trinkets
 * @param {object} trinket Trinket info as provided by the state settings
 */
addTrinketToSpellDB (state, trinket, trinketEffect) {
    let value = trinketEffect.coefficient * trinket.ilvl;
    if (trinketEffect.multiplier) value *= trinketEffect.multiplier;
    if (trinketEffect.efficiency) value *= trinketEffect.efficiency;
    if (trinketEffect.meteor && trinketEffect.aoeMult === "meteor") value = (value + trinketEffect.targets[state.sequenceSettings.contentType] * trinketEffect.meteor) / trinketEffect.targets;
    let newTrinket = null;

    if(!this.spellDB[trinket.name]){
        if(trinketEffect.type === "stats") { // Handle stats - don't think there is stat multi or raw stats?
            newTrinket = { "Trinket": [{
                type: "buff",
                castTime: 0, 
                cost: 0,
                offGCD: true,
                cooldown: trinketEffect.cooldown,
                buffDuration: trinketEffect.duration,
                buffType: trinketEffect.type,
                stat: trinketEffect.stat,
                value: value, // Trinket values are replaced by the value on the specific version of the trinket.
            }],};
        } else if (trinketEffect.type === "heal" || trinketEffect.type === "damage") { // TODO: Add all this info to all the trinkets / do full trinket pass.
            newTrinket = { "Trinket": [{
                trinket: true, // Allows us to prevent certain healing multipliers being applied
                type: trinketEffect.type,
                damageType: trinketEffect.damageType, 
                castTime: 0, 
                cost: 0,
                offGCD: true,
                cooldown: trinketEffect.cooldown,
                buffDuration: trinketEffect.duration,
                tickRate: trinketEffect.tickRate,
                hastedDuration: trinketEffect.hastedDuration,
                targets: trinketEffect.targets,
                value: value, // Trinket values are replaced by the value on the specific version of the trinket.
                overheal: trinketEffect.overheal ? trinketEffect.overheal : 0,
                secondaries: trinketEffect.secondaries
            }],};
        } else if (trinketEffect.type === "manareturn") {
            newTrinket = { "Trinket": [{
                type: "manareturn",
                castTime: 0, 
                cost: -value,
                offGCD: true,
                cooldown: trinketEffect.cooldown,
            }],};
        } else if (trinketEffect.type === "special") {
            if (trinket.name === "Manabound Mirror") {
                newTrinket = { "Trinket": [{
                    trinket: true, // Allows us to prevent certain healing multipliers being applied
                    type: "heal",
                    castTime: 0, 
                    cost: 0,
                    offGCD: true,
                    cooldown: 60,
                    value: 0, // Trinket values are replaced by the value on the specific version of the trinket.
                    secondaries: ['crit', 'vers']
                }],
                    type: "special", 
                    runFunc: function (state) {
                        const buff = state.activeBuffs.filter(buff => buff.name === "Manabound Mirror")[0]
                        const spell = { trinket: true, type: "heal", value: buff.stacks, overheal: 0.4, secondaries: ['crit', 'vers'], targets: 1} 
                        runHeal(state, spell, "Manabound Mirror");
                    }};
                
                state.activeBuffs.push({name: "Manabound Mirror", expiration: false, buffType: "special", value: 0, coefficient: trinketEffect.coefficient * trinket.ilvl});
            }
        } else {
            throw {name : "NotImplementedError", message : "Trinket type not covered or trinket not implemented"};  // Not sure if there are other trinkets that will need to be caught. 
        }

        this.spellDB[trinket.name] = newTrinket["Trinket"];
    } else { // Same as the above just pushing instead of creating new trinket.
        if(trinketEffect.type === "stats") { // Handle stats - don't think there is stat multi or raw stats?
            newTrinket = { "Trinket": [{
                type: "buff",
                castTime: 0, 
                cost: 0,
                offGCD: true,
                cooldown: trinketEffect.cooldown,
                buffDuration: trinketEffect.duration,
                buffType: trinketEffect.type,
                stat: trinketEffect.stat,
                value: value, // Trinket values are replaced by the value on the specific version of the trinket.
            }],};
        } else if (trinketEffect.type === "heal" || trinketEffect.type === "damage") { // TODO: Add all this info to all the trinkets / do full trinket pass.
            newTrinket = { "Trinket": [{
                type: trinketEffect.type,
                damageType: trinketEffect.damageType, 
                castTime: 0, 
                cost: 0,
                offGCD: true,
                cooldown: trinketEffect.cooldown,
                buffDuration: trinketEffect.duration,
                initialTick: trinketEffect.initialTick,
                tickRate: trinketEffect.tickRate,
                hastedDuration: trinketEffect.hastedDuration,
                buffType: trinketEffect.type,
                stat: trinketEffect.stat,
                targets: trinketEffect.targets,
                value: value, // Trinket values are replaced by the value on the specific version of the trinket.
                overheal: trinketEffect.overheal ? trinketEffect.overheal : 0,
                secondaries: trinketEffect.secondaries
            }],};
        } else if (trinketEffect.type === "manareturn") {
            newTrinket = { "Trinket": [{
                type: "manareturn",
                castTime: 0, 
                cost: trinketEffect.duration > 0 ? trinketEffect.duration * -value : -value,
                offGCD: true,
                cooldown: trinketEffect.cooldown,
            }],};
        } else if (trinketEffect.type === "special") {
            if (trinket.name === "Manabound Mirror") this.spellDB[trinket.name][0].value = value; // Raw healing for manabound is in second part of trinket data      
        } else {
            throw {name : "NotImplementedError", message : "Trinket type not covered or trinket not implemented"};  // Not sure if there are other trinkets that will need to be caught. 
        }
    }

    return;
}


/**
 * Updates the state to apply passive trinket buffs
 * @param {object} trinket Trinket info as provided by the state settings
 */
 addPassiveTrinket (state, trinket, trinketEffect) {
    let value = trinketEffect.coefficient * trinket.ilvl;

    if (trinketEffect.type === "stats") {
        if (trinketEffect.multiplier && trinket.name != "Cabalist's Hymnal") value *= trinketEffect.multiplier;
        if (trinketEffect.efficiency) value *= trinketEffect.efficiency;
        if (trinketEffect.meteor && trinketEffect.aoeMult === "meteor") value = (value + trinketEffect.targets[state.sequenceSettings.contentType] * trinketEffect.meteor) / trinketEffect.targets;
        
        let newTrinket = {name: trinket.name, expiration: false, buffType: "stats", value: value, stat: trinketEffect.stat};  
        if (newTrinket.stat === "highestWeight") newTrinket.stat = this.player.getHighestStatWeight(contentType, trinketEffect.exclude);
        // TODO: Implement highestStat dynamically
        if (newTrinket.stat === "highest") newTrinket.stat = this.player.getHighestStatWeight(contentType, trinketEffect.exclude);

        newTrinket.value *= convertPPMToUptime(trinketEffect.ppm, trinketEffect.duration); 
        state.activeBuffs.push(newTrinket);
    } else if (trinketEffect.type === "heal" || trinketEffect.type === "damage") {
        const trinketHeal = { type: trinketEffect.type, value: value, overheal: 1 - trinketEffect.efficiency, secondaries: trinketEffect.secondaries, targets: trinketEffect.targets};
        if (trinketEffect.type === "damage") trinketHeal.value *= trinketEffect.efficiency;
        const tickRate = trinketEffect.hastedPPM ? trinketEffect.ppm * getHaste(state.currentStats) / 60 : trinketEffect.ppm / 60;

        const newBuff = {name: trinket.name, buffType: trinketEffect.type, attSpell: trinketHeal,
            tickRate: tickRate, next: state.t + (tickRate / getHaste(state.currentStats))}
        newBuff['expiration'] = false;

        state.activeBuffs.push(newBuff);
    }

    return state;
 }

                    
/**
 * Updates the spellDB and state to include required trinkets
 * @param {object} state The state to take settings
 * @returns The updated state
 */
applyTrinkets (state) {
    const trinket1 = state.settings.trinket1;
    const trinket2 = state.settings.trinket2;
    let trinketFound = false;
    this.checkNotImplementedTrinkets(trinket1, trinket2);
    
    if (trinket1) {        
        for(var i = 0; i < trinket_data.length; i++) { // Handle passive sections
            if (trinket_data[i].name === trinket1.name) {
                trinketFound = true;
                trinket_data[i].effects.forEach(effect => {
                    if (effect.cooldown) { // This is an on-use trinket effect
                        this.addTrinketToSpellDB(state, state.settings.trinket1, effect);
                    } else if (effect.ppm) { // This is a passive trinket effect
                        state = this.addPassiveTrinket(state, state.settings.trinket1, effect);
                    } 
                });
                break;
            }
        }

        if(!trinketFound) throw {name : "NotImplementedError", message : trinket1.name + " not implemented or wrong name."}; 
    }

    trinketFound = false;
    if (trinket2) {        
        for(var i = 0; i < trinket_data.length; i++) { // Handle passive sections
            if (trinket_data[i].name === trinket2.name) {
                trinketFound = true;
                trinket_data[i].effects.forEach(effect => {
                    if (effect.cooldown) { // This is an on-use trinket effect
                        this.addTrinketToSpellDB(state, state.settings.trinket2, effect);
                    } else if (effect.ppm) { // This is a passive trinket effect
                        state = this.addPassiveTrinket(state, state.settings.trinket1, effect);
                    } 
                });
                break;
            }
        }

        if(!trinketFound) throw {name : "NotImplementedError", message : trinket2.name + " not implemented or wrong name."}; 
    }

    return state;
}

// Catch trinkets that aren't implemented / won't be easily implemented.
// Also trinkets that aren't worth implementing right now
checkNotImplementedTrinkets(trinket1, trinket2) {
    const notImplemented = ["Consumptive Infusion", "Spark of Hope", "Price of Progress", "Jaws of Defeat", "Necromantic Focus", "Scrawled Word of Recall", "Reclaimer's Intensity Core", "Scars of Fraternal Strife", "The Lion's Roar"];
    const manareturnTrinkets = ["Show of Faith", "Memento of Tyrande", "Amalgam's Seventh Spine"]; // Passive mana returns
    if (trinket1) {
        if(trinket1.name === "Eye of the Broodmother" || trinket1.name === "So'leah's Secret Technique") throw {name : "NotImplementedError", message : "Include " + trinket1.name + "'s effect as a passive int bonus."};  
        if(notImplemented.includes(trinket1.name)) throw {name : "NotImplementedError", message : trinket1.name + " not implemented due to complexity / unique effect."};  
        if(manareturnTrinkets.includes(trinket1.name)) throw {name : "NotImplementedError", message : "Passive ManaRestore trinkets (" + trinket1.name + ") not yet implemented."};  
    }

    if (trinket2) {
        if(trinket2.name === "Eye of the Broodmother" || trinket2.name === "So'leah's Secret Technique") throw {name : "NotImplementedError", message : "Include " + trinket2.name + "'s effect as a passive int bonus."};  
        if(notImplemented.includes(trinket2.name)) throw {name : "NotImplementedError", message : trinket2.name + " not implemented due to complexity / unique effect."};  
        if(manareturnTrinkets.includes(trinket2.name)) throw {name : "NotImplementedError", message : "Passive ManaRestore trinkets (" + trinket2.name + ") not yet implemented."};  
    }
}

// -------------------------------------------------------
// ----         Reporting                         --------
// -------------------------------------------------------
/**
 * Get the report of summarized info
 * @param {object} sequenceSettings Settings provided to the sequence
 * @returns The text report
 */
getReport (state, sequenceSettings) {
    // TODO: Move this into reporting function
    const totalHealing = this.sumValues(state.healingDone);
    const totalDamage = this.sumValues(state.damageDone);
    const manaSpent = state.manaSpent * 50000 / 100


    state.hpm = Math.round(totalHealing / manaSpent*100)/100; // Round to 2dp
    state.hps = Math.round(totalHealing / state.sequenceLength * 100)/100;  // Round to 2dp
    state.dps = Math.round(totalDamage / state.sequenceLength * 100)/100;  // Round to 2dp
    state.sequenceLength /= sequenceSettings.runCount;
    state.totalHealing = Math.round(totalHealing)
    state.totalDamage = Math.round(totalDamage)

    //console.log(state.healingDone);
    return "Test log: " + totalHealing;
}

// Returns summed value
sumValues (obj) {
    if (Object.values(obj).length > 0) return Object.values(obj).reduce((a, b) => a + b);
    else return 0;
}

// This is a boilerplate function that'll let us clone our spell database to avoid making permanent changes.
deepCopyFunction = (inObject) => {
    let outObject, value, key;
  
    if (typeof inObject !== "object" || inObject === null) {
      return inObject; // Return the value if inObject is not an object
    }
  
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
  
    for (key in inObject) {
      value = inObject[key];
  
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = this.deepCopyFunction(value);
    }
  
    return outObject;
  };

}