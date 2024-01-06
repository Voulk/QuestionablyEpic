import {
  importHealerLogData,
  //   importSummaryData,
  //   importCharacterIds,
  importEnemyCasts,
  //   importEnemyIds,
  logDifficulty,
} from "../../CooldownPlanner/Functions/Functions";

import importEnemyHealth from "./Imports/importEnemyHealth";
import importEnemyEnergy from "./Imports/importEnemyEnergy";
import importDebuffDataFiltered from "./Imports/importDebuffDataFiltered";
import getEnemyDebuffs from "./Imports/getEnemyDebuffs";
import importDamageLogDataFiltered from "./Imports/importDamageLogDataFiltered";
import importCasts from "./Imports/importCasts";
import importEnemyBuffs from "./Imports/importEnemyBuffs";
import importFriendlyHealthdata from "./Imports/importFriendlyHealthdata";

export default async function importLogData(starttime, endtime, reportID, boss, logDif, setLogData, setLoadingProgress) {
  setLoadingProgress(20);

  const enemyEnergy = await importEnemyEnergy(starttime, endtime, reportID);
  const enemyHealth = await importEnemyHealth(starttime, endtime, reportID);
  const friendlyHealth = await importFriendlyHealthdata(starttime, endtime, reportID);

  const dif = logDifficulty(logDif);
  /* ----------- Import Healer Info from the Logs healing table for each healing class. ----------- */
  setLoadingProgress(40);
  const healers = await importHealerLogData(starttime, endtime, reportID);

  /* ------------------ Import the log data for Casts for each healer in the log. ----------------- */
  setLoadingProgress(60);
  const healerCasts = await importCasts(
    starttime,
    endtime,
    reportID,
    healers.map((key) => key.id),
  );

  const damageTakenData = await importDamageLogDataFiltered(starttime, endtime, reportID, boss);

  const debuffData = await importDebuffDataFiltered(starttime, endtime, reportID, boss);
  const enemyDebuffData = await getEnemyDebuffs(starttime, endtime, reportID, boss);
  const buffData = await importEnemyBuffs(starttime, endtime, reportID, boss);
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
  setLogData({
    enemyCasts: enemyCasts,
    healerCasts: healerCasts,
    healers: healers,
    bossID: boss,
    difficulty: dif,
    importSuccessful: true,
    damageTaken: damageTakenData,
    debuffData: debuffData,
    enemyHealth: enemyHealth,
    buffData: buffData,
    friendlyHealth: friendlyHealth,
    enemyEnergy: enemyEnergy,
    enemyDebuffData: enemyDebuffData,
  });
}
