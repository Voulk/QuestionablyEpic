

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

describe("Ovi'nax's Mercurial Egg", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    // Coeff #2 is used for both the mastery and crit procs and they have the same name.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Ovi'nax's Mercurial Egg");
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${616}  | ${[145, 140]}
    // add new test cases here
    `.test("Ovi'nax's Mercurial Egg Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level, 1)).toBe(expectedResult[0]);
        expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
    });
}); 

describe("Spymaster's Web", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    // Coeff #2 is used for both the mastery and crit procs and they have the same name.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Spymaster's Web");
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${619}  | ${[88, 846]}
    // add new test cases here
    `.test("Spymaster's Web Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level, 1)).toBe(expectedResult[0]);
        expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
    });
}); 

describe("Treacherous Transmitter", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    // Coeff #2 is used for both the mastery and crit procs and they have the same name.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Treacherous Transmitter");
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${616}  | ${[13708]}
    // add new test cases here
    `.test("Treacherous Transmitter Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level, 1)).toBe(expectedResult[0]);
    });
}); 

describe("Gruesome Syringe", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    // Coeff #2 is used for both the mastery and crit procs and they have the same name.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Gruesome Syringe");
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${616}  | ${[251029, 4401]}
    // add new test cases here
    `.test("Gruesome Syringe Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level)).toBe(expectedResult[0]);
        expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
    });
}); 

describe("Gale of Shadows", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    // Coeff #2 is used for both the mastery and crit procs and they have the same name.
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Gale of Shadows");
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${597}  | ${[129]}
    // add new test cases here
    `.test("Gale of Shadows Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level, 1)).toBe(expectedResult[0]);
    });
}); 
