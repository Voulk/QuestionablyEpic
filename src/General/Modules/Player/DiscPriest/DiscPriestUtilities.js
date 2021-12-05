import { ContactSupportOutlined } from "@mui/icons-material";
import { consoleSandbox } from "@sentry/utils";
import { runCastSequence, allRamps } from "General/Modules/Player/DiscPriest/DiscPriestRamps";
import { buildRamp } from "./DiscRampGen";

export const getRampData = (playerStats, playerTrinkets, playstyle) => {
    console.log(playstyle);
    const rampTime = 180;
    const boonSeq = buildRamp('Boon', 10, [], playerStats.haste, playstyle, ['Rapture'])
    const fiendSeq = buildRamp('Fiend', 10, [], playerStats.haste, playstyle, ['Rapture'])
    const discBaseline = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": false, "Pelagos": false}, {});
    const baselineAdj = allRamps(boonSeq, fiendSeq, playerStats, {"DefaultLoadout": true}, {});
    const clarityOfMind = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": true, "Pelagos": false}, {});
    const exaltation = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": false, "Pelagos": false}, {"Exaltation": 226});
    const rabidShadows = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": false, "Pelagos": false}, {"Rabid Shadows": 226});
    const courAscension = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": false, "Pelagos": false}, {"Courageous Ascension": 226});
    const penitentOne = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": false, "Pelagos": false, "Penitent One": true}, {});

    const rampData = {
        baseline: discBaseline,
        baselineAdj: baselineAdj,
        clarityOfMind: (clarityOfMind - discBaseline) / rampTime,
        exaltation: (exaltation - discBaseline) / rampTime, 
        rabidShadows: (rabidShadows - discBaseline) / rampTime, 
        courAscension: (courAscension - discBaseline) / rampTime, 
        penitentOne: (penitentOne - discBaseline) / rampTime, 
    }
    console.log("Updating Ramp Data");
    return rampData;

}

export const genStatWeights = (activeStats, base) => {
    // Weights
    const boonSeq = buildRamp('Boon', 10, [], activeStats.haste, ['Rapture'])
    const fiendSeq = buildRamp('Fiend', 10, [], activeStats.haste, ['Rapture'])
    const baseline = allRamps(boonSeq, fiendSeq, activeStats, {"Clarity of Mind": true, "Pelagos": true}, {"Rabid Shadows": 226, "Courageous Ascension": 226, "Shining Radiance": 226});
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
            const rampResult = allRamps(seq1, seq2, adjustedStats, {"Clarity of Mind": true, "Pelagos": true}, {"Rabid Shadows": 226, "Courageous Ascension": 226, "Shining Radiance": 226});
            
            weightHPS += (rampResult / rampTime - baselineHPS);

        }
        weights[stat] = weightHPS / iterations;

    });

    const statWeights = {}

    stats.forEach(stat => {
        statWeights[stat] = Math.round(10000*(weights[stat] / weights['intellect']))/10000;
    }); 

   /*
    
    console.log(hasteResults);
    console.log(hasteWeights);
    console.log(average(hasteWeights));
    */
    return statWeights;
}