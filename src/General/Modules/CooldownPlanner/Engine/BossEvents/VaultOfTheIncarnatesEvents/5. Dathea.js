import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createDatheaEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const staticDischarge = 391717;

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  // staticDischarge
  if (logGuids.includes(staticDischarge)) {
    const staticDischargeEvents = damageTakenData.filter((filter) => filter.ability.guid === staticDischarge);
    const threshold = 10000;
    const firstPulse = staticDischargeEvents.map((key) => key)[0];

    events.push({
      time: moment.utc(fightDuration(firstPulse.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: staticDischarge,
    });

    let lastChosen = staticDischargeEvents.map((key) => key.timestamp)[0];

    staticDischargeEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({
          time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
          bossAbility: staticDischarge,
        });
      }
    });
  }

  return events;
}
