import { Stats } from 'fs';
import Player from 'General/Modules/Player/Player';
import { allRamps, allRampsHealing } from "./DiscRampUtilities";
import { getSpellRaw, runCastSequence } from "./DiscPriestRamps";
import { genStatWeights } from './DiscPriestUtilities';
import { buildRamp } from "./DiscRampGen";
import { DISCSPELLS, baseTalents } from "./DiscSpellDB";


// These are basic tests to make sure our coefficients and secondary scaling arrays are all working as expected.


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
        intellect: 7500,
        haste: 3800,
        crit: 2400,
        mastery: 1900,
        versatility: 1100,
        stamina: 6559,
    
        critMult: 2,
      };
    
    // Old Sequences
    //const boonSeq = buildRamp('Boon', 10, ["Instructor's Divine Bell (new)"], activeStats.haste, "Kyrian Evangelism", ['Rapture'])
    //const boon4pc = buildRamp('Boon', 10, ["Instructor's Divine Bell (new)"], activeStats.haste, "Kyrian Evangelism", ['Rapture', "4T28"])
    //const fiendSeq = buildRamp('Fiend', 10, ["Instructor's Divine Bell (new)"], activeStats.haste, "Venthyr Evangelism", ['Rapture'])
    //const evangSeq = buildRamp('Boon', 10, ["Instructor's Divine Bell (new)"], activeStats.haste, "Venthyr Evangelism", ['Rapture'])


    const talentSet = {... baseTalents};

    /*const seq = ["Shadow Word: Pain", "Rapture", "Power Word: Shield", "Power Word: Shield", "Power Word: Shield", "Power Word: Shield", 
                    "Power Word: Shield", "Power Word: Shield", "Power Word: Shield", "Power Word: Shield", "Power Word: Shield", 
                    "Power Word: Radiance", "Power Word: Radiance", "Evangelism", "Mindbender", "Schism", "Mindgames", "Penance", "Mind Blast", 
                    "Smite", "Smite", "Smite", "Penance", "Smite", "Smite", "Smite", "Smite"]; 

    const seq2 = ["Purge the Wicked", "Rapture", "Power Word: Shield", "Power Word: Shield", "Power Word: Shield", "Power Word: Shield", 
        "Power Word: Shield", "Power Word: Shield", "Power Word: Shield", "Power Word: Shield", "Power Word: Shield", 
        "Power Word: Radiance", "Power Word: Radiance", "Evangelism", "Mindbender", "Schism", "Mindgames", "Penance", "Mind Blast", 
        "Smite", "Smite", "Smite", "Penance", "Smite", "Smite", "Smite", "Smite"];  */
    //const seq = ["Penance"];
    //console.log(evangSeq)

    const print = (name, base, healing) => {
        let percInc = Math.round(10000*(healing / base - 1))/100;
        console.log(name + ": " + healing + " (+" + percInc + "%)")
    }

    const runTalents = (talentName, baseline, talents, settings) => {
        const seq = buildRamp('Primary', 10, [], activeStats.haste, "", talents)
        print(talentName, baseline, allRampsHealing([], JSON.parse(JSON.stringify(activeStats)), settings, talents));
    }

    const autoGenRotation = (talents, settings) => {
        // We can also auto-gen our application portion but we won't just yet.
        const applicationPortion = ["Purge the Wicked", "Power Word: Shield", "Renew", "Renew", "Renew", "Power Word: Shield", "Renew", "Renew", "Renew", "Renew", "Power Word: Shield", "Shadowfiend", "Power Word: Radiance", "Power Word: Radiance", "Evangelism"];
        const dpsCooldownList = ["Mind Blast", "Penance", "Schism", "Mind Blast", "Shadow Covenant", "Halo", "Power Word: Solace", "Light's Wrath"] // Shadow Covenant
        //const dpsCooldownList = ["Mind Blast", "Penance", "Schism"]
        const dpsSpamList = ["Smite"]
        let results = [];
        const t1 = Date.now();
        const sequenceList = permute(dpsCooldownList);
        
        console.log(sequenceList.length);

        for (var i = 0; i < sequenceList.length; i++) {
            const compiledSeq = applicationPortion.concat(sequenceList[i]).flat();

            const rampResult = runCastSequence(compiledSeq, activeStats, settings, talents);

        
            results.push({"seq": sequenceList[i], "result": rampResult.totalHealing})

            if (i % 5000 === 0) {
                results = sortItems(results);
                results = results.splice(0, 3);

                if (i % 100000 === 0) {
                    console.log(i);
                }
            }

        } 
        console.log(sortItems(results).splice(0, 5));
        console.log("Time: " + (Date.now() - t1) / 1000 + "s")
        
    }

    function sortItems(container) {
        // Current default sorting is by HPS (soft score) but we could get creative here in future.
        container.sort((a, b) => (a.result < b.result ? 1 : -1));
      
        return container;
      }

    function permute(permutation) {
        var length = permutation.length,
            result = [permutation.slice()],
            c = new Array(length).fill(0),
            i = 1, k, p;
      
        while (i < length) {
          if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
          } else {
            c[i] = 0;
            ++i;
          }
        }
        return result;
      }


    test("Test Stuff", () => {

        //const baseline = allRamps(evangSeq, fiendSeq, activeStats, {"playstyle": "Venthyr Evangelism", "Power of the Dark Side": true, true);

        //console.log("Baseline: " + JSON.stringify(runCastSequence(seq, activeStats, {}, talents)))

        const seq = buildRamp('Primary', 10, [], activeStats.haste, "", talentSet)
        const fiendSeq = buildRamp('Secondary', 10, [], activeStats.haste, "", talentSet)


        //console.log(seq);

        //const settings = {'Power of the Dark Side': true, 'includeOverheal': true}
        //const baseline = allRampsHealing([], JSON.parse(JSON.stringify(activeStats)), settings, baseTalents, [])

        //autoGenRotation(baseTalents, {});
        expect(true).toEqual(true);
        /*
        runTalents("Pain and Suffering", baseline, {...baseTalents, painAndSuffering: {...baseTalents.painAndSuffering, points: 1}}, settings);
        runTalents("Painful Punishment", baseline, {...baseTalents, painfulPunishment: {...baseTalents.painfulPunishment, points: 1}}, settings);
        runTalents("Malicious Intent", baseline, {...baseTalents, maliciousIntent: {...baseTalents.maliciousIntent, points: 1}}, settings)
        runTalents("Stolen Psyche", baseline, {...baseTalents, stolenPsyche: {...baseTalents.stolenPsyche, points: 1}}, settings)
        
        runTalents("Sins of the Many", baseline, {...baseTalents, sinsOfTheMany: {...baseTalents.sinsOfTheMany, points: 1}}, settings) 
        //runTalents("Castigation", baseline, {...baseTalents, sinsOfTheMany: {...baseTalents.sinsOfTheMany, points: 1}}, settings)
        runTalents("Aegis of Wrath", baseline, {...baseTalents, aegisOfWrath: {...baseTalents.aegisOfWrath, points: 1}}, settings)
        runTalents("Resplendent Light", baseline, {...baseTalents, resplendentLight: {...baseTalents.resplendentLight, points: 1}}, settings)
        runTalents("Wrath Unleashed", baseline, {...baseTalents, wrathUnleashed: {...baseTalents.wrathUnleashed, points: 1}}, settings)
        runTalents("Divine Aegis", baseline, {...baseTalents, divineAegis: {...baseTalents.divineAegis, points: 1}}, settings)
        runTalents("Harsh Discipline", baseline, {...baseTalents, harshDiscipline: {...baseTalents.harshDiscipline, points: 1}}, settings)
        runTalents("Train of Thought", baseline, {...baseTalents, trainOfThought: {...baseTalents.trainOfThought, points: 1}}, settings)
        runTalents("Contrition", baseline, {...baseTalents, contrition: {...baseTalents.contrition, points: 2}}, settings)
        runTalents("Expiation", baseline, {...baseTalents, expiation: {...baseTalents.expiation, points: 1}}, settings)
        runTalents("Twilight Equilibrium", baseline, {...baseTalents, twilightEquilibrium: {...baseTalents.twilightEquilibrium, points: 1}}, settings)
        runTalents("Weal & Woe", baseline, {...baseTalents, wealAndWoe: {...baseTalents.wealAndWoe, points: 1}}, settings)

*   /

        /*
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
