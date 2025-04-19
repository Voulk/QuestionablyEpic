import { Stats } from 'fs';
import Player from 'General/Modules/Player/Player';
import { runCastSequence, allRamps, allRampsHealing } from "./DiscRampUtilities";
import { getSpellRaw } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { genStatWeights } from './DiscPriestUtilities';
import { buildRamp } from "./DiscRampGen";
import { DISCSPELLS, baseTalents } from "./DiscSpellDB";
import each from "jest-each";

const DISCCONSTANTS = {
    masteryMod: 1.35,
    masteryEfficiency: 1,

    auraHealingBuff: 1, 
    auraDamageBuff: 0.94,
    
    enemyTargets: 1, 
    sins: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1}

}

describe("Test Base Spells", () => {
    const errorMargin = 2; // There's often some blizzard rounding hijinx in spells. If our formulas are within 2 (a fraction of a percent) then we are likely calculating it correctly.
    const activeStats = {
            intellect: 4833,
            haste: 1882,
            crit: 1710,
            mastery: 1064,
            versatility: 0,
            stamina: 6290,
            critMult: 2,
    }

    test("Dummy", () => {
        expect(true).toEqual(true);
    });
    
/*
    each`
        spellName                       | expectedResult
        ${"Smite"}                      | ${2402}
        ${"Shadow Word: Death"}         | ${3862}
        
        
        ${"Mind Blast"}                 | ${4964}

    // add new test cases here. Update the ones below.
    //"Mindgames" 12266
    //"Light's Wrath"}              | 7950
    `.test("Base Damage Check: $spellName", ({ spellName, expectedResult }) => {
        const spell = DISCSPELLS[spellName][0];
        const damage = getSpellRaw(spell, activeStats, DISCCONSTANTS);
        expect(Math.abs(damage * DISCCONSTANTS.auraDamageBuff - expectedResult)).toBeLessThan(errorMargin);
        //expect(getValidWeaponTypes(spec, "Offhands").includes(itemSubclass2)).toBe(expectedResult);
    });

    each`
        spellName                       | expectedResult
        
        ${"Flash Heal"}                 | ${9811}


    // add new test cases here
    // "Power Word: Shield"}         | 13532
    `.test("Base Healing Check: $spellName", ({ spellName, expectedResult }) => {
        const spell = DISCSPELLS[spellName][0];
        const healing = getSpellRaw(spell, activeStats, DISCCONSTANTS);
        expect(Math.abs(healing * DISCCONSTANTS.auraHealingBuff - expectedResult)).toBeLessThan(errorMargin);
        //expect(getValidWeaponTypes(spec, "Offhands").includes(itemSubclass2)).toBe(expectedResult);
    });*/
}); 

// Here we'll make sure talents are having the impact on our spells that we desire. 
// Some of these tests will be pretty basic, but it's still good to make sure they're covered.
describe("Test Talents", () => {



});