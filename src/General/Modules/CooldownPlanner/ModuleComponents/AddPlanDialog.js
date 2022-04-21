import React, { useState } from "react";
import { Button, TextField, DialogContent, DialogTitle, Dialog, DialogActions, Tooltip, Grid, MenuItem, ToggleButton, ToggleButtonGroup, Typography, Box, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import { bossList } from "../Data/CooldownPlannerBossList";
import bossIcons from "../Functions/IconFunctions/BossIcons";
import PropTypes from "prop-types";
import { fightDuration, warcraftLogReportID, logDifficulty } from "../../CooldownPlanner/Functions/Functions";
import LogLinkInput from "General/SystemTools/LogImport/LogLinkInput";
import FightSelectorButton from "General/SystemTools/LogImport/FightSelectorButton";
import logToPlan from "../Functions/LogToPlan";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
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

  const handleChange = (event, newValue) => {
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
  };

  return (
    <div>
      <Tooltip title={t("CooldownPlanner.AddPlanDialog.ButtonTooltip")} arrow>
        <span>
          <Button key={8} variant="outlined" color="primary" onClick={handleAddPlanDialogClickOpen} disabled={disabledCheck}>
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
          <DialogContent>
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
          <DialogContent>
            <Grid item container spacing={1} xl={12} alignItems="center" sx={{ marginTop: "1px" }}>
              <Grid item xs={12}>
                <LogLinkInput changed={reportidHandler} reportid={reportid} styleProps={{ fullWidth: true }} />
              </Grid>
              {/* ----------------------------------- Fight Selection Button ----------------------------------- */}
              <Grid item xs={12}>
                <FightSelectorButton reportid={reportid} clicky={handler} update={logToPlan} customStyleButton={{ width: "100%" }} />
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
      </Dialog>
    </div>
  );
}
