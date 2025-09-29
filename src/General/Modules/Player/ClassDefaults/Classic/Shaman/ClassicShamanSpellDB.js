import { runHeal } from "General/Modules/Player/ClassDefaults/Classic/ClassicRamps";
import { buffSpell } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { addBuff } from "General/Modules/Player/ClassDefaults/Generic/BuffBase";

// Add onTick, onExpiry functions to spells.
export const CLASSICSHAMANSPELLDB = {
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "N/A"},
        type: "",
        castTime: 1.5,
        cost: 0,
    }],
    "Healing Rain": [{
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "N/A"},
        cost: 36.635,
        castTime: 2,
        type: "classic periodic",
        buffType: "heal",
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false, rolling: true}, 
        buffDuration: 10,
        coeff: 0.165,
        flat: 2191,
        expectedOverheal: 0.34,
        targets: 6,
        secondaries: ['crit', 'mastery'] 
    }],
    "Chain Heal": [{
        spellData: {id: 1064, icon: "spell_nature_healingwavegreater", cat: "heal"},
        type: "heal",
        healType: "direct",
        castTime: 2.5, 
        cost: 4.5, 
        coeff: 0.6876, 
        flat: 413,
        expectedOverheal: 0.15,
        targets: 4, // There is drop off per heal.
        secondaries: ['crit', 'mastery'],
    }],
    "Healing Tide Totem": [{
        spellData: {id: 108280, icon: "ability_shaman_healingtide", cat: "N/A"},
        cost: 8,
        castTime: 0,
        type: "classic periodic",
        buffType: "heal",
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false, rolling: true}, 
        buffDuration: 10,
        coeff: 0.165,
        flat: 2191,
        expectedOverheal: 0.4,
        targets: 12,
        secondaries: ['crit', 'mastery'] 
    }],
    "Healing Stream Totem": [{
        spellData: {id: 5394, icon: "inv_spear_04", cat: "N/A"},
        cost: 23.5,
        castTime: 0,
        type: "classic periodic",
        buffType: "heal",
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false, rolling: true}, 
        buffDuration: 15,
        coeff: 0.444,
        flat: 2191,
        expectedOverheal: 0.4,
        targets: 1,
        secondaries: ['crit', 'mastery'] 
    }],
    "Riptide": [{
        spellData: {id: 61295, icon: "spell_nature_riptide", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 12, 
        flat: 638,
        coeff: 0.339, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'],
        cooldownData: {cooldown: 6, hasted: false}, 
    },
    {
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 18,
        coeff: 0.16, // 
        flat: 133,
        tickData: {tickRate: 3, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.4,
        secondaries: ['crit', 'mastery'],
    }],
    "Lightning Bolt": [{
        // Regrowth direct heal portion
        spellData: {id: 403, icon: "spell_nature_lightning", cat: "damage"},
        type: "damage",
        castTime: 2.5, 
        cost: 7.1, 
        coeff: 0.739, 
        flat: 1271,
        secondaries: ['crit'] 
    }],

}

// Talents that aren't in the 
const offspecTalents = {

}


const specTalents = {

}

const glyphs = {
    glyphOfHolyShock: {points: 1, maxPoints: 1, icon: "spell_holy_searinglight", id: 63224, select: true, tier: 1, runFunc: function (state, spellDB, points) {

    }},

}

export const shamanTalents = {
    ...offspecTalents,
    ...specTalents,
    ...glyphs,
};

