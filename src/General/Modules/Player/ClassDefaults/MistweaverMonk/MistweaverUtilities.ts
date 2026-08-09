import { getSpellThroughput, getSpellEntry } from "../Generic/ProfileUtilities";
import { BASEMANA } from "General/Engine/STAT";
import { hasTalent, getTalentPoints } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { monkTalentStrings } from "./MonkDefaults";

export type MonkProfileKey = keyof typeof monkTalentStrings;

export const runSpell = (state: any, slice: SpellData, flags: any = {}): number =>
    getSpellThroughput(slice, state.statPercentages, state.spec, state.settings, flags);

export const addOutput = (breakdown: Record<string, number>, label: string, output: number): void => {
    breakdown[label] = (breakdown[label] ?? 0) + output;
}

// swaps talents on a decoded talent import so tests can compare builds w minor diffs
export const applyTalentOverrides = (talentImport: any[], overrides?: Record<string, number>): any[] => {
    if (!overrides) return talentImport;

    const kept = talentImport.filter(entry => !(entry.talentName in overrides));
    const swapped = Object.entries(overrides)
        .filter(([, talentRanks]) => talentRanks > 0)
        .map(([talentName, talentRanks]) => ({ talentName, talentRanks }));

    return [...kept, ...swapped];
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

export const ASSUMED_MAX_HEALTH = 750000;
const ABSORB_MULTIPLIERS: Record<string, number> = {
    "Life Cocoon": 48,
    "Chi Cocoon": 24,
};
const GOTC_CHI_COCOON_MULT = 0.5;

export const applyHealthAbsorbs = (spellDB: Record<string, any[]>, stats: Stats, talents: any, intellect: number): void => {
    const getCoeff = (healthPerc: number): number => ASSUMED_MAX_HEALTH * (healthPerc / 100) / intellect;

    Object.entries(ABSORB_MULTIPLIERS).forEach(([spellName, healthPerc]) => {
        const gotcMult = (spellName === "Chi Cocoon" && hasTalent(talents, "Gift of the Celestials")) ? GOTC_CHI_COCOON_MULT : 1;
        const calmingCoalescenceMult = (spellName === "Life Cocoon" && hasTalent(talents, "Calming Coalescence")) ? 1 + talents["Calming Coalescence"].values[0] / 100 : 1;
        spellDB[spellName][0].coeff = getCoeff(healthPerc) * gotcMult * calmingCoalescenceMult;
    });

    const sf3Entry = talents["Spiritfont3"];
    if (sf3Entry) {
        let targets = 1;
        const sf1Entry = talents["Spiritfont1"];
        if (sf1Entry) targets = sf1Entry.values[1];

        const sfMult = sf3Entry.values[0] / 100;
        spellDB["Chi Cocoon (Spiritfont)"] = [{
            ...spellDB["Chi Cocoon"][0],
            coeff: getCoeff(ABSORB_MULTIPLIERS["Chi Cocoon"]) * sfMult,
            targets: targets,
        }];
    }

}

const GCD_BASE = 1.5;
const GCD_FLOOR = 0.75;

export const getGCD = (averageHaste: number, speedMult: number = 1): number =>
    Math.max(GCD_BASE * speedMult / averageHaste, GCD_FLOOR);

export const getCastTime = (spell: any, averageHaste: number): number => {
    const castTime = (spell.castTime / averageHaste) || 0;
    if (spell.offGCD) return castTime;

    return Math.max(castTime, getGCD(averageHaste));
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
    if (entry.castTimeOverride !== undefined) return entry.castTimeOverride / averageHaste;

    return getCastTime(spellDB[entry.spell][0], averageHaste);
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
