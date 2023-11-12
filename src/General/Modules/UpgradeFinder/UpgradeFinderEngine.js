import { itemDB, tokenDB } from "../../../Databases/ItemDB";
import Item from "../Player/Item";
import { runTopGear } from "../TopGear/Engine/TopGearEngine";
import { calcStatsAtLevel, getItemLevelBoost, getVeryRareItemLevelBoost, getItemAllocations, scoreItem, getValidArmorTypes, getValidWeaponTypes, getItem, filterItemListByType, getItemProp, getExpectedItemLevel } from "../../Engine/ItemUtilities";
import UpgradeFinderResult from "./UpgradeFinderResult";
import { apiSendUpgradeFinder } from "../SetupAndMenus/ConnectionUtilities";
import { itemLevels } from "../../../Databases/itemLevelsDB";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities"
import { CONSTANTS } from "General/Engine/CONSTANTS";
/*
The core Upgrade Finder loop is as follows:
- Run the players current gear set through our evaluation function to get a baseline score.
- Loop through the ItemDB and find all items that drop from raid, Mythic+, or PVP.
- For each item, build a set consisting of a players current item set + the item. 
- Run each set through our evaluation function. Store the score differential against the item.
- Print the items in the correct place along with their score differential. 
- (Extra Feature) Include a summary page that lists the largest score upgrades and where they come from. 
*/

// This is a copy paste from buildWepCombos.
// TODO: Make buildWepCombos accept a generic list of items instead of auto-using the players set. Then fold this function into it.
/*
export function buildWepCombosUF(player, itemList) {
  let wep_list = [];
  let main_hands = filterItemListByType(itemList, "1H Weapon");
  let off_hands = filterItemListByType(itemList, "Offhands");
  let two_handers = filterItemListByType(itemList, "2H Weapon");

  for (let i = 0; i < main_hands.length; i++) {
    // Some say j is the best variable for a nested loop, but are they right?
    let main_hand = main_hands[i];
    for (let k = 0; k < off_hands.length; k++) {
      let off_hand = off_hands[k];

      if (main_hand.vaultItem && off_hand.vaultItem) {
        // If both main hand and off hand are vault items, then we can't make a combination out of them.
        continue;
      } else {
        let item = new Item(
          main_hand.id,
          "Combined Weapon", // TODO
          "CombinedWeapon",
          false, // Socket - Not relevant for weapons.
          "", // Tertiary
          0,
          Math.round((main_hand.level + off_hand.level) / 2),
          "", // Bonus Ids
        );
        item.stats = sumObjectsByKey(main_hand.stats, off_hand.stats);
        item.stats.bonus_stats = {};
        item.uniqueEquip = item.vaultItem ? "vault" : "";

        item.softScore = main_hand.softScore + off_hand.softScore;
        item.offhandID = off_hand.id;

        wep_list.push(item);
      }
    }
  }

  for (let j = 0; j < two_handers.length; j++) {
    wep_list.push(two_handers[j]);
  }

  wep_list.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));

  return wep_list.slice(0, 9);
} */

// This is a new version of WepCombos that simply stores them in an array instead of in a weird 
// composite "fake item". Top Gear can then separate them after combinations have been built.
export function buildNewWepCombosUF(player, itemList) {
  let wep_list = [];
  let main_hands = filterItemListByType(itemList, "1H Weapon");
  let off_hands = filterItemListByType(itemList, "Offhands");
  let two_handers = filterItemListByType(itemList, "2H Weapon");
  let combos = []

  for (let i = 0; i < main_hands.length; i++) {
    // Some say j is the best variable for a nested loop, but are they right?
    let main_hand = main_hands[i];
    for (let k = 0; k < off_hands.length; k++) {
      let off_hand = off_hands[k];

      if (main_hand.vaultItem && off_hand.vaultItem) {
        // If both main hand and off hand are vault items, then we can't make a combination out of them.
        continue;
      } else {
        const combo = [main_hand, off_hand];
        combos.push(combo);
      }
    }
  }

  for (let j = 0; j < two_handers.length; j++) {
    combos.push([two_handers[j]]);
  }

  return combos
}

export function runUpgradeFinder(player, contentType, currentLanguage, playerSettings, userSettings) {
  // TEMP VARIABLES

  const completedItemList = [];


  // console.log("Running Upgrade Finder. Strap in.");
  const baseItemList = player.getEquippedItems(true);
  //const wepList = buildWepCombosUF(player, baseItemList);
  const wepList = buildNewWepCombosUF(player, baseItemList);
  const castModel = player.getActiveModel(contentType);


  const baseHPS = player.getHPS(contentType);
  //userSettings.dominationSockets = "Upgrade Finder";
  const baseSet = runTopGear(baseItemList, wepList, player, contentType, baseHPS, userSettings, castModel);
  const baseScore = baseSet.itemSet.hardScore;

  const itemPoss = buildItemPossibilities(player, contentType, playerSettings, userSettings);

  for (var x = 0; x < itemPoss.length; x++) {
    completedItemList.push(processItem(itemPoss[x], baseItemList, baseScore, player, contentType, baseHPS, currentLanguage, userSettings, castModel));
  }

  const result = new UpgradeFinderResult(itemPoss, completedItemList, contentType);
  // console.log("=== Upgrade Finder Finished ===");
  apiSendUpgradeFinder(player, contentType);

  return result;
}

export function getSetItemLevel(itemSource, playerSettings, raidIndex = 0, itemID = 0) {
  let itemLevel = 0;
  const instanceID = itemSource[0].instanceId;
  const bossID = itemSource[0].encounterId;

  if (instanceID === 1207) {
    const difficulty = playerSettings.raid[raidIndex];
    itemLevel = itemLevels.raid[difficulty]; // Get the base level of the item.

    // If we're looking at Max difficulties then only grab the very rare boost.
    //if (difficulty === CONSTANTS.difficulties.heroicMax || difficulty === CONSTANTS.difficulties.heroicMax || difficulty === CONSTANTS.difficulties.mythicMax) itemLevel += getVeryRareItemLevelBoost(itemID, bossID, difficulty);

    // Otherwise grab both the very rare and any boss-specific item level increase.
    itemLevel += getItemLevelBoost(bossID, difficulty) + getVeryRareItemLevelBoost(itemID, bossID, difficulty);

  }

  // World Bosses
  else if (instanceID === 1205) {
    if (bossID === 2531) itemLevel = 415;
    else if (bossID === 2562) itemLevel = 454 // Technically the neck is 460.
    else itemLevel = 389;
  }
  
  else if (instanceID === -1) {
    if ([1201, 1202, 1203, 1198].includes(bossID)) itemLevel = 372; // M0 only dungeons.
    else itemLevel = itemLevels.dungeon[playerSettings.dungeon];
  } 
  //else if (instanceID === 1209) itemLevel = 441; // Dawn of the Infinite, upgraded one time.
  else if (instanceID === -30) itemLevel = 359; // Honor. Currently unused.
  else if (instanceID === -31) {
    // Conquest
    itemLevel = itemLevels.pvp[playerSettings.pvp];
    //if (playerSettings.pvp === 5 && ["1H Weapon", "2H Weapon", "Offhand", "Shield"].includes(slot)) itemLevel += 7;
  }

  return itemLevel;
}



function buildItem(player, contentType, rawItem, itemLevel, source, settings) {
  const itemSource = source; //rawItem.sources[0];
  const itemSlot = rawItem.slot;
  const itemID = rawItem.id;
  const tertiary = settings.upFinderLeech ? "Leech" : ""; // TODO
  const bonusIDs = settings.upFinderLeech ? "41" : "";

  let item = new Item(itemID, "", itemSlot, false, tertiary, 0, itemLevel, bonusIDs);
  if (item.slot === "Neck") item.socket = 3;
  //let itemAllocations = getItemAllocations(itemID, []);
  //item.stats = calcStatsAtLevel(itemLevel, itemSlot, itemAllocations, "");
  //item.level = itemLevel;
  item.softScore = scoreItem(item, player, contentType, settings);
  item.source = itemSource;

  return item;
}

function convertRaidDifficultyToString(raidID) {
  const raidDifficulty = ["Raid Finder", "Raid Finder (Max)", "Normal", "Normal (Max)", "Heroic", "Heroic (Max)", "Mythic", "Mythic (Max)"];
  return raidDifficulty[raidID];
}

function buildItemPossibilities(player, contentType, playerSettings, settings) {
  let itemPoss = [];

  // Grab items.
  for (var i = 0; i < itemDB.length; i++) {
    const rawItem = itemDB[i];
    if ("sources" in rawItem && checkItemViable(rawItem, player)) {
      const itemSources = rawItem.sources;
      const primarySource = itemSources[0].instanceId;
      const encounter = itemSources[0].encounterId;
      const isRaid = primarySource === 1207 || primarySource === -22;

      if (isRaid && encounter > 0) {
        // 
        for (var x = 0; x < playerSettings.raid.length; x++) {
          const itemLevel = getSetItemLevel(itemSources, playerSettings, x, rawItem.id);
          const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0], settings);
          item.quality = 4;
          item.dropLoc = "Raid";
          item.dropDifficulty = playerSettings.raid[x]; //
          item.dropDifficultyTxt = convertRaidDifficultyToString(playerSettings.raid[x]);
          itemPoss.push(item);
        }
      } else if (primarySource === -1 || primarySource === 1205) {
        // M+ Dungeons, Dawn of the Infinite & World Bosses
        if ([-55, -56, 762, 740,1021, 968, 556, 65,].includes(encounter) || primarySource === 1205) {
          const itemLevel = getSetItemLevel(itemSources, playerSettings, 0);
          const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0], settings);
          item.dropLoc = "Mythic+";
          item.dropDifficulty = "";
          item.dropDifficultyTxt = "";
          item.quality = 4;
          itemPoss.push(item);
        }

      } 
      /*else if (primarySource !== -18) {
        /*
        // Exclude Nathria gear.
        const itemLevel = getSetItemLevel(itemSources, playerSettings, 0);
        const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0], settings);
        item.quality = 4;

        itemPoss.push(item);
      } */
    }
  }

  // --------------------------
  // Take care of Tokens >:(
  // --------------------------

  /*
  for (const [key, value] of Object.entries(tokenDB)) {
    const rawToken = value;

    if ("encounterId" in rawToken && rawToken.specs.includes(player.getSpec())) {
      const newItemIDs = rawToken[player.getCovenant()];
      const itemSource = { instanceId: 1190, encounterId: rawToken.encounterId };

      for (var j = 0; j < newItemIDs.length; j++) {
        for (var x = 0; x < playerSettings.raid.length; x++) {
          const rawItem = getItem(newItemIDs[j]);

          if (checkItemViable(rawItem, player)) {
            const itemLevel = getSetItemLevel(itemSource, playerSettings, x, rawItem.slot);
            const item = buildItem(player, contentType, rawItem, itemLevel, itemSource);
            itemPoss.push(item);
          }
        }
      }
    }
  } */

  return itemPoss; // TODO: Remove Slice. It's just for testing in a smaller environment.
}

// Returns a small dict
function processItem(item, baseItemList, baseScore, player, contentType, baseHPS, currentLanguage, userSettings, castModel) {
  let newItemList = [...baseItemList];
  newItemList.push(item);
  const wepList = buildNewWepCombosUF(player, newItemList);
  const newTGSet = runTopGear(newItemList, wepList, player, contentType, baseHPS, userSettings, castModel);

  const newScore = newTGSet.itemSet.hardScore;
  //const differential = Math.round(100*(newScore - baseScore))/100 // This is a raw int difference.
  let differential = 0;

  const rawDiff = Math.round(((newScore - baseScore) / baseScore) * baseHPS);
  const percDiff = (newScore - baseScore) / baseScore

  if (getSetting(userSettings, "upgradeFinderMetric") === "Show HPS") differential = rawDiff;
  else differential = percDiff;
  //console.log(item);
  return { item: item.id, dropLoc: item.dropLoc, dropDifficulty: item.dropDifficulty, level: item.level, score: differential, rawDiff: Math.round(rawDiff), percDiff: Math.round(percDiff * 100000)/1000 };
}

function checkItemViable(rawItem, player) {
  const spec = player.getSpec();
  const acceptableArmorTypes = getValidArmorTypes(spec);
  const acceptableWeaponTypes = getValidWeaponTypes(spec, "Weapons");
  const acceptableOffhands = getValidWeaponTypes(spec, "Offhands");
  const classRestriction = getItemProp(rawItem.id, "classRestriction");

  // Check that the item is wearable by the given class. Could be split into an armor and weapons check for code cleanliness.
  const slotCheck =
    rawItem.slot === "Back" ||
    (rawItem.itemClass === 4 && acceptableArmorTypes.includes(rawItem.itemSubClass)) ||
    ((rawItem.slot === "Holdable" || rawItem.slot === "Offhand" || rawItem.slot === "Shield") && acceptableOffhands.includes(rawItem.itemSubClass)) ||
    (rawItem.itemClass === 2 && acceptableWeaponTypes.includes(rawItem.itemSubClass));

  // If an item has a class restriction, make sure that our spec is included.
  const classCheck = classRestriction === "" || classRestriction.includes(spec);

  // Strength / agi items appear in the database, but shouldn't appear in the Upgrade Finder since they are just clutter.
  const statCheck = !("offspecItem" in rawItem); // We'll exclude any agi / str gear from our results since these will never be upgrades.

  return slotCheck && classCheck && statCheck;
}

function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
}
