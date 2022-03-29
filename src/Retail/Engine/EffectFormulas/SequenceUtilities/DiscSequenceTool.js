// Import spell DB
import { DISCSPELLSNEW } from "./DiscSpellDBNew";
import { runHeal } from "./SpellSequence"; // TODO: Find out if there is a way to import this as part of importing base sequence tool.
import BaseSequenceTool from "./BaseSequenceTool";
import Player from "General/Modules/Player/Player";
import { checkBuffActive, getBuffs } from "./SpellSequence";

// Default talents
// TODO: Update talents and conduits
const defaultTalents = ["Chi Burst", "Chi Torpedo", "Mana Tea", "Ring of Peace", "Diffuse Magic", "Refreshing Jade Wind", "Rising Mist"];
const defaultConduits = ["Mind Blast"];
const discConduits = { // Secondaries are listed just to ensure the values are easy to modify if they somehow change and once this is removed conduits don't have any effect
    "Adaptive Armor Fragment": [{value: 0, base: 0.018, coeff: 0.002, secondaryValue: 1/2}], // Uptime
    "Condensed Anima Sphere": [{value: 0, base: 0.0225, coeff: 0.0025, secondaryValue: 6}],  // PPM
    "Jade Bond": [{value: 0, base: 0.057, coeff: 0.006, secondaryValue: 0.3}],               // CDR
    "Rising Sun Revival": [{value: 0, base: 0.112, coeff: 0.13, secondaryValue: 1}],         // RSK CDR, x10 for duration
    "Nourishing Chi": [{value: 0, base: 0.169, coeff: 0.19, secondaryValue: 6}],             // Duration
    "Resplendent Mist": [{value: 0, base: 0.45, coeff: 0.05, secondaryValue: 0.3}],          // Multiplier 
    "Strike with Clarity": [{value: 0, base: 4.725, coeff: 0.525, secondaryValue: 5}],       // Duration
    "Bone Marrow Hops": [{value: 0, base: 0.36, coeff: 0.04, secondaryValue: 2.5}],          // CDR
    "Way of the Fae": [{value: 0, base: 0.189, coeff: 0.21, secondaryValue: 5}],             // Target cap
    "Imbued Reflections": [{value: 0, base: 0.327, coeff: 0.36, secondaryValue: 0}],         // None
    "Fortifying Ingredients": [{value: 0, base: 0.108, coeff: 0.12, secondaryValue: 15}],    // Duration
    "Harm Denial": [{value: 0, base: 0.225, coeff: 0.25, secondaryValue: 0}],                // None
    "Grounding Breath": [{value: 0, base: 0.132, coeff: 0.018, secondaryValue: 0.3}],        // Mana return chance (no cooldown factored here)
    "Dizzying Tumble": [{value: 0, base: 0.057, coeff: 0.006, secondaryValue: 5}],           // Duration
    // Not mentioned / 0 effect : Lingering Numbness, Swift Transference, Tumbling Technique
};
var atonements = [];

export default class DiscSequenceTool extends BaseSequenceTool {
constructor(state, talents, conduits) { 
    super(state, DISCSPELLSNEW, new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf"), talents ? talents : defaultTalents, conduits ? conduits : defaultConduits, discConduits); 
}

// -------------------------------------------------------
// ----         Class specific tools              --------
// -------------------------------------------------------

/**
 * Returns a spells stat multiplier based on which stats it scales with. Handles class mastery.
 * @param {*} statArray A characters current stats including any active buffs.
 * @param {*} stats The secondary stats a spell scales with. Pulled from it's SpellDB entry.
 * @returns An effective multiplier. For a spell that scales with both crit and vers this would just be crit x vers.
 */
getStatMult (currentStats, stats) {
    let mult = super.getStatMult(currentStats, stats);
    if (stats.includes("mastery")) mult *= 1.108 + currentStats['mastery'] * this.getMasteryScaling();
    return mult;
}

/**
 * @returns Returns per point mastery scaling
 */
getMasteryScaling() {
    return 25.9259 / 100;
}

// -------------------------------------------------------
// ----         Spell healing calc section        --------
// -------------------------------------------------------

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 */
 getHealingMult(state, spell, spellName) {
    let mult = super.getHealingMult(state, spell, spellName);

    // TODO: Implement properly
    if (conduits['Courageous Ascension']) discSpells['Ascended Blast'][0].coeff *= 1.45; // Blast +40%, Eruption +1% per stack (to 4%)
    if (conduits['Shining Radiance']) discSpells['Power Word: Radiance'][0].coeff *= 1.64; // +64% radiance healing
    if (conduits['Rabid Shadows']) discSpells['Shadowfiend'][0].dot.tickRate = discSpells['Shadowfiend'][0].dot.tickRate / 1.342; // Fiends faster tick rate.
    if (conduits['Exaltation']) {
        discSpells['Rapture'][1].buffDuration = 9;
        discSpells['Rapture'][0].coeff = 1.65 * (1 + 2 * 1.135);
    }

    // Apply atonements
    if (spell.atonement) {
        for (var i = 0; i < spell.targets; i++) {
            let atoneDuration = spell.atonement;
            if (settings['Clarity of Mind'] && (spellName === "Power Word: Shield") && checkBuffActive(activeBuffs, "Rapture")) atoneDuration += 6;
            if (spell.atonementPos === "start") atonementApp.push(t + atoneDuration);
            else if (spell.atonementPos === "end") atonementApp.push(t + spell.castTime + atoneDuration);
        }
    }

    return mult;
}

/** A healing spells healing addition. Adds this healing to the spell's raw healing.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 */
getHealingAddition (state, spell, spellName) {
    let addition = super.getHealingAddition(state, spell, spellName);

    return addition;
}

/** Special healing to be done based on the initial heal, eg Monk Mastery, Bonedust Brew
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 * @param {object} value The precalculated healing of the related spell.
 */
getSpecialHealing (state, spell, spellName, value) {
    super.getSpecialHealing(state, spell, spellName, value);
}

// -------------------------------------------------------
// ----         Spell damage calc section         --------
// -------------------------------------------------------

/** A spells damage multiplier. It's base damage is directly multiplied by anything the function returns.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
*/
getDamMult (state, spell, spellName) {
    let mult = super.getDamMult(state, spell, spellName);

    // Add boon stacks / do the multiplication on eruption
    // TODO: Check against the expiry buff for Boon
    if (spellName === "Ascended Blast") {
        boonOfTheAscended += 5 / 2;
    } else if (spellName === "Ascended Nova") {
        boonOfTheAscended += 1 / 2;
    }
    
    if (spellName === "Ascended Eruption") {
        if (conduits['Courageous Ascension']) mult = mult * (1 + boonStacks * 0.04);
        else mult = mult * (1 + boonStacks * 0.03);
    }

    // Apply talent scaling
    if (checkBuffActive(state.activeBuffs, "Schism")) mult *= 1.25;
    if (super.hasTalent("Sins of the Many")) {
        const sins = {0: 1.12, 1: 1.12, 2: 1.1, 3: 1.08, 4: 1.07, 5: 1.06, 6: 1.05, 7: 1.05, 8: 1.04, 9: 1.04, 10: 1.03};
        mult *= atonements > 10 ? 1.03 : sins[atonements];
    }

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

/** Special damage to be done based on the initial heal, eg Atonement
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 * @param {object} value The precalculated damage of the related spell. 
 */
getSpecialDamage (state, spell, spellName, value) {
    super.getSpecialDamage(state, spell, spellName, value);

    const activeAtonements = getActiveAtone(state.t); // Get number of active atonements.
    const atonementHealing = activeAtonements * value * 0.5 * getStatMult(currentStats, "mastery") * (1 - spell.atoneOverheal)
    state.healingDone['atonement'] = (state.healingDone['atonement'] || 0) + atonementHealing; 
}

// -------------------------------------------------------
// ----         Apply loadout info                --------
// -------------------------------------------------------
/**
 * Updates the state to apply any persistant effects. 
 * @param {object} state The state for tracking information 
 * @returns The updated state.
 */
applyLoadout (state) {
    state = super.applyLoadout(state);

    // == Soulbinds ==
    // Apply disc specific factors
    switch(state.settings.soulbind) {
        case ("Emeni"):
            this.spellDB['Unholy Nova'].push({
                name: "Lead by Example",
                type: "buff",
                buffType: 'statsMult',
                stat: 'intellect',
                value: 1.13,
                buffDuration: 10,
            });
            break;
        case ("Dreamweaver"):
            this.spellDB['Fae Guardians'].push({
                type: "buff",
                buffType: "statsMult",
                stat: 'haste',
                value: 1.15,
                buffDuration: 18,
            });
            break;
        case ("Pelagos"):
            this.spellDB['Boon of the Ascended'].push({
                name: "Combat Meditation",
                type: "buff",
                buffType: 'stats',
                stat: 'mastery',
                value: 315,
                buffDuration: 57,
            });
            break;
        default: 
            // If only there was an option of no cov..
    }

    return state;
}

// -------------------------------------------------------
// ----         Special class functions           --------
// -------------------------------------------------------

/**  Extend all active atonements by @extension seconds. This is triggered by Evanglism / Spirit Shell. */
extendActiveAtonements = (timer, extension) => {
    atonements.forEach((application, i, array) => {
        if (application >= timer) {
            array[i] = application + extension;
        };
    });
}

/**
 * The number of atonements currently active. These are stored separately from regular buffs for speed and to separate them from buffs on the active player.
 * @param timer The current time, state.t
 * @returns Number of active atonements.
 */
getActiveAtone = (timer) => {
    let count = 0;
    atonements.forEach(application => {
        if (application >= timer) {
            count++;
        };
    });
    return count;
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
    return super.getReport(state, sequenceSettings);
}

/**
 * Adds info to the 4pc healing tracker if relevant
 * @param {} state The state
 * @param {} spellName Name of the spell to add the healing to
 * @param {} value Healing amount
 */
track4pc (state, spellName, value) {
    
}

// -------------------------------------------------------
// ----         Universal                         --------
// -------------------------------------------------------



}