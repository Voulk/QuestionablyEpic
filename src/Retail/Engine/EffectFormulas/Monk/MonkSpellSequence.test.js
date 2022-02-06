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
        haste: 700,
        crit: 1100,
        mastery: 85,
        versatility: 410,
        stamina: 0,
    }

    const sequence = ["Faeline Stomp"];

    test("Legendaries & Soulbinds", () => {
        runCastSequence(sequence, activeStats, {"DefaultLoadout": true, "covenant": "Night Fae", "legendaries": ["Ancient Teachings of the Monastery"], "misc": ["2T28", "4T28"]}, {});
    })

})