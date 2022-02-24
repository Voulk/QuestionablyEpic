import { getSiTHPS, applyConduit } from "./FallenOrderFormulas";
import { convertPPMToUptime } from "Retail/Engine/EffectFormulas/EffectUtilities"

const ID_VIVIFY = 116670;
const ID_RENEWING_MIST = 119611;
const ID_ENVELOPING_MIST = 124682;
const ID_ESSENCE_FONT = 191840;
const ID_CHI_JI_GOM = 343819;
const ID_SOOTHING_BREATH = 343737;
const ID_ENVELOPING_BREATH_ID = 325209;

export const getMonkSpecEffect = (effectName, player, contentType) => {
  let result = 0.0;
  let name = effectName;
  let bonus_stats = {};

  if (name === "Ancient Teachings of the Monastery") {
    const essenceFontCPM = player.getSpellCPM(ID_ESSENCE_FONT, contentType);
    const dpsDuringDuration = 1250; // this is a 75% parse
    const multiplier = 2.5;
    const buffUptime = Math.min(1, (12 * essenceFontCPM) / 60); // While the buff lasts 15s, the Essence Font channel lasts 3.
    const expectedOverhealing = 0.3;
    
    bonus_stats.hps = buffUptime * multiplier * dpsDuringDuration * (1 - expectedOverhealing);
  } else if (name === "Clouded Focus") {
    // Do Math
    bonus_stats.hps = 0;
  } else if (name === "Tear of Morning") {
    const vivify = {
      cpm: player.getSpellCPM(ID_VIVIFY, contentType),
      hps: player.getSpellHPS(ID_VIVIFY, contentType),
      percentOnRemTargets: player.getSpecialQuery("percentVivifyOnRemTargets", contentType),
    };
    const envelopingMist = { cpm: player.getSpellCPM(ID_ENVELOPING_MIST, contentType), singleCast: player.getSingleCast(ID_ENVELOPING_MIST, contentType) };
    const renewingMist = {
      // might want to bump this up since people should be averaging more than 2.9
      avgStacks: 3.5, // Can be closely modelled as VivifyHits / VivifyCasts - 1
      oneSpread: player.getSingleCast(ID_RENEWING_MIST, contentType) / 2,
    }; // ReMs spread at their current duration, which means we only get half of a ReM per spread on average.

    const HPSRem = (vivify.percentOnRemTargets * renewingMist.oneSpread * vivify.cpm) / 60;
    const vivifyCleaveRatio = (0.738 * renewingMist.avgStacks) / (0.738 * renewingMist.avgStacks + 1);
    const HPSViv = vivifyCleaveRatio * vivify.hps * 0.2;

    const HPSEnv = (envelopingMist.singleCast * renewingMist.avgStacks * envelopingMist.cpm * 0.2) / 60;

    bonus_stats.hps = HPSRem + HPSViv + HPSEnv;
    
  } else if (name === "Yu'lon's Whisper") {
    const thunderFocusTeaCPM = 1.8;
    const yulonSP = 1.8;
    const yulonExpectedOverhealing = 0.22;
    const yulonTargets = { Raid: 5.9, Dungeon: 3.2 };
    const yulonOneHeal = yulonSP * player.activeStats.intellect * player.getStatMultiplier("CRITVERS")  * (1 - yulonExpectedOverhealing);

    // TODO: Add toggle for 4pc
    const t284pcsethealing = 450 * player.getStatMultiplier("CRITVERS")  * (1 - yulonExpectedOverhealing);
    //const total4pchealing = t284pcsethealing * 2 * yulonTargets[contentType] * thunderFocusTeaCPM;
    const total4pchealing = 0;

    bonus_stats.hps = ((yulonOneHeal * yulonTargets[contentType] * thunderFocusTeaCPM) + total4pchealing) / 60;
  } else if (name === "Invoker's Delight") {
    // This is an attempt to model the extra casts you get in the Celestial window against it's mana cost.
    // It is an imperfect, but solid formula for a legendary that really only should be used in niche situations.

    const celestialUptime = (0.3 * 25) / 60;
    const celestialHPS = player.getSpecialQuery("HPSDuringCelestial", contentType);
    const celestialManaCostPerSecond = 1100;

    bonus_stats.hps = (celestialHPS - celestialManaCostPerSecond * player.getSpecialQuery("OneManaHealing", contentType)) * celestialUptime * 0.33;

  } else if (name === "Sinister Teachings") {

    // Since SiT is the standard playstyle and conduit power is also tied to it
    // SiT math has been moved to a different file in order to keep the code DRY
    const netHPS = applyConduit(getSiTHPS(player, contentType), 11);
    
    bonus_stats.hps = netHPS;

  } else if (name === "Call to Arms"){
    const envbHealing = player.getSpellHPS(ID_ENVELOPING_BREATH_ID, contentType);
    const celestialDuration = .5;
    const hotDuration = .5;
    const envbHealingBoost = .05;
    // ~50% hot duration
    // ~50% of the casts
    const ctaEnvbHealing = envbHealing * celestialDuration * hotDuration;

    // Boosts all enveloping breath healing by 5%
    const healingDueToBoost = envbHealing * celestialDuration * envbHealingBoost + ctaEnvbHealing * (1 + envbHealingBoost);

    // deal with chi-ji
    // data will need to be updated to make this work
    // These are at full power so we just can assume 50% hits
    const chijiGOMHealing = player.getSpellHPS(ID_CHI_JI_GOM, contentType) * celestialDuration;
    
    bonus_stats.hps = ctaEnvbHealing + healingDueToBoost + chijiGOMHealing;
  } else if(name === "Faeline Harmony") {
    //TODO this should be rougly 2x the stomps and 2x the ef healing from stomp (all queryable)
    //TODO also look at logs find up time on 8% healing buff accross the raid
    //TODO multiply that by hps zzz

    bonus_stats.hps = -1;
  } else if (name === "Bountiful Brew") {
    //TODO apply conduit

    // 88% conduit, 25.6% uptime, 75% raid hit
    const emenibonus = player.getHPS() * (0.13 * convertPPMToUptime(1.5, 10));
    const bonedustDam = (player.getHPS() + emenibonus) * 0.5 * 0.4 * 1.88 * 0.256 * 0.75
    bonus_stats.hps = bonedustDam + emenibonus; 
  }else {
    bonus_stats.hps = -1;
  }

  return bonus_stats;
};
