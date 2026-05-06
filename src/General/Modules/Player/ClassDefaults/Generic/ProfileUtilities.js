import { getSetting } from "Retail/Engine/EffectFormulas/EffectUtilities";
import { STATCONVERSION, BASEMANA } from "General/Engine/STAT";
import { getTargetScript } from "General/Modules/Player/ClassDefaults/Generic/TargetScripts"

export const printHealingBreakdownWithCPM = (healingBreakdown, totalHealing, castProfile) => {
    const sortedEntries = Object.entries(healingBreakdown)
                            .sort((a, b) => b[1] - a[1])
                            .map(([key, value]) => `${key}: ${Math.round(value / 60).toLocaleString()} (${((value / totalHealing * 10000) / 100).toFixed(2)}%) - CPM: ${Math.round(100*castProfile.reduce((acc, spell) => acc + ((spell.cpm && (spell.label ? spell.label === key : spell.spell === key)) ? spell.cpm : 0), 0))/100}`);
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

export const applyRaidBuffs = (settings) => {
    const statBonuses = {};
    // Arcane Int
    statBonuses.intellect = 0.03

    // Phys damage

    // Mastery
    statBonuses.mastery = 0.02

    // Versatility
    //statBonuses.versatility = 0.03

    // Vantus?

    return statBonuses;
}

export const getTimeUsed = (castProfile, spellDB, averageHaste) => {
    let timeUsed = 0;
    castProfile.forEach(spellProfile => {
        const spell = spellDB[spellProfile.spell][0];
        let castTime = (spell.castTime / averageHaste) || 0;

        if (spell.customGCD) castTime = spell.customGCD;
        if (castTime === 0 && !spell.offGCD) castTime = 1.5 / averageHaste;
        if (spellProfile.castTimeOverride !== undefined) castTime = spellProfile.castTimeOverride;
        if (spellProfile.autoSpell) castTime = 0;
        const spellTimeAllocation = castTime * spellProfile.cpm;
        /*console.log(`Spell: ${spellProfile.spell}, Cast Time: ${castTime.toFixed(2)}, CPM: ${spellProfile.cpm.toFixed(2)}, 
                    Time Allocation: ${spellTimeAllocation.toFixed(2)},`)*/
        timeUsed += spellTimeAllocation;
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
    if (filterSpell.length === 0) return 0;

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

export const getSpellCritChance = (spell, statPercentages) => {
    return statPercentages.crit + (spell.statMods?.crit || 0) - 1
}


// Stat profile is an object containing stats found from all non-talent sources.
// StatBonuses contains percentages instead. 
export const convertStatPercentages = (statProfile, statBonuses, spec, masteryEffectiveness, race = "") => {

    const stats = {
        intellect: statProfile.intellect * (1 + (statBonuses.intellect || 0)),
        crit: 1.05 + (statProfile.crit / STATCONVERSION.CRIT / 100) + (statBonuses.crit || 0),
        haste: (1 + statProfile.haste / STATCONVERSION.HASTE / 100) * (1 + (statBonuses.haste || 0)),
        mastery: (statProfile.mastery / STATCONVERSION.MASTERY / 100 + 0.08 + (statBonuses.mastery || 0)) * STATCONVERSION.MASTERYMULT[spec] * masteryEffectiveness,
        versatility: 1 + (statProfile.versatility / STATCONVERSION.VERSATILITY / 100) + (statBonuses.versatility || 0),
        critMult: Math.max(statProfile.critMult || 2, 2) + (statBonuses.critMult || 0),
        genericHealingMult: (statBonuses.genericHealingMult) ? 1 + statBonuses.genericHealingMult : 1,
        genericDamageMult: (statBonuses.genericDamageMult) ? 1 + statBonuses.genericDamageMult : 1,
        leech: (statProfile.leech / STATCONVERSION.LEECH / 100) + (statBonuses.leech || 0),
    }

    //getClassicRaceBonuses(stats, race);
    return stats;
}

export const runProfileSpell = (fullSpell, statPercentages, spec, settings, flags = {}) => {
    const throughput = {damage: 0, healing: 0};

    fullSpell.forEach(spell => {
        if (spell.spellType === "heal" || spell.buffType === "heal") {
            throughput.healing += getSpellThroughput(spell, statPercentages, spec, settings, flags = {});
        }
        else if (spell.spellType === "damage" || spell.buffType === "damage") {
            console.log("Adding damage spell");
            throughput.damage += getSpellThroughput(spell, statPercentages, spec, settings, flags = {});
            console.log(throughput);
        }
    })
    //console.log(throughput);
    return throughput;
}

export const runProfileSlice = (fullSpell, statPercentages, spec, settings, flags = {}) => {
    const throughput = {damage: 0, healing: 0};

    //console.log(fullSpell);


    if (spell.spellType === "heal" || spell.buffType === "heal") {
        throughput.healing += getSpellThroughput(spell, statPercentages, spec, settings, flags = {});
    }
    else if (spell.type === "damage" || spell.buffType === "damage") {
        throughput.damage += getSpellThroughput(spell, statPercentages, spec, settings, flags = {});
    }

    return throughput;
}

export const getSpellThroughput = (spell, statPercentages, spec, settings, flags = {}) => {
    let targetCount = 1;

    //const spellpower = statProfile.intellect + statProfile.spellpower;
    let spellCritBonus = (spell.statMods && spell.statMods.crit) ? spell.statMods.crit : 0; 
    let adjCritChance = Math.min(((spell.secondaries && spell.secondaries.includes("crit")) ? (statPercentages.crit + spellCritBonus) : 1)-1, 1); 
    const critSize = (spell.statMods && spell.statMods.critMult) ? spell.statMods.critMult + statPercentages.critMult : statPercentages.critMult;
    const critMult = ((1-adjCritChance) + adjCritChance * critSize)
        
    let spellOutput = 0;
    if (false && spellName === "Melee") {
        // Melee attacks are a bit special and don't share penalties with our special melee-based spells. 
        spellOutput = (statPercentages.weaponDamageMelee + statPercentages.attackpower / 14 * statPercentages.weaponSwingSpeed)
                        * critMult * genericMult * targetCount;
    }
    else {
        // Most other spells follow a uniform formula.
        const masterySize = 1 + (statPercentages.mastery) * (spell.statMods && spell.statMods.masteryMult ? spell.statMods.masteryMult + 1 : 1);
        const masteryMult = (spell.secondaries.includes("mastery") && !spec.includes("Holy Priest")) ? masterySize : 1; // We'll handle Holy mastery differently.
        spellOutput = (spell.aura * spell.coeff * statPercentages.intellect) * 
                            critMult * // Multiply by secondary stats & any generic multipliers. 
                            masteryMult *
                            (spell.secondaries.includes("versatility") ? statPercentages.versatility : 1)
        if (spell.displayInfo && spell.displayInfo.spellName) console.log(`${spell.displayInfo.spellName} Base Output: ${spellOutput.toFixed(2)}, Crit Mult: ${critMult.toFixed(2)}, Vers Mult: ${spell.secondaries.includes("versatility") ? statPercentages.versatility.toFixed(2) : 1}, Mastery Mult: ${masteryMult.toFixed(2)}`);
    }
    

    if (spell.spellType === "heal" || spell.buffType === "heal") {
        spellOutput *= (spell.specialFields?.absorb ? 1 : statPercentages.genericHealingMult);
        spellOutput *= (flags['overrideOverhealing'] ? (1 - flags['overrideOverhealing']) : (1 - spell.expectedOverheal));

        if (spell.targetScript) {
            targetCount = getTargetScript(spell.targetScript, spell.targets, spell.specialFields)
        }
        else {
            targetCount = spell.targets ? spell.targets : 1;
        }

        spellOutput *= targetCount;
        
    }
    else if (spell.spellType === "damage" || spell.buffType === "damage") {
        spellOutput *= statPercentages.genericDamageMult;
        if (spell.damageType === "physical") spellOutput *= 0.7 //getEnemyArmor(statPercentages.armorReduction);
        targetCount = settings.enemyTargets ? Math.min(settings.enemyTargets, (spell.maxTargets || 1)) : (spell.targets ? spell.targets : 1);

        console.log(targetCount, statPercentages.genericDamageMult);
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

// (state: any, spellDB: SpellDB, talentValues: number[], points: number)
export const applyTalents = (state, spellDB) => {
    Object.keys(state.talents).forEach(talentName => {
        const talent = state.talents[talentName];
        if (talent.points > 0 && (!talent.heroTree || state.heroTree === talent.heroTree)) {
            talent.runFunc(state, spellDB, talent.values, talent.points);
        }
    });
};

export const completeCastProfile = (castProfile, spellDB, statPercentages) => {
    castProfile.forEach(spell => {
        if (spell.efficiency) spell.cpm = buildCPM(spellDB, spell.spell, spell.efficiency)
        spell.castTime = spellDB[spell.spell][0].castTime;
        //spell.cost = spellDB[spell.spell][0].cost * (spell.manaOverride ?? 1) * BASEMANA / 100;
        if (spell.hastedCPM) spell.cpm = spell.cpm * statPercentages.haste;
    });
}