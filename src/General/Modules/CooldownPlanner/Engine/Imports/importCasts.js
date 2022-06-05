import axios from "axios";
import { cooldownDB } from "../../Data/CooldownDB";

export default async function importCasts(starttime, endtime, reportid, healerID) {
  const APICast = "https://www.warcraftlogs.com:443/v1/report/events/casts/";
  const START = "?start=";
  const END = "&end=";
  const HOSTILITY = "&hostility=0";
  const API2 = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
  const translate = "&translate=true";
  let nextpage = 0;
  let cooldowns = [];

  await axios
    .get(APICast + reportid + START + starttime + END + endtime + HOSTILITY + translate + API2)
    .then((result) => {
      cooldowns = Object.keys(result.data.events)
        .filter(
          (key) =>
            cooldownDB
              .filter((filter) => filter.cdPlannerImport === true)
              .map((obj) => obj.guid)
              .includes(result.data.events[key].ability.guid) &&
            result.data.events[key].type === "cast" &&
            healerID.includes(result.data.events[key].sourceID),
        )
        .map((key) => result.data.events[key]);
      nextpage = result.data.nextPageTimestamp;
    })
    .catch(function (error) {
      console.log(error);
    });
  // Loop of the import updating the next page until the next page is undefined (no next page from json return)
  let i = 0;
  if (nextpage !== undefined || null) {
    do {
      await axios
        .get(APICast + reportid + START + nextpage + END + endtime + HOSTILITY + translate + API2)
        .then((result) => {
          cooldowns = cooldowns.concat(
            Object.keys(result.data.events)
              .filter(
                (key) =>
                  cooldownDB
                    .filter((filter) => filter.cdPlannerImport === true)
                    .map((obj) => obj.guid)
                    .includes(result.data.events[key].ability.guid) &&
                  result.data.events[key].type === "cast" &&
                  healerID.includes(result.data.events[key].sourceID),
              )
              .map((key) => result.data.events[key]),
          );
          nextpage = result.data.nextPageTimestamp;
        })
        .catch(function (error) {
          console.log(error);
        });
      i = i + 1;
    } while (nextpage !== undefined || null);
  }
  return cooldowns;
}
