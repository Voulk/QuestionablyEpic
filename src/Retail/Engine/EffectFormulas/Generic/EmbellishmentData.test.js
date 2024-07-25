
import { processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "General/Modules/Player/Player";
import { embellishmentData } from "./EmbellishmentData";
import each from "jest-each";

describe("Elemental Lariat Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = embellishmentData.find((effect) => effect.name === "Elemental Lariat");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${447}  | ${872}
    // add new test cases here
    `.test("Elemental Lariat Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});
