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

export const buildCPM = (spells, spell, efficiency = 0.9) => {
    return 60 / getSpellAttribute(spells[spell], "cooldown") * efficiency;
}


// Classic
export const runClassicSpell = (spellName, spell, statProfile) => {

    const genericMult = 1 * (spellProfile.bonus ? spellProfile.bonus : 1);
    let spellCritBonus = (spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0; 
    const adjCritChance = (spell.secondaries && spell.secondaries.includes("crit")) ? (critPercentage + spellCritBonus) : 1; 
    const additiveScaling = (spell.additiveScaling || 0) + 1

    // Review how mastery works in the context of additive scaling in MoP.
    const masteryMult = (spell.secondaries && spell.secondaries.includes("mastery")) ? (additiveScaling + (statProfile.mastery / STATCONVERSIONCLASSIC.MASTERY / 100 + 0.08) * 1.25) / additiveScaling : 1;
    
    // 
    let spellHealing = (spell.flat + spell.coeff * spellpower) * // Spell "base" healing
                        adjCritChance * // Multiply by secondary stats & any generic multipliers. 
                        masteryMult *
                        genericMult;
    
    // Handle HoT
    if (spell.type === "classic periodic") {
      const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : (getHaste(statProfile, "Classic") * hasteBuff);
      const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
      const targetCount = spell.targets ? spell.targets : 1;
      let tickCount = Math.round(spell.buffDuration / (adjTickRate));

      if (spellProfile.spell === "Rolling Lifebloom") spellHealing = spellHealing * (spell.buffDuration / spell.tickData.tickRate * haste);
      else spellHealing = spellHealing * tickCount * targetCount;
    }

    return spellHealing;
}