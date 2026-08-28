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
  if (gem) return gem.icon;
  else console.error("Gem Icon not found");
}

// The Folio has five rune slots. Slots 2 and 3 currently have a single option each, so only 1, 4 and 5 are
// configurable. Each setting accepts "Automatic" (keep the engine's own pick) or a rune's shortName.
export const FOLIO_SLOT_SETTINGS: { [slot: number]: string } = { 1: "folioSlot1", 4: "folioSlot4", 5: "folioSlot5" };

// The rune the engine falls back to when a slot is left on Automatic and there is no stat-weight rule for it.
const FOLIO_AUTO_DEFAULTS: { [slot: number]: number } = { 1: 1279599, 2: 1279603, 3: 1287555, 5: 1279614 };

// Slot 4 is the pure secondary stat slot, so Automatic follows the player's best stat.
const FOLIO_STAT_RUNES: { [stat: string]: number } = {
  haste: 1287774,
  crit: 1279609,
  mastery: 1287771,
  versatility: 1279613,
};

export const getFolioOptions = (slot: number): string[] => {
  return omniumFolioData.filter((gem) => gem.slot === slot).map((gem) => gem.shortName);
};

/**
 * Resolves the player's Folio settings into the five rune IDs to equip.
 * Anything left on "Automatic" keeps the behaviour the engine had before the setting existed, so an untouched
 * settings object produces exactly the same set of runes it always did.
 * @param settings The player settings object.
 * @param bestStat The player's highest weighted secondary, used for the Automatic slot 4 pick.
 */
export const getFolioGems = (settings: any, bestStat: string): number[] => {
  const chosen: number[] = [];

  [1, 2, 3, 4, 5].forEach((slot) => {
    const settingKey = FOLIO_SLOT_SETTINGS[slot];
    const raw = settingKey && settings && settingKey in settings ? settings[settingKey].value : "Automatic";
    const choice = typeof raw === "string" ? raw : "Automatic";

    if (choice !== "Automatic") {
      const match = omniumFolioData.find((gem) => gem.slot === slot && gem.shortName === choice);
      if (match) {
        chosen.push(match.id);
        return;
      }
      // An unrecognised choice (renamed rune, stale local storage) falls through to Automatic rather than
      // dropping the slot entirely, which would silently cost the player a rune.
    }

    if (slot === 4) chosen.push(FOLIO_STAT_RUNES[bestStat] || FOLIO_STAT_RUNES.haste);
    else chosen.push(FOLIO_AUTO_DEFAULTS[slot]);
  });

  return chosen;
};

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
export const getFolioEffect = (gemNames: number[], additionalData: AdditionalData) => {
    let bonus_stats: Stats = {};

    let gemsEquipped = gemNames.map((gemID: number) => {
        return omniumFolioData.find((effect) => effect.id === gemID);
    }).filter(gem => gem !== undefined);

    const gemIDs = gemsEquipped.map((gem: folioGemType) => gem.id);
    
    gemsEquipped.forEach(((gem: folioGemType) => {
        if (gem) {
          const gemStats = gem.runFunc(gem, gemIDs, additionalData);

          bonus_stats = compileStats(bonus_stats, gemStats); // TODO
        }
        else {
          console.log("Gem not found" + gem);
        }

    }));

    return bonus_stats; // 

    

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
        value: 2051,
        ppm: 6,
        efficiency: 0.8,
        targets: 1,
        secondaries: ['versatility', 'crit'], // TODO: Check Crit
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(folioData[1], 285));
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
      
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
        value: 2051,
        ppm: 9,
        efficiency: 0.8,
        targets: 1,
        secondaries: ['versatility', 'crit'], // TODO: Check Crit
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(folioData[1], 285));
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
      
        let bonus_stats: Stats = {};
        const effect = data.effects[0];

        // Could possibly replace this with a call to effectUtilities but would need custom handling for the processed value type / formula.
        bonus_stats.hps = effect.ppm * 1.13 * effect.efficiency * additionalData.player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData) / 60; 
  
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
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
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
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
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
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
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
    shortName: "Vers",
    effects: [
      { 
        value: 170,
        duration: 10,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(processedValue(folioData[3], 285) * data.value! / 100);
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
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
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
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
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
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
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
        let bonus_stats: Stats = {};

        return bonus_stats;
    }
  },

        {
    /* 
    */
    name: "Rune of Self-Mending",
    id: 1279603,
    icon: "spell_shadow_felmending",
    slot: 2,
    shortName: "Mending",
    effects: [
      { 
        value: 0,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return 0;
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
        let bonus_stats: Stats = {};

        return bonus_stats;
    }
  },
  {
    /* 
    */
    name: "Rune of Lingering",
    id: 1287555,
    icon: "item_shadowcloth",
    slot: 3,
    shortName: "Lingering",
    effects: [
      { 
        value: 0,
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, player: Player, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return 0;
    },
    runFunc: function(data: folioGemType, gemData: Array<any>, additionalData: Object) {
        let bonus_stats: Stats = {};

        return bonus_stats;
    }
  },

]