import { fightDuration, wclClassConverter } from "../../CooldownPlanner/Functions/Functions";
import { bossAbilities } from "../Data/CooldownPlannerBossAbilityList";
import moment from "moment";

export default function transformData(starttime, boss, enemyCasts, healerCasts, healerIDs) {
  // map cooldown cast times into array
  const cooldownTimes = healerCasts.map((key) => moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"));

  // map the cooldown ids, times, healer names, healer classes
  const cooldownsTimeline = healerCasts.map((key) => ({
    guid: key.ability.guid,
    time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
    name: healerIDs
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    class: wclClassConverter(
      healerIDs
        .filter((obj) => {
          return obj.id === key.sourceID;
        })
        .map((obj) => obj.icon)
        .toString(),
    ),
  }));

  // map the cooldown data into  a new array of objects, converting the name/class/cooldown into the plan data model keys. i.e name1, cooldown1 etc.
  let newTimeline = cooldownTimes
    .map((key) => {
      let newObject = { time: key };
      cooldownsTimeline.filter((filter) => filter.time === key).map((map, i) => Object.assign(newObject, { ["name" + i]: map.name, ["cooldown" + i]: map.guid, ["class" + i]: map.class }));

      return newObject;
    })
    .flat();

  // Map enemy ability casts into the plan data model keys i.e bossAbility, time.
  let enemyCastsTimeline = enemyCasts
    .filter(
      (filter) =>
        bossAbilities[boss]
          .filter((obj) => {
            return obj.guid === filter.ability.guid;
          })
          .map((obj) => obj.importActive)[0],
    )
    .map((key) => ({
      bossAbility: key.ability.guid,
      time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
    }));

  // Remove any duplicate imports for boss ability and time cast
  enemyCastsTimeline = enemyCastsTimeline.filter((value, index, self) => index === self.findIndex((t) => t.bossAbility === value.bossAbility && t.time === value.time));

  //   enemyCastsTimeline.map((key) => moment(key.time, "mm:ss").seconds());

  // merge the healer and enemy cast arrays of  objects
  const data = [...newTimeline, ...enemyCastsTimeline]; //...data in question
  // if times match merge the objects
  let map = {};
  data.forEach(function (item) {
    let id = item.time;
    if (map[id] === undefined) {
      map[id] = item;
    } else {
      let existing = map[id]; // adding/updating new keys
      for (let propt in item) {
        existing[propt] = item[propt];
      }
    }
  });
  let results = [];
  Object.keys(map).forEach((k) => results.push(map[k]));

  return results;
}