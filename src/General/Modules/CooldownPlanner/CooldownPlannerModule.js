import React, { Component } from "react";
import { Typography, Grid, Dialog } from "@mui/material";
import CooldownPlanner from "../CooldownPlanner/ModuleComponents/CooldownPlanner.js";
import HealTeam from "../CooldownPlanner/ModuleComponents/HealTeamTable";
import ertEngine from "./ModuleComponents/Engine/ERTEngine";
import HelpText from "../SetupAndMenus/HelpText";

class CooldownPlannerModule extends Component {
  constructor() {
    super();
    /* ----------------------- We bind the below functions to this Component. ----------------------- */
    // This means these functions can be passed as props to other components and they will return here rather than in the component they are sent to.
    this.ertEngine = ertEngine.bind(this);
    this.handleHealTeamClickOpen = this.handleHealTeamClickOpen.bind(this);

    /* ---------------------- We set our state for the cooldown Planner Module. --------------------- */
    this.state = {
      ertListTimeIcons: [],
      healTeamDialogState: false,
      mitigatedChartDataNoCooldowns: [],
      unmitigatedChartDataNoCooldowns: [],
      cooldownlistcustom2: [],
    };
  }

  /* ---------------------------------- Heal Team Dialog Handlers --------------------------------- */
  handleHealTeamClickOpen = () => {
    this.setState({ healTeamDialogState: true });
  };

  handleHealTeamClose = () => {
    this.setState({ healTeamDialogState: false });
  };

  render() {
    const helpText = [
      "Step 1: Start by clicking the Roster button and fill it out.",
      "Step 2: Select a boss and difficulty",
      "Step 3: By default we have provided a default plan for each boss, these can't be edited but can be copied into a new plan for you to edit by clicking 'Copy'. Or you can create your own but clicking on 'Add'",
      "Plans can be shared with the 'Import/Export' Buttons",
      "Each plan can be exported as an ERT note with the 'Note' button",
      "Advanced Use with Fight Analysis: Any plan you make can replace the cooldowns on an imported log in the fight analysis module by toggling the 'Log Cooldown/Custom Cooldown' dropdown, and selecting a plan from the 'Plans' dropdown, use this to compare your assignments to a logs damage pattern!",
    ];
    const helpBlurb = "Welcome to the Cooldown Planner. This is still a work in progress so any bugs / feedback is welcome. Use this Form for reporting: https://forms.gle/ZKhqYVsytV9co4yp6";

    return (
      <div
        style={{
          marginTop: 32,
        }}
      >
        <div style={{ margin: "20px 3% 20px 3%" }}>
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                  Main Grid for the Component                                   */
          /* ---------------------------------------------------------------------------------------------- */}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <HelpText text={helpText} blurb={helpBlurb} expanded={true} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
                {/* // TODO Translate */}
                Cooldown Planner
              </Typography>
            </Grid>

            {/* ----------------- Grid Container for the Heal Team Table and Cooldown Planner ---------------- */}
            <Grid item container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding={1}>
                <CooldownPlanner
                  update={this.ertEngine}
                  cooldownObject={this.state.cooldowns}
                  dataUpdateHandler={this.handleChangeDataCooldownPlanner}
                  ertDialogOpen={this.handleERTClickOpen}
                  healTeamDialogOpen={this.handleHealTeamClickOpen}
                  ertListTimeIcons={this.state.ertListTimeIcons}
                />
              </Grid>
            </Grid>

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
