import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createPainsmithEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  const forgesFlames = 359033;
  const flameclaspEruption = 356870;
  events.push({ time: "00:00", bossAbility: "Phase 1" });

  if (logGuids.includes(flameclaspEruption)) {
    const flameclaspEruptionEvents = damageTakenData.filter((filter) => filter.ability.guid === flameclaspEruption);
    const threshold = 15000;
    events.push(
      flameclaspEruptionEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: flameclaspEruption };
      })[0],
    );

    let lastChosen = flameclaspEruptionEvents.map((key) => key.timestamp)[0];

    flameclaspEruptionEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: flameclaspEruption });
      }
    });
  }

  if (logGuids.includes(forgesFlames)) {
    const forgesFlamesBuffApplied = buffData.filter((filter) => filter.ability.guid === forgesFlames && filter.type === "applybuff");
    forgesFlamesBuffApplied.map((key) =>
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Intermission",
      }),
    );

    const forgesFlamesBuffRemoved = buffData.filter((filter) => filter.ability.guid === forgesFlames && filter.type === "removebuff");
    forgesFlamesBuffRemoved.map((key) =>
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 1",
      }),
    );
  }

  return events;
}
