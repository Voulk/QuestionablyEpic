
import Player from "General/Modules/Player/Player";
import { getShamanSpecEffect } from "Retail/Engine/EffectFormulas/Shaman/ShamanSpecEffects"
import { getMonkSpecEffect } from "Retail/Engine/EffectFormulas/Monk/MonkSpecEffects"
import { getPaladinSpecEffect } from "Retail/Engine/EffectFormulas/Paladin/PaladinSpecEffects"

describe("Shaman", () => {
    const player = new Player("Voulk", "Restoration Shaman", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    test("pc", () => {
        getShamanSpecEffect("Shaman T28-4", player, contentType)

    })


})