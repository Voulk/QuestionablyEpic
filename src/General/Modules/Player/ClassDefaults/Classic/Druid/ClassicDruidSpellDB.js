import { runHeal } from "General/Modules/Player/ClassDefaults/Classic/ClassicRamps";
import { buffSpell } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";

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
        cost: 14.5,
        type: "classic periodic",
        buffType: "heal",
        tickData: {tickRate: 3, canPartialTick: false, tickOnCast: false}, 
        buffDuration: 12,
        coeff: 0.392,
        flat: 4234, 
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
        coeff: 0.614, 
        flat: 6649,
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0}
    }],
    "Regrowth": [{
        // Regrowth direct heal portion
        spellData: {id: 8936, icon: "spell_nature_resistnature", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        cost: 29.7, 
        flat: 10384,
        coeff: 0.958, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0.6, critEffect: 0}
    },
    {
        // Regrowth HoT portion
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 12,
        coeff: 0.073, // The coefficient for a single regrowth tick.
        flat: 787,
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
        buffDuration: 15,
        cost: 5.9, 
        coeff: 0.057, // The coefficient for a single regrowth tick.
        flat: 621,
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery']
    },
    {
        // Expiration portion
        type: "heal",
        coeff: 0.752, 
        flat: 8150,
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
        buffDuration: 15,
        cost: 5.9, // We'll preserve the cost since refreshing with Lifebloom is acceptable. 
        coeff: 0.057 * 3,
        flat: 621 * 3,
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false, rolling: true}, 
        expectedOverheal: 0.25,
        secondaries: ['crit', 'mastery']
    }],
    "Healing Touch": [{
        // Regrowth direct heal portion
        spellData: {id: 5185, icon: "spell_nature_healingtouch", cat: "heal"},
        type: "heal",
        castTime: 3, 
        cost: 30, 
        coeff: 1.86, // 0.806, 
        flat: 20130,
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
        coeff: 1.29, 
        flat: 13966,
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0},
    }],
    "Wild Growth": [
    {
        // Simple version of WG that matches Cata Beta
        spellData: {id: 48438, icon: "ability_druid_flourish", cat: "heal"},
        castTime: 1.5,
        cost: 22.9, // 699
        type: "classic periodic",
        buffType: "heal",
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        cooldownData: {cooldown: 8},
        buffDuration: 7,
        targets: 5,
        coeff: 0.092, // Need to check if they changed WG formula.
        flat: 990,
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery']
    }],
    "Tranquility": [{
        // Direct heal portion
        spellData: {id: 740, icon: "spell_nature_tranquility", cat: "heal"},
        type: "heal",
        castTime: 8, 
        cooldownData: {cooldown: 180},
        channel: true,
        cost: 27.1, 
        flat: 9037,
        coeff: 0.835, 
        targets: 12,
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0}
    },
    {
        // Tranq HoT portion. This constantly refreshes as we channel on anyone we hit. 
        // TODO: Calculate average stack count and duration per player. On average half the raid will be hit per tick basically.
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 8,
        coeff: 0.142,
        flat: 787,
        targets: 12,
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.3,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0}
    }],
    "Cenarion Ward": [
        {
        spellData: {id: 102351, icon: "ability_druid_naturalperfection", cat: "heal"},
        castTime: 0,
        cost: 14.8, 
        type: "classic periodic",
        buffType: "heal",
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
        buffDuration: 6,
        coeff: 1.04,
        flat: 12349, 
        expectedOverheal: 0.2,
        flags: {targeted: true},
        secondaries: ['crit', 'mastery'] 
    }],
    "Force of Nature": [{
        // Trees also summon an Efflo at their location. This happens even if you are using Glyph of Efflorescence.
        // Their Efflo: isn't unique, does scale with haste.
        // Their Healing Touch: Does scale with haste. Effectively has a breakpoint where they can fit in one more cast. May or may not be reliable. On retail it isn't.
        // Their casts inherit stats at cast start, not when the tree is summoned. 
        // Questions, do they smart heal?
        spellData: {id: 106737, icon: "ability_druid_forceofnature", cat: "heal"},
        type: "heal", // Swiftmend Cast (id=142421)
        castTime: 0, 
        cost: 0, 
        flat: 2425,
        coeff: 0.224, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0}
    },
    {
        // Healing Touch casts (id=113828)
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 15,
        coeff: 0.323, // The coefficient for a single Healing Touch cast. Data differs from wowhead so check this.
        flat: 3490,
        tickData: {tickRate: 2.5, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0}
    },
{
        // Efflo Cast (id=142424)
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 15,
        coeff: 0.04725, //
        flat: 512,
        targets: 3,
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'],
        statMods: {crit: 0, critEffect: 0}
    },

],
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
        cost: 8.8, 
        coeff: 1.338, 
        flat: 2930,
        secondaries: ['crit'] 
    }],
    "Moonfire": [{
        // Regrowth direct heal portion
        spellData: {id: 8921, icon: "spell_nature_starfall", cat: "damage"},
        type: "damage",
        castTime: 1.5, 
        cost: 8.4, 
        coeff: 0.24, 
        flat: 263,
        secondaries: ['crit'] 
    },
    {
        // Moonfire DoT portion
        type: "classic periodic",
        buffType: "damage",
        buffDuration: 15,
        coeff: 0.24, 
        flat: 625,
        tickData: {tickRate: 3, canPartialTick: false, tickOnCast: false}, 
        secondaries: ['crit'] 
    }],

    // Fake spells
    "Harmony": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "", cat: "Ghost"},
        type: "buff",
        buffType: "special",
        buffDuration: 6,
        value: 1.25,
    }],
    "Soul of the Forest": [{
        spellData: {id: 0, icon: "", cat: "Ghost"},
        type: "buff",
        buffDuration: 6,
        buffType: 'statsMult',
        stat: "haste",
        value: 2, 
    }],
    "Efflorescence": [
    {
        castTime: 0,
        type: "classic periodic",
        buffType: "heal",
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false, rolling: true}, 
        buffDuration: 30,
        coeff: 0.31,
        flat: 3365,
        expectedOverheal: 0.34,
        targets: 3,
        secondaries: ['crit', 'mastery'] // Rejuv also scales with haste, but this is handled elsewhere.
    }],
    "Ysera's Gift": [{
        spellData: {id: 18562, icon: "inv_relics_idolofrejuvenation", cat: "N/A"},
        type: "heal",
        castTime: 0, 
        cost: 0, 
        coeff: 0, 
        flat: 400000 * 0.05,
        expectedOverheal: 0.25,
        secondaries: [],
        statMods: {crit: 0, critEffect: 0},
    }],
    "Wild Mushroom: Bloom": [{
        spellData: {id: 18562, icon: "inv_relics_idolofrejuvenation", cat: "N/A"},
        type: "heal",
        castTime: 0, 
        cost: 0, 
        coeff: 0.31, 
        flat: 3365,
        expectedOverheal: 0.3,
        targets: 7, // Note that only bonus healing is split among targets.
        secondaries: [],
        statMods: {crit: 0, critEffect: 0},
    }],


}


// Resto talents
const specTalents = {

    specPassives: {points: 0, maxPoints: 0, icon: "spell_shaman_spiritlink", id: 78784, select: false, tier: 1, runFunc: function (state, spellDB, points) {
        // Here we'll include any spec passives that we need. These are quite common in MoP.
        
    }},

    // Row 2
    yserasGift: {points: 1, maxPoints: 1, icon: "inv_misc_head_dragon_green", id: 145108, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }}, 
    renewal: {points: 0, maxPoints: 1, icon: "spell_nature_natureblessing", id: 108238, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }},
    cenarionWard: {points: 0, maxPoints: 1, icon: "ability_druid_naturalperfection", id: 102351, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        
    }}, 

    // T2
    soulOfTheForest: {points: 1, maxPoints: 1, icon: "ability_druid_manatree", id: 114107, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 
    incarnation: {points: 0, maxPoints: 1, icon: "spell_druid_incarnation", id: 106731, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 
    forceOfNature: {points: 0, maxPoints: 1, icon: "ability_druid_forceofnature", id: 106737, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        
    }}, 

    // T3
    heartOfTheWild: {points: 1, maxPoints: 1, icon: "spell_holy_blessingofagility", id: 108288, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 
    dreamOfCenarius: {points: 0, maxPoints: 1, icon: "ability_druid_dreamstate", id: 108373, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 
    naturesVigil: {points: 0, maxPoints: 1, icon: "achievement_zone_feralas", id: 124974, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        
    }}, 


    ///// OLD
    /*
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
    */

}

const glyphs = {
    // Majors
    glyphOfRejuvenation: {points: 0, maxPoints: 1, icon: "spell_nature_rejuvenation", id: 54754, select: true, tier: 5, runFunc: function (state, spellDB, points) {
    }}, 
    glyphOfBlooming: {points: 1, maxPoints: 1, icon: "spell_nature_protectionformnature", id: 121840, select: true, tier: 5, runFunc: function (state, spellDB, points) {

    }}, 

    glyphOfWildGrowth: {points: 1, maxPoints: 1, icon: "ability_druid_flourish", id: 62970, select: true, tier: 5, runFunc: function (state, spellDB, points) {
        spellDB["Wild Growth"][0].targets += 1
        spellDB["Wild Growth"][0].cooldown += 2
    }}, 
    glyphOfEfflorescence: {points: 1, maxPoints: 1, icon: "inv_misc_herb_talandrasrose", id: 145529, select: true, tier: 5, runFunc: function (state, spellDB, points) {

    }}, 
    glyphOfRegrowth: {points: 0, maxPoints: 1, icon: "spell_nature_resistnature", id: 116218, select: true, tier: 5, runFunc: function (state, spellDB, points) {

    }}, 

}

export const druidTalents = {
    ...specTalents,
    ...glyphs,
};

