import { convertPPMToUptime, processedValue, runGenericPPMTrinket, runGenericPPMTrinketHasted,
    getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket, runGenericFlatProc } from "Retail/Engine/EffectFormulas/EffectUtilities";
    
import { compileStats } from "General/Engine/ItemUtilities"
import Player from "General/Modules/Player/Player";

/*
import s204002 from "Images/Resources/PrimordialGems/s204002.jpg";
import s204029 from "Images/Resources/PrimordialGems/s204029.jpg";
import s204012 from "Images/Resources/PrimordialGems/s204012.jpg";
import s204000 from "Images/Resources/PrimordialGems/s204000.jpg";
*/

// Onyx Annulet is handled in two steps.
// One works out the best combination of gems.
// The other does one calculation run where it computes the bonus stats of that combo.



export const getCircletIcon = (id: number) => {
  const gem = circletGemData.filter(gem => gem.id == id)[0];
  if (gem) return "https://wow.zamimg.com/images/wow/icons/large/" + gem.icon + ".jpg";
  else console.error("Gem Icon not found");
}

  
/**
 * 
 * @param {} effectName 
 * @param {*} player 
 * @param {*} contentType 
 * @param {*} itemLevel 
 * @param {*} setStats 
 * @param {*} settings 
 * @returns the bonus_effects data from one specific set of gems.
 */
export const getCircletEffect = (gemNames: number[], itemLevel: number, additionalData: AdditionalData) => {
    let bonus_stats: Stats = {};
    let final_stats: Stats = {};
    let bonus_stats_all: { id: number; stats: Stats }[] = [];
    let temp = [];

    let gemsEquipped = gemNames.map((gemID: number) => {
        return circletGemData.find((effect) => effect.id === gemID);
    }).filter(gem => gem !== undefined);

    const gemIDs = gemsEquipped.map((gem: circletGemType) => gem.id);
    
    gemsEquipped.forEach(((gem: circletGemType) => {
        if (gem) {
          const gemStats = gem.runFunc(gem, gemIDs, itemLevel, additionalData);
          bonus_stats_all.push({id: gem.id, stats: gemStats});
          temp.push(gem.name + " " /*+ JSON.stringify(gemStats) */ + " Est HPS: " + getEstimatedHPS(gemStats, additionalData.player, additionalData.contentType) + (gemStats.dps > 0 ? " Est DPS: " + gemStats.dps : ""))
          //bonus_stats.hps += getEstimatedHPS(gemStats, player, contentType);
          //bonus_stats.dps += gemStats.dps || 0;


          bonus_stats = compileStats(bonus_stats, gemStats); // TODO
        }
        else {
          console.log("Gem not found" + gem);
        }

    }));

    if (gemIDs.includes(228639)) {

      const masteryMult = 1 + ((additionalData.setStats.mastery ?? 0) + (bonus_stats.mastery ?? 0)) / 700 / 100 * 0.833;

      // Multiply out the stats of our non-mastery gems. Remember to add our bonus stats to our set stats since the ring itself provides a lot of mastery.
      bonus_stats_all.forEach(output => {
        if (output.id !== 228639) {
          // This isn't the mastery gem, so we can multiply it out. 
          Object.keys(output.stats).forEach(stat => {
              final_stats[stat] = (final_stats[stat] ?? 0) +  output.stats[stat] * masteryMult;

          });
          
        }
        else {
          Object.keys(output.stats).forEach(stat => {
            final_stats[stat] = (final_stats[stat] ?? 0) +  output.stats[stat];

        });
        }
      });

      /*Object.keys(bonus_stats).forEach(stat => {

        if (stat !== "mastery") {
          bonus_stats[stat] = bonus_stats[stat] * masteryMult;
        }
      });*/
      return final_stats;
    }
    else {
      return bonus_stats; // We aren't using the mastery gem so just return our stats as they are.
    }
  
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
  const itemLevel = 684;
  titanBeltData.forEach(effect => {
    const bonus_stats = effect.runFunc(effect.effects, player, itemLevel, {contentType: "Raid"});
    const score = getEstimatedHPS(bonus_stats, player, "Raid");
    console.log("Effect: " + effect.name + " | Stats: " + JSON.stringify(bonus_stats) + " | HPS: " + score);
  })

}


export const titanBeltData = [// Regular crafted 1800 secondaries.
  {
    /* 1t smart heal
    */
    name: "Charged Touch",
    id: 1233262,
    effects: [
      { 
        coefficient: 67.39228,
        table: -9,
        ppm: 2,
        efficiency: 0.92, // Smart healing
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
        coefficient: 14.97605,
        table: -9,
        ppm: 1.5,
        ticks: 5,
        efficiency: 0.92, // Smart healing
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
        coefficient: 1.050392,
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
    id: 1236273,
    effects: [
      { 
        coefficient: 0.191125,
        table: -7,
        ppm: 1.5,
        duration: 20,
        uptime: 0.36,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      
        let bonus_stats: Stats = {};

        //console.log("Value: " + processedValue(data[0], itemLevel) + "uptime: " +convertPPMToUptime(data[0].ppm, data[0].duration));

        const uptime = data[0].uptime /* * player.getStatPerc("Haste") */ * 1.13;
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
        coefficient: 0.084812,
        table: -7,
      },
    ],
    runFunc: function(data: Array<effectData>, player: Player, itemLevel: number, additionalData: any) {
      
        let bonus_stats: Stats = {};

        const masteryValue = processedValue(data[0], itemLevel);

        console.log("Mastery Value: " + masteryValue);

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