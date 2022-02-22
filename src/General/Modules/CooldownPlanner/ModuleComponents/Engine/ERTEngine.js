import { classColoursERT } from "../../Functions/ClassColourFunctions";

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

  const seperator = " - ";
  // log provided props
  // debug && console.table(tableData);

  /* ---------------------------- Map the ERT note from the Table Data ---------------------------- */

  /* ---------------------------------------- Time + Icons ---------------------------------------- */
  const ertNoteTimeIcons = tableData
    .filter((key) => key.Cooldown !== undefined)
    .map((key) => {
      let time = "{time:" + key.time + "}";
      let option0 = classColoursERT(key.class) + key.name + "|r" + "{spell:" + key.Cooldown + "}";
      let option1 = key.name1 === "" || key.name1 === undefined ? "" : seperator + classColoursERT(key.class1) + key.name1 + "|r" + "{spell:" + key.Cooldown1 + "}";
      let option2 = key.name2 === "" || key.name2 === undefined ? "" : seperator + classColoursERT(key.class2) + key.name2 + "|r" + "{spell:" + key.Cooldown2 + "}";
      let option3 = key.name3 === "" || key.name3 === undefined ? "" : seperator + classColoursERT(key.class3) + key.name3 + "|r" + "{spell:" + key.Cooldown3 + "}";
      let option4 = key.name4 === "" || key.name4 === undefined ? "" : seperator + classColoursERT(key.class4) + key.name4 + "|r" + "{spell:" + key.Cooldown4 + "}";

      return {
        ert: time + " - " + option0 + option1 + option2 + option3 + option4,
        /* --------------------------------- This is for Sorting by Time -------------------------------- */
        time: key.time,
      };
    });
  // debug && console.table(ertNoteTimeIcons);

  this.setState({
    ertListTimeIcons: ertNoteTimeIcons,
  });
}
