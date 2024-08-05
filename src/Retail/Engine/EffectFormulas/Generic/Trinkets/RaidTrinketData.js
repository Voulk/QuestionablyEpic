import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, getDiminishedValue, runGenericOnUseTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [
    { // While the buffs appear in the same stack, they are individual buffs. This does mean it's impossible to lose any value if you get an int proc while you already have one.
        name: "Gruesome Syringe",
        effects: [
          {  // Heal effect
            coefficient: 63.84857, 
            table: -8,
            secondaries: ['versatility', 'crit'], // Crit?
            ppm: 6,
            percentProcced: 0.5,
            efficiency: {Raid: 0.95, Dungeon: 0.95}, // This procs on lower health targets, so efficiency should be very high.
          },
          {  // Intellect effect
            coefficient: 0.755798,
            table: -1,
            duration: 10,
          },
        ],
        runFunc: function(data, player, itemLevel, additionalData) {
          let bonus_stats = {};
    
          bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType) * data[0].percentProcced;
          bonus_stats.intellect = processedValue(data[1], itemLevel) * data[1].duration * data[0].ppm * 1.13 * (1 - data[0].percentProcced) / 60;
    
          return bonus_stats;
        }
      },

];
