import { processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "General/Modules/Player/Player";
import { effectData} from "./EffectData";
import each from "jest-each";


describe("Seal of Filial Duty Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Seal of Filial Duty");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${418}  | ${57885}
    ${430}  | ${69697}
    // add new test cases here
    `.test("Seal of Filial Duty Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

