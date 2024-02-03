import { fightDuration, wclClassConverter } from "../../CooldownPlanner/Functions/Functions";
import { bossAbilities } from "../Data/CooldownPlannerBossAbilityList";
import createEvents from "./CreateEvents";
import moment from "moment";
import smartTransformData from "General/Modules/CooldownPlanner/Engine/SmartTransformData";

export default function transformData(
  starttime,
  boss,
  enemyCasts,
  healerCasts,
  healerIDs,
  difficulty,
  damageTaken,
  debuffs,
  enemyHealth,
  buffData,
  transformType,
  nameObject,
  friendlyHealth,
  enemyEnergy,
  endTime,
  enemyDebuffData,
) {
  let idsToRemove = [];
  // push healer ids to remove from the cast array
  nameObject
    .filter((filter) => Object.values(filter)[0] === "removeLineFromArray")
    .map((key) =>
      healerIDs
        .filter((obj) => {
          return obj.name === Object.keys(key)[0];
        })
        .map((obj) => idsToRemove.push(obj.id)),
    );
  // filter out healers to remove
  if (idsToRemove !== []) {
    healerCasts = healerCasts.filter((filter) => idsToRemove.includes(filter.sourceID) === false);
  }
  // filter out removed healers
  nameObject = nameObject.filter((filter) => Object.values(filter)[0] !== "removeLineFromArray");

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
  let generatedEvents = createEvents(boss, difficulty, damageTaken, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy, endTime, enemyDebuffData);

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
  let data = [];
  transformType === "blank" ? (data = [...enemyCastsTimeline]) : (data = [...newTimeline, ...enemyCastsTimeline]); //...data in question
  // filter lines to only have bossAbility or cooldowns, not just time only
  data = data.filter(
    (filter) =>
      filter.bossAbility ||
      filter.cooldown0 ||
      filter.cooldown1 ||
      filter.cooldown2 ||
      filter.cooldown3 ||
      filter.cooldown4 ||
      filter.cooldown5 ||
      filter.cooldown6 ||
      filter.cooldown7 ||
      filter.cooldown8 ||
      filter.cooldown9,
  );
  // if times match merge the objects
  let map = {};

  // TODO: This function needs to be reworked.

  data.map((object) => {
    let currentTime = object.time; // "00:01"
    if (map[currentTime] === undefined) {
      // if map doesn't contain the time, add that object to the map object with the time as the key
      // "00:01": {time: "00:01", etc etc}
      map[currentTime] = object;
    } else {
      let existing = map[currentTime];
      // for each prop in the object, add/update it to the mapped time.
      for (let propt in object) {
        existing[propt] = object[propt];
      }
    }
  });

  let results = [];
  Object.keys(map).forEach((k) => results.push(map[k]));
  let generatedResults = [];
  results.map((key) => {
    let newObject = { time: key.time };
    if (Object.keys(key).includes("cooldown5")) {
      if (Object.keys(key).includes("bossAbility")) {
        Object.assign(newObject, { bossAbility: key.bossAbility });
      }
      if (Object.keys(key).includes("cooldown5")) {
        Object.assign(newObject, { cooldown0: key.cooldown5, class0: key.class5, name0: key.name5 });
        delete key.cooldown5;
        delete key.class5;
        delete key.name5;
      }
      if (Object.keys(key).includes("cooldown6")) {
        Object.assign(newObject, { cooldown1: key.cooldown6, class1: key.class6, name1: key.name6 });
        delete key.cooldown6;
        delete key.class6;
        delete key.name6;
      }
      if (Object.keys(key).includes("cooldown7")) {
        Object.assign(newObject, { cooldown2: key.cooldown7, class2: key.class7, name2: key.name7 });
        delete key.cooldown7;
        delete key.class7;
        delete key.name7;
      }
      if (Object.keys(key).includes("cooldown8")) {
        Object.assign(newObject, { cooldown3: key.cooldown8, class3: key.class8, name3: key.name8 });
        delete key.cooldown8;
        delete key.class8;
        delete key.name8;
      }
      if (Object.keys(key).includes("cooldown9")) {
        Object.assign(newObject, { cooldown4: key.cooldown9, class4: key.class9, name4: key.name9 });
        delete key.cooldown9;
        delete key.class9;
        delete key.name9;
      }
      generatedResults.push(newObject);
    }
  });

  results.push(generatedResults);
  results = results.flat();

  nameObject
    .filter((filter) => Object.values(filter)[0] !== Object.keys(filter)[0])
    .filter((filter2) => filter2 !== {})
    .map((key) =>
      results.map((generatedObject, i) => {
        Object.keys(generatedObject).includes("name0") && generatedObject.name0 === Object.keys(key)[0] ? (results[i].name0 = Object.values(key)[0]) : "";
        Object.keys(generatedObject).includes("name1") && generatedObject.name1 === Object.keys(key)[0] ? (results[i].name1 = Object.values(key)[0]) : "";
        Object.keys(generatedObject).includes("name2") && generatedObject.name2 === Object.keys(key)[0] ? (results[i].name2 = Object.values(key)[0]) : "";
        Object.keys(generatedObject).includes("name3") && generatedObject.name3 === Object.keys(key)[0] ? (results[i].name3 = Object.values(key)[0]) : "";
        Object.keys(generatedObject).includes("name4") && generatedObject.name4 === Object.keys(key)[0] ? (results[i].name4 = Object.values(key)[0]) : "";
      }),
    );

  return results;
}
