import { getTrinketValue, getTrinketParam } from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketEffectFormulas"
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery, getEnemyArmor } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { STATCONVERSIONCLASSIC } from "General/Engine/STAT"
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

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
export const runClassicSpell = (spellName, spell, statPercentages, spec, settings) => {

    
    // Seems like a lot to call every spell. Maybe we can put these somewhere else and pass them. 
    const genericMult = 1;
    //const critPercentage = 1 + getCritPercentage(statProfile, spec); // +4% crit
    //const hasteSetting = getSetting(settings, "hasteBuff");
    //const hasteBuff = (hasteSetting.includes("Haste Aura") ? 1.05 : 1)

    //const spellpower = statProfile.intellect + statProfile.spellpower;
    let spellCritBonus = (spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0; 
    const adjCritChance = (spell.secondaries && spell.secondaries.includes("crit")) ? (statPercentages.crit + spellCritBonus) : 1; 
    //const additiveScaling = (spell.additiveScaling || 0) + 1

    // Review how mastery works in the context of additive scaling in MoP.
    //const masteryMult = (spell.secondaries && spell.secondaries.includes("mastery")) ? (additiveScaling + (statProfile.mastery / STATCONVERSIONCLASSIC.MASTERY / 100 + 0.08) * 1.25) / additiveScaling : 1;
    
    // 
    const targetCount = spell.targets ? spell.targets : 1;

    let spellOutput = 0;
    if (spell.weaponScaling) {
        // Some monk spells scale with weapon damage instead of regular spell power. We hate these.
        spellOutput = (statPercentages.weaponDamage + statPercentages.attackpower / 14) * spell.weaponScaling
                        * adjCritChance * genericMult * targetCount * getEnemyArmor(statPercentages.armorReduction);
    }
    else {
        // Most other spells follow a uniform formula.
        spellOutput = (spell.flat + spell.coeff * statPercentages.spellpower) * // Spell "base" healing
                            adjCritChance * // Multiply by secondary stats & any generic multipliers. 
                            (spell.secondaries.includes("mastery") ? statPercentages.mastery : 1) *
                            genericMult *
                            targetCount
    }

    if (spell.type === "heal" || spell.buffType === "heal") spellOutput *= (1 - spell.expectedOverheal)

    // Handle HoT
    if (spell.type === "classic periodic") {
      const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : (statPercentages.haste);
      const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
      let tickCount = Math.round(spell.buffDuration / (adjTickRate));

      // Take care of any HoTs that don't have obvious breakpoints.
      // Examples include Lifebloom where you're always keeping 3 stacks active, or Efflorescence which is so long that breakpoints are irrelevant.
      if (spell.tickData.rolling) spellOutput = spellOutput * (spell.buffDuration / spell.tickData.tickRate * haste);
      else spellOutput = spellOutput * tickCount;
    }

    return spellOutput;
}