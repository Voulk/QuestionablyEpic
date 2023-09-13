
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
    "Waycrest Manor": [{

    }],
    "Atal'Dazar": [{

    }],
    "Everbloom": [{

    }],
    "Throne of the Tides": [{

    }]


    
}