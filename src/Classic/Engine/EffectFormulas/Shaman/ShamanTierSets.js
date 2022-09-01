export const getShamanTierSet = (effectName, player) => {
  // These are going to be moved to a proper file soon.

  let result = 0.0;
  let bonus_stats = {};
  let name = effectName;

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Cyclone Raiment T4                                       */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=631/cyclone-raiment

  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* --------------------------------- Improved Mana Spring Totem --------------------------------- */
    // https://tbc.wowhead.com/spell=37210/improved-mana-spring-totem
    // Your Mana Spring Totem ability grants an additional 3 mana every 2 sec.
    effectName === 37210
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* --------------------------------- Improved Nature's Swiftness -------------------------------- */
    // https://tbc.wowhead.com/spell=37211/improved-natures-swiftness
    // Reduces the cooldown on your Nature's Swiftness ability by 24 sec.
    effectName === 37211
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Cataclysm Raiment T5                                      */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=634/cataclysm-raiment

  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* -------------------------------- Improved Lesser Healing Wave -------------------------------- */
    // https://tbc.wowhead.com/spell=37225/improved-lesser-healing-wave
    // Your Mana Spring Totem ability grants an additional 3 mana every 2 sec.
    effectName === 37225
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* ------------------------------------ Improved Healing Wave ----------------------------------- */
    // https://tbc.wowhead.com/spell=37227/improved-healing-wave
    // Your critical heals from Healing Wave, Lesser Healing Wave, and Chain Heal reduce the cast time of your next Healing Wave spell by 0.50 sec for 10 sec.
    // This effect cannot occur more than once per minute. (1m cooldown)
    effectName === 37227
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Skyshatter Raiment T6                                     */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=683/skyshatter-raiment

  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* ------------------------------------- Chain Heal Discount ------------------------------------ */
    // https://tbc.wowhead.com/spell=38434/chain-heal-discount
    // Your Chain Heal ability costs 10% less mana.
    effectName === 38434
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* ------------------------------------- Improved Chain Heal ------------------------------------ */
    // https://tbc.wowhead.com/spell=38435/improved-chain-heal
    // Increases the amount healed by your Chain Heal ability by 5%.
    effectName === 38435
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  return bonus_stats;
};
