import { runClassicSpell, convertStatPercentages } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilitiesClassic";
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
        mastery: 526, // Buffs all healing so needs to be handled.
        stamina: 0,
        mp5: 0,
        critMult: 2,
        hps: 0,
    }


    const init = initializeDiscSet(userSettings, compiledDiscTalents, true);
    const statPercentages = convertStatPercentages(activeStats, 1, spec);

    // Test Regular Spells.
    each`
        spellName                     | expectedResult                   | index
        ${"Power Word: Shield"}       | ${(39403 / 1.142)}               | ${0}
        ${"Flash Heal"}               | ${(31066 + 33806) / 2 / 1.071}   | ${0}
        ${"Penance"}                  | ${(10039 + 10170) / 2 * 3}           | ${0}
        ${"Penance D"}                | ${(16000 + 17139) / 2 / 1.071 * 3}   | ${0}
        ${"Prayer of Mending"}        | ${(17607 / 1.071)}               | ${0}
        ${"Divine Star"}              | ${(9642 + 12800) / 2 / 1.071}    | ${0}
        ${"Divine Star"}              | ${(5402 + 7172) / 2}             | ${1}
        ${"Binding Heal"}             | ${(21367 + 24701) / 2 / 1.071}   | ${0}

        ${"Smite"}                    | ${(9122 + 9393) / 2}             | ${0}
        ${"Holy Fire"}                | ${(9944 + 10215) / 2}            | ${0}
        ${"Holy Fire"}                | ${(2158)}                        | ${1}
        ${"Power Word: Solace"}       | ${(10014 + 10145) / 2}           | ${0}
        ${"Power Word: Solace"}       | ${(2158)}                        | ${1}

        ${"Mindbender"}               | ${(8937 * 11)}                   | ${0}
        ${"Shadowfiend"}              | ${(10155 * 9)}                   | ${0}

    `.test("Base Value Check - " + spec + " Reg Spells: $spellName", ({ spellName, expectedResult, index }) => {
        const spell = init.spellDB[spellName][index]
        const value = runClassicSpell(spellName, {...spell, secondaries: []}, statPercentages, spec, userSettings) / (spell.targets || 1);
        console.log("Spell: " + spellName + " Value: " + value + " Expected: " + expectedResult);
        expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);
        //expect(true).toEqual(true);
    });

    //

})

// Add mana cost test. Flash Heal = 17700, Penance = 9300

/*
                
        
        
        
        

        */