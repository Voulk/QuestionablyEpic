import { convertPPMToUptime, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket } from "../EffectUtilities";

export const dungeonTrinketData = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Emerald Coach's Whistle                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Emerald Coach's Whistle",
    effects: [
      { // Mastery portion
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
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Water's Beating Heart                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* Armor bonus not included (and rarely useful).
    */
    name: "Water's Beating Heart",
    effects: [
      { 
        coefficient: 39.11369, // Note that this coefficient is for when the target is below 20% health.
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ticks: 4, // Haste adds ticks / partial ticks. 
        cooldown: 120,
        mult: 0.7, // Mult = 1 is the target being sub 20% health for it's duration. Mult = 0.5 would be a full health target.
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].mult) * player.getStatMults(data[0].secondaries) * data[0].ticks / data[0].cooldown;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Kyrakka's Searing Embers                                      */
    /* ---------------------------------------------------------------------------------------------- */

    name: "Kyrakka's Searing Embers",
    effects: [
      { // Healing Portion
        coefficient: 161.5508, 
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 1,
        mult: 0.55, // Our expected overhealing.
      },
      { // Damage portion
        // Damage is split, so we don't need any kind of target multiplier in here.
        coefficient: 48.30759, 
        table: -9,
        secondaries: ['haste', 'crit', 'versatility'],
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].mult) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
      bonus_stats.dps = processedValue(data[1], itemLevel) * player.getStatMults(data[1].secondaries) * data[1].ppm / 60;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Tome of Unstable Power                                       */
    /* ---------------------------------------------------------------------------------------------- */
    // This is technically a party buff but because it comes with downside, that portion isn't currently included.
    name: "Tome of Unstable Power",
    effects: [
      { // +Int Portion
        coefficient: 1.453919, 
        table: -1,
        duration: 15,
        cooldown: 180,
        efficiency: 0.25, // The rune is tiny. This functionally is incompatible with most fight designs.
      },
      { // -Crit Portion
        coefficient: 0.907077, 
        table: -7,
        duration: 15,
        cooldown: 180,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * data[0].efficiency;
      bonus_stats.crit = -1 * runGenericOnUseTrinket(data[1], itemLevel, additionalData.castModel)* data[0].efficiency;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Time Breaching Talon                                        */
    /* ---------------------------------------------------------------------------------------------- */
    // 
    name: "Time-Breaching Talon",
    effects: [
      { // +Int Portion
        coefficient: 3.477437, 
        table: -7,
        duration: 15,
        cooldown: 150,
        efficiency: 1,
      },
      { // -Int portion
        coefficient: 1.391347, 
        table: -7,
        duration: 15,
        cooldown: 150,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      

      if (additionalData.player.getSpec() === "Discipline Priest") {
          const buffValue = processedValue(data[0], itemLevel);
          bonus_stats.hps = runDiscOnUseTrinket("Time-Breaching Talon", buffValue, additionalData.setStats, additionalData.castModel, additionalData.player)
      }
      else {
        bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * data[0].efficiency;
        bonus_stats.intellect -= runGenericOnUseTrinket(data[1], itemLevel, additionalData.castModel);
      }


      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Miniature Singing Stone                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
   // Singing Stone hits 1 target, and then bounces to a new target when it expires or when it's consumed.
   // Each bounce is at full strength and it'll bounce four times total for 5 absorbs.
    name: "Miniature Singing Stone",
    effects: [
      { 
        coefficient: 89.95994, 
        table: -9,
        secondaries: ['versatility'],
        cooldown: 120,
        mult: 5, 
        efficiency: {Raid: 0.64, Dungeon: 0.5} //
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].mult * data[0].efficiency[additionalData.contentType], "round") * player.getStatMults(data[0].secondaries) / data[0].cooldown;
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Flask of the Solemn Night                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Flask of the Solemn Night",
    effects: [
      {
        coefficient: 0.186258,
        table: -7,
        duration: 10,
        efficiency: {"Preservation Evoker": 0.5, "Restoration Druid": 0.8, "Holy Paladin": 0.67, "Mistweaver Monk": 0.7, "Restoration Shaman": 0.65, "Holy Priest": 0.7, "Discipline Priest": 0.7},
        stacks: 15, // You start with 20, lose 1 every second and end with 10 for an average of 15.
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      // trinketRaw represents a single stack of the buff.
      const trinketRaw = processedValue(data[0], itemLevel)
      let trinketSum = 0
      // Add raw values for stacks 10 through 19.
      for (var i = 10; i <= 19; i++) {
        // We're going to adjust each stack individually for diminishing returns. 
        // The more stacks we have, the harder we'll be hit.
        let adjVal = getDiminishedValue('Haste', trinketRaw * i, additionalData.setStats.haste)
        trinketSum += adjVal
      }
    
      // Take an average of our stacks. Note that the trinket decreases from 19 to 10, NOT to 0.
      bonus_stats.haste = (trinketSum / 10) * convertPPMToUptime(data[0].ppm, data[0].duration) * data[0].efficiency[player.spec];

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Mote of Sanctification                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Mote of Sanctification",
    effects: [
      { 
        coefficient: 180.9063, // Note that this coefficient is for when the target is below 20% health.
        table: -8,
        secondaries: ['versatility', 'crit'],
        cooldown: 90,
        efficiency: 0.7, //
        targets: 5,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].targets / data[0].cooldown * player.getStatMults(data[0].secondaries);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         Horn of Valor                                          */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Horn of Valor",
    effects: [
      { 
        coefficient: 1.334434,
        table: -1,
        stat: "intellect",
        duration: 30,
        cooldown: 120,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Voidmender's Shadowgem                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Voidmender's Shadowgem",
    effects: [
      { 
        coefficient: 1.92032,
        table: -7,
        stat: "crit",
        duration: 15,
        cooldown: 120,
      },
      { // This is the crit bonus effect. It's on a 20ppm.
        coefficient: 0.240273,
        table: -7,
        ppm: 20,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};


      const critPerStack = processedValue(data[1], itemLevel)
      const effectiveCrit = processedValue(data[0], itemLevel) + critPerStack * (data[1].ppm * (data[0].duration / 60)/2)

      if (additionalData.player.getSpec() === "Discipline Priest") {

        bonus_stats.hps = runDiscOnUseTrinket("Voidmender's Shadowgem", effectiveCrit, additionalData.setStats, additionalData.castModel, additionalData.player)
      }
      else {
        bonus_stats.crit = effectiveCrit * data[0].duration / data[0].cooldown; // TODO: Add CD Mult.
      }
      

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Erupting Spear Fragment                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Erupting Spear Fragment",
    effects: [
      { 
        coefficient: 0.540148,
        table: -7,
        stat: "crit",
        duration: 10,
        cooldown: 90,
      },
      { // This is the damage bonus effect. TODO.
        coefficient: 0.240273,
        table: -7,
        ppm: 20,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const enemyTargets = additionalData.contentType === "Dungeon" ? 5 : 1;

      bonus_stats.crit = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) * enemyTargets;

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                   Spoils of Neltharus                                          */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Spoils of Neltharus",
    effects: [
      { 
        coefficient: 2.521002,
        table: -7,
        stat: "N/A",
        duration: 20,
        cooldown: 120,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const averageStatGain = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel)
      bonus_stats.haste = averageStatGain / 4;
      bonus_stats.crit = averageStatGain / 4;
      bonus_stats.mastery = averageStatGain / 4;
      bonus_stats.versatility = averageStatGain / 4;

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
