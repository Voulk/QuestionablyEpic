import React, { Component } from "react";
import {
  Typography,
  Collapse,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import UserLogTextInput from "../HolyDiverModules/UserInput/UserLogTextInput";
import Chart from "../HolyDiverModules/Chart/Chart";
import moment from "moment";
import FightSelectorButton from "../HolyDiverModules/UserInput/FightSelectorButton";
import LoadingOverlay from "react-loading-overlay";
import CustomEditComponent from "../HolyDiverModules/CooldownTable/Table";
import InteractiveList from "../HolyDiverModules/Lists/ListGen";
import Checkboxes from "../HolyDiverModules/BasicComponents/CheckBox";
import CooldownTimeline from "../HolyDiverModules/CooldownTable/CooldownTimeline";
import DenseAppBar from "../HolyDiverModules/BasicComponents/Appbar";
import { classColoursERT } from "../HolyDiverModules/CooldownTable/ClassColourFunctions";
import {
  addMissingTimestamps,
  getUniqueObjectsFromArray,
  reduceTimestamps,
  fightDurationCalculator,
  importHealerLogData,
  importDamageLogData,
  importCastsLogData,
  durationmaker,
} from "../HolyDiverModules/Functions/Functions";
import bossHeaders from "../HolyDiverModules/CooldownTable/BossHeaderIcons";
import Grow from "@material-ui/core/Grow";
import QEHeader from "../QEModules/QEHeader";
import Paper from "@material-ui/core/Paper";
import DtpsTable from "../HolyDiverModules/CooldownTable/DtpsTable";
import ERTTable from "../HolyDiverModules/CooldownTable/ERTTable";

class HolyDiver extends Component {
  constructor(props) {
    super();
    this.damageTableShow = this.damageTableShow.bind(this);
    this.healTableShow = this.healTableShow.bind(this);
    this.handler = this.handler.bind(this);
    this.updatechartdata = this.updatechartdata.bind(this);
    this.tablehandler = this.tablehandler.bind(this);
    this.ertHandler = this.ertHandler.bind(this);
    this.timelineHandler = this.timelineHandler.bind(this);
    this.state = {
      currentBossID: null,
      updatedarray: [],
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
      cooldownhelper: [],
      cooldownhelperfinal: [],
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
    };
  }

  useless = () => {};

  updatechartdata = async (starttime, endtime) => {
    this.setState({ loadingcheck: true });
    let healerdurations = [];
    let sortedData = [];
    let sortedData2 = [];

    // Import Healer Info from Healer Function
    const healers = await importHealerLogData(
      starttime,
      endtime,
      this.state.reportid
    );

    // Map Healer id, name, class type
    let healerIDName = healers.map((key) => ({
      id: key.id,
      name: key.name,
      class: key.type,
    }));

    // Map Healer Ids
    let healerID = healers.map((key) => key.id);

    // Import Damage From Damage Function
    const damage = await importDamageLogData(
      starttime,
      endtime,
      this.state.reportid
    );
    // Create List of Damaging Abilities from the Damage Import Array
    let abilitylistold = damage.map((key) => key.ability.name);
    // let abilitylistoldwithguid = damage.map((key) => ({ ability: key.ability.name, guid: key.ability.guid }));
    // Create Unique List of Damaging Abilities
    let uniqueArray = Array.from(new Set(abilitylistold));
    let uniqueArrayGuid = uniqueArray.flat().map((key) => ({ ability: key }));

    // Import Cooldowns from Cooldown Function
    const cooldowns = await importCastsLogData(
      starttime,
      endtime,
      this.state.reportid,
      healerID
    );
    // Create List of Healing Cooldowns Used from the Healing Casts Array
    let cooldownlistold = cooldowns.map(
      (key) =>
        healerIDName
          .filter((obj) => {
            return obj.id === key.sourceID;
          })
          .map((obj) => obj.name) +
        " - " +
        key.ability.name
    );
    // Create Unique List of Healing Cooldowns
    let uniqueArrayCD = Array.from(new Set(cooldownlistold));
    // Attempting to create a list for Custom legend to use with wowhead tooltip
    // Create Ability List With Guids for legend (Testing)
    let legendAbilityListMap = damage.map((key) => ({
      value: key.ability.name,
      id: key.ability.guid,
    }));
    // Get Unique Objects from Ability list for the custom legend
    let uniqueLegendData = getUniqueObjectsFromArray(
      legendAbilityListMap,
      "id"
    );
    // Concat the Unique Ability List with the Cooldown List
    let uniqueArrayNewForLegend = uniqueLegendData.concat(uniqueArrayCD);
    // Map New Data Array Timestamp + ability name & Unmitaged Amount
    let updatedarray = damage.map((key) => ({
      timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
        .startOf("second")
        .valueOf(),
      [key.ability.name]: key.unmitigatedAmount,
    }));
    // Map New Data Array ability, Timestamp, Healer name - ability: 1
    let updateddatacasts = cooldowns.map((key) => ({
      ability: key.ability.name,
      timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
        .startOf("second")
        .valueOf(),
      [healerIDName
        .filter((obj) => {
          return obj.id === key.sourceID;
        })
        .map((obj) => obj.name) +
      " - " +
      key.ability.name]: 1,
    }));
    // Map New Array for casts for the timeline.
    let updateddatacastsTimeline = cooldowns.map((key) => ({
      ability: key.ability.name,
      timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
        .startOf("second")
        .format("mm:ss"),
      name: healerIDName
        .filter((obj) => {
          return obj.id === key.sourceID;
        })
        .map((obj) => obj.name)
        .toString(),
      class: healerIDName
        .filter((obj) => {
          return obj.id === key.sourceID;
        })
        .map((obj) => obj.class)
        .toString(),
    }));
    // Map the data casts using the durationmaker function (returning array of cooldowns duration), then pushing those into the healerdurations array
    updateddatacasts.map((key) =>
      healerdurations.push(
        durationmaker(
          key.ability,
          key.timestamp,
          Object.getOwnPropertyNames(key).slice(2),
          moment(fightDurationCalculator(endtime, starttime))
            .startOf("second")
            .valueOf()
        )
      )
    );
    // Flatten the healer duration array
    let cooldownwithdurations = healerdurations.flat();
    // create missing timestamps from start to end of report selected
    let times = addMissingTimestamps(
      fightDurationCalculator(endtime, starttime)
    );
    // concat the damage array with the cooldown durations with the missing durations
    let damageFromLogWithTimesAddedAndCooldowns = updatedarray.concat(
      cooldownwithdurations,
      times
    );
    // Sort the Array by Timestamp
    damageFromLogWithTimesAddedAndCooldowns.sort((a, b) =>
      a.timestamp > b.timestamp ? 1 : -1
    );
    // reduce array removing any duplicate timestamps
    let dataReformater = reduceTimestamps(
      damageFromLogWithTimesAddedAndCooldowns
    );

    // let dtpsArray = damage.map((key) => ({
    //   timestamp: moment(fightDurationCalculator(key.timestamp, this.state.time))
    //     .startOf("second")
    //     .valueOf(),
    //   abilityName: key.ability.name,
    //   abilityDamage: key.unmitigatedAmount,
    // }));

    // concat the damage array with the missing durations
    let concatArrayWithMissingTimes = updatedarray.concat(times);
    // Sort the Array by Timestamp
    concatArrayWithMissingTimes.sort((a, b) =>
      a.timestamp > b.timestamp ? 1 : -1
    );
    // reduce array removing any duplicate timestamps
    let dataReformater2 = reduceTimestamps(concatArrayWithMissingTimes);
    Object.keys(dataReformater).forEach((element) =>
      sortedData.push(dataReformater[element])
    );
    Object.keys(dataReformater2).forEach((element) =>
      sortedData2.push(dataReformater2[element])
    );
    this.setState({
      cooldownhelper: sortedData2,
      cooldownhelperfinal: sortedData2,
      legenddata: uniqueArrayNewForLegend,
      updatedarray: sortedData,
      Updateddatacasts: updateddatacastsTimeline,
      uniqueArrayGuid: uniqueArrayGuid,
      abilitylist: uniqueArray,
      cooldownlist: uniqueArrayCD,
      loadingcheck: false,
      healernames: healers.map((key) => ({ name: key.name, icon: key.icon })),
      currentEndTime: endtime,
      currentStartTime: starttime,
    });
  };

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
    });
  };

  damageTableShow = (event) => {
    this.setState({ damageTableShow: event });
  };

  healTableShow = (event) => {
    this.setState({ healTableShow: event });
  };

  usernameChangedHandler = (event) => {
    let actuallink = event.target.value;
    this.setState({ logactuallink: event.target.value });
    this.setState({ reportid: actuallink.substring(37, 53) });
  };

  reportidHandler = () => {
    this.setState({ logactuallink: this.state.loglink });
    this.setState({ reportid: this.state.loglink.substring(37, 53) });
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
    let customcooldown = [];
    let sortedData2 = [];
    let cooldownlistcustom = element.map(
      (key) => key.name + " - " + key.Cooldown
    );
    let cooldownlistcustom2 = Array.from(new Set(cooldownlistcustom));
    let newthing = element.map((key) => ({
      ability: key.Cooldown,
      timestamp: moment.duration("00:" + key.time).asMilliseconds(),
      abilityname: key.name + " - " + key.Cooldown,
    }));
    newthing.map((key) =>
      customcooldown.push(
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
    let newthing2 = customcooldown.flat();
    let concat2 = this.state.cooldownhelper;
    let joinedarray = concat2.concat(newthing2);
    joinedarray.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
    let datarReformater2 = joinedarray.reduce((acc, cur) => {
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

    Object.keys(datarReformater2).forEach((element2) =>
      sortedData2.push(datarReformater2[element2])
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
      cooldownhelperfinal: sortedData2,
      cooldownlistcustom2: cooldownlistcustom2,
      ertList: ertNote,
    });
  };

  render() {
    let spinnershow = this.state.loadingcheck;

    return (
      <div>
        <QEHeader langSet={this.props.langSet} curLang={this.props.curLang} />
        <div style={{ margin: "20px 50px 20px 50px" }}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
            style={{ padding: "10px 0px 0px 0px" }}
          >
            <Grid item xs={6} padding={1}>
              <Paper
                bgcolor="#333"
                style={{
                  borderRadius: 4,
                  boxShadow:
                    "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
                }}
              >
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <UserLogTextInput
                    changed={this.usernameChangedHandler}
                    float={"left"}
                    position={"relative"}
                  />
                  <FightSelectorButton
                    reportid={this.state.reportid}
                    clicky={this.handler}
                    update={this.updatechartdata}
                    float={"right"}
                    position={"relative"}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
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
                      <Grid item xs={2} padding={1} align="center">
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
                            {this.state.boss}
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
                      <Grid item xs={2} padding={1} flex={0}>
                        <InteractiveList heals={this.state.healernames} />
                      </Grid>
                      <Grid item xs={1} padding={1}>
                        <Checkboxes
                          check={this.damageTableShow}
                          label={"Log Chart"}
                        />
                        <Checkboxes
                          check={this.healTableShow}
                          label={"Custom CD Chart"}
                        />
                      </Grid>
                    </div>
                  </Paper>
                </Grow>
              </Collapse>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item xs={12} padding={1}>
              <Collapse in={this.state.damageTableShow}>
                <LoadingOverlay
                  active={spinnershow}
                  spinner={<CircularProgress color="secondary" />}
                >
                  <Chart
                    chart={this.state.updatedarray}
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

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item xs={3} padding={1}>
              <Collapse in={this.state.damageTableShow}>
                <DenseAppBar
                  onClick={this.timelineHandler}
                  title="Cooldown Timeline"
                />
                <Collapse in={this.state.timelineshowhide}>
                  <CooldownTimeline data={this.state.Updateddatacasts} />
                </Collapse>
              </Collapse>
            </Grid>

            <Grid item xs={3} padding={1}>
              <Collapse in={this.state.damageTableShow}>
                <DenseAppBar
                  onClick={this.timelineHandler}
                  title="Damaging Abilities"
                />
                <Collapse in={this.state.timelineshowhide}>
                  <DtpsTable data={this.state.uniqueArrayGuid} />
                </Collapse>
              </Collapse>
            </Grid>

            {/* <Grid item xs={3} padding={1}>
              <Collapse in={this.state.damageTableShow}>
                <DenseAppBar
                  onClick={this.timelineHandler}
                  title="some other cool metric"
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
              </Collapse>
            </Grid>

            <Grid item xs={3} padding={1}>
              <Collapse in={this.state.damageTableShow}>
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
              </Collapse>
            </Grid>
                    */}
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item xs={12} padding={1}>
              <Collapse in={this.state.healTableShow}>
                <LoadingOverlay
                  active={spinnershow}
                  spinner={<CircularProgress color="secondary" />}
                >
                  <Chart
                    chart={this.state.cooldownhelperfinal}
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

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item xs={9} padding={1}>
              <CustomEditComponent update={this.tablehandler} />
            </Grid>
            <Grid item xs={3} padding={1}>
              <DenseAppBar onClick={this.ertHandler} title="ERT Note" />
              <Collapse in={this.state.ertshowhide}>
                <ERTTable data={this.state.ertList} />
              </Collapse>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default HolyDiver;