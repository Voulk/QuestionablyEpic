import { Stats } from 'fs';
import Player from 'General/Modules/Player/Player';
import { runCastSequence, allRamps, allRampsHealing } from "./DiscRampUtilities";
import { getSpellRaw } from "Retail/Engine/EffectFormulas/Generic/RampBase";
import { genStatWeights } from './DiscPriestUtilities';
import { buildRamp } from "./DiscRampGen";
import { DISCSPELLS, baseTalents } from "./DiscSpellDB";

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
            critMult: 0,
    }

    test("Smite", () => {
        const spell = DISCSPELLS['Smite'][0];
        const damage = getSpellRaw(spell, activeStats, DISCCONSTANTS);
        expect(Math.abs(damage * DISCCONSTANTS.auraDamageBuff - 2402)).toBeLessThan(errorMargin);
    });

    test("Mind Blast", () => {
        const spell = DISCSPELLS['Mind Blast'][0];
        const damage = getSpellRaw(spell, activeStats, DISCCONSTANTS);
        expect(Math.abs(damage * DISCCONSTANTS.auraDamageBuff - 4982)).toBeLessThan(errorMargin);
    });
    test("Shadow Word: Death", () => {
        const spell = DISCSPELLS['Shadow Word: Death'][0];
        const damage = getSpellRaw(spell, activeStats, DISCCONSTANTS);
        expect(Math.abs(damage * DISCCONSTANTS.auraDamageBuff - 3862)).toBeLessThan(errorMargin);
    });
    test("Light's Wrath", () => {
        const spell = DISCSPELLS["Light's Wrath"][0];
        const damage = getSpellRaw(spell, activeStats, DISCCONSTANTS);
        expect(Math.abs(damage * DISCCONSTANTS.auraDamageBuff - 7950)).toBeLessThan(errorMargin);
    });
    test("Mindgames - Damage", () => {
        const spell = DISCSPELLS["Mindgames"][0];
        const damage = getSpellRaw(spell, activeStats, DISCCONSTANTS);
        expect(Math.abs(damage * DISCCONSTANTS.auraDamageBuff - 12266)).toBeLessThan(errorMargin);
    });
    // Healing Spells
    test("Power Word: Shield", () => {
        const spell = DISCSPELLS['Power Word: Shield'][0];
        const healing = getSpellRaw(spell, activeStats, DISCCONSTANTS);
        expect(Math.abs(healing * DISCCONSTANTS.auraHealingBuff - 13532)).toBeLessThan(errorMargin);
    });

});