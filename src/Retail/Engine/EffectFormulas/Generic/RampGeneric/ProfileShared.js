import { getTrinketValue, getTrinketParam } from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketEffectFormulas"

export const printHealingBreakdown = (healingBreakdown, totalHealing) => {
    const sortedEntries = Object.entries(healingBreakdown)
                            .sort((a, b) => b[1] - a[1])
                            .map(([key, value]) => `${key}: ${Math.round(value / 60).toLocaleString()} (${((value / totalHealing * 10000) / 100).toFixed(2)}%)`);
    console.log(sortedEntries);
}

export const getSpellAttribute = (spell, attribute, index = 0) => {
    if (attribute === "cooldown") return spell[index].cooldownData.cooldown;
    else return spell[index][attribute];
    
}

export const hasTier = (playerData, tier) => {
    return playerData.tier.includes(tier);
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

export const buildCPM = (spells, spell) => {
    return 60 / getSpellAttribute(spells[spell], "cooldown") * 0.9;
}