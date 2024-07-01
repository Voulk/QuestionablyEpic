import { convertPPMToUptime, getHighestStat, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket } from "../../EffectUtilities";

export const dungeonTrinketData = [
    {
        name: "Carved Blazikon Wax",
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


]; // End

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
