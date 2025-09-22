

import { getCritPercentage } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { randPropPointsClassic } from "Retail/Engine/RandPropPointsBylevelClassic";


/**
 * 
 * @param {*} data 
 * @param {*} itemLevel The item level to grab the effect value at.
 * @param {*} efficiency An optional efficiency value. We can use this for stuff like trinkets that don't always get full value.
 * @param {*} roundType Blizzard are inconsistent on whether they floor or round data. Most of the time they'll floor, but the function can support both via optional parameters.
 * @returns A flat value representing the in-game effect number at whatever item level we're given.
 */
export const processedValue = (data: ClassicEffectData, itemLevel: number, efficiency: number = 1, roundType: "floor" | "ceil" | "round" = "round") => {
  const value = data.coefficient * randPropPointsClassic[itemLevel]["slotValues"][0] * efficiency;
  if (roundType === "floor") return Math.floor(value);
  else if (roundType === "ceil") return Math.ceil(value);
  else if (roundType === "round") return Math.round(value);
  else return value;
}

// A generic stat effect with a duration and a ppm.
export const getGenericStatEffect = (data: ClassicEffectData, itemLevel: number): Stats => {
    const trinketValue = data.coefficient * randPropPointsClassic[itemLevel]["slotValues"][0];
    const trinketAverage = data.duration * trinketValue * data.ppm / 60
    const statType = data.stat;
    const bonus_stats: Stats = {};
    bonus_stats[statType] = trinketAverage;
    return bonus_stats;
}
  
// A generic HPS or DPS effect.
export const getGenericThroughputEffect = (data: ClassicEffectData, itemLevel: number, player: Player, setStats: any = {}): Stats => {
    // Most classic trinkets just use a hard coded value but there are rare exceptions that also have spellpower scaling.
    // Maybe we replace this by calling applyBuffs.
    const trinketValue = data.value[itemLevel] + (data.spScaling ? (data.spScaling[itemLevel] * (setStats.spellpower * 1.1 + setStats.intellect * 1.05 * 1.05)) : 0); // TODO: Inner Fire

    let trinketThroughput = trinketValue * data.ppm / 60 * data.efficiency * getGenericHealingIncrease(player.spec) * (1 + getCritPercentage(setStats, player.spec.replace(" Classic", "")));
    if (data.targets) trinketThroughput *= data.targets;
    
    const statType = data.stat;
    const bonus_stats: Stats = {};
    bonus_stats[statType] = trinketThroughput;
    return bonus_stats;
}
  
// Calculates an effects expected ppm given its ICD, proc chance, and our GCD or cast time.
export function getEffectPPM(procChance: number, internalCooldown: number, gcd: number): number {

    //return 60 / (internalCooldown + 1/procChance*gcd)
    return 60 / (internalCooldown + 2.5)
}

// Calculates an effects expected ppm given its ICD, proc chance, and our GCD or cast time.
export function getEffectPPMWithHots(procChance: number, internalCooldown: number, gcd: number): number {

    //return 60 / (internalCooldown + 1/procChance*gcd)
    return 60 / (internalCooldown + 1.25)
}

export const getGenericHealingIncrease = (spec: string): number => {
    if (spec.includes("Restoration Druid")) {
      return 1.04 * (0.15 * 31 / 180 + 1) // Spec aura, Master Shapeshifter, Tree of Life
    }
    else if (spec.includes("Holy Paladin")) {
      return 1.06 * (0.2 * 20 / 120 + 1) // Aura, talent, wings
    }
    else if (spec.includes("Holy Priest")) {
      return 1; // Spec Aura
    }
  
    return 1;
  }

  export const getDPSWeighting = (spec: string): number => {
    const specMod = {"Discipline Priest Classic": 1, "Restoration Druid Classic": 0, "Holy Paladin Classic": 0, "Restoration Shaman Classic": 0, "Holy Priest Classic": 0};
    
    return specMod[spec];
  }
  
export const getGenericOnUseTrinket = (data: ClassicEffectData, itemLevel: number): Stats => {
    const bonus_stats: Stats = {};
    const trinketValue = data.coefficient * randPropPointsClassic[itemLevel]["slotValues"][0];
    const trinketAverage = data.duration * trinketValue / data.cooldown;
    const statType = data.stat;
    bonus_stats[statType] = trinketAverage;
    return bonus_stats;

}