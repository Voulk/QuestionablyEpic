import { fightDuration, durationmaker, reduceTimestamps } from "../../CooldownPlanner/Functions/Functions";
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
  let pushedArray = [];

  /* --------- Push Each Cooldown in the table to a new array in "Name - Cooldown" format --------- */

  /* ----------------------------------------- Cooldown 0 ----------------------------------------- */
  tableData
    .filter((key) => key.Cooldown !== undefined)
    .map((key) => {
      pushedArray.push(key.name + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown));
    });

  /* ----------------------------------------- Cooldown 1 ----------------------------------------- */
  tableData
    .filter((key) => key.Cooldown1 !== undefined)
    .map((key) => {
      pushedArray.push(key.name1 + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown1));
    });

  /* ----------------------------------------- Cooldown 2 ----------------------------------------- */
  tableData
    .filter((key) => key.Cooldown2 !== undefined)
    .map((key) => {
      pushedArray.push(key.name2 + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown2));
    });

  /* ----------------------------------------- Cooldown 3 ----------------------------------------- */
  tableData
    .filter((key) => key.Cooldown3 !== undefined)
    .map((key) => {
      pushedArray.push(key.name3 + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown3));
    });

  /* ----------------------------------------- Cooldown 4 ----------------------------------------- */
  tableData
    .filter((key) => key.Cooldown4 !== undefined)
    .map((key) => {
      pushedArray.push(key.name4 + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown4));
    });

  /* -- Create array from a unique list of Healer "Names + Cooldowns" for dataKeys for the Chart. - */
  let uniqueCooldownListArray = Array.from(new Set(pushedArray));

  /* ---------- Map the Data from the Cooldown Planner and create a new array of objects. --------- */
  /* -- Map using durationmaker create the length of cd and pushed into customCooldownDurations. -- */

  /* ----------------------------------------- Cooldown 0 ----------------------------------------- */
  tableData
    .filter((key) => key.Cooldown !== undefined)
    .map((key) => ({
      ability: key.Cooldown,
      timestamp: moment.duration("00:" + key.time).asMilliseconds(),
      abilityname: key.name + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown),
    }))
    .map((key) => {
      customCooldownDurations.push(
        durationmaker(key.ability, key.timestamp, key.abilityname, moment(fightDuration(this.state.currentEndTime, this.state.currentStartTime)).startOf("second").valueOf()),
      );
    });

  /* ----------------------------------------- Cooldown 1 ----------------------------------------- */
  tableData
    .filter((key) => key.Cooldown1 !== undefined)
    .map((key) => ({
      ability: key.Cooldown1,
      timestamp: moment.duration("00:" + key.time).asMilliseconds(),
      abilityname: key.name1 + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown1),
    }))
    .map((key) =>
      customCooldownDurations.push(
        durationmaker(key.ability, key.timestamp, key.abilityname, moment(fightDuration(this.state.currentEndTime, this.state.currentStartTime)).startOf("second").valueOf()),
      ),
    );

  /* ----------------------------------------- Cooldown 2 ----------------------------------------- */
  tableData
    .filter((key) => key.Cooldown2 !== undefined)
    .map((key) => ({
      ability: key.Cooldown2,
      timestamp: moment.duration("00:" + key.time).asMilliseconds(),
      abilityname: key.name2 + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown2),
    }))
    .map((key) =>
      customCooldownDurations.push(
        durationmaker(key.ability, key.timestamp, key.abilityname, moment(fightDuration(this.state.currentEndTime, this.state.currentStartTime)).startOf("second").valueOf()),
      ),
    );

  /* ----------------------------------------- Cooldown 3 ----------------------------------------- */
  tableData
    .filter((key) => key.Cooldown3 !== undefined)
    .map((key) => ({
      ability: key.Cooldown3,
      timestamp: moment.duration("00:" + key.time).asMilliseconds(),
      abilityname: key.name3 + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown3),
    }))
    .map((key) =>
      customCooldownDurations.push(
        durationmaker(key.ability, key.timestamp, key.abilityname, moment(fightDuration(this.state.currentEndTime, this.state.currentStartTime)).startOf("second").valueOf()),
      ),
    );

  /* ----------------------------------------- Cooldown 4 ----------------------------------------- */
  tableData
    .filter((key) => key.Cooldown4 !== undefined)
    .map((key) => ({
      ability: key.Cooldown4,
      timestamp: moment.duration("00:" + key.time).asMilliseconds(),
      abilityname: key.name4 + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown4),
    }))
    .map((key) =>
      customCooldownDurations.push(
        durationmaker(key.ability, key.timestamp, key.abilityname, moment(fightDuration(this.state.currentEndTime, this.state.currentStartTime)).startOf("second").valueOf()),
      ),
    );

  let customCooldownDurationFlatArray = customCooldownDurations.flat();

  /* --- Join CD Durations with the DMG Taken Data (Original data before any data from the table -- */
  /* ------------- This is so the data doesn't double up with previously entered data ------------- */

  let joinedarray = this.state.unmitigatedChartDataNoCooldownsOriginal.concat(customCooldownDurationFlatArray).sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  let joinedarray2 = this.state.mitigatedChartDataNoCooldownsOriginal.concat(customCooldownDurationFlatArray).sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));

  let reducedData1 = reduceTimestamps(joinedarray);
  let reducedData2 = reduceTimestamps(joinedarray2);

  Object.keys(reducedData1).forEach((element2) => unmitigatedChartDataNoCooldowns.push(reducedData1[element2]));
  Object.keys(reducedData2).forEach((element2) => mitigatedChartDataNoCooldowns.push(reducedData2[element2]));

  /* ---------------------------- Map the ERT note from the Table Data ---------------------------- */

  /* --------------------------------------- Time + No Icons -------------------------------------- */
  const ertNoteTimeNoIcons = tableData
    .filter((key) => key.Cooldown !== undefined)
    .map((key) => {
      let time = "{time:" + key.time + "}";
      let option0 = classColoursERT(key.class) + key.name + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown);
      let option1 = key.name1 === "" || key.name1 === undefined ? "" : ", " + classColoursERT(key.class1) + key.name1 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown1);
      let option2 = key.name2 === "" || key.name2 === undefined ? "" : ", " + classColoursERT(key.class2) + key.name2 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown2);
      let option3 = key.name3 === "" || key.name3 === undefined ? "" : ", " + classColoursERT(key.class3) + key.name3 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown3);
      let option4 = key.name4 === "" || key.name4 === undefined ? "" : ", " + classColoursERT(key.class4) + key.name4 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown4);
      return {
        ert: time + " - " + option0 + option1 + option2 + option3 + option4,
        /* --------------------------------- This is for Sorting by Time -------------------------------- */
        time: key.time,
      };
    });

  /* ------------------------------------- Ability + No Icons ------------------------------------- */
  const ertNoteAbilityNoIcons = tableData
    .filter((key) => key.bossAbility !== undefined)
    .map((key) => {
      let bossAbility =
        key.bossAbility === undefined || key.bossAbility === ""
          ? i18n.t("CooldownPlanner.BossAbilities." + key.bossAbility)
          : i18n.t("CooldownPlanner.BossAbilities." + key.bossAbility) + " " + "{spell:" + key.bossAbility + "}";
      let option0 = classColoursERT(key.class) + key.name + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown);
      let option1 = key.name1 === "" || key.name1 === undefined ? "" : ", " + classColoursERT(key.class1) + key.name1 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown1);
      let option2 = key.name2 === "" || key.name2 === undefined ? "" : ", " + classColoursERT(key.class2) + key.name2 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown2);
      let option3 = key.name3 === "" || key.name3 === undefined ? "" : ", " + classColoursERT(key.class3) + key.name3 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown3);
      let option4 = key.name4 === "" || key.name4 === undefined ? "" : ", " + classColoursERT(key.class4) + key.name4 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown4);

      return {
        ert: bossAbility + " - " + option0 + option1 + option2 + option3 + option4,
        /* --------------------------------- This is for Sorting by Time -------------------------------- */
        time: key.time,
      };
    });

  /* ------------------------------------- Ability + Icons All ------------------------------------ */
  const ertNoteAbilityNoTimeIconsAll = tableData
    .filter((key) => key.Cooldown !== undefined)
    .map((key) => {
      let bossAbility =
        key.bossAbility === undefined || key.bossAbility === ""
          ? i18n.t("CooldownPlanner.BossAbilities." + key.bossAbility)
          : i18n.t("CooldownPlanner.BossAbilities." + key.bossAbility) + " " + "{spell:" + key.bossAbility + "}";
      let option0 = classColoursERT(key.class) + key.name + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown) + " " + "{spell:" + key.Cooldown + "}";
      let option1 =
        key.name1 === "" || key.name1 === undefined
          ? ""
          : ", " + classColoursERT(key.class1) + key.name1 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown1) + " " + "{spell:" + key.Cooldown1 + "}";
      let option2 =
        key.name2 === "" || key.name2 === undefined
          ? ""
          : ", " + classColoursERT(key.class2) + key.name2 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown2) + " " + "{spell:" + key.Cooldown2 + "}";
      let option3 =
        key.name3 === "" || key.name3 === undefined
          ? ""
          : ", " + classColoursERT(key.class3) + key.name3 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown3) + " " + "{spell:" + key.Cooldown3 + "}";
      let option4 =
        key.name4 === "" || key.name4 === undefined
          ? ""
          : ", " + classColoursERT(key.class4) + key.name4 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown4) + " " + "{spell:" + key.Cooldown4 + "}";

      return {
        ert: bossAbility + " - " + option0 + option1 + option2 + option3 + option4,
        /* --------------------------------- This is for Sorting by Time -------------------------------- */
        time: key.time,
      };
    });

  /* ---------------------------------------- Time + Icons ---------------------------------------- */
  const ertNoteTimeIcons = tableData
    .filter((key) => key.Cooldown !== undefined)
    .map((key) => (key) => {
      let time = "{time:" + key.time + "}";
      let option0 = classColoursERT(key.class) + key.name + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown);
      let option1 =
        key.name1 === "" || key.name1 === undefined
          ? ""
          : ", " + classColoursERT(key.class1) + key.name1 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown1) + " " + "{spell:" + key.Cooldown + "}";
      let option2 =
        key.name2 === "" || key.name2 === undefined
          ? ""
          : ", " + classColoursERT(key.class2) + key.name2 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown2) + " " + "{spell:" + key.Cooldown1 + "}";
      let option3 =
        key.name3 === "" || key.name3 === undefined
          ? ""
          : ", " + classColoursERT(key.class3) + key.name3 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown3) + " " + "{spell:" + key.Cooldown3 + "}";
      let option4 =
        key.name4 === "" || key.name4 === undefined
          ? ""
          : ", " + classColoursERT(key.class4) + key.name4 + "|r" + " - " + i18n.t("CooldownPlanner.ClassAbilities." + key.Cooldown4) + " " + "{spell:" + key.Cooldown4 + "}";

      return {
        ert: time + " - " + option0 + option1 + option2 + option3 + option4,
        /* --------------------------------- This is for Sorting by Time -------------------------------- */
        time: key.time,
      };
    });

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
