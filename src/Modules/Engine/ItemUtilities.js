import { itemDB } from "../../Databases/ItemDB";
import { randPropPoints } from "./Retail/RandPropPointsBylevel";
import { combat_ratings_mult_by_ilvl, combat_ratings_mult_by_ilvl_jewl } from "./Retail/CombatMultByLevel";
import { getEffectValue } from "./EffectFormulas/EffectEngine";
import SPEC from "../Engine/SPECS";
import { translatedStat } from "./STAT";
import Item from "../Player/Item";
import { useTranslation } from "react-i18next";
import { i18n } from "react-i18next";
import { reportError } from "../ErrorLogging/ErrorReporting";

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
        default:
          return [-1];
      }
    default:
      return [-1];
  }
}

export function filterItemListBySource(itemList, sourceInstance, sourceBoss, level, pvpRank = 0) {
  let temp = itemList.filter(function (item) {
    // console.log("Filtering: " + item.id);
    // console.log(item);
    let itemEncounter = item.source.encounterId;
    let expectedItemLevel = level;
    if (itemEncounter == 2425 || itemEncounter == 2424) expectedItemLevel += 7;
    else if (sourceInstance === -17 && pvpRank === 5 && ["1H Weapon", "2H Weapon", "Offhand", "Shield"].includes(item.slot)) expectedItemLevel += 7;

    //console.log(expectedItemLevel);

    return (
      item.level == expectedItemLevel &&
      ((item.source.instanceId == sourceInstance && item.source.encounterId == sourceBoss) || (item.source.instanceId == sourceInstance && sourceBoss == 0))
    );
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

export function getDifferentialByID(diffList, id, level) {
  let temp = diffList.filter(function (item) {
    //console.log(item);
    return item.item == id && item.level == level;
  });

  if (temp.length > 0) return temp[0].score;
  else return -99;
}

// Returns true or false based on whether an ID exists in our item database.
// Items that won't be found include stuff like shirts, low level items, quest items without stats and so on.
// Importing these would be a waste of the user interface.
export function checkItemExists(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });
  return temp.length > 0;
}

// Returns a translated item name based on an ID.
export function getTranslatedItemName(id, lang, effect) {
  if (effect && effect.type === "spec legendary") {
    return effect.name;
  } else {
    let temp = itemDB.filter(function (item) {
      return item.id === id;
    });

    if (temp.length > 0) return temp[0].names[lang];
    else return "Unknown Item";
  }
}

// Returns the selected items effect.
// No need for error checking here since returning no effect is an acceptable and common result.
export function getItemEffect(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0 && "effect" in temp[0]) return temp[0].effect;
  else return "";
}

// Returns a translated item name based on an ID.
export function getItemSubclass(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0 && "itemSubClass" in temp[0]) return temp[0].itemSubClass;
  else return "";
}

export function getFullItem(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });
  if (temp.length > 0) return temp[0];
  else return "";
}

export function getItemLevel(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0) return temp[0].itemLevel;
  else {
    reportError(this, "ItemUtilities", "Item Level not found or item missing", id);
    return -2;
  }
}

// Returns a translated item name based on an ID.
// Add some support for missing icons.
export function getItemIcon(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0 && "icon" in temp[0]) return process.env.PUBLIC_URL + "/Images/Icons/" + temp[0].icon + ".jpg";
  else {
    reportError(this, "ItemUtilities", "Icon not found for ID", id);
    return process.env.PUBLIC_URL + "/Images/Icons/missing.jpg";
  }
}

// Returns item stat allocations. MUST be converted to stats before it's used in any scoring capacity.
export function getItemAllocations(id, missiveStats = []) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  let statArray = {};
  if (temp.length > 0) {
    statArray = { ...temp[0].stats };
    if ("unallocated" in temp[0].stats) {
      for (var i = 0; i < missiveStats.length; i++) {
        let mStat = missiveStats[i];
        statArray[mStat] += temp[0].stats.unallocated;
      }
    }
  }
  //console.log(JSON.stringify(temp) + temp.length)
  //console.log(temp[0].icon)
  if (temp.length > 0) return statArray;
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

// Returns item stat allocations. MUST be converted to stats before it's used in any scoring capacity.
export function getItemSlot(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0) return temp[0].slot;
  else return 0;
}

function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
}

export function buildWepCombos(player, active = false, equipped = false) {
  let wep_list = [];
  let main_hands = player.getActiveItems("1H Weapon", active, equipped);
  let off_hands = player.getActiveItems("Offhands", active, equipped);
  let two_handers = player.getActiveItems("2H Weapon", active, equipped);

  //console.log("MH: " + main_hands.length + ". OH: " + off_hands.length + ". 2H: " + two_handers.length);

  for (let i = 0; i < main_hands.length; i++) {
    // Some say j is the best variable for a nested loop, but are they right?
    let main_hand = main_hands[i];
    for (let k = 0; k < off_hands.length; k++) {
      let off_hand = off_hands[k];

      //console.log("Wep Loop" + i + "/" + k + ". " + main_hand.level + ". " + off_hand.level);
      // console.log(main_hand);
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
      stats[key] = Math.floor(Math.floor(rand_prop * allocation * 0.0001 + 0.5) * combat_mult);
    } else if (key === "intellect") {
      stats[key] = Math.floor(Math.floor(rand_prop * allocation * 0.0001 + 0.5) * 1);
    } else if (key === "stamina") {
      // todo
    }
  }
  //console.log("Calc Stats at Level: " + itemLevel + "/" + slot + "/" + JSON.stringify(stats) + "/" + tertiary);
  // This, on the other hand, is a close estimate that should be replaced before launch.
  if (tertiary === "Leech") {
    if (slot === "Trinket") {
      // This is an occasionally off-by-one formula for leech that should be rewritten.
      stats.leech = Math.ceil(28 + 0.2413 * (itemLevel - 155));
    } else {
      const terMult = slot === "Finger" || slot === "Neck" ? 0.170027 : 0.449132;
      stats.leech = Math.floor(terMult * (stats.haste + stats.crit + stats.mastery + stats.versatility));
    }
  }
  return stats;
}

// Builds a stat string out of an items given stats and effect.
// Stats should be listed in order of quantity.
export function buildStatString(stats, effect, lang = "en") {
  //const { t, i18n } = useTranslation();
  let statString = "";
  let statsList = [
    { key: "haste", val: stats["haste"] },
    { key: "crit", val: stats["crit"] },
    { key: "mastery", val: stats["mastery"] },
    { key: "versatility", val: stats["versatility"] },
  ];

  statsList = statsList.sort(function (a, b) {
    return b.val - a.val;
  });

  for (var ind in statsList) {
    let statKey = statsList[ind]["key"];

    statString +=
      statsList[ind]["val"] > 0
        ? statsList[ind]["val"] +
          " " +
          translatedStat[statKey][lang] +
          //correctCasing(statsList[ind]["key"]) +
          " / " //t("stats." + statsList[ind]["key"])
        : "";
  }

  if (effect !== "") statString += "Effect" + " / "; // t("itemTags.effect")

  return statString.slice(0, -3); // We slice here to remove excess slashes and white space from the end.
}

// Returns the string with its first letter capitalized.
export function correctCasing(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Return an item score.
// Score is calculated by multiplying out an items stats against the players stat weights.
// Special effects, sockets and leech are then added afterwards.
export function scoreItem(item, player, contentType) {
  let score = 0;

  // Calculate Effect.
  if (item.effect !== "") {
    item.stats.bonus_stats = getEffectValue(item.effect, player, contentType, item.level);
    //console.log("Getting Effect" + JSON.stringify(item.stats.bonus_stats));
  }

  // Multiply the item's stats by our stat weights.
  for (var stat in item.stats) {
    if (stat !== "bonus_stats") {
      let statSum = item.stats[stat] + (stat in item.stats["bonus_stats"] ? item.stats["bonus_stats"][stat] : 0);
      score += statSum * player.getStatWeight(contentType, stat);
      //console.log("Stat: " + stat + " adds " + statSum * player.getStatWeight(contentType, stat) + " to score.");
    }
  }

  // Add any bonus HPS
  if ("bonus_stats" in item.stats && "hps" in item.stats.bonus_stats) {
    //console.log("Adding bonus_stats to score");
    score += (item.stats.bonus_stats.hps / player.getHPS(contentType)) * player.activeStats.intellect;
  }

  // Add any bonus Mana
  if ("bonus_stats" in item.stats && "mana" in item.stats.bonus_stats) {
    //console.log("Adding bonus_stats to score");
    score += ((item.stats.bonus_stats.mana * player.getSpecialQuery("OneManaHealing", contentType)) / player.getHPS(contentType)) * player.activeStats.intellect;
  }

  // Add Socket
  if (item.socket) {
    score += 16 * player.getStatWeight(contentType, player.getHighestStatWeight(contentType));
  }
  return Math.round(100 * score) / 100;
}
