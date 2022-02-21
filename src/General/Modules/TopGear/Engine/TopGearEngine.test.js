import { mergeBonusStats, buildBestDomSet } from "./TopGearEngine";
import { applyDiminishingReturns } from "General/Engine/ItemUtilities"
import Player from '../../Player/Player';
import { processItem } from "Retail/Engine/SimCImport/SimCImportEngine"
import { buildWepCombos } from "General/Engine/ItemUtilities"
import { runTopGear } from "./TopGearEngine";

describe("Test Stat DRs", () => {
    test("Basic Test - Crit above DR", () => {

        let stats = {
            crit: 1200,
            haste: 400,
            versatility: 200,
            mastery: 600,
            leech: 0,
        }
        stats = applyDiminishingReturns(stats);

        expect(stats.crit).toEqual(1185);
    });

    test("Expanded Test - Haste way above DR", () => {

        let stats = {
            crit: 80,
            haste: 1845,
            versatility: 200,
            mastery: 600,
            leech: 0,
        }
        stats = applyDiminishingReturns(stats);

        expect(Math.round(stats.haste)).toEqual(1688);
    });

    test("Leech DR", () => {

        let stats = {
            crit: 300,
            haste: 400,
            versatility: 200,
            mastery: 600,
            leech: 335,
        }
        stats = applyDiminishingReturns(stats);

        expect(stats.leech).toEqual(306);
    });

    test("Leech DR test 2", () => {

        let stats = {
            crit: 300,
            haste: 400,
            versatility: 200,
            mastery: 600,
            leech: 437,
        }
        stats = applyDiminishingReturns(stats);

        expect(Math.round(stats.leech)).toEqual(364);
    });
});

describe("MergeBonusStats function", () => {
    test("Test 1, range of stats", () => {
        const bonusStatArray = [{
            intellect: 34,
            crit: 14
            },
            {
            intellect: 10,
            haste: 20,
            HPS: 99
            }];

        const expectedResult = {
            intellect: 44,
            crit: 14,
            haste: 20,
            hps: 99,
            mastery: 0,
            versatility: 0,
            leech: 0,
            dps: 0
        }

        expect(mergeBonusStats(bonusStatArray)).toEqual(expectedResult);
    });

});

describe("Top Gear full test", () => {
    test("Test 1, Resto Druid Stats Check", () => {
        const player = new Player("Mock", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

        var lines = testDruidSet.split("\n");

        for (var line = 0; line < lines.length; line++) {
            const item = processItem(lines[line], player, "Raid", "Regular")
            if (item) player.addActiveItem(item);

        }
        //console.log(player.activeItems);
        const wepCombos = buildWepCombos(player, true);
        const result = runTopGear(player.activeItems, wepCombos, player, "Raid", player.getHPS("Raid"), "en", {}, player.getActiveModel("Raid"))
        const setStats = result.itemSet.setStats;

        expect(setStats.haste).toEqual(845);
        expect(setStats.versatility).toEqual(363);
    });

    test("Test 1, Resto Shaman Stats Check", () => {
        const player = new Player("Mock", "Restoration Shaman", 99, "NA", "Stonemaul", "Night Elf");

        var lines = testShamanSet.split("\n");

        for (var line = 0; line < lines.length; line++) {
            const item = processItem(lines[line], player, "Raid", "Regular")
            if (item) player.addActiveItem(item);

        }
        //console.log(player.activeItems);
        const wepCombos = buildWepCombos(player, true);
        const result = runTopGear(player.activeItems, wepCombos, player, "Raid", player.getHPS("Raid"), "en", {}, player.getActiveModel("Raid"))
        const setStats = result.itemSet.setStats;

        expect(setStats.versatility).toEqual(313);
        expect(setStats.haste).toEqual(494);
        expect(setStats.mastery).toEqual(335+11.66*25);
    });

    // TODO: Tier Set Check


    /*
    test("Test 1, Disc Priest Dom Gem Check", () => {
        const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
        player.setDominationRanks({
            "Shard of Bek": 2,
            "Shard of Jas": 2,
            "Shard of Rev": 2,
            "Shard of Cor": 2,
            "Shard of Tel": 2,
            "Shard of Kyr": 2,
            "Shard of Dyz": 4,
            "Shard of Zed": 4,
            "Shard of Oth": 4,
          })
        var lines = testDiscSet.split("\n");

        for (var line = 0; line < lines.length; line++) {
            const item = processItem(lines[line], player, "Raid", "Regular")
            if (item) player.addActiveItem(item);

        }
        //console.log(player.activeItems);
        const wepCombos = buildWepCombos(player, true);
        const result = runTopGear(player.activeItems, wepCombos, player, "Raid", player.getHPS("Raid"), "en", {replaceDomGems: true}, player.getActiveModel("Raid"))

        const chaosBane = result.itemSet.effectList.filter((effect) => effect.name === "Chaos Bane");

        expect(chaosBane[0].rank).toEqual(4);

        //console.log(gemSetFilter);
    }) */

});

const testDiscSet = `
head=,id=186325,gem_id=187286,bonus_id=7188/6652/1485/6646
neck=,id=186378,bonus_id=7187/42/7575/1498/6646
shoulder=,id=186324,gem_id=187319,bonus_id=7188/6652/1485/6646
back=,id=186289,enchant_id=6204,bonus_id=7188/6652/1485/6646
chest=,id=186320,enchant_id=6230,gem_id=187320,bonus_id=7188/41/1485/6646
wrist=,id=186321,gem_id=187297,bonus_id=7188/6652/1485/6646
hands=,id=186288,bonus_id=7187/6652/1498/6646
waist=,id=186322,gem_id=187318,bonus_id=7188/6652/1485/6646
legs=,id=179351,bonus_id=7593/7359/6652/1566/6646
feet=,id=186319,bonus_id=7187/41/1498/6646
finger1=,id=178926,enchant_id=6166,gem_id=173128,bonus_id=6980/6649/6650/6935/7451/1559
finger2=,id=179355,enchant_id=6164,gem_id=169220,bonus_id=7622/7359/6652/7576/1566/6646
trinket1=,id=184030,bonus_id=7187/6652/1498/6646
trinket2=,id=184021,bonus_id=7187/6652/1498/6646
main_hand=,id=186385,enchant_id=6229,bonus_id=7187/41/1498/6646
off_hand=,id=186418,bonus_id=7187/6652/1498/6646
`

const testDruidSet = `
head=,id=185797,bonus_id=7732/7359/43/7575/1550/6646
neck=,id=185820,bonus_id=7731/7359/6652/7574/1543/6646
shoulder=,id=178763,bonus_id=7608/7359/6652/1566/6646
back=,id=183033,enchant_id=6204,bonus_id=7188/40/1485/6646
chest=,id=185786,enchant_id=6230,bonus_id=7732/7359/41/1550/6646
wrist=,id=178702,enchant_id=6220,bonus_id=7622/7359/6652/7575/1566/6646
hands=,id=172316,bonus_id=7098/6649/6648/6718/1522
waist=,id=178699,bonus_id=7370/7359/40/7193/1524/6646
legs=,id=178819,bonus_id=7348/7359/6652/1521/6646
feet=,id=178731,bonus_id=7603/7359/6652/1550/6646
finger1=,id=178933,enchant_id=6166,bonus_id=7622/7359/41/7575/1566/6646
finger2=,id=173133,enchant_id=6166,gem_id=173128,bonus_id=7461,drop_level=60,crafted_stats=40
trinket1=,id=178769,bonus_id=7608/7359/6652/1566/6646
trinket2=,id=181334,bonus_id=6652/1472/5865/6616
main_hand=,id=178829,enchant_id=6229,bonus_id=7412/7359/6652/1524/6646
`

const testShamanSet = `
head=,id=178692,bonus_id=6807/6652/7193/1498/6646
neck=,id=173146,gem_id=153709,crafted_stats=49
shoulder=,id=178695,bonus_id=6807/6652/1498/6646
back=,id=180123,enchant_id=6204,bonus_id=6807/6652/1498/6646
chest=,id=180100,bonus_id=6807/6652/1498/6646
wrist=,id=178767,bonus_id=6807/42/7193/1498/6646
hands=,id=179325,bonus_id=6807/6652/1498/6646
waist=,id=180110,bonus_id=6807/6652/7194/1498/6646
legs=,id=178839,bonus_id=6807/6652/1498/6646
feet=,id=178745,bonus_id=6807/6652/1498/6646
finger1=,id=178872,bonus_id=6807/6652/7193/1498/6646
finger2=,id=178736,enchant_id=6166,bonus_id=6807/6652/7194/1498/6646
trinket1=,id=178809,bonus_id=6806/6652/1485/4785
trinket2=,id=178298,bonus_id=6784/1485/6616
main_hand=,id=178714,enchant_id=6229,bonus_id=6807/6652/1498/6646
`