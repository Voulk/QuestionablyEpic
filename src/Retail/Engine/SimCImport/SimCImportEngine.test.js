
import Player from "General/Modules/Player/Player";
import { processItem, processAllLines, runSimC} from "Retail/Engine/SimCImport/SimCImportEngine.js"

const testDiscSet = 
`
# Voulk - Restoration - 2021-11-02 15:51 - US/Stonemaul
# SimC Addon 9.1.0-01
# Requires SimulationCraft 910-01 or newer

druid="Voulk"
level=60
race=night_elf
region=us
server=stonemaul
role=attack
professions=alchemy=175/herbalism=175
talents=3323123
spec=restoration

covenant=night_fae
soulbind=niya:1,322721/273:5:0/342270/257:7:0/320687/271:7:0/260:7:0/320662
# soulbind=dreamweaver:2,
# conduits_available=261:5/262:7/263:7/264:7/265:5/266:7/267:7/268:5/269:5/270:7/273:5/274:5/275:7/276:7/279:4/257:7/258:5/259:4/260:7/254:4/255:4/256:1/271:7/272:7
renown=40

head=,id=185797,bonus_id=7732/7359/43/7575/1550/6646
neck=,id=187552,bonus_id=6652/7574
shoulder=,id=178763,bonus_id=7608/7359/6652/1566/6646
back=,id=178755,enchant_id=6204,bonus_id=7384/7359/6652/1524/6646
chest=,id=185786,enchant_id=6230,bonus_id=7732/7359/41/1550/6646
wrist=,id=178702,enchant_id=6220,bonus_id=7622/7359/6652/7575/1566/6646
hands=,id=172316,bonus_id=7098/6649/6648/6718/1522
waist=,id=178699,bonus_id=7370/7359/40/7193/1524/6646
legs=,id=178819,bonus_id=7348/7359/6652/1521/6646
feet=,id=178731,bonus_id=7603/7359/6652/1550/6646
finger1=,id=173133,enchant_id=6166,gem_id=173128,bonus_id=7461,drop_level=60,crafted_stats=40
finger2=,id=178933,enchant_id=6166,bonus_id=7622/7359/41/7575/1566/6646
trinket1=,id=178809,bonus_id=7375/7359/6652/1540/6646
trinket2=,id=178708,bonus_id=7369/7359/6652/6917/1521/6646
main_hand=,id=178829,enchant_id=6229,bonus_id=7412/7359/6652/1524/6646
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
    test("Sample Druid Loadout", () => {
        const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
        var lines = testDiscSet.split("\n");
        const ingameStats = {
            intellect: 1575,
            haste: 790,
            crit: 385,
            mastery: 340,
            versatility: 330,
            leech: 109, // 107
            hps: 0,
            dps: 0
        }

        processAllLines(player, "Raid", "night_fae", lines, -1, -1)
        expect(player.activeStats).toEqual(ingameStats)
    });

    test("Sample Shaman Loadout", () => {
        const player = new Player("Voulk", "Restoration Shaman", 99, "NA", "Stonemaul", "Night Elf");
        var lines = testDiscSet.split("\n");
        const ingameStats = {
            intellect: 0,
            haste: 0,
            crit: 0,
            mastery: 0,
            versatility: 0,
            leech: 0,
            hps: 0,
            dps: 0
        }

        processAllLines(player, "Raid", "night_fae", lines, -1, -1)
        //expect(player.activeStats).toEqual(ingameStats)
    });

})

// Add tests for Domination items.