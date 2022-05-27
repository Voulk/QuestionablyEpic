import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createjailerEvents(bossID, difficulty, damageTakenData, debuffs, starttime) {
  let jailerEvents = [];
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));
  const surgingAzerite = 366408;

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Heroic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Heroic"
  ) {
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
