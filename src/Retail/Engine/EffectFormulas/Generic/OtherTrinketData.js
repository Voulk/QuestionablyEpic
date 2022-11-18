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


]