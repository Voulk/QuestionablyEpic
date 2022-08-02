import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createStoneLegionEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const kaalData = enemyHealth["series"].filter((filter) => filter.guid === 168112);
  const grashaalData = enemyHealth["series"].filter((filter) => filter.guid === 168113);

  const kaalHealthData = Object.entries(kaalData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const grashaalHealthData = Object.entries(grashaalData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));
  const kaalStoneform = 329636;
  const kaalStoneFormRemoved = buffData.filter((filter) => filter.ability.guid === kaalStoneform && filter.type === "removebuff")[0];
  const grashaalStoneform = 329808;
  const grashaalStoneFormRemoved = buffData.filter((filter) => filter.ability.guid === grashaalStoneform && filter.type === "removebuff")[0];
  const pulverizingMeteor = 339728;
  const echoingAnnihilation = 344721;
  const reverberatingEruption = 344500;

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Phase Changes                                         */
  /* ---------------------------------------------------------------------------------------------- */

  events.push({ time: "00:00", bossAbility: "Phase 1" });
  const intermission1 = kaalHealthData.filter((filter) => filter.health <= 50)[0];
  intermission1 !== undefined ? events.push({ time: moment.utc(fightDuration(intermission1.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" }) : "";
  kaalStoneFormRemoved !== undefined ? events.push({ time: moment.utc(fightDuration(kaalStoneFormRemoved.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : "";
  const intermission2 = grashaalHealthData.filter((filter) => filter.health <= 50)[0];
  intermission2 !== undefined ? events.push({ time: moment.utc(fightDuration(intermission2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" }) : "";
  grashaalStoneFormRemoved !== undefined
    ? events.push({ time: moment.utc(fightDuration(grashaalStoneFormRemoved.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" })
    : "";

  // pulverizingMeteor
  if (logGuids.includes(pulverizingMeteor)) {
    const pulverizingMeteorEvents = damageTakenData.filter((filter) => filter.ability.guid === pulverizingMeteor);
    const threshold = 10000;
    events.push(
      pulverizingMeteorEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: pulverizingMeteor };
      })[0],
    );

    let lastChosen = pulverizingMeteorEvents.map((key) => key.timestamp)[0];

    pulverizingMeteorEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: pulverizingMeteor });
      }
    });
  }

  // pulverizingMeteor
  if (logGuids.includes(echoingAnnihilation) || logGuids.includes(reverberatingEruption)) {
    const echoingAnnihilationEvents = damageTakenData.filter((filter) => filter.ability.guid === echoingAnnihilation || filter.ability.guid === reverberatingEruption);
    const threshold = 10000;
    events.push(
      echoingAnnihilationEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: reverberatingEruption };
      })[0],
    );

    let lastChosen = echoingAnnihilationEvents.map((key) => key.timestamp)[0];

    echoingAnnihilationEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: reverberatingEruption });
      }
    });
  }

  return events;
}
