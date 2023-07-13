
import { Player } from "General/Modules/Player/Player"
import { Item } from "General/Modules/Player/Item"

const checkHasItem = (itemList: Item[], itemID: number) => {
    return itemList.filter((item: Item) => item.id === itemID).length > 0;
}

// Returns an array of tips.
const getDynamicAdvice = (report : any, player: Player, contentType: contentTypes) => {
    let advice: string[] = [];
    const topSet = report.itemSet;
    const itemList = topSet.itemSet;
    const trinkets = itemList.filter((item: Item) => item.slot === "Trinket");
    const differentials = report.differentials;

    // General Advice
    if (differentials.length === 0) {
        advice.push("You didn't actually click any extra items which means the set above is what you are currently wearing. You can add items to the comparison \
        by clicking on them in the top gear item select screen.")
    }

    // -- Individual Item advice or warnings
    if (checkHasItem(itemList, 203460)) { // Annulet
        advice.push("You included Onyx Annulet in your selection which tends to be excellent in normal and heroic content and then slowly falls off through Mythic. \
        If you are raiding Mythic you might want to consider adding a log to QE Live to improve its valuation."); 
    }


    // Rashoks - Evoker only
    if (checkHasItem(itemList, 202614) && player.spec === "Preservation Evoker") { // Evoker 
        advice.push("Rashoks is an amazing trinket for all healers. Evoker has to work slightly harder for it since a lot of spells won't proc the HoT. \
            I advise tracking the buff and using Time Spiral, Zephyr, Emerald Blossom and Dream Breath to proc it.")
    }

    if (checkHasItem(itemList, 204465)) { // Sark Cloak
        advice.push("While Voice of the Silent Star (cape) offers a high item level and a small stat proc, it generally is not recommended for healers. \
                It doesn't have any stamina on it which loses you about 20k health and the proc is very rare.")
    
    }
    
    // Mythic+ advice.






    return advice;

}