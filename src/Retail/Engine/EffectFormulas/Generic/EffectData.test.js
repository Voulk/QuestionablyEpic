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

/*
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
        expect(getProcessedValue(effect.coefficient[0], effect.table, 174, 1, true)).toBe(expectedResult);
    });
});*/

describe("Shard of Rev Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Shard of Rev");
    const effect = activeEffect.effects[0];

    each`
    rank   | expectedResult
    ${4}  | ${60}
    ${3}  | ${52}
    ${2}  | ${45}
    ${1}  | ${37}
    ${0}  | ${30}
    // add new test cases here
    `.test("Shard of Rev Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))).toBe(expectedResult);
    });
});

describe("Shard of Tel Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Shard of Tel");
    const effect = activeEffect.effects[0];

    each`
    rank   | expectedResult
    ${4}  | ${342}
    ${3}  | ${299}
    ${2}  | ${256}
    ${1}  | ${213}
    ${0}  | ${171}
    // add new test cases here
    `.test("Shard of Tel Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))).toBe(expectedResult);
    });
});

describe("Shard of Kyr Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Shard of Kyr");
    const effect = activeEffect.effects[0];

    each`
    rank   | expectedResult
    ${4}  | ${1320}
    ${3}  | ${1155}
    ${2}  | ${990}
    ${1}  | ${825}
    ${0}  | ${660}
    // add new test cases here
    `.test("Shard of Kyr Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))).toBe(expectedResult);
    });
});

describe("Shard of Dyz Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Shard of Dyz");
    const effect = activeEffect.effects[0];

    each`
    rank   | expectedResult
    ${4}  | ${50}
    ${3}  | ${44}
    ${2}  | ${37}
    ${1}  | ${31}
    ${0}  | ${25}
    // add new test cases here
    `.test("Shard of Dyz Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))).toBe(expectedResult);
    });
});
/*
describe("Blood Link Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Blood Link");
    
    each`
    effectNum   | expectedResult
    ${0}  | ${540}
    // add new test cases here
    `.test("Blood Link Test - $effectNum - Expects: $expectedResult", ({ effectNum, expectedResult }) => {
        let effect = activeEffect.effects[effectNum];
        console.log(effect);
        expect(getProcessedValue(effect.coefficient[0], effect.table, 174, 1, true)).toBe(expectedResult);
    });
}); */
