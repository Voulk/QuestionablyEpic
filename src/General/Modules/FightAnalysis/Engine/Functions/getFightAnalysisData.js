import axios from "axios";
import { defensiveDB } from "Databases/DefensiveDB";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";
import { externalsDB } from "Databases/ExternalsDB";
import { filterIDS } from "../Filters";

const getFightAnalysisData = async (reportID, fightID, boss, start, end) => {
  let defensiveFilter = "";
  defensiveDB.map((key, i) => {
    if (i !== defensiveDB.length - 1) {
      defensiveFilter = defensiveFilter.concat("ability.id=" + key.guid + " OR ");
    } else {
      defensiveFilter = defensiveFilter.concat("ability.id=" + key.guid);
    }
  });

  let externalFilter = "";
  externalsDB.map((key, i) => {
    if (i !== externalsDB.length - 1) {
      externalFilter = externalFilter.concat("ability.id=" + key.guid + " OR ");
    } else {
      externalFilter = externalFilter.concat("ability.id=" + key.guid);
    }
  });

  let damageTakenFilters = "";
  const bossIDS = filterIDS[boss];

  // Filter the damage taken source by npc ids
  bossIDS.map((key, i) => {
    if (i !== bossIDS.length - 1) {
      damageTakenFilters = damageTakenFilters.concat("source.id=" + key + " OR ");
    } else {
      damageTakenFilters = damageTakenFilters.concat("source.id=" + key);
    }
  });
  //   setIsLoading(true);
  //   setError(null);
  const REPORT_QUERY = `
    query GetFightAnalysisData($reportCode: String!, $defensiveFilter: String!, $externalFilter: String!, $damageTakenFilters: String!, $startTime: Float!, $endTime: Float!) {
        reportData {
        report(code: $reportCode) {
            monkData: table(dataType: Healing, sourceClass: "Monk", translate: true, startTime: $startTime, endTime:$endTime)
            paladinData: table(dataType: Healing, sourceClass: "Paladin", translate: true, startTime: $startTime, endTime:$endTime)
            druidData: table(dataType: Healing, sourceClass: "Druid", translate: true, startTime: $startTime, endTime:$endTime)
            priestData: table(dataType: Healing, sourceClass: "Priest", translate: true, startTime: $startTime, endTime:$endTime)
            shamanData: table(dataType: Healing, sourceClass: "Shaman", translate: true, startTime: $startTime, endTime:$endTime)
            warriorData: table(dataType: Healing, sourceClass: "Warrior", translate: true, startTime: $startTime, endTime:$endTime)
            demonHunterData: table(dataType: Healing, sourceClass: "DemonHunter", translate: true, startTime: $startTime, endTime:$endTime)
            deathKnightData: table(dataType: Healing, sourceClass: "DeathKnight", translate: true, startTime: $startTime, endTime:$endTime)
            evokerData: table(dataType: Healing, sourceClass: "Evoker", translate: true, startTime: $startTime, endTime:$endTime)
            defensiveData: events(dataType: Casts, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, filterExpression: $defensiveFilter, useAbilityIDs: false) {
            data
            }
            externalData: events(dataType: Casts, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, filterExpression: $externalFilter, useAbilityIDs: false) {
            data
            }
            friendlyCasts: events(dataType: Casts, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, useAbilityIDs: false) {
            data
            }
            enemyCasts: events(dataType: Casts, hostilityType: Enemies, translate: true, startTime: $startTime, endTime:$endTime, useAbilityIDs: false) {
            data
            }
            characterIDs: playerDetails(translate: true, startTime: $startTime, endTime:$endTime)
            friendlyDamageTaken: events(dataType: DamageTaken, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, filterExpression: $damageTakenFilters, useAbilityIDs: false) {
            data
            }
            summaryData: table(dataType: Summary, translate: true, startTime: $startTime, endTime:$endTime)
        }
        }
    }
    `;

  try {
    const response = await axios({
      url: "https://www.warcraftlogs.com/api/v2/client",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        query: REPORT_QUERY,
        variables: {
          reportCode: reportID,
          fightID: [fightID],
          defensiveFilter: defensiveFilter,
          externalFilter: externalFilter,
          damageTakenFilters: damageTakenFilters,
          startTime: start,
          endTime: end,
        },
      },
    });
    console.log(response);
    return response.data.data.reportData.report;
  } catch (error) {
    console.error(error);
    // setError(error);
  } finally {
    // setIsLoading(false);
  }
};

export default getFightAnalysisData;
