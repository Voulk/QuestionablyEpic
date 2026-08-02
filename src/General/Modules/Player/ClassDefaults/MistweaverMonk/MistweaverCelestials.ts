import { hasTalent } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { getSpellEntry } from "../Generic/ProfileUtilities";
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

export const applyYulonWindow = (profileKey: string, talents: any, spellDB: Record<string, any[]>, state: any, castProfile: CastProfile, localSettings: any, reportingData: Record<string, any>): void => {
    if (profileKey !== "Yu'lon") return;

    const celestialSpell = spellDB[CELESTIAL_SPELLS[profileKey]][0];
    const cooldown = celestialSpell.cooldownData.cooldown;
    const duration = celestialSpell.buffDuration;
    const cpm = 60 / cooldown;

    const haste = state.statPercentages.haste;

    const envEntry = getSpellEntry(castProfile, "Enveloping Mist");
    const vivifyEntry = getSpellEntry(castProfile, "Vivify");
    const kickEntry = getSelectedKick(castProfile);

    const gcd = getGCD(haste);
    const windowShare = duration / 60;
    const envCastTime = getCelestialEnvelopingCastTime(talents, spellDB, haste);
    const vivifyCastTime = Math.max(spellDB["Vivify"][0].castTime / haste, getGCD(haste));

    // the press pays for its own global below, so it stays out of this
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

    if (hasTalent(talents, "Celestial Harmony")) {
        const cocoon = spellDB["Chi Cocoon"][0];
        addOutput(healingBreakdown, celestialLabel(celestial.profileKey, "Chi Cocoon"), runSpell(state, cocoon) * celestial.cpm);

        const jadeBondEnvSec = getJadeBondEnvelopingSec(talents);
        if (jadeBondEnvSec) {
            const envHot = {
                ...spellDB["Enveloping Mist"][0],
                buffDuration: jadeBondEnvSec * (1 + localSettings.risingMist.envStandard),
                targets: cocoon.targets,
            };
            addOutput(healingBreakdown, "Enveloping Mist (Jade Bond)", runSpell(state, envHot) * celestial.cpm);
        }
    }

    celestial.breathChannels = breathChannels;
}

const celestialSequences = {
    "Chi-Ji": chijiSequence,
    "Yu'lon": yulonSequence,
} satisfies Record<string, SequencingFn>;

export const getCelestialSequence = (profileKey: string): SequencingFn | undefined =>
    (celestialSequences as Record<string, SequencingFn>)[profileKey];
