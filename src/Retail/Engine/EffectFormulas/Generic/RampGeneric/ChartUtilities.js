

// newSeq = sequence.seq;
// Filter = return only X.
export const buildChartEntry = (sequence, spellData, newSeq, activeStats, testSettings, talents, filterSpell, runCastSequence) => {
    const iterations = sequence.iterations ? sequence.iterations : 1; // Spells that require more RNG can set their own iteration count like Reversion.
    let data = {
        healingDone: 0,
        damageDone: 0,
        manaSpent: 0,
        execTime: 0,
        spellValues: {

        }
    }

    // Run sequence X times.
    // For each time run, save the healing breakdown. We will use it at the end.

    for (let i = 0; i < iterations; i++) {
        const result = runCastSequence(newSeq, JSON.parse(JSON.stringify(activeStats)), {...testSettings, preBuffs: sequence.preBuffs}, talents);
        const spellBreakdown = result.healingDone;
        data.healingDone += result.totalHealing;
        data.damageDone += result.totalDamage;
        data.manaSpent += result.manaSpent;
        data.execTime += result.execTime;

        for (const [key, value] of Object.entries(spellBreakdown)) {
            if (!data.spellValues[key]) data.spellValues[key] = 0;
            data.spellValues[key] += value;
        }
    }

    // After the sequence has run, check for a filter function.
    // - If no filter, return result.
    // - If filter, filter the healing first, then return. 
    if (filterSpell) {
        data.healingDone = Object.entries(data.spellValues)
            .filter(([key]) => key.includes(filterSpell))
            .reduce((sum, [, value]) => sum + value, 0); 
        
    }
    // return result

    return {cat: sequence.cat, tag: sequence.tag ? sequence.tag : sequence.seq.join(", "), hps: Math.round(data.healingDone / iterations), hpm: Math.round(100*data.healingDone / data.manaSpent)/100, dps: Math.round(data.damageDone / iterations / (data.execTime / iterations)) || "-", spell: spellData, hpct: Math.round(data.healingDone / iterations / (data.execTime / iterations)), advancedReport: {}}
}