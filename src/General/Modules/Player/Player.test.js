
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

describe("Covenant getters / setters", () => {
    test("Set Correct Covenant", () => {
        const druid = new Player("Broccoliz", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

        druid.setCovenant("venthyr");
        expect(druid.getCovenant()).toEqual("venthyr");
    });
    /*
    test("Set Invalid Covenant", () => {
        const druid = new Player("Vrocas", "Restoration Druid", 99, "EU", "Tarren Mill", "Tauren");
        expect(() => 
            {druid.setCovenant("Maldraxxus");
        }).toThrow("Invalid Covenant Supplied");   
    }); */
    test("Set null covenant.", () => {
        const druid = new Player("VoulkDruid", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

        druid.setCovenant(null);
        expect(druid.getCovenant()).toEqual("night_fae");
    });

    test("Set blank covenant.", () => {
        const druid = new Player("VoulkDruid", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

        druid.setCovenant("");
        expect(druid.getCovenant()).toEqual("night_fae");
    });

    test("Set Correct Covenant but with erroneous quotes.", () => {
        const druid = new Player("VoulkDruid", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

        druid.setCovenant('"night_fae"');
        expect(druid.getCovenant()).toEqual("night_fae");
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



