import { runHeal } from "Retail/Engine/EffectFormulas/ClassicSpecs/ClassicRamps";

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
        spellData: {id: 361469, icon: "spell_nature_rejuvenation", cat: "heal"},
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
        castTime: 1.5, // Check
        cost: 10, 
        coeff: 0.266, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'mastery'] 
    }],
    "Regrowth": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "spell_nature_resistnature", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
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
    "Healing Touch": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "spell_nature_healingtouch", cat: "heal"},
        type: "heal",
        castTime: 2, 
        cost: 35, 
        coeff: 0.806, 
        expectedOverheal: 0.3,
        secondaries: ['crit'] 
    },],
    "Wild Growth": [
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
    }],
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
const classTalents = {
    improvedRejuvenation: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].buffDuration += 3;
    }}, 

}

// Resto talents
const specTalents = {


    luxuriantSoil: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {

    }}, 

    // This occurs in 3 2 second ticks. We'll watch this one closely on logs but functionally it usually represents a full 6s extension. 
    // Note that if we were to reduce this rate it should be by chance rather than cutting the extension.
    nurturingDormancy: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].buffDuration += 6;
    }}, 

    germination: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].buffDuration += 2;
    }}, 
}

export const druidTalents = {
    ...classTalents,
    ...specTalents,
};

