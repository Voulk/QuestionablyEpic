import { applyDiminishingReturns, mergeBonusStats } from "./TopGearEngine";

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