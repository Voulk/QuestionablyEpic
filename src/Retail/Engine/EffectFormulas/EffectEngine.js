import { getGenericEffect, getDominationGemEffect } from "./Generic/GenericEffectFormulas";
import { getDruidSpecEffect } from "./Druid/DruidSpecEffects";
import { getDiscPriestSpecEffect } from "./Priest/DiscPriestSpecEffects";
import { getHolyPriestSpecEffect } from "./Priest/HolyPriestSpecEffects";
import { getMonkSpecEffect } from "./Monk/MonkSpecEffects";
import { getShamanSpecEffect } from "./Shaman/ShamanSpecEffects";
import { getEvokerSpecEffect } from "./Evoker/EvokerSpecEffects";
import { getPaladinSpecEffect } from "./Paladin/PaladinSpecEffects";
import { getGenericLegendary } from "./Generic/GenericLegendaryFormulas";
import { getTrinketEffect} from "./Generic/TrinketEffectFormulas";
import { getTrinketEffectClassic} from "Classic/Engine/EffectFormulas/Generic/TrinketEffectFormulasBC"
import { getGenericEffectBC} from "Classic/Engine/EffectFormulas/Generic/GenericEffectBC"
import { getEmbellishmentEffect } from "./Generic/EmbellishmentData";

import { getPriestConduit } from "./Priest/PriestConduitFormulas";
import { getPaladinConduit } from "./Paladin/PaladinConduitFormulas";
import { getShamanConduit } from "./Shaman/ShamanConduitFormulas";
import { getMonkConduit } from "./Monk/MonkConduitFormulas";
import { getDruidConduit } from "./Druid/DruidConduitFormulas";
import { getPaladinCovAbility } from "./Paladin/PaladinMiscFormulas";
import SPEC from "../../../General/Engine/SPECS";
import { getShamanCovAbility } from "./Shaman/ShamanCovenantFormulas";

import { getDruidTierSet } from "Classic/Engine/EffectFormulas/Druid/DruidTierSets";
import { getShamanTierSet } from "Classic/Engine/EffectFormulas/Shaman/ShamanTierSets";
import { getPaladinTierSet } from "Classic/Engine/EffectFormulas/Paladin/PaladinTierSets";
import { getPriestTierSet } from "Classic/Engine/EffectFormulas/Priest/PriestTierSets";

import { getDruidRelic } from "Classic/Engine/EffectFormulas/Druid/DruidRelics";
import { getShamanRelic } from "Classic/Engine/EffectFormulas/Shaman/ShamanRelics";
import { getPaladinRelic } from "Classic/Engine/EffectFormulas/Paladin/PaladinRelics";

import { getGenericSet } from "Classic/Engine/EffectFormulas/Generic/GenericSets";

// Effect is a small "dictionary" with two key : value pairs.
// The EffectEngine is basically a routing device. It will take your effect and effect type and grab the right formula from the right place.
// This allows each spec to work on spec-specific calculations without a need to interact with the other specs.
export function getEffectValue(effect, player, castModel, contentType, itemLevel = 0, userSettings, gameType = "Retail", setStats = {}) {
  let bonus_stats = {};
  if (!effect) return bonus_stats;
  
  let effectName = effect.name;
  let effectType = effect.type;

  // ----- Retail Effect -----
  // Can either be a Spec Legendary, Trinket, or a special item effect like those found back in Crucible of Storms or the legendary BFA cloak.
  if (gameType === "Retail") {
    if (effect.type === "special") {
      // A special effect is one that appears on an item slot where an effect isn't u sually expected.
      // This includes stuff like Drape of Shame that adds a crit bonus to a cape slot.
      // Does NOT include trinkets, legendaries, set bonuses etc.
      bonus_stats = getGenericEffect(effectName, player, contentType, itemLevel, setStats, castModel, userSettings);
    } 
    else if (effect.type === "embellishment") {
      bonus_stats = getEmbellishmentEffect(effectName, player, contentType, itemLevel, setStats, userSettings);
    } 
    else if (effect.type === "Onyx Annulet") {
      // The Onyx Annuluet is a 10.0.7 special effect ring.
      // It can be socketed with three special gems at a time and they often work together
      // to give different effects. We thus need to evaluate them as a whole rather than three individual pieces.
      bonus_stats = getOnyxAnnuletEffect(effectName.split(","), player, contentType, itemLevel, setStats, userSettings);
    }
    // == Class specific effects ==
    // These can be single-slot effects like Legendaries, or entire set bonuses.
    // For tier sets, 2pc and 4c should be calculated separately, but the 4pc can include the 2pc in it's valuation if 
    // there's synergy.
    else if (effectType === "set bonus" || effectType === "spec legendary") {
      switch (player.spec) {
        case "Discipline Priest":
          bonus_stats = getDiscPriestSpecEffect(effectName, player, contentType);
          break;
        case "Restoration Druid":
          bonus_stats = getDruidSpecEffect(effectName, player, contentType);
          break;
        case "Holy Priest":
          bonus_stats = getHolyPriestSpecEffect(effectName, player, contentType);
          break;
        case "Holy Paladin":
          bonus_stats = getPaladinSpecEffect(effectName, player, contentType);
          break;
        case "Mistweaver Monk":
          bonus_stats = getMonkSpecEffect(effectName, player, contentType);
          break;
        case "Restoration Shaman":
          bonus_stats = getShamanSpecEffect(effectName, player, contentType);
          break;
        case "Preservation Evoker":
          bonus_stats = getEvokerSpecEffect(effectName, player, contentType);
          break;
        default:
          break;
      }
    } 
    else if (effectType === "trinket") {
      bonus_stats = getTrinketEffect(effectName, player, castModel, contentType, itemLevel, userSettings, setStats);
      //testTrinkets(player, contentType); //TODO: Remove
    }
  }
  // -------------------------------------------

  // ----- Burning Crusade & Wrath of the Lich King Effect Formulas -----
  // Includes "Tier Set" bonuses, trinkets, and special effects on items that aren't just pure stats. 
  else if (gameType === "Classic" || gameType === "BurningCrusade") {
    if (effectType === "set bonus" && ('class' in effect && effect.class !== -1)) {
      switch (player.spec) {
        case "Holy Priest Classic":
          bonus_stats = getPriestTierSet(effectName, player);
          break;
        case "Restoration Druid Classic":
          bonus_stats = getDruidTierSet(effectName, player);
          break;
        case "Holy Paladin Classic":
          bonus_stats = getPaladinTierSet(effectName, player);
          break;
        case "Restoration Shaman Classic":
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
      bonus_stats = getTrinketEffectClassic(effectName, player, userSettings);
    }
    else if (effectType === "relic") {
      switch (player.spec) {
        case "Restoration Shaman Classic":
          bonus_stats = getShamanRelic(effectName, player, userSettings);
          break;
        case "Restoration Druid Classic":
          bonus_stats = getDruidRelic(effectName, player, userSettings);
          break;
        case "Holy Paladin Classic":
          bonus_stats = getPaladinRelic(effectName, player, userSettings);
          break;
      }

    }
    if (effect.type === "special") {
      bonus_stats = getGenericEffectBC(effectName, player, contentType);
    } 
  }
  //console.log("ITEM EFFECT" + JSON.stringify(effect) + ". " + ". Result: " + JSON.stringify(bonus_stats));
  return bonus_stats;
}

export function getConduitFormula() {

}

export function getCovAbility() {
  
}
