import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createNymueEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(buffData.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid));

  const surgingGrowth = 425357;
  const lifeWard = 413443;
  const fullBloom = 426855;


  // not working properly
  // if (logGuids.includes(surgingGrowth)) {
  //   const clusterEvents = 3; // Number of events we'd like to see within X seconds of the first debuff.
  //   const clusterTimeframe = 65000; // We'll check this amount of time after our first event.
  //   const surgingGrowthEvents = damageTakenData.filter((filter) => filter.ability.guid === surgingGrowth); // filter dubuffs to stellar decay
  //   const surgingGrowthEventsReduced = surgingGrowthEvents.filter((filter, i) => {
  //     let entryOk = true;
  //     for (var a = 1; a <= clusterEvents; a++) {
  //       if (a + i < surgingGrowthEvents.length) {
  //         const comparisonTimestamp = surgingGrowthEvents[a + i].timestamp;
  //         if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
  //           entryOk = false;
  //         }
  //       }
  //     }
  //     return entryOk;
  //   });

  //   // time until we want to check for the next event. i.e 60 seconds after the 1st event.
  //   const threshold = 65000;

  //   // total events to add
  //   const totalEvents = 5;

  //   let lastChosen = surgingGrowthEventsReduced[0].timestamp;

  //   surgingGrowthEventsReduced.map((key) => {
  //     if (key.timestamp > lastChosen + threshold) {
  //       lastChosen = key.timestamp;
  //       for (let i = 0; i < totalEvents; i++) {
  //         events.push({
  //           time: moment
  //             .utc(fightDuration(lastChosen + i * 1000, starttime))
  //             .startOf("second")
  //             .format("mm:ss"),
  //           bossAbility: surgingGrowth,
  //         });
  //       }
  //     }
  //   });
  // }

  // Start Intermission
  if (logGuids.includes(fullBloom)) {
    const fullBloomCast = enemyCasts.filter((filter) => filter.ability.guid === fullBloom);

    fullBloomCast.map((key) =>
      events.push({
        time: moment
          .utc(fightDuration(key.timestamp - 1000, starttime))
          .startOf("second")
          .format("mm:ss"),
        bossAbility: "Intermission",
      }),
    );
  }

  // End Intermission
  if (logGuids.includes(lifeWard)) {
    const lifeWardRemoved = buffData.filter((filter) => filter.ability.guid === lifeWard && filter.type === "removebuff");

    lifeWardRemoved.map((key, i) => {
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 2",
      });
    });
  }

  return events;
}
