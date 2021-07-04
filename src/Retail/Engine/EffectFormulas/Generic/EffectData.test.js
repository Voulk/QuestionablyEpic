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
    ${4}  | ${25}
    ${3}  | ${20}
    ${0}  | ${17}
    // add new test cases here
    `.test("Shard of Zed Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient[rank], effect.table, 200)).toBe(expectedResult);
    });
});