import { itemDB } from "../../Player/ItemDB";
import { bonus_IDs } from "../BonusIDs";
import { getItemLevel } from "../ItemUtilities";
import {
  calcStatsAtLevel,
  getItemAllocations,
  scoreItem,
  getItemEffect,
  correctCasing,
  getItemSlot,
} from "../ItemUtilities";
import Item from "../../Player/Item";

const stat_ids = {
  36: 'haste',
  32: 'crit',
  40: 'versatility',
  49: 'mastery',
}

export function runSimC(
  simCInput,
  player,
  contentType,
  setErrorMessage,
  snackHandler,
  closeDialog,
  clearSimCInput
) {
  var lines = simCInput.split("\n");

  // Check that the SimC string is valid.
  if (
    checkSimCValid(
      lines.slice(1, 8),
      lines.length,
      player.getSpec(),
      setErrorMessage
    )
  ) {
    player.clearActiveItems();

    /*  Loop through our SimC string. 
            We're looking for the following:
            - The items ID which we'll cross reference with our ItemDB.
            - The items slot which is always found at the start of the line.
            - The items bonus ID's which we'll use to calculate it's item level, whether it has a socket and what tertiaries might be attached.
                - Bonus IDs can also identify a Timewalking item.
    
            We should take care that we never use the Name tags in the string.
        */
    for (var i = 8; i < lines.length; i++) {
      let line = lines[i];
      // If our line doesn't include an item ID, skip it.
      if (line.includes("id=")) {
        processItem(line, player, contentType);
      }
    }
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

    if (playerClass.includes(line.split("=")[0])) checks.class = true;
    else if (line.split("=")[0] === "level" && line.split("=")[1] === "60")
      checks.level = true;
  }

  if (!checks.class)
    errorMessage += "Spec on your SimC string doesn't match selected char. ";
  if (!checks.level)
    errorMessage += "QE Live is designed for level 60 characters. ";
  if (!checks.length)
    errorMessage +=
      "Your SimC string is a bit long. Make sure you haven't pasted it in twice!";

  setErrorMessage(errorMessage);
  return checks.class && checks.version && checks.level && checks.length;
}

function processItem(line, player, contentType) {
  // Split string.
  let infoArray = line.split(",");
  let itemID = -1;
  let itemSlot = "";
  let itemBonusIDs = [];
  let itemLevel = -1;
  let itemSocket = false;
  let itemTertiary = "";
  let dropLevel = 0;
  let craftedStats = [];
  let itemBonusStats = {}; // Bonus_stats that don't naturally come on the item. Crafting and "of the X" items are the primary example.

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
    else if (info.includes("bonus_id="))
      itemBonusIDs = info.split("=")[1].split("/");
    else if (info.includes("id=")) itemID = parseInt(info.split("=")[1]);
    else if (info.includes("drop_level=")) dropLevel = parseInt(info.split("=")[1]);
    else if (info.includes("crafted_stats=")) craftedStats = info.split("=")[1].split("/");
  }

  // Grab the items base level from our item database.
  itemLevel = getItemLevel(itemID);
  itemSlot = getItemSlot(itemID);

  //console.log(itemID + ": " + itemSlot + ". Item Level:" + itemLevel + ". Bonus: " + itemBonusIDs);
  // Process our bonus ID's so that we can establish the items level and sockets / tertiaries.
  for (var k = 0; k < itemBonusIDs.length; k++) {
    let bonus_id = itemBonusIDs[k].toString();
    let idPayload = bonus_IDs[bonus_id];
    //console.log(JSON.stringify(idPayload));
    if (idPayload !== undefined) {
      if ("level" in idPayload) {
        itemLevel += idPayload["level"];
      } else if ("socket" in idPayload) {
        itemSocket = true;
      } else if (bonus_id === "41") {
        itemTertiary = "Leech";
      }
        else if ('curveId' in idPayload) {
          let curve = idPayload['curveId'];
          //console.log("CURVE: " + bonus_id);

          if (bonus_id == 6706) itemLevel = 92 + (dropLevel - 50) * 6
          else if (bonus_id == 6707) itemLevel = 84 + (dropLevel - 50) * 6
          else if (bonus_id == 6908) {
            // This curve is a little painful since the item level only increases every 3 levels and not by a set amount.
            // We can probably make the code more efficient later but this is otherwise correct.
            if (dropLevel >= 50 && dropLevel <= 52) itemLevel = 81
            else if (dropLevel >= 53 && dropLevel <= 55) itemLevel = 95
            else if (dropLevel >= 56 && dropLevel <= 58) itemLevel = 113
            else if (dropLevel >= 59) itemLevel = 131
            
          }
          else if (bonus_id == 6893) {
            itemLevel = 151;
    
          }
          else if (bonus_id == 6891 || bonus_id == 6892) itemLevel = 165;
          else if (bonus_id == 6890) itemLevel = 129;
          
        }
 
    }
  }
  if (craftedStats.length !== 0) itemBonusStats = getSecondaryAllocationAtItemLevel(itemLevel, itemSlot, craftedStats);
  

  // Add the new item to our characters item collection.
  if (itemLevel > 60 && itemID !== 0) {
    let item = new Item(
      itemID,
      "",
      itemSlot,
      checkDefaultSocket(itemID),
      itemTertiary,
      0,
      itemLevel
    );

    item.level = itemLevel;
    item.stats = calcStatsAtLevel(
      itemLevel,
      itemSlot,
      getItemAllocations(itemID),
      itemTertiary
    );
    if (Object.keys(itemBonusStats).length > 0) item.addStats(itemBonusStats);

    item.effect = getItemEffect(itemID);
    item.softScore = scoreItem(item, player, contentType);

    //console.log("Adding Item: " + item.id + " in slot: " + itemSlot);
    player.addActiveItem(item);
  }
}


function getSecondaryAllocationAtItemLevel(itemLevel, slot, crafted_stats = []) {
  let allocation = 0;
  let bonus_stats = {};

  if (['Chest', 'Head', 'Legs'].includes(slot)) {
      if (itemLevel >= 168) allocation = 50;
      else if (itemLevel >= 151) allocation = 40;
      else if (itemLevel >= 129) allocation = 24;
  }
  else if (['Shoulder', 'Waist', 'Hands', 'Feet'].includes(slot)) {
      if (itemLevel >= 168) allocation = 37;
      else if (itemLevel >= 151) allocation = 29;
      else if (itemLevel >= 129) allocation = 18;

  }
  else if (['Back', 'Wrist'].includes(slot)) {
    if (itemLevel >= 168) allocation = 29;
    else if (itemLevel >= 151) allocation = 22;
    else if (itemLevel >= 129) allocation = 12;

  }
  else if (['Neck', 'Finger'].includes(slot)) {
    if (itemLevel >= 168) allocation = 34;
    else if (itemLevel >= 151) allocation = 29;
    else if (itemLevel >= 117) allocation = 24;

  }

  crafted_stats.forEach(stat => {
    bonus_stats[stat_ids[stat]] = allocation;
    
    
  })
  return bonus_stats;
}

function checkDefaultSocket(id) {
  
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0) return ("socketInfo" in temp[0]);
  else return 0;

}