import { Player } from "General/Modules/Player/Player";
import { convertPPMToUptime, getSetting, processedValue, runGenericPPMTrinket, runGenericFlatProc, getDiminishedValue, runGenericOnUseTrinket, forceGenericOnUseTrinket, runGenericPPMOverlapTrinket } from "../../EffectUtilities";
import { setBounds } from "General/Engine/CONSTRAINTS"
import trinketRawData from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketData.json"

// Note that raid trinket data is stored here. For other trinket data, see the dungeon, timewalking and other trinket data files.
export const raidTrinketData = [
  { // 
    name: "Vaelgor's Final Stare",
    description: "",
    addonDescription: "",
    effects: [
      { // Int Proc
        duration: 15,
        cooldown: 90, //
        stat: "mastery",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats[data[0].stat!] = runGenericOnUseTrinket({...data[0], ...trinketRawData["Vaelgor's Final Stare"][0]}, itemLevel, additionalData.castModel) / 2
      return bonus_stats;
    }
  },
      { //
        id: 249343,
        name: "Gaze of the Alnseer",
        description: "",
        addonDescription: "",
        effects: [
        { // Stat Proc Portion
            stat: "intellect",
            duration: 12,
            ppm: 2,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            const spellsCastInduration = 12 / 1.5 / 2; // Placeholder obviously

            bonus_stats.intellect = runGenericPPMTrinket({...data[0], ...trinketRawData["Gaze of the Alnseer"][0]}, itemLevel);
            bonus_stats.intellect *= spellsCastInduration; // 

            return bonus_stats;
        }
  },
    { //
        id: 249809,
        name: "Locus-Walker's Ribbon",
        description: "",
        addonDescription: "",
        effects: [
        { // Stat Proc Portion
            stat: "intellect",
            duration: 10,
            ppm: 2.5,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats.intellect = runGenericPPMTrinket({...data[0], ...trinketRawData["Locus-Walker's Ribbon"][0]}, itemLevel);

            const timeToMax = 10 / data[0].ppm!;
            const timeAtMax = 6 - timeToMax; 
            const averageStacks = timeAtMax + (timeToMax / 2);

            bonus_stats.intellect *= averageStacks * 0.05 + 1;

            return bonus_stats;
            }
    },
    { //
        id: 249341,
        name: "Volatile Void Suffuser",
        description: "",
        addonDescription: "",
        effects: [
        { // Stat Proc Portion
            stat: "intellect",
            duration: 12,
            ppm: 2.5,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats.intellect = runGenericPPMOverlapTrinket({...data[0], ...trinketRawData["Volatile Void Suffuser"][0]}, itemLevel);
            const averageRaidHealth = 0.9; // Can we just put this in settings maybe?
            bonus_stats.intellect *= (1 + (1 - averageRaidHealth));

            return bonus_stats;
            }
    },
        {
          name: "Light of the Cosmic Crescendo",
          effects: [
            { // Damage effect. NYI.
              secondaries: ['haste', 'versatility', 'crit'],
              ppm: 5,
            },
            { 
              secondaries: ['haste', 'versatility', 'crit'],
              ppm: 5, 
              targets: 1.5, // Heals for more per healed ally, up to 5.
              efficiency: {Raid: 0.7, Dungeon: 0.55} //
            },
          ],
          runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};
      
            bonus_stats.hps = runGenericFlatProc({...data[1], ...trinketRawData["Light of the Cosmic Crescendo"][1]}, itemLevel, player, additionalData.contentType)
            
            return bonus_stats;
          }
        },


];
