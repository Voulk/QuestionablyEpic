import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createSunKingEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth) {
  let events = [];
  const sunKingID = 165759;
  const shadeID = 165805;
  const sunKingData = friendlyHealth["series"].filter((filter) => filter.guid === sunKingID);
  const sunKingHealthData = Object.entries(sunKingData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const shadeData = enemyHealth["series"].filter((filter) => filter.guid === shadeID);
  const shadeHealthData = Object.entries(shadeData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Container Changes                                       */
  /* ---------------------------------------------------------------------------------------------- */
  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  const phaseChange1 = sunKingHealthData.filter((filter) => filter.health >= 45)[0];
  phaseChange1 !== undefined ? events.push({ time: moment.utc(fightDuration(phaseChange1.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : "";

  const phaseChange2 = shadeHealthData.filter((filter) => filter.health <= 45)[0];
  phaseChange2 !== undefined ? events.push({ time: moment.utc(fightDuration(phaseChange2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 1" }) : "";

  const phaseChange3 = sunKingHealthData.filter((filter) => filter.health >= 90)[0];
  phaseChange3 !== undefined ? events.push({ time: moment.utc(fightDuration(phaseChange3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : "";

  return events;
}
