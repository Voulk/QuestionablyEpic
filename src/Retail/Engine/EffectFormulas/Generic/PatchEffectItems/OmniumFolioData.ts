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
  const allSlotOne = omniumFolioData.filter((gem) => gem.slot === 1);
  const allSlotTwo = omniumFolioData.filter((gem) => gem.slot === 2);
  const allSlotThree = omniumFolioData.filter((gem) => gem.slot === 3);

  const combinations = []

  for(let i = 0; i < allSlotOne.length; i++){
    for(let j = 0; j < allSlotTwo.length; j++){
      for(let k = 0; k < allSlotThree.length; k++){
        combinations.push([allSlotOne[i].id, allSlotTwo[j].id, allSlotThree[k].id])
      }
    }
  }

  return combinations;
}

export const getCircletIcon = (id: number) => {
  const gem = omniumFolioData.filter(gem => gem.id == id)[0];
  if (gem) return "https://wow.zamimg.com/images/wow/icons/large/" + gem.icon + ".jpg";
  else console.error("Gem Icon not found");
}

export const getShortName = (id: number) => {
  const gem = omniumFolioData.filter(gem => gem.id == id)[0];
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
export const getFolioEffect = (gemNames: number[], itemLevel: number, additionalData: AdditionalData) => {
    let bonus_stats: Stats = {};
    let final_stats: Stats = {};
    let bonus_stats_all: { id: number; stats: Stats }[] = [];
    let temp = [];

    let gemsEquipped = gemNames.map((gemID: number) => {
        return omniumFolioData.find((effect) => effect.id === gemID);
    }).filter(gem => gem !== undefined);

    const gemIDs = gemsEquipped.map((gem: folioGemType) => gem.id);
    
    gemsEquipped.forEach(((gem: folioGemType) => {
        if (gem) {
          const gemStats = gem.runFunc(gem, gemIDs, itemLevel, additionalData);
          bonus_stats_all.push({id: gem.id, stats: gemStats});
          temp.push(gem.name + " " /*+ JSON.stringify(gemStats) */ + " Est HPS: " + getEstimatedHPS(gemStats, additionalData.player, additionalData.contentType) + (gemStats.dps > 0 ? " Est DPS: " + gemStats.dps : ""))

          bonus_stats = compileStats(bonus_stats, gemStats); // TODO
        }
        else {
          console.log("Gem not found" + gem);
        }

    }));

    return bonus_stats; // 

    

}

export const getGemImage = (id: number) => {
  const gem = omniumFolioData.filter(gem => gem.id === id)[0];

  try {
    return process.env.PUBLIC_URL + "/Images/CircletGems/" + gem.icon + ".jpg";
  }
  catch {
    console.log("Can't find gem icon: " + id);
    return null;
  }

}

// The circlet data itself is used in all of the formulas, so we'll provide it here so that it doesn't need to be passed around. 
const folioData = [
  {
    value: 0, // This is never used but means we can treat indexes as 1 based like the Spell data - should lead to fewer mistakes.
  },
  {
    coefficient: 0.771734, 
    table: -9,
  },
  {
    coefficient: 1.071749, 
    table: -8,
  },
  {
    coefficient: 0.198392, 
    table: -7
  },
  {
    coefficient: 0.100275,
    table: -1 
  },
  
]


type folioGemType = {
  name: string,
  id: number,
  icon: string,
  slot: number,
  shortName: string,
  effects: Array<any>,
  processedValue: Function,
  runFunc: Function,
}


export const omniumFolioData: Array<folioGemType> = [
  {
    /* Heal proc that hits 3 targets.
    */
    name: "Rune of Void-Touched Orbs",
    id: 1279596,
    icon: "inv_siren_isle_blessed_citrine_purple",
    slot: 1,
    shortName: "Void-Touched",
    effects: [
      { 
        value: 1960,
        coefficient: 0.28371,
        ppm: 4,
        efficiency: 0.58,
        targets: 3,
        secondaries: ['versatility', 'haste', 'crit'], // TODO: Check Crit
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
      
        let bonus_stats: Stats = {};
        const effect = data.effects[0];

        // Could possibly replace this with a call to effectUtilities but would need custom handling for the processed value type / formula.
        bonus_stats.hps = effect.ppm * effect.targets * effect.efficiency * additionalData.player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData, additionalData.player, itemLevel) / 60; 
  
        return bonus_stats;
    }
  },
  {
    name: "Rune of Critical Power",
    id: 1279609,
    icon: "spell_mage_overpowered",
    slot: 3,
    shortName: "Crit",
    effects: [
      { 
        value: 170,
        duration: 10,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(processedValue(folioData[1], 285) * data.value! / 100);
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        
        const critValue = data.processedValue(data.effects[0], gemData);
        const rppm = 1.13 * (gemData.includes(1279596) ? 6 : 9);
        const uptime = data.effects[0].duration * rppm / 60;
        bonus_stats.crit = critValue; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
        return bonus_stats;
    }
  },
  {
    /* DPS proc
    */
    name: "Undersea Overseer's Citrine",
    id: 228636,
    icon: "inv_siren_isle_stormcharged_citrine_green",
    slot: "Sea",
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
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
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
    slot: "Thunder",
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
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
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
    slot: "Thunder",
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
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
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
    slot: "Thunder",
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
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
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
    slot: "Wind",
    shortName: "AoE HoT",
    type: "Heal",
    effects: [
      { 
        value: 1634,
        //coefficient: 0.236522,
        //table: -9,
        targets: 5,
        ppm: 4,
        efficiency: 0.55,
        secondaries: ['versatility', 'haste'], // Cannot currently crit
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
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
    slot: "Wind",
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
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
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
    slot: "Wind",
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
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
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
    slot: "Wind",
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
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        

        const multiplier = 1.5;
        const gemPPM = 1/11 * data.effects[0].ppm * additionalData.player.getStatPerc("haste");

        omniumFolioData.forEach(circletGem => {
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
    slot: "Thunder",
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
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
  
        return bonus_stats;
    }
  },

]