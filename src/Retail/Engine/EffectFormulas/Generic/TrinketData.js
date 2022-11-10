import { convertPPMToUptime, processedValue } from "../EffectUtilities";

export const raidTrinketData = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Broodkeeper's Promise                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Broodkeeper's Promise",
    effects: [
      { // Versatility Portion. 100% uptime.
        coefficient: 0.5,
        table: -7,
        stat: "versatility",
        percentBoosted: 0.9,
        boostValue: 1.5,
      },
      { // Heal over time portion. Remember this is on both yourself and your bonded target.
        coefficient: 1,
        table: -9,
        percentBoosted: 0.9,
        boostValue: 2.33,
        secondaries: ["versatility"], // Currently cannot Crit. TODO: Test Haste.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      // Versatility Porion
      let bonus_stats = {};
      const versBoost = data[0].percentBoosted * data[0].boostValue + (1-data[0].percentBoosted)
      bonus_stats.versatility = processedValue(data[0], itemLevel, versBoost);

      if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = versatilityBuff;

      // Healing Portion
      let healing = processedValue(data[1], itemLevel) * player.getStatMults(data[1].secondaries) * 2;
      bonus_stats.hps = healing * (data[0].percentBoosted * data[1].boostValue + (1-data[1].percentBoosted));

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
