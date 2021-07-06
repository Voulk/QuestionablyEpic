
import {getProcessedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { userSettings } from "General/Modules/Settings/SettingsObject";
import Player from "General/Modules/Player/Player";
import { trinket_data} from "./TrinketData";
import each from "jest-each";


describe("Insignia of Alacrity Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Gladiator's Insignia of Alacrity");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${239}  | ${194}
    ${226}  | ${172}
    ${200}  | ${135}
    // add new test cases here
    `.test("Insignia Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Badge of Ferocity Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Gladiator's Badge of Ferocity");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${239}  | ${230}
    ${226}  | ${204}
    ${200}  | ${160}
    // add new test cases here
    `.test("Badge of Ferocity Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Unbound Changeling Data Tests", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Unbound Changeling");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${226}  | ${340}
    ${210}  | ${292}
    ${207}  | ${284}
    ${184}  | ${229}
    ${171}  | ${203}
    // add new test cases here
    `.test("Unbound Changeling Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Consumptive Infusion Data Tests", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Consumptive Infusion");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${226}  | ${334}
    ${213}  | ${311}
    ${200}  | ${289}
    ${187}  | ${267}
    // add new test cases here
    `.test("Consumptive Infusion Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

// 9.1 Trinkets
describe("Carved Ivory Keepsake Data Tests", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Carved Ivory Keepsake");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${252}  | ${1866}
    ${239}  | ${1544}
    ${226}  | ${1271}
    ${213}  | ${1040}
    // add new test cases here
    `.test("Carved Ivory Keepsake Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Resonant Silver Bell Data Tests", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Resonant Silver Bell");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${259}  | ${8811}
    ${246}  | ${7307}
    ${233}  | ${6031}
    ${220}  | ${4951}
    // add new test cases here
    `.test("Resonant Silver Bell - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Scrawled Word of Recall", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Scrawled Word of Recall");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${252}  | ${9.0}
    ${239}  | ${7.9}
    ${226}  | ${7.0}
    ${213}  | ${6.2}
    // add new test cases here
    `.test("Scrawled Word of Recall Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(Math.round(10*getProcessedValue(effect.coefficient, effect.table, level, 1, false))/10).toBe(expectedResult);
    });
});

describe("Shadowed Orb of Torment", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Shadowed Orb of Torment");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${252}  | ${304}
    ${239}  | ${286}
    ${226}  | ${268}
    ${213}  | ${251}
    // add new test cases here
    `.test("Shadowed Orb of Torment Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Titanic Ocular Gland", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Titanic Ocular Gland");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${252}  | ${127}
    ${239}  | ${119}
    ${226}  | ${112}
    ${213}  | ${104}
    // add new test cases here
    `.test("Shadowed Orb of Torment Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});


describe("First Class Healing Distributor", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "First Class Healing Distributor");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${233}  | ${1376}
    ${226}  | ${1239}
    // add new test cases here
    `.test("First Class Healing Distributor Heal Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });

    // Haste Test
    const effect2 = activeTrinket.effects[1];
    each`
    level    | expectedResult
    ${233}  | ${275}
    ${226}  | ${247}
    // add new test cases here
    `.test("First Class Healing Distributor Haste Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect2.coefficient, effect2.table, level)).toBe(expectedResult);
    });
});


describe("Instructor's Divine Bell", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Instructor's Divine Bell");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${200}  | ${692}
    ${184}  | ${627}
    // add new test cases here
    `.test("Instructor's Divine Bell Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Inscrutable Quantum Device", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Inscrutable Quantum Device");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${226}  | ${718}
    // add new test cases here
    `.test("Inscrutable Quantum Device Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});


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
    ${210}  | ${602}
    ${197}  | ${489}
    ${184}  | ${393}
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
    level   | expectedResult
    ${210}  | ${132}
    ${197}  | ${117}
    ${184}  | ${103}
    // add new test cases here
    `.test("Sunblood Amethyst Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Tome of Insight", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Tome of Insight");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${207}  | ${164}
    ${200}  | ${157}
    // add new test cases here
    `.test("Tome of Insight Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Spiritual Alchemy Stone Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Spiritual Alchemy Stone");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${230}  | ${318}
    ${165}  | ${173}
    // add new test cases here
    `.test("Spiritual Alchemy Stone Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});