

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
    heroTree: "N/A", // N/A disables the hero profile.
    talents: ['flutteringSeedlings',  'fontOfMagic', 'renewingBreath', 'timelessMagic', 'gracePeriod', /*'cycleOfLife'*/], // These will be turned on at maximum points
    apl: [
        {s: ["Emerald Blossom"], conditions: [{type: "resource", resourceName: "essence", resourceCost: 3}, {type: "beforeTime", timer: 2}]},
        {s: ["Dream Flight"], conditions: [{type: "afterTime", timer: 15}]},
        {s: ["Reversion"], conditions: [{type: "buffCountMinimum", buffName: "Echo", buffCount: 4}]}, 
        {s: ["Verdant Embrace"], conditions: [{type: "cooldownAvailable", spellName: "Dream Breath"}] }, // Combo with Verdant Embrace
        {s: ["Dream Breath"] }, // Combo with Verdant Embrace
        {s: ["Spiritbloom"] }, // 
        {s: ["Temporal Anomaly"], conditions: [{type: "buffMissing", buffName: "Essence Burst"}]}, // Combo with Reversion 
        {s: ["Emerald Blossom"], conditions: [{type: "buff", buffName: "Essence Burst"}]},
        {s: ["Emerald Blossom"], conditions: [{type: "resource", resourceName: "essence", resourceCost: 3}]},
        
        {s: ["Living Flame O"]},

]}

/*
        intellect: 16000,
        haste: 1600,
        crit: 5800,
        mastery: 6700,
        versatility: 3000,
        stamina: 44000,
        critMult: 2,
        */

export const reversionProfile = {
    defaultStats: { // 144,197.241
        intellect: 16700,
        haste: 1600,
        crit: 5400,
        mastery: 6800,
        versatility: 3000,
        stamina: 44000,
        critMult: 2,
    },
    talents: ['gracePeriod', 'timelessMagic', 'goldenHour'], // These will be turned on at maximum points
    heroTree: "N/A", // N/A disables the hero profile.
    apl: [
    {s: ["Verdant Embrace"], conditions: [{type: "cooldownAvailable", spellName: "Dream Breath"}, {type: "buffMissing", buffName: "Echo"}] }, // Combo with Verdant Embrace
    {s: ["Stasis"], conditions: [{type: "cooldownClose", nearTime: 3, spellName: "Dream Breath"}, {type: "cooldownClose", nearTime: 3, spellName: "Spiritbloom"}]},
    {s: ["Dream Flight"], conditions: [{type: "afterTime", timer: 15}]},
    //{s: ["Stasis", "Temporal Anomaly", "Dream Breath", "Spiritbloom"], conditions: [{type: "cooldownAvailable", spellName: "Dream Breath"}, {type: "cooldownAvailable", spellName: "Spiritbloom"}, {type: "cooldownAvailable", spellName: "Temporal Anomaly"}]},

    {s: ["Dream Breath"], conditions: [{type: "buffCountMaximum", buffName: "Echo", buffCount: 3}, {type: "cooldownFar", farTime: 5, spellName: "Stasis"}] }, // Avoid consuming Echo buffs.
    {s: ["Spiritbloom"], conditions: [{type: "buffCountMaximum", buffName: "Echo", buffCount: 2}, {type: "cooldownFar", farTime: 5, spellName: "Stasis"}] }, // Avoid consuming Echo buffs.
    {s: ["Temporal Anomaly"], conditions: [{type: "cooldownFar", farTime: 5, spellName: "Stasis"}]},
    {s: ["StasisRelease"], conditions: [{type: "buff", buffName: "Stasis"}]},
    {s: ["Echo"], conditions: [{type: "buff", buffName: "Essence Burst"}]}, 
    {s: ["Echo"], conditions: [{type: "resource", resourceName: "essence", resourceCost: 2}]},
    {s: ["Reversion"], conditions: [{type: "buffCountMinimum", buffName: "Echo", buffCount: 5}] }, 
    {s: ["Fire Breath"], conditions: [{type: "buffMissing", buffName: "Exhilarating Burst"}]}, // Avoid consuming Echo buffs.
    
    {s: ["Living Flame O"] },
    ]
    }