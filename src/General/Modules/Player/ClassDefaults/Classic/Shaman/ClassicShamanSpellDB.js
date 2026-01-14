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
        cooldownData: {cooldown: 10, charges: 1},
        buffDuration: 10,
        coeff: 0.165,
        flat: 1823,
        additiveScaling: 1, // Yes this is a 100% buff.
        expectedOverheal: 0.21,
        specialCoeff: 0.25, // Earthliving chance multiplier
        targets: 6,
        secondaries: ['crit', 'mastery'] 
    }],
    "Chain Heal": [{
        spellData: {id: 1064, icon: "spell_nature_healingwavegreater", cat: "heal"},
        type: "heal",
        healType: "direct",
        castTime: 2.5, 
        cost: 22.5, 
        coeff: 0.6876, 
        flat: 7590,
        expectedOverheal: 0.05,
        specialCoeff: 0.25, // Earthliving chance multiplier
        targets: 4, // There is drop off per heal.
        secondaries: ['crit', 'mastery'],
    }],
    "Greater Healing Wave": [{
        spellData: {id: 1064, icon: "spell_nature_healingwavegreater", cat: "heal"},
        type: "heal",
        healType: "direct",
        castTime: 2.5, 
        cost: 26.9, 
        coeff: 1.377, //1.72, 
        flat: 15181, //18975,
        expectedOverheal: 0.15,
        specialCoeff: 1, // Earthliving chance multiplier
        targets: 1,
        secondaries: ['crit', 'mastery'],
    }],
    "Healing Tide Totem": [{
        spellData: {id: 108280, icon: "ability_shaman_healingtide", cat: "N/A"},
        cost: 8,
        castTime: 0,
        type: "classic periodic",
        buffType: "heal",
        cooldownData: {cooldown: 180, charges: 1},
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
        buffDuration: 10,
        coeff: 0.484,
        flat: 5332,
        additiveScaling: 0.5, // 50% buff to water totems
        expectedOverheal: 0.12,
        specialCoeff: 0, // Earthliving chance multiplier
        targets: 12,
        secondaries: ['crit', 'mastery'] 
    }],
    "Healing Stream Totem": [{
        spellData: {id: 5394, icon: "inv_spear_04", cat: "N/A"},
        cost: 23.5,
        castTime: 0,
        type: "classic periodic",
        buffType: "heal",
        cooldownData: {cooldown: 30, charges: 1},
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
        buffDuration: 15,
        coeff: 0.444,
        flat: 0,
        additiveScaling: 0.5, // 50% buff to water totems
        expectedOverheal: 0.1,
        specialCoeff: 0, // Earthliving chance multiplier
        targets: 1,
        secondaries: ['crit', 'mastery'] 
    }],
    "Riptide": [{
        spellData: {id: 61295, icon: "spell_nature_riptide", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 12, 
        flat: 3735,
        coeff: 0.339, 
        expectedOverheal: 0.2,
        specialCoeff: 1, // Earthliving chance multiplier
        secondaries: ['crit', 'mastery'],
        cooldownData: {cooldown: 6, hasted: false}, 
    },
    {
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 18,
        coeff: 0.16, // 
        flat: 1764,
        tickData: {tickRate: 3, canPartialTick: false, tickOnCast: false}, 
        specialCoeff: 1, // Earthliving chance multiplier
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
        specialCoeff: 0, // Earthliving chance multiplier
        flat: 1271,
        secondaries: ['crit'] 
    }],
    "Unleash Life": [{ // 
        spellData: {id: 61295, icon: "spell_nature_riptide", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 0, //8.2, 
        flat: 3154,
        coeff: 0.286, 
        expectedOverheal: 0.15,
        specialCoeff: 1, // Earthliving chance multiplier
        cooldownData: {cooldown: 15, charges: 1},
        secondaries: ['crit', 'mastery'],
    }],
    "Earthliving Weapon": [{ // This is a proc, it can't be casted.
        spellData: {id: 51730, icon: "spell_shaman_unleashweapon_life", cat: "N/A"},
        type: "classic periodic",
        buffType: "heal",
        castTime: 0, 
        cost: 0, //8.2, 
        flat: 30,
        coeff: 0.0996, 
        expectedOverheal: 0.15,
        specialCoeff: 0, // Earthliving chance multiplier. It can't proc itself obviously.
        buffDuration: 12,
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
        secondaries: ['crit', 'mastery'],
    }]

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

