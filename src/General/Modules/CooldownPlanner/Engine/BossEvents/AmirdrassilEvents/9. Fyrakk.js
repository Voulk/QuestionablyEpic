import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createFyrakkEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime, enemyDebuffData) {
  let events = [];

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(buffData.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid));

  const bossData = enemyHealth["series"].filter((filter) => filter.guid === 204931);
  const bossHealthData = Object.entries(bossData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  const intermission = bossHealthData.filter((filter) => filter.health <= 70)[0];

  intermission !== undefined ? events.push({ time: moment.utc(fightDuration(intermission.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" }) : "";

  const incarnate = 412761;
  // if (logGuids.includes(incarnate)) {
  //   const incarnateCast = enemyCasts.filter((filter) => filter.ability.guid === incarnate);
  //   const incarnateCastTime = 2500;

  //   incarnateCast.map((key) =>
  //     events.push({
  //       time: moment
  //         .utc(fightDuration(key.timestamp - incarnateCastTime, starttime))
  //         .startOf("second")
  //         .format("mm:ss"),
  //       bossAbility: "Intermission",
  //     }),
  //   );
  // }

  const corruptBuff = 421922;

  const Phase3Trigger1 = bossHealthData.filter((filter) => filter.health <= 25)[0];
  let Phase3Trigger2 = "";

  if (logGuids.includes(corruptBuff)) {
    const corruptBuffRemoved = buffData.filter((filter) => filter.ability.guid === corruptBuff && filter.type === "removebuff");

    corruptBuffRemoved.map((key, i) => {
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 1",
      }),
        (Phase3Trigger2 = key.timestamp + 180000);
    });
  }

  let Phase3TriggerConfirmed = "";

  if (Phase3Trigger1 !== undefined) {
    if (Phase3Trigger2 !== "") {
      console.log(Phase3Trigger1);
      console.log(Phase3Trigger2);
      Phase3TriggerConfirmed = Phase3Trigger2 < Phase3Trigger1.time ? Phase3Trigger2 : Phase3Trigger1.time;
    } else {
      Phase3TriggerConfirmed = Phase3Trigger1;
    }
  }

  Phase3TriggerConfirmed !== undefined ? events.push({ time: moment.utc(fightDuration(Phase3TriggerConfirmed, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : "";

  return events;
}
