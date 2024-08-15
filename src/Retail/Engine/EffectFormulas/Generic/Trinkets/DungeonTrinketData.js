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
            coefficient: 169.529, // 371.7325,
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
        description: "",
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
            coefficient: 28.9919,
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
        // Possible Buffs:
        // - Int buff
        // - All Terts buff
        // - Crit buff / Mastery Buff (same name)
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
            coefficient: 4.026929,
            table: -9,
          },
          {  // Heal proc
            coefficient: 6.03998,
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
        description: "",
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
      { // Settings for number of Signetbearers in party? This is party only, not raid wide.
        name: "Mereldar's Toll",
        description: "",
        effects: [
          { // Damage Effect.
            coefficient: 28.25688 * 0.66, 
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
        effects: [
          {  // Heal effect
            coefficient: 89.08621,
            table: -9,
            secondaries: ['versatility'],
            efficiency: {Raid: 0.35, Dungeon: 0.4}, // The efficiency on this is god awful.
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
        effects: [
          {  // Int
            coefficient: 0.029,
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
        description: "",
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

          bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel);

          return bonus_stats;
        }
      },
      { // Gives you a buff that lasts 1 minute and then spawns a spider which is effectively just a DoT. They soft stack in that you can have multiple up at once.
        // Hypothetically it's a 2.5 stack average but I am not convinced.
        name: "Ara'Kara Sacbrood",
        description: "",
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

          bonus_stats.intellect = processedValue(data[0], itemLevel) * data[0].ppm * data[0].duration / 60 * 0.7; // Check on a log.

          return bonus_stats;
        }
      },


]; 