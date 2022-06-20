import axios from "axios";
import { bossAbilities } from "../../Data/CooldownPlannerBossAbilityList";

// this can probably be merged with the normal damagelog function
export default async function importEnemyBuffs(starttime, endtime, reportid, bossID) {
  const APIdamagetaken = "https://www.warcraftlogs.com:443/v1/report/events/buffs/";
  const API2 = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
  const START = "?start=";
  const END = "&end=";
  const HOSTILITY = "&hostility=1";
  const translate = "&translate=true";
  let buffs = [];
  let nextpage = 0;
  let filter = "&filter=";
  const bossAbilityList = bossAbilities[bossID].filter((filter) => filter.createEvent === true);

  if (bossAbilityList.length === 0) return buffs; // if no abilities then return nothing

  bossAbilityList.map((key, i) => {
    if (i !== bossAbilityList.length - 1) {
      filter = filter.concat("ability.id%3D" + key.guid + "%20OR%20");
    } else {
      filter = filter.concat("ability.id%3D" + key.guid);
    }
  });

  await axios
    .get(APIdamagetaken + reportid + START + starttime + END + endtime + HOSTILITY + (filter === "&filter=" ? "" : filter) + translate + API2)
    .then((result) => {
      buffs = Object.keys(result.data.events).map((key) => result.data.events[key]);
      nextpage = result.data.nextPageTimestamp;
    })
    .catch(function (error) {
      console.log(error);
    });

  // Loop of the import updating the next page until the next page is undefined (no next page from json return)
  if (nextpage !== undefined || null) {
    do {
      await axios
        .get(APIdamagetaken + reportid + START + nextpage + END + endtime + HOSTILITY + (filter === "&filter=" ? "" : filter) + translate + API2)
        .then((result) => {
          buffs = buffs.concat(Object.keys(result.data.events).map((key) => result.data.events[key]));
          nextpage = result.data.nextPageTimestamp;
        })
        .catch(function (error) {
          console.log(error);
        });
    } while (nextpage !== undefined || null);
  }

  return buffs;
}
