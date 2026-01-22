import { combat_ratings_mult_by_ilvl, combat_ratings_mult_by_ilvl_jewl } from "../CombatMultByLevel";
import { randPropPoints } from "../RandPropPointsBylevel";
import { STATDIMINISHINGRETURNS } from "General/Engine/STAT";
import { allRampsHealing } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscRampUtilities";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { getMastery } from "General/Modules/Player/ClassDefaults/Generic/RampBase"
// This file contains utility formulas that might be useful for calculating Effect values.


// Sometimes a trinket stacks over time and each of these stacks should calculate DR individually.
// This function will return the average stat value. 
export function getStagedDiminishedValue(statID, procValue, setStats, steps) {
  let totalStats = 0;
  for (let i = 1; i <= steps; i++) {
    
    const diminishedStats = getDiminishedValue(statID, procValue * i, setStats[statID] || 0);
    totalStats += diminishedStats;
  }

  return totalStats / steps;

}

export function getDiminishedValue(statID, procValue, baseStat) {
  if (statID === "intellect" || statID === undefined || statID === "hps" || statID === "dps") return procValue;
  const DRBreakpoints = STATDIMINISHINGRETURNS[statID.toUpperCase()];
  const totalStat = baseStat + procValue;
  let currentStat = baseStat + procValue;
  let procSize = procValue

  for (var j = 0; j < DRBreakpoints.length; j++) {
    if (totalStat > DRBreakpoints[j])  {
      // Calculate proportion that's above DR.
      procSize -= (Math.min(procSize, totalStat - DRBreakpoints[j]) * 0.1);
    }
    
  }

  return Math.round(procSize);
}

// Some effects only proc off DPS spells, we can handle the multiplier here.
export function getSpecDPSMult(playerSpec, settings, spellsOnly = false) {

}

// A lot of trinkets in the game are very generic PPM stat trinkets. These all use effectively the same formula.
export function addSpecMastery(playerSpec, setStats = {}) {
  let mult = 1;
  if (!setStats.mastery) return mult;
  if (playerSpec === "Holy Priest") {
    const mastery = getMastery(setStats, {masteryMod: 0.95625 })
    mult *= (1 + mastery * 0.8);
  };
  // Other specs don't get mastery scaling with anything :(
  return mult;
}

// A lot of trinkets in the game are very generic PPM stat trinkets. These all use effectively the same formula.
export function runGenericPPMTrinket(effect, itemLevel, setStats = {}) {
    const rawValue = processedValue(effect, itemLevel);
    const diminishedValue = effect.stat === "allyStats" ? rawValue : getDiminishedValue(effect.stat, rawValue, setStats[effect.stat] || 0);
    const uptime = convertPPMToUptime(effect.ppm, effect.duration);
    return diminishedValue * uptime;
}

// Some trinkets don't proc munch and instead can overlap their procs.
// Note that this implementation doesn't handle how multiple stacks might be afflicted by heavier diminishing returns.
export function runGenericPPMOverlapTrinket(effect, itemLevel, setStats = {}) {
  const rawValue = processedValue(effect, itemLevel);
  const diminishedValue = effect.stat === "allyStats" ? rawValue : getDiminishedValue(effect.stat, rawValue, setStats[effect.stat] || 0);
  const uptime = effect.ppm * effect.duration / 60;

  return diminishedValue * uptime;

}

// This is specifically for effects that can roll any secondary.
export function runGenericRandomPPMTrinket(effect, itemLevel, setStats = {}) {
  const bonus_stats = {};
  const rawValue = processedValue(effect, itemLevel);
  const uptime = convertPPMToUptime(effect.ppm, effect.duration);

  ["versatility", "crit", "mastery", "haste"].forEach((stat) => {
    bonus_stats[stat] = getDiminishedValue(stat, rawValue, setStats[stat] || 0) * uptime * 0.25;
  });

  return bonus_stats;
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
export function runGenericOnUseTrinket(effect, itemLevel, castModel, setStats = {}) {
  const trinketUseValue = processedValue(effect, itemLevel);
  const diminishedUseValue = getDiminishedValue(effect.stat, trinketUseValue, setStats[effect.stat] || 0);
  const value = diminishedUseValue * effect.duration / effect.cooldown 
                  * (castModel ? (castModel.getSpecialQuery("c" + effect.cooldown, "cooldownMult") || 1) : 1);

  return value;
}

export function forceGenericOnUseTrinket(effect, itemLevel, castModel, forcedCD, setStats = {}) {
  const trinketUseValue = processedValue(effect, itemLevel);
  const diminishedUseValue = getDiminishedValue(effect.stat, trinketUseValue, setStats[effect.stat] || 0);
  const value = diminishedUseValue * effect.duration / forcedCD
                * (castModel ? (castModel.getSpecialQuery("c" + forcedCD, "cooldownMult") || 1) : 1);
  return value;
}

// This function helps out with generic flat damage or healing procs. It makes implementing them much faster and more difficult
// to make mistakes on. It'll check for fields we expect like ppms, targets, secondary scaling and more. 
// You can expand this function with more fields if they're necessary.
export function runGenericFlatProc(effect, itemLevel, player, contentType = "Raid", setStats = {}) {

  let efficiency = 1;
  if ('efficiency' in effect) {
    if (effect.efficiency[contentType]) efficiency = effect.efficiency[contentType];
    else efficiency = effect.efficiency;
  }
  const value = processedValue(effect, itemLevel, efficiency || 1);
  let mult = 1;

  if ('targets' in effect) {
    if (effect.targets[contentType]) mult *= effect.targets[contentType];
    else mult *= effect.targets;
  }
  if ('ticks' in effect) mult *= effect.ticks;
  if ('secondaries' in effect) mult *= player.getStatMults(effect.secondaries);
  if ('ppm' in effect) mult *= (effect.ppm * 1.13);
  if ('holyMasteryFlag' in effect) mult *= addSpecMastery(player.spec, setStats);

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
export function buildIdolTrinket(data, itemLevel, stat, settings, setStats) {
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
  let sumSmallGems = 0;
  // Calculate DR on the stacking proc at every stack level.
  for (let i = 1; i < 18; i++) {
    const effectiveValue = getDiminishedValue(stat, smallPerGem * i, setStats[stat]);
    sumSmallGems += effectiveValue;
  }
  
  //bonus_stats[stat] += (smallPerGem * 7.8 * (1 - uptime)); // 8.5 is slightly more accurate but it tends to be slightly lossy. 
  bonus_stats[stat] += (sumSmallGems / 18  * (1 - uptime) * 0.92); // The proc is slightly lossy.
  
  return bonus_stats; // 1345

} 

export function getScalarValue(table, itemLevel) {
  if (table === -9) { 
      return randPropPoints[itemLevel]["p8"];
  } 
  else if (table === -1) {
      return randPropPoints[itemLevel]["slotValues"][0];
  } 
  else if (table === -7) {
      return randPropPoints[itemLevel]["slotValues"][0] * combat_ratings_mult_by_ilvl[itemLevel];
  } 
  else if (table === -571) { // -7 table but locked at level 80 and a 571 item.
    return randPropPoints[80]["slotValues"][0] * combat_ratings_mult_by_ilvl[80];
} 
  else if (table === -72) { // Jewelry
    return randPropPoints[itemLevel]["slotValues"][0] * combat_ratings_mult_by_ilvl_jewl[itemLevel];
  }
  else if (table === -6) {
      return 166776.2798; // This is a level-scaled value and 23316.22963 is the value for level 60.
  } 
  else if (table === -8) {
    return randPropPoints[itemLevel]["p1"]; // This is the damage_replace_stat column in SimC.
  } 
  else if (table === -10) { // Used for mana effects. 
    return randPropPoints[itemLevel]["slotValues"][0]; // 
  } 
  else if (table === -2) { // This is used rarely for mana effects like Master Shapeshifter. It is a level scaled value.
    return 2625000; // Lv80.
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
  else if (roundType === "ceil") return Math.ceil(value);
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
