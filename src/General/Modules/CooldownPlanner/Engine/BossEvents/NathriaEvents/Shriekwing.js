import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createShriekwingEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  const BloodShroudCast = 343995;
  const BloodShroudBuff = 328921;
  if (
    /* ---------------------------------------------------------------------------------------------- */
    /*                                             Heroic                                             */
    /* ---------------------------------------------------------------------------------------------- */
    difficulty === "Heroic"
  ) {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                          Phase Changes                                         */
    /* ---------------------------------------------------------------------------------------------- */
    // generate end of intermissions
    if (logGuids.includes(BloodShroudBuff)) {
      const BloodShroudBuffRemoved = buffData.filter((filter) => filter.ability.guid === BloodShroudBuff && filter.type === "removebuff");
      BloodShroudBuffRemoved.map((key) =>
        events.push({
          time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
          bossAbility: "Phase 1",
        }),
      );
    }

    events.push({ time: "00:00", bossAbility: "Phase 1" });
    const Phase2one = enemyCasts.filter((filter) => filter.ability.guid === BloodShroudCast)[0];
    Phase2one !== undefined
      ? events.push({
          time: moment
            .utc(fightDuration(Phase2one.timestamp - 1000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Phase 2",
        })
      : "";
    const Phase2Two = enemyCasts.filter((filter) => filter.ability.guid === BloodShroudCast)[1];
    Phase2Two !== undefined
      ? events.push({
          time: moment
            .utc(fightDuration(Phase2Two.timestamp - 1000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Phase 2",
        })
      : "";
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
    // generate end of intermissions
    if (logGuids.includes(BloodShroudBuff)) {
      const BloodShroudBuffRemoved = buffData.filter((filter) => filter.ability.guid === BloodShroudBuff && filter.type === "removebuff");
      BloodShroudBuffRemoved.map((key) =>
        events.push({
          time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
          bossAbility: "Phase 1",
        }),
      );
    }

    events.push({ time: "00:00", bossAbility: "Phase 1" });
    const Phase2one = enemyCasts.filter((filter) => filter.ability.guid === BloodShroudCast)[0];
    console.log(enemyCasts.filter((filter) => filter.ability.guid === BloodShroudCast))
    console.log(Phase2one)
    Phase2one !== undefined
      ? events.push({
          time: moment
            .utc(fightDuration(Phase2one.timestamp - 1000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Phase 2",
        })
      : "";
    const Phase2Two = enemyCasts.filter((filter) => filter.ability.guid === BloodShroudCast)[1];
    Phase2Two !== undefined
      ? events.push({
          time: moment
            .utc(fightDuration(Phase2Two.timestamp - 1000, starttime))
            .startOf("second")
            .format("mm:ss"),
          bossAbility: "Phase 2",
        })
      : "";
    /* --------------------------------------- Ability Events --------------------------------------- */
  }

  return events;
}
