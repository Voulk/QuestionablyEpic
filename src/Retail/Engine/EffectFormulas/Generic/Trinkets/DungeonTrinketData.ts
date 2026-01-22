import Player from "General/Modules/Player/Player";
import { convertPPMToUptime, getHighestStat, runGenericFlatProc, getSetting, forceGenericOnUseTrinket, processedValue, runGenericPPMTrinket, runGenericRandomPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket } from "../../EffectUtilities";
import trinketRawData from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketData.json"

export const dungeonTrinketData = 
[
    { //
        id: 193718,
        name: "Emerald Coach's Whistle",
        description: "",
        addonDescription: "",
        effects: [
        { // Stat Proc Portion
            stat: "mastery",
            duration: 10,
            ppm: 1,
        },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats.mastery = runGenericPPMTrinket({...data[0], ...trinketRawData["Emerald Coach's Whistle"][0]}, itemLevel);
            if (getSetting(additionalData.settings, 'includeGroupBenefits')) bonus_stats.allyStats = bonus_stats.mastery;

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
    {
      name: "Echo of L'ura",
      effects: [
        { 
          secondaries: ['versatility', 'crit'],
          cooldown: 180,
          duration: 45,
          ppm: 25 * (45 / 180), // Only active while the trinket is up which is 45/180 of the time.
          efficiency: {Raid: 0.7, Dungeon: 0.55} //
        },
      ],
      runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
        let bonus_stats: Stats = {};
  
        bonus_stats.hps = runGenericFlatProc({...data[0], ...trinketRawData["Echo of L'ura"][0]}, itemLevel, player, additionalData.contentType)
        return bonus_stats;
      }
    },


]; 