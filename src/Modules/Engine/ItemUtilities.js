import { itemDB } from "../Player/ItemDB";
import { randPropPoints } from "./RandPropPointsBylevel";
import {
  combat_ratings_mult_by_ilvl,
  combat_ratings_mult_by_ilvl_jewl,
} from "./CombatMultByLevel";
import { getEffectValue } from "./EffectFormulas/EffectEngine";
import SPEC from "../Engine/SPECS";
import Item from "../Player/Item";

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

// Weaspon SubClasses
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
export function getTranslatedItemName(id, lang) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0) return temp[0].names[lang];
  else return "Unknown Item";
}

// Returns a translated item name based on an ID.
export function getItemEffect(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0 && "effect" in temp[0]) return temp[0].effect;
  else return "";
}

export function getItemLevel(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0) return temp[0].itemLevel;
  else return -2;
}

// Returns a translated item name based on an ID.
// Add some support for missing icons.
export function getItemIcon(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  if (temp.length > 0 && "icon" in temp[0])
    return process.env.PUBLIC_URL + "/Images/Icons/" + temp[0].icon + ".jpg";
  else return process.env.PUBLIC_URL + "/Images/Icons/missing.jpg";
}

// Returns item stat allocations. MUST be converted to stats before it's used in any scoring capacity.
export function getItemAllocations(id) {
  let temp = itemDB.filter(function (item) {
    return item.id === id;
  });

  //console.log(JSON.stringify(temp) + temp.length)
  //console.log(temp[0].icon)
  if (temp.length > 0) return temp[0].stats;
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

  //console.log(JSON.stringify(temp) + temp.length)
  //console.log(temp[0].icon)
  if (temp.length > 0) return temp[0].slot;
  else return 0;
}

export function buildWepCombos(player) {
  let wep_list = [];
  let main_hands = player.getActiveItems("1H Weapon");
  let off_hands = player.getActiveItems("Offhands");
  let two_handers = player.getActiveItems("2H Weapon");

  // console.log("MH: " + main_hands.length + ". OH: " + off_hands.length);

  for (let i = 0; i < main_hands.length; i++) {
    // Some say j is the best variable for a nested loop, but are they right?
    let main_hand = main_hands[i];
    for (let k = 0; k < off_hands.length; k++) {
      let off_hand = off_hands[k];

      console.log(main_hands);
      // console.log("Wep Loop" + i + "/" + k + ". " + main_hand.level + ". " + off_hand.level);

      let item = new Item(
        main_hand.id,
        "Combined Weapon", // TODO
        "CombinedWeapon",
        main_hand.socket + off_hand.socket, // Socket
        "", // Tertiary
        0,
        Math.round((main_hand.level + off_hand.level) / 2)
      );

      item.softScore = main_hand.softScore + off_hand.softScore;
      item.offhandID = off_hand.id;
      //console.log("COMBO: " + main_hand.level + " - " + off_hand.level + ". Combined: " + item.level);
      wep_list.push(item);
    }
  }

  for (let j = 0; j < two_handers.length; j++) {
    wep_list.push(two_handers[j]);
  }

  wep_list.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));
  console.log(JSON.stringify(wep_list));
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
    bonus_stats: {},
  };

  let rand_prop = randPropPoints[itemLevel]["slotValues"][getItemCat(slot)];
  if (slot == "Finger" || slot == "Neck")
    combat_mult = combat_ratings_mult_by_ilvl_jewl[itemLevel];
  else combat_mult = combat_ratings_mult_by_ilvl[itemLevel];

  // These stats should be precise, and never off by one.
  for (var key in statAllocations) {
    let allocation = statAllocations[key];

    if (["haste", "crit", "mastery", "versatility", "leech"].includes(key)) {
      stats[key] = Math.floor(
        Math.floor(rand_prop * allocation * 0.0001 + 0.5) * combat_mult
      );
    } else if (key === "intellect") {
      stats[key] = Math.floor(
        Math.floor(rand_prop * allocation * 0.0001 + 0.5) * 1
      );
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
      const terMult =
        slot === "Finger" || slot === "Neck" ? 0.170027 : 0.449132;
      stats.leech = Math.floor(
        terMult * (stats.haste + stats.crit + stats.mastery + stats.versatility)
      );
    }
  }
  return stats;
}

// Builds a stat string out of an items given stats and effect.
// Stats should be listed in order of quantity.
export function buildStatString(stats, effect) {
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
    statString +=
      statsList[ind]["val"] > 0
        ? statsList[ind]["val"] +
          " " +
          correctCasing(statsList[ind]["key"]) +
          " / "
        : "";
  }

  if (effect !== "") statString += "Effect / ";

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
    item.stats.bonus_stats = getEffectValue(
      item.effect,
      player,
      contentType,
      item.level
    );
  }

  // Multiply the item's stats by our stat weights.
  for (var stat in item.stats) {
    if (stat !== "bonus_stats") {
      let statSum =
        item.stats[stat] +
        (stat in item.stats["bonus_stats"]
          ? item.stats["bonus_stats"][stat]
          : 0);
      score += statSum * player.getStatWeight(contentType, stat);
      //console.log("Stat: " + stat + " adds " + statSum * player.getStatWeight(contentType, stat) + " to score.");
    }
  }

  // Add any bonus HPS
  if ("bonus_stats" in item.stats && "hps" in item.stats.bonus_stats) {
    score +=
      (item.stats.bonus_stats.hps / player.getHPS()) *
      player.activeStats.intellect;
  }

  // Add Socket
  if (item.socket) {
    score +=
      16 *
      player.getStatWeight(
        contentType,
        player.getHighestStatWeight(contentType)
      );
  }
  return Math.round(score);
}
