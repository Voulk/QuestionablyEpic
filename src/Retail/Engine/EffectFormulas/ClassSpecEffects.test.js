
import Player from "General/Modules/Player/Player";
import { getShamanSpecEffect } from "Retail/Engine/EffectFormulas/Shaman/ShamanSpecEffects"
import { getMonkSpecEffect } from "Retail/Engine/EffectFormulas/Monk/MonkSpecEffects"
import { getPaladinSpecEffect } from "Retail/Engine/EffectFormulas/Paladin/PaladinSpecEffects"
import { getDruidSpecEffect } from "Retail/Engine/EffectFormulas/Druid/DruidSpecEffects"
import { getDiscPriestSpecEffect } from "Retail/Engine/EffectFormulas/Priest/DiscPriestSpecEffects"
import { getHolyPriestSpecEffect } from "Retail/Engine/EffectFormulas/Priest/HolyPriestSpecEffects"

// This is a dummy test unit and is not fully functional yet.
describe("Shaman", () => {
    const player = new Player("Voulk", "Restoration Shaman", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    test("pc", () => {
        console.log(getShamanSpecEffect("Shaman T29-4", player, contentType))
    })


})