



import foreverDruidSpellDB from "./Druid/ForeverDruidSpellDB";

import { getTalentedSpellDB, logHeal, getTickCount, getSpellThroughput } from "General/Modules/Player/ClassDefaults/Classic/ClassicUtilities";


import { buildChartEntry, buildFormulatedChartEntryForever } from "General/Modules/Player/ClassDefaults/Generic/ChartUtilities";

// Long term it would be really nice to just push all of this into the CastModel and have you call the chart data instead of having everything in ten places.
export const buildForeverChartData = (activeStats, spec, talents) => {
    if (spec === "Restoration Druid Forever") {
        return buildForeverDruidChartData(activeStats, []);
    }
    /*else if (spec === "Holy Paladin") {
        return buildClassicPaladinChartData(activeStats, paladinTalents);
    }
    else if (spec === "Discipline Priest") {
        return buildClassicDiscChartData(activeStats, classicDiscTalents);
    }
    else if (spec === "Holy Priest") {
        return buildClassicHolyChartData(activeStats, classicHolyTalents);
    }
    else if (spec === "Mistweaver Monk") {
        return buildClassicMonkChartData(activeStats, monkTalents);
    }*/

    else {
        console.error("invalid spec");
    }
}

export const buildForeverDruidChartData = (activeStats) => {
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

    const spellDB = JSON.parse(JSON.stringify(foreverDruidSpellDB));   
    console.log(spellDB);

    const testSettings = {masteryEfficiency: 1, includeOverheal: "Yes", reporting: false, advancedReporting: false, t31_2: false};
    const state = {statBonuses: {}, talents: []};


    //defaultTalents(talents, "default", "Keeper of the Grove");
    //applyTalents(state, spellDB); // missing Stat bonuses


    let sequences = Object.keys(spellDB).map(spellKey => {
        const spell = spellDB[spellKey][0];
        let catSuffix = ""
        //console.log(spellKey);

        if (spell.displayInfo && spell.displayInfo.cat === "damage") {
            catSuffix = "Damage";
        }
        else {
            catSuffix = "Healing";
        }

        return {cat: "Base Spells - " + catSuffix, tag: spellKey, seq: [spellKey], preBuffs: []};
    });

    sequences = sequences.concat([
    ])

    sequences.forEach(sequence => {
        let newSeq = sequence.seq;
        const tag = sequence.tag ? sequence.tag : sequence.seq.join(", ");
        const displayInfo = {id: 0, icon: spellDB[newSeq[0]][0].displayInfo.icon || ""};
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
        else if (cat.includes("Base Spells") || sequence.type === "formulated") {
            const fullSpell = spellDB[sequence.seq[0]];
            console.log(fullSpell);
            results.push(buildFormulatedChartEntryForever(sequence, displayInfo, fullSpell, activeStats, testSettings, {spec: "Restoration Druid Forever"}, null));
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
    console.log(results);
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