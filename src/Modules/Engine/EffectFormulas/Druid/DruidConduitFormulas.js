import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export const getDruidConduit = (
  conduitID,
  pl,
  contentType,
  itemLevel = 156
) => {
  let bonus_stats = {};
  let conduitLevel = 1; // Convert the conduit item level to a rank.
  let expectedOverhealing = 0;

  // === Potency Conduits ===
  // Flash of Clarity
  if (conduitID === 340616) {
    bonus_stats.HPS = 999; // Placeholder tester.
  }

  // Floral Recycling
  else if (conduitID === 340621) {
    // Assumptions
    // -
    let trait_bonus = 0.36 + conduitLevel * 0.04;
    let hotConsumedAvgSP = 0.3 * 0.75; // Equal to 75% of a regrowth HoT.
    // bonus_stats.HPS = hotConsumedAvgSP * trait_bonus * (1 - expectedOverhealing) * pl.getStatMultiplier(['haste', 'crit', 'mastery', 'versatility', 'intellect']);
  }

  // Ready for Anything
  else if (conduitID === 340550) {
  }

  // Unstoppable Growth
  else if (conduitID === 340549) {
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
  else if (conduitID === 341446) {
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
