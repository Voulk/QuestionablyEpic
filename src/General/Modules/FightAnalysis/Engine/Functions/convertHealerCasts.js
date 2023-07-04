import { cooldownDB } from "General/Modules/CooldownPlanner/Data/CooldownDB";

async function convertHealerCasts(data, healerID) {
  let summaryData = Object.keys(data)
    .filter((key) => cooldownDB.map((obj) => obj.guid).includes(data[key].ability.guid) && data[key].type === "cast" && healerID.includes(data[key].sourceID))
    .map((key) => data[key]);

  return summaryData;
}

export default convertHealerCasts;
