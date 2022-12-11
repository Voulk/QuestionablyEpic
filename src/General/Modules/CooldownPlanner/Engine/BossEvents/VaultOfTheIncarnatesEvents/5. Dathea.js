import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createDatheaEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const staticDischarge = 391717;

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  //   const enemyData = enemyEnergy["series"].filter((filter) => filter.guid === 184972);
  //   const enemyEnergyData = Object.entries(enemyData[0]["data"]).map((key) => {
  //     return {
  //       time: key[1][0],
  //       energy: key[1][1],
  //     };
  //   });

  // Chilling Aura
  // This needs to be looked at, maybe work off debuffs?
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
