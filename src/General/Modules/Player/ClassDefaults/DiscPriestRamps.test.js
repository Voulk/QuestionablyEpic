import { Stats } from 'fs';
import Player from 'General/Modules/Player/Player';
import { runCastSequence, buildRamp } from "./DiscPriestRamps";

/*
describe("Evang Cast Sequence", () => {
    const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    
    test("Basic Test", () => {
        const statLine = player.activeStats;
        const intLine = JSON.parse(JSON.stringify(player.activeStats));
        intLine.intellect = intLine.intellect + 10;

        const critLine = JSON.parse(JSON.stringify(player.activeStats));
        critLine.crit = critLine.crit + 10;

        const versLine = JSON.parse(JSON.stringify(player.activeStats));
        versLine.versatility = versLine.versatility + 10;

        const mastLine = JSON.parse(JSON.stringify(player.activeStats));
        mastLine.mastery = mastLine.mastery + 10;

        //console.log("Basic Test");
        const demoSequence = ['Purge the Wicked', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
                            'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
                            'Power Word: Radiance', 'Power Word: Radiance', 'Evangelism', 'Shadowfiend', 'Schism', 'Mind Blast', 'Penance', 'Smite', 'Smite', 'Smite', 'Smite'];
        //runCastSequence(demoSequence, player);
        
        //console.log("Bell Test");
        const demoSequence2 = ['Purge the Wicked', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Radiance', 'Power Word: Radiance', 'Evangelism', 'Divine Bell', 'Shadowfiend', 'Schism', 'Mind Blast', 'Penance', 'Smite', 'Smite', 'Smite', 'Smite'];
        //runCastSequence(demoSequence2, player, {"Clarity of Mind": true});

        //console.log("Boon Ramp without CoM");
        const fiendSequence = ['Purge the Wicked', 'Rapture', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Radiance', 'Power Word: Radiance', 'Evangelism', 'Divine Bell', 'Boon of the Ascended', 'Ascended Blast', 'Schism', 'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 
        'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 'Ascended Blast', 'Ascended Eruption'];
        //runCastSequence(demoSequence3, player, {"Clarity of Mind": false});

        const demoSequence5 = ['Purge the Wicked', 'Rapture', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Radiance', 'Power Word: Radiance', 'Evangelism', 'Boon of the Ascended', 'Ascended Blast', 'Schism', 'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 
        'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 'Ascended Blast', 'Ascended Eruption'];
        //console.log("Boon Ramp (no legendary): " + runCastSequence(demoSequence5, player, {}, {"Courageous Ascension": 226}));
        //console.log("Boon Ramp with CoM: " + runCastSequence(demoSequence5, player, {"Clarity of Mind": true}, {"Courageous Ascension": 226}));

        const demoSequence4 = ['Purge the Wicked', 'Rapture', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Radiance', 'Power Word: Radiance', 'Evangelism', 'Divine Bell', 'Boon of the Ascended', 'Ascended Blast', 'Schism', 'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 
        'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 'Ascended Blast', 'Ascended Eruption'];
        //console.log("Boon Ramp with CoM, Bell: " + runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell & Kleia: " + runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true, "Kleia": true}, {"Courageous Ascension": 226}));
        const baselineBoon = runCastSequence(demoSequence4, player.activeStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226});
        const baselineFiend = runCastSequence(fiendSequence, player.activeStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226});
        
        const baseline = baselineBoon + baselineFiend;
        
        //console.log("Boon Ramp with CoM, Bell, Radiance & Pelagos (+10 int): " + runCastSequence(demoSequence4, intLine, {"Clarity of Mind": true, "Pelagos": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell, Radiance & Pelagos (+10 crit): " + runCastSequence(demoSequence4, critLine, {"Clarity of Mind": true, "Pelagos": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell, Radiance & Pelagos (+10 vers): " + runCastSequence(demoSequence4, versLine, {"Clarity of Mind": true, "Pelagos": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //console.log("Boon Ramp with CoM, Bell, Radiance & Pelagos (+10 mastery): " + runCastSequence(demoSequence4, mastLine, {"Clarity of Mind": true, "Pelagos": true}, {"Courageous Ascension": 226, "Shining Radiance": 226}));
        //runCastSequence(demoSequence4, player, {"Clarity of Mind": true});


        // Weights
        /*
        const stats = ['intellect','versatility', 'crit', 'haste', 'mastery'];
        const results = {};
        stats.forEach(stat => {
            const adjustedStats = JSON.parse(JSON.stringify(player.activeStats));
            adjustedStats[stat] = adjustedStats[stat] + 400;
            results[stat] = Math.round(runCastSequence(demoSequence4, adjustedStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226}) +
                                    (runCastSequence(fiendSequence, adjustedStats, {"Clarity of Mind": true, "Pelagos": false}, {"Courageous Ascension": 226, "Shining Radiance": 226})));
            
        });
        const weights = {}
        stats.forEach(stat => {
            weights[stat] = (results[stat] - baseline) / (results['intellect'] - baseline);
        });

        console.log(results);
        console.log(weights); 
    });
    
}); */

describe("Sequence Builder", () => {
    const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    
    test("Basic Test", () => {
        buildRamp('Boon', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])
        buildRamp('Fiend', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])

    })

});