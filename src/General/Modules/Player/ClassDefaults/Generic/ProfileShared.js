import { getTrinketValue, getTrinketParam } from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketEffectFormulas"
import { getCritPercentage, getManaPool, getManaRegen, getAdditionalManaEffects, getMastery, getEnemyArmor } from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import { getHaste } from "General/Modules/Player/ClassDefaults/Generic/RampBase";
import { STATCONVERSIONCLASSIC } from "General/Engine/STAT"
import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";

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

export const checkHasTalent = (talents, talentName) => {
    return talents[talentName] && talents[talentName].points > 0;
}

export const getSpellAttribute = (spell, attribute, index = 0) => {
    if (attribute === "cooldown") return spell[index].cooldownData.cooldown;
    else return spell[index][attribute];
    
}

export const hasTier = (playerData, tier) => {
    return playerData.tier.includes(tier);
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

// Returns the players current haste percentage. 
export const getHasteClassic = (stats, hasteBuff = 1.05) => {
    return (1 + stats.haste / 425 / 100) * hasteBuff;
}

export const convertStatPercentages = (statProfile, hasteBuff, spec, race = "") => {
    const isTwoHander = statProfile.weaponSwingSpeed > 2.8;

    const stats = {
        spellpower: statProfile.intellect + statProfile.spellpower - 10, // The first 10 intellect points don't convert to spellpower.
        crit: 1 + getCritPercentage(statProfile, spec),
        haste: getHasteClassic({statProfile, haste: statProfile.haste}, hasteBuff),
        mastery: (statProfile.mastery / STATCONVERSIONCLASSIC.MASTERY / 100 + 0.08) * 1.25, // 1.25 is Monks mastery coefficient.
        spirit: (statProfile.spirit),
        weaponDamage: statProfile.averageDamage / statProfile.weaponSwingSpeed * (isTwoHander ? 0.5 : (0.898882 * 0.75)),
        weaponDamageMelee: statProfile.averageDamage / statProfile.weaponSwingSpeed * (isTwoHander ? 1 : 1),
        weaponSwingSpeed: statProfile.weaponSwingSpeed,
        attackpower: (statProfile.intellect + statProfile.spellpower - 10) * 2,
        armorReduction: 0.7,
    }

    getClassicRaceBonuses(stats, race);
    return stats;
}

const getClassicRaceBonuses = (statPerc, race) => {
    if (race === "Pandaren") {
        // Handled before raid buffs.
    }
    else if (race === "Worgen") {
        statPerc.crit += 0.01; // 1% crit
    }
    else if (race === "Orc") {
        // We probably rework this eventually to be 
        statPerc.spellpower += (282 * 1.1);
        statPerc.attackpower += (282 * 1.1 * 2);
    }
    else if (race === "Human") {
        statPerc.spirit *= 1.03; // 3% spirit
    }
}


// Classic
export const runClassicSpell = (spellName, spell, statPercentages, spec, settings) => {

    const genericMult = 1;
    let targetCount = 1;

    //const spellpower = statProfile.intellect + statProfile.spellpower;
    let spellCritBonus = (spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0; 
    let adjCritChance = (spell.secondaries && spell.secondaries.includes("crit")) ? (statPercentages.crit + spellCritBonus) : 1; 
    //const additiveScaling = (spell.additiveScaling || 0) + 1
    if (spec.includes("Discipline Priest")) adjCritChance = 1; // We'll handle Disc crits separately since they are a nightmare.
     
    

    let spellOutput = 0;
    if (spellName === "Melee") {
        // Melee attacks are a bit special and don't share penalties with our special melee-based spells. 
        spellOutput = (statPercentages.weaponDamageMelee + statPercentages.attackpower / 14 * statPercentages.weaponSwingSpeed)
                        * adjCritChance * genericMult * targetCount;
    }
    else if (spell.weaponScaling) {
        // Some monk spells scale with weapon damage instead of regular spell power. We hate these.
        
        spellOutput = (statPercentages.weaponDamage + statPercentages.attackpower / 14) * spell.weaponScaling
                        * adjCritChance * genericMult * targetCount;
    }
    else {
        // Most other spells follow a uniform formula.
        const masteryMult = (spell.secondaries.includes("mastery") && !spec.includes("Holy Priest") && !(spec.includes("Holy Paladin"))) ? (1 + statPercentages.mastery) : 1; // We'll handle Holy mastery differently.
        spellOutput = (spell.flat + spell.coeff * statPercentages.spellpower) * // Spell "base" healing
                            adjCritChance * // Multiply by secondary stats & any generic multipliers. 
                            masteryMult *
                            genericMult *
                            targetCount
    }

    if (spell.type === "heal" || spell.buffType === "heal") {
        spellOutput *= (1 - spell.expectedOverheal)
        targetCount = spell.targets ? spell.targets : 1;
    }
    else if (spell.type === "damage" || spell.buffType === "damage") {
        if (spell.damageType === "physical") spellOutput *= getEnemyArmor(statPercentages.armorReduction);
        
        targetCount = settings.enemyTargets ? Math.min(settings.enemyTargets, (spell.maxTargets || 1)) : (spell.targets ? spell.targets : 1);
    }

    
    spellOutput *= targetCount;

    // Handle HoT
    if (spell.type === "classic periodic") {
      const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : (statPercentages.haste);
      const adjTickRate = Math.ceil((spell.tickData.tickRate / haste - 0.0005) * 1000)/1000;
      let tickCount = Math.round(spell.buffDuration / (adjTickRate));

      if (spell.tickData.tickOnCast) tickCount += 1;
      
      // Take care of any HoTs that don't have obvious breakpoints.
      // Examples include Lifebloom where you're always keeping 3 stacks active, or Efflorescence which is so long that breakpoints are irrelevant.
      if (spell.tickData.rolling) spellOutput = spellOutput * (spell.buffDuration / spell.tickData.tickRate * haste);
      else spellOutput = spellOutput * tickCount;
    }

    return spellOutput;
}