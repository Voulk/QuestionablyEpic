import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createLarodarEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  const consumingFlame = 421316;
  const consumingFlameCastDuration = 16000;

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid));

  if (logGuids.includes(consumingFlame)) {
    const consumingFlameCast = enemyCasts.filter((filter) => filter.ability.guid === consumingFlame);

    consumingFlameCast.map((key) =>
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
          bossAbility: consumingFlame,
        },
        {
          time: moment
            .utc(fightDuration(key.timestamp + consumingFlameCastDuration, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Phase 2",
        },
      ),
    );
  }

  return events;
}
