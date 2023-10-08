
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
    "Throne of the Tides": [
        {
            "name": "Geyser",
            "spellID": 427769,
            "bossName": "Lady Naz'jar",
            "baseDamage": 112658,
            "damageType": "Magic",
            "school": "Frost",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Trident Flurry (DoT)",
            "spellID": 428293,
            "bossName": "Lady Naz'jar",
            "baseDamage": 33243,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Frostbolt",
            "spellID": 428103,
            "bossName": "Lady Naz'jar",
            "baseDamage": 48018,
            "damageType": "Magic",
            "school": "Frost",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Shock Blast",
            "spellID": 428041,
            "bossName": "Lady Naz'jar",
            "baseDamage": 81262,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Geyser",
            "spellID": 427769,
            "bossName": "Lady Naz'jar",
            "baseDamage": 112658,
            "damageType": "Magic",
            "school": "Frost",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Focused Tempest",
            "spellID": 428376,
            "bossName": "Lady Naz'jar",
            "baseDamage": 64640,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Water Bolt",
            "spellID": 428263,
            "bossName": "Lady Naz'jar",
            "baseDamage": 49865,
            "damageType": "Magic",
            "school": "Frost",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Bubbling Fissure",
            "spellID": 427672,
            "bossName": "Commander Ulthok the Festering Prince",
            "baseDamage": 132973,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Festering Shockwave (Direct)",
            "spellID": 427668,
            "bossName": "Commander Ulthok the Festering Prince",
            "baseDamage": 60946,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Festering Shockwave (DoT)",
            "spellID": 427668,
            "bossName": "Commander Ulthok the Festering Prince",
            "baseDamage": 7387,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Crushing Claw",
            "spellID": 427670,
            "bossName": "Commander Ulthok the Festering Prince",
            "baseDamage": 221622,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Earthfury (DoT)",
            "spellID": 429051,
            "bossName": "Mindbender Ghur'sha",
            "baseDamage": 55406,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Flame Shock (Direct)",
            "spellID": 429048,
            "bossName": "Mindbender Ghur'sha",
            "baseDamage": 55406,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Flame Shock (DoT)",
            "spellID": 429048,
            "bossName": "Mindbender Ghur'sha",
            "baseDamage": 14775,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Terrifying Vision",
            "spellID": 429172,
            "bossName": "Mindbender Ghur'sha",
            "baseDamage": 110811,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Mind Rot",
            "spellID": 429173,
            "bossName": "Mindbender Ghur'sha",
            "baseDamage": 29550,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Blotting Barrage",
            "spellID": 428399,
            "bossName": "Ozumat",
            "baseDamage": 67410,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Blotting Darkness (DoT)",
            "spellID": 428404,
            "bossName": "Ozumat",
            "baseDamage": 27703,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Putrid Roar (Direct)",
            "spellID": 428868,
            "bossName": "Ozumat",
            "baseDamage": 55406,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Putrid Roar (DoT)",
            "spellID": 428868,
            "bossName": "Ozumat",
            "baseDamage": 14775,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Murk Spew",
            "spellID": 428530,
            "bossName": "Ozumat",
            "baseDamage": 166217,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Deluge of Filth",
            "spellID": 428594,
            "bossName": "Ozumat",
            "baseDamage": 129280,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Gushing Ink",
            "spellID": 428621,
            "bossName": "Ozumat",
            "baseDamage": 129280,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Blotting Darkness (DoT)",
            "spellID": 428404,
            "bossName": "Ozumat",
            "baseDamage": 27703,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Ink Blast",
            "spellID": 428526,
            "bossName": "Ozumat",
            "baseDamage": 42478,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Tidal Surge (DoT)",
            "spellID": 428952,
            "bossName": "Ozumat",
            "baseDamage": 923426,
            "damageType": "Magic",
            "school": "Frost",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Raining Darkness (DoT)",
            "spellID": 429046,
            "bossName": "Ozumat",
            "baseDamage": 36937,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        }
    ],
    "Waycrest Manor": [
        {
            "name": "Bramble Bolt",
            "spellID": 260701,
            "bossName": "Heartsbane Triad",
            "baseDamage": 20245,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Jagged Nettles (Direct)",
            "spellID": 260741,
            "bossName": "Heartsbane Triad",
            "baseDamage": 66487,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Jagged Nettles (DoT)",
            "spellID": 260741,
            "bossName": "Heartsbane Triad",
            "baseDamage": 16622,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Aura of Thorns (DoT)",
            "spellID": 268122,
            "bossName": "Heartsbane Triad",
            "baseDamage": 5541,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Ruinous Bolt",
            "spellID": 260700,
            "bossName": "Heartsbane Triad",
            "baseDamage": 18284,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Unstable Runic Mark (Direct)",
            "spellID": 260703,
            "bossName": "Heartsbane Triad",
            "baseDamage": 51712,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Unstable Runic Mark (DoT)",
            "spellID": 260703,
            "bossName": "Heartsbane Triad",
            "baseDamage": 9234,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Aura of Dread (DoT)",
            "spellID": 268088,
            "bossName": "Heartsbane Triad",
            "baseDamage": 6649,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Soul Bolt",
            "spellID": 260699,
            "bossName": "Heartsbane Triad",
            "baseDamage": 18284,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Dire Ritual",
            "spellID": 260773,
            "bossName": "Heartsbane Triad",
            "baseDamage": 88649,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Crush (Tank)",
            "spellID": 260508,
            "bossName": "Soulbound Goliath",
            "baseDamage": 166217,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Burning Brush (DoT)",
            "spellID": 260541,
            "bossName": "Soulbound Goliath",
            "baseDamage": 14775,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Consume All (DoT)",
            "spellID": 264734,
            "bossName": "Raal the Gluttonous",
            "baseDamage": 101577,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Tenderize",
            "spellID": 264923,
            "bossName": "Raal the Gluttonous",
            "baseDamage": 110811,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Rotten Expulsion (Direct)",
            "spellID": 264694,
            "bossName": "Raal the Gluttonous",
            "baseDamage": 71104,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Rotten Expulsion (DoT)",
            "spellID": 264694,
            "bossName": "Raal the Gluttonous",
            "baseDamage": 27728,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Bile Explosion",
            "spellID": 268234,
            "bossName": "Raal the Gluttonous",
            "baseDamage": 55406,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Wracking Chord",
            "spellID": 268271,
            "bossName": "Lord and Lady Waycrest",
            "baseDamage": 31396,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Discordant Cadenza",
            "spellID": 268306,
            "bossName": "Lord and Lady Waycrest",
            "baseDamage": 73874,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Wasting Strike (Direct)",
            "spellID": 261438,
            "bossName": "Lord and Lady Waycrest",
            "baseDamage": 73874,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Wasting Strike (DoT)",
            "spellID": 261438,
            "bossName": "Lord and Lady Waycrest",
            "baseDamage": 18469,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Virulent Pathogen (DoT)",
            "spellID": 261440,
            "bossName": "Lord and Lady Waycrest",
            "baseDamage": 16622,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Dread Essence",
            "spellID": 266181,
            "bossName": "Gorak Tul",
            "baseDamage": 64640,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Death Lens (DoT)",
            "spellID": 268202,
            "bossName": "Gorak Tul",
            "baseDamage": 24009,
            "damageType": "Magic",
            "school": "Shadow",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Dark Leap (DoT)",
            "spellID": 273657,
            "bossName": "Gorak Tul",
            "baseDamage": 24378,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Darkened Lightning",
            "spellID": 266225,
            "bossName": "Gorak Tul",
            "baseDamage": 54852,
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
            "baseDamage": 92343,
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
            "baseDamage": 132973,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Nightmare Breath (DoT)",
            "spellID": 204667,
            "bossName": "Oakheart",
            "baseDamage": 55406,
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
            "baseDamage": 11081,
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
    ],
    "Everbloom": [
        {
            "name": "Parched Gasp",
            "spellID": 164357,
            "bossName": "Witherbark",
            "baseDamage": 147748,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Unchecked Growth (DoT)",
            "spellID": 164294,
            "bossName": "Witherbark",
            "baseDamage": 36937,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Agitated Water",
            "spellID": 177734,
            "bossName": "Witherbark",
            "baseDamage": 55406,
            "damageType": "Magic",
            "school": "Frost",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Aqueous Burst",
            "spellID": 164538,
            "bossName": "Witherbark",
            "baseDamage": 33243,
            "damageType": "Magic",
            "school": "Frost",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Water Bolt",
            "spellID": 168092,
            "bossName": "Ancient Protectors",
            "baseDamage": 36937,
            "damageType": "Magic",
            "school": "Frost",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Nature's Wrath",
            "spellID": 168040,
            "bossName": "Ancient Protectors",
            "baseDamage": 36937,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Noxious Charge",
            "spellID": 427512,
            "bossName": "Ancient Protectors",
            "baseDamage": 147748,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Noxious Discharge (DoT)",
            "spellID": 427513,
            "bossName": "Ancient Protectors",
            "baseDamage": 44324,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Fireball",
            "spellID": 427858,
            "bossName": "Archmage Sol",
            "baseDamage": 110811,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Frostbolt",
            "spellID": 427863,
            "bossName": "Archmage Sol",
            "baseDamage": 110811,
            "damageType": "Magic",
            "school": "Frost",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Arcane Blast",
            "spellID": 427885,
            "bossName": "Archmage Sol",
            "baseDamage": 110811,
            "damageType": "Magic",
            "school": "Arcane",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Colossal Blow",
            "spellID": 169179,
            "bossName": "Yalnu",
            "baseDamage": 59099,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Lumbering Swipe",
            "spellID": 169929,
            "bossName": "Yalnu",
            "baseDamage": 54264,
            "damageType": "Physical",
            "school": "Physical",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Lasher Venom",
            "spellID": 173563,
            "bossName": "Yalnu",
            "baseDamage": 18469,
            "damageType": "Magic",
            "school": "Nature",
            "avoidance": false,
            "source": "Boss"
        },
        {
            "name": "Fireball",
            "spellID": 168666,
            "bossName": "Yalnu",
            "baseDamage": 369,
            "damageType": "Magic",
            "school": "Fire",
            "avoidance": false,
            "source": "Boss"
        }
    ]
};
