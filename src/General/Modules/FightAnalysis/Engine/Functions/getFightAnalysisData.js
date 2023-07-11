import axios from "axios";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";

const REPORT_QUERY = `
  query GetFightAnalysisData($reportCode: String!, $startTime: Float!, $endTime: Float! ) {
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
        enemyCasts: events(dataType: Casts, hostilityType: Enemies, translate: true, startTime: $startTime, endTime:$endTime, useAbilityIDs: false ) {
          data
          nextPageTimestamp
        }
        characterIDs: playerDetails(translate: true, startTime: $startTime, endTime:$endTime)
        friendlyDamageTaken: events(dataType: DamageTaken, hostilityType: Friendlies, translate: true, startTime: $startTime, endTime:$endTime, useAbilityIDs: false) {
          data
          nextPageTimestamp
        }
        summaryData: table(dataType: Summary, translate: true, startTime: $startTime, endTime:$endTime)
      }
    }
  }
`;

const getFightAnalysisData = async (reportID, fightID, start, end) => {
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
    return response.data.data.reportData.report;
  } catch (error) {
    console.error(error);
    // Handle error as appropriate for your use case
  }
};

export default getFightAnalysisData;