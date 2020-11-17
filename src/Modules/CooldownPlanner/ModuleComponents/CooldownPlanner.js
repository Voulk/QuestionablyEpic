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
import { classMenus } from "../Menus/ClassMenuItems";
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
  const { t } = useTranslation();
  const { useState } = React;
  const rl = raidList;
  const setData = props.dataUpdateHandler;
  const currentBoss = props.currentBoss;
  const currentRaid = props.currentRaid;
  const currentData = props.data;
  const [plan, setPlan] = useState("");
  const handleChangeRaid = props.raidHandler;
  const handleChangeBoss = props.bossHandler;
  const handleChangePlan = (event) => {
    setPlan(event.target.value);
  };

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
    {
      title: t("Name"),
      field: "name",
      width: "7%",
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: 8,
      },
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {rowData.name}
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
                // props.onChange(e.target.value);
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
      field: "class",
      width: "10%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {rowData.class === undefined ? "" : classIcons(rowData.class, 20)}
          {t("CooldownPlannerClasses." + rowData.class)}
        </div>
      ),
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
      title: t("Cooldown"),
      field: "Cooldown",
      width: "12%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => (
        <div>
          {abilityIcons(rowData.Cooldown)}
          {t("CooldownPlannerClassAbilities." + rowData.Cooldown)}
        </div>
      ),
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
      title: t("CooldownPlannerTableLabels.CastTimeLabel"),
      field: "time",
      width: "6%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
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
      title: t("CooldownPlannerTableLabels.OffCooldownLabel"),
      width: "4%",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => <div>{timeCheck(rowData)}</div>,
    },
    {
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

  useEffect(() => {
    bossList.map((key) => {
      if (ls.get(key.zoneID + "." + key.id + ".1") === null) {
        ls.set(key.zoneID + "." + key.id + ".1", []);
      }
    });
    if (ls.get("healerInfo") === null || ls.get("healerInfo") === undefined) {
      ls.set("healerInfo", []);
    }
  });

  useEffect(() => {
    props.update(currentData);
  }, [currentData]);

  let curLang = (lang) => {
    if (lang === "en") {
      return localizationEN;
    } else if (lang === "ru") {
      return localizationRU;
    } else if (lang === "ch") {
      return localizationCH;
    } else if (lang === "fr") {
      return localizationFR;
    }
  };

  let updateStorage = (props) => {
    if (ls.get(currentRaid + "." + currentBoss + ".1") === null) {
      ls.set(currentRaid + "." + currentBoss + ".1", []);
    }
    ls.set(
      currentRaid + "." + currentBoss + ".1",
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
        localization={curLang(props.curLang)}
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
                          .map((key) => (
                            <MenuItem value={key.zoneID}>
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
                          .map((key) => (
                            <MenuItem value={key.id}>
                              {bossIcons(key.id)}
                              {key.name}
                            </MenuItem>
                          ))
                          .map((key) => [key, <Divider />])}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs="auto">
                    <FormControl
                      style={{ minWidth: 200 }}
                      variant="outlined"
                      size="small"
                      disabled={boss === "" ? true : false}
                    >
                      <InputLabel id="RaidSelector">
                        {t("Select Plan")}
                      </InputLabel>
                      <Select
                        labelId="RaidSelector"
                        value={plan}
                        onChange={handleChangePlan}
                      >
                        <MenuItem value={"plan1"}>Plan 1</MenuItem>
                        <MenuItem value={"plan2"}>Plan 2</MenuItem>
                        <MenuItem value={"plan3"}>Plan 3</MenuItem>
                        <MenuItem value={"plan4"}>Plan 4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> */}
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
