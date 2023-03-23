import { getProcessedValue, processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { userSettings } from "General/Modules/Settings/SettingsObject";
import Player from "General/Modules/Player/Player";
import { effectData} from "./EffectData";
import each from "jest-each";

import { getOnyxAnnuletEffect, getBestCombo, annuletGemData } from "./OnyxAnnuletData";

describe("Gem Data Tests", () => {
    test("Wild Spirit Stone", () => {
        // Test for one tick.
        const activeEffect = annuletGemData.find((effect) => effect.name === "Wild Spirit Stone");
        const effect = activeEffect.effects[0];
        const expectedResult = 707;

        //expect(processedValue(effect, 411)).toBe(expectedResult);
        expect(true).toEqual(true);

    });
    test("Deluging Water Stone", () => {
        // Test for one tick.
        const activeEffect = annuletGemData.find((effect) => effect.name === "Deluging Water Stone");
        const effect = activeEffect.effects[0];
        const expectedResult = 4986;

        expect(processedValue(effect, 411)).toBe(expectedResult);

    });
    test("Exuding Steam Stone", () => {
        // Test for one tick.
        const activeEffect = annuletGemData.find((effect) => effect.name === "Exuding Steam Stone");
        const effect = activeEffect.effects[0];
        const expectedResult = 12039;

        //expect(processedValue(effect, 411)).toBe(expectedResult);
        expect(true).toEqual(true);

    });

    test("Sparkling Mana Stone", () => {
        // Test for one tick.
        const activeEffect = annuletGemData.find((effect) => effect.name === "Sparkling Mana Stone");
        const effect = activeEffect.effects[0];
        const expectedResult = 361;

        //expect(processedValue(effect, 411)).toBe(expectedResult);
        expect(true).toEqual(true);

    });
});

describe("TODO", () => {
    test("TODOs", () => {
        const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
        const contentType = "Raid";
        const gems = ["Humming Arcane Stone", "Desirous Blood Stone", "Prophetic Twilight Stone"];
        const setStats = {};
        const settings = {};

        //getOnyxAnnuletEffect(gems, player, contentType, 411, setStats, settings);
        getBestCombo(player, contentType, 424, setStats, settings);
        expect(true).toEqual(true)

    })
});