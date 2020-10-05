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
import moment from "moment";
import FightSelectorButton from "../CooldownPlanner/ModuleComponents/LogFightSelection/FightSelectorButton";
import LoadingOverlay from "react-loading-overlay";
import CooldownPlanner from "../CooldownPlanner/ModuleComponents/CooldownPlanner.js";
import CooldownTimeline from "../CooldownPlanner/ModuleComponents/LogDetailComponents/CooldownTimelineTable";
import DenseAppBar from "../CooldownPlanner/BasicComponents/Appbar";
import { classColoursERT } from "../CooldownPlanner/Functions/ClassColourFunctions";
import {
  fightDurationCalculator,
  durationmaker,
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
    this.tablehandler = this.tablehandler.bind(this);
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
    };
  }

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
    });
  };

  damageTableShow = (event) => {
    this.setState({ damageTableShow: event });
  };

  healTableShow = (event) => {
    this.setState({ healTableShow: event });
  };

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

  tablehandler = (element) => {
    let customCooldownDurations = [];
    let unmitigatedChartDataNoCooldowns = [];
    let mitigatedChartDataNoCooldowns = [];

    let customCooldownList = element.map(
      (key) => key.name + " - " + key.Cooldown
    );
    let uniqueCooldownListArray = Array.from(new Set(customCooldownList));

    let customCooldownInput = element.map((key) => ({
      ability: key.Cooldown,
      timestamp: moment.duration("00:" + key.time).asMilliseconds(),
      abilityname: key.name + " - " + key.Cooldown,
    }));

    customCooldownInput.map((key) =>
      customCooldownDurations.push(
        durationmaker(
          key.ability,
          key.timestamp,
          key.abilityname,
          moment(
            fightDurationCalculator(
              this.state.currentEndTime,
              this.state.currentStartTime
            )
          )
            .startOf("second")
            .valueOf()
        )
      )
    );

    let customCooldownDurationFlatArray = customCooldownDurations.flat();

    let concat2 = this.state.unmitigatedChartDataNoCooldownsOriginal;
    let concat3 = this.state.mitigatedChartDataNoCooldownsOriginal;

    let joinedarray = concat2.concat(customCooldownDurationFlatArray);
    let joinedarray2 = concat3.concat(customCooldownDurationFlatArray);
    joinedarray.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
    joinedarray2.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));

    let reducedData1 = joinedarray.reduce((acc, cur) => {
      acc[cur.timestamp] = joinedarray.reduce((x, n) => {
        for (let prop in n) {
          if (cur.timestamp === n.timestamp) {
            if (x.hasOwnProperty(prop)) {
              x[prop] += n[prop];
            } else {
              x[prop] = n[prop];
            }
          }
        }
        x.timestamp = cur.timestamp;
        return x;
      }, {});
      return acc;
    }, {});

    let reducedData2 = joinedarray2.reduce((acc, cur) => {
      acc[cur.timestamp] = joinedarray2.reduce((x, n) => {
        for (let prop in n) {
          if (cur.timestamp === n.timestamp) {
            if (x.hasOwnProperty(prop)) {
              x[prop] += n[prop];
            } else {
              x[prop] = n[prop];
            }
          }
        }
        x.timestamp = cur.timestamp;
        return x;
      }, {});
      return acc;
    }, {});

    Object.keys(reducedData1).forEach((element2) =>
      unmitigatedChartDataNoCooldowns.push(reducedData1[element2])
    );

    Object.keys(reducedData2).forEach((element2) =>
      mitigatedChartDataNoCooldowns.push(reducedData2[element2])
    );

    let ertNote = element.map((key) => ({
      ert:
        "{time:" +
        key.time +
        "}" +
        " - " +
        classColoursERT(key.class) +
        key.name +
        "|r" +
        " - " +
        key.Cooldown,
      time: key.time,
    }));

    this.setState({
      mitigatedChartDataNoCooldowns: mitigatedChartDataNoCooldowns,
      unmitigatedChartDataNoCooldowns: unmitigatedChartDataNoCooldowns,
      cooldownlistcustom2: uniqueCooldownListArray,
      ertList: ertNote,
    });
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
                bgcolor="#333"
                style={{
                  display: "inline-flex",
                  margin: "0px 0px 4px 0px",
                  borderRadius: 4,
                  padding: "10px 10px 10px 10px",
                  boxShadow:
                    "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
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
                <Paper style={{ padding: 10 }}>
                  <Grid
                    item
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    <Grid item xs={3} padding={1}>
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

                    <Grid item xs={3} padding={1}>
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

                    <Grid item xs={3} padding={1}>
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
                </Paper>
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
                  update={this.tablehandler}
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