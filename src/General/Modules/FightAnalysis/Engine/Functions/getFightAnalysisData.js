import axios from "axios";
import { defensiveDB } from "Databases/DefensiveDB";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";
import { externalsDB } from "Databases/ExternalsDB";
import { filterIDS } from "../Filters";

const getFightAnalysisData = async (reportID, fightID, boss) => {
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
    query GetFightAnalysisData($reportCode: String!, $fightID: [Int], $defensiveFilter: String!, $externalFilter: String!, $damageTakenFilters: String!) {
        reportData {
        report(code: $reportCode) {
            monkData: table(dataType: Healing, sourceClass: "Monk", translate: true, fightIDs: $fightID)
            paladinData: table(dataType: Healing, sourceClass: "Paladin", translate: true, fightIDs: $fightID)
            druidData: table(dataType: Healing, sourceClass: "Druid", translate: true, fightIDs: $fightID)
            priestData: table(dataType: Healing, sourceClass: "Priest", translate: true, fightIDs: $fightID)
            shamanData: table(dataType: Healing, sourceClass: "Shaman", translate: true, fightIDs: $fightID)
            warriorData: table(dataType: Healing, sourceClass: "Warrior", translate: true, fightIDs: $fightID)
            demonHunterData: table(dataType: Healing, sourceClass: "DemonHunter", translate: true, fightIDs: $fightID)
            deathKnightData: table(dataType: Healing, sourceClass: "DeathKnight", translate: true, fightIDs: $fightID)
            evokerData: table(dataType: Healing, sourceClass: "Evoker", translate: true, fightIDs: $fightID)
            defensiveData: events(dataType: Casts, hostilityType: Friendlies, translate: true, fightIDs: $fightID, filterExpression: $defensiveFilter) {
            data
            }
            externalData: events(dataType: Casts, hostilityType: Friendlies, translate: true, fightIDs: $fightID, filterExpression: $externalFilter) {
            data
            }
            friendlyCasts: events(dataType: Casts, hostilityType: Friendlies, translate: true, fightIDs: $fightID) {
            data
            }
            enemyCasts: events(dataType: Casts, hostilityType: Enemies, translate: true, fightIDs: $fightID) {
            data
            }
            characterIDs: playerDetails(translate: true, fightIDs: $fightID)
            friendlyDamageTaken: events(dataType: DamageTaken, hostilityType: Friendlies, translate: true, fightIDs: $fightID, filterExpression: $damageTakenFilters) {
            data
            }
            raidHealthData: table(dataType: Resources, translate: true, hostilityType: Friendlies, fightIDs: $fightID, filterExpression: "ability.id=1000")
            summaryData: table(dataType: Summary, translate: true, fightIDs: $fightID)
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
