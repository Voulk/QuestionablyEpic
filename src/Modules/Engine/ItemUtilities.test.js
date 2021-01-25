import React from "react";
import ReactDOM from "react-dom";
import {
  getItemLevel,
  getItemAllocations,
  calcStatsAtLevel,
  getValidArmorTypes,
  getItemSubclass,
  getValidWeaponTypes,
  getTranslatedItemName,
  getItemEffect,
  getItemIcon,
  checkItemExists,
  getItemSlot,
} from "./ItemUtilities";
import SPEC from "../Engine/SPECS";
import each from "jest-each";

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
      intellect: 5259,
      stamina: 7889,
      haste: 0,
      crit: 2450,
      mastery: 0,
      versatility: 4550,
    };

    expect(getItemAllocations(id)).toEqual(expectedResult);
  });
});

describe("getValidArmorTypes func", () => {
  test("Basic Spec Check", () => {
    const spec = SPEC.RESTODRUID;
    const expectedResult = [0, 2];

    expect(getValidArmorTypes(spec)).toEqual(expectedResult);
  });

  const itemSubclass = getItemSubclass(179322);
  each`
    spec     | expectedResult
    ${SPEC.RESTODRUID}   | ${false}
    ${SPEC.DISCPRIEST}  | ${true}
    ${SPEC.HOLYPALADIN}  | ${false}
    ${SPEC.HOLYPRIEST}  | ${true}
    ${SPEC.MISTWEAVERMONK}  | ${false}
    ${SPEC.RESTOSHAMAN}  | ${false}
    // add new test cases here
    `.test("Checks if $spec can wear cloth boots", ({ spec, expectedResult }) => {
    expect(getValidArmorTypes(spec).includes(itemSubclass)).toBe(expectedResult);
  });

  // TRINKET
  const itemSubclass2 = getItemSubclass(178826);
  each`
    spec     | expectedResult
    ${SPEC.RESTODRUID}   | ${true}
    ${SPEC.DISCPRIEST}  | ${true}
    ${SPEC.HOLYPALADIN}  | ${true}
    ${SPEC.HOLYPRIEST}  | ${true}
    ${SPEC.MISTWEAVERMONK}  | ${true}
    ${SPEC.RESTOSHAMAN}  | ${true}
    // add new test cases here
    `.test("Checks if $spec can wear a trinket", ({ spec, expectedResult }) => {
    expect(getValidArmorTypes(spec).includes(itemSubclass2)).toBe(expectedResult);
  });
});

describe("getValidWeaponTypes func", () => {
  test("Basic Spec Check", () => {
    const spec = SPEC.MISTWEAVERMONK;
    const expectedResult = [0, 4, 6, 7, 10, 13];

    expect(getValidWeaponTypes(spec, "Weapons")).toEqual(expectedResult);
  });

  // Check can use Staff
  const itemSubclass = getItemSubclass(178714);
  each`
    spec     | expectedResult
    ${SPEC.RESTODRUID}   | ${true}
    ${SPEC.DISCPRIEST}  | ${true}
    ${SPEC.HOLYPALADIN}  | ${false}
    ${SPEC.HOLYPRIEST}  | ${true}
    ${SPEC.MISTWEAVERMONK}  | ${true}
    ${SPEC.RESTOSHAMAN}  | ${true}
    // add new test cases here
    `.test("Checks if $spec can wear a Staff", ({ spec, expectedResult }) => {
    expect(getValidWeaponTypes(spec, "Weapons").includes(itemSubclass)).toBe(expectedResult);
  });

  // Check can use Shield
  const itemSubclass2 = getItemSubclass(178750);
  each`
    spec     | expectedResult
    ${SPEC.RESTODRUID}   | ${false}
    ${SPEC.DISCPRIEST}  | ${false}
    ${SPEC.HOLYPALADIN}  | ${true}
    ${SPEC.HOLYPRIEST}  | ${false}
    ${SPEC.MISTWEAVERMONK}  | ${false}
    ${SPEC.RESTOSHAMAN}  | ${true}
    // add new test cases here
    `.test("Checks if $spec can wear a Staff", ({ spec, expectedResult }) => {
    expect(getValidWeaponTypes(spec, "Offhands").includes(itemSubclass2)).toBe(expectedResult);
  });

  // Add more tests.
});

describe("getTranslatedItemName func", () => {
  const id = 178869;

  each`
    lang     | expectedResult
    ${"en"}   | ${"Fleshfused Circle"}
    ${"fr"}  | ${"Cercle en chair amalgamée"}
    ${"de"}  | ${"Fleischverschmolzener Kreis"}
    // add new test cases here
    `.test("$lang expects: $expectedResult", ({ lang, expectedResult }) => {
    expect(getTranslatedItemName(id, lang, "")).toBe(expectedResult);
  });
});

describe("GetItemEffect func", () => {
  test("Sinful Gladiator's Badge of Ferocity", () => {
    const id = 175921;
    const expectedResult = { type: "trinket", name: "Sinful Gladiator's Badge of Ferocity" };
    expect(getItemEffect(id)).toEqual(expectedResult);
  });

  // Add new tests
});

describe("GetItemIcon func", () => {
  test("Icon Test: Unbound Changeling", () => {
    const id = 178708;
    const expectedResult = "/Images/Icons/inv_pet_spectralporcupinegreen.jpg";
    expect(getItemIcon(id)).toEqual(expectedResult);
  });

  // Add new tests
});

describe("CheckItemExists func", () => {
  test("Exists Test: Trailspinner Pendant", () => {
    const id = 178707;
    const expectedResult = true;
    expect(checkItemExists(id)).toEqual(expectedResult);
  });

  test("Check Invalid Item ID doesn't exist", () => {
    const id = 9999999;
    const expectedResult = false;
    expect(checkItemExists(id)).toEqual(expectedResult);
  });

  // Add new tests
});

describe("getItemSlot func", () => {
  test("Slot Check Scythewood Scepter (1H Weapon)", () => {
    const id = 178709;
    const expectedResult = "1H Weapon";
    expect(getItemSlot(id)).toEqual(expectedResult);
  });

  test("Slot Check: Invalid Item ID", () => {
    const id = 9999999;
    const expectedResult = 0;
    expect(getItemSlot(id)).toEqual(expectedResult);
  });

  // Add new tests
});
