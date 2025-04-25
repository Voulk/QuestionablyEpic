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
}

export const monkTalents = {
    //...offspecTalents,
    //...specTalents,
    //...glyphs,
};