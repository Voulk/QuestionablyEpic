import { applyDiminishingReturns, mergeBonusStats, buildBestDomSet } from "./TopGearEngine";
import Player from '../Player/Player';
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

    test("Leech DR", () => {

        let stats = {
            crit: 300,
            haste: 400,
            versatility: 200,
            mastery: 600,
            leech: 335,
        }
        stats = applyDiminishingReturns(stats);

        expect(stats.leech).toEqual(310);
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
    test("Test 1, Disc Stats Check", () => {
        const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");

        var lines = testDiscSet.split("\n");

        for (var line = 0; line < lines.length; line++) {
            const item = processItem(lines[line], player, "Raid", "Regular")
            if (item) player.addActiveItem(item);
        }
        //console.log(player.activeItems);
        const wepCombos = buildWepCombos(player, true);
        const result = runTopGear(player.activeItems, wepCombos, player, "Raid", player.getHPS("Raid"), "en", {}, player.getActiveModel("Raid"))
        console.log(result);
        
    })

});

const testDiscSet = `
head=,id=186325,gem_id=187286,bonus_id=7188/6652/1485/6646
neck=,id=178927,bonus_id=6974/7194/6647/6648/6758/1532
shoulder=,id=186324,gem_id=187319,bonus_id=7188/6652/1485/6646
back=,id=180123,enchant_id=6204,bonus_id=7615/7359/6652/1543/6646
chest=,id=186320,enchant_id=6230,gem_id=187320,bonus_id=7188/41/1485/6646
wrist=,id=186321,gem_id=187297,bonus_id=7188/6652/1485/6646
hands=,id=186288,bonus_id=7187/6652/1498/6646
waist=,id=186322,gem_id=187318,bonus_id=7188/6652/1485/6646
legs=,id=179351,bonus_id=7593/7359/6652/1566/6646
feet=,id=186281,bonus_id=7187/6652/1498/6646
finger1=,id=186290,enchant_id=6166,bonus_id=7188/6652/7575/1485/6646
finger2=,id=179355,enchant_id=6164,gem_id=169220,bonus_id=7622/7359/6652/7576/1566/6646
trinket1=,id=186423,bonus_id=7187/6652/1498/6646
trinket2=,id=185845,bonus_id=7732/7359/6652/1550/6646
main_hand=,id=186385,enchant_id=6229,bonus_id=7187/41/1498/6646
off_hand=,id=186418,bonus_id=7187/6652/1498/6646
`
