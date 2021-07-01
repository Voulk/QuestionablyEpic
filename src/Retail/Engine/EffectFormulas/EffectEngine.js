import { getGenericEffect } from "./Generic/GenericEffectFormulas";
import { getDruidLegendary } from "./Druid/DruidLegendaryFormulas";
import { getDiscPriestLegendary } from "./Priest/DiscPriestLegendaryFormulas";
import { getHolyPriestLegendary } from "./Priest/HolyPriestLegendaryFormulas";
import { getMonkLegendary } from "./Monk/MonkLegendaryFormulas";
import { getShamanLegendary } from "./Shaman/ShamanLegendaryFormulas";
import { getPaladinLegendary } from "./Paladin/PaladinLegendaryFormulas";
import { getGenericLegendary } from "./Generic/GenericLegendaryFormulas";
import { getTrinketEffect} from "./Generic/TrinketEffectFormulas";
import { getTrinketEffectBC} from "BurningCrusade/Engine/EffectFormulas/Generic/TrinketEffectFormulasBC"
import { getGenericEffectBC} from "BurningCrusade/Engine/EffectFormulas/Generic/GenericEffectBC"

import { getPriestConduit } from "./Priest/PriestConduitFormulas";
import { getPaladinConduit } from "./Paladin/PaladinConduitFormulas";
import { getShamanConduit } from "./Shaman/ShamanConduitFormulas";
import { getMonkConduit } from "./Monk/MonkConduitFormulas";
import { getDruidConduit } from "./Druid/DruidConduitFormulas";
import { getPaladinCovAbility } from "./Paladin/PaladinMiscFormulas";
import SPEC from "../../../General/Engine/SPECS";
import { getShamanCovAbility } from "./Shaman/ShamanCovenantFormulas";

import { getDruidTierSet } from "BurningCrusade/Engine/EffectFormulas/Druid/DruidTierSets";
import { getShamanTierSet } from "BurningCrusade/Engine/EffectFormulas/Shaman/ShamanTierSets";
import { getPaladinTierSet } from "BurningCrusade/Engine/EffectFormulas/Paladin/PaladinTierSets";
import { getPriestTierSet } from "BurningCrusade/Engine/EffectFormulas/Priest/PriestTierSets";

import { getDruidRelic } from "BurningCrusade/Engine/EffectFormulas/Druid/DruidRelics";
import { getShamanRelic } from "BurningCrusade/Engine/EffectFormulas/Shaman/ShamanRelics";
import { getPaladinRelic } from "BurningCrusade/Engine/EffectFormulas/Paladin/PaladinRelics";

import { getGenericSet } from "BurningCrusade/Engine/EffectFormulas/Generic/GenericSets";

// Effect is a small "dictionary" with two key : value pairs.
// The EffectEngine is basically a routing device. It will take your effect and effect type and grab the right formula from the right place.
// This allows each spec to work on spec-specific calculations without a need to interact with the other specs.
export function getEffectValue(effect, player, contentType, itemLevel = 0, userSettings, gameType = "Retail", setStats = {}) {
  let bonus_stats = {};
  const effectName = effect.name;
  const effectType = effect.type;

  


  // ----- Retail Effect -----
  // Can either be a Spec Legendary, Trinket, or a special item effect like those found back in Crucible of Storms or the legendary BFA cloak.
  if (gameType === "Retail") {
    if (effect.type === "special") {
      bonus_stats = getGenericEffect(effectName, player, contentType);
    } 
    else if (effectType === "spec legendary") {
      switch (player.spec) {
        case "Discipline Priest":
          bonus_stats = getDiscPriestLegendary(effectName, player, contentType);
          break;
        case "Restoration Druid":
          bonus_stats = getDruidLegendary(effectName, player, contentType);
          break;
        case "Holy Priest":
          bonus_stats = getHolyPriestLegendary(effectName, player, contentType);
          break;
        case "Holy Paladin":
          bonus_stats = getPaladinLegendary(effectName, player, contentType);
          break;
        case "Mistweaver Monk":
          bonus_stats = getMonkLegendary(effectName, player, contentType);
          break;
        case "Restoration Shaman":
          bonus_stats = getShamanLegendary(effectName, player, contentType);
          break;
        default:
          break;
        // Call error
      }
    } 
    else if (effectType === "generic legendary") {
      bonus_stats = getGenericLegendary(effectName, player, contentType, userSettings);
    } 
    else if (effectType === "trinket") {
      bonus_stats = getTrinketEffect(effectName, player, contentType, itemLevel, userSettings);
      //testTrinkets(player, contentType); //TODO: Remove
    }
  }
  // -------------------------------------------

  // ----- Burning Crusade Effect Formulas -----
  // Includes "Tier Set" bonuses, trinkets, and special effects on items that aren't just pure stats. 
  else if (gameType === "BurningCrusade") {
    if (effectType === "set bonus" && ('class' in effect && effect.class !== -1)) {
      switch (player.spec) {
        case "Holy Priest BC":
          bonus_stats = getPriestTierSet(effectName, player);
          break;
        case "Restoration Druid BC":
          bonus_stats = getDruidTierSet(effectName, player);
          break;
        case "Holy Paladin BC":
          bonus_stats = getPaladinTierSet(effectName, player);
          break;
        case "Restoration Shaman BC":
          bonus_stats = getShamanTierSet(effectName, player);
          break;
        default:
          break;
        // Call error
      }
    } 
    else if (effectType === "set bonus") {
      // Generic bonuses like Tailoring etc.
      bonus_stats = getGenericSet(effectName, player, setStats);
    }
    else if (effectType === "trinket") {
      bonus_stats = getTrinketEffectBC(effectName, player, userSettings);
    }
    else if (effectType === "relic") {
      switch (player.spec) {
        case "Restoration Shaman BC":
          bonus_stats = getShamanRelic(effectName, player, userSettings);
          break;
        case "Restoration Druid BC":
          bonus_stats = getDruidRelic(effectName, player, userSettings);
          break;
        case "Holy Paladin BC":
          bonus_stats = getPaladinRelic(effectName, player, userSettings);
          break;
      }

    }
    if (effect.type === "special") {
      bonus_stats = getGenericEffectBC(effectName, player, contentType);
    } 
  }
  //console.log("ITEM EFFECT" + effectName + " " + effectType + ". " + ". Result: " + JSON.stringify(bonus_stats));
  return bonus_stats;
}

function getConduitRank(itemLevel) {
  let ranks = {
    145: 1,
    158: 2,
    171: 3,
    184: 4,
    200: 5,
    213: 6,
    226: 7,
    239: 8,
    252: 9
  };

  return ranks[itemLevel];
}

export function getConduitFormula(effectID, player, contentType, itemLevel = 145) {

  let conduitRank = getConduitRank(itemLevel);
  let bonus_stats = {};

  if (effectID === 357902) {
    // % intellect increase when healed by another player. 15s duration, 30s cooldown.
    const percentInc = 0.02 + conduitRank * 0.002;
    const uptime = contentType == "Raid" ? 0.4 : 0;
    const intGain = percentInc * player.getInt() * uptime;
    bonus_stats.HPS = intGain / player.getInt() * (player.getHPS(contentType) * 0.75); // Remove this 0.75 modifier when the cast models update.
  }
  else if (effectID === 357888) {
    // Small heal based on your max health whenever you take damage. 10s cooldown.
    const percHealing = (0.25 + conduitRank * 0.025) / 100;
    const ppm = 60 / 10 * 0.85;
    bonus_stats.HPS = percHealing * ppm * player.activeStats.stamina * 20 * 1.06 / 60;
  }
  else {
    switch (player.spec) {
      case SPEC.DISCPRIEST:
      case SPEC.HOLYPRIEST:
        bonus_stats = getPriestConduit(effectID, player, contentType, conduitRank);
        break;
      case SPEC.RESTODRUID:
        bonus_stats = getDruidConduit(effectID, player, contentType, conduitRank);
        break;
      case SPEC.RESTOSHAMAN:
        bonus_stats = getShamanConduit(effectID, player, contentType, conduitRank);
        break;
      case SPEC.HOLYPALADIN:
        bonus_stats = getPaladinConduit(effectID, player, contentType, conduitRank);
        break;
      case SPEC.MISTWEAVERMONK:
        bonus_stats = getMonkConduit(effectID, player, contentType, conduitRank);
        break;
    }
  }

  return bonus_stats;
}

export function getCovAbility(soulbindName, player, contentType) {
  let bonus_stats = {};

  switch (player.spec) {
    case SPEC.DISCPRIEST:
    case SPEC.HOLYPRIEST:
      break;
    case SPEC.HOLYPALADIN:
      bonus_stats = getPaladinCovAbility(soulbindName, player, contentType);
      break;
    case SPEC.RESTOSHAMAN:
      return getShamanCovAbility(soulbindName, player, contentType);
  }

  return bonus_stats;
}
