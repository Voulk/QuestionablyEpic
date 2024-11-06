import CastModel from "General/Modules/Player/CastModel";
import Player from "General/Modules/Player/Player";
import { getCritPercentage } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";

type EffectData = {
  coefficient: number;
  table: number;
  cooldown: number;
  duration: number;
};

type TrinketRunFunc = (data: EffectData[], player: any, itemLevel: number, additionalData: any) => Record<string, number>;

type Effect = {
  name: string;
  effects: EffectData[];
  runFunc: TrinketRunFunc;
};


// Calculates an effects expected ppm given its ICD, proc chance, and our GCD or cast time.
export function getEffectPPM(procChance: number, internalCooldown: number, gcd: number): number {

  //return 60 / (internalCooldown + 1/procChance*gcd)
  return 60 / (internalCooldown + 2.5)

}

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

const getGenericTrinket = (data: EffectData, itemLevel: number): Stats => {
  const trinketValue = data.duration * data.value[itemLevel] * data.ppm / 60
  const statType = data.stat;
  const bonus_stats: Stats = {};
  bonus_stats[statType] = trinketValue;
  return bonus_stats;
}

const getGenericThroughputTrinket = (data: EffectData, itemLevel: number, player: player): Stats => {
  const trinketValue = data.value[itemLevel] * data.ppm / 60 * data.efficiency * getGenericHealingIncrease(player.spec) * (1 + getCritPercentage(player.activeStats, player.spec.replace(" Classic", "")));
  const statType = data.stat;
  const bonus_stats: Stats = {};
  bonus_stats[statType] = trinketValue;
  return bonus_stats;
}

const getGenericHealingIncrease = (spec: string): number => {
  if (spec.includes("Restoration Druid")) {
    return 1.25 * 1.04 * (0.15 * 31 / 180 + 1)
  }
  else if (spec.includes("Holy Paladin")) {
    return 1.1 * 1.06 * (0.2 * 20 / 120 + 1)
  }

  return 1;
}

const getGenericOnUseTrinket = (data: EffectData, itemLevel: number): Stats => {
  const bonus_stats: Stats = {};
  const trinketValue = data.duration * data.value[itemLevel] / data.cooldown;
  const statType = data.stat;
  bonus_stats[statType] = trinketValue;
  return bonus_stats;

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
  // Firelands
  {
    name: "Eye of Blazing Power",
    effects: [
      { // Confirmed no Paladin mastery scaling, wings appears to work, everything else up in the air. Appears to scale with something. Can hit pets.
        value: {378: (13984 + 16251) / 2, 391: (18373 + 15810) / 2}, 
        secondaries: ["crit"],
        efficiency: 0.7 * 0.9, // 20% overheal, 10% lost to pets.
        stat: "hps",
        ppm: getEffectPPM(0.1, 45, 1.5),
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      return getGenericThroughputTrinket(data[0], itemLevel, player);
      
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
        cooldown: 120,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};

      const redPerStack = data[0].value[itemLevel];

      // Time to 10 stacks
      const timeToMax = 11.5;
      
      // Spells cast during duration
      const totalSpellsCast = 14;
      const countAtMax = totalSpellsCast - 10;
      const maxManaSaving = redPerStack * data[0].maxStacks

      // Average cost reduction
      const averageCostReduction = (10 / totalSpellsCast * (maxManaSaving / 2)) + // Stacking reduction
                                    (countAtMax * (maxManaSaving)) / totalSpellsCast; // Max stacks

      // Convert to MP5
      bonus_stats.mp5 = averageCostReduction * totalSpellsCast / data[0].cooldown * 5;

      console.log("JAWS MP5", bonus_stats.mp5)
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

      console.log("FALL OF MORTALITY", JSON.stringify(getGenericTrinket(data[0], itemLevel)));
      return getGenericTrinket(data[0], itemLevel);
      
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

      bonus_stats = getGenericTrinket(data[0], itemLevel);
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
      return getGenericTrinket(data[0], itemLevel);
      
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
      return getGenericTrinket(data[0], itemLevel);
      
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
      return getGenericTrinket(data[0], itemLevel);
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

      return getGenericTrinket(data[0], itemLevel);
      
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

      return getGenericTrinket(data[0], itemLevel);
      
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

      return getGenericTrinket(data[0], itemLevel);
      
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

      return getGenericTrinket(data[0], itemLevel);
      
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


