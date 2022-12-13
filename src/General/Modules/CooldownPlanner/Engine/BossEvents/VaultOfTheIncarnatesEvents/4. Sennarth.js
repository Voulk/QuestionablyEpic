import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createSennarthEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const chillingAura = 373817;

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
  // This needs to be looked at
  if (logGuids.includes(chillingAura)) {
    const chillingAuraEvents = damageTakenData.filter((filter) => filter.ability.guid === chillingAura);
    const threshold = 30000;
    const firstPulse = chillingAuraEvents.map((key) => key)[0];

    events.push({
      time: moment.utc(fightDuration(firstPulse.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: chillingAura,
    });
    events.push({
      time: moment
        .utc(fightDuration(firstPulse.timestamp + 10000, starttime))
        .startOf("second")
        .format("mm:ss"),
      bossAbility: chillingAura,
    });
    // events.push({
    //   time: moment
    //     .utc(fightDuration(firstPulse.timestamp + 20000, starttime))
    //     .startOf("second")
    //     .format("mm:ss"),
    //   bossAbility: chillingAura,
    // });

    let lastChosen = chillingAuraEvents.map((key) => key.timestamp)[0];

    chillingAuraEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({
          time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
          bossAbility: chillingAura,
        });
        events.push({
          time: moment
            .utc(fightDuration(key.timestamp + 10000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: chillingAura,
        });
        // events.push({
        //   time: moment
        //     .utc(fightDuration(key.timestamp + 20000, starttime))
        //     .startOf("second")
        //     .format("mm:ss"),
        //   bossAbility: chillingAura,
        // });
      }
    });
  }

  return events;
}
