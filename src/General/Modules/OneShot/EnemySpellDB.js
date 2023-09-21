
// We use tags to handle special cases. Basically any ability that doesn't fit a standard pattern. 
// - pure: Not affected by any DR. Example: An absorb placed on the target.
// - ignoreArmor: A physical spell that is not reduced by armor. Example: A bleed effect, or an inconsistently applied physical damage effect.
export const enemySpellDB = 
{
    "Algeth'ar Academy": [{
        // Note that Defeaning Screech can be evaded.
        "name": "Defeaning Screech (3)",
        "icon": "ability_vehicle_sonicshockwave",
        "baseDamage": 26451 * (1 + 0.5 * 2),
        "damageType": "Magic",
        "school": "Nature",
        "source": "Boss",
        "avoidance": true, // Mention if explicitly tested.
        "spellID": 377004,
    },
    {
        "name": "Defeaning Screech (4)",
        "icon": "ability_vehicle_sonicshockwave",
        "baseDamage": 26451 * (1 + 0.5 * 3),
        "damageType": "Magic",
        "school": "Nature",
        "source": "Boss",
        "avoidance": true, // Mention if explicitly tested.
        "spellID": 377004
    },
    {
        "name": "Defeaning Screech (5)",
        "icon": "ability_vehicle_sonicshockwave",
        "baseDamage": 26451 * (1 + 0.5 * 4),
        "damageType": "Magic",
        "school": "Nature",
        "source": "Boss",
        "avoidance": true, // Mention if explicitly tested.
        "spellID": 377004
    }],
    "Dawn of the Infinites: Galakrond's Fall": [{
        // Note that Defeaning Screech can be evaded.
        "name": "Defeaning Screech (3)",
        "icon": "ability_vehicle_sonicshockwave",
        "baseDamage": 26451 * (1 + 0.5 * 2),
        "damageType": "Magic",
        "school": "Nature",
        "source": "Boss",
        "avoidance": true, // Mention if explicitly tested.
        "spellID": 377004,
    }],
    "Dawn of the Infinites: Murozond's Rise": [{

    }],
    "Darkheart Thicket": 
    [
        {
            "name": "Grievous Leap",
            "spellID": 196348,
            "bossName": "Archdruid Glaidalis",
            "baseDamage": 32768,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Grievous Tear (DoT)",
            "spellID": 196376,
            "bossName": "Archdruid Glaidalis",
            "baseDamage": 19456,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Crushing Grip (Direct)",
            "spellID": 204611,
            "bossName": "Oakheart",
            "baseDamage": 40959,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Crushing Grip (DoT)",
            "spellID": 204611,
            "bossName": "Oakheart",
            "baseDamage": 2191,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Shattered Earth",
            "spellID": 204666,
            "bossName": "Oakheart",
            "baseDamage": 43007,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Nightmare Breath (Direct)",
            "spellID": 204667,
            "bossName": "Oakheart",
            "baseDamage": 32768,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Nightmare Breath (DoT)",
            "spellID": 204667,
            "bossName": "Oakheart",
            "baseDamage": 10240,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Breath of Corruption (DoT)",
            "spellID": 191325,
            "bossName": "Dresaron",
            "baseDamage": 32768,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Down Draft (DoT)",
            "spellID": 199345,
            "bossName": "Dresaron",
            "baseDamage": 8192,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Earthshaking Roar (Direct)",
            "spellID": 199389,
            "bossName": "Dresaron",
            "baseDamage": 40959,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Earthshaking Roar (DoT)",
            "spellID": 199389,
            "bossName": "Dresaron",
            "baseDamage": 20480,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Feed on the Weak (DoT)",
            "spellID": 200238,
            "bossName": "Shade of Xavius",
            "baseDamage": 10240,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Nightmare Bolt",
            "spellID": 200185,
            "bossName": "Shade of Xavius",
            "baseDamage": 33791,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Apocalyptic Nightmare",
            "spellID": 200050,
            "bossName": "Shade of Xavius",
            "baseDamage": 55295,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        }
    ],
    "Black Rook Hold": 
    [
        {
            "name": "Reap Soul",
            "spellID": 194956,
            "baseDamage": 147748,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Swirling Scythe",
            "spellID": 196517,
            "baseDamage": 92342,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Soul Echoes",
            "spellID": 194960,
            "baseDamage": 92343,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Soul Burst",
            "spellID": 196587,
            "baseDamage": 81262,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Vengeful Shear (Tank)",
            "spellID": 197418,
            "baseDamage": 184685,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Dark Rush",
            "spellID": 197478,
            "baseDamage": 72027,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Brutal Glaive (Direct)",
            "spellID": 197546,
            "baseDamage": 59099,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Brutal Glaive (DoT)",
            "spellID": 197546,
            "baseDamage": 14775,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Arcane Blitz",
            "spellID": 197797,
            "baseDamage": 55406,
            "damageType": "Magic",
            "school": "Arcane",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Earthshaking Stomp",
            "spellID": 198073,
            "baseDamage": 59099,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Hateful Charge",
            "spellID": 198080,
            "baseDamage": 81262,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Brutal Haymaker (Tank)",
            "spellID": 198245,
            "baseDamage": 147748,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Unerring Shear (Direct)",
            "spellID": 198635,
            "baseDamage": 147748,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Unerring Shear (DoT)",
            "spellID": 198635,
            "baseDamage": 14775,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Whirling Blade",
            "spellID": 198641,
            "baseDamage": 92343,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Shadow Bolt",
            "spellID": 198833,
            "baseDamage": 71836,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Stinging Swarm (DoT)",
            "spellID": 201733,
            "baseDamage": 77568,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Shadow Bolt Volley",
            "spellID": 202019,
            "baseDamage": 110811,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        }
    ],
    "Waycrest Manor": 
    [
        {
            "name": "Bramble Bolt",
            "spellID": 260701,
            "baseDamage": 11225,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Jagged Nettles (Direct)",
            "spellID": 260741,
            "baseDamage": 36863,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Jagged Nettles (DoT)",
            "spellID": 260741,
            "baseDamage": 9216,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Aura of Thorns (DoT)",
            "spellID": 268122,
            "baseDamage": 3072,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Ruinous Bolt",
            "spellID": 260700,
            "baseDamage": 10137,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Unstable Runic Mark (Direct)",
            "spellID": 260703,
            "baseDamage": 28672,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Unstable Runic Mark (DoT)",
            "spellID": 260703,
            "baseDamage": 5120,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Aura of Dread (DoT)",
            "spellID": 268088,
            "baseDamage": 510,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Soul Bolt",
            "spellID": 260699,
            "baseDamage": 10137,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Soul Thorns (DoT)",
            "spellID": 260551,
            "baseDamage": 1134,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Crush (Tank)",
            "spellID": 260508,
            "baseDamage": 92159,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Wildfire (DoT)",
            "spellID": 260570,
            "baseDamage": 2127,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Burning Brush (DoT)",
            "spellID": 260541,
            "baseDamage": 8192,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        }
    ],
    "Atal'Dazar": 
        [
            {
                "name": "Rapid Decay (DoT)",
                "spellID": 250241,
                "baseDamage": 607,
                "damageType": "Magic",
                "school": "Shadow",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Toxic Pool (DoT)",
                "spellID": 250585,
                "baseDamage": 5687,
                "damageType": "Magic",
                "school": "Nature",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Toxic Leap",
                "spellID": 250258,
                "baseDamage": 61439,
                "damageType": "Magic",
                "school": "Nature",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Noxious Stench (DoT)",
                "spellID": 250368,
                "baseDamage": 20479,
                "damageType": "Magic",
                "school": "Nature",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Lingering Nausea (DoT)",
                "spellID": 250372,
                "baseDamage": 5267,
                "damageType": "Magic",
                "school": "Nature",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Soulrend",
                "spellID": 259190,
                "baseDamage": 37396,
                "damageType": "Magic",
                "school": "Shadow",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Soulfeast (DoT)",
                "spellID": 256577,
                "baseDamage": 851,
                "damageType": "Magic",
                "school": "Shadow",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Echoes of Shadra",
                "spellID": 250050,
                "baseDamage": 67583,
                "damageType": "Magic",
                "school": "Shadow",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Shadowy Remains (DoT)",
                "spellID": 250036,
                "baseDamage": 1843,
                "damageType": "Magic",
                "school": "Shadow",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Wracking Pain (DoT)",
                "spellID": 250096,
                "baseDamage": 14336,
                "damageType": "Magic",
                "school": "Shadow",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Wracking Pain (DoT)",
                "spellID": 250096,
                "baseDamage": 14336,
                "damageType": "Magic",
                "school": "Shadow",
                "avoidance": false,
                "source": "Boss"
            },
            {
                "name": "Skewer (Tank)",
                "spellID": 249919,
                "baseDamage": 112638,
                "damageType": "Physical",
                "school": "Physical",
                "avoidance": false,
                "source": "Boss"
            }
        ],
    "Everbloom": [{

    }],
    "Throne of the Tides": [{

    }]


    
}

