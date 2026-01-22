
import specDB from "General/Modules/Player/ClassDefaults/RestoDruid/RestoDruidSpellDB.json";
import { getSpellThroughput } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";
import each from "jest-each";

describe("Test Resto Druid Spell Values", () => {
    const errorMargin = 2; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const userSettings = {};
    const spec = "Restoration Druid";

    const statPercentages = {intellect: 618, crit: 1, haste: 1, mastery: 0, versatility: 1}//convertStatPercentages(activeStats, 1, spec);

    /* TEST SPELLS */
    //  ${"Healing Rain"}     | ${(2244 / 6 * 10)}              | ${0} - Off by 2% but incorrect tooltip anyway.
    each`
        spellName                        | expectedResult                  | index
        ${"Rejuvenation"}                | ${(2255)}                       | ${0}

    `.test("Base Value Check - " + spec + " Reg Spells: $spellName", ({ spellName, expectedResult, index }) => {
        const spell = specDB[spellName][index]
        const value = getSpellThroughput({...spell, secondaries: [], expectedOverheal: 0, targets: 1}, statPercentages, spec, userSettings)
        console.log(spellName, value, expectedResult);
        expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);

    });
})

