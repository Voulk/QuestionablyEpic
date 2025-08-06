import { runClassicSpell, convertStatPercentages } from "General/Modules/Player/ClassDefaults/Generic/ProfileShared";
import { initializeMonkSet } from "General/Modules/Player/ClassDefaults/Classic/Monk/MistweaverMonkClassic";
import { CLASSICMONKSPELLDB as monkSpells, monkTalents } from "General/Modules/Player/ClassDefaults/Classic/Monk/ClassicMonkSpellDB";
import { getEnemyArmor } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import each from "jest-each";

describe("Test Mistweaver Spell Values", () => {
    const errorMargin = 5; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const userSettings = {includeOverheal: "No"};
    const activeStats = {
        intellect: 1067,
        spirit: 6000,
        spellpower: 5151,
        averageDamage: 5585.25,
        weaponSwingSpeed: 3.4,
        isTwoHanded: true,
        haste: 0,
        crit: 0,
        mastery: 0,
        stamina: 0,
        mp5: 0,
        critMult: 2,
        hps: 0,
    }

    const oneHandedStats = {
        intellect: 603,
        spirit: 6000,
        spellpower: 5812,
        averageDamage: 3300.25,
        weaponSwingSpeed: 2.4,
        isTwoHanded: false,
        haste: 0,
        crit: 0,
        mastery: 0,
        stamina: 0,
        mp5: 0,
        critMult: 2,
        hps: 0,
    }

    const init = initializeMonkSet(monkTalents, true);
    const statPercentages = convertStatPercentages(activeStats, 1, "Mistweaver Monk");
    const statPercentagesOneHanded = convertStatPercentages(oneHandedStats, 1, "Mistweaver Monk");
    const armor = getEnemyArmor(statPercentages.armorReduction);
    

    /*test("Jab", () => {
        const spellName = "Jab";
        const value = runClassicSpell(spellName, {...init.spellDB[spellName][0], secondaries: []}, statPercentages, "Mistweaver Monk", userSettings) / armor;
        const expectedAvg = (2314 + 2810) / 2; 
        expect(Math.abs(value-expectedAvg)).toBeLessThan(errorMargin);
    });*/

    // Test 2 handed values.
    // Example test was naked with Gustwalker Staff.
    each`
        spellName                     | expectedResult
        ${"Jab"}                      | ${(2314 + 2810) / 2}
        ${"Tiger Palm"}               | ${(9257 + 11240) / 2}
        ${"Blackout Kick"}            | ${(10985 + 13338) / 2}
        ${"Rushing Jade Wind"}        | ${Math.round((2160 + 2622) / 2) * 8} // 3268 healing
        ${"Spinning Crane Kick"}      | ${Math.round((2700 + 3278) / 2) * 3} // 3268 healing
        ${"Expel Harm"}               | ${(12960+15736)/2}
    `.test("Base Value Check - Mistweaver Weapon Damage spells (2H): $spellName", ({ spellName, expectedResult }) => {
        const spell = init.spellDB[spellName][0];
        const value = runClassicSpell(spellName, {...spell, secondaries: []}, statPercentages, "Mistweaver Monk", userSettings)  / (spell.damageType === "physical" ? armor : 1);
        
        expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);
    });

    // Run separate test cases for 1 handed weapons.
    // Example test was Je'lyu.
    each`
        spellName                     | expectedResult
        ${"Jab"}                      | ${(2344 + 3182) / 2}
        ${"Tiger Palm"}               | ${(9377 + 12728) / 2}
        ${"Blackout Kick"}            | ${(11127 + 15103) / 2}
    `.test("Base Value Check - Mistweaver Weapon Damage spells (1H): $spellName", ({ spellName, expectedResult }) => {

        const value = runClassicSpell(spellName, {...init.spellDB[spellName][0], secondaries: []}, statPercentagesOneHanded, "Mistweaver Monk", userSettings)  / armor;
        
        expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);
    });

    // Test Regular Spells.
    // Note that the tooltip for CJL is a bait.
    // ${"Invoke Xuen, the White Tiger"}        | ${1602 * 45}             | ${0}  
    each`
        spellName                                | expectedResult           | index
        ${"Surging Mist"}                        | ${(32548 + 35652) / 2}   | ${0}
        ${"Rushing Jade Wind"}                   | ${3268 * 8}              | ${1}
        ${"Spinning Crane Kick"}                 | ${4085 * 3}              | ${1}
        
        ${"Invoke Xuen, the White Tiger"}        | ${3457 * 45}             | ${1}  
        ${"Crackling Jade Lightning"}            | ${6237 * 6}                 | ${0}
    `.test("Base Value Check - Mistweaver Reg Spells: $spellName", ({ spellName, expectedResult, index }) => {
        const spell = init.spellDB[spellName][index]
        const value = runClassicSpell(spellName, {...spell, secondaries: []}, statPercentages, "Mistweaver Monk", userSettings) / spell.targets;
        console.log(spellName, value, expectedResult);
        expect(Math.abs(value-expectedResult)).toBeLessThan(errorMargin);
    });

    //

})