import { getSpellRaw, runCastSequence } from "./HolyPriestSpellSequence";
import { HOLYPRIESTSPELLDB, baseTalents, } from "./HolyPriestSpellDB";
import { runHolyPriestCastProfile } from "./HolyPriestCastProfile";
import { runAPLSuites, runStatSuites, runStatDifferentialSuite, runTimeSuite, runSuite,  } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampTestSuite";

// These are basic tests to make sure our coefficients and secondary scaling arrays are all working as expected.


describe("Test APL", () => {
    test("Test APL", () => {
        
        console.log("Testing APL");

        const activeStats = {
            intellect: 60000,
            haste: 2400,
            crit: 7000,
            mastery: 7000 + ( 2 * 700), // Shaman buff
            versatility: 7000 + (3 * 780) + 1000, // MotW, Vantus Rune
            stamina: 29000,
            critMult: 2,
        }

    
        const baseSpells = HOLYPRIESTSPELLDB;
        const testSettings = {masteryEfficiency: 0.85, includeOverheal: "No", reporting: true, t31_2: false, seqLength: 200};

        const playerData = { spec: "Holy Priest", spellDB: baseSpells, settings: testSettings, talents: {...baseTalents}, stats: activeStats }

        //runHolyPriestCastProfile(playerData);
        //const data = runAPLSuites(playerData, evokerDefaultAPL, runCastSequence);
        //console.log(data);

        //const data = runAPLSuites(playerData, profile, runCastSequence);
        //console.log(data);
        //const data = runStatDifferentialSuite(playerData, profile, runCastSequence)
        //console.log(data);

        expect(true).toEqual(true);

        const stats = ['intellect', 'crit', 'mastery', 'haste', 'versatility'];
        const iterations = 1000;
        let baseline = 0;
        
        for (let i = 0; i < iterations; i++) {
            baseline += runHolyPriestCastProfile(playerData);
        }

        
        baseline = baseline / iterations
        

        const results = {};
        stats.forEach(stat => {
            let statHealing = 0;
            let playerStats = JSON.parse(JSON.stringify(playerData.stats));
            playerStats[stat] = playerStats[stat] + 2400;
            const newPlayerData = {...playerData, stats: playerStats};
            for (let i = 0; i < iterations; i++) {

                statHealing += runHolyPriestCastProfile(newPlayerData);
                
            }
            results[stat] = statHealing / iterations;

        });
        const weights = {}

        stats.forEach(stat => {
            weights[stat] = Math.round(1000*(results[stat] - baseline) / (results['intellect'] - baseline))/1000;
        });
        console.log(weights); 
      
         
        console.log(baseline / 60);
        //return weights;
    })

});
