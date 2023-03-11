import { getSpellRaw, runCastSequence } from "./PresEvokerRamps";
import { EVOKERSPELLDB, baseTalents, evokerTalents } from "./PresEvokerSpellDB";



// These are basic tests to make sure our coefficients and secondary scaling arrays are all working as expected.



// We're going to mostly compare these against small in-game scenarios. While this might be longer than comparing if Renewing Breath increased DB healing by 30%,
// it also lets us test the underlying spells at the same time.
// This is also faster in terms of test run time and avoids having to run sequences with and without % healing increases and so forth.
describe("Test Talent Interactions", () => {
    const activeStats = {
        intellect: 1974,
        haste: 869,
        crit: 1000,
        mastery: 451,
        versatility: 528,
        stamina: 1900,
    }
    test("Call of Ysera", () => {
        
        const sequence = ["Verdant Embrace", "Dream Breath"];
        const talents = {...evokerTalents, callOfYsera: 1, renewingBreath: 0};
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
/*
describe("Disintegrate", () => {
    // In game dmg, fresh lvl 70 character
    // Disintegrate tick = 1826
    const activeStats = {
        intellect: 2089,
        haste: 0,
        crit: 600,
        mastery: 600,
        versatility: 0,
        stamina: 2800,

        critMult: 1,
    };


    const settings = {reporting: true};

    const print = (name, base, healing) => {
        let percInc = Math.round(10000*(healing / base - 1))/100;
        console.log(name + ": " + healing + " (+" + percInc + "%)")
    };

    const talents = {...baseTalents};

    
    test("Disintegrate should do 1826 dmg as per 10.0.2 (max lvl 70)", () => {
        const iter = 5;
        const results = {dmgDone: 0};

        for (let i = 0; i < iter; i++) {
            const seq = ["Disintegrate"];

            const sequenceResult = runCastSequence(seq, activeStats, settings, talents);

            results.dmgDone += sequenceResult.totalDamage;
        }

        console.log(`Damage done over ${iter} iterations: ${results.dmgDone}\n` +
                    `Damage in a single iteration: ${results.dmgDone / iter}\n` +
                    `Damage in a single cast: ${Math.ceil(results.dmgDone / iter / 4)}\n`);

        expect(Math.ceil((results.dmgDone / iter) / 4)).toBe(1826);
    });

    test("Disintegrate should tick faster if Natural Convergence is selected", () => {
        const iter = 1;
        const results = {numberOfCastsWithNC: 0, numberOfCastsWithoutNC: 0, timeElapsedNC: 0, timeElapsedWNC: 0};

        const localTalents = {naturalConvergence: {points: 1}, ...talents};

        for (let i = 0; i < iter; i++) {
            const seq = ["Disintegrate", "Disintegrate", "Disintegrate", "Disintegrate", "Disintegrate"];

            const sequenceResult = runCastSequence(seq, activeStats, settings, localTalents);

            results.numberOfCastsWithNC += Math.floor((sequenceResult.totalDamage / 1826) / 4); // give the number of casts aprox.
            results.timeElapsedNC += sequenceResult.t;
        }

        for (let i = 0; i < iter; i++) {
            const seq = ["Disintegrate", "Disintegrate", "Disintegrate", "Disintegrate", "Disintegrate"];

            const sequenceResult = runCastSequence(seq, activeStats, settings, talents);

            results.numberOfCastsWithoutNC += Math.floor((sequenceResult.totalDamage / 1826) / 4);
            results.timeElapsedWNC += sequenceResult.t;
        }

        console.log(`Number of Casts with NC: ${results.numberOfCastsWithNC}\n` +
                    `Number of Casts without NC: ${results.numberOfCastsWithoutNC}`);

        console.log(`Time Elapsed with NC: ${results.timeElapsedNC}\n` +
                    `Time Elapsed without NC: ${results.timeElapsedWNC}`);
    });

    test("Disintegrate should do 20% extra damage, and restore 7200 mana if talented into Energy Loop", () => {
        const localTalents = {energyLoop: {points: 1}, ...talents};

        const seq = ["Disintegrate"];

        const baselineSequenceResult = runCastSequence(seq, activeStats, settings, talents);

        const talentedSequenceResult = runCastSequence(seq, activeStats, settings, localTalents);

        console.log(talentedSequenceResult);

        // Each tick should do 1826 dmg for a total of 7304 dmg in 4 ticks.
        // but the engine rounds up the total amount of dmg, so each tick actually do
        // 1825.78 dmg (in the engine), so the result should go down to 7303
        expect(baselineSequenceResult.totalDamage).toBe(7303);

        const buffedDmg = baselineSequenceResult.totalDamage + (baselineSequenceResult.totalDamage * 0.20);

        expect(talentedSequenceResult.totalDamage).toBe(buffedDmg);
    }); 
});*/


describe("Echo Ramp Sequence", () => {
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

    /*
    test("Spell HPM", () => {
        const spellList = Object.keys(EVOKERSPELLDB);
        const spellHPMs = []

        spellList.forEach(spellName => {
            const seq = [spellName];
            const spellData = {name: spellName}
            const rawSpell = EVOKERSPELLDB[spellName];

            const baseline = runCastSequence(seq, activeStats, settings, talents)

            spellData.healing = Math.round(baseline.totalHealing) || 0;
            spellData.hpm = Math.round(100*baseline.hpm)/100 || 0;

            if (rawSpell[0].empowered) spellData.name = spellData.name + " (4x EMPOWERED)";
            if (rawSpell[0].essence) spellData.essenceCost = rawSpell[0].essence;
            

            spellHPMs.push(spellData);
        })

        console.log(spellHPMs);

    });
    */

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
        
        /*

        
        
        print("Malicious Scission", baseline, allRampsHealing(seq, activeStats, settings, {...talents, maliciousScission: true}))
        
        print("Stolen Psyche", baseline, allRampsHealing(seq, activeStats, settings, {...talents, stolenPsyche: 2}))
        print("Lesson in Humility", baseline, allRampsHealing(seq, activeStats, settings, {...talents, lessonInHumility: 2}))

        print("PtW / Revel / Lesson in Humi / Evenfall / LW / Indem", baseline, allRampsHealing(seq2, activeStats, settings, {...imprTalents, 
                revelInPurity: 2, purgeTheWicked: true, lessonInHumility: 2, evenfall: 2, indemnity: true}))
        print("PtW / Swift Pen / Lesson in Humi / Evenfall / LW / Indem", baseline, allRampsHealing(seq2, activeStats, settings, {...imprTalents, 
                swiftPenitence: 2, purgeTheWicked: true, lessonInHumility: 2, evenfall: 2, indemnity: true}))                                                            
        */
        //console.log(allRamps(seq, activeStats, settings, {...talents, stolenPsyche: 2}, true))
        //runCastSequence(seq, activeStats, settings, conduits);

        //console.log("Total Healing: " + baseline.totalHealing);
        //console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
        //console.log("Baseline: " + JSON.stringify(baseline));

        //const clarityOfMind = allRamps(boonSeq, fiendSeq, activeStats, {"Clarity of Mind": true, "Pelagos": false, "Power of the Dark Side": true}, {});
        //const pelagos = allRamps(boonSeq, fiendSeq, activeStats, {"Clarity of Mind": false, "Pelagos": true, "Power of the Dark Side": true}, {});
        //const rabidShadows = allRamps(boonSeq, fiendSeq, activeStats, {"Clarity of Mind": false, "Pelagos": false, "Power of the Dark Side": true}, {"Rabid Shadows": 226});
        //const fourPiece = allRamps(boon4pc, fiendSeq, activeStats, {"4T28": true, "Clarity of Mind": true, "Pelagos": false, "Power of the Dark Side": true}, {});

        // These are extremely simple checks to make sure our legendaries and soulbinds are having some net impact on our result.
        // They're not specific on their value, but will fail if any portion of the ramp isn't working correctly.

        /*
        expect(clarityOfMind - baseline).toBeGreaterThan(0);
        expect(pelagos - baseline).toBeGreaterThan(0);
        expect(rabidShadows - baseline).toBeGreaterThan(0);
        expect(fourPiece - baseline).toBeGreaterThan(0); */
        
        //const exaltation = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": false, "Pelagos": false}, {"Exaltation": 226});
        //const comExaltation = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": true, "Pelagos": false}, {"Exaltation": 226});
        
        //console.log("RUNNING COURAGEOUS");
        //const courageousAscension = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": false, "Pelagos": false}, {"Courageous Ascension": 226});

        //console.log("Clarity of Mind: " + ((clarityOfMind - baseline) / 180))
        //console.log("Pelagos: " + ((pelagos - baseline) / 180))
        //console.log("Exaltation: " + ((exaltation - baseline) / 180))
        //console.log("CoM + Exaltation: " + ((comExaltation - baseline) / 180))
        //console.log("Rabid Shadows: " + ((rabidShadows - baseline) / 180));
        //console.log("Cour Asc: " + ((courageousAscension - baseline) / 180));

    });
});

   /*
    test("Stat Weights", () => {

        //console.log("Boon Ramp with CoM, Bell: " + runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell & Kleia: " + runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true, "Kleia": true}, {"Courageous Ascension": 226}));

        const activeStats = {
            intellect: 2000,
            haste: 800,
            crit: 445, //445
            mastery: 451,
            versatility: 528,
            stamina: 0,
        }
        
        // Weights
        const boonSeq = buildRamp('Boon', 10, [], activeStats.haste, ['Rapture'])
        const fiendSeq = buildRamp('Fiend', 10, [], activeStats.haste, ['Rapture'])
        const baseline = allRamps(boonSeq, fiendSeq, activeStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226});

        const stats = ['intellect','versatility', 'crit', 'haste', 'mastery'];
        const results = {};
        stats.forEach(stat => {

            const adjustedStats = JSON.parse(JSON.stringify(activeStats));
            adjustedStats[stat] = adjustedStats[stat] + 1;
            //console.log(adjustedStats);

            const seq1 = buildRamp('Boon', 10, [], adjustedStats['haste'], ['Rapture'])
            const seq2 = buildRamp('Fiend', 10, [], adjustedStats['haste'], ['Rapture'])

            //results[stat] = Math.round(runCastSequence(seq1, adjustedStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226}) +
            //                        (runCastSequence(seq2, adjustedStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226})));
            results[stat] = allRamps(seq1, seq2, adjustedStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226});
        });
        const weights = {}
        //console.log(baseline);
        stats.forEach(stat => {
            //console.log("Stat: " + stat + ". " + results[stat]);
            weights[stat] = (results[stat] - baseline) / (results['intellect'] - baseline);
        });

        console.log(weights); 
    });

    */

    /*
    test("Haste", () => {
        const activeStats = {
            intellect: 1950,
            haste: 87,
            crit: 650,
            mastery: 400,
            versatility: 470,
            stamina: 1900,
            };

            for (var x = 87; x < 88; x++) {
                //console.log("== Haste = " + x + " ==")
                activeStats.haste = x;
                genStatWeights(activeStats);

            }

         

    }); */


    /*
    test("Haste", () => {

        //console.log("Boon Ramp with CoM, Bell: " + runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell & Kleia: " + runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true, "Kleia": true}, {"Courageous Ascension": 226}));
        const activeStats = {
            intellect: 1974,
            haste: 800,
            crit: 450,
            mastery: 450,
            versatility: 450,
            stamina: 0,
        }
        
        // Weights
        const baseline = allRamps(boonSeq, fiendSeq, activeStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226});
        const stats = ['intellect','versatility', 'crit', 'haste', 'mastery'];
        const results = [];
        for (var x = 0; x < 1; x+=1) {

            const adjustedStats = JSON.parse(JSON.stringify(activeStats));
            adjustedStats['haste'] = x;

            const seq1 = buildRamp('Boon', 10, [], adjustedStats['haste'], ['Rapture'])
            const seq2 = buildRamp('Fiend', 10, [], adjustedStats['haste'], ['Rapture'])

            //results[stat] = Math.round(runCastSequence(seq1, adjustedStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226}) +
            //                        (runCastSequence(seq2, adjustedStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226})));
            const healing = (allRamps(seq1, seq2, adjustedStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
            console.log(healing + ": " + x);
            results.push((healing - baseline) / x / 180);
        };
        const weights = {}
        
        console.log(results);
    }); 


    
}); */
