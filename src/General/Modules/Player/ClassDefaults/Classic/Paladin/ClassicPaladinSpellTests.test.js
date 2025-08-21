import { runClassicSpell, convertStatPercentages } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
import { initializePaladinSet } from "General/Modules/Player/ClassDefaults/Classic/Paladin/HolyPaladinClassic";
import { paladinTalents } from "./ClassicPaladinSpellDB";
import each from "jest-each";

describe("Test Paladin Spell Values", () => {
    const errorMargin = 2; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const userSettings = {includeOverheal: "No"};
    const spec = "Holy Paladin";
    const activeStats = {
        intellect: 1771,
        spirit: 6000,
        spellpower: 4561,
        averageDamage: 2051,
        weaponSwingSpeed: 1.9, // Carapace Belter
        haste: 0,
        crit: 0,
        mastery: 0,
        stamina: 0,
        mp5: 0,
        critMult: 2,
        hps: 0,
    }


    const init = initializePaladinSet(paladinTalents, true);
    const statPercentages = convertStatPercentages(activeStats, 1, spec);

    // Test Regular Spells.
    // Need to do melee-based spells after. Some are weapon-damage based.
    // ${"Judgment"}                 | ${4277 / 1.05}              | ${0} (off by 5%)
    each`
        spellName                     | expectedResult              | index
        ${"Flash of Light"}           | ${(23704 + 25515) / 2}      | ${0}
        ${"Holy Light"}               | ${(16690 + 17886) / 2}      | ${0}
        ${"Holy Shock"}               | ${(17850 + 18788) / 2}      | ${0}
        ${"Holy Radiance"}            | ${(11706 + 13122) / 2}      | ${0}
        ${"Light of Dawn"}            | ${(3883 + 4160) / 2 * 3}        | ${0}
        ${"Word of Glory"}            | ${(12505 + 13403) / 2}      | ${0}
        

    `.test("Base Value Check - " + spec + " Reg Spells: $spellName", ({ spellName, expectedResult, index }) => {
        const spell = init.spellDB[spellName][index]
        const value = runClassicSpell(spellName, {...spell, secondaries: []}, statPercentages, spec, userSettings) / spell.targets;
        console.log(spellName, value, expectedResult * 1.05);
        expect(Math.abs(value-expectedResult*1.05)).toBeLessThan(errorMargin); // The 1.05 is for Seal of Insight which has 100% uptime.
        //expect(true).toEqual(true);
    });

    //

})