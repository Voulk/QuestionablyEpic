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

export const runProfileSpell = (fullSpell, statPercentages, spec, settings, flags = {}) => {
    const throughput = {damage: 0, healing: 0};

    console.log(fullSpell);

    fullSpell.forEach(spell => {
        if (spell.spellType === "heal" || spell.buffType === "heal") {
            throughput.healing += getSpellThroughput(spell, statPercentages, spec, settings, flags = {});
        }
        else if (spell.type === "damage" || spell.buffType === "damage") {
            throughput.damage += getSpellThroughput(spell, statPercentages, spec, settings, flags = {});
        }
    })

    return throughput;
}

export const getSpellThroughput = (spell, statPercentages, spec, settings, flags = {}) => {
    const genericMult = 1;
    let targetCount = 1;

    //const spellpower = statProfile.intellect + statProfile.spellpower;
    let spellCritBonus = (spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0; 
    let adjCritChance = ((spell.secondaries && spell.secondaries.includes("crit")) ? (statPercentages.crit + spellCritBonus) : 1)-1; 
    const critSize = 2; 
    const critMult = ((1-adjCritChance) + adjCritChance * critSize)
        
    let spellOutput = 0;
    if (false && spellName === "Melee") {
        // Melee attacks are a bit special and don't share penalties with our special melee-based spells. 
        spellOutput = (statPercentages.weaponDamageMelee + statPercentages.attackpower / 14 * statPercentages.weaponSwingSpeed)
                        * critMult * genericMult * targetCount;
    }
    else {
        // Most other spells follow a uniform formula.
        const masteryMult = (spell.secondaries.includes("mastery") && !spec.includes("Holy Priest")) ? (1 + statPercentages.mastery) : 1; // We'll handle Holy mastery differently.
        spellOutput = (spell.aura * spell.coeff * statPercentages.intellect) * // Spell "base" healing
                            critMult * // Multiply by secondary stats & any generic multipliers. 
                            masteryMult *
                            genericMult

    }
    

    if (spell.spellType === "heal" || spell.buffType === "heal") {
        spellOutput *= (1 - spell.expectedOverheal)
        targetCount = spell.targets ? spell.targets : 1;
    }
    else if (spell.spellType === "damage" || spell.buffType === "damage") {
        if (spell.damageType === "physical") spellOutput *= 0.7 //getEnemyArmor(statPercentages.armorReduction);
        targetCount = settings.enemyTargets ? Math.min(settings.enemyTargets, (spell.maxTargets || 1)) : (spell.targets ? spell.targets : 1);
    }

    // Handle HoT
    if (spell.spellType === "buff" && (spell.buffType === "heal" || spell.buffType === "damage")) {
        const haste = ('hasteScaling' in spell.tickData && spell.tickData.hasteScaling === false) ? 1 : (statPercentages.haste);

        let tickCount = spell.buffDuration / spell.tickData.tickRate * haste;

        if (spell.tickData.tickOnCast) tickCount += 1;
        if (flags["RampingHoTEffect"]) spellOutput = spellOutput * (1 + flags["RampingHoTEffect"] / 2 * (tickCount + 1));

        spellOutput = spellOutput * tickCount;
    }

    return spellOutput;
}