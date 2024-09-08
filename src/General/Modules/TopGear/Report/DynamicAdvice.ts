
import { Player } from "General/Modules/Player/Player"
import { Item } from "General/Modules/Player/Item"

const checkHasItem = (itemList: Item[], itemID: number) => {
    return itemList.filter((item: Item) => item.id === itemID).length > 0;
}

// Returns an array of tips.
// Note that
export const getDynamicAdvice = (report : any, strippedPlayer: any, contentType: contentTypes, gameType: gameTypes = "Retail") => {
    let advice: string[] = [];
    const topSet = report.itemSet;
    const itemList = topSet.itemList;
    //const trinkets = itemList.filter((item: Item) => item.slot === "Trinket");
    const differentials = report.differentials;
    // General Advice
    if (differentials.length === 0 && gameType === "Retail") {
        advice.push("You didn't actually click any extra items which means the set above is what you are currently wearing. You can add items to the comparison \
        by clicking on them in the top gear item select screen.")
    }
    if (gameType === "Classic") {
        if (strippedPlayer.spec === "Discipline Priest Classic") advice.push("Expected HPS: " + Math.round(topSet.hardScore / 60 * 0.85) + " - " + Math.round(topSet.hardScore / 60 * 1) + ". Your HPS can be very fight dependent and it's ok if you aren't perfectly in this range.")
        else advice.push("Expected HPS: " + Math.round(topSet.hardScore / 60 * 0.5) + " - " + Math.round(topSet.hardScore / 60 * 0.75) + ". Your HPS can be very fight dependent and it's ok if you aren't perfectly in this range.")
        advice.push("Power Torrent is a very powerful weapon enchant but is expensive. It's ok to wear Heartsong until you have a good weapon.")
        if (strippedPlayer.spec === "Restoration Druid Classic") advice.push("Resto Druid has a haste breakpoint at 2005 haste, however this is only a small upgrade over \
                    spending those stats elsewhere. As a result, best in slot sets should expect to hit it, but don't be too surprised if QE Live doesn't reforge your set that way until you have some good items.");
    }
    if (topSet.enchantBreakdown["flask"]) {
        advice.push("Recommended Flask: " + topSet.enchantBreakdown["flask"] + ".");
    }
    /*if (isNaN(topSet.hardScore)) {
        advice.push("Something might have gone wrong with this set. Sorry about that. Results might be dicey or inaccurate. It's been automatically reported.")
    }*/ // This information is not currently stored.

    // Dungeon notes
    if (contentType === "Dungeon") {
        if (strippedPlayer.model === "Healing Focused") {
            advice.push("This is a healing focused set and values mastery quite heavily. You might notice some players choose to drop mastery in order to maximize DPS. \
                This is a reasonable choice but it can be smarter to focus more on healing to begin with. You can change playstyle in QE Live to a more damage \
                focused one once you're comfortable.")
        }
        else if (strippedPlayer.model === "Balanced" || strippedPlayer.model === "Damage Focused") {
            advice.push("This is a damage focused set and plays little mastery as a result. There's also a healing focused profile which I'd recommend to newer players.")
        }
    }

    if (differentials.length > 0 && Math.abs(differentials[0].rawDifference) < 600) {
        advice.push("Your top alternative is very close in value. You could safely wear either here without a noticeable impact on performance.")
    }

    // -- Individual Item advice or warnings
    if (checkHasItem(itemList, 203460)) { // Annulet
        advice.push("It's time to unequip Onyx Annulet."); 
    }

    if (checkHasItem(itemList, 204465)) { // Sark Cloak
        advice.push("While Voice of the Silent Star (cape) offers a high item level and a small stat proc, it generally is not recommended for healers. \
                It doesn't have any stamina on it which loses you about 20k health and the proc is very rare.")
    
    }
    

    return advice;

}