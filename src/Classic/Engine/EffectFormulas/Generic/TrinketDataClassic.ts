import CastModel from "General/Modules/Player/CastModel";
import Player from "General/Modules/Player/Player";

import { getGenericStatEffect, getGenericThroughputEffect, getEffectPPM, getGenericHealingIncrease, getGenericOnUseTrinket } from "./ClassicEffectUtilities";


type TrinketRunFunc = (data: ClassicEffectData[], player: any, itemLevel: number, additionalData: any) => Record<string, number>;

type Effect = {
  name: string;
  effects: ClassicEffectData[];
  runFunc: TrinketRunFunc;
};



export function getAllTrinketDataClassic() {
  return raidTrinketData.concat(dungeonTrinketData, otherTrinketData)
}

// TODO: Write proper comments.
export function getTrinketEffectClassic(effectName: string, player: Player, itemLevel: number, playerSettings: PlayerSettings | {} = {}) {
  let bonus_stats = {};
  
  let additionalData = {}; // {contentType: contentType, settings: playerSettings, setStats: setStats, castModel: castModel, player: player};

  /* -------- Trinket Data holds a trinkets actual power values. Formulas here, data there. ------- */
  const trinketData: Effect[] = raidTrinketData.concat(dungeonTrinketData, otherTrinketData);
  let activeTrinket = trinketData.find((trinket) => trinket.name === effectName);


  if (activeTrinket !== undefined) {
    return activeTrinket.runFunc(activeTrinket.effects, player, itemLevel, additionalData);
  }
  else {
    // Trinket not found. Not necessarily an error since we won't be implementing str / agi type trinkets.
    return {};
  }

}







/*
Phase One: Bell of Enraging Resonance, Jar of Ancient Remedies, Fall of Mortality, Theralion's Mana, 
Phase Two: 
Phase Three: 
*/
const raidTrinketData: Effect[] = [
  {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             TrinketName                                        */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    */
    name: "TrinketName",
    effects: [
      { // 
        coefficient: 0, 
        table: -1,
        cooldown: 120,
        duration: 20,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats = {};

      //bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
      
      return bonus_stats;
    }
  },
  { // Dragon Soul
    name: "Seal of the Seven Signs",
    effects: [
      { // 
        value: {384: 2573, 397: 2904, 410: 3278}, 
        table: -1,
        ppm: getEffectPPM(0.15, 115, 1.5),
        stat: "haste",
        duration: 20,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      return getGenericStatEffect(data[0], itemLevel);
    }
  },
  {
    name: "Creche of the Final Dragon",
    effects: [ // DPS SPELLS ONLY
      { 
        value: {397: 2904, 410: 3278}, // Spirit effect
        stat: "crit",
        specMod: {"Discipline Priest Classic": 1, "Restoration Druid Classic": 0, "Holy Paladin Classic": 0, "Restoration Shaman Classic": 0, "Holy Priest Classic": 0},
        duration: 20,
        maxStacks: 10,
      },

    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      return bonus_stats;
    }
  },
  {
    name: "Will of Unbinding",
    effects: [ // DPS SPELLS ONLY
      { 
        value: {390: 78, 403: 88, 416: 99}, //
        stat: "intellect",
        specMod: {"Discipline Priest Classic": 1, "Restoration Druid Classic": 0, "Holy Paladin Classic": 0, "Restoration Shaman Classic": 0, "Holy Priest Classic": 0},
        duration: 20,
        maxStacks: 10,
      },

    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      bonus_stats.intellect = data[0].value[itemLevel] * data[0].maxStacks * data[0].specMod[player.spec] * 0.95;

      return bonus_stats;
    }
  },
  {
    name: "Insignia of the Corrupted Mind",
    effects: [ // DPS SPELLS ONLY
      { 
        value: {384: 2573, 397: 2904, 410: 3278}, // Spirit effect
        stat: "haste",
        specMod: {"Discipline Priest Classic": 1, "Restoration Druid Classic": 0, "Holy Paladin Classic": 0, "Restoration Shaman Classic": 0, "Holy Priest Classic": 0},
        duration: 20,
        ppm: getEffectPPM(0.15, 115, 1.5),
      },

    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      return bonus_stats;
    }
  },
  {
    name: "Heart of Unliving",
    effects: [ // Healing Spells
      { 
        value: {390: 78, 403: 88, 416: 99}, // Spirit effect
        stat: "spirit",
        duration: 20,
        maxStacks: 10,
      },

    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      // It's not pretty, but we'll assume you just prestack this before the fight but even if you don't, mana tends to be fine in the few seconds before you stack this.
      // Assumption: Doesn't proc off HoTs

      bonus_stats.spirit = data[0].value[itemLevel] * data[0].maxStacks;

      return bonus_stats;
    }
  },
  {
    name: "Windward Heart",
    effects: [ // Healing Spells
      { 
        value: {384: (9203+10696)/2, 397: (10388+12073)/2, 410: (11726+13627)/2},
        stat: "hps",
        secondaries: ["crit"],
        efficiency: 0.85 * 0.9, // 20% overheal, 10% lost to pets.
        ppm: 2.5, //getEffectPPM(0.1, 20, 1.5), // Crits only

      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      return getGenericThroughputEffect(data[0], itemLevel, player);

      return bonus_stats;
    }
  },


  // ------------------------------
  // Firelands
  {
    name: "Eye of Blazing Power",
    description: "Eye of Blazing Power competes well on HPS but the format is fairly unproductive.",
    effects: [
      { // Confirmed no Paladin mastery scaling, wings appears to work, everything else up in the air. Appears to scale with something. Can hit pets.
        value: {378: (13984 + 16251) / 2, 391: (18373 + 15810) / 2}, 
        secondaries: ["crit"],
        efficiency: 0.72 * 0.9, // 20% overheal, 10% lost to pets.
        stat: "hps",
        ppm: getEffectPPM(0.1, 45, 1.5),
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      return getGenericThroughputEffect(data[0], itemLevel, player);
      
     // return bonus_stats;
    }
  },
  {
    name: "Jaws of Defeat",
    effects: [
      { // 
        value: {378: 110, 391: 125}, 
        maxStacks: 10,
        stat: "mp5",
        expectedCasts: {"Restoration Druid Classic": 13.4, "Holy Paladin Classic": 10, "Discipline Priest Classic": 10, "Restoration Shaman Classic": 0, "Holy Priest Classic": 0},
        cooldown: 120,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      const redPerStack = data[0].value[itemLevel];

      // Time to 10 stacks
      const timeToMax = 11.5;
      
      // Spells cast during duration
      const totalSpellsCast = data[0].expectedCasts[player.spec];
      const countAtMax = Math.max(0, totalSpellsCast - 10);
      const maxManaSaving = redPerStack * data[0].maxStacks

      // Average cost reduction
      const averageCostReduction = (10 / totalSpellsCast * (maxManaSaving / 2)) + // Stacking reduction
                                    (countAtMax * (maxManaSaving)) / totalSpellsCast; // Max stacks

      // Convert to MP5
      bonus_stats.mp5 = averageCostReduction * totalSpellsCast / data[0].cooldown * 5;

      return bonus_stats;
      
     // return bonus_stats;
    }
  },
  {
    name: "Necromantic Focus", // DPS spells only
    effects: [
      { // 
        value: {378: 39, 391: 44}, 
        stat: "mastery",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      return bonus_stats;
      
     // return bonus_stats;
    }
  },
  {
    name: "Fiery Quintessence", 
    effects: [
      { // 
        value: {378: 1149}, // 391 version not available
        stat: "intellect",
        duration: 25,
        cooldown: 90,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      bonus_stats = getGenericOnUseTrinket(data[0], itemLevel);

      return bonus_stats;
      
    }
  },
  // Tier 11
  {
    name: "Fall of Mortality",
    effects: [
      { // 
        value: {372: 2178, 359: 1926}, 
        stat: "spirit",
        ppm: getEffectPPM(0.1, 75, 1.5),
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      //bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
      //bonus_stats.spirit = data[0].duration * data[0].value[itemLevel] * data[0].ppm / 60

      return getGenericStatEffect(data[0], itemLevel);
      
    }
  },
  {
    name: "Shard of Woe",
    effects: [
      { 
        value: {379: 205}, // TODO: Check it's not 205 for Nat / Holy spells.
      },
      {
        value: {379: 1935},
        duration: 10,
        cooldown: 60,
      }
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      const cpm = player.spec === "Holy Paladin Classic" ? 25.4 : 31.8; // TODO: Pull from castmodel.
      bonus_stats.mp5 = data[0].value[itemLevel] * cpm / 12;
      bonus_stats.haste = data[1].value[itemLevel] * data[1].duration / data[1].cooldown;
      return bonus_stats;
    }
  },
  {
    name: "Jar of Ancient Remedies",
    effects: [
      { 
        value: {359: 103, 372: 116}, // Spirit effect
        stacks: 5,
        uptime: 0.75,
      },
      {
        value: {359: 6420, 372: 7260}, // Instant mana effect
        cooldown: 120,
      }
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      bonus_stats.mp5 = data[1].value[itemLevel] / data[1].cooldown * 5;
      bonus_stats.spirit = data[0].value[itemLevel] * data[0].stacks * data[0].uptime;
      return bonus_stats;
    }
  },
  {
    name: "Theralion's Mirror",
    effects: [
      { 
        value: {359: 1926, 372: 2178}, // Spirit effect
        stat: "mastery",
        ppm: getEffectPPM(0.1, 100, 1.5),
        specMod: {"Discipline Priest Classic": 1, "Restoration Druid Classic": 0, "Holy Paladin Classic": 0, "Restoration Shaman Classic": 0, "Holy Priest Classic": 0},
        duration: 20,
      },

    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      bonus_stats = getGenericStatEffect(data[0], itemLevel);
      bonus_stats.mastery *= data[0].specMod[player.spec];

      return bonus_stats;
    }
  },


]

/**
 * DUNGEON TRINKETS
 */
const dungeonTrinketData: Effect[] = [
  {
    name: "Foul Gift of the Demon Lord",
    effects: [
      { // 
        value: {378: 1710}, 
        table: -1,
        ppm: getEffectPPM(0.15, 50, 1.5),
        stat: "mastery",
        duration: 20,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      return getGenericStatEffect(data[0], itemLevel);
    }
  },
  {
    name: "Tendrils of Burrowing Dark",
    effects: [
      { // 
        value: {346: 1710, 316: 1290}, 
        table: -1,
        ppm: getEffectPPM(0.1, 75, 1.5),
        stat: "spellpower",
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      return getGenericStatEffect(data[0], itemLevel);
      
    }
  },
  {
    name: "Tear of Blood",
    effects: [
      { // 
        value: {316: 1290, 346: 1710}, 
        ppm: getEffectPPM(0.35, 75 + 3, 1.5),
        stat: "spirit",
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      return getGenericStatEffect(data[0], itemLevel);
      
    }
  },
  {
    name: "Sea Star",
    effects: [
      { // 
        value: {308: 765, 346: 1425}, 
        cooldown: 120,
        stat: "spellpower",
        duration: 20,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      return getGenericOnUseTrinket(data[0], itemLevel);
      
    }
  },
  {
    name: "Rainsong",
    effects: [
      { // 
        value: {316: 1290, 346: 1710}, 
        ppm: getEffectPPM(0.1, 75, 1.5),
        stat: "haste",
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      return getGenericStatEffect(data[0], itemLevel);
    }
  },
  {
    name: "Witching Hourglass",
    effects: [
      { // 
        value: {308: 918, 346: 1710}, 
        ppm: getEffectPPM(0.1, 75, 1.5),
        stat: "haste", // Change to ProcIntellect
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      return getGenericStatEffect(data[0], itemLevel);
      
    }
  },
  {
    name: "Blood of Isiset",
    effects: [
      { // 
        value: {333: 1512, 346: 1710}, 
        ppm: getEffectPPM(0.1, 100, 1.5),
        stat: "spirit", // Change to ProcIntellect
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      return getGenericStatEffect(data[0], itemLevel);
      
    }
  },
  {
    name: "Gale of Shadows",
    effects: [
      { // 
        value: {333: 15, 346: 17}, 
        stacks: 20,
        stat: "spellpower", 
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      bonus_stats["spellpower"] = data[0].value[itemLevel] * data[0].stacks;
      return bonus_stats;
      
    }
  },

]

// Any trinket that doesn't drop from a raid or dungeon.
const otherTrinketData: Effect[] = [
  {
    name: "Core of Ripeness",
    effects: [
      { // 
        value: {359: 1926}, 
        table: -1,
        cooldown: 120,
        stat: "spirit",
        duration: 20,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      return getGenericOnUseTrinket(data[0], itemLevel);

    }
  },
  {
    name: "Mandala of Stirring Patterns",
    effects: [
      { // 
        value: {359: 1926}, 
        ppm: getEffectPPM(0.1, 50+5, 1.5),
        stat: "spellpower", // Change to ProcIntellect
        duration: 10,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      return getGenericStatEffect(data[0], itemLevel);
      
    }
  },
  {
    name: "Talisman of Sinister Order",
    effects: [
      { // 
        value: {325: 918}, 
        ppm: getEffectPPM(0.1, 100, 1.5),
        stat: "mastery", // Change to ProcIntellect
        duration: 20,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      return getGenericStatEffect(data[0], itemLevel);
      
    }
  },
  {
    name: "Darkmoon Card: Tsunami",
    effects: [
      { // 
        value: {359: 80}, 
        stat: "spirit",

      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      bonus_stats.spirit = data[0].value[itemLevel] * 5;

      return bonus_stats;

    }
  },
  {
    name: "Tyrande's Favorite Doll",
    effects: [
      { // 
        value: {359: 4200}, 
        stat: "mp5",
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      bonus_stats.mp5 = data[0].value[itemLevel] / 12;
      return bonus_stats;
    }
  },
  {
    name: "Vibrant Alchemist Stone",
    effects: [
      { 
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      const manaPotion = 22000; // This is a sleepy potion.
      bonus_stats.mp5 = manaPotion * 0.4 / 360 * 5;
      return bonus_stats;
    }
  },

]


