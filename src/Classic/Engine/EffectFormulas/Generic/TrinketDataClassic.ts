import CastModel from "General/Modules/Player/CastModel";
import Player from "General/Modules/Player/Player";

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
      return getGenericTrinket(data[0], itemLevel);
      
     // return bonus_stats;
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
      const cpm = 32; // TODO: Pull from castmodel.
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


