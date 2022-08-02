import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createNineEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];
  const logGuids = damageTakenData.map((key) => key.ability.guid);
  const kyraID = 177095;
  const signeID = 177094;
  const arthurasCrushingGaze = 350040;
  const kyraData = enemyHealth["series"].filter((filter) => filter.guid === kyraID);
  const kyraHealthData = Object.entries(kyraData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const signeData = enemyHealth["series"].filter((filter) => filter.guid === signeID);
  const signeHealthData = Object.entries(signeData[0]["data"]).map((key) => {
    return {
      time: key[1][0],
      health: key[1][1],
    };
  });
  const firstSetHealthData = kyraHealthData.concat(signeHealthData).sort((a, b) => (a.time > b.time && 1) || -1);
  const phase2 = firstSetHealthData.filter((filter) => filter.health <= 15)[0];

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events
  phase2 !== undefined ? events.push({ time: moment.utc(fightDuration(phase2.time, starttime)).startOf("second").format("mm:ss"), bossAbility: "Phase 2" }) : ""; // if defined push "Phase 2" event

  // Arthura's Crushing Gaze
  if (logGuids.includes(arthurasCrushingGaze)) {
    const arthurasCrushingGazeEvents = damageTakenData.filter((filter) => filter.ability.guid === arthurasCrushingGaze);
    const threshold = 5000;
    events.push(
      arthurasCrushingGazeEvents.map((key) => {
        return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: arthurasCrushingGaze };
      })[0],
    );

    let lastChosen = arthurasCrushingGazeEvents.map((key) => key.timestamp)[0];

    arthurasCrushingGazeEvents.map((key) => {
      if (key.timestamp > lastChosen + threshold) {
        lastChosen = key.timestamp;
        events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: arthurasCrushingGaze });
      }
    });
  }

  return events;
}
