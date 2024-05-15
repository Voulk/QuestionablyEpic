
import { getManaPool, getManaRegen } from "../Generic/RampGeneric/ClassicBase";

describe("Class Mana Functions", () => {
    test("Mana Pool", () => {
        const currentStats = {
            intellect: 2773,
            spirit: 1595,
        }

        expect(getManaPool(currentStats, "Restoration Druid")).toBe(59950); // Regen: 2336

        const paladinStats = {
            intellect: 3117,
            spirit: 1434,
        }
        expect(getManaPool(currentStats, "Holy Paladin")).toBe(69897);

    });


});