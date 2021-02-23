

import { getTrinketEffect } from "./TrinketEffectFormulas";
import { userSettings } from "../../../TopGear/SettingsObject";
import Player from "../../../Player/Player";
import { trinket_data} from "./TrinketData";
import each from "jest-each";

describe("Overflowing Anima Cage Test", () => {
    const druid = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const itemLevel = 226;
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Overflowing Anima Cage");
    const effect = activeTrinket.effects[0];

    test("226 - Raid - Allies off", () => {
        const localSettings = {...userSettings};
        localSettings.includeGroupBenefits = false;

        const trinketResult = getTrinketEffect("Overflowing Anima Cage", druid, contentType, itemLevel, localSettings);
        expect(Math.round(trinketResult.crit)).toEqual(20 * effect.efficiency);

    });

    test("226 - Raid - Allies on", () => {
        const localSettings = {...userSettings};
        localSettings.includeGroupBenefits = true;

        const trinketResult = getTrinketEffect("Overflowing Anima Cage", druid, contentType, itemLevel, localSettings);

        expect(Math.round(trinketResult.crit)).toEqual(20 * effect.efficiency * effect.targets[contentType]);

    });

    test("226 - Dungeon - Allies on", () => {
        const localSettings = {...userSettings};
        localSettings.includeGroupBenefits = true;

        const trinketResult = getTrinketEffect("Overflowing Anima Cage", druid, "Dungeon", itemLevel, localSettings);

        expect(Math.round(trinketResult.crit)).toEqual(Math.round(20 * effect.efficiency * effect.targets["Dungeon"]));

    });

    // Perform ilvl tests.
    each`
    level     | expectedResult
    ${226}   | ${9}
    ${213}  | ${8}
    ${200}  | ${8}
    ${187}  | ${7}
    // add new test cases here
    `.test("Ilvl Test - $level - Raid - Expects: $expectedResult", ({ level, expectedResult }) => {
        const localSettings = {...userSettings};
        localSettings.includeGroupBenefits = false;
        expect(Math.round(getTrinketEffect("Overflowing Anima Cage", druid, "Raid", level, localSettings).crit)).toBe(expectedResult);
  });

});

describe("Boon of the Archon Test", () => {
    const druid = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
    druid.activeStats = {
        haste: 0,
        crit: 0,
        versatility: 0,
    }
    const contentType = "Raid";
    const itemLevel = 226;
    const activeTrinket = trinket_data.find((trinket) => trinket.name === "Boon of the Archon");
    const effect_hps = activeTrinket.effects[1];
    const effect_vers = activeTrinket.effects[0];

    test("226 - Allies off", () => {
        const localSettings = {...userSettings};
        localSettings.includeGroupBenefits = false;

        const trinketResult = getTrinketEffect("Boon of the Archon", druid, contentType, itemLevel, localSettings);
        expect(Math.round(trinketResult.hps)).toEqual(Math.round(48 * effect_hps.efficiency));
        expect(Math.round(trinketResult.versatility)).toEqual(Math.round(72 * effect_vers.duration / 60 * effect_vers.efficiency));
    });

    test("226 - Allies on", () => {
        const localSettings = {...userSettings};
        localSettings.includeGroupBenefits = true;

        const trinketResult = getTrinketEffect("Boon of the Archon", druid, contentType, itemLevel, localSettings);
        expect(Math.round(trinketResult.hps)).toEqual(Math.round(48 * effect_hps.efficiency));
        expect(Math.floor(trinketResult.versatility)).toEqual(Math.floor(72 * effect_vers.duration * effect_vers.targets / 60 * effect_vers.efficiency));

    });


    // Perform ilvl tests.
    /*
    each`
    level     | expectedResult
    ${226}   | ${10}
    ${213}  | ${9}
    ${200}  | ${9}
    ${187}  | ${8}
    // add new test cases here
    `.test("Ilvl Test - $level - Raid - Expects: $expectedResult", ({ level, expectedResult }) => {
        const localSettings = {...userSettings};
        localSettings.includeGroupBenefits = false;
        expect(Math.round(getTrinketEffect("Boon of the Archon", druid, "Raid", level, localSettings).crit)).toBe(expectedResult);
  });
  */

});