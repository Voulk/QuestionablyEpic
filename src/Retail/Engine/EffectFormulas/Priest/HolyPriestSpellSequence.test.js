import { getSpellRaw, runCastSequence } from "./HolyPriestSpellSequence";
import { HOLYPRIESTSPELLDB, baseTalents, runHolyPriestCastProfile} from "./HolyPriestSpellDB";
import { runAPLSuites, runStatSuites, runStatDifferentialSuite, runTimeSuite, runSuite,  } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampTestSuite";

// These are basic tests to make sure our coefficients and secondary scaling arrays are all working as expected.


describe("Test APL", () => {
    test("Test APL", () => {
        
        console.log("Testing APL");

        const activeStats = {
            intellect: 60000,
            haste: 2000 + 100,
            crit: 5400,
            mastery: 6700,
            versatility: 2000 + 300,
            stamina: 29000,
            critMult: 2,
        }

    
        const baseSpells = HOLYPRIESTSPELLDB;
        const testSettings = {masteryEfficiency: 0.85, includeOverheal: "No", reporting: true, t31_2: false, seqLength: 200};

        const playerData = { spec: "Holy Priest", spellDB: baseSpells, settings: testSettings, talents: {...baseTalents}, stats: activeStats }

        runHolyPriestCastProfile(playerData);
        //const data = runAPLSuites(playerData, evokerDefaultAPL, runCastSequence);
        //console.log(data);

        //const data = runAPLSuites(playerData, profile, runCastSequence);
        //console.log(data);
        //const data = runStatDifferentialSuite(playerData, profile, runCastSequence)
        //console.log(data);

        expect(true).toEqual(true);
    })

});
