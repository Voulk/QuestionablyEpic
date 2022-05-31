import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createPantheonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const prototypeOfWar = 181549;
  const prototypeOfRenewal = 181546;
  const prototypeOfDuty = 181551;
  const prototypeOfAbsolution = 181548;

  const warData = enemyHealth["series"].filter((filter) => filter.guid === prototypeOfWar);
  const dutyData = enemyHealth["series"].filter((filter) => filter.guid === prototypeOfDuty);
  const renewalData = enemyHealth["series"].filter((filter) => filter.guid === prototypeOfRenewal);
  const absolutionData = enemyHealth["series"].filter((filter) => filter.guid === prototypeOfAbsolution);

  const warHealthdata = Object.entries(warData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  const dutyHealthData = Object.entries(dutyData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const renewalHealthData = Object.entries(renewalData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const absolutionHealthData = Object.entries(absolutionData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  const firstSetHealthData = warHealthdata.concat(dutyHealthData).sort((a, b) => (a.time > b.time && 1) || -1);
  const secondSetHealthData = renewalHealthData.concat(absolutionHealthData).sort((a, b) => (a.time > b.time && 1) || -1);

  //   const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Heroic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Heroic"
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Phase Changes                                         */
    /* ---------------------------------------------------------------------------------------------- */

    events.push({ time: "00:00", bossAbility: "Phase 1" });
    const phase2 = firstSetHealthData.filter((filter) => filter.health <= 40)[0];
    events.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
    const phase3 = secondSetHealthData.filter((filter) => filter.health <= 40)[0];
    events.push({ time: moment.utc(fightDuration(phase3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" });
  }

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Mythic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Mythic"
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Phase Changes                                         */
    /* ---------------------------------------------------------------------------------------------- */

    events.push({ time: "00:00", bossAbility: "Phase 1" });
    const phase2 = firstSetHealthData.filter((filter) => filter.health <= 40)[0];
    events.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
    const phase3 = secondSetHealthData.filter((filter) => filter.health <= 40)[0];
    events.push({ time: moment.utc(fightDuration(phase3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" });
  }

  return events;
}
