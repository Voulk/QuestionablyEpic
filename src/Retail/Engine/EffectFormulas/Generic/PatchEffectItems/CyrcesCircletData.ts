import { convertPPMToUptime, processedValue, runGenericPPMTrinket, 
    getHighestStat, getLowestStat, runGenericOnUseTrinket, getDiminishedValue, runDiscOnUseTrinket, runGenericFlatProc } from "Retail/Engine/EffectFormulas/EffectUtilities";
    
import { compileStats, getEstimatedHPS } from "General/Engine/ItemUtilities"

// Relevant Primordial Gems
import s204020 from "Images/Resources/PrimordialGems/s204020.jpg";
import s204010 from "Images/Resources/PrimordialGems/s204010.jpg";
import s204013 from "Images/Resources/PrimordialGems/s204013.jpg";
import s204027 from "Images/Resources/PrimordialGems/s204027.jpg";

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

export const getCircletIcon = (id) => {
  const gem = circletGemData.filter(gem => gem.id == id)[0];
  if (gem) return "https://wow.zamimg.com/images/wow/icons/large/" + gem.icon + ".jpg";
  else console.error("Gem Icon not found");
}

export const getShortName = (id) => {
  const gem = circletGemData.filter(gem => gem.id == id)[0];
  if (gem) return gem.shortName;
  else "Not Found";
}

export const getBestCombo = (player, contentType, itemLevel, setStats, settings, returnType="names") => {
    // Find the best possible set. There are only 2000 combinations so this isn't too bad. 
    // This could be optimized by separating out combinations that don't require other gems.
    // The sample set is so small though that we might find that rather unnecessary.
    // We can also just pre-prune combinations with no chance of being best. All of this is left as a TODO for now and the function is fast regardless.
    const data = ["Cold Frost Stone", "Deluging Water Stone", "Exuding Steam Stone", "Sparkling Mana Stone", "Gleaming Iron Stone", 
    "Freezing Ice Stone", "Desirous Blood Stone", "Humming Arcane Stone", "Indomitable Earth Stone", "Wild Spirit Stone",
    "Storm Infused Stone", "Flame Licked Stone", "Entropic Fel Stone", "Prophetic Twilight Stone"]
  
    // While the following combination code is very useful, it's unnecessary in our case since we know
    // which gems are best via running the code earlier and there is no secondary scenario where your choice would change.
    // Annulet code is also a little buggy so we're going to return a specific set instead.
    return [204020, 204010, 204013];
    /*
    const combinations = []

    for(let i = 0; i < data.length -2; i++){
        for(let j = i + 1; j < data.length -1; j++){
            for(let k = j + 1; k < data.length; k++){
                if (i !== j && i !== k && j !== k) combinations.push({dps: 0, hps: 0, gems: 
                                                    [convertGemNameToID(data[i]), convertGemNameToID(data[j]), convertGemNameToID(data[k])]})
                
            }
        }
    }

    combinations.forEach(set => {
        const bonus_stats = getOnyxAnnuletEffect(set.gems, player, contentType, itemLevel, setStats, settings);
        set.dps = bonus_stats.dps;
        set.hps = bonus_stats.hps;
    })
    combinations.sort((a, b) => (a.hps < b.hps ? 1 : -1))

    //console.log(combinations)
    return combinations[0].gems; */
}

export const convertGemNameToID = (gemName) => {
  const gem = annuletGemData.filter((gem) => gemName === gem.name)[0];
  return gem.id;
}

export const getAnnuletGemTag = (settings, saved) => {
  if (saved) return saved.toString()
  else if (settings.automatic) return "Wild Spirits, Exuding Steam, Deluging Water";
  else return settings.toString();
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
export const getCircletEffect = (gemNames, itemLevel, additionalData) => {
    console.log(gemNames);
    let bonus_stats = {};
    let temp = [];

    const gemsEquipped = gemNames.map(gemID => {
        return circletGemData.find((effect) => effect.id === gemID);
    })

    gemsEquipped.forEach((gem => {
        if (gem) {
          const gemStats = gem.runFunc(gem, gemsEquipped, itemLevel, additionalData);
          temp.push(gem.name + " " /*+ JSON.stringify(gemStats) */ + " Est HPS: " + getEstimatedHPS(gemStats, player, contentType) + (gemStats.dps > 0 ? " Est DPS: " + gemStats.dps : ""))
          //bonus_stats.hps += getEstimatedHPS(gemStats, player, contentType);
          //bonus_stats.dps += gemStats.dps || 0;

          bonus_stats = compileStats(bonus_stats, gemStats); // TODO
        }
        else {
          console.log("Gem not found" + gem);
        }

    }))


    return bonus_stats;

}

export const getPrimordialImage = (id) => {
  const gem = annuletGemData.filter(gem => gem.id === id)[0];
  return gem.image;
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
    value: 5282, 
  }
  
]

// returns mastery multiplier 
const getMastMult = (equippedGems, stats) => {
  if (equippedGems.includes(228639)) {
    return 1 + stats.mastery / 700;
  }
  else return 1;
}

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
        efficiency: 0.7,
        targets: 3,
        secondaries: ['versatility', 'haste'], // TODO: Check Crit
      },
    ],
    processedValue: function(data: effectData, gemData: Array<any>, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
      
        let bonus_stats: Stats = {};
        const effect = data.effects[0];

        // Could possibly replace this with a call to effectUtilities but would need custom handling for the processed value type / formula.
        bonus_stats.hps = effect.ppm * effect.targets * effect.efficiency * additionalData.player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData, player, itemLevel) / 60; 
  
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
        //coefficient: 49.23086,
        //table: -9,
        ppm: 4,
      },
    ],
    processedValue: function(data, gemData, player, circletLevel) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(processedValue(circletData[2], circletLevel) / circletData[3].value * data.value / 100 * circletData[5].value / 3);
    },
    runFunc: function(allData, gemData, player, itemLevel, settings, ) {
        let bonus_stats = {};
        
        const masteryValue = allData.processedValue(allData.effects[0], gemData, player, itemLevel);
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
      },
    ],
    runFunc: function(data, gemData, player, itemLevel, settings, ) {
        let bonus_stats = {};
        
        bonus_stats.hps = 10; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
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
    processedValue: function(data: effectData, gemData: Array<any>, circletLevel: number) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value! / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data: circletGemType, gemData: Array<any>, itemLevel: number, additionalData: Object) {
        let bonus_stats = {};
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
        value: 0, // 1961
        //coefficient: 49.23086,
        //table: -9,
        ppm: 4,
        efficiency: 0.9,
        secondaries: ['versatility'],
      },
    ],
    runFunc: function(data, gemData, player, itemLevel, settings, ) {
        let bonus_stats = {};
        
        bonus_stats.hps = 10; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
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
    processedValue: function(data, gemData, player, circletLevel) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.round(processedValue(circletData[2], circletLevel) / circletData[3].value * data.value / 100 * circletData[5].value / 3);
    },
    runFunc: function(data, gemData, player, itemLevel, settings, ) {
        let bonus_stats = {};

        const allStats = data.processedValue(data.effects[0], gemData, player, itemLevel);

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
        efficiency: 0.6,
        secondaries: ['versatility', 'haste'], // Cannot currently crit
      },
    ],
    processedValue: function(data, gemData, player, circletLevel) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(data.value / 100 * processedValue(circletData[1], circletLevel));
    },
    runFunc: function(data, gemData, player, itemLevel, settings) {
        let bonus_stats = {};
        const effect = data.effects[0];

        // Could possibly replace this with a call to effectUtilities but would need custom handling for the processed value type / formula.
        bonus_stats.hps = effect.ppm * effect.targets * effect.efficiency * player.getStatMults(effect.secondaries) * data.processedValue(effect, gemData, player, itemLevel) / 60; 
  
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
    processedValue: function(data, gemData, player, circletLevel) { // Circlet formulas are irregular so we'll separate them into a separate function so that we can test properly.
      return Math.floor(processedValue(circletData[2], circletLevel) / circletData[3].value * data.value / 100 * circletData[5].value / 3);
    },
    runFunc: function(data, gemData, player, itemLevel, additionalData) {
        let bonus_stats = {};
        const bestStat = getHighestStat(additionalData.setStats || []);//player.getHighestStatWeight(additionalData.contentType);
        bonus_stats[bestStat] = data.processedValue(data.effects[0], gemData, player, itemLevel); //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
        return bonus_stats;
    }
  },
  {
    /* Highest Secondary
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
      },
    ],
    runFunc: function(data, gemData, player, itemLevel, settings, ) {
        let bonus_stats = {};
        
        bonus_stats.hps = 10; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
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
    runFunc: function(data, gemData, player, itemLevel, settings, ) {
        let bonus_stats = {};
        
        bonus_stats.hps = 10; //processedValue(data[0], itemLevel, data[0].efficiency) * player.getStatMults(data[0].secondaries) * data[0].ppm / 60;
  
        return bonus_stats;
    }
  },

]