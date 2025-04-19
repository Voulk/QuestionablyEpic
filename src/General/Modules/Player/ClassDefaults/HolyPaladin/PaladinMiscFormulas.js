const IDLIGHTOFDAWN = 225311;
const IDHOLYLIGHT = 82326;
const IDHOLYSHOCK = 20473;
const IDSHOCKBARRIER = 337824;
const IDWORDOFGLORY = 85673;

// Returns the expected healing of the player getting one Holy Power.
export function getOneHolyPower(player, contentType) {
  const isDP = true;

  const oneLoD = player.getStatMultiplier("ALL") * 1.2 * 5 * processPaladinRawHealing(player.getStatPerc("Crit")) * 0.8;
  //const oneLoD = Math.round(player.getSingleCast(IDLIGHTOFDAWN, contentType));

  const divinePurposeBonus = 1 + 0.15 * 1.15; 

  const beacon = 0.2 * 2 * 0.7 + 1;

  //console.log("One LoD: " + oneLoD + ". DP Bonus: " + divinePurposeBonus);
  return Math.round((oneLoD * beacon * divinePurposeBonus) / 3);
}

export function getWingsHealingInc(critPerc) {
  return ((critPerc + 0.2) / critPerc) * 1.2;
}

export function processPaladinRawHealing(critPerc) {
  const isAwakening = true;
  const wingsBaseUptime = (20 + (isAwakening ? 25 : 0)) / 120;
  const wingsHealingInc = getWingsHealingInc(critPerc);

  //console.log((wingsBaseUptime * wingsHealingInc) + (1 - wingsBaseUptime) + ". Uptime: " + wingsBaseUptime + ". HealingInc: " + wingsHealingInc);
  return (wingsBaseUptime * wingsHealingInc) + (1 - wingsBaseUptime);

}

// Credit: Betsujin
export function getAwakeningWingsUptime(player, contentType, wings = 10) {
  let _cpm = 29; // Holy power generated / min

  let basewings = wings;
  let awakeningseconds = 10.0;
  let spenders = _cpm / 3.0;
  let dpprocs = spenders * 0.15;
  dpprocs += dpprocs * 0.15;
  spenders += dpprocs;
  basewings += spenders * 0.15 * awakeningseconds;

  return basewings / 60.0;
}

export function getAdjustedHolyShock(player, contentType) {
  const isShockBarrier = true;

  const holy_shock_sp = 1.55;
  const glimmer_sp = 0.38;
  const expected_glimmer_active = contentType == "Raid" ? 7.1 : 4.4;
  const shockBarrierMult = 1 + (0.2 * 3) * (1 - 0.15);
  const expectedHSOverhealing = 0.06;
  const beaconMult = 1 + (0.5 * (1 - 0.88));

  const oneCombinedShock = holy_shock_sp * (1 - expectedHSOverhealing) * shockBarrierMult * beaconMult;
  const oneGlimmerProc = glimmer_sp * expected_glimmer_active * beaconMult * 0.8;
  const holyPowerHealing = getOneHolyPower(player, contentType);

  // It is a reasonable assumption that you include half of your Divine Tolls within a wings window.
  //const wingsMultiplier = (getWingsHealingInc(player.getStatPerc("Crit")) - 1) / 2 + 1; 
  
  return (holyPowerHealing + ((oneCombinedShock + oneGlimmerProc) * player.getStatMultiplier("NOHASTE")));

}

export function getPaladinCovAbility(soulbindName, player, contentType, specialSettings = {}) {
  let bonus_stats = {};

  if (["Kleia", "Pelagos", "Mikanikos"].includes(soulbindName)) {
    // Kyrian

    // The Divine Toll formula includes beacon healing, 
    const holy_shock_sp = 1.55;
    const glimmer_sp = 0.38;
    const expected_glimmer_active = contentType == "Raid" ? 7.1 : 4.4;
    const divineTollCasts = 5;
    const shockBarrierMult = 1 + (0.2 * 3) * (1 - 0.15);
    const expectedHSOverhealing = 0.06;
    const beaconMult = 1 + (0.5 * (1 - 0.88));

    const oneCombinedShock = holy_shock_sp * (1 - expectedHSOverhealing) * beaconMult;
    const oneCombinedShockSB = holy_shock_sp * (1 - expectedHSOverhealing) * shockBarrierMult * beaconMult;
    const oneGlimmerProc = glimmer_sp * expected_glimmer_active * beaconMult * 0.8;
    const holyPowerHPS = getOneHolyPower(player, contentType) * 5;

    // It is a reasonable assumption that you include half of your Divine Tolls within a wings window.
    const wingsMultiplier = (getWingsHealingInc(player.getStatPerc("Crit")) - 1) / 2 + 1; 
    
    if ('numCopies' in specialSettings) {
      // This is the legendary effect. 
      //bonus_stats.HPS = (holyPowerHPS + ((oneCombinedShock * divineTollCasts + oneGlimmerProc) * player.getStatMultiplier("NOHASTE") * wingsMultiplier)) / 60;
      bonus_stats.hps = ((holyPowerHPS * specialSettings.numCopies / 5) + 
                          (oneCombinedShock) * player.getStatMultiplier("NOHASTE") * specialSettings.copyStrength * specialSettings.numCopies) / 60;
      
      //console.log("Extra Shocks: " + (oneCombinedShock * divineTollCasts + oneGlimmerProc) * player.getStatMultiplier("NOHASTE") * specialSettings.copyStrength * specialSettings.numCopies / 60)
      //console.log("Holy Power: " + (holyPowerHPS * specialSettings.numCopies / 60))
                          //console.log("Num: " + specialSettings.numCopies + ". Str: " + specialSettings.copyStrength + ". HPS: " + bonus_stats.hps);
      }
    else {
      // This is a regular Divine Toll use.
      bonus_stats.HPS = (holyPowerHPS + ((oneCombinedShockSB * divineTollCasts + oneGlimmerProc) * player.getStatMultiplier("NOHASTE") * wingsMultiplier)) / 60;
    }
    

  } else if (["Nadjia", "Theotar", "Draven"].includes(soulbindName)) {
    // Ashen Hallow (Venthyr)

    // The healing portion
    const expected_uptime = 1;
    const average_allies = 18;
    const sqrt_mult = Math.min(Math.sqrt(5 / average_allies), 1); 
    const ashen_tick_sp = 0.42;
    const ashen_ticks = 15 * player.getStatPerc("Haste");
    const wingsMultiplier = (getWingsHealingInc(player.getStatPerc("Crit")) - 1) * 0.66 + 1; // Two thirds of your Ashen will be in the wings window. 
    const expectedOverhealing = 0.35;
    const rawAshenHealing = ashen_ticks * ashen_tick_sp * sqrt_mult * average_allies * wingsMultiplier * expected_uptime * player.getStatMultiplier("NOHASTE")
    const ashen_healing_portion =  rawAshenHealing * (1 - expectedOverhealing);

    // The extra Holy Power
    const one_holy_power = getOneHolyPower(player, contentType);
    const expected_holy_power = (30 / 7.5) * expected_uptime;
    const ashen_hammer_portion = expected_holy_power * one_holy_power;

    // The Beacon transfer
    const beaconMult = (0.25 * (1 - 0.62));
    const beaconHPS = beaconMult * rawAshenHealing;

    if ("extraSpells" in specialSettings) {
      bonus_stats.hps = (ashen_hammer_portion + ashen_healing_portion + beaconHPS) / 240;
    }
    else {
      bonus_stats.HPS = (ashen_hammer_portion + ashen_healing_portion + beaconHPS) / 240;
    }
    

  } else if (["Marileth", "Emeni", "Heirmir"].includes(soulbindName)) {
    // Vanquishers Hammer (Necrolord)
    // Includes 2pc bonus
    const HPSFreeWordOfGlory = player.getSingleCast(IDWORDOFGLORY, contentType);
    const HPSLightOfDawn = player.getSingleCast(IDWORDOFGLORY, contentType) * 2 * 1.5 * 0.25;
    const HPSFreeHolyPower = getOneHolyPower(player, contentType);

    if ("extraSpells" in specialSettings) {
      // Duty-bound Gavel
      bonus_stats.hps = (HPSFreeWordOfGlory + HPSLightOfDawn) / 30 + (HPSFreeHolyPower + HPSFreeWordOfGlory) / player.getFightLength(contentType);
    }
    else {
      bonus_stats.HPS = (HPSFreeWordOfGlory + HPSFreeHolyPower + HPSLightOfDawn) / 30;
    }
    
  }

  return bonus_stats;
}
