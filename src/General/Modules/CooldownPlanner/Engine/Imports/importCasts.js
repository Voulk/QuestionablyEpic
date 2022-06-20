import axios from "axios";
import { cooldownDB } from "../../Data/CooldownDB";

// Returns an array of objects containing the information when spells were cast.
// The list of spells are filtered by the "cdPlannerImport" tag in the cooldownDB.
// an example of a returned object below
// [
//   {
//     timestamp: 726460,
//     type: "cast",
//     sourceID: 14,
//     sourceIsFriendly: true,
//     target: {
//       name: "Environment",
//       id: -1,
//       guid: 0,
//       type: "NPC",
//       icon: "NPC",
//     },
//     targetIsFriendly: false,
//     ability: {
//       name: "Fallen Order",
//       guid: 326860,
//       type: 32,
//       abilityIcon: "ability_revendreth_monk.jpg",
//     },
//     fight: 4,
//     resourceActor: 1,
//     classResources: [
//       {
//         amount: 47825,
//         max: 50000,
//         type: 0,
//         cost: 1000,
//       },
//     ],
//     hitPoints: 73180,
//     maxHitPoints: 73180,
//     attackPower: 2723,
//     spellPower: 2618,
//     armor: 828,
//     absorb: 0,
//     x: 371393,
//     y: -573521,
//     facing: -468,
//     mapID: 2052,
//     itemLevel: 276,
//   },
// ];

export default async function importCasts(starttime, endtime, reportid, healerID) {
  const APICast = "https://www.warcraftlogs.com:443/v1/report/events/casts/";
  const START = "?start=";
  const END = "&end=";
  const HOSTILITY = "&hostility=0"; // hostility = friendly
  const API2 = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
  const translate = "&translate=true";
  let nextpage = 0;
  let cooldowns = [];

  await axios
    .get(APICast + reportid + START + starttime + END + endtime + HOSTILITY + translate + API2)
    .then((result) => {
      cooldowns = Object.keys(result.data.events)
        // filter out events that don't meet the below criteria
        .filter(
          (key) =>
            cooldownDB
              .filter((filter) => filter.cdPlannerImport === true) // Filter by active spells in the cooldownDB
              .map((obj) => obj.guid) // Map the active guids
              // Check if the filtered cooldownDB contains the events guid
              .includes(result.data.events[key].ability.guid) &&
            // Check if the event type is a cast so we don't capture any start casts etc to filter out any startstop casting
            result.data.events[key].type === "cast" &&
            // Check if healerID includes the events sourceID
            healerID.includes(result.data.events[key].sourceID),
        )
        // map the events
        .map((key) => result.data.events[key]);
      // set the nextPage for the loop
      nextpage = result.data.nextPageTimestamp;
    })
    .catch(function (error) {
      console.log(error);
    });
  // Loop of the import updating the next page until the next page is undefined (no next page from json return)
  let i = 0;
  // if there is no nextPage then nothing
  if (nextpage !== undefined || null) {
    // do the below while nextpage isn't undefined or null. If the returned page from wcl doesn't have a nextpage tag (last page of report) then the code should stop
    do {
      await axios
        .get(APICast + reportid + START + nextpage + END + endtime + HOSTILITY + translate + API2)
        .then((result) => {
          cooldowns = cooldowns.concat(
            Object.keys(result.data.events)
              // filter out events that don't meet the below criteria
              .filter(
                (key) =>
                  cooldownDB
                    .filter((filter) => filter.cdPlannerImport === true) // Filter by active spells in the cooldownDB
                    .map((obj) => obj.guid) // Map the active guids
                    // Check if the filtered cooldownDB contains the events guid
                    .includes(result.data.events[key].ability.guid) &&
                  // Check if the event type is a cast so we don't capture any start casts etc to filter out any startstop casting
                  result.data.events[key].type === "cast" &&
                  // Check if healerID includes the events sourceID
                  healerID.includes(result.data.events[key].sourceID),
              )
              // map the events
              .map((key) => result.data.events[key]),
          );
          // set the nextPage for the loop
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
