import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createEranogEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const collapsingArmy = 370307;
  const pulsingFlames = 370410;
  const flameRift = 390715;

  const enemyData = enemyEnergy["series"].filter((filter) => filter.guid === 184972);
  const enemyEnergyData = Object.entries(enemyData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      energy: key[1][1],
    };
  });

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Phase 1 Events                                         */
  /* ---------------------------------------------------------------------------------------------- */

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  if (logGuids.includes(collapsingArmy)) {
    const collapsingArmyRemoved = buffData.filter((filter) => filter.ability.guid === collapsingArmy && filter.type === "removebuff");
    collapsingArmyRemoved.map((key) =>
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 1",
      }),
    );
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Phase 2 Events                                         */
  /* ---------------------------------------------------------------------------------------------- */
  const phase2One = enemyEnergyData.filter((filter) => filter.energy === 100)[0];
  const phase2Two = enemyEnergyData.filter((filter) => filter.energy === 100)[1];
  const phase2Three = enemyEnergyData.filter((filter) => filter.energy === 100)[2];

  events.push({ time: "00:00", bossAbility: "Phase 1" });

  // Push 1st Phase 2 to events
  phase2One !== undefined
    ? events.push({
        time: moment.utc(fightDuration(phase2One.time, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 2",
      })
    : "";

  // Push 2nd Phase 2 to events
  phase2Two !== undefined
    ? events.push({
        time: moment.utc(fightDuration(phase2Two.time, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 2",
      })
    : "";

  // Push 3rd Phase 2 to events
  phase2Three !== undefined
    ? events.push({
        time: moment.utc(fightDuration(phase2Three.time, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 2",
      })
    : "";

  // Pulsing Flames
  if (logGuids.includes(pulsingFlames)) {
    const pulsingFlamesEvents = damageTakenData.filter((filter) => filter.ability.guid === pulsingFlames);
    const threshold = 30000;
    const firstPulse = pulsingFlamesEvents.map((key) => key)[0];

    events.push({
      time: moment.utc(fightDuration(firstPulse.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: pulsingFlames,
    });

    events.push({
      time: moment
        .utc(fightDuration(firstPulse.timestamp + 7000, starttime))
        .startOf("second")
        .format("mm:ss"),
      bossAbility: pulsingFlames,
    });

    events.push({
      time: moment
        .utc(fightDuration(firstPulse.timestamp + 14000, starttime))
        .startOf("second")
        .format("mm:ss"),
      bossAbility: pulsingFlames,
    });

    let lastChosen = pulsingFlamesEvents.map((key) => key.timestamp)[0];

    pulsingFlamesEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: pulsingFlames });
        events.push({
          time: moment
            .utc(fightDuration(key.timestamp + 7000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: pulsingFlames,
        });
        events.push({
          time: moment
            .utc(fightDuration(key.timestamp + 14000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: pulsingFlames,
        });
      }
    });
  }

  // Stellar Decay
  if (logGuids.includes(flameRift)) {
    const clusterEvents = 1; // Number of events we'd like to see within X seconds of the first debuff.
    const clusterTimeframe = 5000; // We'll check this amount of time after our first event.
    const flameRiftEvents = debuffs.filter((filter) => filter.ability.guid === flameRift && filter.type === "applydebuff"); // filter dubuffs to stellar decay
    const flameRiftEventsReduced = flameRiftEvents.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < flameRiftEvents.length) {
          const comparisonTimestamp = flameRiftEvents[a + i].timestamp;
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
    const firstEvent = flameRiftEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: flameRift });
    // 1st Simulated Event

    // set
    let lastChosen = firstEvent.timestamp;

    flameRiftEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        // Original Event
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: flameRift });
      }
    });
  }

  return events;
}
