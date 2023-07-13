import { TableStyles } from "../Styles/TableStyles";
import { cooldownDB } from "../../Data/CooldownDB";
import { bossAbilities } from "../../Data/CooldownPlannerBossAbilityList";
import HealerSelector from "../EditComponents/HealerSelector";
import BossAbilitySelector from "../EditComponents/BossAbilitySelector";
import CooldownSelector from "../EditComponents/CooldownSelector";
import CastTextField from "../EditComponents/CastTextField";
import CooldownRender from "../RenderComponents/CooldownRender";
import BossAbilityRender from "../RenderComponents/BossAbilityRender";
import NameRender from "../RenderComponents/NameRender";
import ClassRender from "../RenderComponents/ClassRender";
import ClassEditRender from "../EditComponents/ClassEditRender";
import CooldownTimeRender from "../RenderComponents/CooldownTImeRender";
import NoteEdit from "../EditComponents/NoteEdit";
import { useTranslation } from "react-i18next";

export const generateColumns = (currentBoss, currentDifficulty) => {
  const { t, i18n } = useTranslation();
  const columnsStart = [
    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "time",
      width: "4%",
      cellStyle: TableStyles().cellStyle.thinRightBorder,
      headerStyle: TableStyles().headerStyle,
      // Times currently must be entered in the 00:00 format.
      // Currently due to sorting, the user must either use a time, or label the cooldowns, 1, 2, 3, 4 etc to keep them in order.
      // This can probably be handled a lot better than how is handled currently.
      editComponent: (props) => <CastTextField {...props} />,
    },
    {
      /* ----------- Here the user can select which boss ability the cooldown should cover. ----------- */
      title: t("CooldownPlanner.TableLabels.BossAbilityLabel"),
      field: "bossAbility",
      width: "6%",
      cellStyle: TableStyles().cellStyle.thickRightBorder,
      headerStyle: TableStyles().headerStyle,
      // Search function for abilities as they are stores as numbers. Works for all languages
      customFilterAndSearch: (term, rowData) => {
        let searchedTerm = bossAbilities[currentBoss]
          .filter((object) => object.guid === rowData.bossAbility)
          .map((array) => Object.values(array["name"]).map((name, i) => name.toLocaleLowerCase()))
          .flat();
        return searchedTerm.findIndex((item) => item.includes(term.toLocaleLowerCase())) != -1;
      },
      render: (rowData) => BossAbilityRender(rowData, currentBoss, currentDifficulty),
      editComponent: (props) => BossAbilitySelector(props, currentBoss, currentDifficulty),
    },
  ];

  const cooldownColumns = () => {
    let generatedCooldownColmns = [];
    for (var i = 0; i < 5; i++) {
      let num = i;
      generatedCooldownColmns = generatedCooldownColmns.concat([
        {
          /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
          title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
          field: "cooldownTime" + num,
          width: "1%",
          hidden: true,
          cellStyle: TableStyles().cellStyle.thinRightBorder,
          headerStyle: TableStyles().headerStyle,
          // Times must be entered in the 00:00 format.
          editComponent: (props) => CastTextField(props),
        },
        {
          /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
          title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
          width: "1%",
          hidden: true,
          cellStyle: TableStyles().cellStyle.thickRightBorder,
          headerStyle: TableStyles().headerStyle,
          render: (rowData) => CooldownTimeRender(rowData, "cooldown" + num, "cooldownTime" + num),
        },
        {
          title: t("Name") + " " + (i + 1),
          field: "name" + num,
          width: "5%",
          cellStyle: (value, rowData) => {
            if (rowData && rowData["class" + num]) {
              return TableStyles(rowData["class" + num], rowData).cellStyle.thinRightBorder;
            } else {
              return TableStyles().cellStyle.thinRightBorder; // Return an empty object if rowData or rowData["class" + num] is undefined
            }
          },

          headerStyle: TableStyles().headerStyle,
          /* ------------------------ Renders the healer name outside of Edit Mode. ----------------------- */
          render: (rowData) => NameRender(rowData, "name" + num, "class" + num),
          /* ---------- Component for name selection when the table is in edit mode. ---------- */
          editComponent: (props) => HealerSelector(props, "name" + num, "class" + num, "cooldown" + num),
        },
        /* ------- Class column. This is generated from the selected healer from the Name column. ------- */
        {
          title: t("Class"),
          field: "class" + num,
          hidden: true,
          cellStyle: TableStyles().cellStyle.thinRightBorder,
          headerStyle: TableStyles().headerStyle,
          /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
          render: (rowData) => ClassRender(rowData, "class" + num),
          /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
          editComponent: (props) => ClassEditRender(props, "class" + num),
        },
        {
          /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
          title: t("Cooldown") + " " + (i + 1),
          field: "cooldown" + num,
          width: "9%",
          cellStyle: (value, rowData) => {
            if (rowData && rowData["class" + num]) {
              return TableStyles(rowData["class" + num], rowData).cellStyle.thinRightBorder;
            } else {
              return TableStyles().cellStyle.thinRightBorder; // Return an empty object if rowData or rowData["class" + num] is undefined
            }
          },

          headerStyle: TableStyles().headerStyle,
          // Search function for abilities as they are stores as numbers. Works for all languages
          customFilterAndSearch: (term, rowData) => {
            let searchedTerm = cooldownDB
              .filter((object) => object.guid === rowData["cooldown" + num])
              .map((array) => Object.values(array["name"]).map((name, i) => name.toLocaleLowerCase()))
              .flat();
            return searchedTerm.findIndex((item) => item.includes(term.toLocaleLowerCase())) != -1;
          },
          /* --------------------- Renders the Ability name that was set for this row. -------------------- */
          render: (rowData) => CooldownRender(rowData, "cooldown" + num, "class" + num),
          /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
          editComponent: (props, rowData) => CooldownSelector(props, rowData, "cooldown" + num, "class" + num),
        },
      ]);
    }
    return generatedCooldownColmns;
  };

  const noteColumn = [
    {
      /* -------------- Input Notes for the cooldown. I.e "Use just before this ability" -------------- */
      title: t("CooldownPlanner.TableLabels.NotesLabel"),
      field: "notes",
      cellStyle: TableStyles().cellStyle.thickRightBorder,
      headerStyle: TableStyles().headerStyle,
      editComponent: (props) => NoteEdit(props),
    },
  ];

  const finalColumns = columnsStart.concat(cooldownColumns(), noteColumn);

  return finalColumns;
};
