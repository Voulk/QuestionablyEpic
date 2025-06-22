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
        castTime: 1.5, 
        cost: 7.65, 
        coeff: 1.8, // 0.806, 
        flat: 17242,
        expectedOverheal: 0.3,
        masteryScalar: 1,
        secondaries: ['crit'],
        statMods: {crit: 0, critEffect: 0},
    }],
    "Renewing Mist": [{ // First two ticks spread a max duration ReM to another target.
        spellData: {id: 115151, icon: "ability_monk_renewingmists", cat: "heal"},
        castTime: 0,
        cost: 1.8, // Mana cost as a percent. 
        customGCD: 1,
        cooldownData: {cooldown: 8},
        type: "classic periodic",
        buffType: "heal",
        coeff: 0.107,
        flat: 2266,
        masteryScalar: 0.15, // MULTIPLY BY TICK COUNT
        tickData: {tickRate: 2, canPartialTick: true},
        buffDuration: 18,
        targets: 3,
        expectedOverheal: 0.35,
        secondaries: ['crit'], // + Haste
    }],
    "Enveloping Mist": [{
        spellData: {id: 124682, icon: "spell_monk_envelopingmist", cat: "heal"},
        type: "classic periodic",
        buffType: "heal",
        castTime: 2,
        cost: 0,
        chiCost: 3,
        masteryScalar: 0.2,
        coeff: 0.52 * 1.48, 
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
        spellData: {id: 116847, icon: "ability_monk_rushingjadewind", cat: "cooldown"},
        castTime: 0,
        customGCD: 1,
        cost: 7.15,

        type: "classic periodic",
        buffType: "damage",
        coeff: 0,
        tickData: {tickRate: 0.75},
        
        weaponScaling: 1.59, // Might have a second multiplier of 0.880503
        buffDuration: 6,
        targets: 1, // Can hit everyone so TODO.
        expectedOverheal: 0.3,
        secondaries: ['crit']
    },
    {
        type: "classic periodic",
        buffType: "heal",
        flat: 2809,
        coeff: 0.8 * 0.1152,
        tickData: {tickRate: 0.75},
        masteryScalar: 0.1,
        buffDuration: 6,
        targets: 1, // Can hit everyone so TODO.
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
        coeff: 0.386 * 2 * 1.25, // TotM
        flat: 197,
        damageToHeal: 0.84, // Note Armor
        secondaries: ['crit'],
    }],
    "Melee": [{
        spellData: {id: 0, icon: "ability_monk_tigerpalm", cat: "N/A"},
        type: "damage",
        damageType: "physical",
        castTime: 0,
        customGCD: 999,
        cost: 0,
        coeff: 0, // 
        weaponScaling: 1,
        damageToHeal: 0.84,
        secondaries: ['crit'],
    }],
    // Fistweaving Stuff
    // Eminence heals for 42% of damage dealt, but Jade Serpent Statue also heals for 42%.
    // Muscle Memory gives you a buff that causes the next TP or BoK to deal 1.5x damage and restore 4% total mana.
    "Jab": [{ 
        spellData: {id: 100780, icon: "ability_monk_jab", cat: "damage"},
        type: "damage",
        damageType: "physical",
        castTime: 0,
        customGCD: 1,
        cost: 6,
        coeff: 0, // 
        weaponScaling: 1.5,
        damageToHeal: 0.84,
        secondaries: ['crit'],
    },
    {
        name: "Muscle Memory",
        type: "buff",
        buffDuration: 20,
        buffType: 'special',
    }

],
    "Tiger Palm": [{
        spellData: {id: 100787, icon: "ability_monk_tigerpalm", cat: "damage"},
        type: "damage",
        damageType: "physical",
        castTime: 0,
        customGCD: 1,
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
        customGCD: 1,
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
        customGCD: 1,
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
        customGCD: 1,
        cost: 7.7,
        coeff: 3.5 * 1.22,
        flat: 9579 * 1.22,
        masteryScalar: 0.15,
        expectedOverheal: 0.4,
        targets: 25,
        secondaries: ['crit'],
        cooldownData: {cooldown: 180, charges: 1},
    }],
    "Uplift":[{
        spellData: {id: 116670, icon: "ability_monk_uplift", cat: "heal"},
        type: "heal",
        castTime: 0,
        customGCD: 1,
        cost: 0,
        chiCost: 2,
        coeff: 0.69,
        masteryScalar: 0.25,
        flat: 7795,
        expectedOverheal: 0.25,
        targets: 1, // Hits anyone with ReM.
        secondaries: ['crit'],
    }],

    "Chi Burst": [{
        spellData: {id: 123986, icon: "spell_arcane_arcanetorrent", cat: "heal"},
        type: "heal",
        castTime: 1, 
        cost: 0, 
        coeff: 1 * 2, // Technically attack power
        cooldownData: {cooldown: 15},
        flat: 1095,
        masteryScalar: 0.15,
        expectedOverheal: 0.45,
        targets: 6,
        secondaries: ['crit'],
    },
    {
        type: "damage",
        coeff: 1.21 * 2, // Technically attack power
        flat: 1325,
        secondaries: ['crit'],
    }],

    "Zen Sphere": [{
        spellData: {id: 124081, icon: "ability_monk_forcesphere", cat: "heal"},
        castTime: 0,
        cost: 0,
        customGCD: 1,

        type: "classic periodic",
        buffType: "damage",
        flat: 114,
        coeff: 2 * 0.104,
        tickData: {tickRate: 2, hasteScaling: false},
        buffDuration: 16,
        secondaries: ['crit']
    },
    {
        type: "classic periodic",
        buffType: "heal",
        flat: 114,
        coeff: 2.4 * 0.104,
        masteryScalar: 0.25,
        tickData: {tickRate: 2, hasteScaling: false},
        buffDuration: 6,
        expectedOverheal: 0.3,
        secondaries: ['crit']
    },

    // Detonation
    {
        type: "damage",
        flat: 463,
        coeff: 2 * 0.423,
        secondaries: ['crit'],
        targets: 1,
    },
    {
        type: "heal",
        flat: 294,
        coeff: 2 * 0.269,
        masteryScalar: 0.15,
        targets: 5,
        secondaries: ['crit'],
        expectedOverheal: 0.4,
    },
],

    "Chi Wave": [{
        spellData: {id: 115098, icon: "ability_monk_chiwave", cat: "heal"},
        type: "heal",
        castTime: 0, 
        customGCD: 1,
        cost: 0, 
        coeff: 0.45 * 2, // Technically attack power
        masteryScalar: 0.25,
        targets: 4,
        flat: 493,
        expectedOverheal: 0.3,
        secondaries: ['crit'],
    },
    {
        type: "damage",
        coeff: 0.45 * 2 * 4, // Technically attack power
        flat: 493,
        targets: 1,
        secondaries: ['crit'],
    }],
    "Mastery: Gift of the Serpent":[{
        spellData: {id: 117907, icon: "tradeskill_inscription_jadeserpent", cat: "heal"},
        type: "heal",
        castTime: 0,
        cost: 0,
        chiCost: 2,
        coeff: 0.3517 * 2,
        flat: 9986,
        expectedOverheal: 0.7,
        targets: 1, // 
        secondaries: ['crit'],
    }],

}

export const monkTalents = {
    specPassives: {points: 0, maxPoints: 0, icon: "spell_shaman_spiritlink", id: 78784, select: false, tier: 1, runFunc: function (state, spellDB, points) {
        // Here we'll include any spec passives that we need. These are quite common in MoP.
        
    }},

    // T1
    chiWave: {points: 0, maxPoints: 1, icon: "ability_monk_chiwave", id: 115098, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }}, 
    zenSphere: {points: 0, maxPoints: 1, icon: "ability_monk_forcesphere", id: 124081, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }},
    chiBurst: {points: 1, maxPoints: 1, icon: "spell_arcane_arcanetorrent", id: 123986, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }}, 

    // T2
    powerStrikes: {points: 0, maxPoints: 1, icon: "ability_monk_powerstrikes", id: 121817, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 
    ascension: {points: 0, maxPoints: 1, icon: "ability_monk_ascension", id: 115396, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 
    chiBrew: {points: 1, maxPoints: 1, icon: "ability_monk_chibrew", id: 115399, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 

    // T3
    rushingJadeWind: {points: 0, maxPoints: 1, icon: "ability_monk_rushingjadewind", id: 116847, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 
    invokeXuen: {points: 1, maxPoints: 1, icon: "ability_monk_summontigerstatue", id: 123904, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 
    chiTorpedo: {points: 0, maxPoints: 1, icon: "ability_monk_quitornado", id: 115008, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 
    //...offspecTalents,
    //...specTalents,
    //...glyphs,
};