import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createSylvanusEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const anduin = 178072; // use anduin spawn as p3 indicator
  const shadowDaggers = 347670;
  const bansheeShroud = 350857; // used to determine Intermission start
  const bansheeWail = 348094;
  const blackArrow = 358709;
  const wailingArrow = 357618;
  const anduinData = enemyHealth["series"].filter((filter) => filter.guid === anduin);
  const anduinHealthData = Object.entries(anduinData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(
      enemyCasts.map((key) => key.ability.guid),
      buffData.map((key) => key.ability.guid),
    );

  if (logGuids.includes(shadowDaggers)) {
    const shadowDaggersEvents = damageTakenData.filter((filter) => filter.ability.guid === shadowDaggers);
    let lastChosen = shadowDaggersEvents.map((key) => key.timestamp)[0];
    const threshold = 15000;
    events.push(
      shadowDaggersEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: shadowDaggers };
      })[0],
    );
    shadowDaggersEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: shadowDaggers });
      }
    });
  }

  if (logGuids.includes(blackArrow)) {
    const blackArrowEvents = damageTakenData.filter((filter) => filter.ability.guid === blackArrow);
    let lastChosen = blackArrowEvents.map((key) => key.timestamp)[0];
    const threshold = 15000;
    events.push(
      blackArrowEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: blackArrow };
      })[0],
    );
    blackArrowEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: blackArrow });
      }
    });
  }

  if (logGuids.includes(wailingArrow)) {
    const wailingArrowEvents = damageTakenData.filter((filter) => filter.ability.guid === wailingArrow);
    let lastChosen = wailingArrowEvents.map((key) => key.timestamp)[0];
    const threshold = 15000;
    events.push(
      wailingArrowEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: wailingArrow };
      })[0],
    );
    wailingArrowEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: wailingArrow });
      }
    });
  }

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events
  /* ---------------------------------------- Intermission ---------------------------------------- */
  if (logGuids.includes(bansheeShroud)) {
    const bansheeShroudEvents = buffData.filter((filter) => filter.ability.guid === bansheeShroud && filter.type === "applybuff");
    console.log(logGuids);
    console.log(bansheeShroudEvents);
    bansheeShroudEvents !== [] ? events.push({ time: moment.utc(fightDuration(bansheeShroudEvents[0].timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Intermission" }) : "";
  }

  /* ---------------------------------------- Phase 2 ---------------------------------------- */
  if (logGuids.includes(bansheeWail)) {
    const bansheeWailEvents = enemyCasts.filter((filter) => filter.ability.guid === bansheeWail);
    bansheeWailEvents !== [] ? events.push({ time: moment.utc(fightDuration(bansheeWailEvents[0].timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : "";
  }

  /* ------------------------------------------- Phase 3 ------------------------------------------ */
  anduinHealthData !== [] ? events.push({ time: moment.utc(fightDuration(anduinHealthData[0].time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 3" }) : "";

  return events;
}
