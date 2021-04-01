const IDVIVIFY = 116670;
const IDSOOTHINGBREATH = 343737;
const IDREVIVAL = 115310;
const IDFORTIFYINGBREW = 115203;
const IDGUSTOFMISTS = 191894;
const IDRENEWINGMIST = 119611;
const IDENVELOPINGMIST = 124682;
const IDESSENCEFONT = 191840;

export const getMonkLegendary = (effectName, player, contentType) => {
  let result = 0.0;
  let name = effectName;
  let bonus_stats = {};

  /*

    */
  if (name === "Ancient Teachings of the Monastery") {
    const essenceFontCPM = player.getSpellCPM(IDESSENCEFONT, contentType);
    const dpsDuringDuration = 700;
    const multiplier = 2.5;
    const buffUptime = (12 * essenceFontCPM) / 60; // While the buff lasts 15s, the Essence Font channel lasts 3.
    const expectedOverhealing = 0.3;
    
    bonus_stats.hps = buffUptime * multiplier * dpsDuringDuration * (1 - expectedOverhealing);
  } else if (name === "Clouded Focus") {
    // Do Math
    bonus_stats.hps = 0;
  } else if (name === "Tear of Morning") {
    // Do Math
    const vivify = {
      cpm: player.getSpellCPM(IDVIVIFY, contentType),
      hps: player.getSpellHPS(IDVIVIFY, contentType),
      percentOnRemTargets: player.getSpecialQuery("percentVivifyOnRemTargets", contentType),
    };
    const envelopingMist = { cpm: player.getSpellCPM(IDENVELOPINGMIST, contentType), singleCast: player.getSingleCast(IDENVELOPINGMIST, contentType) };
    const renewingMist = {
      avgStacks: 2.9, // Can be closely modelled as VivifyHits / VivifyCasts - 1
      oneSpread: player.getSingleCast(IDRENEWINGMIST, contentType) / 2,
    }; // ReMs spread at their current duration, which means we only get half of a ReM per spread on average.

    const HPSRem = (vivify.percentOnRemTargets * renewingMist.oneSpread * vivify.cpm) / 60;

    const vivifyCleaveRatio = (0.738 * renewingMist.avgStacks) / (0.738 * renewingMist.avgStacks + 1);
    const HPSViv = vivifyCleaveRatio * vivify.hps * 0.2;

    const HPSEnv = (envelopingMist.singleCast * renewingMist.avgStacks * envelopingMist.cpm * 0.2) / 60;

    bonus_stats.hps = HPSRem + HPSViv + HPSEnv;
  } else if (name === "Yu'lon's Whisper") {
    const thunderFocusTeaCPM = 1.5;
    const yulonSP = 1.8;
    const yulonExpectedOverhealing = 0.22;
    const yulonTargets = { Raid: 5.9, Dungeon: 3.2 };
    const yulonOneHeal = yulonSP * player.getStatMultiplier("CRITVERS") * player.activeStats.intellect * (1 - yulonExpectedOverhealing);

    bonus_stats.hps = (yulonOneHeal * yulonTargets[contentType] * thunderFocusTeaCPM) / 60;
  } else if (name === "Invoker's Delight") {
    // This is an attempt to model the extra casts you get in the Celestial window against it's mana cost.
    // It is an imperfect, but solid formula for a legendary that really only should be used in niche situations.

    const celestialUptime = (0.3 * 25) / 60;
    const celestialHPS = player.getSpecialQuery("HPSDuringCelestial", contentType);
    const celestialManaCostPerSecond = 1100;

    bonus_stats.hps = (celestialHPS - celestialManaCostPerSecond * player.getSpecialQuery("OneManaHealing", contentType)) * celestialUptime * 0.33;
  } else if (name === "Roll Out") {
    bonus_stats.hps = 0;
  } else {
    bonus_stats.hps = -1;
  }

  return bonus_stats;
};
