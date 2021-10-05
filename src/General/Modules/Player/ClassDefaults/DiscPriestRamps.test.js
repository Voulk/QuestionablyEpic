import { Stats } from 'fs';
import Player from 'General/Modules/Player/Player';
import { runCastSequence, buildRamp, allRamps, getSpellRaw } from "./DiscPriestRamps";
import { DISCSPELLS } from "./DiscSpellDB";

// TODO: Test Disc Spells

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
    const critMult = 1.05 + activeStats.crit / 35 / 100; // TODO: Make dynamic to the above stats for cleanliness.
    test("Smite", () => {
        const spell = DISCSPELLS['Smite'][0];

        const damage = getSpellRaw(spell, activeStats);

        expect(Math.round(damage)).toEqual(Math.round(1110*critMult));
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
});

describe("Evang Cast Sequence", () => {
    const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    player.activeStats = {
            intellect: 1974,
            haste: 869,
            crit: 445,
            mastery: 451,
            versatility: 528,
            stamina: 1900,
    }
    
    const boonSeq = buildRamp('Boon', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])
    const fiendSeq = buildRamp('Fiend', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])
    //const baselineBoon = (boonSeq, player.activeStats, {"Clarity of Mind": true, "Pelagos": frunCastSequencealse}, {"Courageous Ascension": 226, "Shining Radiance": 226});
    //const baselineFiend = runCastSequence(fiendSeq, player.activeStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226});
    
    //const baseline = baselineBoon + baselineFiend;

    test("Legendaries", () => {
        const baseline = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": false, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226, "Rabid Shadows": 226});
        console.log("Baseline: " + baseline);
        //const clarityOfMind = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": true, "Pelagos": false}, {});
        //const pelagos = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": false, "Pelagos": true}, {});
        //const exaltation = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": false, "Pelagos": false}, {"Exaltation": 226});
        //const comExaltation = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": true, "Pelagos": false}, {"Exaltation": 226});
        //const rabidShadows = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": false, "Pelagos": false}, {"Rabid Shadows": 226});
        //console.log("RUNNING COURAGEOUS");
        //const courageousAscension = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": false, "Pelagos": false}, {"Courageous Ascension": 226});

        //console.log("Clarity of Mind: " + ((clarityOfMind - baseline) / 180))
        //console.log("Pelagos: " + ((pelagos - baseline) / 180))
        //console.log("Exaltation: " + ((exaltation - baseline) / 180))
        //console.log("CoM + Exaltation: " + ((comExaltation - baseline) / 180))
        //console.log("Rabid Shadows: " + ((rabidShadows - baseline) / 180));
        //console.log("Cour Asc: " + ((courageousAscension - baseline) / 180));

    });

    /*
    test("Stat Weights", () => {

        //console.log("Boon Ramp with CoM, Bell: " + runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell & Kleia: " + runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true, "Kleia": true}, {"Courageous Ascension": 226}));

        
        // Weights
        
        const stats = ['intellect','versatility', 'crit', 'haste', 'mastery'];
        const results = {};
        stats.forEach(stat => {

            const adjustedStats = JSON.parse(JSON.stringify(player.activeStats));
            adjustedStats[stat] = adjustedStats[stat] + 15;

            const seq1 = buildRamp('Boon', 10, ["Divine Bell"], adjustedStats['haste'], ['Rapture'])
            const seq2 = buildRamp('Fiend', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])

            results[stat] = Math.round(runCastSequence(seq1, adjustedStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226}) +
                                    (runCastSequence(seq2, adjustedStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226})));
            
        });
        const weights = {}
        stats.forEach(stat => {
            weights[stat] = (results[stat] - baseline) / (results['intellect'] - baseline);
        });

        console.log(weights); 
    }); */
    
});

describe("Sequence Builder", () => {
    //const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    
    /*
    test("Basic Test", () => {
        buildRamp('Boon', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])
        buildRamp('Fiend', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])

    }) */

});