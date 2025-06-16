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
    "Renewing Mist": [{
        spellData: {id: 116694, icon: "ability_monk_surgingmist", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 1.8, // Mana cost as a percent. 
        coeff: 0,
        expectedOverheal: 0.35,
        secondaries: [],
        cooldownData: {cooldown: 9, charges: 3},
        mastery: 1
    },
    {
        type: "buff",
        buffType: "heal",
        coeff: 0.19665,
        tickData: {tickRate: 2, canPartialTick: true},
        buffDuration: 20,
        expectedOverheal: 0.35,
        secondaries: ['crit', 'vers'], // + Haste
    }],
    "Enveloping Mist": [{
        spellData: {id: 116694, icon: "ability_monk_surgingmist", cat: "heal"},
        type: "buff",
        buffType: "heal",
        castTime: 2,
        cost: 4.2,
        coeff: 0.52, 
        tickData: {tickRate: 1, canPartialTick: true},
        buffDuration: 7,
        expectedOverheal: 0.35,
        secondaries: ['crit', 'vers'] // + Haste
    }],
    "Thunder Focus Tea": [{ // TFT
        spellData: {id: 116694, icon: "ability_monk_surgingmist", cat: "heal"},
        type: "buff",
        buffType: "special",
        castTime: 0,
        offGCD: true,
        cost: 0,
        buffDuration: 10,
        cooldownData: {cooldown: 30, charges: 1},
    },],
    "Refreshing Jade Wind": [{
        spellData: {id: 116694, icon: "ability_monk_surgingmist", cat: "heal"},
        castTime: 0,
        cost: 0,
        offGCD: true,

        type: "buff",
        buffType: "heal",
        coeff: 0.145,
        tickData: {tickRate: 0.75, canPartialTick: true},
        buffDuration: 6,
        targets: 5,
        expectedOverheal: 0.3,
        secondaries: ['crit', 'vers'],
    }],
    "Crackling Jade Lightning": [{
        spellData: {id: 116694, icon: "ability_monk_surgingmist", cat: "heal"},
        type: "damage",
        damageType: "magic",
        castTime: 3,
        channel: true,
        cost: 0,
        coeff: 0.224 * 1.04 * 6.25 * 2, // 297% aura on Tiger Palm + 4% for the AP -> SP conversion.
        aura: 1.04, // AP -> SP conversion.
        damageToHeal: 0.3, // Note Armor
        cooldown: 0,
        secondaries: ['crit', 'vers'],
    }],
    // Fistweaving Stuff
    // Eminence heals for 42% of damage dealt, but Jade Serpent Statue also heals for 42%.
    // Muscle Memory gives you a buff that causes the next TP or BoK to deal 1.5x damage and restore 4% total mana.
    "Jab": [{ 
        spellData: {id: 100780, icon: "ability_monk_jab", cat: "heal"},
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 6,
        coeff: 0, // 
        weaponScaling: 1.5,
        damageToHeal: 0.84,
        secondaries: ['crit'],
    }],
    "Tiger Palm": [{
        spellData: {id: 116694, icon: "ability_monk_surgingmist", cat: "heal"},
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 0,
        coeff: 0.27027 * 1.04 * 3.97, // 297% aura on Tiger Palm + 4% for the AP -> SP conversion.
        aura: 1.04, // AP -> SP conversion.
        damageToHeal: 0.3, // Note Armor
        cooldown: 0,
        secondaries: ['crit'],
    }],
    "Blackout Kick": [{
        spellData: {id: 116694, icon: "ability_monk_surgingmist", cat: "heal"},
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 2.5,
        coeff: 0, // 
        weaponScaling: 7.12,
        damageToHeal: 0.3,
        cooldown: 3,
        secondaries: ['crit'],
    }],
    "Mana Tea": [{
        spellData: {id: 116694, icon: "ability_monk_surgingmist", cat: "heal"},
        type: "buff",
        castTime: 0,
        cost: 0,
        offGCD: true,
        cooldown: 90,
        buffDuration: 10,
        buffType: 'stats',
        stat: "manaMod",
        value: -0.5, //
    }],
    "Revival":[{
        spellData: {id: 116694, icon: "ability_monk_surgingmist", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 4.37, // Mana cost as a percent. 
        coeff: 14.97 / 20,
        expectedOverheal: 0.35,
        targets: 20,
        secondaries: ['crit', 'vers'],
        tags: ['sqrt'],
        sqrtMin: 5,
        mastery: 20,
        cooldownData: {cooldown: 180, charges: 1},
    }],

}

export const monkTalents = {
    //...offspecTalents,
    //...specTalents,
    //...glyphs,
};