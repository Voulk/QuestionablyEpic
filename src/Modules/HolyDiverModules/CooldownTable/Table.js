import React, { useEffect, forwardRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
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
import abilityicons from "../CooldownTable/AbilityIcons";
import classicons from "../CooldownTable/ClassIcons";
import moment from "moment";
import {
  healerCooldownsDetailed,
  raidList,
  nathriaBossList,
  bossAbilities,
} from "../Data/Data";
import { classColoursJS } from "../CooldownTable/ClassColourFunctions";
import { classMenus } from "../CooldownTable/ClassMenuItems";
import "./Table.css";
import { useTranslation } from "react-i18next";
import { localizationRU, localizationCH } from "./TableLocalization.js";
import MenuItem from "@material-ui/core/MenuItem";
import bossIcons from "../CooldownTable/BossIcons";
import bossAbilityIcons from "../Functions/IconFunctions/BossAbilityIcons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    whiteSpace: "nowrap",
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const themecooldowntable = createMuiTheme({
  overrides: {
    MuiTableCell: {
      regular: {
        padding: "0px 16px 0px 16px",
      },
      root: {
        padding: "0px 16px 0px 16px",
      },
    },
    MuiIconButton: {
      root: {
        padding: "4px",
      },
    },
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

export default function CustomEditComponent(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
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
    console.log(event.target.value);
    setBoss(event.target.value);
  };
  const handleChangePlan = (event) => {
    setPlan(event.target.value);
  };

  let wowClass = 0;
  let columns = [
    {
      title: t("Name"),
      field: "name",
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {rowData.name}
        </div>
      ),
      editComponent: (props) => (
        <TextField
          size="small"
          id="standard-basic"
          label={t("Name")}
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%" }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      title: t("Class"),
      field: "class",
      render: (rowData) => (
        <div style={{ color: classColoursJS(rowData.class) }}>
          {classicons(rowData.class, 20)}
          {rowData.class}
        </div>
      ),
      editComponent: (props) => (
        <ThemeProvider theme={themecooldowntable}>
          <FormControl className={classes.formControl}>
            <InputLabel id="HealerClassSelector">{t("Class")}</InputLabel>
            <Select
              value={props.value}
              onChange={(e) => {
                props.onChange(e.target.value);
                wowClass = e.target.value;
              }}
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
      render: (rowData) => abilityicons(rowData.Cooldown),
      editComponent: (props) => (
        <ThemeProvider theme={themecooldowntable}>
          <FormControl className={classes.formControl}>
            <InputLabel id="HealerAbilitySelector">{t("Cooldown")}</InputLabel>
            <Select
              value={props.value}
              onChange={(e) => {
                props.onChange(e.target.value);
              }}
            >
              {ClassCooldownMenuItems(wowClass) || []}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },
    {
      title: t("Time"),
      field: "time",
      editComponent: (props) => (
        <TextField
          size="small"
          id="standard-basic"
          label="Cast Time"
          placeholder="Format: mm:ss"
          value={props.value}
          style={{ whiteSpace: "nowrap", width: "100%" }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
      title: t("Next Available"),
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
      title: t("Boss Ability"),
      field: "bossAbility",
      render: (rowData) => (
        <div>
          {" "}
          {bossAbilityIcons(rowData.bossAbility)} {rowData.bossAbility}{" "}
        </div>
      ),
      editComponent: (props) => (
        <ThemeProvider theme={themecooldowntable}>
          <FormControl className={classes.formControl}>
            <InputLabel id="HealerAbilitySelector">
              {t("Boss Ability")}
            </InputLabel>
            <Select
              value={props.value}
              onChange={(e) => {
                props.onChange(e.target.value);
              }}
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
                ))}
            </Select>
          </FormControl>
        </ThemeProvider>
      ),
    },
    {
      title: t("Notes"),
      field: "notes",
      editComponent: (props) => (
        <TextField
          size="small"
          id="standard-basic"
          label="Notes"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
  ];

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
    } else {
      return false;
    }
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
          fontSize: "0.8 rem",
          marginTop: 4,
        }}
        options={{
          showTitle: false,
          searchFieldVariant: "outlined",
          headerStyle: {
            borderBottom: "2px solid #6d6d6d",
            padding: "0px 16px 0px 16px",
            fontSize: "0.8 rem",
          },
          cellStyle: {
            borderBottom: "1px solid #6d6d6d",
            fontSize: "0.8 rem",
            whiteSpace: "nowrap",
            padding: "0px 16px 0px 16px",
          },
          rowStyle: {
            borderBottom: "1px solid #6d6d6d",
            fontSize: "0.8 rem",
            padding: "0px 16px 0px 16px",
          },
          searchFieldStyle: {
            // borderBottom: "1px solid #6d6d6d",

            color: "#ffffff",
          },
          actionCellStyle: {
            borderBottom: "1px solid #6d6d6d",
          },
          actionsColumnIndex: 7,
          paging: false,
        }}
        localization={curLang(props.curLang)}
        components={{
          Toolbar: (props) => (
            <div>
              <Grid
                container
                style={{ padding: 10 }}
                spacing={1}
                direction="row"
                justify="space-between"
              >
                <Grid item container spacing={1} xs={7}>
                  <Grid item xs="auto">
                    <FormControl
                      style={{ minWidth: 175 }}
                      variant="outlined"
                      size="small"
                    >
                      <InputLabel id="RaidSelector">
                        {t("Select Raid")}
                      </InputLabel>
                      <Select
                        labelId="RaidSelector"
                        value={raid}
                        onChange={handleChangeRaid}
                      >
                        {rl.map((key) => (
                          <MenuItem value={key.raidName}>
                            {key.raidName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs="auto">
                    <FormControl
                      style={{ minWidth: 175 }}
                      variant="outlined"
                      size="small"
                      disabled={raid === "" ? true : false}
                    >
                      <InputLabel id="RaidSelector">
                        {t("Select Boss")}
                      </InputLabel>
                      <Select
                        labelId="RaidSelector"
                        value={boss}
                        onChange={handleChangeBoss}
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
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs="auto">
                    <FormControl
                      style={{ minWidth: 175 }}
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
                  </Grid>
                </Grid>
                <Grid item xs="auto">
                  <MTableToolbar {...props} />
                </Grid>
              </Grid>
            </div>
          ),
        }}
        editable={{
          cellStyle: { padding: "0px 16px 0px 16px" },
          rowStyle: { padding: "0px 16px 0px 16px" },
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
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
                resolve();
              }, 1000);
            }),
        }}
      />
    </ThemeProvider>
  );
}