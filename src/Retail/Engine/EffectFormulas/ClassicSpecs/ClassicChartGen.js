


import { getSpellRaw, runCastSequence } from "./ClassicRamps";
import { CLASSICDRUIDSPELLDB, druidTalents } from "./ClassicDruidSpellDB";
import { CLASSICPALADINSPELLDB, paladinTalents } from "./ClassicPaladinSpellDB";
//import { blossomProfile, reversionProfile } from "./PresEvokerDefaultAPL";
import { runAPLSuites } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampTestSuite";
import { buildChartEntry } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ChartUtilities";
/**

 */



export const buildClassicChartData = (activeStats, spec) => {
    if (spec === "Restoration Druid") {
        return buildClassicDruidChartData(activeStats, druidTalents);
    }
    else if (spec === "Holy Paladin") {
        return buildClassicPaladinChartData(activeStats, paladinTalents);
    }

    else {
        console.error("invalid spec");
    }
}

export const buildClassicPaladinChartData = (activeStats, baseTalents) => {
    //
    let results = [];

    const testSettings = {masteryEfficiency: 1, includeOverheal: "Yes", reporting: false, advancedReporting: false, spec: "Holy Paladin"};

    const sequences = [
        {cat: "Base Spells", tag: "Holy Shock", seq: ["Holy Shock"], preBuffs: ["Judgements of the Pure"]},
        {cat: "Base Spells", tag: "Holy Light", seq: ["Holy Light"], preBuffs: ["Judgements of the Pure"]},
        {cat: "Base Spells", tag: "Flash of Light", seq: ["Flash of Light"], preBuffs: ["Judgements of the Pure"]},
        {cat: "Base Spells", tag: "Holy Radiance", seq: ["Holy Radiance"], preBuffs: ["Judgements of the Pure"]},

        {cat: "Spenders", tag: "Light of Dawn", seq: ["Light of Dawn"], preBuffs: ["Judgements of the Pure"]},
        {cat: "Spenders", tag: "Word of Glory", seq: ["Word of Glory"], preBuffs: ["Judgements of the Pure"]},
/*
        {cat: "Package", tag: "Swiftmend, WG, Lifebloom, Rejuv filler", seq: [], preBuffs: [], details: {
            "Swiftmend": 4,
            "Lifebloom": 6,
            "Regrowth": 6,
            "Rejuvenation": 15,
            "Wild Growth": 5,
        }}*/

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

export const buildClassicDruidChartData = (activeStats, baseTalents) => {
    //
    let results = [];

    const testSettings = {masteryEfficiency: 1, includeOverheal: "Yes", reporting: false, advancedReporting: false, spec: "Restoration Druid"};

    const sequences = [
        
        {cat: "Base Spells", tag: "Rejuvenation", seq: ["Rejuvenation"], preBuffs: []},
        {cat: "Base Spells", tag: "Wild Growth", seq: ["Wild Growth"], preBuffs: []},
        {cat: "Base Spells", tag: "Lifebloom (1 stack)", seq: ["Lifebloom"], preBuffs: []},
        {cat: "Base Spells", tag: "Lifebloom (3 stack rolling)", seq: ["Lifebloom"], preBuffs: []},
        {cat: "Base Spells", tag: "Regrowth", seq: ["Regrowth"], preBuffs: []},
        {cat: "Base Spells", tag: "Nourish", seq: ["Nourish"], preBuffs: []},
        {cat: "Base Spells", tag: "Healing Touch", seq: ["Healing Touch"], preBuffs: []},
        {cat: "Base Spells", tag: "Swiftmend", seq: ["Swiftmend"], preBuffs: []},

        {cat: "In Tree of Life", tag: "Lifebloom", seq: ["Lifebloom"], preBuffs: ["Tree of Life"]},
        {cat: "In Tree of Life", tag: "Wild Growth", seq: ["Wild Growth"], preBuffs: ["Tree of Life"]},
        {cat: "In Tree of Life", tag: "Regrowth", seq: ["Regrowth"], preBuffs: ["Tree of Life"]},

        {cat: "DPS Spells", tag: "Wrath", seq: ["Wrath"], preBuffs: []},


        {cat: "Package", tag: "Swiftmend, WG, Lifebloom, Rejuv filler", seq: [], preBuffs: [], details: {
            "Swiftmend": 4,
            "Lifebloom": 6,
            "Regrowth": 6,
            "Rejuvenation": 15,
            "Wild Growth": 5,
        }}

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
            const filterSpell = sequence.tag === "Lifebloom (3 stack rolling)" ? "Lifebloom (HoT)" : null;
            const result = buildChartEntry(sequence, spellData, newSeq, activeStats, testSettings, baseTalents, filterSpell, runCastSequence);

            if (sequence.tag === "Lifebloom (3 stack rolling)") {
                result.hps *= 3; 
                result.hpm = Math.round(result.hpm * 3);
                result.hpct *= 3;
            }
            results.push(result);

            

        };  
    }); 

    return results;
}



