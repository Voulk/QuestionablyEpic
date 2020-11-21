
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
]

