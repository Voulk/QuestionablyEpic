
import Player from './Player';


describe("Test Constructor", () => {
    const player = new Player("Mock", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

    test("Very Basic Mock Object test", () => {
        expect(player.charName).toEqual("Mock");
    });

});


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

});


describe("Covenant getters / setters", () => {
    test("Set Correct Covenant", () => {
        const druid = new Player("Broccoliz", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

        druid.setCovenant("night_fae");
        expect(druid.getCovenant()).toEqual("night_fae");
    });

    test("Set Invalid Covenant", () => {
        const druid = new Player("Vrocas", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
        expect(() => 
            {druid.setCovenant("Maldraxxus");
        }).toThrow("Invalid Covenant Supplied");   
    });
});

describe("GetHighestStatWeight", () => {
    test("Basic Test", () => {
        const druid = new Player("Torty", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
        druid.statWeights.Raid = {intellect: 9, crit: 0.45, haste: 0.44, mastery: 0.42, leech: 0.6};

        
    });

    // More to come. Test equal stat weights, and the ignore function.

});


