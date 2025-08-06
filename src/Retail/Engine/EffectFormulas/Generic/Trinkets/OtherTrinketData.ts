import { convertPPMToUptime, runGenericFlatProc, getSetting, processedValue, runGenericPPMTrinket, forceGenericOnUseTrinket, runGenericOnUseTrinket, getDiminishedValue, buildIdolTrinket, runGenericRandomPPMTrinket } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { Player } from "General/Modules/Player/Player";
import { randPropPoints } from "Retail/Engine/RandPropPointsBylevel";
import { combat_ratings_mult_by_ilvl } from "Retail/Engine/CombatMultByLevel";

export const otherTrinketData = [
    { 
    name: "Chaotic Nethergate",
    description: "",
    effects: [
      { // Damage effect
        coefficient: 16.83968, 
        table: -9,
        ticks: 10,
        targets: 1,
        secondaries: ["crit", "versatility"], // Crit untested
        cooldown: 120,
        duration: 10,
      },
      { // Heal effect
        coefficient: 7.016621, 
        table: -9,
        efficiency: 0.6,
        targets: 8,
        ticks: 10,
        secondaries: ["crit", "versatility"], // Crit untested
        cooldown: 120,
        duration: 10,
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
    name: "Manaforged Aethercell",
    description: "", // Check if procs can overlap.
    effects: [
      {
        coefficient: 2.090432, 
        table: -7,
        duration: 15,
        ppm: 2,
        stat: "mastery",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.mastery = processedValue(data[0], itemLevel) / 2 * convertPPMToUptime(data[0].ppm!, data[0].duration!);

      return bonus_stats;
    }
  },
    { 
    name: "Twisted Mana Sprite",
    description: "",
    effects: [
      { // Heal effect
        coefficient: 8.559967, 
        table: -9,
        efficiency: 0.85,
        ticks: 5, // Heals per Sprite proc.
        secondaries: ["crit", "versatility"], // Crit untested
        ppm: 10,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);

      return bonus_stats;
    }
  },
    { 
    name: "Essence-Hunter's Eyeglass",
    description: "",
    effects: [
      {
        coefficient: 0.12025, 
        table: -7, // 
        stat: "crit",
        stacks: 2.6,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.crit = processedValue(data[0], itemLevel) * data[0].stacks!;

      return bonus_stats;
    }
  },

  // S2
  { 
    name: "Amorphous Relic",
    description: "Buffed 108%. They should have picked a higher number.",
    effects: [
      {
        coefficient: 0.951739, 
        table: -1,
        duration: 30,
        ppm: 0.5 / 2,
        stat: "intellect",
      },
      {
        coefficient: 2.670178, 
        table: -7,
        duration: 30,
        ppm: 0.5 / 2,
        stat: "haste",
      },

    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.intellect = processedValue(data[0], itemLevel) / 4;
      bonus_stats.haste = processedValue(data[1], itemLevel) / 4;

      return bonus_stats;
    }
  },
  { 
    name: "Suspicious Energy Drink",
    description: "Only procs off DPS spells.",
    effects: [
      {
        coefficient: 0.419337, 
        table: -9,
        duration: 10,
        ppm: 3,
        stat: "mastery",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.mastery = runGenericPPMTrinket(data[0], itemLevel);

      if (player.spec !== "Discipline Priest" && additionalData.contentType === "Raid") {
        bonus_stats.mastery = bonus_stats.mastery * 0.5; // DPS procs only
      }

      return bonus_stats;
    }
  },
  { // Settings for number of Signetbearers in party? This is party only, not raid wide.
    name: "Abyssal Volt",
    effects: [
      {
        coefficient: 0.746494, 
        table: -9,
        duration: 15,
        cooldown: 90,
        stat: "haste",
      },
      {
        coefficient: 0.222657, 
        table: -9,
        duration: 10,
        cooldown: 90,
        stat: "allyStats",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.haste = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
      if (additionalData.castModel.modelName.includes("Oracle")) bonus_stats.haste *= 0.85; // TODO: Swap to integrated ramp on-use.
      bonus_stats.allyStats = processedValue(data[1], itemLevel) * data[1].duration / data[1].cooldown;

      return bonus_stats;
    }
  },
  { // 1:30 cooldown mastery on-use. 
    name: "Funhouse Lens",
    description: "Very good if your spec has powerful 90s cooldowns like Preservation Evoker and Disc Priest. Fairly poor otherwise. Active bug so ranking might change.",
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

      if ((player.spec === "Holy Priest" || player.spec === "Restoration Druid" || player.spec === "Mistweaver Monk") && getSetting(additionalData.settings, "delayOnUseTrinkets")) {
        bonus_stats.haste = forceGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel, 120) / 2;
        bonus_stats.crit = forceGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel, 120) / 2;
      }
      else {
        bonus_stats.haste = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) / 2;
        if (additionalData.castModel.modelName.includes("Oracle")) bonus_stats.haste *= 0.8; // TODO: Swap to integrated ramp on-use.
        bonus_stats.crit = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel) / 2;
      }
      


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
    description: "High variance. Beware the low uptime. Requires a valuable spark to craft.",
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
      const chosenSecondaries = ["haste", "crit"] //getSetting(additionalData.settings, 'pheromoneSecreter')//.split("/")
      const secondaries = Math.round(randProp * secondaryBudget * 0.0001 * combatMult)

      chosenSecondaries.forEach(stat => {
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
        coefficient: 70.66128, 
        table: -8,
        ppm: 4,
        secondaries: ["crit", "versatility"], // Unhasted PPM for some reason.
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.dps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
      bonus_stats.hps = bonus_stats.dps * 0.9;

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
    name: "Insignia of Alacrity",
    description: "An accessible, on-budget stat stick.",
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
  { 
    name: "Arathi Minister's Receptacle",
    description: "This is really just an int / vers stat stick. The healing effect is flavor ONLY.",
    effects: [
      {
        coefficient: 0.701963, 
        table: -9,
        targets: 5,
        tickRate: 5,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      bonus_stats.hps = processedValue(data[0], itemLevel) * data[0].targets! / data[0].tickRate!;

      return bonus_stats;
    }
  },
  {
    name: "Hallowed Tome",
    description: "Assumes you have one ally with a Hallowed effect. Approx 20% weaker if you don't since you won't get the ally buff portion.",
    effects: [
      {
        coefficient: 0.665355, 
        table: -7,
        duration: 15,
        ppm: 4,
        stat: "mixed",
      },
      { // This does assume you have at least one ally who is wearing a Hallowed trinket. It could be a setting but feels a bit bloaty. 
        coefficient: 0.665355 * 20 * 0.01, // Formula is from blizzard. Not my fault! 
        table: -7,
        duration: 15,
        ppm: 4,
        stat: "allyStats",
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      let bonus_stats: Stats = {};

      const bestStat = player.getHighestStatWeight(additionalData.contentType)
      bonus_stats[bestStat] = runGenericPPMTrinket({...data[0], stat: bestStat}, itemLevel);

      // Technically if you have multiple devout allies your uptime would be slightly higher than this because you'll proc munch less
      // but you're not guaranteed to have that so we'll use this approach for now.
      bonus_stats.allyStats = runGenericPPMTrinket(data[1], itemLevel); 


      return bonus_stats;
    }
  },
  

]