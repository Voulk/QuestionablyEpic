import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

// This function creates boss events for the Amalgamation encounter
export default function createAmalgamationEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];

  const essenceOfShadowId = 201774;
  const eternalBlazeId = 201773;
  const shadowflameAmalgamationId = 201934;

  const phaseChangePercent = 50;
  const corruptingShadow = 401809;
  const shadowflameContamination = 405394;
  const gloomCombustion = 405640;

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  // Filter health data by enemy ID
  const essenceOfShadowData = enemyHealth.series.filter((entry) => entry.guid === essenceOfShadowId);
  const eternalBlazeData = enemyHealth.series.filter((entry) => entry.guid === eternalBlazeId);
  const shadowflameAmalgamationData = enemyHealth.series.filter((entry) => entry.guid === shadowflameAmalgamationId);

  // Extract and map health data for Essence of Shadow
  const essenceOfShadowHealth = essenceOfShadowData[0].data.map(([time, health]) => ({
    time,
    health,
  }));

  // Extract and map health data for Eternal Blaze
  const eternalBlazeHealth = eternalBlazeData[0].data.map(([time, health]) => ({
    time,
    health,
  }));

  // Extract and map health data for Shadowflame Amalgamation
  const shadowflameAmalgamationHealth = shadowflameAmalgamationData[0].data.map(([time, health]) => ({
    time,
    health,
  }));

  const shadowflameAmalgamationDeath = shadowflameAmalgamationHealth.find((entry) => entry.health <= 5);
  // Combine and sort health data for both enemies in Phase 1
  const phase1HealthData = [...essenceOfShadowHealth, ...eternalBlazeHealth].sort((a, b) => a.time - b.time);

  // Add Phase 1 and Phase 2 events to the events array
  events.push({ time: "00:00", bossAbility: "Phase 1" });
  const phase2 = phase1HealthData.find((entry) => entry.health <= phaseChangePercent);
  if (phase2 !== undefined) {
    events.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
  }

  // Add Corrupting Shadow events to the events array
  if (phase2 !== undefined && logGuids.includes(corruptingShadow)) {
    const initialDelay = 5000;
    const interval = 25000;
    let currentTime = starttime + initialDelay;

    while (currentTime <= phase2.time) {
      events.push({
        time: moment.utc(fightDuration(currentTime, starttime)).startOf("second").format("mm:ss"),
        bossAbility: corruptingShadow,
      });
      currentTime += interval;
    }
  }

  // Add Shadowflame Contamination events to the events array
  if (phase2 !== undefined && logGuids.includes(shadowflameContamination)) {
    const initialDelay = 10000;
    const interval = 30000;
    let currentTime = phase2.time + initialDelay;
    // Iterate from 10 seconds after phase2.time to shadowflameAmalgamationDeath with a 30-second interval
    while (currentTime <= shadowflameAmalgamationDeath.time) {
      // Create an event with the formatted time and the Shadowflame Contamination boss ability
      events.push({
        time: moment.utc(fightDuration(currentTime, starttime)).startOf("second").format("mm:ss"),
        bossAbility: shadowflameContamination,
      });

      // Increment currentTime by the interval (30 seconds)
      currentTime += interval;
    }
  }

  // gloomCombustion
  if (logGuids.includes(gloomCombustion)) {
    const clusterEvents = 3;
    const clusterTimeframe = 4000;
    const gloomCombustionEvents = damageTakenData.filter((filter) => filter.ability.guid === gloomCombustion);
    const gloomCombustionEventsReduced = gloomCombustionEvents.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < gloomCombustionEvents.length) {
          const comparisonTimestamp = gloomCombustionEvents[a + i].timestamp;
          if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
            entryOk = false;
          }
        }
      }
      return entryOk;
    });

    // time until we want to check for the next event. i.e 60 seconds after the 1st event.
    const threshold = 20000;

    // find the first event
    const firstEvent = gloomCombustionEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: gloomCombustion });

    // set
    let lastChosen = firstEvent.timestamp;

    gloomCombustionEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        // Original Event
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: gloomCombustion });
      }
    });
  }

  return events;
}
