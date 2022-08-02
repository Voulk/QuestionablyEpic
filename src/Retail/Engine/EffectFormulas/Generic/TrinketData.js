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
        coefficient: 12.82759 * 1.2,
        table: -8,
      },
      {
        /*  This is the portion for the direct heal, and also includes cooldown and efficiency information for the entire trinket.  */
        coefficient: 80.17241 * 1.1,
        table: -8,
        cooldown: 60,
        efficiency: {Raid: 0.5, Dungeon: 0.6}
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
    /*                           Gemstone of Prismatic Brilliance                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /*

    */
    name: "Gemstone of Prismatic Brilliance",
    effects: [
      {
        coefficient: 1.348495,
        table: -1,
        duration: 10,
        ppm: 2.5,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Scars of Fraternal Strife                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /*

    */
    name: "Scars of Fraternal Strife",
    effects: [
      {
        coefficient: 0.345768 * 1.25,
        table: -7,
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
        stacks: 2.6, // You should be able to hit all four pretty reliably, but will spend some time with lower than four stacks as you meet each.
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
        coefficient: 2.269577 * 0.85 * 0.75, // This represents the upcoming 15% nerf. When the change is live the coefficient itself can be updated instead. 
        table: -7,
        duration: 16,
        multiplier: 1.62, // This assumes your average boss health is just under 50% which feels like a fair average.
        efficiency: 0.92, // Ruby is a tough trinket to maximise and it's average use case is far below it's maximum.
        cooldown: 120,
        discOverhealing: 0.37,
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
        coefficient: 3.55 * 0.75,
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
        discOverhealing: 0.11,
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
    name: "Instructor's Divine Bell (new)",
    effects: [
      {
        coefficient: 2.37098,
        table: -7,
        duration: 15,
        cooldown: 90,
        discOverhealing: 0.15,
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
        table: -7,
        duration: 12,
        cooldown: 90,
        discOverhealing: 0.12,
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
  { // Pandaria
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Price of Progress                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /*

    */
    name: "Price of Progress",
    effects: [
      {
        coefficient: 12.92661, // 8.996611 pre-nerf
        table: -7,
        ppm: 1,
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
        coefficient: 0.444559, 
        table: -7,
      },
      {
        coefficient: 0.074093,
        table: -7,
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
        coefficient: 83.59375 * 1.15,
        table: -8,
        ppm: 2,
        efficiency: 0.38, // 
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
        coefficient: 1.328551 * 1.61 * 1.12, // 1.328551
        table: -7,
        duration: 40,
        cooldown: 120,
        discOverhealing: 0.35,
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
        coefficient: 0.405042, // Previously 3.8125 @ -9.
        table: -7,
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
        averageStacks: {"Restoration Druid": 0.6, "Holy Paladin": 0.4, "Mistweaver Monk": 0, "Restoration Shaman": 0.65, "Holy Priest": 0.6, "Discipline Priest": 1.55},
        // The average stacks value is correct, but should be rewritten to include the formula in the code.
        ppm: 5,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Flask of Solemn Night                                      */
    /* ---------------------------------------------------------------------------------------------- */

    // This is a bizarre trinket in that the uptime is low but the amount of stats it gives on proc is extremely high. 
    // In addition to running into stat DR, this can also warp some specs such that you are not able to take advantage of the boost.
    // Druid: All hots benefit. Trinket is given full value.
    // Disc: Procs during Boon ramps can be spicy due to Ascended Blasts CDR portion, and this can be a positive. The high variance of the trinket makes it a problematic
    //       choice for progression on a spec that does most of it's healing in a small window.
    // Holy Priest: Doesn't gain a large HPM benefit, but procs add a lot of healing through extra Heal casts. The spec also has strong mana options and can often
    //              take advantage of the extra casts. Procs during downtime add decent damage.
    // Holy Paladin: Frequently sees lower proc rates than other specs due to the spec having some large gaps between healing events.
    // Resto Shaman: Has some difficulty making use of the haste in raid, and in M+ there are frequently gaps in healing output. 
    // Mistweaver Monk: Not viable due to Fallen Order's broken flat haste interactions. Depending on proc timing this can actually be a net loss in healing.

    // Using multipliers on a trinkets strength like this is problematic, since they are not adept at conforming to a given log or scenario and can feel abitrary. 
    // They are used here since the result is a more accurate depiction of their strength. I am going to hawk logs this week to make sure they are accurate.
    // 
    // 
    name: "Flask of the Solemn Night",
    effects: [
      {
        coefficient: 0.286493,
        table: -7,
        duration: 10,
        efficiency: {"Restoration Druid": 0.8, "Holy Paladin": 0.67, "Mistweaver Monk": 0, "Restoration Shaman": 0.65, "Holy Priest": 0.7, "Discipline Priest": 0.7},
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
    Bottled Hurricane is notable for being the only trinket on the list with an approximate coefficient instead of a 100% correct one.
    None of the currently in-use curves match, however the investigation is ongoing. The result is that the trinket is correctly evaluated at high item levels
    and slightly undervalued at low levels.
    */
    name: "Bottled Hurricane",
    effects: [
      {
        coefficient: 4.1271, // 1.41699
        table: -8, // -1
        efficiency: { Raid: 0.46, Dungeon: 0.27 }, // 
        ppm: 4,
        targets: 3.8, // This can hit a maximum of 5 targets, but the radius is very small so will vary per fight.
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
        efficiency: { Raid: 0.68, Dungeon: 0.38 }, // 
        ppm: 3,
        targets: 3.8, // The trinket attempts to hit 4 targets, but in logs it often comes up slightly short of this.

      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Amalgam's Seventh Spine                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /* 

    */
    name: "Amalgam's Seventh Spine",
    effects: [
      {
        coefficient: 0.6668381, // 2.07913,
        table: -7, //-8, 
        ppm: { "Restoration Druid": 20, "Discipline Priest": 15.2, "Holy Paladin": 0, "Mistweaver Monk": 1.5, "Restoration Shaman": 0.5, "Holy Priest": 11 }, // TODO: Refine. 
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Infernal Writ                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 

    */
    name: "Infernal Writ",
    effects: [
      {
        coefficient: 0.199557,
        table: -7, 
        duration: 20,
        ppm: { "Restoration Druid": 0.5, "Discipline Priest": 0.7, "Holy Paladin": 0, "Mistweaver Monk": 0, "Restoration Shaman": 0.5, "Holy Priest": 0.5 }, // Baseline: 0.7
        averageStacks: 10.5, 
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                            Moonlit Prism                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /* 

    */
    name: "Moonlit Prism",
    effects: [
      {
        coefficient: 0.15733,
        table: -1, 
        duration: 20,
        cooldown: 90,
        averageStacks: 4, 
        // This could be much more closely valued by considering each individual specs casting cadence. Given the low availability and power of the trinket,
        // this is not yet implemented but could be. Notably haste IS included though it doesn't proc off healing spells so it isn't good.
      },
    ],
  },
  {
    // ========================================== 9.2 Trinkets ====================================== */
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Elegy of the Eternals                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // This is a flat stat trinket that gives a bonus to allies in group.
    // This is currently heavily overbudget, or has a mechanic to it we're not yet aware of or able to test. 
    name: "Elegy of the Eternals", 
    effects: [
      {
        coefficient: 0.474196,
        table: -7, // -9 but is currently using our -8. Should be -7.
        sharedAmount: 0.1,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Auxillary Attendant Chime                                      */
    /* ---------------------------------------------------------------------------------------------- */
    // Activates a robot that applies an absorb for X every second for 10s. 
    // This appears to scale with haste, but haste scaling is disabled until it can be checked on live servers since it was not available to test.
    // Check for partial tick also.
    name: "Auxillary Attendant Chime", 
    effects: [
      {
        coefficient: 10.149235,
        table: -8, // -9
        ppm: 1.5,
        efficiency: 0.74,
        duration: 10,
        tickRate: 1,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Reclaimer's Intensity Core                                     */
    /* ---------------------------------------------------------------------------------------------- */
    // On-use mana trinket. When the robot it summons dies, heal 5 allies for X over 10 seconds.
    name: "Reclaimer's Intensity Core", 
    effects: [
      { // Mana on-use
        coefficient: 0.161757,
        table: -1,
        ticks: 10, // The coefficient is for a single tick.
        cooldown: 90,
      },
      { // Healing Effect whenever an automata dies. 
        // The scaling curve does not match any known spell tables and the trinket is available at just four item level so they are hard coded in for now.

        // The Reclaimer's healing effect procs once every time a nearby automata dies. This does include automata from other players in addition to the players own.
        // However, they can also be outranged and so if not careful you can even run away from your own. The radius appears to be 30 yards. 
        // There is a good case to be made that there should be a settings value for automata in raid.
        coefficient: 0.530562,
        table: -6, 
        fixedValues: {239: 3526, 252: 4126, 265: 4822, 278: 5627},
        efficiency: { Raid: 0.52, Dungeon: 0.39 }, // 
        ppm: 0.667 * 1, // One automata 
        targets: 5,
        ticks: 1, // This ticks 30 times, but the fixed values are over it's entire duration.
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        The First Sigil                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // Signature ability reset and a massive vers buff on a 5 minute cooldown.
    name: "The First Sigil", 
    effects: [
      {
        coefficient: 5.122305,
        table: -7,
        duration: 15,
        cooldown: 300,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        The Lion's Roar                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // 20% DR up to an absorb cap on a long cooldown. Cooldown is reduced by critical heals using the ppm system.
    name: "The Lion's Roar", 
    effects: [
      {
        coefficient: 1075.665,
        table: -8, // -9
        ppm: 10,
        baseCooldown: 600,
        cdrPerProc: 6,
        efficiency: 0.65,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Extract of Prodigious Sands                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /* 

    */
    name: "Extract of Prodigious Sands",
    effects: [
      {
        coefficient: 15.64738,
        table: -8, // -9 in spell data
        efficiency: { Raid: 0.7, Dungeon: 0.47 }, // 
        ppm: 7.5,

      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Symbol of the Raptora                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 

    */
    name: "Symbol of the Raptora",
    effects: [
      {
        coefficient: 3.676471,
        table: -9, // -8 in spell data
        duration: 18,
        ppm: 2,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Enforcer's Stun Grenade                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 

    */
    name: "Enforcer's Stun Grenade",
    effects: [
      {
        coefficient: 3.333333,
        table: -7, // -8 in spell data
        duration: 20,
        cooldown: 120,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Fleshrender's Meathook                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 

    */
    name: "Fleshrender's Meathook",
    effects: [
      {
        coefficient: 3.333333,
        table: -7, // -8 in spell data
        duration: 20,
        cooldown: 120,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                           Grim Eclipse                                         */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Grim Eclipse",
    effects: [
      {
        coefficient: 2.252431,
        table: -7,
        duration: 10,
        runeEfficiency: 0.8,
        cooldown: 120,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                           Resonant Reservoir                                         */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Resonant Reservoir",
    effects: [
      {
        coefficient: 7.700482,
        table: -8,
        duration: 6,
        avgStacks: 2.5, // avg(1, 2, 3, 4)
        avgTargets: 4.6,
        ticks: 3,
        cooldown: 90,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Infinitely Divisible Ooze                                     */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Infinitely Divisible Ooze",
    effects: [
      {
        coefficient: 7.362069,
        table: -8,
        hits: 5,
        ppm: 2,
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Oakheart's Gnarled Root                                      */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Oakheart's Gnarled Root",
    effects: [
      {
        coefficient: 16.26412,
        table: -9,
        hits: 6,
        ppm: 2,
      }]},

      {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Deteriorated Construct Core                                      */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Deteriorated Construct Core",
    effects: [
      {
        coefficient: 27.45337,
        table: -8,
        targets: 3.6,
        ppm: 1, // 2 in spell data, and then nerfed by 50% for healing specs.
      }]},
      {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Dreadfire Vessel                                         */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Dreadfire Vessel",
    effects: [
      {
        coefficient: 154.9483,
        table: -8,
        targets: 1,
        cooldown: 90,
      }]},
    {
      /* ---------------------------------------------------------------------------------------------- */
      /*                                   Aran's Relaxing Ruby                                      */
      /* ---------------------------------------------------------------------------------------------- */
      name: "Aran's Relaxing Ruby",
      effects: [
        {
          coefficient: 97.04825,
          table: -9,
          targets: 3.8,
          ppm: 0.46,
        }]},
    
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Faith's Crucible                                         */
    /* ---------------------------------------------------------------------------------------------- */
    {
    name: "Faith's Crucible",
    effects: [
      {
        coefficient: 18.04542,
        table: -9,
        hits: 12,
        cooldown: 90,
        efficiency: { Raid: 0.7, Dungeon: 0.4 }, // 
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                           Miniscule Mailemental in an Envelope                                 */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Miniscule Mailemental in an Envelope",
    effects: [
      {
        coefficient: 78.73171,
        table: -9,
        ppm: 2.25,
        classMult: { "Restoration Druid": 1, "Discipline Priest": 1, "Holy Paladin": 0, "Mistweaver Monk": 0, "Restoration Shaman": 1, "Holy Priest": 1 }
      }]
    },
    /*                                     Fluctuating Energy                                         */
    /* ---------------------------------------------------------------------------------------------- */
    {
    name: "Fluctuating Energy",
    effects: [
      {
        coefficient: 4.089027,
        table: -7,
        ppm: 2,
        efficiency: 0.65 // Unfortunately it is extremely difficult to catch all of the mana orbs.
      },
    ],
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Ingenious Mana Battery                                       */
    /* ---------------------------------------------------------------------------------------------- */
    name: "Ingenious Mana Battery",
    effects: [
      { // Mana Gain
        coefficient: 52.68167, // This is currently broken in-game and doesn't scale up. Check again before it goes live.
        table: -1,
      },
      { // Vers effect
        coefficient: 0.163438 * 2, // The Vers is doubled while the trinket is full.
        table: -7,
        uptime: 0.5,
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
