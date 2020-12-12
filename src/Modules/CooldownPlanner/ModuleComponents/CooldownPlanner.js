import React, { useEffect, forwardRef } from "react";
import MaterialTable, {
  MTableToolbar,
  MTableBody,
  MTableHeader,
} from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import Search from "@material-ui/icons/Search";
import ClassCooldownMenuItems from "../Menus/ClassCooldownMenuItems";
import { Select, Grid } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import abilityIcons from "../Functions/IconFunctions/AbilityIcons";
import classIcons from "../Functions/IconFunctions/ClassIcons";
import moment from "moment";
import {
  healerCooldownsDetailed,
  raidList,
  bossList,
  bossAbilities,
} from "../Data/Data";
import { classColoursJS } from "../Functions/ClassColourFunctions";
import { useTranslation } from "react-i18next";
import { localizationFR } from "../../../locale/fr/TableLocale";
import { localizationEN } from "../../../locale/en/TableLocale";
import { localizationRU } from "../../../locale/ru/TableLocale";
import { localizationCH } from "../../../locale/ch/TableLocale";
import MenuItem from "@material-ui/core/MenuItem";
import Grow from "@material-ui/core/Grow";
import bossIcons from "../Functions/IconFunctions/BossIcons";
import bossAbilityIcons from "../Functions/IconFunctions/BossAbilityIcons";
import Divider from "@material-ui/core/Divider";
import ls from "local-storage";
import Paper from "@material-ui/core/Paper";

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
  Add: forwardRef((props, ref) => (
    <AddBox {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Check: forwardRef((props, ref) => (
    <Check {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Clear: forwardRef((props, ref) => (
    <Clear {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => (
    <FilterList {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => (
    <Clear {...props} ref={ref} style={{ color: "#ffee77" }} />
  )),
  Search: forwardRef((props, ref) => (
    <Search {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownward {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
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

  const timeCheck = (rowData) => {
    let time = moment(rowData.time, "mm:ss")
      .add(
        healerCooldownsDetailed
          .filter((obj) => {
            return obj.guid === rowData.Cooldown;
          })
          .map((obj) => obj.cooldown)
          .toString(),
        "s"
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
        </div>
      ),
      // This is the Component for name selection when the table is in edit mode.
      editComponent: (props) => (
        <ThemeProvider theme={themeCooldownTable}>
          <FormControl
            className={classes.formControl}
            variant="outlined"
            size="small"
            style={{ marginTop: 6 }}
          >
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
    // Class column. This is generated from the selected healer from the Name column.
    {
      title: t("Class"),
      field: "class",
      width: "10%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      // Renders the Name for the healer in the relevant row in the data.
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {rowData.class === undefined ? "" : classIcons(rowData.class, 20)}
          {t("CooldownPlannerClasses." + rowData.class)}
        </div>
      ),
      // Shows the selected healers class in edit mode.
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <div style={{ color: classColoursJS(data.class) }}>
            {data.class === undefined ? "" : classIcons(data.class, 20)}
            {t("CooldownPlannerClasses." + data.class)}
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
          {t("CooldownPlannerClassAbilities." + rowData.Cooldown)}
        </div>
      ),
      // The Edit Mode Component. Generated based off the healers class.
      editComponent: (props, rowData) => {
        let data = { ...props.rowData };
        return (
          <FormControl
            className={classes.formControl}
            variant="outlined"
            size="small"
            style={{ marginTop: 6 }}
          >
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
      // The Cast Time Column. This is where the time the user expects the cooldown to be cast.
      title: t("CooldownPlannerTableLabels.CastTimeLabel"),
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
          error={
            RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9]$").test(props.value) ||
            props.value === undefined
              ? false
              : true
          }
          inputProps={{
            pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
          }}
          size="small"
          variant="outlined"
          id="standard-basic"
          label={t("CooldownPlannerTableLabels.CastTimeLabel")}
          placeholder="00:00"
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%", marginTop: 6 }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      // Render only, should the user when the cooldown will be available again to be used.
      title: t("CooldownPlannerTableLabels.OffCooldownLabel"),
      width: "4%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => <div>{timeCheck(rowData)}</div>,
    },
    {
      // Here the user can select which ability the cooldown should cover.
      title: t("CooldownPlannerTableLabels.BossAbilityLabel"),
      field: "bossAbility",
      width: "15%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => (
        <div>
          <a data-wowhead={"spell=" + rowData.bossAbility}>
            {bossAbilityIcons(rowData.bossAbility)}
          </a>
          {t("BossAbilities." + rowData.bossAbility)}
        </div>
      ),
      editComponent: (props) => (
        <ThemeProvider theme={themeCooldownTable}>
          <FormControl
            className={classes.formControl}
            variant="outlined"
            size="small"
            style={{ marginTop: 6 }}
          >
            <InputLabel id="BossAbilitySelector">
              {t("CooldownPlannerTableLabels.BossAbilityLabel")}
            </InputLabel>
            <Select
              value={props.value}
              labelId="BossAbilitySelector"
              label={t("CooldownPlannerTableLabels.BossAbilityLabel")}
              onChange={(e) => {
                props.onChange(e.target.value);
              }}
              MenuProps={menuStyle}
            >
              {bossAbilities
                .filter((obj) => {
                  return (
                    obj.bossID === currentBoss &&
                    obj.cooldownPlannerActive === true
                  );
                })
                .map((key, i) => (
                  <MenuItem key={i} value={key.guid}>
                    <a data-wowhead={"spell=" + key.guid}>
                      {bossAbilityIcons(key.guid)}
                    </a>
                    {t("BossAbilities." + key.guid)}
                  </MenuItem>
                ))
                .map((key) => [key, <Divider />])}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },
    {
      // Under Input Notes for the cooldown. I.e "Use just before this ability" or something else they wish to note.
      title: t("CooldownPlannerTableLabels.NotesLabel"),
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
          label={t("CooldownPlannerTableLabels.NotesLabel")}
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
      props.sort((a, b) => (a.time > b.time ? 1 : -1))
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
          actionsColumnIndex: 7,
          paging: false,
        }}
        localization={curLang()}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
          Body: (props) =>
            currentBoss === "" ? null : (
              <Grow
                in={currentBoss === "" ? false : true}
                style={{ transformOrigin: "0 0 0" }}
                {...((currentBoss === "" ? false : true)
                  ? { timeout: "auto" }
                  : {})}
              >
                <MTableBody {...props} />
              </Grow>
            ),
          Header: (props) =>
            currentBoss === "" ? null : (
              <Grow
                in={currentBoss === "" ? false : true}
                style={{ transformOrigin: "0 0 0" }}
                {...((currentBoss === "" ? false : true)
                  ? { timeout: "auto" }
                  : {})}
              >
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
                <Grid item container spacing={1} xs={7} alignItems="center">
                  <Grid item xs="auto">
                    <FormControl
                      style={{ minWidth: 200 }}
                      variant="outlined"
                      size="small"
                    >
                      <InputLabel id="RaidSelector">
                        {t("CooldownPlannerTableLabels.RaidSelectorLabel")}
                      </InputLabel>
                      <Select
                        labelId="RaidSelector"
                        value={currentRaid}
                        onChange={(e) => handleChangeRaid(e.target.value)}
                        label={t(
                          "CooldownPlannerTableLabels.RaidSelectorLabel"
                        )}
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
                    <FormControl
                      style={{ minWidth: 200 }}
                      variant="outlined"
                      size="small"
                      disabled={currentRaid === "" ? true : false}
                    >
                      <InputLabel id="BossSelector">
                        {t("CooldownPlannerTableLabels.BossSelectorLabel")}
                      </InputLabel>
                      <Select
                        labelId="BossSelector"
                        value={currentBoss}
                        onChange={(e) => handleChangeBoss(e.target.value)}
                        label={t(
                          "CooldownPlannerTableLabels.BossSelectorLabel"
                        )}
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
                    <FormControl
                      style={{ minWidth: 200 }}
                      variant="outlined"
                      size="small"
                      disabled={currentBoss === "" ? true : false}
                    >
                      <InputLabel id="RaidSelector">
                        {t("Select Plan")}
                      </InputLabel>
                      <Select
                        labelId="RaidSelector"
                        label={t("Select Plan")}
                        value={currentPlan}
                        onChange={(e) => handleChangePlan(e.target.value)}
                      >
                        <MenuItem value={1}>Plan 1</MenuItem>
                        <Divider />
                        <MenuItem value={2}>Plan 2</MenuItem>
                        <Divider />
                        <MenuItem value={3}>Plan 3</MenuItem>
                      </Select>
                    </FormControl>
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
                setData(
                  [...currentData, newData].sort((a, b) =>
                    a.time > b.time ? 1 : -1
                  )
                );
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
                setData(
                  [...dataUpdate].sort((a, b) => (a.time > b.time ? 1 : -1))
                );
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
                setData(
                  [...dataDelete].sort((a, b) => (a.time > b.time ? 1 : -1))
                );
                updateStorage([...dataDelete], currentBoss);
                resolve();
              }, 1000);
            }),
        }}
      />
    </ThemeProvider>
  );
}
