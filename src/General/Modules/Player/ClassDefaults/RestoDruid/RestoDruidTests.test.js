
import RestoDruidSpellDB from "./RestoDruidSpellDB.json";
import { runCastSequence } from "General/Modules/Player/ClassDefaults/RestoDruid/RestoDruidRamps"
import { druidTalents } from "./RestoDruidTalents"
import { runAPLSuites, runStatSuites, runStatDifferentialSuite, runTimeSuite, runSuite, runCastProfileSuites } from "General/Modules/Player/ClassDefaults/Generic/RampTestSuite";
import { scoreDruidSet } from "General/Modules/Player/ClassDefaults/RestoDruid/RestoDruidProfile"

// These are basic tests to make sure our coefficients and secondary scaling arrays are all working as expected.

describe("Evang Cast Sequence", () => {
    test("Test APL", () => {
        
        console.log("Testing APL");

        const activeStats = {
            intellect: 2000,
            haste: 500,
            crit: 200,
            mastery: 500,
            versatility: 200,
            stamina: 29000,
            critMult: 2,
        }
    
        /*
        const baseSpells = RestoDruidSpellDB;
        const baseTalents = druidTalents;
        const testSettings = {masteryEfficiency: 0.85, includeOverheal: "No", reporting: true, seqLength: 30};

        const playerData = { spec: "Resto Druid", profileName: "Herald of the Sun AW", spells: baseSpells, settings: testSettings, 
                                talents: {...baseTalents}, stats: activeStats }
        const sequence = ["Rejuvenation", "Rejuvenation", "Rejuvenation", "Regrowth", "Regrowth"]


        const data = runCastSequence(sequence, playerData.stats, playerData.settings, playerData.talents)*/

        const data = scoreDruidSet();

        console.log(data);

        expect(true).toEqual(true);

        
       /* const stats = ['intellect', 'crit', 'mastery', 'haste', 'versatility'];
        const iterations = 1;
        let baseline = 0;
        
        for (let i = 0; i < iterations; i++) {
            baseline += runHolyPaladinCastProfile(playerData).hps;
        }

        baseline = baseline / iterations*/
        
        /*
        const results = {};
        stats.forEach(stat => {
            let statHealing = 0;
            let playerStats = JSON.parse(JSON.stringify(playerData.stats));
            playerStats[stat] = playerStats[stat] + 2400;
            const newPlayerData = {...playerData, stats: playerStats};
            for (let i = 0; i < iterations; i++) {

                statHealing += runHolyPaladinCastProfile(newPlayerData).hps;
                
            }
            results[stat] = statHealing / iterations;

        });
        const weights = {}

        stats.forEach(stat => {
            weights[stat] = Math.round(1000*(results[stat] - baseline) / (results['intellect'] - baseline))/1000;
        });
        console.log(weights); 

        */
        
    })


}); 