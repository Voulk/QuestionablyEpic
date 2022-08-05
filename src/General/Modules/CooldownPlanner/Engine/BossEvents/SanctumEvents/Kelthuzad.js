import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createKelthuzadEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(buffData.map((key) => key.ability.guid));

  const undyingWrath = 354848; // remnant buff indicating end phase
  const frozenDestruction = 346530; // glacial spike damage
  const frostBlast1 = 348759;
  const frostBlast2 = 357928;
  const kelthuzad = 175559;
  const kelthuzadData = enemyHealth["series"].filter((filter) => filter.guid === kelthuzad);
  const kelthuzadHealthData = Object.entries(kelthuzadData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  // Push Phase 1 Object into events
  events.push({ time: "00:00", bossAbility: "Phase 1" });
  // Phase 2 Events
  let phase2 = kelthuzadHealthData.filter((filter) => filter.health === 0);
  console.log(phase2);
  phase2.length > 3 ? phase2.splice(3) : "";
  console.log(phase2);
  let lastChosenPhase = phase2.map((key) => key.time)[0];
  const thresholdPhase = 15000;
  events.push(
    phase2.map((key) => {
      return { time: moment.utc(fightDuration(key.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" };
    })[0],
  );
  phase2.map((key) => {
    if (key.time > lastChosenPhase + thresholdPhase) {
      lastChosenPhase = key.time;
      events.push({ time: moment.utc(fightDuration(key.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
    }
  });
  const phase2End = buffData.filter((filter) => filter.ability.guid === undyingWrath && filter.type === "applybuff");
  phase2End !== [] ? phase2End.map((key) => events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 1" })) : "";

  const remnant = 176929;
  const remnantData = enemyHealth["series"].filter((filter) => filter.guid === remnant);
  const remnantHealthData = Object.entries(remnantData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  const phase3 = remnantHealthData.filter((filter) => filter.health === 0);
  phase3 !== [] ? events.push({ time: moment.utc(fightDuration(phase3[0].time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : "";

  if (logGuids.includes(frozenDestruction)) {
    const frozenDestructionEvents = damageTakenData.filter((filter) => filter.ability.guid === frozenDestruction);
    let lastChosen = frozenDestructionEvents.map((key) => key.timestamp)[0];
    const threshold = 15000;
    events.push(
      frozenDestructionEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: frozenDestruction };
      })[0],
    );
    frozenDestructionEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: frozenDestruction });
      }
    });
  }

  if (logGuids.includes(frostBlast1) || logGuids.includes(frostBlast2)) {
    const frostBlastEvents = damageTakenData.filter((filter) => filter.ability.guid === frostBlast1 || filter.ability.guid === frostBlast2);
    const threshold = 12000;
    let lastChosen = frostBlastEvents.map((key) => key.timestamp)[0];
    events.push(
      frostBlastEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: frostBlast1 };
      })[0],
    );
    frostBlastEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: frostBlast1 });
      }
    });
  }

  return events;
}
