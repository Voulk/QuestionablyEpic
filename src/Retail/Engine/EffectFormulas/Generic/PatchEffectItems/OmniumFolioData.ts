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
  const allSlotFour = omniumFolioData.filter((gem) => gem.slot === 4);
  const allSlotFive = omniumFolioData.filter((gem) => gem.slot === 5);

  const combinations = []

  for(let i = 0; i < allSlotOne.length; i++){
    for(let j = 0; j < allSlotFour.length; j++){
      for(let k = 0; k < allSlotFive.length; k++){
        combinations.push([allSlotOne[i].id, allSlotFour[j].id, allSlotFive[k].id])
      }
    }
  }

  return combinations;
}

export const getFolioIcon = (id: number) => {
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
    scalingClass: -9,
  },
  {
    coefficient: 1.071749, 
    scalingClass: -8,
  },
  {
    coefficient: 0.198392, 
    scalingClass: -7
  },
  {
    coefficient: 0.100275,
    scalingClass: -1 
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
    icon: "inv_12_dh_void_ability_soulfragments",
    slot: 1,
    shortName: "Void-Touched",
    effects: [
      { 
        value: 977,
        ppm: 6,
        efficiency: 0.8,
        targets: 1,
        secondaries: ['versatility', 'crit'], // TODO: Check Crit
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(folioData[1], 285));
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
      
        let bonus_stats: Stats = {};
        const effect = data.effects[0];

        // Could possibly replace this with a call to effectUtilities but would need custom handling for the processed value type / formula.
        bonus_stats.hps = effect.ppm * effect.efficiency * additionalData.player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData) / 60; 
  
        return bonus_stats;
    }
  },
    {
    /* 
    */
    name: "Rune of Unleashed Fire",
    id: 1279599,
    icon: "inv_summerfest_firespirit",
    slot: 1,
    shortName: "Unleashed Fire",
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
    processedValue: function(data: effectData, gemData: Array<any>) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(folioData[1], 285));
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
      
        let bonus_stats: Stats = {};
        const effect = data.effects[0];

        // Could possibly replace this with a call to effectUtilities but would need custom handling for the processed value type / formula.
        bonus_stats.hps = 0; 
  
        return bonus_stats;
    }
  },
  {
    name: "Rune of Critical Power",
    id: 1279609,
    icon: "spell_mage_overpowered",
    slot: 4,
    shortName: "Crit",
    effects: [
      { 
        value: 170,
        duration: 10,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(processedValue(folioData[3], 285) * data.value! / 100);
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        
        const critValue = data.processedValue(data.effects[0], gemData);
        const rppm = (gemData.includes(1279596) ? 6 : 9 * 1.13);
        bonus_stats.crit = critValue * rppm * data.effects[0].duration / 60; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
        return bonus_stats;
    }
  },
    {
    name: "Rune of Burning Haste",
    id: 1287774,
    icon: "spell_fire_burningspeed",
    slot: 4,
    shortName: "Haste",
    effects: [
      { 
        value: 170,
        duration: 10,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(processedValue(folioData[3], 285) * data.value! / 100);
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        
        const hasteValue = data.processedValue(data.effects[0], gemData);
        const rppm = (gemData.includes(1279596) ? 6 : 9 * 1.13);
        const uptime = data.effects[0].duration * rppm / 60;
        bonus_stats.haste = hasteValue * rppm * data.effects[0].duration / 60; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
        return bonus_stats;
    }
  },
      {
    name: "Rune of Masterful Cunning",
    id: 1287771,
    icon: "ability_hunter_fervor",
    slot: 4,
    shortName: "Mastery",
    effects: [
      { 
        value: 170,
        duration: 10,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(processedValue(folioData[3], 285) * data.value! / 100);
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        
        const masteryValue = data.processedValue(data.effects[0], gemData);
        const rppm = (gemData.includes(1279596) ? 6 : 9 * 1.13);
        const uptime = data.effects[0].duration * rppm / 60;
        bonus_stats.mastery = masteryValue * rppm * data.effects[0].duration / 60; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
        return bonus_stats;
    }
  },
        {
    name: "Rune of the Versatile Warrior",
    id: 1279613,
    icon: "ability_warrior_stalwartprotector",
    slot: 4,
    shortName: "Versatility",
    effects: [
      { 
        value: 170,
        duration: 10,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(processedValue(folioData[3], 285) * data.value! / 100);
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};
        
        const versatilityValue = data.processedValue(data.effects[0], gemData);
        const rppm = (gemData.includes(1279596) ? 6 : 9 * 1.13);
        bonus_stats.versatility = versatilityValue * rppm * data.effects[0].duration / 60; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
        return bonus_stats;
    }
  },
  {
    /* 
    */
    name: "Rune of Overload",
    id: 1279614,
    icon: "ability_siege_engineer_overload",
    slot: 5,
    shortName: "Overload",
    effects: [
      { 
        value: 0,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return 0;
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};

        return bonus_stats;
    }
  },
    {
    /* 
    */
    name: "Rune of Residual Energy",
    id: 1279615,
    icon: "inv_112_raidtrinkets_etherealenergystoragesphere_purple",
    slot: 5,
    shortName: "Residual Energy",
    effects: [
      { 
        value: 0,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return 0;
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};

        return bonus_stats;
    }
  },
      {
    /* 
    */
    name: "Rune of Echoes",
    id: 1279616,
    icon: "spell_rogue_shadow_reflection",
    slot: 5,
    shortName: "Echoes",
    effects: [
      { 
        value: 0,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return 0;
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats: Stats = {};

        return bonus_stats;
    }
  },

]