
// We use tags to handle special cases. Basically any ability that doesn't fit a standard pattern. 
// - pure: Not affected by any DR. Example: An absorb placed on the target.
// - ignoreArmor: A physical spell that is not reduced by armor. Example: A bleed effect, or an inconsistently applied physical damage effect.
export const enemySpellDB = 
{
    "Black Rook Hold": [
        {
            "name": "Reap Soul",
            "spellID": 194956,
            "bossName": "The Amalgam of Souls",
            "baseDamage": 147748,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Soul Echoes",
            "spellID": 194960,
            "bossName": "The Amalgam of Souls",
            "baseDamage": 92343,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Soul Burst",
            "spellID": 196587,
            "bossName": "The Amalgam of Souls",
            "baseDamage": 81262,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Vengeful Shear (Tank)",
            "spellID": 197418,
            "bossName": "Illysanna Ravencrest",
            "baseDamage": 184685,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Dark Rush",
            "spellID": 197478,
            "bossName": "Illysanna Ravencrest",
            "baseDamage": 72027,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Brutal Glaive (Direct)",
            "spellID": 197546,
            "bossName": "Illysanna Ravencrest",
            "baseDamage": 59099,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Brutal Glaive (DoT)",
            "spellID": 197546,
            "bossName": "Illysanna Ravencrest",
            "baseDamage": 14775,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Arcane Blitz",
            "spellID": 197797,
            "bossName": "Illysanna Ravencrest",
            "baseDamage": 55406,
            "damageType": "Magic",
            "school": "Arcane",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Earthshaking Stomp",
            "spellID": 198073,
            "bossName": "Smashspite the Hateful",
            "baseDamage": 59099,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Hateful Charge",
            "spellID": 198080,
            "bossName": "Smashspite the Hateful",
            "baseDamage": 81262,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Brutal Haymaker (Tank)",
            "spellID": 198245,
            "bossName": "Smashspite the Hateful",
            "baseDamage": 147748,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Unerring Shear (Direct)",
            "spellID": 198635,
            "bossName": "Lord Kur'talos Ravencrest",
            "baseDamage": 147748,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Unerring Shear (DoT)",
            "spellID": 198635,
            "bossName": "Lord Kur'talos Ravencrest",
            "baseDamage": 14775,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Whirling Blade",
            "spellID": 198641,
            "bossName": "Lord Kur'talos Ravencrest",
            "baseDamage": 92343,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Shadow Bolt",
            "spellID": 198833,
            "bossName": "Lord Kur'talos Ravencrest",
            "baseDamage": 71836,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Stinging Swarm (DoT)",
            "spellID": 201733,
            "bossName": "Lord Kur'talos Ravencrest",
            "baseDamage": 77568,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Shadow Bolt Volley",
            "spellID": 202019,
            "bossName": "Lord Kur'talos Ravencrest",
            "baseDamage": 110811,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        }
    ],
    "Darkheart Thicket": [
        {
            "name": "Grievous Tear (DoT)",
            "spellID": 196376,
            "bossName": "Archdruid Glaidalis",
            "baseDamage": 35090,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Crushing Grip (Direct)",
            "spellID": 204611,
            "bossName": "Oakheart",
            "baseDamage": 92342,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Crushing Grip (DoT)",
            "spellID": 204611,
            "bossName": "Oakheart",
            "baseDamage": 73874,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Strangling Roots (DoT)",
            "spellID": 199063,
            "bossName": "Oakheart",
            "baseDamage": 15884,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Shattered Earth",
            "spellID": 204666,
            "bossName": "Oakheart",
            "baseDamage": 77568,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Nightmare Breath (Direct)",
            "spellID": 204667,
            "bossName": "Oakheart",
            "baseDamage": 59099,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Nightmare Breath (DoT)",
            "spellID": 204667,
            "bossName": "Oakheart",
            "baseDamage": 18469,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Breath of Corruption (DoT)",
            "spellID": 191325,
            "bossName": "Dresaron",
            "baseDamage": 59099,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Down Draft (DoT)",
            "spellID": 199345,
            "bossName": "Dresaron",
            "baseDamage": 14775,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Earthshaking Roar (Direct)",
            "spellID": 199389,
            "bossName": "Dresaron",
            "baseDamage": 73874,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Earthshaking Roar (DoT)",
            "spellID": 199389,
            "bossName": "Dresaron",
            "baseDamage": 36937,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Feed on the Weak (DoT)",
            "spellID": 200238,
            "bossName": "Shade of Xavius",
            "baseDamage": 18469,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Nightmare Bolt",
            "spellID": 200185,
            "bossName": "Shade of Xavius",
            "baseDamage": 60946,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Apocalyptic Nightmare",
            "spellID": 200050,
            "bossName": "Shade of Xavius",
            "baseDamage": 99730,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        }
    ],
    "Atal'Dazar": [
        {
            "name": "Devour (DoT)",
            "spellID": 255421,
            "bossName": "Rezan",
            "baseDamage": 73881,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Toxic Leap",
            "spellID": 250258,
            "bossName": "Vol'kaal",
            "baseDamage": 110811,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Lingering Nausea (DoT)",
            "spellID": 250372,
            "bossName": "Vol'kaal",
            "baseDamage": 9499,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Soulrend",
            "spellID": 259190,
            "bossName": "Yazma",
            "baseDamage": 67447,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Soulfeast (DoT)",
            "spellID": 256577,
            "bossName": "Yazma",
            "baseDamage": 11081,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Echoes of Shadra",
            "spellID": 250050,
            "bossName": "Yazma",
            "baseDamage": 121892,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Wracking Pain (Direct)",
            "spellID": 250096,
            "bossName": "Yazma",
            "baseDamage": 55405,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Wracking Pain (DoT)",
            "spellID": 250096,
            "bossName": "Yazma",
            "baseDamage": 25856,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Skewer (Tank)",
            "spellID": 249919,
            "bossName": "Yazma",
            "baseDamage": 203153,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Tainted Blood (DoT)",
            "spellID": 255558,
            "bossName": "Priestess Alun'za",
            "baseDamage": 25856,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Transfusion (DoT)",
            "spellID": 255577,
            "bossName": "Priestess Alun'za",
            "baseDamage": 11081,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        }
    ]
};
