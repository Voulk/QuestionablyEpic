import React, { Component } from "react";
import { Typography, Grid, Dialog } from "@material-ui/core";
import CooldownPlanner from "../CooldownPlanner/ModuleComponents/CooldownPlanner.js";
import chartCooldownUpdater from "../FightAnalysis/Engine/UserCooldownChartEngine";
import ERTTable from "../CooldownPlanner/ModuleComponents/ERTTable";
import HealTeam from "../CooldownPlanner/ModuleComponents/HealTeamTable";
import ls from "local-storage";
import ertEngine from "../FightAnalysis/Engine/ERTEngine";


class CooldownPlannerModule extends Component {
  constructor() {
    super();
    /* ----------------------- We bind the below functions to this Component. ----------------------- */
    // This means these functions can be passed as props to other components and they will return here rather than in the component they are sent to.
    this.ertHandler = this.ertHandler.bind(this);
    this.ertEngine = ertEngine.bind(this);
    this.handleERTClickOpen = this.handleERTClickOpen.bind(this);
    this.handleHealTeamClickOpen = this.handleHealTeamClickOpen.bind(this);

    /* ---------------------- We set our state for the cooldown Planner Module. --------------------- */
    this.state = {
      ertListTimeNoIcons: [],
      ertListBossAbility: [],
      ertListAbilityNoTimeIconsAll: [],
      ertListTimeIcons: [],
      ertListNoteIcons: [],
      ertListNoteNoIcons: [],
      ertshowhide: false,
      ertDialogState: false,
      healTeamDialogState: false,
      mitigatedChartDataNoCooldowns: [],
      unmitigatedChartDataNoCooldowns: [],
      cooldownlistcustom2: [],
    };
  }

  ertHandler = () => {
    this.setState((prevState) => ({
      ertshowhide: !prevState.ertshowhide,
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
                  update={this.ertEngine}
                  cooldownObject={this.state.cooldowns}
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

export default CooldownPlannerModule;
