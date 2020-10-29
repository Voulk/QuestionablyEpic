
import { itemDB } from "../../Player/ItemDB";
import { getItemLevel } from "../ItemUtilities";

export function runSimC(simCInput) {
    
    var lines = simCInput.split('\n');

    // Reset the players currently stored items to empty arrays.
    // TODO

    // Check that the SimC string is valid. 
    checkSimCValid();

    /*  Loop through our SimC string. 
        We're looking for the following:
        - The items ID which we'll cross reference with our ItemDB.
        - The items slot which is always found at the start of the line.
        - The items bonus ID's which we'll use to calculate it's item level, whether it has a socket and what tertiaries might be attached.
            - Bonus IDs can also identify a Timewalking item.

        We should take care that we never use the Name tags in the string.
    */
    for(var i = 0; i < lines.length; i++) {
        let line = lines[i];
        // If our line doesn't include an item ID, skip it. 
        if (!line.includes('id=')) {
            continue;
        }

        // Split string.
        let infoArray = line.split(",");
        let itemID = -1;
        let itemSlot = "";
        let itemBonusIDs = [];
        let itemLevel = -1;

        // Build out our item information.
        // This is not the finest code in the land but it is effective at pulling the information we need.
        for (var j = 0; j < infoArray.length; j++) {
            let info = infoArray[j];

            if (j == 0) itemSlot = info.replace('1', '').replace('=', '').replace('# ', '');
            else if (info.includes("bonus_id=")) itemBonusIDs = info.split('=')[1].split("/");
            else if (info.includes("id=")) itemID = parseInt(info.split('=')[1]);
            
        }

        // Grab the items base level from our item database. 
        itemLevel = getItemLevel(itemID);

        // Process our bonus ID's so that we can establish the items level and sockets / tertiaries.


        console.log(itemID + ": " + itemSlot + ". Item Level:" + itemLevel + ". Bonus: " + itemBonusIDs); 

    
    }
}

// A simC string is valid if it fulfills the following conditions:
// - The class in the string matches the currently selected player character.
// - The level in the string is 60 (50 also available pre-release).
// - The version of the SimC addon is reasonably up to date (the aim is to support the most recent three editions).
// - The string length is less than our specified maximum. This is a loose requirement that's mostly designed around preventing user error like copy pasting their string twice.
function checkSimCValid(simCHeader) {

}

function processItem(simCLine) {

}