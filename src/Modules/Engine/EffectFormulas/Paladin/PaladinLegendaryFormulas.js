import Player from "../../../Player/Player";
import { getOneHolyPower, getAwakeningWingsUptime, getWingsHealingInc } from "./PaladinMiscFormulas";

const IDLIGHTOFDAWN = 225311;
const IDHOLYLIGHT = 82326;
const IDHOLYSHOCK = 25914;
const IDSHOCKBARRIER = 337824;
const IDWORDOFGLORY = 85673;

export const getPaladinLegendary = (effectName, player, contentType) => {
  let result = 0.0;
  let bonus_stats = {};
  let name = effectName;

  /*
    The rejuv spreading legendary can best be expressed as a percentage increase to our rejuv healing. 
    TODO: When accepting log input we will eventually have to take into account those already wearing it since it changes our formula slightly.
    */
  if (name === "Maraads Dying Breath") {
    /*
        let rejuvHealingPerc = player.getSpellHealingPerc("Rejuvenation", contentType);
        let baseTicks = 1 + (5 * player.getStatPerc("Haste"));
        let expectedTicksWithLegendary = (baseTicks / (1 - 0.02 * Math.ceil(baseTicks)));
        let rejuvHealingInc = (expectedTicksWithLegendary / baseTicks) - 1;
        let expectedHPS = Math.round(rejuvHealingInc * rejuvHealingPerc * player.getHPS());

        // Return result.
        */
    bonus_stats.hps = 5;
  } else if (name === "Shock Barrier") {

  /* 

    The swiftmend extension legendary can be valued by calculating how much extra healing we can expect out of the HoTs on the swiftmended target. 
    The general goal most of the time is to Swiftmend whichever target has your Cenarion Ward but players aren't perfect. 

    */
    // Do Math

    let holyShockIncrease = 0.2;
    let wastedShield = 0.12;
    //console.log("HSI: " + holyShockIncrease);

    bonus_stats.hps = Math.round(holyShockIncrease * 3 * (1 - wastedShield) * player.getSpellHPS(IDHOLYSHOCK, contentType));

  } else if (name === "Inflorescence of the Sunwell") {
    // Do Math
    const legendaryBonus = 0.3;
    const infusionBaseIncrease = 0.3;
    const infusionsPerMinute = player.getSpellCPM(IDHOLYSHOCK, contentType) * (player.getStatPerc("Crit") + 0.3);
    const infusionProcsUsed = 0.22;
    const oneHolyLight = player.getSingleCast(IDHOLYLIGHT, contentType);


    // Resplendent tests
    /*
        let trait_bonus =  0.036 + 5 * 0.004;
        let targets = 4.8;
        let expectedOverhealing = 0.3;

        oneHolyLight = oneHolyLight + oneHolyLight * (trait_bonus * targets * (1 - expectedOverhealing))
        */
    //

    bonus_stats.hps = Math.round((infusionsPerMinute * infusionProcsUsed * (oneHolyLight * (legendaryBonus + (infusionBaseIncrease + legendaryBonus)))) / 60);

  } else if (name === "Shadowbreaker, Dawn of the Sun") {
    const lightOfDawnCPM = player.getSpellCPM(IDLIGHTOFDAWN, contentType);
    let lightOfDawnUptime = Math.min(1, (lightOfDawnCPM * 8) / 60); // Technically doesn't account for the slight possible loss from casting LoD twice in a short period.
    let averageMasteryEff = player.getStatPerc("Mastery"); // TODO: Improve with logs data.
    let maxMasteryEff = (player.getStatPerc("Mastery") - 1) / 0.8 + 1;
    let mastDiff = maxMasteryEff / averageMasteryEff - 1;
    let percentHealingToHitTargets = 0.95;
    const HPSMasteryBonus = player.getHPS(contentType) * mastDiff * lightOfDawnUptime * percentHealingToHitTargets;

    // Calculate WoG bonus.
    const buffedWordOfGlories = lightOfDawnCPM;
    const wordOfGloryMasteryCoeff = (1+(player.getStatPerc("Mastery")-1) * 1.5) / (player.getStatPerc("Mastery"))
    const oneWordOfGloryBonus = Math.max(0, (player.getSingleCast(IDWORDOFGLORY, contentType) * wordOfGloryMasteryCoeff) - player.getSingleCast(IDLIGHTOFDAWN, contentType));
    const HPSWordOfGlory = buffedWordOfGlories * oneWordOfGloryBonus / 60;

    //console.log("MastDiff: " + mastDiff + ". LoDUptime: " + lightOfDawnUptime + "Max: " + maxMasteryEff + ". Avg: " + averageMasteryEff);

    bonus_stats.hps = Math.round(HPSMasteryBonus + HPSWordOfGlory);

  } else if (name === "Of Dusk and Dawn") {

    const offensiveBuffUptime = 0.9;
    const legendaryBonus = 0.06;

    bonus_stats.hps = Math.round(offensiveBuffUptime * legendaryBonus * player.getHPS(contentType));

  } else if (name === "Vanguards Momentum") {
    bonus_stats.hps = -1;
  } else if (name === "The Magistrates Judgment") {
    bonus_stats.hps = -1;
  } else if (name === "Maraads Dying Breath") {
    bonus_stats.hps = -1;
  } else if (name === "Relentless Inquisitor") {
    const averageStacks = 4.8;

    bonus_stats.haste = averageStacks * 33;
  } else if (name === "The Mad Paragon") {
    // Considerations
    // - Mad Paragon also itself expands the number of hammer CPM you can expect which isn't considered in the formula, which is based off our wings uptime without the legendary.
    //    - This can and will be added to the formula, but might take place after the expansion is live.
    // - Mad Paragon is incredibly GCD thirsty with added time to wings actually being less than the GCD you spend to get there. This is ok when you're cooldown capped, but is
    //   a penalty when you are not.
    let isAwakening = true;

    let wingsEffHealingIncrease = getWingsHealingInc(player.getStatPerc("Crit"));
    let wingsBaseUptime = (20 + (isAwakening ? 25 : 0)) / 120;
    let hammerOfWrathCPM = (60 / (7.5 / player.getStatPerc("Haste"))) * wingsBaseUptime;
    let healingIncUptime = hammerOfWrathCPM / 60;

    let healingMult = wingsEffHealingIncrease * healingIncUptime + 1 * (1 - healingIncUptime) - 1;
    bonus_stats.hps = Math.round(player.getHPS(contentType) * healingMult);

    //console.log("FWS: " + wingsEffHealingIncrease);
    // This technically needs to be increased based on the wings duration increase, but that is of minimal benefit.
    bonus_stats.DPS = (1.2 * 0.3 * player.getStatMultiplier("ALL") * hammerOfWrathCPM) / 60;

    //let akn = 2.5 / 60; //getAwakeningWingsUptime(player, contentType);
    //let awakening_hps = (akn * wingsEffHealingIncrease + 1 * (1 - akn) );
    //console.log("Wings Uptime: " + akn + ". Awakening healing increase:" + awakening_hps);
  }

  // Consider building in support for the conduit via SimC grab or something similar.
  else {
    bonus_stats.hps = -2;
    bonus_stats.hps = -2;
  }

  return bonus_stats;
};
