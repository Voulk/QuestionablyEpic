import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createBroodkeeperEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData, friendlyHealth, enemyEnergy) {
  let events = [];

  console.log(buffData);
  const clutchwatchersRage = 375829;
  const broodkeepersBond = 375809;

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(buffData.map((key) => key.ability.guid));

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  if (logGuids.includes(clutchwatchersRage)) {
    const clutchwatchersRageRemoved = buffData.filter((filter) => filter.ability.guid === clutchwatchersRage && filter.type === "applybuff");
    clutchwatchersRageRemoved.map((key) =>
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: clutchwatchersRage,
      }),
    );
  }

  if (logGuids.includes(broodkeepersBond)) {
    const broodkeepersBondRemoved = buffData.filter((filter) => filter.ability.guid === broodkeepersBond && filter.type === "removebuff");
    broodkeepersBondRemoved.map((key) =>
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 2",
      }),
    );
  }

  return events;
}
