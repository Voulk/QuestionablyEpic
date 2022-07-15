import { getSpellRaw, runCastSequence } from "./PresEvokerRamps";
import { EVOKERSPELLDB } from "./PresEvokerSpellDB";



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
        intellect: 2000,
        haste: 900,
        crit: 400,
        mastery: 0,
        versatility: 450,
        stamina: 0,
}
    
    // Old Sequences
    //const boonSeq = buildRamp('Boon', 10, ["Instructor's Divine Bell (new)"], activeStats.haste, "Kyrian Evangelism", ['Rapture'])
    //const boon4pc = buildRamp('Boon', 10, ["Instructor's Divine Bell (new)"], activeStats.haste, "Kyrian Evangelism", ['Rapture', "4T28"])
    //const fiendSeq = buildRamp('Fiend', 10, ["Instructor's Divine Bell (new)"], activeStats.haste, "Venthyr Evangelism", ['Rapture'])
    //const evangSeq = buildRamp('Boon', 10, ["Instructor's Divine Bell (new)"], activeStats.haste, "Venthyr Evangelism", ['Rapture'])
    const talents = {
        // Class Tree
        naturalConvergence: false, // Disintegrate channels 20% faster.
        rescue: true,
        innateMagic: false, // Essence regens 5% faster (2 charges).
        enkindled: false, // Living Flame does +5% damage / healing.
        scarletAdaptation: false, // Store 20% of healing dealt. Offensive living flame consumes it to increase damage dealt. Cap is 6x SP x Vers.
        cauterizingFlame: false, // Big dispel that also heals.
        tipTheScales: false, // Your next empowered spell casts instantly. 2 min CD.
        attunedToTheDream: false, // +2% healing (2 points).
        draconicLegacy: false, // +2% stamina (2 points).
        bountifulBloom: false, // Emerald Blossom heals +2 targets.
        protractedTalons: false, // Azure Strike hits an additional target.
        lushGrowth: false, // Green spells heal for 5% more (2 points).




        // Spec Tree
        reversion: true,
        dreamBreath: true,
        echo: true,

        temporalCompression: false, // Bronze spells reduce the cast time of your next finisher by 5%. Stacks to 4. 15s duration.
        essenceBurst: false, // Living Flame has a 20% chance to make your next Essence ability free.
        rewind: false, // Raid cooldown.
        spiritbloom: false,
        lifeGiversFlame: false, // Fire Breath heals a nearby ally for 80% of damage done.
        timeDilation: false, // ST defensive
        emeraldCommunion: false, // ST self-heal channel
        spiritualClarity: false, // Spiritbloom CD reduced by 15s. Choice node with Empath.
        empath: false, // Spiritbloom increases regen rate by 100% for 10 seconds. Choice node with Spiritual Clarity.
        flutteringSeedlings: false, // Emerald Blossoms sends out 3 flying seedlings when it bursts, each healing for 90% sp.
        essenceStrike: false, // Azure Strike has a 15% chance to make your next essence ability free.
        goldenHour: false, // Reversion instantly heals the target for 15% of the damage they took in the last 5 seconds.
        temporalAnomaly: false, // Ability.
        fieldOfDreams: false, // Gain a 30% chance for your fluttering seedlings to grow into a new emerald blossom.
        lifeforceMender: false, // Living Flame and Fire Breath deal extra damage & healing equal to 1% of your maximum health (3 points).
        timeLord: false, // Echo replicates an additional 30% healing (3 points).
        nozdormusTeachings: false, // Temporal Anomaly is instant.
        temporalDisruption: false, // Anomaly heals for 40% more in 40% less time. (Needs testing).
        lifebind: false, // Rescue binds you to your ally, causing any healing either partner receives to splash for 40% on the other.
        callOfYsera: false, // Rescue increases the effectiveness of your next Dream Breath by 40% or Living Flame by 100%.
        timeOfNeed: false, // Needs testing.
        sacralEmpowerment: false, // Consuming a full Temporal Compression grants Essence Burst (next essence ability is free). Need to test.
        exhiliratingBurst: false, // Each time you gain Essence Burst gain +50% crit damage / healing for 8 seconds.
        groveTender: false, // Dream Breath, Spiritbloom and Emerald Blossom cost 10% less mana.
        fontOfMagic: false, // Your Empower spells go to 4 (longer cast time).
        energyLoop: false, // Disintegrate grants 1200 mana over it's duration.
        renewingBreath: false, // Allies healed by dream breath get a HoT for 10% of the amount over 8 seconds (3 points).
        gracePeriod: false, // Your healing is increased by 15% on allies with Reversion.
        timelessMagic: false, // Reversion, Time Dilation, Echo last 2s longer (3 points).
        dreamFlight: false, 
        stasis: false,
        cycleOfLife: false, // Emerald Blossom leaves behind a sprout that absorbs 5% of healing over 10 seconds.


    };

    const settings = {}

    const print = (name, base, healing) => {
        let percInc = Math.round(10000*(healing / base - 1))/100;
        console.log(name + ": " + healing + " (+" + percInc + "%)")
    }

    const seq = ["Echo", "Living Flame"] 

    test("Spell HPM", () => {
        const spellList = Object.keys(EVOKERSPELLDB);
        const spellHPMs = {}

        spellList.forEach(spellName => {
            const seq = [spellName];

            const baseline = runCastSequence(seq, activeStats, settings, talents)

            spellHPMs[spellName] = Math.round(100*baseline.hpm)/100;
        })

        console.log(spellHPMs);

    });

    test("Test Stuff", () => {

        //const baseline = allRamps(evangSeq, fiendSeq, activeStats, {"playstyle": "Venthyr Evangelism", "Power of the Dark Side": true, true);


        //console.log(seq);

        
        //const baseline = runCastSequence(seq, activeStats, settings, talents)

        //console.log("Baseline: " + JSON.stringify(baseline));
        /*
        print("Indemnity", baseline, allRampsHealing(seq, activeStats, settings, {...talents, indemnity: true}))
        print("Rapture", baseline, allRampsHealing(seq3, activeStats, settings, {...talents, rapture: true}))
        print("Exaltation & Rapture", baseline, allRampsHealing(seq3, activeStats, settings, {...talents, rapture: true, exaltation: true}))
        print("Shining Radiance", baseline, allRampsHealing(seq, activeStats, settings, {...talents, shiningRadiance: 2}))
        print("Rabid Shadows", baseline, allRampsHealing(seq, activeStats, settings, {...talents, rabidShadows: 2}))
        print("Dark Indul", baseline, allRampsHealing(seq, activeStats, settings, {...talents, darkIndulgence: 2}))
        print("Swift Penitence", baseline, allRampsHealing(seq, activeStats, settings, {...talents, swiftPenitence: 2}))
        print("Castigation", baseline, allRampsHealing(seq, activeStats, settings, {...talents, castigation: true}))
        print("Purge the Wicked", baseline, allRampsHealing(seq2, activeStats, settings, {...talents, purgeTheWicked: true}))
        print("Purge & Revel", baseline, allRampsHealing(seq2, activeStats, settings, {...talents, purgeTheWicked: true, revelInPurity: 2}))
        
        
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
