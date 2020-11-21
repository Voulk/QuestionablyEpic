
export const TAGS = {
    ON_USE: 'on-use',
    MULTIPLIER: 'multiplier',
    DURATION: 'duration',
    PPM: 'ppm',
    HASTED_PPM: 'hasted-ppm',
    DURATION_BASED: 'duration-based',
    METEOR: 'meteor', // The meteor effect increases a trinkets value by X based on targets hit up to Y. X should be represented as 'multiplier' and Y as the 'cap'.
    TICKS: 'ticks',
}

export const trinket_data = [
    {
        name: 'Lingering Sunmote', // Drop: Sang Depths
        effects: [
            { 
                tags: [TAGS.ON_USE, TAGS.MULTIPLIER, TAGS.METEOR, TAGS.TICKS], 
                benefit: 'hps', 
                coefficient: 45.58441, 
                table: -8, 
                efficiency: 0.85, 
                cooldown: 120, 
                targets: 5,
                ticks: 3,
                meteor: 0.15, 
            }
        ]
    }, 
    {
        name: 'Sunblood Amethyst',
        effects: [
            { 
                tags: [TAGS.ON_USE], 
                benefit: 'dps', 
                coefficient: 71.74138, 
                table: -8, 
                cooldown: 90, 
            },
            { 
                tags: [TAGS.DURATION, TAGS.ON_USE], 
                benefit: 'intellect', 
                coefficient: 0.993548, 
                table: -1, 
                expectedEfficiency: 0.75, 
                duration: 15, 
                cooldown: 90, 
            }
        ]
    },
    {
        name: 'Manabound Mirror',
        effects: [
            { 
                tags: [TAGS.SPECIAL], 
                benefit: 'hps', 
                coefficient: 12.82759, 
                table: -8, 
            },
            { 
                tags: [TAGS.ON_USE], 
                benefit: 'hps', 
                coefficient: 80.17241, 
                table: -8, 
                cooldown: 60, 
                efficiency: 0.92,
            }
        ]
    },
    {
        name: 'Darkmoon Deck: Repose', // Drop: Sang Depths
        effects: [
            { 
                tags: [TAGS.ON_USE, TAGS.MULTIPLIER, TAGS.METEOR, TAGS.TICKS], 
                benefit: 'hps', 
                coefficient: 467.66378, // This represents the upper quartile of the given cards.  
                table: -8, 
                efficiency: 0.9, 
                cooldown: 90, 
            }
        ]
    }, 
    {
        name: 'Unbound Changeling',
        effects: [
            { 
                coefficient: 1.1, // Tooltip suggests 2.2 but in-game it gives you 1.1. TODO: Check after release. 
                table: -1,  
                duration: 12, 
                ppm: 1.5 
            }
        ]
    },
    {
        name: "Cabalist's Hymnal",
        effects: [
            { 
                coefficient: 0.467903,
                table: -7,  
                duration: 30, 
                stacks: 2, // You get 10s of one stack, 10 of two, then 10 of three.
                multiplier: 1, // Every ally that wears it in your party gives a 5% increase. Not implemented for now, but add to Settings.
                ppm: 1 
            }
        ]
    },
    {
        name: "Macabre Sheet Music",
        effects: [
            { 
                coefficient: 0.467903,
                table: -7,  
                duration: 26, // You get a 20 second duration every time you touch a new Spirit. They each live about 5 seconds.
                stacks: 3.2, // You should be able to hit all four pretty reliably, but will spend some time with lower than four stacks as you meet each.
                cooldown: 90,
            }
        ]
    },
    {
        name: 'Siphoning Phylactery', // Drop: Sang Depths
        effects: [
            { 
                coefficient: 89.08621, // This represents the upper quartile of the given cards.  
                table: -8, 
                efficiency: 0.65, // You do have to heal a sub 35% health target every 30s for max efficiency which doesn't seem at all likely. 
                cooldown: 30, 
            }
        ]
    }, 
    
    
]

