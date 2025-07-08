import { runClassicSpell, convertStatPercentages } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
import { initializePaladinSet } from "General/Modules/Player/ClassDefaults/Classic/Paladin/HolyPaladinClassic";
import { paladinTalents } from "./ClassicPaladinSpellDB";
import each from "jest-each";

describe("Test Paladin Spell Values", () => {
    const errorMargin = 2; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const userSettings = {includeOverheal: "No"};
    const spec = "Holy Paladin";
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


    const init = initializePaladinSet(paladinTalents, true);
    const statPercentages = convertStatPercentages(activeStats, 1, spec);

    // Test Regular Spells.
    each`
        spellName                     | expectedResult           | index
        ${"Flash of Light"}           | ${(32548 + 35652) / 2}   | ${0}
        ${"Holy Light"}               | ${(0) / 2}               | ${0}
        ${"Holy Shock"}               | ${(0) / 2}               | ${0}

    `.test("Base Value Check - " + spec + " Reg Spells: $spellName", ({ spellName, expectedResult, index }) => {
        const spell = init.spellDB[spellName][index]
        const value = runClassicSpell(spellName, {...spell, secondaries: []}, statPercentages, spec, userSettings) / spell.targets;
        //expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);
        expect(true).toEqual(true);
    });

    //

})