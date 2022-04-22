import {
  fightDuration,
  importHealerLogData,
  importCastsLogData,
  importSummaryData,
  importCharacterIds,
  importEnemyCasts,
  importEnemyIds,
  logDifficulty,
} from "../../CooldownPlanner/Functions/Functions";
import { bossAbilities } from "../Data/CooldownPlannerBossAbilityList";
import moment from "moment";

export default async function logToPlan(starttime, endtime, reportID, boss, logDif, setLogData, setLoadingProgress) {
  const dif = logDifficulty(logDif);
  /* ----------- Import Healer Info from the Logs healing table for each healing class. ----------- */
  const healers = await importHealerLogData(starttime, endtime, reportID);
  // Set Progress Bar to 10%
  setLoadingProgress(10);
  /* ------------------------------ Import Character IDS from the log ----------------------------- */
  const playerIDs = await importCharacterIds(starttime, endtime, reportID);
  // Set Progress Bar to 20%
  setLoadingProgress(20);
  /* -------------------------------- Import Enemy IDS from the log ------------------------------- */
  const enemyIDs = await importEnemyIds(starttime, endtime, reportID);
  // Set Progress Bar to 30%
  setLoadingProgress(30);
  const summary = await importSummaryData(starttime, endtime, reportID);
  // Set Progress Bar to 40%
  setLoadingProgress(40);
  /* --------------------------- Map Healer Data for ID, Name and Class. -------------------------- */
  const healerIDName = healers.map((key) => ({
    id: key.id,
    name: key.name,
    class: key.type,
  }));

  /* ------------------ Import the log data for Casts for each healer in the log. ----------------- */
  const cooldowns = await importCastsLogData(
    starttime,
    endtime,
    reportID,
    healers.map((key) => key.id),
  );
  // Set Progress Bar to 50%
  setLoadingProgress(50);

  /* ------------------------------- Import Log data for enemy casts ------------------------------ */
  const enemyCasts = await importEnemyCasts(starttime, endtime, reportID);

  // Set Progress Bar to 60%
  setLoadingProgress(60);

  /* ------------------------- Map cooldown casts for the Timeline Table. ------------------------- */
  const cooldownsTimeline = cooldowns.map((key) => ({
    guid: key.ability.guid,
    time: moment(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
    name: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    class: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.class)
      .toString(),
  }));

  // Set Progress Bar to 70%
  setLoadingProgress(70);
  /* ------------------------- Map enemy casts for the Enemy Timeline Table. ------------------------- */
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
      time: moment(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
    }));
  // Set Progress Bar to 80%
  setLoadingProgress(80);
  console.log(cooldownsTimeline);

  console.log(enemyCastsTimeline);

  // Remove any duplicate imports for boss ability and time cast
  enemyCastsTimeline = enemyCastsTimeline.filter((value, index, self) => index === self.findIndex((t) => t.bossAbility === value.bossAbility && t.time === value.time));
  // Set Progress Bar to Complete
  setLoadingProgress(100);
  setLogData({ enemyCasts: enemyCastsTimeline, bossID: boss, difficulty: dif, importSuccessful: true });

  /* ---------- Here we set all the returned data to state in the FightAnalysis Component --------- */
  //   this.setState({
  //     Updateddatacasts: updateddatacastsTimeline,
  //     abilityList: uniqueArray,
  //     cooldownlist: uniqueArrayCD,
  //     loadingcheck: false,
  //     healernames: summary.map((key) => ({
  //       name: key.name,
  //       icon: key.icon,
  //       talents: key.combatantInfo.talents,
  //       soulbindAbilities: key.combatantInfo.artifact,
  //       soulbindConduits: key.combatantInfo.heartOfAzeroth,
  //       type: key.type,
  //       stats: [
  //         {
  //           intellect: key.combatantInfo.stats.Intellect.min,
  //           crit: key.combatantInfo.stats.Crit.min,
  //           haste: key.combatantInfo.stats.Haste.min,
  //           mastery: key.combatantInfo.stats.Mastery.min,
  //           versatility: key.combatantInfo.stats.Versatility.min,
  //           leech: key.combatantInfo.stats.Leech.min,
  //           ilvl: key.combatantInfo.stats["Item Level"].min,
  //         },
  //       ],
  //     })),
  //     currentEndTime: endtime,
  //     currentStartTime: starttime,
  //     enemyCastsTimelineData: enemyCastsTimeline,
  //   });
}
