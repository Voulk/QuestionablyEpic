export const getDruidTierSet = (effectName, player) => {
  // These are going to be moved to a proper file soon.

  let result = 0.0;
  let bonus_stats = {};
  let name = effectName;

  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Malorne Raiment T4                                       */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=638/malorne-raiment
  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* ---------------------------------------- Mana Restore ---------------------------------------- */
    // https://tbc.wowhead.com/spell=37288/mana-restore
    // Your helpful spells have a chance to restore up to 120 mana. (Proc chance: 5%)
    effectName === 37288
  ) {
    bonus_stats.mp5 = 29 * 0.05 * 120 / 12; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* --------------------------------- Improved Nature's Swiftness -------------------------------- */
    // https://tbc.wowhead.com/spell=37292/improved-natures-swiftness
    // Reduces the cooldown on your Nature's Swiftness ability by 24 sec.
    effectName === 37292
  ) {
    bonus_stats.intellect = 0; // This is an ok bonus, but doesn't offer any actual healing.
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Nordrassil Raiment T5                                     */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=642/nordrassil-raiment
  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* --------------------------------------- Regrowth Bonus --------------------------------------- */
    // https://tbc.wowhead.com/spell=37313/regrowth-bonus
    // Increases the duration of your Regrowth spell by 6 sec.
    effectName === 37313
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* --------------------------------------- Lifebloom Bonus -------------------------------------- */
    // https://tbc.wowhead.com/spell=37314/lifebloom-bonus
    // Increases the final amount healed by your Lifebloom spell by 150.
    effectName === 37314
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Thunderheart Raiment T6                                    */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=678/thunderheart-raiment
  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* --------------------------------- Reduced Swiftmend Cooldown --------------------------------- */
    // https://tbc.wowhead.com/spell=38417/reduced-swiftmend-cooldown
    // Reduces the cooldown of your Swiftmend ability by 2 sec.
    effectName === 38417
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* ----------------------------------- Improved Healing Touch ----------------------------------- */
    // https://tbc.wowhead.com/spell=38420/improved-healing-touch
    // Increases the healing from your Healing Touch ability by 5%.
    effectName === 38420
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  return bonus_stats;
};
