
//import { getSpellRaw, runCastSequence } from "./RestoDruidRamps";
import { monkTalents as specTalents, defaultTalents } from "./MistweaverMonkTalents";
import  spellDB from "./MistweaverMonkSpellDB.json";
//import { blossomProfile, reversionProfile } from "./PresEvokerDefaultAPL";
import { runAPLSuites } from "General/Modules/Player/ClassDefaults/Generic/RampTestSuite";
import { buildChartEntry, buildFormulatedChartEntry, getSpellIcon } from "General/Modules/Player/ClassDefaults/Generic/ChartUtilities";
import { applyTalents } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";
/**

 */



export const buildMonkChartData = (activeStats: Stats) => {
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
    let talents = {...specTalents};
    const state = {statBonuses: {}, heroTree: "Conduit of the Celestials", talents: talents};
    Object.keys(talents).forEach(talentName => {
        if (talents[talentName].heroTree === "Conduit of the Celestials") talents[talentName].points = 1;
    })

    defaultTalents(talents, "default", "Conduit of the Celestials");
    applyTalents(state, spellDB); // missing Stat bonuses

    let sequences = Object.keys(spellDB).map((spellKey : string) => {
        const spell: SpellData = spellDB[spellKey][0];
        let catSuffix = ""
        //console.log(spellKey);

        if (spell.displayInfo.cat === "damage") {
            catSuffix = "Damage";
        }
        else {
            catSuffix = "Healing";
        }
        return {cat: "Base Spells - " + catSuffix, tag: spell.displayInfo.spellName, seq: [spell.displayInfo.spellName], preBuffs: []};
    });

    sequences = sequences.concat([

    ])

    sequences.forEach(sequence => {
        let newSeq = sequence.seq;
        const tag = sequence.tag ? sequence.tag : sequence.seq.join(", ");
        const leadSpell: string = newSeq[0]
        const displayInfo = {id: 0, icon: getSpellIcon(spellDB[leadSpell]) || ""};
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
            
            
            results.push({cat: sequence.cat, tag: tag, hps: result.avgHPS, hpm: Math.round(100*result.avgHPM)/100, dps: Math.round(0) || "-", spell: displayInfo, advancedReport: result.advancedReport})
        */
            }
        else if (cat.includes("Base Spells")) {
            const fullSpell = spellDB[leadSpell];
            results.push(buildFormulatedChartEntry(sequence, displayInfo, fullSpell, activeStats, testSettings, {spec: "Mistweaver Monk"}, null));
        }
        else {
            // All sequence based.
            //const filterSpell = sequence.filterSpell ? sequence.filterSpell : null;
            if (cat === "Ramps") {
                newSeq = expandArray(newSeq);
            }

            //results.push(buildChartEntry(sequence, displayInfo, newSeq, activeStats, testSettings, talents, filterSpell, null));

            

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





