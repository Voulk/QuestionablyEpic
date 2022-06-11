import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createPantheonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  // set the prototypes IDs
  const prototypeOfWar = 181549;
  const prototypeOfRenewal = 181546;
  const prototypeOfDuty = 181551;
  const prototypeOfAbsolution = 181548;

  // Filter each prototypes health data
  const warData = enemyHealth["series"].filter((filter) => filter.guid === prototypeOfWar);
  const dutyData = enemyHealth["series"].filter((filter) => filter.guid === prototypeOfDuty);
  const renewalData = enemyHealth["series"].filter((filter) => filter.guid === prototypeOfRenewal);
  const absolutionData = enemyHealth["series"].filter((filter) => filter.guid === prototypeOfAbsolution);

  // Map Prototype of War's health
  const warHealthdata = Object.entries(warData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  // Map Prototype of Duty's health
  const dutyHealthData = Object.entries(dutyData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  // Map Prototype of Renewal's health
  const renewalHealthData = Object.entries(renewalData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  // Map Prototype of Absolution's health
  const absolutionHealthData = Object.entries(absolutionData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  // Merge the health data for each set of prototypes so we can find when either of them meet the phase change requirement first.
  const firstSetHealthData = warHealthdata.concat(dutyHealthData).sort((a, b) => (a.time > b.time && 1) || -1);
  const secondSetHealthData = renewalHealthData.concat(absolutionHealthData).sort((a, b) => (a.time > b.time && 1) || -1);

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Heroic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Heroic"
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Phase Changes                                         */
    /* ---------------------------------------------------------------------------------------------- */

    events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events
    const phase2 = firstSetHealthData.filter((filter) => filter.health <= 40)[0]; // set the first event where either of the prototypes meets their phase change point
    phase2 !== undefined ? events.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : ""; // if valid then push "Phase 2" event
    const phase3 = secondSetHealthData.filter((filter) => filter.health <= 40)[0]; // set the first event where either of the prototypes meets their phase change point
    phase3 !== undefined ? events.push({ time: moment.utc(fightDuration(phase3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : ""; // if valid then push "Phase 3" event
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

    events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events
    const phase2 = firstSetHealthData.filter((filter) => filter.health <= 40)[0]; // set the first event where either of the prototypes meets their phase change point
    phase2 !== undefined ? events.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : ""; // if valid then push "Phase 2" event
    const phase3 = secondSetHealthData.filter((filter) => filter.health <= 40)[0]; // set the first event where either of the prototypes meets their phase change point
    phase3 !== undefined ? events.push({ time: moment.utc(fightDuration(phase3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : ""; // if valid then push "Phase 3" event
  }

  return events;
}
