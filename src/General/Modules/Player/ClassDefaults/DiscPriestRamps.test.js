import { Stats } from 'fs';
import Player from 'General/Modules/Player/Player';
import { runCastSequence, buildRamp } from "./DiscPriestRamps";


describe("Evang Cast Sequence", () => {
    const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    
    test("Basic Test", () => {

        //console.log("Boon Ramp with CoM, Bell: " + runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell & Kleia: " + runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true, "Kleia": true}, {"Courageous Ascension": 226}));
        const boonSeq = buildRamp('Boon', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])
        const fiendSeq = buildRamp('Fiend', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])

        console.log(boonSeq);
        console.log(fiendSeq);
        const baselineBoon = runCastSequence(boonSeq, player.activeStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226});
        const baselineFiend = runCastSequence(fiendSeq, player.activeStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226});
        
        const baseline = baselineBoon + baselineFiend;
        
        //console.log("Boon Ramp with CoM, Bell, Radiance & Pelagos (+10 int): " + runCastSequence(demoSequence4, intLine, {"Clarity of Mind": true, "Pelagos": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell, Radiance & Pelagos (+10 crit): " + runCastSequence(demoSequence4, critLine, {"Clarity of Mind": true, "Pelagos": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell, Radiance & Pelagos (+10 vers): " + runCastSequence(demoSequence4, versLine, {"Clarity of Mind": true, "Pelagos": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell, Radiance & Pelagos (+10 mastery): " + runCastSequence(demoSequence4, mastLine, {"Clarity of Mind": true, "Pelagos": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //runCastSequence(demoSequence4, player, {"Clarity of Mind": true});


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
    });
    
});

describe("Sequence Builder", () => {
    const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    
    test("Basic Test", () => {
        buildRamp('Boon', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])
        buildRamp('Fiend', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])

    })

});