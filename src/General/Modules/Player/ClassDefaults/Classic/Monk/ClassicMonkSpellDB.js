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
        secondaries: ['crit'],
        statMods: {crit: 0, critEffect: 0},
    }],
    "Renewing Mist": [{ // First two ticks spread a max duration ReM to another target.
        spellData: {id: 115151, icon: "ability_monk_renewingmists", cat: "heal"},
        castTime: 0,
        cost: 1.8, // Mana cost as a percent. 
        cooldownData: {cooldown: 8},
        type: "buff",
        buffType: "heal",
        coeff: 0.107,
        tickData: {tickRate: 2, canPartialTick: true},
        buffDuration: 18,
        targets: 3,
        expectedOverheal: 0.35,
        secondaries: ['crit'], // + Haste
    }],
    "Enveloping Mist": [{
        spellData: {id: 124682, icon: "spell_monk_envelopingmist", cat: "heal"},
        type: "buff",
        buffType: "heal",
        castTime: 2,
        cost: 0,
        chiCost: 3,
        coeff: 0.52, 
        tickData: {tickRate: 1, canPartialTick: true},
        buffDuration: 6,
        expectedOverheal: 0.35,
        secondaries: ['crit'] // + Haste
    }],
    "Thunder Focus Tea": [{ // TFT
        spellData: {id: 116680, icon: "ability_monk_thunderfocustea", cat: "heal"},
        type: "buff",
        buffType: "special",
        castTime: 0,
        offGCD: true,
        cost: 0,
        chiCost: 1,
        buffDuration: 30,
        cooldownData: {cooldown: 45, charges: 1},
    },],
    "Rushing Jade Wind": [{
        spellData: {id: 116847, icon: "ability_monk_rushingjadewind", cat: "heal"},
        castTime: 0,
        cost: 7.15,

        type: "buff",
        buffType: "heal",
        coeff: 0,
        tickData: {tickRate: 0.75},
        weaponScaling: 1.59, // Might have a second multiplier of 0.880503
        buffDuration: 6,
        targets: 5, // Can hit everyone so TODO.
        expectedOverheal: 0.3,
        secondaries: ['crit']
    }],
    "Crackling Jade Lightning": [{
        spellData: {id: 117952, icon: "ability_monk_cracklingjadelightning", cat: "damage"},
        type: "damage",
        damageType: "magic",
        castTime: 6,
        channel: true,
        cost: 1.57 * 6,
        coeff: 0, // 297% aura on Tiger Palm + 4% for the AP -> SP conversion.
        damageToHeal: 0.84, // Note Armor
        secondaries: ['crit'],
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
        spellData: {id: 100787, icon: "ability_monk_tigerpalm", cat: "damage"},
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 0,
        chiCost: 1,
        coeff: 0, // 
        weaponScaling: 6,
        damageToHeal: 0.84,
        secondaries: ['crit'],
    }],
    "Blackout Kick": [{
        spellData: {id: 100784, icon: "ability_monk_roundhousekick", cat: "damage"},
        type: "damage",
        damageType: "physical",
        castTime: 0,
        cost: 0,
        chiCost: 2,
        coeff: 0, // 
        weaponScaling: 7.12,
        damageToHeal: 0.84,
        secondaries: ['crit'],
    }],
    "Mana Tea": [{
        spellData: {id: 115294, icon: "monk_ability_cherrymanatea", cat: "cooldown"},
        type: "buff",
        castTime: 0,
        cost: 0,
        offGCD: true,
        cooldown: 90,
        buffDuration: 10,
        buffType: 'stats',
        stat: "manaMod",
        value: 4, //
    }],
    "Revival":[{
        spellData: {id: 115310, icon: "spell_shaman_blessingofeternals", cat: "cooldown"},
        type: "heal",
        castTime: 0,
        cost: 7.7,
        coeff: 3.5,
        flat: 9579,
        expectedOverheal: 0.35,
        targets: 25,
        secondaries: ['crit'],
        cooldownData: {cooldown: 180, charges: 1},
    }],
    "Uplift":[{
        spellData: {id: 116670, icon: "spell_shaman_blessingofeternals", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 0,
        chiCost: 2,
        coeff: 0.69,
        flat: 7795,
        expectedOverheal: 0.25,
        targets: 1, // Hits anyone with ReM.
        secondaries: ['crit'],
    }],

}

export const monkTalents = {
    //...offspecTalents,
    //...specTalents,
    //...glyphs,
};