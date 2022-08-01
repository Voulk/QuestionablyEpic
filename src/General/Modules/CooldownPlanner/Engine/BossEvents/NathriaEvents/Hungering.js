import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createHungeringEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));
  const expunge = 329742;

  if (logGuids.includes(expunge)) {
    const expungeEvents = damageTakenData.filter((filter) => filter.ability.guid === expunge);
    const threshold = 30000;
    events.push(
      expungeEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: expunge };
      })[0],
    );

    let lastChosen = expungeEvents.map((key) => key.timestamp)[0];

    expungeEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: expunge });
      }
    });
  }

  return events;
}
