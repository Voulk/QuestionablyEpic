import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createRashokEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  const conduitFlare = 405828;

  // conduitFlare
  if (logGuids.includes(conduitFlare)) {
    const clusterEvents = 3;
    const clusterTimeframe = 4000;
    const conduitFlareEvents = damageTakenData.filter((filter) => filter.ability.guid === conduitFlare);
    const conduitFlareEventsReduced = conduitFlareEvents.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < conduitFlareEvents.length) {
          const comparisonTimestamp = conduitFlareEvents[a + i].timestamp;
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
    const firstEvent = conduitFlareEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: conduitFlare });

    // set
    let lastChosen = firstEvent.timestamp;

    conduitFlareEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        // Original Event
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: conduitFlare });
      }
    });
  }

  return events;
}
