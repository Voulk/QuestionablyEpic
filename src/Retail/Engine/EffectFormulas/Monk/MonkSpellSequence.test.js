const { runCastSequence } = require("Retail/Engine/EffectFormulas/Monk/MonkSpellSequence.js");

describe("Test Sequences", () => {
    //const player = new Player("Mock", "Discipline Priest", 99, "NA", "Stonemaul", "Night Elf");
    /*player.activeStats = {
            intellect: 1974,
            haste: 869,
            crit: 445,
            mastery: 451,
            versatility: 528,
            stamina: 1900,
    } */
    const activeStats = {
        intellect: 2000,
        haste: 400,
        crit: 0,
        mastery: 0,
        versatility: 0,
        stamina: 0,
    }

    const sequence = ["Tiger Palm", "Tiger Palm", "Blackout Kick"];

    test("Legendaries & Soulbinds", () => {
        runCastSequence(sequence, activeStats, {"DefaultLoadout": true, "covenant": "Necrolord", "legendaries": ["Ancient Teachings of the Monastery"]}, {});
    })

})