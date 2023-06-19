import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

// This function creates boss events for the Amalgamation encounter
export default function createForgottenExperimentEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];

  const erraticBurst = 408476;

  const neldrisId = 200912;
  const rionthusId = 200918;
  const thadrionId = 200913;

  const phaseChangePercent = 1;
  const phaseChangePercentMythic = 49;

  // Filter health data by enemy ID
  const neldrisData = enemyHealth.series.filter((entry) => entry.guid === neldrisId);
  const thadrionData = enemyHealth.series.filter((entry) => entry.guid === thadrionId);
  const rionthusData = enemyHealth.series.filter((entry) => entry.guid === rionthusId);

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid));

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

  // erraticBurst - remove other casts of the spell withing 4 seconds of original cast
  if (logGuids.includes(erraticBurst)) {
    const clusterEvents = 1;
    const clusterTimeframe = 4000;
    const erraticBurstEvents = enemyCasts.filter((filter) => filter.ability.guid === erraticBurst);
    const erraticBurstEventsReduced = erraticBurstEvents.filter((filter, i) => {
      let entryOk = true;
      for (var a = 0; a <= clusterEvents; a++) {
        if (a + i < erraticBurstEvents.length) {
          const comparisonTimestamp = erraticBurstEvents[a + i].timestamp;
          if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
            entryOk = false;
          }
        }
      }
      return entryOk;
    });

    // time until we want to check for the next event. i.e 60 seconds after the 1st event.
    const threshold = 6000;

    // find the first event
    const firstEvent = erraticBurstEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: erraticBurst });

    // set
    let lastChosen = firstEvent.timestamp;

    erraticBurstEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        // Original Event
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: erraticBurst });
      }
    });
  }

  return events;
}
