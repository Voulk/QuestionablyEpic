import { runHeal } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicRamps";
import { buffSpell } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";

// Add onTick, onExpiry functions to spells.
export const CLASSICDRUIDSPELLDB = {
    "Rest": [{ // This lets the sequence gen rest. The time param is flexible. 
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "N/A"},
        type: "",
        castTime: 1.5,
        cost: 0,
    }],
    "Rejuvenation": [
        {
        // Rejuv is split into two spell effects. The direct heal, and the HoT. The direct heal is the same amount of healing as one tick, but doesn't scale with Haste.
        // The number of rejuv ticks is (5 x haste) + 1.
        spellData: {id: 774, icon: "spell_nature_rejuvenation", cat: "heal"},
        castTime: 0,
        cost: 20, // 699
        type: "classic periodic",
        buffType: "heal",
        tickData: {tickRate: 3, canPartialTick: false, tickOnCast: false}, 
        buffDuration: 12,
        coeff: 0.134,
        flat: 1307,
        expectedOverheal: 0.2,
        flags: {targeted: true},
        secondaries: ['crit', 'mastery'] // Rejuv also scales with haste, but this is handled elsewhere.
    }],
    "Nourish": [{
        // Regrowth direct heal portion
        spellData: {id: 50464, icon: "ability_druid_nourish", cat: "heal"},
        type: "heal",
        castTime: 3, // Check
        cost: 10, 
        coeff: 0.266, 
        flat: 2598,
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0}
    }],
    "Regrowth": [{
        // Regrowth direct heal portion
        spellData: {id: 8936, icon: "spell_nature_resistnature", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        cost: 35, 
        flat: 3579,
        coeff: 0.2936, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0}
    },
    {
        // Regrowth HoT portion
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 12,
        coeff: 0.0296, // The coefficient for a single regrowth tick.
        flat: 361,
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0}
    }],
    "Lifebloom": [{
        // 
        spellData: {id: 33763, icon: "inv_misc_herb_felblossom", cat: "heal"},
        castTime: 0, 
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 10,
        cost: 7, 
        coeff: 0.0234, // The coefficient for a single regrowth tick.
        flat: 228,
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery']
    },
    {
        // Expiration portion
        type: "heal",
        coeff: 0.284, 
        flat: 1848,
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'] 
    },
    ],
    "Rolling Lifebloom": [{
        // This is a fake spell. We can use it as part of profiles for ease of use. It won't appear as a simulator option.
        spellData: {id: 33763, icon: "inv_misc_herb_felblossom", cat: "n/a"},
        castTime: 0, 
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 10,
        cost: 7, // We'll preserve the cost since refreshing with Lifebloom is acceptable. 
        coeff: 0.0234 * 3,
        flat: 228 * 3,
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery']
    }],
    "Healing Touch": [{
        // Regrowth direct heal portion
        spellData: {id: 5185, icon: "spell_nature_healingtouch", cat: "heal"},
        type: "heal",
        castTime: 3, 
        cost: 30, 
        coeff: 0.806, 
        flat: 7863,
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0},
    }],
    "Swiftmend": [{
        // Regrowth direct heal portion
        spellData: {id: 18562, icon: "inv_relics_idolofrejuvenation", cat: "heal"},
        type: "heal",
        castTime: 0, 
        cost: 10, 
        coeff: 0.536, 
        flat: 5229,
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0},
    }],
    "Wild Growth": [
    {
        // Simple version of WG that matches Cata Beta
        spellData: {id: 48438, icon: "ability_druid_flourish", cat: "heal"},
        castTime: 1.5,
        cost: 27, // 699
        type: "classic periodic",
        buffType: "heal",
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        cooldownData: {cooldown: 8},
        buffDuration: 7,
        targets: 5,
        coeff: 0.0437,
        flat: 425,
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery']
    }],
    // Wild Growth is bugged on Beta. This is the retail version. The Cata live version will likely be some combination of the two.
    /*"Wild Growth": [
        {
        // HoT portion - Note the free tick on cast.
        spellData: {id: 361469, icon: "ability_evoker_livingflame", cat: "heal"},
        castTime: 0,
        cost: 2.2, // 5500
        type: "buff",
        buffType: "function",
        runFunc: function (state, spell, buff) {
            const decayRate = 0.07 / (buff.expiration - buff.startTime);
            const t = state.t - buff.startTime;
            const wildGrowthAura = 1.15;

            const decay = spell.coeff - decayRate * t;
            const netCoeff = decay * wildGrowthAura;

            const wgCast = {
                name: "Wild Growth",
                coeff: netCoeff, 
                targets: spell.targets, // TODO
                expectedOverheal: 0, // TODO
                secondaries: ["vers"], // TODO
                type: "heal",
            }
            
            runHeal(state, wgCast, "Wild Growth", true);

        },
        tickData: {tickRate: 1, canPartialTick: true, tickOnCast: false}, 
        buffDuration: 7,
        targets: 1, // Talent to increase to 6.
        coeff: 0.175*0.96, // This is the base coefficient before decay.
        expectedOverheal: 0.2,
        flags: {targeted: true},
        secondaries: ['crit', 'vers', 'mastery'] // Rejuv also scales with haste, but this is handled elsewhere.
    }], */
    "Tree of Life": [{
        // Two portions: extends active HoTs, and then increases tick rate.
        spellData: {id: 33891, icon: "ability_druid_treeoflife", cat: "cooldown"},
        type: "extension",
        castTime: 0, 
        cost: 0, 
        buffDuration: 25,
    }],

    "Wrath": [{
        // Regrowth direct heal portion
        spellData: {id: 5176, icon: "spell_nature_wrathv2", cat: "damage"},
        type: "damage",
        castTime: 1.5, 
        cost: 9, 
        coeff: 0.879, 
        secondaries: ['crit'] 
    }],

    "Harmony": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "", cat: "Ghost"},
        type: "buff",
        buffType: "special",
        buffDuration: 6,
        value: 1.25,
    }],

}

// Talents that aren't in the resto portion of the tree (Feral / Balance)
const offspecTalents = {

    furor: {points: 3, maxPoints: 3, icon: "spell_holy_blessingofstamina", id: 17056, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        state.manaPool *= (1 + 0.05 * points);
    }},

    naturesMajesty: {points: 2, maxPoints: 2, icon: "inv_staff_01", id: 35363, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        state.currentStats.crit += (179 * 2 * points);
    }},

    moonglow: {points: 3, maxPoints: 3, icon: "spell_nature_sentinal", id: 16847, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        Object.keys(spellDB).forEach(spellName => {
            if (spellDB[spellName][0].cost) spellDB[spellName][0].cost *= (1 - 0.03 * points);

        })
    }},

    genesis: {points: 3, maxPoints: 3, icon: "spell_arcane_arcane03", id: 57810, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        const buffValue = 0.02 * points;
        // TODO: Assumed Efflo doesn't count which is why Swiftmend is on the node.
        buffSpell(spellDB["Rejuvenation"], buffValue, "additive"); 
        buffSpell(spellDB["Swiftmend"], buffValue, "additive");
        buffSpell(spellDB["Lifebloom"], buffValue, "additive"); // TODO: Change to HoT only.
        buffSpell(spellDB["Wild Growth"], buffValue, "additive");
        //buffSpell(spellDB["Regrowth"], buffValue, "additive");
        spellDB["Regrowth"][1].additiveSlice = 0.05 * points;

    }},

}

// Resto talents
const specTalents = {
    blessingOfTheGrove: {points: 2, maxPoints: 2, icon: "spell_shaman_spiritlink", id: 78784, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Rejuvenation"], 0.02 * points, "additive");
    }}, 

    naturalShapeshifter: {points: 2, maxPoints: 2, icon: "spell_nature_wispsplode", id: 16833, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Tree of Life"][0].buffDuration += 6;
        spellDB["Tree of Life"][0].cost *= (1 - 0.1 * points);
        // Not included: Making Cat cheaper.
    }}, 


    naturalist: {points: 2, maxPoints: 2, icon: "spell_nature_healingtouch", id: 17070, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Healing Touch"][0].castTime -= (0.25 * points);
        spellDB["Nourish"][0].castTime -= (0.25 * points);
    }}, 

    heartOfTheWild: {points: 3, maxPoints: 3, icon: "spell_holy_blessingofagility", id: 17003, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        state.currentStats.intellect *= (0.02 * points + 1);
    }}, 

    masterShapeshifter: {points: 1, maxPoints: 1, icon: "ability_druid_mastershapeshifter", id: 48411, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        state.healingAura *= 1.04;
    }},

    improvedRejuvenation: {points: 3, maxPoints: 3, icon: "spell_nature_rejuvenation", id: 17113, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Rejuvenation"], 0.05 * points, "additive");
        buffSpell(spellDB["Swiftmend"], 0.05 * points, "additive");
    }}, 
    livingSeed: {points: 0, maxPoints: 3, icon: "ability_druid_giftoftheearthmother", id: 48496, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Regrowth"][0].statMods.critEffect = 2 + (0.2 * points);
        spellDB["Regrowth"][1].statMods.critEffect = 2 + (0.2 * points);
        spellDB["Swiftmend"][0].statMods.critEffect = 2 + (0.2 * points);
        spellDB["Healing Touch"][0].statMods.critEffect = 2 + (0.2 * points);
        spellDB["Nourish"][0].statMods.critEffect = 2 + (0.2 * points);
    }}, 



    naturesBounty: {points: 0, maxPoints: 3, icon: "spell_nature_resistnature", id: 17074, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Regrowth"][0].statMods.crit = 0.2 * points;
        spellDB["Regrowth"][1].statMods.crit = 0.2 * points;
    }}, 

    empoweredTouch: {points: 2, maxPoints: 2, icon: "ability_druid_empoweredtouch", id: 33879, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        // TODO: Model Lifebloom refresh properly.
        buffSpell(spellDB["Healing Touch"], 0.05 * points, "additive");
        spellDB["Regrowth"][0].additiveSlice = 0.05 * points;
        buffSpell(spellDB["Nourish"], 0.05 * points, "additive");
    }}, 

    efflorescence: {points: 3, maxPoints: 3, icon: "inv_misc_herb_talandrasrose", id: 34151, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const efflo = {
            type: "classic periodic",
            buffType: "heal",
            buffDuration: 7,
            coeff: spellDB["Swiftmend"][0].coeff * 0.04 * points, //
            flat: spellDB["Swiftmend"][0].flat * 0.04 * points, //
            tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false, hasteScaling: true}, 
            expectedOverheal: 0.4,
            targets: 3,
            secondaries: ['crit', 'mastery'] // Efflo just scales with the same thing the Swiftmend scaled with.
        }
        spellDB["Swiftmend"].push(efflo);
    }}, 
    giftOfTheEarthmother: {points: 3, maxPoints: 3, icon: "ability_druid_manatree", id: 51179, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Lifebloom"][1].coeff *= (1 + points * 0.05);
        
        const rejuvInitial = {
            spellData: {id: 0, icon: "spell_nature_resistnature", cat: "heal"},
            type: "heal",
            coeff: spellDB["Rejuvenation"][0].coeff * (points * 0.05) * (Math.floor(spellDB["Rejuvenation"][0].buffDuration / spellDB["Rejuvenation"][0].tickData.tickRate)), 
            flat: spellDB["Rejuvenation"][0].flat * (points * 0.05) * (Math.floor(spellDB["Rejuvenation"][0].buffDuration / spellDB["Rejuvenation"][0].tickData.tickRate)),
            expectedOverheal: 0.2,
            secondaries: ['crit', 'mastery'] 
        }
        spellDB["Rejuvenation"].push(rejuvInitial);
    }}, 


    swiftRejuvenation: {points: 1, maxPoints: 1, icon: "ability_druid_empoweredrejuvination", id: 33886, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].customGCD = 1;
    }},

}

const glyphs = {
    glyphOfRejuvenation: {points: 1, maxPoints: 1, icon: "spell_nature_rejuvenation", id: 54754, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Rejuvenation"], 0.1, "additive");
    }}, 
    glyphOfLifebloom: {points: 1, maxPoints: 1, icon: "inv_misc_herb_felblossom", id: 54826, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        spellDB["Lifebloom"][0].statMods = {'crit': 0.1}
        spellDB["Lifebloom"][1].statMods = {'crit': 0.1}
    }}, 

    // Majors
    glyphOfWildGrowth: {points: 1, maxPoints: 1, icon: "ability_druid_flourish", id: 62970, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        spellDB["Wild Growth"][0].targets += 1
        spellDB["Wild Growth"][0].cooldown += 2
    }}, 

}

export const druidTalents = {
    ...offspecTalents,
    ...specTalents,
    ...glyphs,
};

