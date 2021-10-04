import { runCastSequence, buildRamp, allRamps } from "General/Modules/Player/ClassDefaults/DiscPriestRamps";

export const getRampData = (playerStats, playerTrinkets) => {
    console.log(playerStats);
    const rampTime = 180;
    const boonSeq = buildRamp('Boon', 10, [], playerStats.haste, ['Rapture'])
    const fiendSeq = buildRamp('Fiend', 10, [], playerStats.haste, ['Rapture'])
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
    return rampData;
}