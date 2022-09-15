import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createFatescribeEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const realignFate = 357739;
  const invokeDestiny = 351685;
  const phase2Events = buffData.filter((filter) => filter.ability.guid === realignFate && filter.type === "applybuff");
  const returnPhase1Events = buffData.filter((filter) => filter.ability.guid === realignFate && filter.type === "removebuff");
  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Phase Changes                                         */
  /* ---------------------------------------------------------------------------------------------- */
  // Push Phase 1 Object into events
  events.push({ time: "00:00", bossAbility: "Phase 1" });
  // Push Phase 2 Events
  phase2Events !== [] ? phase2Events.map((key) => events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" })) : "";
  // Push Phase 1 Events
  returnPhase1Events !== []
    ? returnPhase1Events.map((key) => events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 1" }))
    : "";

  if (logGuids.includes(invokeDestiny)) {
    const invokeDestinyEvents = damageTakenData.filter((filter) => filter.ability.guid === invokeDestiny);
    const threshold = 15000;
    events.push(
      invokeDestinyEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: invokeDestiny };
      })[0],
    );

    let lastChosen = invokeDestinyEvents.map((key) => key.timestamp)[0];

    invokeDestinyEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: invokeDestiny });
      }
    });
  }
  return events;
}
