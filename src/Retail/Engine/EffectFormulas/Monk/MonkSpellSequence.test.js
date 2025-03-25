import { MONKSPELLS } from "./MistweaverSpellDB";
import { baseTalents } from "./MistweaverTalents";
import { runMistweaverMonkCastProfile } from "./MistweaverCastProfile";

describe("Test APL", () => {
    test("Test APL", () => {
        
        console.log("Testing APL");

        let activeStats = {
            intellect: 76000 * 1.05,
            haste: 5000,
            crit: 5000,
            mastery: 5000 + (2 * 700),
            versatility: 5000 + (3 * 780),
            stamina: 29000,
            critMult: 2,
        }
        const baseSpells = MONKSPELLS;
        const testSettings = {masteryEfficiency: 0.85, includeOverheal: true, reporting: true, t31_2: false, seqLength: 200};

        const playerData = { spec: "Mistweaver Monk", spells: baseSpells, settings: testSettings, talents: {...baseTalents}, stats: activeStats, tier: ["Monk S2-2", "Monk S2-4"] }

        //const data = runCastProfileSuites(playerData, runPreservationEvokerProfile)
        const iterations = 1;
        let baseline = 0;
        
        for (let i = 0; i < iterations; i++) {
            baseline += runMistweaverMonkCastProfile(playerData).hps;
        }

        baseline = baseline / iterations
        
        runStats(playerData);
        
    })
});

const runStats = (playerData) => {
    const stats = ['crit', 'mastery', 'haste', 'versatility', 'intellect', ];
    const iterations = 1;
    let baseline = 0;

    const activeStats = { // Here we'll just reset activeStats so that we have the same amount of each.
        intellect: 76000 * 1.05 * 1.05,
        haste: 5000,
        crit: 5000,
        mastery: 5000 + (2 * 700),
        versatility: 5000 + (3 * 780),
        stamina: 29000,
        critMult: 2,
    }

    playerData.stats = activeStats;
    
    for (let i = 0; i < iterations; i++) {
        baseline += runMistweaverMonkCastProfile(playerData).hps;
    }

    baseline = baseline / iterations
    
    const results = {};

    stats.forEach(stat => {
        let statHealing = 0;
        let playerStats = JSON.parse(JSON.stringify(playerData.stats));
        playerStats[stat] = playerStats[stat] + 2400;
        const newPlayerData = {...playerData, stats: playerStats};
        for (let i = 0; i < iterations; i++) {
            statHealing += runMistweaverMonkCastProfile(newPlayerData).hps;
        }
        results[stat] = statHealing / iterations;

    });
    const weights = {}

    stats.forEach(stat => {
        weights[stat] = Math.round(1000*(results[stat] - baseline) / (results['intellect'] - baseline))/1000;
    });
    console.log(weights); 
}