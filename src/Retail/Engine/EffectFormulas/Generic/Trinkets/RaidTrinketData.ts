import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, getDiminishedValue, runGenericOnUseTrinket, forceGenericOnUseTrinket, runGenericPPMOverlapTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [
  
    { // Check which "direct heal" spells count and whether you can track it on frames. Check is it's really 100% of your overhealing with no cap.
    name: "Nexus-King's Command",
    description: "The absorb portion is only on the single spell that procs the shield. Is quite hard to play well but if you consume the debuff during your healing cooldowns then this is an excellent trinket.",
    effects: [
      { // Int Proc
        coefficient: 1.241728, 
        table: -1,
        duration: 12,
        cooldown: 30, // 30s ticking aura
        stat: "intellect",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      //bonus_stats.intellect = processedValue(data[0], itemLevel) * data[0].duration / data[0].cooldown; // These stacks can overlap so there should be no proc munching.
      bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel)
      return bonus_stats;
    }
  },

];
