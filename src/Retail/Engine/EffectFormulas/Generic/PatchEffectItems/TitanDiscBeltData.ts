import { convertPPMToUptime, processedValue, runGenericPPMTrinket, runGenericPPMTrinketHasted,
    getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket, runGenericFlatProc } from "Retail/Engine/EffectFormulas/EffectUtilities";
    
import { compileStats } from "General/Engine/ItemUtilities"
import Player from "General/Modules/Player/Player";


export const getTitanBeltEffect = (effectID: number[], player: Player, itemLevel: number, additionalData: AdditionalData) => {
  if (effectID.length === 0) {
    console.error("No effects provided for Titan Belt Effect");
    return {};
  }

  const effect = titanBeltData.find(effect => effect.id === effectID[0]);

  if (!effect) return {};

  const bonus_stats = effect.runFunc(effect.effects, player, itemLevel, additionalData);

  return bonus_stats;
}

/* ------------ Converts a bonus_stats dictionary to a singular estimated HPS number. ----------- */
function getEstimatedHPS(bonus_stats, player, contentType) {
  let estHPS = 0;
  for (const [key, value] of Object.entries(bonus_stats)) {
    if (["haste", "mastery", "crit", "versatility", "leech"].includes(key)) {
      estHPS += ((value * player.getStatWeight(contentType, key)) / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "intellect") {
      estHPS += (value / player.activeStats.intellect) * player.getHPS(contentType);
    } 
    else if (key === "mana") {
      estHPS += value * player.getSpecialQuery("OneManaHealing", contentType)
    }
    else if (key === "hps") {
      estHPS += value;
    }
  }
  return Math.round(100 * estHPS) / 100;
}

export const printBeltData = (player: Player) => {
  const itemLevel = 691;
  titanBeltData.forEach(effect => {
    const bonus_stats = effect.runFunc(effect.effects, player, itemLevel, {contentType: "Raid"});
    const score = getEstimatedHPS(bonus_stats, player, "Raid");
    console.log("Effect: " + effect.name + " | Stats: " + JSON.stringify(bonus_stats) + " | HPS: " + score);
  })

}

export const getTitanDiscName = (id: number) => {
  return titanBeltData.find(effect => effect.id === id)?.name || "Unknown Effect";
}


export const titanBeltData = [// Regular crafted 1800 secondaries.
  {
    /* 1t smart heal
    */
    name: "Charged Touch",
    id: 1233262,
    effects: [
      { 
        coefficient: 77.501129, //67.39228,
        table: -9,
        ppm: 2,
        efficiency: {"Raid": 0.88, "Dungeon": 0.7}, // Smart healing
        secondaries: ['versatility', 'haste', 'crit'], // TODO: Check Crit
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      
        let bonus_stats: Stats = {};


        bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
  
        return bonus_stats;
    }
  },
  {
    /* 1t smart heal
    */
    name: "Cauterizing Bolts",
    id: 1236122,
    effects: [
      { 
        coefficient: 19.755123, //14.97605,
        table: -9,
        ppm: 1.5,
        ticks: 6,
        efficiency: {"Raid": 0.88, "Dungeon": 0.7}, // Smart healing
        secondaries: ['versatility', 'haste', 'crit'], // TODO: Check Crit
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      
        let bonus_stats: Stats = {};


        bonus_stats.hps = runGenericFlatProc(data[0], itemLevel, player, additionalData.contentType);
  
        return bonus_stats;
    }
  },
  {
    /* Spark Burst
    */
    name: "Spark Burst",
    id: 1236273,
    effects: [
      { 
        coefficient: 1.522123, //1.050392,
        table: -7,
        ppm: 1.5,
        duration: 20,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      
        let bonus_stats: Stats = {};

        

        bonus_stats.haste = runGenericPPMTrinket(data[0], itemLevel, player, additionalData.contentType);
  
        return bonus_stats;
    }
  },
    {
    /* Critical Chain
    */
    name: "Critical Chain",
    id: 1236272,
    effects: [
      { 
        coefficient: 0.273946,
        table: -7,
        ppm: 1.5,
        duration: 20,
        uptime: 0.36,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      
        let bonus_stats: Stats = {};

        //console.log("Value: " + processedValue(data[0], itemLevel) + "uptime: " +convertPPMToUptime(data[0].ppm, data[0].duration));

        const uptime = data[0].uptime * 1.13;
        const averageCritWhileActive = processedValue(data[0], itemLevel) * 5.5;
       
        bonus_stats.crit = averageCritWhileActive * uptime;
  
        return bonus_stats;
    }
  },
      {
    /* Electric Current
    */
    name: "Electric Current",
    id: 1236961,
    effects: [
      { 
        coefficient: 0.091581, //0.084812,
        table: -7,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      
        let bonus_stats: Stats = {};

        const masteryValue = processedValue(data[0], itemLevel);

        bonus_stats.mastery = masteryValue * 6.5;
  
        return bonus_stats;
    }
  },
  {
    /* Static Charge
    */
    name: "Static Charge",
    id: 1236275,
    effects: [
      { 
        coefficient: 0.100341,
        table: -7,
        ppm: 1.5,
        duration: 30,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      
        let bonus_stats: Stats = {};

        const uptime = Math.min(0.5, (1.5 / player.getStatPerc("Haste") * 20) / 60);
        const averageVersWhileActive = processedValue(data[0], itemLevel) * 10.5;

        bonus_stats.versatility = averageVersWhileActive * uptime;
  
        return bonus_stats;
    }
  },
  

]