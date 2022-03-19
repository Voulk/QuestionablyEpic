// Import spell DB
import { MONKSPELLS } from "../Monk/MistweaverSpellDB";
import { runHeal } from "./SpellSequence"; // TODO: Find out if there is a way to import this as part of importing base sequence tool.
import BaseSequenceTool from "./BaseSequenceTool";
import Player from "General/Modules/Player/Player";

// Default talents
const defaultTalents = ["Chi Burst", "Chi Torpedo", "Mana Tea", "Ring of Peace", "Diffuse Magic", "Refreshing Jade Wind", "Rising Mist"];
const defaultConduits = ["Mind Blast"];
const monkConduits = { // Secondaries are listed just to ensure the values are easy to modify if they somehow change and once this is removed conduits don't have any effect
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

export default class MonkSequenceTool extends BaseSequenceTool {
constructor(state, talents, conduits) { 
    super(state, MONKSPELLS, new Player("Mock", "Mistweaver Monk", 99, "NA", "Stonemaul", "Night Elf"), talents ? talents : defaultTalents, conduits ? conduits : defaultConduits, monkConduits); 
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
    if (stats.includes("mastery")) mult *= (1.336 + currentStats['mastery'] * this.getMasteryScaling() / 100);
    return mult;
}

/**
 * @returns Returns per point mastery scaling
 */
getMasteryScaling() {
    return 1 / 35 * 4.2;
}

// -------------------------------------------------------
// ----         Spell healing calc section        --------
// -------------------------------------------------------

/** A healing spells healing multiplier. It's base healing is directly multiplied by whatever the function returns.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 */
 getHealingMult(state, spell, spellName) {
    let mult = super.getHealingMult(state, spell);

    // Healing multiplier of 2pc affects all healing (including 4pc)
    if (state.settings.misc.includes("2T28") && (spellName === "Essence Font (HoT)" || spellName === "Essence Font (HoT - Faeline Stomp)")) {
        mult *= 1.05;
    }

    // Apply Jade Bond conduit
    if (spellName === "Gust of Mists (Chiji)" || spellName === "Gust of Mists (CTA Chiji)" 
        || spellName === "Soothing Breath (CTA Yulon)" || spellName === "Soothing Breath (Yulon)") {        
        mult *= 1 + super.getConduitMult("Jade Bond");
    }

    // Apply Resplendent Mist conduit
    if (spellName === "Gust of Mists" || spellName === "Gust of Mists (Revival)" || spellName === "Gust of Mists (CTA Chiji)" || spellName === "Gust of Mists (Chiji)" || spellName === "Gust of Mists (Essence Font)" || spellName === "Gust of Mists (Bonedust Brew)")
    {
        mult *= 1 + super.getConduitMult("Resplendent Mist") * super.getConduitMult("Resplendent Mist", true);
    }

    if (spellName === "Gust of Mists (Essence Font)")
    {
        const efHots = ["Essence Font (HoT)", "Essence Font (HoT - Faeline Stomp)"]
        const activeEFBuffs = state.activeBuffs.filter(function (buff) {return efHots.includes(buff.name)})
        let multi = activeEFBuffs.length / 20;
        if (multi > 1) multi = 1;
        mult *= multi;
    }

    // FLS buffs 5 targets. We'll take the average healing increase. This is likely a slight underestimation since your RJW and FLS targets will line up closely. On the other
    // hand FLS likes to hit pets sometimes so it should be fair. 
    if (super.checkBuffActive(state.activeBuffs, "Faeline Harmony Inc")) mult *= (0.08 * 5 / 20) + 1; 

    // Enveloping mist and breath healing increase
    if (spellName != "Faeline Stomp" && spellName != "Enveloping Mist" && spellName != "Enveloping Breath")
    {
        if (super.checkBuffActive(state.activeBuffs, "Enveloping Mist"))
        {
            const EnvelopingMistCount = state.activeBuffs.filter(function (buff) {return buff.name === "Enveloping Mist"}).length;
            mult *= 1 + 0.3 * EnvelopingMistCount / 20;
        }

        // This currently multiplies the healing value by 3.5 due to number of targets hit per buff
        if (super.checkBuffActive(state.activeBuffs, "Enveloping Breath"))
        {
            const EnvelopingBreathCount = state.activeBuffs.filter(function (buff) {return buff.name === "Enveloping Breath"}).length;
            mult *= 1 + 0.1 * EnvelopingBreathCount / 20 * 3.5;
        }
    }

    return mult;
}

/** A healing spells healing addition. Adds this healing to the spell's raw healing.
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 */
getHealingAddition (state, spell, spellName) {
    let addition = super.getHealingAddition(state, spell);

    // == 4T28 ==
    // Some spells do not benefit from the bonus. It's unknown whether this is intentional.
    if (super.checkBuffActive(state.activeBuffs, "Primordial Mending") && !["Ancient Teachings of the Monastery"].includes(spellName) && !["Yulon's Whisper (Initial)"].includes(spellName)) {
        addition += 450 * this.getStatMult(currentStats,  ['crit', 'vers']);
    }

    // Add Bonedust Brew additional mastery healing
    if (spellName === "Gust of Mists (Bonedust Brew)")
    {
        addition += (0.42 * 1.04) * this.getStatMult(currentStats, ['crit', 'vers']) * currentStats.intellect;
    }

    return addition;
}

/** Special healing to be done based on the initial heal, eg Monk Mastery, Bonedust Brew
 * @param {object} state The state for tracking information 
 * @param {object} spell The spell being cast. Spell data is pulled from relevant class DB. 
 * @param {object} value The precalculated healing of the related spell.
 */
getSpecialHealing (state, spell, spellName, value) {
    // Track the 4pc value, run after run heal so doesn't need to be done again for mastery etc
    super.getSpecialHealing (state, spell, value);
    this.track4pc(state, spellName, value);

    if (spell.mastery) {
        const masteryProc = MONKSPELLS['Gust of Mists'][0];
        runHeal(state, masteryProc, "Gust of Mists")
    }

    // EF Mastery duplication
    const efHots = ["Essence Font (HoT)", "Essence Font (HoT - Faeline Stomp)"]
    const activeEFBuffs = state.activeBuffs.filter(function (buff) {return efHots.includes(buff.name)})
    if (activeEFBuffs.length > 0 && (spellName === "Gust of Mists" || spellName === "Gust of Mists (Revival)" || spellName === "Gust of Mists (CTA Chiji)" || spellName === "Gust of Mists (Chiji)"))
    {
        const bonusMasteryProc = MONKSPELLS['Gust of Mists'][0];
        runHeal(state, bonusMasteryProc, "Gust of Mists (Essence Font)");
    }

    // Call BDB function
    this.applyBonedustBrew(state, spell, true); 

    // Just track 4pc value, healing done in base sequence.
    // This can be done more comprehensively by iterating through each healing value change then passing to function
    if (super.checkBuffActive(state.activeBuffs, "Empowered Chrysalis")) {
        const chrysalisSize = (value / (1 - spell.overheal) * spell.overheal * 0.1)
        this.track4pc(state, 'Empowered Chrysalis', chrysalisSize);
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
// ----         Apply loadout info                --------
// -------------------------------------------------------
/**
 * Updates the state to apply any persistant effects. 
 * @param {object} state The state for tracking information 
 * @returns The updated state.
 */
applyLoadout (state) {
    state = super.applyLoadout(state);

    // == Legendaries ==
    // -- Invoker's Delight --
    // 33% haste for 20s when summoning celestial
    if (state.settings.legendaries.includes("Invoker's Delight")) 
    {
        super.spellDB['Invoke Chiji'].push({
            type: "buff",
            buffType: "statsMult",
            stat: 'haste',
            value: 1.33,
            buffDuration: 20,
        });

        super.spellDB['Invoke Yulon'].push({
            type: "buff",
            buffType: "statsMult",
            stat: 'haste',
            value: 1.33,
            buffDuration: 20,
        });
    }

    // -- Ancient Teachings of the Monastery (AtotM) --
    // Apply a buff that is then checked against when running sequence
    if (state.settings.legendaries.includes("Ancient Teachings of the Monastery"))
    {
        state.activeBuffs.push({name: "Ancient Teachings of the Monastery", buffType: "special", expiration: false});
    }

    // == Soulbinds ==
    // Apply monk specific factors
    switch(state.settings.soulbind) {
        case ("Emeni"):
            this.spellDB['Bonedust Brew'].push({
                name: "Lead by Example",
                type: "buff",
                buffType: 'statsMult',
                stat: 'intellect',
                value: 1.13,
                buffDuration: 10,
            });
            break;
        case ("Dreamweaver"):
            this.spellDB['Faeline Stomp'].push({
                type: "buff",
                buffType: "statsMult",
                stat: 'haste',
                value: 1.15,
                buffDuration: 6,
            });
            break;
        case ("Pelagos"):
            this.spellDB['Weapons of Order'].push({
                name: "Combat Meditation",
                type: "buff",
                buffType: 'stats',
                stat: 'mastery',
                value: 315,
                buffDuration: 32,
            });
            break;
        default: 
            // If only there was an option of no cov..
    }

    return state;
}

// -------------------------------------------------------
// ----          Special addition tools           --------
// -------------------------------------------------------

/**
 * Updates the state to apply any persistant effects. 
 * @param {} state The state for tracking information 
 * @param spellName The name of the spell, used for checking it's not applying to itself or for gusts.
 * @param value The value of the spell, either damage or healing.
 * @param healing True if the spell is a healing spell, do different calcs.
 * @returns The added Bonedust Brew value
 */
applyBonedustBrew (state, spellName, value, healing = false) {
    let bonedustBonus = 0; 
    let emenibonus = 0;
    let emenigroupbonus = 0;
    let targetMult = 0.75;
    const conduitMult = 1 + super.getConduitMult('Bone Marrow Hops'); 
    
    if (!healing)
    {
        if (super.checkBuffActive(state.activeBuffs, "Bonedust Brew")) {
            // Run duplicate damage.
            emenigroupbonus = value * 0.08 * 15 / 19 * 2; // Approximating throughput increase for hitting non-healers
            bonedustBonus = value * 0.5 * 0.4 * conduitMult; 
            state.damageDone['Bonedust Brew'] = (state.damageDone['Bonedust Brew'] || 0) + bonedustBonus;
            state.damageDone['Emeni Group bonus'] = (state.damageDone['Emeni Group bonus'] || 0) + emenigroupbonus;
        }
        else if (state.settings.misc.includes("BB")) { // Simulate second legendary
            emenigroupbonus = value * (0.08 * convertPPMToUptime(1.5, 10)) * 15 / 19 * 2; // Approximating throughput increase for hitting non-healers
            emenibonus = value * (0.13 * convertPPMToUptime(1.5, 10));
            bonedustBonus = (value + emenibonus) * 0.5 * 0.4 * conduitMult * 0.256 * 0.75;
            state.damageDone['Bonedust Brew (Bountiful Brew)'] = (state.damageDone['Bonedust Brew (Bountiful Brew)'] || 0) + bonedustHealing;
            state.damageDone['Emeni (Bountiful Brew)'] = (state.damageDone['Emeni (Bountiful Brew)'] || 0) + emenibonus;
            state.damageDone['Emeni Group bonus'] = (state.damageDone['Emeni Group bonus'] || 0) + emenigroupbonus;
        }
    }
    else {
        if (spellName === "Gust of Mists" || spellName === "Gust of Mists (Revival)" || spellName === "Gust of Mists (CTA Chiji)" || spellName === "Gust of Mists (Chiji)") {
            const bonusMasteryProc = MONKSPELLS['Gust of Mists'][0];
            runHeal(state, bonusMasteryProc, "Gust of Mists (Bonedust Brew)");
        }

        if (state.settings.misc.includes("BDB40")) targetMult = 0.4;
        else if (state.settings.misc.includes("BDB60")) targetMult = 0.6;
        else if (state.settings.misc.includes("BDB90")) targetMult = 0.9;

        if (super.checkBuffActive(state.activeBuffs, "Bonedust Brew")) {
            // Run duplicate damage.
            emenigroupbonus = value * 0.08 * 4 / 19; // Approximating throughput increase for hitting healers
            bonedustBonus = value * 0.5 * 0.4 * conduitMult * targetMult; 
            state.damageDone['Bonedust Brew'] = (state.damageDone['Bonedust Brew'] || 0) + bonedustBonus;
            state.damageDone['Emeni Group bonus'] = (state.damageDone['Emeni Group bonus'] || 0) + emenigroupbonus;
        }
        else if (state.settings.misc.includes("BB")) { // Simulate second legendary
            emenigroupbonus = value * (0.08 * convertPPMToUptime(1.5, 10)) * 4 / 19; // Approximating throughput increase for hitting healers
            emenibonus = value * (0.13 * convertPPMToUptime(1.5, 10));
            bonedustBonus = (value + emenibonus) * 0.5 * 0.4 * conduitMult * targetMult * 0.256 * 0.75;
            state.damageDone['Bonedust Brew (Bountiful Brew)'] = (state.damageDone['Bonedust Brew (Bountiful Brew)'] || 0) + bonedustHealing;
            state.damageDone['Emeni (Bountiful Brew)'] = (state.damageDone['Emeni (Bountiful Brew)'] || 0) + emenibonus;
            state.damageDone['Emeni Group bonus'] = (state.damageDone['Emeni Group bonus'] || 0) + emenigroupbonus;
        }
    }

    return bonedustBonus + emenibonus;
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
    if (super.checkBuffActive(state.activeBuffs, "Primordial Mending")){
        state.tierHealingDone[spellName] = (state.tierHealingDone[spellName] || 0) + value; 
    }
}

// -------------------------------------------------------
// ----         Universal                         --------
// -------------------------------------------------------



}