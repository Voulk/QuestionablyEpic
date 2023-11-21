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

  const corruptBuff = 421922;
  if (logGuids.includes(corruptBuff)) {
    const corruptBuffRemoved = buffData.filter((filter) => filter.ability.guid === corruptBuff && filter.type === "removebuff");

    corruptBuffRemoved.map((key, i) => {
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 2",
      });
    });
  }

  const healAddData = friendlyHealth["series"].filter((filter) => filter.guid === 207800);
  const healAddHealthData = Object.entries(healAddData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  const healAddFirstSpawn = healAddHealthData[0];

  const eternalFirestorm = 422935;
  const eternalFirestormCast = enemyCasts.filter((filter) => filter.ability.guid === eternalFirestorm && filter.type === "cast");

  if (healAddFirstSpawn !== undefined) {
    events.push({ time: moment.utc(fightDuration(healAddFirstSpawn.time, starttime)).startOf("second").format("mm:ss"), bossAbility: 422605 });

    const timeBetweenEvents = 30000; // 30 seconds in milliseconds

    const exclusionTime = 25000; // 25 seconds in milliseconds

    for (let a = healAddFirstSpawn.time; a <= eternalFirestormCast[0].timestamp; a += timeBetweenEvents) {
      // Check if 'a' is not within 25 seconds of 'eternalFirestormCast[0].timestamp'
      if (Math.abs(a - eternalFirestormCast[0].timestamp) >= exclusionTime) {
        events.push({
          time: moment.utc(fightDuration(a, starttime)).startOf("second").format("mm:ss"),
          bossAbility: 422605,
        });
      }
    }
  }

  if (logGuids.includes(eternalFirestorm)) {
    eternalFirestormCast.map((key, i) => {
      events.push({
        time: moment
          .utc(fightDuration(key.timestamp - 1000, starttime))
          .startOf("second")
          .format("mm:ss"),
        bossAbility: "Phase 3",
      });
    });
  }

  return events;
}
