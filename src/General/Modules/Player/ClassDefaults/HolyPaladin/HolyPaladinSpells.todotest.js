import { PALADINSPELLDB, baseTalents } from "./HolyPaladinSpellDB";
import { getSpellRaw } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import each from "jest-each";

describe("Test Base Spells", () => {
    const PALADINCONSTANTS = {
        masteryMod: 1.5, 
        masteryEfficiency: 0, // We'll run these tests without any mastery value.
        baseMana: 250000,
    
        auraHealingBuff: 0.82,
        auraDamageBuff: 0.92 * 1.1,

    }
    const errorMargin = 3; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const aura = PALADINCONSTANTS.auraHealingBuff;

    const activeStats = {
            intellect: 473,
            haste: 0,
            crit: 0,
            mastery: 0,
            versatility: 0,
            stamina: 6290,
            critMult: 1,
    }   
    each`
        spellName                       | expectedResult
        ${"Holy Shock"}                 | ${595}
        ${"Flash of Light"}             | ${1530}
        ${"Holy Light"}                 | ${1976}
        ${"Light of Dawn"}              | ${323}
        ${"Word of Glory"}              | ${1344}

        // add new test cases here. Update the ones below.
        `.test("Base Healing Check: $spellName", ({ spellName, expectedResult }) => {
            const spell = PALADINSPELLDB[spellName][0];
            spell.secondaries = [];
            const healing = getSpellRaw(spell, activeStats, PALADINCONSTANTS);
            expect(Math.abs(healing * aura - expectedResult)).toBeLessThan(errorMargin);
            //expect(getValidWeaponTypes(spec, "Offhands").includes(itemSubclass2)).toBe(expectedResult);
        });


});