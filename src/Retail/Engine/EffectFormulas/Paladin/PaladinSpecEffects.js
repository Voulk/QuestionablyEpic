import Player from "../../../../General/Modules/Player/Player";
import { getOneHolyPower, getAwakeningWingsUptime, getWingsHealingInc, processPaladinRawHealing, getPaladinCovAbility } from "./PaladinMiscFormulas";

/* ------------------------------------- Paladin Spell ID's ------------------------------------- */
const IDLIGHTOFDAWN = 225311;
const IDHOLYLIGHT = 82326;
const IDHOLYSHOCK = 25914;
const IDSHOCKBARRIER = 337824;
const IDWORDOFGLORY = 85673;
const IDMARTYR = 183998;

export const getPaladinSpecEffect = (effectName, player, contentType) => {
  let bonus_stats = {};
  const holyShockBaseCPM = 60 / 9.5 * player.getStatPerc("Haste") * 1.12 * 1.1;
  const holyShockCPM = holyShockBaseCPM + (5 + 4 + 2 + 3) * 60/60; // Holy Shock raw + Divine Toll / Rising Sunlight

  // These will be replaced by the CastProfile. This is a fairly rough estimate as a result.
  if (effectName === "Paladin S1-2") {
    
    const reclamation = 1.3
    const oneHolyShock = 2.26 * player.getStatMultiplier("ALL") * processPaladinRawHealing(player.getStatPerc("Crit")) * 0.85 * 1.2 * 1.12 * reclamation * (0.3 * 0.15 + 1) * 1.1;

    // 10% more Holy Shock Healing
    bonus_stats.hps = oneHolyShock * holyShockCPM * 0.11; // Include additional healing on extra casts
    
    // 10% more Holy Shocks
    bonus_stats.hps += getOneHolyPower(player) * holyShockBaseCPM * 0.1;
    bonus_stats.hps += oneHolyShock * holyShockBaseCPM * 0.1;

    bonus_stats.hps /= 60 * 1.45;

  }
  else if (effectName === "Paladin S1-4") {
    // We're unlikely to cap this, so every holy shock is basically just 8% of a spender.
    bonus_stats.hps = getOneHolyPower(player) * holyShockCPM * 0.08 * 3 / 60 * 1.4;
  }
  else if (effectName === "Paladin T31-2") {
    // 
    const holyShockCPM = 15 + (5 + 4) * 60/60; // Holy Shock raw + Divine Toll / Rising Sunlight
    const oneReverb = 1.08 * player.getStatMults(["intellect", "versatility", "crit", "mastery"]) * 0.65
    console.log(holyShockCPM * oneReverb / 60)
    bonus_stats.hps = holyShockCPM * oneReverb / 60;

  }
  else if (effectName === "Paladin T31-4") {
    // Placeholder pulled from sheet. Replace very soon.
    const daybreakData = 0;
    const oneDaybreak = 0;
    
    bonus_stats.hps = 9200;
    bonus_stats.haste = 0;

  }

  else if (effectName === "Paladin T30-2") {
    // Placeholder pulled from sheet. Replace very soon.
    const holyShockCPM = 15 + (5 + 4) * 60/45; // Holy Shock raw + Divine Toll / Rising Sunlight
    const critChance = player.getStatPerc("Crit") + 0.075 - 1; // HS crit bonus
    const relativeHPSIncrease = (critChance * 2.8 + (1-critChance))  / (critChance * 2 + (1-critChance));
    const oneHolyShock = 1.53 * player.getStatMultiplier("ALL") * 3.15 * processPaladinRawHealing(player.getStatPerc("Crit")) * 0.5;
    bonus_stats.hps = oneHolyShock * (relativeHPSIncrease - 1) * holyShockCPM / 60;
    //bonus_stats.hps = 9000;

  }
  else if (effectName === "Paladin T30-4") {
    // Placeholder pulled from sheet. Replace very soon.
    const lightsHammerCPM = 2;
    const oneLightsHammer = 0.48 * 6 * 7 * player.getStatMultiplier("ALL") * processPaladinRawHealing(player.getStatPerc("Crit")) * 0.7;
    const healingIncrease = 1; // Adds an amount equal to the original LH.

    bonus_stats.hps = oneLightsHammer * lightsHammerCPM * healingIncrease / 60;


  }

  else if (effectName === "Paladin T29-2") {
    // +8% crit to almost everything that matters.
    const percentEffected = 1; // TODO: Auto-calc this.
    bonus_stats.crit = 4 * percentEffected * 170;

  }
  else if (effectName === "Paladin T29-4") {
    // Flat healing portion
    const percentBuffed = 0.55;
    bonus_stats.hps = (percentBuffed * 0.06 * player.getHPS(contentType))

    // Holy Shock portion
    const percHolyShockAffected = 0.74;
    const tierBoost = 0.2;
    const holyShockPerc = 0.18;

    bonus_stats.hps += (percHolyShockAffected * tierBoost * holyShockPerc * player.getHPS(contentType))

  }
  // Tier Sets
  else if (effectName === "Paladin T28-2") {
    // Holy Paladin Sepulcher tier set 2pc
    // Casting Word of Glory causes your next Light of Dawn to heal for 50% more and cast twice. Cannot occur more often than once per 30 sec.
    // This is an INCREDIBLY strong 2pc bonus.
    
    let freeCasts = {lightOfDawn: 0, wordOfGlory: 0}

    if (player.getCovenant() === "necrolord") {
      // Necrolord
      // Without 2pc you would cast two Word of Glories (each proccing a free LoD at 1.25x power). 2 WoG, 2.5 LoD.
      // With 2pc you would cast two Word of Glories again. The first is worth 3.75x Free LoDs (1.87 x 2) and the second is 1.25x free LoDs.
      // The total gain is 2.5 Light of Dawn casts. Slightly more valuable than for other covenants.
      freeCasts.lightOfDawn = 2.5;
    }
    else {
      // Venthyr / Kyrian
      // Without 2pc you would cast Light of Dawn twice over two spenders.
      // with 2pc you would cast one Word of Glory and two Light of Dawns at +50% power. 
      // This is a net gain of 1x Word of Glory and 1x Light of Dawn.
      freeCasts.lightOfDawn = 1;
      freeCasts.wordOfGlory = 1;
    }

    // Calculate value of the free casts.
    const oneWordOfGlory = player.getStatMultiplier("ALL") * 3.15 * processPaladinRawHealing(player.getStatPerc("Crit")) * 0.7;
    const oneLightOfDawn = player.getStatMultiplier("ALL") * 1.05 * 5 * processPaladinRawHealing(player.getStatPerc("Crit")) * 0.6;
    // Notably our overhealing here is higher than usual.

    //bonus_stats.hps = (freeCasts.lightOfDawn * oneLightOfDawn + freeCasts.wordOfGlory * oneWordOfGlory) / 33;
    
    // The bonus can be procced every 30s but in practice it will be slightly rarer.

    
  }
  else if (effectName === "Paladin T28-4") {
    // Holy Paladin Sepulcher tier set 4pc
    // This should be an accurate formula, though it's a little bit of a drag and could almost certainly be simplified to half as many lines.
    const expectedProcsPerMinute = 4.8 * player.getSpellCPM(IDLIGHTOFDAWN, contentType) * 2 * 0.5; // LoD targets x LoD CPM x 2 x 0.5 
    const wingsThroughputInc = getWingsHealingInc(player.getStatPerc("Crit")); // 
    const effectiveWingsCD = 120 - (expectedProcsPerMinute*2);
    const preExpectedWingsUptime = getAwakeningWingsUptime(player, contentType, 10);
    const postExpectedWingsUptime = getAwakeningWingsUptime(player, contentType, (20 / effectiveWingsCD * 60))

    const preThroughput = preExpectedWingsUptime * wingsThroughputInc + (1 - preExpectedWingsUptime);
    const postThroughput = postExpectedWingsUptime * wingsThroughputInc + (1 - postExpectedWingsUptime);

    const expectedWingsUptimeInc = postThroughput - preThroughput;
    
    //bonus_stats.hps = player.getHPS(contentType) * expectedWingsUptimeInc;
  }

  else if (effectName === "Maraad's Dying Breath" || effectName === "Maraads Dying Breath") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Maraads Dying Breath                                      */
    /* ---------------------------------------------------------------------------------------------- */
      const legendaryBonus = 0.1;
      const averageStacks = 4.9;
      const backlashDamage = 0.2; 
      const beaconHealing = 0.8;
      const beaconOverhealing = 0.4;

      const baseThroughput = legendaryBonus * averageStacks * player.getSpellHPS(IDMARTYR, contentType);

      bonus_stats.hps = baseThroughput * (1 + beaconHealing * (1 - beaconOverhealing)) * (1 - backlashDamage);

  } else if (effectName === "Shock Barrier") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Shock Barrier                                         */
    /* ---------------------------------------------------------------------------------------------- */
    /* 
    Shock Barrier is a straight foward formula with the percentage of shield wasted the only real variable. 
    The absorb is notably based on the raw healing the Holy Shock would have done, rather than the effective healing.
    A very small portion can be lost to over capping, but this is rare in practice with current haste levels.
    */
    const holyShockIncrease = 0.2; // This is one application of the absorb, and will be placed 3 times.
    const wastedShield = 0.22;
    const holyShockRawHPS = player.getSpellRawHPS(IDHOLYSHOCK, contentType);

    bonus_stats.hps = Math.round(holyShockIncrease * 3 * (1 - wastedShield) * holyShockRawHPS);
  } else if (effectName === "Inflorescence of the Sunwell") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                  Inflorescence of the Sunwell                                  */
    /* ---------------------------------------------------------------------------------------------- */
    // Do Math
    const legendaryBonus = 0.3;
    const infusionBaseIncrease = 0.3;
    const infusionsPerMinute = player.getSpellCPM(IDHOLYSHOCK, contentType) * (player.getStatPerc("Crit") + 0.3);
    const infusionProcsUsed = 0.18;
    const expectedOverhealing = 0.24;
    //const oneHolyLightOld = player.getSingleCast(IDHOLYLIGHT, contentType);
    const oneHolyLight = player.getStatMultiplier("ALL") * 2.6 * processPaladinRawHealing(player.getStatPerc("Crit")) * (1 - expectedOverhealing);

    // 222
    /* ------------------------------ Resplendent tests. Do not delete. ----------------------------- */
    /*
    let trait_bonus =  0.036 + 5 * 0.004;
    let targets = 4.8;
    let expectedOverhealing = 0.3;

    oneHolyLight = oneHolyLight + oneHolyLight * (trait_bonus * targets * (1 - expectedOverhealing))
    */

    bonus_stats.hps = Math.round((infusionsPerMinute * infusionProcsUsed * (oneHolyLight * (legendaryBonus + (infusionBaseIncrease + legendaryBonus)))) / 60);
  } else if (effectName === "Shadowbreaker, Dawn of the Sun") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                 Shadowbreaker, Dawn of the Sun                                 */
    /* ---------------------------------------------------------------------------------------------- */
    const baseHealingInc = processPaladinRawHealing(player.getStatPerc("Crit"));
    const lightOfDawnCPM = player.getSpellCPM(IDLIGHTOFDAWN, contentType);
    const wordOfGloryCPM = player.getSpellCPM(IDWORDOFGLORY, contentType);
    const lightOfDawnTargets = contentType === "Raid" ? 4.9 : 3.1;
    let lightOfDawnUptime = Math.min(1, (lightOfDawnCPM * 8) / 60); // Technically doesn't account for the slight possible loss from casting LoD twice in a short period.
    let averageMasteryEff = player.getStatPerc("Mastery"); // TODO: Improve with logs data.
    let maxMasteryEff = (player.getStatPerc("Mastery") - 1) / 0.8 + 1;
    let mastDiff = maxMasteryEff / averageMasteryEff - 1;
    let percentHealingToHitTargets = 0.95;
    const HPSMasteryBonus = player.getHPS(contentType) * mastDiff * lightOfDawnUptime * percentHealingToHitTargets;

    /* -------------------------------- Calculate Word of Glory bonus ------------------------------- */
    const buffedWordOfGlories = wordOfGloryCPM;
    const oneWordOfGlory = player.getStatMultiplier("ALL") * 3.15 * processPaladinRawHealing(player.getStatPerc("Crit")) * 0.92;
    //const oneLightOfDawn = player.getStatMultiplier("ALL") * 1.05 * lightOfDawnTargets * processPaladinRawHealing(player.getStatPerc("Crit")) * 0.78;

    const wordOfGloryMasteryCoeff = (1 + (player.getStatPerc("Mastery") - 1) * 1.5) / player.getStatPerc("Mastery");
    const oneWordOfGloryBonus = Math.max(0, oneWordOfGlory * wordOfGloryMasteryCoeff - oneWordOfGlory);
    const HPSWordOfGlory = (buffedWordOfGlories * oneWordOfGloryBonus) / 60;

    bonus_stats.hps = Math.round(HPSMasteryBonus + HPSWordOfGlory);
  } else if (effectName === "Of Dusk and Dawn") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Of Dusk and Dawn                                        */
    /* ---------------------------------------------------------------------------------------------- */
    const offensiveBuffUptime = 0.88;
    const legendaryBonus = 0.06;

    bonus_stats.dps = 0;
    bonus_stats.hps = Math.round(offensiveBuffUptime * legendaryBonus * player.getHPS(contentType));
  } else if (effectName === "Vanguards Momentum") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                       Vanguards Momentum                                       */
    /* ---------------------------------------------------------------------------------------------- */
    bonus_stats.hps = -1;

  } else if (effectName === "The Magistrates Judgment") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                    The Magistrates Judgment                                    */
    /* ---------------------------------------------------------------------------------------------- */
    const procChance = 0.6;
    const judgementCPM = 2.4;
    const healingOneHolyPower = getOneHolyPower(player, contentType);

    bonus_stats.hps = (procChance * judgementCPM * healingOneHolyPower) / 60;
  } else if (effectName === "Relentless Inquisitor") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                      Relentless Inquisitor                                     */
    /* ---------------------------------------------------------------------------------------------- */
    const averageStacks = 4.8;

    bonus_stats.haste = averageStacks * 33;
  } else if (effectName === "The Mad Paragon") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                         The Mad Paragon                                        */
    /* ---------------------------------------------------------------------------------------------- */

    /* --------------------------------------- Considerations --------------------------------------- */
    /* 
    Mad Paragon also itself expands the number of hammer CPM you can expect which isn't considered in the formula, which is based off our wings uptime without the legendary.
    This can and will be added to the formula, but might take place after the expansion is live.
    Mad Paragon is incredibly GCD thirsty with added time to wings actually being less than the GCD you spend to get there. This is ok when you're cooldown capped, but is
    a penalty when you are not.
    */
    let isAwakening = true;
    let wingsEffHealingIncrease = getWingsHealingInc(player.getStatPerc("Crit"));
    let wingsBaseUptime = (20 + (isAwakening ? 25 : 0)) / 120;
    let hammerOfWrathCPM = (60 / (7.5 / player.getStatPerc("Haste"))) * wingsBaseUptime;
    let healingIncUptime = hammerOfWrathCPM / 60;
    let healingMult = wingsEffHealingIncrease * healingIncUptime + 1 * (1 - healingIncUptime) - 1;

    bonus_stats.hps = Math.round(player.getHPS(contentType) * healingMult);

    //console.log("FWS: " + wingsEffHealingIncrease);
    /* This technically needs to be increased based on the wings duration increase, but that is of minimal benefit. */
    bonus_stats.DPS = (1.2 * 0.3 * player.getStatMultiplier("ALL") * hammerOfWrathCPM) / 60;

    //let akn = 2.5 / 60; //getAwakeningWingsUptime(player, contentType);
    //let awakening_hps = (akn * wingsEffHealingIncrease + 1 * (1 - akn) );
  }
  else if (effectName === "Divine Resonance") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Divine Resonance                                        */
    /* ---------------------------------------------------------------------------------------------- */
    const specialSettings = {
      numCopies: 3,
      copyStrength: 0.5,
    };
    if (player.getModelName(contentType).includes("Kyrian") || (player.getModelName(contentType) === "Default" && player.getCovenant() === "kyrian")) {    
      bonus_stats = getPaladinCovAbility("Pelagos", player, contentType, specialSettings);
    }
    else {
      bonus_stats.hps = -3;
      return bonus_stats;
    }
    
  }
  else if (effectName === "Duty-Bound Gavel") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                        Duty-Bound Gavel                                        */
    /* ---------------------------------------------------------------------------------------------- */
    const specialSettings = {
      extraSpells: 1,
      extraCharge: 1,
    };
    if (player.getModelName(contentType) === "Necrolord Default" || (player.getModelName(contentType) === "Default" && player.getCovenant() === "necrolord")) {
      bonus_stats = getPaladinCovAbility("Emeni", player, contentType, specialSettings);
    }
    else {
      bonus_stats.hps = -3;
      return bonus_stats;
    }
      
  }
  else if (effectName === "Radiant Embers") {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Radiant Embers                                        */
    /* ---------------------------------------------------------------------------------------------- */
    const specialSettings = {
      extraSpells: 1,
      extraCharge: 1,
    };

    if (player.getModelName(contentType).includes("Venthyr") || (player.getModelName(contentType) === "Default" && player.getCovenant() === "venthyr")) {    
      bonus_stats = getPaladinCovAbility("Theotar", player, contentType, specialSettings);
      bonus_stats.hps = (bonus_stats.hps * 0.5) || 0;
    }
    else {
      bonus_stats.hps = -3;
      return bonus_stats;
    }

  }

  // Consider building in support for the conduit via SimC grab or something similar.
  else {
    bonus_stats.hps = -2;
    bonus_stats.hps = -2;
  }

  return bonus_stats;
};
