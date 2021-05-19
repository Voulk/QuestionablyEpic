import ItemSet from "./ItemSet";
import TopGearResult from "./TopGearResult";
import Item from "../Player/Item";
import React, { useState, useEffect } from "react";
import { STATPERONEPERCENT, BASESTAT, STATDIMINISHINGRETURNS } from "../../Engine/STAT";
import { CONSTRAINTS } from "../../Engine/CONSTRAINTS";
import { getBestGem } from "../../Engine/ItemUtilities";
import { convertPPMToUptime } from "../../../Retail/Engine/EffectFormulas/EffectUtilities";
import BCPlayer from "../Player/BCPlayer";
import CastModel from "../Player/CastModel";
import { getEffectValue } from "../../../Retail/Engine/EffectFormulas/EffectEngine"
import { compileStats, buildDifferential, pruneItems, sumScore, deepCopyFunction } from "./TopGearEngineShared"
import { getItemSet } from "BurningCrusade/Databases/ItemSetsDB"


// Most of our sets will fall into a bucket where totalling the individual stats is enough to tell us they aren't viable. By slicing these out in a preliminary phase,
// we can run our full algorithm on far fewer items. The net benefit to the player is being able to include more items, with a quicker return.
// This does run into some problems when it comes to set bonuses and could be re-evaluated at the time. The likely strat is to auto-include anything with a bonus, or to run
// our set bonus algorithm before we sort and slice. There are no current set bonuses that are relevant to raid / dungeon so left as a thought experiment for now.
const softSlice = 3000;
const DR_CONST = 0.00196669230769231;
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

  let newPlayer = new BCPlayer(player.charName, player.spec, player.charID, player.region, player.realm, player.race, player.statWeights);
  //newPlayer = Object.assign(newPlayer, player);

  //newPlayer.castModel[contentType] = new CastModel(newPlayer.getSpec(), contentType);
  //newPlayer.castModel[contentType] = Object.assign(newPlayer.castModel[contentType], castModel);
  return newPlayer;
}

export function runTopGearBC(rawItemList, wepCombos, player, contentType, baseHPS, currentLanguage, userSettings, castModel) {
    console.log("TOP GEAR BC");
    console.log("WEP COMBOS: " + JSON.stringify(wepCombos));
    //console.log("CL::::" + currentLanguage);
    var t0 = performance.now();
    // console.log("Running Top Gear");
    let count = 0;

    const newPlayer = setupPlayer(player, contentType, castModel);
    let itemList = deepCopyFunction(rawItemList); // Here we duplicate the users items so that nothing is changed during the process. 
    itemList = userSettings.autoSocket ? autoSocketItems(itemList) : itemList;

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
    itemSets[i] = evalSet(itemSets[i], newPlayer, contentType, baseHPS, userSettings);
  }
  itemSets = pruneItems(itemSets);

  itemSets.sort((a, b) => (a.hardScore < b.hardScore ? 1 : -1));

  

  // ----

  var t1 = performance.now();
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds with count ")

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
    console.log(result);
    return result;
  }
}

// This holds all of our gemCollection objects, so that we can sort them later and pick the best.
const gemSets = []
let performanceTrack = 0

// This represents an individual collection of socketed items. 

export function checkSocketBonus(socketsAvailable, socketedGems) {
  let match = true;
  for (var i = 0; i < socketsAvailable.length; i++) {
    if (socketsAvailable[i] === "blue" && (socketedGems[i] !== "blue" && socketedGems[i] !== "purple" && socketedGems[i] !== "green")) match = false;
    else if (socketsAvailable[i] === "red" && (socketedGems[i] !== "red" && socketedGems[i] !== "purple" && socketedGems[i] !== "orange")) match = false;
    else if (socketsAvailable[i] === "yellow" && (socketedGems[i] !== "yellow" && socketedGems[i] !== "green" && socketedGems[i] !== "orange")) match = false;
  }
  /*
  console.log("Checking for Socket Bonus")
  console.log(socketedGems);
  console.log(socketsAvailable);
  console.log("Match: " + match);

  */
  return match;

}

// Get highest value of each gem color. 
// Compare value of socketing highest matching colors + socket bonus, to just socketing highest colors.
export function socketItem(sockets, player, socketList, forcedGems = {} /*{4: 'blue', 6: 'blue', 8: 'yellow', 9: 'yellow'} */) {
  
  let numSocketed = socketList.numSocketed;
  const socketsAvailable = sockets.gems;

  if (!socketsAvailable) {
    socketList.socketedPieces.push([]);
    socketList.socketedColors.push([]);
    return socketList;
  }

  const bestGems = {
    overall: getBestGem(player, "all"),
    red: getBestGem(player, "red"),
    blue: getBestGem(player, "blue"),
    yellow: getBestGem(player, "yellow"),
  }

  let socketBonus = 0
  if (sockets.bonus) {
    for (const [stat, value] of Object.entries(sockets.bonus)) {
      //console.log("Stat: " + stat + ". Value: " + value);
      socketBonus += value * player.getStatWeight("Raid", stat);
    }
  }

  let colorMatch = {gems: [], colors: [], score: 0};
  let socketBest = {gems: [], colors: [], score: 0};
  var r0 = performance.now();
  for (var i = 0; i < socketsAvailable.length; i++) {
    const socket = socketsAvailable[i];
    // Match colors
    if (['red', 'blue', 'yellow'].includes(socket)) {
      if (Object.keys(forcedGems).includes(numSocketed.toString())) {
        const color = forcedGems[numSocketed];
        //console.log("Forcing color on key: " + numSocketed + ". " + forcedGems[numSocketed])

        colorMatch['score'] += bestGems[color].score;
        colorMatch['gems'].push(bestGems[color].name);
        colorMatch['colors'].push(bestGems[color].color);
  
        socketBest['score'] += bestGems[color].score;
        socketBest['gems'].push(bestGems[color].name);
        socketBest['colors'].push(bestGems[color].color);

      }
      else {
        colorMatch['score'] += bestGems[socket].score;
        colorMatch['gems'].push(bestGems[socket].name);
        colorMatch['colors'].push(bestGems[socket].color);

        socketBest['score'] += bestGems['overall'].score;
        socketBest['gems'].push(bestGems['overall'].name);
        socketBest['colors'].push(bestGems['overall'].color);
      }
      numSocketed += 1;
    }
  }
  var r1 = performance.now();
  performanceTrack += (r1 - r0)

  // Check socket bonus
  colorMatch.score += checkSocketBonus(socketsAvailable, colorMatch.colors) ? socketBonus : 0;
  socketBest.score += checkSocketBonus(socketsAvailable, socketBest.colors) ? socketBonus : 0;

  socketList.numSocketed = numSocketed;

  

  if (colorMatch.score >= socketBest.score) {
    // Matching the colors is ideal.
    //console.log("Matching colors is ideal" + JSON.stringify(colorMatch.gems))
    socketList.score = socketList.score + colorMatch.score;
    socketList.socketedPieces.push(colorMatch.gems);
    socketList.socketedColors.push(colorMatch.colors);

    return socketList;
  }
  else  {
    //console.log("Full Red" + JSON.stringify(socketBest.gems))
    socketList.score = socketList.score + socketBest.score;
    socketList.socketedPieces.push(socketBest.gems);
    socketList.socketedColors.push(socketBest.colors);


    return socketList;
  }

  

}

function checkMeta(colorCount) {
  if (colorCount.red >= 2 && colorCount.yellow >= 2 && colorCount.blue >= 2) {
    return true;
  }
  else {
    return false;
  }

}

let bigCount = 0;
let bigCount2 = 0;

function callManyTimes(maxIndices, func, gc, player) {
  doCallManyTimes(maxIndices, func, gc,player,  [], 0);
}

function doCallManyTimes(maxIndices, func, gc, player, args, index) {
  if (maxIndices.length == 0) {
      func(args, gc, player);
  } else {
      var rest = maxIndices.slice(1);
      for (args[index] = 0; args[index] < maxIndices[0]; ++args[index]) {
          doCallManyTimes(rest, func, gc, player, args, index + 1);
      }
  }
}

function counter(args, gc, player) {
  //console.log("Counting");
  if (new Set(args).size === args.length && args[1] > args[0] && args[3] > args[2]) {
    //console.log(args[0] + " " + args[1] + " " + args[2]);
    let forcedGems = {}
    forcedGems[args[0]] = 'blue';
    forcedGems[args[1]] = 'blue';
    forcedGems[args[2]] = 'yellow';
    forcedGems[args[3]] = 'yellow';
    //console.log(JSON.stringify(forcedGems));
    let localgc = {...gc}
    for (const i in localgc.socketsAvailable) {
      localgc = socketItem(localgc.socketsAvailable[i], player, localgc, forcedGems);
    }

    bigCount += 1;
  }
  bigCount2 += 1;
 
}

export function gemGear(itemSet, player) {
  console.log("Gemming Gear");
  //const locallyOptimal = 0;
  const metaSocketed = 0;
  const metaGems = ["Insightful Earthstorm Diamond"];

  // Create a GemCollection.
  const gemCollection = {
    score: 0,
    socketedPieces: [],
    socketedColors: [],
    socketsAvailable: [],
    colorCount: {},
    metaGem: false,
    numSocketed: 0,
  }

  itemSet.forEach(item => {
    gemCollection.socketsAvailable.push('sockets' in item ? item.sockets : []);
    if ("sockets" in item && item.sockets.gems !== undefined && item.sockets.gems.includes("meta")) gemCollection.metaGem = true;
  });


  // Gem locally optimal
  let locallyOptimal = {...gemCollection};
  for (const i in locallyOptimal.socketsAvailable) {
    locallyOptimal = socketItem(locallyOptimal.socketsAvailable[i], player, locallyOptimal);
  }


  // Check if meta gem fulfilled.
  const flatColors = locallyOptimal.socketedColors.flat();
  locallyOptimal.colorCount = {
    blue: flatColors.filter(function(x){ return x === "blue" || x === "purple" || x === "green"; }).length,
    red: flatColors.filter(function(x){ return x === "red" || x === "orange" || x === "purple"; }).length,
    yellow: flatColors.filter(function(x){ return x === "yellow" || x === "orange" || x === "green"; }).length,
  }

  // Check if player even has enough sockets for the meta gem.

  console.log(locallyOptimal);
  if (checkMeta(locallyOptimal.colorCount)) {
    console.log("Search Complete. Gems done.");
  }
  else {
      // If not meta gem fulfilled, try the missing gems in each socket trying to find the slots that minimize the score loss.
      // Pick the highest set out of locally optimal and meta gem.

      callManyTimes([locallyOptimal.socketsAvailable.length, locallyOptimal.socketsAvailable.length, locallyOptimal.socketsAvailable.length, locallyOptimal.socketsAvailable.length], counter, locallyOptimal, player)
      console.log("BIG COUNT: " + bigCount);
      console.log("BIG COUNT2: " + bigCount2);
      console.log("Average loop cost: " + Math.round(performanceTrack / bigCount*1000)/1000);


      // First gem replacement

      /*
      let count = 2730;
      for (var i = 0; i < locallyOptimal.socketsAvailable.length; i++) {
        // Second gem replacement.
        for (var j = 0; j < locallyOptimal.socketsAvailable.length; j++) {

          for (var k = 0; k < locallyOptimal.socketsAvailable.length; k++) {
            if (i !== j && i !== k && j !== k) {
              count += 1;
            }
          }
        }
      }
      console.log("Count: " + count);
      */

  }
}

// A true evaluation function on a set.
// THIS IS BURNING CRUSADE CODE AND IS NOT COMPATIBLE WITH RETAIL.
function evalSet(itemSet, player, contentType, baseHPS, userSettings) {
    // Get Base Stats
    let builtSet = itemSet.compileStats("BurningCrusade");
    let setStats = builtSet.setStats;
    let hardScore = 0;
    const setBonuses = builtSet.sets;
    let effectList = [...itemSet.effectList]
  
    // --- Item Set Bonuses ---
    for (const set in setBonuses) {
      if (setBonuses[set] > 1) {
        effectList = effectList.concat(getItemSet(set, setBonuses[set]));
      }
    }

    let enchants = {};
  
    let bonus_stats = {
        intellect: 0,
        bonushealing: 0,
        spirit: 0,
        crit: 0,
        stamina: 0,
        mp5: 0,
        haste: 0,
    };
  
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

  
    // Apply consumables if ticked.
  
    // -- ENCHANTS --
    /*
    let highestWeight = getHighestWeight(player, contentType);
    bonus_stats[highestWeight] += 32; // 16 x 2.
    enchants["Finger"] = "+16 " + highestWeight;
    */

    // -- SOCKETS --
    
    var s0 = performance.now();
    const optimalGems = gemGear(builtSet.itemList, player)
    var s1 = performance.now();
    console.log("Gems took " + (s1 - s0) + " milliseconds with count ")
  
    // -- Effects --
    let effectStats = [];
    effectStats.push(bonus_stats);
    for (var x = 0; x < effectList.length; x++) {
      
      effectStats.push(getEffectValue(effectList[x], player, contentType, effectList[x].level, userSettings, "BurningCrusade"));
  
    }
    bonus_stats = mergeBonusStats(effectStats);
    
  
    compileStats(setStats, bonus_stats); // Add the base stats on our gear together with enchants & gems.
    //applyDiminishingReturns(setStats); // Apply Diminishing returns to our haul.
    addBaseStats(setStats, player.spec); // Add our base stats, which are immune to DR. This includes our base 5% crit, and whatever base mastery our spec has.
  

    for (var stat in setStats) {
      if (stat === "hps") {
        //hardScore += (setStats[stat] / baseHPS) * player.activeStats.intellect;
      } else if (stat === "dps") {
        continue;
      } else {
        hardScore += setStats[stat] * player.statWeights["Raid"][stat];
        //console.log("Adding " + (setStats[stat] * player.statWeights["Raid"][stat]) + " to hardscore for stat " + stat + " with stat weight: " + player.statWeights["Raid"][stat]);
      }
    }
  
    //console.log(JSON.stringify(setStats));
    //console.log("Soft Score: " + builtSet.sumSoftScore + ". Hard Score: " + hardScore);
    //console.log("Enchants: " + JSON.stringify(enchants));
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
        bonushealing: mergeStat(stats, 'bonushealing'),
        spirit: mergeStat(stats, 'spirit'),
        crit: mergeStat(stats, 'crit'),
        stamina: mergeStat(stats, 'stamina'),
        mp5: mergeStat(stats, 'mp5'),
        haste: mergeStat(stats, 'haste'),
      }
  
    return val;
  
  }

function addBaseStats(stats, spec) {
    stats.crit += 175;
  
    return stats;
  
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

  //console.log(JSON.stringify(slotLengths));
  // console.log(splitItems.Finger);

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
                                    itemSets.push(new ItemSet(setCount, includedItems, sumSoft, "BurningCrusade"));
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

