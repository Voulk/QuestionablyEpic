
import Player from "General/Modules/Player/Player";
import { getShamanSpecEffect } from "Retail/Engine/EffectFormulas/Shaman/ShamanSpecEffects"
import { getMonkSpecEffect } from "Retail/Engine/EffectFormulas/Monk/MonkSpecEffects"
import { getPaladinSpecEffect } from "Retail/Engine/EffectFormulas/Paladin/PaladinSpecEffects"
import { getDruidSpecEffect } from "Retail/Engine/EffectFormulas/Druid/DruidSpecEffects"
import { getDiscPriestSpecEffect } from "Retail/Engine/EffectFormulas/Priest/DiscPriestSpecEffects"

describe("Shaman", () => {
    const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    test("pc", () => {
        getDruidSpecEffect("Druid T28-4", player, contentType)

    })


})