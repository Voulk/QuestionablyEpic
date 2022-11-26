import { convertPPMToUptime, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue } from "../EffectUtilities";

export const otherTrinketData = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Static-Charged Scale                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Static-Charged Scale",
    effects: [
      { 
        coefficient: 1.457055,
        table: -7,
        stat: "haste",
        duration: 15,
        ppm: 2,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel);
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Alacritous Alchemist Stone                                    */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Alacritous Alchemist Stone",
    effects: [
      { 
        coefficient: 1.172515,
        table: -1,
        stat: "intellect",
        duration: 10,
        ppm: 2,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel);

      // TODO: Add potion.

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Darkmoon Deck: Dance                                     */
    /* ---------------------------------------------------------------------------------------------- */
    /* There might be some special deck modifiers that we have to add later.
    */
    name: "Darkmoon Deck: Dance",
    effects: [
      { 
        coefficient: 20.32447,
        table: -8,
        efficiency: 0.6,
        cooldown: 90
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      const averageHealTargets = 5; // ceil((5 + 12) / 2 / 2)
      const averageDamageTargets = 4; // floor((5 + 12) / 2 / 2)
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * averageHealTargets / data[0].cooldown;
      bonus_stats.dps = processedValue(data[0], itemLevel, data[0].efficiency) * averageDamageTargets / data[0].cooldown;
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    Azure Arcanic Amplifier                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Azure Arcanic Amplifier",
    effects: [
      { 
        coefficient: 2.881377,
        table: -7,
        stat: "crit",
        duration: 10,
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.crit = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Razorwind Talisman                                       */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Razorwind Talisman",
    effects: [
      { 
        coefficient: 2.881377,
        table: -7,
        stat: "crit",
        duration: 10,
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.crit = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Breath of the Plains                                      */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Breath of the Plains",
    effects: [
      { 
        coefficient: 1.560047,
        table: -7,
        stat: "haste",
        duration: 10,
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  The Cartographer's Calipers                                   */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "The Cartographer's Calipers",
    effects: [
      { 
        coefficient: 24.1169,
        table: -9,
        duration: 3,
        secondaries: ['haste', 'versatility', 'crit'],
        efficiency: 1,
        ppm: 1,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};
      bonus_stats.hps = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].ppm / 60 * player.getStatMults(data[0].secondaries);
      return bonus_stats;
    }
  },
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Dreamscape Prism                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "Dreamscape Prism",
    effects: [
      { // Mastery Proc
        coefficient: 1.441087,
        table: -7,
        duration: 20,
        ppm: 0.5,
      },
      { // Mana Proc. TODO
        coefficient: 0.001597,
        table: -7,
        duration: 20,
        ppm: 0.5,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      bonus_stats.mastery = runGenericPPMTrinket(data[0], itemLevel);
      //bonus_stats.mana = processedValue(data[0], itemLevel, data[0].efficiency) * data[0].ppm / 60 * player.getStatMults(data[0].secondaries);
      return bonus_stats;
    }
  },


]