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
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Assembly Preserver's Band Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Assembly Preserver's Band");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${389}  | ${38338}
    // add new test cases here
    `.test("Assembly Preserver's Band Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Assembly Guardian's Ring Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Assembly Guardian's Ring");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${389}  | ${71519}
    // add new test cases here
    `.test("Assembly Guardian's Ring Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Assembly Guardian's Ring Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Assembly Guardian's Ring");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${389}  | ${71519}
    // add new test cases here
    `.test("Assembly Guardian's Ring Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Seal of Filial Duty Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Seal of Filial Duty");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${418}  | ${52774}
    ${430}  | ${63076}
    // add new test cases here
    `.test("Seal of Filial Duty Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

/*
describe("Soulwarped Seal of Wrynn Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Soulwarped Seal of Wrynn");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${239}  | ${58}
    ${252}  | ${70}
    ${265}  | ${84}
    // add new test cases here
    `.test("Soulwarped Seal of Wrynn Data Check Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Genesis Lathe Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Genesis Lathe");
    const effect = activeEffect.effects;

    each`
    level   | expectedResult
    ${226}  | ${[6586, 7685, 1146]}
    // add new test cases here. There aren't any in-game values for it yet so the 226 tester is the only one available. Update when obtainable.
    `.test("Genesis Lathe Data Check Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        
        expect(getProcessedValue(effect[0].coefficient, effect[0].table, level)).toBe(expectedResult[0]); // Absorb
        expect(Math.round(getProcessedValue(effect[1].coefficient, effect[1].table, level, 1, false))).toBe(expectedResult[1]); // Flat Heal
        expect(getProcessedValue(effect[2].coefficient, effect[2].table, level)).toBe(expectedResult[2]); // HoT
    });
});

describe("Cosmic Protoweave Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Cosmic Protoweave");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${262}  | ${1367}
    // add new test cases here.
    `.test("Cosmic Protoweave Data Check Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult); // Absorb
    });
});

describe("Ephemera Harmonizing Stone Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Ephemera Harmonizing Stone");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${262}  | ${41}
    // add new test cases here.
    `.test("Ephemera Harmonizing Stone Data Check Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult); // Absorb
    });
});

describe("Magically Regulated Automa Core Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Magically Regulated Automa Core");
    const effect = activeEffect.effects[0];

    each`
    level   | expectedResult
    ${262}  | ${479}
    // add new test cases here.
    `.test("Magically Regulated Automa Core Data Check Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult); // Absorb
    });
});


describe("Shard of Zed Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Shard of Zed");
    const effect = activeEffect.effects[0];

    each`
    rank   | expectedResult
    ${4}  | ${334}
    ${3}  | ${292}
    ${2}  | ${250}
    ${1}  | ${208}
    ${0}  | ${166}
    // add new test cases here
    `.test("Shard of Zed Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 200, 1, false))).toBe(expectedResult);
    });
});

/*
describe("Chaos Bane Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Chaos Bane");
    
    each`
    effectNum   | expectedResult
    ${1}  | ${300}
    ${0}  | ${10}
    // add new test cases here
    `.test("Chaos Bane Test - $effectNum - Expects: $expectedResult", ({ effectNum, expectedResult }) => {
        let effect = activeEffect.effects[effectNum];
        expect(getProcessedValue(effect.coefficient[0], effect.table, 174, 1, true)).toBe(expectedResult);
    });
});

describe("Shard of Rev Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Shard of Rev");
    const effect = activeEffect.effects[0];

    each`
    rank   | expectedResult
    ${4}  | ${60}
    ${3}  | ${52}
    ${2}  | ${45}
    ${1}  | ${37}
    ${0}  | ${30}
    // add new test cases here
    `.test("Shard of Rev Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))).toBe(expectedResult);
    });
});

describe("Shard of Tel Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Shard of Tel");
    const effect = activeEffect.effects[0];

    each`
    rank   | expectedResult
    ${4}  | ${342}
    ${3}  | ${299}
    ${2}  | ${256}
    ${1}  | ${213}
    ${0}  | ${171}
    // add new test cases here
    `.test("Shard of Tel Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))).toBe(expectedResult);
    });
});

describe("Shard of Kyr Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Shard of Kyr");
    const effect = activeEffect.effects[0];

    each`
    rank   | expectedResult
    ${4}  | ${1320}
    ${3}  | ${1155}
    ${2}  | ${990}
    ${1}  | ${825}
    ${0}  | ${660}
    // add new test cases here
    `.test("Shard of Kyr Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))).toBe(expectedResult);
    });
});

describe("Shard of Dyz Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Shard of Dyz");
    const effect = activeEffect.effects[0];

    each`
    rank   | expectedResult
    ${4}  | ${50}
    ${3}  | ${44}
    ${2}  | ${37}
    ${1}  | ${31}
    ${0}  | ${25}
    // add new test cases here
    `.test("Shard of Dyz Test - $rank - Expects: $expectedResult", ({ rank, expectedResult }) => {
  
        expect(Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))).toBe(expectedResult);
    });
});
/*
describe("Blood Link Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeEffect = effectData.find((effect) => effect.name === "Blood Link");
    
    each`
    effectNum   | expectedResult
    ${0}  | ${540}
    // add new test cases here
    `.test("Blood Link Test - $effectNum - Expects: $expectedResult", ({ effectNum, expectedResult }) => {
        let effect = activeEffect.effects[effectNum];
        console.log(effect);
        expect(getProcessedValue(effect.coefficient[0], effect.table, 174, 1, true)).toBe(expectedResult);
    });
}); */
