import ItemSet from "../ItemSet";
import TopGearResult from "./TopGearResult";
import Item from "../../Player/Item";
import React, { useState, useEffect } from "react";
import { STATPERONEPERCENT, BASESTAT, STATDIMINISHINGRETURNS } from "../../../Engine/STAT";
import { CONSTRAINTS } from "../../../Engine/CONSTRAINTS";


import { convertPPMToUptime, getSetting } from "../../../../Retail/Engine/EffectFormulas/EffectUtilities";
import ClassicPlayer from "../../Player/ClassicPlayer";
import CastModel from "../../Player/CastModel";
import { getEffectValue } from "../../../../Retail/Engine/EffectFormulas/EffectEngine"
import { compileStats, buildDifferential, pruneItems, sumScore, deepCopyFunction, setupGems } from "./TopGearEngineShared"
import { getItemSet } from "Classic/Databases/ItemSetsDB"

import { initializeDruidSet, scoreDruidSet, initializePaladinSet, scorePaladinSet } from "General/Modules/Player/ClassDefaults/ClassicDefaults";

import { gemDB } from "Databases/GemDB";
import { applyRaidBuffs } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";

// Most of our sets will fall into a bucket where totalling the individual stats is enough to tell us they aren't viable. By slicing these out in a preliminary phase,
// we can run our full algorithm on far fewer items. The net benefit to the player is being able to include more items, with a quicker return.
// This does run into some problems when it comes to set bonuses and could be re-evaluated at the time. The likely strat is to auto-include anything with a bonus, or to run
// our set bonus algorithm before we sort and slice. There are no current set bonuses that are relevant to raid / dungeon so left as a thought experiment for now.
const softSlice = 3000;
const DR_CONST = 0.00196669230769231;
const DR_CONSTLEECH = 0.04322569230769231;

const classRaceStats = {
  "Restoration Druid Classic": {
    "Night Elf": {intellect: 143, spirit: 159},
    "Tauren": {intellect: 139, spirit: 161},
  },
  "Holy Priest Classic": {
    "Human": {intellect: 174, spirit: 181},
    "Night Elf": {intellect: 174, spirit: 181},
    "Dwarf": {intellect: 173, spirit: 180},
    "Draenei": {intellect: 174, spirit: 183},
    "Undead": {intellect: 172, spirit: 186},
    "Troll": {intellect: 170, spirit: 182},
    "Blood Elf": {intellect: 177, spirit: 179},
  },
  "Discipline Priest Classic": {
    "Human": {intellect: 174, spirit: 181},
    "Night Elf": {intellect: 174, spirit: 181},
    "Dwarf": {intellect: 173, spirit: 180},
    "Draenei": {intellect: 174, spirit: 183},
    "Undead": {intellect: 172, spirit: 186},
    "Troll": {intellect: 170, spirit: 182},
    "Blood Elf": {intellect: 177, spirit: 179},
  },
  "Holy Paladin Classic": {
    "Human": {intellect: 98, spirit: 105},
    "Dwarf": {intellect: 97, spirit: 104},
    "Draenei": {intellect: 98, spirit: 107},
    "Blood Elf": {intellect: 101, spirit: 103},
  },
  "Restoration Shaman Classic": {
    "Draenei": {intellect: 128, spirit: 145},
    "Orc": {intellect: 125, spirit: 145},
    "Troll": {intellect: 124, spirit: 144},
    "Tauren": {intellect: 124, spirit: 145},
  }

}

// block for `time` ms, then return the number of loops we could run in that time:
export function expensive(time) {
  let start = Date.now(),
    count = 0;
  while (Date.now() - start < time) count++;
  return count;
}

// Unfortunately we aren't able to pass objects through to our worker. This recreates our player object since we'll need it for effect formulas. 
function setupPlayer(player, contentType, castModel) {

  let newPlayer = new ClassicPlayer(player.charName, player.spec, player.charID, player.region, player.realm, player.race, player.statWeights);
  //newPlayer = Object.assign(newPlayer, player);

  //newPlayer.castModel[contentType] = new CastModel(newPlayer.getSpec(), contentType);
  //newPlayer.castModel[contentType] = Object.assign(newPlayer.castModel[contentType], castModel);
  return newPlayer;
}

export function runTopGearBC(rawItemList, wepCombos, player, contentType, baseHPS, currentLanguage, playerSettings, castModel, reforgingOn = true, reforgeFromOptions = [], reforgeToOptions = [], chunkNumber) {
    console.log("TOP GEAR Classic");
    //console.log("WEP COMBOS: " + JSON.stringify(wepCombos));
    //console.log("CL::::" + currentLanguage);
    var t0 = performance.now();
    let count = 0;

    const newPlayer = setupPlayer(player, contentType, castModel);
    let itemList = deepCopyFunction(rawItemList); // Here we duplicate the users items so that nothing is changed during the process. 
   

    // == Handle Reforging ==
    // The comprehensive way to Reforge is to test every variation. There are five for each item, ignoring DPS-centric stats.
    // You can't reforge to a stat already on an item. So your combinations are:
    // - Stat A -> Stat C or Stat D
    // - Stat B -> Stat C or stat D
    // - No reforge at all.
    let reforgedItems = []; // We'll merge this with our ItemList at the end but we don't want to iterate over any reforged items.
    const reforgeSetting = getSetting(playerSettings, "reforgeSetting");
    //const reforgeFromOptions = ["crit", "mastery", ];
    //const reforgeOptions = ["haste", "spirit"];
    /*if (getSetting(playerSettings, "reforgeSetting") === "Smart" && player.spec === "Restoration Druid Classic") {
      reforgeFromOptions = [ "haste"];
      reforgeToOptions = ["crit", "mastery", "spirit"];
    } */

    if (reforgingOn) {
      itemList.forEach(item => {
        const itemStats = Object.keys(item.stats).filter(key => ["spirit", "mastery", "crit", "haste"].includes(key));
        const itemReforgeOptions = reforgeToOptions.filter(stat => !itemStats.includes(stat));
        //console.log("Item has stats: " + itemStats + " and reforge options: " + itemReforgeOptions);
        itemStats.forEach(fromStat => {
          // for each stat, add one version that trades a portion of it for another.
          if (reforgeSetting === "Thorough" && reforgeFromOptions.includes(fromStat) /*&& (item.name === "Dorian's Lost Necklace" || item.name === "Stormrider's Cover"|| item.name === "Stormrider's Vestment")*/) {
            itemReforgeOptions.forEach(targetStat => {
              const newItem = JSON.parse(JSON.stringify(item));
             // console.log("Reforge: " + item.stats[fromStat] * 0.4 + " " +  fromStat + " -> " + targetStat)
              newItem.stats[targetStat] = Math.round(item.stats[fromStat] * 0.4);
              newItem.stats[fromStat] = Math.round(item.stats[fromStat] * 0.6);
              newItem.uniqueHash = Math.random().toString(36).substring(7);
              //console.log("Reforged " + item.name + " from " + fromStat + " to " + targetStat);
              newItem.flags.push("Reforged: " +  fromStat + " -> " + targetStat)

              reforgedItems.push(newItem);
            })
          }

        });
        
        // V1 of smart reforge. This will reforge all non-haste stats to haste, and haste to crit/mastery/spirit.
        if (reforgeSetting === "Smart") {

          const secondaryRank = ["spirit", "mastery", "crit"]
          // Convert non-haste stats to haste, and haste to crit/mastery/spirit.
          if (itemStats.includes("haste")) {
            
            const targetStat = secondaryRank.find(value => !itemStats.includes(value));
            const newItem = JSON.parse(JSON.stringify(item));
            // console.log("Reforge: " + item.stats[fromStat] * 0.4 + " " +  fromStat + " -> " + targetStat)
            const reforgeAmount = Math.floor(item.stats['haste'] * 0.4);
            newItem.stats[targetStat] = Math.round(reforgeAmount);
            newItem.stats['haste'] = Math.round(item.stats['haste'] - reforgeAmount);
            newItem.uniqueHash = Math.random().toString(36).substring(7);
            //console.log("Reforged " + item.name + " from " + fromStat + " to " + targetStat);
            newItem.flags.push("Reforged: " +  'haste' + " -> " + targetStat)
            reforgedItems.push(newItem);
            //console.log("reforged item with stats: " + JSON.stringify(itemStats) + " from haste to " + targetStat)
            
          }
          else if (["crit", "spirit", "mastery"].some(value => itemStats.includes(value))) {
            // Check the lowest value of the set and reforge that.
            const fromStat = secondaryRank.slice().reverse().find(value => itemStats.includes(value));
            
            const newItem = JSON.parse(JSON.stringify(item));
            const reforgeAmount = Math.floor(item.stats[fromStat] * 0.4);
            // console.log("Reforge: " + item.stats[fromStat] * 0.4 + " " +  fromStat + " -> " + targetStat)
            newItem.stats['haste'] = Math.round(reforgeAmount);
            newItem.stats[fromStat] = Math.round(item.stats[fromStat] - reforgeAmount);
            newItem.uniqueHash = Math.random().toString(36).substring(7);
            //console.log("Reforged " + item.name + " from " + fromStat + " to " + targetStat);
            newItem.flags.push("Reforged: " +  fromStat + " -> " + 'haste')
            reforgedItems.push(newItem);
            //console.log("reforged item with stats: " + JSON.stringify(itemStats) + " from " + fromStat + " to haste")
          }
        }
        
    })
    
    itemList = itemList.concat(reforgedItems);
    }

    let itemSets = createSets(itemList, wepCombos, true);

    // Auto-filter some sets
    /*const filteredSets = []
    for (var j = 0; j < itemSets.length; j++) {
      itemSets[j] = itemSets[j].compileStats("Classic");
      if (itemSets[j].setStats.haste > 1940) {
        filteredSets.push(itemSets[j]);
      }
    }
    console.log("Item Sets: " + itemSets.length);
    console.log("Filtered sets: " + filteredSets.length);
    if (filteredSets.length > 0) itemSets = filteredSets; */

    //console.log("Item Count: " + itemList.length);
    //console.log("Sets (Post-Reforge): " + itemSets.length);
    const professions = [getSetting(playerSettings, "professionOne"), getSetting(playerSettings, "professionTwo")];
    const baseline = player.spec === "Holy Paladin Classic" ? initializePaladinSet() : initializeDruidSet();
    count = itemSets.length;
    const chunkSize = count / 2;
    for (var i = 0; i < count; i++) {
      itemSets[i] = evalSet(itemSets[i], newPlayer, contentType, baseHPS, playerSettings, castModel, baseline, professions);
    }
    

    itemSets.sort((a, b) => (a.hardScore < b.hardScore ? 1 : -1));
    itemSets = pruneItems(itemSets);
    // Build Differentials
    let differentials = [];
    let primeSet = itemSets[0];
    for (var i = 1; i < Math.min(CONSTRAINTS.Shared.topGearDifferentials+1, itemSets.length); i++) {
      differentials.push(buildDifferential(itemSets[i], primeSet, newPlayer, contentType));
    }
    //itemSets[0].printSet()

    var t1 = performance.now();
    console.log("Total execution time: " + (t1 - t0) + " milliseconds for " + count + " sets. Per set: " + (t1 - t0) / count + " ms.");

    if (itemSets.length === 0) {
      let result = new TopGearResult([], []);
      result.itemsCompared = count;
      return result;
    } else {
      let result = new TopGearResult(itemSets[0], differentials);
      result.itemsCompared = count;
      return result;
    }
}





// A true evaluation function on a set.
// THIS IS CLASSIC CODE AND IS NOT COMPATIBLE WITH RETAIL.
function evalSet(itemSet, player, contentType, baseHPS, playerSettings, castModel, baseline, professions) {
    // Get Base Stats
    let builtSet = itemSet.compileStats("Classic");
    let setStats = builtSet.setStats;
    let hardScore = 0;
    const setBonuses = builtSet.sets;
    let effectList = [...itemSet.effectList]
    let tierList = [];

    // --- Item Set Bonuses ---
    for (const set in setBonuses) {
      if (setBonuses[set] > 1) {
        tierList = getItemSet(set, setBonuses[set]);
      }
    }


    let enchants = {};
  
    let bonus_stats = {
        intellect: 0,
        spellpower: 0,
        mastery: 0,
        spirit: 0,
        crit: 0,
        stamina: 0,
        mp5: 0,
        haste: 0,
    };

    let enchant_stats = {
      intellect: 0,
      spellpower: 0,
      spirit: 0,
      crit: 0,
      stamina: 0,
      mastery: 0,
      mp5: 0,
      haste: 0,
    };

    // Talents
    let gemStats = {
      intellect: 0,
      spellpower: 0,
      spirit: 0,
      haste: 0,
      crit: 0,
      stamina: 0,
      mastery: 0,
      mp5: 0,
    }
  
    /*
    let adjusted_weights = {
      intellect: 1,
      haste: player.statWeights[contentType]["haste"],
      crit: player.statWeights[contentType]["crit"],
      mastery: player.statWeights[contentType]["mastery"],
      versatility: player.statWeights[contentType]["versatility"],
      leech: player.statWeights[contentType]["leech"],
    };
    */

    // Auto reforger
    // Check if we can reach haste breakpoints. If we can, reforge those, then optimize what's left.
    if (player.spec === "Restoration Druid Classic") {
      /*
      const baseStats = itemSet.setStats;
      const baseHaste = itemSet.setStats.haste;
      const secondaryRank = ["spirit", "mastery", "crit"]
      const hasteRanges = [];
      // Loop through each item, if no haste, add haste.
      itemSet.itemList.forEach((item, index) => {

        //const possibleReforges = []
        console.log(JSON.stringify(item.stats));
        if (item.stats.haste === undefined) {
          const fromStat = secondaryRank.slice().reverse().find(value => Object.keys(item.stats).includes(value));
          if (item.stats[fromStat]) hasteRanges.push({id: index, from: fromStat, value: Math.round(item.stats[fromStat] * 0.4)})
        }

      });
      console.log("HASTE");
      console.log(baseStats.haste);
      console.log(JSON.stringify(hasteRanges));
      // Check if we can make it to 2005
      if ((baseHaste + hasteRanges.reduce((a, b) => a + b.value, 0)) >= 1930) {
        // It is possible to form a high haste set. We can now make permanent changes to the item set since we'll go with this.

        hasteRanges.sort((a, b) => (a.value < b.value ? 1 : -1));
        // Greedy reforge crit pieces. Stop if > 1950. We're making changes to the set itself here.
        hasteRanges.forEach(reforge => {
          console.log("Checking crit");
          if (reforge.from === "crit" && setStats.haste < 1930) {
            setStats.haste += reforge.value;
            setStats.crit -= reforge.value;
            itemSet.itemList[reforge.id].flags.push("Reforged: Crit -> Haste")
          }
        });
        // Next greedy reforge mastery pieces
        hasteRanges.forEach(reforge => {
          if (reforge.from === "mastery" && setStats.haste < 1930) {
            setStats.haste += reforge.value;
            setStats.mastery -= reforge.value;
            itemSet.itemList[reforge.id].flags.push("Reforged: Mastery -> Haste")
          }
        });
        hasteRanges.forEach(reforge => {
          if (reforge.from === "spirit" && setStats.haste < 1930) {
            setStats.haste += reforge.value;
            setStats.mastery -= reforge.value;
            itemSet.itemList[reforge.id].flags.push("Reforged: Spirit -> Haste")
          }
        });

        // Check how far over the set is. See if we can make minor changes to fix it. 
      }
      else {
        // We can't make a set with enough haste. Instead we'll just reforge normally while staying above 950 haste. 
        console.log("CANT MAKE SET");
      }



      */
      
    }
    // If we can't, optimize all pieces.



   let adjusted_weights = {...castModel.baseStatWeights}
    // Mana Profiles

    if (playerSettings.manaProfile === "Conservative") {
      //adjusted_weights['mp5'] = adjusted_weights['mp5'] * 1.2;
      adjusted_weights['intellect'] = adjusted_weights['intellect'] * 1.16;
      adjusted_weights['spirit'] = adjusted_weights['spirit'] * 1.2;
    }
    else if (playerSettings.manaProfile === "Max Healing") {
      //adjusted_weights['mp5'] = adjusted_weights['mp5'] * 0.75;
      adjusted_weights['intellect'] = adjusted_weights['intellect'] * 0.85;
      adjusted_weights['spirit'] = adjusted_weights['spirit'] * 0.75;
    }
  
    // Apply consumables if ticked.
    
    // -- GEMS & ENCHANTS --
    // We could precalculate enchants and auto-fill them each time to save time. Make an exception for like gloves enchant. 
    const compiledGems = setupGems(builtSet.itemList, adjusted_weights)
    compileStats(setStats, compiledGems);

    if (true) {
      enchant_stats.intellect += 60;
      enchant_stats.crit += 35;
      enchants['Head'] = "Arcanum of Hyjal"
  
      if (professions.includes("Inscription")) {
        enchant_stats.intellect += 130;
        enchant_stats.haste += 25;
        enchants['Shoulder'] = "Felfire Inscription"
      }
      else {
        enchant_stats.intellect += 50;
        enchant_stats.haste += 25;
        enchants['Shoulder'] = "Greater Inscription of Charged Lodestone" // Lesser version available.
      }

      enchant_stats.intellect += 20;
      enchant_stats.spirit += 20;
      enchants['Chest'] = "Peerless Stats" // TODO
  
      enchant_stats.intellect += 50;
      enchants['Back'] = "Greater Intellect"; // Tailoring version available.

      if (professions.includes("Inscription")) {
        enchant_stats.intellect += 130;
        enchants['Wrist'] = "Draconic Embossment";
      }
      else {
        enchant_stats.intellect += 50;
        enchants['Wrist'] = "Mighty Intellect";
      }

  
      if (player.spec === "Restoration Druid Classic" && setStats.haste < 2005 && setStats.haste >= 1955) {
        enchant_stats.haste += 50;
        enchants['Hands'] = "Haste"
      }
      else { 
        enchant_stats.mastery += 50;
        enchants['Hands'] = "Mastery"
      }

      enchant_stats.spellpower += 95;
      enchant_stats.spirit += 55;
      enchants['Legs'] = "Powerful Ghostly Spellthread"
  
      enchant_stats.mastery += 35;
      enchants['Feet'] = "Lavawalker" // Spirit version available but not great.
  
      if ("profession" === "Enchanting") // todo 
      {
        enchant_stats.intellect += (40 * 2); // Two finger slots.
        enchants['Finger'] = "Intellect"
      }
  
      enchant_stats.spellpower += 63;
      enchants['CombinedWeapon'] = "Power Torrent"
      enchants['1H Weapon'] = "Power Torrent"
      enchants['2H Weapon'] = "Power Torrent"
    }
    // Flasks and profession stuff.
    enchant_stats.intellect += 300;
    if (professions.includes("Skinning")) {
      enchant_stats.crit += 80;
    }
    else if (professions.includes("Alchemy")) {
      enchant_stats.intellect += 80;
    }

    
    //console.log("Gems took " + (s1 - s0) + " milliseconds with count ")
    // ----------------------
    compileStats(setStats, bonus_stats); // Add the base stats on our gear together with enchants & gems.
    
    compileStats(setStats, enchant_stats);
    //applyDiminishingReturns(setStats); // Apply Diminishing returns to our haul.
    //addBaseStats(setStats, player.race, player.spec); // Add our base stats, which are immune to DR. This includes our base 5% crit, and whatever base mastery our spec has.
    
    

    // Talents & Racials

    // Human
    /*if (player.race.includes("Human")) {
      talent_stats.spirit = (setStats.spirit) * 0.03;
    } */

    // This can be properly formalized.


    /*
    if (player.getSpec() === "Holy Paladin Classic") {
      talent_stats.intellect = setStats.intellect * 0.1;
      talent_stats.spellpower = (setStats.intellect + talent_stats.intellect) * 0.2;
      talent_stats.crit = (5 + 5) * 35; 
    }
    else if (player.getSpec() === "Restoration Shaman Classic") {
      talent_stats.intellect = setStats.intellect * 0.1;
      talent_stats.spellpower = (setStats.intellect + talent_stats.intellect) * 0.15;
      talent_stats.crit = 4 * 35; // Blessing of the Eternals
    }

    else if (player.getSpec() === "Holy Priest Classic") {
      // Also gets 30% of spirit MP5 as MP5
      //talent_stats.spirit += (setStats.spirit + talent_stats.spirit) * 0.05;
      talent_stats.crit = 5 * 35;
      talent_stats.spelldamage = (setStats.spirit + talent_stats.spirit) * 0.25;
    }
    else if (player.getSpec() === "Discipline Priest Classic") {
      // Also gets 30% of spirit MP5 as MP5
      //talent_stats.spirit += (setStats.spirit + talent_stats.spirit) * 0.05;
      talent_stats.intellect = setStats.intellect * 0.15;
      talent_stats.spirit = setStats.spirit * 0.06;
      talent_stats.haste = 32.79 * 3;
      //talent_stats.spelldamage = (setStats.spirit + talent_stats.spirit) * 0.25;
    } */

   // compileStats(setStats, talent_stats);
    // -- Effects --
    let effectStats = [];
    effectStats.push(bonus_stats);
    for (var x = 0; x < effectList.length; x++) {
      effectStats.push(getEffectValue(effectList[x], player, "", contentType, effectList[x].level, playerSettings, "Classic", setStats));
    }
    const compiledEffects = effectStats.reduce((acc, obj) => {
      for (const [key, value] of Object.entries(obj)) {
          acc[key] = (acc[key] || 0) + value;
      }
      return acc;
    }, {});

    //setStats = mergeBonusStats(effectStats);
    compileStats(setStats, compiledEffects);

    applyRaidBuffs({}, setStats);
    if (player.getSpec() === "Restoration Druid Classic") {
      // 
      setStats.intellect *= 1.06;
      // mana Pool
      //setStats.crit += 4 * 179;
    }
    
    if (player.spec === "Restoration Druid Classic") {
      hardScore = scoreDruidSet(baseline, setStats, player, playerSettings, tierList, builtSet.itemList.filter(item => item.id === 60233).length > 0);
    }
    else if (player.spec === "Holy Paladin Classic") {
      hardScore = scorePaladinSet(baseline, setStats, player, playerSettings);
    }
    else {
      console.log("DOING OLD SCORING");
      for (var stat in setStats) {
        if (stat === "hps") {
          hardScore += setStats[stat];
          //console.log("Adding HPS score of " + setStats[stat]);
        } else if (stat === "dps") {
          continue;
        } else if (stat !== "stamina") {
          hardScore += (setStats[stat] * adjusted_weights[stat]) || 0;
          //console.log("Adding " + (setStats[stat] * adjusted_weights[stat]) + " to hardscore for stat " + stat + " with stat weight: " + adjusted_weights[stat]);
        }
      }
    }
    //console.log("END SCORE: " + hardScore);
    builtSet.hardScore = Math.round(1000 * hardScore) / 1000;
    builtSet.setStats = setStats;
    builtSet.enchantBreakdown = enchants;
    return builtSet; // Temp
  }

  function mergeStat(stats, statName) {
    return stats.reduce(function(a, b) {
      if (!isNaN(b[statName])) return a + b[statName]
      else return a
    }, 0)
  }
  
  // Merges together an array of bonus_stats.
  export function mergeBonusStats(stats) {
    const val = {
        intellect: mergeStat(stats, 'intellect'),
        spellpower: mergeStat(stats, 'spellpower'),
        spirit: mergeStat(stats, 'spirit'),
        crit: mergeStat(stats, 'crit'),
        mastery: mergeStat(stats, 'mastery'),
        stamina: mergeStat(stats, 'stamina'),
        mp5: mergeStat(stats, 'mp5'),
        haste: mergeStat(stats, 'haste'),
      }
  
    return val;
  
  }

function addBaseStats(stats, race, spec) {

  const base_stats = classRaceStats[spec][race.replace("Races.", "")];

  for (const [key, value] of Object.entries(base_stats)) {
    stats[key] = stats[key] + value;
  }

}

function getSlotLengths(itemList, wepCombos) {
  let slotLengths = {
    Head: 0,
    Neck: 0,
    Shoulder: 0,
    Back: 0,
    Chest: 0,
    Wrist: 0,
    Hands: 0,
    Waist: 0,
    Legs: 0,
    Feet: 0,
    Finger: 0,
    Trinket: 0,
    Weapon: 0,
    'Relics & Wands': 0,
  };

  for (var i = 0; i < itemList.length; i++) {
    let slot = itemList[i].slot;
    if (slot in slotLengths) {
      slotLengths[slot] += 1;
      splitItems[slot].push(itemList[i]);
    }
  }
  slotLengths.Weapon = Object.keys(wepCombos).length;

  return slotLengths;
}


function createSets(itemList, rawWepCombos, filter) {
  const t0 = performance.now();
  const wepCombos = deepCopyFunction(rawWepCombos);
  let setCount = 0;
  let itemSets = [];
  let slotLengths = {
    Head: 0,
    Neck: 0,
    Shoulder: 0,
    Back: 0,
    Chest: 0,
    Wrist: 0,
    Hands: 0,
    Waist: 0,
    Legs: 0,
    Feet: 0,
    Finger: 0,
    Trinket: 0,
    Weapon: 0,
    'Relics & Wands': 0,
  };

  let splitItems = {
    Head: [],
    Neck: [],
    Shoulder: [],
    Back: [],
    Chest: [],
    Wrist: [],
    Hands: [],
    Waist: [],
    Legs: [],
    Feet: [],
    Finger: [],
    Trinket: [],
    WeaponSet: [],
    'Relics & Wands': [],
  };

  for (var i = 0; i < itemList.length; i++) {
    let slot = itemList[i].slot;
    if (slot in slotLengths) {
      slotLengths[slot] += 1;
      splitItems[slot].push(itemList[i]);
    }
  }
  slotLengths.Weapon = Object.keys(wepCombos).length;

  for (var head = 0; head < slotLengths.Head; head++) {
    let softScore = { head: splitItems.Head[head].softScore };
    for (var shoulder = 0; shoulder < slotLengths.Shoulder; shoulder++) {
      softScore.shoulder = splitItems.Shoulder[shoulder].softScore;

      for (var neck = 0; neck < slotLengths.Neck; neck++) {
        softScore.neck = splitItems.Neck[neck].softScore;

        for (var back = 0; back < slotLengths.Back; back++) {
          softScore.back = splitItems.Back[back].softScore;

          for (var chest = 0; chest < slotLengths.Chest; chest++) {
            softScore.chest = splitItems.Chest[chest].softScore;

            for (var wrist = 0; wrist < slotLengths.Wrist; wrist++) {
              softScore.wrist = splitItems.Wrist[wrist].softScore;

              for (var hands = 0; hands < slotLengths.Hands; hands++) {
                softScore.hands = splitItems.Hands[hands].softScore;

                for (var waist = 0; waist < slotLengths.Waist; waist++) {
                  softScore.waist = splitItems.Waist[waist].softScore;

                  for (var legs = 0; legs < slotLengths.Legs; legs++) {
                    softScore.legs = splitItems.Legs[legs].softScore;

                    for (var feet = 0; feet < slotLengths.Feet; feet++) {
                      softScore.feet = splitItems.Feet[feet].softScore;

                      for (var weapon = 0; weapon < slotLengths.Weapon; weapon++) {
                        //softScore.weapon = splitItems.Feet[feet].softScore; //
                        softScore.weapon = wepCombos[weapon].softScore;
                        wepCombos[weapon].slot = "CombinedWeapon";

                        for (var finger = 0; finger < slotLengths.Finger - 1; finger++) {
                          softScore.finger = splitItems.Finger[finger].softScore;

                          for (var finger2 = 1; finger2 < slotLengths.Finger; finger2++) {
                            softScore.finger2 = splitItems.Finger[finger2].softScore;

                            if (splitItems.Finger[finger].id !== splitItems.Finger[finger2].id &&
                                finger < finger2) {
                              for (var trinket = 0; trinket < slotLengths.Trinket - 1; trinket++) {
                                softScore.trinket = splitItems.Trinket[trinket].softScore;

                                for (var trinket2 = 1; trinket2 < slotLengths.Trinket; trinket2++) {
                                  softScore.trinket2 = splitItems.Trinket[trinket2].softScore;

                                  if (splitItems.Trinket[trinket].id !== splitItems.Trinket[trinket2].id
                                    && trinket < trinket2) {

                                      for (var relics = 0; relics < slotLengths['Relics & Wands']; relics++) {
                                        softScore.relics = splitItems['Relics & Wands'][relics].softScore;  

                                        let includedItems = [
                                          splitItems.Head[head],
                                          splitItems.Neck[neck],
                                          splitItems.Shoulder[shoulder],
                                          splitItems.Back[back],
                                          splitItems.Chest[chest],
                                          splitItems.Wrist[wrist],
                                          splitItems.Hands[hands],
                                          splitItems.Waist[waist],
                                          splitItems.Legs[legs],
                                          splitItems.Feet[feet],
                                          splitItems.Finger[finger],
                                          splitItems.Finger[finger2],
                                          splitItems.Trinket[trinket],
                                          splitItems.Trinket[trinket2],
                                          wepCombos[weapon][0],
                                          splitItems['Relics & Wands'][relics],
                                        ];
                                        if (wepCombos[weapon].length > 1) includedItems.push(wepCombos[weapon][1])
                                        let sumSoft = sumScore(softScore);
                                        itemSets.push(new ItemSet(setCount, includedItems, sumSoft, "Classic"));
                                        setCount++;
                                        /*set.compileStats("Classic");
                                        if (set.setStats.haste > 1940) {
                                          itemSets.push(new ItemSet(setCount, includedItems, sumSoft, "Classic"));
                                          setCount++;
                                        }*/

                                    }
                                  }
                                }
                              }
                            }
                          }

                          //console.log("Incl Items: " + JSON.stringify(includedItems) + " " + finger + " " + feet + " " + legs + " " + waist + " " + hands);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // console.log("Created " + itemSets.length + " item sets.");
  console.log("Item Set Creation took " + (performance.now() - t0) + " milliseconds.");
  return itemSets;
}


