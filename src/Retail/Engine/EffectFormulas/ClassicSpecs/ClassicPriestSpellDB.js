import { runHeal } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicRamps";
import { buffSpell } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";
import { addBuff } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/BuffBase";

// Add onTick, onExpiry functions to spells.
export const CLASSICPRIESTSPELLDB = {
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "N/A"},
        type: "",
        castTime: 1.5,
        cost: 0,
    }],
    "Power Word: Shield": [{
        spellData: {id: 17, icon: "spell_holy_powerwordshield", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 34, 
        coeff: 0, 
        flat: 0,
        expectedOverheal: 0.07,
        secondaries: ['mastery'],
    }],
    "Prayer of Healing": [{
        spellData: {id: 596, icon: "spell_holy_prayerofhealing02", cat: "heal"},
        type: "heal",
        castTime: 2.5, 
        cost: 26, 
        coeff: 0, 
        flat: 0,
        expectedOverheal: 0.37,
        targets: 5,
        secondaries: ['crit'],
    }],
    "Prayer of Mending": [{
        spellData: {id: 33076, icon: "spell_holy_prayerofmendingtga", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 18, 
        coeff: 0, 
        flat: 0,
        expectedOverheal: 0.1,
        ticks: 6,
        secondaries: ['crit'],
    }],

}

// Talents that aren't in the 
const offspecTalents = {

}


const discTalents = {

}

const holyTalents = {

}

const glyphs = {
    glyphOfHolyShock: {points: 1, maxPoints: 1, icon: "spell_holy_searinglight", id: 63224, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

    glyphOfDivineFavor: {points: 1, maxPoints: 1, icon: "spell_holy_divineillumination", id: 54937, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

    glyphOfSealOfInsight: {points: 1, maxPoints: 1, icon: "spell_holy_healingaura", id: 54943, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},
    glyphOfWordOfGlory: {points: 1, maxPoints: 1, icon: "inv_helmet_96", id: 54936, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

}

export const compiledDiscTalents = {
    ...offspecTalents,
    ...discTalents,
    ...glyphs,
};

export const compiledHolyTalents = {
    ...offspecTalents,
    ...holyTalents,
    ...glyphs,
}

