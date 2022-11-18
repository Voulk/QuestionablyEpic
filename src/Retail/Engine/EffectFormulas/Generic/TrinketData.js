import { convertPPMToUptime, processedValue, runGenericPPMTrinket } from "../EffectUtilities";

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
        coefficient: 0.19464,
        table: -7,
        stat: "versatility",
        percentBoosted: 0.9,
        boostValue: 1.5,
      },
      { // Heal over time portion. Remember this is on both yourself and your bonded target.
        coefficient: 1.758215,
        table: -8, // -6 in spell data.
        percentBoosted: 0.9,
        boostValue: 2.33,
        secondaries: ["versatility"], // Currently cannot Crit. TODO: Test Haste.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      // Versatility Portion
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
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Conjured Chillglobe                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Conjured Chillglobe",
    effects: [
      { // Damage portion
        coefficient: 133.4993,
        table: -9,
        percentUsed: 0.3,
        cooldown: 60,
        secondaries: ["crit", "versatility"],
      },
      { // Mana portion
        coefficient: 30.13977,
        table: -9, 
        percentUsed: 0.7,
        cooldown: 60,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      // Damage Portion
      bonus_stats.dps = processedValue(data[0], itemLevel, data[0].percentUsed) * player.getStatMults(data[0].secondaries) / data[0].cooldown;

      // Mana Portion
      bonus_stats.mana = processedValue(data[1], itemLevel, data[1].percentUsed) / data[1].cooldown;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                Whispering Incarnate Icon                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /*  DPS: Frost
        Healer: Fire
        Tank: Earth
        Possible group-only requirement.
        If you have both Frost & Fire in group then you'll get both buffs when it procs. It's based on what you do and does proc off healing.
    */
    name: "Whispering Incarnate Icon",
    effects: [
      { // 100% uptime. Probably add a setting for the rest?
        coefficient: 0.599658,
        table: -1,
      },
      { // This is for the proc if you have Earth and Frost in party.
        coefficient: 0.250517,
        table: -7,
        ppm: 2,
        duration: 12,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      // Versatility Portion
      let bonus_stats = {};
      bonus_stats.haste = processedValue(data[0], itemLevel);

      // Ally buff
      let sharedBuff = runGenericPPMTrinket(data[1], itemLevel);
      bonus_stats.crit = sharedBuff;
      bonus_stats.versatility = sharedBuff;
      // Check if buffs are active and if they are, add them to bonus stats.
      //if (additionalData.settings.includeGroupBenefits) bonus_stats.allyStats = versatilityBuff;

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
