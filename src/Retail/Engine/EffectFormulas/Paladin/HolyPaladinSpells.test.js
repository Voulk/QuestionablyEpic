import { PALADINSPELLDB, baseTalents } from "./HolyPaladinSpellDB";
import { getSpellRaw } from "Retail/Engine/EffectFormulas/Generic/RampBase";
import each from "jest-each";

describe("Test Base Spells", () => {
    const PALADINCONSTANTS = {
        masteryMod: 1.5, 
        masteryEfficiency: 0.80, 
        baseMana: 250000,
    
        auraHealingBuff: 1.06,
        auraDamageBuff: 0.92 * 1.1,

    }
    const errorMargin = 2; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const aura = 1;
    const activeStats = {
            intellect: 482,
            haste: 1882,
            crit: 1710,
            mastery: 1064,
            versatility: 0,
            stamina: 6290,
            critMult: 2,
    }   
    each`
        spellName                       | expectedResult
        ${"Holy Shock"}                 | ${740}
        ${"Flash of Light"}             | ${1460}
        ${"Holy Light"}                 | ${1754}
        ${"Light of Dawn"}              | ${401}

        // add new test cases here. Update the ones below.
        `.test("Base Healing Check: $spellName", ({ spellName, expectedResult }) => {
            const spell = PALADINSPELLDB[spellName][0];
            spell.secondaries = [];
            const healing = getSpellRaw(spell, activeStats, PALADINCONSTANTS);
            expect(Math.abs(healing * aura - expectedResult)).toBeLessThan(errorMargin);
            //expect(getValidWeaponTypes(spec, "Offhands").includes(itemSubclass2)).toBe(expectedResult);
        });


});