
import Player from './Player';


describe("Test Constructor", () => {
    const player = new Player("Mock", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

    test("Very Basic Mock Object test", () => {
        expect(player.charName).toEqual("Mock");
    });

});

describe("Test Default Model Weights", () => {

    test("Mistweaver Monk", () => {
        const monk = new Player("Mock", "Mistweaver Monk", 99, "NA", "Stonemaul", "Night Elf");
        const starterWeights = {...monk.getActiveModel("Raid").baseStatWeights};
        //console.log(monk)

        expect(starterWeights.crit).toEqual(monk.getStatWeight("Raid", "crit"))

    });

});


describe("GetHighestStatWeight", () => {
    test("Basic Test", () => {
        const druid = new Player("Torty", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
        druid.getActiveModel("Raid").setStatWeights({intellect: 1, crit: 0.45, haste: 0.44, mastery: 0.42, leech: 0.6});

        expect(druid.getHighestStatWeight("Raid")).toEqual("crit");
        
    });
    test("Stat Weights with Ignore", () => {
        const druid = new Player("Myth", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
        druid.getActiveModel("Raid").setStatWeights({intellect: 1, crit: 0.45, haste: 0.44, mastery: 0.42, leech: 0.6});

        expect(druid.getHighestStatWeight("Raid", ["crit"])).toEqual("haste");

    });
    // More to come. Test equal stat weights, and the ignore function.

});



