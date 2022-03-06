
import Player from "General/Modules/Player/Player";
import { getShamanSpecEffect } from "Retail/Engine/EffectFormulas/Shaman/ShamanSpecEffects"
import { getMonkSpecEffect } from "Retail/Engine/EffectFormulas/Monk/MonkSpecEffects"

describe("Shaman", () => {
    const player = new Player("Voulk", "Mistweaver Monk", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    test("2pc", () => {
        getMonkSpecEffect("Mistweaver T28-2", player, contentType)

    })


})