import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, forceGenericOnUseTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket, runGenericRandomPPMTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { Player } from "General/Modules/Player/Player";
import { randPropPoints } from "Retail/Engine/RandPropPointsBylevel";
import { combat_ratings_mult_by_ilvl } from "Retail/Engine/CombatMultByLevel";

export const otherTrinketData = [
      { 
    name: "Magister's Alchemist Stone",
    description: "High variance. Beware the low uptime. Requires a valuable spark to craft which you're usually better off spending elsewhere.",
    addonDescription: "High variance. Beware the low uptime. Requires a valuable spark to craft which you're usually better off spending elsewhere.",
    effects: [
      {
        coefficient: 2, //0.277491, 
        table: -1,
        duration: 15,
        ppm: 1,
        stat: "intellect",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },

  

]