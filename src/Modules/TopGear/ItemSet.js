
// Represents a full set of items. 
import {getTranslatedItemName} from "../Engine/ItemUtilities";
import Item from "../Player/Item";

class ItemSet {
    constructor(id, itemList, sumSoft) {
        this.id = id;
        this.itemList = itemList;
        this.sumSoftScore = Math.round(1000*sumSoft)/1000;
    }

    id = 0;

    // Each item already has a soft score which is a simple stat weight x stat equation. The sumSoftScore adds all of these up.
    // We can use the soft score to quickly eliminate item sets that aren't competitive. 
    // The hard score is a proper evaluation of the item set that includes diminishing returns, stats diminishing in relative value as you get more of them,
    // and optimal gemming. 
    sumSoftScore = 0; 
    hardScore = 0; 
    sockets = 0;

    // A list of all items in the set. 
    itemList = [];

    // The sum stat breakdown of the items in the set.
    setStats = {

    }

    // This is for testing purposes only. It will print every item in the collection to the console.
    printSet() {
        console.log("Printing Set with ID: " + this.id + ". Soft score: " + this.sumSoftScore + " with stats: " + JSON.stringify(this.setStats));
        console.log("Sockets: " + this.setSockets);
        for (var i = 0; i < this.itemList.length; i++) {
            console.log(getTranslatedItemName(this.itemList[i].id, "en") + ". Soft: " + this.itemList[i].softScore + ". Crit: " + this.itemList[i].stats.crit)
        }

    }

    // Compiles the stats from the individual item list.
    compileStats() {
        //console.log("Compiling Stats for Item List of legnth: " + this.itemList.length);
        let setStats = {
            intellect: 450, // TODO: 450
            haste: 0,
            crit: 0,
            mastery: 0,
            versatility: 0,
            leech: 0,
            hps: 0,
            dps: 0,
        };
        let setSockets = 0;
        for (var i = 0; i < this.itemList.length; i++) {
            let item = this.itemList[i];        

            for (const [stat, value] of Object.entries(item.stats)) {            
               
                if (stat in setStats) {
                    setStats[stat] += value;  
                    //if (stat === "intellect") console.log("Adding Int: " + value) // Tester;
                    if (stat in item.stats["bonus_stats"]) setStats[stat] += item.stats["bonus_stats"][stat];
                }
            }

            if (item.socket) setSockets ++;
        }
        
        this.setStats = setStats;
        this.setSockets = setSockets;
        return this;
        

    }


    

}

export default ItemSet;