import { runHeal } from "./RestoDruidRamps";

// Add onTick, onExpiry functions to spells.
export const DRUIDSPELLDB = {
    "Rejuvenation": [
        {
        // Rejuv is split into two spell effects. The direct heal, and the HoT. The direct heal is the same amount of healing as one tick, but doesn't scale with Haste.
        // The number of rejuv ticks is (5 x haste) + 1.
        spellData: {id: 361469, icon: "ability_evoker_livingflame", cat: "heal"},
        castTime: 0,
        cost: 2.2, // 5500
        type: "buff",
        buffType: "heal",
        tickData: {tickRate: 3, canPartialTick: true, tickOnCast: true}, 
        buffDuration: 12,
        coeff: 0.2465,
        expectedOverheal: 0.2,
        flags: {targeted: true},
        secondaries: ['crit', 'vers', 'mastery'] // Rejuv also scales with haste, but this is handled elsewhere.
    }],
    "Regrowth": [{
        // Regrowth direct heal portion
        spellData: {id: 0, icon: "ability_evoker_livingflame", cat: "heal"},
        type: "heal",
        castTime: 1.5, 
        cost: 3.4, 
        coeff: 0.29, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery'] 
    },
    {
        // Regrowth HoT portion
        type: "buff",
        buffType: "heal",
        buffDuration: 12,
        coeff: 0.0864, // The coefficient for a single regrowth tick.
        tickData: {tickRate: 2, canPartialTick: true, tickOnCast: false}, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery']
    }],
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

const classTalents = {
    improvedRejuvenation: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].buffDuration += 3;
    }}, 

}

const specTalents = {


    luxuriantSoil: {points: 2, maxPoints: 2, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][0].tickData.onTick = function (state, buff, runSpell, druidSpells) {
            const roll = Math.random();
            const canProceed = (roll < (0.01 * state.talents.luxuriantSoil.points));

            if (canProceed) {
                // Create a new rejuvenation.
                runSpell(druidSpells["Rejuvenation"], state, "Rejuvenation", druidSpells)
            }
        };
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

