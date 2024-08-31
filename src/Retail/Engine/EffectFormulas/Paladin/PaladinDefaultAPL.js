

export const paladinMeleeProfile = {
    defaultStats: {
        intellect: 60000,
        haste: 7000,
        crit: 7000,
        mastery: 7000,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    },
    heroTree: "heraldOfTheSun", // N/A disables the hero profile.
    talents: [], // These will be turned on at maximum points
    apl: [
        //{s: "Blessing of Seasons", conditions: [{talent: "blessingOfSeasons"}]},
        {s: ["Avenging Wrath"]},
        {s: ["Judgment"], conditions: [{type: "buff", buffName: "Awakening - Final"}]}, 
        //{s: ["Tyr's Deliverance"], conditions: [{type: "talent", talentName: "tyrsDeliverance"}]}, 
        //{s: ["Barrier of Faith"], conditions: [{type: "talent", talentName: "barrierOfFaith"}]},
        {s: ["Eternal Flame"], conditions: [{type: "resource", resourceName: "holyPower", resourceCost: 3}, {type: "heroTree", heroTree: "heraldOfTheSun"}]}, // Don't overcap hopo with Awakening
        {s: ["Light of Dawn"], conditions: [{type: "resource", resourceName: "holyPower", resourceCost: 3}, {type: "heroTree", heroTree: "lightsmith"}]}, // Don't overcap hopo with Awakening
        {s: ["Holy Light"], conditions: [{type: "buff", buffName: "Infusion of Light", talent: "awakening"}]}, // Use Holy Light for Awakening uptime
        {s: ["Judgment"], conditions: [{type: "buff", buffName: "Infusion of Light", talent:"judgementInfusionUseIfUp"}]},
        {s: ["Flash of Light"], conditions: [{type: "buff", buffName: "Infusion of Light"}]}, 
        {s: ["Holy Shock"]}, 
        {s: ["Holy Light"], conditions: [{type: "buff", buffName: "Beacon of Virtue"}]}, // Not sure if we can do "buff duration" as a condition element?
        {s: ["Hammer of Wrath"], conditions: [{type: "buff", buffName: "Veneration"}]},
        //{s: ["Crusader Strike"], conditions: [{type: "talent", talentName: "holyInfusion"}]},
        {s: ["Hammer of Wrath"], conditions: [{type: "buff", buffName: "Avenging Wrath"}]},
        {s: ["Judgment"], conditions: [{type: 'talentMissing', talentName:  "judgementInfusionHold"}]}, 
        {s: ["Consecration"]}, 
        //{s: "Holy Light"},
        {s: ["Crusader Strike"]},
        {s: ["Rest"]},

]}

