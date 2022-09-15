export const getPaladinTierSet = (effectName, player) => {
  // These are going to be moved to a proper file soon.

  let bonus_stats = {};
  let name = effectName;
  /* ---------------------------------------------------------------------------------------------- */
  /*                                       Justicar Raiment T4                                      */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=624/justicar-raiment

  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* -------------------------------- Increased Judgement of Light -------------------------------- */
    // https://tbc.wowhead.com/spell=37182/increased-judgement-of-light
    // Increases the amount healed by your Judgement of Light by 20.
    effectName === 37182
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* ------------------------------------ Divine Favor Cooldown ----------------------------------- */
    // https://tbc.wowhead.com/spell=37183/divine-favor-cooldown
    // Reduces the cooldown on your Divine Favor ability by 15 sec.
    effectName === 37183
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Crystalforge Raiment T5                                    */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=627/crystalforge-raiment

  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* ------------------------------------- Improved Judgement ------------------------------------- */
    // https://tbc.wowhead.com/spell=37188/improved-judgement
    // Each time you cast a Judgement, your party members gain 50 mana.
    effectName === 37188
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* -------------------------------- Recuced Holy Light Cast Time -------------------------------- */
    // https://tbc.wowhead.com/spell=37189/recuced-holy-light-cast-time
    // Your critical heals from Flash of Light and Holy Light reduce the cast time of your next Holy Light spell by 0.50 sec for 10 sec.
    // This effect cannot occur more than once per minute. (1m cooldown)
    effectName === 37189
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                     Lightbringer Raiment T6                                    */
  /* ---------------------------------------------------------------------------------------------- */
  // https://tbc.wowhead.com/item-set=681/lightbringer-raiment
  if (
    /* -------------------------------------------- 2 Set ------------------------------------------- */
    /* --------------------------------------- Holy Light Crit -------------------------------------- */
    // https://tbc.wowhead.com/spell=38426/holy-light-crit
    // Increases the critical strike chance of your Holy Light ability by 5%.
    effectName === 38426
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  if (
    /* -------------------------------------------- 4 Set ------------------------------------------- */
    /* ----------------------------------- Improved Flash of Light ---------------------------------- */
    // https://tbc.wowhead.com/spell=38425/improved-flash-of-light
    // Increases the healing from your Flash of Light ability by 5%.
    effectName === 38425
  ) {
    bonus_stats.intellect = 0; // PH TODO
  }

  return bonus_stats;
};
