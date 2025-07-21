

export const mindbenderProfile = {
    defaultStats: { // This is a fallback stat allocation if one is not explicitly provided. It need not be technically optimal - just something reasonable.
        intellect: 14000,
        haste: 6500,
        crit: 4000,
        mastery: 2500,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    },
    talents: ['flutteringSeedlings', 'cycleOfLife', 'fontOfMagic', 'renewingBreath', 'lifeforceMender'], // These will be turned on at maximum points
    apl: [

    
    {s: "Living Flame O"},

]}

export const shadowFiendProfile = {
    defaultStats: { // This is a fallback stat allocation if one is not explicitly provided. It need not be technically optimal - just something reasonable.
        intellect: 14000,
        haste: 6500,
        crit: 4000,
        mastery: 2500,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    },
    talents: [], // These are added to a bunch of base talents that are never modified. In future it'd be nice to just input a talent code in here.
    apl: [
        // Do a big ramp if Shadowfiend is almost off cooldown. 
        {s: ["Purge the Wicked", "Power Word: Shield", "Renew", "Renew", "Renew", "Power Word: Shield", "Renew", 
                "Renew", "Flash Heal", "Power Word: Shield", "Power Word: Radiance", "Power Word: Radiance", "Evangelism",
                "Shadowfiend", "Mind Blast", "Penance", "Shadow Word: Death"], conditions: [{type: "cooldownClose", spellName: "Shadowfiend", nearTime: 14}]}, 


        // Rapture Ramp

        // Mini Ramp        
        {s: ["Purge the Wicked", "Power Word: Shield", "Renew", "Renew", "Flash Heal", "Power Word: Radiance"]},        
                
        // Core rotation
        {s: ["Rest"], conditions: [{type: "cooldownClose", spellName: "Penance", nearTime: 0.51}]}, // Rest if Penance is nearly off cooldown.        
        {s: ["Penance"]},
        {s: ["Smite"]},
    ]
    }