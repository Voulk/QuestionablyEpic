export const GEMS = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Red Gems                                            */
  /* ---------------------------------------------------------------------------------------------- */
  { name: "Teardrop Living Ruby", color: "red", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 18 } }, // +9 spellpower
  { name: "Teardrop Crimson Spinel", color: "red", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 22 } }, // +12 spellpower
  { name: "Kailee's Rose", color: "red", rarity: "epic", jewelcrafting: true, stats: { bonushealing: 24 } }, // +14 spellpower JC Only (BOP)

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Yellow Gems                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* --------------------------------------- Spell Crit Gems -------------------------------------- */
  { name: "Gleaming Dawnstone", color: "yellow", rarity: "rare", jewelcrafting: false, stats: { crit: 8 } }, // +8 spell crit
  { name: "Gleaming Ornate Dawnstone", color: "yellow", rarity: "epic", jewelcrafting: false, stats: { crit: 10 } }, // +10 spell crit
  { name: "Blood of Amber", color: "yellow", rarity: "epic", jewelcrafting: false, stats: { crit: 12 } }, // +12 spell crit

  /* --------------------------------------- Intellect Gems --------------------------------------- */
  { name: "Brilliant Dawnstone", color: "yellow", rarity: "rare", jewelcrafting: false, stats: { intellect: 8 } }, // +8 intellect
  { name: "Brilliant Lionseye", color: "yellow", rarity: "epic", jewelcrafting: false, stats: { intellect: 10 } }, // +10 intellect

  /* ----------------------------------------- Haste Gems ----------------------------------------- */
  { name: "Quick Dawnstone", color: "yellow", rarity: "rare", jewelcrafting: false, stats: { haste: 8 } }, // +8 haste
  { name: "Quick Lionseye", color: "yellow", rarity: "epic", jewelcrafting: false, stats: { haste: 10 } }, // +10 haste

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Blue Gems                                           */
  /* ---------------------------------------------------------------------------------------------- */

  /* ----------------------------------------- Spirit Gems ---------------------------------------- */
  { name: "Sparkling Star of Elune", color: "blue", rarity: "rare", jewelcrafting: false, stats: { spirit: 8 } }, // +8 spirit
  { name: "Sparkling Empyrean Sapphire", color: "blue", rarity: "epic", jewelcrafting: false, stats: { spirit: 10 } }, // +10 spirit

  /* -------------------------------------- Mana / 5 Seconds -------------------------------------- */
  { name: "Lustrous Star of Elune", color: "blue", rarity: "rare", jewelcrafting: false, stats: { mp5: 4 } }, // +4 Mana every 5 seconds
  { name: "Lustrous Empyrean Sapphire", color: "blue", rarity: "epic", jewelcrafting: false, stats: { mp5: 5 } }, // +5 Mana every 5 seconds

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Orange Gems                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* -------------------------------------- Hit & Spell Power ------------------------------------- */
  { name: "Veiled Noble Topaz", color: "orange", rarity: "rare", jewelcrafting: false, stats: { hit: 4, bonushealing: 10 } }, // +4 hit rating & +5 spell power
  { name: "Shining Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { hit: 5, bonushealing: 12 } }, // +5 hit rating & +6 spell power
  { name: "Veiled Pyrestone", color: "orange", rarity: "epic", jewelcrafting: false, stats: { hit: 5, bonushealing: 12 } }, // +5 hit rating & +6 spell power

  /* ----------------------------------- Intellect & Spell Power ---------------------------------- */
  { name: "Luminous Noble Topaz", color: "orange", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, bonushealing: 10 } }, // +4 intellect & +5 spell power
  { name: "Luminous Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 4, bonushealing: 12 } }, // +4 intellect & +6 spell power
  { name: "Luminous Pyrestone", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, bonushealing: 12 } }, // +5 intellect & +6 spell power

  /* ------------------------------------- Haste & Spell Power ------------------------------------ */
  { name: "Reckless Noble Topaz", color: "orange", rarity: "rare", jewelcrafting: false, stats: { haste: 4, bonushealing: 10 } }, // +4 haste & +5 spell power
  { name: "Reckless Pyrestone", color: "orange", rarity: "epic", jewelcrafting: false, stats: { haste: 5, bonushealing: 12 } }, // +5 haste & +6 spell power

  /* ------------------------------- Spell Power & Spell Penetration ------------------------------ */
  { name: "Mysterious Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { spellpenetration: 5, bonushealing: 12 } }, // +5 spell penetration & +6 spell power

  /* -------------------------------------- Intellect & Crit -------------------------------------- */
  { name: "Potent Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, crit: 4 } }, // +5 intellect & +4 crit

  /* -------------------------------------- Intellect & Haste ------------------------------------- */
  { name: "Reckless Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, haste: 4 } }, // +5 intellect & +4 haste

  /* ----------------------------------- Intellect & Spell Power ---------------------------------- */
  { name: "Unstable Topaz", color: "orange", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, bonushealing: 10 } }, // 5 spell power & +4 intellect
  { name: "Infused Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 4, bonushealing: 12 } }, // 6 spell power & +4 intellect

  /* ---------------------------------- Spell Power & Resilience ---------------------------------- */
  { name: "Durable Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { resilience: 4, bonushealing: 12 } }, // 6 spell power & +4 resilience

  /* ------------------------------------- Spell Power & Crit ------------------------------------- */
  { name: "Potent Noble Topaz", color: "orange", rarity: "rare", jewelcrafting: false, stats: { crit: 4, bonushealing: 10 } }, // 5 spell power & +4 crit
  { name: "Iridescent Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 4, bonushealing: 12 } }, // 6 spell power & +4 crit
  { name: "Potent Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 4, bonushealing: 12 } }, // 6 spell power & +4 crit
  { name: "Potent Ornate Topaz", color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 5, bonushealing: 12 } }, // 6 spell power & +5 crit
  { name: "Potent Pyrestone", color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 5, bonushealing: 12 } }, // 6 spell power & +5 crit

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Green Gems                                           */
  /* ---------------------------------------------------------------------------------------------- */

  /* -------------------------------------- Defense & Mana/5 -------------------------------------- */
  { name: "Effulgent Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { defense: 5, mp5: 2 } }, // 5 defense & +5 mana per 5

  /* ------------------------------------- Melee Crit & Mana/5 ------------------------------------ */
  { name: "Sundered Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { meleeCrit: 5, mp5: 2 } }, // 5 melee crit & +2 mp5

  /* --------------------------------------- Haste & Stamina -------------------------------------- */
  { name: "Forceful Talasite", color: "green", rarity: "rare", jewelcrafting: false, stats: { haste: 4, stamina: 6 } }, // 4 haste & +6 stamina
  { name: "Forceful Seaspray Emerald", color: "green", rarity: "epic", jewelcrafting: false, stats: { haste: 5, stamina: 7 } }, // 5 haste & +7 stamina

  /* ------------------------------------- Intellect & Mana/5 ------------------------------------- */
  { name: "Dazzling Talasite", color: "green", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, mp5: 2 } }, // +4 intellect & +2 mana per 5
  { name: "Dazzling Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, mp5: 2 } }, // +5 intellect & +2 mana per 5
  { name: "Dazzling Seaspray Emerald", color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, mp5: 3 } }, // +5 intellect & +3 mana per 5

  /* ---------------------------------- Crit & Spell Penetration ---------------------------------- */
  { name: "Radiant Talasite", color: "green", rarity: "rare", jewelcrafting: false, stats: { crit: 4, spellpenetration: 5 } }, // +4 crit & +5 spell penetration
  { name: "Radiant Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { crit: 5, spellpenetration: 5 } }, // +5 crit & +5 spell penetration
  { name: "Radiant Seaspray Emerald", color: "green", rarity: "epic", jewelcrafting: false, stats: { crit: 5, spellpenetration: 6 } }, // +5 crit & +6 spell penetration

  /* --------------------------------------- Stamina & Crit --------------------------------------- */
  { name: "Notched Deep Peridot", color: "green", rarity: "rare", jewelcrafting: false, stats: { stamina: 3, crit: 4 } }, // +3 stamina & +4 crit
  { name: "Polished Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { stamina: 6, crit: 5 } }, // +6 stamina & +5 crit

  /* ------------------------------------- Intellect & Stamina ------------------------------------ */
  { name: "Unstable Peridot", color: "green", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, stamina: 6 } }, // +4 intellect & +6 stamina
  { name: "Timeless Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, stamina: 6 } }, // +5 intellect & +6 stamina

  /* ------------------------------------- Intellect & Spirit ------------------------------------- */
  { name: "Seer's Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 4, spirit: 5 } }, // +4 intellect & +5 spirit

  /* ---------------------------------------- Hit & Mana/5 ---------------------------------------- */
  { name: "Lambent Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { hit: 4, mp5: 2 } }, // +4 hit & +2 mp5
  { name: "Rune Covered Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { crit: 5, mp5: 2 } }, // +5 crit & +2 mp5

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Purple Gems                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------ Spell Power & Stamina ----------------------------------- */
  { name: "Glowing Tanzanite", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, stamina: 6 } }, // +6 spell power & +6 stamina
  { name: "Infused Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, stamina: 6 } }, // +6 spell power & +6 stamina
  { name: "Glowing Shadowsong Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, stamina: 7 } }, // +6 spell power & +7 stamina
  { name: "Blessed Tanzanite", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, stamina: 6 } }, // +6 spell power & +5 stamina
  { name: "Soothing Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, stamina: 6 } }, // +6 spell power & +5 stamina

  /* ------------------------------------ Spell Power & Mana/5 ------------------------------------ */
  { name: "Royal Nightseye", color: "purple", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 10, mp5: 2 } }, // +5 spell power & +2 mana per 5
  { name: "Royal Tanzanite", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, mp5: 2 } }, // +6 spell power & +2 mana per 5
  { name: "Royal Shadowsong Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, mp5: 2 } }, // +6 spell power & +2 mana per 5

  /* ------------------------------------ Spell Power & Spirit ------------------------------------ */
  { name: "Unstable Sapphire", color: "purple", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 10, spirit: 4 } }, // +5 spell power & +4 spirit
  { name: "Purified Shadow Pearl", color: "purple", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 10, spirit: 4 } }, // +5 spell power & +4 spirit
  { name: "Fluorescent Tanzanite", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, spirit: 4 } }, // +6 spell power & +4 spirit
  { name: "Imperial Tanzanite", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 10, spirit: 5 } }, // +5 spell power & +5 spirit
  { name: "Purified Shadowsong Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, spirit: 5 } }, // +6 spell power & +5 spirit

  /* ------------------------------------ Attack Power & Mana/5 ----------------------------------- */
  { name: "Infused Nightseye", color: "purple", rarity: "rare", jewelcrafting: false, stats: { attackPower: 8, mp5: 2 } }, // +6 attack power & +2 mp5
  { name: "Infused Shadowsong Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { attackPower: 10, mp5: 2 } }, // +6 attack power & +2 mp5

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Meta Gems                                           */
  /* ---------------------------------------------------------------------------------------------- */

  { name: "Insightful Earthstorm Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { intellect: 12 }, requirements: "Atleast 2 red, 2 blue, 2 red gems" }, // +12 Intellect & Chance to restore mana on spellcast
  { name: "Mystical Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: {}, requirements: "Requires more blue gems than yellow" }, // Chance to Increase Spell Cast Speed
  { name: "Swift Starfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 24 }, requirements: "Atleast 2 yellow and 1 red gem" }, // +12 Spell Power and Minor Run Speed Increase.
  { name: "Ember Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: {}, requirements: "Atleast 3 red gems" }, // +14 Spell Damage & +2% Intellect
  { name: "Imbued Unstable Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 28 }, requirements: "Atleast 3 yellow gems" }, // +14 Spell Power and 5% Stun Resistance
  { name: "Bracing Earthstorm Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 28 }, requirements: "requires more red gems than blue gems" }, // +14 Spell Power and 2% Reduced Threat
  { name: "Destructive Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { crit: 14 }, requirements: "Atleast 2 red, 2 blue, 2 red gems" }, // +14 Spell Crit Rating and 1% Spell Reflect
  { name: "Chaotic Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { crit: 12 }, requirements: "Atleast 2 blue gems" }, // +12 Spell Critical & 3% Increased Critical Damage
];
