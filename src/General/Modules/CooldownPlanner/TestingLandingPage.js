import React, { useEffect } from "react";
// import "./QEMainMenu.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { Grid, Button, Typography, Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import HelpText from "../SetupAndMenus/HelpText";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      width: "85%",
      justifyContent: "center",
      display: "block",
      marginTop: 140,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "center",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "center",
      display: "block",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto",
      width: "45%",
      justifyContent: "center",
      display: "block",
    },
  },
}));

export default function TestingPage(props) {
  /* ---------------------------------------------------------------------------------------------- */
  /*                                             Warning                                            */
  /*                 If a button name has to change, do it in the translation files.                */
  /*                    Consider the titles here to be ID's rather than strings                     */
  /* ---------------------------------------------------------------------------------------------- */
  // [route, show button?, tooltip]
  const mainMenuOptions = {
    "MainMenu.CooldownPlanner": ["/cooldownplanner", true, "CooldownPlanner"],
    "MainMenu.FightAnalysis": ["/fightAnalysis", true, "FightAnalysis"],
  };

  const { t } = useTranslation();
  const classes = useStyles();

  const oddEven = (number) => {
    if (number % 2 == 0) {
      return "left";
    }
    return "right";
  };

  const helpText = [
    "Cooldown Planner new features:  Import/Export for sharing plans. Custom named Plans.",
    "Fight Analysis: Changes on how to load custom plans, you load a log for a boss, and any cooldown plans you have will be selectable from a dropdown to load. Use the toggle Cooldowns button to swap between the logs cooldowns, and yours",
  ];
  const helpBlurb =
    "Welcome to the Refactored Cooldown Planner & Fight Analysis Modules. The old module has been split into two seperate modules. Your old cooldowns won't work with the refactor, but can be reimported if needed (Will require getting the old string from local storage and using the new import string)";

  return (
    <div style={{ backgroundColor: "#313131" }}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HelpText text={helpText} blurb={helpBlurb} expanded={true} />
          </Grid>
          {Object.keys(mainMenuOptions).map((key, index) => (
            // Buttons are translated and printed from a dictionary.
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
              <Tooltip title={t("MainMenu.Tooltips." + mainMenuOptions[key][2])} placement={oddEven(index)} arrow>
                <Button
                  key={index}
                  variant="contained"
                  color="secondary"
                  style={{
                    width: "100%",
                    height: "55px",
                    whiteSpace: "nowrap",
                    justifyContent: "left",
                    paddingLeft: "32px",
                  }}
                  component={Link}
                  to={mainMenuOptions[key][0]}
                >
                  <ArrowForward style={{ paddingRight: 32 }} />
                  {t(key)}
                </Button>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
