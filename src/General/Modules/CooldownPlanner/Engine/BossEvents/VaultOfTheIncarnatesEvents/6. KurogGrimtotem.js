import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createKurogEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const primalShift = 374861;
  const primalBarrier = 374779; // start / end of p2

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Phase 1 Events                                         */
  /* ---------------------------------------------------------------------------------------------- */

  if (logGuids.includes(primalBarrier)) {
    const primalBarrierRemoved = buffData.filter((filter) => filter.ability.guid === primalBarrier && filter.type === "applybuff");
    primalBarrierRemoved.map((key) =>
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 2",
      }),
    );
  }

  if (logGuids.includes(primalBarrier)) {
    const primalBarrierRemoved = buffData.filter((filter) => filter.ability.guid === primalBarrier && filter.type === "removebuff");
    primalBarrierRemoved.map((key) =>
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 1",
      }),
    );
  }

  // Chilling Aura
  // This needs to be looked at, maybe work off debuffs?
  if (logGuids.includes(primalShift)) {
    const primalShiftEvents = damageTakenData.filter((filter) => filter.ability.guid === primalShift);
    const threshold = 10000;
    const firstPulse = primalShiftEvents.map((key) => key)[0];

    events.push({
      time: moment.utc(fightDuration(firstPulse.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: primalShift,
    });

    let lastChosen = primalShiftEvents.map((key) => key.timestamp)[0];

    primalShiftEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({
          time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
          bossAbility: primalShift,
        });
      }
    });
  }

  return events;
}
