import ItemSet from "./ItemSet";
import TopGearResult from "./TopGearResult";
import Item from "../Player/Item";
import React, { useState, useEffect } from "react";
import { STATPERONEPERCENT, BASESTAT, STATDIMINISHINGRETURNS } from "../../Engine/STAT";
import { CONSTRAINTS } from "../../Engine/CONSTRAINTS";
import { convertPPMToUptime } from "../../../Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "../Player/Player";
import CastModel from "../Player/CastModel";
import { getEffectValue } from "../../../Retail/Engine/EffectFormulas/EffectEngine"
import { getDomGemEffect } from "General/Engine/ItemUtilities"
import { dominationGemDB } from "Databases/DominationGemDB";

// Most of our sets will fall into a bucket where totalling the individual stats is enough to tell us they aren't viable. By slicing these out in a preliminary phase,
// we can run our full algorithm on far fewer items. The net benefit to the player is being able to include more items, with a quicker return.
// This does run into some problems when it comes to set bonuses and could be re-evaluated at the time. The likely strat is to auto-include anything with a bonus, or to run
// our set bonus algorithm before we sort and slice. There are no current set bonuses that are relevant to raid / dungeon so left as a thought experiment for now.
const softSlice = 3000;
const DR_CONST = 0.00364669230769231;
const DR_CONSTLEECH = 0.04322569230769231;


// block for `time` ms, then return the number of loops we could run in that time:
export function expensive(time) {
  let start = Date.now(),
    count = 0;
  while (Date.now() - start < time) count++;
  return count;
}

// Unfortunately we aren't able to pass objects through to our worker. This recreates our player object since we'll need it for effect formulas. 
function setupPlayer(player, contentType, castModel) {

  let newPlayer = new Player(player.charName, player.spec, player.charID, player.region, player.realm, player.race, player.statWeights);
  newPlayer.castModel[contentType] = new CastModel(newPlayer.getSpec(), contentType);
  newPlayer.castModel[contentType] = Object.assign(newPlayer.castModel[contentType], castModel);
  newPlayer.dominationGemRanks = player.dominationGemRanks;


  return newPlayer;

}

function autoSocketItems(itemList) {
  for (var i = 0; i < itemList.length; i++) {
    let item = itemList[i];
    if (['Finger', 'Head', 'Neck', 'Wrist', 'Waist'].includes(item.slot) && !item.hasDomSocket) {
      item.socket = true;
    }
  }

  return itemList;

}

function autoGemVault(itemList, userSettings) {
  for (var i = 0; i < itemList.length; i++) {
    let item = itemList[i];
    if (item.vaultItem && item.hasDomSocket && userSettings.vaultDomGem !== "") {
      //item.setDominationGem(userSettings.vaultDomGem);
      const gemID = userSettings.vaultDomGem;
      item.domGemID = gemID;
      item.effect = getDomGemEffect(gemID)
      item.gemString = gemID;
      }
  }

  return itemList;
}

export function runTopGear(rawItemList, wepCombos, player, contentType, baseHPS, currentLanguage, userSettings, castModel) {
  //console.log(userSettings);
  //console.log("WEP COMBOS: " + JSON.stringify(wepCombos));
  //console.log("CL::::" + currentLanguage);
  var t0 = performance.now();
  // console.log("Running Top Gear");
  let count = 0;

  const newPlayer = setupPlayer(player, contentType, castModel);

  let newCastModel = new CastModel(newPlayer.getSpec(), contentType, castModel.modelName, 0) 
  newCastModel = Object.assign(newCastModel, castModel);

  let itemList = deepCopyFunction(rawItemList); // Here we duplicate the users items so that nothing is changed during the process. 
  itemList = userSettings.autoSocket ? autoSocketItems(itemList) : itemList;
  itemList = userSettings.vaultDomGem !== "none" ? autoGemVault(itemList, userSettings) : itemList;

  let itemSets = createSets(itemList, wepCombos);

  itemSets.sort((a, b) => (a.sumSoftScore < b.sumSoftScore ? 1 : -1));
  count = itemSets.length;


  //console.log("Count: " + count);
  // TEST LOOP ONLY FOR CONSOLE PRINTS.
  /*
    for (var i = 0; i < itemSets.length; i++) {
        
        //console.log("ID: " + itemSets[i].id + ". Soft: " + itemSets[i].sumSoftScore + ". Hard: " + itemSets[i].hardScore);
        //itemSets[i].printSet();
        console.log(itemSets[i]);
        console.log("====================");
   
    }
    */

  for (var i = 0; i < itemSets.length; i++) {
    itemSets[i] = evalSet(itemSets[i], newPlayer, contentType, baseHPS, userSettings, newCastModel);
  }
  itemSets = pruneItems(itemSets);

  itemSets.sort((a, b) => (a.hardScore < b.hardScore ? 1 : -1));

  

  // ----

  var t1 = performance.now();
  // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds with count ")

  // Build Differentials
  let differentials = [];
  let primeSet = itemSets[0];
  for (var i = 1; i < Math.min(CONSTRAINTS.Shared.topGearDifferentials+1, itemSets.length); i++) {
    differentials.push(buildDifferential(itemSets[i], primeSet, newPlayer, contentType));
  }

  //console.log(differentials);

  //itemSets[0].printSet()

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

function createSets(itemList, rawWepCombos) {
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
                                      wepCombos[weapon],
                                    ];
                                    let sumSoft = sumScore(softScore);
                                    itemSets.push(new ItemSet(setCount, includedItems, sumSoft));
                                    setCount++;
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
  return itemSets;
}

// Converts a bonus_stats dictionary to a singular estimated HPS number.
export function getEstimatedHPS(bonus_stats, player, contentType) {
  let estHPS = 0;
  for (const [key, value] of Object.entries(bonus_stats)) {
    if (["haste", "mastery", "crit", "versatility", "leech"].includes(key)) {
      estHPS += ((value * player.getStatWeight(contentType, key)) / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "intellect") {
      estHPS += (value / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "hps") {
      estHPS += value;
    }
    else if (key === "dps" && contentType === "Dungeon") {
      estHPS += value;
    }
  }

  return Math.round(estHPS);
}

function scoreShards(player, castModel, contentType) {
  let shardScores = {};
  const domGems = ['Shard of Bek', 'Shard of Jas', 'Shard of Rev', 'Shard of Cor', 'Shard of Tel', 'Shard of Kyr', 'Shard of Dyz', 'Shard of Zed', 'Shard of Oth' ];
  for (var i = 0; i < domGems.length; i++) {
    const shard = domGems[i];
    const effect = {type: "domination gem", name: shard, rank: player.getDominationSingleRank(shard)};
    shardScores[shard] = getEstimatedHPS(getEffectValue(effect, player, castModel, contentType, 0, {}, "Retail", {}), player, contentType);
  }

  return shardScores;
}

function scoreSets(player, castModel, contentType) {
  const setScores = {'Blood': getEstimatedHPS(getEffectValue({"type": "domination gem", "name": "Blood Link", "rank": player.getDominationSetRank("Blood"),}, player, castModel, contentType, 0, {}, "Retail", {}), player, contentType), 
  'Frost': getEstimatedHPS(getEffectValue({"type": "domination gem", "name": "Winds of Winter", "rank": player.getDominationSetRank("Frost"),}, player, castModel, contentType, 0, {}, "Retail", {}), player, contentType), 
  'Unholy': getEstimatedHPS(getEffectValue({"type": "domination gem", "name": "Chaos Bane", "rank": player.getDominationSetRank("Unholy"),}, player, castModel, contentType, 0, {}, "Retail", {}), player, contentType)};

  return setScores;
}

export function buildBestDomSet(itemSet, player, castModel, contentType, slots) {

  let results = []
  let scores = []
  
  const domGems = ['Shard of Bek', 'Shard of Jas', 'Shard of Rev', 'Shard of Cor', 'Shard of Tel', 'Shard of Kyr', 'Shard of Dyz', 'Shard of Zed', 'Shard of Oth' ];
  //let effectList = [];
  const setPieces = {"unholy": itemSet.itemList.filter(item => {return item.slot === "Head" && item.hasDomSocket}).length > 0,
                    "blood": itemSet.itemList.filter(item => {return item.slot === "Chest" && item.hasDomSocket}).length > 0,
                    "frost": itemSet.itemList.filter(item => {return item.slot === "Shoulder" && item.hasDomSocket}).length > 0}
  const shardScores = scoreShards(player, castModel, contentType);
  const setScores = scoreSets(player, castModel, contentType);
  console.log(itemSet.itemList);
  console.log(setPieces);

  let result = []
  result.length = slots;
  generateSet( domGems, result.length, 0);
  function generateSet(input, len, start) {
    if(len === 0) {
      results.push(result.join(","));
      return;
    }
    for (let i = start; i <= input.length - len; i++) {
      result[result.length - len] = input[i];
      generateSet(input, len-1, i+1 );
    }
  }
  
  for (var x = 0; x < results.length; x++) {
    // One result. 
    let score = 0;
    results[x].split(",").forEach(shard => {
      score += shardScores[shard];
    })
    
    // Check for sets
    if (setPieces.blood && results[x].includes("Shard of Jas") && results[x].includes("Shard of Bek") && results[x].includes("Shard of Rev")) {
      // Blood Set
      score += setScores['Blood']
    }
    else if (setPieces.frost &&results[x].includes("Shard of Kyr") && results[x].includes("Shard of Cor") && results[x].includes("Shard of Tel")) {
      // Frost Set
      score += setScores['Frost']
    }
    else if (setPieces.unholy &&results[x].includes("Shard of Zed") && results[x].includes("Shard of Dyz") && results[x].includes("Shard of Oth")) {
      // Unholy Set
      score += setScores['Unholy']
    }
    //console.log(results[x] + ": " + score);
    
    scores.push({"set": results[x], "score": score});
  }
  let gemList = []
  scores = scores.sort((a, b) => (a.score < b.score ? 1 : -1));
  const gemEffects = buildDomEffectList(scores[0].set.split(","), player, gemList, setPieces);
  itemSet.effectList = itemSet.effectList.concat(gemEffects)
  itemSet.domGemList = gemList;
  return 0;

}


function buildDomEffectList(domGems, player, gemList, setPieces) {
  const effects = []
  domGems.forEach(gem => {
    const gemRank = player.getDominationSingleRank(gem)
    const effect = {
      type: "domination gem",
      name: gem,
      rank: gemRank,
    };
    effects.push(effect);
    const gemData = dominationGemDB.filter(gemDB => {
      return gemDB.effect.name === gem && gemDB.effect.rank == gemRank;
    });
    if (gemData.length > 0) gemList.push(gemData[0].gemID);
  });
  if (setPieces.blood && domGems.includes("Shard of Jas") && domGems.includes("Shard of Bek") && domGems.includes("Shard of Rev")) {
    const effect = {
      type: "domination gem",
      name: "Blood Link",
      rank: player.getDominationSetRank("Blood"),
    };
    effects.push(effect);
  }
  else if (setPieces.frost && domGems.includes("Shard of Kyr") && domGems.includes("Shard of Cor") && domGems.includes("Shard of Tel")) {
    const effect = {
      type: "domination gem",
      name: "Winds of Winter",
      rank: player.getDominationSetRank("Frost"),
    };
    effects.push(effect);
  }
  else if (setPieces.unholy && domGems.includes("Shard of Zed") && domGems.includes("Shard of Dyz") && domGems.includes("Shard of Oth")) {
    const effect = {
      type: "domination gem",
      name: "Chaos Bane",
      rank: player.getDominationSetRank("Unholy"),
    };
    effects.push(effect);
  }
  return effects;
}

function buildDifferential(itemSet, primeSet, player, contentType) {
  let doubleSlot = {};
  const primeList = primeSet.itemList;
  const diffList = itemSet.itemList;
  let differentials = {
    items: [],
    scoreDifference: (Math.round(primeSet.hardScore - itemSet.hardScore) / primeSet.hardScore) * 100,
    rawDifference: Math.round((itemSet.hardScore - primeSet.hardScore) / player.getInt(contentType) * player.getHPS(contentType)),
  };

  for (var x = 0; x < primeList.length; x++) {
    if (primeList[x].uniqueHash !== diffList[x].uniqueHash) {    
      differentials.items.push(diffList[x]);
      doubleSlot[diffList[x].slot] = (doubleSlot[diffList[x].slot] || 0) + 1;

      if ((x === 13 || x === 11) && doubleSlot[diffList[x].slot] <= 1) {
        differentials.items.push(diffList[x-1]);
      }
      
    }
  }
  return differentials;
}

function pruneItems(itemSets) {
  let temp = itemSets.filter(function (set) {
    return set.verifySet();
  });

  return temp.slice(0, softSlice);
}

function sumScore(obj) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

// A true evaluation function on a set.
function evalSet(itemSet, player, contentType, baseHPS, userSettings, castModel) {
  // Get Base Stats
  let builtSet = itemSet.compileStats("Retail", userSettings);
  let setStats = builtSet.setStats;
  let hardScore = 0;

  //console.log(itemSet);

  let enchants = {};

  let bonus_stats = {
    intellect: 0,
    haste: 0,
    crit: 0,
    versatility: 0,
    mastery: 0,//STATPERONEPERCENT.MASTERYA[player.spec] * BASESTAT.MASTERY[player.spec] * 100,
    leech: 0,
    hps: 0,
    dps: 0,
  };

  let adjusted_weights = {
    intellect: 1,
    haste: castModel.baseStatWeights["haste"],
    crit: castModel.baseStatWeights["crit"],
    mastery: castModel.baseStatWeights["mastery"],
    versatility: castModel.baseStatWeights["versatility"],
    leech: castModel.baseStatWeights["leech"],
  };
  //console.log("Weights Before: " + JSON.stringify(adjusted_weights));

  //console.log("Weights After: " + JSON.stringify(adjusted_weights));

  // Apply consumables if ticked.

  // Apply Enchants & Gems

  // Rings - Best secondary.
  // We use the players highest stat weight here. Using the adjusted weight could be more accurate, but the difference is likely to be the smallest fraction of a
  // single percentage. The stress this could cause a player is likely not worth the optimization.
  let highestWeight = getHighestWeight(castModel);
  bonus_stats[highestWeight] += 32; // 16 x 2.
  enchants["Finger"] = "+16 " + highestWeight;

  // Bracers
  bonus_stats.intellect += 15;
  enchants["Wrist"] = "+15 int";

  // Chest
  // TODO: Add the mana enchant. In practice they are very similar.
  bonus_stats.intellect += 30;
  enchants["Chest"] = "+30 stats";

  // Cape
  bonus_stats.leech += 30;
  enchants["Back"] = "+30 leech";

  // Weapon - Celestial Guidance
  // Eternal Grace is so poor right now that I don't even think it deserves inclusion.
  let expected_uptime = convertPPMToUptime(3, 10);
  bonus_stats.intellect += (setStats.intellect + bonus_stats.intellect) * 0.05 * expected_uptime;
  enchants["CombinedWeapon"] = "Celestial Guidance";

  // 5% int boost for wearing the same items.
  // The system doesn't actually allow you to add items of different armor types so this is always on.
  bonus_stats.intellect += (builtSet.setStats.intellect + bonus_stats.intellect) * 0.05;

  // Sockets
  bonus_stats[highestWeight] += 16 * builtSet.setSockets;
  enchants["Gems"] = highestWeight;

  // This might change later, but is a way to estimate the value of a domination socket on a piece in the Upgrade Finder.
  //if (userSettings.dominationSockets === "Upgrade Finder") bonus_stats.hps += builtSet.domSockets * 350;
  compileStats(setStats, bonus_stats); // Add the base stats on our gear together with enchants & gems.

  if (userSettings.replaceDomGems) buildBestDomSet(itemSet, player, castModel, contentType, itemSet.domSockets);
  //itemSet.effectList = itemSet.effectList.concat(domList);
  console.log(itemSet.effectList);
  // Handle Effects
  let effectStats = [];
  effectStats.push(bonus_stats);
  for (var x = 0; x < itemSet.effectList.length; x++) {
    effectStats.push(getEffectValue(itemSet.effectList[x], player, castModel, contentType, itemSet.effectList[x].level, userSettings, "Retail", setStats));
  }
  //bonus_stats = mergeBonusStats(effectStats);
  setStats = compileStats(setStats, mergeBonusStats(effectStats));
  
  applyDiminishingReturns(setStats); // Apply Diminishing returns to our haul.
  // Apply soft DR formula to stats, as the more we get of any stat the weaker it becomes relative to our other stats. 
  adjusted_weights.haste = (adjusted_weights.haste + adjusted_weights.haste * (1 - (DR_CONST * setStats.haste) / STATPERONEPERCENT.Retail.HASTE)) / 2;
  adjusted_weights.crit = (adjusted_weights.crit + adjusted_weights.crit * (1 - (DR_CONST * setStats.crit) / STATPERONEPERCENT.Retail.CRIT)) / 2;
  adjusted_weights.versatility = (adjusted_weights.versatility + adjusted_weights.versatility * (1 - (DR_CONST * setStats.versatility) / STATPERONEPERCENT.Retail.VERSATILITY)) / 2;
  adjusted_weights.mastery = (adjusted_weights.mastery + adjusted_weights.mastery * (1 - (DR_CONST * setStats.mastery) / STATPERONEPERCENT.Retail.MASTERYA[player.spec])) / 2;
  adjusted_weights.leech = (adjusted_weights.leech + adjusted_weights.leech * (1 - (DR_CONSTLEECH * setStats.leech) / STATPERONEPERCENT.Retail.LEECH)) / 2;
  addBaseStats(setStats, player.spec); // Add our base stats, which are immune to DR. This includes our base 5% crit, and whatever base mastery our spec has.
  
  // Calculate a hard score using the rebalanced stat weights.

  for (var stat in setStats) {
    if (stat === "hps") {
      hardScore += (setStats[stat] / baseHPS) * player.activeStats.intellect;
    } else if (stat === "dps") {
        if (contentType === "Dungeon") hardScore += (setStats[stat] / baseHPS) * player.activeStats.intellect;
        else continue;
    } else {
      hardScore += setStats[stat] * adjusted_weights[stat];
    }
  }

  builtSet.hardScore = Math.round(1000 * hardScore) / 1000;
  builtSet.setStats = setStats;
  builtSet.enchantBreakdown = enchants;
  //console.log(builtSet);
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
      haste: mergeStat(stats, 'haste'),
      crit: mergeStat(stats, 'crit'),
      mastery: mergeStat(stats, 'mastery'),
      versatility: mergeStat(stats, 'versatility'),
      leech: mergeStat(stats, 'leech'),
      hps: (mergeStat(stats, 'hps') + mergeStat(stats, 'HPS')),
      dps: mergeStat(stats, 'dps'),
    }

  return val;

}

//
function getHighestWeight(castModel) {
  let max = "";
  let maxValue = 0;
  let weights = castModel.getBaseStatWeights();

  for (var stat in weights) {
    if (weights[stat] > maxValue && ["crit", "haste", "mastery", "versatility"].includes(stat)) {
      max = stat;
      maxValue = weights[stat];
    }
  }

  return max;
}

// Compiles stats & bonus stats into one array to which we can then apply DR etc. 
function compileStats(stats, bonus_stats) {

  for (var stat in stats) {
    stats[stat] += stat in bonus_stats ? bonus_stats[stat] : 0;
  }

  return stats
  
}

function addBaseStats(stats, spec) {
  stats.crit += 175;
  stats.mastery += STATPERONEPERCENT.Retail.MASTERYA[spec] * BASESTAT.MASTERY[spec] * 100;

  return stats;

}

export function applyDiminishingReturns(stats) {
  //console.log("Stats Pre-DR" + JSON.stringify(stats));
  
  for (const [key, value] of Object.entries(stats)) {
    if (["crit", "haste", "mastery", "versatility", "leech"].includes(key)) {

      const DRBreakpoints = STATDIMINISHINGRETURNS[key.toUpperCase()];
  
      const baseStat = stats[key];
      for (var j = 0; j < DRBreakpoints.length; j++) {
        stats[key] -= Math.max((baseStat - DRBreakpoints[j]) * 0.1, 0);
      }
    } 
  }
    
  return stats;

}


const deepCopyFunction = (inObject) => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};
