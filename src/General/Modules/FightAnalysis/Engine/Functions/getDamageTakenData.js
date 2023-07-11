// Importing necessary modules and data
import axios from "axios";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";
import { filterIDS } from "../Filters";
import { spellExclusions } from "General/Modules/CooldownPlanner/Data/SpellExclusions";

// GraphQL query to fetch damage taken data
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

// Function to send a request to the Warcraft Logs API and fetch damage taken data
async function fetchDamageData(reportCode, damageTakenFilters, startTime, endTime) {
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
          damageTakenFilters,
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

// Main function to get damage taken data
const getDamageTakenData = async (reportID, fightID, boss, start, end) => {
  // Get boss IDs and create filter string
  const bossIDS = filterIDS[boss];
  const damageTakenFilters = bossIDS.map(id => `source.id=${id}`).join(' OR ');
  
  let damage = [];
  let nextpage = start;

  // Fetch data from all pages
  while (nextpage) {
    const result = await fetchDamageData(reportID, damageTakenFilters, nextpage, end);
    damage = damage.concat(result.data);
    nextpage = result.nextPageTimestamp;
  }

  // Filter out unwanted damage data
  const filteredDamage = damage.filter(
    item => !spellExclusions.includes(item.ability.guid) && item.unmitigatedAmount
  );

  return filteredDamage;
};

export default getDamageTakenData;
