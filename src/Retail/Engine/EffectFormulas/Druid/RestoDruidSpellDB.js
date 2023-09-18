
// Add onTick, onExpiry functions to spells.
export const DRUIDSPELLDB = {
    "Rejuvenation": [{
        // Rejuv is split into two spell effects. The direct heal, and the HoT. The direct heal is the same amount of healing as one tick, but doesn't scale with Haste.
        // The number of rejuv ticks is (5 x haste) + 1.
        spellData: {id: 361469, icon: "ability_evoker_livingflame", cat: "heal"},
        type: "heal",
        castTime: 0, // Instant
        cost: 0.11, // 1100
        coeff: 0.2465, // This is notably the coefficient for a single tick only. 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery'], // Rejuv also scales with haste, but this is handled elsewhere.
        flags: {targeted: true},
        },
        {
        // HoT portion.
        type: "heal",
        tickData: {tickRate: 3, canPartialTick: true, tickOnCast: true}, // TODO: tickOnCast
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
        castTime: 1.5, // Instant
        cost: 0.11, // 1700
        coeff: 0.29, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery'] 
    },
    {
        // Regrowth HoT portion
        type: "heal",
        coeff: 0.29, // The coefficient for a single regrowth tick.
        ticks: 6,
        tickRate: 2, // Regrowth ticks every 2s before haste.
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery']
    }],


}

export const druidTalents = {
    // Class Tree
    improvedRejuvenation: {points: 1, maxPoints: 1, icon: "", id: 0, select: true, tier: 4, runFunc: function (state, spellDB, points) {
        spellDB["Rejuvenation"][1].buffDuration += 3;
    }}, 
};