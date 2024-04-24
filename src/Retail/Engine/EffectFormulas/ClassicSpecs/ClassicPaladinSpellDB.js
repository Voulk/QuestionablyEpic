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
        cost: 12, 
        coeff: 0.432, 
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    }],
    "Flash of Light": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "spell_nature_healingtouch", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        cost: 31, 
        coeff: 0.863, 
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    }],
    "Holy Radiance": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "spell_nature_resistnature", cat: "heal"},
        type: "heal",
        castTime: 3, 
        cost: 40, 
        coeff: 0.259, 
        expectedOverheal: 0.2,
        secondaries: ['crit'] 
    },
    {
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 3,
        coeff: 0.0504, // Estimated. Check it in Beta.
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.2,
        targets: 6, // Has *some* scaling above 6. Check. Does sqrt exist in Cata?
        secondaries: ['crit']
    }],
    "Light of Dawn": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "spell_nature_healingtouch", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 0, 
        coeff: 0.132 * 5, // Adjust this per Holy Power. 
        targets: 6,
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    }],
    "Word of Glory": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "spell_nature_healingtouch", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 0, 
        coeff: 0.209 * 5, // Adjust this per Holy Power. 
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

