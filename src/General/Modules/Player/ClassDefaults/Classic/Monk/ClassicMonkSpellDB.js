import { runHeal } from "General/Modules/Player/ClassDefaults/Classic/ClassicRamps";
import { buffSpell } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";

// Add onTick, onExpiry functions to spells.
export const CLASSICMONKSPELLDB = {
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "N/A"},
        type: "",
        castTime: 1.5,
        cost: 0,
    }],
    "Surging Mist": [{
        // Regrowth direct heal portion
        spellData: {id: 116694, icon: "ability_monk_surgingmist", cat: "heal"},
        type: "heal",
        castTime: 3, 
        cost: 8.8, 
        coeff: 1.86, // 0.806, 
        flat: 7863,
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0},
    }],
}

export const monkTalents = {
    //...offspecTalents,
    //...specTalents,
    //...glyphs,
};