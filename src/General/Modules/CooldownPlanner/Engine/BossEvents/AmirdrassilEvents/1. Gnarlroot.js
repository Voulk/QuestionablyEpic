import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createGnarlrootEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime, enemyDebuffData) {
  let events = [];

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  const taintedBloom = 421986;
  const doomCultivation = 421013;
  const uprootedAgony = 421840;

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(enemyDebuffData.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  // Conductive Mark
  if (logGuids.includes(taintedBloom)) {
    const clusterEvents = 1; // Number of events we'd like to see within X seconds of the first debuff.
    const clusterTimeframe = 7000; // We'll check this amount of time after our first event.
    const taintedBloomEvents = damageTakenData.filter((filter) => filter.ability.guid === taintedBloom); // filter dubuffs to stellar decay
    const taintedBloomEventsReduced = taintedBloomEvents.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < taintedBloomEvents.length) {
          const comparisonTimestamp = taintedBloomEvents[a + i].timestamp;
          if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
            entryOk = false;
          }
        }
      }
      return entryOk;
    });

    // time until we want to check for the next event. i.e 60 seconds after the 1st event.
    const threshold = 12000;

    // find the first event
    const firstEvent = taintedBloomEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: taintedBloom });
    // 1st Simulated Event

    // set
    let lastChosen = firstEvent.timestamp;

    taintedBloomEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        // Original Event
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: taintedBloom });
      }
    });
  }

  if (logGuids.includes(doomCultivation)) {
    const doomCultivationApplied = buffData.filter((filter) => filter.ability.guid === doomCultivation && filter.type === "applybuff");

    doomCultivationApplied.map((key) =>
      events.push(
        {
          time: moment
            .utc(fightDuration(key.timestamp - 1000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Intermission",
        },
        {
          time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
          bossAbility: doomCultivation,
        },
      ),
    );
  }

  if (logGuids.includes(uprootedAgony)) {
    const uprootedAgonyRemoved = enemyDebuffData.filter((filter) => filter.ability.guid === uprootedAgony && filter.type === "removedebuff");

    uprootedAgonyRemoved.map((key, i) => {
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 1",
      });
    });
  }

  return events;
}
