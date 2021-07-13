
import Player from "General/Modules/Player/Player";
import { processItem } from "Retail/Engine/SimCImport/SimCImportEngine.js"


describe("Test Regular Items", () => {
    const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    test("Cabochon of the Infinite Flight", () => {
        const line = "neck=,id=185820,bonus_id=7731/7359/6652/7574/1543/664";
        const item = processItem(line, player, contentType, type)
        expect(item.level).toEqual(226);
        expect(item.stats.haste).toEqual(135);
        expect(item.effect).toEqual("");
    });
    test("Stitchflesh's Misplaced Signet w/ Socket", () => {
        const line = "finger1=,id=178736,bonus_id=7389/7359/6652/6935/1540/6646";
        const item = processItem(line, player, contentType, type)
        expect(item.stats.versatility).toEqual(77);
        expect(item.socket).toEqual(true)
    });
    test("Sparkling Glass Slippers w/ Leech", () => {
        const line = "feet=,id=183023,bonus_id=7187/41/1498/6646";
        const item = processItem(line, player, contentType, type)
        expect(item.stats.leech).toEqual(46);
    });
    test("Perfectly Forged Credentials Effect Item", () => {
        const line = "neck=,id=187552,bonus_id=6652/7575";
        const item = processItem(line, player, contentType, type)
        expect(item.effect).toEqual({type: "special", name: "Passable Credentials"});
    });

});

describe("Test Crafted Items", () => {
    const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    test("Quick Oxxein Ring - No Missive IDs", () => {
        const line = "finger1=,id=173133,bonus_id=7461,drop_level=60,crafted_stats=49";
        const item = processItem(line, player, contentType, type)
        expect(item.level).toEqual(230);
        expect(item.stats.mastery).toEqual(63);
        expect(item.socket).toEqual(true);
        expect(item.uniqueEquip).toEqual("crafted");
    });

    test("Quick Oxxein Ring - Missive Version", () => {
        const line = "finger2=,id=173133,enchant_id=6166,gem_id=173128,bonus_id=7461/6650,drop_level=60,crafted_stats=49";
        const item = processItem(line, player, contentType, type)
        expect(item.level).toEqual(230);
        expect(item.stats.versatility).toEqual(63);
        expect(item.stats.mastery).toEqual(0);
        expect(item.socket).toEqual(true);
        expect(item.uniqueEquip).toEqual("crafted");
    });

});

describe("Test Legendary Items", () => {
    const player = new Player("Voulk", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    test("Flash Concentration on Neck", () => {
        const line = "neck=,id=178927,bonus_id=6974/7194/6647/6648/6758/1532";
        const item = processItem(line, player, contentType, type)
        expect(item.level).toEqual(235);
        expect(item.stats.crit).toEqual(115);
        expect(item.stats.mastery).toEqual(115);
        expect(item.uniqueEquip).toEqual("legendary");
        expect(item.effect).toEqual({type: "spec legendary", name: "Flash Concentration", level: 0});
    }); 

    test("Verdant Infusion on Gloves", () => {
        const line = "# hands=,id=172316,bonus_id=7098/6649/6648/6718/1522";
        const item = processItem(line, player, contentType, type)

        expect(item.level).toEqual(225);
        expect(item.stats.haste).toEqual(53);
        expect(item.uniqueEquip).toEqual("legendary");
        expect(item.effect).toEqual({type: "spec legendary", name: "Verdant Infusion", level: 0});
    });
});

// Add tests for Domination items.