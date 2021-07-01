import { itemDB, tokenDB } from "../../../Databases/ItemDB";
import { bonus_IDs } from "../BonusIDs";
import { conduitDB, conduitRanks } from "../../../Databases/ConduitDB";
import { calcStatsAtLevel, getItemProp, getItem, getItemAllocations, scoreItem, correctCasing, getValidWeaponTypes } from "../../../General/Engine/ItemUtilities";
import Item from "../../../General/Modules/Player/Item";
import ItemSet from "../../../General/Modules/TopGear/ItemSet";
import { isConstructSignatureDeclaration } from "typescript";

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

    let vaultItems = lines.indexOf("### Weekly Reward Choices") !== -1 ? lines.indexOf("### Weekly Reward Choices") : lines.length;
    let linkedItems = lines.indexOf("### Linked gear") !== -1 ? lines.indexOf("### Linked gear") : 0;

    // We only use the covenant variable to expand weapon tokens. Setting a default is a better approach than showing none if it's missing,
    // given the weapons and offhands are near identical anyway.
    const covenantLine = lines.filter((x) => x.includes("covenant"));
    const covenant = covenantLine.length > 0 ? covenantLine[0].split("=")[1].toLowerCase() : "venthyr";

    player.setCovenant(covenant);

    for (var i = 8; i < lines.length; i++) {
      let line = lines[i];
      let type = i > vaultItems || i < linkedItems ? "Vault" : "Regular";
      // If our line doesn't include an item ID, skip it.
      if (line.includes("id=")) {
        if (line.includes("unknown")) {
          processToken(line, player, contentType, type, covenant);
        } else {
          processItem(line, player, contentType, type);
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

    //if (player.getSpec() === "Discipline Priest") adjustStatWeights(player, contentType); // Holding off for now.
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

function processItem(line, player, contentType, type) {
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
  let gemID = 0; // currently unused.
  let enchantID = 0; // currently unused.
  let missiveStats = [];
  let itemEffect = {}; // This is called automatically for everything except Legendaries.
  let itemEquipped = !line.includes("#");
  let bonusIDS = "";

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
    //console.log(JSON.stringify(idPayload));
    //console.log(bonus_id);
    if (idPayload !== undefined) {
      if ("level" in idPayload) {
        itemLevel += idPayload["level"];
        //console.log("Adding " + idPayload["level"]);
      } else if ("socket" in idPayload) {
        itemSocket = true;
        //console.log("Socket found on item: " + itemID)
      } else if (bonus_id === "41") {
        itemTertiary = "Leech";
      } else if ("curveId" in idPayload) {
        let curve = idPayload["curveId"];
        //console.log("CURVE: " + bonus_id);

        if (bonus_id == 6706) itemLevel = 92 + (dropLevel - 50) * 6;
        else if (bonus_id == 6707) itemLevel = 84 + (dropLevel - 50) * 6;
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
        else if (bonus_id == 7240) itemLevel = 200;
        else if (bonus_id == 7241) itemLevel = 180;
      } else if ("name_override" in idPayload) {
        // Legendaries

        itemEffect = {
          type: "spec legendary",
          name: idPayload["name_override"]["base"],
          level: 0, // Irrelevant to legendaries.
        };
        //console.log("Legendary detected" + JSON.stringify(itemEffect));
      }
    }
    // Missives
    else if (bonus_id === "6647") missiveStats.push("crit");
    else if (bonus_id === "6648") missiveStats.push("mastery");
    else if (bonus_id === "6649") missiveStats.push("haste");
    else if (bonus_id === "6650") missiveStats.push("versatility");
  }
  if (craftedStats.length !== 0) itemBonusStats = getSecondaryAllocationAtItemLevel(itemLevel, itemSlot, craftedStats);
  if (levelOverride !== 0) itemLevel = Math.min(499, levelOverride);

  // Add the new item to our characters item collection.
  if (itemLevel > 60 && itemID !== 0 && getItem(itemID) !== "") {
    let itemAllocations = getItemAllocations(itemID, missiveStats);

    let item = new Item(itemID, "", itemSlot, itemSocket || checkDefaultSocket(itemID), itemTertiary, 0, itemLevel, bonusIDS);
    item.vaultItem = type === "Vault";
    item.active = itemEquipped || item.vaultItem;
    item.isEquipped = itemEquipped;
    if (Object.keys(itemBonusStats).length > 0) item.addStats(itemBonusStats);
    item.stats = calcStatsAtLevel(item.level, itemSlot, itemAllocations, itemTertiary);

    item.effect = Object.keys(itemEffect).length !== 0 ? itemEffect : getItemProp(itemID, "effect");
    if (item.effect.type && item.effect.type === "spec legendary") item.uniqueEquip = "legendary";
    else if (item.vaultItem) item.uniqueEquip = "vault";
    item.softScore = scoreItem(item, player, contentType);

    //console.log("Adding Item: " + item.id + " in slot: " + itemSlot);
    player.addActiveItem(item);
  } else {
    //console.log("Item Level out of range: " + itemLevel);
  }
}

function getSecondaryAllocationAtItemLevel(itemLevel, slot, crafted_stats = []) {
  let allocation = 0;
  let bonus_stats = {};

  if (["Chest", "Head", "Legs"].includes(slot)) {
    if (itemLevel >= 168) allocation = 50;
    else if (itemLevel >= 151) allocation = 40;
    else if (itemLevel >= 129) allocation = 24;
  } else if (["Shoulder", "Waist", "Hands", "Feet"].includes(slot)) {
    if (itemLevel >= 168) allocation = 37;
    else if (itemLevel >= 151) allocation = 29;
    else if (itemLevel >= 129) allocation = 18;
  } else if (["Back", "Wrist"].includes(slot)) {
    if (itemLevel >= 168) allocation = 29;
    else if (itemLevel >= 151) allocation = 22;
    else if (itemLevel >= 129) allocation = 12;
  } else if (["Neck", "Finger"].includes(slot)) {
    if (itemLevel >= 168) allocation = 34;
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

  if (temp.length > 0) return "socketInfo" in temp[0];
  else return 0;
}

// Currently being trialled as Discipline only.
function adjustStatWeights(player, contentType) {
  let equippedSet = new ItemSet(0, player.getEquippedItems(true), 0);

  equippedSet = equippedSet.compileStats();

  let stats = equippedSet.setStats;
  stats.intellect = 1650;

  // These are stat weights with 0 of each stat on top of the default profile.
  let base_weights = {
    haste: 0.4,
    mastery: 0.39,
    versatility: 0.4,
    crit: 0.42,
    leech: 0.23,
  };

  let scaling = {
    haste: 1,
    mastery: 0.72,
    versatility: 0.99,
    intellect: 0.991,
    crit: 0.968,
    leech: 0.31,
  };

  let new_weights = {};

  const baselineScore =
    stats.intellect *
    scaling.intellect *
    (1 + (stats.crit / 35 / 100) * scaling.crit) *
    (1 + (stats.haste / 33 / 100) * scaling.haste) *
    (1 + (stats.mastery / 27.9 / 100) * scaling.mastery) *
    (1 + (stats.versatility / 40 / 100) * scaling.versatility);

  const intScore =
    ((10 + stats.intellect) *
      scaling.intellect *
      (1 + (stats.crit / 35 / 100) * scaling.crit) *
      (1 + (stats.haste / 33 / 100) * scaling.haste) *
      (1 + (stats.mastery / 27.9 / 100) * scaling.mastery) *
      (1 + (stats.versatility / 40 / 100) * scaling.versatility) -
      baselineScore) /
    10;

  /*(((((stats.intellect) * scaling.intellect) * (1 + ((5 + stats.crit) / 35 / 100 * scaling.crit)) * 
                          (1 + (stats.haste / 33 / 100 * scaling.haste)) * (1 + (stats.mastery / 27.9 / 100 * scaling.mastery)) * 
                          (1 + stats.versatility / 40 / 100 * scaling.versatility))) - baselineScore) / 5 / intScore;         */

  //new_weights.intellect = ((100 + stats.intellect * percent_scaling.intellect) * (1 + (stats.crit / 35) * (1 + (stats.haste / 33)))

  for (const [stat, value] of Object.entries(base_weights)) {
    new_weights[stat] = getSecWeight(stats, scaling, baselineScore, intScore, stat);
  }
  new_weights.leech = base_weights.leech;

  //console.log(JSON.stringify(base_weights));

  //console.log(JSON.stringify(new_weights));

  player.setStatWeights(new_weights, contentType);
}

function getSecWeight(baseStats, scaling, baselineScore, intScore, statName) {
  let stats = { ...baseStats };
  stats[statName] += 5;

  const newWeight =
    (stats.intellect *
      scaling.intellect *
      (1 + (stats.crit / 35 / 100) * scaling.crit) *
      (1 + (stats.haste / 33 / 100) * scaling.haste) *
      (1 + (stats.mastery / 27.9 / 100) * scaling.mastery) *
      (1 + (stats.versatility / 40 / 100) * scaling.versatility) -
      baselineScore) /
    5 /
    intScore;

  return Math.round(1000 * newWeight) / 1000;
}
