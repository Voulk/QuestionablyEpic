
import { allRampsHealing } from "General/Modules/Player/ClassDefaults/DisciplinePriest/DiscRampUtilities";
import { buildRamp } from "./DiscRampGen";

export const getRampData = (playerStats, playerTrinkets, playstyle) => {
    
    const rampTime = 180;

    // Baselines
    const discBaseline = 0//allRampsHealing([], playerStats, {"playstyle": playstyle, "reporting": false, "DefaultLoadout": true}, {}, [], false);
    const disc2pc = 61500; // allRampsHealing([], playerStats, {"playstyle": playstyle, "reporting": false, "DefaultLoadout": true}, {}, [], false);
    const disc4pc = 17400; // allRampsHealing([], playerStats, {"playstyle": playstyle, "reporting": false, "DefaultLoadout": true}, {}, [], false);

    const rampData = {
        baseline: discBaseline / rampTime,
        twoPc: disc2pc, //(disc2pc - discBaseline) / rampTime,
        fourPc: disc4pc, //(disc4pc - discBaseline) / rampTime,
    }
    return rampData; 
    //return {};

}



export const genStatWeights = (activeStats) => {
    // Weights
    const boonSeq = buildRamp('Boon', 10, [], activeStats.haste, ['Rapture'])
    const fiendSeq = buildRamp('Fiend', 10, [], activeStats.haste, ['Rapture'])
    const baseline = allRampsHealing(boonSeq, fiendSeq, activeStats, {"Clarity of Mind": true, "Pelagos": true}, {"Rabid Shadows": 226, "Courageous Ascension": 226, "Shining Radiance": 226});
    const baselineRampTime = (180+(180 / (1 + activeStats.haste / 33 / 100)))/2
    const baselineHPS = baseline / baselineRampTime;
    
    const stats = ['intellect','versatility', 'crit', 'haste', 'mastery'];

    const weights = {};
    stats.forEach(stat => {
        let iterations = 1;
        let weightHPS = 0;
        if (stat === "haste") iterations = 1;

        for (var i = 1; i < iterations+1; i++) {
            const adjustedStats = JSON.parse(JSON.stringify(activeStats));
           
            adjustedStats[stat] = adjustedStats[stat] + i * 1;
            const rampTime = (180+(180 / (1 + adjustedStats['haste'] / 33 / 100)))/2;

            const seq1 = buildRamp('Boon', 10, [], adjustedStats['haste'], ['Rapture'])
            const seq2 = buildRamp('Fiend', 10, [], adjustedStats['haste'], ['Rapture'])
            const rampResult = allRampsHealing(seq1, seq2, adjustedStats, {"Clarity of Mind": true, "Pelagos": true}, {"Rabid Shadows": 226, "Courageous Ascension": 226, "Shining Radiance": 226});
            
            weightHPS += (rampResult / rampTime - baselineHPS);

        }
        weights[stat] = weightHPS / iterations;

    });

    const statWeights = {}

    stats.forEach(stat => {
        statWeights[stat] = Math.round(10000*(weights[stat] / weights['intellect']))/10000;
    }); 

    return statWeights;
}