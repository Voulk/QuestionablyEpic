

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
    const diffRange = Array.from({ length: 11 }, (_, index) => -500 + index * 100);

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

// A small meta suite to run an APL at different durations.
// Note that we're mostly interested in runtime here, not HPS. We can use it to identify any issues that's causing our APL to run slowly.
export function runTimeSuite(playerData, aplList, runCastSequence) {
    const sequenceLengths = [40, 60, 80, 100, 120, 140, 160, 180];

    sequenceLengths.forEach(length => {
        const newPlayerData = {...playerData, settings: {...playerData.settings, seqLength: length}};

        const result = runSuite(newPlayerData, aplList, runCastSequence, "APL").elapsedTime;
        console.log(length + " t: " + result + "ms")
    })
    
}

// Runs suite over multiple profiles and prints the performance of each.
function runComparisonSuites(playerData, profiles, runCastSequence) {

    profiles.forEach(profile => {
        const newPlayerData = {...playerData};

        const result = runSuite(newPlayerData, profile, runCastSequence, "APL").elapsedTime;
        console.log(profile.tag + " hps: " + result.avgHPS + "ms");
    })
}

function runSuite(playerData, profile, runCastSequence, type) {
    const iterations = 2600;
    let hps = []; 
    let hpm = [];
    let elapsedTime = [];

    const simData = {
        avgHPS: 0,
        maxHPS: 0,
        minHPS: 0,
        avgHPM: 0,
        elapsedTime: 0,
        sampleReport: {},
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


    }

    // After our iterations, complete one last run but with reporting modes on. We don't want these on for everything because it increases runtime by a lot but it's 
    // fine for a single run. We can use this as an example report, and it'll help us identify any problems with rotation or even the sim itself.
    let singleReport = null;
    const adjSettings = {...playerData.settings, reporting: true, advancedReporting: true};
    if (type === "APL") singleReport = runCastSequence(["Rest"], JSON.parse(JSON.stringify(playerData.stats)), adjSettings, playerData.talents, profile.apl);
    else if (type === "Sequence") singleReport = runCastSequence(profile.seq, JSON.parse(JSON.stringify(playerData.stats)), adjSettings, playerData.talents);


    simData.minHPS = Math.min(...hps)
    simData.maxHPS = Math.max(...hps)
    simData.avgHPS = hps.reduce((acc, current) => acc + current, 0) / iterations;
    simData.avgHPM = Math.round(100*(hpm.reduce((acc, current) => acc + current, 0) / iterations))/100;
    simData.elapsedTime = Math.round(1000*elapsedTime.reduce((acc, current) => acc + current, 0) / iterations)/1000;
    simData.maxTime = Math.round(1000*Math.max(...elapsedTime))/1000;

    simData.buffUptimes = calculateBuffUptime(singleReport.advancedReport);
    simData.sampleReport = singleReport;
    return simData;
}


// If running on Advanced mode, buffs are polled every 1000ms.
// We can thus calculate the uptime of each buff by counting the number of times it appears in the array of buffs and dividing by our runtime. 
// Things it can't currently do: 
// -- Won't Tell you how many stacks of a buff you had. Will tell you how many you had out on average.
// -- Won't give you a 100% precise uptime. If you need more precision then reduce buff polling time.
function calculateBuffUptime(data) {
    const buffCounts = {};
    // Iterate over the advanced report array.
    data.forEach(entry => {
      // Iterate over buffs in each entry
      entry.buffs.forEach(buff => {
        // Count occurrences of each buff
        buffCounts[buff] = (buffCounts[buff] || 0) + 1;
      });
    });
  
    // Calculate uptime for each buff given the number of times it appears.
    const totalEntries = data.length;
    const buffUptimes = {};
  
    for (const buff in buffCounts) {
      const occurrences = buffCounts[buff];
      const uptime = Math.round((occurrences / totalEntries) * 10000)/100; // Percentage uptime
      buffUptimes[buff] = uptime;
    }

    return buffUptimes;
}
