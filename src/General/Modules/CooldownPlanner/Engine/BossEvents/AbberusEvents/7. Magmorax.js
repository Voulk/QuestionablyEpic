import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

// This function creates boss events for the Amalgamation encounter
export default function createMagmoraxEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  const explossiveMagma = 411848;

  // explossiveMagma
  if (logGuids.includes(explossiveMagma)) {
    const clusterEvents = 0; // Number of events we'd like to see within X seconds of the first debuff.
    const clusterTimeframe = 5000; // We'll check this amount of time after our first event.
    const explossiveMagmaEvents = debuffs.filter((filter) => filter.ability.guid === explossiveMagma && filter.type === "applydebuff"); // filter dubuffs to explossiveMagma
    const explossiveMagmaEventsReduced = explossiveMagmaEvents.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < explossiveMagmaEvents.length) {
          const comparisonTimestamp = explossiveMagmaEvents[a + i].timestamp;
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
    const firstEvent = explossiveMagmaEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: explossiveMagma });

    let lastChosen = firstEvent.timestamp;

    explossiveMagmaEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: explossiveMagma });
      }
    });
  }

  return events;
}
