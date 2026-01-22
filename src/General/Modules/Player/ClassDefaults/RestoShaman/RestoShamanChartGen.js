
import { getSpellRaw, runCastSequence } from "./RestoShamanRamps";
import restoShamanSpellDB  from "General/Modules/Player/ClassDefaults/RestoShaman/RestoShamanSpellDB.json";
import { shamanTalents } from "General/Modules/Player/ClassDefaults/RestoShaman/RestoShamanTalents";
//import { blossomProfile, reversionProfile } from "./PresEvokerDefaultAPL";
import { runAPLSuites } from "General/Modules/Player/ClassDefaults/Generic/RampTestSuite";
import { buildChartEntry, buildFormulatedChartEntry } from "General/Modules/Player/ClassDefaults/Generic/ChartUtilities";

export const buildShamanChartData = (activeStats) => {
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
    let talents = {...shamanTalents};
    Object.keys(talents).forEach(talentName => {
        if (talents[talentName].heroTree === "Keeper of the Grove") talents[talentName].points = 1;
    })
    let sequences = Object.keys(restoShamanSpellDB).map(spellKey => {
        const spell = restoShamanSpellDB[spellKey][0];
        let catSuffix = ""
        console.log(spellKey);

        if (spell.displayInfo.cat === "damage") {
            catSuffix = "Damage";
        }
        else if (spell.displayInfo.spellName.includes("Ancestor")) {
            catSuffix = "Ancestor";
        }
        else {
            catSuffix = "Healing";
        }
        return {cat: "Base Spells - " + catSuffix, tag: spell.displayInfo.spellName, seq: [spell.displayInfo.spellName], preBuffs: []};
    });

    sequences = sequences.concat([
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
        //{cat: "Ramps", iterations: 100, includeStats: true, tag: "Tree 12x Rej -> SM -> WG -> Flourish -> 10x Reg", seq: ["Incarnation: Tree of Life", "Efflorescence", "Rejuvenation x 12", "Grove Guardians x 3", "Swiftmend", "Wild Growth", "Flourish", "Regrowth x 10"], preBuffs: []},
        //{cat: "Ramps", tag: "6x Rej -> SM -> WG -> 6x Reg", seq: ["Rejuvenation", "Rejuvenation x 5", "Swiftmend", "Wild Growth", "Regrowth x 6"], preBuffs: []},
        
    ])


    sequences.forEach(sequence => {
        let newSeq = sequence.seq;
        const tag = sequence.tag ? sequence.tag : sequence.seq.join(", ");
        const displayInfo = {id: 0, icon: restoShamanSpellDB[newSeq[0]][0].displayInfo.icon || ""};
        const cat = sequence.cat;
        

        if (cat === "APLs") {

        }
        else if (cat.includes("Base Spells")) {
            const fullSpell = restoShamanSpellDB[sequence.seq[0]];
            results.push(buildFormulatedChartEntry(sequence, displayInfo, fullSpell, activeStats, testSettings, {spec: "Restoration Shaman"}, null));
        }
        else {
            // All sequence based.
            const filterSpell = sequence.filterSpell ? sequence.filterSpell : null;
            if (cat === "Ramps") {
                newSeq = expandArray(newSeq);
            }

            results.push(buildChartEntry(sequence, displayInfo, newSeq, activeStats, testSettings, talents, filterSpell, runCastSequence));

            

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

export const buildShamanRamp = (type, applicators, trinkets, haste, playstyle, incTalents) => {
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



