// Create events that don't have boss cast times i.e surging azerite on Jailer encounter. We pass a damage taken report here and use instances of damage to determine when the ability happens.
import moment from "moment";
import { fightDuration } from "../../CooldownPlanner/Functions/Functions";

export default function createEvents(bossID, difficulty, damageTakenData, debuffs, starttime) {
  console.log(damageTakenData);
  console.log(difficulty);
  console.log(debuffs);

  let returnedEvents = [];

  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));

  /* ---------------------------------------------------------------------------------------------- */
  /*                                   Sepulcher of the First Ones                                  */
  /* ---------------------------------------------------------------------------------------------- */

  if (
    /* ------------------------------------------- Rygelon ------------------------------------------- */
    bossID === 2549
  ) {
    const stellarDecayDebuff = 368524;
    if (difficulty === "Heroic") {
      /* --------------------------------------- Ability Events --------------------------------------- */
      // Stellar Decay
      if (logGuids.includes(stellarDecayDebuff)) {
        const stellarDecayEvents = debuffs.filter((filter) => filter.ability.guid === stellarDecayDebuff);
        const threshold = 60000;
        const timeBetweenEvents = 8000;
        let firstEvent = stellarDecayEvents.map((key) => {
          return [
            // Original Event
            { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: stellarDecayDebuff },
            // 1st Simulated Event
            {
              time: moment
                .utc(fightDuration(key.timestamp + timeBetweenEvents, starttime))
                .startOf("second")
                .format("mm:ss"),
              bossAbility: stellarDecayDebuff,
            },
          ];
        })[0];
        let lastChosen = stellarDecayEvents.map((key) => key.timestamp)[0];

        returnedEvents.concat(firstEvent);
        stellarDecayEvents.map((key) => {
          if (key.timestamp > lastChosen + threshold) {
            lastChosen = key.timestamp;
            // Original Event
            returnedEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: stellarDecayDebuff });
            // 1st Simulated Event
            returnedEvents.push({
              time: moment
                .utc(fightDuration(key.timestamp + timeBetweenEvents, starttime))
                .startOf("second")
                .format("mm:ss"),
              bossAbility: stellarDecayDebuff,
            });
          }
        });
      }
    }

    if (difficulty === "Mythic") {
      /* --------------------------------------- Ability Events --------------------------------------- */
      // Stellar Decay
      if (logGuids.includes(stellarDecayDebuff)) {
        const stellarDecayEvents = debuffs.filter((filter) => filter.ability.guid === stellarDecayDebuff);
        const threshold = 60000;
        const timeBetweenEvents = 8000;
        let firstEvent = stellarDecayEvents.map((key) => {
          return [
            // Original Event
            { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: stellarDecayDebuff },
            // 1st Simulated Event
            {
              time: moment
                .utc(fightDuration(key.timestamp + timeBetweenEvents, starttime))
                .startOf("second")
                .format("mm:ss"),
              bossAbility: stellarDecayDebuff,
            },
            // 2nd Simulated Event
            {
              time: moment
                .utc(fightDuration(key.timestamp + timeBetweenEvents * 2, starttime))
                .startOf("second")
                .format("mm:ss"),
              bossAbility: stellarDecayDebuff,
            },
          ];
        })[0];
        let lastChosen = stellarDecayEvents.map((key) => key.timestamp)[0];

        returnedEvents.concat(firstEvent);
        stellarDecayEvents.map((key) => {
          if (key.timestamp > lastChosen + threshold) {
            lastChosen = key.timestamp;
            // Original Event
            returnedEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: stellarDecayDebuff });
            // 1st Simulated Event
            returnedEvents.push({
              time: moment
                .utc(fightDuration(key.timestamp + timeBetweenEvents, starttime))
                .startOf("second")
                .format("mm:ss"),
              bossAbility: stellarDecayDebuff,
            });
            // 2nd Simulated Event
            returnedEvents.push({
              time: moment
                .utc(fightDuration(key.timestamp + timeBetweenEvents * 2, starttime))
                .startOf("second")
                .format("mm:ss"),
              bossAbility: stellarDecayDebuff,
            });
          }
        });
      }
    }
  }

  if (
    /* ------------------------------------------- Jailer ------------------------------------------- */
    bossID === 2537
  ) {
    const surgingAzerite = 366408;
    if (difficulty === "Heroic") {
      // Surging Azerite
      if (logGuids.includes(surgingAzerite)) {
        const surgingAzeriteEvents = damageTakenData.filter((filter) => filter.ability.guid === surgingAzerite);
        const threshold = 30000;
        const timeBetweenEvents = 8000;
        let firstEvent = surgingAzeriteEvents.map((key) => {
          return [
            // Original Event
            { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: surgingAzerite },
            // 1st Simulated Event
            {
              time: moment
                .utc(fightDuration(key.timestamp + timeBetweenEvents, starttime))
                .startOf("second")
                .format("mm:ss"),
              bossAbility: surgingAzerite,
            },
            // 2nd Simulated Event
            {
              time: moment
                .utc(fightDuration(key.timestamp + timeBetweenEvents * 2, starttime))
                .startOf("second")
                .format("mm:ss"),
              bossAbility: surgingAzerite,
            },
          ];
        })[0];
        let lastChosen = surgingAzeriteEvents.map((key) => key.timestamp)[0];

        returnedEvents.concat(firstEvent);
        surgingAzeriteEvents.map((key) => {
          if (key.timestamp > lastChosen + threshold) {
            lastChosen = key.timestamp;
            // Original Event
            returnedEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: surgingAzerite });
            // 1st Simulated Event
            returnedEvents.push({
              time: moment
                .utc(fightDuration(key.timestamp + timeBetweenEvents, starttime))
                .startOf("second")
                .format("mm:ss"),
              bossAbility: surgingAzerite,
            });
            // 2nd Simulated Event
            returnedEvents.push({
              time: moment
                .utc(fightDuration(key.timestamp + timeBetweenEvents * 2, starttime))
                .startOf("second")
                .format("mm:ss"),
              bossAbility: surgingAzerite,
            });
          }
        });
      }
    }

    if (difficulty === "Mythic") {
      /* --------------------------------------- Ability Events --------------------------------------- */
      // Surging Azerite
      if (logGuids.includes(surgingAzerite)) {
        const surgingAzeriteEvents = damageTakenData.filter((filter) => filter.ability.guid === surgingAzerite);
        const threshold = 30000;
        const timeBetweenEvents = 8000;
        let firstEvent = surgingAzeriteEvents.map((key) => {
          return [
            // Original Event
            { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: surgingAzerite },
          ];
        })[0];
        let lastChosen = surgingAzeriteEvents.map((key) => key.timestamp)[0];

        returnedEvents.concat(firstEvent);
        surgingAzeriteEvents.map((key) => {
          if (key.timestamp > lastChosen + threshold) {
            lastChosen = key.timestamp;
            // Original Event
            returnedEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: surgingAzerite });
          }
        });
      }
    }
  }

  console.log(returnedEvents);

  return returnedEvents;
}
