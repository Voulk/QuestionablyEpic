import { convertPPMToUptime, getHighestStat, runGenericFlatProc, getSetting, forceGenericOnUseTrinket, processedValue, runGenericPPMTrinket, runGenericRandomPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket } from "../../EffectUtilities";

export const dungeonTrinketData = 
[
  {  
    name: "Azhiccaran Parapodia",
    description: "Very overtuned but only procs off DPS spells.",
    effects: [
      {
        coefficient: 0.594905, 
        table: -1,
        duration: 30,
        ppm: 2,
        stat: "intellect",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.intellect = processedValue(data[0], itemLevel) * data[0].ppm * data[0].duration / 60; // These stacks can overlap so there should be no proc munching.

      if (player.spec === "Mistweaver Monk") {
        bonus_stats.intellect *= 0.2;
      }
      else if (additionalData.contentType === "Dungeon" || player.spec === "Discipline Priest") {

      }
      else {
        bonus_stats.intellect *= 0.5;
      }

      return bonus_stats;
    }
  },
      { // 1:30 intellect on-use. 
      name: "Sunblood Amethyst",
      description: "",
      effects: [
        {
          coefficient: 0.999862, 
          table: -1,
          efficiency: 0.75, // Amount of time standing in puddle.
          duration: 15, 
          cooldown: 90,
        },
      ],
      runFunc: function(data, player, itemLevel, additionalData) {
        let bonus_stats = {};
    
        if ((player.spec === "Holy Priest" || player.spec === "Restoration Druid" || player.spec === "Mistweaver Monk") && getSetting(additionalData.settings, "delayOnUseTrinkets")) bonus_stats.intellect = forceGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel, 120, additionalData.setStats) * data[0].efficiency;
        else bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel, additionalData.setStats) * data[0].efficiency;
  
        return bonus_stats;
      }
    },
    { // 1:30 cooldown mastery on-use. 
      name: "Lily of the Eternal Weave",
      description: "",
      effects: [
        {
          coefficient: 2.400612, 
          table: -7,
          duration: 15, 
          cooldown: 90,
        },
      ],
      runFunc: function(data, player, itemLevel, additionalData) {
        let bonus_stats = {};
    
        if (additionalData.castModel.modelName.includes("Oracle")) {
          bonus_stats.hps = additionalData.castModel.modelOnUseTrinket(additionalData.setStats, "Lily of the Eternal Weave", itemLevel) * 0.9; // Expected additional overhealing.
        }
        else if ((player.spec === "Holy Priest" || player.spec === "Restoration Druid" || player.spec === "Mistweaver Monk") && getSetting(additionalData.settings, "delayOnUseTrinkets")) bonus_stats.mastery = forceGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel, 120, additionalData.setStats);
        else bonus_stats.mastery = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel, additionalData.setStats);

        return bonus_stats;
      }
    },
    {
      name: "First Class Healing Distributor",
      description: "",
      effects: [
        {
          coefficient: 0.427244, 
          table: -7,
          ppm: 3,
          duration: 9,
        },
        { // 
          coefficient: 22.20824, // Heal portion
          table: -9,
          secondaries: ['crit', 'versatility'],
          efficiency: 0.55,
          meteor: 0.15,
        },
      ],
      runFunc: function(data, player, itemLevel, additionalData) {
        let bonus_stats = {};

        bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel);
        bonus_stats.hps = runGenericFlatProc(data[1], itemLevel, player, additionalData.contentType) * (data[1].meteor * 5 + 1);
  
  
        return bonus_stats;
      }
  },
  {
      name: "So'leah's Secret Technique",
      description: "",
      effects: [
        {
          coefficient: 0.493954, 
          table: -7,
        },
        { // 
          coefficient: 0.098791, // Ally portion
          table: -7,
          stat: "allyStats",
        },
      ],
      runFunc: function(data, player, itemLevel, additionalData) {
        let bonus_stats = {};

        const bestStat = player.getHighestStatWeight(additionalData.contentType);
        bonus_stats[bestStat] = processedValue(data[0], itemLevel); // 
        bonus_stats.allyStats = processedValue(data[1], itemLevel);
  
  
        return bonus_stats;
      }
  },
  { // Sigil is a low end evaluation since its variance is very high and the reward is very average.
    name: "Sigil of Algari Concordance",
    description: "The summoned earthen does flat healing and gives an intellect buff for healers. QE Live uses an underestimation since the trinket variance is absurdly high.",
    effects: [
      { // Intellect Effect
        coefficient: 1.185996,
        table: -1,
        stat: "intellect",
        duration: 15,
        ppm: 0.35, // 0.5 rppm with a 15s ICD. It also doesn't proc the int effect every single time though doubles are also possible but rare.
        cooldown: 15,
      },
      { // Hot Heal Effect
        coefficient: 10.9179,
        table: -9,
        ppm: 0.35, 
        targets: 5, // lasts 15s and heals 5 people per tick (tick rate 5.0s not hasted)
        ticks: 3,
        stacks: 4, // 5 max, 3 most common. stacks refresh duration
        secondaries: ['crit', 'versatility'],
        efficiency: 0.55,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const intBonus = processedValue(data[0], itemLevel) * convertPPMToUptime(data[0].ppm, data[0].duration);

      bonus_stats.intellect = intBonus * 0.2;
      bonus_stats.allyStats = intBonus * 0.8; // The int buff is split between the five people hit.
      bonus_stats.hps = runGenericFlatProc(data[1], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    },
  },
  {
    name: "Bursting Lightshard",
    description: "Bursting Lightshard is a capable healer DPS trinket. You're required to heal it when it spawns.",
    effects: [
      {
        coefficient: 1.151598, 
        table: -7,
        stat: "all",
        duration: 20,
        ppm: 1.55,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      return bonus_stats;
    }
  },
  { // Versatility for X% of the fight. Mana one time.
    name: "Ingenious Mana Battery",
    description: "It's fine while stacked but you need to never drop below 50% mana for this to be at all viable. Too much work for too little gain.",
    effects: [
      {  // Mana Effect
        coefficient: 0.076844,
        table: -10,
      },
      {  // Versatility Effect
        coefficient: 0.27006, // Increased by 100% due to mana stored.
        table: -7,
        uptime: 0.5,
        multiplier: 2, // The amount of extra vers you get for mana saved.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.versatility = processedValue(data[1], itemLevel) * data[1].uptime * data[1].multiplier;
      //bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
  {
    name: "Vial of Spectral Essence",
    description: "Filler at best.",
    effects: [
      {  // Heal effect
        coefficient: 173.7287,
        table: -9,
        secondaries: ['versatility'], // TODO: Check
        efficiency: {Raid: 0.8, Dungeon: 0.64}, // This is an absorb so you won't lose much value.
        cooldown: 90,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
      //bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
  { // TODO: Check low health scaling.
    name: "Soulletting Ruby",
    description: "Gives more crit if you use it on low health targets.",
    effects: [
      {
        coefficient: (1.5133 + (1.8497+1.5133)) / 2, 
        table: -7,
        duration: 16,
        //multiplier: 0.725, // Assumes boss is around 50% health.
        cooldown: 120,
        stat: "crit",
      },
      {
        coefficient: 51.42363, 
        table: -9,
        cooldown: 120,
        efficiency: 0.3, // Heal ultimately does nothing but it's included for accuracy.
        stat: "hps",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.crit = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel, additionalData.setStats);
      bonus_stats.hps = runGenericFlatProc(data[1], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
  { // TODO: The Chopper stays on the target and can reproc whether the initial on-use is active or not. 
    // So it's basically an on-use and proc trinket in one.
    name: "Darkfuse Medichopper",
    description: "The Chopper stays on your target and periodically gives them vers and an absorb. It has potential in theory but undertuned.",
    effects: [
      {
        coefficient: 18.44994 * 1.15, 
        table: -9,
        cooldown: 120,
        ppm: 3 + 0.5,
      },
      {
        coefficient: 0.419281 * 1.15, 
        table: -7,
        stat: "versatility",
        ppm: 3 + 0.5,
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      // As this is both a ppm and on-use trinket we'll make use of both of our functions.
      // Note that additional testing will need to be done as to how the trinket interacts with overlapping procs but this is a minor hit to its value regardless.
      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);

      // You could technically self-use it but I'm not sure you ever would.
      bonus_stats.allyStats = runGenericPPMTrinket(data[1], itemLevel);

      return bonus_stats;
    }
  },
    {
        name: "Carved Blazikon Wax",
        description: "The candle portion got recently buffed and is now about a quarter of the trinkets power. A standard but powerful stat stick - even if Versatility isn't your best stat.",
        effects: [
          {
            coefficient: 1.068708, 
            table: -7,
            stat: "versatility",
            duration: 15,
            ppm: 2,
          },
          {
            coefficient: 0.2808, 
            table: -7,
            stat: "versatility",
            duration: 15,
            ppm: 2,
            uptime: 0.5, // Time spent in candle
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          bonus_stats[data[0].stat] = runGenericPPMTrinket(data[0], itemLevel);

          // Candle bonus
          bonus_stats["versatility"] += runGenericPPMTrinket(data[1], itemLevel) * data[1].uptime;
          
          return bonus_stats;
        }
      },
      {
        name: "Empowering Crystal of Anub'ikkaj",
        description: "",
        effects: [
          {
            coefficient: 1.151598, 
            table: -7,
            stat: "all",
            duration: 20,
            ppm: 1.55,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          return runGenericRandomPPMTrinket(data[0], itemLevel)
        }
      },
      {
        name: "Burin of the Candle King",
        description: "Honestly fairly well tuned for an absorb trinket. Niche pick in Mythic+ - not good in raid.",
        effects: [
          {  // Heal effect
            coefficient: 294.3024, // 371.7325,
            table: -9,
            secondaries: ['versatility'],
            efficiency: {Raid: 0.72, Dungeon: 0.84}, // This is an absorb so you won't lose much value but it's really hard to find good uses for it on a 1.5 min cadence.
            cooldown: 90, 
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
    
          bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency[additionalData.contentType]) * player.getStatMults(data[0].secondaries) / data[0].cooldown;
    
          return bonus_stats;
        }
      },
      {
        name: "Unbound Changeling",
        description: "Unbound Changeling can be swapped to a crit, haste or mastery proc. QE Live will automatically use whichever one is best for your spec. There is also a rare tri-proc you can get which is actually worse.",
        effects: [
          {
            coefficient: 1.679526, 
            table: -7,
            duration: 12,
            ppm: 1.5,
            stat: "mixed",
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          const bestStat = player.getHighestStatWeight(additionalData.contentType)
          bonus_stats[bestStat] = runGenericPPMTrinket({...data[0], stat: bestStat}, itemLevel);
          return bonus_stats;
        }
      },
      {
        name: "Scrapsinger's Symphony",
        effects: [
          {  // Heal effect
            coefficient: 42.7805 * 1.15,
            table: -9,
            secondaries: ['versatility', 'haste'],
            efficiency: {Raid: 0.65, Dungeon: 0.55}, // This is an absorb so you won't lose much value.
            ppm: 3,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
    
          bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
    
          return bonus_stats;
        }
      },
      {
        name: "Corrupted Egg Shell",
        description: "Does NOT have any passive stat on it. Niche at best for one-shot protection in high M+ - useless in ALL other scenarios.",
        effects: [
          {  // Heal effect
            coefficient: 817.645,
            table: -8,
            secondaries: ['versatility'],
            efficiency: {Raid: 0.92, Dungeon: 0.84}, // This is an absorb so you won't lose much value.
            cooldown: 120,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
    
          bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
    
          return bonus_stats;
        }
      },
      {
        // Cirral Concoctory procs on allies and so gives them buffs. It can also proc on yourself but it's just as likely as hitting anyone else. Support trinket.
        // - Strand of the Lord - Int buff (only meaningful proc)
        // - Strand of the Queen - All Terts buff
        // - Secondary Buff (same name - crit / mast seen but likely all four)
        // - Sundered: High chance for heals to do more healing / Chance to deal damage when hit (tank, not seen) / chance for damage to deal more damage (DPS, not seen)
        // - Mana (not seen)
        // Assumption is even distribution with sundered taking 1 slot. Target is chosen first, then buff. 
        name: "Cirral Concoctory",
        description: "Procs various stat buffs on other players. Worthless for healing but is actually quite good as a DPS trinket.",
        effects: [
          {  // Int Proc
            coefficient: 0.909246,
            table: -1,
            duration: 20,
            ppm: 2 / 5,
          },
          {  // Secondary Proc
            coefficient: 0.954766,
            table: -7,
            duration: 20,
            ppm: 2 / 5,
          },
          {  // Tertiary Proc - All three
            coefficient: 0.477577,
            table: -7,
          },
          {  // Probably damage proc
            coefficient: 5.9422,
            table: -9,
          },
          {  // Heal proc
            coefficient: 8.9126,
            table: -9,
          },
          {  // Mana proc?
            coefficient: 0.5,
            table: -10,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
    
          //bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
          bonus_stats.allyStats = runGenericPPMTrinket(data[0], itemLevel) / 0.8;
          bonus_stats.allyStats += runGenericPPMTrinket(data[1], itemLevel);
    
          return bonus_stats;
        }
      },
      { // Settings for number of Signetbearers in party? This is party only, not raid wide.
        name: "Signet of the Priory",
        description: "Party only. Not raid wide.",
        effects: [
          {
            coefficient: 2.280362, 
            table: -7,
            duration: 20,
            cooldown: 120,
            stat: "mixed",
          },
          {
            coefficient: 0.060125, 
            table: -7,
            duration: 20,
            cooldown: 120,
            stat: "mixed",
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          /*if (additionalData.castModel.modelName.includes("Chi-Ji")) {
            bonus_stats.hps = additionalData.castModel.modelOnUseTrinket(additionalData.setStats, "Signet of the Priory", itemLevel)
          }
          else {*/
          const bestStat = player.getHighestStatWeight(additionalData.contentType)
          bonus_stats[bestStat] = runGenericOnUseTrinket({...data[0], stat: bestStat}, itemLevel, additionalData.castModel, additionalData.setStats);
          //}


          // When you wear the trinket, you also give a stat buff to others wearing it. This is a good chance for a setting.
          //bonus_stats.allyStats = runGenericOnUseTrinket(data[1], itemLevel) * 4;

          return bonus_stats;
        }
      },
      { //
        name: "Mereldar's Toll",
        description: "",
        effects: [
          { // Damage Effect.
            coefficient: 41.6959 * 0.66, 
            table: -9,
            cooldown: 90,
          },
          { // Vers Buff
            coefficient: 0.504093 * 1.08, 
            table: -7,
            duration: 10,
            cooldown: 90,
            targets: 5
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          bonus_stats.dps = processedValue(data[0], itemLevel) / data[0].cooldown;
          bonus_stats.allyStats = runGenericOnUseTrinket(data[1], itemLevel, null) * data[1].targets;

          return bonus_stats;
        }
      },
      {
        name: "Siphoning Phylactery Shard",
        description: "An unfortunately poor trinket that is hard to get any real value out of.",
        effects: [
          {  // Heal effect
            coefficient: 89.08621 - 44.53448,
            table: -9,
            secondaries: ['versatility'],
            efficiency: {Raid: 0.4, Dungeon: 0.45}, // The efficiency on this is god awful.
            cooldown: 30,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
    
          bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
    
          return bonus_stats;
        }
      },
      {
        name: "Gale of Shadows",
        description: "An overbudget stat stick with 100% uptime. Good for all specs, but amazing for those who like Haste.",
        effects: [
          {  // Int
            coefficient: 0.026496, //0.029,
            table: -1,
            stacks: 20,
            specMod: {"Restoration Druid": 1, "Holy Priest": 1, "Restoration Shaman": 1, "Holy Paladin": 1, "Mistweaver Monk": 1, 
                      "Preservation Evoker": 1, "Discipline Priest": 1} // Double check Lightsmith
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
    
          bonus_stats.intellect = processedValue(data[0], itemLevel) * data[0].stacks * data[0].specMod[player.spec];
    
          return bonus_stats;
        }
      },
      { // Last 30s, multiple can be up at once. Grabbing multiple orbs just refreshes the buff though.
        name: "Entropic Skardyn Core",
        description: "Creates a small orb that you have to run over and grab. Orbs last about 30 seconds but the buff does not stack. They'll slowly float towards you.",
        effects: [
          {
            coefficient: 1.124436, 
            table: -1,
            duration: 15,
            ppm: 2,
            stat: "intellect",
            penalty: 0.75,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel) * data[0].penalty; 

          return bonus_stats;
        }
      },
      { // Gives you a buff that lasts 1 minute and then spawns a spider which is effectively just a DoT. They soft stack in that you can have multiple up at once.
        // Hypothetically it's a 2.5 stack average but I am not convinced.
        name: "Ara-Kara Sacbrood",
        description: "Buff lasts 60s and you can expect to have 2-3 up at almost all times. The Spider DPS is a nice bonus but don't expect too much from it.",
        effects: [
          {
            coefficient: 0.204476 * 0.95, 
            table: -1,
            duration: 60, // Yes really
            ppm: 2.5,
            stat: "intellect",
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          bonus_stats.intellect = processedValue(data[0], itemLevel) * data[0].ppm * data[0].duration / 60; // Check on a log.

          return bonus_stats;
        }
      },
      { 
        name: "Remnant of Darkness",
        description: "Resets to 0 stacks 15 seconds after you hit 5. Procs about twice a minute.",
        effects: [
          {
            coefficient: 0.222817, 
            table: -1,
            ppm: 2,
            maxStacks: 5,
            stat: "intellect",
          },
          {
            coefficient: 43.6165, 
            table: -8,
            secondaries: ["versatility"], // Check Crit
            ticks: 5,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          // It takes on average 5 / 2 = 2.5 minutes to stack to full. After it's at 5 it'll sit at 5 stacks for 15 seconds.
          const averageStacks = (2 * (150) + 5 * 15) / 165;
    
          bonus_stats.intellect = averageStacks * processedValue(data[0], itemLevel) // runGenericPPMTrinket(data[0], itemLevel) * 4;
          bonus_stats.dps = processedValue(data[1], itemLevel) / 165 * 0.66 * data[1].ticks;
    
          return bonus_stats;
        }
      },


]; 