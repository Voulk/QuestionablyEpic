import { runCastSequence, buildRamp, allRamps } from "General/Modules/Player/ClassDefaults/DiscPriestRamps";

export const getDiscPriestLegendary = (effectName, player, contentType) => {
  let result = 0.0;
  let name = effectName;
  let bonus_stats = {};

  /*

    */
  if (name === "Clarity of Mind") {
    //bonus_stats.hps = player.getRampID('clarityOfMind', contentType);
    bonus_stats.hps = (contentType === "Raid" ? 1000 : 0);

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
