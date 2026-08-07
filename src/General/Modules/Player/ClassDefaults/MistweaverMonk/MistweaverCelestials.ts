import { hasTalent } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getSpellEntry, getCPM } from "../Generic/ProfileUtilities";
import { runSpell, addOutput, getSelectedKick, getGustHeal, getCastTime, getGCD, getGroupSize, getRapidDiffusionRemDuration } from "./MistweaverUtilities";

const YULON_ENVELOPING_CAST_SPEED_PERC = 30;
const YULON_ENVELOPING_COST_MULT = 0.5;

const CELESTIAL_SPELLS: Record<string, string> = {
    "Yu'lon": "Invoke Yu'lon, the Jade Serpent",
    "Chi-Ji": "Invoke Chi-Ji, the Red Crane",
};

const getCelestialEnvelopingCastTime = (talents: any, spellDB: Record<string, any[]>, haste: number): number => {
    const speedMult = hasTalent(talents, "Celestial Harmony") ? 1 - YULON_ENVELOPING_CAST_SPEED_PERC / 100 : 1;

    return Math.max(spellDB["Enveloping Mist"][0].castTime * speedMult / haste, getGCD(haste, speedMult));
}

const getJadeBondEnvelopingSec = (talents: any): number =>
    hasTalent(talents, "Jade Bond") ? talents["Jade Bond"].values[1] / 1000 : 0;

const celestialLabel = (profileKey: string, spellName: string): string => `${spellName} (${profileKey})`;

type SequencingFn = (
    state: any,
    spellDB: any,
    localSettings: any,
    reportingData: Record<string, any>,
    healingBreakdown: Record<string, number>,
    onUseData: any,
    talents: any,
    castProfile: CastProfile,
) => void;

const applyCelestialHarmonyJadeBond = (celestial: Record<string, any>, spellDB: Record<string, any[]>, state: any, localSettings: any, healingBreakdown: Record<string, number>, talents: any, castProfile: CastProfile): void => {
    if (!hasTalent(talents, "Celestial Harmony")) return;

    const cocoon = spellDB["Chi Cocoon"][0];
    addOutput(healingBreakdown, celestialLabel(celestial.profileKey, "Chi Cocoon"), runSpell(state, cocoon) * celestial.cpm);
    castProfile.push({
        spell: "Chi Cocoon",
        cpm: 0,
        label: celestialLabel(celestial.profileKey, "Chi Cocoon"),
    });

    const jadeBondEnvSec = getJadeBondEnvelopingSec(talents);
    if (jadeBondEnvSec) {
        const envHot = {
            ...spellDB["Enveloping Mist"][0],
            buffDuration: jadeBondEnvSec * (1 + localSettings.risingMist.envStandard),
            targets: cocoon.targets,
            label: "Enveloping Mist (Jade Bond)",
        };
        addOutput(healingBreakdown, "Enveloping Mist (Jade Bond)", runSpell(state, envHot) * celestial.cpm);
        castProfile.push({
            spell: "Enveloping Mist",
            cpm: 0,
            label: "Enveloping Mist (Jade Bond)",
        });
    }
}

const CHIJI_GUSTS_PER_CAST = 6;
const JADE_BOND_GUST_MULT = 1.2;

const chijiSequence: SequencingFn = (state, spellDB, localSettings, reportingData, healingBreakdown, onUseData, talents, castProfile) => {
    const celestial = reportingData.chiji;

    applyCelestialHarmonyJadeBond(celestial, spellDB, state, localSettings, healingBreakdown, talents, castProfile);

    const gustSources = ["Blackout Kick", "Rising Sun Kick", "Spinning Crane Kick"];
    const windowGCDs = celestial.duration / getGCD(state.statPercentages.haste);
    const totalGcdCpm = castProfile.reduce((sum, entry) => sum + (spellDB[entry.spell] && !spellDB[entry.spell][0].offGCD ? (entry.cpm ?? 0) : 0), 0);
    const gustCastsInWindow = totalGcdCpm > 0
        ? gustSources.reduce((sum, spellName) => sum + windowGCDs * (getCPM(castProfile, spellName) / totalGcdCpm), 0)
        : 0;
    reportingData.chijiGusts = gustCastsInWindow * CHIJI_GUSTS_PER_CAST * celestial.cpm;

    const jadeBondMult = hasTalent(talents, "Jade Bond") ? 1 + talents["Jade Bond"].values[0] / 100 : 1;
    const gustHeal = getGustHeal(spellDB, state, localSettings.chijiGustsOverhealing);
    addOutput(healingBreakdown, celestialLabel(celestial.profileKey, "Gust of Mists"), gustHeal * reportingData.chijiGusts * jadeBondMult);
    castProfile.push({
        spell: "Gust of Mists",
        cpm: 0,
        label: celestialLabel(celestial.profileKey, "Gust of Mists"),
    });
}

const getCelestialWindowBase = (profileKey: string, spellDB: Record<string, any[]>, state: any) => {
    const celestialSpell = spellDB[CELESTIAL_SPELLS[profileKey]][0];
    const cooldown = celestialSpell.cooldownData.cooldown;
    const duration = celestialSpell.buffDuration;
    const cpm = 60 / cooldown;
    const haste = state.statPercentages.haste;

    return { cooldown, duration, cpm, haste };
}

export const applyChijiWindow = (profileKey: string, spellDB: Record<string, any[]>, state: any, reportingData: Record<string, any>): void => {
    if (profileKey !== "Chi-Ji") return;

    const { cooldown, duration, cpm } = getCelestialWindowBase(profileKey, spellDB, state);

    reportingData.chiji = {
        profileKey,
        duration,
        cooldown,
        cpm,
    };
}

export const applyYulonWindow = (profileKey: string, talents: any, spellDB: Record<string, any[]>, state: any, castProfile: CastProfile, localSettings: any, reportingData: Record<string, any>): void => {
    if (profileKey !== "Yu'lon") return;

    const { cooldown, duration, cpm, haste } = getCelestialWindowBase(profileKey, spellDB, state);

    const envEntry = getSpellEntry(castProfile, "Enveloping Mist");
    const vivifyEntry = getSpellEntry(castProfile, "Vivify");
    const kickEntry = getSelectedKick(castProfile);

    const gcd = getGCD(haste);
    const windowShare = duration / 60;
    const envCastTime = getCelestialEnvelopingCastTime(talents, spellDB, haste);
    const vivifyCastTime = Math.max(spellDB["Vivify"][0].castTime / haste, getGCD(haste));

    const skipped = [envEntry, vivifyEntry, kickEntry];
    const cooldownSec = castProfile.reduce((sum, entry) => {
        if (skipped.includes(entry) || entry.spell === CELESTIAL_SPELLS[profileKey] || !spellDB[entry.spell]) return sum;

        return sum + getCastTime(spellDB[entry.spell][0], haste) * (entry.cpm ?? 0) * windowShare;
    }, 0);

    const kickCdrSec = hasTalent(talents, "Pool of Mists") && hasTalent(talents, "Rapid Diffusion") ? talents["Pool of Mists"].values[2] / 1000 : 0;
    const kickCooldown = spellDB[kickEntry.spell][0].cooldownData.cooldown / haste;

    const openSec = duration - gcd - cooldownSec;
    let envCasts = 0;
    let kickCasts = 0;
    let castableSec = openSec;
    for (let _ = 0; _ < 10; _++) {
        kickCasts = (duration + envCasts * kickCdrSec) / kickCooldown;
        castableSec = openSec - kickCasts * gcd;
        envCasts = castableSec * localSettings.yulonEnvShare / envCastTime;
    }
    const vivifyCasts = castableSec * (1 - localSettings.yulonEnvShare) / vivifyCastTime;

    const displacement = 1 - windowShare * cpm;
    envEntry.cpm *= displacement;

    const bonusKicks = Math.max(kickCasts - kickEntry.cpm * windowShare, 0);

    castProfile.push({
        spell: "Enveloping Mist",
        cpm: envCasts * cpm,
        label: celestialLabel(profileKey, "Enveloping Mist"),
        manaOverride: spellDB["Enveloping Mist"][0].cost * YULON_ENVELOPING_COST_MULT,
        castTimeOverride: envCastTime * haste,
    });
    castProfile.push({
        spell: "Vivify",
        cpm: vivifyCasts * cpm,
        label: celestialLabel(profileKey, "Vivify"),
    });
    castProfile.push({
        spell: kickEntry.spell,
        cpm: bonusKicks * cpm,
        label: celestialLabel(profileKey, kickEntry.spell)
    });

    reportingData.yulon = {
        profileKey,
        duration,
        cooldown,
        cpm,
        castableSec,
        envCastTime,
        envCasts,
        vivifyCasts,
        kickCasts,
        bonusKicks,
        displacement,
    };
}

const yulonSequence: SequencingFn = (state, spellDB, localSettings, reportingData, healingBreakdown, onUseData, talents, castProfile) => {
    const celestial = reportingData.yulon;

    // attempt to create "pockets" of rems via rapid diffusion to capitalize viv off of
    const remPocketSec = (celestial.envCasts + celestial.bonusKicks) * getRapidDiffusionRemDuration(talents) * (1 + localSettings.risingMist.remStandard);
    const windowRemCount = Math.min(reportingData.averageRemCount + remPocketSec / celestial.duration, getGroupSize(celestial.profileKey));

    const windowVivify = castProfile.find(entry => entry.label === celestialLabel(celestial.profileKey, "Vivify"));
    if (windowVivify) windowVivify.flags = { remCount: windowRemCount };
    celestial.windowRemCount = windowRemCount;

    const soothingBreath = spellDB["Soothing Breath"][0];
    const breathChannels = celestial.duration / soothingBreath.buffDuration;
    const soobOutput = runSpell(state, soothingBreath) * breathChannels * celestial.cpm;
    addOutput(healingBreakdown, "Soothing Breath", soobOutput);

    applyCelestialHarmonyJadeBond(celestial, spellDB, state, localSettings, healingBreakdown, talents, castProfile);

    celestial.breathChannels = breathChannels;
}

const celestialSequences = {
    "Chi-Ji": chijiSequence,
    "Yu'lon": yulonSequence,
} satisfies Record<string, SequencingFn>;

export const getCelestialSequence = (profileKey: string): SequencingFn | undefined =>
    (celestialSequences as Record<string, SequencingFn>)[profileKey];
