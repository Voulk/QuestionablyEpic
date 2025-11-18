
import { getSpellRaw, runCastSequence } from "./RestoDruidRamps";
import { DRUIDSPELLDB as SPELLDB, baseTalents, druidTalents } from "./RestoDruidSpellDBTWW";
//import { blossomProfile, reversionProfile } from "./PresEvokerDefaultAPL";
import { runAPLSuites } from "General/Modules/Player/ClassDefaults/Generic/RampTestSuite";
import { buildChartEntry } from "General/Modules/Player/ClassDefaults/Generic/ChartUtilities";
/**

 */

export const builDruidAPLData = (stats, talents) => {

}



export const buildDruidChartData = (activeStats) => {
    //
    let results = [];

    /*const activeStats = {
        intellect: 14000,
        haste: 1200,
        crit: 5500,
        mastery: 6700,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    }*/

    const testSettings = {masteryEfficiency: 1, includeOverheal: "Yes", reporting: false, advancedReporting: false, t31_2: false};
    let talents = {...druidTalents};
    Object.keys(talents).forEach(talentName => {
        if (talents[talentName].heroTree === "Keeper of the Grove") talents[talentName].points = 1;
    })
    const sequences = [
        /*
        {cat: "Base Spells", tag: "Wild Growth", seq: ["Wild Growth"], preBuffs: []},
        
        {cat: "Base Spells", tag: "Rejuvenation", seq: ["Rejuvenation"], preBuffs: []},
        {cat: "Base Spells", tag: "Cenarion Ward", seq: ["Cenarion Ward"], preBuffs: []},
        {cat: "Base Spells", tag: "Regrowth", seq: ["Regrowth"], preBuffs: []},
        
        {cat: "Base Spells", tag: "Efflorescence", seq: ["Efflorescence"], preBuffs: []},
        
        {cat: "Base Spells", tag: "Swiftmend", seq: ["Swiftmend"], preBuffs: []},
        {cat: "Base Spells", tag: "Grove Guardians", seq: ["Grove Guardians"], preBuffs: []},
        
        {cat: "Soul of the Forest", tag: "Wild Growth", seq: ["Wild Growth"], preBuffs: ["Soul of the Forest"]},
        {cat: "Soul of the Forest", tag: "Rejuvenation", seq: ["Rejuvenation"], preBuffs: ["Soul of the Forest"]},
        {cat: "Soul of the Forest", tag: "Regrowth", seq: ["Regrowth"], preBuffs: ["Soul of the Forest"]},
        
        {cat: "Tree of Life", tag: "Wild Growth", seq: ["Wild Growth"], preBuffs: ["Incarnation: Tree of Life"]},
        {cat: "Tree of Life", tag: "Rejuvenation", seq: ["Rejuvenation"], preBuffs: ["Incarnation: Tree of Life"]},
        {cat: "Tree of Life", tag: "Regrowth", seq: ["Regrowth"], preBuffs: ["Incarnation: Tree of Life"]},
        */
        {cat: "Ramps", iterations: 100, includeStats: true, tag: "Tree 12x Rej -> SM -> WG -> Flourish -> 10x Reg", seq: ["Incarnation: Tree of Life", "Efflorescence", "Rejuvenation x 12", "Grove Guardians x 3", "Swiftmend", "Wild Growth", "Flourish", "Regrowth x 10"], preBuffs: []},
        {cat: "Ramps", tag: "6x Rej -> SM -> WG -> 6x Reg", seq: ["Rejuvenation", "Rejuvenation x 5", "Swiftmend", "Wild Growth", "Regrowth x 6"], preBuffs: []},
        
        //{cat: "APLs", tag: "Blossom Auto", seq: ["Rest"], preBuffs: []},
        //{cat: "APLs", tag: "Reversion Auto", seq: ["Rest"], preBuffs: []},
    ]

    sequences.forEach(sequence => {
        let newSeq = sequence.seq;
        const tag = sequence.tag ? sequence.tag : sequence.seq.join(", ");
        const spellData = {id: 0, icon: SPELLDB[newSeq[0]][0].spellData.icon || ""};
        const cat = sequence.cat;

        if (cat === "APLs") {
            // All auto based.
            /*
            const profile = sequence.tag.includes("Blossom Auto") ? blossomProfile : sequence.tag === "Reversion Auto" ? reversionProfile : {};
            const newTalents = JSON.parse(JSON.stringify(evokerTalents));
            profile.talents.forEach(talentName => {
                newTalents[talentName].points = newTalents[talentName].maxPoints;
            })

            const playerData = { spec: "Preservation Evoker", baseSpells: [], settings: testSettings, talents: newTalents, stats: profile.defaultStats }

            
            const result = runAPLSuites(playerData, profile, runCastSequence)
            const oneIteration = runCastSequence(newSeq, JSON.parse(JSON.stringify(profile.defaultStats)), {...testSettings, reporting: true}, talents, profile.apl);
            
            
            results.push({cat: sequence.cat, tag: tag, hps: result.avgHPS, hpm: Math.round(100*result.avgHPM)/100, dps: Math.round(0) || "-", spell: spellData, advancedReport: result.advancedReport})
        */
            }
        else {
            // All sequence based.
            const filterSpell = sequence.filterSpell ? sequence.filterSpell : null;
            if (cat === "Ramps") {
                newSeq = expandArray(newSeq);
            }

            results.push(buildChartEntry(sequence, spellData, newSeq, activeStats, testSettings, talents, filterSpell, runCastSequence));

            

        };  
    }); 
        


    return results;

}

function expandArray(arr) {
    let expandedArray = [];
    arr.forEach(item => {
        if (item.includes(' x ')) {
            let [word, count] = item.split(' x ');
            for (let i = 0; i < parseInt(count); i++) {
                expandedArray.push(word);
            }
        } else {
            expandedArray.push(item);
        }
    });
    return expandedArray;
}

export const buildDruidRamp = (type, applicators, trinkets, haste, playstyle, incTalents) => {
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



