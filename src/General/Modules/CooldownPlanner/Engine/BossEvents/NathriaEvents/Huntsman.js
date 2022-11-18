import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createHuntsmanEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid)); // create an array of guids in the log we potentially want to check
  const crushingStone = 334860;
  const bargastID = 169457;
  const bargastHealth = enemyHealth["series"].filter((filter) => filter.guid === bargastID); // health data, first event will be the spawn
  const bargastHealthData = Object.entries(bargastHealth[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const bargastActive = bargastHealthData[0]; // bargast spawn event

  const hecutisID = 169458;
  const hecutisHealth = enemyHealth["series"].filter((filter) => filter.guid === hecutisID); // health data, first event will be the spawn
  const hecutisHealthdata = Object.entries(hecutisHealth[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const hecutisActive = hecutisHealthdata[0]; // hecutis spawn event

  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Phases                                             */
  /* ---------------------------------------------------------------------------------------------- */
  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push "Phase 1" event

  if (bargastActive !== undefined) {
    events.push({ time: moment.utc(fightDuration(bargastActive.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" });
  }

  if (hecutisActive !== undefined) {
    events.push({ time: moment.utc(fightDuration(hecutisActive.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" });
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                        Hecutis Movement                                        */
  /* ---------------------------------------------------------------------------------------------- */
  // we are assuming that hecutis will be moved at 4 stacks (1 stack gained every 3 seconds = 12 seconds)
  if (logGuids.includes(crushingStone)) {
    const crushingEvents = buffData.filter((filter) => filter.ability.guid === crushingStone);
    const firstEvent = crushingEvents[0];
    const lastEvent = crushingEvents[crushingEvents.length - 1];
    const maxStacks = 4;
    const stackGainedEveryMS = 3000; // 3 seconds
    const timeBetweenEvents = maxStacks * stackGainedEveryMS;

    for (var a = firstEvent.timestamp; a <= lastEvent.timestamp; a = a + timeBetweenEvents) {
      if (a < lastEvent.timestamp) {
        events.push({ time: moment.utc(fightDuration(a, starttime)).startOf("second").format("mm:ss"), bossAbility: crushingStone });
      }
    }
  }

  return events;
}
