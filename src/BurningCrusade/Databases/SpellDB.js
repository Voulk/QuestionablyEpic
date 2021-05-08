export function getSpell(effectID, player, contentType) {
  let bonus_stats = {};
  if (
    /* ---------------------------------------- Mana Regen 5% --------------------------------------- */
    /* ----------------------------------- Primal Mooncloth 3 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=32102/mana-regen-5
    // Allow 5% of your Mana regeneration to continue while casting.
    effectID === 32102
  ) {
    // Math here
  } else if (
    /* ---------------------------------- Increased Dam - Intellect --------------------------------- */
    /* ---------------------------------- Wrath of Spellfire 3 Set ---------------------------------- */
    // https://tbc.wowhead.com/item-set=552/wrath-of-spellfire
    // Increases spell damage by up to 7% of your total Intellect.
    effectID === 32196
  ) {
    // Math here
  } else if (
    /* -------------------------------------- Frozen Shadoweave ------------------------------------- */
    /* ----------------------------------- Shadow's Embrace 3 Set ----------------------------------- */
    // https://tbc.wowhead.com/item-set=553/shadows-embrace
    // Your Frost and Shadow damage spells heal you for 2% of the damage they deal.
    effectID === 39372
  ) {
    // Math here
  } else if (
    /* ------------------------------------ Increased Mana Regen ------------------------------------ */
    /* ------------------------------------ Windhawk Armor 3 Set ------------------------------------ */
    // https://tbc.wowhead.com/spell=41591/increased-mana-regen
    // Restores 8 mana per 5 sec.
    effectID === 41591
  ) {
    // Math here
  } else if (
    /* --------------------------------- Improved Prayer of Healing --------------------------------- */
    /* ----------------------------------- Incarnate Raiment 2 Set ---------------------------------- */
    // https://tbc.wowhead.com/spell=37564/improved-prayer-of-healing
    // Your Prayer of Healing spell now also causes an additional 150 healing over 9 sec.
    effectID === 37564
  ) {
    // Math here
  } else if (
    /* ------------------------------------ Greater Heal Discount ----------------------------------- */
    /* ----------------------------------- Incarnate Raiment 4 Set ---------------------------------- */
    // https://tbc.wowhead.com/spell=37568/greater-heal-discount
    // Each time you cast Flash Heal, your next Greater Heal cast within 15 sec has its casting time reduced by 0.1, stacking up to 5 times.
    effectID === 37568
  ) {
    // Math here
  } else if (
    /* ------------------------------------- Judgement of Light ------------------------------------- */
    /* ----------------------------------- Redemption Armor 2 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=28775/judgement-of-light
    // Increases the amount healed by your Judgement of Light by 20.
    effectID === 28775
  ) {
    // Math here
  } else if (
    /* ------------------------------------------ Lay Hands ----------------------------------------- */
    /* ----------------------------------- Redemption Armor 4 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=28774/lay-hands
    // Reduces cooldown on your Lay on Hands by 12 min.
    effectID === 28774
  ) {
    // Math here
  } else if (
    /* ----------------------------------------- Holy Power ----------------------------------------- */
    /* ----------------------------------- Redemption Armor 6 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=28789/holy-power
    // Your Flash of Light and Holy Light spells have a chance to imbue your target with Holy Power. (Proc chance: 10%)
    effectID === 28789
  ) {
    // Math here
  } else if (
    /* ------------------------------------------- Cleanse ------------------------------------------ */
    /* ----------------------------------- Redemption Armor 8 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=28787/cleanse
    // Your Cleanse spell also heals the target for 200.
    effectID === 28787
  ) {
    // Math here
  } else if (
    /* ------------------------------------ Lesser Spell Blasting ----------------------------------- */
    /* --------------------------------- Spellstrike Infusion 2 Set --------------------------------- */
    // https://tbc.wowhead.com/spell=32106/lesser-spell-blasting
    // Gives a chance when your harmful spells land to increase the damage of your spells and effects by 92 for 10 sec. (Proc chance: 5%)
    effectID === 32106
  ) {
    // Math here
  } else if (
    /* ---------------------------------------- Mana Restore ---------------------------------------- */
    /* ------------------------------------ Malorne Raiment 2 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=37288/mana-restore
    // Your helpful spells have a chance to restore up to 120 mana. (Proc chance: 5%)
    effectID === 37288
  ) {
    // Math here
  } else if (
    /* --------------------------------- Improved Nature's Swiftness -------------------------------- */
    /* ------------------------------------ Malorne Raiment 4 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=37292/improved-natures-swiftness
    // Reduces the cooldown on your Nature's Swiftness ability by 24 sec.
    effectID === 37292
  ) {
    // Math here
  } else if (
    /* --------------------------------- Improved Mana Spring Totem --------------------------------- */
    /* ------------------------------------ Cyclone Raiment 2 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=37210/improved-mana-spring-totem
    // Your Mana Spring Totem ability grants an additional 3 mana every 2 sec.
    effectID === 37210
  ) {
    // Math here
  } else if (
    /* --------------------------------- Improved Nature's Swiftness -------------------------------- */
    /* ------------------------------------ Cyclone Raiment 4 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=37211/improved-natures-swiftness
    // Reduces the cooldown on your Nature's Swiftness ability by 24 sec.
    effectID === 37211
  ) {
    // Math here
  } else if (
    /* ------------------------------------ Increase Spell Dam 23 ----------------------------------- */
    /* ---------------------------------- Netherstrike Armor 3 Set ---------------------------------- */
    // https://tbc.wowhead.com/spell=41828/increase-spell-dam-23
    // Increases damage and healing done by magical spells and effects by up to 23.
    effectID === 41828
  ) {
    // Math here
  } else if (
    /* -------------------------------- Increased Healing - Intellect ------------------------------- */
    /* ----------------------------------- Whitemend Wisdom 2 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=32200/increased-healing-intellect
    // Increases healing by up to 10% of your total Intellect.
    effectID === 32200
  ) {
    // Math here
  } else if (
    /* -------------------------------- Increased Judgement of Light -------------------------------- */
    /* ----------------------------------- Justicar Raiment 2 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=37182/increased-judgement-of-light
    // Increases the amount healed by your Judgement of Light by 20.
    effectID === 37182
  ) {
    // Math here
  } else if (
    /* ------------------------------------ Divine Favor Cooldown ----------------------------------- */
    /* ----------------------------------- Justicar Raiment 4 Set ----------------------------------- */
    // https://tbc.wowhead.com/spell=37183/divine-favor-cooldown
    // Reduces the cooldown on your Divine Favor ability by 15 sec.
    effectID === 37183
  ) {
    // Math here
  } else if (
    /* --------------------------------------- Totemic Energy --------------------------------------- */
    /* ---------------------------------- The Earthshatterer 2 Set ---------------------------------- */
    // https://tbc.wowhead.com/spell=28818/totemic-energy
    // Reduces the mana cost of your totem spells by 12%.
    effectID === 28818
  ) {
    // Math here
  } else if (
    /* --------------------------------------- Strong Current --------------------------------------- */
    /* ---------------------------------- The Earthshatterer 4 Set ---------------------------------- */
    // https://tbc.wowhead.com/spell=29171/strong-current
    // Increases the mana gained from your Mana Spring totems by 25%.
    effectID === 29171
  ) {
    // Math here
  } else if (
    /* ---------------------------------------- Totemic Power --------------------------------------- */
    /* ---------------------------------- The Earthshatterer 6 Set ---------------------------------- */
    // https://tbc.wowhead.com/spell=28823/totemic-power
    // Your Healing Wave and Lesser Healing Wave spells have a chance to imbue your target with Totemic Power. (Proc chance: 10%)
    effectID === 28823
  ) {
    // Math here
  } else if (
    /* -------------------------------------- Lightning Shield -------------------------------------- */
    /* ---------------------------------- The Earthshatterer 8 Set ---------------------------------- */
    // https://tbc.wowhead.com/spell=28821/lightning-shield
    // Your Lightning Shield spell also grants you 15 mana per 5 sec. while active.
    effectID === 28821
  ) {
    // Math here
  } else if (
    /* ------------------------------------- Greater Heal Refund ------------------------------------ */
    /* ------------------------------------ Avatar Raiment 2 Set ------------------------------------ */
    // https://tbc.wowhead.com/spell=37594/greater-heal-refund
    // If your Greater Heal brings the target to full health, you gain 100 mana.
    effectID === 37594
  ) {
    // Math here
  } else if (
    /* ---------------------------------- Increased Renew Duration ---------------------------------- */
    /* ------------------------------------ Avatar Raiment 4 Set ------------------------------------ */
    // https://tbc.wowhead.com/spell=26171/increased-renew-duration
    // Increases the duration of your Renew spell by 3 sec.
    effectID === 26171
  ) {
    // Math here
  } else if (
    /* ----------------------------------- Increased Resilience 35 ---------------------------------- */
    /* ---------------------------------- Kodohide Battlegear 2 Set --------------------------------- */
    // https://tbc.wowhead.com/spell=46437/increased-resilience-35
    // +35 Resilience Rating.
    effectID === 46437
  ) {
    // Math here
  } else if (
    /* --------------------------------- Restoration Regrowth Bonus --------------------------------- */
    /* ---------------------------------- Kodohide Battlegear 4 Set --------------------------------- */
    // https://tbc.wowhead.com/spell=46834/restoration-regrowth-bonus
    // The casting time on your Regrowth spell is reduced by 0.20 sec. (Proc chance: 15%, 15s cooldown)
    effectID === 46834
  ) {
    // Math here
  } else if (
    /* -------------------------------- Improved Lesser Healing Wave -------------------------------- */
    /* ----------------------------------- Cataclysm Raiment 2 Set ---------------------------------- */
    // https://tbc.wowhead.com/spell=37225/improved-lesser-healing-wave
    // Reduces the cost of your Lesser Healing Wave spell by 5%.
    effectID === 37225
  ) {
    // Math here
  } else if (
    /* ------------------------------------ Improved Healing Wave ----------------------------------- */
    /* ----------------------------------- Cataclysm Raiment 4 Set ---------------------------------- */
    // https://tbc.wowhead.com/spell=37227/improved-healing-wave
    // Your critical heals from Healing Wave, Lesser Healing Wave, and Chain Heal reduce the cast time of your next Healing Wave spell by 0.50 sec for 10 sec.  This effect cannot occur more than once per minute. (1m cooldown)
    effectID === 37227
  ) {
    // Math here
  } else if (
    /* ------------------------------- Reduced Prayer of Healing Cost ------------------------------- */
    /* -------------------------------- Vestments of Absolution 2 Set ------------------------------- */
    // https://tbc.wowhead.com/spell=38410/reduced-prayer-of-healing-cost
    // Reduces the mana cost of your Prayer of Healing ability by 10%.
    effectID === 38410
  ) {
    // Math here
  } else if (
    /* ------------------------------------ Improved Greater Heal ----------------------------------- */
    /* -------------------------------- Vestments of Absolution 4 Set ------------------------------- */
    // https://tbc.wowhead.com/spell=38411/improved-greater-heal
    // Increases the healing from your Greater Heal ability by 5%.
    effectID === 38411
  ) {
    // Math here
  }

  return bonus_stats;
}
