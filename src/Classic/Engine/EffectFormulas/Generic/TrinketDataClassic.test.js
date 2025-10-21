

import { processedValue } from "Classic/Engine/EffectFormulas/Generic/ClassicEffectUtilities";
import { raidTrinketData } from "./TrinketDataClassic";
import each from "jest-each";



describe("Trinket Tests", () => {
    const trinketData = raidTrinketData;
    const ingameData = [
        {name: "Zen Alchemist Stone", levels: {458: [4353]}},
        {name: "Empty Fruit Barrel", levels: {463: [3386], 471: [3649]}},
        {name: "Price of Progress", levels: {463: [5082]}},
        //{name: "Mister Pick-Me-Up", levels: {642: [82567], 668: [120510]}}
    ]

    ingameData.forEach(({ name, levels }) => {
        describe(name, () => {
            const activeTrinket = trinketData.find(trinket => trinket.name === name);
            if (!activeTrinket) {
                console.warn(`Trinket "${name}" not found!`);
                return;
            }
            const effects = activeTrinket.effects;

            each(Object.entries(levels)).test(
                `${name} Test - Level: %s - Expected: %j`,
                (level, expectedResult) => {
                    //level = Number(level); // Convert level string back to number
                    effects.forEach((effect, index) => {
                        expect(processedValue(effects[index], level, 1)).toBe(expectedResult[index]);
                    });
                    
                    //expect(processedValue(effect[1], level)).toBe(expectedResult[1]);
                    //expect(processedValue(effect[2], level)).toBe(expectedResult[2]);
                    //expect(processedValue(effect[4], level)).toBe(expectedResult[4]);
                }
            );
        });
    });
});


