import Player from 'General/Modules/Player/Player';
import { runCastSequence } from "./DiscPriestRamps";

describe("Evang Cast Sequence", () => {
    const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");

    test("Basic Test", () => {
        const demoSequence = ['Purge the Wicked', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
                            'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 'Power Word: Shield', 
                            'Power Word: Radiance', 'Power Word: Radiance', 'Smite', 'Evangelism'];
        runCastSequence(demoSequence, player);

    });

});