import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createTindralSageswiftEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(buffData.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid));

  const superNovaBuff = 424140;
  const owlIncarnation = 421603;

  if (logGuids.includes(owlIncarnation)) {
    const owlIncarnationApplied = buffData.filter((filter) => filter.ability.guid === owlIncarnation && filter.type === "applybuff");

    owlIncarnationApplied.map((key, i) => {
      events.push({
        time: moment
          .utc(fightDuration(key.timestamp - 1000, starttime))
          .startOf("second")
          .format("mm:ss"),
        bossAbility: "Intermission",
      });
    });
  }

  if (logGuids.includes(superNovaBuff)) {
    const superNovaBuffRemoved = buffData.filter((filter) => filter.ability.guid === superNovaBuff && filter.type === "removebuff");

    const phase2 = superNovaBuffRemoved[0];
    phase2 !== undefined ? events.push({ time: moment.utc(fightDuration(phase2.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : "";

    const phase3 = superNovaBuffRemoved[1];
    phase3 !== undefined ? events.push({ time: moment.utc(fightDuration(phase3.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : "";
  }

  return events;
}
