import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createRygelonEvents(bossID, difficulty, damageTakenData, debuffs, starttime) {
  let rygelonEvents = [];
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid));
  const stellarDecayDebuff = 368524;
  const singularityDebuff = 362207;

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Phase Change                                          */
  /* ---------------------------------------------------------------------------------------------- */
  // We use "The Singularity" debuff to determine when the raid enters and exits the singularity i.e phase 2.
  if (logGuids.includes(singularityDebuff)) {
    const singularityEntered = debuffs.filter((filter) => filter.ability.guid === singularityDebuff && filter.type === "applydebuff");
    const singularityExited = debuffs.filter((filter) => filter.ability.guid === singularityDebuff && filter.type === "removedebuff");

    // time until we want to check for the next event. i.e 60 seconds after the 1st event.
    const singularityThreshold = 45000;
    // Set the start of the Fight
    rygelonEvents.push({ time: "00:00", bossAbility: "Phase 1" });

    /* ------------------------------------------- Phase 1 ------------------------------------------ */
    rygelonEvents.push(
      singularityExited.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 1" };
      })[0],
    );
    // set the first debuff found as the initial first debuff
    let lastSingularityExitedChosen = singularityExited.map((key) => key.timestamp)[0];

    singularityExited.map((key) => {
      if (key.timestamp > lastSingularityExitedChosen + singularityThreshold) {
        // set the last exited singularity
        lastSingularityExitedChosen = key.timestamp;
        rygelonEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 1" });
      }
    });

    /* ------------------------------------------- Phase 2 ------------------------------------------ */
    // find the first debuff applied and push to event array and push to the event array
    rygelonEvents.push(
      singularityEntered.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" };
      })[0],
    );
    // set the first debuff found as the initial first debuff
    let lastSingularityEnteredChosen = singularityEntered.map((key) => key.timestamp)[0];

    // find subsequent debuffs applied and push to the event array
    singularityEntered.map((key) => {
      if (key.timestamp > lastSingularityEnteredChosen + singularityThreshold) {
        // set the last entered singularity
        lastSingularityEnteredChosen = key.timestamp;
        rygelonEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
      }
    });
  }

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Heroic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Heroic"
  ) {
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

      rygelonEvents.concat(firstEvent);
      stellarDecayEventsReduced.map((key) => {
        if (key.timestamp > lastChosen + threshold) {
          lastChosen = key.timestamp;
          // Original Event
          rygelonEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: stellarDecayDebuff });
          // 1st Simulated Event
          rygelonEvents.push({
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

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Mythic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Mythic"
  ) {
    /* --------------------------------------- Ability Events --------------------------------------- */
    // Stellar Decay
    if (logGuids.includes(stellarDecayDebuff)) {
      const clusterEvents = 4; // Number of events we'd like to see within X seconds of the first debuff.
      const clusterTimeframe = 3000; // We'll check this amount of time after our first event.
      const stellarDecayEvents = debuffs.filter((filter) => filter.ability.guid === stellarDecayDebuff && filter.type === "applydebuff"); // filter dubuffs to stellar decay
      const stellarDecayEventsReduced = stellarDecayEvents.filter((filter, i) => {
        let entryOk = true;
        // console.log("First Timestamp: " + filter.timestamp);
        for (var a = 1; a <= clusterEvents; a++) {
          if (a + i < stellarDecayEvents.length) {
            const comparisonTimestamp = stellarDecayEvents[a + i].timestamp;
            if (comparisonTimestamp <= filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
              console.log(
                "time: " + moment.utc(fightDuration(filter.timestamp, starttime)).startOf("second").format("mm:ss"),
                "comparisonTime: " + moment.utc(fightDuration(comparisonTimestamp, starttime)).startOf("second").format("mm:ss"),
                "Cluster Time: " +
                  moment
                    .utc(fightDuration(filter.timestamp + clusterTimeframe, starttime))
                    .startOf("second")
                    .format("mm:ss"),
              );
              entryOk = false;
            }
          }
        }
        return entryOk;
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

      rygelonEvents.concat(firstEvent);
      stellarDecayEventsReduced.map((key) => {
        if (key.timestamp > lastChosen + threshold) {
          lastChosen = key.timestamp;
          // Original Event
          rygelonEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: stellarDecayDebuff });
          // 1st Simulated Event
          rygelonEvents.push({
            time: moment
              .utc(fightDuration(key.timestamp + timeBetweenEvents, starttime))
              .startOf("second")
              .format("mm:ss"),
            bossAbility: stellarDecayDebuff,
          });
          // 2nd Simulated Event
          rygelonEvents.push({
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

  return rygelonEvents;
}
