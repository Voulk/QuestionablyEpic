import React, { Component } from "react";
import { Typography, Collapse, CircularProgress, Grid, Dialog, Divider, Paper, Grow, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LogLinkInput from "../../SystemTools/LogImport/LogLinkInput";
import Chart from "./Chart/Chart";
import Example from "./Components/DTPSBarChart";
import FightSelectorButton from "../../SystemTools/LogImport/FightSelectorButton";
import LoadingOverlay from "react-loading-overlay";
import FightAnalysisTable from "./Components/Tables/Table";
import { fightDuration, warcraftLogReportID, logDifficulty } from "../CooldownPlanner/Functions/Functions";
import bossHeaders from "../CooldownPlanner/Functions/IconFunctions/BossHeaderIcons";
import HealerInfoTable from "./Components/HealerInfoCards";
import updatechartdata from "./Engine/LogImportEngine.js";
import chartCooldownUpdater from "./Engine/UserCooldownChartEngine.js";
import EnemyCastsTimeline from "./Components/EnemyCasts";
import Cooldowns from "../CooldownPlanner/CooldownObject/CooldownObject";
import HelpText from "../SetupAndMenus/HelpText";
class FightAnalysis extends Component {
  constructor() {
    super();
    // Here we bind functions to this component. This means that any data returned from them will only affect this component, not the ones they are sent to.
    // Example:
    // this.reportidHandler below returns the WCL code for the report. As it is bound to this component,
    // we pass it as a prop to the LogLinkInput component so that anytime the link is pasted in the code gets saved here, rather than in that components state.

    this.reportidHandler = this.reportidHandler.bind(this);
    this.logSupplied = this.logSupplied.bind(this);
    this.customCooldownsOnChart = this.customCooldownsOnChart.bind(this);
    this.handler = this.handler.bind(this);
    this.updatechartdataNew = updatechartdata.bind(this);
    this.chartCooldownUpdater = chartCooldownUpdater.bind(this);
    this.handleHealTeamClickOpen = this.handleHealTeamClickOpen.bind(this);

    /* ---------------------------------------------------------------------------------------------- */
    /*                                              State                                             */
    /* ---------------------------------------------------------------------------------------------- */
    this.state = {
      /* --------------------- Current Boss ID returned from the inserted log link -------------------- */
      currentBossID: null,
      /* ------------------ Unmitigated Chart Data - With Cooldowns Used from the log ----------------- */
      unmitigatedChartData: [],
      /* --------------------------- WCL Report ID from the pasted log link --------------------------- */
      reportid: null,
      /* -------------------------------- Start time of Selected Fight -------------------------------- */
      currentStartTime: 0,
      /* --------------------------------- End time of Selected Fight --------------------------------- */
      currentEndTime: 0,
      /* ---------------- List of damaging abilities from the selected fight with GUID ---------------- */
      abilityList: ["Melee"],
      /* ------------- Array of Cooldowns in the fight. Format: 'Ptolemy - Avenging Wrath' ------------ */
      cooldownlist: ["none"],
      /* ------------- Controls whether the loading spinner shows while the log is loading ------------ */
      loadingcheck: false,
      /* -------------- Boss Name Returned from the log (localized from report language) -------------- */
      boss: null,
      /* ----------------------------- Array of healer names from the log ----------------------------- */
      healernames: [],
      /* --------------------------- Unmitigated data returned original data -------------------------- */
      unmitigatedChartDataNoCooldownsOriginal: [],
      /* ---------------------------- Unmitigated data, no cooldowns added ---------------------------- */
      unmitigatedChartDataNoCooldowns: [],
      mitigatedChartDataNoCooldownsOriginal: [],
      mitigatedChartDataNoCooldowns: [],
      cooldownlistcustom2: ["none"],
      /* --- Whether a log has been supplied to the module, hides the chart and data tables if false -- */
      logSupplied: false,
      /* ----------------------------------- Show Cooldowns on Chart ---------------------------------- */
      customCooldownsOnChart: "log",
      currentFighttime: null,
      killOrWipe: null,
      showname: false,
      Updateddatacasts: [],
      defensiveCasts: [],
      ertshowhide: false,
      legenddata: [],
      uniqueArrayGuid: [],
      mitigatedChartData: [],
      chartData: "mitigated",

      summedUnmitigatedDamagePerSecond: [],
      /* --------------------------------------- Raid Difficulty -------------------------------------- */
      currentDifficulty: null,
      /* --------------------------------------- Keystone Level --------------------------------------- */
      currentKeystone: null,
      /* ----------------------------- Popup State of the Heal Team Table ----------------------------- */
      healTeamDialogState: false,
      /* ---------------------------- Array of External Usage & Timestamps ---------------------------- */
      externalUsageTimelineData: [],
      /* ------------------------------ Array of Enemy Casts & Timestamps ----------------------------- */
      enemyCastsTimelineData: [],
      customPlanSelected: "",
      cooldownObject: new Cooldowns(),
      fightID: null,
    };
  }

  /* -------------------------- this function is bound to this component. ------------------------- */
  /* ------- It is passed as a prop for the fight Selector, the states are set from the data ------ */
  handler = (info) => {
    this.setState({
      showname: true,
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
      fightID: info[9],
    });
  };

  /* ------------------ Sets the state on whether the Log Cooldown Chart is Shown ----------------- */
  logSupplied = (event) => {
    this.setState({ logSupplied: event });
  };

  /* -------------- Sets the state on whether the User Input Cooldowns are Shown. ------------- */
  customCooldownsOnChart = (event) => {
    this.setState({ customCooldownsOnChart: event });
  };

  /* ------------------- Sets the state for Unmitigated/Mitigated Damage shown. ------------------- */
  changeDataSet = (event) => {
    this.setState({ chartData: event });
  };

  reportidHandler = (event) => {
    this.setState({ reportid: warcraftLogReportID(event.target.value) });
  };

  /* ---------------------------------- Heal Team Dialog Handlers --------------------------------- */
  handleHealTeamClickOpen = () => {
    this.setState({ healTeamDialogState: true });
  };

  handleHealTeamClose = () => {
    this.setState({ healTeamDialogState: false });
  };

  handleCustomPlanChange = (plan, currentBossID) => {
    /* ------------------------------- Get List of Plans for the boss ------------------------------- */
    const bossCooldowns = this.state.cooldownObject.getCooldowns(currentBossID, this.state.currentDifficulty);
    /* --------------------------------------- Set the lected --------------------------------------- */
    const planCooldowns = bossCooldowns[plan];

    this.setState({ customPlanSelected: plan });
    this.chartCooldownUpdater(planCooldowns);
  };

  getBossPlanNames = (boss) => {
    if (this.state.currentDifficulty === "LFR" || this.state.currentDifficulty === "Normal") {
      return [];
    }
    return Object.keys(this.state.cooldownObject.getCooldowns(boss, this.state.currentDifficulty));
  };

  render() {
    /* ------------------------------------ Data Loading Spinner ------------------------------------ */
    let spinnershow = this.state.loadingcheck;

    const helpText = [
      "Step 1: Start by clicking the Roster button and filling in your team.",
      // "Step 2: Import a log to use as a template for your cooldowns, or select a boss and difficulty to do it manually.",
      // "Use the 'Import/Export' Buttons to share plans with your team, or export it to your ERT note with the ERT Note Button.",
      // "Jump into Fight Analysis to overlay your assigned cooldowns on a log for the fight.",
    ];
    const helpBlurb = "Welcome to the Fight Analysis Alpha. All bug reports and feedback welcome.";

    return (
      <div
        style={
          {
            // marginTop: 32,
          }
        }
      >
        <div style={{ height: 96 }} />
        <div style={{ margin: "0px 5% 20px 5%" }}>
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                  Main Grid for the Component                                   */
          /* ---------------------------------------------------------------------------------------------- */}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" style={{ padding: "10px 0px 5px 0px" }} color="primary">
                {/* // TODO Translate */}
                Fight Analysis
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <HelpText text={helpText} blurb={helpBlurb} expanded={true} />
            </Grid>

            {/* ----------- Grid Container for the User Input Components, With Paper as the Surface ---------- */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paper elevation={0} padding={0} style={{ padding: "10px 5px 10px 10px" }}>
                {/* ------------------- Grid Container for the Log Input/Fight Selection Button ------------------ */}
                <Grid
                  container
                  spacing={1}
                  justifyContent="space-between"
                  style={{
                    // display: "inline-flex",

                    width: "100%",
                  }}
                >
                  {/* ------------------------------------------ Log Input ----------------------------------------- */}
                  <Grid item xs={10}>
                    <LogLinkInput changed={this.reportidHandler} reportid={this.state.reportid} styleProps={{ fullWidth: true }} />
                  </Grid>
                  {/* ----------------------------------- Fight Selection Button ----------------------------------- */}
                  <Grid item xs={2}>
                    <FightSelectorButton reportid={this.state.reportid} clicky={this.handler} update={this.updatechartdataNew} customStyleButton={{ width: "100%" }} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* ----------------- Grid Container for the Log Chart (Damage + Cooldowns used). ---------------- */}
            {/* ----------- The function in the style removes padding from showing while Collapsed ----------- */}
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1}
              style={{
                display: this.state.logSupplied ? "block" : "none",
              }}
            >
              <Grid item xs={12}>
                {/* ---------------------------- Imported Log Info (Name, Length etc) ---------------------------- */}
                <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={7}>
                    <Collapse in={this.state.logSupplied}>
                      <Grow in={this.state.logSupplied} style={{ transformOrigin: "0 0 0" }} {...(this.state.logSupplied ? { timeout: 1000 } : {})}>
                        <Paper
                          bgcolor="#333"
                          elevation={0}
                          style={{
                            display: "inline-flex",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          {/* ----------------------------------------- Boss Image -----------------------------------------  */}
                          {bossHeaders(this.state.currentBossID, {
                            height: 64,
                            width: 128,
                            padding: "0px 5px 0px 5px",
                            verticalAlign: "middle",
                            marginRight: "-50px",
                          })}
                          <div>
                            {/* ------------------------ Boss Name/Dungeon & Difficulty/Keystone Level ----------------------- */}
                            <Typography
                              style={{
                                fontWeight: 500,
                                fontSize: "1.25rem",
                                padding: "0px 16px 0px 16px",
                                whiteSpace: "nowrap",
                              }}
                              color="primary"
                            >
                              {this.state.boss} - {this.state.currentDifficulty}
                              {this.state.currentKeystone === null || this.state.currentKeystone === undefined ? null : this.state.currentKeystone}
                            </Typography>
                            {/* ---------------------------------- Fight Length & Kill/Wipe ----------------------------------  */}
                            <Typography
                              style={{
                                fontWeight: 500,
                                fontSize: "0.9rem",
                                color: "white",
                                padding: "0px 16px 0px 16px",
                                textAlign: "center",
                              }}
                            >
                              {this.state.currentFighttime + " - " + this.state.killOrWipe}
                            </Typography>
                          </div>
                        </Paper>
                      </Grow>
                    </Collapse>
                  </Grid>

                  {/* ------------------------------ Container for the Toggle Buttons ------------------------------ */}
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
                    <Collapse in={this.state.logSupplied}>
                      <Grow in={this.state.logSupplied} style={{ transformOrigin: "0 0 0" }} {...(this.state.logSupplied ? { timeout: 1000 } : {})}>
                        <Paper
                          elevation={0}
                          style={{
                            display: "inline-flex",
                            margin: "0px 0px 4px 0px",
                            // padding: "10px 10px 10px 10px",
                            height: 64,
                            width: "100%",
                          }}
                        >
                          <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                            {/* TODO: Translate */}
                            <Grid item>
                              <FormControl style={{ width: 200 }} variant="outlined" size="small">
                                <InputLabel id="cooldownsShown">Custom Cooldowns</InputLabel>
                                <Select
                                  key={"cooldownsShown"}
                                  labelId="cooldownsShown"
                                  value={this.state.customCooldownsOnChart}
                                  onChange={(e) => this.customCooldownsOnChart(e.target.value)}
                                  label={"Cooldowns Shown"}
                                >
                                  <MenuItem divider value={"log"}>
                                    Log Cooldowns
                                  </MenuItem>
                                  <MenuItem value={"user"}>Custom Cooldowns</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item>
                              {/* TODO: Translate */}
                              <FormControl style={{ width: 200 }} variant="outlined" size="small">
                                <InputLabel id="damageType">Damage Type</InputLabel>
                                <Select key={"damageType"} labelId="damageType" value={this.state.chartData} onChange={(e) => this.changeDataSet(e.target.value)} label={"Damage Type"}>
                                  <MenuItem divider value={"mitigated"}>
                                    Mitigated Damage
                                  </MenuItem>
                                  <MenuItem value={"unmitigated"}>Unmitigated Damage</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item>
                              <FormControl style={{ width: 200 }} variant="outlined" size="small">
                                <InputLabel id="Plans">Plans</InputLabel>
                                <Select
                                  key={"sockets"}
                                  labelId="Plans"
                                  value={this.state.customPlanSelected}
                                  onChange={(e) => this.handleCustomPlanChange(e.target.value, this.state.currentBossID)}
                                  label={"Custom Cooldowns"}
                                  disabled={this.state.currentDifficulty === "LFR" || this.state.currentDifficulty === "Normal" ? true : false}
                                >
                                  {this.state.currentBossID === null
                                    ? ""
                                    : this.getBossPlanNames(this.state.currentBossID).map((key, i, arr) => {
                                        let lastItem = i + 1 === arr.length ? false : true;
                                        return (
                                          <MenuItem divider={lastItem} value={key}>
                                            {key}
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grow>
                    </Collapse>
                  </Grid>
                </Grid>
              </Grid>

              {/* ---------------------------- Imported Log Damage / Cooldown Chart ---------------------------- */}
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={{
                  display: this.state.logSupplied ? "block" : "none",
                }}
              >
                <Collapse in={this.state.logSupplied}>
                  <LoadingOverlay active={spinnershow} spinner={<CircularProgress color="secondary" />}>
                    <Chart
                      dataToShow={this.state.chartData}
                      mitigated={this.state.mitigatedChartData}
                      unmitigated={this.state.unmitigatedChartData}
                      mitigatedCooldowns={this.state.mitigatedChartDataNoCooldowns}
                      unmitigatedCooldowns={this.state.unmitigatedChartDataNoCooldowns}
                      abilityList={this.state.abilityList}
                      legendata={this.state.legenddata}
                      cooldownsToShow={this.state.customCooldownsOnChart}
                      cooldown={this.state.cooldownlist}
                      endtime={fightDuration(this.state.currentEndTime, this.state.currentStartTime)}
                      customCooldowns={this.state.cooldownlistcustom2}
                      showcds={true}
                    />
                  </LoadingOverlay>
                </Collapse>
              </Grid>

              {/* ----------------------------- Grid Container for the log details ----------------------------- */}
              {/* ---------------- Cooldown / External Timeline / Healer Info Cards / DTPS by ability --------------- */}
              <Grid item container>
                <Grid item container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                  {/* ---------------------------------------------------------------------------------------------- */
                  /*                                     Cooldown Usage Timeline                                     */
                  /* ----------------------------------------------------------------------------------------------  */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={4} container direction="column" justifyContent="flex-start" spacing={1}>
                    <Grid item xs={12} padding={1}>
                      <FightAnalysisTable data={this.state.Updateddatacasts} type="cooldown" />
                    </Grid>
                    {/* ---------------------------------------------------------------------------------------------- */
                    /*                                    Defensive Usage Timeline                                    */
                    /* ---------------------------------------------------------------------------------------------- */}
                    <Grid item xs={12} padding={1}>
                      <FightAnalysisTable data={this.state.defensiveCasts} type="defensive" />
                    </Grid>
                  </Grid>
                  {/* ---------------------------------------------------------------------------------------------- */
                  /*                                     External Usage Timeline                                     */
                  /* ----------------------------------------------------------------------------------------------  */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={4} padding={1}>
                    <FightAnalysisTable data={this.state.externalUsageTimelineData} type="external" />
                  </Grid>

                  {/* ---------------------------------------------------------------------------------------------- */
                  /*                                           DTPS Graph                                            */
                  /* ----------------------------------------------------------------------------------------------  */}
                  {/* <Grid item xs={12} sm={12} md={12} lg={4} xl={4} padding={1}>
                    <Example dataToShow={this.state.chartData} mitigated={this.state.summedMitigationDamagePerSecond} unmitigated={this.state.summedUnmitigatedDamagePerSecond} />
                  </Grid> */}
                  {/* ---------------------------------------------------------------------------------------------- */
                  /*                                    Healer Information Cards                                     */
                  /* ----------------------------------------------------------------------------------------------  */}
                  {/* ------------------------------- Stats / Talents / Soulbinds Etc ------------------------------ */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={4} padding={1}>
                    <Paper style={{ padding: 8, marginBottom: 8 }} elevation={0}>
                      <Typography variant="h6" color="primary">
                        {/* TODO: Translate */}
                        Healer Information
                      </Typography>
                    </Paper>
                    <HealerInfoTable heals={this.state.healernames} />
                  </Grid>

                  {/* ------------------------------------ Enemy Casts Timeline ------------------------------------ */}
                  {/* --- Not sure if this will be used, but it shows the enemies casts and when might be useful ---  */}
                  {/* <Grid item xs={12} sm={12} md={12} lg={6} xl={6} padding={1}>
                    <EnemyCastsTimeline data={this.state.enemyCastsTimelineData} />
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ height: 350 }} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default FightAnalysis;
