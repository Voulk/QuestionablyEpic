import { itemDB, tokenDB } from "../../../Databases/ItemDB";
import Item from "../Player/Item";
import { runTopGear } from "../TopGear/TopGearEngine";
import {
  buildWepCombos,
  calcStatsAtLevel,
  getItemAllocations,
  scoreItem,
  getValidArmorTypes,
  getValidWeaponTypes,
  getItem,
  filterItemListByType,
} from "../../Engine/ItemUtilities";
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

  //console.log("MH: " + main_hands.length + ". OH: " + off_hands.length + ". 2H: " + two_handers.length);

  for (let i = 0; i < main_hands.length; i++) {
    // Some say j is the best variable for a nested loop, but are they right?
    let main_hand = main_hands[i];
    for (let k = 0; k < off_hands.length; k++) {
      let off_hand = off_hands[k];

      //console.log("Wep Loop" + i + "/" + k + ". " + main_hand.level + ". " + off_hand.level);

      if (main_hand.vaultItem && off_hand.vaultItem) {
        // If both main hand and off hand are vault items, then we can't make a combination out of them.
        continue;
      } else {
        let item = new Item(
          main_hand.id,
          "Combined Weapon", // TODO
          "CombinedWeapon",
          main_hand.socket + off_hand.socket, // Socket
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
        //console.log("COMBO: " + main_hand.level + " - " + off_hand.level + ". Combined: " + item.level);
        wep_list.push(item);
      }
    }
  }

  for (let j = 0; j < two_handers.length; j++) {
    wep_list.push(two_handers[j]);
  }

  wep_list.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));
  //console.log(JSON.stringify(wep_list));
  return wep_list.slice(0, 9);
}

export function runUpgradeFinder(player, contentType, currentLanguage, playerSettings, userSettings) {
  // TEMP VARIABLES
  //const playerSettings = {raid: 3, dungeon: 15, pvp: 4};
  //

  const completedItemList = [];

  // console.log("Running Upgrade Finder. Strap in.");
  const baseItemList = player.getEquippedItems(true);
  const wepList = buildWepCombosUF(player, baseItemList);
  const castModel = player.castModel[contentType];
  //buildWepCombos(player, false, false); // TODO: DEL

  const baseHPS = player.getHPS(contentType);
  userSettings.dominationSockets = "Upgrade Finder";
  const baseSet = runTopGear(baseItemList, wepList, player, contentType, baseHPS, currentLanguage, userSettings, castModel);
  const baseScore = baseSet.itemSet.hardScore;


  
  const itemPoss = buildItemPossibilities(player, contentType, playerSettings);

  for (var x = 0; x < itemPoss.length; x++) {
    completedItemList.push(processItem(itemPoss[x], baseItemList, baseScore, player, contentType, baseHPS, currentLanguage, userSettings, castModel));
  }

  const result = new UpgradeFinderResult(itemPoss, completedItemList, contentType);
  //console.log(result);
  // console.log("=== Upgrade Finder Finished ===");
  apiSendUpgradeFinder(player, contentType);

  return result;
}

function getSetItemLevel(itemSource, playerSettings, raidIndex = 0, slot) {
  let itemLevel = 0;
  const instanceID = itemSource.instanceId;
  const bossID = itemSource.encounterId;

  if (instanceID === 1193) itemLevel = itemLevels.raid[playerSettings.raid[raidIndex]];
  else if (instanceID === 1192 && bossID !== 2456) itemLevel = 207; // The 9.0 world bosses drop 207 gear.
  else if (instanceID === 1192 && bossID === 2456) itemLevel = 233; // The 9.1 world boss drops 233 gear.
  // World Bosses
  else if (instanceID === -1) itemLevel = itemLevels.dungeon[playerSettings.dungeon];
  else if (instanceID === -16) itemLevel = 203;
  else if (instanceID === -17) {
    // Conquest
    itemLevel = itemLevels.pvp[playerSettings.pvp];
    //if (playerSettings.pvp === 5 && ["1H Weapon", "2H Weapon", "Offhand", "Shield"].includes(slot)) itemLevel += 7;
  }
  if (bossID === 2440 || bossID === 2441) itemLevel += 7; // Kel'Thuzad / Sylvanus

  return itemLevel;
}

function buildItem(player, contentType, rawItem, itemLevel, source) {
  const itemSource = source; //rawItem.sources[0];
  const itemSlot = rawItem.slot;
  const itemID = rawItem.id;

  let item = new Item(itemID, "", itemSlot, false, "", 0, itemLevel, "");
  //let itemAllocations = getItemAllocations(itemID, []);
  //item.stats = calcStatsAtLevel(itemLevel, itemSlot, itemAllocations, "");
  //item.level = itemLevel;
  item.softScore = scoreItem(item, player, contentType);
  item.source = itemSource;

  return item;
}

function buildItemPossibilities(player, contentType, playerSettings) {
  let itemPoss = [];

  // Grab items.
  for (var i = 0; i < itemDB.length; i++) {
    const rawItem = itemDB[i];
    if ("sources" in rawItem && checkItemViable(rawItem, player)) {
      const itemSource = rawItem.sources[0];

      if (itemSource.instanceId === 1193) { // Sanctum of Domination
        for (var x = 0; x < playerSettings.raid.length; x++) {
          const itemLevel = getSetItemLevel(itemSource, playerSettings, x, rawItem.slot);
          const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0]);
          //console.log("Difficulty: " + playerSettings.raid[x] + ". Item level: " + itemLevel)
          itemPoss.push(item);
        }
      }
      else if (itemSource.instanceId === 1194) {
        // Taz. This will be moved to the Mythic+ section in 9.2 but deserves a separate section for now.
        const item226 = buildItem(player, contentType, rawItem, 226, rawItem.sources[0]);
        itemPoss.push(item226);

        const item233 = buildItem(player, contentType, rawItem, 233, rawItem.sources[0]);
        itemPoss.push(item233);
      }
      else {
        const itemLevel = getSetItemLevel(itemSource, playerSettings, 0, rawItem.slot);
        const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0]);

        itemPoss.push(item);
      }
    }
  }

  // console.log("Tokens: " + Object.keys(tokenDB).length);

  // --------------------------
  // Take care of Tokens >:(
  // --------------------------
  for (const [key, value] of Object.entries(tokenDB)) {
    const rawToken = value;
    //  console.log(rawToken);

    if ("encounterId" in rawToken && rawToken.specs.includes(player.getSpec())) {
      // console.log("Player Covenant: " + player.getCovenant());
      const newItemIDs = rawToken[player.getCovenant()];
      const itemSource = { instanceId: 1190, encounterId: rawToken.encounterId };

      for (var j = 0; j < newItemIDs.length; j++) {
        for (var x = 0; x < playerSettings.raid.length; x++) {
          const rawItem = getItem(newItemIDs[j]);

          if (checkItemViable(rawItem, player)) {
            const itemLevel = getSetItemLevel(itemSource, playerSettings, x, rawItem.slot);
            const item = buildItem(player, contentType, rawItem, itemLevel, itemSource);
            //console.log(item);
            itemPoss.push(item);
          }
        }
      }
    }
  }

  //console.log(itemPoss.length);
  return itemPoss; // TODO: Remove Slice. It's just for testing in a smaller environment.
}

// Returns a small dict
function processItem(item, baseItemList, baseScore, player, contentType, baseHPS, currentLanguage, userSettings, castModel) {
  let newItemList = [...baseItemList];
  newItemList.push(item);
  //console.log(player);
  const wepList = buildWepCombosUF(player, newItemList);
  const newTGSet = runTopGear(newItemList, wepList, player, contentType, baseHPS, currentLanguage, userSettings, castModel);

  const newScore = newTGSet.itemSet.hardScore;
  //const differential = Math.round(100*(newScore - baseScore))/100 // This is a raw int difference.
  const differential = Math.round((10000 * (newScore - baseScore)) / baseScore) / 100;

  return { item: item.id, level: item.level, score: differential };
}

function checkItemViable(rawItem, player) {
  const spec = player.getSpec();
  const acceptableArmorTypes = getValidArmorTypes(spec);
  const acceptableWeaponTypes = getValidWeaponTypes(spec, "Weapons");
  const acceptableOffhands = getValidWeaponTypes(spec, "Offhands");

  return (
    rawItem.slot === "Back" ||
    (rawItem.itemClass === 4 && acceptableArmorTypes.includes(rawItem.itemSubClass)) ||
    ((rawItem.slot === "Holdable" || rawItem.slot === "Offhand" || rawItem.slot === "Shield") && acceptableOffhands.includes(rawItem.itemSubClass)) ||
    (rawItem.itemClass === 2 && acceptableWeaponTypes.includes(rawItem.itemSubClass))
  );
}

function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
}
