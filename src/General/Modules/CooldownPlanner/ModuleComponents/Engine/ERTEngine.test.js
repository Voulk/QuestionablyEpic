import ertEngine from "./ERTEngine";

// const boss = 2607;
// const lang = "en";
// const hideNoCooldownsChecked = false;
// const tableData = [
//   {
//     time: "00:00",
//     name0: "Player1",
//     cooldown0: 31884,
//     class0: "Paladin",
//     bossAbility: "Phase 1",
//   },
//   {
//     time: "00:23",
//     name0: "Player2",
//     cooldown0: 51052,
//     class0: "DeathKnight",
//     name1: "Player7",
//     cooldown1: 115310,
//     class1: "Monk",
//     bossAbility: 381615,
//   },
//   {
//     time: "00:31",
//     name0: "Player1",
//     cooldown0: 31821,
//     class0: "Paladin",
//     bossAbility: 388643,
//   },
//   {
//     time: "00:41",
//     name0: "Player1",
//     cooldown0: 375576,
//     class0: "Paladin",
//     bossAbility: 377612,
//   },
//   {
//     time: "00:58",
//     name0: "Player3",
//     cooldown0: 62618,
//     class0: "Priest",
//     name1: "Player4",
//     cooldown1: 370564,
//     class1: "Evoker",
//     bossAbility: 381615,
//     tableData: {
//       id: 4,
//       uuid: "ba012212-4d79-4ea2-8687-91cb9c00b3f3",
//     },
//     name2: "Player5",
//     class2: "Paladin",
//     cooldown2: 105809,
//   },
//   {
//     time: "01:04",
//     name0: "Player3",
//     cooldown0: 47536,
//     class0: "Priest",
//   },
//   {
//     time: "01:16",
//     name0: "Player4",
//     cooldown0: 359816,
//     class0: "Evoker",
//     name1: "Player3",
//     cooldown1: 246287,
//     class1: "Priest",
//     name2: "Player6",
//     cooldown2: 374227,
//     class2: "Evoker",
//     bossAbility: 377612,
//   },
// ];

// const expected = [
//   { ert: "{time:00:00} - Phase 1 -  |cfff38bb9Player1|r {spell:31884}  ", time: "00:00" },
//   { ert: "{time:00:23} - Static Charge -  |cffc31d39Player2|r {spell:51052}  |cff00fe95Player7|r {spell:115310}  ", time: "00:23" },
//   { ert: "{time:00:31} - Volatile Current -  |cfff38bb9Player1|r {spell:31821}  ", time: "00:31" },
//   { ert: "{time:00:41} - Hurricane Wing -  |cfff38bb9Player1|r {spell:375576}  ", time: "00:41" },
//   { ert: "{time:00:58} - Static Charge -  |cff808080Player3|r {spell:62618}  |cff33937fPlayer4|r {spell:370564}  |cfff38bb9Player5|r {spell:105809}  ", time: "00:58" },
//   { ert: "{time:01:04} - |cff808080Player3|r {spell:47536}  ", time: "01:04" },
//   { ert: "{time:01:16} - Hurricane Wing -  |cff33937fPlayer4|r {spell:359816}  |cff808080Player3|r {spell:246287}  |cff33937fPlayer6|r {spell:374227}  ", time: "01:16" },
// ];

// Priest colours need to be reworked.
describe("Test ERT Functions", () => {
  test("Test Function returns correct data after conversion to MRT", () => {

    // // simulate useState
    // let ertData = [];
    // const setERTData = (props) => {
    //   ertData = props;
    // };
    // // run the function
    // ertEngine(tableData, boss, lang, setERTData, hideNoCooldownsChecked);

    // expect(ertData).toEqual(expected);
  });
});
