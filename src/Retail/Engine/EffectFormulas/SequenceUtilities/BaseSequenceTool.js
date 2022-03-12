// Defines all the functions the sequencer uses and all global modifiers
// This is only for functions that can change based on the class.
export default class BaseSequenceTool {
constructor() { 
    // Set the spellDB for the sequencing tool
    this.spellDB = [];
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
 */
static getSpecialHealing = (state, spell) => {
    // Call specific functions based on the spec
    // Done within inherited classes.
    return state;
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

}