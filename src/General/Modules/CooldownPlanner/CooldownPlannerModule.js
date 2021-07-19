import React, { Component } from "react";
import { Typography, Collapse, CircularProgress, Grid, Accordion, AccordionSummary, AccordionDetails, Dialog, Divider, Paper, Grow } from "@material-ui/core";
import LogLinkInput from "../../SystemTools/LogImport/LogLinkInput";
import Chart from "./ModuleComponents/Chart/Chart";
import Example from "../FightAnalysis/LogDetailComponents/DTPSBarChart";
import FightSelectorButton from "../../SystemTools/LogImport/FightSelectorButton";
import LoadingOverlay from "react-loading-overlay";
import CooldownPlanner from "../CooldownPlanner/ModuleComponents/CooldownPlanner.js";
import CooldownTimeline from "../FightAnalysis/LogDetailComponents/CooldownTimelineTable";
import { fightDuration, warcraftLogReportID, logDifficulty } from "../CooldownPlanner/Functions/Functions";
import bossHeaders from "../CooldownPlanner/Functions/IconFunctions/BossHeaderIcons";
import ERTTable from "../CooldownPlanner/ModuleComponents/ERTTable";
import SwitchLabels from "./BasicComponents/Switch";
import HealerInfoTable from "../FightAnalysis/LogDetailComponents/HealerInfoCards";
import HealTeam from "../CooldownPlanner/ModuleComponents/HealTeamTable";
import updatechartdata from "./Engine/LogImportEngine.js";
import chartCooldownUpdater from "./Engine/UserCooldownChartEngine.js";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ls from "local-storage";
import ExternalTimeline from "../FightAnalysis/LogDetailComponents/ExternalTimelineTable";
import EnemyCastsTimeline from "../FightAnalysis/LogDetailComponents/EnemyCasts";

class HolyDiver extends Component {
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
    this.handleChangeBossCooldownPlanner = this.handleChangeBossCooldownPlanner.bind(this);
    this.handleChangeRaidCooldownPlanner = this.handleChangeRaidCooldownPlanner.bind(this);
    this.handleChangeDataCooldownPlanner = this.handleChangeDataCooldownPlanner.bind(this);
    this.handleChangePlanCooldownPlanner = this.handleChangePlanCooldownPlanner.bind(this);
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
              <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
                {/* // TODO Translate */}
                Cooldown Planner
              </Typography>
            </Grid>

            {/* ----------------- Grid Container for the Heal Team Table and Cooldown Planner ---------------- */}
            <Grid item container direction="row" justify="flex-start" alignItems="flex-start" spacing={1} margin={4}>
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
                  ertDialogOpen={this.handleERTClickOpen}
                  healTeamDialogOpen={this.handleHealTeamClickOpen}
                />
              </Grid>
            </Grid>

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
          </Grid>
        </div>
      </div>
    );
  }
}

export default HolyDiver;
