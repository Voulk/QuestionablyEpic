// Classic sometimes works in different ways to retail. If we can use a retail function then we should, but if we need a classic version then it can be added here.
// If it can be solved with a flag instead (like "No partial tick") then that is preferable to writing a new function.

import { STATCONVERSIONCLASSIC } from "General/Engine/STAT";


// Since we've moved these to STAT we can probably start folding references back and delete this part of the file.
const GLOBALCONST = {
    rollRNG: true, // Model RNG through chance. Increases the number of iterations required for accuracy but more accurate than other solutions.
    statPoints: {
        crit: STATCONVERSIONCLASSIC.CRIT,
        mastery: STATCONVERSIONCLASSIC.MASTERY, 
        haste: STATCONVERSIONCLASSIC.HASTE,
        critInt: STATCONVERSIONCLASSIC.INTCRIT,
    },

    baseCrit: {
        "Restoration Druid": 0.018515,
        "Discipline Priest": 0.012375, 
        "Holy Paladin": 0.033355,
        "Holy Priest": 0.012375,
        "Restoration Shaman": 0.02201, 
        "Mistweaver Monk": 0, // Soon :)
    },

    masteryMod: {
        "Restoration Druid": STATCONVERSIONCLASSIC.MASTERYMULT["Restoration Druid"],
        "Discipline Priest": STATCONVERSIONCLASSIC.MASTERYMULT["Discipline Priest"],
        "Holy Paladin": STATCONVERSIONCLASSIC.MASTERYMULT["Holy Paladin"],
        "Holy Priest": STATCONVERSIONCLASSIC.MASTERYMULT["Holy Priest"],
        "Restoration Shaman": STATCONVERSIONCLASSIC.MASTERYMULT["Restoration Shaman"],
        "Mistweaver Monk":STATCONVERSIONCLASSIC.MASTERYMULT["Mistweaver Monk"],
    },

    baseMana: { // This doesn't vary by spec anymore. It could be merged into one value.
        "Holy Paladin": 60000,
        "Restoration Druid": 300000,
        "Discipline Priest": 300000,
        "Holy Priest": 300000,
        "Restoration Shaman": 60000,
        "Mistweaver Monk": 300000,
    }

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

export const getWeaponScaling = (spell, currentStats, spec) => {
    /*
    2 handers: ((WeaponDamMin + WeaponDamMax) / 2 / WeaponBaseSpeed * 0.5 + AttackPower / 14) * 3
    1 handers: WepAvgDPS to = (WeaponDamMin + WeaponDamMax) / 2 / Weapon Swing. WepAvgDPS * 0.898882 + AttackPower / 14) * 6

    To make this easy, we will calculate the weapon portion before we run the sim since it is a constant and doesn't scale with 
    */
    const isTwoHander = currentStats.isTwohanded ?? false;; // 2.8 is the default speed for a two-handed weapon.
    const adjWeaponDamage = currentStats.averageDamage / currentStats.weaponSwingSpeed * (isTwoHander ? 0.5 : (0.898882 * 0.75));

    const damage = (adjWeaponDamage + currentStats.attackPower / 14) * spell.weaponScaling;

    return damage * getStatMult(currentStats, spell.secondaries, spell.statMods || {}, spec, false);
}

export const getEnemyArmor = (armorReductions = 1) => {
    let enemyArmor = 24835;
    const playerLevel = 90;

    const netArmor = 0.88 * armorReductions * enemyArmor;

    return (1-netArmor/(netArmor+(playerLevel*4037.5-317117.5)));
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
    const critChance = getCritPercentage(currentStats, spec) + (statMods['crit'] || 0 );
    const critMult = (currentStats['critMult'] || 2) + (statMods['critEffect'] || 0);

    if (stats.includes("haste")) mult *= (1 + currentStats['haste'] / GLOBALCONST.statPoints.haste / 100);
    if (stats.includes("crit")) mult *= ((1-critChance) + critChance * critMult);
    if (stats.includes("mastery") && masteryFlag) mult *= (1+(baseMastery + currentStats['mastery'] / GLOBALCONST.statPoints.mastery * GLOBALCONST.masteryMod[spec] / 100) * 1/*specConstants.masteryEfficiency*/);

    return mult;
}

export const buffSpell = (fullSpell, buffPerc, type = "additive") => {
    if (type === "multi") fullSpell[0].multScaling = fullSpell[0].multScaling * buffPerc;
    else fullSpell[0].additiveScaling = (fullSpell[0].additiveScaling || 0) + buffPerc;
    /*
    else {
        fullSpell.forEach(slice => {
            if ('coeff' in slice) slice.coeff *= buffPerc;
            if ('flat' in slice) slice.flat *= buffPerc;
        })
    }*/

}

export const applyRaidBuffs = (state, stats) => {
    // Crit
    stats.crit += 5 * GLOBALCONST.statPoints.crit;

    // 5% spell haste
    // Haste is multiplicative so we'll just handle it in the profiles themselves.

    // 5% base stats - The added intellect also becomes spell power.
    stats.intellect *= 1.05;

    // Armor-type bonus (all leather etc).
    stats.intellect *= 1.05;

    // Mana Spring etc

    // 3k mastery
    stats.mastery += 3000;

    // Add Int to spell power.
    //stats.spellpower +=  stats.intellect;
    // 10% spell power
    stats.spellpower *= 1.1;

    return stats;

}

export const getCritPercentage = (currentStats, spec) => {
    return (GLOBALCONST.baseCrit[spec] + currentStats['crit'] / GLOBALCONST.statPoints.crit / 100) +
                        (currentStats['intellect'] / GLOBALCONST.statPoints.critInt / 100);
}

// Returns MP5.
export const getManaRegen = (currentStats, spec) => {
    const spiritToMP5 = currentStats.spirit * 1.128;

    const inCombatRegen = {
        "Holy Paladin": 0.5, // 0.5 base + Judgements of the Pure
        "Restoration Druid": 0.5,
        "Discipline Priest": 0.5,
        "Holy Priest": 0.5,
        "Restoration Shaman": 0.5,
        "Mistweaver Monk": 0.5
    }
    return (spiritToMP5 * inCombatRegen[spec]);
}

export const getManaPool = (currentStats, spec) => {
    return 300000;
    if (spec.includes("Restoration Druid")) return (GLOBALCONST.baseMana[spec] + currentStats.intellect * 15) * 1.02; 
    else {
        const baseManaPool = (GLOBALCONST.baseMana[spec] - 280 + currentStats.intellect * 15) * 1.02; // Includes meta gem
        return baseManaPool;
    }


    // Right now we're handling things like Furor outside of this function. 
    /*
    if (spec.includes("Restoration Druid")) return (baseManaPool) * 1.02; // Meta + Furor 18635 - 280
    else return (baseManaPool) * 1.02;*/
}



// Returns the equivalent MP5 from external mana effects.
// Innervate currently only works for druid but we could add a setting.

// Not updated for MoP yet.
export const getAdditionalManaEffects = (currentStats, spec, playerRace = "") => {
    const baseMana = GLOBALCONST.baseMana[spec];
    let additionalManaPerSecond = 6000; //baseMana * 0.05;
    
    const manaSources = {additionalMP5: 0};
    const pool = getManaPool(currentStats, spec);

    manaSources["Base Regen"] = additionalManaPerSecond;

    /*const replenishment = pool * 0.01 / 10 * 5; // 1% mana every 10s.
    manaSources["Replenishment"] = replenishment;
    additionalManaPerSecond += replenishment; */

    // Potion of Focus is 45k but stuns you for 10s.
    manaSources["Mana Potion"] = 30000 / 420 * 5;
    additionalManaPerSecond += manaSources["Mana Potion"];

    if (spec.includes("Holy Paladin")) {
        // Divine Plea
        additionalManaPerSecond += (1.35 * currentStats.spirit * 3 / 120 * 5);
        manaSources["Divine Plea"] = (1.35 * currentStats.spirit * 3 / 120 * 5);

        // Seal of Insight
        manaSources["Seal of Insight"] = (3600 * 8 / 60 * 5); // 8ppm
        additionalManaPerSecond += manaSources["Seal of Insight"]; 

        // Seal of Insight
        manaSources["Glyph of Lay on Hands"] = (pool * 0.1 / 360 * 5);
        //additionalManaPerSecond += manaSources["Seal of Insight"]; 
        
    }
    else if (spec.includes("Restoration Druid")) {
        // Innervate
        const innervate = currentStats.spirit * 0.5 * 10 / 180 * 5;
        additionalManaPerSecond += (innervate);
        manaSources["Innervate"] = (innervate);

    }
    else if (spec.includes("Discipline Priest")) {
    }

    else if (spec.includes("Restoration Shaman")) {
        const manaTideMana = currentStats.spirit * 1.128 * 2 * (16/5) * 5 / 180; // Formula is left in its full form for clarity.
        manaSources["Mana Tide Totem"] = manaTideMana;
        additionalManaPerSecond += manaTideMana;

        const waterShieldMana = 2138 / 5; // TODO
        manaSources["Water Shield"] = waterShieldMana;
        additionalManaPerSecond += waterShieldMana;
    }

    if (playerRace === "Blood Elf") {
        // Arcane Torrent
        const arcaneTorrent = (baseMana * 0.02 / 120 * 5);
        additionalManaPerSecond += arcaneTorrent;
        manaSources["Arcane Torrent"] = arcaneTorrent;
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
