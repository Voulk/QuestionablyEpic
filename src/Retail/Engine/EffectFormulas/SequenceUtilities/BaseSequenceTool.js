// Import trinket DB
//import { TRINKETSDB } from "../Monk/MistweaverSpellDB";
import { runHeal } from "./SpellSequence";

// Defines all the functions the sequencer uses and all global modifiers
// This is only for functions that can change based on the class.
export default class BaseSequenceTool {
constructor(spellDB = null) { 
    // Set the spellDB for the sequencing tool
    this.spellDB = this.deepCopyFunction(spellDB);
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
        case ("Theotar"): // TODO: Apply token as hps value instead
            state.activeBuffs.push({name: "Token of Appreciation", expiration: false, buffType: "special", value: 1.025}); // 4% is overvalued wwhen factoring in tier and "high HPS sim"
            state.activeBuffs.push({name: "Tea Time", expiration: false, buffType: "special", value: 1.025}); // Int doesn't scale with tier so not 3%, other stats scale worse
            break;
        case ("Kleia"):
            //state.activeBuffs.push({name: "Pointed Courage", expiration: false, buffType: "statsRaw", value: 6, stat: 'crit'});
            //state.activeBuffs.push({name: "Light the Path", expiration: false, buffType: "statsRaw", value: 5, stat: 'crit'});
            state.activeBuffs.push({name: "Kleia", expiration: false, buffType: "stats", value: 385, stat: 'crit'});
            break;
        case ("Pelagos"):
            state.activeBuffs.push({name: "Newfound Resolve", expiration: false, buffType: "statsMult", value: 1 + convertPPMToUptime(1/1.5, 15) * 0.1, stat: 'intellect'});
            break;
        default: 
            // If only there was an option of no cov..
    }

    return state;
}

/**
 * Updates the spellDB to include any new spells. Eg Trinkets.
 * @param {object} extraSpellDB Any additional spells to be added to the main spellDB
 */
addToSpellDB (extraSpellDB) {
    this.spellDB.concat(extraSpellDB);
}

/**
 * Updates the spellDB to include any new spells. Eg Trinkets.
 * @param {object} extraSpellDB Any additional spells to be added to the main spellDB
 */
modifySpellDB (spellName, modifier) {
    this.spellDB.concat(extraSpellDB);
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

    console.log(state.healingDone);
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