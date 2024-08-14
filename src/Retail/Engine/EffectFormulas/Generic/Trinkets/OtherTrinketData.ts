import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { Player } from "General/Modules/Player/Player";

export const otherTrinketData = [
  { // 
    name: "Imperfect Ascendancy Serum",
    description: "",
    effects: [
      {
        coefficient: 0.300226, 
        table: -7,
        duration: 20,
        cooldown: 120,
        stat: "mixed",
      },
      {
        coefficient: 0.999862, 
        table: -1,
        duration: 20,
        cooldown: 120,
        stat: "intellect",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      const secondaryAverage = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel)
      bonus_stats.intellect = runGenericOnUseTrinket(data[1], itemLevel, additionalData.castModel);

      ["versatility", "crit" , "haste", "mastery"].forEach(stat => {
        bonus_stats[stat] = secondaryAverage;
      });


      return bonus_stats;
    }
  },
  { 
    name: "Quickwick Candlestick",
    description: "",
    effects: [
      {
        coefficient: 2.400612, 
        table: -7,
        duration: 20,
        cooldown: 120,
        stat: "haste",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.haste = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);

      return bonus_stats;
    }
  },
  { 
    name: "Spelunker's Waning Candle",
    description: "",
    effects: [
      {
        coefficient: 1.124529, 
        table: -7,
        duration: 15,
        ppm: 2,
        stat: "crit",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.crit = runGenericPPMTrinket(data[0], itemLevel);
      bonus_stats.allyStats = bonus_stats.crit * 0.8; // Shared with a friend if within 3yds.

      return bonus_stats;
    }
  },
  { // Is this 100% uptime?
    name: "Unstable Power Suit Core",
    description: "",
    effects: [
      {
        coefficient: 0.525141, 
        table: -7,
        duration: 15,
        ppm: 2,
        stat: "crit",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      const secValue = processedValue(data[0], itemLevel);
      bonus_stats.versatility = secValue / 4;
      bonus_stats.crit = secValue / 4;
      bonus_stats.haste = secValue / 4;
      bonus_stats.mastery = secValue / 4;

      return bonus_stats;
    }
  },
  { 
    name: "Vile Vial of Kaheti Bile",
    description: "",
    effects: [
      {
        coefficient: 36.23988, 
        table: -9,
        efficiency: 0.9,
        secondaries: ["crit", "haste", "versatility"], // Crit untested
        ppm: 2,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
  { 
    name: "Goldenglow Censer",
    description: "",
    effects: [
      {
        coefficient: 123.8048, 
        table: -9,
        efficiency: 0.95,
        cooldown: 60,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel) * data[0].efficiency / data[0].cooldown;

      return bonus_stats;
    }
  },

]