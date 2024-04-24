import { classicItemDB} from "../../../Databases/ClassicItemDB";
import ClassicItem from "../Player/ClassicItem";
import { runTopGearBC } from "../TopGear/Engine/TopGearEngineBC";
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
        let item = new ClassicItem(
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

export function runUpgradeFinderBC(player, contentType, currentLanguage, playerSettings, userSettings) {
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
  const baseSet = runTopGearBC(baseItemList, wepList, player, contentType, baseHPS, currentLanguage, userSettings, castModel);
  const baseScore = baseSet.itemSet.hardScore;

  //console.log(wepList);
  //console.log(baseItemList);

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

function buildItem(player, rawItem, source) {
  const itemSource = source; //rawItem.sources[0];
  const itemSlot = rawItem.slot;
  const itemID = rawItem.id;

  let item = new ClassicItem(itemID, "", itemSlot);
  //let itemAllocations = getItemAllocations(itemID, []);
  //item.stats = calcStatsAtLevel(itemLevel, itemSlot, itemAllocations, "");
  //item.level = itemLevel;
  item.softScore = scoreItem(item, player, "Raid", "Classic");
  item.source = itemSource;

  return item;
}

function buildItemPossibilities(player, contentType, playerSettings) {
  let itemPoss = [];
  const dungeonDifficulty = playerSettings.dungeon = 6 ? 1 : playerSettings.dungeon;
  // Grab items.
  for (var i = 0; i < classicItemDB.length; i++) {
    const rawItem = classicItemDB[i];
    if ("sources" in rawItem && checkItemViable(rawItem, player)) {
        if (rawItem.sources[0].instanceId === -1) {
          if (rawItem.sources[0].difficultyId === dungeonDifficulty) {
            
            const itemSource = rawItem.sources[0];
            //const itemLevel = getSetItemLevel(itemSource, playerSettings, 0, rawItem.slot);
            const item = buildItem(player, rawItem, rawItem.sources[0]);
    
            itemPoss.push(item);
          }
        }
        else {
          const itemSource = rawItem.sources[0];
          //const itemLevel = getSetItemLevel(itemSource, playerSettings, 0, rawItem.slot);
          const item = buildItem(player, rawItem, rawItem.sources[0]);
  
          itemPoss.push(item);
        }

      }
    }
    return itemPoss;
  }
 

  // console.log("Tokens: " + Object.keys(tokenDB).length);

  // --------------------------
  // Take care of Tokens >:(
  // --------------------------
  /*
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
}*/

// Returns a small dict
function processItem(item, baseItemList, baseScore, player, contentType, baseHPS, currentLanguage, userSettings, castModel) {
  let newItemList = [...baseItemList];
  newItemList.push(item);
  //console.log(player);
  const wepList = buildWepCombosUF(player, newItemList);
  const newTGSet = runTopGearBC(newItemList, wepList, player, contentType, baseHPS, currentLanguage, userSettings, castModel);

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
  const stats = rawItem.stats;

  return (
    ("intellect" in stats || "bonushealing" in stats || "spelldamage" in stats || "mp5" in stats || "spirit" in stats || "spellcrit" in stats || rawItem.slot === "trinket") &&
    (rawItem.slot === "Back" ||
    (rawItem.itemClass === 4 && acceptableArmorTypes.includes(rawItem.itemSubClass)) ||
    ((rawItem.slot === "Holdable" || rawItem.slot === "Offhand" || rawItem.slot === "Shield") && acceptableOffhands.includes(rawItem.itemSubClass)) ||
    (rawItem.itemClass === 2 && acceptableWeaponTypes.includes(rawItem.itemSubClass)))
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
