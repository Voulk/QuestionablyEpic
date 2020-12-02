
// Represents a full set of items. 

import Item from "../Player/Item";

class ItemSet {
    constructor(id, itemList, sumSoft) {
        this.id = id;
        this.itemList = itemList;
        this.sumSoftScore = sumSoft;
    }

    id = 0;
    sumSoftScore = 0;
    itemList = [];

    bonus_stats = {

    }

    printSet() {
        for (var i = 0; i < this.itemList.length; i++) {
            console.log("Slot: " + this.itemList[i].slot + "ID: " + this.itemList[i].id + ". Effect: " + this.itemList[i].effect.name)
        }

    }

    

}

export default ItemSet;