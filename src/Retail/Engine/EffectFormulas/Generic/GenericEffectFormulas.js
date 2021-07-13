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
    const expectedOverhealing = 0.4;
    const dpsWastage = 0.3;
    const throughput = Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 0, 1, false)) * effect.ppm * 5 * effect.expectedTargets[contentType] / 60
    bonus_stats.hps = throughput * (1 - expectedOverhealing);
    bonus_stats.dps = throughput * (1 - dpsWastage);

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
    bonus_stats.hps = absorb * effect.ppm[player.getSpec()] * (1 - effect.expectedWastage) / 60;

  } else if (effectName === "Effect2") {

  }

  else if (effectName === "Blood Link") {
    const effect = activeEffect.effects[0];
    const value = Math.round(getProcessedValue(effect.coefficient, effect.table, 174, 1, false)) * player.getStatPerc("Vers") * player.getStatPerc("Crit")
    bonus_stats.hps = value * effect.ppm * (1 - effect.expectedOverhealing) * player.getStatPerc("Vers") / 60; // The healing effect basically scales with Vers twice.
    bonus_stats.dps = value * effect.ppm / 60;

  }

  else if (effectName === "Winds of Winter") {
    // This requires a specific log query, so is using close-to-accurate placeholders for now.
    const effect = activeEffect.effects[0];
    let playerCrit = player.getStatPerc("Crit") - 1; 
    if (player.getSpec() === "Holy Paladin") playerCrit += (0.2*20/120 + 0.2*3/120);
    const critHealingPerc = ((playerCrit * 2) / (1 - playerCrit + playerCrit * 2));
    
    bonus_stats.dps = player.getStatPerc("Vers") * critHealingPerc * 0.06 * effect.specOvercap[player.getSpec()] * effect.specAbilitiesThatWork[player.getSpec()] * (player.getRawHPS(contentType) + player.getDPS(contentType));
    bonus_stats.hps = bonus_stats.dps;
  }
  else if (effectName === "Chaos Bane") {
    // This requires a specific log query, so is using close-to-accurate placeholders for now.
    const stackingEffect = activeEffect.effects[0];
    const bigProc = activeEffect.effects[1];

    const stackingIntGain = getProcessedValue(stackingEffect.coefficient, stackingEffect.table, 174, 1, true)
    const bigProcIntGain = getProcessedValue(bigProc.coefficient, bigProc.table, 174, 1, true)

    const intGain = (14 / 2 * stackingIntGain) + (bigProcIntGain * 15 / (60 / stackingEffect.ppm * 15))
    
    bonus_stats.intellect = intGain;
    bonus_stats.dps = intGain / player.getInt() * player.getDPS(contentType);
  }
  else if (effectName === "Shard of Dyz") {
    const effect = activeEffect.effects[0];

    const damageIncrease = Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))
    const stacks = effect.stacks;
    bonus_stats.dps = damageIncrease * player.getDPS(contentType) * stacks / 100 / 100; // Divided by 10,000 effectively.
  }
  else if (effectName === "Shard of Cor") {
    const effect = activeEffect.effects[0];

    const damageIncrease = Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))
    const uptime = effect.uptime[contentType];
    bonus_stats.dps = damageIncrease * player.getDPS(contentType) * uptime / 100 / 100; // Divided by 10,000 effectively.

  }
  else if (effectName === "Shard of Bek") {
    const effect = activeEffect.effects[0];

    const damageIncrease = Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false))
    const uptime = effect.uptime;
    bonus_stats.dps = damageIncrease * player.getDPS(contentType) * uptime / 100 / 100; // Divided by 10,000 effectively.

  }


  return bonus_stats;
}
