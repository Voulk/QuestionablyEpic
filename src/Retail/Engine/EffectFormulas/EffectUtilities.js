import { combat_ratings_mult_by_ilvl } from "../CombatMultByLevel";
import { randPropPoints } from "../RandPropPointsBylevel";
import { STATDIMINISHINGRETURNS } from "General/Engine/STAT";
import { allRampsHealing } from "General/Modules/Player/DiscPriest/DiscRampUtilities";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
// This file contains utility formulas that might be useful for calculating Effect values.

export function getDiminishedValue(statID, procValue, baseStat) {
  if (statID === "intellect" || statID === undefined) return procValue;
  const DRBreakpoints = STATDIMINISHINGRETURNS[statID.toUpperCase()];
  const totalStat = baseStat + procValue;
  let currentStat = baseStat + procValue;

  for (var j = 0; j < DRBreakpoints.length; j++) {
    currentStat -= Math.max((totalStat - DRBreakpoints[j]) * 0.1, 0);
  }

  return Math.round(procValue - (totalStat - currentStat));
}

// A lot of trinkets in the game are very generic PPM stat trinkets. These all use effectively the same formula.
export function runGenericPPMTrinket(effect, itemLevel, setStats = {}) {
    const rawValue = processedValue(effect, itemLevel);
    const diminishedValue = getDiminishedValue(effect.stat, rawValue, setStats[effect.stat] || 0);
    const uptime = convertPPMToUptime(effect.ppm, effect.duration);
    return diminishedValue * uptime;
}

// Most stat trinkets should not be hasted so this function is mostly a catch for if they mess it up.
export function runGenericPPMTrinketHasted(effect, itemLevel, hastePerc, setStats = {}) {
  const rawValue = processedValue(effect, itemLevel);
  const diminishedValue = getDiminishedValue(effect.stat, rawValue, setStats[effect.stat] || 0);
  const uptime = convertPPMToUptime(effect.ppm * hastePerc, effect.duration);
  return diminishedValue * uptime;
}

// Other trinkets are generic on-use stat trinkets. These usually don't need anything special either and can be genericized. 
// TODO.
export function runGenericOnUseTrinket(effect, itemLevel, castModel) {

  const value = processedValue(effect, itemLevel) * effect.duration / effect.cooldown 
                  * (castModel.getSpecialQuery("c" + effect.cooldown, "cooldownMult") || 1);
  return value;
}

// This function helps out with generic flat damage or healing procs. It makes implementing them much faster and more difficult
// to make mistakes on. It'll check for fields we expect like ppms, targets, secondary scaling and more. 
// You can expand this function with more fields if they're necessary.
export function runGenericFlatProc(effect, itemLevel, player, contentType = "Raid") {

  let efficiency = 1;
  if ('efficiency' in effect) {
    if (effect.efficiency[contentType]) efficiency = effect.efficiency[contentType];
    else efficiency = effect.efficiency;
  }

  const value = processedValue(effect, itemLevel, effect.efficiency || 1);
  let mult = 1;

  if ('targets' in effect) {
    if (effect.targets[contentType]) mult *= effect.targets[contentType];
    else mult *= effect.targets;
  }
  if ('ticks' in effect) mult *= effect.ticks;
  if ('secondaries' in effect) mult *= player.getStatMults(effect.secondaries);
  if ('ppm' in effect) mult *= (effect.ppm * 1.13);

  if ('cooldown' in effect) return value * mult / effect.cooldown;
  else return value * mult / 60;

}

export function runDiscOnUseTrinket(trinketName, trinketValue, playerStats, castModel, player) {
    const trinket = {}
    trinket[trinketName] = trinketValue;
    const rampHealing = allRampsHealing([], playerStats, {"playstyle": castModel.playstyle || "", "reporting": false, "DefaultLoadout": true}, {}, trinket, false) / 180;

    return (rampHealing - player.getRampID('baseline', "Raid")) * (1 - 0.05);

  }

export function convertPPMToUptime(PPM, duration) {
  return 1.13 * (1 - Math.E ** -((PPM * duration) / 60));
}

export function convertPPMToUptimeWithICD(PPM, duration) {
  
}

export function getHighestStat(stats) {
  let max = "";
  let maxValue = -1;

  for (var stat in stats) {
    if (stats[stat] > maxValue && ["crit", "haste", "mastery", "versatility"].includes(stat)) {
      max = stat;
      maxValue = stats[stat];
    }
  }

  if (maxValue > 0) return max;
  else {
    reportError(this, "EffectFormulas", "No highest stat found: " + JSON.stringify(stats));
    return "haste"; // A default value is returned to stop the app crashing, however this is reported as an error if it were ever to occur.
  }
}

export function getSetting(playerSettings, setting) {

  if (setting in playerSettings) return playerSettings[setting].value;
  else {
    reportError("", "Setting", "Missing Setting", setting)
    return 0;
  }

}

export function getLowestStat(stats) {
  let min = "";
  let minValue = 99999;

  for (var stat in stats) {
    if (stats[stat] < minValue && ["crit", "haste", "mastery", "versatility"].includes(stat)) {
      min = stat;
      minValue = stats[stat];
    }
  }

  if (minValue < 99999) return min;
  else {
    reportError(this, "TrinketEffectFormulas", "No lowest stat found: " + JSON.stringify(stats));
    return "haste"; // A default value is returned to stop the app crashing, however this is reported as an error if it were ever to occur.
  }
}


// We need to do four of these so we'll just outsource the work to this function instead of repeating ourselves.
export function buildIdolTrinket(data, itemLevel, stat, settings) {
  let bonus_stats = {};
  const gemsEquipped = getSetting(settings, "idolGems"); // TODO: Make this dynamically update based on the number of gems equipped.

  const smallPerGem = processedValue(data[0], itemLevel);
  const bigProc = processedValue(data[1], itemLevel);
  //const uptime = data[0].ppm / Math.ceil(18 / gemsEquipped) * data[1].duration / 60;
  const uptime = 15 / (18 / (data[0].ppm * gemsEquipped) * 60 + 15);

  // Time to first proc
  // Average remaining fight duration.
  bonus_stats.haste =  + uptime * bigProc / 4; 
  bonus_stats.crit = uptime * bigProc / 4;
  bonus_stats.mastery = uptime * bigProc / 4;
  bonus_stats.versatility = uptime * bigProc / 4;

  bonus_stats[stat] += (smallPerGem * 8 * (1 - uptime)); // 8.5 is slightly more accurate but it tends to be slightly lossy. 

  return bonus_stats;

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
