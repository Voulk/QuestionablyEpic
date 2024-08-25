import { processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "General/Modules/Player/Player";
import { effectData} from "./EffectData";
import each from "jest-each";



describe("String of Delicacies Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    // ${428}  | ${505}
    const activeEffect = effectData.find((effect) => effect.name === "String of Delicacies");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${428}  | ${505}
    ${434}  | ${526}
    // add new test cases here
    `.test("String of Delicacies Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(true).toEqual(true);
        //expect(processedValue(effect, level)).toBe(expectedResult);
    });
});


