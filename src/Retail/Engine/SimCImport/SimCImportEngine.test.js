
import Player from "General/Modules/Player/Player";
import { processItem, processAllLines, runSimC} from "Retail/Engine/SimCImport/SimCImportEngine.js"

const testDiscSet = 
`
# Voulkpriest - Discipline - 2021-10-06 12:44 - US/Stonemaul
# SimC Addon 9.1.0-01
# Requires SimulationCraft 910-01 or newer

priest="Voulkpriest"
level=60
race=human
region=us
server=stonemaul
role=spell
professions=alchemy=1/herbalism=40
talents=3333113
spec=discipline

covenant=kyrian
# soulbind=pelagos:7,328266/87:7:1/328261/283:8:1/328265/114:9:1/71:7:0/328257/75:7:0/351146/66:7:0/351149
# soulbind=kleia:13,329791/84:7:1/334066/69:7:1/329784/66:7:1/283:8:1/329778/116:9:0/351489/67:9:0/351491
soulbind=forgelite_prime_mikanikos:18,333950/114:9:1/331609/67:9:1/331726/66:7:1/75:7:1/331611/87:7:0/352186/71:7:0/352188
# conduits_available=75:7/76:7/77:9/78:9/81:8/82:7/84:7/87:7/107:7/113:8/114:9/115:7/116:9/67:9/69:7/73:8/85:7/66:7/71:7/72:9/283:8
renown=71

head=,id=186287,gem_id=187316,bonus_id=7187/6652/1498/6646
neck=,id=186378,bonus_id=7187/42/7575/1498/6646
shoulder=,id=186324,gem_id=187319,bonus_id=7188/6652/1485/6646
back=,id=186289,enchant_id=6204,bonus_id=7188/6652/1485/6646
chest=,id=186320,enchant_id=6230,gem_id=187320,bonus_id=7188/41/1485/6646
wrist=,id=186321,gem_id=187304,bonus_id=7188/6652/1485/6646
hands=,id=186288,bonus_id=7187/6652/1498/6646
waist=,id=186322,gem_id=187318,bonus_id=7188/6652/1485/6646
legs=,id=179351,bonus_id=7593/7359/6652/1566/6646
feet=,id=186319,bonus_id=7187/41/1498/6646
finger1=,id=178926,enchant_id=6166,gem_id=173128,bonus_id=6980/6649/6650/6935/7451/1559
finger2=,id=179355,enchant_id=6166,gem_id=169220,bonus_id=7622/7359/6652/7576/1566/6646
trinket1=,id=184842,bonus_id=6652/1472/5900/6646
trinket2=,id=186423,bonus_id=7187/6652/1498/6646
main_hand=,id=186385,enchant_id=6229,bonus_id=7187/41/1498/6646
off_hand=,id=186418,bonus_id=7187/6652/1498/6646
`

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

describe("updatePlayerStats function", () => {
    test("Sample Disc Loadout", () => {
        const player = new Player("Voulk", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
        var lines = testDiscSet.split("\n");

        processAllLines(player, "Raid", "venthyr", lines, -1, -1)

        console.log(player.activeStats);
    });

})

// Add tests for Domination items.