export const getDruidConduit = (conduitID, player, contentType, conduitLevel) => {
  let bonus_stats = {};
  //let conduitLevel = 6; // Convert the conduit item level to a rank.
  let expectedOverhealing = 0;

  // === Potency Conduits ===
  // Flash of Clarity
  if (conduitID === 340616) {
    let trait_bonus = 0.18 + conduitLevel * 0.02;
    let clearCastsPerMinute = 0.04 * 60; // This is boosted by our haste, but haste is already accounted for below.
    let oneRegrowth = 1.73 + 0.43;

    bonus_stats.HPS = (trait_bonus * clearCastsPerMinute * oneRegrowth * (1 - expectedOverhealing) * player.getStatMultiplier("ALL")) / 60; // Placeholder tester.
  }

  // Floral Recycling
  else if (conduitID === 340621) {
    // Assumptions
    // -
    let trait_bonus = 0.36 + conduitLevel * 0.04;
    let hotConsumedAvgSP = 0.3 * 0.75; // Equal to 75% of a regrowth HoT.
    let swiftmendsPerMinute = 3.8;
    bonus_stats.HPS = (hotConsumedAvgSP * trait_bonus * (1 - expectedOverhealing) * player.getStatMultiplier("ALL") * swiftmendsPerMinute) / 60;
  }

  // Ready for Anything
  else if (conduitID === 340550) {
    // Assumptions
    // - We assume that 10% cooldown reduction gives us 10% more Nature's Swiftness casts through the fight.
    // - We assume that these extra NS casts will be used on Regrowth, as Rebirth should be a much rarer choice.
    // - We assume that the extra NS casts aren't paired with Soul of the Forest. In most cases there is actually a negative synergy there rather than a positive one.
    // - The base regrowth is added to the formula result which automatically accounts for it being free. Mana needn't be part of the equation.
    // - Overall this is a slight overestimate and could be modified by how often they use the cooldown reduction.

    let trait_bonus = 0.09 + conduitLevel * 0.01;
    let oneNS = (1.73 + 0.43) * 2;
    bonus_stats.HPS = (trait_bonus * oneNS * (1 - expectedOverhealing) * player.getStatMultiplier("ALL")) / 60;
  }

  // Unstoppable Growth
  else if (conduitID === 340549) {
    // TODO: This is a rough trait estimate but should be fine tuned.
    // TODO: If the player is already wearing the conduit, then it should be deducted from their wild growth healing before we perform calculations.
    let trait_bonus = 0.18 + conduitLevel * 0.02;
    let wildGrowthHPS = player.getSpellHPS(48438, contentType);

    let wildGrowthPercentIncrease = trait_bonus * 0.26;
    //console.log(wildGrowthHPS);
    bonus_stats.HPS = wildGrowthHPS * wildGrowthPercentIncrease;
  }

  // Deep Allegiance (Kyrian)
  else if (conduitID === 341378) {
  }

  // Endless Thirst (Venthyr)
  else if (conduitID === 341383) {
  }

  // Evolved Swarm (Necrolord)
  else if (conduitID === 341447) {
  }

  // Conflux of Elements (Night Fae)
  // TODO: This is using a placeholder formula
  else if (conduitID === 341446) {
    let trait_bonus = 0.135 + conduitLevel * 0.015;
    let HPSDuringConvoke = 480; // PLACEHOLDER

    bonus_stats.HPS = trait_bonus * HPSDuringConvoke * (1 - expectedOverhealing);
  }

  // === Endurance Conduits ===
  // Tough as Bark
  else if (conduitID === 340529) {
  }

  // Well-Honed Instincts
  else if (conduitID === 340553) {
    let trait_bonus = 90 - conduitLevel * 6; // This is actually the cooldown on the effect. TODO: Improve the precision of the number. It's an odd one.
    let time_spent_on_cooldown = 0.5;
    let frenzied_regen_healing = player.activeStats.stamina * 20 * 0.24;

    bonus_stats.HPS = (frenzied_regen_healing * time_spent_on_cooldown) / trait_bonus;
  }

  // Ursine Vigor
  else if (conduitID === 340541) {
  }

  // Innate Resolve
  else if (conduitID === 340543) {
    let trait_bonus = 0.12 + conduitLevel * 0.012;
    let regrowth_hps = player.getSpellHPS(8936, contentType);
    let frenzied_hps = 0; //player.getSpellHPS('Frenzied Regeneration', contentType);
    let percent_self_casts = 0.04;

    bonus_stats.HPS = (regrowth_hps + frenzied_hps) * trait_bonus * percent_self_casts;
  } else if (
    /* ----------------------------------- Adaptive Armor Fragment ---------------------------------- */
    conduitID === 357902
  ) {

  } else if (
    /* ----------------------------------- Condensed Anima Sphere ----------------------------------- */
    conduitID === 357888
  ) {
  }

  // =============================

  return bonus_stats;
};
