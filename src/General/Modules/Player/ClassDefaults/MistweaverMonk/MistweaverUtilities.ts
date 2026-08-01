import { getSpellThroughput, getSpellEntry } from "../Generic/ProfileUtilities";
import { BASEMANA } from "General/Engine/STAT";
import { hasTalent, getTalentPoints } from "General/Modules/Player/ClassDefaults/Generic/RampBase";

// small shared helpers. they live here rather than in the cast profile so the celestial module can use them
// without the two importing each other

export const runSpell = (state: any, slice: SpellData, flags: any = {}): number =>
    getSpellThroughput(slice, state.statPercentages, state.spec, state.settings, flags);

export const addOutput = (breakdown: Record<string, number>, label: string, output: number): void => {
    breakdown[label] = (breakdown[label] ?? 0) + output;
}

export const getSelectedKick = (castProfile: CastProfile): any =>
    getSpellEntry(castProfile, "Rushing Wind Kick") ?? getSpellEntry(castProfile, "Rising Sun Kick");

export const getSelectedPrimaryHeal = (castProfile: CastProfile): any =>
    getSpellEntry(castProfile, "Sheilun's Gift") ?? getSpellEntry(castProfile, "Vivify");

export const getGustHeal = (spellDB: Record<string, any[]>, state: any, overhealing: number, statPercentages: any = state.statPercentages): number => {
    const gust = spellDB["Gust of Mists"][0];
    const gustWithMastery = { ...gust, coeff: statPercentages.mastery };

    return getSpellThroughput(gustWithMastery, statPercentages, state.spec, state.settings, { overrideOverhealing: overhealing });
}

const GCD_BASE = 1.5;
const GCD_FLOOR = 0.75;

export const getGCD = (averageHaste: number, speedMult: number = 1): number =>
    Math.max(GCD_BASE * speedMult / averageHaste, GCD_FLOOR);

export const getCastTime = (spell: any, averageHaste: number): number => {
    const castTime = (spell.castTime / averageHaste) || 0;
    if (castTime === 0 && !spell.offGCD) return getGCD(averageHaste);

    return castTime;
}

// assuming max group size of 5 for dungeon, 20 for mythic raid.
// do we want to change this away from mythic?
export const getGroupSize = (profileKey: string): number => profileKey.includes("Dungeon") ? 5 : 20;

export const getRapidDiffusionRemDuration = (talents: any): number => {
    if (!hasTalent(talents, "Rapid Diffusion")) return 0;

    return talents["Rapid Diffusion"].values[0] * (getTalentPoints(talents, "Rapid Diffusion") / talents["Rapid Diffusion"].maxPoints);
}

// averages a proc rate across real log examples: [[fightMin, fightSec], observedProcs][].
export const getAveragePpmFromLogs = (examples: [[number, number], number][]): number => {
    const getPpmFromExample = ([fightMin, fightSec]: [number, number], procs: number): number => procs / (fightMin + fightSec / 60);
    return examples.reduce((sum, [duration, procs]) => sum + getPpmFromExample(duration, procs), 0) / examples.length;
}

export const getEntryCastTime = (entry: ProfileEntry, spellDB: Record<string, any[]>, averageHaste: number): number => {
    const slice = spellDB[entry.spell][0];
    const overridden = entry.castTimeOverride !== undefined ? { ...slice, castTime: entry.castTimeOverride } : slice;

    return getCastTime(overridden, averageHaste);
}

export const getEntryCost = (entry: ProfileEntry, spellDB: Record<string, any[]>): number =>
    (entry.manaOverride ?? spellDB[entry.spell][0].cost ?? 0) * BASEMANA / 100;

export const getTimeUsed = (castProfile: CastProfile, spellDB: Record<string, any[]>, averageHaste: number): number => {
    let timeUsed = 0;
    castProfile.forEach(spellProfile => {
        if (spellDB[spellProfile.spell]) timeUsed += getEntryCastTime(spellProfile, spellDB, averageHaste) * spellProfile.cpm!;
        else console.error("Missing Spell: " + spellProfile.spell)
    })

    return timeUsed;
}
