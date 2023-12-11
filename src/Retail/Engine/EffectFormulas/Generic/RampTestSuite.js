

// Run Spell Combos
// playerData = { spec, baseSpells, baseSettings, baseTalents, activeStats }
export function runSpellComboSuite(playerData, comboList, runCastSequence) {
    const simData = runSuite(playerData, comboList, runCastSequence, "Sequence");  

    return simData;
}


// Run APL
export function runAPLSuites(playerData, aplList, runCastSequence) {
    const simData = runSuite(playerData, aplList, runCastSequence, "APL");  

    return simData;

}

function runSuite(playerData, aplList, runCastSequence, type) {
    const iterations = 1000;
    let hps = [];
    let hpm = [];
    const simData = {
        avgHPS: 0,
        maxHPS: 0,
        minHPS: 0,
        avgHPM: 0,
    }

    for (let i = 0; i < iterations; i++) {
        let result = null;
        if (type === "APL") result = runCastSequence(["Rest"], JSON.parse(JSON.stringify(playerData.stats)), playerData.settings, playerData.talents, aplList);
        else if (type === "Sequence") result = runCastSequence(aplList, JSON.parse(JSON.stringify(playerData.stats)), playerData.settings, playerData.talents);
        else console.error("Invalid type passed to runSuite()");

        hps.push(result.hps);
        hpm.push(result.hpm);

    }

    simData.minHPS = Math.min(...hps)
    simData.maxHPS = Math.max(...hps)
    simData.avgHPS = hps.reduce((acc, current) => acc + current, 0) / iterations;
    simData.avgHPM = Math.round(100*(hpm.reduce((acc, current) => acc + current, 0) / iterations))/100;

    return simData;
}

