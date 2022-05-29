import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createXymoxEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth) {
  let events = [];
  const enemyData = enemyHealth["series"].filter((filter) => filter.guid === 183501);
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

    events.push({ time: "00:00", bossAbility: "Phase 1" });
    const phase2 = enemyHealthData.filter((filter) => filter.health <= 75)[0];
    events.push({
      time: moment
        .utc(fightDuration(phase2.time - 1000, starttime))
        .startOf("second")
        .format("mm:ss"),
      bossAbility: "Intermission",
    });
    const phase3 = enemyHealthData.filter((filter) => filter.health <= 50)[0];
    events.push({
      time: moment
        .utc(fightDuration(phase3.time - 1000, starttime))
        .startOf("second")
        .format("mm:ss"),
      bossAbility: "Intermission",
    });
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

    events.push({ time: "00:00", bossAbility: "Phase 1" });
    const phase2 = enemyHealthData.filter((filter) => filter.health <= 75)[0];
    events.push({
      time: moment
        .utc(fightDuration(phase2.time - 1000, starttime))
        .startOf("second")
        .format("mm:ss"),
      bossAbility: "Intermission",
    });
    const phase3 = enemyHealthData.filter((filter) => filter.health <= 50)[0];
    events.push({
      time: moment
        .utc(fightDuration(phase3.time - 1000, starttime))
        .startOf("second")
        .format("mm:ss"),
      bossAbility: "Intermission",
    });
    /* --------------------------------------- Ability Events --------------------------------------- */
  }

  return events;
}
