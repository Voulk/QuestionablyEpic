import axios from "axios";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";
import { filterIDS } from "../Filters";

const getDamageTakenData = async (reportID, fightID, boss, start, end) => {
  let damageTakenFilters = "";
  const bossIDS = filterIDS[boss];
  let nextpage = 0;
  let damage = [];

  bossIDS.map((key, i) => {
    if (i !== bossIDS.length - 1) {
      damageTakenFilters = damageTakenFilters.concat("source.id=" + key + " OR ");
    } else {
      damageTakenFilters = damageTakenFilters.concat("source.id=" + key);
    }
  });

  const REPORT_QUERY = `
  query GetDamageTakenData($reportCode: String!, $startTime: Float!, $endTime: Float!, $damageTakenFilters: String! ) {
    reportData {
      report(code: $reportCode) {
        events(dataType: DamageTaken, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, useAbilityIDs: false, filterExpression: $damageTakenFilters) {
          data
          nextPageTimestamp
        }
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
          damageTakenFilters: damageTakenFilters,
          startTime: start,
          endTime: end,
        },
      },
    });
    damage = damage.concat(response.data.data.reportData.report.events.data);
    nextpage = response.data.data.reportData.report.events.nextPageTimestamp;
  } catch (error) {
    console.error(error);
  }

  if (nextpage !== undefined && nextpage !== null) {
    do {
      const REPORT_QUERY = `
        query GetDamageTakenData($reportCode: String!, $startTime: Float!, $endTime: Float!, $damageTakenFilters: String! ) {
          reportData {
            report(code: $reportCode) {
              events(dataType: DamageTaken, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, useAbilityIDs: false, filterExpression: $damageTakenFilters) {
                data
                nextPageTimestamp
              }
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
              damageTakenFilters: damageTakenFilters,
              startTime: nextpage,
              endTime: end,
            },
          },
        });
        damage = damage.concat(response.data.data.reportData.report.events.data);
        nextpage = response.data.data.reportData.report.events.nextPageTimestamp;
      } catch (error) {
        console.error(error);
      }
    } while (nextpage !== undefined && nextpage !== null);
  }

  return damage;
};

export default getDamageTakenData;
