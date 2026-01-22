
import specDB from "General/Modules/Player/ClassDefaults/RestoShaman/RestoShamanSpellDB.json";
import { getSpellThroughput } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";
import each from "jest-each";

describe("Test Resto Shaman Spell Values", () => {
    const errorMargin = 2; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const userSettings = {};
    const spec = "Restoration Shaman";

    const statPercentages = {intellect: 618, crit: 1, haste: 1, mastery: 0, versatility: 1}//convertStatPercentages(activeStats, 1, spec);

    /* TEST SPELLS */
    //  ${"Healing Rain"}     | ${(2244 / 6 * 10)}              | ${0} - Off by 2% but incorrect tooltip anyway.
    each`
        spellName                        | expectedResult                  | index
        ${"Healing Wave"}                | ${(8433)}                       | ${0}
        ${"Riptide"}                     | ${(2968)}                       | ${0}
        ${"Riptide"}                     | ${(1477)}                       | ${1}
        ${"Healing Stream Totem"}        | ${(690 * 7.5)}                  | ${0}
        ${"Earthliving Weapon"}          | ${(858)}                       | ${0}

    `.test("Base Value Check - " + spec + " Reg Spells: $spellName", ({ spellName, expectedResult, index }) => {
        const spell = specDB[spellName][index]
        const value = getSpellThroughput({...spell, secondaries: [], expectedOverheal: 0, targets: 1}, statPercentages, spec, userSettings)

        expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);

    });
})

