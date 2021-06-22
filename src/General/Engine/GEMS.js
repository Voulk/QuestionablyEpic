export const GEMS = [
  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Red Gems                                            */
  /* ---------------------------------------------------------------------------------------------- */
  
  // Teardrop Living Ruby
  // Phase 1
  // https://tbc.wowhead.com/item=24029/teardrop-living-ruby
  // +18 Healing and +6 Spell Damage
  { name: "Teardrop Living Ruby", id: 24029, color: "red", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 18 } }, 
  
  // Teardrop Crimson Spinel
  // Phase 3
  // https://tbc.wowhead.com/item=32195/teardrop-crimson-spinel
  // +22 Healing and +8 Spell Damage
  { name: "Teardrop Crimson Spinel", id: 32195, color: "red", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 22 } }, 
  
  // Kailee's Rose
  // Phase 2
  // https://tbc.wowhead.com/item=33134/kailees-rose
  // +26 Healing and +9 Spell Damage JC Only (BOP)
  { name: "Kailee's Rose", id: 33134, color: "red", rarity: "epic", jewelcrafting: true, stats: { bonushealing: 26 } }, 
  
  // Teardrop Tourmaline
  // Phase 1
  // https://tbc.wowhead.com/item=28460/teardrop-tourmaline
  // +9 Healing and +3 Spell Damage
  { name: "Teardrop Tourmaline", id: 28460, color: "red", rarity: "basic", jewelcrafting: false, stats: { bonushealing: 9 } }, 

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Yellow Gems                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* --------------------------------------- Spell Crit Gems -------------------------------------- */
  // Gleaming Dawnstone
  // Phase 1
  // https://tbc.wowhead.com/item=24050/gleaming-dawnstone
  // +8 Spell Critical Rating
  { name: "Gleaming Dawnstone", id: 24050, color: "yellow", rarity: "rare", jewelcrafting: false, stats: { spellcrit: 8 } }, 
  
  // Gleaming Ornate Dawnstone
  // Phase 1
  // https://tbc.wowhead.com/item=28120/gleaming-ornate-dawnstone
  // +10 Spell Critical Strike Rating
  { name: "Gleaming Ornate Dawnstone", id: 28120, color: "yellow", rarity: "epic", jewelcrafting: false, stats: { spellcrit: 10 } }, 
  
  // Blood of Amber
  // Phase ?
  // https://tbc.wowhead.com/item=33140/blood-of-amber
  // +12 Spell Critical Rating
  { name: "Blood of Amber", id: 33140, color: "yellow", rarity: "epic", jewelcrafting: true, stats: { spellcrit: 12 } },

  // Gleaming Amber
  // Phase 1
  // https://tbc.wowhead.com/item=28469/gleaming-amber
  // +4 Spell Critical Rating
  { name: "Gleaming Amber", id: 28469, color: "yellow", rarity: "basic", jewelcrafting: false, stats: { spellcrit: 4 } },

  /* --------------------------------------- Intellect Gems --------------------------------------- */
  
  // Brilliant Dawnstone
  // Phase 1
  // https://tbc.wowhead.com/item=24047/brilliant-dawnstone
  // +8 Intellect
  { name: "Brilliant Dawnstone", id: 24047, color: "yellow", rarity: "rare", jewelcrafting: false, stats: { intellect: 8 } },
  
  // Brilliant Lionseye
  // Phase 3
  // https://tbc.wowhead.com/item=32204/brilliant-lionseye
  // +10 Intellect
  { name: "Brilliant Lionseye", id: 32204, color: "yellow", rarity: "epic", jewelcrafting: false, stats: { intellect: 10 } },
  
  // Brilliant Amber
  // Phase 1
  // https://tbc.wowhead.com/item=28466/brilliant-amber
  // +4 Intellect
  { name: "Brilliant Amber", id: 28466, color: "basic", rarity: "basic", jewelcrafting: false, stats: { intellect: 4 } },

  /* ----------------------------------------- Haste Gems ----------------------------------------- */
  
  // Quick Dawnstone
  // Phase 1
  // https://tbc.wowhead.com/item=35315/quick-dawnstone
  // +8 Spell Haste Rating
  { name: "Quick Dawnstone", color: "yellow", rarity: "rare", jewelcrafting: false, stats: { haste: 8 } },
  
  // Quick Lionseye
  // Phase 3
  // https://tbc.wowhead.com/item=35761/quick-lionseye
  // +10 Spell Haste Rating
  { name: "Quick Lionseye", color: "yellow", rarity: "epic", jewelcrafting: false, stats: { haste: 10 } },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Blue Gems                                           */
  /* ---------------------------------------------------------------------------------------------- */

  /* ----------------------------------------- Spirit Gems ---------------------------------------- */
  
  // Sparkling Star of Elune
  // Phase 1
  // https://tbc.wowhead.com/item=24035/sparkling-star-of-elune
  // +8 Spirit
  { name: "Sparkling Star of Elune", id: 24035, color: "blue", rarity: "rare", jewelcrafting: false, stats: { spirit: 8 } },
  
  // Sparkling Empyrean Sapphire
  // Phase 3
  // https://tbc.wowhead.com/item=32201/sparkling-empyrean-sapphire
  // +10 Spirit
  { name: "Sparkling Empyrean Sapphire", id: 32201, color: "blue", rarity: "epic", jewelcrafting: false, stats: { spirit: 10 } },
  
  // Sparkling Zircon
  // Phase 1
  // https://tbc.wowhead.com/item=28464/sparkling-zircon
  // +4 Spirit
  { name: "Sparkling Zircon", id: 28464, color: "blue", rarity: "basic", jewelcrafting: false, stats: { spirit: 4 } },

  /* -------------------------------------- Mana / 5 Seconds -------------------------------------- */
  
  // Lustrous Star of Elune
  // Phase 1
  // https://tbc.wowhead.com/item=24037/lustrous-star-of-elune
  // +3 Mana every 5 seconds
  { name: "Lustrous Star of Elune", id: 24037, color: "blue", rarity: "rare", jewelcrafting: false, stats: { mp5: 3 } },
  
  // Lustrous Empyrean Sapphire
  // Phase 3
  // https://tbc.wowhead.com/item=32202/lustrous-empyrean-sapphire
  // +4 Mana every 5 seconds
  { name: "Lustrous Empyrean Sapphire", id: 32202, color: "blue", rarity: "epic", jewelcrafting: false, stats: { mp5: 4 } },
  
  // Lustrous Zircon
  // Phase 1
  // https://tbc.wowhead.com/item=28465/lustrous-zircon
  // +1 Mana every 5 seconds
  { name: "Lustrous Zircon", id: 28465, color: "blue", rarity: "basic", jewelcrafting: false, stats: { mp5: 1 } },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Orange Gems                                          */
  /* ---------------------------------------------------------------------------------------------- */

  /* -------------------------------------- Hit & Spell Damage ------------------------------------- */
  
  // Veiled Noble Topaz
  // Phase 1
  // https://tbc.wowhead.com/item=31867/veiled-noble-topaz
  // +4 Spell Hit Rating and +5 Spell Damage
  { name: "Veiled Noble Topaz", color: "orange", rarity: "rare", jewelcrafting: false, stats: { hit: 4 } },
  
  // Shining Fire Opal
  // Phase 1
  // https://tbc.wowhead.com/item=30564/shining-fire-opal
  // +6 Spell Damage and +5 Spell Hit Rating
  { name: "Shining Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { hit: 5 } }, 
  
  // Veiled Pyrestone
  // Phase 3
  // https://tbc.wowhead.com/item=32221/veiled-pyrestone
  // +5 Spell Hit Rating and +6 Spell Damage
  { name: "Veiled Pyrestone", color: "orange", rarity: "epic", jewelcrafting: false, stats: { hit: 5 } },

  /* ----------------------------------- Intellect / Healing / Spell Damage ---------------------------------- */
  
  // Luminous Noble Topaz
  // Phase 1
  // https://tbc.wowhead.com/item=24060/luminous-noble-topaz
  // +9 Healing +3 Spell Damage and +4 Intellect
  { name: "Luminous Noble Topaz", id: 24060, color: "orange", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, bonushealing: 9 } },
  
  // Luminous Fire Opal
  // Phase 1
  // https://tbc.wowhead.com/item=30547/luminous-fire-opal
  // +11 Healing +4 Spell Damage and +4 Intellect
  { name: "Luminous Fire Opal", id: 30547, color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 4, bonushealing: 11 } },
  
  // Luminous Pyrestone
  // Phase 3
  // https://tbc.wowhead.com/item=32219/luminous-pyrestone
  // +11 Healing +4 Spell Damage and +5 Intellect
  { name: "Luminous Pyrestone", id: 32219, color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, bonushealing: 11 } },

  /* ------------------------------------- Haste & Spell Damage ------------------------------------ */
  
  // Reckless Noble Topaz
  // Phase 1
  // https://tbc.wowhead.com/item=35316/reckless-noble-topaz
  // +4 Spell Haste Rating and +5 Spell Damage
  { name: "Reckless Noble Topaz", id: 35316, color: "orange", rarity: "rare", jewelcrafting: false, stats: { haste: 4 } },
  
  // Reckless Pyrestone
  // Phase 3
  // https://tbc.wowhead.com/item=35760/reckless-pyrestone
  // +5 Spell Haste Rating and +6 Spell Damage
  { name: "Reckless Pyrestone", id: 35760, color: "orange", rarity: "epic", jewelcrafting: false, stats: { haste: 5 } },

  /* ------------------------------- Spell Damage & Spell Penetration ------------------------------ */
  
  // Mysterious Fire Opal
  // Phase 1
  // https://tbc.wowhead.com/item=30573/mysterious-fire-opal
  // +6 Spell Damage and +5 Spell Penetration
  { name: "Mysterious Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { spellpenetration: 5 } },

  /* -------------------------------------- Spell Damage & Crit -------------------------------------- */
  
  // Potent Fire Opal
  // Phase 1
  // https://tbc.wowhead.com/item=30588/potent-fire-opal
  // +6 Spell Damage and +4 Spell Critical Rating
  { name: "Potent Fire Opal", id: 30588, color: "orange", rarity: "epic", jewelcrafting: false, stats: {crit: 4 } },

  /* -------------------------------------- Intellect & Haste ------------------------------------- */
  
  // Reckless Fire Opal
  //
  //
  //
  /*{ name: "Reckless Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, haste: 4 } }, // +5 intellect & +4 haste */

  /* ----------------------------------- Intellect & Spell Power ---------------------------------- */
  
  // Unstable Topaz
  // Phase ?
  // https://tbc.wowhead.com/item=32638/unstable-topaz
  // +5 Spell Damage and +4 Intellec
  { name: "Unstable Topaz", id: 32638, color: "orange", rarity: "rare", jewelcrafting: false, stats: { intellect: 4 } },
  
  // Infused Fire Opal
  // Phase 1
  // https://tbc.wowhead.com/item=30551/infused-fire-opal
  // +6 Spell Damage and +4 Intellect
  { name: "Infused Fire Opal", id: 30551, color: "orange", rarity: "epic", jewelcrafting: false, stats: { intellect: 4 } },

  /* ---------------------------------- Healing / Damage / Resilience ---------------------------------- */
  
  // Durable Fire Opal
  // Phase 1
  // https://tbc.wowhead.com/item=30581/durable-fire-opal
  // +11 Healing +4 Spell Damage and +4 Resilience Rating
  // { name: "Durable Fire Opal", color: "orange", rarity: "epic", jewelcrafting: false, stats: { resilience: 4, bonushealing: 11 } }

  /* ------------------------------------- Spell Damage & Crit ------------------------------------- */
  
  // Potent Noble Topaz
  // Phase 1
  // https://tbc.wowhead.com/item=24059/potent-noble-topaz
  // +4 Spell Critical Rating and +5 Spell Damage
  { name: "Potent Noble Topaz", id: 24059, color: "orange", rarity: "rare", jewelcrafting: false, stats: { crit: 4 } },
  
  /* ------------------------------------- Healing / Spell Damage / Crit ------------------------------------- */
  
  // Iridescent Fire Opal
  // Phase 1
  // https://tbc.wowhead.com/item=30593/iridescent-fire-opal
  // +11 Healing +4 Spell Damage and +4 Spell Critical Rating
  { name: "Iridescent Fire Opal", id: 30593, color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 4, bonushealing: 11 } },
  
  // Potent Fire Opal
  // Phase 1
  // https://tbc.wowhead.com/item=30588/potent-fire-opal
  // +6 Spell Damage and +4 Spell Critical Rating
  { name: "Potent Fire Opal", id: 30588, color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 4 } },
  
  // Potent Ornate Topaz
  // Phase 1
  // https://tbc.wowhead.com/item=28123/potent-ornate-topaz
  // +6 Spell Damage, +5 Spell Crit Rating
  { name: "Potent Ornate Topaz", id: 28123, color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 5 } },
  
  // Potent Pyrestone
  // Phase 3
  // https://tbc.wowhead.com/item=32218/potent-pyrestone
  // +5 Spell Critical Rating and +6 Spell Damage
  { name: "Potent Pyrestone", id: 32218, color: "orange", rarity: "epic", jewelcrafting: false, stats: { crit: 5 } },

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Green Gems                                           */
  /* ---------------------------------------------------------------------------------------------- */

  /* -------------------------------------- Defense & Mana/5 -------------------------------------- */
  
  // Effulgent Chrysoprase
  //
  //
  //
  // { name: "Effulgent Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { defense: 5, mp5: 2 } }, // 5 defense & +5 mana per 5

  /* ------------------------------------- Melee Crit & Mana/5 ------------------------------------ */
  
  // Sundered Chrysoprase
  //
  //
  //
  //{ name: "Sundered Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { meleeCrit: 5, mp5: 2 } }, // 5 melee crit & +2 mp5

  /* --------------------------------------- Haste & Stamina -------------------------------------- */
  
  // Forceful Talasite
  //
  //
  //
  //{ name: "Forceful Talasite", color: "green", rarity: "rare", jewelcrafting: false, stats: { haste: 4, stamina: 6 } }, // 4 haste & +6 stamina
  
  // Forceful Seaspray Emerald
  //
  //
  //
  //{ name: "Forceful Seaspray Emerald", color: "green", rarity: "epic", jewelcrafting: false, stats: { haste: 5, stamina: 7 } }, // 5 haste & +7 stamina

  /* ------------------------------------- Intellect & Mana/5 ------------------------------------- */
  
  // Dazzling Talasite
  // Phase 1
  // https://tbc.wowhead.com/item=24065/dazzling-talasite
  // +4 Intellect and +2 Mana every 5 seconds
  { name: "Dazzling Talasite", id: 24065, color: "green", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, mp5: 2 } },
  
  // Dazzling Chrysoprase
  // Phase 1
  // https://tbc.wowhead.com/item=30589/dazzling-chrysoprase
  // +5 Intellect and 2 mana per 5 sec.
  { name: "Dazzling Chrysoprase", id: 30589, color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, mp5: 2 } },
  
  // Dazzling Seaspray Emerald
  // Phase 3
  // https://tbc.wowhead.com/item=32225/dazzling-seaspray-emerald
  // +5 Intellect and +2 Mana every 5 seconds
  { name: "Dazzling Seaspray Emerald", id: 32225, color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, mp5: 2 } },

  /* ---------------------------------- Crit & Spell Penetration ---------------------------------- */
  /*{ name: "Radiant Talasite", color: "green", rarity: "rare", jewelcrafting: false, stats: { crit: 4, spellpenetration: 5 } }, // +4 crit & +5 spell penetration
  { name: "Radiant Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { crit: 5, spellpenetration: 5 } }, // +5 crit & +5 spell penetration
  { name: "Radiant Seaspray Emerald", color: "green", rarity: "epic", jewelcrafting: false, stats: { crit: 5, spellpenetration: 6 } }, // +5 crit & +6 spell penetration */

  /* --------------------------------------- Stamina & Crit --------------------------------------- */
  /*{ name: "Notched Deep Peridot", color: "green", rarity: "rare", jewelcrafting: false, stats: { stamina: 3, crit: 4 } }, // +3 stamina & +4 crit
  { name: "Polished Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { stamina: 6, crit: 5 } }, // +6 stamina & +5 crit
  /* ------------------------------------- Intellect & Stamina ------------------------------------ */
  
  // Unstable Peridot
  // Phase ?
  // https://tbc.wowhead.com/item=32635/unstable-peridot
  // +4 Intellect and +6 Stamina
  { name: "Unstable Peridot", color: "green", rarity: "rare", jewelcrafting: false, stats: { intellect: 4, stamina: 6 } },
  
  // Timeless Chrysoprase
  // Phase 1
  // https://tbc.wowhead.com/item=30583/timeless-chrysoprase
  // +5 Intellect and +6 Stamina
  { name: "Timeless Chrysoprase", color: "green", rarity: "epic", jewelcrafting: false, stats: { intellect: 5, stamina: 6 } }, // +5 intellect & +6 stamina */

  /* ------------------------------------- Intellect & Spirit ------------------------------------- */
  
  // Seer's Chrysoprase
  // Phase 1
  // https://tbc.wowhead.com/item=30586/seers-chrysoprase
  // +4 Intellect and +5 Spirit
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

  /* ------------------------------------ Healing / Spell Damage / Mana/5 ------------------------------------ */
  
  // Royal Nightseye
  // Phase 1
  // https://tbc.wowhead.com/item=24057/royal-nightseye
  // +9 Healing +3 Spell Damage and +2 Mana every 5 seconds
  { name: "Royal Nightseye", id: 24057, color: "purple", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 9, mp5: 2 } },
  
  // Royal Tanzanite
  // Phase 1
  // https://tbc.wowhead.com/item=30603/royal-tanzanite
  // +11 Healing +4 Spell Damage and 2 mana per 5 sec.
  { name: "Royal Tanzanite", id: 30603, color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 11, mp5: 2 } },
  
  // Royal Shadowsong Amethyst
  // Phase 3
  // https://tbc.wowhead.com/item=32216/royal-shadowsong-amethyst
  // +11 Healing +4 Spell Damage and +2 Mana every 5 seconds
  { name: "Royal Shadowsong Amethyst", id: 32216, color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 11, mp5: 2 } },

  /* ------------------------------------ Spell Power & Spirit ------------------------------------ */
  /*{ name: "Unstable Sapphire", color: "purple", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 10, spirit: 4 } }, // +5 spell power & +4 spirit */
  
  // Purified Shadow Pearl
  // Phase 1
  // https://tbc.wowhead.com/item=32836/purified-shadow-pearl
  // +9 Healing +3 Spell Damage and +4 Spirit
  { name: "Purified Shadow Pearl", id: 32836, color: "purple", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 9, spirit: 4 } },
  
  // Fluorescent Tanzanite
  // Phase 1
  // https://tbc.wowhead.com/item=30600/fluorescent-tanzanite
  // +6 Spell Damage and +4 Spirit
  { name: "Fluorescent Tanzanite", id: 30600, color: "purple", rarity: "epic", jewelcrafting: false, stats: { spirit: 4 } },
  
  // Imperial Tanzanite
  // Phase 1
  // https://tbc.wowhead.com/item=30572/imperial-tanzanite
  // +5 Spirit and +9 Healing +3 Spell Damage
  { name: "Imperial Tanzanite", id: 30572, color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 9, spirit: 5 } },
  
  // Purified Shadowsong Amethyst
  // Phase 3
  // https://tbc.wowhead.com/item=37503/purified-shadowsong-amethyst
  // +11 Healing +4 Spell Damage and +5 Spirit
  { name: "Purified Shadowsong Amethyst", id: 37503, color: "purple", rarity: "epic", jewelcrafting: false, stats: { bonushealing: 11, spirit: 5 } }, // +6 spell power & +5 spirit

  /* ------------------------------------ Attack Power & Mana/5 ----------------------------------- */
  /*{ name: "Infused Nightseye", color: "purple", rarity: "rare", jewelcrafting: false, stats: { attackPower: 8, mp5: 2 } }, // +6 attack power & +2 mp5
  { name: "Infused Shadowsong Amethyst", color: "purple", rarity: "epic", jewelcrafting: false, stats: { attackPower: 10, mp5: 2 } }, // +6 attack power & +2 mp5 */

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Meta Gems                                           */
  /* ---------------------------------------------------------------------------------------------- */

  { name: "Insightful Earthstorm Diamond", id: 25901, color: "meta", rarity: "rare", jewelcrafting: false, stats: { intellect: 12 }, requirements: "At least 2 red, 2 blue, 2 red gems" }, // +12 Intellect & Chance to restore mana on spellcast
  { name: "Mystical Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: {}, requirements: "Requires more blue gems than yellow" }, // Chance to Increase Spell Cast Speed
  // Swift Starfire Diamond
  // Phase 1
  // https://tbc.wowhead.com/item=28557/swift-starfire-diamond
  // +12 Spell Damage and Minor Run Speed Increase
  { name: "Swift Starfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: {}, requirements: "At least 2 yellow and 1 red gem" },
  { name: "Ember Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: {}, requirements: "Atleast 3 red gems" }, // +14 Spell Damage & +2% Intellect
  
  // Imbued Unstable Diamond
  //
  // https://tbc.wowhead.com/item=32641/imbued-unstable-diamond
  // +14 Spell Damage & 5% Stun Resistance
  { name: "Imbued Unstable Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: {}, requirements: "Atleast 3 yellow gems" },
  
  // Bracing Earthstorm Diamond
  // Phase 1
  // https://tbc.wowhead.com/item=25897/bracing-earthstorm-diamond
  // +26 Healing +9 Spell Damage and 2% Reduced Threat
  { name: "Bracing Earthstorm Diamond", id: 25897, color: "meta", rarity: "rare", jewelcrafting: false, stats: { bonushealing: 26 }, requirements: "requires more red gems than blue gems" },
  { name: "Destructive Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { crit: 14 }, requirements: "At least 2 red, 2 blue, 2 red gems" }, // +14 Spell Crit Rating and 1% Spell Reflect
  { name: "Chaotic Skyfire Diamond", color: "meta", rarity: "rare", jewelcrafting: false, stats: { crit: 12 }, requirements: "At least 2 blue gems" }, // +12 Spell Critical & 3% Increased Critical Damage
];
