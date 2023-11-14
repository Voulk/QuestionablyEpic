
import Player from "General/Modules/Player/Player";
import { getShamanSpecEffect } from "Retail/Engine/EffectFormulas/Shaman/ShamanSpecEffects"
import { getMonkSpecEffect } from "Retail/Engine/EffectFormulas/Monk/MonkSpecEffects"
import { getEvokerSpecEffect } from "Retail/Engine/EffectFormulas/Evoker/EvokerSpecEffects"
import { getPaladinSpecEffect } from "Retail/Engine/EffectFormulas/Paladin/PaladinSpecEffects"
import { getDruidSpecEffect } from "Retail/Engine/EffectFormulas/Druid/DruidSpecEffects"
import { getDiscPriestSpecEffect } from "Retail/Engine/EffectFormulas/Priest/DiscPriestSpecEffects"
import { getHolyPriestSpecEffect } from "Retail/Engine/EffectFormulas/Priest/HolyPriestSpecEffects"

// This is a dummy test unit and is not fully functional yet.
describe("Shaman", () => {
    const player = new Player("Voulk", "Mistweaver Monk", 99, "NA", "Stonemaul", "Night Elf");
    const contentType = "Raid";
    const type = "Regular";

    const specs = ["Restoration Druid", "Restoration Shaman", "Mistweaver Monk", "Holy Priest", "Discipline Priest", "Holy Paladin", "Preservation Evoker"]

    test("Druid", () => {
        const player = new Player("Voulk", "Restoration Druid", 99, "NA", "Stonemaul", "Night Elf");
        console.log("Druid 2pc: " + JSON.stringify(getDruidSpecEffect("Druid T31-2", player, contentType)))
        console.log("Druid 4pc: " + JSON.stringify(getDruidSpecEffect("Druid T31-4", player, contentType)))
    })

    test("Mistweaver", () => {
        const player = new Player("Voulk", "Mistweaver Monk", 99, "NA", "Stonemaul", "Night Elf");
        console.log("Monk 2pc: " + JSON.stringify(getMonkSpecEffect("Monk T31-2", player, contentType)))
        console.log("Monk 4pc: " + JSON.stringify(getMonkSpecEffect("Monk T31-4", player, contentType)))
    })

    test("Preservation Evoker", () => {
        const player = new Player("Voulk", "Preservation Evoker", 99, "NA", "Stonemaul", "Night Elf");
        console.log("Evoker 2pc: " + JSON.stringify(getEvokerSpecEffect("Evoker T31-2", player, contentType)))
        console.log("Evoker 4pc: " + JSON.stringify(getEvokerSpecEffect("Evoker T31-4", player, contentType)))

        console.log("Evoker S2 2pc: " + JSON.stringify(getEvokerSpecEffect("Evoker T30-2", player, contentType)))
        console.log("Evoker S2 4pc: " + JSON.stringify(getEvokerSpecEffect("Evoker T30-4", player, contentType)))
    })

    test("Holy Paladin", () => {
        const player = new Player("Voulk", "Holy Paladin", 99, "NA", "Stonemaul", "Night Elf");
        console.log("Paladin 2pc: " + JSON.stringify(getPaladinSpecEffect("Paladin T31-2", player, contentType)))
        console.log("Paladin 4pc: " + JSON.stringify(getPaladinSpecEffect("Paladin T31-4", player, contentType)))
    })

    


})