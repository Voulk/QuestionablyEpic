import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { Player } from "General/Modules/Player/Player";
import { randPropPoints } from "Retail/Engine/RandPropPointsBylevel";
import { combat_ratings_mult_by_ilvl } from "Retail/Engine/CombatMultByLevel";

export const otherTrinketData = [
  { // 
    name: "Imperfect Ascendancy Serum",
    description: "Has a short cast time on use.",
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
    description: "Will need to be double checked on live since it wasn't available on Beta.",
    effects: [
      {
        coefficient: 0.525141, 
        table: -7,
        uptime: 20/30, // Buff for 10-30s, 30s refresh.
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};
      const secValue = processedValue(data[0], itemLevel) * data[0].uptime!;
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
        coefficient: 53.4756, 
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
    description: "Fairly weak in overall power but does offer some light life-saving potential that could be useful in some scenarios.",
    effects: [
      {
        coefficient: 123.8048, // Check this: 92.10533
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
  { 
    name: "Algari Alchemist Stone",
    description: "",
    effects: [
      {
        coefficient: 0.277491, 
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
  { 
    name: "Nerubian Pheromone Secreter",
    description: "You can pick which two secondaries you'd like the trinket to have. When it procs you'll need to gather the three pheromones to get the full effect.",
    setting: true,
    effects: [
      {
        coefficient: 0.535705, 
        table: -1,
        duration: 20,
        ppm: 1, // ICD of 20s
        stacks: 2.7,
        stat: "intellect",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      // Secondaries
      const secondaryBudget = 6666;
      const randProp = randPropPoints[itemLevel]["slotValues"][1];
      const combatMult = combat_ratings_mult_by_ilvl[itemLevel]
      const chosenSecondaries = getSetting(additionalData.settings, 'pheromoneSecreter')//.split("/")
      const secondaries = Math.round(randProp * secondaryBudget * 0.0001 * combatMult)

      chosenSecondaries.replace(/ /g, "").split("/").forEach(stat => {
        bonus_stats[stat] = Math.round(secondaries / 2);
      });

      // Intellect
      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel) * data[0].stacks! * 0.95;

      return bonus_stats;
    }
  },

]