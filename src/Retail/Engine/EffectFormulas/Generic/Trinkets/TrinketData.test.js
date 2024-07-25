

import {getProcessedValue, processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "General/Modules/Player/Player";
import { trinket_data} from "../ShadowlandsTrinketData";
import { raidTrinketData } from "./RaidTrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";
import each from "jest-each";

describe("Blossom of Amirdrassil", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Blossom of Amirdrassil");
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${496}  | ${[Math.floor(561604/6),  Math.floor(280791/6), Math.floor(842396)]}
    ${535}  | ${[Math.floor(942039/6),  Math.floor(471002/6), Math.floor(1413041)]}
    // add new test cases here
    `.test("Blossom of Amirdrassil Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        //expect(processedValue(effect[0], level)).toBe(expectedResult[0]);
        //expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
        expect(processedValue(effect[2], level)).toBe(expectedResult[2]);
    });
}); 



describe("Ominous Chromatic Essence", () => { 
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Ominous Chromatic Essence");;
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${528}  | ${[763, 80]}
    // add new test cases here
    `.test("Ominous Chromatic Essence Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level)).toBe(expectedResult[0]);
        expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
    });
}); 

