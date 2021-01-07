import { itemDB } from "../Player/ItemDB";
import Item from "../Player/Item";
import { runTopGear } from "../TopGear/TopGearEngine";
import { buildWepCombos, calcStatsAtLevel, getItemAllocations, scoreItem, getValidArmorTypes, getValidWeaponTypes } from "../Engine/ItemUtilities";
/*

The core Upgrade Finder loop is as follows:
- Run the players current gear set through our evaluation function to get a baseline score.
- Loop through the ItemDB and find all items that drop from raid, Mythic+, or PVP.
- For each item, build a set consisting of a players current item set + the item. 
- Run each set through our evaluation function. Store the score differential against the item.

- Print the items in the correct place along with their score differential. 
- (Extra Feature) Include a summary page that lists the largest score upgrades and where they come from. 



*/

export function runUpgradeFinder(player, contentType) {
  const completedItemList = []
  console.log("Running Upgrade Finder. Strap in.");
  console.log(player);
  const baseItemList = player.getEquippedItems();
  buildWepCombos(player, false, false) // TODO: DEL
  

  const baseSet = runTopGear(
    baseItemList,
    buildWepCombos(player, false, false),
    player,
    contentType
  );
  const baseScore = baseSet.itemSet.hardScore;
  //console.log(baseSet);
  
  const itemPoss = buildItemPossibilities(player, contentType);

  for (var x = 0; x < itemPoss.length; x++) {
    completedItemList.push(processItem(itemPoss[x], baseItemList, baseScore, player, contentType));
  }

  console.log(completedItemList);
  console.log("=== Upgrade Finder Finished ===");

  
}

function checkItemViable(rawItem, player) {
  const spec = player.getSpec();
  const acceptableArmorTypes = getValidArmorTypes(spec);
  const acceptableWeaponTypes = getValidWeaponTypes(spec, "Weapons");
  const acceptableOffhands = getValidWeaponTypes(spec, "Offhands");

  return ((rawItem.slot === "Back") ||

      (rawItem.itemClass === 4 &&
        acceptableArmorTypes.includes(rawItem.itemSubClass)) ||

      ((rawItem.slot === "Holdable" ||
          rawItem.slot === "Offhand" ||
          rawItem.slot === "Shield") && acceptableOffhands.includes(rawItem.itemSubClass)) ||

      (rawItem.itemClass === 2 &&
        acceptableWeaponTypes.includes(rawItem.itemSubClass)))

}

function buildItemPossibilities(player, contentType) {
  let itemPoss = [];

  for (var i = 0; i < itemDB.length; i++) {
    const rawItem = itemDB[i];
    if ("sources" in rawItem && checkItemViable(rawItem, player)) {
      const itemSlot = rawItem.slot;
      const itemID = rawItem.id;
      const itemLevel = 120; //TODO

      let item = new Item(itemID, "", itemSlot, false, "", 0, itemLevel);
      let itemAllocations = getItemAllocations(itemID, []);
      item.stats = calcStatsAtLevel(
        itemLevel,
        itemSlot,
        itemAllocations,
        ""
      );
      item.softScore = scoreItem(item, player, contentType);

      itemPoss.push(item);
    }
  }

  console.log(itemPoss.length);
  return itemPoss.slice(1, 19); // TODO: Remove Slice. It's just for testing in a smaller environment. 
}

// Returns a small dict 
function processItem(item, baseItemList, baseScore, player, contentType) {
  let newItemList = [...baseItemList];
  newItemList.push(item);
  console.log(player);

  const newTGSet = runTopGear(
    newItemList,
    buildWepCombos(player, false, false),
    player,
    contentType
  );

  const newScore = newTGSet.itemSet.hardScore;
  const differential = Math.round(100*(newScore - baseScore))/100
  //console.log(newTGSet);
  



  return {item: item.id, score: differential};

}