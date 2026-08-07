import { deepCopyFunction, hasTalent, getTalentPoints } from "General/Modules/Player/ClassDefaults/Generic/RampBase"
import { applyRaidBuffs, applyTalentsFromString, compileProfileReportingData, completeCastProfile, convertStatPercentages, getTrinketData, getSpellEntry, getCPM, buildCPM } from "../Generic/ProfileUtilities";
import { monkTalents } from "./MistweaverMonkTalents";
import { getManaTeaStackValues, getNaturalStacks, getRefreshmentStacks, getLifecyclesStacks } from "./MistweaverManaTea";
import { runSpell, addOutput, getSelectedKick, getSelectedPrimaryHeal, getGustHeal, getGCD, getGroupSize, getRapidDiffusionRemDuration, applyHealthAbsorbs, getAveragePpmFromLogs, getEntryCastTime, getEntryCost, getTimeUsed, ASSUMED_MAX_HEALTH } from "./MistweaverUtilities";
import { applyYulonWindow, applyChijiWindow, getCelestialSequence } from "./MistweaverCelestials";
import { MONK_HERO_TREES, monkTalentStrings } from "./MonkDefaults";

import specSpellDB from "./MistweaverMonkSpellDB.json";
import { runSpellScript } from "../Generic/SpellScripts";
import { getSelectedTalentsFromString } from "../Generic/TalentStrings/TalentDecoder";
import { buffSpellPerc } from "../Generic/TalentBase";
import SPECS from "General/Engine/SPECS";
import { STATCONVERSION, BASEMANA } from "General/Engine/STAT";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

const EFFICIENCY = 0.9;

// 4%/5 sec, 12 ticks per min
const MANA_REGEN_PER_MINUTE = 0.04 * 12;

const TOTM_MAX_STACKS = 4;
const TOTM_RESET_CHANCE = 0.2;

const applyDowntimeFill = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>, state: any,
    reportingData: Record<string, any>, localSettings: any): void => {
    const haste = state.statPercentages.haste;
    const fightMinutes = state.fightLength / 60;
    const baseMana = BASEMANA * MANA_REGEN_PER_MINUTE + BASEMANA / fightMinutes;
    const { manaPerStack, secPerStack } = getManaTeaStackValues(talents, haste);

    const baselineCost = castProfile.reduce((acc, spell) => acc + getEntryCost(spell, spellDB) * spell.cpm!, 0);
    const castableTime = 60 * (1 - localSettings.downtime) - getTimeUsed(castProfile, spellDB, haste);

    const primaryHeal = getSelectedPrimaryHeal(castProfile);
    const fillerCastTime = primaryHeal ? getEntryCastTime(primaryHeal, spellDB, haste) : 0;
    const fillerCost = primaryHeal ? getEntryCost(primaryHeal, spellDB) : 0;

    const lifeCocoonCPM = getCPM(castProfile, "Life Cocoon");
    const kickCPM = getCPM(castProfile, getSelectedKick(castProfile).spell) + getCPM(castProfile, "Enveloping Mist");

    const getFillerCPM = (stacksDrunk: number): number => primaryHeal ? (castableTime - stacksDrunk * secPerStack) / fillerCastTime : 0;

    // how many stacks are needed to fund our costs
    const getStacksNeeded = (fillerCPM: number): number => (baselineCost + fillerCPM * fillerCost - baseMana) / manaPerStack;

    // the modded sources, plus natty generated to supply the demand
    const getFlatStacks = (fillerCPM: number): number =>
        getRefreshmentStacks(talents, lifeCocoonCPM) + getLifecyclesStacks(talents, fillerCPM, kickCPM, state.statPercentages.crit);

    const getStacksBuilt = (stacksDrunk: number, fillerCPM: number): number =>
        getFlatStacks(fillerCPM) + getNaturalStacks(baseMana + stacksDrunk * manaPerStack, state.statPercentages.crit);

    // this should find the intersection of supply and demand, but they're all
    // kinda functions of each other so iterating to solve
    const RELAXATION = 0.5; // half steps, to oscillate around instead of overshoot 
    let stacks = 0;
    for (let _ = 0; _ < 30; _++) {
        const fillerCPM = getFillerCPM(stacks);
        const target = Math.min(Math.max(getStacksNeeded(fillerCPM), 0), getStacksBuilt(stacks, fillerCPM));

        stacks += (target - stacks) * RELAXATION;
    }

    const settledFillerCPM = getFillerCPM(stacks);
    const flatStacks = getFlatStacks(settledFillerCPM);
    const stacksGenerated = getStacksBuilt(stacks, settledFillerCPM);

    // time to spend whatever's leftover!!
    const channelTimePerMin = stacks * secPerStack;
    const timeLeft = castableTime - channelTimePerMin;
    const manaLeft = baseMana + stacks * manaPerStack - baselineCost;
    const fillerCPM = primaryHeal ? Math.max(Math.min(timeLeft / fillerCastTime, manaLeft / fillerCost), 0) : 0;
    if (primaryHeal) primaryHeal.cpm = fillerCPM;

    // stacksGenerated > stacksDrunk = mana to spare, crit not good :(
    reportingData.manaTea = {
        stacksDrunk: stacks,
        stacksGenerated,
        isCritGood: stacksGenerated < stacks, // does mana tea make crit better?
        flatStacks,
        channelTimePerMin,
        secPerStack,
        totalMana: baseMana + stacks * manaPerStack 
    };
    reportingData.fillerBudget = {
        baseMana,
        baselineCost,
        castableTime,
        primaryHealCpm: fillerCPM,
        manaLeftOver: manaLeft - fillerCPM * fillerCost
    };

    // gating this for rsk only for now since yu'lon attempts to fill with vivify instead of tp/bok/rsk
    const kickEntry = getSelectedKick(castProfile);
    if (kickEntry.spell !== "Rising Sun Kick") return;

    const blackoutKickCPM = getCPM(castProfile, "Blackout Kick");
    if (blackoutKickCPM === 0) return;

    // reset chance is 1 - (reset %)^boks since each bok is individual chance
    const averageTeachingsStacks = getAverageTeachingsStacks(talents, castProfile);
    const hitsPerBoK = 1 + averageTeachingsStacks;
    const resetChancePerBoK = 1 - (1 - TOTM_RESET_CHANCE) ** hitsPerBoK;
    const resetsPerMinute = blackoutKickCPM * resetChancePerBoK;

    const gcd = getGCD(haste);
    const idleGlobals = Math.max(timeLeft - fillerCPM * fillerCastTime, 0) / gcd;
    const cooldownLimitedCpm = kickEntry.cpm;

    kickEntry.cpm = Math.min(cooldownLimitedCpm + resetsPerMinute, cooldownLimitedCpm + idleGlobals);

    reportingData.downtimeFill = {
        averageTeachingsStacks,
        resetChancePerBoK,
        resetsPerMinute,
        idleGlobals,
        cooldownLimitedCpm,
        rskCpm: kickEntry.cpm
    };
}

const applyEmperorsElixir = (talents: any, spellDB: Record<string, any[]>, castProfile: CastProfile): void => {
    // can mostly ignore the enveloping mist empower here, it's useless
    if (hasTalent(talents, "Emperor's Elixir")) {
        const effectiveness = talents["Emperor's Elixir"].values[1] / 100;
        spellDB["Jadefire Stomp"][0].damageToHeal = spellDB[getSelectedKick(castProfile).spell][0].damageToHeal * effectiveness;

        // TODO: jfs casts from thunder focus tea empowering RSK/RWK
        // needs tft's own cpm + charges (like from focused thunder) in order to get a true depiction of how many are used with rsk/rwk
    }
}

// pool has an icd, so a lot of it is eaten on rwk by constant rem -> rwk or env -> rwk casts
const POOL_KICK_EFFECTIVENESS = 0.5;
const POOL_REM_EFFECTIVENESS = 0.90;

const applyPoolOfMists = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>): void => {
    if (!hasTalent(talents, "Pool of Mists")) return;

    const remCdReducedSec = talents["Pool of Mists"].values[3] / 1000;
    const kickCdReducedSec = talents["Pool of Mists"].values[2] / 1000;

    const remEntry = getSpellEntry(castProfile, "Renewing Mist");
    const kickEntry = getSelectedKick(castProfile);
    if (!remEntry || !kickEntry) return;

    const remCooldown = spellDB["Renewing Mist"][0].cooldownData.cooldown;
    const kickCooldown = spellDB[kickEntry.spell][0].cooldownData.cooldown;

    // env takes a sec off rsk too with rapid diffusion, but not rsk onto rsk because of the icd on pool
    const envEntry = hasTalent(talents, "Rapid Diffusion") ? getSpellEntry(castProfile, "Enveloping Mist") : null;
    const kickCdrCpm = remEntry.cpm + (envEntry?.cpm ?? 0);

    const bonusRemCpm = (kickEntry.cpm * kickCdReducedSec * POOL_REM_EFFECTIVENESS) / remCooldown;
    const bonusKickCpm = (kickCdrCpm * remCdReducedSec * POOL_KICK_EFFECTIVENESS) / kickCooldown;

    remEntry.cpm += bonusRemCpm;
    kickEntry.cpm += bonusKickCpm;
}

const applyTierSet = (playerData: any, castProfile: CastProfile, spellDB: Record<string, any[]>): void => {
    if (playerData.tierSets.includes("Mistweaver Monk S2-2")) {
        buffSpellPerc(spellDB["Rising Sun Kick"], 30); // damage
        buffSpellPerc(spellDB["Rushing Wind Kick"], 100, 1); // healing only

        if (playerData.tierSets.includes("Mistweaver Monk S2-4")) {
            // using 0.15 as opposed to 0.2 since procs cannot proc their own reset
            const entry = getSelectedKick(castProfile);
            if (entry) entry.cpm *= 1.15;
        }
    }
}

// Freightrunner's Flask on-use: applies its crit bonus directly to state and returns the effect data for later use.
const applyFreightrunnersFlask = (playerData: any, state: any): any => {
    let onUseData: any = {};
    const effects = playerData.effects?.filter(effect => effect.name === "Freightrunner's Flask") ?? [];
    if (effects.length > 0) {
        onUseData = getTrinketData("Freightrunner's Flask", effects[0].level);
        onUseData.name = "Freightrunner's Flask";

        const averageCritRating = onUseData.value * onUseData.duration / 120;
        state.statPercentages.crit += averageCritRating / STATCONVERSION.CRIT / 100;
    }
    return onUseData;
}

// applying rem for yu'lon, rsk for chi-ji
const applySecretInfusion = (talents: any, state: any, profileKey: MonkProfileKey): void => {
    if (!hasTalent(talents, "Secret Infusion")) return;

    const statPerPoint = talents["Secret Infusion"].values[0] / 100;
    const statBonus = statPerPoint * getTalentPoints(talents, "Secret Infusion");
    const stat = profileKey === "Chi-Ji" ? "versatility" : "haste";

    if (stat === "haste") {
        state.statPercentages.haste *= 1 + statBonus;
    }
    else {
        state.statPercentages.versatility += statBonus;
    }
}

const getHeartOfJadeSerpentUptimes = (talents: any, castProfile: CastProfile, tftCpm: number): { uptimeStandard: number, uptimeConduit: number } => {
    const procDurationSec = talents["Heart of the Jade Serpent"].values[0] / 1000;

    let uptimeSecPerMinStandard = tftCpm * procDurationSec;
    if (hasTalent(talents, "Yu'lon's Avatar")) {
        // any profile that casts viv/sg at all clears YA 1.5ppm pretty comfortably
        const avatarPpm = getSelectedPrimaryHeal(castProfile) ? 1.5 : 0;
        const avatarDurationSec = talents["Yu'lon's Avatar"].values[0] / 1000;
        uptimeSecPerMinStandard += avatarPpm * avatarDurationSec;
    }
    const uptimeStandard = Math.min(uptimeSecPerMinStandard / 60, 1);

    let uptimeConduit = 0;
    if (hasTalent(talents, "Unity Within")) {
        const conduitCpm = getSpellEntry(castProfile, "Celestial Conduit")?.cpm ?? 0;
        uptimeConduit = Math.min((conduitCpm * procDurationSec) / 60, 1);
    }

    return { uptimeStandard, uptimeConduit };
}

const HOTJS_CDR_PERC = 75;
const KICK_KEY = "Selected Kick";
const HOTJS_EFFECTIVENESS: Record<string, number> = {
    "Renewing Mist": 0.6,
    "Rushing Wind Kick": 0.4,
    "Rising Sun Kick": 0.9, // with rsk, we're probably not fighting for gcds unlike rwk (yu'lon)
    "Thunder Focus Tea": 0.8,
    "Life Cocoon": 0.8,
};

const getHotjsTftCpm = (talents: any, castProfile: CastProfile, baseTftCpm: number): number => {
    if (!hasTalent(talents, "Heart of the Jade Serpent")) return baseTftCpm;

    const { uptimeStandard, uptimeConduit } = getHeartOfJadeSerpentUptimes(talents, castProfile, baseTftCpm);
    const standardCdr = HOTJS_CDR_PERC / 100;
    const unityWithinMult = hasTalent(talents, "Unity Within") ? talents["Unity Within"].values[0] / 100 : 1;
    const conduitCdr = standardCdr * unityWithinMult;

    return baseTftCpm * (1 + standardCdr * uptimeStandard) * (1 + conduitCdr * uptimeConduit);
}

const applyFlowingWisdom = (talents: any, state: any, castProfile: CastProfile, tftCpm: number): void => {
    if (!hasTalent(talents, "Flowing Wisdom")) return;

    const { uptimeStandard, uptimeConduit } = getHeartOfJadeSerpentUptimes(talents, castProfile, tftCpm);
    const hasteBonus = talents["Flowing Wisdom"].values[0] / 100;

    state.statPercentages.haste *= (1 + hasteBonus * uptimeStandard) * (1 + hasteBonus * uptimeConduit);
}

const applyHeartOfJadeSerpent = (talents: any, castProfile: CastProfile, tftCpm: number): void => {
    if (!hasTalent(talents, "Heart of the Jade Serpent")) return;

    const { uptimeStandard, uptimeConduit } = getHeartOfJadeSerpentUptimes(talents, castProfile, tftCpm);
    const standardCdr = HOTJS_CDR_PERC / 100;
    const unityWithinMult = hasTalent(talents, "Unity Within") ? talents["Unity Within"].values[0] / 100 : 1;
    const conduitCdr = standardCdr * unityWithinMult;

    const selectedKick = getSelectedKick(castProfile).spell;
    Object.entries(HOTJS_EFFECTIVENESS).forEach(([spellName, effectiveness]) => {
        const entry = getSpellEntry(castProfile, spellName === KICK_KEY ? selectedKick : spellName);
        if (!entry) return;

        entry.cpm *= (1 + standardCdr * uptimeStandard * effectiveness) * (1 + conduitCdr * uptimeConduit * effectiveness);
    });
}

const applyHarmonicSurgeCpm = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>, tftCpm: number): void => {
    const harmonicSurgeEntry = getSpellEntry(castProfile, "Harmonic Surge");
    if (!harmonicSurgeEntry) return;

    const rskCpm = getSelectedKick(castProfile).cpm;
    harmonicSurgeEntry.cpm = talents["Harmonic Surge"].values[5] * tftCpm + rskCpm;
}

const applyInnerCompass = (talents: any, state: any): void => {
    if (!hasTalent(talents, "Inner Compass")) return;

    const statBonus = talents["Inner Compass"].values[0] / 100 / 4;

    state.statPercentages.crit += statBonus;
    state.statPercentages.versatility += statBonus;
    state.statPercentages.mastery += statBonus;
    state.statPercentages.haste *= 1 + statBonus;
}

const getAverageTeachingsStacks = (talents: any, castProfile: CastProfile): number => {
    const tigerPalmStrikes = hasTalent(talents, "Way of the Crane") ? talents["Way of the Crane"].values[2] : 1;
    const tigerPalmCPM = getCPM(castProfile, "Tiger Palm");
    const blackoutKickCPM = getCPM(castProfile, "Blackout Kick");
    if (blackoutKickCPM === 0) return 0;

    let averageTeachingsStacks = (tigerPalmCPM * tigerPalmStrikes) / blackoutKickCPM;
    if (hasTalent(talents, "Xuen's Guidance")) averageTeachingsStacks *= 1 + talents["Xuen's Guidance"].values[1] / 100; // Doesn't apply to our base BoK.

    return Math.min(averageTeachingsStacks, TOTM_MAX_STACKS);
}

const getRisingMistRates = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>, reportingData: Record<string, any>): { remStandard: number, envStandard: number } => {
    if (!hasTalent(talents, "Rising Mist")) return { remStandard: 0, envStandard: 0 };

    const secPerExtension = talents["Rising Mist"].values[0];
    const maxExtension = 1 + talents["Rising Mist"].values[1] / 100;
    reportingData.risingMist = {};

    const getHotRisingMistRate = (spellName: string): number => {
        const cpm = spellName === "Renewing Mist" ? getSelectedKick(castProfile).cpm : getSpellEntry(castProfile, spellName).cpm;
        const hotDuration = spellDB[spellName][0].buffDuration;
        const maxDuration = hotDuration * maxExtension;
        const extensionsToMax = hotDuration / secPerExtension;
        const rate = Math.min(1, (cpm * maxDuration / 60) / extensionsToMax * EFFICIENCY);

        reportingData.risingMist[spellName] = { cpm, hotDuration, maxDuration, extensionsToMax, rate };

        return rate;
    }

    const remStandard = getHotRisingMistRate("Renewing Mist");
    const envStandard = getHotRisingMistRate("Enveloping Mist");
    return { remStandard, envStandard };
}

const getRapidDiffusionRemSec = (talents: any, castProfile: CastProfile, remRapidDiffusion: number): number => {
    if (!hasTalent(talents, "Rapid Diffusion")) return 0;

    const duration = getRapidDiffusionRemDuration(talents);
    const rskCPM = getSelectedKick(castProfile).cpm;
    const envCPM = getSpellEntry(castProfile, "Enveloping Mist").cpm;

    return (envCPM + rskCPM) * duration * (1 + remRapidDiffusion);
}

const DANCING_MISTS_BOUNCE_PPM = getAveragePpmFromLogs([
    [[7, 18], 38], // rVJ39Wg8wGRk2DnN
    [[7, 18], 33], // KmHBCRaJFLp176gw
]);

// TODO: confirm validity
const getDancingMistsRemSec = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>, rapidDiffusionRemSec: number): number => {
    if (!hasTalent(talents, "Dancing Mists")) return 0;

    const procChance = talents["Dancing Mists"].values[0] / 100;
    const remCPM = getSpellEntry(castProfile, "Renewing Mist").cpm;
    const remDuration = spellDB["Renewing Mist"][0].buffDuration;

    const rapidDiffusionCpm = rapidDiffusionRemSec / remDuration;
    const castDrivenRemSec = (remCPM + rapidDiffusionCpm) * procChance * remDuration;

    const bounceDrivenRemSec = DANCING_MISTS_BOUNCE_PPM * remDuration;

    return castDrivenRemSec + bounceDrivenRemSec;
}

const getAverageRemCount = (castProfile: CastProfile, spellDB: Record<string, any[]>, remStandard: number, freeRenewingMistSec: number, reportingData: Record<string, any>): number => {
    const remCPM = getSpellEntry(castProfile, "Renewing Mist").cpm;
    const remDuration = spellDB["Renewing Mist"][0].buffDuration;
    const standardRemSec = remCPM * remDuration * (1 + remStandard);
    const result = (standardRemSec + freeRenewingMistSec) / 60;

    reportingData.remCoverage = { remCPM, remDuration, remStandard, standardRemSec, freeRenewingMistSec, averageRemCount: result };

    return result;
}

const getMistyPeaksEnvSec = (talents: any, spellDB: Record<string, any[]>, averageRemCount: number, haste: number): number => {
    if (!hasTalent(talents, "Misty Peaks")) return 0;

    const procDuration = talents["Misty Peaks"].values[1];
    const procChancePerPoint = talents["Misty Peaks"].values[2] / 100;
    const procChance = procChancePerPoint * getTalentPoints(talents, "Misty Peaks");

    const remTickRate = spellDB["Renewing Mist"][0].tickData.tickRate;
    const ticksPerMin = (averageRemCount * 60) / (remTickRate / haste);

    return ticksPerMin * procChance * procDuration;
}

const getAverageEnvCount = (castProfile: CastProfile, spellDB: Record<string, any[]>, envStandard: number, freeEnvelopingMistSec: number): number => {
    const envCPM = getSpellEntry(castProfile, "Enveloping Mist").cpm;
    const envDuration = spellDB["Enveloping Mist"][0].buffDuration;
    const standardEnvSec = envCPM * envDuration * (1 + envStandard);

    return (standardEnvSec + freeEnvelopingMistSec) / 60;
}

const getEnvelopingMistHealAmpMult = (talents: any, averageEnvCount: number, profileKey: MonkProfileKey): number => {
    const baselineAmpPerc = 10;
    const healAmpPerc = hasTalent(talents, "Mist Wrap") ? baselineAmpPerc + talents["Mist Wrap"].values[0] : baselineAmpPerc;

    return 1 + (healAmpPerc / 100) * Math.min(averageEnvCount / getGroupSize(profileKey), 1);
}

const getMistyCoalescenceMult = (talents: any, averageRemCount: number, profileKey: MonkProfileKey): number => {
    if (!hasTalent(talents, "Misty Coalescence")) return 1;

    const maxMultPerc = talents["Misty Coalescence"].values[0];
    const maxCoverageAllowed = talents["Misty Coalescence"].values[1];
    const maxCoverage = Math.min(getGroupSize(profileKey), maxCoverageAllowed);

    return 1 + (maxMultPerc / 100) * Math.min(averageRemCount / maxCoverage, 1);
}

type MonkProfileKey = keyof typeof monkTalentStrings;

const initMonkCastState = (castProfile: CastProfile, playerData: any, settings: PlayerSettings, profileKey: MonkProfileKey) => {
    const initialState = {
        statBonuses: applyRaidBuffs(settings),
        talents: deepCopyFunction(monkTalents),
        heroTree: playerData.heroTree
    };

    const localSettings: any = {
        downtime: 0,
        risingMist: {
            remStandard: 1,
            envStandard: 0.9
        },
        gustsOverhealing: 0.4,
        chijiGustsOverhealing: 0.4,
        ancientTeachingsOverhealing: 0.06,
        yulonEnvShare: 0.6 // % of time spent on env inside yu'lon
    };

    const spellDB = JSON.parse(JSON.stringify(specSpellDB));

    // create one off entries for visual display
    spellDB["Ancient Teachings"] = [{"displayInfo": { "icon": "inv_misc_book_07" }}];

    // gust of mists
    ["Renewing Mist", "Enveloping Mist"].forEach(spellName => {
        spellDB[spellName][0].gustsValue = 1;
    });

    // baseline ancient teachings transfer
    [getSelectedKick(castProfile).spell, "Blackout Kick", "Tiger Palm", "Crackling Jade Lightning"].forEach(spellName => {
        spellDB[spellName][0].damageToHeal = 0.25;
    });

    // damage spells' aura is missing the 1%/level scaling baked into the tooltip, so apply it here
    const LEVEL_SCALING_MULT = 1.9;
    Object.values(spellDB).forEach((slices: any) => {
        slices.forEach((slice: any) => {
            if (slice.spellType === "damage") slice.aura *= LEVEL_SCALING_MULT;
        });
    });


    const talents = initialState.talents;
    const talentImport = getSelectedTalentsFromString(monkTalentStrings[profileKey], SPECS.MISTWEAVERMONK);

    applyTalentsFromString(initialState, spellDB, talentImport);

    if (hasTalent(talents, "Celestial Harmony")) {
        const celestialHarmony = talents["Celestial Harmony"];
        const chiCocoon = spellDB["Chi Cocoon"][0];
        chiCocoon.targets = celestialHarmony.values[2];
    }

    const sfEntry = talents["Spiritfont1"];
    if (sfEntry) {
        const effectiveness = sfEntry.values[0] / 100;
        const targets = sfEntry.values[1];
        spellDB["Spiritfont"] = [{
            ...spellDB["Soothing Mist"][0],
            coeff: spellDB["Soothing Mist"][0].coeff * effectiveness,
            targets: targets,
            offGCD: true
        }];
    }

    // must be done after applyTalents to get jft/mf additive transfer rates
    applyEmperorsElixir(talents, spellDB, castProfile);

    return { initialState, localSettings, spellDB, talents };
}

const buildMonkState = (initialState: any, playerData: any, stats: Stats, settings: PlayerSettings) => {
    const state = {
        fightLength: 480,
        spec: SPECS.MISTWEAVERMONK,
        statPercentages:
            convertStatPercentages(
                stats,
                initialState.statBonuses,
                SPECS.MISTWEAVERMONK,
                1
            ),
        settings: settings,
        talents: monkTalents
    };

    state.tierSets = playerData.tierSets.filter(effect => effect.type === "set bonus").map(effect => effect.name);

    return state;
}

// 1 elixir every 30 sec from base talent
const HEALING_ELIXIR_TALENT_CPM = 2;
const HEALING_ELIXIR_HEAL_PERC = 15;

// refreshment is at 80% hp, healing elixir is at 40% hp
// in reality, their overheal is quite low anyways
const applyHealingElixirTalents = (spellDB: Record<string, any[]>, castProfile: CastProfile, talents: any, intellect: number): void => {
    const coeff = ASSUMED_MAX_HEALTH * (HEALING_ELIXIR_HEAL_PERC / 100) / intellect;
    const hasBaseTalent = hasTalent(talents, "Healing Elixir");
    const hasRefreshment = hasTalent(talents, "Refreshment");
    if (!hasBaseTalent && !hasRefreshment) return;

    spellDB["Healing Elixir"] = [{
        ...spellDB["Life Cocoon"][0],
        coeff,
        cost: 0,
        offGCD: true,
        specialFields: {},
        displayInfo: { icon: "ability_monk_jasmineforcetea" },
    }];

    if (hasBaseTalent) {
        castProfile.push({
            spell: "Healing Elixir",
            cpm: HEALING_ELIXIR_TALENT_CPM,
            flags: { overrideOverhealing: 0.1 },
        });
    }

    if (hasRefreshment) {
        const stacks = talents["Refreshment"].values[1];
        const lifeCocoonCpm = getCPM(castProfile, "Life Cocoon");
        castProfile.push({
            spell: "Healing Elixir",
            cpm: stacks * lifeCocoonCpm,
            label: "Healing Elixir (Refreshment)",
            flags: { overrideOverhealing: 0.02 },
        });
    }
}

const applyChiProficiency = (talents: any, state: any): void => {
    if (!hasTalent(talents, "Chi Proficiency")) return;

    state.statPercentages.genericHealingMult *= 1 + getTalentPoints(talents, "Chi Proficiency") * 2 / 100;
}

// harder to apply to -just- the celestial windows, so avg here works okay
const applyRestoreBalance = (talents: any, state: any, reportingData: Record<string, any>): void => {
    if (!hasTalent(talents, "Restore Balance")) return;

    const celestial = reportingData.yulon ?? reportingData.chiji;
    if (!celestial) return;

    // the increase is set to +5% on both chi-ji and yu'lon's spells, 0 on the talent (is this bugged and always active?)
    const increase = 0.05; // talents["Restore Balance"].values[0] / 100;

    const windowShare = celestial.duration / 60 * celestial.cpm;
    state.statPercentages.genericHealingMult *= 1 + increase * windowShare;
}

const applyHeroTreeBonuses = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>, state: any, reportingData: Record<string, any>, playerData: any): void => {
    let tftCpm = 60 / spellDB["Thunder Focus Tea"][0].cooldownData.cooldown;
    if (playerData.heroTree === MONK_HERO_TREES.CONDUIT) {
        tftCpm = getHotjsTftCpm(talents, castProfile, tftCpm);
        applyInnerCompass(talents, state);
        applyFlowingWisdom(talents, state, castProfile, tftCpm);
    }
    else if (playerData.heroTree === MONK_HERO_TREES.MOH) {
        applyHarmonicSurgeCpm(talents, castProfile, spellDB, tftCpm);
    }

    reportingData.tftCpm = tftCpm;
}

const applyApexBonuses = (castProfile: CastProfile, reportingData: Record<string, any>) => {
    // hasTalent(talents, "Spiritfont3") do not work :(
    // can just assume we have all 4 points for now
    const spiritfontEntry = getSpellEntry(castProfile, "Spiritfont");
    if (spiritfontEntry) {
        spiritfontEntry.cpm += reportingData.tftCpm;

        const envEntry = getSpellEntry(castProfile, "Enveloping Mist");
        if (envEntry) envEntry.cpm += reportingData.tftCpm;
    }
}

const applyZenPulse = (talents: any, spellDB: Record<string, any[]>, reportingData: Record<string, any>): void => {
    if (!hasTalent(talents, "Zen Pulse")) {
        reportingData.zenPulsePPM = 0;
        return;
    }

    // does not have a direct ppm, as it scales with rem count (albeit not a lot)
    // using real log examples (fight duration, observed procs) to get avg ppm
    const calcedBasePpm = getAveragePpmFromLogs([
        [[6, 27], 9], // jGMtJFCRq2amYgvW
        [[4, 41], 7], // BL3dTX7qhWvb2MkA
        [[4, 44], 6], // 81MTVarg62zdn7ym
        [[7, 51], 10], // zrLTxtRZ4nahvd9b
    ]); // 1.37 cpm base

    // todo: tft cpm = additional zen pulse buffs
    reportingData.zenPulsePPM = calcedBasePpm * EFFICIENCY + (hasTalent(talents, "Deep Clarity") ? 2 : 0);

    const zenPulseEntry = spellDB["Zen Pulse"][0];
    zenPulseEntry.mult = (zenPulseEntry.mult ?? 1) * (1 + Math.min(talents["Zen Pulse"].values[0] / 100 * reportingData.averageRemCount, talents["Zen Pulse"].values[1] / 100));
}

const applyCoverageMultipliers = (
    talents: any,
    castProfile: CastProfile,
    spellDB: Record<string, any[]>,
    state: any,
    localSettings: any,
    reportingData: Record<string, any>,
    risingMistRates: { remStandard: number, envStandard: number },
    profileKey: MonkProfileKey,
) => {
    // Calculate average ReM count
    reportingData.averageRemCount = getAverageRemCount(castProfile, spellDB, localSettings.risingMist.remStandard, reportingData.freeRenewingMistSec, reportingData);

    // misty coalescence multiplier onto renewing mist
    const remEntry = getSpellEntry(castProfile, "Renewing Mist");
    remEntry.mult = (remEntry.mult ?? 1) * getMistyCoalescenceMult(talents, reportingData.averageRemCount, profileKey);

    applyZenPulse(talents, spellDB, reportingData);

    // 6% amp applied on whoever has rem - just averaging multi across the group by coverage
    if (hasTalent(talents, "Lotus Infusion")) {
        const lotusInfusionMult = talents["Lotus Infusion"].values[0] / 100;
        state.statPercentages.genericHealingMult *= 1 + lotusInfusionMult * Math.min(reportingData.averageRemCount / getGroupSize(profileKey), 1);
    }

    // mirrors lotus infusion as a coverage point
    const freeEnvelopingMistSec = getMistyPeaksEnvSec(talents, spellDB, reportingData.averageRemCount, state.statPercentages.haste);
    reportingData.averageEnvCount = getAverageEnvCount(castProfile, spellDB, risingMistRates.envStandard, freeEnvelopingMistSec);
    state.statPercentages.genericHealingMult *= getEnvelopingMistHealAmpMult(talents, reportingData.averageEnvCount, profileKey);
    reportingData.freeEnvelopingMistSec = freeEnvelopingMistSec;

    // extending these durations is a bit dirty by the avg rising mist rate, but their output will reflect most of the uptime
    spellDB["Renewing Mist"][0].buffDuration *= 1 + risingMistRates.remStandard;
    spellDB["Enveloping Mist"][0].buffDuration *= 1 + risingMistRates.envStandard;

    spellDB["Renewing Mist"][0].buffDuration += reportingData.freeRenewingMistSec / getCPM(castProfile, "Renewing Mist");
    spellDB["Enveloping Mist"][0].buffDuration += freeEnvelopingMistSec / getCPM(castProfile, "Enveloping Mist");

    if (hasTalent(talents, "Save Them All")) {
        // averageRaidHealth 85% default mirrors the Redux settings registry
        // getSetting's 0 fallback would wrongly imply targets are dead lol
        const averageRaidHealth = ("averageRaidHealth" in state.settings ? getSetting(state.settings, "averageRaidHealth") : 85) / 100;
        state.statPercentages.genericHealingMult *= 1 + (talents["Save Them All"].values[0] / 100) * (1 - averageRaidHealth);
    }

    const rwkHealSlice = spellDB["Rushing Wind Kick"][1];
    rwkHealSlice.aura = 0.8; // todo: remove when fixed
    rwkHealSlice.targets = Math.min(reportingData.averageRemCount + reportingData.averageEnvCount, 5);
}

const unityWithinFields = (talents: any, state: any, spellDB: Record<string, any[]>) => {
    if (!hasTalent(talents, "Unity Within")) return null;

    const mult = talents["Unity Within"].values[0] / 100;

    const courage = spellDB["Courage of the White Tiger"][0];
    const courageDamage = runSpell(state, courage) * mult;

    return {
        healing: {
            "Courage of the White Tiger": courageDamage * courage.damageToHeal * 1.3, // ignores armor
            "Strength of the Black Ox": runSpell(state, spellDB["Strength of the Black Ox"][0]) * mult,
            // ignored, incredibly small contribution anyways to include bug
            // "Flight of the Red Crane": runSpell(state, spellDB["Flight of the Red Crane"][0]) * mult,
        } as Record<string, number>,
        damage: {
            "Courage of the White Tiger": courageDamage,
        } as Record<string, number>,
    };
}

const runCastLoop = (
    castProfile: CastProfile,
    spellDB: Record<string, any[]>,
    state: any,
    localSettings: any,
    reportingData: Record<string, any>,
    healingBreakdown: Record<string, number>,
    damageBreakdown: Record<string, number>,
    castBreakdown: Record<string, number>,
) => {
    let zenPulseRemaining = reportingData.zenPulsePPM;

    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellFlags = spellProfile.flags || {};

        // we should cleave off of celestial's rem "pocket" windows if applicable
        const remCount = spellFlags.remCount ?? reportingData.averageRemCount;

        fullSpell.forEach((slice: SpellData, index: number) => {

            // Regular spells
            let spellOutput = 0;

            if (slice.customScript) {
                // Spells that do things that are too complex for generic throughput calculations.
                // These are often scripted in-game too, like Wild Growth.
                spellOutput = runSpellScript(slice.customScript, state, slice);
            }
            else {
                // Get how much healing or damage we expect the spell to do.
                // We'll need to make a damage vs healing determination at some point but I'm still thinking about it.
                spellOutput = runSpell(state, slice, spellFlags);
            }

            const effectiveCPM = spellProfile.fillerSpell ? 0 : spellProfile.cpm!;

            let totalOutput = (spellOutput * effectiveCPM * (spellProfile.mult ?? 1));

            if (slice.gustsValue) {
                // Spell procs Gust of Mists.
                const masteryHeal = getGustHeal(spellDB, state, localSettings.gustsOverhealing) * slice.gustsValue;

                addOutput(healingBreakdown, "Gust of Mists", masteryHeal * effectiveCPM);
            }
            // Spell specifics
            if (spellName === "Vivify") {
                const invig = runSpell(state, spellDB["Invigorating Mists"][0]);
                addOutput(healingBreakdown, "Invigorating Mists", invig * remCount * effectiveCPM);
            }
            else if (spellName === "Sheilun's Gift") {
                totalOutput *= localSettings.sheilunsClouds;
            }

            if (spellName === "Vivify" || spellName === "Sheilun's Gift") {
                const zenPulse = runSpell(state, spellDB["Zen Pulse"][0]);
                const procs = Math.min(zenPulseRemaining, effectiveCPM);
                zenPulseRemaining -= procs;

                addOutput(healingBreakdown, "Zen Pulse", zenPulse * (spellDB["Zen Pulse"][0].mult ?? 1) * remCount * procs);
            }

            if (spellName === "Celestial Conduit" && reportingData.unityWithin) {
                Object.entries(reportingData.unityWithin.healing).forEach(([label, output]) => addOutput(healingBreakdown, label, (output as number) * effectiveCPM));
                Object.entries(reportingData.unityWithin.damage).forEach(([label, output]) => addOutput(damageBreakdown, label, (output as number) * effectiveCPM));
            }

            if (spellName === "Spiritfont") {
                addOutput(healingBreakdown, "Chi Cocoon (Spiritfont)", runSpell(state, spellDB["Chi Cocoon (Spiritfont)"][0]));
            }

            if (slice.spellType === "damage") {
                if (spellName === "Blackout Kick") {
                    totalOutput *= 1 + reportingData.averageTeachingsStacks;
                }
                if (slice.damageToHeal) {
                    if (spellName === "Courage of the White Tiger") {
                        addOutput(healingBreakdown, "Courage of the White Tiger", totalOutput * slice.damageToHeal * 1.3); // ignores armor
                    }
                    else {
                        addOutput(healingBreakdown, "Ancient Teachings", totalOutput * slice.damageToHeal * (1 - localSettings.ancientTeachingsOverhealing));
                    }
                }
            }

            if (totalOutput > 0) {
                const label = spellProfile.label || spellName;
                addOutput(castBreakdown, label, effectiveCPM);
                addOutput(slice.spellType === "damage" ? damageBreakdown : healingBreakdown, label, totalOutput);
            }
        });
    })
}

const compileMonkResult = (
    healingBreakdown: Record<string, number>,
    damageBreakdown: Record<string, number>,
    castProfile: CastProfile,
    spellDB: Record<string, any[]>,
    state: any,
    reporting: boolean,
) => {
    let totalHealing = Object.values(healingBreakdown).reduce((sum: number, val: number) => sum + val, 0);
    const totalDamage = Object.values(damageBreakdown).reduce((sum: number, val: number) => sum + val, 0);
    if (state.statPercentages.leech) {
        healingBreakdown["Leech"] = state.statPercentages.leech * (totalDamage + totalHealing) * 0.35;
        totalHealing += healingBreakdown["Leech"];
    }

    const result = {
        damage: totalDamage / 60,
        healing: totalHealing / 60,
        spellBreakdowns: {
            healingBreakdown: [],
            damageBreakdown: []
        }
    }

    if (reporting) {
        result.spellBreakdowns = compileProfileReportingData(healingBreakdown, damageBreakdown, castProfile, spellDB, totalHealing, totalDamage)
    }

    return result;
}

function runMonkCastProfile(
    stats: Stats,
    playerData: any,
    settings: PlayerSettings = {},
    reporting: boolean = false,
    castProfile: CastProfile,
    profileKey: MonkProfileKey,
) {
    const { initialState, localSettings, spellDB, talents } = initMonkCastState(castProfile, playerData, settings, profileKey);
    const state = buildMonkState(initialState, playerData, stats, settings);

    applyHealthAbsorbs(spellDB, stats, talents, state.statPercentages.intellect);

    const healingBreakdown: Record<string, number> = {}
    const damageBreakdown: Record<string, number> = {}
    const castBreakdown: Record<string, number> = {};
    const reportingData: Record<string, any> = {};

    // Prio: House of Cards > Signet. Only matters if someone is wearing double on-use. Poor thing.
    const onUseData: any = applyFreightrunnersFlask(playerData, state);

    applyChiProficiency(talents, state);
    applySecretInfusion(talents, state, profileKey);
    applyHeroTreeBonuses(talents, castProfile, spellDB, state, reportingData, playerData);

    // Convert efficiencies to effect CPMs. Handle any special overrides.
    completeCastProfile(castProfile, spellDB, state.statPercentages);

    applyApexBonuses(castProfile, reportingData);
    applyTierSet(playerData, castProfile, spellDB);

    applyPoolOfMists(talents, castProfile, spellDB);
    applyHeartOfJadeSerpent(talents, castProfile, reportingData.tftCpm);

    applyHealingElixirTalents(spellDB, castProfile, talents, state.statPercentages.intellect);

    // Sheilun's Gift
    localSettings.sheilunsClouds = 0; //Math.min(10, (60 / 8 / getSpellEntry(castProfile, "Sheilun's Gift").cpm))
    reportingData.sheilunsClouds = localSettings.sheilunsClouds;

    applyYulonWindow(profileKey, talents, spellDB, state, castProfile, localSettings, reportingData);
    applyChijiWindow(profileKey, spellDB, state, reportingData);
    applyRestoreBalance(talents, state, reportingData);

    // Expected Downtime
    reportingData.averageHaste = state.statPercentages.haste; // TODO
    applyDowntimeFill(talents, castProfile, spellDB, state, reportingData, localSettings);

    // TotM
    reportingData.averageTeachingsStacks = getAverageTeachingsStacks(talents, castProfile);

    // Rising Mist
    // This section in particular could use more analysis. It's important that Rising Mist scales with haste since it's a key factor in our resets,
    // however modelling getting 5 in a ReM duration is trickier. We also don't want to introduce "fake" breakpoints.
    const risingMistRates = getRisingMistRates(talents, castProfile, spellDB, reportingData);
    localSettings.risingMist.remStandard = risingMistRates.remStandard;
    localSettings.risingMist.envStandard = risingMistRates.envStandard;

    // Rapid Diffusion
    reportingData.freeRenewingMistSec = getRapidDiffusionRemSec(talents, castProfile, localSettings.risingMist.remStandard);
    reportingData.freeRenewingMistSec += getDancingMistsRemSec(talents, castProfile, spellDB, reportingData.freeRenewingMistSec);

    applyCoverageMultipliers(talents, castProfile, spellDB, state, localSettings, reportingData, risingMistRates, profileKey);

    reportingData.unityWithin = unityWithinFields(talents, state, spellDB);

    const sequence = getCelestialSequence(profileKey);
    if (sequence) {
        sequence(state, spellDB, localSettings, reportingData, healingBreakdown, onUseData, talents, castProfile);
    }

    runCastLoop(castProfile, spellDB, state, localSettings, reportingData, healingBreakdown, damageBreakdown, castBreakdown);

    const result = compileMonkResult(healingBreakdown, damageBreakdown, castProfile, spellDB, state, reporting);

    if (reporting) console.log(reportingData);

    return result;
}

const conduitCastProfile: CastProfile = [
    { spell: "Celestial Conduit", efficiency: EFFICIENCY, },
    { spell: "Courage of the White Tiger", cpm: 4, hastedCPM: true },
    { spell: "Strength of the Black Ox", cpm: 4, hastedCPM: true, } // identical to courage
]

const mohCastProfile: CastProfile = [
    // adjusted by cpm of tft and rsk/rwk
    { spell: "Harmonic Surge", cpm: 0 }
]

const getHeroTreeCastProfile = (playerData: any): CastProfile => {
    if (playerData.heroTree === MONK_HERO_TREES.CONDUIT) return deepCopyFunction(conduitCastProfile);
    if (playerData.heroTree === MONK_HERO_TREES.MOH) return deepCopyFunction(mohCastProfile);
    return [];
}

export function scoreMonkYulonSet(stats: Stats, playerData: any, settings: PlayerSettings = {}, reporting: boolean = false) {
    const castProfile: CastProfile = [
        { spell: "Renewing Mist", efficiency: EFFICIENCY },
        { spell: "Enveloping Mist", cpm: 5 }, // must be a minimum of sotbo + spiritfont r1, adjusted even more with yu'lon sequencing
        { spell: "Vivify", cpm: 0 }, // our filler, the downtime fill solves the real cpm
        { spell: "Rushing Wind Kick", efficiency: 0.85, hastedCPM: true },

        // cooldowns
        { spell: "Invoke Yu'lon, the Jade Serpent", efficiency: 1 },
        { spell: "Revival", efficiency: EFFICIENCY, },
        { spell: "Life Cocoon", efficiency: EFFICIENCY, },

        // spells
        { spell: "Spiritfont", cpm: 1, },

        ...getHeroTreeCastProfile(playerData)
    ];
    return runMonkCastProfile(stats, playerData, settings, reporting, castProfile, "Yu'lon");
}

export function scoreMonkChijiSet(stats: Stats, playerData: any, settings: PlayerSettings = {}, reporting: boolean = false) {
    const castProfile: CastProfile = [
        { spell: "Renewing Mist", efficiency: 0.1 },
        { spell: "Enveloping Mist", cpm: 0.1 }, // we could do a model that never casts ever
        //{ spell: "Vivify", cpm: 0, hastedCPM: true },
        { spell: "Tiger Palm", cpm: 16 },
        { spell: "Blackout Kick", cpm: 15 },
        { spell: "Rising Sun Kick", efficiency: 0.9, hastedCPM: true },

        // cooldowns
        { spell: "Invoke Chi-Ji, the Red Crane", efficiency: 1 },
        { spell: "Revival", efficiency: EFFICIENCY, },
        { spell: "Life Cocoon", efficiency: EFFICIENCY, },

        // spells
        { spell: "Spiritfont", cpm: 1, },

        ...getHeroTreeCastProfile(playerData)
    ];
    return runMonkCastProfile(stats, playerData, settings, reporting, castProfile, "Chi-Ji");
}

export function scoreMonkDungeonSet(stats: Stats, playerData: any, settings: PlayerSettings = {}, reporting: boolean = false) {
    // TODO: fill in generic Dungeon cast profile.
    const castProfile: CastProfile = [
        // TODO: fill in Dungeon Default cast profile.
    ];
    return runMonkCastProfile(stats, playerData, settings, reporting, castProfile, "Dungeon Default");
}

// reverse compat might not be needed here
export function scoreMonkSet(stats: Stats, playerData: any, settings: PlayerSettings = {}, reporting: boolean = false) {
    return scoreMonkYulonSet(stats, playerData, settings, reporting);
}                                                                                                                                     