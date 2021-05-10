
import BCPlayer from './BCPlayer';

describe("Test Constructor", () => {
    const player = new BCPlayer("Mock", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

    test("Very Basic Mock Object test", () => {
        expect(player.charName).toEqual("Mock");
    });

    test("Test Game Type", () => {
        expect(player.gameType).toEqual("BurningCrusade");
    });

    console.log(player.getRace())
});