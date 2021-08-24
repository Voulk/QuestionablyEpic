import { itemDB } from "../../Databases/ItemDB";
import { dominationGemDB } from "../../Databases/DominationGemDB";
import { BCItemDB } from "Databases/BCItemDB";
import { randPropPoints } from "../../Retail/Engine/RandPropPointsBylevel";
import { combat_ratings_mult_by_ilvl, combat_ratings_mult_by_ilvl_jewl } from "../../Retail/Engine/CombatMultByLevel";
import { getEffectValue } from "../../Retail/Engine/EffectFormulas/EffectEngine";
import SPEC from "../Engine/SPECS";
import { translatedStat } from "./STAT";
import Item from "../Modules/Player/Item";
// import { useTranslation } from "react-i18next";
// import { i18n } from "react-i18next";
import { reportError } from "../SystemTools/ErrorLogging/ErrorReporting";
import { useSelector } from "react-redux";
import { GEMS } from "General/Engine/GEMS";

/*

This file contains utility functions that center around the player or players items. 


*/

// This is a pretty straightfoward function right now but could be altered in future to allow Paladins to wear all armor types, to allow druids to wear cloth and so on.
// We'll try and leave them out when we can since it keeps the dropdown boxes much much cleaner and the 5% int bonus is only worth giving up on ultra rare occasions.
export function getValidArmorTypes(spec) {
  switch (spec) {
    case SPEC.RESTODRUID:
    case SPEC.MISTWEAVERMONK:
      return [0, 2]; // Misc + Leather
    case SPEC.HOLYPALADIN:
      return [0, 4, 6]; // Misc + Plate + Shields
    case SPEC.RESTOSHAMAN:
      return [0, 3, 6]; // Misc + Mail + Shields
    case SPEC.HOLYPRIEST:
    case SPEC.DISCPRIEST:
      return [0, 1]; // Misc + Cloth
    case "Holy Paladin BC":
      return [0, 1, 2, 3, 4, 6, 7]; // Misc + Plate + Shields
    case "Restoration Druid BC":
      return [0, 1, 2, 8]; // Misc + Plate + Shields
    case "Restoration Shaman BC":
      return [0, 1, 2, 3, 6, 9]; // Misc + Plate + Shields
    case "Holy Priest BC":
      return [0, 1]; // Misc + Plate + Shields
    default:
      return [-1];
  }
}

// Weapon SubClasses
// 0 One-Handed Axes
// 1 Two-Handed Axes
// 2 Bows
// 3 Guns
// 4 One-Handed Maces
// 5 Two-Handed Maces
// 6 Polearms
// 7 One-Handed Swords
// 8 Two-Handed Swords
// 9 Warglaives
// 10 Staves
// 11 Bear Claws
// 12 CatClaws
// 13 Fist Weapons
// 14 Miscellaneous
// 15 Daggers
// 16 Thrown  Classic
// 17 Spears
// 18 Crossbows
// 19 Wands
// 20 Fishing Poles

// Returns an array of valid weapon types.
// TODO
export function getValidWeaponTypes(spec, slot) {
  switch (slot) {
    case "Offhands":
      switch (spec) {
        case SPEC.RESTOSHAMAN:
        case SPEC.HOLYPALADIN:
        case "Holy Paladin BC":
        case "Restoration Shaman BC":
          return [0, 6];
        default:
          return [0];
      }
    case "Weapons":
      switch (spec) {
        case SPEC.RESTODRUID:
          return [4, 5, 6, 10, 13, 15];
        case SPEC.MISTWEAVERMONK:
          return [0, 4, 6, 7, 10, 13];
        case SPEC.HOLYPALADIN:
          return [0, 1, 4, 5, 6, 7, 8];

        case SPEC.RESTOSHAMAN:
          return [0, 1, 4, 5, 10, 13, 15];
        case SPEC.HOLYPRIEST:
          return [4, 10, 15, 19];
        case SPEC.DISCPRIEST:
          return [4, 10, 15, 19];
        case "Holy Paladin BC":
          return [0, 1, 4, 5, 6, 7, 8];
        case "Restoration Druid BC":
          return [4, 5, 6, 10, 13, 15];
        case "Restoration Shaman BC":
          return [0, 1, 4, 5, 10, 13, 15];
        case "Holy Priest BC":
          return [4, 10, 15, 19];
        default:
          return [-1];
      }
    default:
      return [-1];
  }
}

export function filterBCItemListBySource(itemList, sourceInstance, sourceBoss) {
  let temp = itemList.filter(function (item) {
    return (item.source.instanceId == sourceInstance && item.source.encounterId == sourceBoss) || (item.source.instanceId == sourceInstance && sourceBoss == 0);
  });

  return temp;
}

export function filterItemListBySource(itemList, sourceInstance, sourceBoss, level, pvpRank = 0) {
  let temp = itemList.filter(function (item) {
    let itemEncounter = item.source.encounterId;
    let expectedItemLevel = level;
    if (itemEncounter == 2440 || itemEncounter == 2441) expectedItemLevel += 7;
    if (itemEncounter == 2456) expectedItemLevel = 233;
    else if (sourceInstance === -17 && pvpRank === 5 && ["1H Weapon", "2H Weapon", "Offhand", "Shield"].includes(item.slot)) expectedItemLevel += 7;

    return item.level == expectedItemLevel && ((item.source.instanceId == sourceInstance && item.source.encounterId == sourceBoss) || (item.source.instanceId == sourceInstance && sourceBoss == 0));
  });

  return temp;
}

export function filterItemListByType(itemList, slot) {
  let temp = itemList.filter(function (item) {
    if (slot === "AllMainhands") {
      return item.slot === "1H Weapon" || item.slot === "2H Weapon";
    } else if (slot === "Offhands") {
      return item.slot === "Holdable" || item.slot === "Offhand" || item.slot === "Shield";
    } else {
      return item.slot === slot;
    }
  });
  return sortItems(temp);
}

function sortItems(container) {
  // Current default sorting is by HPS (soft score) but we could get creative here in future.
  container.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));

  return container;
}

export function getItemDB(gameType = "Retail") {
  return gameType === "Retail" ? itemDB : BCItemDB;
}

export function getDifferentialByID(diffList, id, level) {
  let temp = diffList.filter(function (item) {
    return item.item == id && item.level == level;
  });

  if (temp.length > 0) return temp[0].score;
  else return -99;
}

// Returns true or false based on whether an ID exists in our item database.
// Items that won't be found include stuff like shirts, low level items, quest items without stats and so on.
// Importing these would be a waste of the user interface.
export function checkItemExists(id) {
  return getItem(id) !== "";
}

// Returns a translated item name based on an ID.
export function getTranslatedItemName(id, lang, effect, gameType = "Retail") {
  if (effect && effect.type === "spec legendary") {
    return effect.name;
  } else {
    let temp = getItemDB(gameType).filter(function (item) {
      return item.id === id;
    });

    if (temp.length > 0) return temp[0].names[lang];
    else return "Unknown Item";
  }
}

// Returns a translated item name based on an ID.
export function getTranslatedDominationGem(id, lang) {
  let temp = dominationGemDB.filter(function (gem) {
    return gem.gemID === id;
  });
  if (temp.length > 0) return temp[0].name[lang];
  else return "Unknown Gem";
}

// Grabs a specific item from whichever item database is currently selected.
export function getItem(id, gameType = "Retail") {
  let temp = getItemDB(gameType).filter(function (item) {
    return item.id === id;
  });
  if (temp.length > 0) return temp[0];
  else return "";
}

// This function grabs a selected prop from the currently selected item database.
// It should replace most other functions that get only one specific prop.
export function getItemProp(id, prop, gameType = "Retail") {
  const item = getItem(id, gameType);

  if (item !== "" && prop in item) return item[prop];
  else if (item !== "" && prop === "itemLevel") {
    // This is for props that we should expect to have.
    reportError(null, "ItemUtilities", "Item prop: " + prop + " not found or item missing", id);
    return -2;
  } else {
    // This is for props that may or may not exist on an item like effects.
    return "";
  }
}

// Returns a translated item name based on an ID.
// Add some support for missing icons.
export function getItemIcon(id, gameType = "Retail") {
  const item = getItem(id, gameType);
  if (gameType === "BurningCrusade" && item !== "") return "https://wow.zamimg.com/images/wow/icons/large/" + item.icon + ".jpg";
  else if (item !== "" && "icon" in item) return process.env.PUBLIC_URL + "/Images/Icons/" + item.icon + ".jpg";
  else if (item !== "") {
    reportError(this, "ItemUtilities", "Icon not found for ID", id);
    return process.env.PUBLIC_URL + "/Images/Icons/missing.jpg";
  }
}

export function getGemIcon(id) {
  const gem = dominationGemDB.filter((gem) => gem.gemID === id);
  let gemIcon = "";
  if (gem[0] === undefined) {
    return "https://wow.zamimg.com/images/icons/socket-domination.gif";
  } else {
    return "https://wow.zamimg.com/images/wow/icons/large/" + gem[0].icon + ".jpg";
  }
}

// Returns item stat allocations. MUST be converted to stats before it's used in any scoring capacity.
export function getItemAllocations(id, missiveStats = []) {
  const item = getItem(id);

  let statArray = {};
  if (item !== "") {
    statArray = { ...item.stats };
    if ("unallocated" in item.stats) {
      for (var i = 0; i < missiveStats.length; i++) {
        let mStat = missiveStats[i];
        statArray[mStat] += item.stats.unallocated;
      }
    }
  }

  if (item !== "") return statArray;
  else return 0;
}

// Returns which secondary item category a given slot falls in.
function getItemCat(slot) {
  switch (slot) {
    case "Head":
    case "Chest":
    case "Legs":
    case "Robe":
    case "2H Weapon":
      return 0;

    case "Shoulder":
    case "Waist":
    case "Feet":
    case "Hands":
    case "Trinket":
      return 1;

    case "Neck":
    case "Finger":
    case "Back":
    case "Wrists":
    case "Wrist":
      return 2;

    case "Offhand":
    case "Holdable":
    case "Shield":
    case "1H Weapon":
      return 3;
    default:
      console.error("Item Cat going to Default" + slot);
      return 3;

    // Raise error.
  }
}

export function buildWepCombos(player, active = false, equipped = false) {
  let wep_list = [];
  let main_hands = player.getActiveItems("1H Weapon", active, equipped);
  let off_hands = player.getActiveItems("Offhands", active, equipped);
  let two_handers = player.getActiveItems("2H Weapon", active, equipped);

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
          main_hand.socket + off_hand.socket, // Socket
          "", // Tertiary
          0,
          Math.round((main_hand.level + off_hand.level) / 2),
          "", // Bonus Ids
        );
        item.stats = sumObjectsByKey(main_hand.stats, off_hand.stats);
        item.stats.bonus_stats = {};
        item.vaultItem = main_hand.vaultItem || off_hand.vaultItem;
        item.uniqueEquip = item.vaultItem ? "vault" : "";
        item.softScore = main_hand.softScore + off_hand.softScore;
        item.offhandID = off_hand.id;
        item.mainHandLevel = main_hand.level;
        item.offHandLevel = off_hand.level;
        item.mainHandTertiary = main_hand.tertiary;
        item.offHandTertiary = off_hand.tertiary;
        // For future perhaps
        // item.mainHandSocket = main_Hand.socket
        // item.offHandSocket = off_Hand.socket
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

// Calculates the intellect and secondary stats an item should have at a given item level.
// This uses the RandPropPointsByLevel and CombatMultByLevel tables and returns a dictionary object of stats.
// Stat allocations are passed to the function from our Item Database.
export function calcStatsAtLevel(itemLevel, slot, statAllocations, tertiary) {
  let combat_mult = 0;
  let stats = {
    intellect: 0,
    stamina: 0,
    haste: 0,
    mastery: 0,
    versatility: 0,
    crit: 0,
    leech: 0,
    hps: 0,
    dps: 0,
    bonus_stats: {},
  };

  let rand_prop = randPropPoints[itemLevel]["slotValues"][getItemCat(slot)];
  if (slot == "Finger" || slot == "Neck") combat_mult = combat_ratings_mult_by_ilvl_jewl[itemLevel];
  else combat_mult = combat_ratings_mult_by_ilvl[itemLevel];

  // These stats should be precise, and never off by one.
  for (var key in statAllocations) {
    let allocation = statAllocations[key];

    if (["haste", "crit", "mastery", "versatility", "leech"].includes(key)) {
      //stats[key] = Math.floor(Math.floor(rand_prop * allocation * 0.0001 + 0.5) * combat_mult);
      stats[key] = Math.round(rand_prop * allocation * 0.0001 * combat_mult);
    } else if (key === "intellect") {
      stats[key] = Math.round((rand_prop * allocation * 0.0001) * 1);
    } else if (key === "stamina") {
      // todo
    }
  }

  // This, on the other hand, is a close estimate that should be replaced ASAP.
  if (tertiary === "Leech") {
    if (slot === "Trinket") {
      // This is an occasionally off-by-one formula for leech that should be rewritten.
      stats.leech = Math.ceil(28 + 0.2413 * (itemLevel - 155));
    } else {
      const terMult = slot === "Finger" || slot === "Neck" ? 0.174027 : 0.442932;
      stats.leech = Math.floor(terMult * (stats.haste + stats.crit + stats.mastery + stats.versatility));
    }
  }
  return stats;
}

export function getDomGemEffect(id) {
  let temp = dominationGemDB.filter(function (gem) {
    return gem.gemID === id;
  });
  if (temp.length > 0 && "effect" in temp[0]) return temp[0].effect;
  else return "";
}


export function buildStatString(stats, effect, lang = "en") {
  let statString = "";
  let statsList = [];
  const ignoreList = ["stamina", "bonus_stats", "strength", "agility", "intellect", "leech"];
  for (const [statkey, statvalue] of Object.entries(stats)) {
    if (!ignoreList.includes(statkey)) statsList.push({ key: statkey, val: statvalue });
  }

  statsList = statsList.sort(function (a, b) {
    return b.val - a.val;
  });

  if ("intellect" in stats && stats.intellect > 0) statString = stats.intellect + " Int / ";

  for (var ind in statsList) {
    let statKey = statsList[ind]["key"];
    const statName = statKey in translatedStat ? translatedStat[statKey][lang] : "";

    statString +=
      statsList[ind]["val"] > 0
        ? statsList[ind]["val"] +
          " " +
          statName +
          //correctCasing(statsList[ind]["key"]) +
          " / " //t("stats." + statsList[ind]["key"])
        : "";
  }

  // Add an "effect" tag. We exclude Dom gems and Legendaries here because it's already clear they are giving you an effect.
  if (effect !== "" && effect && effect.type !== "domination gem" && effect.type !== "spec legendary") statString += "Effect" + " / "; // t("itemTags.effect")

  return statString.slice(0, -3); // We slice here to remove excess slashes and white space from the end.
}

// Returns the string with its first letter capitalized.
export function correctCasing(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function scoreGemColor(gemList, player) {
  for (var ind in gemList) {
    const gem = gemList[ind];
    let gemScore = 0;
    for (const [stat, value] of Object.entries(gem.stats)) {
      if (player[stat] && stat in player) gemScore += value * player[stat];
    }
    gem["score"] = gemScore;
  }

  gemList = gemList.sort(function (a, b) {
    return b.score - a.score;
  });

  return gemList;
}

export function getBestGem(player, color, rarity = "rare") {
  let colors = [];
  let gems = [...GEMS];

  if (color === "red") colors = ["red", "orange", "purple"];
  else if (color === "blue") colors = ["blue", "purple", "green"];
  else if (color === "yellow") colors = ["yellow", "orange", "green"];
  else if (color === "all") colors = ["yellow", "blue", "red", "purple", "orange", "green"];

  let gemList = gems.filter((filter) => colors.includes(filter.color) && filter.jewelcrafting === false && filter.rarity === rarity);
  gemList = scoreGemColor(gemList, player);
  return gemList[0];
}

// Get highest value of each gem color.
// Compare value of socketing highest matching colors + socket bonus, to just socketing highest colors.
export function socketItem(item, player) {
  const socketList = item.sockets;
  const bestGems = {
    overall: getBestGem(player, "all"),
    red: getBestGem(player, "red"),
    blue: getBestGem(player, "blue"),
    yellow: getBestGem(player, "yellow"),
  };

  let socketBonus = 0;
  if (socketList.bonus) {
    for (const [stat, value] of Object.entries(socketList.bonus)) {
      socketBonus += value * player[stat];
    }
  }

  let colorMatch = { gems: [], score: socketBonus };
  let socketBest = { gems: [], score: 0 };
  for (const socNum in socketList.gems) {
    const socket = socketList.gems[socNum];
    // Match colors
    if (["red", "blue", "yellow"].includes(socket)) {
      colorMatch["score"] += bestGems[socket].score;
      colorMatch["gems"].push(bestGems[socket].name);

      socketBest["score"] += bestGems["overall"].score;
      socketBest["gems"].push(bestGems["overall"].name);
    }
  }
  if (colorMatch.score >= socketBest.score) item.socketedGems = colorMatch;
  else item.socketedGems = item.socketedGems = socketBest;
}

// Compiles stats & bonus stats into one array to which we can then apply DR etc.
// TODO, this is identical to TopGearShared, so put it somewhere accessible to both.
function compileStats(stats, bonus_stats) {
  for (const stat in stats) {
    if (stat !== "bonus_stats") {
      stats[stat] += bonus_stats !== undefined && stat in bonus_stats ? bonus_stats[stat] : 0;
    }
  }

  for (const bonusStat in bonus_stats) {
    if (!(bonusStat in stats)) {
      stats[bonusStat] = bonus_stats[bonusStat];
    }
  }

  return stats;
}

function applyBCStatMods(spec, setStats) {
  // This can be properly formalized.
  if (spec === "Holy Paladin BC") {
    setStats.intellect = (setStats.intellect || 0) + (setStats.intellect || 0) * 0.1;
    setStats.spelldamage = (setStats.spelldamage || 0) + (setStats.intellect || 0) * 0.35;
  } else if (spec === "Restoration Shaman BC") {
    setStats.bonushealing = (setStats.bonushealing || 0) + (setStats.intellect || 0) * 0.3;
    setStats.spelldamage = (setStats.spelldamage || 0) + (setStats.intellect || 0) * 0.3;
  } else if (spec === "Restoration Druid BC") {
    // Also gets 30% of spirit MP5 as MP5
    setStats.spirit = (setStats.spirit || 0) * 1.15;
  } else if (spec === "Holy Priest BC") {
    // Also gets 30% of spirit MP5 as MP5
    setStats.spirit = setStats.spirit * 1.05 || 0;
    //talent_stats.bonushealing = (setStats.spirit + talent_stats.spirit) * 0.25;
    setStats.spelldamage = (setStats.spelldamage || 0) + (setStats.spirit || 0) * 0.25;
  }

  return setStats;
}

// Return an item score.
// Score is calculated by multiplying out an items stats against the players stat weights.
// Special effects, sockets and leech are then added afterwards.
export function scoreItem(item, player, contentType, gameType = "Retail") {
  let score = 0;
  let bonus_stats = {};
  let item_stats = { ...item.stats };

  // Check if Dom Slot
  if (item.hasDomSocket && 'domGemID' in item && item.domGemID != 0) {
    const effect = getDomGemEffect(item.domGemID)
    item.effect = effect;
  }

  // Calculate Effect.
  if (item.effect) {
    bonus_stats = getEffectValue(item.effect, player, player.getActiveModel(contentType), contentType, item.level, {}, gameType);
  }

  // Multiply the item's stats by our stat weights.
  let sumStats = compileStats(item_stats, bonus_stats);
  if (gameType === "BurningCrusade") sumStats = applyBCStatMods(player.getSpec(), sumStats);

  for (var stat in sumStats) {
    if (stat !== "bonus_stats") {
      let statSum = sumStats[stat];
      score += statSum * player.getStatWeight(contentType, stat);
    }
  }

  // Add any bonus HPS
  if ("bonus_stats" in item_stats && "hps" in bonus_stats) {
    score += (bonus_stats.hps / player.getHPS(contentType)) * player.activeStats.intellect;
  }

  // Add any bonus Mana
  if ("bonus_stats" in item_stats && "mana" in bonus_stats) {
    score += ((bonus_stats.mana * player.getSpecialQuery("OneManaHealing", contentType)) / player.getHPS(contentType)) * player.activeStats.intellect;
  }

  // Add Retail Socket
  if (item.socket) {
    score += 16 * player.getStatWeight(contentType, player.getHighestStatWeight(contentType));
  }

  // BC specific sockets
  if (item.sockets) {
    socketItem(item, player.statWeights["Raid"]);
    score += item.socketedGems["score"];
  }

  return Math.round(100 * score) / 100;
}
function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
}
