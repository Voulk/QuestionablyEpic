import { runCastSequence, buildRamp, allRamps } from "General/Modules/Player/ClassDefaults/DiscPriestRamps";

export const getDiscPriestLegendary = (effectName, player, contentType) => {
  let result = 0.0;
  let name = effectName;
  let bonus_stats = {};

  const boonSeq = buildRamp('Boon', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])
  const fiendSeq = buildRamp('Fiend', 10, ["Divine Bell"], player.activeStats.haste, ['Rapture'])
  const discBaseline = allRamps(boonSeq, fiendSeq, player.activeStats, {"Clarity of Mind": false, "Pelagos": false}, {});

  /*

    */
  if (name === "Clarity of Mind") {
    bonus_stats.hps = player.getRampID('clarityOfMind', contentType);


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
