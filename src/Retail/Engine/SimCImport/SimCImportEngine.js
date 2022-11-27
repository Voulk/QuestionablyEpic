import { itemDB, tokenDB } from "../../../Databases/ItemDB";
import { bonus_IDs } from "../BonusIDs";
import { curveDB } from "../ItemCurves";
import { calcStatsAtLevel, getItemProp, getItem, getItemAllocations, scoreItem, correctCasing, getValidWeaponTypes } from "../../../General/Engine/ItemUtilities";
import Item from "../../../General/Modules/Player/Item";

const stat_ids = {
  36: "haste",
  32: "crit",
  40: "versatility",
  49: "mastery",
};

export function runSimC(simCInput, player, contentType, setErrorMessage, snackHandler, closeDialog, clearSimCInput) {
  var lines = simCInput.split("\n");

  // Check that the SimC string is valid.
  if (checkSimCValid(lines.slice(1, 8), lines.length, player.getSpec(), setErrorMessage)) {
    player.clearActiveItems();

    /*  Loop through our SimC string. 
            We're looking for the following:
            - The items ID which we'll cross reference with our ItemDB.
            - The items slot which is always found at the start of the line.
            - The items bonus ID's which we'll use to calculate it's item level, whether it has a socket and what tertiaries might be attached.
                - Bonus IDs can also identify a Timewalking item.
    
            We should take care that we never use the Name tags in the string.
    */

    let linkedItems = lines.indexOf("### Linked gear") !== -1 ? lines.indexOf("### Linked gear") : lines.length;
    let vaultItems = lines.indexOf("### Weekly Reward Choices") !== -1 ? lines.indexOf("### Weekly Reward Choices") : linkedItems;

    processAllLines(player, contentType, lines, linkedItems, vaultItems);

    snackHandler();
    closeDialog();
    clearSimCInput("");
  }
}

export function processAllLines(player, contentType, lines, linkedItems, vaultItems) {
  for (var i = 8; i < lines.length; i++) {
    let line = lines[i];
    let type = i > vaultItems && i < linkedItems ? "Vault" : "Regular";
    // If our line doesn't include an item ID, skip it.
    if (line.includes("id=")) {
      if (line.includes("unknown")) {
        processToken(line, player, contentType, type);
      } else {
        const item = processItem(line, player, contentType, type);
        if (item) player.addActiveItem(item);
      }
    }
  }
  player.updatePlayerStats();
}

// A simC string is valid if it fulfills the following conditions:
// - The class in the string matches the currently selected player character.
// - The level in the string is 60 (50 also available pre-release).
// - The version of the SimC addon is reasonably up to date. This is currently not active so automatically passes.
// - The string length is less than our specified maximum. This is a loose requirement that's mostly designed around preventing user error like copy pasting their string twice.
function checkSimCValid(simCHeader, length, playerClass, setErrorMessage) {
  // console.log("Checking SimC Valid");
  let checks = {
    class: false,
    version: true,
    level: false,
    length: length < 600,
  };
  let errorMessage = "";

  // console.log(simCHeader);
  // console.log(playerClass);

  for (var i = 0; i < simCHeader.length; i++) {
    let line = simCHeader[i];

    if (line !== "" && playerClass.toLowerCase().includes(line.split("=")[0].toLowerCase())) checks.class = true;
    else if (line.split("=")[0] === "level" && line.split("=")[1] === "70") checks.level = true;
  }

  if (!checks.class) errorMessage += "You're currently a " + playerClass + " but this SimC string is for a different spec.";
  if (!checks.level) errorMessage += "QE Live is designed for level 70 characters. ";
  if (!checks.length) errorMessage += "Your SimC string is a bit long. Make sure you haven't pasted it in twice!";

  setErrorMessage(errorMessage);
  return checks.class && checks.version && checks.level && checks.length;
}

/*
function processToken(line, player, contentType, type, covenant) {
  let infoArray = line.split(",");
  let tokenID = -1;
  let tokenLevel = -1;
  let itemBonusIDs = [];
  let tokenSlot = "";

  for (var j = 0; j < infoArray.length; j++) {
    let info = infoArray[j];

    if (j === 0) {
      // Do nothing.
    } else if (info.includes("bonus_id=")) itemBonusIDs = info.split("=")[1].split("/");
    else if (info.includes("id=")) tokenID = parseInt(info.split("=")[1]);
  }
  // console.log("Creating Token with level" + tokenLevel + ", and ID: " + tokenID);
  let token = tokenDB[tokenID.toString()];
  tokenLevel = token.itemLevel;
  tokenSlot = token.slotType;
  // Loop through bonus IDs until we find the item level one. Set Token Item Level.
  for (var k = 0; k < itemBonusIDs.length; k++) {
    let bonus_id = itemBonusIDs[k];

    if (bonus_id >= 1459 && bonus_id <= 1570) tokenLevel += bonus_id - 1472;
  }

  // Loop through items in the token list. We check if it's equippable, and if it is we create an item of it's type.
  const itemList = token[covenant];

  for (var x = 0; x < itemList.length; x++) {
    //console.log("ItemID: " + itemList[x]);
    let itemID = itemList[x];
    const validArmorTypes = getValidWeaponTypes(player.spec, tokenSlot);
    const itemSlot = getItemProp(itemID, "slot");
    const itemSubClass = getItemProp(itemID, "itemSubClass");

    if (validArmorTypes.includes(itemSubClass)) {
      let item = new Item(itemID, "", itemSlot, false, "", 0, tokenLevel, "");
      item.vaultItem = type === "Vault";
      item.active = item.vaultItem;
      //let itemAllocations = getItemAllocations(itemID);
      //item.stats = calcStatsAtLevel(tokenLevel, itemSlot, itemAllocations, "");

      item.softScore = scoreItem(item, player, contentType);
      if (item.vaultItem) item.uniqueEquip = "vault";

      //console.log("Adding Item from Token: " + item.id + " in slot: " + itemSlot);
      player.addActiveItem(item);
    }
  }

  //console.log("Creating Token with level" + tokenLevel + ", and ID: " + tokenID);
} */

/**
 *
 * @param {*} curveID The curveID we'll use to check the item levels available.
 * @param {*} dropLevel The player level when the item dropped.
 * @returns
 */
export function processCurve(curveID, dropLevel) {
  const curve = curveDB[curveID].points;

  let jump = 0;
  let playerLevelGap = 0;
  if (curve.length === 0 || curve === undefined) return 0;
  if (curve.length === 1) return curve[0].itemLevel;
  else {
    for (var i = 0; i < curve.length; i++) {
      if (curve[i].playerLevel > dropLevel) {
        // We've found the right place in the curve. This is the lowest index that's higher than the drop level.
        playerLevelGap = curve[i].playerLevel - curve[i - 1].playerLevel;
        jump = (curve[i].itemLevel - curve[i - 1].itemLevel) / playerLevelGap;

        return curve[i - 1].itemLevel + jump * (dropLevel - curve[i - 1].playerLevel);
      }
    }
  }

  return 0;
}

export function processItem(line, player, contentType, type) {
  // Split string.
  let infoArray = line.split(",");
  let itemID = -1;
  let itemSlot = "";
  let itemBonusIDs = [];
  let itemLevel = 0;
  let itemSockets = 0;
  let itemTertiary = "";
  let dropLevel = 0;
  let levelOverride = 0; // A player can forgo the bonus_id system and override an items level if they wish by entering ilevel= at the end of an item.
  let craftedStats = [];
  let itemBonusStats = {}; // Bonus_stats that don't naturally come on the item. Crafting and "of the X" items are the primary example.
  let gemID = []; // Used for Domination sockets only (currently).
  let gemString = "";
  let enchantID = 0; // currently unused.
  let missiveStats = [];
  let itemEffect = {}; // This is called automatically for everything except Legendaries.
  let itemEquipped = !line.includes("#");
  let bonusIDS = "";
  let uniqueTag = "";

  let specialAllocations = {}
  let itemBaseLevel = 0; // This is an items base level. We'll add any level gain bonus IDs to it.
  let itemLevelGain = 0;
  

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
    } else if (info.includes("gem_id=")) gemID = info.split("=")[1].split("/");
    else if (info.includes("enchant_id=")) enchantID = parseInt(info.split("=")[1]);
    else if (info.includes("id=")) itemID = parseInt(info.split("=")[1]);
    else if (info.includes("drop_level=")) dropLevel = parseInt(info.split("=")[1]);
    else if (info.includes("crafted_stats=")) craftedStats = info.split("=")[1].split("/");
    else if (info.includes("ilevel=") || info.includes("ilvl=")) levelOverride = parseInt(info.split("=")[1]);
  }

  // Grab the items base level from our item database.
  itemBaseLevel = getItemProp(itemID, "itemLevel");
  itemSlot = getItemProp(itemID, "slot");

  //console.log(itemID + ": " + itemSlot + ". Item Level:" + itemLevel + ". Bonus: " + itemBonusIDs);
  // Process our bonus ID's so that we can establish the items level and sockets / tertiaries.
  for (var k = 0; k < itemBonusIDs.length; k++) {
    let bonus_id = itemBonusIDs[k].toString();
    let idPayload = bonus_IDs[bonus_id];
    if (idPayload !== undefined) {
      if ("level" in idPayload) {
        itemLevelGain += idPayload["level"];
      } else if ("socket" in idPayload) {
        itemSockets = idPayload["socket"];
      } else if ("base_level" in idPayload) {
        itemBaseLevel = idPayload["base_level"];
      }
      else if (bonus_id === "41") {
        itemTertiary = "Leech";
      } else if (bonus_id === "7886" && itemID !== 171323) {
        // This is a temporary measure to stop them from overwriting the Alch Stone effect. TODO.
        // Cosmic Protoweave
        itemEffect = {
          type: "special",
          name: "Cosmic Protoweave",
          level: itemLevel,
        };
      } else if (bonus_id === "7960" && itemID !== 171323) {
        // This is a temporary measure to stop them from overwriting the Alch Stone effect. TODO.) {
        // Cosmic Protoweave
        itemEffect = {
          type: "special",
          name: "Ephemera Harmonizing Stone",
          level: itemLevel,
        };
      } else if ("rawStats" in idPayload) {
        idPayload["rawStats"].forEach((stat) => {
          if (["Haste", "Crit", "Vers", "Mastery", "Intellect"].includes(stat["name"])) {
            let statName = stat["name"].toLowerCase();
            if (statName === "vers") statName = "versatility"; // Pain
            specialAllocations[statName] = stat["amount"];
          }
        });
      } else if ("curveId" in idPayload) {
        let curve = idPayload["curveId"];
        levelOverride = processCurve(curve, dropLevel);

      } else if ("name_override" in idPayload) {
        if ("base" in idPayload.name_override && idPayload.name_override.base === "Unity") {
          // Unity
          itemEffect = {
            type: "unity",
            name: "Unity",
            level: 0, // Irrelevant to legendaries.
          };
        } else {
        }
        // Legendaries

        //console.log("Legendary detected" + JSON.stringify(itemEffect));
      }
    }
    // Missives.
    // Missives are on every legendary, and are annoyingly also on some crafted items.
    // Crafted items will either have a missive ID and an INCORRECT crafted_stats id or just a CORRECT crafted_stats ID.
    // Therefore if a missive ID is present, we need to kill the crafted_stats value.
    else if (bonus_id === "6647") {
      missiveStats.push("crit");
      craftedStats = "";
    } else if (bonus_id === "6648") {
      missiveStats.push("mastery");
      craftedStats = "";
    } else if (bonus_id === "6649") {
      missiveStats.push("haste");
      craftedStats = "";
    } else if (bonus_id === "6650") {
      missiveStats.push("versatility");
      craftedStats = "";
    }
    if (bonus_id === "7881") uniqueTag = "crafted";
  }
  //if (craftedStats.length !== 0) itemBonusStats = getSecondaryAllocationAtItemLevel(itemLevel, itemSlot, craftedStats);
  if (craftedStats.length !== 0) {
    craftedStats.forEach(stat => {
      missiveStats.push(stat_ids[stat]);
    });
  }
  if (levelOverride !== 0) itemLevel = Math.min(699, levelOverride);
  else itemLevel = itemBaseLevel + itemLevelGain;
  // Check Gems for Dom sockets
  if (gemID.length > 0) {
    gemID.forEach((gem) => {
      gemString += gem + ":";
    });
  }

  // Add the new item to our characters item collection.
  if (itemLevel > 60 && itemID !== 0 && getItem(itemID) !== "") {
    let itemAllocations = getItemAllocations(itemID, missiveStats);
    itemAllocations = Object.keys(specialAllocations).length > 0 ? compileStats(itemAllocations, specialAllocations) : itemAllocations;
    let item = new Item(itemID, "", itemSlot, itemSockets || checkDefaultSocket(itemID), itemTertiary, 0, itemLevel, bonusIDS);
    item.vaultItem = type === "Vault";
    item.active = itemEquipped || item.vaultItem;
    item.isEquipped = itemEquipped;
    item.stats = calcStatsAtLevel(item.level, itemSlot, itemAllocations, itemTertiary);
    item.gemString = gemString !== "" ? gemString.slice(0, -1) : "";
    if (Object.keys(itemBonusStats).length > 0) item.addStats(itemBonusStats);

    item.effect = Object.keys(itemEffect).length !== 0 ? itemEffect : getItemProp(itemID, "effect");

    if (item.effect.type && item.effect.type === "spec legendary") item.uniqueEquip = "legendary";
    else if (item.effect.type && item.effect.type === "unity") {
      item.uniqueEquip = "unity";
      //item.id = 1044011
    } else if (item.vaultItem) item.uniqueEquip = "vault";
    else item.uniqueEquip = uniqueTag;
    item.softScore = scoreItem(item, player, contentType);

    return item;
  } else {
    return null;
  }
}

/**
 * 
 * @deprecated
 * 
 */
function getSecondaryAllocationAtItemLevel(itemLevel, slot, crafted_stats = []) {
  let allocation = 0;
  let bonus_stats = {};


  if (["Chest", "Head", "Legs"].includes(slot)) {
    if (itemLevel >= 262) allocation = 84;
    else if (itemLevel >= 230) allocation = 72;
    else if (itemLevel >= 168) allocation = 50;
    else if (itemLevel >= 151) allocation = 40;
    else if (itemLevel >= 129) allocation = 24;
  } else if (["Shoulder", "Waist", "Hands", "Feet"].includes(slot)) {
    if (itemLevel >= 262) allocation = 63;
    else if (itemLevel >= 233) allocation = 55;
    else if (itemLevel >= 230) allocation = 54;
    else if (itemLevel >= 168) allocation = 37;
    else if (itemLevel >= 151) allocation = 29;
    else if (itemLevel >= 129) allocation = 18;
  } else if (["Back", "Wrist"].includes(slot)) {
    if (itemLevel >= 262) allocation = 47;
    else if (itemLevel >= 230) allocation = 41;
    else if (itemLevel >= 168) allocation = 29;
    else if (itemLevel >= 151) allocation = 22;
    else if (itemLevel >= 129) allocation = 12;
  } else if (["Neck", "Finger"].includes(slot)) {
    if (itemLevel >= 262) allocation = 78;
    else if (itemLevel >= 230) allocation = 63;
    else if (itemLevel >= 168) allocation = 34;
    else if (itemLevel >= 151) allocation = 29;
    else if (itemLevel >= 117) allocation = 24;
  }

  crafted_stats.forEach((stat) => {
    bonus_stats[stat_ids[stat]] = allocation;
  });

  return bonus_stats;
}

// Compiles stats & bonus stats into one array to which we can then apply DR etc.
function compileStats(stats, bonus_stats) {
  for (var stat in stats) {
    stats[stat] += stat in bonus_stats ? bonus_stats[stat] : 0;
  }

  return stats;
}

function checkDefaultSocket(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0) {
    const socketType = temp[0].socketType;
    return socketType == "Prismatic";
  } else return 0;
}
