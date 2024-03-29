


import { getSpellRaw, runCastSequence } from "./ClassicRamps";
import { CLASSICDRUIDSPELLDB, druidTalents } from "./ClassicDruidSpellDB";
//import { blossomProfile, reversionProfile } from "./PresEvokerDefaultAPL";
import { runAPLSuites } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampTestSuite";
import { buildChartEntry } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ChartUtilities";
/**

 */



export const buildClassicChartData = (activeStats, spec) => {
    if (spec === "Restoration Druid") {
        return buildClassicDruidChartData(activeStats, druidTalents);
    }

    else {
        console.error("invalid spec");
    }
}

export const buildClassicDruidChartData = (activeStats, baseTalents) => {
    //
    let results = [];

    const testSettings = {masteryEfficiency: 1, includeOverheal: "Yes", reporting: false, advancedReporting: false};

    const sequences = [
        {cat: "Base Spells", tag: "Nourish", seq: ["Nourish"], preBuffs: []},
        {cat: "Base Spells", tag: "Rejuvenation", seq: ["Rejuvenation"], preBuffs: []},
        {cat: "Base Spells", tag: "Regrowth", seq: ["Regrowth"], preBuffs: []},
        {cat: "Base Spells", tag: "Healing Touch", seq: ["Healing Touch"], preBuffs: []},
        //{cat: "Base Spells", tag: "Dream Breath R1", seq: ["Dream Breath"], preBuffs: []},

        //{cat: "APLs", tag: "Blossom Auto", seq: ["Rest"], preBuffs: []},
        //{cat: "APLs", tag: "Reversion Auto", seq: ["Rest"], preBuffs: []},
    ]

    sequences.forEach(sequence => {
        const newSeq = sequence.seq;
        const tag = sequence.tag ? sequence.tag : sequence.seq.join(", ");
        const spellData = {id: 0, icon: CLASSICDRUIDSPELLDB[newSeq[0]][0].spellData.icon || ""};
        const cat = sequence.cat;

        if (cat === "APLs") {
            // All auto based.
            const profile = sequence.tag.includes("Blossom Auto") ? blossomProfile : sequence.tag === "Reversion Auto" ? reversionProfile : {};
            const newTalents = JSON.parse(JSON.stringify(baseTalents));
            profile.talents.forEach(talentName => {
                newTalents[talentName].points = newTalents[talentName].maxPoints;
            })

            const playerData = { spec: "Preservation Evoker", baseSpells: [], settings: testSettings, talents: newTalents, stats: profile.defaultStats }

            
            const result = runAPLSuites(playerData, profile, runCastSequence)
            const oneIteration = runCastSequence(newSeq, JSON.parse(JSON.stringify(profile.defaultStats)), {...testSettings, reporting: true}, baseTalents, profile.apl);
            
            
            results.push({cat: sequence.cat, tag: tag, hps: result.avgHPS, hpm: Math.round(100*result.avgHPM)/100, dps: Math.round(0) || "-", spell: spellData, advancedReport: result.advancedReport})
        }
        else {
            // All sequence based.
            const filterSpell = sequence.cat === "Consumed Echo" ? "Echo)" : sequence.cat === "Lifebind Ramps" ? "Lifebind" : null;
            results.push(buildChartEntry(sequence, spellData, newSeq, activeStats, testSettings, baseTalents, filterSpell, runCastSequence));

            

        };  
    }); 
        


    return results;

}




