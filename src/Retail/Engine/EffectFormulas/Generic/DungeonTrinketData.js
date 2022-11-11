import { convertPPMToUptime, processedValue, runGenericPPMTrinket } from "../EffectUtilities";

export const dungeonTrinketData = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Emerald Coach's Whistle                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Emerald Coach's Whistle",
    effects: [
      { // Versatility Portion. 100% uptime.
        coefficient: 0.780421,
        table: -7,
        stat: "mastery",
        duration: 10,
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.mastery = runGenericPPMTrinket(data[0], itemLevel);
      if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = bonus_stats.mastery;
      return bonus_stats;
    }
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
