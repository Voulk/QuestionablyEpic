import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createPrimalistCouncilEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const conductiveMark = 371624;

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  // Conductive Mark
  if (logGuids.includes(conductiveMark)) {
    const clusterEvents = 1; // Number of events we'd like to see within X seconds of the first debuff.
    const clusterTimeframe = 20000; // We'll check this amount of time after our first event.
    const conductiveMarkEvents = debuffs.filter((filter) => filter.ability.guid === conductiveMark && filter.type === "applydebuff"); // filter dubuffs to stellar decay
    const conductiveMarkEventsReduced = conductiveMarkEvents.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < conductiveMarkEvents.length) {
          const comparisonTimestamp = conductiveMarkEvents[a + i].timestamp;
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
    const firstEvent = conductiveMarkEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: conductiveMark });
    // 1st Simulated Event

    // set
    let lastChosen = firstEvent.timestamp;

    conductiveMarkEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        // Original Event
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: conductiveMark });
      }
    });
  }

  return events;
}
