

import {getProcessedValue, processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { userSettings } from "General/Modules/Settings/SettingsObject";
import Player from "General/Modules/Player/Player";
import { trinket_data} from "./ShadowlandsTrinketData";
import { raidTrinketData } from "./TrinketData";
import each from "jest-each";

/*
describe("Broodkeeper's Promise", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Broodkeeper's Promise");;
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${398}  | ${[190, 2188]}
    // add new test cases here
    `.test("Broodkeeper's Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        //expect(processedValue(effect[0], level)).toBe(expectedResult[0]);
        expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
    });
}); */

describe("Emerald Coach's Whistle", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Emerald Coach's Whistle");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${346}  | ${544}
    ${359}  | ${599}
    ${372}  | ${655}
    // add new test cases here
    `.test("Emerald Coach's Whistle Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});