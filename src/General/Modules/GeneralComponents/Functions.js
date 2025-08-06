import moment from "moment";
import axios from "axios";
import chroma from "chroma-js";
// import i18n from "i18next";

// Returns Seconds from 0 to Loglength
export function addMissingTimestamps(loglength, abilityArray, uniqueArrayCD) {
  let newObject = {};
  abilityArray.map((key) => Object.assign(newObject, { [key]: 0 }));
  uniqueArrayCD.map((key) => Object.assign(newObject, { [key]: 0 }));
  let newarray = [{ timestamp: 0, ...newObject }];
  let ticks = [];
  let tickcount = 0;
  let length = moment.utc(loglength).startOf("second") / 1000;
  for (let i = 0; i < length; i++) {
    ticks = ticks.concat(tickcount + 1000);
    tickcount = tickcount + 1000;
  }
  ticks.forEach((element) => newarray.push({ timestamp: element, ...newObject }));
  return newarray;
}

// Returns Unique Objects from an array of Objects
export function getUniqueObjectsFromArray(arr, comp) {
  const unique = arr // store the comparison  values in array
    .map((e) => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i) // store the indexes of the unique objects
    .filter((e) => arr[e]) // eliminate the false indexes & return unique objects
    .map((e) => arr[e]);
  return unique;
}

// reduces array provided by timestamp. returns multiple abilities to one timestamp
export function reduceTimestamps(array) {
  let timestampSum = array.reduce((acc, cur) => {
    acc[cur.timestamp] = array.reduce((x, n) => {
      for (let prop in n) {
        if (cur.timestamp === n.timestamp)
          if (x.hasOwnProperty(prop)) x[prop] += n[prop];
          else x[prop] = n[prop];
      }
      x.timestamp = cur.timestamp;
      return x;
    }, {});
    return acc;
  }, {});
  return timestampSum;
}

// reduces array provided by timestamp. returns multiple abilities to one timestamp
export function reduceTimestampshealth(array, playersInRaid) {
  let timestampSum = array.reduce((acc, cur) => {
    acc[cur.timestamp] = array.reduce((x, n) => {
      let count = 0;
      for (let prop in n) {
        if (cur.timestamp === n.timestamp)
          if (x.hasOwnProperty(prop)) {
            x[prop] += n[prop];
          } else x[prop] = n[prop];
      }
      x.timestamp = cur.timestamp;
      // x.health = x.health;
      return x;
    }, {});
    return acc;
  }, {});

  let newArrayOfObjects = [];
  Object.entries(timestampSum).map((key) => newArrayOfObjects.push(key[1]));
  return newArrayOfObjects;
}

// returns fight duration Time end - time start of log
export function fightDuration(time1, time2) {
  return time1 - time2;
}


// Returns Array of Healer Information
export async function importHealerLogData(starttime, endtime, reportid) {
  const APIHEALING = "https://www.warcraftlogs.com:443/v1/report/tables/healing/";
  const apiMonk = "&sourceclass=Monk";
  const apiPaladin = "&sourceclass=Paladin";
  const apiDruid = "&sourceclass=Druid";
  const apiPriest = "&sourceclass=Priest";
  const apiShaman = "&sourceclass=Shaman";
  const apiWarrior = "&sourceclass=Warrior";
  const apiDemonHunter = "&sourceclass=DemonHunter";
  const apiDeathKnight = "&sourceclass=DeathKnight";
  const apiEvoker = "&sourceclass=Evoker";
  const API2 = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
  const translate = "&translate=true";
  const START = "?start=";
  const END = "&end=";
  let healers = [];
  // Class Casts Import

  await axios
    .get(APIHEALING + reportid + START + starttime + END + endtime + apiMonk + translate + API2)
    .then((result) => {
      healers = Object.keys(result.data.entries)
        .filter((key) => result.data.entries[key].icon === "Monk-Mistweaver")
        .map((key) => result.data.entries[key]);
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(APIHEALING + reportid + START + starttime + END + endtime + apiPaladin + translate + API2)
    .then((result) => {
      healers = healers.concat(
        Object.keys(result.data.entries)
          .filter((key) => result.data.entries[key].icon === "Paladin-Holy")
          .map((key) => result.data.entries[key]),
      );
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(APIHEALING + reportid + START + starttime + END + endtime + apiDruid + translate + API2)
    .then((result) => {
      healers = healers.concat(
        Object.keys(result.data.entries)
          .filter((key) => result.data.entries[key].icon === "Druid-Restoration")
          .map((key) => result.data.entries[key]),
      );
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(APIHEALING + reportid + START + starttime + END + endtime + apiPriest + translate + API2)
    .then((result) => {
      healers = healers.concat(
        Object.keys(result.data.entries)
          // .filter(
          //   (key) =>
          //     result.data.entries[key].icon === "Priest-Holy" ||
          //     result.data.entries[key].icon === "Priest-Discipline"
          // )
          .map((key) => result.data.entries[key]),
      );
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(APIHEALING + reportid + START + starttime + END + endtime + apiShaman + translate + API2)
    .then((result) => {
      healers = healers.concat(
        Object.keys(result.data.entries)
          .filter((key) => result.data.entries[key].icon === "Shaman-Restoration")
          .map((key) => result.data.entries[key]),
      );
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(APIHEALING + reportid + START + starttime + END + endtime + apiWarrior + translate + API2)
    .then((result) => {
      healers = healers.concat(Object.keys(result.data.entries).map((key) => result.data.entries[key]));
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(APIHEALING + reportid + START + starttime + END + endtime + apiDemonHunter + translate + API2)
    .then((result) => {
      healers = healers.concat(Object.keys(result.data.entries).map((key) => result.data.entries[key]));
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(APIHEALING + reportid + START + starttime + END + endtime + apiDeathKnight + translate + API2)
    .then((result) => {
      healers = healers.concat(Object.keys(result.data.entries).map((key) => result.data.entries[key]));
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get(APIHEALING + reportid + START + starttime + END + endtime + apiEvoker + translate + API2)
    .then((result) => {
      healers = healers.concat(Object.keys(result.data.entries).map((key) => result.data.entries[key]));
    })
    .catch(function (error) {
      console.log(error);
    });

  return healers;
}

// Returns Array of Friendly Information
export async function importCharacterIds(starttime, endtime, reportid) {
  const WCLLink = "https://www.warcraftlogs.com:443/v1/report/fights/";
  const translate = "&translate=true";
  const API2 = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
  const START = "?start=";
  const END = "&end=";
  let ids = [];
  // Class Casts Import

  await axios
    .get(WCLLink + reportid + START + starttime + END + endtime + translate + API2)
    .then((result) => {
      Object.entries(result.data.friendlies).map((key) =>
        ids.push({
          id: key[1].id,
          name: key[1].name,
          class: key[1].type,
          spec: key[1].icon,
        }),
      );

      // Object.entries(result.data.enemies).map((key) =>
      //   ids.push({
      //     id: key[1].id,
      //     name: key[1].name,
      //     class: key[1].type,
      //     spec: key[1].icon,
      //   })
      // );
    })
    .catch(function (error) {
      console.log(error);
    });
  return ids;
}

// Returns Array of Healer Information
export async function importEnemyIds(starttime, endtime, reportid) {
  const WCLLink = "https://www.warcraftlogs.com:443/v1/report/fights/";
  const API2 = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
  const START = "?start=";
  const END = "&end=";
  const translate = "&translate=true";
  let ids = [];

  await axios
    .get(WCLLink + reportid + START + starttime + END + endtime + translate + API2)
    .then((result) => {
      Object.entries(result.data.enemies).map((key) =>
        ids.push({
          id: key[1].id,
          name: key[1].name,
          class: key[1].type,
          spec: key[1].icon,
        }),
      );
    })
    .catch(function (error) {
      console.log(error);
    });
  return ids;
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
    // If Notihng Matches the above tests, then return an error code here
    reportID = "err";
  }
  return reportID;
}

export function sumDamage(array) {
  let timestampSum = array.reduce((x, n) => {
    for (let prop in n) {
      if (x.hasOwnProperty(prop)) {
        x[prop] += n[prop];
      } else {
        x[prop] = n[prop];
      }
    }
    return x;
  }, {});
  return timestampSum;
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

export function colorGenerator(brewerCode, numberOfColours) {
  return chroma.scale(brewerCode).colors(numberOfColours);
}

export async function importRaidHealth(starttime, endtime, reportid) {
  const APIdamagetaken = "https://www.warcraftlogs.com:443/v1/report/tables/resources/";
  const API2 = "&api_key=92fc5d4ae86447df22a8c0917c1404dc";
  const START = "?start=";
  const END = "&end=";
  const HOSTILITY = "&hostility=0";
  const ABILITYID = "&abilityid=1000";
  const translate = "&translate=true";
  let health = [];
  let health2 = [];
  let reducedHealth = [];
  let nextpage = 0;

  // await axios
  //   .get(APIdamagetaken + reportid + START + starttime + END + endtime + HOSTILITY + ABILITYID + API2)
  //   .then((result) => {
  //     result.data.series
  //       .filter((key) => key.type !== "Pet")
  //       .map((key) => key.data.map((key2) => health.push({ timestamp: moment.utc(fightDuration(key2[0], starttime)).startOf("second").valueOf(), health: key2[1] })));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  await axios
    .get(APIdamagetaken + reportid + START + starttime + END + endtime + HOSTILITY + ABILITYID + translate + API2)
    .then((result) => {
      const data = result.data;
      const players = data.series.filter((key) => key.type !== "Pet");

      const entities = [];
      players.forEach((series) => {
        const newSeries = {
          ...series,
          lastValue: 100,
          data: {},
        };

        series.data.forEach((item) => {
          const milisecondsIntoFight = moment
            .utc(item[0] - starttime)
            .startOf("second")
            .valueOf();

          const health = item[1];
          newSeries.data[milisecondsIntoFight] = Math.min(100, health);
        });
        entities.push(newSeries);
      });

      const fightDurationInSeconds = moment.utc(endtime - starttime).startOf("second");
      for (let i = 0; i <= fightDurationInSeconds; i += 1000) {
        entities.forEach((series) => {
          series.data[i] = series.data[i] !== undefined ? series.data[i] : series.lastValue;
          series.lastValue = series.data[i];
        });
      }
      const raidHealth = entities.map((player) => {
        const data = Object.entries(player.data).map(([key, value]) => ({
          timestamp: Number(key),
          "Raid Health": value,
        }));
        return data;
      });
      health = raidHealth;
    })

    .catch(function (error) {
      console.log(error);
    });

  let arr = [];
  Object.entries(health)
    .map((key) => key)
    .map((key2) => key2[1])
    .map((map2) => {
      map2.map((object) => {
        arr.push(object);
      });
    });

  arr.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  health2 = reduceTimestampshealth(arr, health.length);
  return health2;
}

// Potentially just convert the class names in the cooldown planner to match the WCL ones
export function wclClassConverter(wclClass) {
  let newClass = "";
  switch (wclClass) {
    case "Priest-Holy":
      newClass = "Priest";
      break;
    case "Priest-Discipline":
      newClass = "Priest";
      break;
    case "Priest-Shadow":
      newClass = "Priest";
      break;
    case "Druid-Restoration":
      newClass = "Druid";
      break;
    case "Druid-Feral":
      newClass = "Druid";
      break;
    case "Druid-Balance":
      newClass = "Druid";
      break;
    case "Druid-Guardian":
      newClass = "Druid";
      break;
    case "Paladin-Holy":
      newClass = "Paladin";
      break;
    case "Monk-Mistweaver":
      newClass = "Monk";
      break;
    case "Shaman-Restoration":
      newClass = "Shaman";
      break;
    case "Shaman-Elemental":
      newClass = "Shaman";
      break;
    case "Shaman-Enhancement":
      newClass = "Shaman";
      break;
    case "Warrior-Fury":
      newClass = "Warrior";
      break;
    case "Warrior-Protection":
      newClass = "Warrior";
      break;
    case "Warrior-Arms":
      newClass = "Warrior";
      break;
    case "DeathKnight-Frost":
      newClass = "DeathKnight";
      break;
    case "DeathKnight-Unholy":
      newClass = "DeathKnight";
      break;
    case "DeathKnight-Blood":
      newClass = "DeathKnight";
      break;
    case "Priest-Shadow":
      newClass = "ShadowPriest";
      break;
    case "DemonHunter-Havoc":
      newClass = "DemonHunter";
      break;
    case "Evoker-Preservation":
      newClass = "Evoker";
      break;
    case "Evoker-Devastation":
      newClass = "Evoker";
      break;
    case "Evoker-Augmentation":
      newClass = "Evoker";
      break;
    default:
      newClass = "No Class";
      break;
  }
  return newClass;
}
