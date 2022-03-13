// Import spell DB
import { MONKSPELLS } from "../Monk/MistweaverSpellDB";
import BaseSequenceTool from "./BaseSequenceTool";

export default class MonkSequenceTool extends BaseSequenceTool {
constructor() { 
    super(MONKSPELLS); 
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
static getStatMult = (currentStats, stats) => {
    let mult = super.getStatMult(currentStats, stats);
    if (stats.includes("mastery")) mult *= (1.336 + currentStats['mastery'] / 35 * 4.2 / 100);
    return mult;
}

// -------------------------------------------------------
// ----         Apply loadout info                --------
// -------------------------------------------------------
/**
 * Updates the state to apply any persistant effects. 
 * @param {object} state The state for tracking information 
 * @param {object} spellDB The spell being cast. Spell data is pulled from relevant class DB. 
 * @returns The updated state.
 */
applyClassEffects = (state, legendaries = []) => {
    // == Legendaries ==
    // -- Invoker's Delight --
    // 33% haste for 20s when summoning celestial
    if (legendaries.includes("Invoker's Delight")) 
    {
        spellDB['Invoke Chiji'].push({
            type: "buff",
            buffType: "statsMult",
            stat: 'haste',
            value: 1.33,
            buffDuration: 20,
        });

        spellDB['Invoke Yulon'].push({
            type: "buff",
            buffType: "statsMult",
            stat: 'haste',
            value: 1.33,
            buffDuration: 20,
        });
    }

    // -- Ancient Teachings of the Monastery (AtotM) --
    // Apply a buff that is then checked against when running sequence
    if (legendaries.includes("Ancient Teachings of the Monastery"))
    {
        state.activeBuffs.push({name: "Ancient Teachings of the Monastery", buffType: "special", expiration: 999});
    }

    return state;
}

// -------------------------------------------------------
// ----          Special addition tools           --------
// -------------------------------------------------------

/**
 * Updates the state to apply any persistant effects. 
 * @param {object} state The state for tracking information 
 * @param {object} value The value of the spell, either damage or healing.
 * @returns The added Bonedust Brew value
 */
applyBonedustBrew = (state, value) => {
    let bonedustBonus = 0; 
    let emenibonus = 0;
    
    if (checkBuffActive(state.activeBuffs, "Bonedust Brew")) {
        // Run duplicate damage.
        bonedustBonus = value * 0.5 * 0.72 // 268 conduit
        state.damageDone['Bonedust Brew'] = (state.damageDone['Bonedust Brew'] || 0) + bonedustBonus;
    }
    else if (state.settings.misc.includes("BB")) { // Simulate second legendary
        emenibonus = value * (0.13 * convertPPMToUptime(1.5, 10));
        bonedustBonus = (value + emenibonus) * 0.5 * 0.4 * 1.88 * 0.256 // 268 conduit
        state.damageDone['Bonedust Brew (Plus Emeni)'] = (state.damageDone['Bonedust Brew (Plus Emeni)'] || 0) + bonedustBonus + emenibonus;
    }

    return bonedustBonus + emenibonus;
}

}