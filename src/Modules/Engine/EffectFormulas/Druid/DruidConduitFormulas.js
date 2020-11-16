

export const getDruidConduit = (
  conduitID,
  pl,
  contentType,
  itemLevel = 156
) => {

  let bonus_stats = {};
  let conduitLevel = 6; // Convert the conduit item level to a rank.
  let expectedOverhealing = 0;

  // === Potency Conduits ===
  // Flash of Clarity
  if (conduitID === 340616) {
    let trait_bonus = 0.18 + conduitLevel * 0.02;
    let clearCastsPerMinute = 0.04 * 60; // This is boosted by our haste, but haste is already accounted for below. 
    let oneRegrowth = 1.73 + 0.43;

    bonus_stats.HPS = trait_bonus * clearCastsPerMinute * oneRegrowth * (1 - expectedOverhealing) * pl.getStatMultiplier('ALL') / 60; // Placeholder tester.
  }

  // Floral Recycling
  else if (conduitID === 340621) {
    // Assumptions
    // -
    let trait_bonus = 0.36 + conduitLevel * 0.04;
    let hotConsumedAvgSP = 0.3 * 0.75; // Equal to 75% of a regrowth HoT.
    let swiftmendsPerMinute = 3.8;
    bonus_stats.HPS = hotConsumedAvgSP * trait_bonus * (1 - expectedOverhealing) * pl.getStatMultiplier('ALL') * swiftmendsPerMinute / 60;
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
    bonus_stats.HPS = trait_bonus * oneNS * (1 - expectedOverhealing) * pl.getStatMultiplier('ALL') / 60;


  }

  // Unstoppable Growth
  else if (conduitID === 340549) {
    // TODO: This is a rough trait estimate but should be fine tuned. 
    // TODO: If the player is already wearing the conduit, then it should be deducted from their wild growth healing before we perform calculations.
    let trait_bonus = 0.18 + conduitLevel * 0.02;
    let wildGrowthHPS = pl.getSpellHPS("Wild Growth", contentType);

    let wildGrowthPercentIncrease = (trait_bonus * 0.26);

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

  // Ursine Vigor
  else if (conduitID === 340541) {
  }

  // Innate Resolve
  else if (conduitID === 340543) {
  }

  // =============================

  return bonus_stats;
};
