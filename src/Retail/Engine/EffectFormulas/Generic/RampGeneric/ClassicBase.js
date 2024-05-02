// Classic sometimes works in different ways to retail. If we can use a retail function then we should, but if we need a classic version then it can be added here.
// If it can be solved with a flag instead (like "No partial tick") then that is preferable to writing a new function.

const GLOBALCONST = {
    rollRNG: true, // Model RNG through chance. Increases the number of iterations required for accuracy but more accurate than other solutions.
    statPoints: {
        crit: 179.279998779296875,
        mastery: 179.279998779296875,
        haste: 128.057006835937500,

        critInt: 648.91,
    },

    baseCrit: {
        "Restoration Druid": 0.018515,
        "Discipline Priest": 0.012375, 
        "Holy Paladin": 0.033355,
        "Holy Priest": 0.012375,
        "Restoration Shaman": 0.02201, 
        "Mistweaver Monk": 1, // Soon :)
    },

    masteryMod: {
        "Restoration Druid": 1.25,
        "Discipline Priest": 1, 
        "Holy Paladin": 1.5,
        "Holy Priest": 1,
        "Restoration Shaman": 1, 
        "Mistweaver Monk": 0, 
    },



}

export const getMastery = (currentStats, spec) => {
    const baseMastery = GLOBALCONST.masteryMod[spec] / 100 * 8; // Every spec owns 8 mastery points baseline
    return 1+(baseMastery + currentStats['mastery'] / GLOBALCONST.statPoints.mastery * GLOBALCONST.masteryMod[spec] / 100)
}

const getSpellFlat = (spell, flatBonus = 0) => {
    return ((spell.flatHeal) || 0 + (spell.flatDamage || 0) + (spell.flat || 0) + flatBonus)
}

/**
 * Get a spells raw damage or healing. This is made up of it's coefficient, our intellect, and any secondary stats it scales with.
 * We'll take care of multipliers like Schism and Sins in another function.
 * @param {object} spell The spell being cast. Spell data is pulled from DiscSpellDB. 
 * @param {object} currentStats A players current stats, including any buffs.
 * @returns The raw damage or healing of the spell.
 */
export const getSpellRaw = (spell, currentStats, spec, flatBonus = 0, masteryFlag = false) => {
    return (getSpellFlat(spell, flatBonus) + spell.coeff * currentStats.spellpower) * getStatMult(currentStats, spell.secondaries, spell.statMods || {}, spec, masteryFlag); // Multiply our spell coefficient by int and secondaries.
}

/**
 * Returns a spells stat multiplier based on which stats it scales with.
 * Haste is included in calculations but isn't usually a raw multiplier since it changes cooldown instead. 
 * @param {*} statArray A characters current stats including any active buffs.
 * @param {*} stats The secondary stats a spell scales with. Pulled from it's SpellDB entry.
 * @returns An effective multiplier. For a spell that scales with both crit and vers this would just be crit x vers.
 */
export const getStatMult = (currentStats, stats, statMods, spec, masteryFlag) => {
    let mult = 1;
    const baseMastery = GLOBALCONST.masteryMod[spec] / 100 * 8; // Every spec owns 8 mastery points baseline
    
    const critChance = GLOBALCONST.baseCrit[spec] + currentStats['crit'] / GLOBALCONST.statPoints.crit / 100 + (statMods['crit'] || 0 );
    const critMult = (currentStats['critMult'] || 2) + (statMods['critEffect'] || 0);
    
    if (stats.includes("haste")) mult *= (1 + currentStats['haste'] / GLOBALCONST.statPoints.haste / 100);
    if (stats.includes("crit")) mult *= ((1-critChance) + critChance * critMult);
    if (stats.includes("mastery") && masteryFlag) mult *= (1+(baseMastery + currentStats['mastery'] / GLOBALCONST.statPoints.mastery * GLOBALCONST.masteryMod[spec] / 100) * 1/*specConstants.masteryEfficiency*/);

    return mult;
}

export const buffSpell = (fullSpell, buffPerc) => {
    fullSpell.forEach(slice => {
        if ('coeff' in slice) slice.coeff *= buffPerc;
        if ('flat' in slice) slice.flat *= buffPerc;
    })
}

export const applyRaidBuffs = (state, stats) => {
    // Crit
    stats.crit += 5 * 179;

    // 5% spell haste
    stats.haste += 5 * 128;



    // 5% base stats - The added intellect also becomes spell power.
    stats.intellect *= 1.05;
    stats.spirit *= 1.05;
    
    // Max mana
    state.manaPool *= 1.06;

    // Armor bonus
    stats.intellect *= 1.05;

    // Mana Spring etc

    // Add Int to spell power.
    stats.spellpower +=  stats.intellect;
    // 10% spell power
    stats.spellpower *= 1.1;

    return stats;

    //console.log(state.currentStats);
}


// Returns MP5.
export const getManaRegen = (currentStats, spec) => {
    const inCombatRegen = {
        "Holy Paladin": 0.8, // 0.5 base + Judgements of the Pure
    }
    return (1171 + currentStats.spirit * Math.sqrt(currentStats.intellect) * 0.016725 * inCombatRegen[spec]);
}

export const getManaPool = (currentStats, spec) => {
    return (24777 + currentStats.intellect * 15) * 1.02;
}



// Returns the equivalent MP5 from external mana effects.
// Innervate currently only works for druid but we could add a setting.
export const getAdditionalManaEffects = (currentStats, spec) => {
    let additionalManaPerSecond = 0;
    const manaSources = {additionalMP5: 0};
    const pool = getManaPool(currentStats, spec);


    const replenishment = pool * 0.01 / 10 * 5; // 1% mana every 10s.
    manaSources["Replenishment"] = replenishment;
    additionalManaPerSecond += replenishment;

    if (spec.includes("Holy Paladin")) {
        // Divine Plea
        additionalManaPerSecond += (pool * 0.12 / 120 * 5);
        manaSources["Divine Plea"] = (pool * 0.12 / 120 * 5);
    }

    manaSources.additionalMP5 = additionalManaPerSecond;

    return manaSources;
}

/**
 * Get our players active stats. This is made up of our base stats + any buffs. 
 * Diminishing returns is not in play in this function.
 * @param {} statArray Our active stats.
 * @param {*} buffs Our active buffs.
 * @returns 
 */
export const getCurrentStats = (statArray, buffs) => {
    const statBuffs = buffs.filter(function (buff) {return buff.buffType === "stats"});
    statBuffs.forEach(buff => {
        statArray[buff.stat] = (statArray[buff.stat] || 0) + buff.value;
    });

    //statArray = applyDiminishingReturns(statArray); // TODO: Update Diminishing Returns

    // Check for percentage stat increases which are applied post-DR.
    // Examples include Power Infusion and the crit portion of Shadow Word: Manipulation.
    const multBuffs = buffs.filter(function (buff) {return buff.buffType === "statsMult"});
    multBuffs.forEach(buff => {
        // Multiplicative Haste buffs need some extra code as they are increased by the amount of haste you already have.
        if (buff.stat === "haste") statArray["haste"] = (((statArray[buff.stat] / GLOBALCONST.statPoints.haste / 100 + 1) * buff.value)-1) * GLOBALCONST.statPoints.haste * 100;
        else statArray[buff.stat] = (statArray[buff.stat] || 0) + buff.value;
    });

    return statArray;
}
