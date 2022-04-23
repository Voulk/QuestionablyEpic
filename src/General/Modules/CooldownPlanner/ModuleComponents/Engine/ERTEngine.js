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

export default function ertEngine(tableData, bossID, lang) {
  debug && console.log(" -- Debugging On -> ERTEngine.js --");
  const seperator = " - ";
  const space = " ";

  const abilityArr = [
    ...bossAbilities[bossID]
      .filter((obj) => {
        return obj.cooldownPlannerActive === true;
      })
      .map((key, i, arr) => key.guid),
  ];
  // log provided props
  // debug && console.table(tableData);

  /* ---------------------------- Map the ERT note from the Table Data ---------------------------- */

  /* ---------------------------------------- Time + Icons ---------------------------------------- */
  const ertNoteTimeIcons = tableData
    .filter((key) => key.bossAbility !== undefined)
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
          ? key.Cooldown0 === "" || key.Cooldown0 === undefined
            ? ""
            : key.Cooldown0 === "Personals"
            ? "{everyone}Personals" + "{spell:160955}"
            : key.Cooldown0 === "Potion/Healthstone"
            ? "{everyone}Potion/Healthstone" + "{spell:105683}"
            : ""
          : classColoursERT(key.class0) + key.name0 + "|r" + "{spell:" + key.Cooldown0 + "}";

      let option1 =
        key.name1 === "" || key.name1 === undefined
          ? key.Cooldown1 === "" || key.Cooldown1 === undefined
            ? ""
            : key.Cooldown1 === "Personals"
            ? space + "{everyone}Personals" + "{spell:160955}"
            : key.Cooldown1 === "Potion/Healthstone"
            ? space + "{everyone}Potion/Healthstone" + "{spell:105683}"
            : ""
          : space + classColoursERT(key.class1) + key.name1 + "|r" + "{spell:" + key.Cooldown1 + "}";

      let option2 =
        key.name2 === "" || key.name2 === undefined
          ? key.Cooldown2 === "" || key.Cooldown2 === undefined
            ? ""
            : key.Cooldown2 === "Personals"
            ? space + "{everyone}Personals" + "{spell:160955}"
            : key.Cooldown2 === "Potion/Healthstone"
            ? space + "{everyone}Potion/Healthstone" + "{spell:105683}"
            : ""
          : space + classColoursERT(key.class2) + key.name2 + "|r" + "{spell:" + key.Cooldown2 + "}";

      let option3 =
        key.name3 === "" || key.name3 === undefined
          ? key.Cooldown3 === "" || key.Cooldown3 === undefined
            ? ""
            : key.Cooldown3 === "Personals"
            ? space + "{everyone}Personals" + "{spell:160955}"
            : key.Cooldown3 === "Potion/Healthstone"
            ? space + "{everyone}Potion/Healthstone" + "{spell:105683}"
            : ""
          : space + classColoursERT(key.class3) + key.name3 + "|r" + "{spell:" + key.Cooldown3 + "}";

      let option4 =
        key.name4 === "" || key.name4 === undefined
          ? key.Cooldown4 === "" || key.Cooldown4 === undefined
            ? ""
            : key.Cooldown4 === "Personals"
            ? space + "{everyone}Personals" + "{spell:160955}"
            : key.Cooldown4 === "Potion/Healthstone"
            ? space + "{everyone}Potion/Healthstone" + "{spell:105683}"
            : ""
          : space + classColoursERT(key.class4) + key.name4 + "|r" + "{spell:" + key.Cooldown4 + "}";

      return {
        ert: time + translatedName + seperator + option0 + option1 + option2 + option3 + option4,
        /* --------------------------------- This is for Sorting by Time -------------------------------- */
        time: key.time,
      };
    });
  // debug && console.table(ertNoteTimeIcons);

  this.setState({
    ertListTimeIcons: ertNoteTimeIcons,
  });
}
