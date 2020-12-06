import ItemSet from './ItemSet';
import Item from "../Player/Item";
import React, { useState, useEffect } from "react";
import {STATPERONEPERCENT} from "../Engine/STAT";
import {convertPPMToUptime} from "../Engine/EffectFormulas/EffectUtilities";
// Most of our sets will fall into a bucket where totalling the individual stats is enough to tell us they aren't viable. By slicing these out in a preliminary phase,
// we can run our full algorithm on far fewer items. The net benefit to the player is being able to include more items, with a quicker return.
// This does run into some problems when it comes to set bonuses and could be re-evaluated at the time. The likely strat is to auto-include anything with a bonus, or to run
// our set bonus algorithm before we sort and slice. There are no current set bonuses that are relevant to raid / dungeon so left as a thought experiment for now.
const softSlice = 1000 ; // TODO. Adjust to 1000 for prod. Being tested at lower values.
const DR_CONST = 0.00968569230769231;

// block for `time` ms, then return the number of loops we could run in that time:
export function expensive(time) {
    let start = Date.now(),
        count = 0
    while (Date.now() - start < time) count++
    return count
}


export function runTopGear(itemList, player, contentType) {
    
    var t0 = performance.now()
    console.log("Running Top Gear");

    let itemSets = createSets(itemList);
    itemSets.sort((a, b) => (a.sumSoftScore < b.sumSoftScore ? 1 : -1));
    itemSets = pruneItems(itemSets);
    
    for (var i = 0; i < itemSets.length; i++) {
        itemSets[i] = evalSet(itemSets[i], player, contentType);
   
    }

    itemSets.sort((a, b) => (a.hardScore < b.hardScore ? 1 : -1));

    // TEST LOOP ONLY FOR CONSOLE PRINTS.
    for (var i = 0; i < itemSets.length; i++) {
        
        console.log("ID: " + itemSets[i].id + ". Soft: " + itemSets[i].sumSoftScore + ". Hard: " + itemSets[i].hardScore);
        //itemSets[i].printSet();
        //console.log("====================");
   
    }

    // ----

    var t1 = performance.now()
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds with count ")
    itemSets[0].printSet()
    return itemSets[0];

}

function createSets(itemList) {
    let setCount = 0;
    let itemSets = [];
    let slotLengths = {
        "Head": 0,
        "Neck": 0,
        "Shoulder": 0,
        "Back": 0,
        "Chest": 0,
        "Wrist": 0,
        "Hands": 0,
        "Waist": 0,
        "Legs": 0,
        "Feet": 0,
        "Finger": 0,
        "Trinket": 0,
        "Weapon" : 0,
    }

    let splitItems = {
        "Head": [],
        "Neck": [],
        "Shoulder": [],
        "Back": [],
        "Chest": [],
        "Wrist": [],
        "Hands": [],
        "Waist": [],
        "Legs": [],
        "Feet": [],
        "Finger": [],
        "Trinket": [],
        "Weapon" : [],
    }

    for (var i = 0; i < itemList.length; i++) {
        let slot = itemList[i].slot;
        if (slot in slotLengths) {
            slotLengths[slot] += 1;
            splitItems[slot].push(itemList[i]);
        }
    }

    //console.log(JSON.stringify(slotLengths));

    for (var head = 0; head < slotLengths.Head; head++ ) {
        let softScore = {'head': splitItems.Head[head].softScore};
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

                                            for (var finger = 1; finger < slotLengths.Finger; finger++) {
                                                softScore.finger = splitItems.Finger[finger].softScore;
                                                softScore.finger2 = splitItems.Finger[finger-1].softScore;

                                                for (var trinket = 1; trinket < slotLengths.Trinket; trinket++) {
                                                    softScore.trinket = splitItems.Trinket[trinket].softScore;
                                                    softScore.trinket2 = splitItems.Trinket[trinket-1].softScore;

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
                                                        splitItems.Finger[finger-1],
                                                        splitItems.Trinket[trinket],
                                                        splitItems.Trinket[trinket-1],
    
                                                    ];
                                                    let sumSoft = sumScore(softScore);
                                                    itemSets.push(new ItemSet(setCount, includedItems, sumSoft))
                                                    setCount ++;

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

    console.log("Created " + itemSets.length + " item sets.");
    return itemSets;
}


function pruneItems(itemSets) {
    return itemSets.slice(0, softSlice);

}

function sumScore(obj) {
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
      }
    }
    return sum;
} 


// A true evaluation function on a set. 
function evalSet(itemSet, player, contentType) {
    // Get Base Stats
    let builtSet = itemSet.compileStats();
    let setStats = builtSet.setStats;
    let hardScore = 0;

    // We might display this as data somewhere in future, but it's for testing purposes right now. 
    let enchant_test_breakdown = {

    }

    let bonus_stats = {
       intellect: 0,
       haste: 0,
       crit: 0,
       versatility: 0,
       leech: 0,
       hps: 0,
       dps: 0,
    }

    let adjusted_weights = {
        intellect: 1,
        haste: player.statWeights[contentType]['haste'],
        crit: player.statWeights[contentType]['crit'],
        mastery: player.statWeights[contentType]['mastery'],
        versatility: player.statWeights[contentType]['versatility'],
        leech: player.statWeights[contentType]['leech'],
    }
    //console.log("Weights Before: " + JSON.stringify(adjusted_weights));

    adjusted_weights.haste = (adjusted_weights.haste + (adjusted_weights.haste * (1 - DR_CONST * setStats.haste / STATPERONEPERCENT.HASTE))) / 2;
    adjusted_weights.crit = (adjusted_weights.crit + (adjusted_weights.crit * (1 - DR_CONST * setStats.crit / STATPERONEPERCENT.CRIT))) / 2;
    adjusted_weights.versatility = (adjusted_weights.versatility + (adjusted_weights.versatility * (1 - DR_CONST * setStats.versatility / STATPERONEPERCENT.VERSATILITY))) / 2;
    //adjusted_weights.mastery = (adjusted_weights.mastery + (adjusted_weights.mastery * (1 - DR_CONST * setStats.mastery / STATPERONEPERCENT.MASTERY[player.spec]))) / 2;
    // TODO: Leech, which has a DR larger than secondary stats. 
    //console.log("Weights After: " + JSON.stringify(adjusted_weights));

    // Apply consumables if ticked.


    // Apply Enchants & Gems


    // Rings - Best secondary.
    let highestWeight = getHighestWeight(player, contentType);
    bonus_stats[highestWeight] += 32; // 16 x 2.

    // Bracers
    bonus_stats.intellect += 15;

    // Chest
    bonus_stats.intellect += 30;

    // Cape
    bonus_stats.leech += 20;

    // Weapon - Celestial Guidance
    let expected_uptime = convertPPMToUptime(3, 10);
    bonus_stats.intellect = (setStats.intellect + bonus_stats.intellect) * 0.05 * expected_uptime;

    // 5% int boost for wearing the same items.
    // The system doesn't actually allow you to add items of different armor types so this is always on.
    //bonus_stats.intellect += (builtSet.setStats.intellect + bonus_stats.intellect) * 0.05; //TODO: Renable.

    // Take care of some stat weight rebalancing.
    // TODO: Explain this better.



    // Calculate a hard score using the rebalanced stat weights.
    for (var stat in setStats) {
        if (stat === "hps") {
            /*score +=
            (item.stats.bonus_stats.hps / player.getHPS()) *
            player.activeStats.intellect; */
            hardScore += setStats[stat] / player.fightInfo.hps * player.activeStats.intellect;
            
        }
        else if (stat === "dps") {
            continue;
        }
        else {
            hardScore += (setStats[stat] + (stat in bonus_stats ? bonus_stats[stat] : 0)) * adjusted_weights[stat];
            //console.log(setStats[stat] + " stat: " + stat + " adds " + setStats[stat] * adjusted_weights[stat] + " to score.");
          }
        }

    //console.log("Soft Score: " + builtSet.sumSoftScore + ". Hard Score: " + hardScore);
    builtSet.hardScore = Math.round(1000*hardScore)/1000;
    return builtSet; // Temp
}


//
function getHighestWeight(player, contentType) {
    let max = "";
    let maxValue = 0;
    let weights = player.statWeights[contentType]

    for (var stat in weights) {
        if (weights[stat] > maxValue && ['crit', 'haste', 'mastery', 'versatility'].includes(stat)) { max = stat; maxValue = weights[stat] };
    }

    return max;

}