import { convertPPMToUptime, getProcessedValue } from "../EffectUtilities";
import { effectData} from "./EffectData";
import { embellishmentData } from "./Embellishments/EmbellishmentData";

/* ---------------------------------------------------------------------------------------------- */
/*                                         Generic Effects                                        */
/* ---------------------------------------------------------------------------------------------- */
// Generic effects (labelled "special" on the items themselves are effects attached to non-trinket items that don't fall into any other category)
// Examples include the legendary cloak, Azshara's Staff, most Crucible of Storms items and so forth.
// Dragonflight opened with a few, but there will be more over the expansion.

export function getGenericEffect(effectName, itemLevel, additionalData) {
  let bonus_stats = {};
  
  //let additionalData = {contentType: contentType, settings: userSettings, setStats: setStats, castModel: castModel, player: player, setVariables: setVariables};

  /* -------- Trinket Data holds a trinkets actual power values. Formulas here, data there. ------- */
  const effectsData = effectData.concat(embellishmentData/*, timewalkTrinketData*/)
  let activeEffect = effectsData.find((effect) => effect.name === effectName);


  if (activeEffect !== undefined) {
    return activeEffect.runFunc(activeEffect.effects, additionalData.player, itemLevel, additionalData);
  }
  else {
    return {};
  }

  /*

  if (effectName === "Passable Credentials") {
    const effect = activeEffect.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);

  } 
  if (effectName === "Neural Synapse Enhancer") {
    const effect = activeEffect.effects[0];

    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * effect.duration / effect.cooldown;

  } 
  if (effectName === "Drape of Shame") {
    const effect = 2.03;
    const crit = player.getStatPerc("Crit") + (player.getSpec() === "Holy Paladin" ? 0.16: 0) - 1;
    const healingIncrease = ((1 - crit) + (crit * effect)) / ((1 - crit) + (crit * 2)) - 1

    bonus_stats.hps = player.getHPS(contentType) * healingIncrease;

  } 
  else if (effectName === "Antumbra, Shadow of the Cosmos") {
    const effect = activeEffect.effects[0];

    if (player.getSpec() === "Discipline Priest") {
      
      bonus_stats.versatility = Math.round(getProcessedValue(effect.coefficient, effect.table, itemLevel, 1, false) * effect.avgStacks);
    }
    else {
      bonus_stats.versatility = Math.round(getProcessedValue(effect.coefficient, effect.table, itemLevel, 1, false) * (effect.avgStacks * 0.7)); 
      // This needs more analysis around holding stacks. A 30% penalty is almost certainly too harsh.
    }
    

  } 
  else if (effectName === "Antumbra, Shadow of the Cosmos (19)") {
    activeEffect = effectData.find((effect) => effect.name === "Antumbra, Shadow of the Cosmos");
    const effect = activeEffect.effects[0];

    if (player.getSpec() === "Discipline Priest") {
      // Unfortunately Disc is not able to benefit from the 19 stack strategy as their healing requires that they DPS.
      bonus_stats.versatility = Math.round(getProcessedValue(effect.coefficient, effect.table, itemLevel, 1, false) * effect.avgStacks);
    }
    else {
      bonus_stats.versatility = Math.round(getProcessedValue(effect.coefficient, effect.table, itemLevel, 1, false) * 19);
    } 
  } 
  else if (effectName === "Soulwarped Seal of Wrynn") {
    const effect = activeEffect.effects[0];
    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel) * convertPPMToUptime(effect.ppm, effect.duration);

  } 
  else if (effectName === "Sepulcher's Savior") {
    const effect = activeEffect.effects[0];
    bonus_stats.hps = getProcessedValue(effect.coefficient, effect.table, itemLevel) * player.getStatPerc("versatility") / effect.cooldown;

  } 
  else if (effectName === "Rebooting Bit Band") { // TODO: Split it's proc rate by proc ring.
    const effect = activeEffect.effects[0];
    const oneHeal = getProcessedValue(effect.coefficient, effect.table, effectNotes.ilvl)
    const ppm = effectNotes.ppm; 

    bonus_stats.hps =  oneHeal * effect.targets * ppm * player.getStatPerc("versatility") * player.getStatPerc("crit") * (1 - effect.expectedOverhealing) / 60;

  } 
  else if (effectName === "Overclocking Bit Band") { // TODO: Split it's proc rate by proc ring.
    const effect = activeEffect.effects[0];
    const hasteBuff = getProcessedValue(effect.coefficient, effect.table, effectNotes.ilvl)
    const uptime = effectNotes.ppm * 15 / 60; 

    bonus_stats.haste =  hasteBuff * uptime;
  } 
  else if (effectName === "Cosmic Protoweave") {
    const effect = activeEffect.effects[0];
    bonus_stats.hps = getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) * player.getStatPerc("haste") * player.getStatPerc("versatility") * player.getStatPerc("crit") * effect.ppm / 60;
  }
  else if (effectName === "Ephemera Harmonizing Stone") {
    const effect = activeEffect.effects[0];
    bonus_stats.intellect = getProcessedValue(effect.coefficient, effect.table, itemLevel, effect.efficiency) * convertPPMToUptime(effect.ppm, effect.duration);
  } 
  else if (effectName === "Genesis Lathe") {

    // These can be verified after logs start coming in but are based on frequency of casts. 
    const ppm = {"Preservation Evoker": 0, "Restoration Druid": 1.9, "Holy Paladin": 0.3, "Mistweaver Monk": 0.52, "Restoration Shaman": 1.35, "Holy Priest": 1.85, "Discipline Priest": 1.08}
    const effects = activeEffect.effects;
    let expectedHPS = 0;
    
    for (var i = 0; i < effects.length; i++) {
      const effect = effects[i];
      // TODO: Check secondary scaling in effect.
      const effectValue = getProcessedValue(effect.coefficient, -8, itemLevel) * effect.ticks * player.getStatPerc("Versatility") * player.getStatPerc("Crit") 
      expectedHPS += (effectValue * effect.percProcs);
    }

    //console.log(getProcessedValue(0.436328, -7, itemLevel)) // Tertiary effect. Not implemented, likely won't be but it makes up a small portion of the power budget. 
    bonus_stats.hps = expectedHPS * ppm[player.getSpec()] / 60 * 0.95;
  }

  return bonus_stats;
  */
}

export function getDominationGemEffect(effectName, player, contentType, rank) {
  let bonus_stats = {};
  //let activeEffect = effectData.find((effect) => effect.name === effectName);

  return bonus_stats;

  /*
  if (effectName === "Shard of Zed") {
    const effect = activeEffect.effects[0];
    const expectedOverhealing = 0.5;
    const dpsWastage = 0.4;
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

  // Blood Link scales with crit and versatility, but not haste.
  else if (effectName === "Blood Link" && contentType === "Raid") {
    const effect = activeEffect.effects[0];
    const value = Math.round(getProcessedValue(effect.coefficient[rank], effect.table, 174, 1, false)) * player.getStatPerc("Vers") * player.getStatPerc("Crit")
    bonus_stats.hps = value * effect.ppm * (1 - effect.expectedOverhealing) / 60;
    bonus_stats.dps = value * effect.ppm / 60;
    
  }

  else if (effectName === "Winds of Winter" && contentType === "Raid") {
    // This requires a specific log query, so is using close-to-accurate placeholders for now.
    const effect = activeEffect.effects[0];
    let playerCrit = player.getStatPerc("Crit") - 1; 
    if (player.getSpec() === "Holy Paladin") playerCrit += (0.3*0.56 + 0.2*3/120); // Wings represents a 30% crit increase during a period of time where over half of our healing takes place.
    const critHealingPerc = ((playerCrit * 2) / (1 - playerCrit + playerCrit * 2));
    const effectiveThroughput = (player.getHPS(contentType) + player.getDPS(contentType)) * effect.specAbilitiesThatWork[player.getSpec()]
    const failureChance = 0.1; // Winds of Winter will sometimes just not proc at all, losing you the damage.
    
    let baseThroughput = player.getStatPerc("Vers")  * critHealingPerc * effect.stored[rank] * effect.specOvercap[player.getSpec()] * (1 - failureChance) * effectiveThroughput;

    // Kyrian Paladin
    if (player.getSpec() === "Holy Paladin" && player.getCovenant() === "kyrian") baseThroughput = baseThroughput * 0.5;
    // Replace this with the model updates later this week.

    bonus_stats.hps = baseThroughput * (1 - effect.expectedOverhealing);
    bonus_stats.dps = baseThroughput * player.getStatPerc("Crit"); // Winds of Winter critting doesn't appear to funnel back to it's absorb but further analysis is required.

    
  }
  else if (effectName === "Chaos Bane" && contentType === "Raid") {
    // This requires a specific log query, so is using close-to-accurate placeholders for now.
    const stackingEffect = activeEffect.effects[0];
    const bigProc = activeEffect.effects[1];

    const stackingIntGain = getProcessedValue(stackingEffect.coefficient[rank], stackingEffect.table, 174, 1, true)
    const bigProcIntGain = getProcessedValue(bigProc.coefficient[rank], bigProc.table, 174, 1, true)

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

  } */


  return bonus_stats;
}
