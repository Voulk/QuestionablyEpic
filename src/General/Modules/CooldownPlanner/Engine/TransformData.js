import { fightDuration, wclClassConverter } from "../../CooldownPlanner/Functions/Functions";
import { bossAbilities } from "../Data/CooldownPlannerBossAbilityList";
import createEvents from "./CreateEvents";
import moment from "moment";
import smartTransformData from "General/Modules/CooldownPlanner/Engine/SmartTransformData";

export default function transformData(starttime, boss, enemyCasts, healerCasts, healerIDs, difficulty, damageTaken, debuffs, enemyHealth, buffData, transformType) {
  // We'll convert a list of enemy casts that we're interested in to an array of timestamps.
  let enemyQuickTimeline = enemyCasts
    .filter(
      (filter) =>
        bossAbilities[boss]
          .filter((obj) => {
            return obj.guid === filter.ability.guid;
          })
          .map((obj) => obj.importActive)[0],
    )
    .map((cast) => cast.timestamp);

  // Create Events such as Phases, Any spells that don't have logged cast times such as gaining debuffs or damage taken at a certain event.
  let generatedEvents = createEvents(boss, difficulty, damageTaken, debuffs, starttime, enemyHealth, enemyCasts, buffData);

  // Map enemy ability casts into objects for the cooldown planner
  let enemyCastsTimeline = enemyCasts
    // Filter to only spells we want to import
    .filter(
      (filter) =>
        bossAbilities[boss]
          .filter((obj) => {
            return obj.guid === filter.ability.guid;
          })
          .map((obj) => obj.importActive)[0],
    )
    // map the events to our model
    // i.e { bossAbility: 134566, time: 00:04 }
    .map((key) => ({
      bossAbility: key.ability.guid,
      time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
    }));

  // concat the generated events to the enemycasts Timeline
  enemyCastsTimeline = enemyCastsTimeline.concat(generatedEvents);
  // Remove any duplicate imports for boss ability and time cast
  enemyCastsTimeline = enemyCastsTimeline.filter((value, index, self) => index === self.findIndex((t) => t.bossAbility === value.bossAbility && t.time === value.time));

  // create an array of player and enemy cast times. We use this to map spells cast at the same time later.
  let times = healerCasts.map((key) => moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss")).concat(enemyCastsTimeline.map((key) => key.time));
  times = [...new Set(times)]; // create unique array
  // i.e [ 00:03, 00:04 ]

  // map player casts into objects for us to parse
  let cooldownsTimeline = healerCasts.map((key) => ({
    guid: key.ability.guid,
    time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
    // return the players name by matching the sourceID in our healerIDs object
    name: healerIDs
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    // return the players class by matching the sourceID in our healerIDs object
    class: wclClassConverter(
      healerIDs
        .filter((obj) => {
          return obj.id === key.sourceID;
        })
        .map((obj) => obj.icon)
        .toString(),
    ),
  }));
  // i.e
  // [
  //   { guid: 213214, time: "00:03", name: "Priest1", class: "HolyPriest" },
  //   { guid: 213215, time: "00:03", name: "Monk1", class: "MistweaverMonk" },
  //   { guid: 216549, time: "00:04", name: "Priest2", class: "DisciplinePriest" },
  // ];

  // smart assign cooldown casts to bossAbilities
  transformType === "Smart" ? (cooldownsTimeline = smartTransformData(cooldownsTimeline, enemyCastsTimeline)) : "";

  // Using our array of times that player spells were cast, we remap the cooldowns to those times.
  // Doing this we create our columns for the planner. i.e name0, name1, name 2 cooldown0, cooldown1, cooldown2 etc
  let newTimeline = times
    .map((key) => {
      let newObject = { time: key };
      cooldownsTimeline.filter((filter) => filter.time === key).map((map, i) => Object.assign(newObject, { ["name" + i]: map.name, ["cooldown" + i]: map.guid, ["class" + i]: map.class }));

      return newObject;
    })
    .flat();
  // i.e
  // [
  //   { time: "00:03", name0: "Priest1", cooldown0: 213214, class0: "HolyPriest", name1: "Monk1", cooldown1: 213215, class1: "MistweaverMonk" },
  //   { time: "00:04", name0: "Priest2", cooldown0: 216549, class0: "DisciplinePriest" },
  // ];

  // merge the healer and enemy cast arrays of  objects
  let data = [...newTimeline, ...enemyCastsTimeline]; //...data in question
  // filter lines to only have bossAbility or cooldowns, not just time only
  data = data.filter((filter) => filter.bossAbility || filter.cooldown0 || filter.cooldown1 || filter.cooldown2 || filter.cooldown3 || filter.cooldown4);
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
