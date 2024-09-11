import { convertPPMToUptime, getHighestStat, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, runGenericRandomPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket } from "../../EffectUtilities";

export const dungeonTrinketData = 
[
    {
        name: "Carved Blazikon Wax",
        description: "",
        effects: [
          {
            coefficient: 1.068708, 
            table: -7,
            stat: "versatility",
            duration: 15,
            ppm: 2,
          },
          {
            coefficient: 0.112286, 
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
        effects: [
          {  // Heal effect
            coefficient: 250.157, // 371.7325,
            table: -9,
            secondaries: ['versatility'],
            efficiency: {Raid: 0.72, Dungeon: 0.84}, // This is an absorb so you won't lose much value but it's really hard to find good uses for it on a 2 min cadence.
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
          console.log("CHANGELING", JSON.stringify(bonus_stats))
          return bonus_stats;
        }
      },
      {
        name: "Scrapsinger's Symphony",
        effects: [
          {  // Heal effect
            coefficient: 42.7805,
            table: -9,
            secondaries: ['versatility', 'haste'],
            efficiency: {Raid: 0.92, Dungeon: 0.84}, // This is an absorb so you won't lose much value.
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
        // - Int buff (only meaningful proc)
        // - All Terts buff
        // - Secondary Buff (same name - crit / mast seen but likely all four)
        // - Sundered: High chance for heals to do more healing / Chance to deal damage when hit (tank, not seen) / chance for damage to deal more damage (DPS, not seen)
        // - Mana (not seen)
        // Assumption is even distribution with sundered taking 1 slot. Target is chosen first, then buff. 
        name: "Cirral Concoctory",

        effects: [
          {  // Int Proc
            coefficient: 0.909246,
            table: -1,
          },
          {  // Secondary Proc - Crit or Mastery. Seems random which.
            coefficient: 0.954766,
            table: -7,
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
          const bestStat = player.getHighestStatWeight(additionalData.contentType)
          bonus_stats[bestStat] = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);

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
            coefficient: 0.504093, 
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
        description: "Creates a small orb that you have to run over and grab. Orbs last about 30 seconds but the buff does not stack.",
        effects: [
          {
            coefficient: 1.124436, 
            table: -1,
            duration: 15,
            ppm: 2,
            stat: "intellect",
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};

          bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel) * 0.9;

          return bonus_stats;
        }
      },
      { // Gives you a buff that lasts 1 minute and then spawns a spider which is effectively just a DoT. They soft stack in that you can have multiple up at once.
        // Hypothetically it's a 2.5 stack average but I am not convinced.
        name: "Ara-Kara Sacbrood",
        description: "Buff lasts 60s and you can expect to have 2-3 up at almost all times. The Spider DPS is a nice bonus but don't expect too much from it.",
        effects: [
          {
            coefficient: 0.204476, 
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