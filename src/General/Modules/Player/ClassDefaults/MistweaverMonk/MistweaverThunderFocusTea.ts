import { hasTalent, getTalentPoints } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { STAT } from "General/Engine/STAT";
import { getSpellCooldown } from "../Generic/ProfileUtilities";
import { getSelectedKick, MonkProfileKey } from "./MistweaverUtilities";

export type TftEmpowerTarget = "Renewing Mist" | "Enveloping Mist" | "Kick";
export const TFT_ENVELOPING_MIST = "Enveloping Mist (Thunder Focus Tea)";
const TFT_REM_DURATION_SEC = 10;
const TFT_KICK_CDR_SEC = 9;

// we should try to reset rsk's cd with tft, but sometimes doesn't work out that way
const MORNING_BREEZE_CD_REMAINING = 0.66;

const DEFAULT_EMPOWERS: Record<MonkProfileKey, TftEmpowerTarget[]> = {
    "Yu'lon": ["Renewing Mist", "Renewing Mist"],
    "Chi-Ji": ["Kick", "Kick"],
    "Dungeon Default": ["Renewing Mist", "Renewing Mist"],
};

const SECRET_INFUSION_STATS: Record<TftEmpowerTarget, string> = {
    "Enveloping Mist": STAT.CRITICAL_STRIKE,
    "Renewing Mist": STAT.HASTE,
    "Kick": STAT.VERSATILITY,
};

// override for test scoring other empowers
export const getTftEmpowers = (talents: any, profileKey: MonkProfileKey, override?: TftEmpowerTarget[]): TftEmpowerTarget[] => {
    const charges = 1 + (hasTalent(talents, "Focused Thunder") ? talents["Focused Thunder"].values[0] : 0);

    return (override ?? DEFAULT_EMPOWERS[profileKey]).slice(0, charges);
}

const countEmpowers = (empowers: TftEmpowerTarget[], target: TftEmpowerTarget): number =>
    empowers.filter(empower => empower === target).length;

export const applySecretInfusion = (talents: any, state: any, empowers: TftEmpowerTarget[]): void => {
    if (!hasTalent(talents, "Secret Infusion") || empowers.length === 0) return;

    const statPerPoint = talents["Secret Infusion"].values[0] / 100;
    const statBonus = statPerPoint * getTalentPoints(talents, "Secret Infusion");
    const stat = SECRET_INFUSION_STATS[empowers[0]];

    if (stat === STAT.HASTE) state.statPercentages.haste *= 1 + statBonus;
    else state.statPercentages[stat] += statBonus;
}

export const getTftRenewingMistSec = (empowers: TftEmpowerTarget[], tftCpm: number, remStandard: number): number =>
    countEmpowers(empowers, "Renewing Mist") * tftCpm * TFT_REM_DURATION_SEC * (1 + remStandard);

// pulls the empower's instant heal off env so only empowered casts are credited with it
export const splitTftEnvelopingMist = (spellDB: Record<string, any[]>): void => {
    const envelopingMist = spellDB["Enveloping Mist"];
    const instantSlice = envelopingMist[1];
    if (!instantSlice) return;

    spellDB["Enveloping Mist"] = [envelopingMist[0]];
    spellDB[TFT_ENVELOPING_MIST] = [{
        ...instantSlice,
        offGCD: true, // rides along with an env cast
        displayInfo: { ...envelopingMist[0].displayInfo, spellName: TFT_ENVELOPING_MIST },
    }];
}

const applyKickCooldownReduction = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>, state: any,
    kickEmpowerCpm: number, tftCpm: number, reportingData: Record<string, any>): void => {
    const kickEntry = getSelectedKick(castProfile);
    if (!kickEntry) return;

    const kickCooldown = getSpellCooldown(spellDB, kickEntry.spell, state.statPercentages.haste);

    // 9 sec off a 12s hasted cd, ends up being fully refunded (cus haste and hotjs) and can cast rsk immediately
    const empowerCdrSec = kickEmpowerCpm * Math.min(TFT_KICK_CDR_SEC, kickCooldown);
    const resetCdrSec = hasTalent(talents, "Morning Breeze") ? tftCpm * kickCooldown * MORNING_BREEZE_CD_REMAINING : 0;

    const bonusCpm = (empowerCdrSec + resetCdrSec) / kickCooldown;
    kickEntry.cpm += bonusCpm;

    reportingData.tftKickCdr = { kickCooldown, empowerCdrSec, resetCdrSec, bonusCpm, kickCpm: kickEntry.cpm };
}

export const applyTftEmpowers = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>, state: any,
    empowers: TftEmpowerTarget[], tftCpm: number, reportingData: Record<string, any>): void => {
    const kickEmpowerCpm = countEmpowers(empowers, "Kick") * tftCpm;
    const envEmpowerCpm = countEmpowers(empowers, "Enveloping Mist") * tftCpm;

    applyKickCooldownReduction(talents, castProfile, spellDB, state, kickEmpowerCpm, tftCpm, reportingData);

    if (envEmpowerCpm > 0) castProfile.push({ spell: TFT_ENVELOPING_MIST, cpm: envEmpowerCpm });

    if (kickEmpowerCpm > 0 && hasTalent(talents, "Emperor's Elixir")) {
        castProfile.push({ spell: "Jadefire Stomp", cpm: kickEmpowerCpm });
    }

    reportingData.tftEmpowers = { empowers, kickEmpowerCpm, envEmpowerCpm };
}
