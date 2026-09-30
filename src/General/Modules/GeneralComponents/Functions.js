import moment from "moment";
import axios from "axios";

// returns fight duration Time end - time start of log
export function fightDuration(time1, time2) {
  return time1 - time2;
}


export function killOrWipe(check) {
  if (check === false) {
    return "Wipe";
  } else {
    return "Kill!";
  }
}

function stripQueryParams(url) {
  const index = url.indexOf('?');
  return index === -1 ? url : url.slice(0, index);
}

export function warcraftLogReportID(string) {
  let reportID = "";
  let stringNew = stripQueryParams(string);
  // If String is longer than report length

  if (string.includes("#")) {
    stringNew = string.split("#")[0];
  }

  if (stringNew.length > 16 && stringNew.includes("/")) {
    let stringCheck = stringNew
      .split("/")
      .filter((key) => key.length === 16)
      .toString();
    if (stringCheck === "") {
      reportID = "err";
    } else {
      reportID = stringCheck;
    }
  } else if (stringNew.length === 16) {
    // If String is the Length of a Log (Very Unlikely to randomly put a 16 character string that isn't a log here)
    reportID = stringNew;
  } else if (stringNew === "") {
    reportID = "";
  } else {
    // If nothing matches the above tests, then return an error code here
    reportID = "err";
  }
  return reportID;
}


export function logDifficulty(dif) {
  switch (dif) {
    case 1:
      return "LFR";
    case 3:
      return "Normal";
    case 4:
      return "Heroic";
    case 5:
      return "Mythic";
    case 10:
      return "M+";
    default:
      return "Error: Difficulty Missing :(";
  }
}

// Returns Array of Healer Information
export async function importSummaryData(starttime, endtime, reportid) {
  const APISummary = "https://www.warcraftlogs.com:443/v1/report/tables/summary/";
  const API2 = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
  const START = "?start=";
  const END = "&end=";
  const translate = "&translate=true";
  let summary = [];
  // Class Casts Import

  await axios
    .get(APISummary + reportid + START + starttime + END + endtime + translate + API2)
    .then((result) => {
      summary = Object.keys(result.data.playerDetails)

        .filter((key) => key === "healers")
        .map((key) => result.data.playerDetails[key])
        .flat();
    })
    .catch(function (error) {
      console.log(error);
    });

  return summary;
}

