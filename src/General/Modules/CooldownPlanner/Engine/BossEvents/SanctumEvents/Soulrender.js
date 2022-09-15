import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createSoulrenderEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];

  const unleashedTyranny = 350801;
  const logGuids = damageTakenData.map((key) => key.ability.guid);
  // Malevolence Dispels (Damage Taken)
  if (logGuids.includes(unleashedTyranny)) {
    const unleashedTyrannyEvents = damageTakenData.filter((filter) => filter.ability.guid === unleashedTyranny);
    const threshold = 2000;
    events.push(
      unleashedTyrannyEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: unleashedTyranny };
      })[0],
    );

    let lastChosen = unleashedTyrannyEvents.map((key) => key.timestamp)[0];

    unleashedTyrannyEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: unleashedTyranny });
      }
    });
  }

  return events;
}
