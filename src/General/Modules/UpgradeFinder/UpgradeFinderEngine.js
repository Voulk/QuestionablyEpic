import { itemDB, tokenDB } from "../../../Databases/ItemDB";
import Item from "../Player/Item";
import { runTopGear } from "../TopGear/Engine/TopGearEngine";
import { buildWepCombos, calcStatsAtLevel, getItemLevelBoost, getItemAllocations, scoreItem, getValidArmorTypes, getValidWeaponTypes, getItem, filterItemListByType, getItemProp, getExpectedItemLevel } from "../../Engine/ItemUtilities";
import UpgradeFinderResult from "./UpgradeFinderResult";
import { apiSendUpgradeFinder } from "../SetupAndMenus/ConnectionUtilities";
import { itemLevels } from "../../../Databases/itemLevelsDB";

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
}

export function runUpgradeFinder(player, contentType, currentLanguage, playerSettings, userSettings) {
  // TEMP VARIABLES

  const completedItemList = [];


  // console.log("Running Upgrade Finder. Strap in.");
  const baseItemList = player.getEquippedItems(true);
  const wepList = buildWepCombosUF(player, baseItemList);
  const castModel = player.getActiveModel(contentType);
  //buildWepCombos(player, false, false); // TODO: DEL

  const baseHPS = player.getHPS(contentType);
  //userSettings.dominationSockets = "Upgrade Finder";
  const baseSet = runTopGear(baseItemList, wepList, player, contentType, baseHPS, currentLanguage, userSettings, castModel);
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

function getSetItemLevel(itemSource, playerSettings, raidIndex = 0) {
  let itemLevel = 0;
  const instanceID = itemSource[0].instanceId;
  const bossID = itemSource[0].encounterId;
  if (instanceID === 1200) itemLevel = itemLevels.raid[playerSettings.raid[raidIndex]] + getItemLevelBoost(bossID);
  // 1195 is Sepulcher gear.
  // World Bosses
  else if (instanceID === 1205) itemLevel = 389;
  
  else if (instanceID === -1) {
    if ([1204, 1199, 1197, 1196].includes(bossID)) itemLevel = 372; // M0 only dungeons.
    else itemLevel = itemLevels.dungeon[playerSettings.dungeon];
  } else if (instanceID === -30) itemLevel = 359;
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
  //let itemAllocations = getItemAllocations(itemID, []);
  //item.stats = calcStatsAtLevel(itemLevel, itemSlot, itemAllocations, "");
  //item.level = itemLevel;
  item.softScore = scoreItem(item, player, contentType, settings);
  item.source = itemSource;

  return item;
}

function buildItemPossibilities(player, contentType, playerSettings, settings) {
  let itemPoss = [];

  // Grab items.
  for (var i = 0; i < itemDB.length; i++) {
    const rawItem = itemDB[i];
    if ("sources" in rawItem && checkItemViable(rawItem, player)) {
      const itemSources = rawItem.sources;
      const primarySource = itemSources[0].instanceId;
      const isRaid = primarySource === 1200 || primarySource === -22;

      if (isRaid) {
        // Sepulcher
        for (var x = 0; x < playerSettings.raid.length; x++) {
          const itemLevel = getSetItemLevel(itemSources, playerSettings, x, rawItem.slot);
          const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0], settings);
          item.quality = 4;
          itemPoss.push(item);
        }
      } else if (primarySource === -1) {
        // M+ Dungeons
        const itemLevel = getSetItemLevel(itemSources, playerSettings, 0, rawItem.slot);
        const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0], settings);
        item.quality = 4;
        itemPoss.push(item);
      } else if (primarySource !== -18) {
        /*
      else if (primarySource === 1194) {
        // Tazavesh
        const itemLevel = getSetItemLevel(itemSources, playerSettings, 0, rawItem.slot);
        const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[2]);
        itemPoss.push(item);
      } */
        // Exclude Nathria gear.
        const itemLevel = getSetItemLevel(itemSources, playerSettings, 0, rawItem.slot);
        const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0], settings);
        item.quality = 4;

        itemPoss.push(item);
      }
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
  const wepList = buildWepCombosUF(player, newItemList);
  const newTGSet = runTopGear(newItemList, wepList, player, contentType, baseHPS, currentLanguage, userSettings, castModel);

  const newScore = newTGSet.itemSet.hardScore;
  //const differential = Math.round(100*(newScore - baseScore))/100 // This is a raw int difference.
  let differential = 0;

  if (userSettings.upFinderToggle === "hps") differential = Math.round(((newScore - baseScore) / baseScore) * baseHPS);
  else differential = (newScore - baseScore) / baseScore;

  return { item: item.id, level: item.level, score: differential };
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
