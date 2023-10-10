
import { getSpellRaw, runCastSequence } from "./PresEvokerRamps";
import { EVOKERSPELLDB, baseTalents, evokerTalents } from "./PresEvokerSpellDB";
/**

 */

export const buildEvokerChartData = (stats) => {
    //
    let results = [];

    const activeStats = {
        intellect: 12000,
        haste: 1200,
        crit: 2000,
        mastery: 6500,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    }

    const testSettings = {masteryEfficiency: 1, includeOverheal: "No", reporting: false, t31_2: false};
    const talents = {...evokerTalents};

    const sequences = [
        {cat: "Base Spells", tag: "Spiritbloom R4", seq: ["Spiritbloom"], preBuffs: []},
        {cat: "Base Spells", tag: "Dream Breath R1", seq: ["Dream Breath"], preBuffs: []},
        {cat: "Base Spells", tag: "Emerald Blossom", seq: ["Emerald Blossom"], preBuffs: []},
        {cat: "Base Spells", tag: "Verdant Embrace", seq: ["Verdant Embrace"], preBuffs: []},
        {cat: "Base Spells", tag: "Temporal Anomaly", seq: ["Temporal Anomaly"], preBuffs: []},
        {cat: "Base Spells", tag: "Reversion", seq: ["Reversion"], preBuffs: []},

        {cat: "Consumed Echo", tag: "E Spiritbloom", seq: ["Spiritbloom"], preBuffs: ["Echo"]},
        {cat: "Consumed Echo", tag: "E Dream Breath", seq: ["Dream Breath"], preBuffs: ["Echo"]},
        {cat: "Consumed Echo", tag: "E Emerald Blossom", seq: ["Emerald Blossom"], preBuffs: ["Echo"]},

    ]

    sequences.forEach(sequence => {
        const newSeq = sequence.seq;
        
        const result = runCastSequence(newSeq, JSON.parse(JSON.stringify(activeStats)), {...testSettings, preBuffs: sequence.preBuffs}, talents);
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



