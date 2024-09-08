import React, { forwardRef, useState } from "react";
import MaterialTable, { MTableToolbar, MTableBody, MTableHeader, MTableBodyRow, MTableEditRow } from "@material-table/core";
import { AddBox, ArrowDownward, Check, Clear, DeleteOutline, Edit, FilterList, Search } from "@mui/icons-material";
import { Button, TextField, MenuItem, Paper, Grid } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { bossList, raidDB } from "../Data/CooldownPlannerBossList";
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
import { generateColumns } from "./Engine/ColumnGenerator";
import { CooldownPlannerTheme } from "./Styles/CooldownPlannerTheme";
import ls from "local-storage";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CooldownPlannerThemeCheckbox from "./ThemeToggle";
import { bossAbilities } from "../Data/CooldownPlannerBossAbilityList";

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

  // let result = Object.keys(bossAbilities).reduce(function (r, k) {
  //   return r.concat(bossAbilities[k]);
  // }, []);

  // console.log(result);

  // console.log(
  //   result.map((key) => {
  //     let decheck = key.name.de === "" ? key.name.en : key.name.de;
  //     let frcheck = key.name.fr === "" ? key.name.en : key.name.fr;
  //     let rucheck = key.name.ru === "" ? key.name.en : key.name.ru;
  //     let chcheck = key.name.ch === "" ? key.name.en : key.name.ch;
  //     return { guid: key.guid, en: key.name.en, de: decheck, fr: frcheck, ru: rucheck, ch: chcheck };
  //   }),
  // );

  if (ls.get("healerInfo") === null || ls.get("healerInfo").length === 0) {
    ls.set("healerInfo", []);
  }

  const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: green[600],
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: green[600],
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const cooldownObject = new Cooldowns();
  const healTeamDialogOpen = props.healTeamDialogOpen;
  const RosterCheck = ls.get("healerInfo") === null ? true : ls.get("healerInfo").length === 0 ? true : false;
  const expansion = 10; // Dragonflight
  const [currentRaid, setCurrentRaid] = useState(2657);
  const [currentBoss, setCurrentBoss] = useState(2902);
  const [currentDifficulty, setDifficulty] = useState("Mythic");
  const [currentPlan, setCurrentPlan] = useState("");

  const [data, setData] = useState([]);
  const columns = generateColumns(currentBoss, currentDifficulty);
  // console.log(cooldownObject.getCooldownsArray())

  // Console log plan data (used for importing default plans for a log)
  // console.log(
  //   data
  //     // Map each element in the data array to a new object
  //     // with the "bossAbility" and "time" properties
  //     .map((key) => {
  //       if (key.hasOwnProperty("bossAbility")) {
  //         return { bossAbility: key.bossAbility, time: key.time };
  //       }
  //     })
  //     // Remove any null elements from the array
  //     .filter(Boolean)
  //     // Sort the array by time in ascending order
  //     .sort((a, b) => {
  //       // Convert the time strings to Date objects for sorting
  //       // Use the current date and set the hours and minutes from the time string
  //       const date = new Date();
  //       const timeA = new Date(date.setHours(...a.time.split(":")));
  //       const timeB = new Date(date.setHours(...b.time.split(":")));

  //       // Sort in ascending order by time
  //       if (timeA < timeB) {
  //         return -1;
  //       } else if (timeA > timeB) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     }),
  // );

  /* ------------------------------------------ Add Plan ------------------------------------------ */
  const [openAddPlanDialog, setOpenAddPlanDialog] = React.useState(false);
  const handleAddPlanDialogClickOpen = () => {
    setOpenAddPlanDialog(true);
  };
  const handleAddPlanDialogClose = (value) => {
    setOpenAddPlanDialog(false);
  };

  /* ------------------------------------------ Copy Plan ----------------------------------------- */
  const [openCopyPlanDialog, setOpenCopyPlanDialog] = React.useState(false);
  const handleCopyPlanDialogClickOpen = () => {
    setOpenCopyPlanDialog(true);
  };
  const handleCopyPlanDialogClose = (value) => {
    setOpenCopyPlanDialog(false);
  };

  /* ----------------------------------------- Delete Plan ---------------------------------------- */
  const [openDeletePlanDialog, setOpenDeletePlanDialog] = React.useState(false);
  const handleDeletePlanDialogClickOpen = () => {
    setOpenDeletePlanDialog(true);
  };
  const handleDeletePlanDialogClose = (value) => {
    setOpenDeletePlanDialog(false);
  };

  const getBossPlanNames = (boss, currentDif) => {
    return Object.keys(cooldownObject.getCooldowns(boss, currentDif));
  };

  const changeRaid = (e) => {
    setCurrentRaid(e.target.value);

    let boss = bossList
      .filter((obj) => {
        return obj.zoneID === e.target.value;
      })
      .map((key, i) => key.DungeonEncounterID);
    changeBoss(boss[0]);
  };

  /* ------------------------------- Loads relevant plan into table ------------------------------- */
  const loadPlanData = (currentBoss, newPlan, currentDif) => {
    let raid = bossList
      .filter((obj) => {
        return obj.DungeonEncounterID === currentBoss;
      })
      .map((key, i) => key.zoneID)[0];

    setCurrentRaid(raid);
    setCurrentBoss(currentBoss);
    setCurrentPlan(newPlan);
    const bossCooldowns = cooldownObject.getCooldowns(currentBoss, currentDif); // Get List of Plans for the boss
    const planCooldowns = bossCooldowns[newPlan]; // selected plan
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
          localization={getTableLocale()} // In built table text is localized via this function and the TableLocale.js files
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
            Body: (props) => (currentBoss === "" ? null : <MTableBody {...props} />),
            Row: (props) => (
              <MTableBodyRow
                {...props}
                // className={classes.tableRow}
              />
            ),
            EditRow: (props) => (
              <MTableEditRow
                {...props}
                // className={classes.tableRow}
                style={{ backgroundColor: "" }}
              />
            ),
            Header: (props) => (currentBoss === "" ? null : <MTableHeader {...props} />),
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
                <Grid item container spacing={1} xs={12} sm={12} md={8} lg={9} xl={9} alignItems="center">
                  {/* ------------------------ Heal Team Button (Activates the Dialog Popup) ----------------------- */}
                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
                    <LightTooltip arrow={true} open={RosterCheck} placement="top-start" title="Add to your roster to begin!">
                      <Button variant="outlined" style={{ height: 40, width: "100%", whiteSpace: "nowrap" }} color="primary" onClick={() => healTeamDialogOpen()}>
                        {/* // TODO: Translate */}
                        Roster
                      </Button>
                    </LightTooltip>
                  </Grid>
                  {/* ---------------------------------- Raid Selection Drop Down ---------------------------------- */}
                  <Grid item xs={12} sm={6} md={6} lg={4} xl="auto">
                    <TextField
                      id="RaidSelector"
                      select
                      value={currentRaid}
                      onChange={(e) => changeRaid(e)}
                      label={t("CooldownPlanner.TableLabels.RaidSelectorLabel")}
                      size="small"
                      sx={{ minWidth: 200, width: "100%" }}
                    >
                      {raidDB
                        .filter((obj) => {
                          return obj.expansion === expansion;
                        })
                        .map((key, i, arr) => {
                          let lastItem = i + 1 === arr.length ? false : true;
                          return (
                            <MenuItem divider={lastItem} key={"RS" + i} value={key.ID}>
                              <img
                                style={{ height: 18, width: 18, margin: "2px 5px 0px 0px", verticalAlign: "middle", borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }}
                                src={key.icon}
                                alt={key.name[currentLanguage]}
                              />
                              {key.name[currentLanguage]}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  </Grid>
                  {/* ----------------------------------- Boss Selection Dropdown ---------------------------------- */}
                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
                    <TextField
                      sx={{ minWidth: 100, width: "100%" }}
                      label={t("Boss")}
                      select
                      value={currentBoss}
                      placeholder={"Boss"}
                      onChange={(e) => changeBoss(e.target.value, currentDifficulty)}
                      // disabled={RosterCheck}
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

                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
                    <TextField
                      sx={{ minWidth: 100, width: "100%" }}
                      select
                      label={t("Difficulty")}
                      id="DifficultySelector"
                      placeholder={t("Difficulty")}
                      value={currentDifficulty}
                      onChange={(e) => changeDifficulty(currentBoss, e.target.value)}
                      disabled={currentBoss === "" ? true : false}
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
                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
                    <TextField
                      sx={{ minWidth: 100, width: "100%" }}
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

                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
                    <AddPlanDialog
                      openAddPlanDialog={openAddPlanDialog}
                      handleAddPlanDialogClose={handleAddPlanDialogClose}
                      cooldownObject={cooldownObject}
                      currentBoss={currentBoss}
                      currentDifficulty={currentDifficulty}
                      loadPlanData={loadPlanData}
                      handleAddPlanDialogClickOpen={handleAddPlanDialogClickOpen}
                      // disabledCheck={RosterCheck}
                      changeDifficulty={changeDifficulty}
                      currentRaid={currentRaid}
                      changeBoss={changeBoss}
                      setCurrentRaid={setCurrentRaid}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
                    <CopyPlanDialog
                      currentPlan={currentPlan}
                      openCopyPlanDialog={openCopyPlanDialog}
                      handleCopyPlanDialogClickOpen={handleCopyPlanDialogClickOpen}
                      handleCopyPlanDialogClose={handleCopyPlanDialogClose}
                      cooldownObject={cooldownObject}
                      currentBoss={currentBoss}
                      currentDifficulty={currentDifficulty}
                      loadPlanData={loadPlanData}
                      // disabledCheck={RosterCheck}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
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
                      // disabledCheck={RosterCheck}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
                    <ImportPlanDialog
                      cooldownObject={cooldownObject}
                      loadPlanData={loadPlanData}
                      // disabledCheck={RosterCheck}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
                    <ExportPlanDialog
                      data={data}
                      boss={currentBoss}
                      planName={currentPlan}
                      plan={data}
                      currentDifficulty={currentDifficulty}
                      //disabledCheck={RosterCheck}
                      currentPlan={currentPlan}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
                    <ExportERTDialog
                      boss={currentBoss}
                      currentPlan={currentPlan}
                      // disabledCheck={RosterCheck}
                      update={props.update}
                      tableData={data}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3} xl="auto">
                    <CooldownPlannerThemeCheckbox />
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
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
                  let updatedData = [...data, newData].sort((a, b) => (a.time > b.time && 1) || -1);
                  setData(updatedData);
                  updateStorage(currentBoss, currentPlan, updatedData, currentDifficulty); // Update local storage
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data]; // Spread Current Data to update row data
                  const index = oldData.tableData.id; // Set index as the old datas ID for updated
                  dataUpdate[index] = newData; // Set the Updated Data as the old datas id replacing it
                  let updatedData = [...dataUpdate].sort((a, b) => (a.time > b.time && 1) || -1);
                  setData(updatedData);
                  updateStorage(currentBoss, currentPlan, updatedData, currentDifficulty); // Update local storage
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id; // Set index as the old datas ID for deletion
                  dataDelete.splice(index, 1); // Delete Row Data
                  let updatedData = [...dataDelete].sort((a, b) => (a.time > b.time && 1) || -1);
                  setData(updatedData); // Set the New Data without the spliced row
                  updateStorage(currentBoss, currentPlan, updatedData, currentDifficulty); // Update local storage
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
