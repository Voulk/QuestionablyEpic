import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createRygelonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let rygelonEvents = [];
  rygelonEvents.push({ time: "00:00", bossAbility: "Phase 1" }); // Push "Phase 1" event
  const logGuids = damageTakenData.map((key) => key.ability.guid).concat(debuffs.map((key) => key.ability.guid)); // create an array of guids in the log we potentially want to check
  const stellarDecayDebuff = 368524; // set the stellarDecay ID
  const singularityDebuff = 362207; // set the Singularity ID

  /* ---------------------------------------------------------------------------------------------- */
  /*                                          Phase Change                                          */
  /* ---------------------------------------------------------------------------------------------- */
  // We use "The Singularity" debuff to determine when the raid enters and exits the singularity i.e phase 2.
  // Only runs if "The Singularity" ID exists in the logGuids array
  if (logGuids.includes(singularityDebuff)) {
    const clusterEvents = 3; // Number of events we'd like to see within X seconds of the first debuff.
    const clusterTimeframe = 5000; // We'll check this amount of time after our first event.
    const singularityEntered = debuffs.filter((filter) => filter.ability.guid === singularityDebuff && filter.type === "applydebuff"); // Filter events where singularity was applied to players
    const singularityEnteredEventsReduced = singularityEntered.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < singularityEntered.length) {
          const comparisonTimestamp = singularityEntered[a + i].timestamp;
          if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
            entryOk = false;
          }
        }
      }
      return entryOk;
    });

    const singularityExited = debuffs.filter((filter) => filter.ability.guid === singularityDebuff && filter.type === "removedebuff"); // Filter events where singularity was removed from players
    const singularityExitedEventsReduced = singularityExited.filter((filter, i) => {
      let entryOk = true;
      for (var a = 1; a <= clusterEvents; a++) {
        if (a + i < singularityExited.length) {
          const comparisonTimestamp = singularityExited[a + i].timestamp;
          if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
            entryOk = false;
          }
        }
      }
      return entryOk;
    });

    // time until we want to check for the next event. i.e 60 seconds after the 1st event.
    const singularityThreshold = 45000;
    // Set the start of the Fight

    /* ------------------------------------------- Phase 1 ------------------------------------------ */
    rygelonEvents.push(
      singularityExitedEventsReduced.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 1" };
      })[0],
    );
    // set the first debuff found as the initial first debuff
    let lastSingularityExitedChosen = singularityExitedEventsReduced.map((key) => key.timestamp)[0];

    // map singularity exited events and push events outside of the threshold
    singularityExitedEventsReduced.map((key) => {
      if (key.timestamp > lastSingularityExitedChosen + singularityThreshold) {
        // set the last exited singularity
        lastSingularityExitedChosen = key.timestamp;
        rygelonEvents.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 1" });
      }
    });

    /* ------------------------------------------- Phase 2 ------------------------------------------ */
    // find the first debuff applied and push to event array and push to the event array
    rygelonEvents.push(
      singularityEnteredEventsReduced.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" };
      })[0],
    );
    // set the first debuff found as the initial first debuff
    let lastSingularityEnteredChosen = singularityEnteredEventsReduced.map((key) => key.timestamp)[0];

    // find subsequent debuffs applied and push to the event array
    singularityEnteredEventsReduced.map((key) => {
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
      const clusterEvents = 3; // Number of events we'd like to see within X seconds of the first debuff.
      const clusterTimeframe = 5000; // We'll check this amount of time after our first event.
      const stellarDecayEvents = debuffs.filter((filter) => filter.ability.guid === stellarDecayDebuff && filter.type === "applydebuff"); // filter dubuffs to stellar decay
      const stellarDecayEventsReduced = stellarDecayEvents.filter((filter, i) => {
        let entryOk = true;
        for (var a = 1; a <= clusterEvents; a++) {
          if (a + i < stellarDecayEvents.length) {
            const comparisonTimestamp = stellarDecayEvents[a + i].timestamp;
            if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
              entryOk = false;
            }
          }
        }
        return entryOk;
      });

      // time until we want to check for the next event. i.e 60 seconds after the 1st event.
      const threshold = 45000;
      // time to add to create events after initial event
      const timeBetweenEvents = 8000;

      // find the first event
      const firstEvent = stellarDecayEventsReduced[0];
      // Original Event
      rygelonEvents.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: stellarDecayDebuff });
      // 1st Simulated Event
      rygelonEvents.push({
        time: moment
          .utc(fightDuration(firstEvent.timestamp + timeBetweenEvents, starttime))
          .startOf("second")
          .format("mm:ss"),
        bossAbility: stellarDecayDebuff,
      });
      // 2nd Simulated Event
      rygelonEvents.push({
        time: moment
          .utc(fightDuration(firstEvent.timestamp + timeBetweenEvents * 2, starttime))
          .startOf("second")
          .format("mm:ss"),
        bossAbility: stellarDecayDebuff,
      });

      // set
      let lastChosen = firstEvent.timestamp;

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

  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Mythic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Mythic"
  ) {
    /* --------------------------------------- Ability Events --------------------------------------- */
    // Stellar Decay
    if (logGuids.includes(stellarDecayDebuff)) {
      const clusterEvents = 3; // Number of events we'd like to see within X seconds of the first debuff.
      const clusterTimeframe = 5000; // We'll check this amount of time after our first event.
      const stellarDecayEvents = debuffs.filter((filter) => filter.ability.guid === stellarDecayDebuff && filter.type === "applydebuff"); // filter dubuffs to stellar decay
      const stellarDecayEventsReduced = stellarDecayEvents.filter((filter, i) => {
        let entryOk = true;
        // console.log("First Timestamp: " + filter.timestamp);
        for (var a = 1; a <= clusterEvents; a++) {
          if (a + i < stellarDecayEvents.length) {
            const comparisonTimestamp = stellarDecayEvents[a + i].timestamp;
            if (comparisonTimestamp < filter.timestamp || comparisonTimestamp >= filter.timestamp + clusterTimeframe) {
              entryOk = false;
            }
          }
        }
        return entryOk;
      });

      // time until we want to check for the next event. i.e 60 seconds after the 1st event.
      const threshold = 45000;
      // time to add to create events after initial event
      const timeBetweenEvents = 8000;

      // find the first event
      const firstEvent = stellarDecayEventsReduced[0];
      // Original Event
      rygelonEvents.push({ time: moment.utc(fightDuration(firstEvent.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: stellarDecayDebuff });
      // 1st Simulated Event
      rygelonEvents.push({
        time: moment
          .utc(fightDuration(firstEvent.timestamp + timeBetweenEvents, starttime))
          .startOf("second")
          .format("mm:ss"),
        bossAbility: stellarDecayDebuff,
      });
      // 2nd Simulated Event
      rygelonEvents.push({
        time: moment
          .utc(fightDuration(firstEvent.timestamp + timeBetweenEvents * 2, starttime))
          .startOf("second")
          .format("mm:ss"),
        bossAbility: stellarDecayDebuff,
      });

      // set
      let lastChosen = firstEvent.timestamp;

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
