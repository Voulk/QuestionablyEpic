

export const evokerDefaultAPL = [
    {s: "Dream Flight", conditions: [{type: "afterTime", timer: 15}]},
    {s: "Verdant Embrace", conditions: [{type: "cooldownAvailable", spellName: "Dream Breath"}] }, // Combo with Verdant Embrace
    {s: "Dream Breath" }, // Combo with Verdant Embrace
    {s: "Spiritbloom" }, // Combo with Verdant Embrace
    {s: "Temporal Anomaly", conditions: [{type: "buffMissing", buffName: "Essence Burst"}]}, // Combo with Ally Living Flame
    {s: "Emerald Blossom", conditions: [{type: "buff", buffName: "Essence Burst"}]},
    {s: "Emerald Blossom", conditions: [{type: "resource", resourceName: "Essence", resourceCost: 3}]},
    
    {s: "Living Flame O"},

]

export const reversionAPL = [
    {s: "Dream Flight", conditions: [{type: "afterTime", timer: 15}]},
    {s: "Verdant Embrace", conditions: [{type: "cooldownAvailable", spellName: "Dream Breath"}, {type: "buffMissing", buffName: "Echo"}] }, // Combo with Verdant Embrace
    {s: "Dream Breath", conditions: [{type: "buffMissing", buffName: "Echo"}] }, // Avoid consuming Echo buffs.
    {s: "Echo", conditions: [{type: "buff", buffName: "Essence Burst"}]}, 
    {s: "Echo", conditions: [{type: "resource", resourceName: "Essence", resourceCost: 2}]},
    {s: "Reversion" }, 
    {s: "Living Flame O"},

]