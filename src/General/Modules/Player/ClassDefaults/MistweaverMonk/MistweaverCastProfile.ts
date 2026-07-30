import { deepCopyFunction, hasTalent, getTalentPoints } from "General/Modules/Player/ClassDefaults/Generic/RampBase"
import { applyRaidBuffs, applyTalentsFromString, compileProfileReportingData, completeCastProfile, convertStatPercentages, getSpellThroughput, getTrinketData, getSpellEntry, buildCPM } from "../Generic/ProfileUtilities";
import { monkTalents } from "./MistweaverMonkTalents";
import { MONK_HERO_TREES, monkTalentStrings } from "./MonkDefaults";

import specSpellDB from "./MistweaverMonkSpellDB.json";
import { runSpellScript } from "../Generic/SpellScripts";
import { getSelectedTalentsFromString } from "../Generic/TalentStrings/TalentDecoder";
import { buffSpellPerc } from "../Generic/TalentBase";
import SPECS from "General/Engine/SPECS";
import { STATCONVERSION } from "General/Engine/STAT";
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

const EFFICIENCY = 0.9;

// averages a proc rate across real log examples: [[fightMin, fightSec], observedProcs][].
const getAveragePpmFromLogs = (examples: [[number, number], number][]): number => {
    const getPpmFromExample = ([fightMin, fightSec]: [number, number], procs: number): number => procs / (fightMin + fightSec / 60);
    return examples.reduce((sum, [duration, procs]) => sum + getPpmFromExample(duration, procs), 0) / examples.length; 
}

const getSelectedKick = (castProfile: CastProfile): any =>
    getSpellEntry(castProfile, "Rushing Wind Kick") ?? getSpellEntry(castProfile, "Rising Sun Kick");

const getSelectedPrimaryHeal = (castProfile: CastProfile): any =>
    getSpellEntry(castProfile, "Sheilun's Gift") ?? getSpellEntry(castProfile, "Vivify");

const getGustHeal = (spellDB: Record<string, any[]>, state: any, overhealing: number, statPercentages: any = state.statPercentages): number => {
    const gust = spellDB["Gust of Mists"][0];
    const gustWithMastery = { ...gust, coeff: statPercentages.mastery };

    return getSpellThroughput(gustWithMastery, statPercentages, state.spec, state.settings, { overrideOverhealing: overhealing });
}

const getTimeUsed = (castProfile: CastProfile, spellDB: Record<string, any[]>, averageHaste: number): number => {
    let timeUsed = 0;
    castProfile.forEach(spellProfile => {
        if (spellDB[spellProfile.spell]) {
            const spell = spellDB[spellProfile.spell][0];
            let castTime = (spell.castTime / averageHaste) || 0;

            if (castTime === 0 && !spell.offGCD) castTime = 1.5 / averageHaste;
            timeUsed += castTime * spellProfile.cpm;
        }
        else console.error("Missing Spell: " + spellProfile.spell)

    })

    return timeUsed;
}


type SequencingFn = (
    state: any,
    spellDB: any,
    localSettings: any,
    reportingData: Record<string, any>,
    healingBreakdown: Record<string, number>,
    onUseData: any,
    talents: any,
) => void;

const chijiSequence: SequencingFn = (state, spellDB, localSettings, reportingData, healingBreakdown, onUseData, talents) => {
    if (false) {
        // Sequence Chi-ji
        // Store 4x TotM stacks before pressing Chi-ji
        const tempStats: any = { ...state.statPercentages };
        const chijiDuration = 25; // todo

        // We'll always combine trinkets with Chi-ji. One weakness of the model here is it doesn't consider that Chi-Ji is front loaded.
        // This could be added later.
        if (onUseData.name === "Freightrunner's Flask") tempStats.haste += (onUseData.value * onUseData.duration / chijiDuration);

        let hastePercentage = tempStats.haste;
        //if (hasTalent(talents, "Secret Infusion")) hastePercentage *= (1 + 0.15 * 0.4);
        reportingData.chijiHaste = hastePercentage;

        const chijiCasts = (chijiDuration / (1.5 / hastePercentage) - 1) * (1 - localSettings.downtime);; // Casting Chiji itself takes away from the # of casts in the window
        const chijiCooldown = 120;

        // Chi Cocoons & Jade Bond
        //const chiCocoon = runHeal(state, spellDB["Chi Cocoon"][0], "Chi Cocoon");

        //healingBreakdown["Chi Cocoon"] = chiCocoon * (60 / chijiCooldown);

        // Enveloping Breath
        const envelopingCasts = 4; // TODO: make dynamic
        //const envelopingHeal = runHeal(state, spellDB["Enveloping Breath"][0], "Enveloping Breath") * envelopingCasts * spellDB["Enveloping Breath"][0].buffDuration * averageHaste;
        //healingBreakdown["Enveloping Breath"] = envelopingHeal * (60 / chijiCooldown);

        // Chi-ji Gusts
        // Each damage spell procs 6 total Gusts
        const chijiKicks = chijiCasts - envelopingCasts;
        const castBreakdown: Record<string, number> = {
            "Tiger Palm": 0.25 * chijiKicks,
            "Rising Sun Kick": 0.25 * chijiKicks,
            "Blackout Kick": 0.5 * chijiKicks,
            "Enveloping Mist": envelopingCasts,
        }

        const chijiProcs = 6 * (4 + castBreakdown["Tiger Palm"] * (hasTalent(talents, "awakenedJadefire") ? 2 : 1) + castBreakdown["Rising Sun Kick"] + castBreakdown["Blackout Kick"]);
        let chijiMult = 1
        reportingData.chijiGusts = chijiProcs;
        if (hasTalent(talents, "jadeBond")) chijiMult *= 1.2;

        healingBreakdown["Gust of Mists (Chi-ji)"] = chijiProcs * getGustHeal(spellDB, state, localSettings.chijiGustsOverhealing, tempStats) * chijiMult * (60 / chijiCooldown);

    }
}

const yulonSequence: SequencingFn = (state, spellDB, localSettings, reportingData, healingBreakdown, onUseData, talents) => {
    // TODO: sequence yu'lon
    // probably can create "perfect" sequence and do an efficiency mod on it
    // likely effic is somewhere around 0.6 to 0.7, just from extra gcds
    // outside of enveloping mist, rushing wind kick, and vivify
}

const celestialSequences = {
    "Chi-Ji": chijiSequence,
    "Yu'lon": yulonSequence,
} satisfies Record<string, SequencingFn>;


const applyEmperorsElixir = (talents: any, spellDB: Record<string, any[]>, castProfile: CastProfile): void => {
    // can mostly ignore the enveloping mist empower here, it's useless
    if (hasTalent(talents, "Emperor's Elixir")) {
        const effectiveness = talents["Emperor's Elixir"].values[1] / 100;
        spellDB["Jadefire Stomp"][0].damageToHeal = spellDB[getSelectedKick(castProfile).spell][0].damageToHeal * effectiveness;

        // TODO: jfs casts from thunder focus tea empowering RSK/RWK
        // needs tft's own cpm + charges (like from focused thunder) in order to get a true depiction of how many are used with rsk/rwk
    }
}

const applyPoolOfMists = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>): void => {
    if (!hasTalent(talents, "Pool of Mists")) return;

    const remCdReducedSec = talents["Pool of Mists"].values[3] / 1000;
    const kickCdReducedSec = talents["Pool of Mists"].values[2] / 1000;

    const remEntry = getSpellEntry(castProfile, "Renewing Mist");
    const kickEntry = getSelectedKick(castProfile);
    if (!remEntry || !kickEntry) return;

    const remCooldown = spellDB["Renewing Mist"][0].cooldownData.cooldown;
    const kickCooldown = spellDB[kickEntry.spell][0].cooldownData.cooldown;

    const bonusRemCpm = (kickEntry.cpm * kickCdReducedSec) / remCooldown;
    const bonusKickCpm = (remEntry.cpm * remCdReducedSec) / kickCooldown;

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
        // we can assume vivify is always being cast to fulfil the ppm, but the cpm proably needs to be higher than yu'lon's avatar's 1.5ppm to hit it effectively
        // revisit for models that skip viv/sg completely
        const primaryHealCpm = getSelectedPrimaryHeal(castProfile)?.cpm ?? 0;
        const avatarPpm = primaryHealCpm > 1.5 ? 1.5 : 0;
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
    const affectedSpells = [selectedKick, "Renewing Mist", "Life Cocoon", "Thunder Focus Tea"];
    affectedSpells.forEach(spellName => {
        const entry = getSpellEntry(castProfile, spellName);
        if (!entry) return;

        entry.cpm *= (1 + standardCdr * uptimeStandard) * (1 + conduitCdr * uptimeConduit);
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
    const tigerPalmCPM = getSpellEntry(castProfile, "Tiger Palm").cpm;
    const blackoutKickCPM = getSpellEntry(castProfile, "Blackout Kick").cpm;

    let averageTeachingsStacks = (tigerPalmCPM * tigerPalmStrikes) / blackoutKickCPM;
    if (hasTalent(talents, "Xuen's Guidance")) averageTeachingsStacks *= 1 + talents["Xuen's Guidance"].values[1] / 100; // Doesn't apply to our base BoK.

    return averageTeachingsStacks;
}

const getRisingMistRates = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>): { remStandard: number, envStandard: number } => {
    if (!hasTalent(talents, "Rising Mist")) return { remStandard: 0, envStandard: 0 };

    const secPerExtension = talents["Rising Mist"].values[0];
    const maxExtension = 1 + talents["Rising Mist"].values[1] / 100;

    const getHotRisingMistRate = (spellName: string): number => {
        const cpm = spellName === "Renewing Mist" ? getSelectedKick(castProfile).cpm : getSpellEntry(castProfile, spellName).cpm;
        const hotDuration = spellDB[spellName][0].buffDuration;
        const maxDuration = hotDuration * maxExtension;
        const extensionsToMax = hotDuration / secPerExtension;
        const rate = Math.min(1, (cpm * maxDuration / 60) / extensionsToMax * EFFICIENCY);

        console.log(`[RisingMist] ${spellName}: cpm=${cpm}, hotDuration=${hotDuration}, maxDuration=${maxDuration}, extensionsToMax=${extensionsToMax}, rate=${rate}`);

        return rate;
    }

    const remStandard = getHotRisingMistRate("Renewing Mist");
    const envStandard = getHotRisingMistRate("Enveloping Mist");
    return { remStandard, envStandard };
}

const getRapidDiffusionRemSec = (talents: any, castProfile: CastProfile, remRapidDiffusion: number): number => {
    if (!hasTalent(talents, "Rapid Diffusion")) return 0;

    const duration = talents["Rapid Diffusion"].values[0] * (getTalentPoints(talents, "Rapid Diffusion") / talents["Rapid Diffusion"].maxPoints);
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

const getAverageRemCount = (castProfile: CastProfile, spellDB: Record<string, any[]>, remStandard: number, freeRenewingMistSec: number): number => {
    const remCPM = getSpellEntry(castProfile, "Renewing Mist").cpm;
    const remDuration = spellDB["Renewing Mist"][0].buffDuration;
    const standardRemSec = remCPM * remDuration * (1 + remStandard);
    const result = (standardRemSec + freeRenewingMistSec) / 60;

    console.log(`[AverageRemCount] remCPM=${remCPM}, remDuration=${remDuration}, remStandard=${remStandard}, standardRemSec=${standardRemSec}, freeRenewingMistSec=${freeRenewingMistSec}, result=${result}`);

    return result;
}

// TODO: confirm validity
const getMistyPeaksEnvSec = (talents: any, castProfile: CastProfile, spellDB: Record<string, any[]>, haste: number): number => {
    if (!hasTalent(talents, "Misty Peaks")) return 0;

    const procDuration = talents["Misty Peaks"].values[1];
    const procChancePerPoint = talents["Misty Peaks"].values[2];
    const procChance = procChancePerPoint * getTalentPoints(talents, "Misty Peaks");

    const remCPM = getSpellEntry(castProfile, "Renewing Mist").cpm;
    const remDuration = spellDB["Renewing Mist"][0].buffDuration;
    const remTickRate = spellDB["Renewing Mist"][0].tickData.tickRate;
    const ticksPerMin = remCPM * (remDuration / (remTickRate / haste));

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

// assuming max group size of 5 for dungeon, 20 for mythic raid.
// do we want to change this away from mythic?
const getGroupSize = (profileKey: MonkProfileKey): number => profileKey.includes("Dungeon") ? 5 : 20;

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
        downtime: 0.15,
        risingMist: {
            remStandard: 1,
            envStandard: 0.9
        },
        gustsOverhealing: 0.4,
        chijiGustsOverhealing: 0.4,
        ancientTeachingsOverhealing: 0.14
    };

    const spellDB = JSON.parse(JSON.stringify(specSpellDB));

    // gust of mists
    ["Renewing Mist", "Enveloping Mist"].forEach(spellName => {
        spellDB[spellName][0].gustsValue = 1;
    });

    // baseline ancient teachings transfer
    [getSelectedKick(castProfile).spell, "Blackout Kick", "Tiger Palm", "Crackling Jade Lightning"].forEach(spellName => {
        spellDB[spellName][0].damageToHeal = 0.25;
    });

    const talents = initialState.talents;
    const talentImport = getSelectedTalentsFromString(monkTalentStrings[profileKey], SPECS.MISTWEAVERMONK);
    applyTalentsFromString(initialState, spellDB, talentImport);

    // must be done after applyTalents to get jft/mf additive transfer rates
    applyEmperorsElixir(talents, spellDB, castProfile);

    return { initialState, localSettings, spellDB, talents };
}

const buildMonkState = (initialState: any, playerData: any, stats: Stats, settings: PlayerSettings) => {
    const state = {
        fightLength: 300,
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

const applyChiProficiency = (talents: any, state: any): void => {
    if (!hasTalent(talents, "Chi Proficiency")) return;

    state.statPercentages.genericHealingMult *= 1 + getTalentPoints(talents, "Chi Proficiency") * 2 / 100;
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
    reportingData.averageRemCount = getAverageRemCount(castProfile, spellDB, localSettings.risingMist.remStandard, reportingData.freeRenewingMistSec);

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
    const freeEnvelopingMistSec = getMistyPeaksEnvSec(talents, castProfile, spellDB, state.statPercentages.haste);
    reportingData.averageEnvCount = getAverageEnvCount(castProfile, spellDB, risingMistRates.envStandard, freeEnvelopingMistSec);
    state.statPercentages.genericHealingMult *= getEnvelopingMistHealAmpMult(talents, reportingData.averageEnvCount, profileKey);

    // extending these durations is a bit dirty by the avg rising mist rate, but their output will reflect most of the uptime
    spellDB["Renewing Mist"][0].buffDuration *= 1 + risingMistRates.remStandard;
    spellDB["Enveloping Mist"][0].buffDuration *= 1 + risingMistRates.envStandard;

    const remCPM = getSpellEntry(castProfile, "Renewing Mist").cpm;
    spellDB["Renewing Mist"][0].buffDuration += reportingData.freeRenewingMistSec / remCPM;

    if (hasTalent(talents, "Save Them All")) {
        // averageRaidHealth 85% default mirrors the Redux settings registry
        // getSetting's 0 fallback would wrongly imply targets are dead lol
        const averageRaidHealth = ("averageRaidHealth" in state.settings ? getSetting(state.settings, "averageRaidHealth") : 85) / 100;
        state.statPercentages.genericHealingMult *= 1 + (talents["Save Them All"].values[0] / 100) * (1 - averageRaidHealth);
    }

    const rwkHealSlice = spellDB["Rushing Wind Kick"][1];
    rwkHealSlice.targets = Math.min(reportingData.averageRemCount + reportingData.averageEnvCount, rwkHealSlice.targets);
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
    // Run healing
    castProfile.forEach(spellProfile => {
        const fullSpell = spellDB[spellProfile.spell];
        const spellName = spellProfile.spell;
        const spellFlags = spellProfile.flags || {};

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
                spellOutput = getSpellThroughput(slice, state.statPercentages, state.spec, state.settings, spellFlags)
            }

            const effectiveCPM = spellProfile.fillerSpell ? 0 : spellProfile.cpm!;

            let totalOutput = (spellOutput * effectiveCPM * (spellProfile.mult ?? 1));

            if (slice.gustsValue) {
                // Spell procs Gust of Mists.
                const masteryHeal = getGustHeal(spellDB, state, localSettings.gustsOverhealing) * slice.gustsValue;

                healingBreakdown["Gust of Mists"] = Math.round((healingBreakdown["Gust of Mists"] || 0) + (masteryHeal * effectiveCPM));

            }
            // Spell specifics
            if (spellName === "Vivify") {
                const invig = getSpellThroughput(spellDB["Invigorating Mists"][0], state.statPercentages, state.spec, state.settings);
                
                healingBreakdown["Invigorating Mists"] = (healingBreakdown["Invigorating Mists"] || 0) + invig * reportingData.averageRemCount * effectiveCPM;
            }
            else if (spellName === "Sheilun's Gift") {
                totalOutput *= localSettings.sheilunsClouds;
            }

            if (spellName === "Vivify" || spellName === "Sheilun's Gift") {
                const zenPulse = getSpellThroughput(spellDB["Zen Pulse"][0], state.statPercentages, state.spec, state.settings);
                healingBreakdown["Zen Pulse"] = (healingBreakdown["Zen Pulse"] || 0) + zenPulse * (spellDB["Zen Pulse"][0].mult ?? 1) * reportingData.averageRemCount * Math.min(reportingData.zenPulsePPM, effectiveCPM);
            }

            if (spellName === "Celestial Conduit") {
                // todo: unity running courage, sotbo, and fotrc (bug!) at 2x value
            }

            if (spellName === "Spiritfont") {
                const chiCocoon = getSpellThroughput(spellDB["Chi Cocoon (Spiritfont)"][0], state.statPercentages, state.spec, state.settings);
                healingBreakdown["Chi Cocoon (Spiritfont)"] = (healingBreakdown["Chi Cocoon (Spiritfont)"] || 0) + chiCocoon;
            }

            if (slice.spellType === "damage") {
                if (spellName === "Blackout Kick") {
                    totalOutput *= 1 + reportingData.averageTeachingsStacks;
                }
                if (slice.damageToHeal) {
                    if (spellName === "Courage of the White Tiger") {
                        healingBreakdown["Courage of the White Tiger"] = (healingBreakdown["Courage of the White Tiger"] || 0) + totalOutput * slice.damageToHeal * 1.3; // ignores armor
                    }
                    else {
                        healingBreakdown["Ancient Teachings"] = (healingBreakdown["Ancient Teachings"] || 0) + totalOutput * slice.damageToHeal * (1 - localSettings.ancientTeachingsOverhealing);
                    }
                }
            }

            if (totalOutput > 0) {
                const label = spellProfile.label || spellName;
                castBreakdown[label] = (castBreakdown[label] ?? 0) + (effectiveCPM);

                if (slice.spellType === "damage") damageBreakdown[label] = (damageBreakdown[label] ?? 0) + (totalOutput);
                else healingBreakdown[label] = (healingBreakdown[label] ?? 0) + (totalOutput);
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
    console.log("Running Monk Set: " + profileKey);

    const { initialState, localSettings, spellDB, talents } = initMonkCastState(castProfile, playerData, settings, profileKey);
    const state = buildMonkState(initialState, playerData, stats, settings);

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

    // Sheilun's Gift
    localSettings.sheilunsClouds = 0; //Math.min(10, (60 / 8 / getSpellEntry(castProfile, "Sheilun's Gift").cpm))
    reportingData.sheilunsClouds = localSettings.sheilunsClouds;

    // Expected Downtime
    reportingData.averageHaste = state.statPercentages.haste; // TODO
    reportingData.timeUsed = getTimeUsed(castProfile, spellDB, reportingData.averageHaste);

    // TotM
    reportingData.averageTeachingsStacks = getAverageTeachingsStacks(talents, castProfile);

    // Rising Mist
    // This section in particular could use more analysis. It's important that Rising Mist scales with haste since it's a key factor in our resets,
    // however modelling getting 5 in a ReM duration is trickier. We also don't want to introduce "fake" breakpoints.
    const risingMistRates = getRisingMistRates(talents, castProfile, spellDB);
    localSettings.risingMist.remStandard = risingMistRates.remStandard;
    localSettings.risingMist.envStandard = risingMistRates.envStandard;

    // Rapid Diffusion
    reportingData.freeRenewingMistSec = getRapidDiffusionRemSec(talents, castProfile, localSettings.risingMist.remStandard);
    reportingData.freeRenewingMistSec += getDancingMistsRemSec(talents, castProfile, spellDB, reportingData.freeRenewingMistSec);

    applyCoverageMultipliers(talents, castProfile, spellDB, state, localSettings, reportingData, risingMistRates, profileKey);

    const sequence = (celestialSequences as Record<string, SequencingFn>)[profileKey];
    if (sequence) {
        sequence(state, spellDB, localSettings, reportingData, healingBreakdown, onUseData, talents);
    }

    runCastLoop(castProfile, spellDB, state, localSettings, reportingData, healingBreakdown, damageBreakdown, castBreakdown);

    const result = compileMonkResult(healingBreakdown, damageBreakdown, castProfile, spellDB, state, reporting);

    console.log(reportingData);

    return result;
}

const conduitCastProfile: CastProfile = [
    { spell: "Celestial Conduit", efficiency: 0.9, },
    { spell: "Courage of the White Tiger", cpm: 4, hastedCPM: true },
    { spell: "Strength of the Black Ox", cpm: 4, hastedCPM: true, } // identical to courage
]

const mohCastProfile: CastProfile = [
    // adjusted by cpm of tft and rsk/rwk
    { spell: "Harmonic Surge", cpm: 0 }
]

const getHeroTreeCastProfile = (playerData: any): CastProfile => {
    if (playerData.heroTree === MONK_HERO_TREES.CONDUIT) return conduitCastProfile;
    if (playerData.heroTree === MONK_HERO_TREES.MOH) return mohCastProfile;
    return [];
}

export function scoreMonkYulonSet(stats: Stats, playerData: any, settings: PlayerSettings = {}, reporting: boolean = false) {
    const castProfile: CastProfile = [
        { spell: "Renewing Mist", efficiency: 0.8, hastedCPM: true },
        { spell: "Enveloping Mist", cpm: 5, hastedCPM: true }, // must be a minimum of sotbo + spiritfont r1, adjusted even more with yu'lon sequencing
        { spell: "Vivify", cpm: 8.5, hastedCPM: true },
        { spell: "Tiger Palm", cpm: 0.05, hastedCPM: true },
        { spell: "Blackout Kick", cpm: 0.1, hastedCPM: true },
        { spell: "Rushing Wind Kick", efficiency: 0.85, hastedCPM: true },

        // cooldowns
        { spell: "Revival", efficiency: 0.9, },
        { spell: "Life Cocoon", efficiency: 0.9, },

        // spells
        { spell: "Spiritfont", cpm: 1, },

        ...getHeroTreeCastProfile(playerData)
    ];
    return runMonkCastProfile(stats, playerData, settings, reporting, castProfile, "Yu'lon");
}

export function scoreMonkChijiSet(stats: Stats, playerData: any, settings: PlayerSettings = {}, reporting: boolean = false) {
    const castProfile: CastProfile = [
        { spell: "Renewing Mist", efficiency: 0.7 },
        { spell: "Enveloping Mist", cpm: 0.1 }, // we could do a model that never casts ever
        //{ spell: "Vivify", cpm: 0, hastedCPM: true },
        { spell: "Tiger Palm", cpm: 7.5, hastedCPM: true },
        { spell: "Blackout Kick", cpm: 6.7, hastedCPM: true },
        { spell: "Rising Sun Kick", cpm: 6.4, hastedCPM: true },
        { spell: "Life Cocoon", efficiency: 0.9, },
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