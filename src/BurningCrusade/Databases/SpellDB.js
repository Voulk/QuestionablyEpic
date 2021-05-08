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
  }

  return bonus_stats;
}
