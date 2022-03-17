import Player from "General/Modules/Player/Player";
import { getUnityEffect } from "./EffectEngine";

describe("Unity Legendary", () => {
    test("Resto Druid", () => {
        const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");

        expect(getUnityEffect(player)).toEqual("Celestial Spirits");
        player.setCovenant("necrolord");
        expect(getUnityEffect(player)).toEqual("Locust Swarm");

    })


})