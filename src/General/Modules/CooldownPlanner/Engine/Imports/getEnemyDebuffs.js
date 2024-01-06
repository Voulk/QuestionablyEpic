import axios from "axios";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";
import { bossAbilities } from "../../Data/CooldownPlannerBossAbilityList";

const getEnemyDebuffs = async (start, end, reportID, boss) => {
  let nextpage = 0;
  let casts = [];
  let filter = "";

  const bossAbilityList = bossAbilities[boss].filter((filter) => filter.createEvent === true);

  bossAbilityList.map((key, i) => {
    if (i !== bossAbilityList.length - 1) {
      filter = filter.concat("ability.id=" + key.guid + " OR ");
    } else {
      filter = filter.concat("ability.id=" + key.guid);
    }
  });

  const REPORT_QUERY = `
  query GetEnemyDebuffs($reportCode: String!, $startTime: Float!, $endTime: Float! $filter: String!) {
    reportData {
      report(code: $reportCode) {
        events(dataType: Debuffs,  hostilityType: Enemies, translate: true, startTime: $startTime, endTime:$endTime, useAbilityIDs: false,filterExpression:$filter ) {
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
          startTime: start,
          endTime: end,
          filter: filter,
        },
      },
    });
    casts = casts.concat(response.data.data.reportData.report.events.data);
    nextpage = response.data.data.reportData.report.events.nextPageTimestamp;
  } catch (error) {
    console.error(error);
  }

  if (nextpage !== undefined && nextpage !== null) {
    do {
      const REPORT_QUERY = `
      query GetEnemyDebuffs($reportCode: String!, $startTime: Float!, $endTime: Float! $filter: String!) {
        reportData {
          report(code: $reportCode) {
            events(dataType: Debuffs,  hostilityType: Enemies, translate: true, startTime: $startTime, endTime:$endTime, useAbilityIDs: false,filterExpression:$filter ) {
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
              startTime: nextpage,
              endTime: end,
              filter: filter,
            },
          },
        });
        casts = casts.concat(response.data.data.reportData.report.events.data);
        nextpage = response.data.data.reportData.report.events.nextPageTimestamp;
      } catch (error) {
        console.error(error);
      }
    } while (nextpage !== undefined && nextpage !== null);
  }

  let filteredCastData = Object.keys(casts).map((key) => casts[key]);
  return filteredCastData;
};

export default getEnemyDebuffs;
