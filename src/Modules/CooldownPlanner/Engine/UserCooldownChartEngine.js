import {
  fightDurationCalculator,
  durationmaker,
  reduceTimestamps,
} from "../../CooldownPlanner/Functions/Functions";
import moment from "moment";
import { classColoursERT } from "../../CooldownPlanner/Functions/ClassColourFunctions";
import i18n from "i18next";

/*=============================================
  This Function should be bound to the component the data should be set to.
  Data passed to this from the Cooldown Planner will set the state with Cooldown Durations onto the chart data.
  =============================================*/

// PLease Note that all the 'this.' statements in this file do not actually affect this file.
// They are refering to the component the function is imported into.

export default function chartCooldownUpdater(tableData) {
  let customCooldownDurations = [];
  let unmitigatedChartDataNoCooldowns = [];
  let mitigatedChartDataNoCooldowns = [];

  // Map the data from the Cooldown Planner into a unique list of Healer Names + Cooldowns for dataKeys for the Chart.
  let uniqueCooldownListArray = Array.from(
    new Set(
      tableData.map(
        (key) =>
          key.name +
          " - " +
          i18n.t("CooldownPlannerClassAbilities." + key.Cooldown)
      )
    )
  );

  // Map the Data from the Cooldown Planner and create a new array of objects. These are then mapped using the durationmaker function to create the data for the length of the cooldown and pushed into a new array customCooldownDurations.
  tableData
    .map((key) => ({
      ability: key.Cooldown,
      timestamp: moment.duration("00:" + key.time).asMilliseconds(),
      abilityname:
        key.name +
        " - " +
        i18n.t("CooldownPlannerClassAbilities." + key.Cooldown),
    }))
    .map((key) =>
      customCooldownDurations.push(
        durationmaker(
          key.ability,
          key.timestamp,
          key.abilityname,
          moment(
            fightDurationCalculator(
              this.state.currentEndTime,
              this.state.currentStartTime
            )
          )
            .startOf("second")
            .valueOf()
        )
      )
    );
  console.log(tableData);
  console.log(customCooldownDurations);
  let customCooldownDurationFlatArray = customCooldownDurations.flat();

  // Join the Cooldown Durates with the Damage Taken Data (The original data before any data from the table was entered.
  // This is so the data doesn't double up with previously entered data.)
  let joinedarray = this.state.unmitigatedChartDataNoCooldownsOriginal
    .concat(customCooldownDurationFlatArray)
    .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));

  let joinedarray2 = this.state.mitigatedChartDataNoCooldownsOriginal
    .concat(customCooldownDurationFlatArray)
    .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));

  let reducedData1 = reduceTimestamps(joinedarray);

  let reducedData2 = reduceTimestamps(joinedarray2);

  Object.keys(reducedData1).forEach((element2) =>
    unmitigatedChartDataNoCooldowns.push(reducedData1[element2])
  );

  Object.keys(reducedData2).forEach((element2) =>
    mitigatedChartDataNoCooldowns.push(reducedData2[element2])
  );

  // Map the ERT note from the Table Data

  // Time + No Icons
  const ertNoteTimeNoIcons = tableData.map((key) => ({
    ert:
      "{time:" +
      key.time +
      "}" +
      " - " +
      classColoursERT(key.class) +
      key.name +
      "|r" +
      " - " +
      i18n.t("CooldownPlannerClassAbilities." + key.Cooldown),
    // This is for Sorting by Time
    time: key.time,
  }));

  // Ability + No Icons
  const ertNoteAbilityNoIcons = tableData.map((key) => ({
    ert:
      i18n.t("BossAbilities." + key.bossAbility) +
      " - " +
      classColoursERT(key.class) +
      key.name +
      "|r" +
      " - " +
      i18n.t("CooldownPlannerClassAbilities." + key.Cooldown),
    // This is for Sorting by Time
    time: key.time,
  }));

  // Ability + Icons All
  const ertNoteAbilityNoTimeIconsAll = tableData.map((key) => ({
    ert:
      i18n.t("BossAbilities." + key.bossAbility) +
      " " +
      "{spell:" +
      key.bossAbility +
      "}" +
      " - " +
      classColoursERT(key.class) +
      key.name +
      "|r" +
      " - " +
      i18n.t("CooldownPlannerClassAbilities." + key.Cooldown) +
      " " +
      "{spell:" +
      key.Cooldown +
      "}",
    time: key.time,
  }));

  // Time + Icons
  const ertNoteTimeIcons = tableData.map((key) => ({
    ert:
      "{time:" +
      key.time +
      "}" +
      " - " +
      classColoursERT(key.class) +
      key.name +
      "|r" +
      " - " +
      i18n.t("CooldownPlannerClassAbilities." + key.Cooldown) +
      " " +
      "{spell:" +
      key.Cooldown +
      "}",
    time: key.time,
  }));

  this.setState({
    mitigatedChartDataNoCooldowns: mitigatedChartDataNoCooldowns,
    unmitigatedChartDataNoCooldowns: unmitigatedChartDataNoCooldowns,
    cooldownlistcustom2: uniqueCooldownListArray,
    ertListTimeNoIcons: ertNoteTimeNoIcons,
    ertListBossAbility: ertNoteAbilityNoIcons,
    ertListAbilityNoTimeIconsAll: ertNoteAbilityNoTimeIconsAll,
    ertListTimeIcons: ertNoteTimeIcons,
  });
}
