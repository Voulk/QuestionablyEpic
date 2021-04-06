
import { getTrinketEffect, getProcessedValue } from "./TrinketEffectFormulas";
import { userSettings } from "General/Modules/Settings/SettingsObject";
import Player from "General/Modules/Player/Player";
import { trinket_data} from "./TrinketData";
import each from "jest-each";


describe("Insignia of Alacrity Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Sinful Gladiator's Insignia of Alacrity");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${226}  | ${173}
    ${207}  | ${145}
    ${197}  | ${132}
    // add new test cases here
    `.test("Insignia Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Badge of Ferocity Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Sinful Gladiator's Badge of Ferocity");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${226}  | ${204}
    ${200}  | ${160}
    ${164}  | ${115}
    // add new test cases here
    `.test("Badge of Ferocity Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Unbound Changeling Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Unbound Changeling");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${184}  | ${230}
    ${171}  | ${204}
    ${158}  | ${180}
    // add new test cases here
    `.test("Unbound Changeling Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Cabalists Hymnal Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Cabalist's Hymnal");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${233}  | ${294}
    ${207}  | ${258}
    ${194}  | ${237}
    // add new test cases here
    `.test("Cabalists Hymnal Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)*3).toBe(expectedResult);
    });
});

/*
describe("Instructor's Divine Bell", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Instructor's Divine Bell");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${226}  | ${173}
    ${213}  | ${8}
    ${184}  | ${628}
    // add new test cases here
    `.test("Instructor's Divine Bell Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});
*/

/*
describe("Soulletting Ruby", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Soulletting Ruby");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${226}  | ${1046}
    ${210}  | ${961}
    ${184}  | ${823}
    // add new test cases here
    `.test("Soulletting Ruby Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient, effect.table, level)*2.2785)).toBe(expectedResult);
    });
});

*/

describe("Boon of the Archon", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Boon of the Archon");
    const effect = activeTrinket.effects[1];
    each`
    level    | expectedResult
    ${184}  | ${394}
    ${171}  | ${318}
    ${158}  | ${307}
    // add new test cases here
    `.test("Boon of the Archon Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Sunblood Amethyst", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Sunblood Amethyst");
    const effect = activeTrinket.effects[1];
    each`
    level    | expectedResult
    ${200}  | ${121}
    ${184}  | ${104}
    ${171}  | ${92}
    // add new test cases here
    `.test("Sunblood Amethyst Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});