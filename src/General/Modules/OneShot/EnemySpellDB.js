
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
    "Darkheart Thicket": [{

    }],
    "Black Rook Hold": [{

    }],
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

