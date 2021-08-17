
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

/*
describe("Test Default Stat Weights", () => {

    test("Druid", () => {
        const druid = new Player("Mock", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
        const starterWeights = {...druid.statWeights};
    
        druid.statWeights.Raid = {intellect: 9, crit: 9321, haste: 92, mastery: 1.3, leech: 9999};
        druid.statWeights.Dungeon = {intellect: 1, crit: 32121, haste: 31, mastery: 0.8, leech: 21};

        druid.setDefaultWeights("Restoration Druid", "Raid");
        druid.setDefaultWeights("Restoration Druid", "Dungeon");

        expect(druid.statWeights).toEqual(starterWeights);

    });

    test("Paladin", () => {
        const paladin = new Player("Mock", "Holy Paladin", 99, "NA", "Stonemaul", "Night Elf");
        const starterWeights = {...paladin.statWeights};
    
        paladin.statWeights.Raid = {intellect: 9, crit: 9321, haste: 92, mastery: 1.3, leech: 9999};
        paladin.statWeights.Dungeon = {intellect: 1, crit: 32121, haste: 31, mastery: 0.8, leech: 21};

        paladin.setDefaultWeights(paladin.getSpec(), "Raid");
        paladin.setDefaultWeights(paladin.getSpec(), "Dungeon");

        expect(paladin.statWeights).toEqual(starterWeights);

    });

    test("Disc Priest", () => {
        const priest = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
        const starterWeights = {...priest.statWeights};
    
        priest.statWeights.Raid = {intellect: 9, crit: 9321, haste: 92, mastery: 1.3, leech: 9999};
        priest.statWeights.Dungeon = {intellect: 1, crit: 32121, haste: 31, mastery: 0.8, leech: 21};

        priest.setDefaultWeights(priest.getSpec(), "Raid");
        priest.setDefaultWeights(priest.getSpec(), "Dungeon");

        expect(priest.statWeights).toEqual(starterWeights);

    });
    
    // Can add the other specs below if necessary.

});*/


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

