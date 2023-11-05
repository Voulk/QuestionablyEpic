import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createGnarlrootEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  const markedforTorment = 422776;
  const markedforTormentCastDuration = 20000;

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid));

  if (logGuids.includes(markedforTorment)) {
    const markedforTormentCast = enemyCasts.filter((filter) => filter.ability.guid === markedforTorment);

    markedforTormentCast.map((key) =>
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
          bossAbility: markedforTorment,
        },
        {
          time: moment
            .utc(fightDuration(key.timestamp + markedforTormentCastDuration, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Phase 1",
        },
      ),
    );
  }

  return events;
}
