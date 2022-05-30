import React, { useState } from "react";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions, Tooltip, Grid, MenuItem, ToggleButton, ToggleButtonGroup, Typography, Box, Tabs, Tab, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { bossList } from "../Data/CooldownPlannerBossList";
import bossIcons from "../Functions/IconFunctions/BossIcons";
import PropTypes from "prop-types";
import { fightDuration, warcraftLogReportID, logDifficulty } from "../../CooldownPlanner/Functions/Functions";
import LogLinkInput from "General/SystemTools/LogImport/LogLinkInput";
import FightSelectorButton from "General/SystemTools/LogImport/FightSelectorButton";
import importLogData from "../Engine/ImportLogData";
import LinearWithValueLabel from "../BasicComponents/LinearProgressBar";
import transformData from "../Engine/TransformData";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: "8px 16px 16px 16px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AddPlanDialog(props) {
  const { handleAddPlanDialogClose, handleAddPlanDialogClickOpen, openAddPlanDialog, cooldownObject, currentBoss, loadPlanData, currentDifficulty, disabledCheck, changeBoss, currentRaid } = props;
  const [planName, setPlanName] = useState("");
  const [difficulty, setDifficulty] = useState(currentDifficulty);
  const bossPlans = Object.keys(cooldownObject.getCooldowns(currentBoss, currentDifficulty));
  const duplicatePlanNameCheck = bossPlans.includes(planName) ? true : false;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [value, setValue] = React.useState(0);
  const [reportid, setReportid] = React.useState(0);
  const [logData, setLogData] = React.useState({
    enemyCasts: [],
    healerCasts: [],
    healers: [],
    bossID: 0,
    difficulty: "",
    importSuccessful: false,
    damageTaken: [],
    debuffData: [],
    enemyHealth: [],
    buffData: [],
  });
  const [logDataLoading, setLogDataLoading] = React.useState(false);
  const [loadingProgress, setLoadingProgress] = React.useState(0);

  const handleChange = (event, newValue) => {
    setPlanName("");
    setValue(newValue);
  };

  const handleClose = () => {
    setPlanName("");
    handleAddPlanDialogClose(true);
  };

  const onChangeNewPlanName = (event) => {
    setPlanName(event.target.value);
  };

  const addPlan = (planName, boss, currentDif) => {
    cooldownObject.addNewPlan(planName, boss, currentDif);
    loadPlanData(boss, planName, currentDif);
    handleAddPlanDialogClose(true);
    setPlanName("");
  };

  const copyPlan = (planName, boss, newPlan, currentDif) => {
    cooldownObject.copyNewPlan(planName, boss, newPlan, currentDif);
    loadPlanData(boss, newPlan, currentDif);
    handleAddPlanDialogClose(true);
    setPlanName("");
  };

  const [planType, setPlanType] = React.useState("default");
  const [boss, setBoss] = useState(currentBoss);

  const newPlanType = (event, newPlanType) => {
    setPlanType(newPlanType);
  };

  const reportidHandler = (event) => {
    setReportid(warcraftLogReportID(event.target.value));
  };

  // not sure if this is used as yet, needed currently for the button selection
  const [logInfo, setLogInfo] = React.useState([
    {
      time: "",
      timeend: "",
      nextpage: "",
      boss: "",
      logSupplied: true,
      customCooldownsOnChart: "",
      currentFighttime: null,
      killOrWipe: null,
      /* --------------------- Current Boss ID returned from the inserted log link -------------------- */
      currentBossID: null,
      /* --------------------------------------- Raid Difficulty -------------------------------------- */
      currentDifficulty: null,
      /* --------------------------------------- Keystone Level --------------------------------------- */
      currentKeystone: null,
      cooldownPlannerCurrentRaid: 0,
      cooldownPlannerCurrentBoss: 0,
    },
  ]);

  const handler = (info) => {
    // reset logData state on new selection
    setLogData({ enemyCasts: [], healerCasts: [], healers: [], bossID: 0, difficulty: "", importSuccessful: false, damageTaken: [], debuffData: [], enemyHealth: [], buffData: [] });
    // set data returned from wcl (some useless data here as we are reusing code)
    setLogInfo([
      {
        time: info[0],
        timeend: info[1],
        nextpage: info[0],
        boss: info[2],
        logSupplied: true,
        customCooldownsOnChart: "log",
        currentFighttime: info[3],
        killOrWipe: info[4],
        currentBossID: info[5],
        currentDifficulty: logDifficulty(info[6]),
        currentKeystone: info[7],
        cooldownPlannerCurrentRaid: info[8],
        cooldownPlannerCurrentBoss: info[5],
      },
    ]);
    setLogDataLoading(true);
  };

  const setLogToPlanData = (starttime, endtime, reportID, bossID, difficulty) => {
    importLogData(starttime, endtime, reportID, bossID, difficulty, setLogData, setLoadingProgress);
  };

  const importPlanToCooldownObject = (planName, boss, difficulty) => {
    const startTime = logInfo[0].time;
    const enemyCasts = logData.enemyCasts;
    const healerCasts = logData.healerCasts;
    const healers = logData.healers;
    const damageTaken = logData.damageTaken;
    const debuffData = logData.debuffData;
    const enemyHealth = logData.enemyHealth;
    const buffData = logData.buffData;
    // transform the imported data into plan data
    let transformedData = transformData(startTime, boss, enemyCasts, healerCasts, healers, difficulty, damageTaken, debuffData, enemyHealth, buffData);
    cooldownObject.importLogPlan(planName, boss, difficulty, transformedData);
    // load the imported plan data
    loadPlanData(boss, planName, difficulty);
    handleAddPlanDialogClose(true);
    // reset the loading bar states
    setLogDataLoading(false);
    setLoadingProgress(0);
  };

  return (
    <div>
      <Tooltip title={t("CooldownPlanner.AddPlanDialog.ButtonTooltip")} arrow>
        <span>
          <Button key={8} variant="outlined" color="primary" onClick={handleAddPlanDialogClickOpen} disabled={disabledCheck} sx={{ width: "100%" }}>
            {t("CooldownPlanner.AddPlanDialog.ButtonLabel")}
          </Button>
        </span>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openAddPlanDialog} maxWidth="xs" fullWidth>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Create New Plan" {...a11yProps(0)} />
          <Tab label="WCL Import" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <DialogContent sx={{ padding: "8px" }}>
            <Grid item container spacing={1} xl={12} alignItems="center" sx={{ marginTop: "1px" }}>
              <Grid item xl={12}>
                <Typography color="primary" align="center">
                  Boss
                </Typography>
                <TextField sx={{ minWidth: 100, width: "100%" }} size="small" select value={boss} onChange={(e) => setBoss(e.target.value, currentDifficulty)}>
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

              <Grid item xl={12}>
                <Typography color="primary" align="center">
                  Difficulty
                </Typography>
                <ToggleButtonGroup value={difficulty} exclusive onChange={(e) => setDifficulty(e.target.value)} aria-label="text alignment" fullWidth>
                  <ToggleButton value="Heroic" aria-label="Heroic">
                    Heroic
                  </ToggleButton>
                  <ToggleButton value="Mythic" aria-label="Mythic">
                    Mythic
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xl={12}>
                <Typography color="primary" align="center">
                  Plan Type
                </Typography>

                <ToggleButtonGroup value={planType} exclusive onChange={newPlanType} aria-label="PlanTypeToggle" fullWidth>
                  <ToggleButton value="BlankPlan" aria-label="BlankPlan">
                    Blank Plan
                  </ToggleButton>

                  <ToggleButton value="default" aria-label="Default">
                    Default
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xl={12}>
                <Typography color="primary" align="center">
                  New Plan Name
                </Typography>

                <TextField
                  error={duplicatePlanNameCheck}
                  helperText={duplicatePlanNameCheck ? t("CooldownPlanner.DuplicatePlanError") : ""}
                  fullWidth
                  variant="outlined"
                  defaultValue=""
                  value={planName}
                  onChange={onChangeNewPlanName}
                  sx={{ marginTop: "4px" }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              key={8}
              variant="contained"
              color="primary"
              onClick={(e) => (planType === "default" ? copyPlan("default", boss, planName, difficulty) : addPlan(planName, boss, difficulty))}
              size="small"
              disabled={duplicatePlanNameCheck || planName === ""}
            >
              {t("CooldownPlanner.AddPlanDialog.ButtonLabel")}
            </Button>
          </DialogActions>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <DialogContent sx={{ padding: "16px" }}>
            <Grid item container spacing={1} xl={12} alignItems="center" sx={{ marginTop: "1px" }}>
              <Grid item xs={12}>
                <Paper sx={{ backgroundColor: "#5a5a5a", padding: "4px", borderColor: "limegreen", borderWidth: "1px", borderStyle: "Solid" }} elevation={0}>
                  <Typography variant="subtitle2" sx={{ color: "limegreen", fontSize: "0.85rem" }}>
                    Import the boss casts and cooldown usage for a given log.
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: "0.75rem" }}>
                    Currently the import is "Strict" in that exact cast times are imported. In the future there will be an option to assign casts near boss abilities to that ability.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <LogLinkInput changed={reportidHandler} reportid={reportid} styleProps={{ fullWidth: true }} />
              </Grid>
              {/* ----------------------------------- Fight Selection Button ----------------------------------- */}
              <Grid item xs={12}>
                <FightSelectorButton
                  reportid={reportid}
                  clicky={handler}
                  update={setLogToPlanData}
                  customStyleButton={{ width: "100%" }}
                  disabled={reportid === "" || reportid === 0 || reportid === "err" ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                {(logData.importSuccessful === false && logDataLoading === true) || logDataLoading === true ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ display: "inline-flex" }}>
                      {bossIcons(logInfo[0].currentBossID)}
                      {logInfo[0].boss + " - " + logInfo[0].currentDifficulty + " - " + logInfo[0].currentFighttime}
                      <div style={{ color: logInfo[0].killOrWipe === "Kill!" ? "#00ff1a" : "", marginLeft: 4 }}>{" - " + logInfo[0].killOrWipe}</div>
                    </div>
                    <LinearWithValueLabel loadingProgress={loadingProgress} />
                  </div>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography color="primary" align="center">
                New Plan Name
              </Typography>

              <TextField
                error={duplicatePlanNameCheck}
                helperText={duplicatePlanNameCheck ? t("CooldownPlanner.DuplicatePlanError") : ""}
                fullWidth
                variant="outlined"
                defaultValue=""
                value={planName}
                onChange={onChangeNewPlanName}
                sx={{ marginTop: "4px" }}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              key={9}
              variant="contained"
              color="primary"
              onClick={(e) => importPlanToCooldownObject(planName, logData.bossID, logData.difficulty)}
              size="small"
              disabled={logData.importSuccessful === false || planName === ""}
            >
              {t("CooldownPlanner.AddPlanDialog.ButtonLabel")}
            </Button>
          </DialogActions>
        </TabPanel>
      </Dialog>
    </div>
  );
}
