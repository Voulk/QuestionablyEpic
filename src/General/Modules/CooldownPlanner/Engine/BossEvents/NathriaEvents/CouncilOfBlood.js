import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createCouncilOfBloodEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];

  const stavros = 166970;
  const niklaus = 166971;
  const frieda = 166969;

  const stavrosData = enemyHealth["series"].filter((filter) => filter.guid === stavros);
  const niklausData = enemyHealth["series"].filter((filter) => filter.guid === niklaus);
  const friedaData = enemyHealth["series"].filter((filter) => filter.guid === frieda);

  const stavrosHealthdata = Object.entries(stavrosData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const niklausHealthData = Object.entries(niklausData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const friedaHealthData = Object.entries(friedaData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  const stavrosDeath = stavrosHealthdata.filter((filter) => filter.health === 0)[0];
  const niklausDeath = niklausHealthData.filter((filter) => filter.health === 0)[0];
  const friedaDeath = friedaHealthData.filter((filter) => filter.health === 0)[0];

  const totalHealthData = [stavrosDeath, niklausDeath, friedaDeath].sort((a, b) => (a.time > b.time && 1) || -1);
  console.log(stavrosHealthdata);
  console.log(stavrosDeath);
  console.log(friedaDeath);
  console.log(totalHealthData);
  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  const danseMacabre = 330959;
  const dancingFever = 347350;

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Phase Changes                                         */
  /* ---------------------------------------------------------------------------------------------- */
  events.push({ time: "00:00", bossAbility: "Phase 1" });
  const phase2 = totalHealthData[0]; // first boss death
  phase2 !== undefined ? events.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : ""; // if valid then push "Phase 2" event
  const phase3 = totalHealthData[1]; // second boss death
  phase3 !== undefined ? events.push({ time: moment.utc(fightDuration(phase3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : ""; // if valid then push "Phase 3" event

  if (logGuids.includes(danseMacabre)) {
    const danseMacabreEvents = buffData.filter((filter) => filter.ability.guid === danseMacabre);
    const macabreDuration = 38000;
    const threshold = 60000;
    events.push(
      danseMacabreEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" };
      })[0],
    );
    events.push(
      danseMacabreEvents.map((key) => {
        return {
          time: moment
            .utc(fightDuration(key.timestamp + macabreDuration, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Phase 1",
        };
      })[0],
    );

    let lastChosen = danseMacabreEvents.map((key) => key.timestamp)[0];

    let phase = 1;
    danseMacabreEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        phase = phase + 1;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" });
        events.push({
          time: moment
            .utc(fightDuration(key.timestamp + macabreDuration, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Phase " + phase,
        });
      }
    });
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
