import axios from "axios";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";
import { externalsDB } from "Databases/ExternalsDB";

const getExternalCasts = async (reportID, fightID, boss, start, end, healerID) => {
  let nextpage = 0;
  let externals = [];

  let externalFilter = "";
  externalsDB.map((key, i) => {
    if (i !== externalsDB.length - 1) {
      externalFilter = externalFilter.concat("ability.id=" + key.guid + " OR ");
    } else {
      externalFilter = externalFilter.concat("ability.id=" + key.guid);
    }
  });

  const REPORT_QUERY = `
  query GetExternalCasts($reportCode: String!, $startTime: Float!, $endTime: Float!, $externalFilters: String! ) {
    reportData {
      report(code: $reportCode) {
        events(dataType: Casts, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, filterExpression: $externalFilters, useAbilityIDs: false) {
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
          externalFilters: externalFilter,
          startTime: start,
          endTime: end,
        },
      },
    });
    externals = externals.concat(response.data.data.reportData.report.events.data);
    nextpage = response.data.data.reportData.report.events.nextPageTimestamp;
  } catch (error) {
    console.error(error);
  }

  if (nextpage !== undefined && nextpage !== null) {
    do {
      const REPORT_QUERY = `
      query GetExternalCasts($reportCode: String!, $startTime: Float!, $endTime: Float!, $externalFilters: String! ) {
        reportData {
          report(code: $reportCode) {
            events(dataType: Casts, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, filterExpression: $externalFilters, useAbilityIDs: false) {
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
              externalFilters: externalFilter,
              startTime: nextpage,
              endTime: end,
            },
          },
        });
        externals = externals.concat(response.data.data.reportData.report.events.data);
        nextpage = response.data.data.reportData.report.events.nextPageTimestamp;
      } catch (error) {
        console.error(error);
      }
    } while (nextpage !== undefined && nextpage !== null);
  }

  let filteredExternals = Object.keys(externals)
    .filter((key) => externalsDB.map((obj) => obj.guid).includes(externals[key].ability.guid) && externals[key].type === "cast" && healerID.includes(externals[key].sourceID))
    .map((key) => externals[key]);

  return filteredExternals;
};

export default getExternalCasts;
