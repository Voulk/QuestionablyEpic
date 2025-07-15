import itemDB from "Databases/ItemDB.json";
import { embellishmentDB } from "../../Databases/EmbellishmentDB";
import { getOnyxAnnuletEffect } from "Retail/Engine/EffectFormulas/Generic/PatchEffectItems/OnyxAnnuletData";
import { getCircletEffect } from "Retail/Engine/EffectFormulas/Generic/PatchEffectItems/CyrcesCircletData";
import classicItemDB from "Databases/ClassicItemDB.json";
import { randPropPoints } from "../../Retail/Engine/RandPropPointsBylevel";
import { randPropPointsClassic } from "../../Retail/Engine/RandPropPointsBylevelClassic";
import { combat_ratings_mult_by_ilvl, combat_ratings_mult_by_ilvl_jewl } from "../../Retail/Engine/CombatMultByLevel";
import { getEffectValue } from "../../Retail/Engine/EffectFormulas/EffectEngine";
import SPEC from "./SPECS";
import { translatedStat, STATDIMINISHINGRETURNS } from "./STAT";
import Item from "../Items/Item";
import { reportError } from "../SystemTools/ErrorLogging/ErrorReporting";
import { CONSTANTS } from "./CONSTANTS";
import { gemDB } from "Databases/GemDB";
import { nameDB } from "Databases/ItemNameDB";
import Player from "General/Modules/Player/Player";
import { getSeasonalDungeons, getMoPDungeons } from "Databases/InstanceDB";
import { classicGemDB } from "Databases/ClassicGemDB";



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
    case "Holy Priest Classic":
    case "Discipline Priest Classic":
      return [0, 1]; // Misc + Cloth
    case "Holy Paladin Classic":
      return [0, 4, 6, 7, 11]; // Misc + Plate + Shields
    case "Restoration Druid Classic":
      return [0, 2, 8, 11]; // Misc + Plate
    case "Mistweaver Monk Classic":
      return [0, 2, 8, 11]; // Misc + Plate
    case "Restoration Shaman Classic":
      return [0, 3, 6, 9, 11]; // Misc + Plate + Shields
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
          return [0, 1, 4, 5, 6, 7, 8, 11];
        case SPEC.PRESEVOKER:
          return [0, 4, 5, 7, 10, 13, 15];
        case SPEC.RESTOSHAMAN:
          return [0, 1, 4, 5, 10,  13, 15];
        case SPEC.HOLYPRIEST:
          return [4, 10, 15, 19];
        case SPEC.DISCPRIEST:
          return [4, 10, 15, 19];
        case "Holy Paladin Classic":
          return [0, 1, 4, 5, 6, 7, 8, 11];
        case "Restoration Druid Classic":
          return [4, 5, 6, 10, 11, 13, 15];
        case "Restoration Shaman Classic":
          return [0, 1, 4, 5, 10, 11, 13, 15];
        case "Holy Priest Classic":
          return [4, 10, 15, 19];
        case "Mistweaver Monk Classic":
            return [0, 4, 6, 7, 10, 13];
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

// Auto generate gems based on stat DR and adjusted weights. 
export function autoGenGems(spec: string, gemCount: number, bonus_stats: Stats, contentType: contentTypes, setStats: Stats, adjustedWeights: any) {
  interface gemData {bigStat: string, smallStat: string, score: number, gemID: number}
  let gemArray: gemData[] = []
  const secondaries = ["haste", "mastery", "crit", "versatility"];
  
  const adjGemCount = gemCount - 1;

  const highStat = 70 * adjGemCount;
  const lowStat = 33 * adjGemCount;

  for (let i = 0; i < secondaries.length; i++) {
    for (let j = 0; j < secondaries.length; j++) {
      if (i !== j) {
        const bigStat = secondaries[i];
        const smallStat = secondaries[j];
        const score = (adjustedWeights[bigStat] * highStat) + (adjustedWeights[smallStat] * lowStat);
        //const gemID = getGemID(bigStat, smallStat, spec, setStats, contentType);
        const gemID = 0;
        gemArray.push({bigStat, smallStat, score, gemID});
      }

    }
  }


}

// Returns the element of the gem. Used for Lariat and Idol trinkets. 
export function getGemElement(id: number): string {
  const gem = gemDB.filter(gem => gem.id === id);
  if (gem.length > 0) return 'element' in gem[0]? gem[0].element : "Earth";
  else return "";
}

// This is an extremely simple function that just returns default gems.
// We should be calculating best gem dynamically and returning that instead but this is a temporary stop gap that should be good 90% of the time.
export function getGems(spec: string, gemCount: number, bonus_stats: Stats, contentType: contentTypes, modelName: string, topGear: boolean = true) {
  let gemArray = []
  if (gemCount === 0) return [];
  if (spec === "Preservation Evoker") {
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
  else if (spec === "Holy Priest" && contentType === "Raid") {
    if (topGear && gemCount > 0) {
      // We'll only add int gems in Top Gear. Otherwise every individual item gets heavily overrated.
      bonus_stats.intellect = (bonus_stats.intellect || 0) + 75;
      bonus_stats.crit = (bonus_stats.crit || 0) + 66;
      gemCount -= 1;
      gemArray.push(192982)
    }
    bonus_stats.crit = (bonus_stats.crit || 0) + 147 * (gemCount);
    bonus_stats.mastery = (bonus_stats.mastery || 0) + 49 * (gemCount);
    gemArray.push(192958)
    return gemArray;
  }
  else if (spec === "Holy Priest" && contentType === "Dungeon") {
    if (topGear && gemCount > 0) {
      // We'll only add int gems in Top Gear. Otherwise every individual item gets heavily overrated.
      bonus_stats.intellect = (bonus_stats.intellect || 0) + 75;
      bonus_stats.crit = (bonus_stats.crit || 0) + 66;
      gemCount -= 1;
      gemArray.push(192982)
    }
    bonus_stats.crit = (bonus_stats.crit || 0) + 70 * (gemCount);
    bonus_stats.haste = (bonus_stats.haste || 0) + 33 * (gemCount);
    gemArray.push(192919)
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
  else if (spec === "Discipline Priest" || modelName === "Rising Mist" || (spec === "Mistweaver Monk" && contentType === "Dungeon")) {
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
  else if (spec === "Restoration Shaman" || modelName === "Tear of Morning") {
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

    if (contentType === "Raid") {
      bonus_stats.crit = (bonus_stats.crit || 0) + 70 * (gemCount);
      bonus_stats.mastery = (bonus_stats.haste || 0) + 33 * (gemCount);
      gemArray.push(192958);
    }
    else if (contentType === "Dungeon") {
      bonus_stats.crit = (bonus_stats.crit || 0) + 70 * (gemCount);
      bonus_stats.haste = (bonus_stats.haste || 0) + 33 * (gemCount);
      gemArray.push(192919);
    }


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

      if (prop === "name" && gem.name.en) return gem.name.en || "";
      else if (prop === "name") return gem.name || "";
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
    case "Mistweaver Monk Classic":
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
      return [0, 1, 4, 5, 6, 7, 8, 11];
    case "Restoration Druid Classic":
      return [4, 5, 10, 11, 13, 15];
    case "Restoration Shaman Classic":
      return [0, 1, 4, 5, 6, 10, 11, 13, 15];
    case "Holy Priest Classic":
    case "Discipline Priest Classic":
      return [4, 10, 15, 19];
    default:
      return [-1, 0];
  }
}


export function getItemLevelBoost(bossID: number, difficulty: number) {
  // Handle max difficulties
  if (difficulty === CONSTANTS.difficulties.mythicMax) {
    if (bossID === 2523 || bossID === 2520) return 0;
    else return 0;
  } // The Mythic Max base level is 447, which means these 450 drops are a small upgrade.
  else if (isMaxxed(difficulty)) return 0;

  // Handle non-max difficulties.
  if (bossID === 2640 || bossID === 2641) return 3; // Cauldron, Rik
  else if (bossID === 2642 || bossID === 2653 || bossID === 2644) return 6; // Stix, Sprocket, OAB
  else if (bossID === 2645 || bossID === 2646) return 9; // Mug'zee, Gallywix

  return 0;
}

// Sometimes items have an optional effect that can be added to them. Embellishments for example, or different variations (Changeling / Circlet).
export const getItemEffectOptions = (itemID: number, gameType: gameTypes = "Retail"): { type: string; label: string; effectName: string }[] => {
  const options: { type: string; label: string; effectName: string }[] = []; // type: "embellishment", label: "Add Embellishment: Writhing Armor Banding", effectName: "Writhing Armor Banding"
  const item = getItem(itemID);

  if (getItemProp(item.id, "crafted")) {
    // Crafted item effects are limited to Embellishments currently.
    if (item.slot.includes("Weapon") || item.slot === "Offhand") {
      // Sigil embellishments are limited to weapon and offhand slots. Does NOT include Shields.
      options.push({type: "embellishment", label: "Darkmoon Sigil: Ascension", effectName: "Darkmoon Sigil: Ascension"})
      options.push({type: "embellishment", label: "Darkmoon Sigil: Symbiosis", effectName: "Darkmoon Sigil: Symbiosis"})
    }
    if (item.slot !== "Finger" && item.slot !== "Neck" && !item.slot.includes("Weapon")) {
      // Linings & Armor Banding are limited to non-weapon, non-jewelry slots.
      options.push({type: "embellishment", label: "Writhing Armor Banding", effectName: "Writhing Armor Banding"})
      options.push({type: "embellishment", label: "Dawnthread Lining", effectName: "Dawnthread Lining"})
      options.push({type: "embellishment", label: "Duskthread Lining", effectName: "Duskthread Lining"})
    }
  }
  // Now, we can also add non-embellishment options here but we don't have any prominent ones yet so TODO.


  return options;
}

const isMaxxed = (difficulty: number) => {
  return difficulty === CONSTANTS.difficulties.LFRMax || difficulty === CONSTANTS.difficulties.normalMax || 
          difficulty === CONSTANTS.difficulties.heroicMax || difficulty === CONSTANTS.difficulties.mythicMax;
}

export function getVeryRareItemLevelBoost(itemID: number, bossID: number, difficulty: number) {
  const boostedItems = [228844, 231265, 232805];

  if (boostedItems.includes(itemID)) {
    // MAX difficulties are a bit pointless for very rare items now since they all drop in the same upgrade band and so get no boost.
    if (isMaxxed(difficulty)) return 0;
    else if (bossID === 2653 || bossID === 2644) return 10; // Sprocket, OAB
    else if (bossID === 2646) return 7; // Gally
    else return 0;
  } 
  else return 0;
}

export function filterItemListByDropLoc(itemList: any[], sourceInstance: number, sourceBoss: number, loc: any, difficulty: number) {

  let temp = itemList.filter(function (item) {
    //else if (sourceInstance === -17 && pvpRank === 5 && ["1H Weapon", "2H Weapon", "Offhand", "Shield"].includes(item.slot)) expectedItemLevel += 7;
    //console.log("loc: " + loc + " vs " + item.dropLoc + " diff: " + difficulty + " vs " + item.dropDifficulty + " source: " + sourceInstance + " vs " + item.source.instanceId + " boss: " + sourceBoss + " vs " + item.source.encounterId)
    
    return loc === item.dropLoc && difficulty === item.dropDifficulty && ((item.source.instanceId == sourceInstance && item.source.encounterId == sourceBoss) || (item.source.instanceId == sourceInstance && sourceBoss == 0));
  });
  return temp;

}

export function filterItemListBySource(itemList: any[], sourceInstance: number, sourceBoss: number, level: number, difficulty: number = 0) {
  let temp = itemList.filter(function (item) {
    let itemEncounter = item.source.encounterId;
    let expectedItemLevel = level;
    
    // "Very Rare" items come with an item level boost. This is annoyingly either a 6 or 7 item level boost.
    if ('source' in item && item.source.instanceId === 1273) {
      const max = isMaxxed(difficulty);
      if (max) expectedItemLevel += getVeryRareItemLevelBoost(item.id, itemEncounter, difficulty);
      else expectedItemLevel += getItemLevelBoost(itemEncounter, difficulty) + getVeryRareItemLevelBoost(item.id, itemEncounter, difficulty);
      
    }
    else if (item.source.instanceId === 1278) { // World Bosses
      expectedItemLevel = 603;

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
  return gameType === "Retail" ? itemDB : classicItemDB;
}

export function getDifferentialByID(diffList: any, id: number, level: number) {
  let temp = diffList.filter(function (item: any) {
    return item.item == id && item.level == level;
  });

  if (temp.length > 0) return temp[0].score;
  else return -99;
}

// Returns the number of upgrades (score > 0) for a given section.
export const getNumUpgrades = (items: any[], raidID : number, bossID : number, difficultyID? : number) => {
  if (difficultyID) return items.filter((item: any) => item.source.instanceId === raidID && item.source.encounterId === bossID && item.dropDifficulty === difficultyID && item.score > 0).length;
  else {
    return items.filter((item: any) => item.source.instanceId === raidID && item.source.encounterId === bossID && item.score > 0).length;

  }
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
  /*if (effect && effect.type === "spec legendary") {
    return effect.name;
  } */
  //else {
    // @ts-ignore
  if (gameType === "Classic") return classicItemDB.filter((item) => item.id === id)[0].names[lang];
  else if (idAsString in nameDB && nameDB[idAsString][lang]) return nameDB[idAsString][lang];
  else return "Unknown Item";
}

// Returns a translated Embellishment name based on an ID.
export function getTranslatedEmbellishment(id: number, lang: string) {

  let temp = embellishmentDB.filter(function (embel) {

    return embel.id === id;
  });
  // @ts-ignore
  if (temp.length > 0) return temp[0].name;
  else return "Unknown Effect";
}

export function getEmbellishmentIcon(id: number) {
  const embel = embellishmentDB.filter((embel) => embel.id === id);

  if (embel[0] === undefined) {
    return "https://wow.zamimg.com/images/icons/socket-domination.gif";
  } 
  else if (embel[0].icon === "inv_cape_armor_celestial")
    return "https://wow.zamimg.com/images/wow/icons/large/3752753.jpg";
  else {
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
  if (item !== "" && "icon" in item) return process.env.PUBLIC_URL + "/Images/Icons/" + item.icon + ".jpg";
  else if (item !== "") {
    reportError("", "ItemUtilities", "Icon not found for ID", id.toString());
    return process.env.PUBLIC_URL + "/Images/Icons/missing.jpg";
  }
}



export function getGemIcon(id: number, gameType: gameTypes = "Retail") {

  const gem = gameType === "Retail" ? gemDB.filter((gem) => gem.id === id) : classicGemDB.filter((gem) => gem.id === id);

  if (gem[0] === undefined) {
    return "https://wow.zamimg.com/images/icons/socket-domination.gif";
  } else {
    //return process.env.PUBLIC_URL + "/Images/Icons/" + gem.icon + ".jpg";
    return "https://wow.zamimg.com/images/wow/icons/large/" + gem[0].icon.replace("Images/Icon", "") + ".jpg"
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
export function getItemAllocations(id: number, missiveStats: any[] = [], gameType: gameTypes = "Retail") {
  const item = getItem(id, gameType);

  let statArray: Stats = {};
  if (item) {
    statArray = { ...item.stats };
    // Some items have "unallocated" stats which are then assigned using missives or crafted bonus IDs. We'll handle those here.
    if ("unallocated" in item.stats) {
      let mStat = missiveStats[0];
      statArray[mStat] = (statArray[mStat] || 0) +  item.stats.unallocated;       
    }
    if ("unallocated2" in item.stats) {
      let mStat = missiveStats[1];
      statArray[mStat] = (statArray[mStat] || 0) +  item.stats.unallocated2;       
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

/***
 * In Mists of Pandaria, items are available at different levels again due to Thunderforging and Challenge modes (among others). That means we can use
 * a similar function to retail again to calculate stats but with one catch:
 * - Sockets have a penalty of 80 intellect and 80 secondaries. This 80 secondaries can be taken in different ways which is defined in the StatPercentEditor columns of ItemSparse.
 * - Note that crafted items appear to be bugged and the secondary penalty is taken almost at random. This will need to be investigated further later.
 */

export function calcStatsAtLevelClassic(itemID: number, itemLevel: number/*, statAllocations: any*/) {
  let combat_mult = 0;

  let stats: Stats = {}; 
  const itemData = getItem(itemID, "Classic");
  const slot = itemData.slot;
  // If an item matches its item level then just return that. We'll only use our scaling formula if required. We'd like to use it always but items are bugged.

  if (itemLevel === itemData.itemLevel) {
    return itemData.stats;
  }

  // An item is using a custom item level, so we'll calculate its stats using a scaling formula.
  const statAllocations = itemData.allocations;
  let gemCount = 0;
  let penalties: Stats = {};
  if (itemData.sockets && itemData.sockets.gems.length > 0) {
    gemCount = itemData.sockets.gems.length;
    penalties = itemData.socketPenalties;
  }

  let rand_prop = randPropPointsClassic[itemLevel]["slotValues"][getItemCat(slot)];
  //if (slot == "Finger" || slot == "Neck") combat_mult = combat_ratings_mult_by_ilvl_jewl[itemLevel];
  //else combat_mult = combat_ratings_mult_by_ilvl[itemLevel];
  combat_mult = 1;

  // These stats should be precise, and never off by one.
  for (var key in statAllocations) {
    let allocation = statAllocations[key];

    if (["haste", "crit", "mastery", "spirit"].includes(key) && allocation > 0) {
      //stats[key] = Math.floor(Math.floor(rand_prop * allocation * 0.0001 + 0.5) * combat_mult);
      stats[key] = Math.round(rand_prop * allocation * 0.0001) - (penalties[key] || 0); // It doesn't look like combat mult is used at the moment.
    } 
    else if (key === "intellect") {
      stats[key] = Math.round(rand_prop * allocation * 0.0001 * 1) - gemCount * 80;
    } 
    else if (key === "spellpower") {
      stats[key] = Math.round(rand_prop * allocation * 0.0001 * 1)
    }
    else if (key === "stamina") {
      // todo
    }
  }

  return stats;
}

// Calculates the intellect and secondary stats an item should have at a given item level.
// This uses the RandPropPointsByLevel and CombatMultByLevel tables and returns a dictionary object of stats.
// Stat allocations are passed to the function from our Item Database.
export function calcStatsAtLevel(itemLevel: number, slot: string, statAllocations: any, tertiary: string) {
  let combat_mult = 0;

  let stats: Stats = {}; 

  let rand_prop = randPropPoints[itemLevel]["slotValues"][getItemCat(slot)];
  if (slot == "Finger" || slot == "Neck") combat_mult = combat_ratings_mult_by_ilvl_jewl[itemLevel];
  else combat_mult = combat_ratings_mult_by_ilvl[itemLevel];

  // These stats should be precise, and never off by one.
  for (var key in statAllocations) {
    let allocation = statAllocations[key];

    if (["haste", "crit", "mastery", "versatility", "spirit"].includes(key) && allocation > 0) {
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

  // This could all be shortened to a one line formula by using slot-by-slot allocations like the trinket formula.
  // Accuracy is the same but tidy code is nice code.
  if (tertiary === "Leech") {
    const terMult = slot === "Finger" || slot === "Neck" ? 0.170127 : 0.428632;
    if (slot === "Trinket") {
      stats.leech = Math.round(rand_prop * combat_mult * 0.0001 * terMult * 6995);
    } else {
      stats.leech = Math.floor(terMult * (((stats.haste) || 0) + (stats.crit || 0) + (stats.mastery || 0) + (stats.versatility || 0)));
    }
  }
  return stats;
}

export function buildStatString(stats: Stats, effect: ItemEffect, lang: string = "en") {
  let statString = "";
  let statsList = [];
  const ignoreList = ["stamina", "bonus_stats", "strength", "agility", "intellect", "leech", "hit", "weaponSwingSpeed", "averageDamage"];
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
  if (effect) statString += "Effect" + " / "; // t("itemTags.effect")
  

  return statString.slice(0, -3); // We slice here to remove excess slashes and white space from the end.
}

export function buildStatStringSlim(stats: Stats, effect: ItemEffect, lang: string = "en") {
  let statString = "";
  let statsList = [];
  const ignoreList = ["stamina", "bonus_stats", "strength", "agility", "intellect", "leech", "hit", "weaponSwingSpeed", "averageDamage"];
  for (const [statkey, statvalue] of Object.entries(stats)) {
    if (!ignoreList.includes(statkey)) statsList.push({ key: statkey, val: statvalue });
  }

  statsList = statsList.sort(function (a: any, b: any) {
    return b.val - a.val;
  });

  //if (stats.intellect) statString = stats.intellect + " Int / ";

  for (var ind in statsList) {
    const statKey: string = statsList[ind]["key"];
    // @ts-ignore
    const statName: string = statKey in translatedStat ? translatedStat[statKey][lang] : "";

    statString +=
      statsList[ind]["val"] > 0
        ? statName +
          " / " 
        : "";
  }

  // Add an "effect" tag. We exclude Dom gems and Legendaries here because it's already clear they are giving you an effect.
  //if (effect.name === "Onyx Annulet Trigger") statString += getAnnuletGemTag({automatic: true}, false);
  if (effect) statString += "Effect" + " / "; // t("itemTags.effect")
  

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

/*
export function getEmbellishmentID(embellishmentName) {
  const Object.keys(bonus_IDs).filter(bonusID => {

  })

}*/

function checkAutoAddLevelOk(item: any, itemLevelReq: number) {
  // Handle any exceptions. These might include items that don't match the item level but that are best in their category so should be included anyway.
  if ((item.id === 71249 || item.id === 71086) && itemLevelReq === 391) return true; // Rep belt, no good higher ilvl options. Also Tarecgosa.
  else if (item.id === 65124 && (itemLevelReq === 378 || itemLevelReq === 391)) return true; // Fall of Mortality. Available and very good. 
  else if ((item.id === 77096) && (itemLevelReq === 410)) return true; // Relic / cape. No 410+ options.
  
  else if (itemLevelReq === 476 && item.itemLevel === 483) return true;
  else if (itemLevelReq === 489 && item.itemLevel === 496) return true;
  else if (itemLevelReq === 502 && item.itemLevel === 509) return true;
  // The rest
  else return false
}

// It is useful to have some items to work with.
export function autoAddItems(player: Player, gameType: gameTypes, itemLevel: number, source: string = "") {
  let itemDB = getItemDB(gameType);
  //player.clearActiveItems();
  const acceptableArmorTypes = getValidArmorTypes(player.spec);
  const acceptableWeaponTypes = getValidWeaponTypesBySpec(player.spec);

  itemDB = itemDB.filter(
    (key: any) =>
      (!("classReq" in key) || key.classReq.includes(player.spec)) &&
      (!("classRestriction" in key) || (key.classRestriction.includes(player.spec) || player.spec.includes(key.classRestriction))) &&
      (gameType === "Classic" || itemLevel > 640) &&
      (key.itemLevel === itemLevel || gameType === "Retail" || itemLevel === -1 || checkAutoAddLevelOk(key, itemLevel)) && 
      (key.slot === "Back" ||
        (key.itemClass === 4 && acceptableArmorTypes.includes(key.itemSubClass)) ||
        key.slot === "Holdable" ||
        key.slot === "Offhand" ||
        (key.slot === "Shield" && (player.spec.includes("Holy Paladin") || player.spec.includes("Restoration Shaman"))) || 
        (key.itemClass === 2 && acceptableWeaponTypes.includes(key.itemSubClass)) ||
        (key.itemClass === 2 && player.spec === "Holy Priest Classic")), // Wands
        );

  itemDB.forEach((item: any) => {
    let sourceCheck = true;
    if (source !== "") {
      const sources = getItemProp(item.id, "sources", gameType)[0];
      // Check the item drops from the expected location.
      if (item.id === 228411) sourceCheck = true;
      else if (item.itemSetId && item.classRestriction && item.classRestriction.includes(player.spec) && item.itemLevel >= 620) sourceCheck = true;
      else if (source === "Undermine" && sources) sourceCheck = (sources.instanceId === 1296);
      else if (source === "S2 Dungeons" && sources) sourceCheck = sources.instanceId === -1 && getSeasonalDungeons().includes(sources.encounterId); // TODO


      else if (source === "Mogushan Vaults" && sources) sourceCheck = ([317/*, 320, 330*/].includes(sources.instanceId));
      else if (source === "T14" && sources) sourceCheck = ([317, 330].includes(sources.instanceId));
      else if (source === "T14+" && sources) sourceCheck = ([317, 320, 330].includes(sources.instanceId) && sources.difficulty === 1);
      else if (source === "MoP Dungeons" && sources) sourceCheck = sources.instanceId === -1 && getMoPDungeons().includes(sources.encounterId) && sources.difficulty === 1; // TODO
      else if (source === "Celestial Vendor" && sources) sourceCheck = sources.instanceId === -8
      else if (source === "Professions" && sources) sourceCheck = sources.instanceId === -4
      else if (source === "AllRep" && sources) sourceCheck = [-12, -6].includes(sources.instanceId);
      else if (!sources) sourceCheck = false;
    }

    const slot = getItemProp(item.id, "slot", gameType);
    if (
        ((slot === 'Trinket' && item.levelRange && !item.offspecItem) || 
        (slot !== 'Trinket' && item.stats.intellect && !item.stats.hit) ||
        (gameType === "Retail" && ["Finger", "Neck"].includes(slot))) && 
        (!item.name.includes("Gladiator")) && 
        (!([71393, 71398, 71578, 62458, 59514, 68711, 62472, 56465, 65008, 56466, 56354, 56327, 71576, 71395, 71581, 69198, 71390].includes(item.id)))
        && sourceCheck) { 
          const newItem = new Item(item.id, item.name, slot, 0, "", 0, gameType === "Classic" ? item.itemLevel : itemLevel, "", gameType);

      if (player.activeItems.filter((i) => i.id === item.id).length === 0) player.activeItems.push(newItem);
      //player.activeItems.push(newItem);
    }

  })

  player.activeItems.sort((a, b) => (a.level > b.level ? 1 : -1));
}


// Return an item score.
// Score is calculated by multiplying out an items stats against the players stat weights.
// Special effects, sockets and leech are then added afterwards.
export function scoreItem(item: Item, player: Player, contentType: contentTypes, gameType: gameTypes = "Retail", playerSettings: any) {
  let score = 0;
  let bonus_stats: Stats = gameType === "Retail" ? {mastery: 0, crit: 0, versatility: 0, intellect: 0, haste: 0, hps: 0, mana: 0, dps: 0, allyStats: 0} :
                                                    {mastery: 0, crit: 0, spellpower: 0, intellect: 0, haste: 0, hps: 0, mana: 0, spirit: 0};

  let item_stats = { ...item.stats };

  if (gameType === "Classic" && item.slot === "trinket") {
    // Try and reforge 
    const playerStatPriorityList = player.getActiveProfile("Raid").autoReforgeOrder;
    const trinketSecondary = Object.keys(item.stats)[0];

    if (trinketSecondary && trinketSecondary !== "intellect" && trinketSecondary !== "stamina") {
          const trinketSecondaryPos = playerStatPriorityList.indexOf(trinketSecondary);

          if (trinketSecondaryPos !== 0) {
            // Not best secondary, reforge.
            const reforgeValue = item.stats[trinketSecondary] * 0.4;
            item_stats[trinketSecondary] = Math.round(item_stats[trinketSecondary] - reforgeValue);
            item_stats[playerStatPriorityList[0]] = reforgeValue;

            console.log("Reforging " + trinketSecondary + " to " + playerStatPriorityList[0] + " for item: " + item.name);
          }

    }

  }
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
  if (item.id === 228411) {
    const combo = item.primGems;
    const additionalData = {contentType: contentType, settings: playerSettings, setStats: player.activeStats, player: player};
    bonus_stats = getCircletEffect(combo, item.level, additionalData);
  }

  // Add Retail Socket
  if (item.socket) {
    getGems(player.spec, item.socket || 1, bonus_stats, contentType, player.getActiveModel(contentType).modelName, false);
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

  // Add any bonus HPS. Classic treats HPS as a weight instead. 
  if (bonus_stats.hps && gameType === "Retail") {
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
  // This could be expanded to better simulate the number of buffs that go on healers vs DPS. Right now it assumes DPS.
  if (playerSettings && playerSettings.includeGroupBenefits && playerSettings.includeGroupBenefits.value && bonus_stats.allyStats) {
    //score += 0.45 * bonus_stats.allyStats; // TODO: Move this somewhere nice.
    score += getAllyStatsValue(contentType, bonus_stats.allyStats, player, playerSettings);
  }

  // Classic specific sockets

  if (gameType === "Classic" && item.classicSockets.sockets.length > 0) {
    //socketItem(item, player.statWeights["Raid"]);
    score += (item.classicSockets.sockets.length * player.getStatWeight('raid', 'intellect') * 160);
  } 

  return Math.round(100 * score) / 100;
}

// Return an item score.
// Score is calculated by multiplying out an items stats against the players stat weights.
// Special effects, sockets and leech are then added afterwards.
export function scoreTrinket(item: Item, player: Player, contentType: contentTypes, gameType: gameTypes = "Retail", playerSettings: any) {
  let score = 0;
  let bonus_stats: Stats = {mastery: 0, crit: 0, versatility: 0, intellect: 0, haste: 0, hps: 0, mana: 0, dps: 0, allyStats: 0};
  let item_stats = { ...item.stats };
  // Calculate Effect.
  if (item.effect) {
    const effectStats = getEffectValue(item.effect, player, player.getActiveModel(contentType), contentType, item.level, playerSettings, gameType, player.activeStats);
    bonus_stats = compileStats(bonus_stats, effectStats as Stats);
  }


  // Multiply the item's stats by our stat weights.
  let sumStats = compileStats(item_stats, bonus_stats);
  //if (gameType === "Classic") sumStats = applyClassicStatMods(player.getSpec(), sumStats);

  for (var stat in sumStats) {
    if (stat !== "bonus_stats") {
      let statSum = sumStats[stat];
      // The default weights are built around ~12500 int. Ideally we replace this with a more dynamic function like in top gear.
      // TODO: Factor out the secondary increase when S4 gear is properly applied.
      score += statSum * player.getStatWeight(contentType, stat) / 75000 * player.getHPS(contentType);
    }
  }

  // Add any bonus HPS
  if (bonus_stats.hps) {
    score += bonus_stats.hps;
  }

  // Add any bonus DPS. This is valued 1:1 with bonus HPS in dungeons only.
  if (contentType === "Dungeon" && bonus_stats.dps) {
    score += (bonus_stats.dps * CONSTANTS.dpsValue);
  }

  // Add any bonus Mana
  if (bonus_stats.mana) {
    score += (bonus_stats.mana * player.getSpecialQuery("OneManaHealing", contentType));
  }

  // Add any group benefit, if we're interested in it.
  // This could be expanded to better simulate the number of buffs that go on healers vs DPS. Right now it assumes DPS.
  if (playerSettings && playerSettings.includeGroupBenefits && playerSettings.includeGroupBenefits.value && bonus_stats.allyStats) {
    //score += 0.45 * bonus_stats.allyStats; // TODO: Move this somewhere nice.
    score += getAllyStatsValue(contentType, bonus_stats.allyStats, player, playerSettings) / player.getInt() * player.getHPS(contentType);
  }

  return Math.round(100 * score) / 100;
}

// Returns an intellect value.
export const getAllyStatsValue = (contentType: contentTypes, statValue: number, player: Player, playerSettings: PlayerSettings) => { // Maybe add PlayerSettings
  const dpsValue = statValue * CONSTANTS.allyStatWeight; //CONSTANTS.allyDPSPerPoint / player.getHPS(contentType) * player.getInt();
  const healerValue = statValue * CONSTANTS.allyStatWeight;

  if ('groupBuffValuation' in playerSettings && playerSettings.groupBuffValuation.value === "50%") return (dpsValue * 0.75 + healerValue * 0.25) * 0.5;
  else if ('groupBuffValuation' in playerSettings && playerSettings.groupBuffValuation.value === "75%")return (dpsValue * 0.75 + healerValue * 0.25) * 0.75;
  else return dpsValue * 0.75 + healerValue * 0.25;
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
