import { convertPPMToUptime, getProcessedValue } from "../EffectUtilities";

/* ---------------------------------------------------------------------------------------------- */
/*                                         Generic Effects                                        */
/* ---------------------------------------------------------------------------------------------- */
// Generic effects (labelled "special" on the items themselves are effects attached to non-trinket items that don't fall into any other category)
// Examples include the legendary cloak, Azshara's Staff, most Crucible of Storms items and so forth.
// Shadowlands is light on them so far but we can expect to see more as the expansion progresses.

export function getEffectValue(effectName, player, contentType, itemLevel = 0) {
  let bonus_stats = {};
  let activeEffect = effect_data.find((effect) => effect.name === effectName);

  if (effectName === "Passable Credentials") {
    const effect = activeEffect.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);

  } else if (effectName === "Effect2") {
  }

  return bonus_stats;
}
