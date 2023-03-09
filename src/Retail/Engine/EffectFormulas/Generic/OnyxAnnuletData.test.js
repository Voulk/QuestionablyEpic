import { getProcessedValue, processedValue } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { userSettings } from "General/Modules/Settings/SettingsObject";
import Player from "General/Modules/Player/Player";
import { effectData} from "./EffectData";
import each from "jest-each";

import { getOnyxAnnuletEffect } from "./OnyxAnnuletData";

describe("TODO", () => {
    test("TODOs", () => {
        const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
        const contentType = "Raid";
        const gems = ["Cold Frost Stone,Deluging Water Stone,Stone3"];
        const setStats = {};
        const settings = {};

        getOnyxAnnuletEffect(gems, player, contentType, 400, setStats, settings);
        expect(true).toEqual(true)

    })
});