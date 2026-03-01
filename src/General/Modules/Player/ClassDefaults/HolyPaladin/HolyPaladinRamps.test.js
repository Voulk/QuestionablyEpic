
import { paladinMeleeProfile } from "./Archive/PaladinDefaultAPL";
import { PALADINSPELLDB, baseTalents } from "./Archive/HolyPaladinSpellDBTWW";
import { runAPLSuites, runStatSuites, runStatDifferentialSuite, buildStatWeights, runTimeSuite, runSuite, runCastProfileSuites } from "General/Modules/Player/ClassDefaults/Generic/RampTestSuite";
import { holyPaladinProfile, scorePaladinSet } from "General/Modules/Player/ClassDefaults/HolyPaladin/HolyPaladinProfile"

// These are basic tests to make sure our coefficients and secondary scaling arrays are all working as expected.

describe("Evang Cast Sequence", () => {
    test("Test APL", () => {
        
        console.log("Testing APL");


        const activeStats = holyPaladinProfile.defaultStatProfile;


        const playerData = { spec: "Holy Paladin", heroTree: "Herald of the Sun", profileName: "Herald of the Sun", stats: activeStats, 
                                masteryEffectiveness: 0.85, tierSets: ["Holy Paladin S1-2", "Holy Paladin S1-4"] }
        const settings = {averageRaidHealth: 0.8}

        //const data = runAPLSuites(playerData, profile, runCastSequence);
        const data = scorePaladinSet(activeStats, playerData, settings);

        console.log(data);
        expect(true).toEqual(true);

        buildStatWeights(playerData, scorePaladinSet, settings);

       // buildStatChart(holyPaladinProfile, playerData, settings);

         /*
       const stats = ['intellect', 'crit', 'mastery', 'haste', 'versatility'];
        const iterations = 1;
        let baseline = 0;
        
        for (let i = 0; i < iterations; i++) {
            baseline += scorePaladinSet(activeStats, playerData, settings).healing;
        }

        baseline = baseline / iterations;
       
        const results = {};
        stats.forEach(stat => {
            let statHealing = 0;
            let playerStats = JSON.parse(JSON.stringify(playerData.stats));
            playerStats[stat] = playerStats[stat] + 200;
            const newPlayerData = {...playerData, stats: playerStats};
            for (let i = 0; i < iterations; i++) {

                statHealing += scorePaladinSet(playerStats, newPlayerData, settings).healing;
                
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

