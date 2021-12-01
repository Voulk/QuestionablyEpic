import { runCastSequence, allRamps } from "General/Modules/Player/DiscPriest/DiscPriestRamps";
import { buildRamp } from "General/Modules/Player/DiscPriest/DiscRampGen";

export const getDiscPriestLegendary = (effectName, player, contentType) => {
  let result = 0.0;
  let name = effectName;
  let bonus_stats = {};

  /*

    */
  if (name === "Clarity of Mind") {
    bonus_stats.hps = player.getRampID('clarityOfMind', contentType);
    //bonus_stats.hps = (contentType === "Raid" ? 1000 : 0);

  } else if (name === "Crystalline Reflection") {
    // Crystalline Reflection
    // - Reflection damage doesn't proc atonement.
    // - Scales with: Intellect, Crit, Vers
    const shieldCPM = 10.5;
    const expectedOverhealing = 0.6;
    const reflectionSP = 0.42;

    bonus_stats.hps = reflectionSP * shieldCPM * (1 - expectedOverhealing) * player.getInt() * player.getStatMultiplier("CRITVERS") / 60;
    // Do Math
  } else if (name === "Kiss of Death") {
    // Do Math
  } else if (name === "The Penitent One") {
    bonus_stats.hps = player.getRampID('penitentOne', contentType);
  } else if (name === "Cauterizing Shadows") {
    // Cauterizing Shadows
    // - Scales with: Intellect, Crit, Vers
    const data = {
      ppm: 3, // This simulates a standard single target encounter.
      sp: 0.75,
      targets: 3,
      expectedOverhealing: 0.45,
    }

    bonus_stats.hps = data.ppm * data.sp * data.targets * (1 - data.expectedOverhealing) * player.getInt() * player.getStatMultiplier("CRITVERS") / 60;

  } else if (name === "Measured Contemplation") {
  } else if (name === "Twins of the Sun Priestess") {
  } else if (name === "Vault of Heavens") {
  } else {
    bonus_stats.HPS = 0;
    bonus_stats.HPS = 0;
  }

  return bonus_stats;
};
