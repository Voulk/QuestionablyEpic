import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createDesaugneEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));
  const haloID1 = 362805;
  const haloID2 = 365373;
  const haloID3 = 361750;

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Heroic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Heroic"
  ) {
    // Surging Azerite
    if (logGuids.includes(haloID1) || logGuids.includes(haloID2) || logGuids.includes(haloID3)) {
      const disintegrationHaloIDSEvents = enemyCasts.filter((filter) => filter.ability.guid === haloID1 || filter.ability.guid === haloID2 || filter.ability.guid === haloID3);
      const threshold = 30000; // was: 30k
      events.push(
        disintegrationHaloIDSEvents.map((key) => {
          return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: haloID1 };
        })[0],
      );

      let lastChosen = disintegrationHaloIDSEvents.map((key) => key.timestamp)[0];

      disintegrationHaloIDSEvents.map((key) => {
        if (key.timestamp > lastChosen + threshold) {
          lastChosen = key.timestamp;
          events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: haloID1 });
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
    if (logGuids.includes(haloID1) || logGuids.includes(haloID2) || logGuids.includes(haloID3)) {
      console.log("success");
      const disintegrationHaloIDSEvents = enemyCasts.filter((filter) => filter.ability.guid === haloID1 || filter.ability.guid === haloID2 || filter.ability.guid === haloID3);
      const threshold = 20000; // Was: 20k
      events.push(
        disintegrationHaloIDSEvents.map((key) => {
          return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: haloID1 };
        })[0],
      );

      let lastChosen = disintegrationHaloIDSEvents.map((key) => key.timestamp)[0];

      disintegrationHaloIDSEvents.map((key) => {
        if (key.timestamp > lastChosen + threshold) {
          lastChosen = key.timestamp;
          events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: haloID1 });
        }
      });
    }
  }

  return events;
}
