

export const blossomProfile = {
    defaultStats: {
        intellect: 14000,
        haste: 1600,
        crit: 11000,
        mastery: 6500,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    },
    talents: [], // These will be turned on at maximum points
    apl: [
    {s: "Dream Flight", conditions: [{type: "afterTime", timer: 15}]},
    {s: "Verdant Embrace", conditions: [{type: "cooldownAvailable", spellName: "Dream Breath"}] }, // Combo with Verdant Embrace
    {s: "Dream Breath" }, // Combo with Verdant Embrace
    {s: "Spiritbloom" }, // Combo with Verdant Embrace
    {s: "Temporal Anomaly", conditions: [{type: "buffMissing", buffName: "Essence Burst"}]}, // Combo with Ally Living Flame
    {s: "Emerald Blossom", conditions: [{type: "buff", buffName: "Essence Burst"}]},
    {s: "Emerald Blossom", conditions: [{type: "resource", resourceName: "Essence", resourceCost: 3}]},
    
    {s: "Living Flame O"},

]}

export const reversionProfile = {
    defaultStats: {
        intellect: 14000,
        haste: 1600,
        crit: 11000,
        mastery: 6500,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    },
    talents: [], // These will be turned on at maximum points
    apl: [
    {s: "Dream Flight", conditions: [{type: "afterTime", timer: 15}]},
    {s: "Verdant Embrace", conditions: [{type: "cooldownAvailable", spellName: "Dream Breath"}, {type: "buffMissing", buffName: "Echo"}] }, // Combo with Verdant Embrace
    {s: "Dream Breath", conditions: [{type: "buffMissing", buffName: "Echo"}] }, // Avoid consuming Echo buffs.
    {s: "Echo", conditions: [{type: "buff", buffName: "Essence Burst"}]}, 
    {s: "Echo", conditions: [{type: "resource", resourceName: "Essence", resourceCost: 2}]},
    {s: "Reversion" }, 
    {s: "Living Flame O"},
    ]
    }