

// Run Spell Combos
// playerData = { spec, baseSpells, baseSettings, baseTalents, stats }
export function runSpellComboSuite(playerData, comboList, runCastSequence) {
    const simData = runSuite(playerData, comboList, runCastSequence, "Sequence");  

    return simData;
}


// Run APL
export function runAPLSuites(playerData, aplProfile, runCastSequence) {
    const simData = runSuite(playerData, aplProfile, runCastSequence, "APL");  

    return simData;

}

export function runStatSuites(playerData, aplList, runCastSequence) {
        // Weights
        const stats = ['intellect', 'crit', 'mastery', 'haste', 'versatility'];

        const baseline = runSuite(playerData, aplList, runCastSequence, "APL").avgHPS;
        
        const results = {};
        stats.forEach(stat => {

            let playerStats = JSON.parse(JSON.stringify(playerData.stats));
            playerStats[stat] = playerStats[stat] + 600;
            const newPlayerData = {...playerData, stats: playerStats};
            const result = runSuite(newPlayerData, aplList, runCastSequence, "APL").avgHPS;
            results[stat] = result;
        });
        const weights = {}

        stats.forEach(stat => {
            weights[stat] = Math.round(1000*(results[stat] - baseline) / (results['intellect'] - baseline))/1000;
        });

        console.log(weights); 
        return weights;



}

function runSuite(playerData, profile, runCastSequence, type) {
    const iterations = 1;
    let hps = [];
    let hpm = [];
    const simData = {
        avgHPS: 0,
        maxHPS: 0,
        minHPS: 0,
        avgHPM: 0,
    }

    // Handle profile talents.

    for (let i = 0; i < iterations; i++) {
        let result = null;
        if (type === "APL") result = runCastSequence(["Rest"], JSON.parse(JSON.stringify(playerData.stats)), playerData.settings, playerData.talents, profile.apl);
        else if (type === "Sequence") result = runCastSequence(profile.seq, JSON.parse(JSON.stringify(playerData.stats)), playerData.settings, playerData.talents);
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

