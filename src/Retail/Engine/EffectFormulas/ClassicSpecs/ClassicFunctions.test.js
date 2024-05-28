
import { getManaPool, getManaRegen } from "../Generic/RampGeneric/ClassicBase";

describe("Class Mana Functions", () => {
    test("Mana Pool Druid", () => {
        const currentStats = {
            intellect: 2773,
            spirit: 1595,
        }

        expect(getManaPool(currentStats, "Restoration Druid")).toBe(59950 * 1.02); // Regen: 2336



    });

    test("Mana Pool Paladin", () => {
        const paladinStats = {
            intellect: 3117,
            spirit: 1434,
        }
        expect(getManaPool(paladinStats, "Holy Paladin")).toBe(69897 * 1.02);
    });


});