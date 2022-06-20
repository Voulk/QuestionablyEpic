import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createXymoxEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const enemyData = enemyHealth["series"].filter((filter) => filter.guid === 183501);
  const enemyHealthData = Object.entries(enemyData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  const genesisBulwark = 367573;

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Heroic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Heroic"
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Phase Changes                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // generate end of intermissions
    if (logGuids.includes(genesisBulwark)) {
      const genesisBulwarkRemoved = buffData.filter((filter) => filter.ability.guid === genesisBulwark && filter.type === "removebuff");
      genesisBulwarkRemoved.map((key) =>
        events.push({
          time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
          bossAbility: "Phase 1",
        }),
      );
    }

    events.push({ time: "00:00", bossAbility: "Phase 1" });
    const intermission1 = enemyHealthData.filter((filter) => filter.health <= 75)[0];
    intermission1 !== undefined
      ? events.push({
          time: moment
            .utc(fightDuration(intermission1.time - 1000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Intermission",
        })
      : "";
    const intermission2 = enemyHealthData.filter((filter) => filter.health <= 50)[0];
    intermission2 !== undefined
      ? events.push({
          time: moment
            .utc(fightDuration(intermission2.time - 1000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Intermission",
        })
      : "";
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

    // generate end of intermissions
    if (logGuids.includes(genesisBulwark)) {
      const genesisBulwarkRemoved = buffData.filter((filter) => filter.ability.guid === genesisBulwark && filter.type === "removebuff");
      genesisBulwarkRemoved.map((key) =>
        events.push({
          time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
          bossAbility: "Phase 1",
        }),
      );
    }

    events.push({ time: "00:00", bossAbility: "Phase 1" });
    const intermission1 = enemyHealthData.filter((filter) => filter.health <= 75)[0];
    intermission1 !== undefined
      ? events.push({
          time: moment
            .utc(fightDuration(intermission1.time - 1000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Intermission",
        })
      : "";
    const intermission2 = enemyHealthData.filter((filter) => filter.health <= 50)[0];
    intermission2 !== undefined
      ? events.push({
          time: moment
            .utc(fightDuration(intermission2.time - 1000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Intermission",
        })
      : "";
    /* --------------------------------------- Ability Events --------------------------------------- */
  }

  return events;
}
