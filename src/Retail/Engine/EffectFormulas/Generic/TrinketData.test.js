

import {getProcessedValue, processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { userSettings } from "General/Modules/Settings/SettingsObject";
import Player from "General/Modules/Player/Player";
import { trinket_data} from "./ShadowlandsTrinketData";
import { raidTrinketData } from "./TrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
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
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Emerald Coach's Whistle");;
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


describe("Water's Beating Heart", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded. Has Haste scaling. Test if linear between 20% and 100%. Test if dynamic.
    // +100% at 20%.
    // The tooltip value is +33% the base heal.
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Water's Beating Heart");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${421}  | ${25034} // 12517 at full health.
    // add new test cases here
    `.test("Water's Beating Heart Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Kyrakka's Searing Embers", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Kyrakka's Searing Embers");;
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${346}  | ${[53616, 16032]}
    ${359}  | ${[55600, 16625]}
    ${372}  | ${[57657, 17241]}
    // add new test cases here
    `.test("Kyrakka's Searing Embers Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level)).toBe(expectedResult[0]);
        expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
    });
});

describe("Tome of Unstable Power", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Tome of Unstable Power");;
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${346}  | ${[684, 633]}
    ${359}  | ${[772, 697]}
    ${372}  | ${[872, 761]}
    // add new test cases here
    `.test("Tome of Unstable Power Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level)).toBe(expectedResult[0]);
        expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
    });
});

describe("Miniature Singing Stone", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Miniature Singing Stone");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${346}  | ${29856}
    ${359}  | ${30961}
    ${372}  | ${32107}
    // add new test cases here
    `.test("Miniature Singing Stone Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level, 1, "round")).toBe(expectedResult);
    });
});

describe("Flask of the Solemn Night Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Flask of the Solemn Night");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${421}  | ${206}
    // add new test cases here
    `.test("Flask of the Solemn Night Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Mote of Sanctification", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Mote of Sanctification");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${141}  | ${3233}
    // add new test cases here
    `.test("Mote of Sanctification Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

/*
describe("Iredus Fragment", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Iredus Fragment");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${346}  | ${2355}
    ${359}  | ${2658}
    ${372}  | ${3001}
    // add new test cases here
    `.test("Iredus Fragment Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Erupting Spear Fragment", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Erupting Spear Fragment");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${346}  | ${[44028, 377]}
    ${359}  | ${[45658, 415]}
    ${372}  | ${[47347, 453]}
    // add new test cases here
    `.test("Erupting Spear Fragment Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level)).toBe(expectedResult[0]);
        expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
    });
});

describe("Spoils of Neltharius", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Spoils of Neltharius");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${346}  | ${1759}
    ${359}  | ${1938}
    ${372}  | ${2116}
    // add new test cases here
    `.test("Spoils of Neltharius Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});


describe("Static-Charged Scale", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Static-Charged Scale");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${389}  | ${1358}
    // World boss trinket. Only available at one item level.
    `.test("Static-Charged Scale Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Flask of the Solemn Night", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Flask of the Solemn Nigh");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${141}  | ${15}

    // add new test cases here
    `.test("Flask of the Solemn Night Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Horn of Valor", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Horn of Valor");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${141}  | ${74}
    // add new test cases here
    `.test("Horn of Valor Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});



describe("Voidmender's Shadowgem", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Voidmender's Shadowgem");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${124}  | ${125}
    // add new test cases here
    `.test("Voidmender's Shadowgem Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Conjured Chillglobe", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Conjured Chillglobe");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${389}  | ${[51980, 11735]}
    ${402}  | ${[63917, 14430]}
    ${389}  | ${[78067, 17625]}
    // add new test cases here
    `.test("Conjured Chillglobe Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Whispering Incarnate Icon", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Whispering Incarnate Icon");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${395}  | ${445}
    ${408}  | ${503}
    ${421}  | ${567}
    // add new test cases here
    `.test("Whispering Incarnate Icon Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Darkmoon Deck: Dance", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Darkmoon Deck: Dance");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${372}  | ${[10034, 4701]}

    // add new test cases here
    `.test("Darkmoon Deck: Dance Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
});

describe("Alacritous Alchemist Stone", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = raidTrinketData.find((trinket) => trinket.name === "Alacritous Alchemist Stone");;
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${405}  | ${957}

    // add new test cases here
    `.test("Alacritous Alchemist Stone Icon Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect, level)).toBe(expectedResult);
    });
}); */