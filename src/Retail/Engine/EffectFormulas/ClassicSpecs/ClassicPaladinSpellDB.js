import { runHeal } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicRamps";
import { buffSpell } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";

// Add onTick, onExpiry functions to spells.
export const CLASSICPALADINSPELLDB = {
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "N/A"},
        type: "",
        castTime: 1.5,
        cost: 0,
    }],
    "Holy Light": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "spell_nature_healingtouch", cat: "heal"},
        type: "heal",
        castTime: 2, 
        cost: 35, 
        coeff: 0.806, 
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    }],

}

// Talents that aren't in the resto portion of the tree (Feral / Balance)
const offspecTalents = {


}

// Resto talents
const specTalents = {

}

const glyphs = {


}

export const paladinTalents = {
    ...offspecTalents,
    ...specTalents,
    ...glyphs,
};

