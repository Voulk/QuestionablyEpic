
import { processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "General/Modules/Player/Player";
import { embellishmentData } from "./EmbellishmentData";
import each from "jest-each";


describe("Weathered Explorer's Stave Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = embellishmentData.find((effect) => effect.name === "Weathered Explorer's Stave");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${482}  | ${4727}
    // add new test cases here
    `.test("Weathered Explorer's Stave Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});