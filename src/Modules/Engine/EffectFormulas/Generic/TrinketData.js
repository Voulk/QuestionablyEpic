
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
                expectedEfficiency: 0.4, 
                cooldown: 120, 
                targets: 5,
                ticks: 3,
                meteor: 0.15, 
            }
        ]
    }, 
    {
        name: 'Tear Anima',
        effects: [
            { 
                tags: [TAGS.ON_USE], 
                benefit: 'dps', 
                coefficient: 54.7013, 
                table: -8, 
                cooldown: 90, 
                targets: 1 
            },
            { 
                tags: [TAGS.DURATION, TAGS.ON_USE], 
                benefit: 'intellect', 
                coefficient: 1.086957, 
                table: -1, 
                expectedEfficiency: 0.8, 
                duration: 15, 
                cooldown: 90, 
                targets: 1 
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
                cooldown: 60, 
                expectedEfficiency: 0.9,
                targets: 1 
            },
            { 
                tags: [TAGS.ON_USE], 
                benefit: 'hps', 
                coefficient: 80.17241, 
                table: -8, 
                expectedEfficiency: 0.9, 
                cooldown: 60, 
                targets: 1 
            }
        ]
    }
]

