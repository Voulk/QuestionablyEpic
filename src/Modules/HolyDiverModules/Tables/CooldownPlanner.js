import React, { useEffect, forwardRef } from "react";
import MaterialTable, {
  MTableToolbar,
  MTableBody,
  MTableHeader,
} from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ClassCooldownMenuItems from "./ClassCooldownMenuItems";
import { Select, Grid } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import abilityicons from "../Functions/IconFunctions/AbilityIcons";
import classicons from "../Functions/IconFunctions/ClassIcons";
import moment from "moment";
import {
  healerCooldownsDetailed,
  raidList,
  nathriaBossList,
  bossAbilities,
} from "../Data/Data";
import { classColoursJS } from "../Functions/ClassColourFunctions";
import { classMenus } from "../Tables/ClassMenuItems";
import { useTranslation } from "react-i18next";
import {
  localizationRU,
  localizationCH,
  localizationFR,
} from "./TableLocalization.js";
import MenuItem from "@material-ui/core/MenuItem";
import Grow from "@material-ui/core/Grow";
import bossIcons from "../Functions/IconFunctions/BossIcons";
import bossAbilityIcons from "../Functions/IconFunctions/BossAbilityIcons";
import Divider from "@material-ui/core/Divider";
import ls from "local-storage";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    whiteSpace: "nowrap",
    width: "100%",
  },
}));

const themecooldowntable = createMuiTheme({
  overrides: {
    MuiTableCell: {
      // regular: {
      //   padding: "0px 8px 0px 8px",
      // },
      root: {
        padding: "4px 4px 4px 4px",
      },
    },
    MuiIconButton: {
      root: {
        padding: "4px",
      },
    },
    // MuiOutlinedInput: {
    //   input: { padding: 10 },
    // },
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
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Export: forwardRef((props, ref) => (
    <SaveAlt {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => (
    <FilterList {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => (
    <FirstPage {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  LastPage: forwardRef((props, ref) => (
    <LastPage {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  NextPage: forwardRef((props, ref) => (
    <ChevronRight {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} style={{ color: "#ffee77" }} ref={ref} />
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
  ThirdStateCheck: forwardRef((props, ref) => (
    <Remove {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumn {...props} style={{ color: "#ffee77" }} ref={ref} />
  )),
};

export default function CooldownPlanner(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { useState } = React;
  const rl = raidList;
  const [data, setData] = useState([]);
  const [raid, setRaid] = useState("");
  const [boss, setBoss] = useState("");
  const [plan, setPlan] = useState("");

  const handleChangeRaid = (event) => {
    setRaid(event.target.value);
  };
  const handleChangeBoss = (event) => {
    setBoss(event.target.value);
    if (ls.get(raid + "." + boss + ".1") === null) {
      ls.set(raid + "." + boss + ".1", []);
    }
    setData(ls.get(raid + "." + event.target.value + ".1"));
  };

  const handleChangePlan = (event) => {
    setPlan(event.target.value);
  };

  // ls.get("healerInfo")
  //   .filter((obj) => {
  //     return obj.name === rowData.name;
  //   })
  //   .map((obj) => obj.class)
  //   .toString()

  let wowClass = 0;
  let columns = [
    {
      title: t("Name"),
      field: "name",
      width: "10%",
      cellStyle: {
        whiteSpace: "nowrap",
        paddingLeft: 8,
        borderRight: "1px solid rgb(81 81 81)",
      },
      headerStyle: { paddingLeft: 8 },
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {rowData.name}
        </div>
      ),
      editComponent: (props) => (
        <ThemeProvider theme={themecooldowntable}>
          <FormControl
            className={classes.formControl}
            variant="outlined"
            size="small"
          >
            <InputLabel id="HealerSelector">{t("Name")}</InputLabel>
            <Select
              value={props.value}
              labelId="HealerSelector"
              onChange={(e) => {
                props.onChange(e.target.value);
                // wowClass = e.target.value;
              }}
              MenuProps={{
                style: { marginTop: 5 },
                MenuListProps: {
                  style: { paddingTop: 0, paddingBottom: 0 },
                },
                PaperProps: {
                  style: { border: "1px solid rgba(255, 255, 255, 0.23)" },
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
              }}
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
      width: "15%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid rgb(81 81 81)",
      },
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {classicons(rowData.class, 20)}
          {rowData.class}
        </div>
      ),
      editComponent: (props) => (
        <ThemeProvider theme={themecooldowntable}>
          <FormControl
            className={classes.formControl}
            variant="outlined"
            size="small"
          >
            <InputLabel id="ClassSelector">{t("Class")}</InputLabel>
            <Select
              value={props.value}
              labelId="ClassSelector"
              onChange={(e) => {
                props.onChange(e.target.value);
                wowClass = e.target.value;
              }}
              MenuProps={menuStyle}
            >
              {classMenus}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },
    {
      title: t("Cooldown"),
      field: "Cooldown",
      width: "15%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid rgb(81 81 81)",
      },
      render: (rowData) => abilityicons(rowData.Cooldown),
      editComponent: (props) => (
        // <ThemeProvider theme={themecooldowntable}>
        <FormControl
          className={classes.formControl}
          variant="outlined"
          size="small"
        >
          <InputLabel id="HealerAbilitySelector">{t("Cooldown")}</InputLabel>
          <Select
            value={props.value}
            labelId="HealerAbilitySelector"
            onChange={(e) => {
              props.onChange(e.target.value);
            }}
              MenuProps={menuStyle}
          >
            {ClassCooldownMenuItems(wowClass) || []}
          </Select>
        </FormControl>
        // </ThemeProvider>
      ),
    },
    {
      title: t("HDTableLabels.CastTimeLabel"),
      field: "time",
      width: "4%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid rgb(81 81 81)",
      },
      editComponent: (props) => (
        <TextField
          size="small"
          variant="outlined"
          id="standard-basic"
          label={t("HDTableLabels.CastTimeLabel")}
          placeholder="Format: mm:ss"
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%" }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      title: t("HDTableLabels.OffCooldownLabel"),
      width: "4%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid rgb(81 81 81)",
      },
      render: (rowData) => (
        <div>
          {moment(rowData.time, "mm:ss")
            .add(
              healerCooldownsDetailed
                .filter((obj) => {
                  return obj.name === rowData.Cooldown;
                })
                .map((obj) => obj.cooldown)
                .toString(),
              "s"
            )
            .format("mm:ss")}
        </div>
      ),
    },
    {
      title: t("HDTableLabels.BossAbilityLabel"),
      field: "bossAbility",
      width: "15%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid rgb(81 81 81)",
      },
      render: (rowData) => (
        <div>
          {/* {bossAbilityIcons(rowData.bossAbility)} */}
          {rowData.bossAbility}
        </div>
      ),
      editComponent: (props) => (
        <ThemeProvider theme={themecooldowntable}>
          <FormControl
            className={classes.formControl}
            variant="outlined"
            size="small"
          >
            <InputLabel id="BossAbilitySelector">
              {t("HDTableLabels.BossAbilityLabel")}
            </InputLabel>
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
                  return (
                    obj.bossID === boss && obj.cooldownPlannerActive === true
                  );
                })
                .map((key, i) => (
                  <MenuItem key={i} value={key.ability}>
                    <a data-wowhead={"spell=" + key.guid}>
                      {bossAbilityIcons(key.guid)}
                    </a>
                    {key.ability}
                  </MenuItem>
                ))
                .map((key) => [key, <Divider />])}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },
    {
      title: t("HDTableLabels.NotesLabel"),
      field: "notes",
      width: "20%",
      cellStyle: {
        whiteSpace: "nowrap",
        borderRight: "1px solid rgb(81 81 81)",
      },
      editComponent: (props) => (
        <TextField
          size="small"
          variant="outlined"
          id="standard-basic"
          label={t("HDTableLabels.NotesLabel")}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
  ];

  useEffect(() => {
    nathriaBossList.map((key) => {
      if (ls.get("Castle Nathria" + "." + key.id + ".1") === null) {
        ls.set("Castle Nathria" + "." + key.id + ".1", []);
      }
    });
    if (ls.get("healerinfo") === null) {
      ls.set("healerinfo", []);
    }
  });

  useEffect(() => {
    props.update(data);
  }, [data]);

  let curLang = (lang) => {
    if (lang === "en") {
      return false;
    } else if (lang === "ru") {
      return localizationRU;
    } else if (lang === "ch") {
      return localizationCH;
    } else if (lang === "fr") {
      return localizationFR;
    } else {
      return false;
    }
  };

  let updateStorage = (props, boss) => {
    if (ls.get(raid + "." + boss + ".1") === null) {
      ls.set(raid + "." + boss + ".1", []);
    }
    ls.set(raid + "." + boss + ".1", props);
  };

  return (
    <ThemeProvider theme={themecooldowntable}>
      <MaterialTable
        icons={tableIcons}
        // title={t("Cooldown Planner")}
        columns={columns}
        data={data}
        style={{
          boxShadow:
            "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
          // fontSize: "0.8 rem",
          marginTop: 4,
        }}
        options={{
          showTitle: false,
          searchFieldVariant: "outlined",
          headerStyle: {
            borderBottom: "2px solid #6d6d6d",
            padding: "0px 4px 0px 4px",
            whiteSpace: "nowrap",
          },
          rowStyle: {
            borderBottom: "1px solid #6d6d6d",
          },
          actionCellStyle: {
            borderBottom: "1px solid #6d6d6d",
          },
          actionsColumnIndex: 7,
          paging: false,
        }}
        localization={curLang(props.curLang)}
        components={{
          Body: (props) =>
            boss === "" ? null : (
              <Grow
                in={boss === "" ? false : true}
                style={{ transformOrigin: "0 0 0" }}
                {...((boss === "" ? false : true) ? { timeout: "auto" } : {})}
              >
                <MTableBody {...props} />
              </Grow>
            ),
          Header: (props) =>
            boss === "" ? null : (
              <Grow
                in={boss === "" ? false : true}
                style={{ transformOrigin: "0 0 0" }}
                {...((boss === "" ? false : true) ? { timeout: "auto" } : {})}
              >
                <MTableHeader {...props} />
              </Grow>
            ),
          Toolbar: (props) => (
            <div>
              <Grid
                container
                style={{ padding: 10 }}
                spacing={1}
                direction="row"
                justify="space-between"
              >
                <Grid item container spacing={1} xs={7} alignItems="center">
                  <Grid item xs="auto">
                    <FormControl
                      style={{ minWidth: 200, marginLeft: 8 }}
                      variant="outlined"
                      size="small"
                    >
                      <InputLabel id="RaidSelector">
                        {t("HDTableLabels.RaidSelectorLabel")}
                      </InputLabel>
                      <Select
                        labelId="RaidSelector"
                        value={raid}
                        onChange={handleChangeRaid}
                        MenuProps={{
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
                          tableLayout: "fixed"
                        }}
                      >
                        {rl
                          .map((key) => (
                            <MenuItem value={key.raidName}>
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
                      disabled={raid === "" ? true : false}
                    >
                      <InputLabel id="BossSelector">
                        {t("HDTableLabels.BossSelectorLabel")}
                      </InputLabel>
                      <Select
                        labelId="BossSelector"
                        value={boss}
                        onChange={handleChangeBoss}
                        MenuProps={{
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
                        }}
                      >
                        {nathriaBossList
                          .filter((obj) => {
                            return obj.raid === raid;
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
                  {/*<Grid item xs="auto">
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
                  {boss === "" ? null : (
                    <ThemeProvider theme={SearchFieldOverride}>
                      <MTableToolbar {...props} />{" "}
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
                setData([...data, newData]);
                resolve();
                updateStorage([...data, newData], boss);
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                updateStorage([...dataUpdate], boss);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                updateStorage([...dataDelete], boss);
                resolve();
              }, 1000);
            }),
        }}
      />
    </ThemeProvider>
  );
}