
import Item from "../../Items/Item";
import { runTopGear } from "../TopGear/Engine/TopGearEngine";
import { getItemDB, calcStatsAtLevel, getItemLevelBoost, getVeryRareItemLevelBoost, getItemAllocations, scoreItem, getValidArmorTypes, getValidWeaponTypes, getItem, filterItemListByType, getItemProp, getExpectedItemLevel } from "../../Engine/ItemUtilities";
import UpgradeFinderResult from "./UpgradeFinderResult";
import { apiSendUpgradeFinder } from "../SetupAndMenus/ConnectionUtilities";
import { itemLevels } from "../../../Databases/ItemLevelsDB";
import { getMPlusItemLevel, getMPlusKeyReward, mplusEndAndVaultSameTrack } from "../../../Databases/MPlusKeyRewards";
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


// PlayerSettings = Upgrade Finder Settings
export function runUpgradeFinder(player, contentType, currentLanguage, playerSettings, userSettings) {
  // TEMP VARIABLES
  const completedItemList = [];


  // console.log("Running Upgrade Finder. Strap in.");
  const baseItemList = player.getEquippedItems(true);
  //const wepList = buildWepCombosUF(player, baseItemList);
  const wepList = buildNewWepCombosUF(player, baseItemList);
  const castModel = player.getActiveModel(contentType);

  const moddedSettings = {...userSettings, forceTier: {value: "S2"}};

  const baseHPS = player.getHPS(contentType);
  //userSettings.dominationSockets = "Upgrade Finder";
  const baseSet = runTopGear(baseItemList, wepList, player, contentType, baseHPS, moddedSettings, castModel);
  const baseScore = baseSet.itemSet.hardScore;

  const itemPoss = buildItemPossibilities(player, contentType, playerSettings, userSettings);

  for (var x = 0; x < itemPoss.length; x++) {
    completedItemList.push(processItem(itemPoss[x], baseItemList, baseScore, player, contentType, baseHPS, currentLanguage, moddedSettings, castModel));
  }

  const result = new UpgradeFinderResult(itemPoss, completedItemList, contentType);
  result.new = true;
  // console.log("=== Upgrade Finder Finished ===");
  apiSendUpgradeFinder(player, contentType);

  return result;
}

export function getSetItemLevel(itemSource, playerSettings, difficultyType = "drop", itemSlot = "") {
  let itemLevel = 0;
  const instanceID = itemSource[0].instanceId;
  const bossID = itemSource[0].encounterId;

  if (CONSTANTS.currentRaidIDs.includes(instanceID)) {
    const difficulty = playerSettings.raid[0];
    itemLevel = itemLevels.raid[difficulty]; // Get the base level of the item.

    // If difficultyType == "drop" then we return whatever item level the item drops at. That's base + any boss bonuses.
    // If difficultyType == "max" then we return the highest item level on the track that it drops at.
    // If difficultyType == "bonus" then we return the highest item level on the bonus track it drops at. For Mythic this will match Max.

    if (difficultyType === "max") {
      itemLevel = itemLevels.raid[difficulty + 4]
    }
    if (difficultyType === "bonus") {
      // Bonus roll / vault track at cap. LFR→Champion, Normal→Hero, Heroic→Myth (318 base), Mythic stays Myth.
      if (difficulty === 3) itemLevel = itemLevels.raid[difficulty + 4];
      else itemLevel = itemLevels.raid[difficulty + 5];
    }

    if (difficulty === 3 && [2895, 2883].includes(bossID)) {
      itemLevel = 344 // Last 2 Mythic bosses
    }
    else if (difficultyType === "drop") {
      itemLevel += getItemLevelBoost(bossID, difficulty)// + getVeryRareItemLevelBoost(itemID, bossID, difficulty);
    }

    // If we're looking at Max difficulties then only grab the very rare boost.
    //if (difficulty === CONSTANTS.difficulties.heroicMax || difficulty === CONSTANTS.difficulties.heroicMax || difficulty === CONSTANTS.difficulties.mythicMax) itemLevel += getVeryRareItemLevelBoost(itemID, bossID, difficulty);

    // Otherwise grab both the very rare and any boss-specific item level increase.
    //

  }

  else if (instanceID === -1) {
    // Mythic+: drop = end-of-run, max = end track cap, bonus = vault/bonus-roll track cap
    itemLevel = getMPlusItemLevel(playerSettings.dungeon, difficultyType);
  }
  else if (instanceID === -4) {
    // Crafted
    itemLevel = itemLevels.crafted[playerSettings.craftedLevel]; // We'll have a setting for this.
  }
  else if (instanceID === -69) {
    // Delves
    itemLevel = 321 //itemLevels.crafted[playerSettings.craftedLevel]; // Temporary. Will need its own panel.
  }
  //else if (instanceID === 1209) itemLevel = 441; // Dawn of the Infinite, upgraded one time.
  else if (instanceID === -30) itemLevel = 359; // Honor. Currently unused.
  else if (instanceID === -31) {
    // Conquest
    itemLevel = itemLevels.pvp[playerSettings.pvp];
  }

  if (instanceID === 1305 || itemSlot.includes("Weapon") || itemSlot === "Offhand" || itemSlot === "Shield" || itemSlot === "Trinket") {
    // Voidcores
    //if (itemLevel === 276 || itemLevel === 289) itemLevel += 9;
    //else if (itemLevel === 272 || itemLevel === 285) itemLevel += 10;
  }

  return itemLevel;
}



function buildItem(player, contentType, rawItem, itemLevel, source, settings, upgradeFinderSettings) {
  const itemSource = source; //rawItem.sources[0];
  const itemSlot = rawItem.slot;
  const itemID = rawItem.id;
  const tertiary = settings.upFinderLeech ? "Leech" : ""; // TODO
  const bonusIDs = settings.upFinderLeech ? "41" : "";
  let item = null;

  // Crafted
  if (source.instanceId === -4) {
    let missiveStats = upgradeFinderSettings.craftedStats.toLowerCase().replace(/ /g, "").split("/");
    if (source.encounterId === 4) missiveStats = missiveStats[0]; // For engineering we'll just use the first stat in their selection.
    let itemAllocations = getItemAllocations(itemID, missiveStats);
    let craftedSocket = false;
    //let craftedSocket = itemSocket || checkDefaultSocket(itemID);

    item = new Item(itemID, "", itemSlot, craftedSocket, tertiary, 0, itemLevel, bonusIDs);
    item.stats = calcStatsAtLevel(item.level, itemSlot, itemAllocations, "");

  }
  else {
    item = new Item(itemID, "", itemSlot, false, tertiary, 0, itemLevel, bonusIDs);
  }

  //if (item.slot === "Neck" || item.slot === "Finger") item.socket = 1;
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
  const itemDB = getItemDB("Retail");
  for (var i = 0; i < itemDB.length; i++) {
    const rawItem = itemDB[i];
    if ("sources" in rawItem && checkItemViable(rawItem, player)) {
      const itemSources = rawItem.sources;
      const primarySource = itemSources[0].instanceId;
      const encounter = itemSources[0].encounterId;
      //const isRaid = [1273].includes(primarySource);
      const isRaid = CONSTANTS.currentRaidIDs.includes(primarySource);

      if (isRaid && encounter > 0) {
        // For raid items - We need to create three versions. Regular, max version (crests spent) and bonus roll (that also spends crests).
        const raidStates = ["drop", "max", "bonus"];
        raidStates.forEach(raidState => {
          const itemLevel = getSetItemLevel(itemSources, playerSettings, raidState, rawItem.slot);
          const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0], settings, playerSettings);
          item.quality = 4;
          item.dropLoc = "Raid";
          item.dropDifficulty = playerSettings.raid[0]; //
          item.dropType = raidState;
          item.dropDifficultyTxt = convertRaidDifficultyToString(playerSettings.raid[0]);
          itemPoss.push(item);
        }) 


      } else if (primarySource === -1) {
        // M+ Dungeons — same contract as raid: drop / max / bonus (vault + voidcore share bonus track)
        // Edit which dungeons are in-season in the CONSTANTS file.
        if (CONSTANTS.currentDungeonIDs.includes(encounter)) {
          const keyReward = getMPlusKeyReward(playerSettings.dungeon);
          const dungeonStates = mplusEndAndVaultSameTrack(playerSettings.dungeon)
            ? ["drop", "bonus"]
            : ["drop", "max", "bonus"];

          dungeonStates.forEach((dungeonState) => {
            const itemLevel = getSetItemLevel(itemSources, playerSettings, dungeonState, rawItem.slot);
            const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0], settings, playerSettings);
            item.quality = 4;
            item.dropLoc = "Dungeon";
            item.dropDifficulty = playerSettings.dungeon;
            item.dropType = dungeonState;
            item.dropDifficultyTxt = keyReward.label;
            itemPoss.push(item);
          });
        }
        else if ([1267, 1272, 1210, 1268].includes(encounter)) {
          // M0

        }

      }
      else if (primarySource === -4 && rawItem.quality === 4) {
        // Crafted. Note that we're excluding blue items. Those are only really good early on.
        const itemLevel = getSetItemLevel(itemSources, playerSettings, 0, rawItem.slot);
        const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0], settings, playerSettings);
        item.dropLoc = "Crafted";
        item.dropDifficulty = "";
        item.dropDifficultyTxt = "";
        item.quality = 4;
        itemPoss.push(item);
      }
      else if (primarySource === -69) {
        // Delves
        const itemLevel = getSetItemLevel(itemSources, playerSettings, 0, rawItem.slot);
        const item = buildItem(player, contentType, rawItem, itemLevel, rawItem.sources[0], settings, playerSettings);
        item.dropLoc = "Delves";
        item.dropDifficulty = "";
        item.dropDifficultyTxt = "";
        item.quality = 4;
        itemPoss.push(item);
      }
      /*else if (primarySource !== -18) {
        /*
        // Exclude Nathria gear.
        const itemLevel = getSetItemLevel(itemSources, playerSettings, 0, item.slot);
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
  const modelDiff = castModel.modelType[contentType] === "Default" ? CONSTANTS.modelDiff : 1; //

  const rawDiff = Math.round(((newScore - baseScore) / baseScore) * baseHPS * modelDiff);
  const percDiff = ((newScore - baseScore) / baseScore) * modelDiff;

  if (getSetting(userSettings, "upgradeFinderMetric") === "Show HPS") differential = rawDiff;
  else differential = percDiff;
  //console.log(item);
  return { item: item.id, dropLoc: item.dropLoc, dropType: item.dropType, dropDifficulty: item.dropDifficulty, level: item.level, score: differential, rawDiff: Math.round(rawDiff), percDiff: Math.round(percDiff * 100000)/1000 };
}

function checkItemViable(rawItem, player) {
  const spec = player.getSpec();
  const acceptableArmorTypes = getValidArmorTypes(spec);
  const acceptableWeaponTypes = getValidWeaponTypes(spec, "Weapons");
  let acceptableOffhands = getValidWeaponTypes(spec, "Offhands");
  if (player.spec === "Restoration Shaman" || player.spec === "Holy Paladin") acceptableOffhands = [6]; // Don't show offhands for Resto Sham or Holy Paladin.
  const classRestriction = getItemProp(rawItem.id, "classRestriction");

  // Check that the item is wearable by the given class. Could be split into an armor and weapons check for code cleanliness.
  const slotCheck =
    rawItem.slot === "Back" ||
    (rawItem.itemClass === 4 && rawItem.slot !== "Offhand" && acceptableArmorTypes.includes(rawItem.itemSubClass)) ||
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
