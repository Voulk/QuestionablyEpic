import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { STATCONVERSION } from "General/Engine/STAT";

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


// Stat profile is an object containing stats found from all non-talent sources.
// StatBonuses contains percentages instead. 
export const convertStatPercentages = (statProfile, statBonuses, spec, race = "") => {

    const stats = {
        intellect: statProfile.intellect,
        crit: 1.05 + (statProfile.crit / STATCONVERSION.CRIT / 100) + (statBonuses.crit || 0),
        haste: 1 + (statProfile.haste / STATCONVERSION.HASTE / 100) * (statBonuses.haste || 1),
        mastery: (statProfile.mastery / STATCONVERSION.MASTERY / 100 + 0.08) * STATCONVERSION.MASTERYMULT[spec], 
        versatility: 1 + (statProfile.versatility / STATCONVERSION.VERSATILITY / 100) + (statBonuses.versatility || 0),
        genericMult: (statBonuses.genericMult) ? 1 + statBonuses.genericMult : 1,
    }

    //getClassicRaceBonuses(stats, race);
    return stats;
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

export const runProfileSlice = (fullSpell, statPercentages, spec, settings, flags = {}) => {
    const throughput = {damage: 0, healing: 0};

    console.log(fullSpell);


    if (spell.spellType === "heal" || spell.buffType === "heal") {
        throughput.healing += getSpellThroughput(spell, statPercentages, spec, settings, flags = {});
    }
    else if (spell.type === "damage" || spell.buffType === "damage") {
        throughput.damage += getSpellThroughput(spell, statPercentages, spec, settings, flags = {});
    }

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
                            (spell.secondaries.includes("versatility") ? statPercentages.versatility : 1) *
                            genericMult 
        //console.log(critMult, masteryMult, genericMult);
    }
    

    if (spell.spellType === "heal" || spell.buffType === "heal") {
        spellOutput *= (1 - spell.expectedOverheal)
        targetCount = spell.targets ? spell.targets : 1;
        spellOutput *= targetCount;
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
};
export const applyTalents = (state, spellDB, stats) => {
    Object.keys(state.talents).forEach(talentName => {
        const talent = state.talents[talentName];
        if (talent.points > 0 && (!talent.heroTree || state.heroTree === talent.heroTree)) {
            talent.runFunc(state, spellDB, talent.points, stats);
        }
    });
};

export const completeCastProfile = (castProfile, spellDB) => {
    castProfile.forEach(spell => {
        if (spell.efficiency) spell.cpm = buildCPM(spellDB, spell.spell, spell.efficiency)
        spell.castTime = spellDB[spell.spell][0].castTime;
        spell.cost = spellDB[spell.spell][0].cost * (spell.manaOverride ?? 1);
    });
}