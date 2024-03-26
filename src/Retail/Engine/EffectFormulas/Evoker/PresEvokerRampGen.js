
import { getSpellRaw, runCastSequence } from "./PresEvokerRamps";
import { EVOKERSPELLDB, baseTalents, evokerTalents } from "./PresEvokerSpellDB";
import { blossomProfile, reversionProfile } from "./PresEvokerDefaultAPL";
import { runAPLSuites } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampTestSuite";
/**

 */

export const buildEvokerChartData = (stats) => {
    //
    let results = [];

    const activeStats = {
        intellect: 14000,
        haste: 1200,
        crit: 5500,
        mastery: 6700,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    }

    const testSettings = {masteryEfficiency: 1, includeOverheal: "Yes", reporting: false, advancedReporting: true, t31_2: false};
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
        {cat: "Consumed Echo", tag: "E Reversion", seq: ["Reversion"], preBuffs: ["Echo"]},

        {cat: "Lifebind Ramps", tag: "VE -> Spiritbloom", seq: ["Verdant Embrace", "Spiritbloom"], preBuffs: ["Echo 8", "Temporal Compression"]},
        {cat: "Lifebind Ramps", tag: "VE -> Living Flame", seq: ["Verdant Embrace", "Living Flame"], preBuffs: ["Echo 8"]},
        {cat: "Lifebind Ramps", tag: "VE -> Emerald Communion", seq: ["Verdant Embrace", "Emerald Communion"], preBuffs: ["Echo 8"]},

        //{cat: "APLs", tag: "Blossom Auto", seq: ["Rest"], preBuffs: []},
        {cat: "APLs", tag: "Reversion Auto", seq: ["Rest"], preBuffs: []},
    ]

    sequences.forEach(sequence => {
        const newSeq = sequence.seq;
        const tag = sequence.tag ? sequence.tag : sequence.seq.join(", ");
        const spellData = {id: 0, icon: EVOKERSPELLDB[newSeq[0]][0].spellData.icon || ""};
        const cat = sequence.cat;

        if (cat === "APLs") {
            // All auto based.
            const profile = sequence.tag.includes("Blossom Auto") ? blossomProfile : sequence.tag === "Reversion Auto" ? reversionProfile : {};
            const newTalents = JSON.parse(JSON.stringify(evokerTalents));
            profile.talents.forEach(talentName => {
                newTalents[talentName].points = newTalents[talentName].maxPoints;
            })

            const playerData = { spec: "Preservation Evoker", baseSpells: [], settings: testSettings, talents: newTalents, stats: profile.defaultStats }

            
            const result = runAPLSuites(playerData, profile, runCastSequence)
            const oneIteration = runCastSequence(newSeq, JSON.parse(JSON.stringify(profile.defaultStats)), {...testSettings, reporting: true}, talents, profile.apl);
            

            console.log(oneIteration);
            
            results.push({cat: sequence.cat, tag: tag, hps: result.avgHPS, hpm: Math.round(100*result.avgHPM)/100, dps: Math.round(0) || "-", spell: spellData, advancedReport: result.advancedReport})
        }
        else {
            // All sequence based.
            if (sequence.cat === "Lifebind Ramps") talents = { ...talents, lifebind: { ...talents.lifebind, points: 1 } };
            const result = runCastSequence(newSeq, JSON.parse(JSON.stringify(activeStats)), {...testSettings, preBuffs: sequence.preBuffs}, talents);

    
            if (sequence.cat === "Consumed Echo") {
                // These are awkward since we only want to grab the Echo bit.
                const healingDone = Object.entries(result.healingDone)
                                        .filter(([key]) => key.includes("(Echo)") || key.includes("(HoT - Echo)"))
                                        .reduce((sum, [, value]) => sum + value, 0);
                //console.log(result);
                results.push({cat: sequence.cat, tag: tag, hps: Math.round(healingDone), hpm: "-", dps: Math.round(result.totalDamage) || "-", spell: spellData})
            }
            else if (sequence.cat === "Lifebind Ramps") {
                const healingDone = Object.entries(result.healingDone)
                                        .filter(([key]) => key.includes("Lifebind"))
                                        .reduce((sum, [, value]) => sum + value, 0);
    
                results.push({cat: sequence.cat, tag: tag, hps: Math.round(healingDone), hpm: "-", dps: Math.round(result.totalDamage) || "-", spell: spellData})
            }
            else {
                results.push({cat: sequence.cat, tag: tag, hps: result.totalHealing, hpm: Math.round(100*result.hpm)/100, dps: Math.round(result.totalDamage) || "-", spell: spellData})
    
            }
        };  
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



