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
  const mult = player.getStatMultiplier("NOMAST") * player.getInt();
  const fallenOrderSpells = [
    {sp: 3.6 * 1.4 * (7/6), castsPerClone: 2}, 
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
  const normalClone = getOneCloneHealing(player);
  const longCloneDuration = 24 / 8; // easy ratios
  return normalClone * longCloneDuration;
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
  const effectiveCD = contentType == "Raid" ? 60 : 64;

  const hpsDueToCDR = foHealing / effectiveCD - foHealing / baseCooldown;
  const hpsDueToLongClone = longClone / effectiveCD;

  return hpsDueToCDR + hpsDueToLongClone;

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
