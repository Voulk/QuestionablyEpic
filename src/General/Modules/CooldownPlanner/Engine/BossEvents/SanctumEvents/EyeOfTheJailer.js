import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createEyeEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const stygianDarkShield = 348805;
  const phase2Events = buffData.filter((filter) => filter.ability.guid === stygianDarkShield && filter.type === "applybuff");
  const returnPhase1Events = buffData.filter((filter) => filter.ability.guid === stygianDarkShield && filter.type === "removebuff");
  const firstReturn = returnPhase1Events[0];
  const secondReturn = returnPhase1Events[1];

  const phase2one = phase2Events[0];
  const phase2two = phase2Events[1];

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events
  phase2one !== undefined ? events.push({ time: moment.utc(fightDuration(phase2one.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : ""; // if defined push "Phase 2" event
  firstReturn !== undefined ? events.push({ time: moment.utc(fightDuration(firstReturn.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 1" }) : ""; // if defined push "Phase 1" event
  phase2two !== undefined ? events.push({ time: moment.utc(fightDuration(phase2two.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : ""; // if defined push "Phase 3" event
  secondReturn !== undefined ? events.push({ time: moment.utc(fightDuration(secondReturn.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 1" }) : ""; // if defined push "Phase 1" event

  return events;
}
