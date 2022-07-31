import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createSludgefistEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));
  const destructiveImpact = 332969;

  if (logGuids.includes(destructiveImpact)) {
    const destructiveImpactEvents = damageTakenData.filter((filter) => filter.ability.guid === destructiveImpact);
    const threshold = 10000;
    events.push(
      destructiveImpactEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: destructiveImpact };
      })[0],
    );

    let lastChosen = destructiveImpactEvents.map((key) => key.timestamp)[0];

    destructiveImpactEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: destructiveImpact });
      }
    });
  }

  return events;
}
