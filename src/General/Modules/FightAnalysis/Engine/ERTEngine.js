import { classColoursERT } from "../../CooldownPlanner/Functions/ClassColourFunctions";
import i18n from "i18next";

/*=============================================
  This Function should be bound to the component the data should be set to.
  Data passed to this from the Cooldown Planner will set the state with Cooldown Durations onto the chart data.
  =============================================*/

// PLease Note that all the 'this.' statements in this file do not actually affect this file.
// They are refering to the component the function is imported into.

// turn debugging (console logging) on/off
const debug = false;

export default function ertEngine(tableData) {
  debug && console.log(" -- Debugging On -> ERTEngine.js --");
  // log provided props
  // debug && console.table(tableData);

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
  // debug && console.table(ertNoteTimeNoIcons);

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
  // debug && console.table(ertNoteAbilityNoIcons);

  /* ------------------------------------- Ability + Icons All ------------------------------------ */
  const ertNoteAbilityNoTimeIconsAll = tableData
    .filter((key) => key.Cooldown !== undefined)
    .map((key) => {
      let bossAbility =
        key.bossAbility === undefined || key.bossAbility === ""
          ? i18n.t("CooldownPlanner.BossAbilities." + key.bossAbility)
          : i18n.t("CooldownPlanner.BossAbilities." + key.bossAbility) + " " + "{spell:" + key.bossAbility + "}";
      let option0 = classColoursERT(key.class) + key.name + "|r" + "{spell:" + key.Cooldown + "}";
      let option1 = key.name1 === "" || key.name1 === undefined ? "" : ", " + classColoursERT(key.class1) + key.name1 + "|r" + "{spell:" + key.Cooldown1 + "}";
      let option2 = key.name2 === "" || key.name2 === undefined ? "" : ", " + classColoursERT(key.class2) + key.name2 + "|r" + "{spell:" + key.Cooldown2 + "}";
      let option3 = key.name3 === "" || key.name3 === undefined ? "" : ", " + classColoursERT(key.class3) + key.name3 + "|r" + "{spell:" + key.Cooldown3 + "}";
      let option4 = key.name4 === "" || key.name4 === undefined ? "" : ", " + classColoursERT(key.class4) + key.name4 + "|r" + "{spell:" + key.Cooldown4 + "}";

      return {
        ert: bossAbility + " - " + option0 + option1 + option2 + option3 + option4,
        /* --------------------------------- This is for Sorting by Time -------------------------------- */
        time: key.time,
      };
    });
  // debug && console.table(ertNoteAbilityNoTimeIconsAll);

  /* ---------------------------------------- Time + Icons ---------------------------------------- */
  const ertNoteTimeIcons = tableData
    .filter((key) => key.Cooldown !== undefined)
    .map((key) => {
      let time = "{time:" + key.time + "}";
      let option0 = classColoursERT(key.class) + key.name + "|r" + "{spell:" + key.Cooldown + "}";
      let option1 = key.name1 === "" || key.name1 === undefined ? "" : ", " + classColoursERT(key.class1) + key.name1 + "|r" + "{spell:" + key.Cooldown1 + "}";
      let option2 = key.name2 === "" || key.name2 === undefined ? "" : ", " + classColoursERT(key.class2) + key.name2 + "|r" + "{spell:" + key.Cooldown2 + "}";
      let option3 = key.name3 === "" || key.name3 === undefined ? "" : ", " + classColoursERT(key.class3) + key.name3 + "|r" + "{spell:" + key.Cooldown3 + "}";
      let option4 = key.name4 === "" || key.name4 === undefined ? "" : ", " + classColoursERT(key.class4) + key.name4 + "|r" + "{spell:" + key.Cooldown4 + "}";

      return {
        ert: time + " - " + option0 + option1 + option2 + option3 + option4,
        /* --------------------------------- This is for Sorting by Time -------------------------------- */
        time: key.time,
      };
    });
  // debug && console.table(ertNoteTimeIcons);

  this.setState({
    ertListTimeNoIcons: ertNoteTimeNoIcons,
    ertListBossAbility: ertNoteAbilityNoIcons,
    ertListAbilityNoTimeIconsAll: ertNoteAbilityNoTimeIconsAll,
    ertListTimeIcons: ertNoteTimeIcons,
  });
}
