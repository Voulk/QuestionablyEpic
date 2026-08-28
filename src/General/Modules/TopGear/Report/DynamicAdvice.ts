
import { Player } from "General/Modules/Player/Player"
import { Item } from "General/Items/Item"
import { isEmbellished, MAX_EMBELLISHMENTS } from "General/Engine/ItemUtilities"

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

    // A one hander is evaluated with an empty offhand when the player hasn't selected one. That's a real result for
    // the items they picked, but it costs the one hander a whole item's worth of stats against any two hander it is
    // being compared to, so say so rather than letting it quietly lose.
    // Only two embellishments can be worn at once, so any others the player selected are dropped from every set.
    // Without this the item simply never appears in the report and it looks like Top Gear ignored it.
    const embellishedInSet = itemList.filter((item: any) => isEmbellished(item)).length;
    if (report.embellishedSelected > MAX_EMBELLISHMENTS) {
        advice.push("You selected " + report.embellishedSelected + " embellished items but only " + MAX_EMBELLISHMENTS +
        " can be worn at once, so the set above uses the best " + embellishedInSet + ". If an embellished item you added \
        isn't showing up, that's why - deselect one of the others to compare it directly.")
    }

    const hasOneHander = itemList.some((item: Item) => item.slot === "1H Weapon");
    const hasOffhand = itemList.some((item: Item) => ["Offhand", "Holdable", "Shield"].includes(item.slot));
    if (hasOneHander && !hasOffhand) {
        advice.push("This set uses a one handed weapon but no offhand was selected, so the offhand slot is being scored as empty. \
        Add an offhand in the item select screen to see what the one hander is really worth.")
    }
    if (gameType === "Classic") {
        advice.push("Expected HPS: " + Math.round(topSet.metrics.healing / 60 * 0.85) + " - " + Math.round(topSet.metrics.healing / 60 * 1) + ". Your HPS can be very fight dependent and it's ok if you aren't perfectly in this range.")
        advice.push("Expected DPS: " + Math.round(topSet.metrics.damage / 60 * 0.7) + " - " + Math.round(topSet.metrics.damage / 60 * 1) + ". Your DPS is heavily dependent on how much time you spend casting DPS spells and will vary per fight.")

        //advice.push("Power Torrent is a very powerful weapon enchant but is expensive. It's ok to wear Heartsong until you have a good weapon.")
        if (strippedPlayer.spec === "Mistweaver Monk Classic") advice.push("Mistweaver has a haste breakpoint at 3145 haste (in Tiger), however this is only a small upgrade over \
                    spending those stats elsewhere. As a result, best in slot sets should expect to hit it, but don't be too surprised if QE Live doesn't reforge your set that way until you have some good items.");
        if (strippedPlayer.spec === "Restoration Druid Classic") advice.push("Resto Druid has haste breakpoints at 3043 (Rejuv, Tranq) and 5176 (Soul of the Forest + Wild Growth). Expect most sets to hit the first, and some to hit the second - often only with the T14 4pc bonus.");
    }
    if (gameType === "Retail") {
        advice.push("Avoid wearing two on-use trinkets if possible. They lock each other out and greatly complicate the playstyle.")
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
                It can be smarter to focus more on healing to begin with.")
        }
        else if (strippedPlayer.model === "Balanced" || strippedPlayer.model === "Damage Focused") {
            advice.push("This is a damage focused set and plays little mastery as a result. There's also a healing focused profile which I'd recommend to newer players.")
        }
    }

    if (differentials.length > 0 && Math.abs(differentials[0].rawDifference) < 800) {
        advice.push("Your top alternative is very close in value. You could safely wear either here without a noticeable impact on performance.")
    }

    // -- Individual Item advice or warnings
    if (checkHasItem(itemList, 203460)) { // Annulet
        advice.push("It's time to unequip Onyx Annulet."); 
    }
    if (gameType === "Retail") {
        advice.push("It's acceptable to swap to Avoidance enchants for high Mythic+ dungeons.")
    }
    

    return advice;

}