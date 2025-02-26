import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket, runGenericRandomPPMTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { Player } from "General/Modules/Player/Player";
import { randPropPoints } from "Retail/Engine/RandPropPointsBylevel";
import { combat_ratings_mult_by_ilvl } from "Retail/Engine/CombatMultByLevel";

export const otherTrinketData = [
  { // 1:30 cooldown mastery on-use. 
    name: "Funhouse Lens",
    description: "Very good if your spec has powerful 90s cooldowns like Preservation Evoker and Disc Priest. Fairly poor otherwise.",
    effects: [
      {
        coefficient: 0.894932, 
        table: -9,
        duration: 15, 
        cooldown: 90,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.haste = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) / 2;
      bonus_stats.crit = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) / 2;

      return bonus_stats;
    }
  },
  { 
    name: "Bashful Book",
    description: "",
    effects: [
      { // Damage effect
        coefficient: 8.199264, 
        table: -9,
        ticks: 10,
        secondaries: ["crit", "haste", "versatility"], // Crit untested
        ppm: 1 * 0.2,
      },
      { // Heal effect
        coefficient: 12.30001, 
        table: -9,
        efficiency: 0.8,
        ticks: 10,
        secondaries: ["crit", "haste", "versatility"], // Crit untested
        ppm: 1 * 0.8,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.dps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
      bonus_stats.hps = runGenericFlatProc(data[1], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
  { 
    name: "Dr. Scrapheal",
    description: "",
    effects: [
      { // This also technically has a "when ally drops below X effect" but trinket doesn't appear available at good item level.
        coefficient: 21.39124, 
        table: -9,
        efficiency: 0.8,
        secondaries: ["crit", "haste", "versatility"], // Crit untested
        ppm: 3,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
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
    name: "Concoction: Kiss of Death",
    description: "Assumes a 25s duration. You really don't want to play this close to the stun timer. Lines up with nothing.",
    effects: [
      {
        coefficient: 0.555679, 
        table: -7,
        duration: 25, // Can go up to 30 but you get stunned
        cooldown: 150,
        stat: "all",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.haste = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
      bonus_stats.mastery = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
      bonus_stats.crit = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
      bonus_stats.versatility = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);

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
        uptime: 1, // Buff for 10-30s, 30s refresh.
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
  { // lol
    name: "Fungal Friend Flute",
    description: "",
    effects: [
      {
        coefficient: 106.9512, 
        table: -9,
        efficiency: 0.8,
        secondaries: ["crit", "haste", "versatility"], // Crit untested
        ppm: 1 * 0.33,
      },
      { // DPS
        coefficient: 24.3678, 
        table: -9,
        efficiency: 1,
        ticks: 3, // Ticks every second for 3s
        secondaries: ["crit", "haste", "versatility"], // Crit untested
        ppm: 1 * 0.33,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
      bonus_stats.dps = runGenericFlatProc(data[1], itemLevel, player, additionalData.contentType);

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
  { 
    name: "Nerubian Pheromone Secreter",
    description: "You can pick which two secondaries you'd like the trinket to have. When it procs you'll need to gather the three pheromones to get the full effect. OFTEN BUGGED ON LIVE SERVERS.",
    setting: true,
    effects: [
      {
        coefficient: 0.535705, 
        table: -1,
        duration: 20,
        ppm: 1, // ICD of 20s
        stacks: 2, // 3 is technically possible but not really happening on live servers so far.
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
  { // Stacking stat buff
    name: "Darkmoon Deck: Ascension",
    description: "Ilvl locked, but can be attached to an item as an embellishment.",
    effects: [
      { // Gives 89 of a random stat
        coefficient: 0.021938, 
        table: -571,
        maxStacks: 10,
        timer: 8,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      const fightLength = additionalData.castModel.fightInfo.fightLength;
      // The Sigil gives a random stat so we'll split our value into quarters after we calculate it.
      // It takes 80 seconds of combat to reach max buffs which we'll then have for the rest of the fight.
      const averageStacks = ((fightLength - 80) * 10 + 80 * 5) / fightLength;
      
      ['haste', 'crit', 'versatility', 'mastery'].forEach((stat) => {
        bonus_stats[stat] = 145 /*processedValue(data[0], itemLevel)*/ * averageStacks / 4;
      })

      return bonus_stats;
    }
  },
  { // Stacking vers buff
    name: "Darkmoon Deck: Symbiosis",
    description: "Ilvl locked, but can be attached to an item as an embellishment. Briefly received a 100% buff but this has been rolled back.",
    effects: [
      { 
        coefficient: 0.022809, // 0.088359 at -9 in the spell data too.
        table: -571,
        maxStacks: 5,
        timer: 10,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      const fightLength = additionalData.castModel.fightInfo.fightLength
      // The Sigil gives a random stat so we'll split our value into quarters after we calculate it.
      // It takes 80 seconds of combat to reach max buffs which we'll then have for the rest of the fight.
      const averageStacks = ((fightLength - 50) * 5 + 50 * 2.5) / fightLength;
      
      bonus_stats.versatility = 251 /*processedValue(data[0], itemLevel)*/ * averageStacks;


      return bonus_stats;
    }
  },
  { 
    name: "Fungarian Mystic's Cluster",
    description: "",
    effects: [
      {
        coefficient: 0.277491, 
        table: -7,
        duration: 10,
        ppm: 2,
        stat: "mastery",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.allyStats = runGenericPPMTrinket(data[0], itemLevel) * 4;

      return bonus_stats;
    }
  },
  { 
    name: "Shining Arathor Insignia",
    description: "Fairly poor as a healing trinket without intellect, but does a decent amount of extra DPS.",
    effects: [
      {
        coefficient: 78.5124 * 0.9, 
        table: -8,
        ppm: 4,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.dps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
      bonus_stats.hps = bonus_stats.dps * 0.8;

      return bonus_stats;
    }
  },
  { 
    name: "Charm of the Underground Beast",
    description: "",
    effects: [
      {
        coefficient: 0.922179, 
        table: -7,
        duration: 12,
        ppm: 3,
        stat: "crit",
      },

    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.crit = runGenericPPMTrinket(data[0], itemLevel);

      return bonus_stats;
    }
  },
  { 
    name: "Shadowed Essence",
    description: "No passive stats but you'll get high uptime on a crit buff that's shared between you and your friends. Will proc damage every ~5 seconds. You'll get an intellect buff when things die.",
    effects: [
      { // Int proc when something dies
        coefficient: 0.358468, 
        table: -1,
        duration: 30,
        ppm: 1,
        stat: "intellect",
      },
      { // Split with allies, lasts 30s
        coefficient: 0.35836, 
        table: -7,
        duration: 28,
        ppm: 2,
        stat: "crit",
      },
      {
        coefficient: 12.6904, 
        table: -9,
        ppm: 11, // This is roughly on a heartbeat system so you get a proc about every 5ish seconds.
        secondaries: ["crit", "versatility"]
      },

    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.intellect = runGenericPPMTrinket(data[0], itemLevel);
      bonus_stats.allyStats = runGenericPPMTrinket(data[1], itemLevel);
      bonus_stats.dps = runGenericFlatProc(data[2], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
  { 
    name: "Forged Gladiator's Insignia of Alacrity",
    description: "",
    effects: [
      {
        coefficient: 1.00266, 
        table: -1,
        duration: 20,
        ppm: 1.5,
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
    name: "Shadow-Binding Ritual Knife",
    description: "",
    effects: [
      {
        coefficient: 0.599917 * 0.95, 
        table: -1,
        uptime: 1,
        stat: "intellect",
      },
      {
        coefficient: -1.385658, 
        table: -7,
        duration: 10,
        ppm: 0.5,
        stat: "random",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats = runGenericRandomPPMTrinket(data[1], itemLevel);
      bonus_stats.intellect = processedValue(data[0], itemLevel);


      return bonus_stats;
    }
  },
  

]