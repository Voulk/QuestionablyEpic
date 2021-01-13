import { itemDB } from "../Player/ItemDB";
import Item from "../Player/Item";
import { runTopGear } from "../TopGear/TopGearEngine";
import {
  buildWepCombos,
  calcStatsAtLevel,
  getItemAllocations,
  scoreItem,
  getValidArmorTypes,
  getValidWeaponTypes,
  getItemEffect,
} from "../Engine/ItemUtilities";
import UpgradeFinderResult from "./UpgradeFinderResult";
/*

The core Upgrade Finder loop is as follows:
- Run the players current gear set through our evaluation function to get a baseline score.
- Loop through the ItemDB and find all items that drop from raid, Mythic+, or PVP.
- For each item, build a set consisting of a players current item set + the item. 
- Run each set through our evaluation function. Store the score differential against the item.

- Print the items in the correct place along with their score differential. 
- (Extra Feature) Include a summary page that lists the largest score upgrades and where they come from. 



*/

const itemLevels = {
  raid: [187, 200, 213, 226],
  dungeon: [
    184,
    184,
    187,
    190,
    194,
    194,
    197,
    200,
    200,
    200,
    203,
    203,
    207,
    207,
    207,
    210,
  ],
  pvp: [200, 207, 213, 220, 226],
};

export function runUpgradeFinder(player, contentType, playerSettings) {
  // TEMP VARIABLES
  //const playerSettings = {raid: 3, dungeon: 15, pvp: 4};
  //

  const completedItemList = [];

  console.log("Running Upgrade Finder. Strap in.");
  const baseItemList = player.getEquippedItems();
  buildWepCombos(player, false, false); // TODO: DEL

  const baseSet = runTopGear(
    baseItemList,
    buildWepCombos(player, false, false),
    player,
    contentType
  );
  const baseScore = baseSet.itemSet.hardScore;
  //console.log(baseSet);

  const itemPoss = buildItemPossibilities(player, contentType, playerSettings);

  for (var x = 0; x < itemPoss.length; x++) {
    completedItemList.push(
      processItem(itemPoss[x], baseItemList, baseScore, player, contentType)
    );
  }

  const result = new UpgradeFinderResult(itemPoss, completedItemList);
  //console.log(result);
  console.log("=== Upgrade Finder Finished ===");

  return result;
}

function getSetItemLevel(itemSource, playerSettings, raidIndex = 0) {
  let itemLevel = 0;
  const instanceID = itemSource.instanceId;
  const bossID = itemSource.encounterId;

  if (instanceID === 1190)
    itemLevel = itemLevels.raid[playerSettings.raid[raidIndex]];
  if (instanceID === 1192) itemLevel = 207;
  // World Bosses
  else if (instanceID === -1)
    itemLevel = itemLevels.dungeon[playerSettings.dungeon];
  else if (instanceID === -16) itemLevel = 184;
  else if (instanceID === -17) itemLevel = itemLevels.pvp[playerSettings.pvp];
  if (bossID === 2425 || bossID === 2424) itemLevel += 7; // Denathrius / Stone Legion Generals

  return itemLevel;
}

function buildItem(player, contentType, rawItem, itemLevel) {
  const itemSource = rawItem.sources[0];
  const itemSlot = rawItem.slot;
  const itemID = rawItem.id;

  let item = new Item(itemID, "", itemSlot, false, "", 0, itemLevel, "");
  let itemAllocations = getItemAllocations(itemID, []);
  item.stats = calcStatsAtLevel(itemLevel, itemSlot, itemAllocations, "");
  item.effect = getItemEffect(itemID);
  item.level = itemLevel;
  item.softScore = scoreItem(item, player, contentType);
  item.source = itemSource;

  return item;
}

function buildItemPossibilities(player, contentType, playerSettings) {
  let itemPoss = [];

  for (var i = 0; i < itemDB.length; i++) {
    const rawItem = itemDB[i];
    if ("sources" in rawItem && checkItemViable(rawItem, player)) {
      const itemSource = rawItem.sources[0];

      if (itemSource.instanceId === 1190) {
        for (var x = 0; x < playerSettings.raid.length; x++) {
          const itemLevel = getSetItemLevel(itemSource, playerSettings, x);
          const item = buildItem(player, contentType, rawItem, itemLevel);
          //console.log("Difficulty: " + playerSettings.raid[x] + ". Item level: " + itemLevel)
          itemPoss.push(item);
        }
      } else {
        const itemLevel = getSetItemLevel(itemSource, playerSettings);
        const item = buildItem(player, contentType, rawItem, itemLevel);

        itemPoss.push(item);
      }
    }
  }

  //console.log(itemPoss.length);
  return itemPoss; // TODO: Remove Slice. It's just for testing in a smaller environment.
}

// Returns a small dict
function processItem(item, baseItemList, baseScore, player, contentType) {
  let newItemList = [...baseItemList];
  newItemList.push(item);
  //console.log(player);

  const newTGSet = runTopGear(
    newItemList,
    buildWepCombos(player, false, false),
    player,
    contentType
  );

  const newScore = newTGSet.itemSet.hardScore;
  //const differential = Math.round(100*(newScore - baseScore))/100 // This is a raw int difference.
  const differential =
    Math.round((10000 * (newScore - baseScore)) / baseScore) / 100;
  //console.log(newTGSet);

  return { item: item.id, level: item.level, score: differential };
}

function checkItemViable(rawItem, player) {
  const spec = player.getSpec();
  const acceptableArmorTypes = getValidArmorTypes(spec);
  const acceptableWeaponTypes = getValidWeaponTypes(spec, "Weapons");
  const acceptableOffhands = getValidWeaponTypes(spec, "Offhands");

  return (
    rawItem.slot === "Back" ||
    (rawItem.itemClass === 4 &&
      acceptableArmorTypes.includes(rawItem.itemSubClass)) ||
    ((rawItem.slot === "Holdable" ||
      rawItem.slot === "Offhand" ||
      rawItem.slot === "Shield") &&
      acceptableOffhands.includes(rawItem.itemSubClass)) ||
    (rawItem.itemClass === 2 &&
      acceptableWeaponTypes.includes(rawItem.itemSubClass))
  );
}
