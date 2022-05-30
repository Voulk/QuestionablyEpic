import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createAnduinEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const enemyData = enemyHealth["series"].filter((filter) => filter.guid === 181954);
  const enemyHealthData = Object.entries(enemyData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Heroic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Heroic"
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Phase Changes                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // map the return to Kingsmourne casts to identify when the intermission ends
    const returnKMevents = enemyCasts
      .filter((filter) => filter.ability.guid === 363021)
      .map((key) => ({
        bossAbility: key.ability.guid,
        time: key.timestamp,
      }));

    events.push({ time: "00:00", bossAbility: "Phase 1" });
    const intermission1 = enemyHealthData.filter((filter) => filter.health <= 62)[0];
    events.push({ time: moment.utc(fightDuration(intermission1.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" });
    const phase2 = returnKMevents[0]["time"];
    events.push({ time: moment.utc(fightDuration(phase2, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
    const intermission2 = enemyHealthData.filter((filter) => filter.health <= 18)[0];
    events.push({ time: moment.utc(fightDuration(intermission2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" });
    const phase3 = returnKMevents.length > 1 ? returnKMevents[1]["time"] : enemyHealthData.filter((filter) => filter.health <= 10)[0].time;
    events.push({ time: moment.utc(fightDuration(phase3, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
  }

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Mythic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Mythic"
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Phase Changes                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // map the return to Kingsmourne casts to identify when the intermission ends
    const returnKMevents = enemyCasts
      .filter((filter) => filter.ability.guid === 363021)
      .map((key) => ({
        bossAbility: key.ability.guid,
        time: key.timestamp,
      }));
    events.push({ time: "00:00", bossAbility: "Phase 1" });
    const intermission1 = enemyHealthData.filter((filter) => filter.health <= 85)[0];
    events.push({ time: moment.utc(fightDuration(intermission1.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" });
    const phase2 = returnKMevents[0]["time"];
    events.push({ time: moment.utc(fightDuration(phase2, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
    const intermission2 = enemyHealthData.filter((filter) => filter.health <= 35)[0];
    events.push({ time: moment.utc(fightDuration(intermission2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" });
    const phase3 = returnKMevents.length > 1 ? returnKMevents[1]["time"] : enemyHealthData.filter((filter) => filter.health <= 10)[0].time;
    events.push({ time: moment.utc(fightDuration(phase3, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" });
  }

  return events;
}
