import { Player } from "General/Modules/Player/Player";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, getDiminishedValue, runGenericOnUseTrinket, forceGenericOnUseTrinket, runGenericPPMOverlapTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [

    { // 
    name: "Nexus-King's Command",
    description: ".",
    effects: [
      { // Int Proc
        coefficient: 1.241728, 
        table: -1,
        duration: 12,
        cooldown: 30, // 30s ticking aura
        stat: "intellect",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      //bonus_stats.intellect = processedValue(data[0], itemLevel) * data[0].duration / data[0].cooldown; // These stacks can overlap so there should be no proc munching.
      bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel)
      return bonus_stats;
    }
  },

];
