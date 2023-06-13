import axios from "axios";
import { accessToken } from "General/SystemTools/LogImport/accessToken.js";

const getTalents = async (reportID, fightID, start, end, charIDS) => {
  let talentImportStringCode = "";
  charIDS.map((id) => (talentImportStringCode = talentImportStringCode.concat(`actor${id}: talentImportCode(actorID: ${id})`)));
  const REPORT_QUERY = `
    query GetTalents($reportCode: String!, $fightIDs: [Int!]) {
        reportData {
          report(code: $reportCode) {
              fights(translate:true,killType:Encounters, fightIDs:$fightIDs ){
                ${talentImportStringCode}
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
          fightIDs: fightID,
        },
      },
    });
    return response.data.data.reportData.report.fights[0];
  } catch (error) {
    console.error(error);
    // Handle error as appropriate for your use case
  }
};

export default getTalents;
