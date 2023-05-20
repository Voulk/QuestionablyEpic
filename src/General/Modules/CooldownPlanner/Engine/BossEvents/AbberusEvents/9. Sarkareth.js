import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createSarkarethEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid));

  const scorchingDetonationID = 401525;
  const echoingHowlID = 403319;
  const dreadID = 404300;
  const voidEmpowermentPhase2ID = 403284;
  const voidEmpowermentPhase3ID = 410654;

  // Filter health data by enemy ID
  // const sarkarethID = 201754;
  // const sarkarethPhase3Start = 40;
  // const sarkarethHealthData = enemyHealth.series.filter((entry) => entry.guid === sarkarethID);

  // const sarkarethsHealth = sarkarethHealthData[0].data
  //   .map(([time, health]) => ({
  //     time,
  //     health,
  //   }))
  //   .filter((entry) => entry.health !== 0);

  // const hasHealth40OrBelow = sarkarethsHealth.some((entry) => entry.health <= sarkarethPhase3Start);
  // // Phase 3 Start
  // if (hasHealth40OrBelow) {
  //   const phase3Start = sarkarethsHealth.find((entry) => entry.health <= sarkarethPhase3Start);
  //   events.push({
  //     time: moment.utc(fightDuration(phase3Start.time, starttime)).startOf("second").format("mm:ss"),
  //     bossAbility: "Phase 3",
  //   });
  // }

  // Add Phase 1 and Phase 2 events to the events array
  events.push({ time: "00:00", bossAbility: "Phase 1" });

  // Phase 2 Start
  if (logGuids.includes(voidEmpowermentPhase2ID)) {
    const voidEmpowermentPhase2Events = enemyCasts.filter((event) => event.ability.guid === voidEmpowermentPhase2ID)[0];
    events.push({
      time: moment.utc(fightDuration(voidEmpowermentPhase2Events.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: "Phase 2",
    });
  }

  // Phase 3 Start
  if (logGuids.includes(voidEmpowermentPhase3ID)) {
    const voidEmpowermentPhase3Events = enemyCasts.filter((event) => event.ability.guid === voidEmpowermentPhase3ID)[0];
    events.push({
      time: moment.utc(fightDuration(voidEmpowermentPhase3Events.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: "Phase 3",
    });
  }

  // Scorching Detonation (401525) - https://www.wowhead.com/spell=401525/scorching-detonation
  if (logGuids.includes(scorchingDetonationID)) {
    const clusterEvents = 3;
    const clusterTimeframe = 4000;
    const threshold = 10000;

    const scorchingDetonationEvents = damageTakenData.filter((event) => event.ability.guid === scorchingDetonationID);

    const scorchingDetonationEventsReduced = scorchingDetonationEvents.filter((event, i) => {
      const nextEvents = scorchingDetonationEvents.slice(i + 1, i + clusterEvents + 1);
      return nextEvents.every((nextEvent) => nextEvent.timestamp >= event.timestamp && nextEvent.timestamp < event.timestamp + clusterTimeframe);
    });

    let lastChosenTimestamp = scorchingDetonationEventsReduced[0]?.timestamp;

    if (lastChosenTimestamp) {
      events.push({
        time: moment.utc(fightDuration(lastChosenTimestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: scorchingDetonationID,
      });

      scorchingDetonationEventsReduced.reduce((chosenTimestamp, event) => {
        if (event.timestamp > chosenTimestamp + threshold) {
          events.push({
            time: moment.utc(fightDuration(event.timestamp, starttime)).startOf("second").format("mm:ss"),
            bossAbility: scorchingDetonationID,
          });
          return event.timestamp;
        }
        return chosenTimestamp;
      }, lastChosenTimestamp);
    }
  }

  // Echoing Howl (403319) - https://www.wowhead.com/spell=403319/echoing-howl
  if (logGuids.includes(echoingHowlID)) {
    const clusterEvents = 3;
    const clusterTimeframe = 4000;
    const threshold = 10000;

    const echoingHowlEvents = damageTakenData.filter((event) => event.ability.guid === echoingHowlID);

    const echoingHowlEventsReduced = echoingHowlEvents.filter((event, i) => {
      const nextEvents = echoingHowlEvents.slice(i + 1, i + clusterEvents + 1);
      return nextEvents.every((nextEvent) => nextEvent.timestamp >= event.timestamp && nextEvent.timestamp < event.timestamp + clusterTimeframe);
    });

    let lastChosenTimestamp = echoingHowlEventsReduced[0]?.timestamp;

    if (lastChosenTimestamp) {
      events.push({
        time: moment.utc(fightDuration(lastChosenTimestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: echoingHowlID,
      });

      echoingHowlEventsReduced.reduce((chosenTimestamp, event) => {
        if (event.timestamp > chosenTimestamp + threshold) {
          events.push({
            time: moment.utc(fightDuration(event.timestamp, starttime)).startOf("second").format("mm:ss"),
            bossAbility: echoingHowlID,
          });
          return event.timestamp;
        }
        return chosenTimestamp;
      }, lastChosenTimestamp);
    }
  }

  // Dread (404300) - https://www.wowhead.com/spell=404300/dread
  if (logGuids.includes(dreadID)) {
    const clusterEvents = 3;
    const clusterTimeframe = 4000;
    const threshold = 25000;

    const dreadEvents = damageTakenData.filter((event) => event.ability.guid === dreadID);

    const dreadEventsReduced = dreadEvents.filter((event, i) => {
      const nextEvents = dreadEvents.slice(i + 1, i + clusterEvents + 1);
      return nextEvents.every((nextEvent) => nextEvent.timestamp >= event.timestamp && nextEvent.timestamp < event.timestamp + clusterTimeframe);
    });

    let lastChosenTimestamp = dreadEventsReduced[0]?.timestamp;

    if (lastChosenTimestamp) {
      events.push({
        time: moment.utc(fightDuration(lastChosenTimestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: dreadID,
      });

      dreadEventsReduced.reduce((chosenTimestamp, event) => {
        if (event.timestamp > chosenTimestamp + threshold) {
          events.push({
            time: moment.utc(fightDuration(event.timestamp, starttime)).startOf("second").format("mm:ss"),
            bossAbility: dreadID,
          });
          return event.timestamp;
        }
        return chosenTimestamp;
      }, lastChosenTimestamp);
    }
  }

  return events;
}
