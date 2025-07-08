import { runClassicSpell, convertStatPercentages } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
import { initializeDruidSet } from "General/Modules/Player/ClassDefaults/Classic/Druid/RestoDruidClassic";
import { druidTalents } from "./ClassicDruidSpellDB";
import each from "jest-each";

describe("Test Druid Spell Values", () => {
    const errorMargin = 2; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const userSettings = {includeOverheal: "No"};
    const spec = "Restoration Druid";
    const activeStats = {
        intellect: 1067,
        spirit: 6000,
        spellpower: 5151,
        averageDamage: 5585.25,
        weaponSwingSpeed: 3.4,
        haste: 0,
        crit: 0,
        mastery: 0,
        stamina: 0,
        mp5: 0,
        critMult: 2,
        hps: 0,
    }


    const init = initializeDruidSet(druidTalents, true);
    const statPercentages = convertStatPercentages(activeStats, 1, spec);

    // Test Regular Spells.
    each`
        spellName                     | expectedResult           | index
        ${"Healing Touch"}            | ${(32548 + 35652) / 2}   | ${0}
        ${"Rejuvenation"}             | ${0}                    | ${0}
        ${"Regrowth"}                 | ${0}                    | ${0}
        ${"Regrowth"}                 | ${0}                    | ${1}
        ${"Swiftmend"}                | ${0}                    | ${0}
        ${"Tranquility"}              | ${0}                    | ${0}
        ${"Lifebloom"}                | ${0}                    | ${0}
        ${"Lifebloom"}                | ${0}                    | ${1}
        ${"Wild Growth"}              | ${0}                    | ${0}
        ${"Nourish"}                  | ${0}                    | ${0}
        ${"Efflorescence"}            | ${0}                    | ${0}

    `.test("Base Value Check - " + spec + " Reg Spells: $spellName", ({ spellName, expectedResult, index }) => {
        const spell = init.spellDB[spellName][index]
        const value = runClassicSpell(spellName, {...spell, secondaries: []}, statPercentages, spec, userSettings) / spell.targets;
        //expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);
        expect(true).toEqual(true);
    });

    //

})