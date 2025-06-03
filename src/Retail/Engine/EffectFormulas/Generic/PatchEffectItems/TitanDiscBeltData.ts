import { convertPPMToUptime, processedValue, runGenericPPMTrinket, 
    getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket, runGenericFlatProc } from "Retail/Engine/EffectFormulas/EffectUtilities";
    
import { compileStats, getEstimatedHPS } from "General/Engine/ItemUtilities"
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



export const titanBeltData = [
  {
    /* Heal proc that hits 3 targets.
    */
    name: "Charged Touch",
    id: 1233262,
    effects: [
      { 
        coefficient: 3.981774,
        table: -7,
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
  

]