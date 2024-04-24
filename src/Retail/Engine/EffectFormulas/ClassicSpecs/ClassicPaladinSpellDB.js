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
        spellData: {id: 635, icon: "spell_holy_holybolt", cat: "heal"},
        type: "heal",
        castTime: 2, 
        cost: 12, 
        coeff: 0.432, 
        flat: 4400,
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    }],
    "Flash of Light": [{
        // Regrowth direct heal portion
        spellData: {id: 19750, icon: "spell_holy_flashheal", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        cost: 31, 
        flat: 7329,
        coeff: 0.863, 
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    }],
    "Holy Radiance": [{
        // Regrowth direct heal portion
        spellData: {id: 82327, icon: "spell_paladin_divinecircle", cat: "heal"},
        type: "heal",
        castTime: 3, 
        cost: 40, 
        flat: 2666,
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
        spellData: {id: 85222, icon: "spell_paladin_lightofdawn", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 0, 
        flat: 640,
        coeff: 0.132 * 5, // Adjust this per Holy Power. 
        targets: 6,
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    }],
    "Word of Glory": [{
        // Regrowth direct heal portion
        spellData: {id: 85673, icon: "inv_helmet_96", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 0, 
        flat: 2133 * 5,
        coeff: 0.209 * 5, // Adjust this per Holy Power. 
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    }],

}

// Talents that aren't in the resto portion of the tree (Feral / Balance)
const offspecTalents = {


}

// Holy Paladin talents
const specTalents = {
    protectorOfTheInnocent: {points: 3, maxPoints: 3, icon: "ability_druid_empoweredrejuvination", id: 33886, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const newSpell = {
            flat: 895 * points,
            coeff: 0,
            expectedOverheal: 0.3,
            secondaries: ['crit'] 
        }

        spellDB["Rejuvenation"][0].push(newSpell);
    }},

}

const glyphs = {


}

export const paladinTalents = {
    ...offspecTalents,
    ...specTalents,
    ...glyphs,
};

