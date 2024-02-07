

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

// The stat differential suite takes the stat profile stored on the APL and varies them by +-1000 and then stores the result. 
// We'll do this in stages of 100 but you can change it to 50 if you want more specificity.
export function runStatDifferentialSuite(playerData, aplList, runCastSequence) {
    const stats = [/*'crit', 'mastery', 'haste', */'haste'];
    const baseline = runSuite(playerData, aplList, runCastSequence, "APL").avgHPS;
    let counter = 0;
    const diffRange = Array.from({ length: 15 }, (_, index) => -700 + index * 100);

    stats.forEach(stat => {
        const results = [];
        diffRange.forEach(diff => {
            let playerStats = JSON.parse(JSON.stringify(playerData.stats));
            playerStats[stat] = playerStats[stat] + diff;

            const newPlayerData = {...playerData, stats: playerStats};

            const result = runSuite(newPlayerData, aplList, runCastSequence, "APL")//.avgHPS;
            const resultHPS = result.avgHPS;
            const runTime = result.elapsedTime;
            //results[stat] = result;
            results.push(Math.round(resultHPS - baseline));
            counter += 1;

            console.log("Run averaged: " + runTime + "ms (max: " + result.maxTime + "ms)");
            if (counter % 10 === 0) console.log("Counted: " + counter);
            //console.log(stat + " (" + diff + "): " + (result - baseline));
        })
        console.log(stat);
        console.log(results)

    })
}

function runSuite(playerData, profile, runCastSequence, type) {
    const iterations = 1;
    let hps = []; 
    let hpm = [];
    let elapsedTime = [];

    const simData = {
        avgHPS: 0,
        maxHPS: 0,
        minHPS: 0,
        avgHPM: 0,
        elapsedTime: 0,
    }

    // Handle profile talents.
    if (profile.talents.length > 0) {
        profile.talents.forEach(talent => {
            playerData.talents[talent].points = playerData.talents[talent].maxPoints;
        });
    }

    for (let i = 0; i < iterations; i++) {
        let result = null;
        if (type === "APL") result = runCastSequence(["Rest"], JSON.parse(JSON.stringify(playerData.stats)), playerData.settings, playerData.talents, profile.apl);
        else if (type === "Sequence") result = runCastSequence(profile.seq, JSON.parse(JSON.stringify(playerData.stats)), playerData.settings, playerData.talents);
        else console.error("Invalid type passed to runSuite()");
        hps.push(result.hps);
        hpm.push(result.hpm);
        elapsedTime.push(result.elapsedTime);

        console.log(result);

    }

    simData.minHPS = Math.min(...hps)
    simData.maxHPS = Math.max(...hps)
    simData.avgHPS = hps.reduce((acc, current) => acc + current, 0) / iterations;
    simData.avgHPM = Math.round(100*(hpm.reduce((acc, current) => acc + current, 0) / iterations))/100;
    simData.elapsedTime = Math.round(1000*elapsedTime.reduce((acc, current) => acc + current, 0) / iterations)/1000;
    simData.maxTime = Math.round(1000*Math.max(...elapsedTime))/1000;

    return simData;
}

