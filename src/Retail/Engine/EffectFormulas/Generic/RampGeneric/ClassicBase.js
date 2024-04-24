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
        "Holy Paladin": 1,
        "Holy Priest": 1,
        "Restoration Shaman": 1, 
        "Mistweaver Monk": 0, 
    },



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

    const critChance = /*specConstants.baseCrit*/ 0 + currentStats['crit'] / GLOBALCONST.statPoints.crit / 100 + (statMods['crit'] || 0 );
    const critMult = (currentStats['critMult'] || 2) + (statMods['critEffect'] || 0);
    
    if (stats.includes("haste")) mult *= (1 + currentStats['haste'] / GLOBALCONST.statPoints.haste / 100);
    if (stats.includes("crit")) mult *= ((1-critChance) + critChance * critMult);
    if (stats.includes("mastery") && masteryFlag) mult *= (1+(baseMastery + currentStats['mastery'] / GLOBALCONST.statPoints.mastery * GLOBALCONST.masteryMod[spec] / 100) * 1/*specConstants.masteryEfficiency*/);

    return mult;
}

export const buffSpell = (fullSpell, buffPerc) => {
    fullSpell.forEach(slice => {
        if ('coeff' in slice) slice.coeff *= buffPerc;
    })
}

export const applyRaidBuffs = (state) => {
    // Crit
    state.currentStats.crit += 5 * 179;

    // 5% spell haste
    state.currentStats.haste += 5 * 128;

    // 10% spell power
    state.currentStats.spellPower *= 1.1;

    // 5% base stats - The added intellect also becomes spell power.
    state.currentStats.intellect *= 1.05;
    state.currentStats.spirit *= 1.05;
    
    // Max mana
    state.manaPool *= 1.06;

    // Mana Spring etc

}
