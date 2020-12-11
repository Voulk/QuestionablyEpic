import React, { Component } from "react";
import {
  Typography,
  Collapse,
  CircularProgress,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import LogLinkInput from "../CooldownPlanner/ModuleComponents/LogFightSelection/LogLinkInput";
import Chart from "./ModuleComponents/Chart/Chart";
import Example from "../CooldownPlanner/ModuleComponents/LogDetailComponents/DTPSBarChart";
import FightSelectorButton from "../CooldownPlanner/ModuleComponents/LogFightSelection/FightSelectorButton";
import LoadingOverlay from "react-loading-overlay";
import CooldownPlanner from "../CooldownPlanner/ModuleComponents/CooldownPlanner.js";
import CooldownTimeline from "../CooldownPlanner/ModuleComponents/LogDetailComponents/CooldownTimelineTable";
import {
  fightDurationCalculator,
  warcraftLogReportID,
  logDifficulty,
} from "../CooldownPlanner/Functions/Functions";
import bossHeaders from "../CooldownPlanner/Functions/IconFunctions/BossHeaderIcons";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ERTTable from "../CooldownPlanner/ModuleComponents/ERTTable";
import SwitchLabels from "./BasicComponents/Switch";
import HealerInfoTable from "../CooldownPlanner/ModuleComponents/LogDetailComponents/HealerInfoCards";
import HealTeam from "../CooldownPlanner/ModuleComponents/HealTeamTable";
import updatechartdata from "./Engine/LogImportEngine.js";
import chartCooldownUpdater from "./Engine/UserCooldownChartEngine.js";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ls from "local-storage";

class HolyDiver extends Component {
  constructor(props) {
    super();
    // We bind the below functions to this Component.
    // This means these functions can be passed as props to other components and they will return here rather than in the component they are sent to.
    this.reportidHandler = this.reportidHandler.bind(this);
    this.damageTableShow = this.damageTableShow.bind(this);
    this.healTableShow = this.healTableShow.bind(this);
    this.handler = this.handler.bind(this);
    this.updatechartdataNew = updatechartdata.bind(this);
    this.chartCooldownUpdater = chartCooldownUpdater.bind(this);
    this.ertHandler = this.ertHandler.bind(this);
    this.timelineHandler = this.timelineHandler.bind(this);
    this.handleChangeBossCooldownPlanner = this.handleChangeBossCooldownPlanner.bind(
      this
    );
    this.handleChangeRaidCooldownPlanner = this.handleChangeRaidCooldownPlanner.bind(
      this
    );
    this.handleChangeDataCooldownPlanner = this.handleChangeDataCooldownPlanner.bind(
      this
    );
    this.handleChangePlanCooldownPlanner = this.handleChangePlanCooldownPlanner.bind(
      this
    );
    // We set our state for the cooldown Planner Module.
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
      healTableShow: false,
      switchPanelShow: true,
      ertList: [],
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
      cooldownPlannerCurrentPlan: "",
    };
  }

  // this function is bound to this component.
  // It is passed as a prop for the fight Selector, and the states are set depending on the data returned.
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
      healTableShow: true,
      currentFighttime: info[3],
      killWipe: info[4],
      currentBossID: info[5],
      currentDifficulty: logDifficulty(info[6]),
      currentKeystone: info[7],
      cooldownPlannerCurrentRaid: info[8],
      cooldownPlannerCurrentBoss: info[5],
    });

    let data = ls.get(info[8] + "." + info[5] + ".1");
    if (data !== null) {
      this.setState({
        cooldownPlannerCurrentData: data,
      });
    }
  };

  handleChangeRaidCooldownPlanner = (event) => {
    this.setState({
      cooldownPlannerCurrentRaid: event,
    });
  };

  handleChangeBossCooldownPlanner = (event) => {
    this.setState({
      cooldownPlannerCurrentBoss: event,
      cooldownPlannerCurrentPlan: 1,
    });
    let data = ls.get(
      this.state.cooldownPlannerCurrentRaid + "." + event + ".1"
    );
    this.setState({
      cooldownPlannerCurrentData: data,
    });
  };

  handleChangePlanCooldownPlanner = (event) => {
    console.log(event);
    this.setState({ cooldownPlannerCurrentPlan: event });
    if (
      ls.get(
        this.state.cooldownPlannerCurrentRaid +
          "." +
          this.state.cooldownPlannerCurrentBoss +
          "." +
          event
      ) === null
    ) {
      ls.set(
        this.state.cooldownPlannerCurrentRaid +
          "." +
          this.state.cooldownPlannerCurrentBoss +
          "." +
          event,
        []
      );
    }
    let data = ls.get(
      this.state.cooldownPlannerCurrentRaid +
        "." +
        this.state.cooldownPlannerCurrentBoss +
        "." +
        event
    );
    this.setState({
      cooldownPlannerCurrentData: data,
    });
  };

  handleChangeDataCooldownPlanner = (data) => {
    this.setState({ cooldownPlannerCurrentData: data });
  };

  // This Function sets the state on whether the Log Cooldown Chart is Shown.
  damageTableShow = (event) => {
    this.setState({ damageTableShow: event });
  };

  logDetailsShow = (event) => {
    this.setState({ logDetailsShow: event });
  };

  // This Function sets the state on whether the User Input Cooldown Chart is Shown.
  healTableShow = (event) => {
    this.setState({ healTableShow: event });
  };

  // This funtion sets the state for Unmitigated/Mitigated Damage shown.
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

  render() {
    let spinnershow = this.state.loadingcheck;

    return (
      <div>
        <div style={{ margin: "20px 12% 20px 12%" }}>
          {/* Main Grid for the Compoonent, this should control the base spacing of all the base components,
              any Grid Components within this with the item prop will have spacing  */}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    style={{ color: "limegreen" }}
                    align="centre"
                    variant="subtitle1"
                    // gutterBottom
                  >
                    Welcome to the Cooldown Planner!
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    style={{ color: "limegreen" }}
                    align="left"
                    variant="subtitle1"
                    // gutterBottom
                  >
                    To Begin start by adding Healers to your Heal Team.
                    Importing a log will bring up the damage pattern of the
                    selected fight, with the cooldowns used on the log overlayed
                    to give an indication of what they were used for, what they
                    were used etc.
                  </Typography>
                </AccordionDetails>

                <AccordionDetails>
                  <Typography
                    style={{ color: "limegreen" }}
                    align="left"
                    variant="subtitle1"
                    // gutterBottom
                  >
                    A timeline of the abilities will show in the Timeline
                    Component.
                  </Typography>
                </AccordionDetails>

                <AccordionDetails>
                  <Typography
                    style={{ color: "limegreen" }}
                    align="left"
                    variant="subtitle1"
                    // gutterBottom
                  >
                    Healer information shows a card for each healer showing
                    their stats, talents, conduit choices.
                  </Typography>
                </AccordionDetails>

                <AccordionDetails>
                  <Typography
                    style={{ color: "limegreen" }}
                    align="left"
                    variant="subtitle1"
                    // gutterBottom
                  >
                    The DTPS chart shows the damaging abilities over the entire
                    fight.
                  </Typography>
                </AccordionDetails>

                <AccordionDetails>
                  <Typography
                    style={{ color: "limegreen" }}
                    align="left"
                    variant="subtitle1"
                    // gutterBottom
                  >
                    Below that another Chart is shown with the damage pattern
                    from the log, this has no cooldowns from the log shown, but
                    cooldowns you enter into the planner (with times) will be
                    shown on this chart.
                  </Typography>
                </AccordionDetails>

                <AccordionDetails>
                  <Typography
                    style={{ color: "limegreen" }}
                    align="left"
                    variant="subtitle1"
                    // gutterBottom
                  >
                    The Planner itself will unlock after you enter your healers
                    into the Heal Team. Enter your Healers, Cooldowns you want
                    used, time to cast (If Applicable, you CAN enter cooldowns
                    without a time, they will just not show up on the Chart/ERT
                    Note, to keep them in order you should currently use numbers
                    to keep them in order, i.e 1, 2 3), the ability to use it
                    for etc.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            {/* Grid Container for the User Input Components, With Paper as the Surface */}
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
              <Paper
                style={{
                  display: "inline-flex",
                  padding: 10,
                  width: "100%",
                }}
                elevation={0}
              >
                {/* Grid Container for the Log Input/Fight Selection Button */}
                <Grid container spacing={1} justify="space-between">
                  <Grid item xs={10}>
                    <LogLinkInput
                      changed={this.reportidHandler}
                      reportid={this.state.reportid}
                      styleProps={{ fullWidth: true }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FightSelectorButton
                      reportid={this.state.reportid}
                      clicky={this.handler}
                      update={this.updatechartdataNew}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={5}
              lg={5}
              xl={5}
              justify="flex-end"
            >
              <Paper
                style={{
                  display: "inline-flex",
                  margin: "0px 0px 4px 0px",
                  padding: "10px 10px 10px 10px",
                }}
                elevation={0}
              >
                {/* this.state.switchPanelShow */}
                <SwitchLabels
                  disabled={this.state.switchPanelShow}
                  check={this.damageTableShow}
                  label={"Log Chart"}
                />
                <SwitchLabels
                  disabled={this.state.switchPanelShow}
                  check={this.logDetailsShow}
                  label={"Toggle Log Details"}
                />
                <SwitchLabels
                  disabled={this.state.switchPanelShow}
                  check={this.healTableShow}
                  label={"Custom CD Chart"}
                />
                <SwitchLabels
                  disabled={this.state.switchPanelShow}
                  check={this.changeDataSet}
                  label={
                    this.state.chartData === true ? "Unmitigated" : "Mitigated"
                  }
                />
              </Paper>
            </Grid>

            {/*
                Grid Container for the Log Chart (Damage + Cooldowns used).
                The function in the style removes padding from showing while Collapsed
            */}
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
              <Grid item xs={12} padding={1}>
                <Collapse in={this.state.damageTableShow}>
                  <Grow
                    in={this.state.damageTableShow}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(this.state.damageTableShow ? { timeout: 1000 } : {})}
                  >
                    <Paper bgcolor="#333" elevation={0}>
                      <Grid item xs={12} padding={1} align="center">
                        <div
                          style={{
                            display: "inline-flex",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          {bossHeaders(this.state.currentBossID)}
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
                                {this.state.boss} -{" "}
                                {this.state.currentDifficulty}
                                {this.state.currentKeystone === null ||
                                this.state.currentKeystone === undefined
                                  ? null
                                  : this.state.currentKeystone}
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
                                {this.state.currentFighttime +
                                  " - " +
                                  this.state.killWipe}
                              </Typography>
                            ) : null}
                          </div>
                        </div>
                      </Grid>
                    </Paper>
                  </Grow>
                </Collapse>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                padding={1}
                style={{
                  display: this.state.damageTableShow ? "block" : "none",
                }}
              >
                <Collapse in={this.state.damageTableShow}>
                  <LoadingOverlay
                    active={spinnershow}
                    spinner={<CircularProgress color="secondary" />}
                  >
                    <Chart
                      dataToShow={this.state.chartData}
                      mitigated={this.state.mitigatedChartData}
                      unmitigated={this.state.unmitigatedChartData}
                      abilityList={this.state.abilityList}
                      legendata={this.state.legenddata}
                      cooldown={this.state.cooldownlist}
                      endtime={fightDurationCalculator(
                        this.state.timeend,
                        this.state.time
                      )}
                      showcds={true}
                    />
                  </LoadingOverlay>
                </Collapse>
              </Grid>
            </Grid>

            {/*
                Grid Container for the Cooldown Timeline used in the log table. the healer cards showing healer stats from log, and the 
                The function in the style removes padding from showing while Collapsed
            */}
            <Grid
              item
              container
              style={{
                display: this.state.logDetailsShow ? "block" : "none",
              }}
            >
              <Collapse
                in={this.state.logDetailsShow}
                style={{ width: "100%" }}
              >
                <Grid
                  item
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4} padding={1}>
                    <CooldownTimeline data={this.state.Updateddatacasts} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4} padding={1}>
                    <Paper
                      style={{ padding: 8, marginBottom: 8 }}
                      elevation={0}
                    >
                      <Typography
                        variant="h6"
                        color="primary"
                        style={{ padding: "4px 8px 4px 24px" }}
                      >
                        Healer Information
                      </Typography>
                      <Divider />
                    </Paper>
                    <HealerInfoTable heals={this.state.healernames} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4} padding={1}>
                    <Example
                      dataToShow={this.state.chartData}
                      mitigated={this.state.summedMitigationDamagePerSecond}
                      unmitigated={this.state.summedUnmitigatedDamagePerSecond}
                    />
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>

            {/*
                Grid Container for the Log Chart (Damage + User Entered Cooldowns from the Cooldown Planner).
                The function in the style removes padding from showing while Collapsed
            */}
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={1}
              style={{ display: this.state.healTableShow ? "block" : "none" }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding={1}>
                <Collapse in={this.state.healTableShow}>
                  <LoadingOverlay
                    active={spinnershow}
                    spinner={<CircularProgress color="secondary" />}
                  >
                    <Chart
                      dataToShow={this.state.chartData}
                      mitigated={this.state.mitigatedChartDataNoCooldowns}
                      unmitigated={this.state.unmitigatedChartDataNoCooldowns}
                      abilityList={this.state.abilityList}
                      cooldown={this.state.cooldownlistcustom2}
                      endtime={fightDurationCalculator(
                        this.state.timeend,
                        this.state.time
                      )}
                      showcds={true}
                    />
                  </LoadingOverlay>
                </Collapse>
              </Grid>
            </Grid>

            {/*
                Grid Container for the Heal Team Table and Cooldown Planner
            */}
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={1}
              margin={4}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding={1}>
                <CooldownPlanner
                  update={this.chartCooldownUpdater}
                  data={this.state.cooldownPlannerCurrentData}
                  currentBoss={this.state.cooldownPlannerCurrentBoss}
                  bossHandler={this.handleChangeBossCooldownPlanner}
                  currentRaid={this.state.cooldownPlannerCurrentRaid}
                  raidHandler={this.handleChangeRaidCooldownPlanner}
                  planHandler={this.handleChangePlanCooldownPlanner}
                  currentPlan={this.state.cooldownPlannerCurrentPlan}
                  dataUpdateHandler={this.handleChangeDataCooldownPlanner}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={7} xl={7} padding={1}>
                <HealTeam />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={5} xl={5} padding={1}>
                <ERTTable data={this.state.ertList} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default HolyDiver;
