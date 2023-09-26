
import { getSpellRaw, runCastSequence } from "./PresEvokerRamps";
import { EVOKERSPELLDB, baseTalents, evokerTalents } from "./PresEvokerSpellDB";
/**

 */

export const buildEvokerChartData = (stats) => {
    //
    let results = [];

    const activeStats = {
        intellect: 12000,
        haste: 2000,
        crit: 2000,
        mastery: 6500,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    }

    const testSettings = {masteryEfficiency: 1, includeOverheal: "No", reporting: false, t31_2: false};
    const talents = {...evokerTalents};

    const sequences = [
        ["Spiritbloom"],
        ["Dream Breath"],
        ["Emerald Blossom"],
        ["Echo", "Spiritbloom"],
        ["Verdant Embrace", "Living Flame"],
        ["Verdant Embrace", "Dream Breath"],
        ["Temporal Anomaly", "Dream Breath"],
        ["Temporal Anomaly", "Spiritbloom"],

    ]

    sequences.forEach(seq => {
        const result = runCastSequence(seq, JSON.parse(JSON.stringify(activeStats)), testSettings, talents)
        results.push({seq: seq, hps: result.totalHealing, hpm: Math.round(100*result.hpm)/100, dps: result.dps || "-"})
    });    

    return results;

}

export const buildEvokerRamp = (type, applicators, trinkets, haste, playstyle, incTalents) => {
    //const talents = ['Power Word: Solace', 'Divine Star']
    const trinketList = []
    const talents = {};
    for (const [key, value] of Object.entries(incTalents)) {
        talents[key] = value.points;
    }

    // A mini-ramp includes two Radiance charges
    if (type === "Mini") {
        return buildMiniRamp(applicators, trinkets, playstyle, talents);
    }
    else {
        console.error("Invalid Ramp");
    }
}



