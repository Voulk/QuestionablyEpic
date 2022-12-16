import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createKurogEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const primalShift = 374861;
  const primalBarrier = 374779; // start / end of p2
  const flameDominance = 396106;
  const frostDominance = 396109;
  const earthDominance = 396085;
  const stormDominance = 396113;
  const blisteringPresence = 396201; // We will use the flame adds ID for the events

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Phase Events                                          */
  /* ---------------------------------------------------------------------------------------------- */

  if (logGuids.includes(primalBarrier)) {
    const primalBarrierApplied = buffData.filter((filter) => filter.ability.guid === primalBarrier && filter.type === "applybuff");
    const primalBarrierRemoved = buffData.filter((filter) => filter.ability.guid === primalBarrier && filter.type === "removebuff");

    primalBarrierApplied.map((key) =>
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 2",
      }),
    );

    primalBarrierRemoved.map((key, i) => {
      if (i === primalBarrierRemoved.length - 1) {
        events.push({
          time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
          bossAbility: "Phase 3",
        });
      } else {
        events.push({
          time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
          bossAbility: "Phase 1",
        });
      }
    });

    const interval = 15000;
    let phaseTwoOneStart = 0;
    let phaseTwoOneEnd = 0;

    if (primalBarrierApplied && primalBarrierApplied.length > 0) {
      phaseTwoOneStart = primalBarrierApplied[0].timestamp;
      phaseTwoOneEnd = primalBarrierRemoved[0].timestamp;

      for (var z = phaseTwoOneStart + interval; z <= phaseTwoOneEnd; ) {
        events.push({
          time: moment.utc(fightDuration(z, starttime)).startOf("second").format("mm:ss"),
          bossAbility: blisteringPresence,
        });
        z = z + interval;
      }
    }

    let phaseTwoTwoStart = 0;
    let phaseTwoTwoEnd = 0;
    if (primalBarrierApplied && primalBarrierApplied.length > 1) {
      phaseTwoTwoStart = primalBarrierApplied[1].timestamp;
      phaseTwoTwoEnd = primalBarrierRemoved[1].timestamp;

      for (var x = phaseTwoTwoStart + interval; x <= phaseTwoTwoEnd; ) {
        events.push({
          time: moment.utc(fightDuration(x, starttime)).startOf("second").format("mm:ss"),
          bossAbility: blisteringPresence,
        });
        x = x + interval;
      }
    }
  }

  // Flame Dominance event generator.
  // for each INTERVAL after the first instance of the debuff add an event to the array
  if (logGuids.includes(flameDominance)) {
    const flameDominanceApplicationEvents = debuffs.filter((filter) => filter.ability.guid === flameDominance && filter.type === "applydebuff");
    const flameDominanceRemoveEvents = debuffs.filter((filter) => filter.ability.guid === flameDominance && filter.type === "removedebuff");
    const flameAltarStart = flameDominanceApplicationEvents[0].timestamp;
    const flameAltarEnd = flameDominanceRemoveEvents[flameDominanceRemoveEvents.length - 1].timestamp;
    const interval = 15000; // 4 ticks

    for (var a = flameAltarStart; a <= flameAltarEnd; ) {
      events.push({
        time: moment.utc(fightDuration(a, starttime)).startOf("second").format("mm:ss"),
        bossAbility: flameDominance,
      });
      a = a + interval;
    }
  }

  // Frost Dominance event generator.
  // for each INTERVAL after the first instance of the debuff add an event to the array
  if (logGuids.includes(frostDominance)) {
    const frostDominanceApplicationEvents = debuffs.filter((filter) => filter.ability.guid === frostDominance && filter.type === "applydebuff");
    const frostDominanceRemoveEvents = debuffs.filter((filter) => filter.ability.guid === frostDominance && filter.type === "removedebuff");
    const frostAltarStart = frostDominanceApplicationEvents[0].timestamp;
    const frostAltarEnd = frostDominanceRemoveEvents[frostDominanceRemoveEvents.length - 1].timestamp;
    const interval = 15000; // 4 ticks

    for (var a = frostAltarStart; a <= frostAltarEnd; ) {
      events.push({
        time: moment.utc(fightDuration(a, starttime)).startOf("second").format("mm:ss"),
        bossAbility: frostDominance,
      });
      a = a + interval;
    }
  }

  // Earth Dominance event generator.
  // for each INTERVAL after the first instance of the debuff add an event to the array
  if (logGuids.includes(earthDominance)) {
    const earthDominanceApplicationEvents = debuffs.filter((filter) => filter.ability.guid === earthDominance && filter.type === "applydebuff");
    const earthDominanceRemoveEvents = debuffs.filter((filter) => filter.ability.guid === earthDominance && filter.type === "removedebuff");
    const earthAltarStart = earthDominanceApplicationEvents[0].timestamp;
    const earthAltarEnd = earthDominanceRemoveEvents[earthDominanceRemoveEvents.length - 1].timestamp;
    const interval = 15000; // 4 ticks

    for (var a = earthAltarStart; a <= earthAltarEnd; ) {
      events.push({
        time: moment.utc(fightDuration(a, starttime)).startOf("second").format("mm:ss"),
        bossAbility: earthDominance,
      });
      a = a + interval;
    }
  }

  // Storm Dominance event generator.
  // for each INTERVAL after the first instance of the debuff add an event to the array
  if (logGuids.includes(stormDominance)) {
    const stormDominanceApplicationEvents = debuffs.filter((filter) => filter.ability.guid === stormDominance && filter.type === "applydebuff");
    const stormDominanceRemoveEvents = debuffs.filter((filter) => filter.ability.guid === stormDominance && filter.type === "removedebuff");
    const stormAltarStart = stormDominanceApplicationEvents[0].timestamp;
    const stormAltarEnd = stormDominanceRemoveEvents[stormDominanceRemoveEvents.length - 1].timestamp;
    const interval = 15000; // 4 ticks

    for (var a = stormAltarStart; a <= stormAltarEnd; ) {
      events.push({
        time: moment.utc(fightDuration(a, starttime)).startOf("second").format("mm:ss"),
        bossAbility: stormDominance,
      });
      a = a + interval;
    }
  }

  // Primal Shift
  // Alter Changes
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
