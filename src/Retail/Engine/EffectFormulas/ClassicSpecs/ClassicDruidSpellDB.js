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
        expectedOverheal: 0.2,
        flags: {targeted: true},
        secondaries: ['crit'] // Rejuv also scales with haste, but this is handled elsewhere.
    }],
    "Nourish": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "ability_druid_nourish", cat: "heal"},
        type: "heal",
        castTime: 2, // Check
        cost: 10, 
        coeff: 0.266, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'] 
    }],
    "Regrowth": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "spell_nature_resistnature", cat: "heal"},
        type: "heal",
        castTime: 2, 
        cost: 35, 
        coeff: 0.2936, 
        expectedOverheal: 0.2,
        secondaries: ['crit'] 
    },
    {
        // Regrowth HoT portion
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 12,
        coeff: 0.0296, // The coefficient for a single regrowth tick.
        tickData: {tickRate: 2, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit']
    }],
    "Lifebloom": [{
        // 
        spellData: {id: 0, icon: "inv_misc_herb_felblossom", cat: "heal"},
        castTime: 0, 
        type: "classic periodic",
        buffType: "heal",
        buffDuration: 10,
        cost: 7, 
        coeff: 0.0234, // The coefficient for a single regrowth tick.
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit']
    },
    {
        // Expiration portion
        type: "heal",
        coeff: 0.284, 
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    },
],
    "Healing Touch": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "spell_nature_healingtouch", cat: "heal"},
        type: "heal",
        castTime: 3, 
        cost: 35, 
        coeff: 0.806, 
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    }],
    "Swiftmend": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "inv_relics_idolofrejuvenation", cat: "heal"},
        type: "heal",
        castTime: 2, 
        cost: 10, 
        coeff: 0.536, 
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    }],
    "Wild Growth": [
    {
        // Simple version of WG that matches Cata Beta
        spellData: {id: 361469, icon: "ability_druid_flourish", cat: "heal"},
        castTime: 1.5,
        cost: 27, // 699
        type: "classic periodic",
        buffType: "heal",
        tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
        buffDuration: 7,
        targets: 5,
        coeff: 0.0437,
        expectedOverheal: 0.2,
        secondaries: ['crit']
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
    "Flourish": [{
        // Two portions: extends active HoTs, and then increases tick rate.
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "heal"},
        type: "extension",
        castTime: 0, 
        cost: 0, 
        extensionList: ["Rejuvenation", "Regrowth", "Wild Growth", "Cenarion Ward", "Spring Blossoms", "Adaptive Swarm", "Lifebloom"],
        extensionDuration: 6,
    },
    {
        type: "buff",
        buffType: "periodicSpeed",
        buffDuration: 6,
        value: 1.25,
    }],


}

// Talents that aren't in the resto portion of the tree (Feral / Balance)
const offspecTalents = {
    furor: {points: 1, maxPoints: 1, icon: "spell_holy_blessingofstamina", id: 0, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        state.manaPool *= (1 + 0.05 * points);
    }}, 
    naturesMajesty: {points: 2, maxPoints: 2, icon: "inv_staff_01", id: 0, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        state.crit += (180 * 2 * points);
    }},
    genesis: {points: 3, maxPoints: 3, icon: "spell_arcane_arcane03", id: 0, select: true, tier: 2, runFunc: function (state, spellDB, points) {
        const buffValue = 1 + 0.02 * points;
        // TODO: Assumed Efflo doesn't count which is why Swiftmend is on the node.
        buffSpell(spellDB["Rejuvenation"], buffValue); 
        buffSpell(spellDB["Swiftmend"], buffValue);
        buffSpell(spellDB["Wild Growth"], buffValue);
        spellDB["Regrowth"][1].coeff *= buffValue;

    }},

}

// Resto talents
const specTalents = {

    // Bugged in beta
    improvedRejuvenation: {points: 3, maxPoints: 3, icon: "spell_nature_rejuvenation", id: 17113, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Rejuvenation"], 1 + 0.05 * points);
    }}, 
    blessingOfTheGrove: {points: 2, maxPoints: 2, icon: "spell_shaman_spiritlink", id: 0, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Rejuvenation"], 1 + 0.02 * points);
    }}, 
    naturesBounty: {points: 3, maxPoints: 3, icon: "spell_nature_resistnature", id: 0, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Regrowth"][0].statMods = {'crit': 0.6}
        spellDB["Regrowth"][1].statMods = {'crit': 0.6}
    }}, 
    efflorescence: {points: 3, maxPoints: 3, icon: "inv_misc_herb_talandrasrose", id: 0, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        const efflo = {
            type: "classic periodic",
            buffType: "heal",
            buffDuration: 7,
            coeff: spellDB["Swiftmend"][0].coeff * 0.12, // The coefficient for a single regrowth tick.
            tickData: {tickRate: 1, canPartialTick: false, tickOnCast: false}, 
            expectedOverheal: 0.4,
            targets: 3,
            secondaries: ['crit', 'mastery'] // Efflo just scales with the same thing the Swiftmend scaled with. Note that it doesn't double dip.
        }
        spellDB["Swiftmend"].push(efflo);
    }}, 
    giftOfTheEarthmother: {points: 3, maxPoints: 3, icon: "ability_druid_manatree", id: 0, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        spellDB["Lifebloom"][1].coeff *= (1 + points * 0.05);
        
        const rejuvInitial = {
            spellData: {id: 0, icon: "spell_nature_resistnature", cat: "heal"},
            type: "heal",
            coeff: spellDB["Rejuvenation"][0].coeff * (points * 0.05) * (Math.floor(spellDB["Rejuvenation"][0].buffDuration / spellDB["Rejuvenation"][0].tickData.tickRate)), 
            expectedOverheal: 0.2,
            secondaries: ['crit'] 
        }
        spellDB["Rejuvenation"].push(rejuvInitial);
    }}, 
    masterShapeshifter: {points: 1, maxPoints: 1, icon: "ability_druid_mastershapeshifter", id: 0, select: true, tier: 1, runFunc: function (state, spellDB, points) {
        state.healingAura *= 1.04;
    }},

}

const glyphs = {
    glyphOfRejuvenation: {points: 1, maxPoints: 1, icon: "spell_nature_rejuvenation", id: 0, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        buffSpell(spellDB["Rejuvenation"], 1.1);
    }}, 
    glyphOfLifebloom: {points: 1, maxPoints: 1, icon: "inv_misc_herb_felblossom", id: 0, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        spellDB["Lifebloom"][0].statMods = {'crit': 0.1}
        spellDB["Lifebloom"][1].statMods = {'crit': 0.1}
    }}, 

    // Majors
    glyphOfWildGrowth: {points: 1, maxPoints: 1, icon: "ability_druid_flourish", id: 0, select: true, tier: 3, runFunc: function (state, spellDB, points) {
        spellDB["Wild Growth"][0].targets += 1
        spellDB["Wild Growth"][0].cooldown += 2
    }}, 

}

export const druidTalents = {
    ...offspecTalents,
    ...specTalents,
    ...glyphs,
};

