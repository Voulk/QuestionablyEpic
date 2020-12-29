
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
                efficiency: {Raid: 0.52, Dungeon: 0.4},
                cooldown: 90, 
            }
        ]
    }, 
    {
        name: 'Unbound Changeling',
        effects: [
            { 
                coefficient: 2.2, // Has been fixed on Dec 1
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
                duration: 23, // You get a 20 second duration every time you touch a new Spirit. They each live about 5 seconds.
                stacks: 3.1, // You should be able to hit all four pretty reliably, but will spend some time with lower than four stacks as you meet each.
                cooldown: 90,
            }
        ]
    },
    {
        name: 'Siphoning Phylactery Shard', 
        effects: [
            { 
                coefficient: 89.08621, // This represents the upper quartile of the given cards.  
                table: -8, 
                efficiency: 0.56, // You do have to heal a sub 35% health target every 30s for max efficiency which doesn't seem at all likely. 
                cooldown: 30, 
            }
        ]
    }, 
    {
        name: "Overflowing Anima Cage",
        effects: [
            { 
                coefficient: 0.985059,
                table: -7,  
                duration: 15, 
                multiplier: 1, // Up to four allies do benefit from standing with you. Not included in the score for now.
                cooldown: 150,
            }
        ]
    },
    {
        name: 'Vial of Spectral Essence', 
        effects: [
            { 
                coefficient: 161.3793,  
                table: -8, // TODO: Test for Crit / Vers scaling.
                efficiency: 0.95, // This should have quite a high efficiency rating because it won't heal full health targets and is split between nearby allies should it run out. 
                cooldown: 90, 
            }
        ]
    }, 
    {
        name: "Soulletting Ruby",
        effects: [
            { 
                coefficient: 2.269577,
                table: -7,  
                duration: 16, 
                multiplier: 1.62, // This assumes your average boss health is just under 50% which feels like a fair average.  
                cooldown: 120,
            },
            { 
                coefficient: 51.64138,  
                table: -8, 
                efficiency: 0.3, // You are mostly popping this for the crit bonus and won't care if you're damaged or not.
                cooldown: 120, 
            }

        ]
    },
    {
        name: "Wakener's Frond",
        effects: [
            { 
                coefficient: 3.940237,
                table: -7,  
                duration: 12, 
                multiplier: 1, 
                cooldown: 120,
            }
        ]
    },
    {
        name: 'Soulsifter Root', 
        effects: [
            { 
                coefficient: 57.12069,  
                table: -8, // TODO: Test the health transfer portion for vers / crit. It's going to be incredibly minor but worth it for accuracies sake.
                ppm: 2,
                efficiency: 0.9, // TODO: Check against logs. 
            }
        ]
    }, 
    {
        name: "Boon of the Archon",
        effects: [
            { 
                coefficient: 0.354898,
                table: -7,  
                duration: 14, // This one is tricky because the duration is refreshed if another player walks over one. Max duration is ~20 seconds per proc.
                efficiency: 0.85, 
                ppm: 1,
            },
            { 
                coefficient: 11.89655,  
                table: -8, 
                efficiency: 0.72, // These are unlikely to overheal, but players have to run over them so some might naturally expire. Full health players can also waste them.
                ppm: 1,
            }

        ]
    },
    {
        name: 'Spiritual Alchemy Stone',
        effects: [
            { 
                coefficient: 1.987097, 
                table: -1,  
                duration: 15, 
                ppm: 1
            },
        ]
    },
    {
        name: "Sinful Gladiator's Insignia of Alacrity",
        effects: [
            { 
                coefficient: 1.116129, 
                table: -1,  
                duration: 20, 
                ppm: 1.5
            },
        ]
    },
    {
    name: "Sinful Gladiator's Badge of Ferocity",
    effects: [
        { 
            coefficient: 1.322581, 
            table: -1,  
            duration: 15, 
            cooldown: 60,
        },
    ]
},
    {
    name: "Inscrutable Quantum Device",
    effects: [
        { 
            coefficient: 3.55, 
            table: -1,  
            duration: 30, 
            cooldown: 180,
        },
    ]
},
    {
        name: "Flame of Battle",
        effects: [
            { 
                coefficient: 2.955178, 
                table: -1,  
                duration: 12, 
                cooldown: 90,
            },
        ]
    },
    {
        name: "Misfiring Centurion Controller",
        effects: [
            { 
                coefficient: 1.406452, 
                table: -1,  
                duration: 15, 
                ppm: 1.5
            },
        ]
    },
    {
        name: "Book-Borrower Identification",
        effects: [
            { 
                coefficient: 1.319979, 
                table: -1,  
                duration: 12, 
                ppm: 2
            },
        ]
    },
    {
        name: "Glimmerdust's Grand Design",
        effects: [
            {   // HoT Portion
                coefficient: 1.931035,
                table: -8,  
                efficiency: 0.6, // Falls off when the target falls below 35% health. Efficiency in this case is the HoT uptime.
                totalTicks: 40, // 120 / 3. This scales with haste, which will be applied during the trinket formula.
            },
            {   // Absorb Portion
                coefficient: 249.431,
                table: -8,  
                efficiency: 0.9, // It's incredibly likely that your priority target will drop below 35% over a two minute period.
            },
        ]
    },
    {
        name: "Consumptive Infusion",
        effects: [
            {   // HoT Portion
                coefficient: 1.65,
                table: -7,  
                efficiency: 0.41,
                duration: 10, // Falls off when the target falls below 35% health. Efficiency in this case is the HoT uptime.
                cooldown: 30, 
                expectedTargetThroughput: 4600, // Could technically be pulled from logs
            },
        ]
    },
    {
        name: 'Tuft of Smoldering Plumage', 
        effects: [
            { 
                coefficient: 326.7931,  
                table: -8, // TODO: Test for Crit / Vers scaling.
                efficiency: 0.82, 
                // This one is very awkward. You're using it as a Guardian Spirit effect more often than using it because the heal is useful. 
                // A massive heal on an injured target has massive life-saving potential, but I'm not sure how well it can be modelled except
                // to assume the heal will have quite a high efficiency in dangerous scenarios.
                cooldown: 120, 
            }
        ]
    }, 

    // ULDUAR TIMEWALKING TRINKETS
    // Two interesting mana options + nine generic stat procs / on-use options.
    {
        name: "Elemental Focus Stone", // Haste proc on damaging spells.
        effects: [
            { 
                coefficient: 1.99949,
                table: -1,  
                duration: 10, 
                ppm: {"Restoration Druid": 1.2, "Discipline Priest": 1.5, "Holy Paladin": 1.5, 
                    "Mistweaver Monk": 1.4, "Restoration Shaman": 1.2, "Holy Priest": 1.2}, 

            }
        ]
    },
    {
        name: "Energy Siphon", // Crit on-use trinket
        effects: [
            { 
                coefficient: 2.399108,
                table: -1,  
                duration: 20, 
                cooldown: 120,
            }
        ]
    },
    {
        name: "Eye of the Broodmother", 
        // Int on spell cast, effectively has a 100% uptime since the ramp up is near immediate. 
        effects: [
            { 
                coefficient: 0.10503,
                table: -1,  
                stacks: 5,
                uptime: 1, 
            }
        ]
    },
    {
        name: "Flare of the Heavens", // Int proc on damaging spells.
        effects: [
            { 
                coefficient: 2.353487,
                table: -1,  
                duration: 10, 
                ppm: {"Restoration Druid": 1.1, "Discipline Priest": 1.25, "Holy Paladin": 1.25, 
                    "Mistweaver Monk": 1.2, "Restoration Shaman": 1.1, "Holy Priest": 1.1}, 

            }
        ]
    },
    {
        name: "Living Flame", // Int on-use trinket
        effects: [
            { 
                coefficient: 2.000788,
                table: -1,  
                duration: 20, 
                cooldown: 120,
            }
        ]
    },
    {
        name: "Pandora's Plea", // Int proc
        effects: [
            { 
                coefficient: 1.561615,
                table: -1,  
                duration: 10, 
                ppm: 2,

            }
        ]
    },
    {
        name: "Scale of Fates", // Haste proc
        effects: [
            { 
                coefficient: 2.39909,
                table: -1,  
                duration: 20, 
                cooldown: 120,

            }
        ]
    },
    {
        name: "Sif's Remembrance", // Int proc on healing spells
        effects: [
            { 
                coefficient: 1.125146,
                table: -1,  
                duration: 15, 
                ppm: 2,

            }
        ]
    },
    {
        name: "Show of Faith", // Mana Proc
        effects: [
            { 
                coefficient: 8.996611,
                table: -7,  
                ppm: 2,

            }
        ]
    },
    {
        name: "Spark of Hope", // Mana cost reduction on spells
        effects: [
            { 
                coefficient: 0.450353,
                table: -7,  

            }
        ]
    },
    
    
]

