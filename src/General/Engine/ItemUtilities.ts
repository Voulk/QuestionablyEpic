import { itemDB } from "Databases/ItemDB";
import { dominationGemDB } from "../../Databases/DominationGemDB";
import { embellishmentDB } from "../../Databases/EmbellishmentDB";
import { getOnyxAnnuletEffect } from "Retail/Engine/EffectFormulas/Generic/OnyxAnnuletData";
import { ClassicItemDB } from "Databases/ClassicItemDB";
import { randPropPoints } from "../../Retail/Engine/RandPropPointsBylevel";
import { combat_ratings_mult_by_ilvl, combat_ratings_mult_by_ilvl_jewl } from "../../Retail/Engine/CombatMultByLevel";
import { getEffectValue } from "../../Retail/Engine/EffectFormulas/EffectEngine";
import SPEC from "./SPECS";
import { translatedStat, STATDIMINISHINGRETURNS } from "./STAT";
import Item from "../Modules/Player/Item";
import { reportError } from "../SystemTools/ErrorLogging/ErrorReporting";
import { CONSTANTS } from "./CONSTANTS";
import { gemDB } from "Databases/GemDB";
import { nameDB } from "Databases/ItemNameDB";
import Player from "General/Modules/Player/Player";



/*

This file contains utility functions that center around the player or players items. 


*/

// This is a pretty straightfoward function right now but could be altered in future to allow Paladins to wear all armor types, to allow druids to wear cloth and so on.
// We'll try and leave them out when we can since it keeps the dropdown boxes much much cleaner and the 5% int bonus is only worth giving up on ultra rare occasions.
export function getValidArmorTypes(spec: string) {
  switch (spec) {
    case SPEC.RESTODRUID:
    case SPEC.MISTWEAVERMONK:
      return [0, 2]; // Misc + Leather
    case SPEC.HOLYPALADIN:
      return [0, 4, 6]; // Misc + Plate + Shields
    case SPEC.RESTOSHAMAN:
      return [0, 3, 6]; // Misc + Mail + Shields
    case SPEC.PRESEVOKER:
      return [0, 3]; // Misc + Mail
    case SPEC.HOLYPRIEST:
    case SPEC.DISCPRIEST:
      return [0, 1]; // Misc + Cloth
    case "Holy Paladin Classic":
      return [0, 1, 2, 3, 4, 6, 7]; // Misc + Plate + Shields
    case "Restoration Druid Classic":
      return [0, 1, 2, 8]; // Misc + Plate + Shields
    case "Restoration Shaman Classic":
      return [0, 1, 2, 3, 6, 9]; // Misc + Plate + Shields
    case "Holy Priest Classic":
      return [0, 1]; // Misc + Plate + Shields
    default:
      return [-1];
  }
}

// Weapon SuClassiclasses
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
export function getValidWeaponTypes(spec: string, slot: string) {
  switch (slot) {
    case "Offhands":
      switch (spec) {
        case SPEC.RESTOSHAMAN:
        case SPEC.HOLYPALADIN:
        case "Holy Paladin Classic":
        case "Restoration Shaman Classic":
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
        case SPEC.PRESEVOKER:
          return [0, 4, 5, 7, 10, 13, 15];
        case SPEC.RESTOSHAMAN:
          return [0, 1, 4, 5, 10, 13, 15];
        case SPEC.HOLYPRIEST:
          return [4, 10, 15, 19];
        case SPEC.DISCPRIEST:
          return [4, 10, 15, 19];
        case "Holy Paladin Classic":
          return [0, 1, 4, 5, 6, 7, 8];
        case "Restoration Druid Classic":
          return [4, 5, 6, 10, 13, 15];
        case "Restoration Shaman Classic":
          return [0, 1, 4, 5, 10, 13, 15];
        case "Holy Priest Classic":
          return [4, 10, 15, 19];
        default:
          return [-1];
      }
    default:
      return [-1];
  }
}

/* ------------ Converts a bonus_stats dictionary to a singular estimated HPS number. ----------- */
export function getEstimatedHPS(bonus_stats: Stats, player: Player, contentType: contentTypes) {
  let estHPS = 0;
  for (const [key, value] of Object.entries(bonus_stats)) {
    if (["haste", "mastery", "crit", "versatility", "leech"].includes(key)) {
      estHPS += ((value * player.getStatWeight(contentType, key)) / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "intellect") {
      estHPS += (value / player.activeStats.intellect) * player.getHPS(contentType);
    } 
    else if (key === "mana") {
      estHPS += value * player.getSpecialQuery("OneManaHealing", contentType)
    }
    else if (key === "hps") {
      estHPS += value;
    }
    else if (key === "allyStats") {
      // This is ultimately a slightly underestimation of giving stats to allies, but given we get a fuzzy bundle that's likely to hit half DPS and half HPS 
      // it's a fair approximation. 
      // These embellishments are good, but it's very spread out.
      estHPS += ((value * 0.32) / player.activeStats.intellect) * player.getHPS(contentType) / 2;
    }
  }
  return Math.round(100 * estHPS) / 100;
}

// This is an extremely simple function that just returns default gems.
// We should be calculating best gem dynamically and returning that instead but this is a temporary stop gap that should be good 90% of the time.
export function getGems(spec: string, gemCount: number, bonus_stats: Stats, contentType: contentTypes, topGear: boolean = true) {
  let gemArray = []
  if (gemCount === 0) return [];
  if (spec === "Preservation Evoker" || spec === "Holy Priest") {
    // 
    if (topGear && gemCount > 0) {
      // We'll only add int gems in Top Gear. Otherwise every individual item gets heavily overrated.
      bonus_stats.intellect = (bonus_stats.intellect || 0) + 75;
      bonus_stats.mastery = (bonus_stats.mastery || 0) + 66;
      gemCount -= 1;
      gemArray.push(192988)
    }
    bonus_stats.mastery = (bonus_stats.mastery || 0) + 70 * (gemCount);
    bonus_stats.crit = (bonus_stats.crit || 0) + 33 * (gemCount);
    gemArray.push(192958)
    return gemArray;
  }
  else if (spec === "Restoration Druid") {
    if (topGear && gemCount > 0) {
      // We'll only add int gems in Top Gear. Otherwise every individual item gets heavily overrated.
      bonus_stats.intellect = (bonus_stats.intellect || 0) + 75;
      bonus_stats.haste = (bonus_stats.haste || 0) + 66;
      gemCount -= 1;
      gemArray.push(192985)
    }
    if (contentType === "Raid") {
      bonus_stats.haste = (bonus_stats.haste || 0) + 70 * (gemCount);
      bonus_stats.mastery = (bonus_stats.mastery || 0) + 33 * (gemCount);
      gemArray.push(192948)
    }
    else if (contentType === "Dungeon") {
      bonus_stats.haste = (bonus_stats.haste || 0) + 70 * (gemCount);
      bonus_stats.versatility = (bonus_stats.versatility || 0) + 33 * (gemCount);
      gemArray.push(192952)
    }
    return gemArray;
  }
  else if (spec === "Discipline Priest" || spec === "Mistweaver Monk") {
    if (topGear && gemCount > 0) {
      // We'll only add int gems in Top Gear. Otherwise every individual item gets heavily overrated.
      bonus_stats.intellect = (bonus_stats.intellect || 0) + 75;
      bonus_stats.haste = (bonus_stats.haste || 0) + 66;
      gemCount -= 1;
      gemArray.push(192985)
    }
    bonus_stats.haste = (bonus_stats.haste || 0) + 70 * (gemCount);
    bonus_stats.crit = (bonus_stats.crit || 0) + 33 * (gemCount);
    gemArray.push(192945);
    return gemArray;
  }
  else if (spec === "Restoration Shaman") {
    if (topGear && gemCount > 0) {
      // We'll only add int gems in Top Gear. Otherwise every individual item gets heavily overrated.
      bonus_stats.intellect = (bonus_stats.intellect || 0) + 75;
      bonus_stats.crit = (bonus_stats.crit || 0) + 66;
      gemCount -= 1;
      gemArray.push(192982)
    }

    bonus_stats.crit = (bonus_stats.crit || 0) + 70 * (gemCount);
    bonus_stats.versatility = (bonus_stats.versatility || 0) + 33 * (gemCount);
    gemArray.push(192923)
    return gemArray;
  }
  else if (spec === "Holy Paladin") {
    if (topGear && gemCount > 0) {
      // We'll only add int gems in Top Gear. Otherwise every individual item gets heavily overrated.
      bonus_stats.intellect = (bonus_stats.intellect || 0) + 75;
      bonus_stats.crit = (bonus_stats.crit || 0) + 66;
      gemCount -= 1;
      gemArray.push(192982)
    }

    bonus_stats.crit = (bonus_stats.crit || 0) + 70 * (gemCount);
    bonus_stats.haste = (bonus_stats.haste || 0) + 33 * (gemCount);
    gemArray.push(192919);
    return gemArray;

  }
  else {
    // This should never be called.
    bonus_stats.haste = (bonus_stats.haste || 0) + 70 * gemCount;
    bonus_stats.mastery = (bonus_stats.mastery || 0) + 33 * gemCount;
    return [192948];
  }
}

export function getGemProp(id: number, prop: string) {
    const temp: any = gemDB.filter(function (gem) {
      return gem.id === id;
    });

    if (temp.length > 0) {
      const gem = temp[0];

      if (prop === "name") return gem.name.en || "";
      else if (gem && prop in gem) return gem[prop as keyof typeof gem];
      else return ""

    }
    else return "";

}

export function getValidWeaponTypesBySpec(spec: string) {
  switch (spec) {
    case SPEC.RESTODRUID:
      return [4, 5, 6, 10, 13, 15];
    case SPEC.MISTWEAVERMONK:
      return [0, 4, 6, 7, 10, 13];
    case SPEC.HOLYPALADIN:
      return [0, 1, 4, 5, 6, 7, 8];
    case SPEC.PRESEVOKER:
      return [0, 4, 5, 7, 10, 13, 15];
    case SPEC.RESTOSHAMAN:
      return [0, 1, 4, 5, 10, 13, 15];
    case SPEC.HOLYPRIEST:
      return [4, 10, 15, 19];
    case SPEC.DISCPRIEST:
      return [4, 10, 15, 19];
    case "Holy Paladin Classic":
      return [0, 1, 4, 5, 6, 7, 8];
    case "Restoration Druid Classic":
      return [4, 5, 6, 10, 13, 15];
    case "Restoration Shaman Classic":
      return [0, 1, 4, 5, 6, 10, 13, 15];
    case "Holy Priest Classic":
      return [4, 10, 15, 19];
    default:
      return [-1, 0];
  }
}


export function getItemLevelBoost(bossID: number, difficulty: number) {
  // Handle max difficulties
  if (difficulty === CONSTANTS.difficulties.mythicMax) {
    if (bossID === 2523 || bossID === 2520) return 3;
    else return 0;
  } // The Mythic Max base level is 447, which means these 450 drops are a small upgrade.
  else if (isMaxxed(difficulty)) return 0;

  // Handle non-max difficulties.
  if (bossID === 2530 || bossID === 2525) return 3; // Forgotten Experiments, Rashok, 
  else if (bossID === 2532 || bossID === 2527) return 6; // Zskarn, Magmorax
  else if (bossID === 2523 || bossID === 2520) return 9; // Echo of Neltharion, Sarkarethreturn 9; 

  return 0;
}

const isMaxxed = (difficulty: number) => {
  return difficulty === CONSTANTS.difficulties.LFRMax || difficulty === CONSTANTS.difficulties.normalMax || 
          difficulty === CONSTANTS.difficulties.heroicMax || difficulty === CONSTANTS.difficulties.mythicMax;
}

export function getVeryRareItemLevelBoost(itemID: number, bossID: number, difficulty: number) {
  const boostedItems = [204465, 204201, 204202, 204211, 202612];

  if (boostedItems.includes(itemID)) {
    // Note here that Dragonscale doesn't get the boost if we're looking at MAX versions of gear.
    if (difficulty === CONSTANTS.difficulties.normalMax && itemID !== 202612) return 4;
    else if (difficulty === CONSTANTS.difficulties.heroicMax && itemID !== 202612) return 6;
    else if (bossID === 2520 || bossID === 2523) return 7;
    /*else if (itemID !== 202612) return 6; */
    else if (!isMaxxed(difficulty)) return 6;
    else return 0;
  } 
  else return 0;
}

export function filterItemListByDropLoc(itemList: any[], sourceInstance: number, sourceBoss: number, loc: any, difficulty: number) {
  let temp = itemList.filter(function (item) {
    //else if (sourceInstance === -17 && pvpRank === 5 && ["1H Weapon", "2H Weapon", "Offhand", "Shield"].includes(item.slot)) expectedItemLevel += 7;
    return loc === item.dropLoc && difficulty === item.dropDifficulty && ((item.source.instanceId == sourceInstance && item.source.encounterId == sourceBoss) || (item.source.instanceId == sourceInstance && sourceBoss == 0));
  });
  return temp;

}

export function filterItemListBySource(itemList: any[], sourceInstance: number, sourceBoss: number, level: number, difficulty: number = 0) {
  let temp = itemList.filter(function (item) {
    let itemEncounter = item.source.encounterId;
    let expectedItemLevel = level;
    
    // "Very Rare" items come with an item level boost. This is annoyingly either a 6 or 7 item level boost.
    if ('source' in item && item.source.instanceId === 1208) {
      const max = isMaxxed(difficulty);
      if (max) expectedItemLevel += getVeryRareItemLevelBoost(item.id, itemEncounter, difficulty);
      else expectedItemLevel += getItemLevelBoost(itemEncounter, difficulty) + getVeryRareItemLevelBoost(item.id, itemEncounter, difficulty);
      
    }
    else if (item.source.instanceId === 1205) { // World Bosses
      if (itemEncounter === 2531) expectedItemLevel = 415
      else expectedItemLevel = 389;
    }

    //else if (sourceInstance === -17 && pvpRank === 5 && ["1H Weapon", "2H Weapon", "Offhand", "Shield"].includes(item.slot)) expectedItemLevel += 7;
    return item.level == expectedItemLevel && ((item.source.instanceId == sourceInstance && item.source.encounterId == sourceBoss) || (item.source.instanceId == sourceInstance && sourceBoss == 0));
  });

  return temp;
}


export function filterItemListByType(itemList: Item[], slot: string) {
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

function sortItems(container: any[]) {
  // Current default sorting is by HPS (soft score) but we could get creative here in future.
  container.sort((a, b) => (a.softScore < b.softScore ? 1 : -1));

  return container;
}

export function getItemDB(gameType = "Retail") {
  return gameType === "Retail" ? itemDB : ClassicItemDB;
}

export function getDifferentialByID(diffList: any, id: number, level: number) {
  let temp = diffList.filter(function (item: any) {
    return item.item == id && item.level == level;
  });

  if (temp.length > 0) return temp[0].score;
  else return -99;
}

// Returns true or false based on whether an ID exists in our item database.
// Items that won't be found include stuff like shirts, low level items, quest items without stats and so on.
// Importing these would be a waste of the user interface.
export function checkItemExists(id: number) {
  return getItem(id) !== "";
}

// Returns a translated item name based on an ID.
export function getTranslatedItemName(id: number, lang: string, effect: any, gameType: gameTypes = "Retail") {
  const idAsString = id.toString();
  if (effect && effect.type === "spec legendary") {
    return effect.name;
  } else {
    // @ts-ignore
    if (idAsString in nameDB && nameDB[idAsString][lang]) return nameDB[idAsString][lang];
    else return "Unknown Item";
  }
}

// Returns a translated Embellishment name based on an ID.
export function getTranslatedEmbellishment(id: number, lang: string) {

  let temp = embellishmentDB.filter(function (embel) {

    return embel.id === id;
  });
  // @ts-ignore
  if (temp.length > 0) return temp[0].name[lang];
  else return "Unknown Effect";
}

export function getEmbellishmentIcon(id: number) {
  const embel = embellishmentDB.filter((embel) => embel.id === id);

  if (embel[0] === undefined) {
    return "https://wow.zamimg.com/images/icons/socket-domination.gif";
  } else {
    return "https://wow.zamimg.com/images/wow/icons/large/" + embel[0].icon + ".jpg";
  }
}

// Grabs a specific item from whichever item database is currently selected.
export function getItem(id: number, gameType = "Retail") {
  let temp = getItemDB(gameType).filter(function (item: any) {
    return item.id === id;
  });
  if (temp.length > 0) return temp[0];
  else return '';
}

export function applyDiminishingReturns(stats: Stats) {
  //console.log("Stats Pre-DR" + JSON.stringify(stats));
  const diminishedStats = JSON.parse(JSON.stringify(stats));
  for (const [key, value] of Object.entries(stats)) {
    if (["crit", "haste", "mastery", "versatility", "leech"].includes(key)) {
      const DRBreakpoints = STATDIMINISHINGRETURNS[key.toUpperCase()];

      const baseStat = diminishedStats[key];
      for (var j = 0; j < DRBreakpoints.length; j++) {
        diminishedStats[key] -= Math.max((baseStat - DRBreakpoints[j]) * 0.1, 0);
      }
    }
  }
  //console.log("Stats Post-DR" + JSON.stringify(diminishedStats));

  return diminishedStats;
}

// This function grabs a selected prop from the currently selected item database.
// It should replace most other functions that get only one specific prop.
export function getItemProp(id: number, prop: string, gameType: gameTypes = "Retail") {
  const item = getItem(id, gameType);

  if (item !== "" && prop in item) return item[prop];
  else if (item !== "" && prop === "itemLevel") {
    // This is for props that we should expect to have.
    reportError(null, "ItemUtilities", "Item prop: " + prop + " not found or item missing", id.toString());
    return -2;
  } else {
    // This is for props that may or may not exist on an item like effects.
    return "";
  }
}

// Returns a translated item name based on an ID.
// Add some support for missing icons.
export function getItemIcon(id: number, gameType = "Retail") {
  const item = getItem(id, gameType);
  if (gameType === "Classic" && item !== "") return "https://wow.zamimg.com/images/wow/icons/large/" + item.icon + ".jpg";
  else if (item !== "" && "icon" in item) return process.env.PUBLIC_URL + "/Images/Icons/" + item.icon + ".jpg";
  else if (item !== "") {
    reportError("", "ItemUtilities", "Icon not found for ID", id.toString());
    return process.env.PUBLIC_URL + "/Images/Icons/missing.jpg";
  }
}



export function getGemIcon(id: number) {
  const gem = dominationGemDB.filter((gem) => gem.gemID === id);
  let gemIcon = "";
  if (gem[0] === undefined) {
    return "https://wow.zamimg.com/images/icons/socket-domination.gif";
  } else {
    return "https://wow.zamimg.com/images/wow/icons/large/" + gem[0].icon + ".jpg";
  }
}

// Returns true if an item always has a socket attached like some crafted rings etc. 
// Is not designed to check if an item has had a socket added via token or RNG.
export function checkDefaultSocket(id: number) {
  let temp = itemDB.filter(function (item: any) {
    return item.id === id;
  });

  if (temp.length > 0) {
    const socketType = temp[0].socketType;
    if (socketType == "Prismatic") return 1;
  } 
  return 0;
}

// Returns item stat allocations. MUST be converted to stats before it's used in any scoring capacity.
export function getItemAllocations(id: number, missiveStats: any[] = []) {
  const item = getItem(id);

  let statArray: Stats = {};
  if (item) {
    statArray = { ...item.stats };
    // Some items have "unallocated" stats which are then assigned using missives or crafted bonus IDs. We'll handle those here.
    if ("unallocated" in item.stats) {
      for (var i = 0; i < missiveStats.length; i++) {
        let mStat = missiveStats[i];
        statArray[mStat] += item.stats.unallocated;
        
      }
    }
  }

  if (item) return statArray;
  else return {};
}

// Returns which secondary item category a given slot falls in.
function getItemCat(slot: string) {
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

// This is a new version of WepCombos that simply stores them in an array instead of in a weird 
// composite "fake item". Top Gear can then separate them after combinations have been built.
export function buildNewWepCombos(player: Player, active: boolean = false, equipped: boolean = false) {
  let wep_list = [];
  let main_hands = player.getActiveItems("1H Weapon", active, equipped);
  let off_hands = player.getActiveItems("Offhands", active, equipped);
  let two_handers = player.getActiveItems("2H Weapon", active, equipped);
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

// @deprecated
/*
export function buildWepCombos(player: Player, active: boolean = false, equipped: boolean = false) {
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
          0, //main_hand.socket + off_hand.socket, // Socket - Weapons can't actually get sockets so this is always false.
          "", // Tertiary
          0,
          Math.round((main_hand.level + off_hand.level) / 2),
          "", // Bonus Ids
        );
        item.stats = sumObjectsByKey(main_hand.stats, off_hand.stats);
        item.stats.bonus_stats = {};
        item.vaultItem = main_hand.vaultItem || off_hand.vaultItem;
        item.uniqueEquip = item.vaultItem ? "vault" : (main_hand.uniqueEquip || off_hand.uniqueEquip);
        item.softScore = main_hand.softScore + off_hand.softScore;
        item.offhandID = off_hand.id;
        item.mainHandLevel = main_hand.level;
        item.offHandLevel = off_hand.level;
        item.mainHandTertiary = main_hand.tertiary;
        item.offHandTertiary = off_hand.tertiary;
        item.mainHandUniqueHash = main_hand.uniqueHash;
        item.offHandUniqueHash = off_hand.uniqueHash;

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
} */

// Calculates the intellect and secondary stats an item should have at a given item level.
// This uses the RandPropPointsByLevel and CombatMultByLevel tables and returns a dictionary object of stats.
// Stat allocations are passed to the function from our Item Database.
export function calcStatsAtLevel(itemLevel: number, slot: string, statAllocations: any, tertiary: string) {
  let combat_mult = 0;

  /*let stats = {
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
  }; */
  let stats: Stats = {}; // TODO: Try and remove leech here.

  
  let rand_prop = randPropPoints[itemLevel]["slotValues"][getItemCat(slot)];
  if (slot == "Finger" || slot == "Neck") combat_mult = combat_ratings_mult_by_ilvl_jewl[itemLevel];
  else combat_mult = combat_ratings_mult_by_ilvl[itemLevel];

  // These stats should be precise, and never off by one.
  for (var key in statAllocations) {
    let allocation = statAllocations[key];

    if (["haste", "crit", "mastery", "versatility"].includes(key) && allocation > 0) {
      //stats[key] = Math.floor(Math.floor(rand_prop * allocation * 0.0001 + 0.5) * combat_mult);
      stats[key] = Math.round(rand_prop * allocation * 0.0001 * combat_mult);
    } 
    else if (key === "leech") {
      stats[key] = Math.round(rand_prop * allocation * 0.0001 * combat_mult);
    }
    else if (key === "intellect") {
      stats[key] = Math.round(rand_prop * allocation * 0.0001 * 1);
    } else if (key === "stamina") {
      // todo
    }
  }

  // This, on the other hand, is a close estimate that should be replaced ASAP.
  if (tertiary === "Leech") {
    if (slot === "Trinket") {
      // This is an occasionally off-by-one formula for leech that should eventually be replaced.
      stats.leech = Math.ceil(194 + 1.2307 * (itemLevel - 376));
    } else {
      const terMult = slot === "Finger" || slot === "Neck" ? 0.170127 : 0.428632;
      stats.leech = Math.floor(terMult * ((stats.haste) || 0 + (stats.crit || 0) + (stats.mastery || 0) + (stats.versatility || 0)));
    }
  }
  return stats;
}

export function buildStatString(stats: Stats, effect: ItemEffect, lang: string = "en") {
  let statString = "";
  let statsList = [];
  const ignoreList = ["stamina", "bonus_stats", "strength", "agility", "intellect", "leech"];
  for (const [statkey, statvalue] of Object.entries(stats)) {
    if (!ignoreList.includes(statkey)) statsList.push({ key: statkey, val: statvalue });
  }

  statsList = statsList.sort(function (a: any, b: any) {
    return b.val - a.val;
  });

  if (stats.intellect) statString = stats.intellect + " Int / ";

  for (var ind in statsList) {
    const statKey: string = statsList[ind]["key"];
    // @ts-ignore
    const statName: string = statKey in translatedStat ? translatedStat[statKey][lang] : "";

    statString +=
      statsList[ind]["val"] > 0
        ? statsList[ind]["val"] +
          " " +
          statName +
          " / " 
        : "";
  }

  // Add an "effect" tag. We exclude Dom gems and Legendaries here because it's already clear they are giving you an effect.
  //if (effect.name === "Onyx Annulet Trigger") statString += getAnnuletGemTag({automatic: true}, false);
  if (effect && effect.type !== "spec legendary") statString += "Effect" + " / "; // t("itemTags.effect")
  

  return statString.slice(0, -3); // We slice here to remove excess slashes and white space from the end.
}

// Returns the string with its first letter capitalized.
export function correctCasing(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
export function getPrimordialImage(id) {

  const primImages = {
    "s204020": s204020,
    "s204013": s204013,
    "s204010": s204010,
    "s204027": s204027,
    "s204002": s204002,
    "s204029": s204029,
    "s204000": s204000,
    "s204012": s204012,
  }

  return primImages["s" + id];
} */



// Compiles stats & bonus stats into one array to which we can then apply DR etc.
// TODO, this is identical to TopGearShared, so put it somewhere accessible to both.
export function compileStats(stats: Stats, bonus_stats: Stats) {
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



// Return an item score.
// Score is calculated by multiplying out an items stats against the players stat weights.
// Special effects, sockets and leech are then added afterwards.
export function scoreItem(item: Item, player: Player, contentType: contentTypes, gameType: gameTypes = "Retail", playerSettings: any) {
  let score = 0;
  let bonus_stats: Stats = {mastery: 0, crit: 0, versatility: 0, intellect: 0, haste: 0, hps: 0, mana: 0, dps: 0, allyStats: 0};
  let item_stats = { ...item.stats };
  // Calculate Effect.
  if (item.effect) {
    const effectStats = getEffectValue(item.effect, player, player.getActiveModel(contentType), contentType, item.level, playerSettings, gameType, player.activeStats);
    bonus_stats = compileStats(bonus_stats, effectStats as Stats);
  }

  // Handle Annulet
  if (item.id === 203460) {
    //const combo = getBestCombo(player, contentType, item.level, player.activeStats, playerSettings)
    try {
      const combo = player.getBestPrimordialIDs(playerSettings, contentType);
      const annuletStats = getOnyxAnnuletEffect(combo, player, contentType, item.level, player.activeStats, playerSettings);
      bonus_stats = compileStats(bonus_stats, annuletStats);
    }
    catch (error) {
      bonus_stats.hps = 6750; // This should never be returned, but is a fair estimate if the app does crash.
      reportError(player, "ItemUtil Annulet Error", error, "");
    }

  }

  // Add Retail Socket
  if (item.socket) {
    getGems(player.spec, item.socket || 1, bonus_stats, contentType, false);
    //score += 88 * player.getStatWeight(contentType, player.getHighestStatWeight(contentType)) * (item.socket || 1); 
  }

  // Multiply the item's stats by our stat weights.
  let sumStats = compileStats(item_stats, bonus_stats);
  //if (gameType === "Classic") sumStats = applyClassicStatMods(player.getSpec(), sumStats);

  for (var stat in sumStats) {
    if (stat !== "bonus_stats") {
      let statSum = sumStats[stat];
      score += statSum * player.getStatWeight(contentType, stat);
    }
  }

  // Add any bonus HPS
  if (bonus_stats.hps) {
    score += (bonus_stats.hps / player.getHPS(contentType)) * player.activeStats.intellect;
  }

  // Add any bonus DPS. This is valued 1:1 with bonus HPS in dungeons only.
  if (contentType === "Dungeon" && bonus_stats.dps) {
    score += ((bonus_stats.dps * CONSTANTS.dpsValue) / player.getHPS(contentType)) * player.activeStats.intellect;
  }

  // Add any bonus Mana
  if (bonus_stats.mana) {
    score += ((bonus_stats.mana * player.getSpecialQuery("OneManaHealing", contentType)) / player.getHPS(contentType)) * player.activeStats.intellect;
  }

  // Add any group benefit, if we're interested in it.
  // TODO: Clean up code.
  if (playerSettings && playerSettings.includeGroupBenefits && playerSettings.includeGroupBenefits.value && bonus_stats.allyStats) {
    score += 0.45 * bonus_stats.allyStats; // TODO: Move this somewhere nice.
  }

  // Classic specific sockets
  /*
  if (item.sockets) {
    socketItem(item, player.statWeights["Raid"]);
    score += item.socketedGems["score"];
  } */

  return Math.round(100 * score) / 100;
}

/*
function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
} */


/*
function sumObjectsByKey<T extends Record<string | number, number>>(objs: T[]): T {
  return objs.reduce((result, obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      result[key] = (result[key] || 0) + value;
    });
    return result;
  }, {} as T);
} */
