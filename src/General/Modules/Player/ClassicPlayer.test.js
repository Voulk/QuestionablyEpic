
import ClassicPlayer from './ClassicPlayer';

describe("Test Constructor", () => {
    const player = new ClassicPlayer("Mock", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

    test("Very Basic Mock Object test", () => {
        expect(player.charName).toEqual("Mock");
    });

    test("Test Game Type", () => {
        expect(player.gameType).toEqual("Classic");
    });

    console.log(player.getRace())
});