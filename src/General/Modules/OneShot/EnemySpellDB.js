
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
        "spellID": 377004
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
    "Ruby Life Pools": [],
    "The Azure Vault": [],
    "The Nokhud Offensive": [    {
        "name": "Disruptive Shout",
        "icon": "ability_warrior_battleshout",
        "baseDamage": 44084,
        "damageType": "Physical",
        "school": "Physical",
        "source": "Trash",
        "avoidance": true, // Mention if explicitly tested.
        "spellID": 384365 
    }],
    "Court of Stars": [
        {
            "name": "Slicing Maelstrom (Tick, 3 Clones)",
            "icon": "",
            "baseDamage": 3306 * 4, // Clone # + 1
            "damageType": "Physical",
            "school": "Physical",
            "source": "Boss",
            "sourceName": "Advisor Melandrus",
            "avoidance": true,
            "tags": "ignoreArmor",
            "spellID": 209676  
        },
        {
            "name": "Slicing Maelstrom (Tick, 4 Clones)",
            "icon": "",
            "baseDamage": 3306 * 5, // Clone # + 1
            "damageType": "Physical",
            "school": "Physical",
            "source": "Boss",
            "sourceName": "Advisor Melandrus",
            "avoidance": true,
            "tags": "ignoreArmor",
            "spellID": 209676  
        },
        {
            "name": "Slicing Maelstrom (Tick, 5 Clones)",
            "icon": "",
            "baseDamage": 3306 * 6, // Clone # + 1
            "damageType": "Physical",
            "school": "Physical",
            "source": "Boss",
            "sourceName": "Advisor Melandrus",
            "avoidance": true,
            "tags": "ignoreArmor",
            "spellID": 209676  
        },
        {
            "name": "Fel Detonation (Direct Damage)",
            "icon": "",
            "baseDamage": 44084,
            "damageType": "Magic",
            "school": "Fire",
            "source": "Trash",
            "sourceName": "Felbound Enforcer",
            "avoidance": true,
            "spellID": 211464
        },
        {
            "name": "Fel Detonation (DoT, Tick)",
            "icon": "",
            "baseDamage": 13225,
            "damageType": "Magic",
            "school": "Fire",
            "source": "Trash",
            "sourceName": "Felbound Enforcer",
            "avoidance": true,
            "spellID": 211464
        },
    ],
    "Halls of Valor": [
        {
            "name": "Horn of Valor",
            "icon": "",
            "baseDamage": 44084,
            "damageType": "Physical",
            "school": "Physical",
            "source": "Boss",
            "sourceName": "Hymdall",
            "avoidance": true,
            "tags": "ignoreArmor",
            "spellID": 191284
        },
        {
            "name": "Arcing Bolt",
            "icon": "",
            "baseDamage": 22042,
            "damageType": "Magic",
            "school": "Nature",
            "source": "Boss",
            "sourceName": "Hyrja",
            "avoidance": false,
            "spellID": 191976
        },
        {
            "name": "Eye of the Storm (Tick)",
            "icon": "",
            "baseDamage": 70535 * 0.25, // 75% reduction from standing in shield
            "damageType": "Magic",
            "school": "Nature",
            "source": "Boss",
            "sourceName": "Hyrja",
            "avoidance": true,
            "spellID": 200901
        },
        {
            "name": "Eye of the Storm (Total)",
            "icon": "",
            "baseDamage": 70535 * 0.25 * 6, // 75% reduction from standing in shield. 6 total ticks.
            "damageType": "Magic",
            "school": "Nature",
            "source": "Boss",
            "sourceName": "Hyrja",
            "avoidance": true,
            "spellID": 200901
        },
        {
            "name": "Claw Frenzy (Correctly Split)",
            "icon": "",
            "baseDamage": 187359 / 5, 
            "damageType": "Physical",
            "school": "Physical",
            "source": "Boss",
            "sourceName": "Fenryr",
            "tags": "ignoreArmor",
            "avoidance": true,
            "spellID": 196512
        },
        {
            "name": "Claw Frenzy (4 Soakers)",
            "icon": "",
            "baseDamage": 187359 / 4, 
            "damageType": "Physical",
            "school": "Physical",
            "source": "Boss",
            "sourceName": "Fenryr",
            "tags": "ignoreArmor",
            "avoidance": true,
            "spellID": 196512
        },
        {
            "name": "Thunderous Bolt",
            "icon": "",
            "baseDamage": 37472,
            "damageType": "Magic",
            "school": "Nature",
            "source": "Trash",
            "sourceName": "Trash",
            "avoidance": false,
            "spellID": 198595
        },
        {
            "name": "Valkyra's Advance",
            "icon": "",
            "baseDamage": 39676,
            "damageType": "Physical",
            "school": "Physical",
            "source": "Trash",
            "sourceName": "Trash",
            "avoidance": false,
            "tags": "ignoreArmor",
            "spellID": 199033
        },
    ],
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
            "spellID": 397801
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
            "spellID": 106841
        },
        {
            "name": "Touch of Nothingness (Tick)",
            "icon": "",
            "baseDamage": 18736,
            "damageType": "Magic",
            "school": "Shadow",
            "source": "Boss",
            "sourceName": "Sha of Doubt",
            "avoidance": false,
            "spellID": 106113
        },
        {
            "name": "Touch of Ruin (Absorb)",
            "icon": "",
            "baseDamage": 54336,
            "damageType": "Magic",
            "school": "Shadow",
            "source": "Trash",
            "sourceName": "Trash",
            "avoidance": false,
            "tag": "pure",
            "spellID": 397911
        },
    ],
    "Shadowmoon Burial Grounds": [
        {
            "name": "Whispers of the Dark Star (Tick)",
            "icon": "",
            "baseDamage": 11021,
            "damageType": "Magic",
            "school": "Shadow",
            "source": "Boss",
            "sourceName": "Sadana Bloodfury",
            "avoidance": false,
            "spellID": 153093
        },
        {
            "name": "Whispers of the Dark Star (Total)",
            "icon": "",
            "baseDamage": 11021 * 6,
            "damageType": "Magic",
            "school": "Shadow",
            "source": "Boss",
            "sourceName": "Sadana Bloodfury",
            "avoidance": false,
            "spellID": 153093
        },
        {
            "name": "Dark Eclipse",
            "icon": "",
            "baseDamage": 198380 * 0.2, // 80% reduction from standing in rune.
            "damageType": "Magic",
            "school": "Shadow",
            "source": "Boss",
            "sourceName": "Sadana Bloodfury",
            "avoidance": true,
            "spellID": 164974
        },
    ],
    
}