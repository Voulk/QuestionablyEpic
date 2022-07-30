import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createDarkveinEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const darkveinID = 165521;
  const focusAnima = 331844;
  const enemyData = enemyHealth["series"].filter((filter) => filter.guid === darkveinID);
  const enemyHealthData = Object.entries(enemyData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Container Changes                                       */
  /* ---------------------------------------------------------------------------------------------- */
  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  const containerChange1 = enemyHealthData.filter((filter) => filter.health <= 75)[0];
  containerChange1 !== undefined ? events.push({ time: moment.utc(fightDuration(containerChange1.time, starttime)).startOf("second").format("mm:ss"), bossAbility: focusAnima }) : "";

  const containerChange2 = enemyHealthData.filter((filter) => filter.health <= 50)[0];
  containerChange2 !== undefined ? events.push({ time: moment.utc(fightDuration(containerChange2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: focusAnima }) : "";

  const containerChange3 = enemyHealthData.filter((filter) => filter.health <= 25)[0];
  containerChange3 !== undefined ? events.push({ time: moment.utc(fightDuration(containerChange3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: focusAnima }) : "";

  return events;
}
