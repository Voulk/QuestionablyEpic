//prettier-ignore
import {
  addMissingTimestamps, getUniqueObjectsFromArray, reduceTimestamps, fightDuration, durationmaker, sumDamage, importRaidHealth
} from "../../CooldownPlanner/Functions/Functions";
import moment from "moment";
import { cooldownDB } from "../../CooldownPlanner/Data/CooldownDB";
import convertHealers from "General/Modules/FightAnalysis/Engine/Functions/convertHealers";
import getFightAnalysisData from "General/Modules/FightAnalysis/Engine/Functions/getFightAnalysisData";
import getDamageTakenData from "General/Modules/FightAnalysis/Engine/Functions/getDamageTakenData";
import getDefensiveCasts from "General/Modules/FightAnalysis/Engine/Functions/getDefensiveCasts";
import convertCharacterIDs from "General/Modules/FightAnalysis/Engine/Functions/convertCharacterIDs";
// import convertEnemyIDs from "General/Modules/FightAnalysis/Engine/Functions/convertEnemyIDs";
import convertSummaryData from "General/Modules/FightAnalysis/Engine/Functions/convertSummaryData";
import getExternalCasts from "General/Modules/FightAnalysis/Engine/Functions/getExternalCasts";
import getCooldownCasts from "General/Modules/FightAnalysis/Engine/Functions/getCooldownCasts";
import getTalents from "General/Modules/FightAnalysis/Engine/Functions/getTalents";

export default async function updatechartdata(starttime, endtime, reportID, boss, difficulty, id) {
  /* -------- Note we are using alot of imported functions Here to save bloat in the Code. -------- */

  /* -- Set the Loading State of the loading spinner so that the user knows data is being loaded. - */
  this.setState({ loadingcheck: true });

  let healerDurations = [];
  let sortedDataUnmitigatedWithCooldowns = [];
  let sortedDataMitigatedDamageWithCooldowns = [];
  let sortedDataUnmitigatedNoCooldowns = [];
  let sortedDataMitigatedDamageNoCooldowns = [];
  let damagingAbilities = [];

  const WCLDATA = await getFightAnalysisData(reportID, id, starttime, endtime);

  /* ---- Fight Length of the selected report is calculated and coverted to seconds as a string --- */
  const fightLength = moment.duration(fightDuration(endtime, starttime)).asSeconds().toString();

  /* ----------- Import Healer Info from the Logs healing table for each healing class. ----------- */
  const [healers, playerIDs, summary, damage, health, defensives] = await Promise.all([
    convertHealers(WCLDATA),
    convertCharacterIDs(WCLDATA.characterIDs.data.playerDetails),
    convertSummaryData(WCLDATA.summaryData.data.playerDetails),
    getDamageTakenData(reportID, id, boss, starttime, endtime),
    importRaidHealth(starttime, endtime, this.state.reportid),
    getDefensiveCasts(reportID, id, boss, starttime, endtime),
  ]);

  /* --------------------------- Map Healer Data for ID, Name and Class. -------------------------- */
  const healerIDName = [];
  const healerMap = [];

  for (const key of healers) {
    healerIDName.push({
      id: key.id,
      name: key.name,
      class: key.type,
    });
    healerMap.push(key.id);
  }

  const talentStrings = await getTalents(reportID, id, starttime, endtime, healerMap);
  // Iterate over each key-value pair in the talentStrings object
  for (const [key, value] of Object.entries(talentStrings)) {
    // Extract the ID from the key by removing the 'actor' prefix
    const id = parseInt(key.replace("actor", ""), 10);
    // Find the corresponding healer in the healerIDName array
    const healer = summary.find((healer) => healer.id === id);
    // If a healer was found, add the talent string to the healer object
    if (healer) {
      healer.talentString = value;
    }
  }
  /* ----------- Import Healer Info from the Logs healing table for each healing class. ----------- */
  const [cooldowns, externals] = await Promise.all([getCooldownCasts(reportID, id, boss, starttime, endtime, healerMap), getExternalCasts(reportID, id, boss, starttime, endtime, healerMap)]);

  /* ------------------------------- Import Log data for enemy casts ------------------------------ */
  // const enemyCasts = await importEnemyCasts(starttime, endtime, this.state.reportid);

  /* ---------------- Map the damaging abilities and guids to an array of objects. ---------------- */
  damage.map((key) =>
    damagingAbilities.push({
      ability: key.ability.name,
      guid: key.ability.guid,
    }),
  );

  /* ---------------- Filter the array to unique entries for Ability name and Guid. --------------- */
  const uniqueArray = damagingAbilities.filter((ele, ind) => ind === damagingAbilities.findIndex((elem) => elem.ability === ele.ability && elem.guid === ele.guid));
  const uniqueAbilityNames = Array.from(new Set(damage.map((key) => key.ability.name)));
  /* -- Map the cd data imported into an array of cds in this format (HealerName - CooldownName) -- */
  /* ------ Unique list of Cds from the previously mapped array is made, then create an array ----- */
  /* -------- We do this for the chart data as these are needed for dataKeys for the chart. ------- */
  const uniqueArrayCD = Array.from(
    new Set(
      cooldowns.map(
        (key) =>
          healerIDName
            .filter((obj) => {
              return obj.id === key.sourceID;
            })
            .map((obj) => obj.name) +
          " - " +
          key.ability.name,
      ),
    ),
  );

  /* --------------------- Map the cooldown casts into objects for the chart. --------------------- */
  /* ---- Map CD Casts with duration function to add extra data for the times the CD is active ---- */
  /* ------------- These are pushed into the new array healerDurations during the map ------------- */
  cooldowns
    .filter((key) =>
      cooldownDB
        .filter((filter) => filter.cdPlannerImport === true)
        .map((obj) => obj.guid)
        .includes(key.ability.guid),
    )
    .map((key) => ({
      ability: key.ability.name,
      guid: key.ability.guid,
      timestamp: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").valueOf(),
      [healerIDName
        .filter((obj) => {
          return obj.id === key.sourceID;
        })
        .map((obj) => obj.name) +
      " - " +
      key.ability.name]: 1,
    }))
    .map((key) => healerDurations.push(durationmaker(key.guid, key.timestamp, Object.getOwnPropertyNames(key).slice(3), moment.utc(fightDuration(endtime, starttime)).startOf("second").valueOf())));

  /* -------------------------- Create Ability List With Guids for legend ------------------------- */
  /* ----------------- Get Unique Objects from Ability list for the custom legend ----------------- */
  /* -------------------- Concat the Unique Ability List with the Cooldown List ------------------- */
  const uniqueArrayNewForLegend = getUniqueObjectsFromArray(
    damage.map((key) => ({
      value: key.ability.name,
      id: key.ability.guid,
    })),
    "id",
  ).concat(uniqueArrayCD);

  /* ----------------------- Map the Unmitigated damage taken & timestamps. ----------------------- */
  /* ---- Timestamps are made by minusing the start of the the fight in ms from the end in ms. ---- */
  /* - Then converted to start of nearest second otherwise the chart will show each individual ms - */
  /* ------------------- We Don't need to delve that deep into MS for the chart. ------------------ */
  const unmitigatedDamageMap = damage.map((key) => ({
    timestamp: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").valueOf(),
    [key.ability.name]: key.unmitigatedAmount,
  }));

  /* ------------------------ Map the Mitigated damage taken & timestamps. ------------------------ */
  /* ---- Timestamps are made by minusing the start of the the fight in ms from the end in ms. ---- */
  /* - Then converted to start of nearest second otherwise the chart will show each individual ms - */
  /* ------------------- We Don't need to delve that deep into MS for the chart. ------------------ */
  const mitigatedDamageMap = damage.map((key) => ({
    timestamp: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").valueOf(),
    [key.ability.name]: key.amount,
  }));

  /* ------------------------- Map cooldown casts for the Timeline Table. ------------------------- */
  const updateddatacastsTimeline = cooldowns
    .filter((key) =>
      cooldownDB
        .filter((filter) => filter.cdPlannerImport === true)
        .map((obj) => obj.guid)
        .includes(key.ability.guid),
    )
    .map((key) => ({
      ability: key.ability.name,
      guid: key.ability.guid,
      timestamp: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
      name: healerIDName
        .filter((obj) => {
          return obj.id === key.sourceID;
        })
        .map((obj) => obj.name)
        .toString(),
      class: healerIDName
        .filter((obj) => {
          return obj.id === key.sourceID;
        })
        .map((obj) => obj.class)
        .toString(),
    }));

  /* ------------------------- Map cooldown casts for the Timeline Table. ------------------------- */
  const updateddatacastsExternalsTimeline = externals.map((key) => ({
    ability: key.ability.name,
    guid: key.ability.guid,
    timestamp: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
    caster: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    target: playerIDs
      .filter((obj) => {
        return obj.id === key.targetID;
      })
      .map((obj) => obj.name)
      .toString(),
    casterClass: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.class)
      .toString(),
    targetClass: playerIDs
      .filter((obj) => {
        return obj.id === key.targetID;
      })
      .map((obj) => obj.class)
      .toString(),
  }));

  /* ------------------------- Map enemy casts for the Enemy Timeline Table. ------------------------- */
  // const enemyCastsTimeline = enemyCasts.map((key) => ({
  //   ability: key.ability.name,
  //   guid: key.ability.guid,
  //   timestamp: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
  //   name: enemyIDs
  //     .filter((obj) => {
  //       return obj.id === key.sourceID;
  //     })
  //     .map((obj) => obj.name)
  //     .toString(),
  //   id: key.sourceID,
  //   parentId: key.sourceID,
  // }));

  /* ------------------------ Map External casts for the External Timeline ------------------------ */
  const updateddatacastsExternalTimeline = cooldowns.map((key) => ({
    ability: key.ability.name,
    guid: key.ability.guid,
    timestamp: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
    name: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    class: healerIDName
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.class)
      .toString(),
  }));

  /* ------------------------ Map Defensives casts for the External Timeline ------------------------ */
  const defensiveCasts = defensives.map((key) => ({
    ability: key.ability.name,
    guid: key.ability.guid,
    timestamp: moment.utc(fightDuration(key.timestamp, starttime)).startOf("second").format("mm:ss"),
    name: playerIDs
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.name)
      .toString(),
    class: playerIDs
      .filter((obj) => {
        return obj.id === key.sourceID;
      })
      .map((obj) => obj.class)
      .toString(),
  }));

  const healthUpdated = health;

  /* ----------------------- Flatten the map we just created into an array. ----------------------- */
  let cooldownwithdurations = healerDurations.flat();

  /* ----------------- Create any missing timestamps in the fight (i.e no damage) ----------------- */
  /* --------- These are needed so the chart doesn't stretch the areas to the next point.) -------- */
  let times = addMissingTimestamps(fightDuration(endtime, starttime), uniqueAbilityNames, uniqueArrayCD);

  /* ------- Concat the damage arrays with the cooldown durations with the missing durations ------ */
  let unmitigatedDamageFromLogWithTimesAddedAndCooldowns = unmitigatedDamageMap.concat(cooldownwithdurations, times);
  unmitigatedDamageFromLogWithTimesAddedAndCooldowns = unmitigatedDamageFromLogWithTimesAddedAndCooldowns.concat(healthUpdated);

  let mitigatedDamageFromLogWithTimesAddedAndCooldowns = mitigatedDamageMap.concat(cooldownwithdurations, times);
  mitigatedDamageFromLogWithTimesAddedAndCooldowns = mitigatedDamageFromLogWithTimesAddedAndCooldowns.concat(healthUpdated);

  let unmitigatedDamageFromLogWithTimesAddedNoCooldowns = unmitigatedDamageMap.concat(times);
  unmitigatedDamageFromLogWithTimesAddedNoCooldowns = unmitigatedDamageFromLogWithTimesAddedNoCooldowns.concat(healthUpdated);

  let mitigatedDamageFromLogWithTimesAddedNoCooldowns = mitigatedDamageMap.concat(times);
  mitigatedDamageFromLogWithTimesAddedNoCooldowns = mitigatedDamageFromLogWithTimesAddedNoCooldowns.concat(healthUpdated);

  /* -------------------------------- Sort the Arrays by Timestamp -------------------------------- */
  unmitigatedDamageFromLogWithTimesAddedAndCooldowns.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  mitigatedDamageFromLogWithTimesAddedAndCooldowns.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  unmitigatedDamageFromLogWithTimesAddedNoCooldowns.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  mitigatedDamageFromLogWithTimesAddedNoCooldowns.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));

  /* -------------------- Reduce the arrays removing any duplicate timestamps// ------------------- */
  let unmitigatedDamageTimestampsReducedWithCooldowns = reduceTimestamps(unmitigatedDamageFromLogWithTimesAddedAndCooldowns);
  let mitigatedDamageTimestampsReducedWithCooldowns = reduceTimestamps(mitigatedDamageFromLogWithTimesAddedAndCooldowns);
  let unmitigatedDamageTimestampsReducedNoCooldowns = reduceTimestamps(unmitigatedDamageFromLogWithTimesAddedNoCooldowns);
  let mitigatedDamageTimestampsReducedNoCooldowns = reduceTimestamps(mitigatedDamageFromLogWithTimesAddedNoCooldowns);

  /* ------------------------------------- Push To new arrays ------------------------------------- */
  Object.keys(unmitigatedDamageTimestampsReducedWithCooldowns).forEach((element) => sortedDataUnmitigatedWithCooldowns.push(unmitigatedDamageTimestampsReducedWithCooldowns[element]));
  Object.keys(mitigatedDamageTimestampsReducedWithCooldowns).forEach((element) => sortedDataMitigatedDamageWithCooldowns.push(mitigatedDamageTimestampsReducedWithCooldowns[element]));
  Object.keys(unmitigatedDamageTimestampsReducedNoCooldowns).forEach((element) => sortedDataUnmitigatedNoCooldowns.push(unmitigatedDamageTimestampsReducedNoCooldowns[element]));
  Object.keys(mitigatedDamageTimestampsReducedNoCooldowns).forEach((element) => sortedDataMitigatedDamageNoCooldowns.push(mitigatedDamageTimestampsReducedNoCooldowns[element]));

  /* ---------------------------------------------------------------------------------------------- */
  /*                                    DTPS Graph data creation                                    */
  /* ---------------------------------------------------------------------------------------------- */

  let summedUnmitigationDamage = sumDamage(sortedDataUnmitigatedNoCooldowns, fightLength);

  let summedUnmitigatedDamagePerSecond = Object.keys(summedUnmitigationDamage)
    .filter((obj) => {
      return obj !== "timestamp";
    })
    .map((key) => {
      return {
        ability: key,
        damage: Math.round(summedUnmitigationDamage[key] / fightLength),
      };
    })
    .sort((a, b) => (b.damage > a.damage ? 1 : -1));

  let summedMitigationDamage = sumDamage(sortedDataMitigatedDamageNoCooldowns, fightLength);
  let summedMitigationDamagePerSecond = Object.keys(summedMitigationDamage)
    .filter((obj) => {
      return obj !== "timestamp";
    })
    .map((key) => {
      return {
        ability: key,
        damage: Math.round(summedMitigationDamage[key] / fightLength),
      };
    })
    .sort((a, b) => (b.damage > a.damage ? 1 : -1));

  /* ---------- Here we set all the returned data to state in the FightAnalysis Component --------- */
  this.setState({
    /* ------------------------ Store the original Unmitigated data in state ------------------------ */
    unmitigatedChartDataNoCooldownsOriginal: sortedDataUnmitigatedNoCooldowns,
    unmitigatedChartDataNoCooldowns: sortedDataUnmitigatedNoCooldowns,

    /* ------------------------- Store the original mitigated data in state ------------------------- */
    mitigatedChartDataNoCooldownsOriginal: sortedDataMitigatedDamageNoCooldowns,
    mitigatedChartDataNoCooldowns: sortedDataMitigatedDamageNoCooldowns,

    legenddata: uniqueArrayNewForLegend,
    /* ------------------ Unmitigated Chart Data - With Cooldowns Used from the log ----------------- */
    unmitigatedChartData: sortedDataUnmitigatedWithCooldowns,
    mitigatedChartData: sortedDataMitigatedDamageWithCooldowns,

    Updateddatacasts: updateddatacastsTimeline,
    defensiveCasts: defensiveCasts,
    abilityList: uniqueArray,
    cooldownlist: uniqueArrayCD,
    loadingcheck: false,
    healernames: summary.map((key) => ({
      name: key.name,
      icon: key.icon,
      combatantInfo: key.combatantInfo,
      type: key.type,
      stats: [
        {
          intellect: key.combatantInfo.stats.Intellect ? key.combatantInfo.stats.Intellect["min"] : 0,
          crit: key.combatantInfo.stats.Crit ? key.combatantInfo.stats.Crit["min"] : 0,
          haste: key.combatantInfo.stats.Haste ? key.combatantInfo.stats.Haste["min"] : 0,
          mastery: key.combatantInfo.stats.Mastery ? key.combatantInfo.stats.Mastery["min"] : 0,
          versatility: key.combatantInfo.stats.Versatility ? key.combatantInfo.stats.Versatility["min"] : 0,
          leech: key.combatantInfo.stats.Leech ? key.combatantInfo.stats.Leech["min"] : 0,
          ilvl: key.combatantInfo.stats["Item Level"] ? key.combatantInfo.stats["Item Level"]["min"] : 0,
        },
      ],
      talentString: key.talentString,
    })),
    currentEndTime: endtime,
    currentStartTime: starttime,
    summedUnmitigatedDamagePerSecond: summedUnmitigatedDamagePerSecond,
    summedMitigationDamagePerSecond: summedMitigationDamagePerSecond,
    externalUsageTimelineData: updateddatacastsExternalsTimeline,
    // enemyCastsTimelineData: enemyCastsTimeline,
  });
}
