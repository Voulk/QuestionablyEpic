import { getProcessedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { userSettings } from "General/Modules/Settings/SettingsObject";
import Player from "General/Modules/Player/Player";
import { effectData} from "./EffectData";
import each from "jest-each";

describe("Passable Credentials Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Passable Credentials");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${226}  | ${25}
    ${200}  | ${20}
    ${183}  | ${17}
    // add new test cases here
    `.test("Passable Credientials Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});


describe("Shard of Zed Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Shard of Zed");
    const effect = activeEffect.effects[0];

    each`
    rank   | expectedResult
    ${4}  | ${334}
    ${3}  | ${292}
    ${2}  | ${250}
    ${1}  | ${208}
    ${0}  | ${166}
    // add new test cases here
    `.test("Shard of Zed Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 200, 1, false))).toBe(expectedResult);
    });
});

describe("Chaos Bane Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Chaos Bane");
    

    each`
    effectNum   | expectedResult
    ${1}  | ${300}
    ${0}  | ${10}
    // add new test cases here
    `.test("Chaos Bane Test - $effectNum - Expects: $expectedResult", ({ effectNum, expectedResult }) => {
        let effect = activeEffect.effects[effectNum];
        console.log(effect);
        expect(getProcessedValue(effect.coefficient, effect.table, 174, 1, true)).toBe(expectedResult);
    });
});