// Create events that don't have boss cast times i.e surging azerite on Jailer encounter. We pass a damage taken report here and use instances of damage to determine when the ability happens.
import createRygelonEvents from "./BossEvents/SepulcherEvents/Rygelon";
import createjailerEvents from "./BossEvents/SepulcherEvents/Jailer";
import createAnduinEvents from "./BossEvents/SepulcherEvents/Anduin";
import createVigilantEvents from "./BossEvents/SepulcherEvents/Vigilant";
import createXymoxEvents from "./BossEvents/SepulcherEvents/Xymox";
import createPantheonEvents from "./BossEvents/SepulcherEvents/Pantheon";
import createDesaugneEvents from "./BossEvents/SepulcherEvents/Desaugne";
import createShriekwingEvents from "./BossEvents/NathriaEvents/Shriekwing";
import createHuntsmanEvents from "./BossEvents/NathriaEvents/Huntsman";
import createHungeringEvents from "./BossEvents/NathriaEvents/Hungering";
import createNathriaXymoxEvents from "./BossEvents/NathriaEvents/NathriaXymox";
import createDarkveinEvents from "./BossEvents/NathriaEvents/Darkvein";
import createSunKingEvents from "./BossEvents/NathriaEvents/SunKing";
import createCouncilOfBloodEvents from "./BossEvents/NathriaEvents/CouncilOfBlood";
import createSludgefistEvents from "./BossEvents/NathriaEvents/SludgeFist";
import createStoneLegionEvents from "./BossEvents/NathriaEvents/StoneLegion";
import createDenathriusEvents from "./BossEvents/NathriaEvents/Denathrius";
import createEyeEvents from "./BossEvents/SanctumEvents/EyeOfTheJailer";
import createNineEvents from "./BossEvents/SanctumEvents/TheNine";
import createRemnantEvents from "./BossEvents/SanctumEvents/RemnantOfNerzhul";

export default function createEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth) {
  let returnedEvents = [];

  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));
  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Castle Nathria                                         */
  /* ---------------------------------------------------------------------------------------------- */
  /* ------------------------------------------ Shriekwing ------------------------------------------ */
  if (bossID === 2398) {
    returnedEvents = createShriekwingEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  /* -------------------------------------- Huntsman Altimor -------------------------------------- */
  if (bossID === 2418) {
    returnedEvents = createHuntsmanEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  /* ------------------------------------- Hungering Destroyer ------------------------------------ */
  if (bossID === 2383) {
    returnedEvents = createHungeringEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  /* --------------------------------------- Artificer Xymox -------------------------------------- */
  if (bossID === 2405) {
    returnedEvents = createNathriaXymoxEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  if (bossID === 2406) {
    returnedEvents = createDarkveinEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  if (bossID === 2402) {
    returnedEvents = createSunKingEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  if (bossID === 2412) {
    returnedEvents = createCouncilOfBloodEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  if (bossID === 2399) {
    returnedEvents = createSludgefistEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  if (bossID === 2417) {
    returnedEvents = createStoneLegionEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  if (bossID === 2407) {
    returnedEvents = createDenathriusEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Sanctum of Domination                                     */
  /* ---------------------------------------------------------------------------------------------- */
  if (bossID === 2433) {
    returnedEvents = createEyeEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  if (bossID === 2429) {
    returnedEvents = createNineEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  if (bossID === 2432) {
    returnedEvents = createRemnantEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Sepulcher of the First Ones                                  */
  /* ---------------------------------------------------------------------------------------------- */
  /* ------------------------------------------ Vigilant ------------------------------------------ */
  if (bossID === 2512) {
    returnedEvents = createVigilantEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }

  if (bossID === 2540) {
    returnedEvents = createDesaugneEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  /* -------------------------------------------- Xymox ------------------------------------------- */
  if (bossID === 2553) {
    returnedEvents = createXymoxEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  /* ------------------------------------------ Pantheon ------------------------------------------ */
  if (bossID === 2544) {
    returnedEvents = createPantheonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  /* ------------------------------------------- Anduin ------------------------------------------- */
  if (bossID === 2546) {
    returnedEvents = createAnduinEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  /* ------------------------------------------- Rygelon ------------------------------------------- */
  if (bossID === 2549) {
    returnedEvents = createRygelonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }
  /* ------------------------------------------- Jailer ------------------------------------------- */
  if (bossID === 2537) {
    returnedEvents = createjailerEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth);
  }

  return returnedEvents;
}
