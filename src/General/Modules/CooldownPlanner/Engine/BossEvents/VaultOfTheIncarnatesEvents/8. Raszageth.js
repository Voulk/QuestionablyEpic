import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createRaszagethEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  //   const staticDischarge = 391717;
  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  // const enemyData = enemyHealth["series"].filter((filter) => filter.guid === 189492);
  // const enemyHealthData = Object.entries(enemyData[0]["data"]).map((key) => {
  //   return {
  //     time: key[1][0],
  //     health: key[1][1],
  //   };
  // });

  // events.push({ time: "00:00", bossAbility: "Phase 1" });

  // const intermissionOne = enemyHealthData.filter((filter) => filter.health <= 65)[0];
  // intermissionOne !== undefined
  //   ? events.push({
  //       time: moment.utc(fightDuration(intermissionOne.time, starttime)).startOf("second").format("mm:ss"),
  //       bossAbility: "Intermission",
  //     })
  //   : "";
  // const phase3 = enemyHealthData.filter((filter) => filter.health <= 15)[0];
  // phase3 !== undefined
  //   ? events.push({
  //       time: moment
  //         .utc(fightDuration(phase3.time - 1000, starttime))
  //         .startOf("second")
  //         .format("mm:ss"),
  //       bossAbility: "Phase 3",
  //     })
  //   : "";

  return events;
}
