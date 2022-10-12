export const getPriestTierSet = (effectName, player) => {
  // These are going to be moved to a proper file soon.

  let result = 0.0;
  let bonus_stats = {};
  let name = effectName;

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Incarnate Raiment T4                                      */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=663/incarnate-raiment

  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* --------------------------------- Improved Prayer of Healing --------------------------------- */
    // https://tbc.wowhead.com/spell=37564/improved-prayer-of-healing
    // Your Prayer of Healing spell now also causes an additional 150 healing over 9 sec.
    effectName === 37564
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* ------------------------------------ Greater Heal Discount ----------------------------------- */
    // https://tbc.wowhead.com/spell=37568/greater-heal-discount
    // Each time you cast Flash Heal, your next Greater Heal cast within 15 sec has its casting time reduced by 0.1, stacking up to 5 times.
    effectName === 37568
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Avatar Raiment T5                                       */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=665/avatar-raiment

  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* ------------------------------------- Greater Heal Refund ------------------------------------ */
    // https://tbc.wowhead.com/spell=37594/greater-heal-refund
    // If your Greater Heal brings the target to full health, you gain 100 mana.
    effectName === 37594
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* ---------------------------------- Increased Renew Duration ---------------------------------- */
    // https://tbc.wowhead.com/spell=26171/increased-renew-duration
    // Increases the duration of your Renew spell by 3 sec.
    effectName === 26171
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Vestments of Absolution                                    */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=675/vestments-of-absolution

  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* ------------------------------- Reduced Prayer of Healing Cost ------------------------------- */
    // https://tbc.wowhead.com/spell=38410/reduced-prayer-of-healing-cost
    // Reduces the mana cost of your Prayer of Healing ability by 10%.
    effectName === 38410
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* ------------------------------------ Improved Greater Heal ----------------------------------- */
    // https://tbc.wowhead.com/spell=38411/improved-greater-heal
    // Increases the healing from your Greater Heal ability by 5%.
    effectName === 38411
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }
  return bonus_stats;
};
