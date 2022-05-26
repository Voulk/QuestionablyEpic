// Create events that don't have boss cast times i.e surging azerite on Jailer encounter. We pass a damage taken report here and use instances of damage to determine when the ability happens.
import moment from "moment";
import { fightDuration } from "../../CooldownPlanner/Functions/Functions";

export default function createEvents(bossID, difficulty, damageTakenData, debuffs, starttime) {
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
        const validationDuration = 10000; // duration in ms to check for
        const numOfEvents = 4;
        const stellarDecayEvents = debuffs.filter((filter) => filter.ability.guid === stellarDecayDebuff && filter.type === "applydebuff"); // filter dubuffs to stellar decay

        // Are the next x events within the validationDuration, if not then the event is probably a mistake/outlier and not an indicator of the actual event. can probably be optimised
        const stellarDecayEventsReduced = stellarDecayEvents.filter((filter, i) => {
          let validation = [];
          for (let a = i; a < numOfEvents; a++) {
            stellarDecayEvents[a].timestamp > filter.timestamp && stellarDecayEvents[a].timestamp < filter.timestamp + validationDuration ? validation.concat(true) : validation.concat(false);
          }
          return validation.includes(false) ? false : true;
        });

        // time until we want to check for the next event. i.e 60 seconds after the 1st event.
        const threshold = 45000;
        // time to add to create events after initial event
        const timeBetweenEvents = 8000;

        // find the first event
        let firstEvent = stellarDecayEventsReduced.map((key) => {
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
        // set
        let lastChosen = stellarDecayEventsReduced.map((key) => key.timestamp)[0];

        returnedEvents.concat(firstEvent);
        stellarDecayEventsReduced.map((key) => {
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
        const validationDuration = 10000; // duration in ms to check for
        const numOfEvents = 4;
        const stellarDecayEvents = debuffs.filter((filter) => filter.ability.guid === stellarDecayDebuff && filter.type === "applydebuff"); // filter dubuffs to stellar decay
        // Are the next x events within the validationDuration, if not then the event is probably a mistake/outlier and not an indicator of the actual event. can probably be optimised
        const stellarDecayEventsReduced = stellarDecayEvents.filter((filter, i) => {
          let validation = [];
          for (let a = 0; a <= numOfEvents; a++) {
            if (a + i < stellarDecayEvents.length)
              stellarDecayEvents[a + i].timestamp >= filter.timestamp && stellarDecayEvents[a + i].timestamp <= filter.timestamp + validationDuration
                ? validation.push("true")
                : validation.push("false");
          }
          console.log(validation);

          return validation.includes("false") ? false : true;
        });
        console.log(stellarDecayEventsReduced);
        // time until we want to check for the next event. i.e 60 seconds after the 1st event.
        const threshold = 45000;
        // time to add to create events after initial event
        const timeBetweenEvents = 8000;

        // find the first event
        let firstEvent = stellarDecayEventsReduced.map((key) => {
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
        // set
        let lastChosen = stellarDecayEventsReduced.map((key) => key.timestamp)[0];

        returnedEvents.concat(firstEvent);
        stellarDecayEventsReduced.map((key) => {
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

  return returnedEvents;
}
