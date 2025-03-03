import { processDruidRawHealing } from "./DruidMiscFormulas";


export const getDruidSpecEffect = (effectName, player, contentType) => {
  // These are going to be moved to a proper file soon.
  const IDREJUV = 774;
  const IDLIFEBLOOM = 33763;
  const IDREGROWTH = 8936;
  const IDWILDGROWTH = 48438;

  let bonus_stats = {};
  const healingMult = 1.06 * 1.04 // Class talents
  const insuranceRPPM = 4 * player.getStatPerc('haste');

  if (effectName === "Druid S2-2") {
    
    const insuranceHealing = 1.6 * 5 * player.getStatMults(['haste', 'crit', 'versatility', 'intellect', 'mastery'])
    bonus_stats.hps = insuranceHealing * insuranceRPPM / 60;
  }
  else if (effectName === "Druid S2-4") {
    const healingOneRejuv = 0.2465 * 2.1 * 5 * player.getStatMults(["intellect", "crit", "versatility"]) * ((player.getStatPerc("mastery") - 1) + 1) * healingMult * 1.3; // Flourish etc
    let lifebloomInsurancePPM = 60 / 4 * 0.3;
    if (contentType === "Dungeon") {
      // Add Photosynthesis
      // We'll just be modelling lifebloom + rejuv + spring blossoms. It's common to have more but there's also a ton of wastage on procs.
      hotTicksPerMinute = (60 + 20 + 30) * player.getStatPerc('haste');
      lifebloomInsurancePPM = hotTicksPerMinute * 0.04 * 0.3;
    }

    bonus_stats.hps = (insuranceRPPM + lifebloomInsurancePPM) * healingOneRejuv / 60;


  }
  else if (effectName === "Druid S1-2") {
    // +10% Regrowth, Swiftmend, Wild Growth
    const percentEffected = 0.32; 
    bonus_stats.hps = percentEffected * 0.1 * player.getHPS();
  }
  else if (effectName === "Druid S1-4") {
    const effectiveUptime = 0.5; 
    bonus_stats.hps = effectiveUptime * 0.08 * player.getHPS();
  }
  else if (effectName === "Druid T31-4") {
    // 

    const oneNourish = 2.23 * player.getStatMults(["intellect", "crit", "versatility"]) * ((player.getStatPerc("mastery") - 1) * 3 * 1.9 + 1) * 1.8 * healingMult; // Triple mastery value.
    const procsPerMinute = 60 * 0.05 * player.getStatPerc("haste"); // You get 60 chances at a proc per minute with single lifebloom. We assume the Tranquil Mind talent but it doesn't matter all too much. 
  
    bonus_stats.hps = oneNourish * procsPerMinute / 60;
  }

  else if (effectName === "Druid T31-2") {
    //
    const groveGuardiansPerMinute = 3 + (3 / 2) + 1; // 3 baseline, 3 from Tree of Life every two minutes, 1 from Reforestation per minute.
    const oneNourish = 0.5 * 0.8 * player.getStatMults(["intellect", "crit", "versatility"]) * ((player.getStatPerc("mastery") - 1) * 3 * 2.3 + 1) * healingMult; 
    // Triple mastery value. Each Nourish gets buffed by 80% so that's the piece we're capturing.
    const nourishPerTree = Math.floor(15 / 2 * player.getStatPerc("haste"));
    bonus_stats.hps = oneNourish * nourishPerTree * groveGuardiansPerMinute / 60;


  }

  else if (effectName === "Druid T30-4") {
    // TODO
    bonus_stats.hps = 9870;

  }

  else if (effectName === "Druid T30-2") {
    // +10% rejuv healing, +10% lifebloom healing, +35% regrowth HoT healing.
    const percentEffected = 0.45; 
    bonus_stats.hps = percentEffected * 0.1 * player.getHPS();

  }

  else if (effectName === "Druid T29-2") {
    // +8% crit to almost everything that matters.
    const percentEffected = 0.78; // TODO: Auto-calc this.
    bonus_stats.crit = 8 * percentEffected * 170;

  }
  else if (effectName === "Druid T29-4") {
    const effectiveCritChance = player.getStatPerc("crit") + (8 / 100) - 1;
    const chanceOneCrit = 1-(Math.pow(1-effectiveCritChance, 3));

    const effloCritsPerSec = chanceOneCrit / 2 * player.getStatPerc("haste");
    const avgStacks = Math.min(5, effloCritsPerSec * 15);
    const sotfBonus = (0.5 * 0.4) + 1; // 40% of our WG casts will line up with SotF.
    const oneWildGrowth = 0.98 * 6 * sotfBonus * player.getStatMults(["intellect", "haste", "versatility", "crit"]) * (1+(player.getStatPerc("mastery")-1) * 2.3) * 1.05; // The extra healing from 2 additional WG targets a minute.

    bonus_stats.hps = oneWildGrowth * (0.05 * avgStacks) * 4 / 60;
  }

  // Tier Sets
  else if (effectName === "Druid T28-2") {
    // 
    const masteryMult = 1 + (player.getStatPerc("Mastery") - 1) * 2.6 // Avg Hots (high rejuv uptime + the hot itself + various other)
    const bloomHPS = 0.208 * player.getStatMultiplier("NOMAST") * player.getInt() * masteryMult / 8 * 0.78; // The shown healing is over 8 seconds so we'll divide it by 8 to get a per second amount.
    const expectedUptimePerPlayer = player.getSpellCPM(IDREJUV, contentType) * 15 / 20 / 60; // CPM x Duration / Raid Size
    // This is technically the expected uptime of REJUV however the Druid 2pc follows it almost precisely despite a shorter duration. 
    const healPortionHPS = bloomHPS * expectedUptimePerPlayer * 20;

    const masteryStackValue = (player.getStatPerc("Mastery") - 1) * expectedUptimePerPlayer * player.getHPS(contentType);
    // This needs to be expanded by multiplying only the HPS that doesn't already come from mastery, that is, we're interested in how much the mastery stack 
    // is adding which is additive with pre-existing stacks. 

    //bonus_stats.hps = healPortionHPS + masteryStackValue;
    bonus_stats.hps = 0;
  }
  else if (effectName === "Druid T28-4") {
    // This is too simple a formula, but can be revised with proper log data.
    const hpsDuringBurstWindow = 22000;
    const duration = 9;
    const rejuvHPSDuringBurstWindow = 8000 * duration;
    const extraWGHealing = 0.98 * 2 * player.getStatMultiplier("NOMAST") * 1.1 * 0.8; // The extra healing from 2 additional WG targets a minute.
    const auraHealingIncrease = hpsDuringBurstWindow * 0.15 * duration; // The extra healing from 15% additional healing
    const rejuvHealingIncrease = (rejuvHPSDuringBurstWindow * 1.15 * 1.5) - rejuvHPSDuringBurstWindow; // The extra healing from the large rejuv buff.

    //bonus_stats.hps = (auraHealingIncrease + rejuvHealingIncrease + extraWGHealing) / 60;
    bonus_stats.hps = 0;
  }
  /*
    The rejuv spreading legendary can best be expressed as a percentage increase to our rejuv healing. 
    TODO: When accepting log input we will eventually have to take into account those already wearing it since it changes our formula slightly.
    */
  else if (effectName === "Vision of Unending Growth") {
    let rejuvHealingHPS = player.getSpellHPS(IDREJUV, contentType);
    let baseTicks = 1 + 5 * player.getStatPerc("Haste");
    let expectedTicksWithLegendary = baseTicks / (1 - 0.025 * baseTicks);
    let rejuvHealingInc = expectedTicksWithLegendary / baseTicks - 1;
    let expectedHPS = Math.round(rejuvHealingInc * rejuvHealingHPS);

    // Return result.
    bonus_stats.hps = 0;;

  } else if (effectName === "Memory of the Mother Tree") {
    let wildGrowthCPM = player.getSpellCPM(IDWILDGROWTH, contentType);
    let procChance = 0.4;
    let oneRejuv = 0.29 * 6 * player.getStatMultiplier("ALL") * 0.87 * processDruidRawHealing(player, 774);

    let freeRejuvsPerMinute = wildGrowthCPM * procChance * 3;
    //bonus_stats.hps = Math.round((freeRejuvsPerMinute * oneRejuv) / 60);
    bonus_stats.hps = 0;

  } else if (effectName === "Verdant Infusion") {
    /* 

    The swiftmend extension legendary can be valued by calculating how much extra healing we can expect out of the HoTs on the swiftmended target. 
    The general goal most of the time is to Swiftmend whichever target has your Cenarion Ward but players aren't perfect. 

    */
    // Do Math
    let durationIncrease = 10;
    let expectedOverhealing = 0.44;
    let swiftmendCPM = 3.8;
    let power = 0;
    const isCW = contentType === "Raid" ? false : true;

    let spellExtensions = [
      { sp: 1.56, duration: 15, extensionsPerMin: swiftmendCPM * 0.95 }, // Rejuv
      { sp: 1.94, duration: 15, extensionsPerMin: swiftmendCPM * 0.95 }, // Lifebloom
      { sp: 0.43, duration: 12, extensionsPerMin: swiftmendCPM * 0.96 }, // Regrowth
      { sp: 3.17, duration: 8, extensionsPerMin: (isCW ? swiftmendCPM * 0.96 : 0) }, // Cenarion Ward
    ];

    spellExtensions.forEach((spell) => (power += ((spell.sp * durationIncrease) / spell.duration) * (1 - expectedOverhealing) * spell.extensionsPerMin));
    //bonus_stats.hps = Math.round((power / 60) * player.getStatMultiplier("ALL"));
    bonus_stats.hps = 0;
  } else if (effectName === "The Dark Titans Lesson" || effectName === "The Dark Titan's Lesson") {
    // Do Math
    const percentClearcastsUsed = 0.8;
    const secondLifebloomUptime = 0.85;
    const freeClearcasts = 60 * secondLifebloomUptime * player.getStatPerc("Haste") * 0.04;
    const oneRegrowth = (1.73 + 0.432) * player.getStatMultiplier("ALL") * 0.74;
    const hps_clearcasting = (oneRegrowth * freeClearcasts * percentClearcastsUsed) / 60;
    // --

    // Lifebloom is a more efficient spell than Rejuv so we can factor in the increased healing we get from the cast.
    // This is actually a very problematic formula since they don't quite fill the same role in your kit. It has been removed for now. 
    /*
    const oneRejuv = player.getSingleCast(IDREJUV, contentType);
    const oneLifebloom = player.getSingleCast(IDLIFEBLOOM, contentType);
    const hps_betterCast = (oneLifebloom - oneRejuv) / 15;
    */

    // Photosynthesis. Dungeon only, when we can pull talents from SimC strings we'll make this conditional.
    const oneBloom = 1.15 * 0.9 * player.getStatMultiplier("CRITVERS") * player.getStatPerc("Mastery") * player.getInt();
    const freeBloomsPerSec = (1 + 0.5 + 0.33) * player.getStatPerc("Haste") * 0.04;
    const expectedOverhealing = 0.4;
    const hps_phosy = contentType === "Raid" ? 0 : (oneBloom * freeBloomsPerSec * (1 - expectedOverhealing));


    // 10% Lifebloom Penalty
    const lifebloomHPS = player.getSpellHPS(IDLIFEBLOOM, contentType);
    const deduction = lifebloomHPS * 0.1;

    bonus_stats.hps = Math.round( hps_phosy + hps_clearcasting - deduction);
  }

  // Consider building in support for the conduit via SimC grab or something similar.
  else if (effectName === "Lycaras Fleeting Glimpse") { 
    let expectedOverhealing = 0.35; // TODO: placeholder.
    let oneWildGrowth = 0.91 * 6 * player.getInt() * player.getStatMultiplier("ALLSEC") * (1 - expectedOverhealing);

    bonus_stats.hps = Math.round((oneWildGrowth * (60 / 45)) / 60);

  } else if (effectName === "Oath of the Elder Druid") {
    let legendaryIncrease = 0.75;
    let playerHealth = player.getHealth(contentType);
    let yseras = playerHealth * 0.03 * legendaryIncrease;

    bonus_stats.hps = Math.round(yseras / 5);
    
  } else if (effectName === "Circle of Life and Death") {
    bonus_stats.hps = -1;
  }
  else if (effectName === "Celestial Spirits") {
    const fightLength = player.getFightLength(contentType)
    const expectedConvokes = fightLength / 60;
    const soulbind = "Niya";

    let hps = {
      // The value of Celestial Spirits can be broken down into three portions.
      // - The extra Flourish casts from getting an increased number of exceptional spells.
      // - The extra spells themselves since we get 18 per minute instead of the normal 12.
      // - Soulbind Synergy from Field of Blossoms and Grove Invigoration proccing twice as often.
      flourishes: 0,
      extraSpells: 0,
      soulbindSynergy: 0
    }

    // --- Extra Flourish casts ---
    // A: CS is a two card deck system with an 85% chance of pulling a Flourish in each deck. 
    // B: A regular non-legendary convoke is a 5 card deck with one Flourish.
    // Our expected Flourish gain is then A - B. There is no need for a floor in our functions since our fight lengths are given as estimates rather than fixed values.
    const expectedFlourishes = (expectedConvokes / 2 * 0.85) - (fightLength / 120 * 0.2)
    

    // The value of an extra Flourish is somewhat difficult to estimate, so the following number is incredibly rough.
    // The estimated extensions are based on a set of logs with a somewhat low sample size. We can increase it's accuracy over time.
    let power = 0;
    const duration = 8;
    const expectedOverhealing = {"Raid": 0.2, "Dungeon": 0.5};
    const spellExtensions = {"Raid": [
      { sp: 1.56, duration: 15, extensionsPerCast: 5.2, expectedExtraSpells: 1.2}, // Rejuv
      { sp: 1.94, duration: 15, extensionsPerCast: 0.9, expectedExtraSpells: 0}, // Lifebloom
      { sp: 0.43, duration: 12, extensionsPerCast: 2.4, expectedExtraSpells: 2.1}, // Regrowth
      { sp: 0.98, duration: 7, extensionsPerCast: 6, expectedExtraSpells: 0.7 * 6}, // Wild Growth
      { sp: 0.216, duration: 6, extensionsPerCast: 11, expectedExtraSpells: 0} // Spring Blossoms
    ],
    "Dungeon": [
      { sp: 1.56, duration: 15, extensionsPerCast: 3.8, expectedExtraSpells: 1.2}, // Rejuv
      { sp: 1.94, duration: 15, extensionsPerCast: 0.9, expectedExtraSpells: 0}, // Lifebloom
      { sp: 0.43, duration: 12, extensionsPerCast: 2.2, expectedExtraSpells: 2.1}, // Regrowth
      { sp: 0.98, duration: 7, extensionsPerCast: 5, expectedExtraSpells: 0.7 * 5}, // Wild Growth
      { sp: 0.216, duration: 6, extensionsPerCast: 5, expectedExtraSpells: 0} // Spring Blossoms
    ] };

    spellExtensions[contentType].forEach((spell) => (power += ((spell.sp * duration) / spell.duration) * (1 - expectedOverhealing[contentType]) * spell.extensionsPerCast))
    hps.flourishes = Math.round((power * 2 / fightLength) * expectedFlourishes * player.getStatMultiplier("ALL"));;


    // --- Soulbind Synergy ---
    const groveInvigMastery = 25 * 16 * 30 / 60 / 2; // 25 stacks of 16 mastery that last 30 seconds on a 1 minute cooldown with every second being provided by Convoke baseline.
    //const bondedSouls = 0;
    hps.soulbindSynergy = Math.round(groveInvigMastery * player.getStatWeight(contentType, "mastery") / player.getInt() * player.getHPS(contentType));


    // --- Extra Spells ---
    const extraSpells = 4 // 9 spells every minute - 12 spells once every two minutes. Two thirds of them are expected to be damage spells.
    let extraSpellPow = 0;
    const extraSpellsOverhealing = {"Raid": 0.32, "Dungeon": 0.54};
    spellExtensions[contentType].forEach((spell) => (extraSpellPow += (spell.sp * spell.expectedExtraSpells * (1 - extraSpellsOverhealing[contentType]))));
    hps.extraSpells = Math.round((extraSpellPow / fightLength * expectedConvokes) * player.getStatMultiplier("ALL"));

    bonus_stats.hps = hps.flourishes + hps.extraSpells + hps.soulbindSynergy;
  } else {
    bonus_stats.hps = 0;
    bonus_stats.DPS = 0;
  }

  return bonus_stats;
};
