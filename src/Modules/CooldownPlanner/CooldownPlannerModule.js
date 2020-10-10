import React, { Component } from "react";
import {
  Typography,
  Collapse,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import LogLinkInput from "../CooldownPlanner/ModuleComponents/LogFightSelection/LogLinkInput";
import Chart from "./ModuleComponents/Chart/Chart";
import Example from "../CooldownPlanner/ModuleComponents/LogDetailComponents/DTPSBarChart";
import FightSelectorButton from "../CooldownPlanner/ModuleComponents/LogFightSelection/FightSelectorButton";
import LoadingOverlay from "react-loading-overlay";
import CooldownPlanner from "../CooldownPlanner/ModuleComponents/CooldownPlanner.js";
import CooldownTimeline from "../CooldownPlanner/ModuleComponents/LogDetailComponents/CooldownTimelineTable";
import DenseAppBar from "../CooldownPlanner/BasicComponents/Appbar";
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

class HolyDiver extends Component {
  constructor(props) {
    super();
    // Jere we bind the below functions to this Component.
    // This means these functions can be passed as props to other components and they will return here rather than in the component they are sent to.
    this.reportidHandler = this.reportidHandler.bind(this);
    this.damageTableShow = this.damageTableShow.bind(this);
    this.healTableShow = this.healTableShow.bind(this);
    this.handler = this.handler.bind(this);
    this.updatechartdataNew = updatechartdata.bind(this);
    this.chartCooldownUpdater = chartCooldownUpdater.bind(this);
    this.ertHandler = this.ertHandler.bind(this);
    this.timelineHandler = this.timelineHandler.bind(this);
    // Here we set our state for the cooldown Planner Module.
    this.state = {
      currentBossID: null,
      unmitigatedChartData: [],
      logactuallink: null,
      loglink: "Insert Log Here",
      reportid: null,
      time: null,
      times: [{ timestamp: 0 }],
      timeend: null,
      abilitylist: ["Melee"],
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
      damageTableShow: true,
      healTableShow: true,
      currentFighttime: info[3],
      killWipe: info[4],
      currentBossID: info[5],
      currentDifficulty: logDifficulty(info[6]),
      currentKeystone: info[7],
    });
  };

  // This Function sets the state on whether the Log Cooldown Chart is Shown.
  damageTableShow = (event) => {
    this.setState({ damageTableShow: event });
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
        <div style={{ margin: "20px 2% 20px 2%" }}>
          {/* Main Grid for the Compoonent, this should control the base spacing of all the base components,
              any Grid Components within this with the item prop will have spacing  */}
          <Grid container spacing={1}>
            {/* Grid Container for the User Input Components, With Paper as the Surface */}
            <Grid item container>
              <Paper
                style={{
                  display: "inline-flex",
                  margin: "0px 0px 4px 0px",
                  borderRadius: 4,
                  padding: "10px 10px 10px 10px",
                  boxShadow:
                    "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
                  // backgroundColor: "#333"
                }}
              >
                {/* Grid Container for the Log Input/Fight Selection Button */}
                <Grid
                  item
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Grid item xs="auto" padding={1}>
                    <LogLinkInput
                      changed={this.reportidHandler}
                      reportid={this.state.reportid}
                    />
                  </Grid>
                  <Grid item xs="auto" padding={1}>
                    <FightSelectorButton
                      reportid={this.state.reportid}
                      clicky={this.handler}
                      update={this.updatechartdataNew}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Grid Container for Log Details i.e Boss, Difficulty, Fight Length and Chart Switches (Potentially Move these out of this Container) */}
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={1}
              style={{ display: this.state.logDetailsShow ? "block" : "none" }}
            >
              <Grid item xs={12} padding={1}>
                <Collapse in={this.state.logDetailsShow}>
                  <Grow
                    in={this.state.logDetailsShow}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(this.state.logDetailsShow ? { timeout: 1000 } : {})}
                  >
                    <Paper
                      bgcolor="#333"
                      style={{
                        borderRadius: 4,
                        boxShadow:
                          "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        {bossHeaders(this.state.currentBossID)}
                        <Grid item xs={11} padding={1} align="center">
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
                        </Grid>

                        {/* Grid item for the Switches controlling Chart Features. i.e Show Charts, Mitigated/Unmitigated Damage */}
                        <Grid item xs={1} padding={1}>
                          <SwitchLabels
                            check={this.damageTableShow}
                            label={"Log Chart"}
                          />
                          <SwitchLabels
                            check={this.healTableShow}
                            label={"Custom CD Chart"}
                          />
                          <SwitchLabels
                            check={this.changeDataSet}
                            label={
                              this.state.chartData === true
                                ? "Unmitigated"
                                : "Mitigated"
                            }
                          />
                        </Grid>
                      </div>
                    </Paper>
                  </Grow>
                </Collapse>
              </Grid>
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
              style={{ display: this.state.damageTableShow ? "block" : "none" }}
            >
              <Grid item xs={12} padding={1}>
                <Collapse in={this.state.damageTableShow}>
                  <LoadingOverlay
                    active={spinnershow}
                    spinner={<CircularProgress color="secondary" />}
                  >
                    <Chart
                      dataToShow={this.state.chartData}
                      mitigated={this.state.mitigatedChartData}
                      unmitigated={this.state.unmitigatedChartData}
                      abilitylist={this.state.abilitylist}
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
              style={{ display: this.state.damageTableShow ? "block" : "none" }}
            >
              <Collapse
                in={this.state.damageTableShow}
                style={{ width: "100%" }}
              >
                <Grid
                  item
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                  style={{paddingLeft: "11%", paddingRight: "11%"}}
                >
                  <Grid item xs={4} padding={1}>
                    <DenseAppBar
                      onClick={this.timelineHandler}
                      title="Cooldown Timeline"
                    />
                    <Collapse in={this.state.timelineshowhide}>
                      <CooldownTimeline
                        data={this.state.Updateddatacasts}
                        curLang={this.props.curLang}
                      />
                    </Collapse>
                  </Grid>

                  <Grid item xs={4} padding={1}>
                    <Collapse in={this.state.damageTableShow}>
                      <DenseAppBar
                        onClick={this.timelineHandler}
                        title="Healer Talents/Legendaries"
                      />
                      <Collapse in={this.state.timelineshowhide}>
                        <HealerInfoTable heals={this.state.healernames} />
                      </Collapse>
                    </Collapse>
                  </Grid>

                  <Grid item xs={4} padding={1}>
                    <Collapse in={this.state.damageTableShow}>
                      <DenseAppBar
                        onClick={this.timelineHandler}
                        title="DTPS by Ability"
                      />
                      <Collapse in={this.state.timelineshowhide}>
                        <Example
                          data={this.state.summedUnmitigatedDamagePerSecond}
                        />
                      </Collapse>
                    </Collapse>
                  </Grid>

                  {/*
                        Below is For a 4th data panel (may just remove and run 3 panels)
                    */}

                  {/*
                <Grid item xs={3} padding={1}>
                  <Collapse in={this.state.damageTableShow}></Collapse>

                <DenseAppBar
                  onClick={this.timelineHandler}
                  title="placeholder thing"
                />
                <Collapse in={this.state.timelineshowhide}>
                  <dtpsTable
                    data={this.state.Updateddatacasts}
                    columns={[
                      { title: "Name", field: "name" },
                      {
                        title: "Ability",
                        field: "ability",
                        render: (rowData) => abilityicons(rowData.ability),
                      },
                      { title: "Time", field: "timestamp" },
                    ]}
                    title="Timeline"
                    header={true}
                  />
                </Collapse>
              </Grid>
                    */}
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
              <Grid item xs={12} padding={1}>
                <Collapse in={this.state.healTableShow}>
                  <LoadingOverlay
                    active={spinnershow}
                    spinner={<CircularProgress color="secondary" />}
                  >
                    <Chart
                      dataToShow={this.state.chartData}
                      mitigated={this.state.mitigatedChartDataNoCooldowns}
                      unmitigated={this.state.unmitigatedChartDataNoCooldowns}
                      abilitylist={this.state.abilitylist}
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
              <Grid item xs={4} padding={1}>
                <HealTeam curLang={this.props.curLang} />
              </Grid>
              <Grid item xs={8} padding={1}>
                <CooldownPlanner
                  update={this.chartCooldownUpdater}
                  curLang={this.props.curLang}
                />
              </Grid>
            </Grid>

            {/*
                ERT Table - This is for an easy export of the Cooldowns PLanned to paste into ERT
            */}
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item xs={3} padding={1}>
                <DenseAppBar onClick={this.ertHandler} title="ERT Note" />
                <Collapse in={this.state.ertshowhide}>
                  <ERTTable
                    data={this.state.ertList}
                    curLang={this.props.curLang}
                  />
                </Collapse>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default HolyDiver;