import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createjailerEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let jailerEvents = [];
  const jailerData = enemyHealth["series"].filter((filter) => filter.guid === 180990);
  const jailerHealthData = Object.entries(jailerData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  // console.log(jailerHealthData);
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));
  const surgingAzerite = 366408;

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Heroic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Heroic"
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Phase Changes                                         */
    /* ---------------------------------------------------------------------------------------------- */

    jailerEvents.push({ time: "00:00", bossAbility: "Phase 1" });
    const phase2 = jailerHealthData.filter((filter) => filter.health <= 62)[0];
    phase2 !== undefined ? jailerEvents.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : "";
    const phase3 = jailerHealthData.filter((filter) => filter.health <= 18)[0];
    phase3 !== undefined ? jailerEvents.push({ time: moment.utc(fightDuration(phase3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : "";
    // Surging Azerite
    if (logGuids.includes(surgingAzerite)) {
      const surgingAzeriteEvents = damageTakenData.filter((filter) => filter.ability.guid === surgingAzerite);
      const threshold = 30000;
      jailerEvents.push(
        surgingAzeriteEvents.map((key) => {
          return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: surgingAzerite };
        })[0],
      );

      let lastChosen = surgingAzeriteEvents.map((key) => key.timestamp)[0];

      surgingAzeriteEvents.map((key) => {
        if (key.timestamp > lastChosen + threshold) {
          lastChosen = key.timestamp;
          jailerEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: surgingAzerite });
        }
      });
    }
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

    jailerEvents.push({ time: "00:00", bossAbility: "Phase 1" });
    const phase2 = jailerHealthData.filter((filter) => filter.health <= 66)[0];
    phase2 !== undefined ? jailerEvents.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : "";
    const phase3 = jailerHealthData.filter((filter) => filter.health <= 31)[0];
    phase3 !== undefined ? jailerEvents.push({ time: moment.utc(fightDuration(phase3.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : "";
    const phase4 = jailerHealthData.filter((filter) => filter.health <= 15)[0];
    phase4 !== undefined ? jailerEvents.push({ time: moment.utc(fightDuration(phase4.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 4" }) : "";
    /* --------------------------------------- Ability Events --------------------------------------- */
    // Surging Azerite
    if (logGuids.includes(surgingAzerite)) {
      const surgingAzeriteEvents = damageTakenData.filter((filter) => filter.ability.guid === surgingAzerite);
      const threshold = 30000;
      jailerEvents.push(
        surgingAzeriteEvents.map((key) => {
          return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: surgingAzerite };
        })[0],
      );

      let lastChosen = surgingAzeriteEvents.map((key) => key.timestamp)[0];

      surgingAzeriteEvents.map((key) => {
        if (key.timestamp > lastChosen + threshold) {
          lastChosen = key.timestamp;
          jailerEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: surgingAzerite });
        }
      });
    }
  }

  return jailerEvents;
}
