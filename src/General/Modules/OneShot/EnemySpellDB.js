
// We use tags to handle special cases. Basically any ability that doesn't fit a standard pattern. 
// - pure: Not affected by any DR. Example: An absorb placed on the target.
// - ignoreArmor: A physical spell that is not reduced by armor. Example: A bleed effect, or an inconsistently applied physical damage effect.
export const enemySpellDB = 
{
    "Algeth'ar Academy": [{
        "name": "Defeaning Screech (3)",
        "icon": "ability_vehicle_sonicshockwave",
        "baseDamage": 26451 * (1 + 0.5 * 2),
        "damageType": "Magic",
        "school": "Nature",
        "source": "Boss",
        "avoidance": true, // Mention if explicitly tested.
    },
    {
        "name": "Defeaning Screech (4)",
        "icon": "ability_vehicle_sonicshockwave",
        "baseDamage": 26451 * (1 + 0.5 * 3),
        "damageType": "Magic",
        "school": "Nature",
        "source": "Boss",
        "avoidance": true, // Mention if explicitly tested.
    },
    {
        "name": "Defeaning Screech (5)",
        "icon": "ability_vehicle_sonicshockwave",
        "baseDamage": 26451 * (1 + 0.5 * 4),
        "damageType": "Magic",
        "school": "Nature",
        "source": "Boss",
        "avoidance": true, // Mention if explicitly tested.
    }],
    "Ruby Life Pools": [],
    "The Azure Vault": [],
    "The Nokhud Offensive": [],
    "Court of Stars": [],
    "Halls of Valor": [],
    "Temple of the Jade Serpent": [
        {
            "name": "Hydrolance",
            "icon": "",
            "baseDamage": 33063,
            "damageType": "Magic",
            "school": "Frost",
            "source": "Boss",
            "sourceName": "Wise Mari",
            "avoidance": false,
        },
        {
            "name": "Jade Serpent Strike (Absorb)",
            "icon": "",
            "baseDamage": 90560,
            "damageType": "Magic",
            "school": "Frost",
            "source": "Boss",
            "sourceName": "Liu Flameheart",
            "avoidance": false,
            "tag": "pure",
        }
    ],
    "Shadowmoon Burial Grounds": [],
    
}