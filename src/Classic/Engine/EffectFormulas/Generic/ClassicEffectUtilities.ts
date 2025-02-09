

import { getCritPercentage } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase";

// A generic stat effect with a duration and a ppm.
export const getGenericStatEffect = (data: ClassicEffectData, itemLevel: number): Stats => {
    const trinketValue = data.duration * data.value[itemLevel] * data.ppm / 60
    const statType = data.stat;
    const bonus_stats: Stats = {};
    bonus_stats[statType] = trinketValue;
    return bonus_stats;
}
  
// A generic HPS or DPS effect.
export const getGenericThroughputEffect = (data: ClassicEffectData, itemLevel: number, player: player): Stats => {
    let trinketValue = data.value[itemLevel] * data.ppm / 60 * data.efficiency * getGenericHealingIncrease(player.spec) * (1 + getCritPercentage(player.activeStats, player.spec.replace(" Classic", "")));
    if (data.targets) trinketValue *= data.targets;
    
    const statType = data.stat;
    const bonus_stats: Stats = {};
    bonus_stats[statType] = trinketValue;
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
      return 1.25 * 1.04 * (0.15 * 31 / 180 + 1)
    }
    else if (spec.includes("Holy Paladin")) {
      return 1.1 * 1.06 * (0.2 * 20 / 120 + 1)
    }
  
    return 1;
  }
  
export const getGenericOnUseTrinket = (data: ClassicEffectData, itemLevel: number): Stats => {
    const bonus_stats: Stats = {};
    const trinketValue = data.duration * data.value[itemLevel] / data.cooldown;
    const statType = data.stat;
    bonus_stats[statType] = trinketValue;
    return bonus_stats;

}