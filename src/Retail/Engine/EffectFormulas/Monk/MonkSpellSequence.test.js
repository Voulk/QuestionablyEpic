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
        intellect: 2050,
        haste: 88,
        crit: 650,
        mastery: 400,
        versatility: 400,
        stamina: 0,
    }

    const sequence = ["Vivify", "Vivify", "Faeline Stomp"];

    test("Legendaries & Soulbinds", () => {
        runCastSequence(sequence, activeStats, {}, {});
    })

})