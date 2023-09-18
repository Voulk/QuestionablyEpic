
// Add onTick, onExpiry functions to spells.
export const DRUIDSPELLDB = {
    "Rejuvenation": [{
        // Rejuv is split into two spell effects. The direct heal, and the HoT. The direct heal is the same amount of healing as one tick, but doesn't scale with Haste.
        // The number of rejuv ticks is (5 x haste) + 1.
        type: "healing",
        castTime: 0, // Instant
        cost: 0.11, // 1100
        coeff: 0.29, // This is notably the coefficient for a single tick only. 
        cooldown: 0,
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery'], // Rejuv also scales with haste, but this is handled elsewhere.
        flags: {targeted: true},
        },
        {
        // HoT portion.
        type: "healing",
        tickData: {tickRate: 3, canPartialTick: true},
        ticks: 5, // Note that Rejuv has 5 true ticks (that scale with haste) and one bonus tick on cast that does not. 
        expectedOverheal: 0.2,
        flags: {targeted: true},
        secondaries: ['crit', 'vers', 'mastery'] // Rejuv also scales with haste, but this is handled elsewhere.
    }],
    "Regrowth": [{
        // Regrowth direct heal portion
        type: "healing",
        castTime: 1.5, // Instant
        cost: 0.11, // 1700
        coeff: 0.29, 
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery'] 
    },
    {
        // Regrowth HoT portion
        type: "healing",
        coeff: 0.29, // The coefficient for a single regrowth tick.
        ticks: 6,
        tickRate: 2, // Regrowth ticks every 2s before haste.
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery']
    }],


}

export const baseTalents = {};