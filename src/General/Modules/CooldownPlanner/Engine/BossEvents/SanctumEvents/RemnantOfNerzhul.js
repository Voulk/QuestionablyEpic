import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createRemnantEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];

  const malevolence = 350427;
  const logGuids = damageTakenData.map((key) => key.ability.guid);
  // Malevolence Dispels (Damage Taken)
  if (logGuids.includes(malevolence)) {
    const malevolenceEvents = damageTakenData.filter((filter) => filter.ability.guid === malevolence);
    const threshold = 10000;
    events.push(
      malevolenceEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: malevolence };
      })[0],
    );

    let lastChosen = malevolenceEvents.map((key) => key.timestamp)[0];

    malevolenceEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: malevolence });
      }
    });
  }

  return events;
}
