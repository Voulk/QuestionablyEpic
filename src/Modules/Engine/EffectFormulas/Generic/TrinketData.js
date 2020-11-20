
export const TAGS = {
    ON_USE: 'on-use',
    MULTIPLIER: 'multiplier',
    DURATION: 'duration',
    PPM: 'ppm',
    HASTED_PPM: 'hasted-ppm',
    DURATION_BASED: 'duration-based'
}

export const trinket_data = [
    {
        name: 'Lingering Sunmote',
        effects: [
            { 
                tags: [TAGS.ON_USE, TAGS.MULTIPLIER], 
                benefit: 'HPS', 
                coefficient: 45.58441, 
                table: -8, 
                expectedEfficiency: 0.4, 
                cooldown: 120, 
                targets: 2 * 5 
            }
        ]
    }, // Drop: Sang Depths
    {
        name: 'Tear Anima',
        effects: [
            { 
                tags: [TAGS.ON_USE], 
                benefit: 'DPS', 
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
    }
]

