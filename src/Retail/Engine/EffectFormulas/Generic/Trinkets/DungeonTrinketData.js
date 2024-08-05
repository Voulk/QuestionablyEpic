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
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
          const bestStat = player.getHighestStatWeight(additionalData.contentType)
          bonus_stats[bestStat] = runGenericPPMTrinket(data[0], itemLevel);
          console.log(itemLevel + " Changeling: " + bonus_stats.haste);
          return bonus_stats;
        }
      },



]; 