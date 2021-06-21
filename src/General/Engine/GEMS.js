export const GEMS = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Red Gems                                            */
  /* ---------------------------------------------------------------------------------------------- */
  { name: "Teardrop Living Ruby", id: 24029, color: "red", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 18 } }, // +9 spellpower
  { name: "Teardrop Crimson Spinel", id: 32195, color: "red", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 22 } }, // +12 spellpower
  { name: "Kailee's Rose", id: 33134, color: "red", rarity: "epic", jewelcrafting: true, stats: { bonushealing: 24 } }, // +14 spellpower JC Only (BOP)
  { name: "Teardrop Tourmaline", id: 28460, color: "red", rarity: "basic", jewelcrafting: false, stats: { bonushealing: 9 } }, 

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Yellow Gems                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* --------------------------------------- Spell Crit Gems -------------------------------------- */
  { name: "Gleaming Dawnstone", id: 24050, color: "yellow", rarity: "rare", jewelcrafting: false, stats: { spellcrit: 8 } }, // +8 spell crit
  { name: "Gleaming Ornate Dawnstone", id: 28120, color: "yellow", rarity: "epic", jewelcrafting: false, stats: { spellcrit: 10 } }, // +10 spell crit
  { name: "Blood of Amber", id: 33140, color: "yellow", rarity: "epic", jewelcrafting: true, stats: { spellcrit: 12 } }, // +12 spell crit
  { name: "Gleaming Amber", id: 28469, color: "yellow", rarity: "basic", jewelcrafting: false, stats: { spellcrit: 4 } }, // +4 spell crit

  /* --------------------------------------- Intellect Gems --------------------------------------- */
  { name: "Brilliant Dawnstone", id: 24047, color: "yellow", rarity: "rare", jewelcrafting: false, stats: { intellect: 8 } }, // +8 intellect
  { name: "Brilliant Lionseye", id: 32204, color: "yellow", rarity: "epic", jewelcrafting: false, stats: { intellect: 10 } }, // +10 intellect
  { name: "Brilliant Amber", id: 28466, color: "basic", rarity: "basic", jewelcrafting: false, stats: { intellect: 4 } }, // +4 intellect

  /* ----------------------------------------- Haste Gems ----------------------------------------- */
  { name: "Quick Dawnstone", color: "yellow", rarity: "rare", jewelcrafting: false, stats: { haste: 8 } }, // +8 haste
  { name: "Quick Lionseye", color: "yellow", rarity: "epic", jewelcrafting: false, stats: { haste: 10 } }, // +10 haste

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Blue Gems                                           */
  /* ---------------------------------------------------------------------------------------------- */

  /* ----------------------------------------- Spirit Gems ---------------------------------------- */
  { name: "Sparkling Star of Elune", id: 24035, color: "blue", rarity: "rare", jewelcrafting: false, stats: { spirit: 8 } }, // +8 spirit
  { name: "Sparkling Empyrean Sapphire", id: 32201, color: "blue", rarity: "epic", jewelcrafting: false, stats: { spirit: 10 } }, // +10 spirit
  { name: "Sparkling Zircon", id: 28464, color: "blue", rarity: "basic", jewelcrafting: false, stats: { spirit: 4 } }, // +4 spirit

  /* -------------------------------------- Mana / 5 Seconds -------------------------------------- */
  { name: "Lustrous Star of Elune", id: 24037, color: "blue", rarity: "rare", jewelcrafting: false, stats: { mp5: 4 } }, // +4 Mana every 5 seconds
  { name: "Lustrous Empyrean Sapphire", id: 32202, color: "blue", rarity: "epic", jewelcrafting: false, stats: { mp5: 5 } }, // +5 Mana every 5 seconds
  { name: "Lustrous Zircon", id: 28465, color: "blue", rarity: "basic", jewelcrafting: false, stats: { mp5: 1 } }, // +1 Mana every 5 seconds

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Orange Gems                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* -------------------------------------- Hit & Spell Power ------------------------------------- */
  { name: "Veiled Noble Topaz", color: "orange", rarity: "rare", jewelcrafting: false, stats: { hit: 4, bonushealing: 9 } }, // +4 hit rating & +5 spell power
  { name: "Shining Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { hit: 5, bonushealing: 12 } }, // +5 hit rating & +6 spell power
  { name: "Veiled Pyrestone", color: "orange", rarity: "epic", jewelcrafting: false, stats: { hit: 5, bonushealing: 12 } }, // +5 hit rating & +6 spell power

  /* ----------------------------------- Intellect & Spell Power ---------------------------------- */
  { name: "Luminous Noble Topaz", id: 24060, color: "orange", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, bonushealing: 9 } }, // +4 intellect & +5 spell power
  { name: "Luminous Fire Opal", id: 30547, color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 4, bonushealing: 12 } }, // +4 intellect & +6 spell power
  { name: "Luminous Pyrestone", id: 32219, color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, bonushealing: 12 } }, // +5 intellect & +6 spell power

  /* ------------------------------------- Haste & Spell Power ------------------------------------ */
  { name: "Reckless Noble Topaz", id: 35316, color: "orange", rarity: "rare", jewelcrafting: false, stats: { haste: 4, bonushealing: 9 } }, // +4 haste & +5 spell power
  { name: "Reckless Pyrestone", id: 35760, color: "orange", rarity: "epic", jewelcrafting: false, stats: { haste: 5, bonushealing: 12 } }, // +5 haste & +6 spell power

  /* ------------------------------- Spell Power & Spell Penetration ------------------------------ */
  { name: "Mysterious Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { spellpenetration: 5, bonushealing: 12 } }, // +5 spell penetration & +6 spell power

  /* -------------------------------------- Intellect & Crit -------------------------------------- */
  { name: "Potent Fire Opal", id: 30588, color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, crit: 4 } }, // +5 intellect & +4 crit

  /* -------------------------------------- Intellect & Haste ------------------------------------- */
  /*{ name: "Reckless Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, haste: 4 } }, // +5 intellect & +4 haste */

  /* ----------------------------------- Intellect & Spell Power ---------------------------------- */
  { name: "Unstable Topaz", id: 32638, color: "orange", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, bonushealing: 5 } }, // 5 spell power & +4 intellect
  { name: "Infused Fire Opal", id: 30551, color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 4, bonushealing: 6 } }, // 6 spell power & +4 intellect

  /* ---------------------------------- Spell Power & Resilience ---------------------------------- */
  /*{ name: "Durable Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { resilience: 4, bonushealing: 12 } }, // 6 spell power & +4 resilience */

  /* ------------------------------------- Spell Power & Crit ------------------------------------- */
  { name: "Potent Noble Topaz", id: 24059, color: "orange", rarity: "rare", jewelcrafting: false, stats: { crit: 4, bonushealing: 9 } }, // 5 spell power & +4 crit
  { name: "Iridescent Fire Opal", id: 30593, color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 4, bonushealing: 12 } }, // 6 spell power & +4 crit
  { name: "Potent Fire Opal", id: 30588, color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 4, bonushealing: 12 } }, // 6 spell power & +4 crit
  { name: "Potent Ornate Topaz", id: 28123, color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 5, bonushealing: 12 } }, // 6 spell power & +5 crit
  { name: "Potent Pyrestone", id: 32218, color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 5, bonushealing: 12 } }, // 6 spell power & +5 crit

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Green Gems                                           */
  /* ---------------------------------------------------------------------------------------------- */

  /* -------------------------------------- Defense & Mana/5 -------------------------------------- */
  /*{ name: "Effulgent Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { defense: 5, mp5: 2 } }, // 5 defense & +5 mana per 5 */

  /* ------------------------------------- Melee Crit & Mana/5 ------------------------------------ */
  /*{ name: "Sundered Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { meleeCrit: 5, mp5: 2 } }, // 5 melee crit & +2 mp5 */

  /* --------------------------------------- Haste & Stamina -------------------------------------- */
  /*{ name: "Forceful Talasite", color: "green", rarity: "rare", jewelcrafting: false, stats: { haste: 4, stamina: 6 } }, // 4 haste & +6 stamina
  { name: "Forceful Seaspray Emerald", color: "green", rarity: "epic", jewelcrafting: false, stats: { haste: 5, stamina: 7 } }, // 5 haste & +7 stamina */

  /* ------------------------------------- Intellect & Mana/5 ------------------------------------- */
  { name: "Dazzling Talasite", id: 24065, color: "green", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, mp5: 2 } }, // +4 intellect & +2 mana per 5
  { name: "Dazzling Chrysoprase", id: 30589, color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, mp5: 2 } }, // +5 intellect & +2 mana per 5
  { name: "Dazzling Seaspray Emerald", id: 32225, color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, mp5: 3 } }, // +5 intellect & +3 mana per 5

  /* ---------------------------------- Crit & Spell Penetration ---------------------------------- */
  /*{ name: "Radiant Talasite", color: "green", rarity: "rare", jewelcrafting: false, stats: { crit: 4, spellpenetration: 5 } }, // +4 crit & +5 spell penetration
  { name: "Radiant Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { crit: 5, spellpenetration: 5 } }, // +5 crit & +5 spell penetration
  { name: "Radiant Seaspray Emerald", color: "green", rarity: "epic", jewelcrafting: false, stats: { crit: 5, spellpenetration: 6 } }, // +5 crit & +6 spell penetration */

  /* --------------------------------------- Stamina & Crit --------------------------------------- */
  /*{ name: "Notched Deep Peridot", color: "green", rarity: "rare", jewelcrafting: false, stats: { stamina: 3, crit: 4 } }, // +3 stamina & +4 crit
  { name: "Polished Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { stamina: 6, crit: 5 } }, // +6 stamina & +5 crit

  /* ------------------------------------- Intellect & Stamina ------------------------------------ */
  { name: "Unstable Peridot", color: "green", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, stamina: 6 } }, // +4 intellect & +6 stamina
  { name: "Timeless Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, stamina: 6 } }, // +5 intellect & +6 stamina */

  /* ------------------------------------- Intellect & Spirit ------------------------------------- */
  { name: "Seer's Chrysoprase", id: 30586, color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 4, spirit: 5 } }, // +4 intellect & +5 spirit

  /* ---------------------------------------- Hit & Mana/5 ---------------------------------------- */
  /*{ name: "Lambent Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { hit: 4, mp5: 2 } }, // +4 hit & +2 mp5
  { name: "Rune Covered Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { crit: 5, mp5: 2 } }, // +5 crit & +2 mp5 */

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Purple Gems                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* ------------------------------------ Spell Power & Stamina ----------------------------------- */
  /*{ name: "Glowing Tanzanite", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, stamina: 6 } }, // +6 spell power & +6 stamina
  { name: "Infused Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, stamina: 6 } }, // +6 spell power & +6 stamina
  { name: "Glowing Shadowsong Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, stamina: 7 } }, // +6 spell power & +7 stamina
  { name: "Blessed Tanzanite", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, stamina: 6 } }, // +6 spell power & +5 stamina
  { name: "Soothing Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, stamina: 6 } }, // +6 spell power & +5 stamina */

  /* ------------------------------------ Spell Power & Mana/5 ------------------------------------ */
  { name: "Royal Nightseye", id: 24057, color: "purple", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 9, mp5: 2 } }, // +5 spell power & +2 mana per 5
  { name: "Royal Tanzanite", id: 30603, color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, mp5: 2 } }, // +6 spell power & +2 mana per 5
  { name: "Royal Shadowsong Amethyst", id: 32216, color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, mp5: 2 } }, // +6 spell power & +2 mana per 5 

  /* ------------------------------------ Spell Power & Spirit ------------------------------------ */
  /*{ name: "Unstable Sapphire", color: "purple", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 10, spirit: 4 } }, // +5 spell power & +4 spirit */
  { name: "Purified Shadow Pearl", id: 32836, color: "purple", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 9, spirit: 4 } }, // +5 spell power & +4 spirit
  { name: "Fluorescent Tanzanite", id: 30600, color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, spirit: 4 } }, // +6 spell power & +4 spirit
  { name: "Imperial Tanzanite", id: 30572, color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 9, spirit: 5 } }, // +5 spell power & +5 spirit
  { name: "Purified Shadowsong Amethyst", id: 37503, color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 12, spirit: 5 } }, // +6 spell power & +5 spirit

  /* ------------------------------------ Attack Power & Mana/5 ----------------------------------- */
  /*{ name: "Infused Nightseye", color: "purple", rarity: "rare", jewelcrafting: false, stats: { attackPower: 8, mp5: 2 } }, // +6 attack power & +2 mp5
  { name: "Infused Shadowsong Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { attackPower: 10, mp5: 2 } }, // +6 attack power & +2 mp5 */

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Meta Gems                                           */
  /* ---------------------------------------------------------------------------------------------- */

  { name: "Insightful Earthstorm Diamond", id: 25901, color: "meta", rarity: "rare", jewelcrafting: false, stats: { intellect: 12 }, requirements: "At least 2 red, 2 blue, 2 red gems" }, // +12 Intellect & Chance to restore mana on spellcast
  { name: "Mystical Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: {}, requirements: "Requires more blue gems than yellow" }, // Chance to Increase Spell Cast Speed
  { name: "Swift Starfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 24 }, requirements: "At least 2 yellow and 1 red gem" }, // +12 Spell Power and Minor Run Speed Increase.
  { name: "Ember Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: {}, requirements: "Atleast 3 red gems" }, // +14 Spell Damage & +2% Intellect
  { name: "Imbued Unstable Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 28 }, requirements: "Atleast 3 yellow gems" }, // +14 Spell Power and 5% Stun Resistance
  { name: "Bracing Earthstorm Diamond", id: 25897, color: "meta", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 28 }, requirements: "requires more red gems than blue gems" }, // +14 Spell Power and 2% Reduced Threat
  { name: "Destructive Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { crit: 14 }, requirements: "At least 2 red, 2 blue, 2 red gems" }, // +14 Spell Crit Rating and 1% Spell Reflect
  { name: "Chaotic Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { crit: 12 }, requirements: "At least 2 blue gems" }, // +12 Spell Critical & 3% Increased Critical Damage
];
