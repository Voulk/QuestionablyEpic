import { itemDB, tokenDB } from "../../../Databases/ItemDB";
import { bonus_IDs } from "../BonusIDs";
import { conduitDB, conduitRanks } from "../../../Databases/ConduitDB";
import { dominationGemDB } from "../../../Databases/DominationGemDB";
import { calcStatsAtLevel, getItemProp, getItem, getItemAllocations, scoreItem, correctCasing, getValidWeaponTypes } from "../../../General/Engine/ItemUtilities";
import Item from "../../../General/Modules/Player/Item";
import ItemSet from "../../../General/Modules/TopGear/ItemSet";

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

    

    // We only use the covenant variable to expand weapon tokens. Setting a default is a better approach than showing none if it's missing,
    // given the weapons and offhands are near identical anyway.
    const covenantLine = lines.filter((x) => x.includes("covenant"));
    const covenant = covenantLine.length > 0 ? covenantLine[0].split("=")[1].toLowerCase() : "venthyr";

    processAllLines(player, contentType, covenant, lines, linkedItems, vaultItems)
    player.setCovenant(covenant);

    snackHandler();
    closeDialog();
    clearSimCInput("");
  }
}

export function processAllLines(player, contentType, covenant, lines, linkedItems, vaultItems) {
  for (var i = 8; i < lines.length; i++) {
    let line = lines[i];
    let type = i > vaultItems && i < linkedItems ? "Vault" : "Regular";
    // If our line doesn't include an item ID, skip it.
    if (line.includes("id=")) {
      if (line.includes("unknown")) {
        processToken(line, player, contentType, type, covenant);
      } else {
        const item = processItem(line, player, contentType, type)
        if (item) player.addActiveItem(item);
      }
    }

    /* ------------------- If line includes "conduits_available" then process line ------------------ */
    if (line.includes("conduits_available")) {
      processConduits(line, player);
    }

    /* ------------------------ If line includes "renown=" then process line ------------------------ */
    if (line.includes("renown=")) {
      processRenown(line, player);
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
    else if (line.split("=")[0] === "level" && line.split("=")[1] === "60") checks.level = true;
  }

  if (!checks.class) errorMessage += "You're currently a " + playerClass + " but this SimC string is for a different spec.";
  if (!checks.level) errorMessage += "QE Live is designed for level 60 characters. ";
  if (!checks.length) errorMessage += "Your SimC string is a bit long. Make sure you haven't pasted it in twice!";

  setErrorMessage(errorMessage);
  return checks.class && checks.version && checks.level && checks.length;
}

function processRenown(line, player) {
  /* -------------------------- Set renownLevel to imported renown level -------------------------- */
  let renownLevel = parseInt(line.split("=")[1]);
  /* ---------------------------------- update Renown in "player" --------------------------------- */
  player.updateRenownLevel(renownLevel);
}

/* --------- Process "conduits_available=" line in simc string and update conduit ilvls --------- */
function processConduits(line, player) {
  /* --- Remove "conduits_available=" from string and split by / to seperate conduit ID and Rank -- */
  let infoArray = line.split("=")[1].split("/");
  /* -------------------- Go through each item in array and update the conduit -------------------- */
  for (var j = 0; j < infoArray.length; j++) {
    let info = infoArray[j];

    /* ---------------------- split the object into conduit ID and conduit Rank --------------------- */
    let conduitSimcID = parseInt(info.split(":")[0]);
    let conduitRank = parseInt(info.split(":")[1]);

    /* ---------------------------- Return relevant conduit guid from DB ---------------------------- */
    let conduitGuid = conduitDB
      .filter((obj) => {
        return obj.simcID === conduitSimcID;
      })
      .map((obj) => obj.guid)[0];

    /* ------------------------------- Return Relevant Ilvl from Ranks ------------------------------ */
    let conduitIlvl = conduitRanks
      .filter((obj) => {
        return obj.rank === conduitRank;
      })
      .map((obj) => obj.itemLevel)[0];

    /* --------------------------------------- Update Conduit --------------------------------------- */
    player.updateConduitLevel(conduitGuid, conduitIlvl);
  }
}

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

    if (bonus_id >= 1459 && bonus_id <= 1502) tokenLevel += bonus_id - 1472;
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
}

export function processItem(line, player, contentType, type) {
  // Split string.
  let infoArray = line.split(",");
  let itemID = -1;
  let itemSlot = "";
  let itemBonusIDs = [];
  let itemLevel = -1;
  let itemSocket = false;
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
  let domGemID = 0;
  let uniqueTag = "";
  let specialAllocations = {}
  

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
    } 
    else if (info.includes("gem_id=")) gemID = info.split("=")[1].split("/");
    else if (info.includes("enchant_id=")) enchantID = parseInt(info.split("=")[1]);
    else if (info.includes("id=")) itemID = parseInt(info.split("=")[1]);
    else if (info.includes("drop_level=")) dropLevel = parseInt(info.split("=")[1]);
    else if (info.includes("crafted_stats=")) craftedStats = info.split("=")[1].split("/");
    else if (info.includes("ilevel=") || info.includes("ilvl=")) levelOverride = parseInt(info.split("=")[1]);
  }


  // Grab the items base level from our item database.
  itemLevel = getItemProp(itemID, "itemLevel");
  itemSlot = getItemProp(itemID, "slot");

  //console.log(itemID + ": " + itemSlot + ". Item Level:" + itemLevel + ". Bonus: " + itemBonusIDs);
  // Process our bonus ID's so that we can establish the items level and sockets / tertiaries.
  for (var k = 0; k < itemBonusIDs.length; k++) {
    let bonus_id = itemBonusIDs[k].toString();
    let idPayload = bonus_IDs[bonus_id];
    if (idPayload !== undefined) {
      if ("level" in idPayload) {
        itemLevel += idPayload["level"];
        //console.log("Adding " + idPayload["level"]);
      } else if ("socket" in idPayload) {
        itemSocket = true;
        //console.log("Socket found on item: " + itemID)
      } else if (bonus_id === "41") {
        itemTertiary = "Leech";
      } 
      else if (bonus_id === "7886" && itemID !== 171323) { // This is a temporary measure to stop them from overwriting the Alch Stone effect. TODO.
        // Cosmic Protoweave
        itemEffect = {
          type: "special",
          name: "Cosmic Protoweave",
          level: itemLevel,
        };
      }
      else if (bonus_id === "7960" && itemID !== 171323) { // This is a temporary measure to stop them from overwriting the Alch Stone effect. TODO.) {
        // Cosmic Protoweave
        itemEffect = {
          type: "special",
          name: "Ephemera Harmonizing Stone",
          level: itemLevel,
        };
      }
      else if ("rawStats" in idPayload) {
        idPayload["rawStats"].forEach(stat => {
          if (['Haste', 'Crit', 'Vers', 'Mastery', 'Intellect'].includes(stat['name'])) {
            let statName = stat['name'].toLowerCase();
            if (statName === "vers") statName = "versatility"; // Pain
            specialAllocations[statName] = stat['amount'];
          }
        });
      }
      else if ("curveId" in idPayload) {
        let curve = idPayload["curveId"];
        //console.log("CURVE: " + bonus_id);

        if (bonus_id == 6706) itemLevel = 92 + (dropLevel - 50) * 6;
        else if (bonus_id == 6707) itemLevel = 84 + (dropLevel - 50) * 6;
        else if (bonus_id === 7883) itemLevel = 220; // Doomwalker Loot.
        else if (bonus_id == 6908) {
          // This curve is a little painful since the item level only increases every 3 levels and not by a set amount.
          // We can probably make the code more efficient later but this is otherwise correct.
          if (dropLevel >= 50 && dropLevel <= 52) itemLevel = 81;
          else if (dropLevel >= 53 && dropLevel <= 55) itemLevel = 95;
          else if (dropLevel >= 56 && dropLevel <= 58) itemLevel = 113;
          else if (dropLevel >= 59) itemLevel = 131;
        } else if (bonus_id == 6907) {
          // This curve is a little painful since the item level only increases every 3 levels and not by a set amount.
          // We can probably make the code more efficient later but this is otherwise correct.
          if (dropLevel >= 50 && dropLevel <= 52) itemLevel = 80;
          else if (dropLevel >= 53 && dropLevel <= 55) itemLevel = 93;
          else if (dropLevel >= 56 && dropLevel <= 58) itemLevel = 111;
          else if (dropLevel >= 59) itemLevel = 129;
        } else if (bonus_id == 6771) itemLevel = 92 + (dropLevel - 50) * 6;
        else if (bonus_id == 6893) {
          itemLevel = 151;
        } else if (bonus_id == 6891 || bonus_id == 6892) itemLevel = 165;
        else if (bonus_id == 6890) itemLevel = 129;
        else if (bonus_id == 7192) itemLevel = 138;
        else if (bonus_id == 7191) itemLevel = 158;
        else if (bonus_id == 7238) itemLevel = 164;
        else if (bonus_id == 7185) itemLevel = 168;
        else if (bonus_id == 7239) itemLevel = 181;
        else if (bonus_id == 7464) itemLevel = 184; // Timewalking WoD
        else if (bonus_id == 7240 || bonus_id == 7183) itemLevel = 200;
        else if (bonus_id == 7915) itemLevel = 210; // Timewalking MoP
        else if (bonus_id == 7241) itemLevel = 180;
        else if (bonus_id == 7461) itemLevel = 230;
        else if (bonus_id == 7881) itemLevel = 262;

      } else if ("name_override" in idPayload) {
        // Legendaries

        itemEffect = {
          type: "spec legendary",
          name: idPayload["name_override"]["base"],
          level: 0, // Irrelevant to legendaries.
        };
        //console.log("Legendary detected" + JSON.stringify(itemEffect));
      }
      // This can be readded when we have better data on it. I'm not confident in target count or possible sqrt scaling.
      /*if (bonus_id === 7888) {
        // Cosmic Protoweave
        itemEffect = {
          type: "special",
          name: "Magically Regulated Automa Core",
          level: itemLevel,
        };
      } */
    }
    // Missives.
    // Missives are on every legendary, and are annoyingly also on some crafted items.
    // Crafted items will either have a missive ID and an INCORRECT crafted_stats id or just a CORRECT crafted_stats ID.
    // Therefore if a missive ID is present, we need to kill the crafted_stats value.
    else if (bonus_id === "6647") {
      missiveStats.push("crit");
      craftedStats = "";
    }
    else if (bonus_id === "6648") {
      missiveStats.push("mastery");
      craftedStats = "";
    }
    else if (bonus_id === "6649") {
      missiveStats.push("haste");
      craftedStats = "";
    }
    else if (bonus_id === "6650") {
      missiveStats.push("versatility");
      craftedStats = "";
    }
    if (bonus_id === "7881") uniqueTag = "crafted";
    
  }
  if (craftedStats.length !== 0) itemBonusStats = getSecondaryAllocationAtItemLevel(itemLevel, itemSlot, craftedStats);
  if (levelOverride !== 0) itemLevel = Math.min(499, levelOverride);

  // Check Gems for Dom sockets
  if (gemID.length > 0) {
    gemID.forEach((gem) => {
      const effect = checkIfDomGem(parseInt(gem));
      gemString += gem + ":"
      if (effect) {
        //itemEffect = effect;
        domGemID = gem;
      } 
    })
  }

  // Add the new item to our characters item collection.
  if (itemLevel > 60 && itemID !== 0 && getItem(itemID) !== "") {
    let itemAllocations = Object.keys(specialAllocations).length > 0 ? specialAllocations : getItemAllocations(itemID, missiveStats);
    let item = new Item(itemID, "", itemSlot, itemSocket || checkDefaultSocket(itemID), itemTertiary, 0, itemLevel, bonusIDS);
    item.vaultItem = type === "Vault";
    item.active = itemEquipped || item.vaultItem;
    item.isEquipped = itemEquipped;
    item.stats = calcStatsAtLevel(item.level, itemSlot, itemAllocations, itemTertiary);
    item.gemString = (gemString !== "") ? gemString.slice(0, -1) : "";
    if (Object.keys(itemBonusStats).length > 0) item.addStats(itemBonusStats);

    item.effect = Object.keys(itemEffect).length !== 0 ? itemEffect : getItemProp(itemID, "effect");
    //item.domGemID = parseInt(domGemID);
    if (item.effect.type && item.effect.type === "spec legendary") item.uniqueEquip = "legendary";
    else if (item.vaultItem) item.uniqueEquip = "vault";
    else item.uniqueEquip = uniqueTag;
    item.softScore = scoreItem(item, player, contentType);

    return item;
  } else {
    return null
  }
}

function checkIfDomGem(id) {
  let temp = dominationGemDB.filter(function (gem) {
    return gem.gemID === id;
  });
  if (temp.length > 0 && 'effect' in temp[0]) return temp[0].effect;
  else return null
}

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

function checkDefaultSocket(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0) {
    const socketType = temp[0].socketType;
    return socketType == "Prismatic";
  }
  else return 0;
}
