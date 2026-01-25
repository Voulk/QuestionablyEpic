


// % buff to Spell. If index = -1 then apply to all slices.
const buffSpellPerc = (spell: SpellData[], value: number, index: number = -1) => {

}

// Increased crit chance on spell
const buffSpellCritChance = (spell: SpellData[], value: number) => {

}


// Permanently reduced mana cost on spell
const manaCostAdj = (spell: SpellData[], value: number) => {
    
}


// Permanently adjust the cooldown on a spell by a percentage.
const cooldownAdjPerc = (spell: SpellData[], value: number) => {

}

// Permanently adjust the cooldown on a spell by a flat amount.
// Be cautious of spells that get both a flat and percentage adjustment. Flat usually applied first.
const cooldownAdjFlat = (spell: SpellData[], value: number) => {

}


// Generic cast time adjustments like -0.5s off a spell.
// Examples:
// - Divine Favor
const modCastTime = (spell: SpellData[], value: number) => {

}

// A talent that just adds stats. 
// Examples: 
// - Seal of Might adds intellect and mastery
// - Lycara's Gift adds haste
// Be careful with Mastery talents since their tooltips often lie and refer to base mastery points, not sheet mastery. 
const addStatPerc = (statBonuses: any) => {

}
