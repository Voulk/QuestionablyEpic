import axios from "axios";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";
import { defensiveDB } from "Databases/DefensiveDB";

const getDefensiveCasts = async (reportID, fightID, boss, start, end) => {
  let nextpage = 0;
  let defensives = [];

  let defensiveFilter = "";
  defensiveDB.map((key, i) => {
    if (i !== defensiveDB.length - 1) {
      defensiveFilter = defensiveFilter.concat("ability.id=" + key.guid + " OR ");
    } else {
      defensiveFilter = defensiveFilter.concat("ability.id=" + key.guid);
    }
  });

  const REPORT_QUERY = `
  query GetDefensiveCasts($reportCode: String!, $startTime: Float!, $endTime: Float!, $defensiveFilters: String! ) {
    reportData {
      report(code: $reportCode) {
        events(dataType: Casts, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, filterExpression: $defensiveFilters, useAbilityIDs: false) {
          data
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
          defensiveFilters: defensiveFilter,
          startTime: start,
          endTime: end,
        },
      },
    });
    defensives = defensives.concat(response.data.data.reportData.report.events.data);
    nextpage = response.data.data.reportData.report.events.nextPageTimestamp;
  } catch (error) {
    console.error(error);
  }

  if (nextpage !== undefined && nextpage !== null) {
    do {
      const REPORT_QUERY = `
      query GetDefensiveCasts($reportCode: String!, $startTime: Float!, $endTime: Float!, $defensiveFilters: String! ) {
        reportData {
          report(code: $reportCode) {
            events(dataType: Casts, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, filterExpression: $defensiveFilters, useAbilityIDs: false) {
              data
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
              defensiveFilters: defensiveFilter,
              startTime: start,
              endTime: end,
            },
          },
        });
        defensives = defensives.concat(response.data.data.reportData.report.events.data);
        nextpage = response.data.data.reportData.report.events.nextPageTimestamp;
      } catch (error) {
        console.error(error);
      }
    } while (nextpage !== undefined && nextpage !== null);
  }

  let filteredDefensives = Object.keys(defensives)
    .filter((key) => defensives[key].type === "cast")
    .map((key) => defensives[key]);

  return filteredDefensives;
};

export default getDefensiveCasts;
