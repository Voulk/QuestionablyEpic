import { bonus_IDs } from "../../../Retail/Engine/BonusIDs";
import { curveDB } from "../../../Retail/Engine/ItemCurves";
import { compileStats, checkDefaultSocket, calcStatsAtLevel, getItemProp, getItem, getItemAllocations, scoreItem, correctCasing, getValidWeaponTypes, getValidArmorTypes, getValidWeaponTypesBySpec } from "../../Engine/ItemUtilities";
import Item from "../Item";
import Player from "General/Modules/Player/Player";
import { CONSTANTS } from "General/Engine/CONSTANTS";
import { getTitanDiscName } from "Retail/Engine/EffectFormulas/Generic/PatchEffectItems/TitanDiscBeltData"
import ItemSquishEras from "Retail/Engine/ItemSquishEras.json"

/**
 * This entire page is a bit of a disaster, owing mostly to how bizarrely some things are implemented in game. 
 * Make sure you add test cases for any items that are a bit strange or that use a new system.
 * 
 */

const stat_ids: {[key: number]: string} = {
  36: "haste",
  32: "crit",
  40: "versatility",
  49: "mastery",
};

function getPlayerServerName(lines: string[]) {
  let serverName = ""
  lines.forEach((line: string)  => {
    if (line.includes("server=")) {
      serverName = line.split("=")[1].replace("_", " ");
      serverName = serverName.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    }
  })
  return serverName;
}

function getPlayerServerRegion(lines: string[]) {
  let serverRegion = ""
  lines.forEach((line: string)  => {
    if (line.includes("region=")) {
        serverRegion = (line.split("=")[1] || "").toUpperCase();
    }
  })

  return serverRegion;
}

function getPlayerRace(lines: string[]) {
  let playerRace = ""
  lines.forEach((line: string)  => {
    if (line.includes("race=")) {
      playerRace = (line.split("=")[1].replace("_", " "));
      playerRace = playerRace.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    }
  })
  return playerRace;
}


// Item levels are way too complicated to not have a specific function for now.
export function getItemLevel(itemID: number, bonusIDs: number[], dropLevel: number = -1) : number {
    let itemLevel = getItemProp(itemID, "itemLevel");
    const extraBonuses: number[] = []

    // Handle attached bonusIDs
    bonusIDs.forEach(bonusIDs => {
      const bonusData = bonus_IDs[bonusIDs.toString()] || {};
      if (bonusData.applyBonusId) extraBonuses.push(bonusData.applyBonusId);
    })


    bonusIDs = bonusIDs.concat(extraBonuses);

    let legacyLevelOffset = 0;
    const eraMax = 2;
    let operationOverride = false;

    const operations = [];

    // Item curve IDs that are not the Era curve.
    // {priority: X, value: Y, era: Z}
    const curveOperations = []
    

    bonusIDs.forEach((bonusID: number) => {
      const bonusData = bonus_IDs[bonusID.toString()] || {};

      if (bonusData.itemLevel) {
        // Item Level bonus IDS have the following format:
        // - amount (the item level to use)
        // - priority (lower priority is better. Higher priority numbers are just discarded.)
        // - squishEra (if squishEra isn't equal to our maximum then we'll need to squish its value afterwards.)
        operations.push({type: 'set level', value: bonusData['itemLevel']});
      }
      if ('levelOffset' in bonusData) {
        // Item level offsets are used to make a flat change to item level. It has the following format:
        // - amount (the amount to offset the item level by)
        // - squishEra (they seem to mostly use 2 here = no squish, but if 1 then we'll apply the offset first.)
        operations.push({type: 'era offset', value: bonusData['levelOffset']});
      }
      if ('levelOffsetSecondary' in bonusData) {
        // A strictly post-squish item level adjustment. Seems equal to levelOffset if levelOffset = eraMax.
        operations.push({type: 'modern offset', value: bonusData['levelOffsetSecondary']});
      }
      if ('level' in bonusData) {
        // Some older items will just use their base level + legacyLevelOffset. 
        //legacyLevelOffset += bonusData.level;
        itemLevel += bonusData.level;
        operationOverride = true;
      }
      if ('curveId' in bonusData) {
        // Some TWW and before items use curveId
        curveOperations.push({priority: 0, value: bonusData.curveId, era: 1, offset: 0});
      }
      if ('dropLevelCurve' in bonusData) {
        // Most Midnight items use dropLevelCurve instead. It contains the following fields:
        // - curveId: The curve ID to use.
        // - priority: Only the lowest priority is kept.
        // - squishEra: Squish if not = eraMax.
        // - offset: TODO: either a pre or post squish item level offset. 
        curveOperations.push({priority: bonusData.dropLevelCurve.priority, value: bonusData.dropLevelCurve.curveId, era: bonusData.dropLevelCurve.squishEra || 2, offset: bonusData.dropLevelCurve.offset || 0});
      }
    });

    if (operations.length > 0 || curveOperations.length > 0 || operationOverride) {
      ItemSquishEras.forEach(squishEra => {
        /*
          There are currently two eras. 1 and 2 but they might add more in future - probably not until another item squish.
          Era 1: Pre-Midnight
          Era 2: Midnight

          If there is a curveID for this era, process it. This will effectively squish the item level of all eras that came before it.
          Then, apply any item level operations and then curves for the new era. 

        */
        if (squishEra.curveId) {
          itemLevel = processCurve(squishEra.curveId.toString(), itemLevel)
          
        }

        // Handle flat item level increases.
        const eraLevels = operations.filter(op => op.type === 'set level' && op.value.squishEra === squishEra.id);
        const eraLevel = eraLevels
                          .reduce((acc, currentValue) => {
                              return (currentValue.value.priority < acc.value.priority) ? currentValue : acc;
                        }, eraLevels[0]);

        itemLevel = eraLevel ? eraLevel.value.amount : itemLevel;  

        // Handle curve item level increases
        const curveLevel = curveOperations.filter(op => op.era === squishEra.id)[0] || {};
        itemLevel = (curveLevel && curveLevel.value) ? (processCurve(curveLevel.value.toString(), dropLevel) + curveLevel.offset) : itemLevel;

        // Handle offsets for this Era
        const eraOffsets = operations.filter(op => op.type === 'era offset' && op.value.squishEra === squishEra.id);

        eraOffsets.forEach(op =>{ 
            itemLevel += op.value.amount;
          })
        });

      operations.filter(op => op.type === 'modern offset').forEach(op => {
        itemLevel += op.value.amount;
      })

    }

    //console.log(operations);

    return itemLevel;

}

export function runSimC(simCInput: string, player: Player, contentType: contentTypes, setErrorMessage: any, snackHandler: any, 
                            closeDialog: () => void, clearSimCInput: (simcMessage: string) => void, playerSettings: PlayerSettings, 
                            allPlayers: PlayerChars, autoUpgradeVault: boolean, autoUpgradeAll: boolean) {
  let lines = simCInput.split("\n");

  // Check that the SimC string is valid.
  if (checkSimCValid(lines.slice(0, 8), lines.length, player.getSpec(), setErrorMessage)) {
    player.clearActiveItems();

    /* Loop through our SimC string. 
        We're looking for the following:
        - The items ID which we'll cross reference with our ItemDB.
        - The items slot which is always found at the start of the line.
        - The items bonus ID's which we'll use to calculate it's item level, whether it has a socket and what tertiaries might be attached.
            - Bonus IDs can also identify a Timewalking item.

        We should take care that we never use the Name tags in the string.
    */

    const linkedItems = lines.indexOf("### Linked gear") !== -1 ? lines.indexOf("### Linked gear") : lines.length;
    const vaultItems = lines.indexOf("### Weekly Reward Choices") !== -1 ? lines.indexOf("### Weekly Reward Choices") : linkedItems;

    if (lines[0].includes("#") && !lines[0].includes("Warcraft Logs")) {
      const playerName = lines[0].split("-")[0].replace("#", "").trim();

      if (playerName) {
        player.charName = playerName;
        player.realm = getPlayerServerName(lines) || "";
        player.region = getPlayerServerRegion(lines) || "";
        //player.race = getPlayerRace(lines) || "";
      }
    }
    
    processAllLines(player, contentType, lines, linkedItems, vaultItems, playerSettings, autoUpgradeVault, autoUpgradeAll);
    player.savedPTRString = simCInput;




    allPlayers.updatePlayerChar(player);
    allPlayers.saveAllChar();

    snackHandler();
    closeDialog();
    clearSimCInput("");
  }
}

export function processAllLines(player: Player, contentType: contentTypes, lines: string[], linkedItems: number, vaultItems: number, playerSettings: PlayerSettings, autoUpgradeVault: boolean, autoUpgradeAll: boolean) {
  for (var i = 8; i < lines.length; i++) {
    let line = lines[i];
    let type = i > vaultItems && i < linkedItems ? "Vault" : "Regular";
    // If our line doesn't include an item ID, skip it.
    if (line.includes("id=")) {
      if (line.includes("unknown")) {
        // There aren't currently any tokens in the game and haven't been since Nathria.
        // this code is left in in case we need to res it in future.
        //processToken(line, player, contentType, type);
      } else {
        try {
          const item = processItem(line, player, contentType, type, playerSettings, autoUpgradeVault, autoUpgradeAll);
          if (item) player.addActiveItem(item);
        }
        catch (e) {
          console.error("Error processing SimC line: " + line);
        }

      }
    }
  }

  // Filter low level items. This is honestly just for people who store 1000 items in their bags. 
  // Step 1: Find the highest level per slot
  const maxLevels = player.activeItems.reduce((acc, item) => {
    acc[item.slot] = Math.max(acc[item.slot] ?? 0, item.level);
    return acc;
  }, {});

  // Step 2: Filter items that are within 40 levels of that max
  player.activeItems = player.activeItems.filter(item => 
    (item.level >= maxLevels[item.slot] - 40 || item.slot === "Trinket" || item.slot === "Finger")
  );


  player.updatePlayerStats();
  
}

// A simC string is valid if it fulfills the following conditions:
// - The class in the string matches the currently selected player character.
// - The level in the string is 60 (50 also available pre-release).
// - The version of the SimC addon is reasonably up to date. This is currently not active so automatically passes.
// - The string length is less than our specified maximum. This is a loose requirement that's mostly designed around preventing user error like copy pasting their string twice.
function checkSimCValid(simCHeader: string[], length: number, playerClass: string, setErrorMessage: (errorMessage: string) => void) {
  // console.log("Checking SimC Valid");
  let checks: {
    class: boolean;
    version: boolean;
    level: boolean;
    length: boolean;
    gameType: boolean;
  } = {
    class: false,
    version: true, // Note that version is not actually checked right now. There's generally just not a lot of need unless there are breaking addon changes.
    level: true,
    length: length < 1000, // This really only prevents abuse cases since 600 is a very long regular SimC string.
    gameType: true,
  };
  let errorMessage = "";

  for (var i = 0; i < simCHeader.length; i++) {
    let line = simCHeader[i];

    // Check that the player class matches. This is actually quite a common error since people swap characters but don't swap in QE Live.
    if (line !== "" && playerClass.toLowerCase().includes(line.split("=")[0].toLowerCase())) checks.class = true;
    else if (line.split("=")[0] === "level" && (line.split("=")[1] === "80" || line.split("=")[1] === "70")) checks.level = true;
    if (line.includes("QE Live Gear Importer")) checks.gameType = false;
  }

  if (!checks.class) errorMessage += "You're currently a " + playerClass + " but this SimC string is for a different spec.";
  if (!checks.level) errorMessage += "QE Live is designed for level 80 characters. ";
  if (!checks.length) errorMessage += "Your SimC string is a bit long. Make sure you haven't pasted it in twice!";
  if (!checks.gameType) errorMessage += "This is a Cataclysm string but you have a War Within character selected!";

  setErrorMessage(errorMessage);
  return checks.class && checks.version && checks.level && checks.length && checks.gameType;
}

/* 
// Tokens are not currently in game and haven't been since Nathria. This code might need conversion to TS and some clean up if they are re-added ever.
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
 * @param {*} curveID The curveID we'll use to check the item levels available. It's a number but indexed as a string.
 * @param {*} dropLevel The player level when the item dropped.
 * @returns
 */
export function processCurve(curveID: string, dropLevel: number) {
  const curveData = curveDB[curveID];
  if (!curveData || !curveData.points) return 0;

  const curve = curveData.points;

  let jump = 0;
  let playerLevelGap = 0;

  // If we can't find a curve that matches, return 0.
  if (curve.length === 0 || curve === undefined || dropLevel === 0) return 0;
  // If a curve only has 1 point, return that point.
  if (curve.length === 1) return curve[0].itemLevel;
  else {
    for (var i = 0; i < curve.length; i++) {
      if (curve[i].playerLevel >= dropLevel) {
        // We've found the right place in the curve. This is the lowest index that's higher than the drop level.
        if (i > 0) {
          playerLevelGap = curve[i].playerLevel - curve[i - 1].playerLevel;
          jump = (curve[i].itemLevel - curve[i - 1].itemLevel) / playerLevelGap;
          return Math.round(curve[i - 1].itemLevel + jump * (dropLevel - curve[i - 1].playerLevel));
        } else {
          //playerLevelGap = 0;
          //jump = curve[i].itemLevel / playerLevelGap;
          return Math.round(curve[i].itemLevel);
        }
      }
    }
  }

  return 0;
}

export function processItem(line: string, player: Player, contentType: contentTypes, type: string, playerSettings: PlayerSettings, autoUpgradeVault: boolean, autoUpgradeAll: boolean) {
  // Split string.
  interface ProtoItem {
    id: number;
    slot: string;
    upgradeTrack: string;
    upgradeRank: number;
    level: number;
    uniqueTag: string;
    itemEquipped: boolean;
    sockets: number;
    tertiary: Tertiaries
    quality: number;
    missiveStats: string[];
    effect?: ItemEffect | null;
    itemConversion?: number;
  }

  let protoItem: ProtoItem = {
    id: -1,
    slot: "",
    upgradeTrack: "",
    upgradeRank: 0,
    level: 0,
    uniqueTag: "",
    itemEquipped: !line.includes("#"),
    sockets: 0,
    tertiary: "",
    quality: 0,
    missiveStats: [],
  }

  let infoArray = line.split(",");
  let itemBonusIDs: string[] = [];
  let itemBonusStats = {}; // Bonus_stats that don't naturally come on the item. Crafting and "of the X" items are the primary example.
  let gemID: string[] = []; // This is used to construct a gem string but doesn't affect any stats on the item.
  let gemString: string = ""; // Gem string. Just used for tooltips.
  let bonusIDS = "";
  let craftedIDs = []; // Used to append crafted stats to the wowhead tooltip.
  let enchantID = 0;
  let titanDisc = 0;
  let itemSpecial = 0;
  let dropLevel = -1;

  let specialAllocations: {[key: string]: number} = {};
  
  // Build out our item information.
  // WoW bonus IDs are very messy, and so this is somewhat messy too but documentation is added to make things clearer where possible. 
  for (var j = 0; j < infoArray.length; j++) {
    let info = infoArray[j];

    if (j === 0) {
      // Do nothing.
    }
    else if (info.includes("bonus_id=") && !(info.includes("gem_bonus_id="))) {
      
      itemBonusIDs = info.split("=")[1].split("/");
      bonusIDS = itemBonusIDs.join(":");
    } 
    else if (info.includes("gem_id=")) gemID = info.split("=")[1].split("/");
    else if (info.includes("enchant_id=")) enchantID = parseInt(info.split("=")[1]);
    else if (info.includes("titan_disc_id=")) titanDisc = parseInt(info.split("=")[1]);
    else if (info.includes("id=") && !(info.includes("gem_bonus_id="))) protoItem.id = parseInt(info.split("=")[1]);
    else if (info.includes("drop_level=")) dropLevel = parseInt(info.split("=")[1]);
    else if (info.includes("crafted_stats=")) {
      const craftedStats = info.split("=")[1].split("/");
      craftedStats.forEach(stat => {
        protoItem.missiveStats.push(stat_ids[parseInt(stat)]);
      });
      craftedIDs = craftedStats;
      
    }
    else if (info.includes("ilevel=") || info.includes("ilvl=")) protoItem.level.override = parseInt(info.split("=")[1]);//  levelOverride = 
    
  }

  // Grab the items base level from our item database.
  protoItem.slot = getItemProp(protoItem.id, "slot");
  protoItem.level = getItemLevel(protoItem.id, itemBonusIDs.map(Number), protoItem.level.drop || 0);
  //console.log(itemID + ": " + itemSlot + ". Item Level:" + itemLevel + ". Bonus: " + itemBonusIDs);
  // Process our bonus ID's so that we can establish the items level and sockets / tertiaries.
  for (var k = 0; k < itemBonusIDs.length; k++) {
    let bonus_id = itemBonusIDs[k].toString();
    let idPayload = bonus_IDs[bonus_id];
    if (idPayload !== undefined) {
      if ("level" in idPayload) {
        // Do nothing. Levels are handled in getItemLevel since it's very complicated now.
      }
      else if ("socket" in idPayload) {
        protoItem.sockets += idPayload["socket"];
      } 
      else if (bonus_id === "41") {
        protoItem.tertiary = "Leech";
      }
      else if ("rawStats" in idPayload) {
        idPayload["rawStats"].forEach((stat: any) => {
          if (["Haste", "Crit", "Vers", "Mastery", "Intellect"].includes(stat["name"])) {
            let statName = stat["name"].toLowerCase();
            if (statName === "vers") statName = "versatility"; // Pain
            specialAllocations[statName] = stat["amount"];
            if (protoItem.id === 235499) {
              itemSpecial = parseInt(bonus_id);
            }

          }
        });
      } else if ("curveId" in idPayload) {
        // Handled in getItemLevel now.

        //let curve = idPayload["curveId"];

        //protoItem.level.override = processCurve(curve, protoItem.level.drop);
        //levelOverride = processCurve(curve, protoItem.level.drop);

      } 
      else if ("upgrade" in idPayload && "name" in idPayload.upgrade) {
        const upgradeName = idPayload.upgrade.name;
        // Note that previous seasons have their bonus IDs updated to be an item tag instead of an upgrade track.
        // For that reason we don't really need to support multiple seasons at once.
        if (["Myth", "Veteran", "Adventurer", "Explorer", "Champion", "Hero"].includes(upgradeName) && idPayload.upgrade.seasonId === CONSTANTS.seasonID) {
          protoItem.upgradeTrack = upgradeName;
          protoItem.upgradeRank = idPayload.upgrade.level;
        }
      }
      else if ("item_conversion" in idPayload) {
        const itemConversion = idPayload["item_conversion"];
        if (itemConversion === CONSTANTS.seasonalItemConversion) protoItem.itemConversion = CONSTANTS.seasonalItemConversion;
      }
      else if ("name_override" in idPayload) {
        // Currently unused, but previously used for Unity. 
      }
      if ("quality" in idPayload) {
        protoItem.quality = idPayload["quality"];
      } 
      if ("craftedStats" in idPayload) {
        //craftedStats = idPayload['craftedStats'];
        const craftedStats: number[] = idPayload['craftedStats'];
        protoItem.missiveStats = []; // Override any existing stats.
        craftedStats.forEach((stat: number) => {
          protoItem.missiveStats.push(stat_ids[stat]);
        });
        
      }
      if ("effect" in idPayload) {
        if ("spell" in idPayload["effect"] && bonus_id !== "8174" && bonus_id !== "6917") { // Ignore Flavor Packet.
          let specialEffectName = idPayload["effect"]["spell"]["name"]


          // Embellishments that require a tag.
          if (['Writhing Armor Banding', 'Ascendance', 'Symbiosis', 'Blessed Weapon Grip', "Darkmoon Sigil: Ascension", 'Darkmoon Sigil: Symbiosis', 'Duskthread Lining', 'Dawnthread Lining', 'Energy Redistribution Beacon'].includes(specialEffectName)) {
            if (specialEffectName === "Ascendance") specialEffectName = "Darkmoon Sigil: Ascension"
            else if (specialEffectName === "Symbiosis") specialEffectName = "Darkmoon Sigil: Symbiosis"
            
            protoItem.effect = {
              type: "embellishment",
              name: specialEffectName,
              level: protoItem.level //(itemBaseLevel + itemLevelGain),
            }
            
            protoItem.uniqueTag = "embellishment";
          }

          }

        }
    }
    // Missives.
    // Missives are on every legendary, and are annoyingly also on some crafted items.
    // Crafted items will either have a missive ID and an INCORRECT crafted_stats id or just a CORRECT crafted_stats ID.
    // Therefore if a missive ID is present, we need to kill the crafted_stats value.
    else if (bonus_id === "6647") {
      protoItem.missiveStats.push("crit");
      //craftedStats = [];
    } else if (bonus_id === "6648") {
      protoItem.missiveStats.push("mastery");
      //craftedStats = [];
    } else if (bonus_id === "6649") {
      protoItem.missiveStats.push("haste");
      //craftedStats = [];
    } else if (bonus_id === "6650") {
      protoItem.missiveStats.push("versatility");
      //craftedStats = [];
    }
    if (bonus_id === "12053") {
      protoItem.upgradeTrack = "Gilded Crafted";
    }
    else if (bonus_id === "12052") {
      protoItem.upgradeTrack = "Runed Crafted";
    }
    if (bonus_id === "8960") protoItem.uniqueTag = "embellishment";
  }

  // If our item has a special level override then we'll use that. If not, our level is equal to our baseLevel and our levelGain.
  //if (protoItem.level.override !== 0) protoItem.level.finalLevel = Math.min(699, protoItem.level.override);
  //else protoItem.level.finalLevel = protoItem.level.baseLevel + protoItem.level.levelGain;

  // Check Gems for Dom sockets
  if (gemID.length > 0) {
    gemID.forEach((gem: string) => {
      gemString += gem + ":";
    });
  }

  // Auto upgrade vaults
  if (autoUpgradeAll) {
    const itemLevelCaps: { [key: string]: number } = { Explorer: 110, Adventurer: 110, Veteran: 120, Champion: 140, Hero: 157, Myth: 170, Circlet: 155 };
    if (protoItem.upgradeTrack && protoItem.upgradeTrack in itemLevelCaps) protoItem.level = itemLevelCaps[protoItem.upgradeTrack];
  }
  else if (type === "Vault" && autoUpgradeVault) {
    const itemLevelCaps: { [key: string]: number } = { Explorer: 110, Adventurer: 110, Veteran: 120, Champion: 140, Hero: 157, Myth: 170, Circlet: 155 };
    if (protoItem.upgradeTrack && protoItem.upgradeTrack in itemLevelCaps) protoItem.level = itemLevelCaps[protoItem.upgradeTrack];
  }
  
  const acceptableArmorTypes = getValidArmorTypes(player.spec);
  const acceptableWeaponTypes = getValidWeaponTypesBySpec(player.spec);
  const itemData = getItem(protoItem.id, "Retail")
  const isSuitable = (itemData.slot === "Back" ||
          (itemData.itemClass === 4 && acceptableArmorTypes.includes(itemData.itemSubClass)) ||
          itemData.slot === "Holdable" ||
          itemData.slot === "Offhand" ||
          (itemData.itemClass === 2 && acceptableWeaponTypes.includes(itemData.itemSubClass)))
  
  

  
  // Add the new item to our characters item collection.
  // Note that we're also verifying that the item is at least level 50 and that it exists in our item database.
  if (protoItem.level > 50 && protoItem.id !== 0 && getItem(protoItem.id) !== "" && isSuitable) {


    let itemAllocations = getItemAllocations(protoItem.id, protoItem.missiveStats);
    itemAllocations = Object.keys(specialAllocations).length > 0 ? compileStats(itemAllocations, specialAllocations) : itemAllocations;
    
    let item = new Item(protoItem.id, "", protoItem.slot, protoItem.sockets || checkDefaultSocket(protoItem.id), protoItem.tertiary, 0, protoItem.level, bonusIDS);
    if (craftedIDs) item.craftedStats = craftedIDs;
    // Make some further changes to our item based on where it's located and if it's equipped.
    item.vaultItem = type === "Vault";
    item.isEquipped = protoItem.itemEquipped;
    item.itemConversion = protoItem.itemConversion || 0;
    item.active = protoItem.itemEquipped || item.vaultItem;
    if (protoItem.missiveStats) item.missiveStats = protoItem.missiveStats;

    if (Object.keys(specialAllocations).length > 0) item.specialAllocations = itemAllocations;
    // Add stats to our item based on its item allocations.
    item.stats = calcStatsAtLevel(item.level, protoItem.slot, itemAllocations, protoItem.tertiary);
    item.gemString = gemString !== "" ? gemString.slice(0, -1) : "";
    if (Object.keys(itemBonusStats).length > 0) item.addStats(itemBonusStats);

    // Special effects. Note we handle them here instead of in the items constructor in case the player has added an effect to an item like an Embellishment.
    item.effect = protoItem.effect ? protoItem.effect : getItemProp(protoItem.id, "effect");

    if (item.vaultItem) item.uniqueEquip = "vault";
    else if (protoItem.uniqueTag !== "") item.uniqueEquip = protoItem.uniqueTag;

    if (protoItem.upgradeTrack !== "") {
      item.upgradeTrack = protoItem.upgradeTrack;
      item.upgradeRank = protoItem.upgradeRank || 0;
    }
    if (item.flags.includes("DelveBelt") && titanDisc !== 0) {
      if (getTitanDiscName(titanDisc) !== "Unknown Effect") item.selectedOptions = [titanDisc]
    }
    if (protoItem.id === 235499) {
      // Reshii Wraps
      item.selectedOptions = [itemSpecial];
    }

    item.quality = protoItem.quality !== 0 ? protoItem.quality : (getItemProp(protoItem.id, "quality") || 4);
    item.softScore = scoreItem(item, player, contentType, "Retail", playerSettings);

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
/*
function getSecondaryAllocationAtItemLevel(itemLevel: number, slot: string, crafted_stats: any = []) {
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

  crafted_stats.forEach((stat: any) => {
    bonus_stats[stat_ids[stat]] = allocation;
  });

  return bonus_stats;
} */

// Compiles stats & bonus stats into one array to which we can then apply DR etc.
/*
function compileStats(stats, bonus_stats) {
  for (var stat in stats) {
    stats[stat] += stat in bonus_stats ? bonus_stats[stat] : 0;
  }

  return stats;
}*/


