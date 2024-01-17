

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
    talents: ['flutteringSeedlings', 'cycleOfLife', 'fontOfMagic', 'renewingBreath', 'lifeforceMender'], // These will be turned on at maximum points
    apl: [
    {s: ["Dream Flight"], conditions: [{type: "afterTime", timer: 15}]},
    {s: ["Living Flame"], conditions: [{type: "buffCountMinimum", buffName: "Echo", buffCount: 4}]}, 
    {s: ["Verdant Embrace"], conditions: [{type: "cooldownAvailable", spellName: "Dream Breath"}] }, // Combo with Verdant Embrace
    {s: ["Dream Breath"] }, // Combo with Verdant Embrace
    {s: ["Spiritbloom"] }, // Combo with Verdant Embrace
    {s: ["Temporal Anomaly"], conditions: [{type: "buffMissing", buffName: "Essence Burst"}]}, // Combo with Ally Living Flame
    {s: ["Emerald Blossom"], conditions: [{type: "buff", buffName: "Essence Burst"}]},
    {s: ["Emerald Blossom"], conditions: [{type: "resource", resourceName: "Essence", resourceCost: 3}]},
    
    {s: ["Living Flame O"]},

]}

export const reversionProfile = {
    defaultStats: {
        intellect: 16000,
        haste: 1600,
        crit: 5800,
        mastery: 6700,
        versatility: 3000,
        stamina: 44000,
        critMult: 2,
    },
    talents: ['gracePeriod', 'timelessMagic'], // These will be turned on at maximum points
    apl: [
    {s: ["Dream Flight"], conditions: [{type: "afterTime", timer: 15}]},
    //{s: ["Stasis", "Temporal Anomaly", "Dream Breath", "Spiritbloom"], conditions: [{type: "cooldownAvailable", spellName: "Dream Breath"}, {type: "cooldownAvailable", spellName: "Spiritbloom"}, {type: "cooldownAvailable", spellName: "Temporal Anomaly"}]},
    {s: ["Verdant Embrace"], conditions: [{type: "cooldownAvailable", spellName: "Dream Breath"}, {type: "buffMissing", buffName: "Echo"}] }, // Combo with Verdant Embrace
    {s: ["Dream Breath"], conditions: [{type: "buffMissing", buffName: "Echo"}] }, // Avoid consuming Echo buffs.
    {s: ["Spiritbloom"], conditions: [{type: "buffMissing", buffName: "Echo"}] }, // Avoid consuming Echo buffs.
    {s: ["Temporal Anomaly"]},
    {s: ["Echo"], conditions: [{type: "buff", buffName: "Essence Burst"}]}, 
    {s: ["Echo"], conditions: [{type: "resource", resourceName: "essence", resourceCost: 2}]},
    {s: ["Reversion"] }, 
    //{s: ["Fire Breath"]}, // Avoid consuming Echo buffs.
    
    {s: ["Living Flame O"] },
    ]
    }