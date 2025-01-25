import { getSpellRaw, runCastSequence } from "./PresEvokerRamps";
import { EVOKERSPELLDB, baseTalents, evokerTalents } from "./PresEvokerSpellDB";
import { reversionProfile, blossomProfile } from "./PresEvokerDefaultAPL";
import { runAPLSuites, runStatSuites, runStatDifferentialSuite, runTimeSuite, runSuite } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampTestSuite";
import { runPreservationEvokerCastProfile } from "./PreservationEvokerCastProfile";
import { runPreservationEvokerCastProfileEchoshaper } from "./PreservationEvokerProfileEchoshaper";

// These are basic tests to make sure our coefficients and secondary scaling arrays are all working as expected.


describe("Test APL", () => {
    test("Test APL", () => {
        
        console.log("Testing APL");
        const exhilUptime = 0.7;

        let activeStats = {
            intellect: 76000 * 1.05,
            haste: 13200,
            crit: 9500,
            mastery: 19000 + (2 * 700),
            versatility: 8500 + (3 * 780),
            stamina: 29000,
            critMult: 2 + (0.6 * exhilUptime),
        }

        const profile = reversionProfile;
    
        const baseSpells = EVOKERSPELLDB;
        const testSettings = {masteryEfficiency: 0.85, includeOverheal: true, reporting: true, t31_2: false, seqLength: 200};

        const playerData = { spec: "Preservation Evoker", spells: baseSpells, settings: testSettings, talents: {...evokerTalents}, stats: activeStats, tier: ["S1-2", "S1-4"] }

        //const data = runCastProfileSuites(playerData, runPreservationEvokerProfile)
        const iterations = 1;
        let baseline = 0;
        
        for (let i = 0; i < iterations; i++) {
            baseline += runPreservationEvokerCastProfileEchoshaper(playerData).hps;
        }

        baseline = baseline / iterations
        
        //runStats(playerData, profile);
        
    })


});

const runStats = (playerData, profile) => {
    const stats = ['crit', 'mastery', 'haste', 'versatility', 'intellect', ];
    const iterations = 1;
    let baseline = 0;
    const exhilUptime = 0.7;

    const activeStats = { // Here we'll just reset activeStats so that we have the same amount of each.
        intellect: 76000 * 1.05,
        haste: 9500,
        crit: 9500,
        mastery: 9500 + (2 * 700),
        versatility: 9500 + (3 * 780),
        stamina: 29000,
        critMult: 2 + (0.6 * exhilUptime),
    }

    playerData.stats = activeStats;
    
    for (let i = 0; i < iterations; i++) {
        baseline += runPreservationEvokerCastProfileEchoshaper(playerData).hps;
    }

    baseline = baseline / iterations
    
    const results = {};



    stats.forEach(stat => {
        let statHealing = 0;
        let playerStats = JSON.parse(JSON.stringify(playerData.stats));
        playerStats[stat] = playerStats[stat] + 2400;
        const newPlayerData = {...playerData, stats: playerStats};
        for (let i = 0; i < iterations; i++) {

            statHealing += runPreservationEvokerCastProfileEchoshaper(newPlayerData).hps;
            
        }
        results[stat] = statHealing / iterations;

    });
    const weights = {}

    console.log(baseline);
    console.log(results);
    stats.forEach(stat => {
        weights[stat] = Math.round(1000*(results[stat] - baseline) / (results['intellect'] - baseline))/1000;
    });
    console.log(weights); 
}

// We're going to mostly compare these against small in-game scenarios. While this might be longer than comparing if Renewing Breath increased DB healing by 30%,
// it also lets us test the underlying spells at the same time.
// This is also faster in terms of test run time and avoids having to run sequences with and without % healing increases and so forth.

// This will just print HPCT and HPM data for a bunch of little combos.
/*
describe("Get Spell Data", () => {
    const combos = [
        ["Echo", "Spiritbloom"],
        ["Verdant Embrace", "Living Flame"],
        ["Verdant Embrace", "Dream Breath"],
        ["Temporal Anomaly", "Dream Breath"],
        ["Temporal Anomaly", "Spiritbloom"],
    ];

    const baseSpells = EVOKERSPELLDB;
    const testSettings = {masteryEfficiency: 1, includeOverheal: "No", reporting: false, t31_2: false};
    const talents = {...evokerTalents};
   
    Object.keys(talents).forEach(talentName => {
        if (talentName !== "fieldOfDreams" && talentName !== "Lifebind" && talentName !== "exhilaratingBurst" && talentName !== "lifeforceMender") talents[talentName].points = talents[talentName].maxPoints;
        
    });
    
    const activeStats = {
        intellect: 12000,
        haste: 2000,
        crit: 2000,
        mastery: 6500,
        versatility: 3000,
        stamina: 29000,
        critMult: 2,
    }
    test("Individual Spells", () => {
        const results = [];
        Object.keys(baseSpells).forEach(spellName => {
            
            const fullSpell = baseSpells[spellName];

            if (fullSpell[0].spellData.cat === "heal") {
                console.log("Running" + spellName)
                const sequence = [spellName];
                const result = runCastSequence(sequence, JSON.parse(JSON.stringify(activeStats)), testSettings, talents)
                results.push(spellName + ". Healing: " + result.totalHealing + ". HPM: " + Math.round(100*result.hpm)/100);
            }
        });
        console.log(results);
        expect(true).toEqual(true);

    })
    
    test("Sequences", () => {
        const results = [];
        combos.forEach(sequence => {
            const result = runCastSequence(sequence, JSON.parse(JSON.stringify(activeStats)), testSettings, talents)
            results.push(sequence + ". Healing: " + result.totalHealing + ". HPM: " + Math.round(100*result.hpm)/100);
        });
        console.log(results);
        expect(true).toEqual(true);

    }) 




});

*/
/* Remove to re-enable test cases.


// We don't have a crit flag right now, so we'll need to buff our in game values by 5% to compensate.
describe("Test Talent Interactions", () => {
    const tolerance = 20;
    const testSettings = {masteryEfficiency: 1, includeOverheal: "No", reporting: true};
    const testBaseTalents = {...evokerTalents,
                            attunedToTheDream: {...evokerTalents.attunedToTheDream, points: 0},
                            lushGrowth: {...evokerTalents.lushGrowth, points: 2}};
    const activeStats = {
        intellect: 2091,
        haste: 0,
        crit: 0,
        mastery: 0,
        versatility: 0,
        stamina: 1900,
    }
    test("Call of Ysera", () => {
        
        const sequence = ["Verdant Embrace", "Dream Breath"];
        const talents = {...evokerTalents, callOfYsera: {...evokerTalents.callOfYsera, points: 1}, 
                        renewingBreath: {...evokerTalents.renewingBreath, points: 0}, 
                        attunedToTheDream: {...evokerTalents.attunedToTheDream, points: 0},
                        lushGrowth: {...evokerTalents.lushGrowth, points: 2}};
        //console.log(talents);
        const result = runCastSequence(sequence, JSON.parse(JSON.stringify(activeStats)), {masteryEfficiency: 1, includeOverheal: "No", reporting: false}, talents)
        const healing = result.totalHealing;

        const expectedAnswer = (8275 + (2874 + 1437 * 8) * 5) * 1.05; // 8 ticks, 5 targets, 5% crit multiplier.
        expect(Math.abs(healing - expectedAnswer)).toBeLessThan(tolerance);
        expect(result.manaSpent).toEqual(7500+11250);
    });

    test("Panacea & Fluttering Seedlings", () => {
        
        const sequence = ["Emerald Blossom"];
        const talents = {...evokerTalents, flutteringSeedlings: {...evokerTalents.flutteringSeedlings, points: 2}, 
                        attunedToTheDream: {...evokerTalents.attunedToTheDream, points: 0},
                        fieldOfDreams: {...evokerTalents.fieldOfDreams, points: 0},
                        panacea: {...evokerTalents.panacea, points: 1},
                        bountifulBloom: {...evokerTalents.bountifulBloom, points: 1},
                        lushGrowth: {...evokerTalents.lushGrowth, points: 2}};
        //console.log(talents);
        const result = runCastSequence(sequence, JSON.parse(JSON.stringify(activeStats)), {masteryEfficiency: 1, includeOverheal: "No", reporting: false}, talents)
        const healing = result.totalHealing;
        console.log(result);
        const expectedAnswer = (5227 + 4008 * 5 + 1573 * 2) * 1.05; // 2 Seedlings per Emerald Blossom.

        expect(Math.abs(healing - expectedAnswer)).toBeLessThan(tolerance);
        expect(result.manaSpent).toEqual(12000);
    });

    test("Echo Spiritbloom R3", () => {
        
        const sequence = ["Echo", "Spiritbloom"];
        const talents = {...evokerTalents, timeLord: {...evokerTalents.timeLord, points: 2}, 
                        attunedToTheDream: {...evokerTalents.attunedToTheDream, points: 0},
                        fontOfMagic: {...evokerTalents.fontOfMagic, points: 0},
                        lushGrowth: {...evokerTalents.lushGrowth, points: 2}};
        //console.log(talents);
        const result = runCastSequence(sequence, JSON.parse(JSON.stringify(activeStats)), {masteryEfficiency: 1, includeOverheal: "No", reporting: true}, talents)
        const healing = result.totalHealing;
        console.log(result);
        const expectedAnswer = (2915 + 13591 * 4.05) * 1.05; // Expectation is 3 regular Spiritbloom bolts, 1 echo'd bolt, and 1x Echo direct heal.

        expect(Math.abs(healing - expectedAnswer)).toBeLessThan(tolerance);
        expect(result.manaSpent).toEqual(4250+9500);
    });

    // TODO
    test("Resonating Sphere Lifebind Combo - 5 targets", () => {
        
        const sequence = ["Temporal Anomaly", "Verdant Embrace", "Spiritbloom"];
        const talents = {...testBaseTalents, resonatingSphere: {...evokerTalents.callOfYsera, points: 0},
                                            lifebind: {...evokerTalents.callOfYsera, points: 0}
    };
        //console.log(talents);
        const result = runCastSequence(sequence, JSON.parse(JSON.stringify(activeStats)), {maxAllyTargets: 5, masteryEfficiency: 1, includeOverheal: "No", reporting: true}, talents)
        const healing = result.totalHealing;
        console.log(result);
        const expectedAnswer = (2915 + 13591 * 4.05) * 1.05; // Expectation is 3 regular Spiritbloom bolts, 1 echo'd bolt, and 1x Echo direct heal.

        //expect(Math.abs(healing - expectedAnswer)).toBeLessThan(tolerance);
        expect(true).toEqual(true);
        expect(result.manaSpent).toEqual(7500+18750+9500);
    });

})

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
// describe("Disintegrate", () => {
//     // In game dmg, fresh lvl 70 character
//     // Disintegrate tick = 1826
//     const activeStats = {
//         intellect: 2089,
//         haste: 0,
//         crit: 600,
//         mastery: 600,
//         versatility: 0,
//         stamina: 2800,

//         critMult: 1,
//     };


//     const settings = {reporting: true};

//     const print = (name, base, healing) => {
//         let percInc = Math.round(10000*(healing / base - 1))/100;
//         console.log(name + ": " + healing + " (+" + percInc + "%)")
//     };

//     const talents = {...baseTalents};

//     test("Disintegrate should do 1826 dmg as per 10.0.2 (max lvl 70)", () => {
//         const iter = 5;
//         const results = {dmgDone: 0};

//         for (let i = 0; i < iter; i++) {
//             const seq = ["Disintegrate"];

//             const sequenceResult = runCastSequence(seq, activeStats, settings, talents);

//             results.dmgDone += sequenceResult.totalDamage;
//         }

//         console.log(`Damage done over ${iter} iterations: ${results.dmgDone}\n` +
//                     `Damage in a single iteration: ${results.dmgDone / iter}\n` +
//                     `Damage in a single cast: ${Math.ceil(results.dmgDone / iter / 4)}\n`);

//         expect(Math.ceil((results.dmgDone / iter) / 4)).toBe(1826);
//     });

//     test("Disintegrate should tick faster if Natural Convergence is selected", () => {
//         const iter = 1;
//         const results = {numberOfCastsWithNC: 0, numberOfCastsWithoutNC: 0, timeElapsedNC: 0, timeElapsedWNC: 0};

//         const localTalents = {naturalConvergence: {points: 1}, ...talents};

//         for (let i = 0; i < iter; i++) {
//             const seq = ["Disintegrate", "Disintegrate", "Disintegrate", "Disintegrate", "Disintegrate"];

//             const sequenceResult = runCastSequence(seq, activeStats, settings, localTalents);

//             results.numberOfCastsWithNC += Math.floor((sequenceResult.totalDamage / 1826) / 4); // give the number of casts aprox.
//             results.timeElapsedNC += sequenceResult.t;
//         }

//         for (let i = 0; i < iter; i++) {
//             const seq = ["Disintegrate", "Disintegrate", "Disintegrate", "Disintegrate", "Disintegrate"];

//             const sequenceResult = runCastSequence(seq, activeStats, settings, talents);

//             results.numberOfCastsWithoutNC += Math.floor((sequenceResult.totalDamage / 1826) / 4);
//             results.timeElapsedWNC += sequenceResult.t;
//         }

//         console.log(`Number of Casts with NC: ${results.numberOfCastsWithNC}\n` +
//                     `Number of Casts without NC: ${results.numberOfCastsWithoutNC}`);

//         console.log(`Time Elapsed with NC: ${results.timeElapsedNC}\n` +
//                     `Time Elapsed without NC: ${results.timeElapsedWNC}`);
//     });

//     test("Disintegrate should do 20% extra damage, and restore 7200 mana if talented into Energy Loop", () => {
//         const localTalents = {energyLoop: {points: 1}, ...talents};

//         const seq = ["Disintegrate"];

//         const baselineSequenceResult = runCastSequence(seq, activeStats, settings, talents);

//         const talentedSequenceResult = runCastSequence(seq, activeStats, settings, localTalents);

//         console.log(talentedSequenceResult);

//         // Each tick should do 1826 dmg for a total of 7304 dmg in 4 ticks.
//         // but the engine rounds up the total amount of dmg, so each tick actually do
//         // 1825.78 dmg (in the engine), so the result should go down to 7303
//         expect(baselineSequenceResult.totalDamage).toBe(7303);

//         const buffedDmg = baselineSequenceResult.totalDamage + (baselineSequenceResult.totalDamage * 0.20);

//         expect(talentedSequenceResult.totalDamage).toBe(buffedDmg);
//     });
// });

/*
describe("Echo Ramp Sequence", () => {

    const activeStats = {
        intellect: 1,
        haste: 4000,
        crit: 600,
        mastery: 600,
        versatility: 600,
        stamina: 2800,

        critMult: 1,
}
    

    const settings = {reporting: true}

    const print = (name, base, healing) => {
        let percInc = Math.round(10000*(healing / base - 1))/100;
        console.log(name + ": " + healing + " (+" + percInc + "%)")
    }

    

    const talents = {...baseTalents, bountifulBloom: true, renewingBreath: 3, timelessMagic: 3, lifeforceMender: 3, callOfYsera: true, sacralEmpowerment: true,
                        temporalCompression: true, lushGrowth: 2, attunedToTheDream: 2, lifeGiversFlame: false, cycleOfLife: true, fieldOfDreams: true}


    test("Test Stuff", () => {

        //const baseline = allRamps(evangSeq, fiendSeq, activeStats, {"playstyle": "Venthyr Evangelism", "Power of the Dark Side": true, true);

        //console.log(seq);
        const iter = 1;
        const results = {healingDone: 0, manaSpent: 0};

        for (let i = 0; i < iter; i++) {
            const seq = ["Reversion", "Echo", "Echo", "Echo", "Fire Breath", "Echo", "Echo", "Spiritbloom"] 
            const seq2 = ["Emerald Blossom", "Emerald Blossom", "Emerald Blossom", "Living Flame", "Living Flame"]
            const baseline = runCastSequence(seq, activeStats, settings, talents)

            results.healingDone += baseline.totalHealing;
            results.manaSpent += baseline.manaSpent;

            console.log(baseline);

            //console.log("Baseline: " + JSON.stringify(baseline));
        }
        
        console.log(`Healing Done over ${iter} iterations: ` + results.healingDone / iter + " at cost: " + results.manaSpent / iter);
        


        

    });
}); */
