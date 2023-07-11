import axios from "axios";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";
import { cooldownDB } from "General/Modules/CooldownPlanner/Data/CooldownDB";

const getCooldownCasts = async (reportID, fightID, boss, start, end, healerID) => {
  let nextpage = 0;
  let casts = [];

  const REPORT_QUERY = `
  query getCooldownCasts($reportCode: String!, $startTime: Float!, $endTime: Float! ) {
    reportData {
      report(code: $reportCode) {
        events(dataType: Casts, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, useAbilityIDs: false) {
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
      query getCooldownCasts($reportCode: String!, $startTime: Float!, $endTime: Float! ) {
        reportData {
          report(code: $reportCode) {
            events(dataType: Casts, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, useAbilityIDs: false) {
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

  let filteredCastData = Object.keys(casts)
    .filter((key) => cooldownDB.map((obj) => obj.guid).includes(casts[key].ability.guid) && casts[key].type === "cast" && healerID.includes(casts[key].sourceID))
    .map((key) => casts[key]);

  return filteredCastData;
};

export default getCooldownCasts;
