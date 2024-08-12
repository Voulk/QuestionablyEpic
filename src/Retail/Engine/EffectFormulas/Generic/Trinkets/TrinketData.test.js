

import {getProcessedValue, processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "General/Modules/Player/Player";
import { trinket_data} from "../ShadowlandsTrinketData";
import { raidTrinketData } from "./RaidTrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";
import each from "jest-each";

/*describe("Amalgam's Seventh Spine", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Amalgam's Seventh Spine");
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${447}  | ${832} // 832    499   459   499
    // add new test cases here
    `.test("Amalgam's Seventh Spine Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level)).toBe(expectedResult);

    });
}); */

describe("Cirral Concoctory", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    // Coeff #2 is used for both the mastery and crit procs and they have the same name.
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Cirral Concoctory");
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${597}  | ${[4436, 2235, 1118, 0, 39238]}
    // add new test cases here
    `.test("Cirral Concoctory Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level, 1, 'ceil')).toBe(expectedResult[0]);
        expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
        expect(processedValue(effect[2], level)).toBe(expectedResult[2]);
        expect(processedValue(effect[4], level)).toBe(expectedResult[4]);
    });
}); 
