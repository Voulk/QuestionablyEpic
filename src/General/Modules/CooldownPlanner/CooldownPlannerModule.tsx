import React, { Component } from "react";
import { Typography, Grid, Dialog } from "@mui/material";
import CooldownPlanner from "./ModuleComponents/CooldownPlanner.js";
import HealTeam from "./ModuleComponents/HealTeamTable.js";
import HelpText from "../SetupAndMenus/HelpText.js";

interface CooldownPlannerModuleState {
  healTeamDialogState: boolean;
  mitigatedChartDataNoCooldowns: any[]; // Replace 'any' with a more specific type if possible
  unmitigatedChartDataNoCooldowns: any[];
  cooldownlistcustom2: any[];
}

class CooldownPlannerModule extends Component<{}, CooldownPlannerModuleState> {
  constructor() {
    super();
    /* ----------------------- We bind the below functions to this Component. ----------------------- */
    this.handleHealTeamClickOpen = this.handleHealTeamClickOpen.bind(this);

    /* ---------------------- We set our state for the cooldown Planner Module. --------------------- */
    this.state = {
      healTeamDialogState: false,
      mitigatedChartDataNoCooldowns: [],
      unmitigatedChartDataNoCooldowns: [],
      cooldownlistcustom2: [],
    };
  }

  /* ---------------------------------- Heal Team Dialog Handlers --------------------------------- */
  handleHealTeamClickOpen = (): void => {
    this.setState({ healTeamDialogState: true });
  };

  handleHealTeamClose = (): void => {
    this.setState({ healTeamDialogState: false });
  };

  render() {
    const helpText = [
      "Step 1: Start by clicking the Roster button and filling in your team.",
      "Step 2: Add plans using the Add button, import a log to use as a template for your cooldowns, or select a boss and difficulty to do it manually.",
      "Use the 'Import/Export' Buttons to share plans with your team, or export it to your ERT note with the ERT Note Button.",
      "Jump into Fight Analysis to overlay your assigned cooldowns on a log for the fight.",
      "Latest Updates 26/1/23: Class rework, Choose class, then spec/shared abilities are in the cooldown selector. Updates to Kurog/Rasz Mythic. Innervate added for druids (selection only), Ascendancy for Shamans added. Custom strings can be entered in the cooldown columns now. ",
    ];
    const helpBlurb = "Welcome to the Cooldown Planner Alpha. All bug reports and feedback welcome.";

    return (
      <div
        style={
          {
            // marginTop: 32,
          }
        }
      >
        <div style={{ height: 96 }} />
        <div style={{ margin: "0px 3% 20px 3%" }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
                {/* // TODO Translate */}
                Cooldown Planner
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <HelpText text={helpText} blurb={helpBlurb} expanded={true} />
            </Grid>

            {/* ----------------- Grid Container for the Heal Team Table and Cooldown Planner ---------------- */}
            <Grid item container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} padding={1}>
                <CooldownPlanner
                  cooldownObject={this.state.cooldowns}
                  dataUpdateHandler={this.handleChangeDataCooldownPlanner}
                  ertDialogOpen={this.handleERTClickOpen}
                  healTeamDialogOpen={this.handleHealTeamClickOpen}
                />
              </Grid>
            </Grid>

            {/* ------------------------------------- Healer Team Dialog ------------------------------------- */}
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
