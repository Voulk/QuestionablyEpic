import ItemSet from './ItemSet';
import Item from "../Player/Item";
// Most of our sets will fall into a bucket where totalling the individual stats is enough to tell us they aren't viable. By slicing these out in a preliminary phase,
// we can run our full algorithm on far fewer items. The net benefit to the player is being able to include more items, with a quicker return.
// This does run into some problems when it comes to set bonuses and could be re-evaluated at the time. The likely strat is to auto-include anything with a bonus, or to run
// our set bonus algorithm before we sort and slice. There are no current set bonuses that are relevant to raid / dungeon so left as a thought experiment for now.
const softSlice = 2; // TODO. Adjust to 1000 for prod. Being tested at lower values.

export function runTopGear(player, contentType, itemList) {
    
    var t0 = performance.now()
    console.log("Running Top Gear");
    let count = 0;

    let itemSets = createSets(itemList);
    itemSets.sort((a, b) => (a.sumSoftScore < b.sumSoftScore ? 1 : -1));
    itemSets = pruneItems(itemSets);
    
    for (var i = 0; i < itemSets.length; i++) {
        console.log(itemSets[i].id + ": " + itemSets[i].sumSoftScore)
        itemSets[i].printSet();
        console.log("====================");
    }


    var t1 = performance.now()
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds with count " + count)

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