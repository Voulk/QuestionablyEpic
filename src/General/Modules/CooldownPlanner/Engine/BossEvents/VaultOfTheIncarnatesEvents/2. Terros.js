import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createEranogEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const seismicAssault = [381576, 381595];

  const enemyData = enemyEnergy["series"].filter((filter) => filter.guid === 184972);
  const enemyEnergyData = Object.entries(enemyData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      energy: key[1][1],
    };
  });

  // Seismic Assault
  if (logGuids.includes(seismicAssault)) {
    const seismicAssaultEvents = damageTakenData.filter((filter) => seismicAssault.contains(filter.ability.guid));
    const threshold = 5000;
    const firstPulse = seismicAssaultEvents.map((key) => key)[0];

    events.push({
      time: moment.utc(fightDuration(firstPulse.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: seismicAssault,
    });

    let lastChosen = seismicAssaultEvents.map((key) => key.timestamp)[0];

    seismicAssaultEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: seismicAssault });
      }
    });
  }

  return events;
}
