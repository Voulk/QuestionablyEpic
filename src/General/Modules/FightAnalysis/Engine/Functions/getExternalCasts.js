// Importing necessary modules and data
import axios from "axios";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";
import { externalsDB } from "Databases/ExternalsDB";

// GraphQL query to fetch external casts data
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

// Function to send a request to the Warcraft Logs API and fetch external casts data
async function fetchExternalData(reportCode, externalFilters, startTime, endTime) {
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
          reportCode,
          externalFilters,
          startTime,
          endTime,
        },
      },
    });
    return response.data.data.reportData.report.events;
  } catch (error) {
    console.error(error);
    // Handle error as appropriate for your use case
  }
}

// Main function to get external casts data
const getExternalCasts = async (reportID, fightID, boss, start, end, healerID) => {
  // Create filter string
  const externalFilter = externalsDB.map(key => `ability.id=${key.guid}`).join(' OR ');

  let externals = [];
  let nextpage = start;

  // Fetch data from all pages
  while (nextpage) {
    const result = await fetchExternalData(reportID, externalFilter, nextpage, end);
    externals = externals.concat(result.data);
    nextpage = result.nextPageTimestamp;
  }

  // Filter out non-cast events and events not related to the specified healer
  const filteredExternals = externals.filter(
    item => externalsDB.map(obj => obj.guid).includes(item.ability.guid) && item.type === "cast" && healerID.includes(item.sourceID)
  );

  return filteredExternals;
};

export default getExternalCasts;
