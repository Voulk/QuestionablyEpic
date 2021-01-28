import { applyDiminishingReturns } from "./TopGearEngine";

describe("Test Stat DRs", () => {
    test("Basic Test - Crit above DR", () => {

        let stats = {
            crit: 1200
        }
        stats = applyDiminishingReturns(stats);

        expect(stats.crit).toEqual(1185);

    });
});