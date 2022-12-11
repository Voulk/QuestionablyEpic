import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createTerrosEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const seismicAssault = [381576, 381595];
  const infusedFallout = 391592;

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  // Seismic Assault
  if (logGuids.includes(seismicAssault)) {
    const seismicAssaultEvents = damageTakenData.filter((filter) => seismicAssault.contains(filter.ability.guid));
    const threshold = 5000;
    const firstPulse = seismicAssaultEvents.map((key) => key)[0];

    events.push({
      time: moment.utc(fightDuration(firstPulse.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: seismicAssault,
    });

    let lastChosen = seismicAssaultEvents.map((key) => key.timestamp)[0];

    seismicAssaultEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: seismicAssault });
      }
    });
  }

  // Infused Fallout
  if (logGuids.includes(infusedFallout)) {
    const clusterEvents = 3; // Number of events we'd like to see within X seconds of the first debuff.
    const clusterTimeframe = 5000; // We'll check this amount of time after our first event.
    const infusedFalloutEvents = debuffs.filter((filter) => filter.ability.guid === infusedFallout && filter.type === "applydebuff"); // filter dubuffs to infusedFallout
    const infusedFalloutEventsReduced = infusedFalloutEvents.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < infusedFalloutEvents.length) {
          const comparisonTimestamp = infusedFalloutEvents[a + i].timestamp;
          if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
            entryOk = false;
          }
        }
      }
      return entryOk;
    });

    // time until we want to check for the next event. i.e 60 seconds after the 1st event.
    const threshold = 10000;

    // find the first event
    const firstEvent = infusedFalloutEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: infusedFallout });

    let lastChosen = firstEvent.timestamp;

    infusedFalloutEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: infusedFallout });
      }
    });
  }

  return events;
}
