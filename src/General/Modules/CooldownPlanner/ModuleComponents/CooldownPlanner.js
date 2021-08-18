import React, { useEffect, forwardRef, useState } from "react";
import MaterialTable, { MTableToolbar, MTableBody, MTableHeader } from "material-table";
import ClassCooldownMenuItems from "../Menus/ClassCooldownMenuItems";
import { AddBox, ArrowDownward, Check, Clear, DeleteOutline, Edit, FilterList, Search } from "@material-ui/icons";
import { Button, TextField, InputLabel, FormControl, Grow, MenuItem, Divider, Paper, Select, Grid, Typography } from "@material-ui/core";
import { ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { healerCooldownsDetailed, raidList } from "../Data/Data";
import { bossList } from "../Data/CooldownPlannerBossList";
import { bossAbilities } from "../Data/CooldownPlannerBossAbilityList";
import { classColoursJS } from "../Functions/ClassColourFunctions";
import { useTranslation } from "react-i18next";
import { localizationFR } from "locale/fr/TableLocale";
import { localizationEN } from "locale/en/TableLocale";
import { localizationRU } from "locale/ru/TableLocale";
import { localizationCH } from "locale/ch/TableLocale";
import abilityIcons from "../Functions/IconFunctions/AbilityIcons";
import bossIcons from "../Functions/IconFunctions/BossIcons";
import bossAbilityIcons from "../Functions/IconFunctions/BossAbilityIcons";
import classIcons from "../Functions/IconFunctions/ClassIcons";
import ls from "local-storage";
import Cooldowns from "../CooldownObject/CooldownObject";
import AddPlanDialog from "./AddPlanDialog";
import DeletePlanDialog from "./DeletePlanDialog";
import { red } from "@material-ui/core/colors";
import ExportPlanDialog from "./ExportPlanDialog";
import ImportPlanDialog from "./ImportPlanDialog";

const useStyles = makeStyles(() => ({
  formControl: {
    // whiteSpace: "nowrap",
    lineHeight: "normal",
    width: "100%",
  },
  textFieldFontSize: {
    fontSize: 12,
    textAlign: "center",
  },
  selectFontSize: {
    MuiInputBase: {
      root: {
        fontSize: 12,
      },
    },
  },
}));

const deleteTheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const themeCooldownTable = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: "2px 2px 2px 2px",
        borderBottom: "1px solid #595959",
      },
    },
    MuiIconButton: {
      root: {
        padding: "4px",
      },
    },
    MuiToolbar: {
      root: { color: "#345" },
      regular: {
        minHeight: 0,
        "@media (min-width: 600px)": {
          minHeight: "0px",
        },
      },
    },
    MuiInputBase: {
      root: {
        fontSize: 12,
      },
    },
  },
  palette: {
    type: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
});

const selectMenu = createMuiTheme({
  overrides: {
    MuiSelect: { selectMenu: { height: 20 } },
    MuiInputBase: {
      root: {
        fontSize: 12,
      },
    },
  },
  palette: {
    type: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
});

const menuStyle = {
  style: { marginTop: 5 },
  MenuListProps: {
    style: { paddingTop: 0, paddingBottom: 0 },
  },
  PaperProps: {
    style: {
      border: "1px solid #6c6c6c",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

const SearchFieldOverride = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      input: { padding: 10 },
    },
    MuiToolbar: {
      regular: {
        minHeight: 0,
        "@media (min-width: 600px)": {
          minHeight: "0px",
        },
      },
    },
  },
  palette: {
    type: "dark",
    primary: { main: "#d3bc47" },
    secondary: { main: "#e0e0e0" },
  },
});

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

export default function CooldownPlanner(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const cooldownObject = new Cooldowns();
  const ertDialogOpen = props.ertDialogOpen;
  const healTeamDialogOpen = props.healTeamDialogOpen;

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
  const [currentRaid, setCurrentRaid] = useState(2450);
  const [currentBoss, setCurrentBoss] = useState(2423);
  const [currentPlan, setCurrentPlan] = useState("");
  const [data, setData] = useState([]);

  const getBossPlanNames = (boss) => {
    return Object.keys(cooldownObject.getCooldowns(boss));
  };

  /* ------------------------------- Loads relevant plan into table ------------------------------- */
  const loadPlanData = (currentBoss, newPlan) => {
    setCurrentBoss(currentBoss);
    setCurrentPlan(newPlan);

    /* ------------------------------- Get List of Plans for the boss ------------------------------- */
    const bossCooldowns = cooldownObject.getCooldowns(currentBoss);
    /* --------------------------------------- Set the lected --------------------------------------- */
    const planCooldowns = bossCooldowns[newPlan];
    setData(planCooldowns);
  };

  /* --------------------- Updates the plan in cooldownObject in local storage -------------------- */
  const updateStorage = (boss, plan, currentData) => {
    cooldownObject.updateCooldownPlan(boss, plan, currentData);
  };

  /* -------------------------------------- Changes the Boss -------------------------------------- */
  const changeBoss = (newBoss) => {
    loadPlanData(newBoss, "default");
  };

  /* --- Function to Show the time Cooldowns will be available again (Currently Column Hidden) --- */
  const timeCheck = (castTime, cooldown) => {
    /* --------------------------- Get get the cast time as "mm:ss" format -------------------------- */
    let time = moment(castTime, "mm:ss")
      /* ---------- Filter the CD array to get the Cooldown time and add it to the cast time --------- */
      .add(
        healerCooldownsDetailed
          .filter((obj) => {
            return obj.guid === cooldown;
          })
          .map((obj) => obj.cooldown)
          .toString(),
        "s",
      )
      .format("mm:ss");

    /* ---------- Mui Table returns Invalid Date, as this is a time we change the response to Time ---------- */
    if (time === "Invalid date") {
      return "Invalid Time";
    }
    return time;
  };

  let columns = [
    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "time",
      width: "1%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        fontSize: 12,
        textAlign: "center",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      // Times currently must be entered in the 00:00 format.
      // Currently due to sorting, the user must either use a time, or label the cooldowns, 1, 2, 3, 4 etc to keep them in order.
      // This can probably be handled a lot better than how is handled currently.
      editComponent: (props) => (
        <TextField
          error={RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$").test(props.value) || props.value === undefined ? false : true}
          inputProps={{
            pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
          }}
          size="small"
          id="filled-hidden-label-small"
          placeholder="00:00"
          InputProps={{
            classes: {
              input: classes.textFieldFontSize,
            },
          }}
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%", marginTop: 6 }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      /* ----------- Here the user can select which boss ability the cooldown should cover. ----------- */
      title: t("CooldownPlanner.TableLabels.BossAbilityLabel"),
      field: "bossAbility",
      width: "8%",
      cellStyle: {
        borderRight: "2px solid #6c6c6c",
        fontSize: 12,
        lineHeight: "normal",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      render: (rowData) => (
        <div style={{ minWidth: 105, display: "inline-flex", alignItems: "center", width: "100%" }}>
          <div>
            <a data-wowhead={"spell=" + rowData.bossAbility + "&domain=" + currentLanguage}>
              {bossAbilityIcons(rowData.bossAbility, {
                height: 30,
                width: 30,
                margin: "0px 4px 0px 0px",
                verticalAlign: "middle",
                border: "1px solid #595959",
                borderRadius: 4,
              })}
            </a>
          </div>
          <Typography align="center" className={classes.textFieldFontSize} style={{ fontSize: 12, lineHeight: "normal", width: "100%" }}>
            {t("CooldownPlanner.BossAbilities." + rowData.bossAbility)}
          </Typography>
        </div>
      ),
      editComponent: (props) => (
        <ThemeProvider theme={selectMenu}>
          <FormControl className={classes.formControl} size="small">
            <Select
              value={props.value}
              labelId="BossAbilitySelector"
              onChange={(e) => {
                props.onChange(e.target.value);
              }}
              MenuProps={menuStyle}
            >
              {bossAbilities
                .filter((obj) => {
                  return obj.bossID === currentBoss && obj.cooldownPlannerActive === true;
                })
                .map((key, i) => (
                  <MenuItem key={i} value={key.guid}>
                    <a data-wowhead={"spell=" + key.guid + "&domain=" + currentLanguage}>
                      {bossAbilityIcons(key.guid, {
                        height: 20,
                        width: 20,
                        margin: "0px 4px 0px 0px",
                        verticalAlign: "middle",
                        border: "1px solid #595959",
                        borderRadius: 4,
                      })}
                    </a>
                    {t("CooldownPlanner.BossAbilities." + key.guid)}
                  </MenuItem>
                ))
                .map((key, i) => [key, <Divider key={i} />])}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 0                               */
    /* -------------------------------------------------------------------------- */

    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "cooldownTime",
      width: "1%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        fontSize: 12,
        textAlign: "center",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      // Times currently must be entered in the 00:00 format.
      // Currently due to sorting, the user must either use a time, or label the cooldowns, 1, 2, 3, 4 etc to keep them in order.
      // This can probably be handled a lot better than how it handled currently.
      editComponent: (props) => (
        <TextField
          error={RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$").test(props.value) || props.value === undefined ? false : true}
          inputProps={{
            pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
          }}
          InputProps={{
            classes: {
              input: classes.textFieldFontSize,
            },
          }}
          size="small"
          id="standard-basic"
          placeholder="00:00"
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%", marginTop: 6 }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "1%",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "2px solid #595959",
        textAlign: "center",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      render: (rowData) => (
        <div>
          {rowData.Cooldown === "" || rowData.Cooldown === undefined
            ? ""
            : timeCheck(rowData.cooldownTime === "" || rowData.cooldownTime === undefined ? rowData.time : rowData.cooldownTime, rowData.Cooldown)}
        </div>
      ),
    },
    {
      title: t("Name") + " 1",
      field: "name",
      width: "6%",
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: 4,
        borderRight: "1px solid #595959",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* ------------------------ Renders the healer name outside of Edit Mode. ----------------------- */
      render: (rowData) => <div style={{ color: classColoursJS(rowData.class), display: "inline-flex" }}>{rowData.name}</div>,
      /* ---------- Component for name selection when the table is in edit mode. ---------- */
      editComponent: (props) => (
        <ThemeProvider theme={selectMenu}>
          <FormControl className={classes.formControl} size="small">
            <Select
              value={props.value}
              label={t("Name")}
              labelId="HealerSelector"
              onChange={(e) => {
                /* ------------------------------ Spread the rows data for updating ----------------------------- */
                let data = { ...props.rowData };
                /* -------------------- Set the name of the row to the selected from dropdown ------------------- */
                data.name = e.target.value;
                /* --------------------- Update the class from the healerinfo local storage --------------------- */
                data.class = ls
                  .get("healerInfo")
                  .filter((obj) => {
                    return obj.name === e.target.value;
                  })
                  .map((obj) => obj.class)
                  .toString();
                /* ------------------------------- Reset the cooldown for the row ------------------------------- */
                data.Cooldown = undefined;
                /* --------------------------------------- Update the data -------------------------------------- */
                props.onRowDataChange(data);
              }}
              MenuProps={menuStyle}
            >
              {/* ----- Map Healer Names from the healerInfo local storage (created from Heal Team Module) ----- */}
              {ls
                .get("healerInfo")
                .map((key, i) => (
                  <MenuItem style={{ color: classColoursJS(key.class) }} key={i} value={key.name}>
                    <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
                      {classIcons(key.class, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
                      {key.name}
                    </div>
                  </MenuItem>
                ))
                .map((key, i) => [key, <Divider key={i} />])}
              ,
              <MenuItem key={"remove"} value={""}>
                {/* // TODO Translate */}
                Remove
              </MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },
    /* ------- Class column. This is generated from the selected healer from the Name column. ------- */
    {
      title: t("Class"),
      field: "class",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class), display: "inline-flex" }}>
          {rowData.class === undefined ? "" : classIcons(rowData.class, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
          {t("CooldownPlanner.Classes." + rowData.class)}
        </div>
      ),
      /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
      editComponent: (props) => {
        let data = { ...props.rowData };
        return (
          <div style={{ color: classColoursJS(data.class), display: "inline-flex" }}>
            {data.class === undefined ? "" : classIcons(data.class, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle", borderRadius: 4 })}
            {t("CooldownPlanner.Classes." + data.class)}
          </div>
        );
      },
    },
    {
      /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
      title: t("Cooldown") + " 1",
      field: "Cooldown",
      width: "8%",
      cellStyle: {
        borderRight: "2px solid #6c6c6c",
        fontSize: 12,
        lineHeight: "normal",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* --------------------- Renders the Ability name that was set for this row. -------------------- */
      render: (rowData) => (
        <div style={{ minminWidth: 105, display: "inline-flex", alignItems: "center", width: "100%" }}>
          <div>
            {abilityIcons(rowData.Cooldown, {
              height: 30,
              width: 30,
              margin: "0px 4px 0px 0px",
              verticalAlign: "middle",
              border: "1px solid #595959",
              borderRadius: 4,
            })}
          </div>
          <Typography align="center" style={{ fontSize: 12, lineHeight: "normal", width: "100%" }}>
            {t("CooldownPlanner.ClassAbilities." + rowData.Cooldown)}
          </Typography>
        </div>
      ),
      /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <ThemeProvider theme={selectMenu}>
            <FormControl className={classes.formControl} size="small">
              <Select
                value={rowData.Cooldown || props.value}
                labelId="HealerAbilitySelector"
                label={t("Cooldown")}
                onChange={(e) => {
                  props.onChange(e.target.value);
                }}
                MenuProps={menuStyle}
              >
                {ClassCooldownMenuItems(data.class) || []}
              </Select>
            </FormControl>
          </ThemeProvider>
        );
      },
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 1                               */
    /* -------------------------------------------------------------------------- */

    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "cooldownTime1",
      width: "1%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        fontSize: 12,
        textAlign: "center",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      // Times currently must be entered in the 00:00 format.
      // Currently due to sorting, the user must either use a time, or label the cooldowns, 1, 2, 3, 4 etc to keep them in order.
      // This can probably be handled a lot better than how it handled currently.
      editComponent: (props) => (
        <TextField
          error={RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$").test(props.value) || props.value === undefined ? false : true}
          inputProps={{
            pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
          }}
          InputProps={{
            classes: {
              input: classes.textFieldFontSize,
            },
          }}
          size="small"
          id="standard-basic"
          placeholder="00:00"
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%", marginTop: 6 }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "1%",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "2px solid #595959",
        textAlign: "center",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      render: (rowData) => (
        <div>
          {rowData.Cooldown1 === "" || rowData.Cooldown1 === undefined
            ? ""
            : timeCheck(rowData.cooldownTime1 === "" || rowData.cooldownTime1 === undefined ? rowData.time : rowData.cooldownTime1, rowData.Cooldown1)}
        </div>
      ),
    },
    {
      title: t("Name 2"),
      field: "name1",
      width: "6%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        paddingLeft: 4,
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* --------------------- This renders the healer name outside of Edit Mode. --------------------- */
      render: (rowData) => <div style={{ color: classColoursJS(rowData.class1), display: "inline-flex" }}>{rowData.name1}</div>,
      /* ---------- This is the Component for name selection when the table is in edit mode. ---------- */
      editComponent: (props) => (
        <ThemeProvider theme={selectMenu}>
          <FormControl className={classes.formControl} size="small">
            <Select
              value={props.value}
              label={t("Name")}
              labelId="HealerSelector"
              onChange={(e) => {
                /* ------------------------------ Spread the rows data for updating ----------------------------- */
                let data = { ...props.rowData };
                /* -------------------- Set the name of the row to the selected from dropdown ------------------- */
                data.name1 = e.target.value;
                /* --------------------- Update the class from the healerinfo local storage --------------------- */
                data.class1 = ls
                  .get("healerInfo")
                  .filter((obj) => {
                    return obj.name === e.target.value;
                  })
                  .map((obj) => obj.class)
                  .toString();
                /* ------------------------------- Reset the cooldown for the row ------------------------------- */
                data.Cooldown1 = undefined;
                /* --------------------------------------- Update the data -------------------------------------- */
                props.onRowDataChange(data);
              }}
              MenuProps={menuStyle}
            >
              {/* ----- Map Healer Names from the healerInfo local storage (created from Heal Team Module) ----- */}
              {ls
                .get("healerInfo")
                .map((key, i) => (
                  <MenuItem style={{ color: classColoursJS(key.class) }} key={i} value={key.name}>
                    <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
                      {classIcons(key.class, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
                      {key.name}
                    </div>
                  </MenuItem>
                ))
                .map((key, i) => [key, <Divider key={i} />])}
              ,
              <MenuItem key={"remove"} value={""}>
                {/* // TODO: Translate */}
                Remove
              </MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },

    {
      title: t("Class"),
      field: "class1",
      // width: "10%",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class1), display: "inline-flex" }}>
          {rowData.class1 === undefined ? "" : classIcons(rowData.class1, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
          {t("CooldownPlanner.Classes." + rowData.class1)}
        </div>
      ),
      /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
      editComponent: (props) => {
        let data = { ...props.rowData };
        return (
          <div style={{ color: classColoursJS(data.class1), display: "inline-flex" }}>
            {data.class1 === undefined ? "" : classIcons(data.class1, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
            {t("CooldownPlanner.Classes." + data.class1)}
          </div>
        );
      },
    },

    {
      /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
      title: t("Cooldown") + " 2",
      field: "Cooldown1",
      width: "8%",
      cellStyle: {
        borderRight: "2px solid #6c6c6c",
        fontSize: 12,
        lineHeight: "normal",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* --------------------- Renders the Ability name that was set for this row. -------------------- */
      render: (rowData) => (
        <div style={{ minminWidth: 105, display: "inline-flex", alignItems: "center", width: "100%" }}>
          <div>
            {abilityIcons(rowData.Cooldown1, {
              height: 30,
              width: 30,
              margin: "0px 4px 0px 0px",
              verticalAlign: "middle",
              border: "1px solid #595959",
              borderRadius: 4,
            })}
          </div>
          <Typography align="center" style={{ fontSize: 12, lineHeight: "normal", width: "100%" }}>
            {t("CooldownPlanner.ClassAbilities." + rowData.Cooldown1)}
          </Typography>
        </div>
      ),
      /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <ThemeProvider theme={selectMenu}>
            <FormControl className={classes.formControl} size="small">
              <Select
                value={rowData.Cooldown1 || props.value}
                labelId="HealerAbilitySelector"
                label={t("Cooldown")}
                onChange={(e) => {
                  props.onChange(e.target.value);
                }}
                MenuProps={menuStyle}
              >
                {ClassCooldownMenuItems(data.class1) || []}
              </Select>
            </FormControl>
          </ThemeProvider>
        );
      },
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 2                               */
    /* -------------------------------------------------------------------------- */

    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "cooldownTime2",
      width: "1%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        fontSize: 12,
        textAlign: "center",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      // Times currently must be entered in the 00:00 format.
      // Currently due to sorting, the user must either use a time, or label the cooldowns, 1, 2, 3, 4 etc to keep them in order.
      // This can probably be handled a lot better than how it handled currently.
      editComponent: (props) => (
        <TextField
          error={RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$").test(props.value) || props.value === undefined ? false : true}
          inputProps={{
            pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
          }}
          InputProps={{
            classes: {
              input: classes.textFieldFontSize,
            },
          }}
          size="small"
          id="standard-basic"
          placeholder="00:00"
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%", marginTop: 6 }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "1%",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "2px solid #595959",
        textAlign: "center",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      render: (rowData) => (
        <div>
          {rowData.Cooldown2 === "" || rowData.Cooldown2 === undefined
            ? ""
            : timeCheck(rowData.cooldownTime2 === "" || rowData.cooldownTime2 === undefined ? rowData.time : rowData.cooldownTime2, rowData.Cooldown2)}
        </div>
      ),
    },
    {
      title: t("Name") + " 3",
      field: "name2",
      width: "6%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        paddingLeft: 8,
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* --------------------- This renders the healer name outside of Edit Mode. --------------------- */
      render: (rowData) => <div style={{ color: classColoursJS(rowData.class2), display: "inline-flex" }}>{rowData.name2}</div>,
      /* ---------- This is the Component for name selection when the table is in edit mode. ---------- */
      editComponent: (props) => (
        <ThemeProvider theme={selectMenu}>
          <FormControl className={classes.formControl} size="small">
            <Select
              value={props.value}
              label={t("Name")}
              labelId="HealerSelector"
              onChange={(e) => {
                /* ------------------------------ Spread the rows data for updating ----------------------------- */
                let data = { ...props.rowData };
                /* -------------------- Set the name of the row to the selected from dropdown ------------------- */
                data.name2 = e.target.value;
                /* --------------------- Update the class from the healerinfo local storage --------------------- */
                data.class2 = ls
                  .get("healerInfo")
                  .filter((obj) => {
                    return obj.name === e.target.value;
                  })
                  .map((obj) => obj.class)
                  .toString();
                /* ------------------------------- Reset the cooldown for the row ------------------------------- */
                data.Cooldown2 = undefined;
                /* --------------------------------------- Update the data -------------------------------------- */
                props.onRowDataChange(data);
              }}
              MenuProps={menuStyle}
            >
              {/* ----- Map Healer Names from the healerInfo local storage (created from Heal Team Module) ----- */}
              {ls
                .get("healerInfo")
                .map((key, i) => (
                  <MenuItem style={{ color: classColoursJS(key.class), display: "inline-flex" }} key={i} value={key.name}>
                    <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
                      {classIcons(key.class, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
                      {key.name}
                    </div>
                  </MenuItem>
                ))
                .map((key, i) => [key, <Divider key={i} />])}
              ,
              <MenuItem key={"remove"} value={""}>
                Remove
              </MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },
    {
      title: t("Class"),
      field: "class2",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class2), display: "inline-flex" }}>
          {rowData.class2 === undefined ? "" : classIcons(rowData.class2, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
          {t("CooldownPlanner.Classes." + rowData.class2)}
        </div>
      ),
      /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
      editComponent: (props) => {
        let data = { ...props.rowData };
        return (
          <div style={{ color: classColoursJS(data.class2), display: "inline-flex" }}>
            {data.class2 === undefined ? "" : classIcons(data.class2, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
            {t("CooldownPlanner.Classes." + data.class2)}
          </div>
        );
      },
    },

    {
      /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
      title: t("Cooldown") + " 3",
      field: "Cooldown2",
      width: "8%",
      cellStyle: {
        borderRight: "2px solid #6c6c6c",
        fontSize: 12,
        lineHeight: "normal",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* --------------------- Renders the Ability name that was set for this row. -------------------- */
      render: (rowData) => (
        <div style={{ minminWidth: 105, display: "inline-flex", alignItems: "center", width: "100%" }}>
          <div>
            {abilityIcons(rowData.Cooldown2, {
              height: 30,
              width: 30,
              margin: "0px 4px 0px 0px",
              verticalAlign: "middle",
              border: "1px solid #595959",
              borderRadius: 4,
            })}
          </div>
          <Typography align="center" style={{ fontSize: 12, lineHeight: "normal", width: "100%" }}>
            {t("CooldownPlanner.ClassAbilities." + rowData.Cooldown2)}
          </Typography>
        </div>
      ),
      /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <ThemeProvider theme={selectMenu}>
            <FormControl className={classes.formControl} size="small">
              <Select
                value={rowData.Cooldown2 || props.value}
                labelId="HealerAbilitySelector"
                label={t("Cooldown")}
                onChange={(e) => {
                  props.onChange(e.target.value);
                }}
                MenuProps={menuStyle}
              >
                {ClassCooldownMenuItems(data.class2) || []}
              </Select>
            </FormControl>
          </ThemeProvider>
        );
      },
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 4                               */
    /* -------------------------------------------------------------------------- */

    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "cooldownTime3",
      width: "1%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        fontSize: 12,
        textAlign: "center",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      // Times currently must be entered in the 00:00 format.
      // Currently due to sorting, the user must either use a time, or label the cooldowns, 1, 2, 3, 4 etc to keep them in order.
      // This can probably be handled a lot better than how it handled currently.
      editComponent: (props) => (
        <TextField
          error={RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$").test(props.value) || props.value === undefined ? false : true}
          inputProps={{
            pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
          }}
          InputProps={{
            classes: {
              input: classes.textFieldFontSize,
            },
          }}
          size="small"
          id="standard-basic"
          placeholder="00:00"
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%", marginTop: 6 }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "1%",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "2px solid #595959",
        textAlign: "center",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      render: (rowData) => (
        <div>
          {rowData.Cooldown3 === "" || rowData.Cooldown3 === undefined
            ? ""
            : timeCheck(rowData.cooldownTime3 === "" || rowData.cooldownTime3 === undefined ? rowData.time : rowData.cooldownTime3, rowData.Cooldown3)}
        </div>
      ),
    },
    {
      title: t("Name") + " 4",
      field: "name3",
      width: "6%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        paddingLeft: 8,
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* --------------------- This renders the healer name outside of Edit Mode. --------------------- */
      render: (rowData) => <div style={{ color: classColoursJS(rowData.class3), display: "inline-flex" }}>{rowData.name3}</div>,
      /* ---------- This is the Component for name selection when the table is in edit mode. ---------- */
      editComponent: (props) => (
        <ThemeProvider theme={selectMenu}>
          <FormControl className={classes.formControl} size="small">
            <Select
              value={props.value}
              label={t("Name")}
              labelId="HealerSelector"
              onChange={(e) => {
                /* ------------------------------ Spread the rows data for updating ----------------------------- */
                let data = { ...props.rowData };
                /* -------------------- Set the name of the row to the selected from dropdown ------------------- */
                data.name3 = e.target.value;
                /* --------------------- Update the class from the healerinfo local storage --------------------- */
                data.class3 = ls
                  .get("healerInfo")
                  .filter((obj) => {
                    return obj.name === e.target.value;
                  })
                  .map((obj) => obj.class)
                  .toString();
                /* ------------------------------- Reset the cooldown for the row ------------------------------- */
                data.Cooldown3 = undefined;
                /* --------------------------------------- Update the data -------------------------------------- */
                props.onRowDataChange(data);
              }}
              MenuProps={menuStyle}
            >
              {/* ----- Map Healer Names from the healerInfo local storage (created from Heal Team Module) ----- */}
              {ls
                .get("healerInfo")
                .map((key, i) => (
                  <MenuItem style={{ color: classColoursJS(key.class) }} key={i} value={key.name}>
                    <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
                      {classIcons(key.class, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
                      {key.name}
                    </div>
                  </MenuItem>
                ))
                .map((key, i) => [key, <Divider key={i} />])}
              ,
              <MenuItem key={"remove"} value={""}>
                Remove
              </MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },

    {
      title: t("Class"),
      field: "class3",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class3), display: "inline-flex" }}>
          {rowData.class3 === undefined ? "" : classIcons(rowData.class3, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
          {t("CooldownPlanner.Classes." + rowData.class3)}
        </div>
      ),
      /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
      editComponent: (props) => {
        let data = { ...props.rowData };
        return (
          <div style={{ color: classColoursJS(data.class3), display: "inline-flex" }}>
            {data.class3 === undefined ? "" : classIcons(data.class3, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
            {t("CooldownPlanner.Classes." + data.class3)}
          </div>
        );
      },
    },

    {
      /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
      title: t("Cooldown") + " 4",
      field: "Cooldown3",
      width: "8%",
      cellStyle: {
        borderRight: "2px solid #6c6c6c",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* --------------------- Renders the Ability name that was set for this row. -------------------- */
      render: (rowData) => (
        <div style={{ minminWidth: 105, display: "inline-flex", alignItems: "center", width: "100%" }}>
          <div>
            {abilityIcons(rowData.Cooldown3, {
              height: 30,
              width: 30,
              margin: "0px 4px 0px 0px",
              verticalAlign: "middle",
              border: "1px solid #595959",
              borderRadius: 4,
            })}
          </div>
          <Typography align="center" style={{ fontSize: 12, lineHeight: "normal", width: "100%" }}>
            {t("CooldownPlanner.ClassAbilities." + rowData.Cooldown3)}
          </Typography>
        </div>
      ),
      /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <ThemeProvider theme={selectMenu}>
            <FormControl className={classes.formControl} size="small">
              <Select
                value={rowData.Cooldown3 || props.value}
                labelId="HealerAbilitySelector"
                label={t("Cooldown")}
                onChange={(e) => {
                  props.onChange(e.target.value);
                }}
                MenuProps={menuStyle}
              >
                {ClassCooldownMenuItems(data.class3) || []}
              </Select>
            </FormControl>
          </ThemeProvider>
        );
      },
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 5                               */
    /* -------------------------------------------------------------------------- */

    {
      /* --- The Cast Time Column. This is where the time the user expects the cooldown to be cast. --- */
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "cooldownTime4",
      width: "1%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        fontSize: 12,
        textAlign: "center",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      // Times currently must be entered in the 00:00 format.
      // Currently due to sorting, the user must either use a time, or label the cooldowns, 1, 2, 3, 4 etc to keep them in order.
      // This can probably be handled a lot better than how it handled currently.
      editComponent: (props) => (
        <TextField
          error={RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$").test(props.value) || props.value === undefined ? false : true}
          inputProps={{
            pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
          }}
          InputProps={{
            classes: {
              input: classes.textFieldFontSize,
            },
          }}
          size="small"
          id="standard-basic"
          placeholder="00:00"
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%", marginTop: 6 }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      /* ----- Render only, should the user when the cooldown will be available again to be used. ----- */
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "1%",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "2px solid #595959",
        textAlign: "center",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      render: (rowData) => (
        <div>
          {rowData.Cooldown4 === "" || rowData.Cooldown4 === undefined
            ? ""
            : timeCheck(rowData.cooldownTime4 === "" || rowData.cooldownTime4 === undefined ? rowData.time : rowData.cooldownTime4, rowData.Cooldown4)}
        </div>
      ),
    },
    {
      title: t("Name") + " 5",
      field: "name4",
      width: "6%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        paddingLeft: 8,
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* --------------------- This renders the healer name outside of Edit Mode. --------------------- */
      render: (rowData) => <div style={{ color: classColoursJS(rowData.class4), display: "inline-flex" }}>{rowData.name4}</div>,
      /* ---------- This is the Component for name selection when the table is in edit mode. ---------- */
      editComponent: (props) => (
        <ThemeProvider theme={selectMenu}>
          <FormControl className={classes.formControl} size="small">
            <Select
              value={props.value}
              label={t("Name")}
              labelId="HealerSelector"
              onChange={(e) => {
                /* ------------------------------ Spread the rows data for updating ----------------------------- */
                let data = { ...props.rowData };
                /* -------------------- Set the name of the row to the selected from dropdown ------------------- */
                data.name4 = e.target.value;
                /* --------------------- Update the class from the healerinfo local storage --------------------- */
                data.class4 = ls
                  .get("healerInfo")
                  .filter((obj) => {
                    return obj.name === e.target.value;
                  })
                  .map((obj) => obj.class)
                  .toString();
                /* ------------------------------- Reset the cooldown for the row ------------------------------- */
                data.Cooldown4 = undefined;
                /* --------------------------------------- Update the data -------------------------------------- */
                props.onRowDataChange(data);
              }}
              MenuProps={menuStyle}
            >
              {/* ----- Map Healer Names from the healerInfo local storage (created from Heal Team Module) ----- */}
              {ls
                .get("healerInfo")
                .map((key, i) => (
                  <MenuItem style={{ color: classColoursJS(key.class), display: "inline-flex" }} key={i} value={key.name}>
                    <div style={{ display: "inline-flex", alignItems: "center", width: "100%" }}>
                      {classIcons(key.class, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
                      {key.name}
                    </div>
                  </MenuItem>
                ))
                .map((key, i) => [key, <Divider key={i} />])}
              ,
              <MenuItem key={"remove"} value={""}>
                Remove
              </MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },

    {
      title: t("Class"),
      field: "class4",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* -------------- Renders the Name for the healer in the relevant row in the data. -------------- */
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class4), display: "inline-flex" }}>
          {rowData.class3 === undefined ? "" : classIcons(rowData.class4, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
          {t("CooldownPlanner.Classes." + rowData.class4)}
        </div>
      ),
      /* ----------------------- Shows the selected healers class in edit mode. ----------------------- */
      editComponent: (props) => {
        let data = { ...props.rowData };
        return (
          <div style={{ color: classColoursJS(data.class4), display: "inline-flex" }}>
            {data.class4 === undefined ? "" : classIcons(data.class4, { height: 20, width: 20, padding: "0px 5px 0px 5px", verticalAlign: "middle" })}
            {t("CooldownPlanner.Classes." + data.class4)}
          </div>
        );
      },
    },

    {
      /* ------------------------------ The Column for Cooldown Selection ----------------------------- */
      title: t("Cooldown") + " 5",
      field: "Cooldown4",
      width: "8%",
      cellStyle: {
        borderRight: "2px solid #6c6c6c",
        fontSize: 12,
        lineHeight: "normal",
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      /* --------------------- Renders the Ability name that was set for this row. -------------------- */
      render: (rowData) => (
        <div style={{ minminWidth: 105, display: "inline-flex", alignItems: "center", width: "100%" }}>
          <div>
            {abilityIcons(rowData.Cooldown4, {
              height: 30,
              width: 30,
              margin: "0px 4px 0px 0px",
              verticalAlign: "middle",
              border: "1px solid #595959",
              borderRadius: 4,
            })}
          </div>
          <Typography align="center" style={{ fontSize: 12, lineHeight: "normal", width: "100%" }}>
            {t("CooldownPlanner.ClassAbilities." + rowData.Cooldown4)}
          </Typography>
        </div>
      ),
      /* --------------- The Edit Mode Component. Generated based off the healers class. -------------- */
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <ThemeProvider theme={selectMenu}>
            <FormControl className={classes.formControl} size="small">
              <Select
                value={rowData.Cooldown4 || props.value}
                labelId="HealerAbilitySelector"
                label={t("Cooldown")}
                onChange={(e) => {
                  props.onChange(e.target.value);
                }}
                MenuProps={menuStyle}
              >
                {ClassCooldownMenuItems(data.class4) || []}
              </Select>
            </FormControl>
          </ThemeProvider>
        );
      },
    },

    {
      /* -------------- Input Notes for the cooldown. I.e "Use just before this ability" -------------- */
      title: t("CooldownPlanner.TableLabels.NotesLabel"),
      field: "notes",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid #595959",
        fontSize: 12,
      },
      headerStyle: { borderRight: "1px solid #6c6c6c" },
      editComponent: (props) => (
        <TextField
          style={{ width: "100%", marginTop: 6 }}
          size="small"
          InputProps={{
            classes: {
              input: classes.textFieldFontSize,
            },
          }}
          id="standard-basic"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
  ];

  /* ------ Generates the blank plan arrays in the local storage if they don't exist already. ----- */
  useEffect(() => {
    bossList.map((key) => {
      if (ls.get(key.zoneID + "." + key.DungeonEncounterID + ".1") === null) {
        ls.set(key.zoneID + "." + key.DungeonEncounterID + ".1", []);
      }
      if (ls.get(key.zoneID + "." + key.DungeonEncounterID + ".2") === null) {
        ls.set(key.zoneID + "." + key.DungeonEncounterID + ".2", []);
      }
      if (ls.get(key.zoneID + "." + key.DungeonEncounterID + ".3") === null) {
        ls.set(key.zoneID + "." + key.DungeonEncounterID + ".3", []);
      }
    });
    if (ls.get("healerInfo") === null || ls.get("healerInfo") === undefined) {
      ls.set("healerInfo", []);
    }
  });

  /* ------------- When the currently loaded data is updated the props.update function ------------ */
  /* ------------- passed from the cooldown planner module will update the state also. ------------ */
  useEffect(() => {
    props.update(data);
  }, [data]);

  /* ------- Sets the localization of the table based on the users selected language in i18 ------- */
  let curLang = () => {
    if (currentLanguage === "en") {
      return localizationEN;
    } else if (currentLanguage === "ru") {
      return localizationRU;
    } else if (currentLanguage === "ch") {
      return localizationCH;
    } else if (currentLanguage === "fr") {
      return localizationFR;
    }
  };

  return (
    <ThemeProvider theme={themeCooldownTable}>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={data}
        style={{
          padding: 10,
        }}
        /* ---------------------- Option to make cell editable by clicking on cell ---------------------- */
        /* ------------------- Not currently Implemented, Code here for future options ------------------ */
        // cellEditable={{
        //   onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
        //     return new Promise((resolve, reject) => {
        //       console.log('newValue: ' + newValue);
        //       setTimeout(resolve, 1000);
        //     });
        //   }
        // }}
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
            if (index % 2) {
              return {
                height: 30,
                backgroundColor: "#515151",
                border: "1px solid #595959",
              };
            }
            return {
              height: 30,
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
        localization={curLang()}
        /* --------------------------------- Customized Table Components -------------------------------- */
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Body: (props) =>
            /* ------------------------ If no boss selected then hide the Table Body ------------------------ */
            currentBoss === "" ? null : (
              <Grow in={currentBoss === "" ? false : true} style={{ transformOrigin: "0 0 0" }} {...((currentBoss === "" ? false : true) ? { timeout: "auto" } : {})}>
                <MTableBody {...props} />
              </Grow>
            ),
          Header: (props) =>
            /* ----------------------- If no Boss Selected then hide the Table Header ----------------------- */
            currentBoss === "" ? null : (
              <Grow in={currentBoss === "" ? false : true} style={{ transformOrigin: "0 0 0" }} {...((currentBoss === "" ? false : true) ? { timeout: "auto" } : {})}>
                <MTableHeader {...props} />
              </Grow>
            ),
          Toolbar: (props) => (
            /* ----------------------- Grid Container for the Toolbar for the Table ------------------------ */
            <Grid
              container
              spacing={1}
              direction="row"
              justify="space-between"
              style={{
                marginBottom: (currentBoss === "" ? false : true) ? 5 : 0,
              }}
            >
              {/* ------------------- Container for the Heal Team / ERT & Raid/Boss/Plan Selection ------------------- */}
              <Grid item container spacing={1} xs={12} sm={12} md={12} lg={6} xl={9} alignItems="center">
                {/* ------------------------ Heal Team Button (Activates the Dialog Popup) ----------------------- */}
                <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                  <Button variant="outlined" style={{ height: 40, width: "100%", whiteSpace: "nowrap" }} color="primary" onClick={() => healTeamDialogOpen()}>
                    {/* // TODO: Translate */}
                    Heal Team
                  </Button>
                </Grid>
                {/* ---------------------------------- Raid Selection Drop Down ---------------------------------- */}
                {/* <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                  <FormControl style={{ minWidth: 200, width: "100%" }} variant="outlined" size="small">
                    <InputLabel id="RaidSelector">{t("CooldownPlanner.TableLabels.RaidSelectorLabel")}</InputLabel>
                    <Select
                      labelId="RaidSelector"
                      value={currentRaid}
                      onChange={(e) => setCurrentRaid(e.target.value)}
                      label={t("CooldownPlanner.TableLabels.RaidSelectorLabel")}
                      MenuProps={menuStyle}
                    >
                      {rl
                        .map((key, i) => (
                          <MenuItem key={"RS" + i} value={key.zoneID}>
                            {key.raidName}
                          </MenuItem>
                        ))
                        .map((key, i) => [key, <Divider key={i} />])}
                    </Select>
                  </FormControl>
                </Grid> */}
                {/* ----------------------------------- Boss Selection Dropdown ---------------------------------- */}
                <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                  <FormControl style={{ minWidth: 200, width: "100%" }} variant="outlined" size="small" disabled={currentRaid === "" ? true : false}>
                    <InputLabel id="BossSelector">{t("CooldownPlanner.TableLabels.BossSelectorLabel")}</InputLabel>
                    <Select labelId="BossSelector" value={currentBoss} onChange={(e) => changeBoss(e.target.value)} label={t("CooldownPlanner.TableLabels.BossSelectorLabel")} MenuProps={menuStyle}>
                      {bossList
                        .filter((obj) => {
                          return obj.zoneID === currentRaid;
                        })
                        .map((key, i) => (
                          <MenuItem key={"BS" + i} value={key.DungeonEncounterID}>
                            {bossIcons(key.DungeonEncounterID)}
                            {t("BossNames." + key.ID)}
                          </MenuItem>
                        ))
                        .map((key, i) => [key, <Divider key={i} />])}
                    </Select>
                  </FormControl>
                </Grid>

                {/* ----------------------------------- Plan Selection Dropdown ---------------------------------- */}

                <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                  <FormControl style={{ minWidth: 200, width: "100%" }} variant="outlined" size="small" disabled={currentBoss === "" ? true : false}>
                    <InputLabel id="RaidSelector">{t("Select Plan")}</InputLabel>
                    <Select labelId="RaidSelector" label={t("Select Plan")} value={currentPlan} onChange={(e) => loadPlanData(currentBoss, e.target.value)}>
                      {getBossPlanNames(currentBoss).map((key) => (
                        <MenuItem value={key}>{key}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                  <Button key={8} variant="contained" color="primary" onClick={handleAddPlanDialogClickOpen} size="small">
                    Add
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                  <ThemeProvider theme={deleteTheme}>
                    <Button
                      key={8}
                      variant="contained"
                      color="primary"
                      onClick={handleDeletePlanDialogClickOpen}
                      size="small"
                      disabled={currentPlan === "" || currentPlan === "default" ? true : false}
                    >
                      Delete
                    </Button>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                  <ImportPlanDialog variant="outlined" disableElevation={true} buttonLabel="Import" color="primary" cooldownObject={cooldownObject} loadPlanData={loadPlanData} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                  <ExportPlanDialog variant="outlined" disableElevation={true} buttonLabel="Export" data={data} color="primary" boss={currentBoss} planName={currentPlan} plan={data} />
                </Grid>

                {/* ----------------------------- ERT Note Button (Opens ERT Dialog) ----------------------------- */}

                <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                  <Button color="primary" variant="outlined" style={{ height: 40, whiteSpace: "nowrap", width: "100%" }} onClick={() => ertDialogOpen()}>
                    ERT Note
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={12} lg={6} xl={3}>
                {currentBoss === "" ? null : (
                  <ThemeProvider theme={SearchFieldOverride}>
                    <MTableToolbar {...props} />
                  </ThemeProvider>
                )}
              </Grid>
            </Grid>
          ),
        }}
        /* ------------------- These are how the table updates its data from edit mode ------------------ */
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                /* ------------------ Spread Current Data and the New Data into updated Object (Sorted) ------------------ */
                setData([...data, newData].sort((a, b) => (a.time > b.time ? 1 : -1)));
                resolve();
                /* ------------------------------------ Update local storage ------------------------------------ */
                updateStorage(currentBoss, currentPlan, [...data, newData]);
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
                /* ---------------------------------- Set Updated Data (Sorted) --------------------------------- */
                setData([...dataUpdate].sort((a, b) => (a.time > b.time ? 1 : -1)));
                /* ------------------------------------ Update local storage ------------------------------------ */
                updateStorage(currentBoss, currentPlan, [...dataUpdate]);
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
                /* -------------------------- Set the New Data without the spliced row -------------------------- */
                setData([...dataDelete].sort((a, b) => (a.time > b.time ? 1 : -1)));
                /* ------------------------------------ Update local storage ------------------------------------ */
                updateStorage(currentBoss, currentPlan, [...dataDelete]);
                resolve();
              }, 1000);
            }),
        }}
      />

      <AddPlanDialog openAddPlanDialog={openAddPlanDialog} handleAddPlanDialogClose={handleAddPlanDialogClose} cooldownObject={cooldownObject} currentBoss={currentBoss} loadPlanData={loadPlanData} />

      <DeletePlanDialog
        openDeletePlanDialog={openDeletePlanDialog}
        handleDeletePlanDialogClose={handleDeletePlanDialogClose}
        currentPlan={currentPlan}
        setCurrentPlan={setCurrentPlan}
        setData={setData}
        cooldownObject={cooldownObject}
        currentBoss={currentBoss}
      />
    </ThemeProvider>
  );
}
