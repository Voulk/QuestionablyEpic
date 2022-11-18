import { combat_ratings_mult_by_ilvl } from "../CombatMultByLevel";
import { randPropPoints } from "../RandPropPointsBylevel";
import { STATDIMINISHINGRETURNS } from "General/Engine/STAT";
// This file contains utility formulas that might be useful for calculating Effect values.

export function getDiminishedValue(statID, procValue, baseStat) {
  const DRBreakpoints = STATDIMINISHINGRETURNS[statID.toUpperCase()];
  
  const totalStat = baseStat + procValue;
  let currentStat = baseStat + procValue;
  for (var j = 0; j < DRBreakpoints.length; j++) {
    currentStat -= Math.max((totalStat - DRBreakpoints[j]) * 0.1, 0);
  }

  return Math.round(procValue - (totalStat - currentStat));
}

// A lot of trinkets in the game are very generic PPM stat trinkets. These all use effectively the same formula.
export function runGenericPPMTrinket(effect, itemLevel) {
    const value = processedValue(effect, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);
    return value;
}

// Other trinkets are generic on-use stat trinkets. These usually don't need anything special either and can be genericized. 
// TODO.
export function runGenericOnUseTrinket(effect, itemLevel, castModel) {

  const value = processedValue(effect, itemLevel) * effect.duration / effect.cooldown 
                  //* castModel.getSpecialQuery("twoMinutes", "cooldownMult");
  return value;
}

export function convertPPMToUptime(PPM, duration) {
  return 1.13 * (1 - Math.E ** -((PPM * duration) / 60));
}

export function getScalarValue(table, itemLevel) {
  if (table === -9) { // Was -8 in SL QE/L.
      return randPropPoints[itemLevel]["p8"];
  } else if (table === -1) {
      return randPropPoints[itemLevel]["slotValues"][0];
  } else if (table === -7) {
      return randPropPoints[itemLevel]["slotValues"][0] * combat_ratings_mult_by_ilvl[itemLevel];
  } else if (table === -6) {
      return 166776.2798; // This is a level-scaled value and 23316.22963 is the value for level 60.
  } 
  else if (table === -8) {
    return randPropPoints[itemLevel]["p1"]; // This is the damage_replace_stat column in SimC.
  } 

  else {
    // return error
    return -1;
  }
}

/**
 * @deprecated
 * Use processedValue for Dragonflight content. 
 */
export function getProcessedValue(coefficient, table, itemLevel, efficiency = 1, floor=true) {
  if (floor) return Math.floor(coefficient * getScalarValue(table, itemLevel) * efficiency);
  else return coefficient * getScalarValue(table, itemLevel) * efficiency;
}

/**
 * 
 * @param {*} data 
 * @param {*} itemLevel The item level to grab the effect value at.
 * @param {*} efficiency An optional efficiency value. We can use this for stuff like trinkets that don't always get full value.
 * @param {*} roundType Blizzard are inconsistent on whether they floor or round data. Most of the time they'll floor, but the function can support both via optional parameters.
 * @returns A flat value representing the in-game effect number at whatever item level we're given.
 */
export function processedValue(data, itemLevel, efficiency = 1, roundType = "floor") {
  const value = data.coefficient * getScalarValue(data.table, itemLevel) * efficiency;
  if (roundType === "floor") return Math.floor(value);
  else if (roundType === "round") return Math.round(value);
  else return value;

}

export function getBestWeaponEnchant(player, contentType) {
  let bonus_stats = {};

  // Celestial Guidance ~140 HPS.
  let expected_uptime = convertPPMToUptime(3, 10);

  bonus_stats.Intellect = player.activeStats.intellect * 0.05 * expected_uptime;

  // Eternal Grace ~90 HPS. Can implement later but this should be a comfortably weaker choice.

  return bonus_stats.Intellect;
}
