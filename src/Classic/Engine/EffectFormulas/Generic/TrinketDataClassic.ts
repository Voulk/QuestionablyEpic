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

  return 60 / (internalCooldown + 1/procChance*gcd)

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
        ppm: getEffectPPM(0.1, 85, 1.5),
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


]

const dungeonTrinketData: Effect[] = [
  {
    name: "Tendrils of Burrowing Dark",
    effects: [
      { // 
        value: {346: 1710, 316: 1290}, 
        table: -1,
        ppm: getEffectPPM(0.1, 85, 1.5),
        stat: "spellpower",
        duration: 15,
      },
    ],
    runFunc: function(data, player, itemLevel, additionalData) {
      let bonus_stats: Stats = {};
      console.log("Setting up trinket");
      //bonus_stats.intellect = runGenericOnUseTrinket(data[0], itemLevel, additionalData.castModel);
      return getGenericTrinket(data[0], itemLevel);
      
      return bonus_stats;
    }
  },
]

// Any trinket that doesn't drop from a raid or dungeon.
const otherTrinketData: Effect[] = [

]


