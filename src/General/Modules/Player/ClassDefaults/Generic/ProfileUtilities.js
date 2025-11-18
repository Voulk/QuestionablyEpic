export const printHealingBreakdownWithCPM = (healingBreakdown, totalHealing, castProfile) => {
        const sortedEntries = Object.entries(healingBreakdown)
                            .sort((a, b) => b[1] - a[1])
                            .map(([key, value]) => `${key}: ${Math.round(value / 60).toLocaleString()} (${((value / totalHealing * 10000) / 100).toFixed(2)}%) - CPM: ${castProfile.reduce((acc, spell) => acc + ((spell.cpm && spell.spell === key) ? spell.cpm : 0), 0)}`);
    console.log(sortedEntries);
}

export const printHealingBreakdown = (healingBreakdown, totalHealing) => {
    const sortedEntries = Object.entries(healingBreakdown)
                            .sort((a, b) => b[1] - a[1])
                            .map(([key, value]) => `${key}: ${Math.round(value / 60).toLocaleString()} (${((value / totalHealing * 10000) / 100).toFixed(2)}%)`);
    console.log(sortedEntries);
}
export const updateSpellCPM = (spellProfile, updatedCD) => {
    //getSpellEntry(castProfile, "Circle of Healing").cpm = 60 / adjustedCoHCD * getSpellEntry(castProfile, "Circle of Healing").efficiency;
    spellProfile.cpm = 60 / updatedCD * spellProfile.efficiency;
}

export const checkHasTalent = (talents, talentName) => {
    return talents[talentName] && talents[talentName].points > 0;
}

export const getSpellAttribute = (spell, attribute, index = 0) => {
    if (attribute === "cooldown") return spell[index].cooldownData.cooldown;
    else return spell[index][attribute];
    
}


export const getTimeUsed = (castProfile, spellDB, averageHaste) => {
    let timeUsed = 0;
    castProfile.forEach(spellProfile => {
        const spell = spellDB[spellProfile.spell][0];
        let castTime = (spell.castTime / averageHaste) || 0;

        if (spell.customGCD) castTime = spell.customGCD;
        if (castTime === 0 && !spell.offGCD) castTime = 1.5 / averageHaste;
        timeUsed += castTime * spellProfile.cpm;
    }
    )

    return timeUsed;
}

// Returns duration and effective value on a trinket
export const getTrinketData = (trinketName, itemLevel) => {
    return {value: getTrinketValue(trinketName, itemLevel), duration: getTrinketParam(trinketName, "duration")};
}

export const getCPM = (profile, spellName) => {
    const filterSpell = profile.filter(spell => spell.spell === spellName)
    let cpm = 0;
    for (let i = 0; i < filterSpell.length; i++) cpm += filterSpell[i].cpm || 0;

    return cpm;
}

export const getSpellEntry = (profile, spellName, index = 0) => {
    return profile.filter(spell => spell.spell === spellName)[index]
}

export const buildCPM = (spells, spell, efficiency = 0.9) => {
    return 60 / getSpellAttribute(spells[spell], "cooldown") * efficiency;
}