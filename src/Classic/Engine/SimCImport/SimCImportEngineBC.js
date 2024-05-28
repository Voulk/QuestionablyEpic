import { classicItemDB} from "../../../Databases/ClassicItemDB";
import { autoAddItems, calcStatsAtLevel, getItemProp, getItemAllocations, scoreItem, correctCasing, getValidWeaponTypes } from "../../../General/Engine/ItemUtilities";
import Item from "General/Modules/Player/Item";
import ItemSet from "../../../General/Modules/TopGear/ItemSet";
import { suffixDB } from "Classic/Databases/SuffixDB";


export function runBCSimC(simCInput, player, contentType, setErrorMessage, snackHandler, closeDialog, clearSimCInput) {
  var lines = simCInput.split("\n");

  // Check that the SimC string is valid.
  if (true) {//checkSimCValid(lines.slice(1, 8), lines.length, player.getSpec(), setErrorMessage)) {
    player.clearActiveItems();

    /*  Loop through our SimC string. 
            We're looking for the following:
            - The items ID which we'll cross reference with our ItemDB.
            - The items slot which is always found at the start of the line.
            - The items bonus ID's which we'll use to calculate it's item level, whether it has a socket and what tertiaries might be attached.
                - Bonus IDs can also identify a Timewalking item.
    
            We should take care that we never use the Name tags in the string.
    */

    let linkedItems = lines.indexOf("### Linked gear") !== -1 ? lines.indexOf("### Linked gear") : 0;

    for (var i = 8; i < lines.length; i++) {
      let line = lines[i];
      // If our line doesn't include an item ID, skip it.
      if (line.includes("id=")) {
        processItem(line, player, contentType);
      }
    }
    autoAddItems(player, "Raid", "Classic");
    snackHandler();
    closeDialog();
    clearSimCInput("");
  }
}

// A simC string is valid if it fulfills the following conditions:
// - The class in the string matches the currently selected player character.
// - The level in the string is 60 (50 also available pre-release).
// - The version of the SimC addon is reasonably up to date. This is currently not active so automatically passes.
// - The string length is less than our specified maximum. This is a loose requirement that's mostly designed around preventing user error like copy pasting their string twice.
function checkSimCValid(simCHeader, length, playerClass, setErrorMessage) {
  let checks = {
    class: false,
    version: true,
    level: false,
    length: length < 600,
  };
  let errorMessage = "";


  for (var i = 0; i < simCHeader.length; i++) {
    let line = simCHeader[i];

    if (line !== "" && playerClass.toLowerCase().includes(line.split("=")[0].toLowerCase())) checks.class = true;
    else if (line.split("=")[0] === "level" && line.split("=")[1] >= "60") checks.level = true;
  }

  if (!checks.class) errorMessage += "You're currently a " + playerClass + " but this SimC string is for a different spec.";
  if (!checks.level) errorMessage += "QE Live Cataclysm is best used on level 80-85 characters.";
  if (!checks.length) errorMessage += "Your SimC string is a bit long. Make sure you haven't pasted it in twice!";

  setErrorMessage(errorMessage);
  return checks.class && checks.version && checks.level && checks.length;
}


function processItem(line, player, contentType, type) {
  // Split string.
  let infoArray = line.split(",");
  let itemID = -1;
  let itemSlot = "";
  let itemBonusIDs = [];
  let itemLevel = -1;
  
  let craftedStats = [];
  let itemBonusStats = {}; // Bonus_stats that don't naturally come on the item. Crafting and "of the X" items are the primary example.
  let gemID = 0; // currently unused.
  let enchantID = 0; // currently unused.

  let itemEffect = {}; // This is called automatically for everything except Legendaries.
  let itemEquipped = !line.includes("#");
  let bonusIDS = "";
  let suffix = 0;
  let suffixAllocation = 0;

  // Build out our item information.
  // This is not the finest code in the land but it is effective at pulling the information we need.
  for (var j = 0; j < infoArray.length; j++) {
    let info = infoArray[j];

    if (j === 0) {
      // Do nothing.
    }
    //itemSlot = correctCasing(
    //  info.replace("1", "").replace("=", "").replace("# ", "")
    //);
    else if (info.includes("bonus_id=")) {
      itemBonusIDs = info.split("=")[1].split("/");
      bonusIDS = itemBonusIDs.join(":");
    } else if (info.includes("gem_id=")) gemID = parseInt(info.split("=")[1]);
    else if (info.includes("enchant_id=")) enchantID = parseInt(info.split("=")[1]);
    else if (info.includes("id=")) itemID = parseInt(info.split("=")[1]);
    else if (info.includes("crafted_stats=")) craftedStats = info.split("=")[1].split("/");
    else if (info.includes("suffix=")) suffix = parseInt(info.split("=")[1]);
    else if (info.includes("unique=")) suffixAllocation = parseInt(info.split("=")[1]);
  }

  // Grab the items base level from our item database.
  itemLevel = getItemProp(itemID, "itemLevel", "Classic");
  itemSlot = getItemProp(itemID, "slot", "Classic");

  // Process Item Suffix
  
  if (suffix && suffixAllocation) {
    itemBonusStats = getSuffixAllocation(suffix, suffixAllocation);
  }

  // Process our bonus ID's so that we can establish the items level and sockets / tertiaries.
  for (var k = 0; k < itemBonusIDs.length; k++) {
    let bonus_id = itemBonusIDs[k].toString();
    let idPayload = bonus_IDs[bonus_id];
    if (idPayload !== undefined) {
      if ("level" in idPayload) {
        itemLevel += idPayload["level"];
      } else if (bonus_id === "41") {
        itemTertiary = "Leech";
      } else if ("curveId" in idPayload) {
        let curve = idPayload["curveId"];
      }
    }
  }

  // Add the new item to our characters item collection.
  if (itemID !== 0 && itemSlot !== "") {

    let item = new Item(itemID, "", itemSlot, 0, "", 0, itemLevel, bonusIDS, "Classic");
    item.active = itemEquipped;
    item.isEquipped = itemEquipped;
    item.stats = compileStats(item.stats, itemBonusStats);
    
    item.suffix = suffix;
    //item.effect = Object.keys(itemEffect).length !== 0 ? itemEffect : getItemProp(itemID, "effect");
    item.softScore = scoreItem(item, player, contentType, "Classic");

    player.addActiveItem(item);
  } else {
    //console.log("Item Level out of range: " + itemLevel);
  }
}

function getSuffixAllocation(suffix, suffixAllocation) {
  let bonus_stats = {}

  if (!(suffix in suffixDB) || !suffixAllocation) {
    return {};
  }

  const suffixList = suffixDB[suffix]


  for (const [stat, value] of Object.entries(suffixList)) {
    bonus_stats[stat] = Math.floor(value * suffixAllocation);
  }
  return bonus_stats;

}

// Compiles stats & bonus stats into one array to which we can then apply DR etc. 
// TODO, this is identical to TopGearShared, so put it somewhere accessible to both.
function compileStats(base_stats, bonus_stats) {
  let stats = {...base_stats};

  for (const stat in stats) {
    if (stat !== "bonus_stats") {
      stats[stat] += (bonus_stats !== undefined && stat in bonus_stats) ? bonus_stats[stat] : 0;
    }
  }

  for (const bonusStat in bonus_stats) {
    if (!(bonusStat in stats)) {
      stats[bonusStat] = bonus_stats[bonusStat];
    }
  }

  return stats;
  
}

