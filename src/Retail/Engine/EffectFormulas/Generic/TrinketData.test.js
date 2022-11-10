

import {getProcessedValue, processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { userSettings } from "General/Modules/Settings/SettingsObject";
import Player from "General/Modules/Player/Player";
import { trinket_data} from "./ShadowlandsTrinketData";
import { raidTrinketData } from "./TrinketData";
import each from "jest-each";

describe("Broodkeeper's Promise", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Broodkeeper's Promise");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${398}  | ${152}
    // add new test cases here
    `.test("Broodkeeper's Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});