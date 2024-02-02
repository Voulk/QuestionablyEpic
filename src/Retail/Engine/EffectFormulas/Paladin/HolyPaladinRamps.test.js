import { allRamps, allRampsHealing } from "./HolyPaladinRampUtilities";
import { getSpellRaw, runCastSequence } from "./HolyPaladinRamps";
import { genStatWeights } from './HolyPaladinUtilities';
import { buildRamp } from "./HolyPaladinRampGen";
import { PALADINSPELLDB, baseTalents } from "./HolyPaladinSpellDB";


// These are basic tests to make sure our coefficients and secondary scaling arrays are all working as expected.

/*
describe("Test Base Spells", () => {
    const errorMargin = 1.1; // There's often some blizzard rounding hijinx in spells. If our formulas are within 1 (a fraction of a percent) then we are likely calculating it correctly.
    const activeStats = {
            intellect: 1974,
            haste: 869,
            crit: 1000,
            mastery: 451,
            versatility: 528,
            stamina: 1900,
    }
    const critMult = 1.05 + activeStats.crit / 35 / 100; 
    test("Smite", () => {
        const spell = DISCSPELLS['Smite'][0];

        const damage = getSpellRaw(spell, activeStats);

        //expect(Math.round(damage)).toEqual(Math.round(1110*critMult));
    });
    test("Mind Blast", () => {
        const spell = DISCSPELLS['Mind Blast'][0];
        expect(Math.abs(getSpellRaw(spell, activeStats) - 1666*critMult)).toBeLessThan(3);
    });
    test("Solace", () => {
        const spell = DISCSPELLS['Power Word: Solace'][0];

        const damage = getSpellRaw(spell, activeStats);

        expect(Math.abs(damage - 1680*critMult)).toBeLessThan(errorMargin);
    });
    test("Schism", () => {
        const spell = DISCSPELLS['Schism'][0];

        const damage = getSpellRaw(spell, activeStats);

        expect(Math.abs(damage - 3150*critMult)).toBeLessThan(errorMargin);
    });
    test("Power Word: Radiance", () => {
        const spell = DISCSPELLS['Power Word: Radiance'][0];

        const healing = getSpellRaw(spell, activeStats);

        expect(Math.abs(healing - 2347*critMult)).toBeLessThan(errorMargin);
    });
    test("Power Word: Shield", () => {
        const spell = DISCSPELLS['Power Word: Shield'][0];

        const healing = getSpellRaw(spell, activeStats);

        expect(Math.abs(healing - 3687*critMult)).toBeLessThan(errorMargin);
    });

    // TODO: test more spells.
});
*/
describe("Evang Cast Sequence", () => {
    //const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    /*player.activeStats = {
            intellect: 1974,
            haste: 869,
            crit: 445,
            mastery: 451,
            versatility: 528,
            stamina: 1900,
    } */
    const activeStats = {
        intellect: 11400 * 1.05 * 1.04, // Arcane int + Seal of Might
        haste: 3215,
        crit: 4140,
        mastery: 3283,
        versatility: 2762 + (3 * 205), // MotW
        stamina: 0,
}
/* Old Stats
        haste: 5200,
        crit: 3800,
        mastery: 2800,
        versatility: 1600 + (3 * 205), // MotW
        */
    
    // Old Sequences
    const talents = baseTalents;

    const print = (name, base, healing) => {
        let percInc = Math.round(10000*(healing / base - 1))/100;
        console.log(name + ": " + healing + " (+" + percInc + "%)")
    }

    const printReport = (report) => {
        const healing = report.healingDone;
        let healingOrd = []
        const sorted = Object.entries(healing)
            .sort((a, b) => a[1] - b[1])
            .reverse()
            .reduce((a, c) => (a[c[0]] = c[1], a), {})

        Object.keys(sorted).forEach(key => {
            healingOrd.push(key + ": " + Math.round(sorted[key]) + " (" + Math.round(sorted[key] / report.totalHealing * 10000) / 100 + "%)") ;
        });
        console.log(report);
        //console.log("Healing Ordered: " + healingOrd + "\nHPS: " + Math.round(report.hps) + ". HPM: " + Math.round(100 * report.hpm) / 100);
        console.log(healingOrd);
        console.log("HPS: " + Math.round(report.hps) + ". HPM: " + Math.round(100 * report.hpm) / 100);
        
    }

    const seq = ["Light of Dawn", "Holy Shock", "Rest"] 

    const evalTalent = (talents, talentName, incStats, settings) => {
        let healing = 0;
        const prevPoints = talents[talentName].points;
        talents[talentName].points = talents[talentName].maxPoints;
        const iterations = 5000;
        for (let i = 0; i < iterations; i++) {
            const stats = JSON.parse(JSON.stringify(incStats));
            const newBaseline = runCastSequence(seq, stats, settings, talents);
            healing += newBaseline.hps;
        }
        talents[talentName].points = prevPoints;
        //console.log(healing);
        return healing / iterations;

    }

    const evalAllTalents = (baselineScore, talents, stats, settings) => {
        const talentScores = {};
        Object.keys(talents).forEach(talentName => {
            const newTalent = evalTalent(talents, talentName, stats, settings);
            talentScores[talentName] = Math.round((newTalent - baselineScore) / baselineScore * 10000) / 100;
        })

        //console.log(talentScores);
        const sorted = Object.entries(talentScores)
        .sort((a, b) => a[1] - b[1])
        .reverse()
        .reduce((a, c) => (a[c[0]] = c[1], a), {})

        console.log(sorted);
    }

    const evalTalentStrings = (talentArr, incTalents, incStats, settings, baselineScore, name) => {
        const talents = deepCopyFunction(incTalents);
        
        Object.keys(talents).forEach(talentName => {
            const talent = talents[talentName]
            if (talentArr.includes(talentName)) {
                talent.points = talent.maxPoints;
            }
            
        })
        //console.log(talents)

        let healing = 0;
        let hpm = 0;
        const iterations = 3000;
        for (let i = 0; i < iterations; i++) {
            const stats = JSON.parse(JSON.stringify(incStats));
            const newBaseline = runCastSequence(seq, stats, settings, talents);
            healing += newBaseline.hps;
            hpm += newBaseline.hps / (newBaseline.manaSpent / newBaseline.t);
        }

        const diff = Math.round(((healing / iterations) - baselineScore) / baselineScore * 10000) / 100;
        const hpmNumber = "HPM: " + Math.round(100 * hpm / iterations) / 100;

        return name + ": +" + diff + "% (" + Math.round(healing / iterations) + ") HPS. " + hpmNumber;

    }

    test("Test Stuff", () => {

        //const baseline = allRamps(evangSeq, fiendSeq, activeStats, {"playstyle": "Venthyr Evangelism", "Power of the Dark Side": true, true);
        /*const build1 = ["lightsHammer", "commandingLight", "glisteningRadiance", "overflowingLight", "holyInfusion", "handOfDivinity", "divineGlimpse", "avengingWrathMight", 
        "reclamation", "daybreak", "tyrsDeliverance", "risingSunlight", "gloriousDawn", "imbuedInfusions",
        "divinePurpose"]

        const build2 = ["lightsHammer", "commandingLight", "glisteningRadiance", "overflowingLight", "holyInfusion", "handOfDivinity", "divineGlimpse", "avengingWrathMight", 
        "reclamation", "daybreak", "tyrsDeliverance", "risingSunlight", "gloriousDawn", "imbuedInfusions",
        "divinePurpose", "awakening"]; // Same with awakening.

        const build3 = ["lightsHammer", "commandingLight", "glisteningRadiance", "overflowingLight", "holyInfusion", "handOfDivinity", "divineGlimpse", "avengingWrathMight", 
        "reclamation", "daybreak", "tyrsDeliverance", "risingSunlight", "gloriousDawn", "imbuedInfusions",
        "divinePurpose", "boundlessSalvation"] // Boundless
        */


        // Blank Point
        const build0 = ["inflorescenceOfTheSunwell", "risingSunlight", "relentlessInquisitor", "barrierOfFaith", "sealOfAlacrity", "sealOfMight", "overflowingLight", "goldenPath", "sealOfMercy", "judgmentOfLight", "holyAegis", "divinePurpose", "justification", "ofDuskAndDawn", "greaterJudgment", "divineInsight", "imbuedInfusions", "divineRevelations", "divineGlimpse", "might", "aweStruck", "glimmerOfLight", "glisteningRadiance", "gloriousDawn", "daybreak", "righteousJudgment"]
                   
        //console.log(seq);
        const iterations = 1;
        const settings = {reporting: true, 'DefaultLoadout': false}
        let sumHealing = 0;
        let baselineHealing = 0;

        let talentList = "Talents Taken: ";
        let talentsMissing = "Talents Missing: ";
        Object.keys(talents).forEach(talentName => {
            const talent = talents[talentName]
            if (talent.points != 0) 
                talentList = talentList + "\"" + talentName + "\", ";
            else
                talentsMissing = talentsMissing + "\"" + talentName + "\", ";
        })

        console.log(talentList + "\n" + talentsMissing);

        for (let i = 0; i < iterations; i++) {
            const stats = JSON.parse(JSON.stringify(activeStats));
            const baseline = runCastSequence(seq, stats, settings, talents)
            //const baseline = allRamps(runCastSequence(seq, activeStats, settings, talents).totalHealing)

            //console.log(baseline);
            sumHealing = sumHealing + baseline.hps;
            baselineHealing += baseline.hps;
            if (iterations === 1 || i === iterations - 1) printReport(baseline);
        }

        
        //const baseline = runCastSequence(seq, activeStats, settings, talents)
        //const baseline = allRamps(runCastSequence(seq, activeStats, settings, talents).totalHealing)
        console.log("Avg Healing: " + Math.round((sumHealing / iterations)));
        //console.log("Total Healing: " + baseline.totalHealing);
        //console.log(baseline.report);
        

        
        let strings = [""];
        //strings.push(evalTalentStrings(build0, talents, activeStats, settings, baselineHealing / iterations, "Unspent Point"));
        //strings.push(evalTalentStrings([...build0, "tyrsDeliverance", "boundlessSalvation", "awestruck"], talents, activeStats, settings, baselineHealing / iterations, "Tyrs"));
        //strings.push(evalTalentStrings([...build0, "judgementInfusionUseIfUp", "judgementInfusionHold"], talents, activeStats, settings, baselineHealing / iterations, "Judgment held for infusion"));
        //strings.push(evalTalentStrings([...build0, "judgementInfusionUseIfUp"], talents, activeStats, settings, baselineHealing / iterations, "Judgment used on infusion if available"));
        //strings.push(evalTalentStrings([...build0, "sealOfOrder"], talents, activeStats, settings, baselineHealing / iterations, "sealOfOrder"));
        //strings.push(evalTalentStrings([...build0, "awakening", "holyInfusion"], talents, activeStats, settings, baselineHealing / iterations, "awakening + holy infusion"));
        //strings.push(evalTalentStrings([...build0, "awakening", "aweStruck"], talents, activeStats, settings, baselineHealing / iterations, "awakening + awestruck"));
        //strings.push(evalTalentStrings([...build0, "relentlessInquisitor", "aweStruck"], talents, activeStats, settings, baselineHealing / iterations, "relentlessInquisitor"));
        //strings.push(evalTalentStrings([...build0, "inflorescenceOfTheSunwell"], talents, activeStats, settings, baselineHealing / iterations, "inflorescenceOfTheSunwell"));
        //strings.push(evalTalentStrings([...build0, "veneration"], talents, activeStats, settings, baselineHealing / iterations, "veneration"));
        
        /*
        strings.push(evalTalentStrings(build1, talents, activeStats, settings, baselineHealing / iterations, "Unspent Point"));
        //strings.push(evalTalentStrings([...build1, "veneration"], talents, activeStats, settings, baselineHealing / iterations, "Veneration"));
        //strings.push(evalTalentStrings([...build1, "might"], talents, activeStats, settings, baselineHealing / iterations, "Might"));
        strings.push(evalTalentStrings([...build1, "relentlessInquisitor"], talents, activeStats, settings, baselineHealing / iterations, "RI"));
        strings.push(evalTalentStrings([...build1, "barrierOfFaith"], talents, activeStats, settings, baselineHealing / iterations, "Barrier of Faith"));
        strings.push(evalTalentStrings([...build1, "boundlessSalvation"], talents, activeStats, settings, baselineHealing / iterations, "Boundless Salv"));
        strings.push(evalTalentStrings([...build1, "sanctifiedWrath"], talents, activeStats, settings, baselineHealing / iterations, "Sanctified Wrath"));
        strings.push(evalTalentStrings([...build1, "awakening"], talents, activeStats, settings, baselineHealing / iterations, "Awakening"));
        */

        
        //strings.push(evalTalentStrings(build3, talents, activeStats, settings, baselineHealing / iterations, "CM + awakening"));
        
        console.log(strings); 
        

        //evalAllTalents(baselineHealing / iterations, {...talents}, JSON.parse(JSON.stringify(activeStats)), settings);
        

    });

    /*
    test("Stat Weights", () => {


        const activeStats = {
            intellect: 10500,
            haste: 4500,
            crit: 1200,
            mastery: 2500,
            versatility: 1200,
            stamina: 0,
        }
        const settings = {reporting: true}
        const talents = baseTalents;
        const iterations = 13000;
        const metric = 'totalHealing';
        
        // Weights
        const stats = ['intellect','crit', 'mastery', 'haste', 'versatility', ];

        let baseline = 0;
        for (var i = 0; i < iterations; i++) {
            const result = runCastSequence(seq, activeStats, settings, talents)[metric]
            baseline += result;
        }
        baseline = baseline / iterations;
        //const baseline = runCastSequence(seq, activeStats, settings, talents)[metric]
        const results = {};
        stats.forEach(stat => {

            for (var i = 0; i < iterations; i++) {
                let adjustedStats = JSON.parse(JSON.stringify(activeStats));
                adjustedStats[stat] = adjustedStats[stat] + 800;

                const result = runCastSequence(seq, adjustedStats, settings, talents)

               
                results[stat] = (results[stat] || 0) + result[metric];
            }

            results[stat] = results[stat] / iterations;

        });
        const weights = {}

        stats.forEach(stat => {
            //console.log("Stat: " + stat + ". " + results[stat]);
            weights[stat] = (results[stat] - baseline) / (results['intellect'] - baseline);
        });

        console.log(weights); 
    });*/
    
}); 
// This is a boilerplate function that'll let us clone our spell database to avoid making permanent changes.
// We need this to ensure we're always running a clean DB, free from any changes made on previous runs.
const deepCopyFunction = (inObject) => {
    let outObject, value, key;
  
    if (typeof inObject !== "object" || inObject === null) {
      return inObject; // Return the value if inObject is not an object
    }
  
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
  
    for (key in inObject) {
      value = inObject[key];
  
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopyFunction(value);
    }
  
    return outObject;
  };
