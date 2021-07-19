import React, { Component } from "react";
import { Typography, Collapse, CircularProgress, Grid, Accordion, AccordionSummary, AccordionDetails, Dialog, Divider, Paper, Grow } from "@material-ui/core";
import LogLinkInput from "../../SystemTools/LogImport/LogLinkInput";
import Chart from "../CooldownPlanner/ModuleComponents/Chart/Chart";
import Example from "./LogDetailComponents/DTPSBarChart";
import FightSelectorButton from "../../SystemTools/LogImport/FightSelectorButton";
import LoadingOverlay from "react-loading-overlay";
// import CooldownPlanner from "../CooldownPlanner/ModuleComponents/CooldownPlanner.js";
import CooldownTimeline from "./LogDetailComponents/CooldownTimelineTable";
import { fightDuration, warcraftLogReportID, logDifficulty } from "../CooldownPlanner/Functions/Functions";
import bossHeaders from "../CooldownPlanner/Functions/IconFunctions/BossHeaderIcons";
import ERTTable from "../CooldownPlanner/ModuleComponents/ERTTable";
import SwitchLabels from "../CooldownPlanner/BasicComponents/Switch";
import HealerInfoTable from "./LogDetailComponents/HealerInfoCards";
import HealTeam from "../CooldownPlanner/ModuleComponents/HealTeamTable";
import updatechartdata from "../CooldownPlanner/Engine/LogImportEngine.js";
import chartCooldownUpdater from "../CooldownPlanner/Engine/UserCooldownChartEngine.js";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ls from "local-storage";
import ExternalTimeline from "./LogDetailComponents/ExternalTimelineTable";
import EnemyCastsTimeline from "./LogDetailComponents/EnemyCasts";

class FightAnalysis extends Component {
  constructor() {
    super();
    /* ----------------------- We bind the below functions to this Component. ----------------------- */
    // This means these functions can be passed as props to other components and they will return here rather than in the component they are sent to.
    this.reportidHandler = this.reportidHandler.bind(this);
    this.damageTableShow = this.damageTableShow.bind(this);
    this.customCooldownsOnChart = this.customCooldownsOnChart.bind(this);
    this.handler = this.handler.bind(this);
    this.updatechartdataNew = updatechartdata.bind(this);
    this.chartCooldownUpdater = chartCooldownUpdater.bind(this);
    this.ertHandler = this.ertHandler.bind(this);
    this.timelineHandler = this.timelineHandler.bind(this);
    this.handleERTClickOpen = this.handleERTClickOpen.bind(this);
    this.handleHealTeamClickOpen = this.handleHealTeamClickOpen.bind(this);

    /* ---------------------- We set our state for the cooldown Planner Module. --------------------- */
    this.state = {
      currentBossID: null,
      unmitigatedChartData: [],
      logactuallink: null,
      loglink: "Insert Log Here",
      reportid: null,
      time: null,
      times: [{ timestamp: 0 }],
      timeend: null,
      abilityList: ["Melee"],
      cooldownlist: ["none"],
      loadingcheck: false,
      boss: null,
      healernames: [],
      checked: false,
      tabledata: [],
      unmitigatedChartDataNoCooldownsOriginal: [],
      unmitigatedChartDataNoCooldowns: [],
      mitigatedChartDataNoCooldownsOriginal: [],
      mitigatedChartDataNoCooldowns: [],
      cooldownlistcustom2: ["none"],
      currentEndTime: 0,
      currentStartTime: 0,
      damageTableShow: false,
      logDetailsShow: false,
      customCooldownsOnChart: false,
      switchPanelShow: true,
      ertListTimeNoIcons: [],
      ertListBossAbility: [],
      ertListAbilityNoTimeIconsAll: [],
      ertListTimeIcons: [],
      ertListNoteIcons: [],
      ertListNoteNoIcons: [],
      currentFighttime: null,
      killWipe: null,
      showname: false,
      Updateddatacasts: [],
      ertshowhide: false,
      timelineshowhide: false,
      legenddata: [],
      uniqueArrayGuid: [],
      mitigatedChartData: [],
      chartData: true,
      summedUnmitigatedDamagePerSecond: [],
      currentDifficulty: null,
      currentKeystone: null,
      cooldownPlannerCurrentData: [],
      cooldownPlannerCurrentRaid: "",
      cooldownPlannerCurrentBoss: "",
      cooldownPlannerCurrentPlan: 1,
      ertDialogState: false,
      healTeamDialogState: false,
      externalUsageTimelineData: [],
      enemyCastsTimelineData: [],
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
      logDetailsShow: true,
      switchPanelShow: false,
      damageTableShow: true,
      customCooldownsOnChart: true,
      currentFighttime: info[3],
      killWipe: info[4],
      currentBossID: info[5],
      currentDifficulty: logDifficulty(info[6]),
      currentKeystone: info[7],
      cooldownPlannerCurrentRaid: info[8],
      cooldownPlannerCurrentBoss: info[5],
    });

    /* ------------ Get the 1st plan for imported boss/log and set as data automatically ------------ */
    let data = ls.get(info[8] + "." + info[5] + ".1");
    if (data !== null) {
      this.setState({
        cooldownPlannerCurrentData: data,
      });
    }
  };

  /* ------------------------------------ Change Raid Function ------------------------------------ */
  /* -------------------------- This changes which raid the plan is using ------------------------- */
  handleChangeRaidCooldownPlanner = (event) => {
    this.setState({
      cooldownPlannerCurrentRaid: event,
    });
  };

  /* ------------------------------------ Change Boss Function ------------------------------------ */
  /* -------------------------- This changes which boss the plan is using ------------------------- */
  handleChangeBossCooldownPlanner = (event) => {
    this.setState({
      cooldownPlannerCurrentBoss: event,
      cooldownPlannerCurrentPlan: 1,
    });
    /* ----------------- Get the 1st Plan for Selected Boss and set as current data ----------------- */
    let data = ls.get(this.state.cooldownPlannerCurrentRaid + "." + event + ".1");
    this.setState({
      cooldownPlannerCurrentData: data,
    });
  };

  /* ------------------------------------ Change Plan Function ------------------------------------ */

  handleChangePlanCooldownPlanner = (event) => {
    this.setState({ cooldownPlannerCurrentPlan: event });
    /* ------------------------- If Plan does not exist then set empty array ------------------------ */
    if (ls.get(this.state.cooldownPlannerCurrentRaid + "." + this.state.cooldownPlannerCurrentBoss + "." + event) === null) {
      ls.set(this.state.cooldownPlannerCurrentRaid + "." + this.state.cooldownPlannerCurrentBoss + "." + event, []);
    }

    /* -------------------------- Get the Relevant Plan from local storage -------------------------- */
    let data = ls.get(this.state.cooldownPlannerCurrentRaid + "." + this.state.cooldownPlannerCurrentBoss + "." + event);
    this.setState({
      cooldownPlannerCurrentData: data,
    });
  };

  handleChangeDataCooldownPlanner = (data) => {
    this.setState({ cooldownPlannerCurrentData: data });
  };

  /* ------------------ Sets the state on whether the Log Cooldown Chart is Shown ----------------- */
  damageTableShow = (event) => {
    this.setState({ damageTableShow: event });
  };

  /* ------------------------------ Shows / Hides the Details Panels ------------------------------ */
  logDetailsShow = (event) => {
    this.setState({ logDetailsShow: event });
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

  ertHandler = () => {
    this.setState((prevState) => ({
      ertshowhide: !prevState.ertshowhide,
    }));
  };

  timelineHandler = () => {
    this.setState((prevState) => ({
      timelineshowhide: !prevState.timelineshowhide,
    }));
  };

  // ERT Dialog Handlers
  handleERTClickOpen = () => {
    this.setState({ ertDialogState: true });
  };

  handleERTClose = () => {
    this.setState({ ertDialogState: false });
  };

  /* ---------------------------------- Heal Team Dialog Handlers --------------------------------- */
  handleHealTeamClickOpen = () => {
    this.setState({ healTeamDialogState: true });
  };

  handleHealTeamClose = () => {
    this.setState({ healTeamDialogState: false });
  };

  render() {
    /* ------------------------------------ Data Loading Spinner ------------------------------------ */
    let spinnershow = this.state.loadingcheck;

    return (
      <div
        style={{
          marginTop: 32,
        }}
      >
        <div style={{ margin: "20px 5% 20px 5%" }}>
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

            {/* ----------- Grid Container for the User Input Components, With Paper as the Surface ---------- */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paper elevation={0} padding={0} style={{ padding: "10px 5px 10px 10px" }}>
                {/* ------------------- Grid Container for the Log Input/Fight Selection Button ------------------ */}
                <Grid
                  container
                  spacing={1}
                  justify="space-between"
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
              justify="flex-start"
              alignItems="flex-start"
              spacing={1}
              style={{
                display: this.state.damageTableShow ? "block" : "none",
              }}
            >
              <Grid item xs={12}>
                {/* ---------------------------- Imported Log Info (Name, Length etc) ---------------------------- */}
                <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                  <Grid item xs={8}>
                    <Collapse in={this.state.damageTableShow}>
                      <Grow in={this.state.damageTableShow} style={{ transformOrigin: "0 0 0" }} {...(this.state.damageTableShow ? { timeout: 1000 } : {})}>
                        <Paper
                          bgcolor="#333"
                          elevation={0}
                          style={{
                            display: "inline-flex",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          {bossHeaders(this.state.currentBossID, {
                            height: 64,
                            width: 128,
                            padding: "0px 5px 0px 5px",
                            verticalAlign: "middle",
                            marginRight: "-50px",
                          })}
                          <div>
                            {this.state.showname ? (
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
                            ) : null}
                            {this.state.showname ? (
                              <Typography
                                style={{
                                  fontWeight: 500,
                                  fontSize: "0.9rem",
                                  color: "white",
                                  padding: "0px 16px 0px 16px",
                                  textAlign: "center",
                                }}
                              >
                                {this.state.currentFighttime + " - " + this.state.killWipe}
                              </Typography>
                            ) : null}
                          </div>
                        </Paper>
                      </Grow>
                    </Collapse>
                  </Grid>

                  {/* ------------------------------ Container for the Toggle Buttons ------------------------------ */}
                  <Grid item xs={4}>
                    <Collapse in={this.state.damageTableShow}>
                      <Grow in={this.state.damageTableShow} style={{ transformOrigin: "0 0 0" }} {...(this.state.damageTableShow ? { timeout: 1000 } : {})}>
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
                          <Grid container direction="row" justify="space-evenly" alignItems="center">
                            {/* <Grid item>
                              <SwitchLabels disabled={this.state.switchPanelShow} check={this.damageTableShow} label={"Log Chart"} />
                            </Grid> */}
                            {/* <Grid item>
                              <SwitchLabels disabled={this.state.switchPanelShow} check={this.logDetailsShow} label={"Toggle Log Details"} />
                            </Grid> */}
                            <Grid item>
                              <SwitchLabels disabled={this.state.switchPanelShow} check={this.customCooldownsOnChart} label={"Show Custom Coolowns"} />
                            </Grid>
                            <Grid item>
                              <SwitchLabels disabled={this.state.switchPanelShow} check={this.changeDataSet} label={this.state.chartData === true ? "Unmitigated" : "Mitigated"} />
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
                // padding={1}
                style={{
                  display: this.state.damageTableShow ? "block" : "none",
                }}
              >
                <Collapse in={this.state.damageTableShow}>
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
                      endtime={fightDuration(this.state.timeend, this.state.time)}
                      customCooldowns={this.state.cooldownlistcustom2}
                      showcds={true}
                    />
                  </LoadingOverlay>
                </Collapse>
              </Grid>
            </Grid>
            {/* ----------------------------- Grid Container for the log details ----------------------------- */}
            {/* ---------------- Cooldown / External Timeline / Healer Info Cards / DTPS by ability --------------- */}
            <Grid
              item
              container
              style={{
                display: this.state.logDetailsShow ? "block" : "none",
              }}
            >
              <Collapse in={this.state.logDetailsShow} style={{ width: "100%" }}>
                <Grid item container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
                  {/* ----------------------------------- Cooldown Usage Timeline ---------------------------------- */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6} padding={1}>
                    <CooldownTimeline data={this.state.Updateddatacasts} />
                  </Grid>
                  {/* ----------------------------------- External Usage Timeline ---------------------------------- */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6} padding={1}>
                    <ExternalTimeline data={this.state.externalUsageTimelineData} />
                  </Grid>
                  {/* ----------------------------------------- DTPS Graph ----------------------------------------- */}
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4} padding={1}>
                    <Example dataToShow={this.state.chartData} mitigated={this.state.summedMitigationDamagePerSecond} unmitigated={this.state.summedUnmitigatedDamagePerSecond} />
                  </Grid>
                  {/* ---------------------------------- Healer Information Cards ---------------------------------- */}
                  {/* ------------------------------- Stats / Talents / Soulbinds Etc ------------------------------ */}
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4} padding={1}>
                    <Paper style={{ padding: 8, marginBottom: 8 }} elevation={0}>
                      <Typography variant="h6" color="primary" style={{ padding: "4px 8px 4px 24px" }}>
                        {/* // TODO Translate */}
                        Healer Information
                      </Typography>
                      <Divider />
                    </Paper>
                    <HealerInfoTable heals={this.state.healernames} />
                  </Grid>

                  {/* ------------------------------------ Enemy Casts Timeline ------------------------------------ */}
                  {/* ----------- Not sure if this will be used, but it shows the enemies casts and when ----------- */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6} padding={1}>
                    <EnemyCastsTimeline data={this.state.enemyCastsTimelineData} />
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
            <Grid item xs={12} style={{ height: 350 }} />
          </Grid>
        </div>

        {/* ------------------------------------ ERT Note Export Table ----------------------------------- */}
        <Dialog onClose={this.handleERTClose} aria-labelledby="ERT-Dialog" open={this.state.ertDialogState} maxWidth="md" fullWidth PaperProps={{ style: { minWidth: 300 } }}>
          <ERTTable
            ertListTimeNoIcons={this.state.ertListTimeNoIcons}
            ertListBossAbility={this.state.ertListBossAbility}
            ertListAbilityNoTimeIconsAll={this.state.ertListAbilityNoTimeIconsAll}
            ertListTimeIcons={this.state.ertListTimeIcons}
            ertListNoteIcons={this.state.ertListNoteIcons}
            ertListNoteNoIcons={this.state.ertListNoteNoIcons}
          />
        </Dialog>

        {/* ------------------------------------- Healer Team Dialog ------------------------------------- */}
        {/* ------------------- This is where you enter your healing team into the app. ------------------ */}
        <Dialog onClose={this.handleHealTeamClose} aria-labelledby="ERT-Dialog" open={this.state.healTeamDialogState} maxWidth="lg" fullWidth PaperProps={{ style: { minWidth: 300 } }}>
          <HealTeam />
        </Dialog>
      </div>
    );
  }
}

export default FightAnalysis;
