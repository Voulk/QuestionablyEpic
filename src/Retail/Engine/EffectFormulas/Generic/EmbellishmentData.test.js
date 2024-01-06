
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
    ${447}  | ${667}
    // add new test cases here
    `.test("Elemental Lariat Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

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

describe("Verdant Conduit Data Check", () => {
    // Raw effect values are compared to our spell data. Efficiency excluded.
    // These data tests just make sure that our coefficients and spell tables are correct.
    const effectName = "Verdant Conduit";
    const activeEffect = embellishmentData.find((effect) => effect.name === effectName);
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${473}  | ${271}
    ${482}  | ${281}
    // add new test cases here
    `.test(effectName + " Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Adaptive Dracothyst Armguards Data Check", () => {
    // Raw effect values are compared to our spell data. Efficiency excluded.
    // These data tests just make sure that our coefficients and spell tables are correct.
    const effectName = "Adaptive Dracothyst Armguards";
    const activeEffect = embellishmentData.find((effect) => effect.name === effectName);
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${391}  | ${234}
    ${447}  | ${309}
    ${473}  | ${345}
    // add new test cases here
    `.test(effectName + " Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Undulating Sporecloak Data Check", () => {
    // Raw effect values are compared to our spell data. Efficiency excluded.
    // These data tests just make sure that our coefficients and spell tables are correct.
    const effectName = "Undulating Sporecloak";
    const activeEffect = embellishmentData.find((effect) => effect.name === effectName);
    const effect = activeEffect.effects;

    each`
    level   | expectedResult
    ${447}  | ${[2179, 52316, 71]}
    // add new test cases here
    `.test(effectName + " Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect[0], level)).toBe(expectedResult[0]);
        expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
        expect(processedValue(effect[2], level)).toBe(expectedResult[2]);
    });
});