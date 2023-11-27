import moment from "moment";
import { fightDuration } from "General/Modules/CooldownPlanner/Functions/Functions";

export default function createSmolderonEvents(bossID, difficulty, damageTakenData, debuffs, starttime, enemyHealth, enemyCasts, buffData) {
  let events = [];

  events.push({ time: "00:00", bossAbility: "Phase 1" }); // Push Phase 1 Object into events

  const logGuids = damageTakenData
    .map((key) => key.ability.guid)
    .concat(debuffs.map((key) => key.ability.guid))
    .concat(enemyCasts.map((key) => key.ability.guid));

  const searingAftermath = 422577;
  const seekingInfernoHitDebuff = 430325;
  const seekingInfernoSpellID = 426018;

  const worldInFlame = 422172;

  if (logGuids.includes(worldInFlame)) {
    const worldInFlameRemoved = buffData.filter((filter) => filter.ability.guid === worldInFlame && filter.type === "removebuff");

    worldInFlameRemoved.map((key, i) => {
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: "Phase 1",
      });
    });

    const worldInFlameApplied = buffData.filter((filter) => filter.ability.guid === worldInFlame && filter.type === "applybuff");

    worldInFlameApplied.map((key, i) => {
      events.push({
        time: moment
          .utc(fightDuration(key.timestamp - 1000, starttime))
          .startOf("second")
          .format("mm:ss"),
        bossAbility: "Phase 2",
      });
    });
  }

  if (logGuids.includes(searingAftermath)) {
    const searingAftermathRemoved = debuffs.filter((filter) => filter.ability.guid === searingAftermath && filter.type === "removedebuff");

    searingAftermathRemoved.map((key, i) => {
      events.push({
        time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
        bossAbility: searingAftermath,
      });
    });
  }

  // if (logGuids.includes(seekingInfernoHitDebuff)) {
  //   const seekingInferno = enemyCasts.filter((filter) => filter.ability.guid === seekingInfernoSpellID);
  //   const threshold = 20000;
  //   events.push(
  //     seekingInferno.map((key) => {
  //       return { time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: seekingInfernoSpellID };
  //     })[0],
  //   );

  //   let lastChosen = seekingInferno.map((key) => key.timestamp)[0];

  //   seekingInferno.map((key) => {
  //     if (key.timestamp > lastChosen + threshold) {
  //       lastChosen = key.timestamp;
  //       events.push({ time: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"), bossAbility: seekingInfernoSpellID });
  //     }
  //   });
  // }

  return events;
}
