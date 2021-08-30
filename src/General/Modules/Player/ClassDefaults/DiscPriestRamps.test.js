import Player from 'General/Modules/Player/Player';
import { runCastSequence } from "./DiscPriestRamps";

describe("Evang Cast Sequence", () => {
    const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    
    test("Basic Test", () => {
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
        const demoSequence3 = ['Purge the Wicked', 'Rapture', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
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
        console.log("Boon Ramp with CoM, Bell: " + runCastSequence(demoSequence4, player, {"Clarity of Mind": true}, {"Courageous Ascension": 226}));
        console.log("Boon Ramp with CoM, Bell & Kleia: " + runCastSequence(demoSequence4, player, {"Clarity of Mind": true, "Kleia": true}, {"Courageous Ascension": 226}));
        //console.log("Boon Ramp with CoM, Bell & Pelagos: " + runCastSequence(demoSequence4, player, {"Clarity of Mind": true, "Pelagos": true}, {"Courageous Ascension": 226}));
        //runCastSequence(demoSequence4, player, {"Clarity of Mind": true});
    });
    
});