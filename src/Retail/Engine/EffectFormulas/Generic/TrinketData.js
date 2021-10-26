export const trinket_data = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Lingering Sunmote                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    -splits- it's healing between targets hit. That means that it doesn't lose a lot of it's healing if you're not able to hit the full number of targets.
    It's "meteor effect" instead increases the amount of healing it does by 15% per target hit (up to 5). 
    */
    name: "Lingering Sunmote",
    effects: [
      {
        coefficient: 45.58441,
        table: -8,
        efficiency: 0.81,
        cooldown: 120,
        targets: { Raid: 5, Dungeon: 3.1 }, // Remember that this is only used for the meteor effect.
        ticks: 3,
        meteor: 0.15,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Sunblood Amethyst                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    This trinket has two portions.
    A direct damage effect, which isn't included currently but will be when we formally add DPS.
    An int buff pool that you can stand in. This pool is incredibly under budget compared to other on-use trinkets,
    even when you can stand in it the entire time. 
    */
    name: "Sunblood Amethyst",
    effects: [
      {
        /* ----------------------------------------- DPS portion ---------------------------------------- */
        coefficient: 71.74138,
        table: -8,
        cooldown: 90,
      },
      {
        /* -------------------------------------- Intellect portion ------------------------------------- */
        coefficient: 0.993548,
        table: -1,
        expectedEfficiency: 0.75, // This is the percentage of the time you're able to stand in the puddle.
        duration: 15,
        cooldown: 90,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Manabound Mirror                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Trinkets designed to save lives rather than purely pump HPS can be difficult to evaluate, but in Mirrors case
    it does enough healing wise, and is available at a high enough level that it can be a mid-tier trinket in both
    departments.
    It's biggest weakness is that it shares a lock out with other on-use trinkets which are frequent lock-ins this
    tier and can make it annoying to use - particularly during dangerous periods. 
    */
    name: "Manabound Mirror",
    effects: [
      {
        /* --------- This is the coefficient for the portion that scales with mana expenditure. --------- */
        coefficient: 12.82759,
        table: -8,
      },
      {
        /*  This is the portion for the direct heal, and also includes cooldown and efficiency information for the entire trinket.  */
        coefficient: 80.17241,
        table: -8,
        cooldown: 60,
        efficiency: {Raid: 0.58, Dungeon: 0.7}
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Darkmoon Deck: Repose                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Repose is a fantastic trinket for it's item level, with the direct heal portion given a high budget even if you're not always
    able to use the full heal. 
    */
    name: "Darkmoon Deck: Repose",
    effects: [
      {
        coefficient: 467.66378, // This represents the upper quartile of the given cards.
        table: -8,
        efficiency: { Raid: 0.48, Dungeon: 0.38 }, // You do often need to sit on the cooldown for a bit since it always starts a new deck with an Ace.
        cooldown: 90,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Unbound Changeling                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    A flexible stat stick. 
    QE Live will automatically pick whichever of the three secondary stats is strongest for you while ignoring the tri-proc.
    This could be revisited in the future through the settings menu. 
    */
    name: "Unbound Changeling",
    effects: [
      {
        coefficient: 2.2, // The spell data also has a 1.679526 (-7) coefficient that is unused.
        table: -1,
        duration: 12,
        ppm: 1.5,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Cabalist's Hymnal                                       */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Cabalist's Hymnal",
    effects: [
      {
        coefficient: 0.467903,
        table: -7,
        duration: 30,
        stacks: 2, // You get 10s of one stack, 10 of two, then 10 of three.
        multiplier: 0.05, // Every ally that wears it in your party gives a 5% increase. Available in Top Gear and Upgrade Finder through the settings menu.
        ppm: 1,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Macabre Sheet Music                                      */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Macabre Sheet Music",
    effects: [
      {
        coefficient: 0.467903,
        table: -7,
        duration: 21, // You get a 20 second duration every time you touch a new Spirit. They each live about 5 seconds.
        stacks: 2.5, // You should be able to hit all four pretty reliably, but will spend some time with lower than four stacks as you meet each.
        cooldown: 90,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Siphoning Phylactery Shard                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    An awkward on-use trinket that has you sacrifice health every 30 seconds in the hope that you heal somebody below 30% in that time.
    Unfortunately 30% is not that common, so you end up giving up a moderate amount of throughput for some low impact "life saving". 
    */
    name: "Siphoning Phylactery Shard",
    effects: [
      {
        coefficient: 89.08621,
        table: -8,
        efficiency: 0.37, // This represents proccing a little over a third of the uses.
        cooldown: 30,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Overflowing Anima Cage                                     */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Overflowing Anima Cage",
    effects: [
      {
        coefficient: 0.985059,
        table: -7,
        duration: 15,
        efficiency: 0.45,
        targets: { Raid: 5, Dungeon: 3.1 }, // Up to four allies do benefit from standing with you. Not included in the score for now.
        cooldown: 150,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Vial of Spectral Essence                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    Vial of Spectral Essence is an easy to use trinket that you can basically hit on cooldown to add a little bit of healing.
    It's tuned pretty well and while it falls behind stat sticks in Mythic it keeps up fine in other difficulties or when
    it has an item level advantage. QE Live assumes high efficiency because it's very difficult to waste much of the healing. 
    */
    name: "Vial of Spectral Essence",
    effects: [
      {
        coefficient: 161.3793,
        table: -8,
        efficiency: 0.88,
        cooldown: 90,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Soulletting Ruby                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    Soulleting Ruby is an over budget on-use stat stick that's only weakness is how tricky it is to maximize.
    It travels at 5.6 yards per second which requires that ranged healers use it several seconds prior to
    key healing cooldowns. The formula currently assumes that you do pull this off, and no penalty is given
    for misplays. 
    */
    name: "Soulletting Ruby",
    effects: [
      {
        /* ------------------------------ Crit buff portion of the trinket. ----------------------------- */
        coefficient: 2.269577,
        table: -7,
        duration: 16,
        multiplier: 1.62, // This assumes your average boss health is just under 50% which feels like a fair average.
        efficiency: 0.92, // Ruby is a tough trinket to maximise and it's average use case is far below it's maximum.
        cooldown: 120,
      },
      {
        /* ------------------------ Healing portion when the spirit reaches you. ------------------------ */
        coefficient: 51.64138,
        table: -8,
        efficiency: 0.26, // This has a very low efficiency on average since you are mostly interested in the crit buff and will pop it before damage goes out.
        cooldown: 120,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Wakener's Frond                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    Wakeners Frond is a world quest trinket so is not available at high item levels 
    */
    name: "Wakener's Frond",
    effects: [
      {
        coefficient: 3.940237,
        table: -7,
        duration: 12,
        multiplier: 1,
        cooldown: 120,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Soulsifter Root                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Soulsifter Root is a world quest trinket that procs a couple of times per minute.
    If the target is missing more health than you it throws in another 20%, however
    this is not included in the formula since it is of no net value and the raid
    survivability increase is minimal. 
    */
    name: "Soulsifter Root",
    effects: [
      {
        coefficient: 57.12069,
        table: -8,
        ppm: 2,
        efficiency: 0.8,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Boon of the Archon                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Boon of the Archon is a group buff trinket, and the benefit to allies can be included in Top Gear / Upgrade Finder via the settings panel. 
    */
    name: "Boon of the Archon",
    effects: [
      {
        /* ------------------------------------ Versatility portion. ------------------------------------ */
        coefficient: 0.354898,
        table: -7,
        duration: 14, // Duration is refreshed if another player walks over one. Max duration is ~20 seconds per proc.
        targets: 5,
        efficiency: 0.65,
        ppm: 1,
      },
      {
        /* ---------------------------------------- Heal portion ---------------------------------------- */
        coefficient: 11.89655,
        table: -8,
        efficiency: 0.64, // These are unlikely to overheal, but players have to run over them so some might naturally expire. Full health players can also waste them.
        ppm: 1,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Spiritual Alchemy Stone                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    Spiritual Alchemy Stone is only available at a very low ilvl which makes it solid for alts and newer players but it falls behind quickly. 
    */
    name: "Spiritual Alchemy Stone",
    effects: [
      {
        coefficient: 1.987097,
        table: -1,
        duration: 15,
        ppm: 1,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                             Sinful Gladiator's Insignia of Alacrity                            */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    Flat haste + Int Proc. 
    */
    name: "Gladiator's Insignia of Alacrity",
    effects: [
      {
        coefficient: 1.116129,
        table: -1,
        duration: 20,
        ppm: 1.5,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                              Sinful Gladiator's Badge of Ferocity                              */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    Flat Haste or Crit + Int on-use.
    Badge doesn't provide a lot of stats alone, and it's strength is it's low cooldown and the ability to combine it with large cooldowns.
    Divine Toll & Spirit Shell are both great examples. If you just pop it off cooldown without a big ability then it's rather weak. 
    */
    name: "Gladiator's Badge of Ferocity",
    effects: [
      {
        coefficient: 1.322581,
        table: -1,
        duration: 15,
        cooldown: 60,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Empyreal Ordnance                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    Damage portion not currently included.
    Ordnance tends to see niche use as you can combine it with another on-use trinket to align the buffs.
    This is high level play, must be used carefully, and is not currently modelled in QE Live. 
    */
    name: "Empyreal Ordnance",
    effects: [
      {
        coefficient: 0.529892,
        table: -1,
        stacks: 5,
        duration: 15,
        cooldown: 180,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Inscrutable Quantum Device                                   */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Inscrutable Quantum Device",
    effects: [
      {
        coefficient: 3.55,
        table: -7,
        duration: 20,
        cooldown: 180,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Instructor's Divine Bell                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    A strong on-use with a slightly awkward cooldown for a lot of specs.
    Value depends heavily on how well your specs mastery interacts with your specs big cooldowns.
    */
    name: "Instructor's Divine Bell",
    effects: [
      {
        coefficient: 3.940237,
        table: -7,
        duration: 9,
        cooldown: 90,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Flame of Battle                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Versatility on-use world quest trinket.
    */
    name: "Flame of Battle",
    effects: [
      {
        coefficient: 2.955178,
        table: -1,
        duration: 12,
        cooldown: 90,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Misfiring Centurion Controller                                 */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Flat crit + Int Proc world quest trinket.
    */
    name: "Misfiring Centurion Controller",
    effects: [
      {
        coefficient: 1.406452,
        table: -1,
        duration: 15,
        ppm: 1.5,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Book-Borrower Identification                                  */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Flat int + mastery proc world quest trinket.
    */
    name: "Book-Borrower Identification",
    effects: [
      {
        coefficient: 1.319979,
        table: -1,
        duration: 12,
        ppm: 2,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Glimmerdust's Grand Design                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    This is a remake of Kil'jaedens Grand Design from Legion but with one stack instead of two.
    You'll have it up at 100% uptime until the player procs it by falling low.
    Quite a good tank healing option, but only available at sub-maximum item levels due to being a world quest trinket.
    */
    name: "Glimmerdust's Grand Design",
    effects: [
      {
        /* ----------------------------------------- HoT Portion ---------------------------------------- */
        coefficient: 1.931035,
        table: -8,
        efficiency: 0.35, // Falls off when the target falls below 35% health. Efficiency in this case is the HoT uptime x the HoT overhealing.
        totalTicks: 40, // 120 / 3. It also scales with Haste.
      },
      {
        /* --------------------------------------- Absorb Portion --------------------------------------- */
        coefficient: 249.431,
        table: -8,
        efficiency: 0.85, // It's incredibly likely that your priority target will drop below 35% over a two minute period.
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Consumptive Infusion                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Consumptive Infusion is an awkward trinket that requires you hit the boss, and then single target heal an ally to give them a leech buff.
    It is difficult to see what it did for you after a pull since the leech is attributed to the target rather than yourself.
    The formula below calculates the expected DPS a randomly chosen member of your raid does, the expected overhealing the leech will do, and how
    often you're likely to be able to proc it.
    */
    name: "Consumptive Infusion",
    effects: [
      {
        /* ----------------------------------------- HoT Portion ---------------------------------------- */
        coefficient: 1.65,
        table: -7,
        efficiency: { "Restoration Druid": 0.28, "Discipline Priest": 0.32, "Holy Paladin": 0.34, "Mistweaver Monk": 0.31, "Restoration Shaman": 0.3, "Holy Priest": 0.3 },
        duration: 10,
        cooldown: 30,
        expectedTargetThroughput: 4050, // In a future version this could be dynamically averaged from an inserted log.
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Tuft of Smoldering Plumage                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    This one is awkward to model. You're using it as a Guardian Spirit effect more often than using it because the heal is useful.
    A massive heal on an injured target has massive life-saving potential, but it's long cooldown makes it easy to waste.
    Tuft is of higher efficiency in dungeons where single target healing is a bigger priority, and being the only healer gives you more control on
    the incoming healing each target receives.
    */
    name: "Tuft of Smoldering Plumage",
    effects: [
      {
        coefficient: 326.7931,
        table: -8,
        efficiency: { Raid: 0.47, Dungeon: 0.86 }, // Includes the 25% multiplier as the target gets lower.
        cooldown: 120,
      },
    ],
  },

  /* --------------------------------- ULDUAR TIMEWALKING TRINKETS -------------------------------- */
  /*
  Two interesting mana options + nine generic stat procs / on-use options.
  */

  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Elemental Focus Stone                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Haste proc on damaging spells.
    */
    name: "Elemental Focus Stone",
    effects: [
      {
        coefficient: 1.99949,
        table: -7,
        duration: 10,
        ppm: { "Restoration Druid": 1.2, "Discipline Priest": 1.5, "Holy Paladin": 1.5, "Mistweaver Monk": 1.4, "Restoration Shaman": 1.2, "Holy Priest": 1.2 },
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Energy Siphon                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Crit on-use trinket
    */
    name: "Energy Siphon",
    effects: [
      {
        coefficient: 2.399108,
        table: -7,
        duration: 20,
        cooldown: 120,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Eye of the Broodmother                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Int on spell cast, effectively has a 100% uptime since the ramp up is near immediate.
    */
    name: "Eye of the Broodmother",
    effects: [
      {
        coefficient: 0.10503,
        table: -1,
        stacks: 5,
        uptime: 1,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Flare of the Heavens                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Int proc on damaging spells.
    */
    name: "Flare of the Heavens",
    effects: [
      {
        coefficient: 2.353487,
        table: -1,
        duration: 10,
        ppm: { "Restoration Druid": 1.1, "Discipline Priest": 1.25, "Holy Paladin": 1.25, "Mistweaver Monk": 1.2, "Restoration Shaman": 1.1, "Holy Priest": 1.1 },
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Living Flame                                          */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Int on-use trinket
    */
    name: "Living Flame",
    effects: [
      {
        coefficient: 2.000788,
        table: -1,
        duration: 20,
        cooldown: 120,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Pandora's Plea                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Int proc
    */
    name: "Pandora's Plea",
    effects: [
      {
        coefficient: 1.561615,
        table: -1,
        duration: 10,
        ppm: 2,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Scale of Fates                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Haste proc
    */
    name: "Scale of Fates",
    effects: [
      {
        coefficient: 2.39909,
        table: -7,
        duration: 20,
        cooldown: 120,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Sif's Remembrance                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Int proc on healing spells
    */
    name: "Sif's Remembrance",
    effects: [
      {
        coefficient: 1.125146,
        table: -1,
        duration: 15,
        ppm: 2,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Show of Faith                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    This was previously an incredibly powerful trinket owing to it's huge mana returns.
    It was later nerfed by over 80% and is no longer a contender.
    Mana Proc
    */
    name: "Show of Faith",
    effects: [
      {
        coefficient: 1.59735, // 8.996611 pre-nerf
        table: -7,
        ppm: 2,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Spark of Hope                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Mana cost reduction on spells. 
    Casts per minute are modelled in the cast model rather than in this file.
    */
    name: "Spark of Hope",
    effects: [
      {
        coefficient: 0.450353,
        table: -7,
      },
    ],
  },

  /* ------------------------------- Firelands Timewalking Trinkets ------------------------------- */

  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Eye of Blazing Power                                      */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Eye of Blazing Power",
    effects: [
      {
        coefficient: 118.3393,
        table: -8,
        ppm: 1.08, // 45s ICD, 10% proc chance on heal. This assumes we proc it very quickly. Log data not readily available given the trinkets rarity.
        efficiency: 0.9,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Jaws of Defeat                                         */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Jaws of Defeat",
    effects: [
      {
        coefficient: 17, // This is the amount of mana reduction rather than a coefficient. The trinket is only available at 200 item level.
        duration: 20,
        cooldown: 120,
        efficiency: 0.9,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Necromantic Focus                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Grants 10 mastery for 10 seconds each time you deal DoT damage.
    This naturally makes it difficult for specs without DoTs.
    */
    name: "Necromantic Focus",
    effects: [
      {
        coefficient: 10, // Flat value
        stacks: { "Restoration Druid": 7, "Discipline Priest": 10, "Holy Paladin": 0, "Mistweaver Monk": 0, "Restoration Shaman": 2.4, "Holy Priest": 2.4 },
      },
    ],
  },

  /* ---------------- ---------- Burning Crusade Timewalking Trinkets ------------ ---------------- */

  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Memento of Tyrande                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Mana Proc
    */
    name: "Memento of Tyrande",
    effects: [
      {
        coefficient: 2.03251,
        table: -7,
        ppm: 2.5, // Scales with Haste.
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      The Skull of Gul'dan                                      */
    /* ---------------------------------------------------------------------------------------------- */
    name: "The Skull of Gul'dan",
    effects: [
      {
        coefficient: 1.815054,
        table: -7,
        duration: 20,
        multiplier: 1,
        cooldown: 120,
      },
    ],
  },
  // ---------------- 9.1 Trinkets -----------------
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Soul Cage Fragment                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Int proc on healing spells
    */
    name: "Soul Cage Fragment",
    effects: [
      {
        coefficient: 1.123377,
        table: -1,
        duration: 15,
        ppm: 2,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Titanic Ocular Gland                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    Increased stats above 50% health, decreased stats below 50% health.
    */
    name: "Titanic Ocular Gland",
    effects: [
      {
        coefficient: 0.555215 * 1.04,
        table: -7,
        uptime: 0.92,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  So'leah's Secret Technique                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    +20 stat to a friend, +100 stat to yourself.
    */
    name: "So'leah's Secret Technique",
    effects: [
      {
        coefficient: 1.540096,
        table: -8,
      },
      {
        coefficient: 0.308019,
        table: -8,
      }
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Carved Ivory Keepsake                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /*

    */
    name: "Carved Ivory Keepsake", // Spell Name: Instrusive Foresight
    effects: [
      {
        coefficient: 19.57812,
        table: -8,
        ppm: 6,
        efficiency: 0.76,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Resonant Silver Bell                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /*

    */
    name: "Resonant Silver Bell", // Spell Name: Spectral Feline
    effects: [
      {
        coefficient: 83.59375,
        table: -8,
        ppm: 2,
        efficiency: 0.35, // 
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Shadowed Orb of Torment                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Shadowed Orb of Torment", // Tormented Insight
    effects: [
      {
        coefficient: 1.328551 * 1.61, // 1.328551
        table: -7,
        duration: 40,
        cooldown: 120,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 First Class Healing Distributor                                */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    
    */
    name: "First Class Healing Distributor",
    effects: [
      {
        /* ----------------------------------------- Healing Portion ---------------------------------------- */
        coefficient: 21.946373,
        table: -8,
        efficiency: 0.4, // The expected overhealing on this trinket is very high.
        ppm: 3,
        targets: { Raid: 4.2, Dungeon: 2.9 }, // 8 yard range
        meteor: 0.15,
      },
      {
        /* --------------------------------------- Haste Portion --------------------------------------- */
        coefficient: 3.8125,
        table: -8,
        ppm: 3,
        duration: 9,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Scrawled Word of Recall                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Scrawled Word of Recall", // Tormented Insight
    effects: [
      {
        coefficient: 0.045455,
        specMod: {"Restoration Druid": 1, "Holy Paladin": 0.6, "Mistweaver Monk": 1, "Restoration Shaman": 0.5, "Holy Priest": 1.25, "Discipline Priest": 0.8},
        spellList: {"Restoration Druid": 1, "Holy Paladin": 25914, "Mistweaver Monk": 1, "Restoration Shaman": 1, "Holy Priest": 1, "Discipline Priest": 1},
        table: -1,
        cooldown: 60,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Tome of Insight                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    This is a crit stat stick available as catch up gear.
    */
    name: "Tome of Insight",
    effects: [
      {
        coefficient: 0.897, // The spell data also has a 1.679526 (-7) coefficient that is unused. Was previously 1.546671
        table: -7,
        duration: 20,
        ppm: 2,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Forbidden Necromantic Tome                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /*
    
    */
    name: "Forbidden Necromantic Tome",
    effects: [
      {
        coefficient: 0.337095, 
        table: -7,
        duration: 15,
        averageStacks: {"Restoration Druid": 0.6, "Holy Paladin": 0.4, "Mistweaver Monk": 0, "Restoration Shaman": 0.65, "Holy Priest": 0.6, "Discipline Priest": 1.6},
        // The average stacks value is correct, but should be rewritten to include the formula in the code.
        ppm: 5,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Flask of Solemn Night                                       */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Flask of the Solemn Night",
    effects: [
      {
        coefficient: 0.286493,
        table: -7,
        duration: 10,
        stacks: 15, // You start with 20, lose 1 every second and end with 10 for an average of 15.
        ppm: 1,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Bottled Hurricane                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /* 

    */
    name: "Bottled Hurricane",
    effects: [
      {
        coefficient: 1.41699,
        table: -1,
        efficiency: { Raid: 0.85, Dungeon: 0.5 }, // 
        ppm: 4,
        targets: 5,
        ticks: 6,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Concave Reflecting Lens                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /* 

    */
    name: "Concave Reflecting Lens",
    effects: [
      {
        coefficient: 50.56973,
        table: -9, // -8 in spell data
        efficiency: { Raid: 0.8, Dungeon: 0.5 }, // 
        ppm: 3,
        targets: 4,

      },
    ],
  },
];

/* ------------------------------------------- Unused ------------------------------------------- */
// export const TAGS = {
//   It should be noted that this is longer used anywhere, and were part of a different trinket draft.
//   ON_USE: "on-use",
//   MULTIPLIER: "multiplier",
//   DURATION: "duration",
//   PPM: "ppm",
//   HASTED_PPM: "hasted-ppm",
//   DURATION_BASED: "duration-based",
//   METEOR: "meteor", // The meteor effect increases a trinkets value by X based on targets hit up to Y. X should be represented as 'multiplier' and Y as the 'cap'.
//   TICKS: "ticks",
// };
