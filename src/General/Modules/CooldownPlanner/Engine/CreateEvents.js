// Create events that don't have boss cast times i.e surging azerite on Jailer encounter. We pass a damage taken report here and use instances of damage to determine when the ability happens.
import createRygelonEvents from "./BossEvents/SepulcherEvents/Rygelon";
import createjailerEvents from "./BossEvents/SepulcherEvents/Jailer";
import createAnduinEvents from "./BossEvents/SepulcherEvents/Anduin";
import createVigilantEvents from "./BossEvents/SepulcherEvents/Vigilant";
import createXymoxEvents from "./BossEvents/SepulcherEvents/Xymox";
import createPantheonEvents from "./BossEvents/SepulcherEvents/Pantheon";

export default function createEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let returnedEvents = [];
  console.log(buffData);
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));

  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Sepulcher of the First Ones                                  */
  /* ---------------------------------------------------------------------------------------------- */
  /* ------------------------------------------ Vigilant ------------------------------------------ */
  if (bossID === 2512) {
    returnedEvents = createVigilantEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData);
  }
  /* -------------------------------------------- Xymox ------------------------------------------- */
  if (bossID === 2553) {
    returnedEvents = createXymoxEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData);
  }
  /* ------------------------------------------ Pantheon ------------------------------------------ */
  if (bossID === 2544) {
    returnedEvents = createPantheonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData);
  }
  /* ------------------------------------------- Anduin ------------------------------------------- */
  if (bossID === 2546) {
    returnedEvents = createAnduinEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData);
  }
  /* ------------------------------------------- Rygelon ------------------------------------------- */
  if (bossID === 2549) {
    returnedEvents = createRygelonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData);
  }
  /* ------------------------------------------- Jailer ------------------------------------------- */
  if (bossID === 2537) {
    returnedEvents = createjailerEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData);
  }

  return returnedEvents;
}
