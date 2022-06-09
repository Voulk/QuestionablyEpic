import { fightDuration, wclClassConverter } from "../../CooldownPlanner/Functions/Functions";
import { bossAbilities } from "../Data/CooldownPlannerBossAbilityList";
import createEvents from "./CreateEvents";
import moment from "moment";
import smartTransformData from "General/Modules/CooldownPlanner/Engine/SmartTransformData"

export default function transformData(starttime, boss, enemyCasts, healerCasts, healerIDs, difficulty, damageTaken, debuffs, enemyHealth, buffData) {


  // We'll convert a list of enemy casts that we're interested in to an array of timestamps.
  let enemyQuickTimeline = enemyCasts.filter(
    (filter) =>
      bossAbilities[boss]
        .filter((obj) => {
          return obj.guid === filter.ability.guid;
        })
        .map((obj) => obj.importActive)[0],
  ).map((cast) => cast.timestamp)


  /*
  const lookBack = 7500; // ms. TODO: refine.
  const lookForward = 7500; // ms
  for (var i = 0; i < healerCasts.length; i++) {
    const entry = healerCasts[i];
    console.log(entry.timestamp + ": " + entry.ability.guid + " (" + entry.ability.name + ")" + " - source: " + entry.sourceID);

    // For each ability, loop through our enemy casts and if any are within our thresholds, then change our healing timestamp to match the enemy cast. 
    // We'll look a few seconds ahead too, to catch anyone using their cooldown a few ms before an ability is cast. 
    for (var j = 0; j < enemyQuickTimeline.length; j++) {
        const enemyCast = enemyQuickTimeline[j];
        if ((enemyCast - entry.timestamp) <= lookForward && (enemyCast - entry.timestamp) >= 0) {
          entry.timestamp = enemyCast;
          break;
        }
        else if ((entry.timestamp - enemyCast) <= lookBack && (entry.timestamp - enemyCast) >= 0) {
           entry.timestamp = enemyCast;
           break;
        }
    }

  } */

  // map cooldown cast times into array
  let generatedEvents = createEvents(boss, difficulty, damageTaken, debuffs, starttime, enemyHealth, enemyCasts, buffData);
  
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

  // add the generated events to the enemycasts Timeline
  enemyCastsTimeline = enemyCastsTimeline.concat(generatedEvents);
  // Remove any duplicate imports for boss ability and time cast
  enemyCastsTimeline = enemyCastsTimeline.filter((value, index, self) => index === self.findIndex((t) => t.bossAbility === value.bossAbility && t.time === value.time));

  let cooldownTimes = healerCasts.map((key) => moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"));
  

  // map the cooldown ids, times, healer names, healer classes
  let cooldownsTimeline = healerCasts.map((key) => ({
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

  
  // map the cooldown data into a new array of objects, converting the name/class/cooldown into the plan data model keys. i.e name1, cooldown1 etc.
  let newTimeline = cooldownTimes
    .map((key) => {
      let newObject = { time: key };
      cooldownsTimeline.filter((filter) => filter.time === key).map((map, i) => Object.assign(newObject, { ["name" + i]: map.name, ["cooldown" + i]: map.guid, ["class" + i]: map.class }));

      return newObject;
    })
    .flat();



  //   enemyCastsTimeline.map((key) => moment(key.time, "mm:ss").seconds());
  newTimeline = smartTransformData(newTimeline, enemyCastsTimeline);

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
