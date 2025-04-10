

import {getProcessedValue, processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import Player from "General/Modules/Player/Player";
import { trinket_data} from "../ShadowlandsTrinketData";
import { raidTrinketData } from "./RaidTrinketData";
import { dungeonTrinketData } from "./DungeonTrinketData";
import { otherTrinketData } from "./OtherTrinketData";
import each from "jest-each";



describe("Trinket Tests", () => {
const trinketData = raidTrinketData.concat(dungeonTrinketData, otherTrinketData)
    const ingameData = [
        {name: "Eye of Kezan", levels: {645: [331, 115947], 671: [421, 168875]}},
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


describe("Gale of Shadows", () => {
    // Raw trinket values are compared to our spell data. Efficiency excluded.
    // Coeff #2 is used for both the mastery and crit procs and they have the same name.
    const activeTrinket = dungeonTrinketData.find((trinket) => trinket.name === "Gale of Shadows");
    const effect = activeTrinket.effects;
    each`
    level   | expectedResult
    ${597}  | ${[129]}
    // add new test cases here
    `.test("Gale of Shadows Test - $level - Expects: $expectedResult", ({ level, expectedResult }) => {
        expect(processedValue(effect[0], level, 1)).toBe(expectedResult[0]);
    });
}); 
