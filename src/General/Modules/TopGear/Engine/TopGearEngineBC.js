import ItemSet from "../ItemSet";
import TopGearResult from "./TopGearResult";
import Item from "../../Player/Item";
import React, { useState, useEffect } from "react";
import { STATPERONEPERCENT, BASESTAT, STATDIMINISHINGRETURNS } from "../../../Engine/STAT";
import { CONSTRAINTS } from "../../../Engine/CONSTRAINTS";

import { gemGear, getGemStatLoadout } from "../Utilities/GemUtilities";
import { convertPPMToUptime } from "../../../../Retail/Engine/EffectFormulas/EffectUtilities";
import ClassicPlayer from "../../Player/ClassicPlayer";
import CastModel from "../../Player/CastModel";
import { getEffectValue } from "../../../../Retail/Engine/EffectFormulas/EffectEngine"
import { compileStats, buildDifferential, pruneItems, sumScore, deepCopyFunction } from "./TopGearEngineShared"
import { getItemSet } from "Classic/Databases/ItemSetsDB"


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

export function runTopGearBC(rawItemList, wepCombos, player, contentType, baseHPS, currentLanguage, userSettings, castModel) {
    console.log("TOP GEAR Classic");
    //console.log("WEP COMBOS: " + JSON.stringify(wepCombos));
    //console.log("CL::::" + currentLanguage);
    var t0 = performance.now();
    let count = 0;

    const newPlayer = setupPlayer(player, contentType, castModel);
    let itemList = deepCopyFunction(rawItemList); // Here we duplicate the users items so that nothing is changed during the process. 
    //itemList = userSettings.autoSocket ? autoSocketItems(itemList) : itemList;

    let itemSets = createSets(itemList, wepCombos);

    itemSets.sort((a, b) => (a.sumSoftScore < b.sumSoftScore ? 1 : -1));
    count = itemSets.length;
  console.log("Preparing to evaluate set");
  for (var i = 0; i < itemSets.length; i++) {
    itemSets[i] = evalSet(itemSets[i], newPlayer, contentType, baseHPS, userSettings);
  }
  itemSets = pruneItems(itemSets);

  itemSets.sort((a, b) => (a.hardScore < b.hardScore ? 1 : -1));

  // ----

  var t1 = performance.now();
  //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds with count ")

  // Build Differentials
  let differentials = [];
  let primeSet = itemSets[0];
  for (var i = 1; i < Math.min(CONSTRAINTS.Shared.topGearDifferentials+1, itemSets.length); i++) {
    differentials.push(buildDifferential(itemSets[i], primeSet, newPlayer, contentType));
  }
  console.log("Finished differentials");
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



// A true evaluation function on a set.
// THIS IS CLASSIC CODE AND IS NOT COMPATIBLE WITH RETAIL.
function evalSet(itemSet, player, contentType, baseHPS, userSettings) {
    // Get Base Stats
    let builtSet = itemSet.compileStats("Classic");
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
    let talent_stats = {
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
   let adjusted_weights = {...player.statWeights["Raid"]}
    // Mana Profiles
    if (userSettings.manaProfile === "Conservative") {
      adjusted_weights['mp5'] = adjusted_weights['mp5'] * 1.2;
      adjusted_weights['intellect'] = adjusted_weights['intellect'] * 1.16;
      adjusted_weights['spirit'] = adjusted_weights['spirit'] * 1.2;
    }
    else if (userSettings.manaProfile === "Max Healing") {
      adjusted_weights['mp5'] = adjusted_weights['mp5'] * 0.75;
      adjusted_weights['intellect'] = adjusted_weights['intellect'] * 0.85;
      adjusted_weights['spirit'] = adjusted_weights['spirit'] * 0.75;
    }
  
    // Apply consumables if ticked.
    
    // -- ENCHANTS --

    if (userSettings.autoEnchant) {
      enchant_stats.spellpower += 30;
      enchant_stats.mp5 += 10;
      enchants['Head'] = "Arcanum of Blissful Mending" // Crit version also available.
  
      enchant_stats.spellpower += 24;
      enchant_stats.mp5 += 8;
      enchants['Shoulder'] = "Greater Inscription of the Crag" // Lesser version + crit versions available.
  
      enchant_stats.intellect += 10;
      enchant_stats.spirit += 10;
      enchants['Chest'] = "Powerful Stats" // TODO
  
      enchant_stats.haste += 30;
      enchants['Back'] = "Greater Speed" // Tailoring version available.

      enchant_stats.spellpower += 30;
      enchants['Wrist'] = "Superior Spellpower"
  
      enchant_stats.spellpower += 28;
      enchants['Hands'] = "Exceptional Spellpower"
  
      enchant_stats.spellpower += 50;
      enchant_stats.spirit += 20
      enchants['Legs'] = "Brilliant Spellthread"
  
      enchant_stats.stamina += 15;
      enchants['Feet'] = "Tuskarr's Vitality" // Spirit version available but not great.
  
      if ("profession" === "Enchanting") // todo 
      {
        enchant_stats.spellpower += (23 * 2); // Two finger slots.
        enchants['Finger'] = "Greater Spellpower"
      }
  
      enchant_stats.spellpower += 63;
      enchants['CombinedWeapon'] = "Mighty Spellpower"
    }

    // ----- SOCKETS -----
    /*
    if (userSettings.gemRarity !== "none") {
      var s0 = performance.now();
      const optimalGems = gemGear(builtSet.itemList, adjusted_weights, userSettings)
      //hardScore += optimalGems.score;
      builtSet.bcSockets = optimalGems;
      const gemStats = getGemStatLoadout(optimalGems.socketsAvailable, optimalGems.socketedPieces, optimalGems.socketedColors);
      compileStats(setStats, gemStats); //TODO
      builtSet.socketInformation = optimalGems;
      var s1 = performance.now();
    }
    */
    console.log("Early midd");
    
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
    else if (player.getSpec() === "Restoration Druid Classic") {
      // Also gets 30% of spirit MP5 as MP5
      talent_stats.spirit = (setStats.spirit) * 0.15;
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
      //console.log(effectList[x]);
      effectStats.push(getEffectValue(effectList[x], player, "", contentType, effectList[x].level, userSettings, "Classic", setStats));
  
    }
    bonus_stats = mergeBonusStats(effectStats);

    for (var stat in setStats) {
      if (stat === "hps") {
        hardScore += setStats[stat];
        //console.log("Adding HPS score of " + setStats[stat]);
      } else if (stat === "dps") {
        continue;
      } else {
        hardScore += setStats[stat] * adjusted_weights[stat];
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
        spelldamage: mergeStat(stats, 'spelldamage'),
        spirit: mergeStat(stats, 'spirit'),
        spellcrit: mergeStat(stats, 'spellcrit'),
        stamina: mergeStat(stats, 'stamina'),
        mp5: mergeStat(stats, 'mp5'),
        spellhaste: mergeStat(stats, 'spellhaste'),
      }
  
    return val;
  
  }

function addBaseStats(stats, race, spec) {

  const base_stats = classRaceStats[spec][race.replace("Races.", "")];

  for (const [key, value] of Object.entries(base_stats)) {
    stats[key] = stats[key] + value;
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
  return itemSets;
}

