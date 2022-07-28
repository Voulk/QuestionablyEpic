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
  const space = "  ";

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

      let option0 =
        key.name0 === "" || key.name0 === undefined
          ? key.cooldown0 === "" || key.cooldown0 === undefined
            ? ""
            : key.cooldown0 === "Personals"
            ? "{everyone}Personals" + "{spell:160955}"
            : key.cooldown0 === "Potion/Healthstone"
            ? "{everyone}Potion/Healthstone" + "{spell:105683}"
            : ""
          : classColoursERT(key.class0) + key.name0 + "|r" + "{spell:" + key.cooldown0 + "}";

      let option1 =
        key.name1 === "" || key.name1 === undefined
          ? key.cooldown1 === "" || key.cooldown1 === undefined
            ? ""
            : key.cooldown1 === "Personals"
            ? space + "{everyone}Personals" + "{spell:160955}"
            : key.cooldown1 === "Potion/Healthstone"
            ? space + "{everyone}Potion/Healthstone" + "{spell:105683}"
            : ""
          : space + classColoursERT(key.class1) + key.name1 + "|r" + "{spell:" + key.cooldown1 + "}";

      let option2 =
        key.name2 === "" || key.name2 === undefined
          ? key.cooldown2 === "" || key.cooldown2 === undefined
            ? ""
            : key.cooldown2 === "Personals"
            ? space + "{everyone}Personals" + "{spell:160955}"
            : key.cooldown2 === "Potion/Healthstone"
            ? space + "{everyone}Potion/Healthstone" + "{spell:105683}"
            : ""
          : space + classColoursERT(key.class2) + key.name2 + "|r" + "{spell:" + key.cooldown2 + "}";

      let option3 =
        key.name3 === "" || key.name3 === undefined
          ? key.cooldown3 === "" || key.cooldown3 === undefined
            ? ""
            : key.cooldown3 === "Personals"
            ? space + "{everyone}Personals" + "{spell:160955}"
            : key.cooldown3 === "Potion/Healthstone"
            ? space + "{everyone}Potion/Healthstone" + "{spell:105683}"
            : ""
          : space + classColoursERT(key.class3) + key.name3 + "|r" + "{spell:" + key.cooldown3 + "}";

      let option4 =
        key.name4 === "" || key.name4 === undefined
          ? key.cooldown4 === "" || key.cooldown4 === undefined
            ? ""
            : key.cooldown4 === "Personals"
            ? space + "{everyone}Personals" + "{spell:160955}"
            : key.cooldown4 === "Potion/Healthstone"
            ? space + "{everyone}Potion/Healthstone" + "{spell:105683}"
            : ""
          : space + classColoursERT(key.class4) + key.name4 + "|r" + "{spell:" + key.cooldown4 + "}";

      return {
        ert: time + (key.bossAbility === undefined ? "" : translatedName + seperator) + option0 + option1 + option2 + option3 + option4,
        /* --------------------------------- This is for Sorting by Time -------------------------------- */
        time: key.time,
      };
    });
  // debug && console.table(ertNoteTimeIcons);

  setERTData(ertNoteTimeIcons);
}
