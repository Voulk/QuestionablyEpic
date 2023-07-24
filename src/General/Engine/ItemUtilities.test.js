import React from "react";
import ReactDOM from "react-dom";
import {
  getItemAllocations,
  getItemProp,
  calcStatsAtLevel,
  getValidArmorTypes,
  getValidWeaponTypes,
  getTranslatedItemName,
  getItemEffect,
  getItemIcon,
  checkItemExists,
  getItemSlot,
  socketItem,
  getItem
} from "./ItemUtilities";
import SPEC from "../Engine/SPECS";
import each from "jest-each";
import ClassicItem from "General/Modules/Player/ClassicItem";
import ClassicPlayer from "General/Modules/Player/ClassicPlayer";


describe("Make sure Items Exist", () => {
  test("Hall of Valor", () => {
      expect(getItem(133633)).toBeTruthy();
      expect(getItem(136777)).toBeTruthy();
  })

  test("Shadowmoon Burial Ground", () => {
    expect(getItem(110039)).toBeTruthy();
    expect(getItem(109784)).toBeTruthy();
  })

  test("Burning Crusade Timewalking", () => {
    expect(getItem(123999)).toBeTruthy();
    expect(getItem(133470)).toBeTruthy();
  })

  test("Wrath of the Lich King Timewalking", () => {
    expect(getItem(188423)).toBeTruthy();
    expect(getItem(188425)).toBeTruthy();
    expect(getItem(188427)).toBeTruthy();

    expect(getItem(127525)).toBeTruthy();
    expect(getItem(127512)).toBeTruthy();
  })

  test("Cataclysm Timewalking", () => {
    expect(getItem(133233)).toBeTruthy();
    expect(getItem(133216)).toBeTruthy();
    expect(getItem(188496)).toBeTruthy();


  })

  test("Mists of Pandaria Timewalking", () => {
    expect(getItem(144020)).toBeTruthy();
    expect(getItem(143972)).toBeTruthy();
    expect(getItem(143989)).toBeTruthy();

  })

  test("Warlords of Draenor Timewalking", () => {
    expect(getItem(109982)).toBeTruthy();
    expect(getItem(119176)).toBeTruthy();
    expect(getItem(110033)).toBeTruthy();

  })

  test("Legion Timewalking", () => {
    expect(getItem(136714)).toBeTruthy();
    expect(getItem(134542)).toBeTruthy();
    expect(getItem(137355)).toBeTruthy();

  })


});

describe("Test Item Level", () => {
  test("Sylvan Whiteshield ilvl", () => {
    const id = 181393;
    const expectedResult = 190;
    expect(getItemProp(id, "itemLevel")).toEqual(expectedResult);
  });
});

describe("Calc Stats at Level", () => {

  test("Soulwarped Seal of Wrynn", () => {
    const slot = "Finger";
    const level = 278;
    const id = 189839;
    const statAllocations = getItemAllocations(id);
    const expectedResult = {
      intellect: 0,
      stamina: 0,
      haste: 225,
      mastery: 74,
      versatility: 0,
      crit: 0,
      leech: 0,
      hps: 0,
      dps: 0,
      bonus_stats: {},
    };

    expect(true).toEqual(true); // Dragonflight placeholder. Update.
  });

  // This could use more coverage.
});

describe("Get Item Allocations func", () => {
  test("Windscale Moccasins", () => {
    const id = 179322;

    const expectedResult = {
      intellect: 5259,
      stamina: 7889,
      crit: 2450,
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

  const itemSubclass = getItemProp(179322, "itemSubClass");
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
  const itemSubclass2 = getItemProp(178826, "itemSubClass");
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
  const itemSubclass = getItemProp(178714, "itemSubClass");
  each`
    spec     | expectedResult
    ${SPEC.RESTODRUID}    |  ${true}
    ${SPEC.DISCPRIEST}    | ${true}
    ${SPEC.HOLYPALADIN}   | ${false}
    ${SPEC.HOLYPRIEST}    | ${true}
    ${SPEC.MISTWEAVERMONK}  | ${true}
    ${SPEC.RESTOSHAMAN}   | ${true}
    // add new test cases here
    `.test("Checks if $spec can wear a Staff", ({ spec, expectedResult }) => {
    expect(getValidWeaponTypes(spec, "Weapons").includes(itemSubclass)).toBe(expectedResult);
  });

  // Check can use Shield
  const itemSubclass2 = getItemProp(178750, "itemSubClass");
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

/*
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
}); */

/*
describe("GetItemEffect func", () => {
  test("Sinful Gladiator's Badge of Ferocity", () => {
    const id = 175921;
    const expectedResult = { type: "trinket", name: "Gladiator's Badge of Ferocity" };
    expect(getItemProp(id, "effect")).toEqual(expectedResult);
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
});*/

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
    expect(getItemProp(id, "slot")).toEqual(expectedResult);
  });

  test("Slot Check: Invalid Item ID", () => {
    const id = 9999999;
    const expectedResult = "";
    expect(getItemProp(id, "slot")).toEqual(expectedResult);
  });

  // Add new tests
});

/*
describe("socketItem", () => {
  test("Red Gem Test", () => {
    const player = new ClassicPlayer("Mock", "Restoration Druid Classic", 99, "NA", "Stonemaul", "Night Elf");
    const item = new ClassicItem(29087, "Chestguard of Malorne", "Chest", "");

    socketItem(item, player);

  });



  // Add new tests
}); */
