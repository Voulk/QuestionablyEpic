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
    ${226}  | ${194}
    ${200}  | ${172}
    ${154}  | ${135}
    // add new test cases here
    `.test("Passable Credientials Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});