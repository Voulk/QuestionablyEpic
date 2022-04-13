
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

describe("Symbol of the Raptora Data", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Symbol of the Raptora");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${236}  | ${167}
    // add new test cases here
    `.test("Symbol of the Raptora Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Unbound Changeling Data Tests", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Unbound Changeling");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${236}  | ${373}
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

// There is currently no way to verify the post-buff specifics, so this test has been disabled until servers go live.
/*
describe("Shadowed Orb of Torment", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Shadowed Orb of Torment");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${252}  | ${489}
    ${239}  | ${460}
    ${226}  | ${432}
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
    ${252}  | ${132}
    ${239}  | ${124}
    ${226}  | ${117}
    // add new test cases here
    `.test("Shadowed Orb of Torment Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
}); */


describe("First Class Healing Distributor", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "First Class Healing Distributor");
    const effect = activeTrinket.effects[0];
    each`
    level    | expectedResult
    ${236}  | ${1655}
    ${233}  | ${1583}
    ${226}  | ${1424}
    ${223}  | ${1361}
    // add new test cases here
    `.test("First Class Healing Distributor Heal Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
  
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });

    // Haste Test
    const effect2 = activeTrinket.effects[1];
    each`
    level    | expectedResult
    ${223}  | ${80}
    ${236}  | ${86}
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

describe("Flask of the Solemn Night Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Flask of the Solemn Night");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${272}  | ${71}
    ${226}  | ${58}
    ${200}  | ${50}
    ${184}  | ${45}
    // add new test cases here
    `.test("Flask of the Solemn Night Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

/*
describe("Bottled Hurricane Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Bottled Hurricane");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${226}  | ${267}
    ${200}  | ${193}
    ${184}  | ${156}
    // add new test cases here
    `.test("Bottled Hurricane Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
}); */

describe("Concave Reflecting Lens Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Concave Reflecting Lens");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${246}  | ${2545}
    ${226}  | ${2076}
    ${200}  | ${1593}
    ${184}  | ${1353}
    // add new test cases here
    `.test("Concave Reflecting Lens Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(getProcessedValue(effect.coefficient, effect.table, level)).toBe(expectedResult);
    });
});

describe("Amalgam's Seventh Spine Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Amalgam's Seventh Spine");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${272}  | ${166} // 263 pre-nerf
    ${246}  | ${148}
    ${210}  | ${124}

    // add new test cases here
    `.test("Amalgam's Seventh Spine Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(Math.round(getProcessedValue(effect.coefficient, effect.table, level))).toBe(expectedResult);
    });
});

describe("Infernal Writ Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Infernal Writ");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${226}  | ${40} 
    ${200}  | ${35}
    ${184}  | ${31}
    // add new test cases here
    `.test("Infernal Writ Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(Math.round(getProcessedValue(effect.coefficient, effect.table, level))).toBe(expectedResult);
    });
});

describe("Moonlit Prism Data Check", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Moonlit Prism");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${226}  | ${24} 
    ${200}  | ${19}
    ${184}  | ${16}
    // add new test cases here
    `.test("Moonlit Prism Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(Math.round(getProcessedValue(effect.coefficient, effect.table, level))).toBe(expectedResult);
    });
});

describe("Elegy of the Eternals", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Elegy of the Eternals");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${239}  | ${102} 
    ${252}  | ${108}
    ${265}  | ${115}
    // add new test cases here
    `.test("Elegy of the Eternals - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(Math.round(getProcessedValue(effect.coefficient, effect.table, level))).toBe(expectedResult);
    });
});

describe("Auxillary Attendant Chime", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Auxillary Attendant Chime");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${239}  | ${800} 
    ${252}  | ${967}
    ${265}  | ${1164}
    // add new test cases here
    `.test("Auxillary Attendant Chime - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(Math.round(getProcessedValue(effect.coefficient, effect.table, level))).toBe(expectedResult);
    });
});

describe("Reclaimer's Intensity Core", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Reclaimer's Intensity Core");
    const healEffect = activeTrinket.effects[0];
    const manaEffect = activeTrinket.effects[0];
    // The heal value is currently hard coded and so doesn't need to be tested.
    /*
    each`
    level   | expectedResult
    ${239}  | ${1863} 
    ${252}  | ${2180}
    ${265}  | ${2548}
    // add new test cases here
    `.test("Reclaimer's Intensity Core (Heal) - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(Math.round(10*getProcessedValue(healEffect.coefficient, healEffect.table, level))).toBe(expectedResult);
    }); */
    // 

    each`
    level   | expectedResult
    ${239}  | ${282} 
    ${252}  | ${319}
    ${265}  | ${360}
    ${278}  | ${406}
    // add new test cases here
    `.test("Reclaimer's Intensity Core (Mana) - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        //expect(Math.floor(10*getProcessedValue(manaEffect.coefficient, manaEffect.table, level, 1, false))).toBe(expectedResult);
        expect(Math.round(10*getProcessedValue(manaEffect.coefficient, manaEffect.table, level, 1, false))).toBe(expectedResult);
    }); 
});

describe("The First Sigil", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "The First Sigil");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${239}  | ${1105} 
    ${252}  | ${1173}
    ${265}  | ${1242}
    // add new test cases here
    `.test("The First Sigil - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(Math.round(getProcessedValue(effect.coefficient, effect.table, level))).toBe(expectedResult);
    });
});

describe("The Lion's Roar", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "The Lion's Roar");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${239}  | ${84852} 
    ${252}  | ${102567}
    ${265}  | ${123438}
    // add new test cases here
    `.test("The Lion's Roar - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(Math.round(getProcessedValue(effect.coefficient, effect.table, level))).toBe(expectedResult);
    });
});

describe("So'leah's Secret Technique", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "So'leah's Secret Technique");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${223}  | ${88} 
    ${236}  | ${94}
    // add new test cases here
    `.test("So'leah's Secret Technique - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(Math.round(getProcessedValue(effect.coefficient, effect.table, level))).toBe(expectedResult);
    });
});


// ====================
// === DPS Trinkets ===
// ====================
describe("Infinitely Divisible Ooze", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Infinitely Divisible Ooze");
    const effect = activeTrinket.effects[0];
    each`
    level   | expectedResult
    ${210}  | ${1865} 
    ${223}  | ${2283}
    ${236}  | ${2777}
    // add new test cases here
    `.test("Infinitely Divisible Ooze - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
    
        expect(Math.floor(5*getProcessedValue(effect.coefficient, effect.table, level, 1, false))).toBe(expectedResult);
    });
});