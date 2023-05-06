import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

// This function creates boss events for the Amalgamation encounter
export default function createForgottenExperimentEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];

  const neldrisId = 200912;
  const rionthusId = 200918;
  const thadrionId = 200913;

  const phaseChangePercent = 1;
  const phaseChangePercentMythic = 49;

  // Filter health data by enemy ID
  const neldrisData = enemyHealth.series.filter((entry) => entry.guid === neldrisId);
  const thadrionData = enemyHealth.series.filter((entry) => entry.guid === thadrionId);
  const rionthusData = enemyHealth.series.filter((entry) => entry.guid === rionthusId);

  // Extract and map health data for Neldris
  const neldrisHealth = neldrisData[0].data
    .map(([time, health]) => ({
      time,
      health,
    }))
    .filter((entry) => entry.health !== 0);

  // Extract and map health data for Rionthus
  const thadrionHealth = thadrionData[0].data
    .map(([time, health]) => ({
      time,
      health,
    }))
    .filter((entry) => entry.health !== 0);

  console.log(neldrisHealth.slice(1));
  console.log(thadrionHealth.slice(1));

  // Add Phase 1 and Phase 2 events to the events array
  events.push({ time: "00:00", bossAbility: "Phase 1" });

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Mythic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Mythic"
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Phase Changes                                         */
    /* ---------------------------------------------------------------------------------------------- */

    // Mythic Phase Changes
    const neldrisMythicPhaseChange = neldrisHealth.find((entry) => entry.health <= phaseChangePercentMythic);
    const thadrionMythicPhaseChange = thadrionHealth.find((entry) => entry.health <= phaseChangePercentMythic);

    const phase2 = neldrisMythicPhaseChange;
    if (phase2 !== undefined) {
      events.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
    }
    const phase3 = thadrionMythicPhaseChange;
    if (phase3 !== undefined) {
      events.push({ time: moment.utc(fightDuration(phase3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" });
    }
  } else {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Non Mythic Difficulties                                    */
    /* ---------------------------------------------------------------------------------------------- */
    // Enemy Deaths
    const neldrisDeath = neldrisHealth.find((entry) => entry.health <= phaseChangePercent);
    const thadrionDeath = thadrionHealth.find((entry) => entry.health <= phaseChangePercent);

    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Phase Changes                                         */
    /* ---------------------------------------------------------------------------------------------- */
    const phase2 = neldrisDeath;
    if (phase2 !== undefined) {
      events.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
    }
    const phase3 = thadrionDeath;
    if (phase3 !== undefined) {
      events.push({ time: moment.utc(fightDuration(phase3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" });
    }
  }

  return events;
}
