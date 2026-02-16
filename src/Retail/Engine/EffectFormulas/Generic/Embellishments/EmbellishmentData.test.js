
import { processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "General/Modules/Player/Player";
import { embellishmentData } from "./EmbellishmentData";
import each from "jest-each";

describe("Trinket Tests", () => {
    const level = 257;
    const ingameData = [
        {name: "Axe-Flingin' Bands", levels: {[level]: [11]}},
        //{name: "Signet of Azerothian Blessings", levels: {246: [23]}},
        {name: "Root Warden's Regalia", levels: {[level]: [158]}},
        {name: "World Tree Rootwraps", levels: {[level]: [113]}},
        {name: "Blessed Pango Charm", levels: {[level]: [101]}},
        {name: "Sunfire Silk Lining", levels: {252: [4]}},
        {name: "Sunfire Silk Trappings", levels: {252: [156]}}, // 157
        

        {name: "Arcanoweave Lining", levels: {252: [40]}},
        {name: "Primal Spore Binding", levels: {252: [5833]}},
    ]

    ingameData.forEach(({ name, levels }) => {
        describe(name, () => {
            const activeEffect = embellishmentData.find(trinket => trinket.name === name);
            if (!activeEffect) {
                console.warn(`Effect "${name}" not found!`);
                return;
            }
            const effects = activeEffect.effects;

            each(Object.entries(levels)).test(
                `${name} Test - Level: %s - Expected: %j`,
                (level, expectedResult) => {
                    //level = Number(level); // Convert level string back to number
                    effects.forEach((effect, index) => {
                        expect(processedValue(effects[index], level, 1, "round")).toBe(expectedResult[index]);
                    });
                    
                    //expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
                    //expect(processedValue(effect[2], level)).toBe(expectedResult[2]);
                    //expect(processedValue(effect[4], level)).toBe(expectedResult[4]);
                }
            );
        });
    });
});