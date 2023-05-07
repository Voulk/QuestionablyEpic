import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

// This function creates boss events for the Amalgamation encounter
export default function createZskarnEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];

//   const logGuids = enemyCasts.map((key) => key.ability.guid);

//   const tacticalDestruction = 406678;

  //   console.log(logGuids);
  //   console.log(logGuids.includes(tacticalDestruction));
  //   // Surging Azerite
  //   if (logGuids.includes(tacticalDestruction)) {
  //     const tacticalDestructionEvents = damageTakenData.filter((filter) => filter.ability.guid === tacticalDestruction);
  //     events.push(
  //       tacticalDestructionEvents.map((key) => {
  //         return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: tacticalDestruction };
  //       })[0],
  //     );

  //     let lastChosen = tacticalDestructionEvents.map((key) => key.timestamp)[0];

  //     tacticalDestructionEvents.map((key) => {
  //       if (key.timestamp > lastChosen + threshold) {
  //         lastChosen = key.timestamp;
  //         events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: tacticalDestruction });
  //       }
  //     });
  //   }

  return events;
}
