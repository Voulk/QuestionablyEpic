import { fightDuration, importHealerLogData, importCastsLogData, importSummaryData, importCharacterIds, importEnemyCasts, importEnemyIds } from "../../CooldownPlanner/Functions/Functions";
import moment from "moment";

export default async function logToPlan(starttime, endtime, reportID) {
  /* ----------- Import Healer Info from the Logs healing table for each healing class. ----------- */
  const healers = await importHealerLogData(starttime, endtime, reportID);

  /* ------------------------------ Import Character IDS from the log ----------------------------- */
  const playerIDs = await importCharacterIds(starttime, endtime, reportID);

  /* -------------------------------- Import Enemy IDS from the log ------------------------------- */
  const enemyIDs = await importEnemyIds(starttime, endtime, reportID);

  const summary = await importSummaryData(starttime, endtime, reportID);

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

  /* ------------------------------- Import Log data for enemy casts ------------------------------ */
  const enemyCasts = await importEnemyCasts(starttime, endtime, reportID);

  /* ------------------------- Map cooldown casts for the Timeline Table. ------------------------- */
  const cooldownsTimeline = cooldowns.map((key) => ({
    ability: key.ability.name,
    guid: key.ability.guid,
    timestamp: moment(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
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

  /* ------------------------- Map enemy casts for the Enemy Timeline Table. ------------------------- */
  const enemyCastsTimeline = enemyCasts.map((key) => ({
    ability: key.ability.name,
    guid: key.ability.guid,
    timestamp: moment(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
    name: enemyIDs
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    id: key.sourceID,
    parentId: key.sourceID,
  }));

  console.log(cooldownsTimeline);

  console.log(enemyCastsTimeline);

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
