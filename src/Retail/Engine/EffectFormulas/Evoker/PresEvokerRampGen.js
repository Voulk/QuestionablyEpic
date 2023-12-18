
import { getSpellRaw, runCastSequence } from "./PresEvokerRamps";
import { EVOKERSPELLDB, baseTalents, evokerTalents } from "./PresEvokerSpellDB";
import { evokerDefaultAPL } from "./PresEvokerDefaultAPL";
/**

 */

export const buildEvokerChartData = (stats) => {
    //
    let results = [];

    const activeStats = {
        intellect: 14000,
        haste: 1200,
        crit: 2000,
        mastery: 6500,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    }

    const testSettings = {masteryEfficiency: 1, includeOverheal: "No", reporting: false, advancedReporting: true, t31_2: false};
    let talents = {...evokerTalents};

    const sequences = [
        {cat: "Base Spells", tag: "Spiritbloom R4", seq: ["Spiritbloom"], preBuffs: []},
        {cat: "Base Spells", tag: "Dream Breath R1", seq: ["Dream Breath"], preBuffs: []},
        {cat: "Base Spells", tag: "Emerald Blossom", seq: ["Emerald Blossom"], preBuffs: []},
        {cat: "Base Spells", tag: "Verdant Embrace", seq: ["Verdant Embrace"], preBuffs: []},
        {cat: "Base Spells", tag: "Temporal Anomaly", seq: ["Temporal Anomaly"], preBuffs: []},
        {cat: "Base Spells", tag: "Reversion", seq: ["Reversion"], preBuffs: []},

        {cat: "Base Spells", tag: "Verdant Embrace -> Dream Breath", seq: ["Verdant Embrace", "Dream Breath"], preBuffs: []},
        {cat: "Base Spells", tag: "Verdant Embrace -> Living Flame", seq: ["Verdant Embrace", "Living Flame"], preBuffs: []},

        {cat: "Consumed Echo", tag: "E Spiritbloom", seq: ["Spiritbloom"], preBuffs: ["Echo"]},
        {cat: "Consumed Echo", tag: "E Dream Breath", seq: ["Dream Breath"], preBuffs: ["Echo"]},
        {cat: "Consumed Echo", tag: "E Emerald Blossom", seq: ["Emerald Blossom"], preBuffs: ["Echo"]},
        {cat: "Consumed Echo", tag: "E Verdant Embrace", seq: ["Verdant Embrace"], preBuffs: ["Echo"]},

        {cat: "Lifebind Ramps", tag: "VE -> Spiritbloom", seq: ["Verdant Embrace", "Spiritbloom"], preBuffs: ["Echo 8", "Temporal Compression"]},
        {cat: "Lifebind Ramps", tag: "VE -> Living Flame", seq: ["Verdant Embrace", "Living Flame"], preBuffs: ["Echo 8"]},
        {cat: "Lifebind Ramps", tag: "VE -> Emerald Communion", seq: ["Verdant Embrace", "Emerald Communion"], preBuffs: ["Echo 8"]},

        {cat: "Blossom Auto", tag: "Blossom Auto", seq: ["Rest"], preBuffs: []},
    ]

    sequences.forEach(sequence => {
        const newSeq = sequence.seq;
        
        if (sequence.cat === "Lifebind Ramps") talents = { ...talents, lifebind: { ...talents.lifebind, points: 1 } };
        const apl = sequence.cat.includes("Auto") ? evokerDefaultAPL : [];
        const result = runCastSequence(newSeq, JSON.parse(JSON.stringify(activeStats)), {...testSettings, preBuffs: sequence.preBuffs}, talents, apl);
        const tag = sequence.tag ? sequence.tag : sequence.seq.join(", ");
        const spellData = {id: 0, icon: EVOKERSPELLDB[newSeq[0]][0].spellData.icon || ""};

        if (sequence.cat === "Consumed Echo") {
            // These are awkward since we only want to grab the Echo bit.
            const healingDone = Object.entries(result.healingDone)
                                    .filter(([key]) => key.includes("(Echo)"))
                                    .reduce((sum, [, value]) => sum + value, 0);
            console.log(result);
            results.push({cat: sequence.cat, tag: tag, hps: Math.round(healingDone), hpm: "-", dps: Math.round(result.totalDamage) || "-", spell: spellData})
        }
        else if (sequence.cat === "Lifebind Ramps") {
            const healingDone = Object.entries(result.healingDone)
                                    .filter(([key]) => key.includes("Lifebind"))
                                    .reduce((sum, [, value]) => sum + value, 0);

            results.push({cat: sequence.cat, tag: tag, hps: Math.round(healingDone), hpm: "-", dps: Math.round(result.totalDamage) || "-", spell: spellData})
        }
        else if (sequence.cat.includes("Auto")) {
            console.log(result.advancedReport);
            results.push({cat: sequence.cat, tag: tag, hps: result.totalHealing, hpm: Math.round(100*result.hpm)/100, dps: Math.round(result.totalDamage) || "-", spell: spellData, advancedReport: result.advancedReport})
        }
        else {
            results.push({cat: sequence.cat, tag: tag, hps: result.totalHealing, hpm: Math.round(100*result.hpm)/100, dps: Math.round(result.totalDamage) || "-", spell: spellData})

        }
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



