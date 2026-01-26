

 
/**
 * Percentage buff to Spell. If index = -1 then apply to all slices.
 * @param spell The full spell data you want to augment.
 * @param value The percentage increase or decrease you want to apply. Example value: 25.0 for a 25% buff.
 * @param index Optional parameter to specify a specific slice of the spell. You might use this if a talent buffs the HoT of a direct / HoT spell like Regrowth or Riptide.
 */
const buffSpellPerc = (spell: SpellData[], value: number, index: number = -1) => {
        spell.forEach((slice, i) => {
            if (index === -1 || index === i) {
                slice.coeff = slice.coeff * (1 + (value / 100));
            }
        })
}

/**
 * Increases the chance a specific spell has to crit. If index = -1 then apply to all slices.
 * @param spell The full spell data you want to augment.
 * @param value The crit increase
 * @param index Optional parameter to specify a specific slice of the spell. You might use this if a talent buffs the HoT of a direct / HoT spell like Regrowth or Riptide.
 */
const buffSpellCritChance = (spell: SpellData[], value: number, index: number = -1) => {
    spell.forEach((slice, i) => {
        if (index === -1 || index === i) {
            if (!slice.statMods || !('crit' in slice.statMods)) slice.statMods = {'crit': 0};
            slice.statMods.crit += value / 100;
        }
    })
}


/**
 * Permanently reduces mana cost on a spell.
 * @spell The spell to adjust. Since cost is always stored in the first slice, we will not need to adjust all.
 * @value A (usually) negative integer. -15 is a 15% reduction in cost. Do not edit the talent value before it is passed.
 */ 
const manaCostAdj = (spell: SpellData[], value: number) => {
    spell[0].cost = spell[0].cost * (1 + (value / 100));
}


/**
 * Permanently adjust the cooldown on a spell by a percentage.
 * @param spell The spell to adjust. Since cooldown is always stored in the first slice, we will not need to adjust all.
 * @param value An integer representing the percentage to reduce the cooldown by. Data will be positive if the cooldown is to be reduced.
 */
const cooldownAdjPerc = (spell: SpellData[], value: number) => {
    if (spell[0].cooldownData) {
        spell[0].cooldownData.cooldown *= (1 - value / 100); // Almost always a negative value.
    }
}

/**
 * Permanently adjust the cooldown on a spell by a percentage.
 * @param spell The spell to adjust. Since cooldown is always stored in the first slice, we will not need to adjust all.
 * @param value An integer representing the percentage to reduce the cooldown by. Value will be positive if the cooldown is to be reduced.
 */
const cooldownAdjFlat = (spell: SpellData[], value: number) => {
    if (spell[0].cooldownData) {
        spell[0].cooldownData.cooldown += value / 1000; // Almost always a negative value.
    }
}


/**
 * Permanently adjust the cooldown on a spell by a percentage.
 * @param spell The spell to adjust. Since cooldown is always stored in the first slice, we will not need to adjust all.
 * @param value An integer representing the flat amount to reduce the cooldown by. Value will be negative and in ms.
 */
const modCastTimeFlat = (spell: SpellData[], value: number) => {
    spell[0].castTime += (value / 1000);
}

/**
 * Permanently adjust the cooldown on a spell by a percentage.
 * @param spell The spell to adjust. Since cooldown is always stored in the first slice, we will not need to adjust all.
 * @param value An integer representing the percentage to reduce the cooldown by. Value will be negative.
 */
const modCastTimePerc = (spell: SpellData[], value: number) => {
    spell[0].castTime *= (1 - (value / 100));
}

// A talent that just adds stats. 
// Examples: 
// - Seal of Might adds intellect and mastery
// - Lycara's Gift adds haste
// Be careful with Mastery talents since their tooltips often lie and refer to base mastery points, not sheet mastery. 
const addStatPerc = (statBonuses: any, stat: string, value: number) => {
    if (statBonuses[stat]) statBonuses[stat] += value;
    else statBonuses[stat] = value;
}
