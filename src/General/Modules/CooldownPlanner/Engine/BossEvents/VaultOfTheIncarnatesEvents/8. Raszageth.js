import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createRaszagethEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];
  const encounterEvent = 181089;
  const thunderousEnergy = 390817;
  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid));

  // const enemyData = enemyHealth["series"].filter((filter) => filter.guid === 189492);
  // const enemyHealthData = Object.entries(enemyData[0]["data"]).map((key) => {
  //   return {
  //     time: key[1][0],
  //     health: key[1][1],
  //   };
  // });

  events.push({ time: "00:00", bossAbility: "Phase 1" });

  const encounterEvents = enemyCasts.filter((filter) => filter.ability.guid === encounterEvent);
  console.log(encounterEvents);

  const intermissionOne = encounterEvents[1];
  console.log(intermissionOne);
  const phaseTwo = encounterEvents[2];
  console.log(phaseTwo);
  const intermissionTwo = encounterEvents[3];
  console.log(intermissionTwo);
  const phaseThree = encounterEvents[4];
  console.log(phaseThree);

  // Push first intermission to events
  intermissionOne !== undefined
    ? events.push({
        time: moment.utc(fightDuration(intermissionOne.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Intermission",
      })
    : "";

  // Push Phase 2 to events
  if (intermissionOne !== undefined && phaseTwo !== undefined) {
    events.push({
      time: moment.utc(fightDuration(phaseTwo.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: "Phase 2",
    });
  }

  // Push Intermission 2 to events
  if (phaseTwo !== undefined && intermissionTwo !== undefined) {
    events.push({
      time: moment.utc(fightDuration(intermissionTwo.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: "Intermission",
    });
  }

  // Push Phase 3 to events
  if (intermissionTwo !== undefined && phaseThree !== undefined) {
    events.push({
      time: moment.utc(fightDuration(phaseThree.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: "Phase 3",
    });
  }

  // Pulsing Flames
  if (logGuids.includes(thunderousEnergy)) {
    const thunderousEnergyEvents = damageTakenData.filter((filter) => filter.ability.guid === thunderousEnergy);
    const threshold = 5000;
    const firstPulse = thunderousEnergyEvents.map((key) => key)[0];

    events.push({
      time: moment.utc(fightDuration(firstPulse.timestamp, starttime)).startOf("second").format("mm:ss"),
      bossAbility: thunderousEnergy,
    });

    let lastChosen = thunderousEnergyEvents.map((key) => key.timestamp)[0];

    thunderousEnergyEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: thunderousEnergy });
      }
    });
  }
  return events;
}
