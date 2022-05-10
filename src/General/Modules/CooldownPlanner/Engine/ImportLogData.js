import {
  importHealerLogData,
  importCooldownPlannerCastsLogData,
  //   importSummaryData,
  //   importCharacterIds,
  importEnemyCasts,
  //   importEnemyIds,
  logDifficulty,
} from "../../CooldownPlanner/Functions/Functions";

export default async function importLogData(starttime, endtime, reportID, boss, logDif, setLogData, setLoadingProgress) {
  setLoadingProgress(20);
  const dif = logDifficulty(logDif);
  /* ----------- Import Healer Info from the Logs healing table for each healing class. ----------- */
  setLoadingProgress(40);
  const healers = await importHealerLogData(starttime, endtime, reportID);

  /* ------------------ Import the log data for Casts for each healer in the log. ----------------- */
  setLoadingProgress(60);
  const healerCasts = await importCooldownPlannerCastsLogData(
    starttime,
    endtime,
    reportID,
    healers.map((key) => key.id),
  );

  /* ------------------------------- Import Log data for enemy casts ------------------------------ */
  setLoadingProgress(80);
  const enemyCasts = await importEnemyCasts(starttime, endtime, reportID);

  /* ------------------------------ Import Character IDS from the log ----------------------------- */
  // const playerIDs = await importCharacterIds(starttime, endtime, reportID);
  // Set Progress Bar to 20%

  /* -------------------------------- Import Enemy IDS from the log ------------------------------- */
  // const enemyIDs = await importEnemyIds(starttime, endtime, reportID);
  // Set Progress Bar to 30%

  // const summary = await importSummaryData(starttime, endtime, reportID);
  // Set Progress Bar to 40%
  setLoadingProgress(100);
  setLogData({ enemyCasts: enemyCasts, healerCasts: healerCasts, healers: healers, bossID: boss, difficulty: dif, importSuccessful: true });
}
