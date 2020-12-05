
// Represents a full set of items. 

import Item from "../Player/Item";

class ItemSet {
    constructor(id, itemList, sumSoft) {
        this.id = id;
        this.itemList = itemList;
        this.sumSoftScore = sumSoft;
    }

    id = 0;

    // Each item already has a soft score which is a simple stat weight x stat equation. The sumSoftScore adds all of these up.
    // We can use the soft score to quickly eliminate item sets that aren't competitive. 
    // The hard score is a proper evaluation of the item set that includes diminishing returns, stats diminishing in relative value as you get more of them,
    // and optimal gemming. 
    sumSoftScore = 0; 
    hardScore = 0; 

    // A list of all items in the set. 
    itemList = [];

    // The sum stat breakdown of the items in the set.
    bonus_stats = {

    }

    // This is for testing purposes only. It will print every item in the collection to the console.
    printSet() {
        for (var i = 0; i < this.itemList.length; i++) {
            console.log("Slot: " + this.itemList[i].slot + "ID: " + this.itemList[i].id + ". Effect: " + this.itemList[i].effect.name)
        }

    }

    // Compiles the stats from the individual item list.
    compileStats() {

    }


    

}

export default ItemSet;