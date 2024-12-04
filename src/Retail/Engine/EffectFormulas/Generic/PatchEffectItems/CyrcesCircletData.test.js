import { processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "General/Modules/Player/Player";
import { circletGemData } from "./CyrcesCircletData";
import each from "jest-each";



describe("Fathomdweller's Runed Citrine Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    // ${428}  | ${505}
    const activeEffect = circletGemData.find((effect) => effect.name === "Fathomdweller's Runed Citrine");
    //const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${619}  | ${1408}
    ${639}  | ${1634}
    // add new test cases here
    `.test("Fathomdweller's Runed Citrine Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        const value = activeEffect.processedValue(activeEffect.effects[0], [], null, level)
        expect(value).toEqual(expectedResult);
        //expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Windsinger's Runed Citrine Data Check", () => {
    const activeEffect = circletGemData.find((effect) => effect.name === "Windsinger's Runed Citrine");

    each`
    level   | expectedResult
    ${619}  | ${1760}
    ${639}  | ${2043}
    // add new test cases here
    `.test("Windsinger's Runed Citrine Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        const value = activeEffect.processedValue(activeEffect.effects[0], [], null, level)
        expect(value).toEqual(expectedResult);
        //expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Stormbringer's Runed Citrine Data Check", () => {
    const activeEffect = circletGemData.find((effect) => effect.name === "Stormbringer's Runed Citrine");

    each`
    level   | expectedResult
    ${619}  | ${440}
    ${639}  | ${511}
    // add new test cases here
    `.test("Stormbringer's Runed Citrine Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        const value = activeEffect.processedValue(activeEffect.effects[0], [], null, level)
        expect(value).toEqual(expectedResult);
        //expect(processedValue(effect, level)).toBe(expectedResult);
    });
});