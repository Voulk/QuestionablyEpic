import * as talentBase from "General/Modules/Player/ClassDefaults/Generic/TalentBase";

import specDB from "General/Modules/Player/ClassDefaults/RestoDruid/RestoDruidSpellDB.json";


describe("Test Cast Time changes", () => {

    test("Test Flat Cast Time Reduction", () => {
        const spellName = "Regrowth";
        const spell = specDB[spellName];
        talentBase.modCastTimeFlat(spell, -500);

        expect(spell[0].castTime).toBe(1);
    })

    test("Test Perc Cast Time Reduction", () => {
        const spellName = "Wild Growth";
        const spell = specDB[spellName];
        talentBase.modCastTimePerc(spell, -10);

        expect(spell[0].castTime).toBe(1.35);
    })
})

describe("Test Cost Changes", () => {
    test("Test Flat Mana Cost Reduction", () => {
        const spellName = "Rejuvenation";
        const spell = specDB[spellName];
        const initialPrice = spell[0].cost;
        
        talentBase.manaCostAdj(spell, -15);

        expect(spell[0].cost).toBe(initialPrice * 0.85);
    })

})

describe("Test Buff Changes", () => {
    test("Test Spell Percent Buff", () => {
        const spellName = "Rejuvenation";
        const spell = specDB[spellName];
        const initialCoeff = spell[0].coeff;

        talentBase.buffSpellPerc(spell, 20);

        expect(spell[0].coeff).toEqual(initialCoeff * 1.2);
    })

})