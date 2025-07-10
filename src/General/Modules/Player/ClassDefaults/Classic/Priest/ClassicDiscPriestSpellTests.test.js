import { runClassicSpell, convertStatPercentages } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
import { initializeDiscSet } from "General/Modules/Player/ClassDefaults/Classic/Priest/DisciplinePriestClassic";
import { compiledDiscTalents } from "./ClassicPriestSpellDB";
import each from "jest-each";

describe("Test Disc Priest Spell Values", () => {
    const errorMargin = 2; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const userSettings = {includeOverheal: "No"};
    const spec = "Discipline Priest";
    const activeStats = {
        intellect: 2916,
        spirit: 0,
        spellpower: 5151,
        averageDamage: 0,
        weaponSwingSpeed: 1,
        haste: 0,
        crit: 0,
        mastery: 0,
        stamina: 0,
        mp5: 0,
        critMult: 2,
        hps: 0,
    }


    const init = initializeDiscSet(compiledDiscTalents, true);
    const statPercentages = convertStatPercentages(activeStats, 1, spec);

    // Test Regular Spells.
    each`
        spellName                     | expectedResult           | index
        ${"Power Word: Shield"}       | ${(39403 / 1.142)}        | ${0}


    `.test("Base Value Check - " + spec + " Reg Spells: $spellName", ({ spellName, expectedResult, index }) => {
        const spell = init.spellDB[spellName][index]
        const value = runClassicSpell(spellName, {...spell, secondaries: []}, statPercentages, spec, userSettings) / (spell.targets || 1);
        console.log("Spell: " + spellName + " Value: " + value + " Expected: " + expectedResult);
        expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);
        //expect(true).toEqual(true);
    });

    //

})

/*
                ${"Flash Heal"}               | ${(31066 + 33806) / 2}   | ${0}
        ${"Prayer of Healing"}        | ${(16281 + 16792) / 2}   | ${0}
        ${"Penance"}                  | ${(10039 + 10170) / 2}   | ${0}
        ${"Penance"}                  | ${(16000 + 17139) / 2}   | ${1}
        ${"Prayer of Mending"}        | ${(17607)}               | ${0}
        ${"Divine Star"}              | ${(9642 + 12800) / 2}    | ${0}
        ${"Divine Star"}              | ${(5402 + 7172) / 2}     | ${1}
        */