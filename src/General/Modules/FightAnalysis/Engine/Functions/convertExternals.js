import { externalsDB } from "Databases/ExternalsDB.js";

async function convertExternals(data, healerID) {
  let external = Object.keys(data)
    .filter((key) => externalsDB.map((obj) => obj.guid).includes(data[key].ability.guid) && data[key].type === "cast" && healerID.includes(data[key].sourceID))
    .map((key) => data[key]);

  return external;
}

export default convertExternals;
