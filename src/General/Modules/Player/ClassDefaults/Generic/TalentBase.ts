

 
/**
 * Percentage buff to Spell. If index = -1 then apply to all slices.
 * @param spell The full spell data you want to augment.
 * @param value The percentage increase or decrease you want to apply. Example value: 25.0 for a 25% buff.
 * @param index Optional parameter to specify a specific slice of the spell. You might use this if a talent buffs the HoT of a direct / HoT spell like Regrowth or Riptide.
 */
export const buffSpellPerc = (spell: SpellData[], value: number, index: number = -1) => {
        spell.forEach((slice, i) => {
            if (index === -1 || index === i) {
                slice.coeff = slice.coeff * (1 + (value / 100));
            }
        })
}

/**
 * Increases the chance a specific spell has to crit. If index = -1 then apply to all slices.
 * @param spell The full spell data you want to augment.
 * @param value The crit increase. 75 = 75% increased chance to crit.
 * @param index Optional parameter to specify a specific slice of the spell. You might use this if a talent buffs the HoT of a direct / HoT spell like Regrowth or Riptide.
 */
export const buffSpellCritChance = (spell: SpellData[], value: number, index: number = -1) => {
    spell.forEach((slice, i) => {
        if (index === -1 || index === i) {
            if (!slice.statMods) slice.statMods = {};
            if (!('crit' in slice.statMods)) slice.statMods.crit = 0;
            slice.statMods.crit += value / 100;
        }
    })
}

/**
 * Increases how much the specific spell crits for. If index = -1 then apply to all slices.
 * @param spell The full spell data you want to augment.
 * @param value Integer. The additive percent increase in your crit multiplier. 75 = spells will crit for 275 instead of 200.
 *              You do not need to provide the initial 200 here, nor do you need to take into account any other crit multipliers you might have for the spell or in general.
 * @param index Optional parameter to specify a specific slice of the spell. You might use this if a talent buffs the HoT of a direct / HoT spell like Regrowth or Riptide.
 */
export const buffSpellCritMult = (spell: SpellData[], value: number, index: number = -1) => {
    spell.forEach((slice, i) => {
        if (index === -1 || index === i) {
            if (!slice.statMods) slice.statMods = {};
            if (!('critMult' in slice.statMods)) slice.statMods.critMult = 0;
            slice.statMods.critMult += value / 100;
        }
    })

}


/**
 * Permanently reduces mana cost on a spell.
 * @spell The spell to adjust. Since cost is always stored in the first slice, we will not need to adjust all.
 * @value A (usually) negative integer. -15 is a 15% reduction in cost. Do not edit the talent value before it is passed.
 */ 
export const manaCostAdj = (spell: SpellData[], value: number) => {
    spell[0].cost = spell[0].cost * (1 + (value / 100));
}


/**
 * Permanently adjust the cooldown on a spell by a percentage.
 * @param spell The spell to adjust. Since cooldown is always stored in the first slice, we will not need to adjust all.
 * @param value An integer representing the percentage to reduce the cooldown by. Data will be positive if the cooldown is to be reduced.
 */
export const cooldownAdjPerc = (spell: SpellData[], value: number) => {
    if (spell[0].cooldownData) {
        spell[0].cooldownData.cooldown *= (1 - value / 100); // Almost always a negative value.
    }
}

/**
 * Permanently adjust the cooldown on a spell by a percentage.
 * @param spell The spell to adjust. Since cooldown is always stored in the first slice, we will not need to adjust all.
 * @param value An integer representing the percentage to reduce the cooldown by. Value will be positive if the cooldown is to be reduced.
 */
export const cooldownAdjFlat = (spell: SpellData[], value: number) => {
    if (spell[0].cooldownData) {
        spell[0].cooldownData.cooldown += value / 1000; // Almost always a negative value.
    }
}


/**
 * Permanently adjust the cooldown on a spell by a percentage.
 * @param spell The spell to adjust. Since cooldown is always stored in the first slice, we will not need to adjust all.
 * @param value An integer representing the flat amount to reduce the cooldown by. Value will be negative and in ms.
 */
export const modCastTimeFlat = (spell: SpellData[], value: number) => {
    spell[0].castTime += (value / 1000);
}

/**
 * Permanently adjust the cooldown on a spell by a percentage.
 * @param spell The spell to adjust. Since cooldown is always stored in the first slice, we will not need to adjust all.
 * @param value An integer representing the percentage to reduce the cooldown by. Value will be negative.
 */
export const modCastTimePerc = (spell: SpellData[], value: number) => {
    spell[0].castTime *= (1 + (value / 100));
}

// A talent that just adds stats. 
// Examples: 
// - Seal of Might adds intellect and mastery
// - Lycara's Gift adds haste
// Be careful with Mastery talents since their tooltips often lie and refer to base mastery points, not sheet mastery. 
export const addStatPerc = (statBonuses: any, stat: string, value: number) => {
    if (statBonuses[stat]) statBonuses[stat] += value;
    else statBonuses[stat] = value;
}

/**
 * 
 * @param spell Spell to increase buff duration of.
 * @param value The amount of duration to add to the buff. A negative value is also acceptable. Provided in ms.
 * @param index Specify a specific slice of the spell to edit. If not provided, we will apply it to all slices with a buff duration
 *              though it is rare for there to be more than one.
 */
export const adjBuffDurationFlat = (spell: SpellData[], value: number, index: number = -1) => {
    spell.forEach((slice, i) => {
        if (index === -1 || index === i) {
            if (slice.spellType === "buff" && slice.buffDuration) slice.buffDuration += value / 1000;
        }
    })

}