import {itemDB} from "../Player/ItemDB";
/*

The core Upgrade Finder loop is as follows:
- Run the players current gear set through our evaluation function to get a baseline score.
- Loop through the ItemDB and find all items that drop from raid, Mythic+, or PVP.
- For each item, build a set consisting of a players current item set + the item. 
- Run each set through our evaluation function. Store the score differential against the item.

- Print the items in the correct place along with their score differential. 
- (Extra Feature) Include a summary page that lists the largest score upgrades and where they come from. 



*/

export function runUpgradeFinder() {
    console.log("Running Upgrade Finder. Strap in.");
    const itemPoss = buildItemPossibilities();

}

function buildItemPossibilities() {
    let itemPoss = [];

    for (var i = 0; i < itemDB.length; i++) {
        const item = itemDB[i];
        if ("sources" in item) {
            itemPoss.push(item);
        }

    }

    console.log(itemPoss.length);

}