
import specDB from "General/Modules/Player/ClassDefaults/MistweaverMonk/MistweaverMonkSpellDB.json";
import { getSpellThroughput } from "General/Modules/Player/ClassDefaults/Generic/ProfileUtilities";
import each from "jest-each";

describe("Test Mistweaver Monk Spell Values", () => {
    const errorMargin = 2; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const userSettings = {};
    const spec = "Mistweaver Monk";

    const statPercentages = {intellect: 652, crit: 1, haste: 1, mastery: 0, versatility: 1, genericDamageMult: 1, genericHealingMult: 1, critMult: 2}//convertStatPercentages(activeStats, 1, spec);

    /* TEST SPELLS */
    // ${"Chi Cocoon"}           | ${(11928)}                       | ${0} 
    // ${"Revival"}                     | ${(31234)}                      | ${0} 
    // 
    each`
        spellName                        | expectedResult                  | index
        ${"Tiger Palm"}                  | ${(962*0.7)}                    | ${0}
        ${"Blackout Kick"}               | ${(1702*0.7)}                   | ${0}
        ${"Rising Sun Kick"}             | ${(2612*0.7)}                   | ${0} 
        ${"Rushing Wind Kick"}           | ${(3264)}                       | ${0} 
        ${"Rushing Wind Kick"}           | ${(2608)}                       | ${1} 
        ${"Renewing Mist"}               | ${(1025)}                       | ${0} 
        
        ${"Invigorating Mists"}          | ${(1685)}                       | ${0} 
        ${"Enveloping Mist"}             | ${(3905)}                       | ${0} 
        
        ${"Courage of the White Tiger"}  | ${(4347)}                       | ${0} 
        ${"Vivify"}                      | ${(5038)}                       | ${0} 


    `.test("Base Value Check - " + spec + " Reg Spells: $spellName $index", ({ spellName, expectedResult, index }) => {
        const spell = specDB[spellName][index]
        const value = getSpellThroughput({...spell, secondaries: [], expectedOverheal: 0, targets: 1}, statPercentages, spec, userSettings)
        console.log(spellName + " .Received: " + value + ". Expected: " +  expectedResult);
        expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);


    });
})

