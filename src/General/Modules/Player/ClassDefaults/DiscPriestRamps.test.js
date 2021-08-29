import Player from 'General/Modules/Player/Player';
import { runCastSequence } from "./DiscPriestRamps";

describe("Evang Cast Sequence", () => {
    const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    
    test("Basic Test", () => {
        console.log("Basic Test");
        const demoSequence = ['Purge the Wicked', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
                            'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
                            'Power Word: Radiance', 'Power Word: Radiance', 'Evangelism', 'Shadowfiend', 'Schism', 'Mind Blast', 'Penance', 'Smite', 'Smite', 'Smite', 'Smite'];
        //runCastSequence(demoSequence, player);
        
        console.log("Bell Test");
        const demoSequence2 = ['Purge the Wicked', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Radiance', 'Power Word: Radiance', 'Evangelism', 'Divine Bell', 'Shadowfiend', 'Schism', 'Mind Blast', 'Penance', 'Smite', 'Smite', 'Smite', 'Smite'];
        //runCastSequence(demoSequence2, player, {"Clarity of Mind": true});

        console.log("Boon Ramp");
        const demoSequence3 = ['Purge the Wicked', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
        'Power Word: Radiance', 'Power Word: Radiance', 'Evangelism', 'Divine Bell', 'Ascended Blast', 'Schism', 'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 
        'Ascended Blast', 'Ascended Nova', 'Ascended Nova', 'Ascended Blast', 'Ascended Eruption'];
        runCastSequence(demoSequence3, player, {"Clarity of Mind": true});
    });
    
});