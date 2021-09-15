import { runCastSequence, buildRamp, allRamps } from "General/Modules/Player/ClassDefaults/DiscPriestRamps";

export const getRampData = (playerStats, playerTrinkets) => {
    const rampTime = 180;
    const boonSeq = buildRamp('Boon', 10, ["Divine Bell"], playerStats.haste, ['Rapture'])
    const fiendSeq = buildRamp('Fiend', 10, ["Divine Bell"], playerStats.haste, ['Rapture'])
    const discBaseline = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": false, "Pelagos": false}, {});
    const clarityOfMind = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": true, "Pelagos": false}, {});
    const exaltation = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": false, "Pelagos": false}, {"Exaltation": 226});
    const rabidShadows = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": false, "Pelagos": false}, {"Rabid Shadows": 226});
    const courAscension = allRamps(boonSeq, fiendSeq, playerStats, {"Clarity of Mind": false, "Pelagos": false}, {"Courageous Ascension": 226});

    const rampData = {
        baseline: discBaseline,
        clarityOfMind: (clarityOfMind - discBaseline) / rampTime,
        exaltation: (exaltation - discBaseline) / rampTime, 
        rabidShadows: (rabidShadows - discBaseline) / rampTime, 
        courAscension: (courAscension - discBaseline) / rampTime, 
    }
    return rampData;
}