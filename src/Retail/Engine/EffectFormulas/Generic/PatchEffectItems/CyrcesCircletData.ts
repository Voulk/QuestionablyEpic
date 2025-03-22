import { convertPPMToUptime, processedValue, runGenericPPMTrinket, 
    getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket, runGenericFlatProc } from "Retail/Engine/EffectFormulas/EffectUtilities";
    
import { compileStats, getEstimatedHPS } from "General/Engine/ItemUtilities"

// Relevant Primordial Gems
import s204020 from "Images/Resources/PrimordialGems/s204020.jpg";
import s204010 from "Images/Resources/PrimordialGems/s204010.jpg";
import s204013 from "Images/Resources/PrimordialGems/s204013.jpg";
import s204027 from "Images/Resources/PrimordialGems/s204027.jpg";
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


export const getAllCombos = () => {
  const allWind = circletGemData.filter((gem) => gem.school === "Wind");
  const allSea = circletGemData.filter((gem) => gem.school === "Sea");
  const allThunder = circletGemData.filter((gem) => gem.school === "Thunder");

  const combinations = []

  for(let i = 0; i < allWind.length; i++){
    for(let j = 0; j < allSea.length; j++){
      for(let k = 0; k < allThunder.length; k++){
        combinations.push([allWind[i].id, allSea[j].id, allThunder[k].id])
      }
    }
  }

  return combinations;
}

export const getCircletIcon = (id: number) => {
  const gem = circletGemData.filter(gem => gem.id == id)[0];
  if (gem) return "https://wow.zamimg.com/images/wow/icons/large/" + gem.icon + ".jpg";
  else console.error("Gem Icon not found");
}

export const getShortName = (id: number) => {
  const gem = circletGemData.filter(gem => gem.id == id)[0];
  if (gem) return gem.shortName;
  else "Not Found";
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

export const getGemImage = (id: number) => {
  const gem = circletGemData.filter(gem => gem.id === id)[0];

  try {
    return process.env.PUBLIC_URL + "/Images/CircletGems/" + gem.icon + ".jpg";
  }
  catch {
    console.log("Can't find gem icon: " + id);
    return null;
  }

}

// The circlet data itself is used in all of the formulas, so we'll provide it here so that it doesn't need to be passed around. 
const circletData = [
  {
    value: 0, // This is never used but means we can treat indexes as 1 based like the Spell data - should lead to fewer mistakes.
  },
  {
    coefficient: 1.560262, 
    table: -9,
  },
  {
    coefficient: 2.008889, 
    table: -72, // Uses Jewelry table
  },
  {
    value: 10779, 
  },
  {
    value: 0, 
  },
  {
    value: 5663, 
  }
  
]


type circletGemType = {
  name: string,
  id: number,
  icon: string,
  school: string,
  shortName: string,
  type: string,
  effects: Array<any>,
  processedValue: Function,
  runFunc: Function,
}


export const circletGemData: Array<circletGemType> = [
  {
    /* Heal proc that hits 3 targets.
    */
    name: "Mariner's Hallowed Citrine",
    id: 228644,
    icon: "inv_siren_isle_blessed_citrine_purple",
    school: "Sea",
    shortName: "3T Heal",
    type: "Heal",
    effects: [
      { 
        value: 1960,
        coefficient: 0.28371,
        ppm: 4,
        efficiency: 0.55,
        targets: 3,
        secondaries: ['versatility', 'haste', 'crit'], // TODO: Check Crit
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
      
        let bonus_stats: Stats = {};
        const effect = data.effects[0];

        // Could possibly replace this with a call to effectUtilities but would need custom handling for the processed value type / formula.
        bonus_stats.hps = effect.ppm * effect.targets * effect.efficiency * additionalData.player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData, additionalData.player, itemLevel) / 60; 
  
        return bonus_stats;
    }
  },
  {
    /* Mastery
    */
    name: "Fathomdweller's Runed Citrine",
    id: 228639,
    icon: "inv_siren_isle_searuned_citrine_blue",
    school: "Sea",
    shortName: "Mastery",
    type: "Stats",
    effects: [
      { 
        value: 80,
        //coefficient: 0.01491,
        //table: -7,
        ppm: 4,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(processedValue(circletData[2], circletLevel) / circletData[3].value * data.value / 100 * circletData[5].value / 3);
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        
        const masteryValue = data.processedValue(data.effects[0], gemData, additionalData.player, itemLevel);
        bonus_stats.mastery = masteryValue; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
        return bonus_stats;
    }
  },
  {
    /* DPS proc
    */
    name: "Undersea Overseer's Citrine",
    id: 228636,
    icon: "inv_siren_isle_stormcharged_citrine_green",
    school: "Sea",
    shortName: "3T DPS",
    type: "DPS",
    effects: [
      { 
        value: 1306,
        //coefficient: 0.18911,
        //table: -9,
        ppm: 4,
        targets: 3,
        secondaries: ['versatility', 'haste'],
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        const effect = data.effects[0];
        bonus_stats.dps = effect.ppm * effect.targets * additionalData.player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData, additionalData.player, itemLevel) / 60; 
  
        return bonus_stats;
    }
  },
  {
    /* Shield
    */
    name: "Storm Sewer's Citrine",
    id: 228642,
    icon: "inv_siren_isle_blessed_citrine_blue",
    school: "Thunder",
    shortName: "Shield",
    type: "Absorb",
    effects: [
      { 
        value: 2941,
        //coefficient: 0.42571,
        //table: -9,
        ppm: 4,
        efficiency: 0.92,
        secondaries: ['haste', 'versatility'],
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        const effect = data.effects[0];

        bonus_stats.hps = effect.ppm * effect.efficiency * additionalData.player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData, additionalData.player, itemLevel) / 60
  
        return bonus_stats;
    }
  },
  {

    name: "Thunderlord's Crackling Citrine",
    id: 228634,
    icon: "inv_siren_isle_stormcharged_citrine_blue",
    shortName: "ST Zap",
    school: "Thunder",
    type: "DPS",
    effects: [
      { 
        value: 1961, // 1961
        //coefficient: 0.283813,
        //table: -9,
        ppm: 4,
        targets: 1,
        secondaries: ['versatility', 'haste'],
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        const effect = data.effects[0];

        bonus_stats.dps = effect.ppm * effect.targets * additionalData.player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData, additionalData.player, itemLevel) / 60; 
  
        return bonus_stats;
    }
  },
  {
    /* All Stats
    */
    name: "Stormbringer's Runed Citrine",
    id: 228638,
    icon: "inv_siren_isle_searuned_citrine_red",
    school: "Thunder",
    shortName: "All Sec",
    type: "Stats",
    effects: [
      { 
        value: 25,
        //coefficient: 49.23086,
        //table: -9,
        ppm: 4,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.round(processedValue(circletData[2], circletLevel) / circletData[3].value * data.value / 100 * circletData[5].value / 3);
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};

        const allStats = data.processedValue(data.effects[0], gemData, additionalData.player, itemLevel);

        bonus_stats.crit = allStats;
        bonus_stats.haste = allStats;
        bonus_stats.mastery = allStats;
        bonus_stats.versatility = allStats;
  
        return bonus_stats;
    }
  },
  {
    /* AoE ticking heal
    */
    name: "Old Salt's Bardic Citrine",
    id: 228643,
    icon: "inv_siren_isle_blessed_citrine_red",
    school: "Wind",
    shortName: "AoE HoT",
    type: "Heal",
    effects: [
      { 
        value: 1634,
        //coefficient: 0.236522,
        //table: -9,
        targets: 5,
        ppm: 4,
        efficiency: 0.5,
        secondaries: ['versatility', 'haste'], // Cannot currently crit
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        const effect = data.effects[0];

        // Could possibly replace this with a call to effectUtilities but would need custom handling for the processed value type / formula.
        bonus_stats.hps = effect.ppm * effect.targets * effect.efficiency * additionalData.player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData, additionalData.player, itemLevel) / 60; 
  
        return bonus_stats;
    }
  },
  {
    /* Highest Secondary
    */
    name: "Windsinger's Runed Citrine",
    id: 228640,
    icon: "inv_siren_isle_searuned_citrine_pink",
    school: "Wind",
    shortName: "Secondary",
    type: "Stats",
    effects: [
      { 
        value: 100,
        //coefficient: 49.23086,
        //table: -9,
        ppm: 4,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(processedValue(circletData[2], circletLevel) / circletData[3].value * data.value / 100 * circletData[5].value / 3);
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        const bestStat = getHighestStat(additionalData.setStats || []);//player.getHighestStatWeight(additionalData.contentType);
        bonus_stats[bestStat] = data.processedValue(data.effects[0], gemData, additionalData.player, itemLevel); //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
        return bonus_stats;
    }
  },
  {
    /* 
    */
    name: "Squall Sailor's Citrine",
    id: 228635,
    icon: "inv_siren_isle_stormcharged_citrine_turquoise",
    school: "Wind",
    shortName: "AoE Dmg",
    type: "DPS",
    effects: [
      { 
        value: 1089,
        //coefficient: 49.23086,
        //table: -9,
        ppm: 4,
        secondaries: ['versatility', 'haste'],
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        const effect = data.effects[0];

        bonus_stats.dps = effect.ppm * effect.targets * additionalData.player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData, additionalData.player, itemLevel) / 60; 

  
        return bonus_stats;
    }
  },
  {
    /* 
    */
    name: "Legendary Skipper's Citrine",
    id: 228646,
    icon: "inv_siren_isle_singing_citrine_prismatic",
    school: "Wind",
    shortName: "Random",
    type: "Misc",
    effects: [
      { 
        value: 25,
        //coefficient: 49.23086,
        //table: -9,
        ppm: 4,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return 0
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        

        const multiplier = 1.5;
        const gemPPM = 1/11 * data.effects[0].ppm * additionalData.player.getStatPerc("haste");

        circletGemData.forEach(circletGem => {
          // For each circlet gem, add a proc of it to our bonus stats.
          // Stat procs are boosted by 30% for some reason.
          // Do not include the gem itself or we will loop infinitely (and be wrong, infinitely!)
          if (circletGem.id !== data.id) {
            if (circletGem.type === "Stats") {
              const local_stats = circletGem.runFunc(circletGem, gemData, itemLevel, additionalData);
              const uptime = gemPPM * 15 / 60;

              Object.keys(local_stats).forEach(stat => {
                  bonus_stats[stat] = (bonus_stats[stat] || 0) + local_stats[stat] * uptime * multiplier * 1.3;
              });
              
            }
            /*else if (circletGem.type === "Support") {
              const local_stats = circletGem.processedValue(circletGem.effects[0], gemData, additionalData.player, itemLevel)
              const targetCount = 4;
              
              bonus_stats['allyStats'] = (bonus_stats['allyStats'] || 0) + local_stats * gemPPM * 15 / 60 * multiplier * targetCount * 4;
            }*/
            else if (circletGem.type === "Heal") {
              const local_stats = circletGem.runFunc(circletGem, gemData, itemLevel, additionalData);

              bonus_stats.hps = (bonus_stats.hps || 0) + local_stats.hps * (gemPPM / circletGem.effects[0].ppm) * multiplier;
            }

          }
        })

        //bonus_stats.hps = 10; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
        return bonus_stats;
    }
  },
  {
    /* Roaring War-Queen's Citrine
    */
    name: "Roaring War-Queen's Citrine",
    id: 228648,
    icon: "inv_siren_isle_singing_citrine_yellow",
    school: "Thunder",
    shortName: "Support",
    type: "Support",
    effects: [
      { 
        value: 25,
        //coefficient: 49.23086,
        //table: -9,
        ppm: 4,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.round(processedValue(circletData[2], circletLevel) / circletData[3].value * data.value / 100 * circletData[5].value / 3);
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
  
        return bonus_stats;
    }
  },

]