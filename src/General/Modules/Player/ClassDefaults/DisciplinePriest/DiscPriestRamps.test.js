import { Stats } from 'fs';
import Player from 'General/Modules/Player/Player';
import { allRamps, allRampsHealing } from "./DiscRampUtilities";
import { getSpellRaw, runCastSequence } from "./DiscPriestRamps";
import { genStatWeights } from './DiscPriestUtilities';
import { buildRamp } from "./DiscRampGen";
import { DISCSPELLS, baseTalents } from "./DiscSpellDB";
import { shadowFiendProfile } from './DiscPriestDefaultAPL';
import { runAPLSuites } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/RampTestSuite";

// These are basic tests to make sure our coefficients and secondary scaling arrays are all working as expected.

describe("Test APL", () => {
    test("Test APL", () => {
        
        console.log("Testing APL");

        const activeStats = {
            intellect: 88764,
            haste: 15950,
            crit: 14275,
            mastery: 13550,
            versatility: 5950,
            stamina: 29000,
            critMult: 2,
        }
    
        const baseSpells = DISCSPELLS;
        const testSettings = {includeOverheal: "No", reporting: true, t31_2: false, seqLength: 45};

        const playerData = { spec: "Discipline Priest", heroTree: "oracle", spells: baseSpells, settings: testSettings, talents: {...baseTalents}, stats: activeStats }
        //const data = runAPLSuites(playerData, shadowFiendProfile, runCastSequence);

        const ttlHealing = allRampsHealing([], activeStats, {}, baseTalents, [])
        console.log("Total Healing: " + ttlHealing);
        
        runStats(playerData);
        expect(true).toEqual(true);
    })
});

const runStats = (playerData) => {
    const stats = ['crit', 'mastery', 'haste', 'versatility', 'intellect', ];
    const iterations = 1;
    let baseline = 0;

    const activeStats = { // Here we'll just reset activeStats so that we have the same amount of each.
        intellect: 76000 * 1.05 * 1.05,
        haste: 10000,
        crit: 10000,
        mastery: 10000 + (2 * 700),
        versatility: 10000 + (3 * 780),
        stamina: 29000,
        critMult: 2,
    }

    playerData.stats = activeStats;
    
    for (let i = 0; i < iterations; i++) {
        baseline += allRampsHealing([], activeStats, {}, baseTalents, []);
    }

    baseline = baseline / iterations
    
    const results = {};

    stats.forEach(stat => {
        let statHealing = 0;
        let playerStats = JSON.parse(JSON.stringify(playerData.stats));
        playerStats[stat] = playerStats[stat] + 2400;
        const newPlayerData = {...playerData, stats: playerStats};
        for (let i = 0; i < iterations; i++) {
            statHealing += allRampsHealing([], playerStats, {}, baseTalents, []);
        }
        results[stat] = statHealing / iterations;

    });
    const weights = {}

    stats.forEach(stat => {
        weights[stat] = Math.round(1000*(results[stat] - baseline) / (results['intellect'] - baseline))/1000;
    });
    console.log(baseline);
    console.log(weights); 
}

/*

describe("Evang Cast Sequence", () => {
    const activeStats = {
        intellect: 9000,
        haste: 4400,
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

    //console.log(evangSeq)

    const print = (name, base, healing) => {
        let percInc = Math.round(10000*(healing / base - 1))/100;
        console.log(name + ": " + healing + " (+" + percInc + "%)")
    }

    const runTalents = (talentName, baseline, talents, settings) => {
        const seq = buildRamp('Primary', 10, [], activeStats.haste, "", talents)
        print(talentName, baseline, allRampsHealing([], JSON.parse(JSON.stringify(activeStats)), settings, talents));
    }


    test("Test Stuff", () => {

        //const baseline = allRamps(evangSeq, fiendSeq, activeStats, {"playstyle": "Venthyr Evangelism", "Power of the Dark Side": true, true);

        //console.log("Baseline: " + JSON.stringify(runCastSequence(seq, activeStats, {}, talents)))

        const seq = buildRamp('Primary', 10, [], activeStats.haste, "", talentSet)
        const fiendSeq = buildRamp('Secondary', 10, [], activeStats.haste, "", talentSet)


        //console.log(seq);

        const settings = {'Power of the Dark Side': true, 'includeOverheal': true}
        const baseline = allRampsHealing([], JSON.parse(JSON.stringify(activeStats)), settings, baseTalents, [])
        //const baseline = allRamps(runCastSequence(seq, activeStats, settings, talents).totalHealing)
        console.log("Baseline: " + baseline);

        const tier = allRampsHealing([], JSON.parse(JSON.stringify(activeStats)), {...settings, T29_4: true}, baseTalents)
        console.log("Tier: " +  tier + " (" + Math.round(10000*(tier / baseline - 1))/100 + "%)");

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

//    });
//}); 

/*
test("Compendium", () => {
    const spellList = []
    const aura = 0.94;
    const round = (num) => {
        return (Math.round(num * 10000) / 10000).toFixed(2);
    }

    Object.keys(DISCSPELLS).forEach(spellName => {

        if (["Voidmender's Shadowgem", "Time-Breaching Talon", "PenanceTick", "Instructor's Divine Bell (new)", "DefPenanceTick", 
                    "DefPenance", "Rapture", "Halo", "Divine Star"].includes(spellName)) return;

        const fullSpell = DISCSPELLS[spellName];
        const spell = DISCSPELLS[spellName][0];
        const spell2 = DISCSPELLS[spellName][1] || null;
        const spellObj = {}
        spellObj.name = spellName;
        if ('castTime' in spell) {
            if (spell.castTime == 0) spellObj.castTime = "Instant";
            else spellObj.castTime = spell.castTime + " sec";
        }
        if ('cooldown' in spell) {
            spellObj.cooldown = spell.cooldown + " sec";
            if (spell.hastedCooldown) spellObj.hastedCd = "Yes"
            else spellObj.hastedCd = "No"
        }
        else {
            spellObj.cooldown = "N/A"
            spellObj.hastedCd = "N/A"
        }
        if (spellName === "Penance") spellObj.castType = "Channel";
        else spellObj.castType = "Cast";

        // School
        if (spellName === "Purge the Wicked") spellObj.school = "Radiant";
        else spellObj.school = spell.school || "N/A";

        // Mana Cost
        spellObj.manaCost = spell.cost || "Free";


        // Has Travel Time
        if (spellName === "Penance") spellObj.hasTravelTime = "Yes";
        else spellObj.hasTravelTime = "No";

        // Duration
        fullSpell.forEach(slice => {
            if ('buffDuration' in slice) spellObj.duration = slice.buffDuration + " sec";
        })
        if (!('duration' in spellObj)) spellObj.duration = "N/A";

        // Damage SP per event
        if (spell.type === "damage" || ["Shadowfiend", "Mindbender", "Penance"].includes(spellName)) {
            if (spell2 && 'buffDuration' in spell2 && !(spellName === "Schism")) spellObj.dmgSpPerEvent = round(aura * spell2.coeff * 100) + "%";
            else if (spellName === "Divine Star") spellObj.dmgSpPerEvent = round(aura * spell.coeff / 2) + "%";
            else spellObj.dmgSpPerEvent = round(aura * spell.coeff * 100) + "%";

            if (spell2 && 'buffDuration' in spell2 && !(spellName === "Schism")) {
                spellObj.dmgSpPerCast = round(aura * ((spell.coeff || 0) + spell2.coeff * spell2.buffDuration / spell2.tickRate) * 100) + "%";
            }
            else if (spellName === "Penance" || spellName === "DefPenance") spellObj.dmgSpPerCast = round(aura * (spell.coeff || 0) * 3 * 100) + "%";
            else {
                spellObj.dmgSpPerCast = round(aura * ((spell.coeff || 0) * (spell.targets || 1)) * 100)  + "%";
            }
        }
        else {
            spellObj.dmgSpPerEvent = "N/A";
            spellObj.dmgSpPerCast = "N/A";
        }

        // Healing SP per event
        if (spell.type === "heal" || ["Renew", "Rapture", "DefPenance"].includes(spellName)) {
            if (spell2 && !(['Shadow Covenant'].includes(spellName))) spellObj.healingSpPerEvent = round(spell2.coeff * 100) + "%";
            else if (spellName === "Divine Star") spellObj.healingSpPerEvent = round(spell.coeff / 2);
            else spellObj.healingSpPerEvent = round(spell.coeff * 100) + "%";

            if (spell2 && !(['Shadow Covenant'].includes(spellName))) {
                spellObj.healingSpPerCast = round(((spell.coeff || 0) + spell2.coeff * spell2.buffDuration / spell2.tickRate) * 100) + "%";
            }
            else if (spellName === "Penance" || spellName === "DefPenance") spellObj.healingSpPerCast = round((spell.coeff || 0) * 3 * 100) + "%";
            else {
                spellObj.healingSpPerCast = round(((spell.coeff || 0) * (spell.targets || 1)) * 100) + "%";
            }
        }
        else {
            spellObj.healingSpPerEvent = "N/A";
            spellObj.healingSpPerCast = "N/A";
        }


        spellList.push(spellObj);
    })

    console.log(spellList)
}); */

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
