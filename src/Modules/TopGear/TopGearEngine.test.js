import { applyDiminishingReturns } from "./TopGearEngine";

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

        expect(stats.leech).toEqual(331);
    });
});