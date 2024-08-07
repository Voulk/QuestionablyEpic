import Player from "General/Modules/Player/Player";

const IMBUED_REFLECTIONS = 0.3625;

/**
 * Conduit power
 * Simple linearly equation 
 * @param {Number} rankOne the power of the conduit at rank 1 
 * @param {Number} requiredRank the rank in terms of (1-15) and not ilvl you want it at
 * @returns the power the conduit will be at
 */
function conduitScaling(rankOne, requiredRank) {
  const scalingFactor = rankOne * 0.1;
  const rankZero = rankOne - scalingFactor;
  const rankRequested = rankZero + scalingFactor * requiredRank;
  return rankRequested;
}

/**
 * Get the healing that one Clone will do
 * @param {Player} player to base the power off of. Gets t hings like Int
 * @returns Healing one clone will do
 */
export const getOneCloneHealing = (player) => {
  const mult = player.getStatMultiplier("NOMAST") * player.getInt() * 1.725; // Added conduit scaling here
  const fallenOrderSpells = [
    {sp: 3.6 * 1.3, castsPerClone: 1.55}, 
    // Enveloping Mist. For some reason their env multiplier effects their env healing. They are only supposed to cast 1 EnV per clone, but they sometimes like to cast two instead.
    {sp: 1.04, castsPerClone: 2} // Soothing Mist
  ]

  const overhealing = .5; // 50% overheal which is typical

  let healingFromClone = 0;
  fallenOrderSpells.forEach(spell => (healingFromClone += (spell.sp * spell.castsPerClone * mult) * (1 - overhealing)));

  return healingFromClone;
}

/**
 * Gets the healing that one CAST of FO will do
 * @param {Player} player to base the power off of. Gets t hings like Int
 * @returns total healing the spell will do. Not HPS
 */
export const getFOHealing = (player) => {
  const numberOfCraneClones = 4;
  const healingFromFOCast = getOneCloneHealing(player) * numberOfCraneClones;

  return healingFromFOCast;
}

/**
 * The healing provided by from the 24 second clone from SiT legendary
 * @param {Player} player  to base the power off of. Gets t hings like Int
 * @returns Total healing from the longer clone
 */
export const getLongCloneHealing = (player) => {
  const mult = player.getStatMultiplier("NOMAST") * player.getInt();
  const fallenOrderSpells = [
    {sp: 3.6 * 1.3, castsPerClone: 3.27}, // This needs to be further adjusted as live logs come in. Updated based on inital 450 logs collected 2nd March
    // Enveloping Mist. For some reason their env multiplier effects their env healing. They are only supposed to cast 1 EnV per clone, but they sometimes like to cast two instead.
    {sp: 1.04, castsPerClone: 6} // Soothing Mist
  ]

  const overhealing = .5; // 50% overheal which is typical

  let healingFromClone = 0;
  fallenOrderSpells.forEach(spell => (healingFromClone += (spell.sp * spell.castsPerClone * mult) * (1 - overhealing)));

  return healingFromClone;
}

/**
 * The HPS from SiT legendary. This includes longer clone and hps gain from CDR
 * @param {Player} player 
 * @param {String} contentType 
 * @returns 
 */
export const getSiTHPS = (player, contentType) => {
  const foHealing = getFOHealing(player);
  const longClone = getLongCloneHealing(player);

  const baseCooldown = 180;
  const effectiveCD = contentType == "Raid" ? 120 : 128;

  const hpsDueToCDR = foHealing / effectiveCD - foHealing / baseCooldown;
  const hpsDueToLongClone = longClone / effectiveCD;

  // TODO: Add toggle for 4pc bonus
  //const sit4pcbonushps = getSiTHPS4pc(player) - getFOHPS4pc(player);
  const sit4pcbonushps = 0;

  return hpsDueToCDR + hpsDueToLongClone + sit4pcbonushps;

}

/**
 * The HPS from SiT legendary 4pc bonus
 * @param {Player} player 
 * @param {String} contentType 
 * @returns 
 */
 export const getSiTHPS4pc = (player) => {
  const t284pcbonus = 450 * 0.5 * 2.33 * ((8 / (1 / 1.21)) + (8 / (1 / 1.21))) * 1.797 * player.getStatMultiplier("CRITVERS", player.activeStats)

  return t284pcbonus / 120;
}

/**
 * The HPS from normal FO 4pc bonus
 * @param {Player} player 
 * @param {String} contentType 
 * @returns 
 */
export const getFOHPS4pc = (player) => {
  const t284pcbonus = 450 * 0.5 * 1.33 * ((8 / (1 / 1.21)) + (8 / (1 / 1.21))) * 1.797 * player.getStatMultiplier("CRITVERS", player.activeStats)

  return t284pcbonus / 180;
}

/**
 * The healing/hps if a conduit is applied to the number provided
 * @param {Number} healing 
 * @param {Number} conduitLevel The conduit level in terms of rank (1-15) not ilvl 
 * @returns HPS after conduit is applied
 */
export const applyConduit = (healing, conduitLevel) => {
  const power = conduitScaling(IMBUED_REFLECTIONS, conduitLevel) + 1;
  return power * healing;
}
