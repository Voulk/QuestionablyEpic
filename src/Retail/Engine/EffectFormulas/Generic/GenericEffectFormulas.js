import { convertPPMToUptime, getProcessedValue } from "../EffectUtilities";
import { effectData} from "./EffectData";

/* ---------------------------------------------------------------------------------------------- */
/*                                         Generic Effects                                        */
/* ---------------------------------------------------------------------------------------------- */
// Generic effects (labelled "special" on the items themselves are effects attached to non-trinket items that don't fall into any other category)
// Examples include the legendary cloak, Azshara's Staff, most Crucible of Storms items and so forth.
// Shadowlands is light on them so far but we can expect to see more as the expansion progresses.

export function getGenericEffect(effectName, player, contentType, itemLevel = 0) {
  let bonus_stats = {};
  let activeEffect = effectData.find((effect) => effect.name === effectName);

  if (effectName === "Passable Credentials") {
    const effect = activeEffect.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);

  } else if (effectName === "Effect2") {
  }

  return bonus_stats;
}

export function getDominationGemEffect(effectName, player, contentType, rank) {
  let bonus_stats = {};
  let activeEffect = effectData.find((effect) => effect.name === effectName);

  if (effectName === "Shard of Zed") {
    const effect = activeEffect.effects[0];
    const throughput = Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 0, 1, false)) * effect.ppm * 5 * effect.expectedTargets[contentType] / 60
    bonus_stats.hps = throughput;
    bonus_stats.dps = throughput;

  }
  else if (effectName === "Shard of Rev") {
    const effect = activeEffect.effects[0];
    const leech = Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))
    bonus_stats.leech = leech;

  }
  else if (effectName === "Shard of Kyr") {
    const effect = activeEffect.effects[0];
    const absorb = Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))
    bonus_stats.hps = absorb * effect.ppm / 60;

  } 
  else if (effectName === "Shard of Tel") {
    const effect = activeEffect.effects[0];
    const absorb = Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))
    bonus_stats.hps = absorb * effect.ppm * (1 - effect.expectedWastage) / 60;

  } else if (effectName === "Effect2") {

  }

  else if (effectName === "Blood Link") {
    const effect = activeEffect.effects[0];
    const value = Math.round(getProcessedValue(effect.coefficient, effect.table, 174, 1, false)) * player.getStatPerc("Vers") * player.getStatPerc("Crit")
    console.log("Raw: " + getProcessedValue(effect.coefficient, effect.table, 174, 1, false));
    bonus_stats.hps = value * effect.ppm * (1 - effect.expectedOverhealing) * player.getStatPerc("Vers") / 60; // The healing effect basically scales with Vers twice.
    bonus_stats.dps = value * effect.ppm / 60;
    console.log(bonus_stats.hps);

  }

  return bonus_stats;
}
