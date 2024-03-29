


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
        
        {cat: "Base Spells", tag: "Rejuvenation", seq: ["Rejuvenation"], preBuffs: []},
        {cat: "Base Spells", tag: "Wild Growth", seq: ["Wild Growth"], preBuffs: []},
        {cat: "Base Spells", tag: "Lifebloom (1 stack)", seq: ["Lifebloom"], preBuffs: []},
        {cat: "Base Spells", tag: "Regrowth", seq: ["Regrowth"], preBuffs: []},
        {cat: "Base Spells", tag: "Nourish", seq: ["Nourish"], preBuffs: []},
        {cat: "Base Spells", tag: "Healing Touch", seq: ["Healing Touch"], preBuffs: []},
        {cat: "Base Spells", tag: "Swiftmend", seq: ["Swiftmend"], preBuffs: []},


        {cat: "Package", tag: "Swiftmend, WG, Lifebloom, Rejuv filler", seq: [], preBuffs: [], details: {
            "Swiftmend": 4,
            "Lifebloom": 6,
            "Regrowth": 6,
            "Rejuvenation": 15,
            "Wild Growth": 5,
        }}
        //{cat: "Base Spells", tag: "Dream Breath R1", seq: ["Dream Breath"], preBuffs: []},

        //{cat: "APLs", tag: "Blossom Auto", seq: ["Rest"], preBuffs: []},
        //{cat: "APLs", tag: "Reversion Auto", seq: ["Rest"], preBuffs: []},
    ]

    sequences.forEach(sequence => {
        const newSeq = sequence.seq;
        const tag = sequence.tag ? sequence.tag : sequence.seq.join(", ");
        const spellData = {id: 0, icon: CLASSICDRUIDSPELLDB[newSeq[0]] ? CLASSICDRUIDSPELLDB[newSeq[0]][0].spellData.icon : ""};
        const cat = sequence.cat;

        if (cat === "Package") {
            // All auto based.
            Object.keys(sequence.details).forEach(spellName => {
                const value = sequence.details[spellName];
                for (let i = 0; i < value; i++) {
                    newSeq.push(spellName);
                }
            })
            
            results.push(buildChartEntry(sequence, spellData, newSeq, activeStats, testSettings, baseTalents, null, runCastSequence));        }
        else {
            // All sequence based.
            const filterSpell = sequence.cat === "Consumed Echo" ? "Echo)" : sequence.cat === "Lifebind Ramps" ? "Lifebind" : null;
            results.push(buildChartEntry(sequence, spellData, newSeq, activeStats, testSettings, baseTalents, filterSpell, runCastSequence));

            

        };  
    }); 
        


    return results;

}




