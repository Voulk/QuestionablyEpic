import React, { useEffect, forwardRef, useState } from "react";
import MaterialTable, { MTableToolbar, MTableBody, MTableHeader } from "@material-table/core";
import { AddBox, ArrowDownward, Check, Clear, DeleteOutline, Edit, FilterList, Search, Tooltip } from "@mui/icons-material";
import { Button, TextField, MenuItem, Paper, Grid, FormControl, InputLabel } from "@mui/material";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import { bossList } from "../Data/CooldownPlannerBossList";
import { useTranslation } from "react-i18next";
import { getTableLocale } from "locale/GetTableLocale";
import bossIcons from "../Functions/IconFunctions/BossIcons";
import Cooldowns from "../CooldownObject/CooldownObject";
import AddPlanDialog from "./AddPlanDialog";
import CopyPlanDialog from "./CopyPlanDialog";
import DeletePlanDialog from "./DeletePlanDialog";
import ExportPlanDialog from "./ExportPlanDialog";
import ImportPlanDialog from "./ImportPlanDialog";
import ExportERTDialog from "./ERTDialog";
import HealerSelector from "./EditComponents/HealerSelector";
import BossAbilitySelector from "./EditComponents/BossAbilitySelector";
import CooldownSelector from "./EditComponents/CooldownSelector";
import CastTextField from "./EditComponents/CastTextField";
import CooldownRender from "./RenderComponents/CooldownRender";
import BossAbilityRender from "./RenderComponents/BossAbilityRender";
import NameRender from "./RenderComponents/NameRender";
import ClassRender from "./RenderComponents/ClassRender";
import ClassEditRender from "./EditComponents/ClassEditRender";
import CooldownTimeRender from "./RenderComponents/CooldownTImeRender";
import NoteEdit from "./EditComponents/NoteEdit";
import { CooldownPlannerTheme } from "./Styles/CooldownPlannerTheme";
import { TableStyles } from "./Styles/TableStyles";
import { cooldownDB } from "../Data/CooldownDB";
import { bossAbilities } from "../Data/CooldownPlannerBossAbilityList";
import ls from "local-storage";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} style={{ color: "#ffee77" }} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} style={{ color: "#ffee77" }} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} style={{ color: "#ffee77" }} />),
  Search: forwardRef((props, ref) => <Search {...props} style={{ color: "#ffee77" }} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} style={{ color: "#ffee77" }} ref={ref} />),
};

// turn debugging (console logging) on/off
const debug = false;

export default function CooldownPlanner(props) {
  debug && console.log(" -- Debugging On -> CooldownPlanner.js --");
  // log provided props
  // debug && console.log(props);

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const cooldownObject = new Cooldowns();
  const healTeamDialogOpen = props.healTeamDialogOpen;

  // ERT Objects
  const ertListTimeIcons = props.ertListTimeIcons;

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Add Plan                                            */
  /* ---------------------------------------------------------------------------------------------- */
  const [openAddPlanDialog, setOpenAddPlanDialog] = React.useState(false);

  const handleAddPlanDialogClickOpen = () => {
    setOpenAddPlanDialog(true);
  };

  const handleAddPlanDialogClose = (value) => {
    setOpenAddPlanDialog(false);
  };

  /* ---------------------------------------------------------------------------------------------- */
  /*                                            Copy Plan                                            */
  /* ---------------------------------------------------------------------------------------------- */
  const [openCopyPlanDialog, setOpenCopyPlanDialog] = React.useState(false);

  const handleCopyPlanDialogClickOpen = () => {
    setOpenCopyPlanDialog(true);
  };

  const handleCopyPlanDialogClose = (value) => {
    setOpenCopyPlanDialog(false);
  };

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Delete Plan                                          */
  /* ---------------------------------------------------------------------------------------------- */
  const [openDeletePlanDialog, setOpenDeletePlanDialog] = React.useState(false);

  const handleDeletePlanDialogClickOpen = () => {
    setOpenDeletePlanDialog(true);
  };

  const handleDeletePlanDialogClose = (value) => {
    setOpenDeletePlanDialog(false);
  };

  /* ---------------- State for Raid shown (Current is Sanctum of Domination 2450) ---------------- */
  // Only bosses for Sanctum will be shown in the drop down
  const [currentRaid, setCurrentRaid] = useState(2481);
  // debug && console.log(currentRaid);
  const [currentBoss, setCurrentBoss] = useState(2512);
  const [currentDifficulty, setDifficulty] = useState("Mythic");
  // debug && console.log(currentBoss);
  const [currentPlan, setCurrentPlan] = useState("");
  // debug && console.log(currentPlan);
  const [data, setData] = useState([]);

  const getBossPlanNames = (boss, currentDif) => {
    return Object.keys(cooldownObject.getCooldowns(boss, currentDif));
  };

  /* ------------------------------- Loads relevant plan into table ------------------------------- */
  const loadPlanData = (currentBoss, newPlan, currentDif) => {
    setCurrentBoss(currentBoss);
    setCurrentPlan(newPlan);

    /* ------------------------------- Get List of Plans for the boss ------------------------------- */
    const bossCooldowns = cooldownObject.getCooldowns(currentBoss, currentDif);
    /* --------------------------------------- Set the lected --------------------------------------- */
    const planCooldowns = bossCooldowns[newPlan];
    setDifficulty(currentDif);
    setData(planCooldowns);
  };

  /* --------------------- Updates the plan in cooldownObject in local storage -------------------- */
  const updateStorage = (boss, plan, currentData, currentDif) => {
    cooldownObject.updateCooldownPlan(boss, plan, currentData, currentDif);
  };

  /* -------------------------------------- Changes the Boss -------------------------------------- */
  const changeBoss = (newBoss, currentDif) => {
    setCurrentBoss(newBoss);
    setCurrentPlan("");
    setData([]);
  };

  const changeDifficulty = (newBoss, currentDif) => {
    setDifficulty(currentDif);
    setCurrentPlan("");
    setData([]);
  };

  let columns = [
    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "time",
      width: "4%",
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Times currently must be entered in the 00:00 format.
      // Currently due to sorting, the user must either use a time, or label the cooldowns, 1, 2, 3, 4 etc to keep them in order.
      // This can probably be handled a lot better than how is handled currently.
      editComponent: (props) => CastTextField(props),
    },
    {
      /* ----------- Here the user can select which boss ability the cooldown should cover. ----------- */
      title: t("CooldownPlanner.TableLabels.BossAbilityLabel"),
      field: "bossAbility",
      width: "6%",
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
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

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 0                               */
    /* -------------------------------------------------------------------------- */
    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "cooldownTime0",
      width: "1%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Times must be entered in the 00:00 format.
      editComponent: (props) => CastTextField(props),
    },
    {
      /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "1%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      render: (rowData) => CooldownTimeRender(rowData, "cooldown0", "cooldownTime0"),
    },
    {
      title: t("Name") + " 1",
      field: "name0",
      width: "5%",
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      /* ------------------------ Renders the healer name outside of Edit Mode. ----------------------- */
      render: (rowData) => NameRender(rowData, "name0", "class0"),
      /* ---------- Component for name selection when the table is in edit mode. ---------- */
      editComponent: (props) => HealerSelector(props, "name0", "class0", "cooldown0"),
    },
    /* ------- Class column. This is generated from the selected healer from the Name column. ------- */
    {
      title: t("Class"),
      field: "class0",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
      render: (rowData) => ClassRender(rowData, "class0"),
      /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
      editComponent: (props) => ClassEditRender(props, "class0"),
    },
    {
      /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
      title: t("Cooldown") + " 1",
      field: "cooldown0",
      width: "9%",
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Search function for abilities as they are stores as numbers. Works for all languages
      customFilterAndSearch: (term, rowData) => {
        let searchedTerm = cooldownDB
          .filter((object) => object.guid === rowData.cooldown0)
          .map((array) => Object.values(array["name"]).map((name, i) => name.toLocaleLowerCase()))
          .flat();
        return searchedTerm.findIndex((item) => item.includes(term.toLocaleLowerCase())) != -1;
      },
      /* --------------------- Renders the Ability name that was set for this row. -------------------- */
      render: (rowData) => CooldownRender(rowData, "cooldown0"),
      /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
      editComponent: (props, rowData) => CooldownSelector(props, rowData, "cooldown0", "class0"),
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 1                               */
    /* -------------------------------------------------------------------------- */
    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "cooldownTime1",
      width: "1%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Times must be entered in the 00:00 format.
      editComponent: (props) => CastTextField(props),
    },
    {
      /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "1%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      render: (rowData) => CooldownTimeRender(rowData, "cooldown1", "cooldownTime1"),
    },
    {
      title: t("Name 2"),
      field: "name1",
      width: "5%",
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      /* --------------------- This renders the healer name outside of Edit Mode. --------------------- */
      render: (rowData) => NameRender(rowData, "name1", "class1"),
      /* ---------- This is the Component for name selection when the table is in edit mode. ---------- */
      editComponent: (props, i) => HealerSelector(props, "name1", "class1", "cooldown1"),
    },
    {
      title: t("Class"),
      field: "class1",
      // width: "10%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
      render: (rowData) => ClassRender(rowData, "class1"),
      /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
      editComponent: (props) => ClassEditRender(props, "class1"),
    },
    {
      /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
      title: t("Cooldown") + " 2",
      field: "cooldown1",
      width: "9%",
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Search function for abilities as they are stores as numbers. Works for all languages
      customFilterAndSearch: (term, rowData) => {
        let searchedTerm = cooldownDB
          .filter((object) => object.guid === rowData.cooldown1)
          .map((array) => Object.values(array["name"]).map((name, i) => name.toLocaleLowerCase()))
          .flat();
        return searchedTerm.findIndex((item) => item.includes(term.toLocaleLowerCase())) != -1;
      },
      /* --------------------- Renders the Ability name that was set for this row. -------------------- */
      render: (rowData) => CooldownRender(rowData, "cooldown1"),
      /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
      editComponent: (props, rowData) => CooldownSelector(props, rowData, "cooldown1", "class1"),
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 2                               */
    /* -------------------------------------------------------------------------- */
    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "cooldownTime2",
      width: "1%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Times must be entered in the 00:00 format.
      editComponent: (props) => CastTextField(props),
    },
    {
      /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "1%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      render: (rowData) => CooldownTimeRender(rowData, "cooldown2", "cooldownTime2"),
    },
    {
      title: t("Name") + " 3",
      field: "name2",
      width: "5%",
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      /* --------------------- This renders the healer name outside of Edit Mode. --------------------- */
      render: (rowData) => NameRender(rowData, "name2", "class2"),
      /* ---------- This is the Component for name selection when the table is in edit mode. ---------- */
      editComponent: (props, i) => HealerSelector(props, "name2", "class2", "cooldown2"),
    },
    {
      title: t("Class"),
      field: "class2",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
      render: (rowData) => ClassRender(rowData, "class2"),
      /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
      editComponent: (props) => ClassEditRender(props, "class2"),
    },
    {
      /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
      title: t("Cooldown") + " 3",
      field: "cooldown2",
      width: "9%",
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Search function for abilities as they are stores as numbers. Works for all languages
      customFilterAndSearch: (term, rowData) => {
        let searchedTerm = cooldownDB
          .filter((object) => object.guid === rowData.cooldown2)
          .map((array) => Object.values(array["name"]).map((name, i) => name.toLocaleLowerCase()))
          .flat();
        return searchedTerm.findIndex((item) => item.includes(term.toLocaleLowerCase())) != -1;
      },
      /* --------------------- Renders the Ability name that was set for this row. -------------------- */
      render: (rowData) => CooldownRender(rowData, "cooldown2"),
      /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
      editComponent: (props, rowData) => CooldownSelector(props, rowData, "cooldown2", "class2"),
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 4                               */
    /* -------------------------------------------------------------------------- */
    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "cooldownTime3",
      width: "1%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Times must be entered in the 00:00 format.
      editComponent: (props) => CastTextField(props),
    },
    {
      /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "1%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      render: (rowData) => CooldownTimeRender(rowData, "cooldown3", "cooldownTime3"),
    },
    {
      title: t("Name") + " 4",
      field: "name3",
      width: "5%",
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      /* --------------------- This renders the healer name outside of Edit Mode. --------------------- */
      render: (rowData) => NameRender(rowData, "name3", "class3"),
      /* ---------- This is the Component for name selection when the table is in edit mode. ---------- */
      editComponent: (props, i) => HealerSelector(props, "name3", "class3", "cooldown3"),
    },
    {
      title: t("Class"),
      field: "class3",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
      render: (rowData) => ClassRender(rowData, "class3"),
      /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
      editComponent: (props) => ClassEditRender(props, "class3"),
    },
    {
      /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
      title: t("Cooldown") + " 4",
      field: "cooldown3",
      width: "9%",
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Search function for abilities as they are stores as numbers. Works for all languages
      customFilterAndSearch: (term, rowData) => {
        let searchedTerm = cooldownDB
          .filter((object) => object.guid === rowData.cooldown3)
          .map((array) => Object.values(array["name"]).map((name, i) => name.toLocaleLowerCase()))
          .flat();
        return searchedTerm.findIndex((item) => item.includes(term.toLocaleLowerCase())) != -1;
      },
      /* --------------------- Renders the Ability name that was set for this row. -------------------- */
      render: (rowData) => CooldownRender(rowData, "cooldown3"),
      /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
      editComponent: (props, rowData) => CooldownSelector(props, rowData, "cooldown3", "class3"),
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 5                               */
    /* -------------------------------------------------------------------------- */
    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "cooldownTime4",
      width: "1%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Times must be entered in the 00:00 format.
      editComponent: (props) => CastTextField(props),
    },
    {
      /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "1%",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      render: (rowData) => CooldownTimeRender(rowData, "cooldown4", "cooldownTime4"),
    },
    {
      title: t("Name") + " 5",
      field: "name4",
      width: "5%",
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      /* --------------------- This renders the healer name outside of Edit Mode. --------------------- */
      render: (rowData) => NameRender(rowData, "name4", "class4"),
      /* ---------- This is the Component for name selection when the table is in edit mode. ---------- */
      editComponent: (props, i) => HealerSelector(props, "name4", "class4", "cooldown4"),
    },
    {
      title: t("Class"),
      field: "class4",
      hidden: true,
      cellStyle: TableStyles.cellStyle.thinRightBorder,
      headerStyle: TableStyles.headerStyle,
      /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
      render: (rowData) => ClassRender(rowData, "class4"),
      /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
      editComponent: (props) => ClassEditRender(props, "class4"),
    },
    {
      /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
      title: t("Cooldown") + " 5",
      field: "cooldown4",
      width: "9%",
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      // Search function for abilities as they are stores as numbers. Works for all languages
      customFilterAndSearch: (term, rowData) => {
        let searchedTerm = cooldownDB
          .filter((object) => object.guid === rowData.cooldown4)
          .map((array) => Object.values(array["name"]).map((name, i) => name.toLocaleLowerCase()))
          .flat();
        return searchedTerm.findIndex((item) => item.includes(term.toLocaleLowerCase())) != -1;
      },
      /* --------------------- Renders the Ability name that was set for this row. -------------------- */
      render: (rowData) => CooldownRender(rowData, "cooldown4"),
      /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
      editComponent: (props, rowData) => CooldownSelector(props, rowData, "cooldown4", "class4"),
    },

    {
      /* -------------- Input Notes for the cooldown. I.e "Use just before this ability" -------------- */
      title: t("CooldownPlanner.TableLabels.NotesLabel"),
      field: "notes",
      cellStyle: TableStyles.cellStyle.thickRightBorder,
      headerStyle: TableStyles.headerStyle,
      editComponent: (props) => NoteEdit(props),
    },
  ];

  /* ------------- When the currently loaded data is updated the props.update function ------------ */
  /* ------------- passed from the cooldown planner module will update the state also. ------------ */
  useEffect(() => {
    props.update(data, currentBoss, currentLanguage);
  }, [data]);

  const RosterCheck = ls.get("healerInfo") === null ? true : ls.get("healerInfo").length === 0 ? true : false;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={CooldownPlannerTheme}>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={data === [] ? data : data.sort((a, b) => (a.time > b.time && 1) || -1)}
          style={{
            padding: 10,
          }}
          options={{
            showTitle: false,
            sorting: false,
            searchFieldVariant: "outlined",
            headerStyle: {
              border: "1px solid #6c6c6c",
              padding: "0px 8px 0px 8px",
              backgroundColor: "#6c6c6c",
              color: "#fff",
              whiteSpace: "nowrap",
              textAlign: "center",
            },
            /* --------------------------- Alternating Row Colour is defined here --------------------------- */
            rowStyle: (rowData, index) => {
              if (
                rowData.bossAbility === "Phase 1" ||
                rowData.bossAbility === "Phase 2" ||
                rowData.bossAbility === "Phase 3" ||
                rowData.bossAbility === "Phase 4" ||
                rowData.bossAbility === "Intermission"
              ) {
                return {
                  height: 28,
                  backgroundColor: "#359166",
                  border: "1px solid #359166",
                };
              }

              if (index % 2) {
                return {
                  height: 28,
                  backgroundColor: "#515151",
                  border: "1px solid #595959",
                };
              }
              return {
                height: 28,
                border: "1px solid #595959",
              };
            },
            actionCellStyle: {
              borderBottom: "1px solid #595959",
            },
            actionsColumnIndex: 24,
            paging: false,
          }}
          /* ------- In built table text is localized via this function and the TableLocale.js files ------ */
          localization={getTableLocale()}
          /* --------------------------------- Customized Table Components -------------------------------- */
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
            Body: (props) =>
              /* ------------------------ If no boss selected then hide the Table Body ------------------------ */
              currentBoss === "" ? null : <MTableBody {...props} />,
            Header: (props) =>
              /* ----------------------- If no Boss Selected then hide the Table Header ----------------------- */
              currentBoss === "" ? null : <MTableHeader {...props} />,
            Toolbar: (props) => (
              /* ----------------------- Grid Container for the Toolbar for the Table ------------------------ */
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="space-between"
                style={{
                  marginBottom: (currentBoss === "" ? false : true) ? 7 : 0,
                  marginTop: (currentBoss === "" ? false : true) ? -6 : 0,
                }}
              >
                {/* ------------------- Container for the Heal Team / ERT & Raid/Boss/Plan Selection ------------------- */}
                <Grid item container spacing={1} xs={12} sm={12} md={12} lg={6} xl={9} alignItems="center">
                  {/* ------------------------ Heal Team Button (Activates the Dialog Popup) ----------------------- */}
                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <Button variant="outlined" style={{ height: 40, width: "100%", whiteSpace: "nowrap" }} color="primary" onClick={() => healTeamDialogOpen()}>
                      {/* // TODO: Translate */}
                      Roster
                    </Button>
                  </Grid>
                  {/* ---------------------------------- Raid Selection Drop Down ---------------------------------- */}
                  {/* <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <TextField
                      id="RaidSelector"
                      select
                      value={currentRaid}
                      onChange={(e) => setCurrentRaid(e.target.value)}
                      label={t("CooldownPlanner.TableLabels.RaidSelectorLabel")}
                      size="small"
                      sx={{ minWidth: 200, width: "100%" }}
                    >
                      {[2450, 2481].map((key, i, arr) => (
                        <MenuItem key={"RS" + i} value={key}>
                          {key}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid> */}
                  {/* ----------------------------------- Boss Selection Dropdown ---------------------------------- */}
                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <TextField
                      sx={{ minWidth: 100 }}
                      fullSize
                      label={t("Boss")}
                      select
                      value={currentBoss}
                      placeholder={"Boss"}
                      onChange={(e) => changeBoss(e.target.value, currentDifficulty)}
                      disabled={RosterCheck}
                      size="small"
                    >
                      {bossList
                        .filter((obj) => {
                          return obj.zoneID === currentRaid;
                        })
                        .map((key, i, arr) => {
                          let lastItem = i + 1 === arr.length ? false : true;
                          return (
                            <MenuItem divider={lastItem} key={"BS" + i} value={key.DungeonEncounterID}>
                              {bossIcons(key.DungeonEncounterID)}
                              {key.name[currentLanguage]}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <TextField
                      sx={{ minWidth: 100 }}
                      fullSize
                      select
                      label={t("Difficulty")}
                      id="DifficultySelector"
                      placeholder={t("Difficulty")}
                      value={currentDifficulty}
                      onChange={(e) => changeDifficulty(currentBoss, e.target.value)}
                      disabled={currentBoss === "" || RosterCheck ? true : false}
                      size="small"
                    >
                      {["Heroic", "Mythic"].map((key, i, arr) => {
                        let lastItem = i + 1 === arr.length ? false : true;
                        return (
                          <MenuItem key={key} divider={lastItem} value={key}>
                            {key}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>

                  {/* ----------------------------------- Plan Selection Dropdown ---------------------------------- */}
                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <TextField
                      sx={{ minWidth: 100 }}
                      fullSize
                      select
                      label={t("Plan")}
                      id="PlanSelector"
                      value={currentPlan}
                      InputLabelProps={{ style: { lineHeight: "normal" } }}
                      onChange={(e) => loadPlanData(currentBoss, e.target.value, currentDifficulty)}
                      disabled={currentBoss === "" || RosterCheck ? true : false || getBossPlanNames(currentBoss, currentDifficulty).length === 1}
                      size="small"
                    >
                      {getBossPlanNames(currentBoss, currentDifficulty)
                        .filter((key) => key !== "default")
                        .map((key, i, arr) => {
                          let lastItem = i + 1 === arr.length ? false : true;
                          return (
                            <MenuItem key={key} divider={lastItem} value={key}>
                              {key}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <AddPlanDialog
                      openAddPlanDialog={openAddPlanDialog}
                      handleAddPlanDialogClose={handleAddPlanDialogClose}
                      cooldownObject={cooldownObject}
                      currentBoss={currentBoss}
                      currentDifficulty={currentDifficulty}
                      loadPlanData={loadPlanData}
                      handleAddPlanDialogClickOpen={handleAddPlanDialogClickOpen}
                      disabledCheck={RosterCheck}
                      changeDifficulty={changeDifficulty}
                      currentRaid={currentRaid}
                      changeBoss={changeBoss}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <CopyPlanDialog
                      currentPlan={currentPlan}
                      openCopyPlanDialog={openCopyPlanDialog}
                      handleCopyPlanDialogClickOpen={handleCopyPlanDialogClickOpen}
                      handleCopyPlanDialogClose={handleCopyPlanDialogClose}
                      cooldownObject={cooldownObject}
                      currentBoss={currentBoss}
                      currentDifficulty={currentDifficulty}
                      loadPlanData={loadPlanData}
                      disabledCheck={RosterCheck}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <DeletePlanDialog
                      openDeletePlanDialog={openDeletePlanDialog}
                      handleDeletePlanDialogClickOpen={handleDeletePlanDialogClickOpen}
                      handleDeletePlanDialogClose={handleDeletePlanDialogClose}
                      currentPlan={currentPlan}
                      setCurrentPlan={setCurrentPlan}
                      setData={setData}
                      cooldownObject={cooldownObject}
                      currentBoss={currentBoss}
                      currentDifficulty={currentDifficulty}
                      disabledCheck={RosterCheck}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <ImportPlanDialog cooldownObject={cooldownObject} loadPlanData={loadPlanData} disabledCheck={RosterCheck} />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <ExportPlanDialog data={data} boss={currentBoss} planName={currentPlan} plan={data} currentDifficulty={currentDifficulty} disabledCheck={RosterCheck} currentPlan={currentPlan} />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <ExportERTDialog ertListTimeIcons={ertListTimeIcons} boss={currentBoss} currentPlan={currentPlan} disabledCheck={RosterCheck} />
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={12} lg={6} xl={3}>
                  {currentBoss === "" || currentPlan === "default" || currentPlan === "" ? null : <MTableToolbar {...props} />}
                </Grid>
              </Grid>
            ),
          }}
          /* ------------------- These are how the table updates its data from edit mode ------------------ */
          editable={{
            isEditHidden: (rowData) => currentPlan === "default",
            isDeleteHidden: (rowData) => currentPlan === "default",
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  /* ------------------ Spread Current Data and the New Data into updated Object (Sorted) ------------------ */
                  let updatedData = [...data, newData].sort((a, b) => (a.time > b.time && 1) || -1);
                  setData(updatedData);
                  /* ------------------------------------ Update local storage ------------------------------------ */
                  updateStorage(currentBoss, currentPlan, updatedData, currentDifficulty);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  /* --------------------------- Spread Current Data to update row data --------------------------- */
                  const dataUpdate = [...data];
                  /* -------------------------- Set index as the old datas ID for updated ------------------------- */
                  const index = oldData.tableData.id;
                  /* -------------------- Set the Updated Data as the old datas id replacing it ------------------- */
                  dataUpdate[index] = newData;
                  let updatedData = [...dataUpdate].sort((a, b) => (a.time > b.time && 1) || -1);
                  /* ---------------------------------- Set Updated Data (Sorted) --------------------------------- */
                  setData(updatedData);
                  /* ------------------------------------ Update local storage ------------------------------------ */
                  updateStorage(currentBoss, currentPlan, updatedData, currentDifficulty);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  /* ------------------------------------- Spread current data ------------------------------------ */
                  const dataDelete = [...data];
                  /* -------------------------- Set index as the old datas ID for deletion ------------------------- */
                  const index = oldData.tableData.id;
                  /* --------------------------------------- Delete Row Data -------------------------------------- */
                  dataDelete.splice(index, 1);

                  let updatedData = [...dataDelete].sort((a, b) => (a.time > b.time && 1) || -1);
                  /* -------------------------- Set the New Data without the spliced row -------------------------- */
                  setData(updatedData);
                  /* ------------------------------------ Update local storage ------------------------------------ */
                  updateStorage(currentBoss, currentPlan, updatedData, currentDifficulty);
                  resolve();
                }, 1000);
              }),
            onBulkUpdate: (changes) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  for (var key in changes) {
                    if (changes.hasOwnProperty(key)) {
                      dataUpdate[key] = changes[key].newData;
                    }
                  }
                  let updatedData = [...dataUpdate];
                  setData(updatedData);
                  updateStorage(currentBoss, currentPlan, updatedData, currentDifficulty);
                  resolve();
                }, 1000);
              }),
          }}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
