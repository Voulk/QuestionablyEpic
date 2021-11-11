

export const DRUIDSPELLS = {
    "Rejuvenation": [{
        type: "healing",
        castTime: 0, // Instant
        cost: 0.11, // 1100
        coeff: 0.29, // This is notably the coefficient for a single tick only. 
        ticks: 6,
        tickRate: 3, // This is the base tick rate before haste is applied.
        cooldown: 0,
        expectedOverheal: 0.2,
        secondaries: ['crit', 'vers', 'mastery'] // Rejuv also scales with haste, but this is handled elsewhere.
    }],


}