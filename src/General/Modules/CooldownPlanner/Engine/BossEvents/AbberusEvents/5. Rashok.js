import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createRashokEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  const scorchingHeatwave = 404448;
  const doomFlame = 408857;

  // scorchingHeatwave
  if (logGuids.includes(scorchingHeatwave)) {
    const clusterEvents = 3;
    const clusterTimeframe = 4000;
    const interval = 6000;
    const scorchingHeatwaveEvents = damageTakenData.filter((filter) => filter.ability.guid === scorchingHeatwave);
    const scorchingHeatwaveEventsReduced = scorchingHeatwaveEvents.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < scorchingHeatwaveEvents.length) {
          const comparisonTimestamp = scorchingHeatwaveEvents[a + i].timestamp;
          if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
            entryOk = false;
          }
        }
      }
      return entryOk;
    });

    // time until we want to check for the next event. i.e 60 seconds after the 1st event.
    const threshold = 30000;

    // find the first event
    const firstEvent = scorchingHeatwaveEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: scorchingHeatwave });
    events.push({
      time: moment
        .utc(fightDuration(firstEvent.timestamp + interval, starttime))
        .startOf("second")
        .format("mm:ss"),
      bossAbility: scorchingHeatwave,
    });
    events.push({
      time: moment
        .utc(fightDuration(firstEvent.timestamp + interval * 2, starttime))
        .startOf("second")
        .format("mm:ss"),
      bossAbility: scorchingHeatwave,
    });

    // set
    let lastChosen = firstEvent.timestamp;

    scorchingHeatwaveEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        // Original Event
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: scorchingHeatwave });
        events.push({
          time: moment
            .utc(fightDuration(key.timestamp + interval, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: scorchingHeatwave,
        });
        events.push({
          time: moment
            .utc(fightDuration(key.timestamp + interval * 2, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: scorchingHeatwave,
        });
      }
    });
  }

  // doomFlame
  if (logGuids.includes(doomFlame)) {
    const clusterEvents = 3;
    const clusterTimeframe = 4000;
    const interval = 8000;
    const doomFlameEvents = damageTakenData.filter((filter) => filter.ability.guid === doomFlame);
    const doomFlameEventsReduced = doomFlameEvents.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < doomFlameEvents.length) {
          const comparisonTimestamp = doomFlameEvents[a + i].timestamp;
          if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
            entryOk = false;
          }
        }
      }
      return entryOk;
    });

    // time until we want to check for the next event. i.e 60 seconds after the 1st event.
    const threshold = 30000;

    // find the first event
    const firstEvent = doomFlameEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: doomFlame });
    events.push({
      time: moment
        .utc(fightDuration(firstEvent.timestamp + interval, starttime))
        .startOf("second")
        .format("mm:ss"),
      bossAbility: doomFlame,
    });

    // set
    let lastChosen = firstEvent.timestamp;

    doomFlameEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        // Original Event
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: doomFlame });
        events.push({
          time: moment
            .utc(fightDuration(key.timestamp + interval, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: doomFlame,
        });
      }
    });
  }

  return events;
}
