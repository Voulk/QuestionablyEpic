

import { getCritPercentage } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";

// A generic stat effect with a duration and a ppm.
export const getGenericStatEffect = (data: ClassicEffectData, itemLevel: number): Stats => {
    const trinketValue = data.duration * data.value[itemLevel] * data.ppm / 60
    const statType = data.stat;
    const bonus_stats: Stats = {};
    bonus_stats[statType] = trinketValue;
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
    const trinketValue = data.duration * data.value[itemLevel] / data.cooldown;
    const statType = data.stat;
    bonus_stats[statType] = trinketValue;
    return bonus_stats;

}