import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createCouncilOfBloodEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid));
  const danseMacabre = 328497;
  const dancingFever = 347350;

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Phase Changes                                         */
  /* ---------------------------------------------------------------------------------------------- */
  if (logGuids.includes(danseMacabre)) {
    const danseMacabreEvents = enemyCasts.filter((filter) => filter.ability.guid === danseMacabre);
    const danseMacabreOne = danseMacabreEvents[0];
    const danseMacabreTwo = danseMacabreEvents[1];
    const danseMacabreThree = danseMacabreEvents[2];

    danseMacabreOne !== undefined ? events.push({ time: moment.utc(fightDuration(danseMacabreOne.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" }) : "";
    danseMacabreTwo !== undefined ? events.push({ time: moment.utc(fightDuration(danseMacabreTwo.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" }) : "";
    danseMacabreThree !== undefined ? events.push({ time: moment.utc(fightDuration(danseMacabreThree.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" }) : "";
  }

  if (logGuids.includes(dancingFever)) {
    const dancingFeverEvents = debuffs.filter((filter) => filter.ability.guid === dancingFever);
    const threshold = 30000;
    events.push(
      dancingFeverEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: dancingFever };
      })[0],
    );

    let lastChosen = dancingFeverEvents.map((key) => key.timestamp)[0];

    dancingFeverEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: dancingFever });
      }
    });
  }

  return events;
}
