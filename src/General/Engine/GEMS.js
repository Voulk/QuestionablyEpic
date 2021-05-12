export const GEMS = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Red Gems                                            */
  /* ---------------------------------------------------------------------------------------------- */
  { name: "Teardrop Tourmaline", color: "red", rarity: "common", jewelcrafting: false, stats: { bonushealing: 10 } }, // +5 spellpower
  { name: "Teardrop Blood Garnet", color: "red", rarity: "uncommon", jewelcrafting: false, stats: { bonushealing: 14 } }, // +7 spellpower
  { name: "Teardrop Living Ruby", color: "red", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 18 } }, // +9 spellpower
  { name: "Teardrop Crimson Spinel", color: "red", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 22 } }, // +12 spellpower
  { name: "Kailee's Rose", color: "red", rarity: "epic", jewelcrafting: true, stats: { bonushealing: 24 } }, // +14 spellpower JC Only (BOP)

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Yellow Gems                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* --------------------------------------- Spell Crit Gems -------------------------------------- */
  { name: "Gleaming Amber", color: "yellow", rarity: "common", jewelcrafting: false, stats: { crit: 4 } }, // +4 spell crit
  { name: "Gleaming Golden Draenite", color: "yellow", rarity: "uncommon", jewelcrafting: false, stats: { crit: 6 } }, // +6 spell crit
  { name: "Gleaming Dawnstone", color: "yellow", rarity: "rare", jewelcrafting: false, stats: { crit: 8 } }, // +8 spell crit
  { name: "Gleaming Ornate Dawnstone", color: "yellow", rarity: "epic", jewelcrafting: false, stats: { crit: 10 } }, // +10 spell crit
  { name: "Blood of Amber", color: "yellow", rarity: "epic", jewelcrafting: false, stats: { crit: 12 } }, // +12 spell crit

  /* --------------------------------------- Intellect Gems --------------------------------------- */
  { name: "Brilliant Amber", color: "yellow", rarity: "common", jewelcrafting: false, stats: { intellect: 4 } }, // +4 intellect
  { name: "Brilliant Golden Draenite", color: "yellow", rarity: "uncommon", jewelcrafting: false, stats: { intellect: 6 } }, // +6 intellect
  { name: "Brilliant Dawnstone", color: "yellow", rarity: "rare", jewelcrafting: false, stats: { intellect: 8 } }, // +8 intellect
  { name: "Brilliant Lionseye", color: "yellow", rarity: "epic", jewelcrafting: false, stats: { intellect: 10 } }, // +10 intellect

  /* ----------------------------------------- Haste Gems ----------------------------------------- */
  { name: "Quick Dawnstone", color: "yellow", rarity: "rare", jewelcrafting: false, stats: { haste: 8 } }, // +8 haste
  { name: "Quick Lionseye", color: "yellow", rarity: "epic", jewelcrafting: false, stats: { haste: 10 } }, // +10 haste

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Blue Gems                                           */
  /* ---------------------------------------------------------------------------------------------- */

  /* ----------------------------------------- Spirit Gems ---------------------------------------- */
  { name: "Sparkling Zircon", color: "blue", rarity: "common", jewelcrafting: false, stats: { spirit: 4 } }, // +4 spirit
  { name: "Sparkling Azure Moonstone", color: "blue", rarity: "uncommon", jewelcrafting: false, stats: { spirit: 6 } }, // +6 spirit
  { name: "Sparkling Star of Elune", color: "blue", rarity: "rare", jewelcrafting: false, stats: { spirit: 8 } }, // +8 spirit
  { name: "Sparkling Empyrean Sapphire", color: "blue", rarity: "epic", jewelcrafting: false, stats: { spirit: 10 } }, // +10 spirit

  /* -------------------------------------- Mana / 5 Seconds -------------------------------------- */
  { name: "Lustrous Zircon", color: "blue", rarity: "common", jewelcrafting: false, stats: { mp5: 1 } }, // +1 Mana every 5 seconds
  { name: "Lustrous Azure Moonstone", color: "blue", rarity: "uncommon", jewelcrafting: false, stats: { mp5: 2 } }, // +2 Mana every 5 seconds
  { name: "Lustrous Star of Elune", color: "blue", rarity: "rare", jewelcrafting: false, stats: { mp5: 4 } }, // +4 Mana every 5 seconds
  { name: "Lustrous Empyrean Sapphire", color: "blue", rarity: "epic", jewelcrafting: false, stats: { mp5: 5 } }, // +5 Mana every 5 seconds

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Orange Gems                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* -------------------------------------- Hit & Spell Power ------------------------------------- */
  { name: "Veiled Flame Spessarite", color: "orange", rarity: "uncommon", jewelcrafting: false, stats: { hit: 3, bonushealing: 8 } }, // +3 hit rating & +4 spell power
  { name: "Veiled Noble Topaz", color: "orange", rarity: "rare", jewelcrafting: false, stats: { hit: 4, bonushealing: 10 } }, // +4 hit rating & +5 spell power
  { name: "Shining Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { hit: 5, bonushealing: 12 } }, // +5 hit rating & +6 spell power
  { name: "Veiled Pyrestone", color: "orange", rarity: "epic", jewelcrafting: false, stats: { hit: 5, bonushealing: 12 } }, // +5 hit rating & +6 spell power

  /* ----------------------------------- Intellect & Spell Power ---------------------------------- */
  { name: "Luminous Flame Spessarite", color: "orange", rarity: "uncommon", jewelcrafting: false, stats: { intellect: 3, bonushealing: 8 } }, // +3 intellect & +4 spell power
  { name: "Luminous Noble Topaz", color: "orange", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, bonushealing: 10 } }, // +4 intellect & +5 spell power
  { name: "Luminous Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 4, bonushealing: 12 } }, // +4 intellect & +6 spell power
  { name: "Luminous Pyrestone", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, bonushealing: 12 } }, // +5 intellect & +6 spell power

  /* ------------------------------------- Haste & Spell Power ------------------------------------ */
  { name: "Reckless Noble Topaz", color: "orange", rarity: "rare", jewelcrafting: false, stats: { haste: 4, bonushealing: 10 } }, // +4 haste & +5 spell power
  { name: "Reckless Pyrestone", color: "orange", rarity: "epic", jewelcrafting: false, stats: { haste: 5, bonushealing: 12 } }, // +5 haste & +6 spell power

  /* ------------------------------- Spell Power & Spell Penetration ------------------------------ */
  { name: "Mysterious Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { spellpenetration: 5, bonushealing: 12 } }, // +5 spell penetration & +6 spell power

  { name: "Potent Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, crit: 4 } },
  { name: "Reckless Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, haste: 4 } },

//   TODO: 
//   Unstable Topaz
//   Infused Fire Opal
//   Durable Fire Opal
//   Iridescent Fire Opal
//   Potent Flame Spessarite
//   Potent Noble Topaz
//   Potent Ornate Topaz
//   Potent Pyrestone

//   Green Gems
//   Purple Gems


];
