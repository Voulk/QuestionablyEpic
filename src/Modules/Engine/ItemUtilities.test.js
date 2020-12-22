import React from 'react';
import ReactDOM from 'react-dom';
import {getItemLevel, getItemAllocations, calcStatsAtLevel, getValidArmorTypes} from './ItemUtilities';
import SPEC from "../Engine/SPECS";


describe("Test Item Level", () => {
    test("Sylvan Whiteshield ilvl", () => {
        const id = 181393;
        const expectedResult = 190;
        expect(getItemLevel(id)).toEqual(expectedResult);

    });
    test("Sapsteel Breastplate ilvl", () => {
        const id = 181400;
        const expectedResult = 148;
        expect(getItemLevel(id)).toEqual(expectedResult);
               
    });
});

describe("Calc Stats at Level", () => {
    test("Leggings of the Erudite Scholar 203", () => {
        const slot = "Legs";
        const level = 203;
        const id = 178761;
        const statAllocations = getItemAllocations(id);
        const expectedResult = {
            intellect: 66,
            stamina: 0,
            haste: 48,
            mastery: 0,
            versatility: 75,
            crit: 0,
            leech: 0,
            hps: 0,
            dps: 0,
            bonus_stats: {},
          };
        
          expect(calcStatsAtLevel(level, slot, statAllocations, "")).toEqual(expectedResult);

    });

    // This could use more coverage. 

});

describe("Get Item Allocations func", () => {
    test("Windscale Moccasins", () => {
        const id = 179322;

        const expectedResult = {
            "intellect": 5259,
            "stamina": 7889,
            "haste": 0,
            "crit": 2450,
            "mastery": 0,
            "versatility": 4550
        }

        expect(getItemAllocations(id)).toEqual(expectedResult);

    });
});

describe("getValidArmorTypes func", () => {
    test("Basic Spec Check", () => {
        const spec = SPEC.RESTODRUID;
        const expectedResult = [0, 2];

        expect(getValidArmorTypes(spec)).toEqual(expectedResult);

    });

    /*
    test("Test can wear item - Cloth Boots", () => {
        const itemSubclass = getItemSubClass(179322);

        const specs = [
            ["Discipline Priest", true],
            ["Holy Paladin", true],

        ]

        test.each(specs)('.getValidArmorTypes(%s)', (spec, expectedResult) => {
            expect(specw).toBe(expectedResult)
        })


    });
    */

});