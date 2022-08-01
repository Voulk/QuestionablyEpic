import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createDenathriusEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const denathriusData = enemyHealth["series"].filter((filter) => filter.guid === 167406);
  const denathriusHealthData = Object.entries(denathriusData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  //   const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));

  events.push({ time: "00:00", bossAbility: "Phase 1" });
  const phase2 = denathriusHealthData.filter((filter) => filter.health <= 70)[0];
  phase2 !== undefined ? events.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : "";
  const phase3 = denathriusHealthData.filter((filter) => filter.health <= 40)[0];
  phase3 !== undefined ? events.push({ time: moment.utc(fightDuration(phase3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : "";

  return events;
}
