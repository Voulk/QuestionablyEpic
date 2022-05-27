// Create events that don't have boss cast times i.e surging azerite on Jailer encounter. We pass a damage taken report here and use instances of damage to determine when the ability happens.
import createRygelonEvents from "./BossEvents/SepulcherEvents/Rygelon";
import createjailerEvents from "./BossEvents/SepulcherEvents/Jailer";
import createAnduinEvents from "./BossEvents/SepulcherEvents/Anduin";

export default function createEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts) {
  let returnedEvents = [];

  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));

  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Sepulcher of the First Ones                                  */
  /* ---------------------------------------------------------------------------------------------- */

  if (bossID === 2546) {
    returnedEvents = createAnduinEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts);
  }

  if (
    /* ------------------------------------------- Rygelon ------------------------------------------- */
    bossID === 2549
  ) {
    returnedEvents = createRygelonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts);
  }

  if (
    /* ------------------------------------------- Jailer ------------------------------------------- */
    bossID === 2537
  ) {
    returnedEvents = createjailerEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts);
  }

  return returnedEvents;
}
