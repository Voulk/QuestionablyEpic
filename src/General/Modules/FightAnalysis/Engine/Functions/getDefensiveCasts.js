// Importing necessary modules and data
import axios from "axios";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";
import { defensiveDB } from "Databases/DefensiveDB";

// GraphQL query to fetch defensive casts data
const REPORT_QUERY = `
  query GetDefensiveCasts($reportCode: String!, $startTime: Float!, $endTime: Float!, $defensiveFilters: String! ) {
    reportData {
      report(code: $reportCode) {
        events(dataType: Casts, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, filterExpression: $defensiveFilters, useAbilityIDs: false) {
          data
          nextPageTimestamp
        }
      }
    }
  }  
`;

// Function to send a request to the Warcraft Logs API and fetch defensive casts data
async function fetchDefensiveData(reportCode, defensiveFilters, startTime, endTime) {
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
          defensiveFilters,
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

// Main function to get defensive casts data
const getDefensiveCasts = async (reportID, fightID, boss, start, end) => {
  // Create filter string
  const defensiveFilter = defensiveDB.map((key) => `ability.id=${key.guid}`).join(" OR ");

  let defensives = [];
  let nextpage = start;

  // Fetch data from all pages
  while (nextpage) {
    const result = await fetchDefensiveData(reportID, defensiveFilter, nextpage, end);
    defensives = defensives.concat(result.data);
    nextpage = result.nextPageTimestamp;
  }

  // Filter out non-cast events
  const filteredDefensives = defensives.filter((item) => item.type === "cast");

  return filteredDefensives;
};

export default getDefensiveCasts;
