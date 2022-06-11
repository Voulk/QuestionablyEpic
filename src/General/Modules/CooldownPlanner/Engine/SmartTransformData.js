// Function will create plan data by merging healer casts that are used near boss abilities, rather than create a new instance for each seperate cast.
// we will need to convert times back into seconds and use that as a basis on whether the objects should be merged with the boss ability.
// we can do this by using moment as below (we may swap from moment to another date/time library such as day.js or luxon as they are better alternatives to moment)
// moment(key.time, "mm:ss").seconds() if key.time = "01:15" as a string, this will convert it to 75 as a number

// for some abilities we may need to check instances of damage taken and use the initial hit as a cast time (currently not implemented for standard importing either)
// we can potentially add options for the user to change in the future such as 3 instances of the spell 8 seconds apart before the user imports the log
import moment from "moment";

export default function smartTransformData(healerCasts, enemyCasts) {
  // filter out our Phase events from being assigned to
  let filteredEnemyCasts = enemyCasts.filter(
    (filter) => filter.bossAbility !== "Phase 1" && filter.bossAbility !== "Phase 2" && filter.bossAbility !== "Phase 3" && filter.bossAbility !== "Phase 4" && filter.bossAbility !== "Intermission",
  );
  const lookBack = 7; // ms. TODO: refine.
  const lookForward = 7; // ms
  for (var i = 0; i < healerCasts.length; i++) {
    let entry = healerCasts[i];
    const entryCastTime = parseInt(entry.time.split(":")[0]) * 60 + parseInt(entry.time.split(":")[1]);

    // For each ability, loop through our enemy casts and if any are within our thresholds, then change our healing timestamp to match the enemy cast.
    // We'll look a few seconds ahead too, to catch anyone using their cooldown a few ms before an ability is cast.
    for (var j = 0; j < filteredEnemyCasts.length; j++) {
      const enemyCast = filteredEnemyCasts[j];

      const enemyCastTime = parseInt(enemyCast.time.split(":")[0]) * 60 + parseInt(enemyCast.time.split(":")[1]);

      if (enemyCastTime - entryCastTime <= lookForward && enemyCastTime - entryCastTime >= 0) {
        entry.time = enemyCast.time;
        break;
      } else if (entryCastTime - enemyCastTime <= lookBack && entryCastTime - enemyCastTime >= 0) {
        entry.time = enemyCast.time;
        break;
      }
    }
  }

  return healerCasts;
}
