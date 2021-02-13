export const getDiscPriestLegendary = (effectName, player, contentType) => {
  let result = 0.0;
  let name = effectName;
  let bonus_stats = {};

  /*

    */
  if (name === "Clarity of Mind") {
    bonus_stats.HPS = 1; // This is meaningless, but will effect the display order while we wait to implement the effects.
  } else if (name === "Crystalline Reflection") {
    // Do Math
  } else if (name === "Kiss of Death") {
    // Do Math
  } else if (name === "The Penitent One") {
  } else if (name === "Cauterizing Shadows") {
  } else if (name === "Measured Contemplation") {
  } else if (name === "Twins of the Sun Priestess") {
  } else if (name === "Vault of Heavens") {
  } else {
    bonus_stats.HPS = 0;
    bonus_stats.HPS = 0;
  }

  return bonus_stats;
};
