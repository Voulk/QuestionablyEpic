// Import trinket DB
//import { TRINKETSDB } from "../Monk/MistweaverSpellDB";

// Defines all the functions the sequencer uses and all global modifiers
// This is only for functions that can change based on the class.
export default class BaseSequenceTool {
constructor(spellDB = null) { 
    // Set the spellDB for the sequencing tool
    this.spellDB = spellDB;
}

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 */
static getHealingMult = (state, spell) => {
    let mult = 1;
    return mult;
}

/** A healing spells healing addition. Adds this healing to the spell's raw healing.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 */
static getHealingAddition = (state, spell) => {
    let mult = 1;
    return mult;
}

/** Special healing to be done based on the initial heal, eg Monk Mastery, Bonedust Brew
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 * @param {object} value The precalculated healing of the related spell.
 */
static getSpecialHealing = (state, spell, value) => {
    // Call specific functions based on the spec
    // Done within inherited classes.
}

// -------------------------------------------------------
// ----         Spell damage calc section         --------
// -------------------------------------------------------

/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
*/
static getDamMult = (state, spell) => {
    let mult = 1;
    return mult;
}

/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
*/
static getDamAddition = (state, spell) => {
    let mult = 1;
    return mult;
}

/** Special damage to be done based on the initial heal, eg Monk Bonedust Brew
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 * @param {object} value The precalculated damage of the related spell. 
 */
static getSpecialDamage = (state, spell, value) => {
    
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
static getStatMult = (currentStats, stats) => {
    let mult = 1;
    if (stats.includes("vers")) mult *= (1 + currentStats['versatility'] / 40 / 100);
    if (stats.includes("crit")) mult *= (1.05 + currentStats['crit'] / 35 / 100);
    // Mastery calculated within each class
    return mult;
}

// -------------------------------------------------------
// ----         Apply loadout info                --------
// -------------------------------------------------------
/**
 * This function handles all specific updates regarded to specific soulbinds.
 * 
 * @param {object} state The state for tracking information, includes the spec
 * @param {*} soulbind Settings including legendaries, trinkets, soulbinds and anything that falls out of any other category.
 * @returns An updated state
 */
 applyBaseSoulbind = (state, soulbind) => {
    switch(soulbind) {
        case ("Dreamweaver"):
            // Field of Blossoms
            switch(state.spec) {
                case ("Mistweaver Monk"):
                    spells['Faeline Stomp'].push({
                        type: "buff",
                        buffType: "statsMult",
                        stat: 'haste',
                        value: 1.15,
                        buffDuration: 6,
                    });
                break;
            }

            state.activeBuffs.push({name: "Empowered Chrysalis", expiration: 999, buffType: "special", value: 0.1});
            state.activeBuffs.push({name: "Dream Delver", expiration: 999, buffType: "special", value: 1.03});
            break;
        case ("Restoration Druid"):
            break;
        case ("Restoration Shaman"):
            break;
        case ("Mistweaver Monk"):
            spellDB = MONKSPELLS;
            break;
        case ("Discipline Priest"):
            break;
        case ("Holy Priest"):
            break;
        default: 
            // Return an error.
    }
}

/**
 * Updates the state to apply any persistant effects. 
 * @param {object} state The state for tracking information 
 * @returns The updated state.
 */
applyClassEffects = (state) => {
    return state;
}

/**
 * Updates the spellDB to include any new spells. Eg Trinkets.
 * @param {object} extraSpellDB Any additional spells to be added to the main spellDB
 */
addToSpellDB = (extraSpellDB) => {
    this.spellDB.concat(extraSpellDB);
}

/**
 * Updates the spellDB to include any new spells. Eg Trinkets.
 * @param {object} extraSpellDB Any additional spells to be added to the main spellDB
 */
modifySpellDB = (spellName, modifier) => {
    this.spellDB.concat(extraSpellDB);
}

/**
 * Get the covenant ability name, used to modify spellDB
 * @param {object} covenant The covenant in question
 */
getCovenantAbilityName = (covenant) => {
    return "NONE";
}

// -------------------------------------------------------
// ----         Spell damage calc section         --------
// -------------------------------------------------------
/**
 * Get the report of summarized info
 * @param {object} sequenceSettings Settings provided to the sequence
 * @returns The text report
 */
getReport = (state, sequenceSettings) => {
    const sumValues = obj => {
        if (Object.values(obj).length > 0) return Object.values(obj).reduce((a, b) => a + b);
        else return 0;
    }
    // TODO: Move this into reporting function
    const totalHealing = sumValues(state.healingDone);
    const totalDamage = sumValues(state.damageDone);
    const manaSpent = state.manaSpent * 50000 / 100


    state.hpm = Math.round(totalHealing / manaSpent*100)/100; // Round to 2dp
    state.hps = Math.round(totalHealing / state.sequenceLength * 100)/100;  // Round to 2dp
    state.dps = Math.round(totalDamage / state.sequenceLength * 100)/100;  // Round to 2dp
    state.sequenceLength /= sequenceSettings.runCount;
    state.totalHealing = Math.round(totalHealing)
    state.totalDamage = Math.round(totalDamage)

    return "Test log: " + state.hpm;
}}