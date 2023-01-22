import { classColoursERT } from "../../Functions/ClassColourFunctions";
import { bossAbilities } from "../../Data/CooldownPlannerBossAbilityList";

/*=============================================
  This Function should be bound to the component the data should be set to.
  Data passed to this from the Cooldown Planner will set the state with Cooldown Durations onto the chart data.
  =============================================*/

// PLease Note that all the 'this.' statements in this file do not actually affect this file.
// They are refering to the component the function is imported into.

// turn debugging (console logging) on/off
const debug = false;

export default function ertEngine(tableData, bossID, lang, setERTData, hideNoCooldownsChecked) {
  debug && console.log(" -- Debugging On -> ERTEngine.js --");
  const seperator = " - ";
  const space = " ";
  const doubleSpace = "  ";

  const abilityArr = [
    ...bossAbilities[bossID]
      .filter((obj) => {
        return obj.cooldownPlannerActive === true || obj.importActive === true;
      })
      .map((key, i, arr) => key.guid),
  ];
  // log provided props
  // debug && console.table(tableData);

  /* ---------------------------- Map the ERT note from the Table Data ---------------------------- */

  /* ---------------------------------------- Time + Icons ---------------------------------------- */
  const ertNoteTimeIcons = tableData
    .filter((key) => {
      if (hideNoCooldownsChecked === true) {
        const check =
          key.bossAbility !== undefined && key.cooldown0 === undefined && key.cooldown1 === undefined && key.cooldown2 === undefined && key.cooldown3 === undefined && key.cooldown4 === undefined;
        return !check;
      }
      {
        return true;
      }
    })
    .map((key) => {
      let time = "{time:" + key.time + "}";
      let translatedName = abilityArr.includes(key.bossAbility)
        ? bossAbilities[bossID]
            .filter((obj) => {
              return obj.guid === key.bossAbility;
            })
            .map((obj) => obj.name[lang])
            .toString()
        : key.bossAbility;

      const checkCooldown = (cooldown) => {
        if (typeof cooldown === "number") {
          return "{spell:" + cooldown + "}";
        } else {
          return cooldown;
        }
      };

      let option0 =
        key.cooldown0 === "" || key.cooldown0 === undefined
          ? key.name0 === "" || key.name0 === undefined
            ? ""
            : key.cooldown0 === "Personals"
            ? "{everyone}Personals" + space + "{spell:160955}"
            : key.cooldown0 === "Potion/Healthstone"
            ? "{everyone}Potion/Healthstone" + space + "{spell:105683}"
            : ""
          : (key.class0 === "" || key.class0 === undefined ? "" : classColoursERT(key.class0)) +
            (key.name0 === "" || key.name0 === undefined ? "" : key.name0 + "|r" + space) +
            checkCooldown(key.cooldown0);

      let option1 =
        key.cooldown1 === "" || key.cooldown1 === undefined
          ? key.name1 === "" || key.name1 === undefined
            ? ""
            : key.cooldown1 === "Personals"
            ? "{everyone}Personals" + space + "{spell:160955}"
            : key.cooldown1 === "Potion/Healthstone"
            ? "{everyone}Potion/Healthstone" + space + "{spell:105683}"
            : ""
          : (key.class1 === "" || key.class1 === undefined ? "" : classColoursERT(key.class1)) +
            (key.name1 === "" || key.name1 === undefined ? "" : key.name1 + "|r" + space) +
            checkCooldown(key.cooldown1);

      let option2 =
        key.name2 === "" || key.name2 === undefined
          ? key.cooldown2 === "" || key.cooldown2 === undefined
            ? ""
            : key.cooldown2 === "Personals"
            ? "{everyone}Personals" + space + "{spell:160955}"
            : key.cooldown2 === "Potion/Healthstone"
            ? "{everyone}Potion/Healthstone" + space + "{spell:105683}"
            : ""
          : (key.class2 === "" || key.class2 === undefined ? "" : classColoursERT(key.class2)) +
            (key.name2 === "" || key.name2 === undefined ? "" : key.name2 + "|r" + space) +
            checkCooldown(key.cooldown2);

      let option3 =
        key.name3 === "" || key.name3 === undefined
          ? key.cooldown3 === "" || key.cooldown3 === undefined
            ? ""
            : key.cooldown3 === "Personals"
            ? "{everyone}Personals" + space + "{spell:160955}"
            : key.cooldown3 === "Potion/Healthstone"
            ? "{everyone}Potion/Healthstone" + space + "{spell:105683}"
            : ""
          : (key.class3 === "" || key.class3 === undefined ? "" : classColoursERT(key.class3)) +
            (key.name3 === "" || key.name3 === undefined ? "" : key.name3 + "|r" + space) +
            checkCooldown(key.cooldown3);

      let option4 =
        key.name4 === "" || key.name4 === undefined
          ? key.cooldown4 === "" || key.cooldown4 === undefined
            ? ""
            : key.cooldown4 === "Personals"
            ? "{everyone}Personals" + space + "{spell:160955}"
            : key.cooldown4 === "Potion/Healthstone"
            ? "{everyone}Potion/Healthstone" + space + "{spell:105683}"
            : ""
          : (key.class4 === "" || key.class4 === undefined ? "" : classColoursERT(key.class4)) +
            (key.name4 === "" || key.name4 === undefined ? "" : key.name4 + "|r" + space) +
            checkCooldown(key.cooldown4);

      return {
        ert:
          time +
          seperator +
          (key.bossAbility === undefined ? "" : translatedName + seperator) +
          (key.bossAbility === undefined ? "" : space) +
          option0 +
          (option0 === "" ? "" : doubleSpace) +
          option1 +
          (option1 === "" ? "" : doubleSpace) +
          option2 +
          (option2 === "" ? "" : doubleSpace) +
          option3 +
          (option3 === "" ? "" : doubleSpace) +
          option4,
        /* --------------------------------- This is for Sorting by Time -------------------------------- */
        time: key.time,
      };
    });
  // debug && console.table(ertNoteTimeIcons);
  // debug && console.log(ertNoteTimeIcons);

  setERTData(ertNoteTimeIcons);
}
