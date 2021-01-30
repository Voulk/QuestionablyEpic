import React, { useEffect, forwardRef } from "react";
import MaterialTable, { MTableToolbar, MTableBody, MTableHeader } from "material-table";
import ClassCooldownMenuItems from "../Menus/ClassCooldownMenuItems";
import { AddBox, ArrowDownward, Check, Clear, DeleteOutline, Edit, FilterList, Search } from "@material-ui/icons";
import { Button, TextField, InputLabel, FormControl, Grow, MenuItem, Divider, Paper, Select, Grid } from "@material-ui/core";
import { ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { healerCooldownsDetailed, raidList, bossList, bossAbilities } from "../Data/Data";
import { classColoursJS } from "../Functions/ClassColourFunctions";
import { useTranslation } from "react-i18next";
import { localizationFR } from "../../../locale/fr/TableLocale";
import { localizationEN } from "../../../locale/en/TableLocale";
import { localizationRU } from "../../../locale/ru/TableLocale";
import { localizationCH } from "../../../locale/ch/TableLocale";
import abilityIcons from "../Functions/IconFunctions/AbilityIcons";
import bossIcons from "../Functions/IconFunctions/BossIcons";
import bossAbilityIcons from "../Functions/IconFunctions/BossAbilityIcons";
import classIcons from "../Functions/IconFunctions/ClassIcons";
import ls from "local-storage";

const useStyles = makeStyles((theme) => ({
  formControl: {
    whiteSpace: "nowrap",
    width: "100%",
  },
}));

const themeCooldownTable = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: "4px 4px 4px 4px",
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
      border: "1px solid rgba(255, 255, 255, 0.23)",
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
  const { useState } = React;
  const currentLanguage = i18n.language;
  const rl = raidList;
  const setData = props.dataUpdateHandler;
  const currentBoss = props.currentBoss;
  const currentRaid = props.currentRaid;
  const currentPlan = props.currentPlan;
  const currentData = props.data;
  const handleChangeRaid = props.raidHandler;
  const handleChangeBoss = props.bossHandler;
  const handleChangePlan = props.planHandler;
  const ertDialogOpen = props.ertDialogOpen;
  const healTeamDialogOpen = props.healTeamDialogOpen;

  const timeCheck = (rowData, cooldown) => {
    let time = moment(rowData.time, "mm:ss")
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

    if (time === "Invalid date") {
      return "Invalid Time";
    }
    return time;
  };

  let columns = [
    // Healer Name Column. Contains the Drop Down of Healer names generated from the Heal Team.
    {
      // The Cast Time Column. This is where the time the user expects the cooldown to be cast.
      title: t("CooldownPlanner.TableLabels.CastTimeLabel"),
      field: "time",
      width: "6%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      // Times currently must be entered in the 00:00 format.
      // Currently due to sorting, the user must either use a time, or label the cooldowns, 1, 2, 3, 4 etc to keep them in order.
      // This can probably be handled a lot better than how it handled currently.
      editComponent: (props) => (
        <TextField
          error={RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$").test(props.value) || props.value === undefined ? false : true}
          inputProps={{
            pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
          }}
          size="small"
          variant="outlined"
          id="standard-basic"
          label={t("CooldownPlanner.TableLabels.CastTimeLabel")}
          placeholder="00:00"
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%", marginTop: 6 }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      // Here the user can select which ability the cooldown should cover.
      title: t("CooldownPlanner.TableLabels.BossAbilityLabel"),
      field: "bossAbility",
      width: "15%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => (
        <div>
          <a data-wowhead={"spell=" + rowData.bossAbility + "&domain=" + currentLanguage}>{bossAbilityIcons(rowData.bossAbility)}</a>
          {t("CooldownPlanner.BossAbilities." + rowData.bossAbility)}
        </div>
      ),
      editComponent: (props) => (
        <ThemeProvider theme={themeCooldownTable}>
          <FormControl className={classes.formControl} variant="outlined" size="small" style={{ marginTop: 6 }}>
            <InputLabel id="BossAbilitySelector">{t("CooldownPlanner.TableLabels.BossAbilityLabel")}</InputLabel>
            <Select
              value={props.value}
              labelId="BossAbilitySelector"
              label={t("CooldownPlanner.TableLabels.BossAbilityLabel")}
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
                    <a data-wowhead={"spell=" + key.guid + "&domain=" + currentLanguage}>{bossAbilityIcons(key.guid)}</a>
                    {t("CooldownPlanner.BossAbilities." + key.guid)}
                  </MenuItem>
                ))
                .map((key) => [key, <Divider />])}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 0                               */
    /* -------------------------------------------------------------------------- */
    {
      title: t("Name"),
      field: "name",
      width: "7%",
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: 8,
      },
      // This renders the healer name outside of Edit Mode.
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {rowData.name}
          {rowData.class === undefined ? "" : classIcons(rowData.class, 20)}
        </div>
      ),
      // This is the Component for name selection when the table is in edit mode.
      editComponent: (props) => (
        <ThemeProvider theme={themeCooldownTable}>
          <FormControl className={classes.formControl} variant="outlined" size="small" style={{ marginTop: 6 }}>
            <InputLabel id="HealerSelector">{t("Name")}</InputLabel>
            <Select
              value={props.value}
              label={t("Name")}
              labelId="HealerSelector"
              onChange={(e) => {
                let data = { ...props.rowData };
                data.name = e.target.value;
                data.class = ls
                  .get("healerInfo")
                  .filter((obj) => {
                    return obj.name === e.target.value;
                  })
                  .map((obj) => obj.class)
                  .toString();
                data.Cooldown = "NoCD";
                props.onRowDataChange(data);
              }}
              MenuProps={menuStyle}
            >
              {ls
                .get("healerInfo")
                .map((key, i) => (
                  <MenuItem style={{ color: classColoursJS(key.class) }} key={i} value={key.name}>
                    {key.name}
                    {classIcons(key.class, 20)}
                  </MenuItem>
                ))
                .map((key) => [key, <Divider />])}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },
    // Class column. This is generated from the selected healer from the Name column.
    {
      title: t("Class"),
      field: "class",
      width: "10%",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
      },
      // Renders the Name for the healer in the relevant row in the data.
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {rowData.class === undefined ? "" : classIcons(rowData.class, 20)}
          {t("CooldownPlanner.Classes." + rowData.class)}
        </div>
      ),
      // Shows the selected healers class in edit mode.
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <div style={{ color: classColoursJS(data.class) }}>
            {data.class === undefined ? "" : classIcons(data.class, 20)}
            {t("CooldownPlanner.Classes." + data.class)}
          </div>
        );
      },
    },
    {
      // The Column for Cooldown Selection
      title: t("Cooldown"),
      field: "Cooldown",
      width: "12%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      // Renders the Ability name that was set for this row.
      render: (rowData) => (
        <div>
          {abilityIcons(rowData.Cooldown)}
          {t("CooldownPlanner.ClassAbilities." + rowData.Cooldown)}
        </div>
      ),
      // The Edit Mode Component. Generated based off the healers class.
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <FormControl className={classes.formControl} variant="outlined" size="small" style={{ marginTop: 6 }}>
            <InputLabel id="HealerAbilitySelector">{t("Cooldown")}</InputLabel>
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
        );
      },
    },
    {
      // Render only, should the user when the cooldown will be available again to be used.
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "4%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => <div>{timeCheck(rowData, rowData.cooldown)}</div>,
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 1                               */
    /* -------------------------------------------------------------------------- */
    {
      title: t("Name"),
      field: "name1",
      width: "7%",
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: 8,
      },
      // This renders the healer name outside of Edit Mode.
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class1) }}>
          {rowData.name1}
          {rowData.class1 === undefined ? "" : classIcons(rowData.class1, 20)}
        </div>
      ),
      // This is the Component for name selection when the table is in edit mode.
      editComponent: (props) => (
        <ThemeProvider theme={themeCooldownTable}>
          <FormControl className={classes.formControl} variant="outlined" size="small" style={{ marginTop: 6 }}>
            <InputLabel id="HealerSelector">{t("Name")}</InputLabel>
            <Select
              value={props.value}
              label={t("Name")}
              labelId="HealerSelector"
              onChange={(e) => {
                let data = { ...props.rowData };
                data.name1 = e.target.value;
                data.class1 = ls
                  .get("healerInfo")
                  .filter((obj) => {
                    return obj.name === e.target.value;
                  })
                  .map((obj) => obj.class)
                  .toString();
                data.Cooldown1 = "NoCD";
                props.onRowDataChange(data);
              }}
              MenuProps={menuStyle}
            >
              {ls
                .get("healerInfo")
                .map((key, i) => (
                  <MenuItem key={i} value={key.name}>
                    {key.name}
                  </MenuItem>
                ))
                .map((key) => [key, <Divider />])}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },

    {
      title: t("Class"),
      field: "class1",
      width: "10%",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
      },
      // Renders the Name for the healer in the relevant row in the data.
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class1) }}>
          {rowData.class1 === undefined ? "" : classIcons(rowData.class1, 20)}
          {t("CooldownPlanner.Classes." + rowData.class1)}
        </div>
      ),
      // Shows the selected healers class in edit mode.
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <div style={{ color: classColoursJS(data.class1) }}>
            {data.class1 === undefined ? "" : classIcons(data.class1, 20)}
            {t("CooldownPlanner.Classes." + data.class1)}
          </div>
        );
      },
    },

    {
      // The Column for Cooldown Selection
      title: t("Cooldown"),
      field: "Cooldown1",
      width: "12%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      // Renders the Ability name that was set for this row.
      render: (rowData) => (
        <div>
          {abilityIcons(rowData.Cooldown1)}
          {t("CooldownPlanner.ClassAbilities." + rowData.Cooldown1)}
        </div>
      ),
      // The Edit Mode Component. Generated based off the healers class.
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <FormControl className={classes.formControl} variant="outlined" size="small" style={{ marginTop: 6 }}>
            <InputLabel id="HealerAbilitySelector">{t("Cooldown")}</InputLabel>
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
        );
      },
    },

    {
      // Render only, should the user when the cooldown will be available again to be used.
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "4%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => <div>{timeCheck(rowData, rowData.cooldown1)}</div>,
    },

    /* -------------------------------------------------------------------------- */
    /*                               Cooldown Set 2                               */
    /* -------------------------------------------------------------------------- */
    {
      title: t("Name"),
      field: "name2",
      width: "7%",
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: 8,
      },
      // This renders the healer name outside of Edit Mode.
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class2) }}>
          {rowData.name2}
          {rowData.class2 === undefined ? "" : classIcons(rowData.class2, 20)}
        </div>
      ),
      // This is the Component for name selection when the table is in edit mode.
      editComponent: (props) => (
        <ThemeProvider theme={themeCooldownTable}>
          <FormControl className={classes.formControl} variant="outlined" size="small" style={{ marginTop: 6 }}>
            <InputLabel id="HealerSelector">{t("Name")}</InputLabel>
            <Select
              value={props.value}
              label={t("Name")}
              labelId="HealerSelector"
              onChange={(e) => {
                let data = { ...props.rowData };
                data.name1 = e.target.value;
                data.class1 = ls
                  .get("healerInfo")
                  .filter((obj) => {
                    return obj.name === e.target.value;
                  })
                  .map((obj) => obj.class)
                  .toString();
                data.Cooldown2 = "NoCD";
                props.onRowDataChange(data);
              }}
              MenuProps={menuStyle}
            >
              {ls
                .get("healerInfo")
                .map((key, i) => (
                  <MenuItem key={i} value={key.name}>
                    {key.name}
                  </MenuItem>
                ))
                .map((key) => [key, <Divider />])}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },

    {
      title: t("Class"),
      field: "class2",
      width: "10%",
      hidden: true,
      cellStyle: {
        whiteSpace: "nowrap",
      },
      // Renders the Name for the healer in the relevant row in the data.
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class2) }}>
          {rowData.class2 === undefined ? "" : classIcons(rowData.class2, 20)}
          {t("CooldownPlanner.Classes." + rowData.class2)}
        </div>
      ),
      // Shows the selected healers class in edit mode.
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <div style={{ color: classColoursJS(data.class2) }}>
            {data.class2 === undefined ? "" : classIcons(data.class2, 20)}
            {t("CooldownPlanner.Classes." + data.class2)}
          </div>
        );
      },
    },

    {
      // The Column for Cooldown Selection
      title: t("Cooldown"),
      field: "Cooldown2",
      width: "12%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      // Renders the Ability name that was set for this row.
      render: (rowData) => (
        <div>
          {abilityIcons(rowData.Cooldown2)}
          {t("CooldownPlanner.ClassAbilities." + rowData.Cooldown2)}
        </div>
      ),
      // The Edit Mode Component. Generated based off the healers class.
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <FormControl className={classes.formControl} variant="outlined" size="small" style={{ marginTop: 6 }}>
            <InputLabel id="HealerAbilitySelector">{t("Cooldown")}</InputLabel>
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
        );
      },
    },

    {
      // Render only, should the user when the cooldown will be available again to be used.
      title: t("CooldownPlanner.TableLabels.OffCooldownLabel"),
      width: "4%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => <div>{timeCheck(rowData, rowData.cooldown2)}</div>,
    },

    {
      // Under Input Notes for the cooldown. I.e "Use just before this ability" or something else they wish to note.
      title: t("CooldownPlanner.TableLabels.NotesLabel"),
      field: "notes",
      width: "20%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      editComponent: (props) => (
        <TextField
          style={{ width: "100%", marginTop: 6 }}
          size="small"
          variant="outlined"
          id="standard-basic"
          label={t("CooldownPlanner.TableLabels.NotesLabel")}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
  ];

  // Generates the blank plan arrays in the local storage if they don't exist already.
  useEffect(() => {
    bossList.map((key) => {
      if (ls.get(key.zoneID + "." + key.id + ".1") === null) {
        ls.set(key.zoneID + "." + key.id + ".1", []);
      }
      if (ls.get(key.zoneID + "." + key.id + ".2") === null) {
        ls.set(key.zoneID + "." + key.id + ".2", []);
      }
      if (ls.get(key.zoneID + "." + key.id + ".3") === null) {
        ls.set(key.zoneID + "." + key.id + ".3", []);
      }
    });
    if (ls.get("healerInfo") === null || ls.get("healerInfo") === undefined) {
      ls.set("healerInfo", []);
    }
  });

  // When the currently loaded data is updated the props.update function passed from the cooldown planner module will update the state also.
  useEffect(() => {
    props.update(currentData);
  }, [currentData]);

  // Sets the localization of the table based on the users selected language in i18
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

  let updateStorage = (props) => {
    if (ls.get(currentRaid + "." + currentBoss + "." + currentPlan) === null) {
      ls.set(currentRaid + "." + currentBoss + "." + currentPlan, []);
    }
    ls.set(
      currentRaid + "." + currentBoss + "." + currentPlan,
      props.sort((a, b) => (a.time > b.time ? 1 : -1)),
    );
  };

  return (
    <ThemeProvider theme={themeCooldownTable}>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={currentData}
        style={{
          padding: 10,
        }}
        options={{
          showTitle: false,
          searchFieldVariant: "outlined",
          headerStyle: {
            border: "1px solid #c8b054",
            padding: "0px 8px 0px 8px",
            backgroundColor: "#c8b054",
            color: "#000",
            whiteSpace: "nowrap",
          },
          rowStyle: (rowData, index) => {
            if (index % 2) {
              return {
                backgroundColor: "#515151",
                border: "1px solid #515151",
              };
            }
            return {
              border: "1px solid #515151",
            };
          },
          actionCellStyle: {
            borderBottom: "1px solid #515151",
          },
          actionsColumnIndex: 12,
          paging: false,
        }}
        localization={curLang()}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Body: (props) =>
            currentBoss === "" ? null : (
              <Grow in={currentBoss === "" ? false : true} style={{ transformOrigin: "0 0 0" }} {...((currentBoss === "" ? false : true) ? { timeout: "auto" } : {})}>
                <MTableBody {...props} />
              </Grow>
            ),
          Header: (props) =>
            currentBoss === "" ? null : (
              <Grow in={currentBoss === "" ? false : true} style={{ transformOrigin: "0 0 0" }} {...((currentBoss === "" ? false : true) ? { timeout: "auto" } : {})}>
                <MTableHeader {...props} />
              </Grow>
            ),
          Toolbar: (props) => (
            <div>
              <Grid
                container
                spacing={1}
                direction="row"
                justify="space-between"
                style={{
                  marginBottom: (currentBoss === "" ? false : true) ? 5 : 0,
                }}
              >
                <Grid item container spacing={1} xs={7} alignItems="center" wrap="nowrap">
                  <Grid item xs="auto">
                    <Button variant="outlined" style={{ height: 40, whiteSpace: "nowrap" }} color="primary" onClick={() => healTeamDialogOpen()}>
                      Heal Team
                    </Button>
                  </Grid>
                  <Grid item xs="auto">
                    <FormControl style={{ minWidth: 200 }} variant="outlined" size="small">
                      <InputLabel id="RaidSelector">{t("CooldownPlanner.TableLabels.RaidSelectorLabel")}</InputLabel>
                      <Select
                        labelId="RaidSelector"
                        value={currentRaid}
                        onChange={(e) => handleChangeRaid(e.target.value)}
                        label={t("CooldownPlanner.TableLabels.RaidSelectorLabel")}
                        MenuProps={menuStyle}
                      >
                        {rl
                          .map((key, i) => (
                            <MenuItem key={"RS" + i} value={key.zoneID}>
                              {key.raidName}
                            </MenuItem>
                          ))
                          .map((key) => [key, <Divider />])}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs="auto">
                    <FormControl style={{ minWidth: 200 }} variant="outlined" size="small" disabled={currentRaid === "" ? true : false}>
                      <InputLabel id="BossSelector">{t("CooldownPlanner.TableLabels.BossSelectorLabel")}</InputLabel>
                      <Select
                        labelId="BossSelector"
                        value={currentBoss}
                        onChange={(e) => handleChangeBoss(e.target.value)}
                        label={t("CooldownPlanner.TableLabels.BossSelectorLabel")}
                        MenuProps={menuStyle}
                      >
                        {bossList
                          .filter((obj) => {
                            return obj.zoneID === currentRaid;
                          })
                          .map((key, i) => (
                            <MenuItem key={"BS" + i} value={key.id}>
                              {bossIcons(key.id)}
                              {key.name}
                            </MenuItem>
                          ))
                          .map((key) => [key, <Divider />])}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs="auto">
                    <FormControl style={{ minWidth: 200 }} variant="outlined" size="small" disabled={currentBoss === "" ? true : false}>
                      <InputLabel id="RaidSelector">{t("Select Plan")}</InputLabel>
                      <Select labelId="RaidSelector" label={t("Select Plan")} value={currentPlan} onChange={(e) => handleChangePlan(e.target.value)}>
                        <MenuItem value={1}>Plan 1</MenuItem>
                        <Divider />
                        <MenuItem value={2}>Plan 2</MenuItem>
                        <Divider />
                        <MenuItem value={3}>Plan 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs="auto">
                    <Button color="primary" variant="outlined" style={{ height: 40, whiteSpace: "nowrap" }} onClick={() => ertDialogOpen()}>
                      ERT Note
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs="auto">
                  {currentBoss === "" ? null : (
                    <ThemeProvider theme={SearchFieldOverride}>
                      <MTableToolbar {...props} />
                    </ThemeProvider>
                  )}
                </Grid>
              </Grid>
            </div>
          ),
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...currentData, newData].sort((a, b) => (a.time > b.time ? 1 : -1)));
                resolve();
                updateStorage([...currentData, newData], currentBoss);
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...currentData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate].sort((a, b) => (a.time > b.time ? 1 : -1)));
                updateStorage([...dataUpdate], currentBoss);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...currentData];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete].sort((a, b) => (a.time > b.time ? 1 : -1)));
                updateStorage([...dataDelete], currentBoss);
                resolve();
              }, 1000);
            }),
        }}
      />
    </ThemeProvider>
  );
}
