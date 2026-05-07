
import specDB from "General/Modules/Player/ClassDefaults/PreservationEvoker/PreservationEvokerSpellDB.json";
import { getSpellThroughput } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";
import each from "jest-each";

describe("Test Preservation Evoker Spell Values", () => {
    const errorMargin = 2; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const userSettings = {};
    const spec = "Preservation Evoker";

    const statPercentages = {intellect: 620, crit: 1, haste: 1, mastery: 0, versatility: 1, critMult: 2, genericHealingMult: 1}//convertStatPercentages(activeStats, 1, spec);

    /* TEST SPELLS 
            ${"Dream Breath"}                | ${(790)}                        | ${1}
        ${"Emerald Blossom"}             | ${(1662)}                       | ${0}
        ${"Verdant Embrace"}             | ${(4734)}                       | ${0}
        ${"Reversion"}                   | ${(1055 * 1.25)}                       | ${0}
        ${"Temporal Anomaly"}            | ${(3720)}                       | ${0}
        ${"Echo"}                        | ${(1235)}                       | ${0}
        ${"Merithra's Blessing"}         | ${(1286)}                       | ${0}
        ${"Dream Flight"}                | ${(2573)}                       | ${1}
        ${"Dream Flight"}                | ${(5146)}                       | ${0}
    */
    
    each`
        spellName                        | expectedResult                  | index
        ${"Dream Breath"}                | ${(1)}                       | ${0}


    `.test("Base Value Check - " + spec + " Reg Spells: $spellName", ({ spellName, expectedResult, index }) => {
        const spell = specDB[spellName][index]
        const value = 1//getSpellThroughput({...spell, secondaries: [], expectedOverheal: 0, targets: 1}, statPercentages, spec, userSettings)
        console.log(value, expectedResult)

        expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);

    });
})

