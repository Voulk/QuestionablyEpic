import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createDatheaEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const staticDischarge = 391717;
  const conductiveMark = 391686;

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  // staticDischarge
  // if (logGuids.includes(staticDischarge)) {
  //   const staticDischargeEvents = damageTakenData.filter((filter) => filter.ability.guid === staticDischarge);
  //   const threshold = 15000;
  //   const firstPulse = staticDischargeEvents.map((key) => key)[0];

  //   events.push({
  //     time: moment.utc(fightDuration(firstPulse.timestamp, starttime)).startOf("second").format("mm:ss"),
  //     bossAbility: staticDischarge,
  //   });

  //   let lastChosen = staticDischargeEvents.map((key) => key.timestamp)[0];

  //   staticDischargeEvents.map((key) => {
  //     if (key.timestamp > lastChosen + threshold) {
  //       lastChosen = key.timestamp;
  //       events.push({
  //         time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
  //         bossAbility: staticDischarge,
  //       });
  //     }
  //   });
  // }

   // Infused Fallout
   if (logGuids.includes(conductiveMark)) {
    const clusterEvents = 3; // Number of events we'd like to see within X seconds of the first debuff.
    const clusterTimeframe = 5000; // We'll check this amount of time after our first event.
    const conductiveMarkEvents = debuffs.filter((filter) => filter.ability.guid === conductiveMark && filter.type === "applydebuff"); // filter dubuffs to conductiveMark
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
    const threshold = 15000;

    // find the first event
    const firstEvent = conductiveMarkEventsReduced[0];
    // Original Event
    events.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: conductiveMark });

    let lastChosen = firstEvent.timestamp;

    conductiveMarkEventsReduced.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: conductiveMark });
      }
    });
  }

  return events;
}
