import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { Player } from "General/Modules/Player/Player";

export const timewalkingTrinketData = [
    {
        name: "Memento of Tyrande",
        effects: [
            { // Mana proc chance.
            coefficient: 2.03251,
            table: -7,
            ppm: 2.5,
            },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};

            bonus_stats.mana = processedValue(data[0], itemLevel) * data[0].ppm! / 60 * player.getStatPerc('haste');

            return bonus_stats;
        }
    },
    {
        name: "The Skull of Gul'dan",
        effects: [
          { // (Fel infusion)
            coefficient: 1.815054, 
            table: -7,
            duration: 20,
            cooldown: 120,
          },
        ],
        runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
            let bonus_stats: Stats = {};
            bonus_stats.haste = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
            return bonus_stats;
        }
      },


]