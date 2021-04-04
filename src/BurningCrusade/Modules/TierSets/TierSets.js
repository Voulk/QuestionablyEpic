// This module will be focused on BC mostly, Until Retail reintroduces tier sets

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../../General/Modules/SetupAndMenus/QEMainMenu";
import TierObject from "./TierObject";
// import "./Legendaries.css";
import { useTranslation } from "react-i18next";
import ReactGA from "react-ga";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
      marginTop: "120px",
    },
    [theme.breakpoints.down("md")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
      marginTop: "120px",
    },
    [theme.breakpoints.down("lg")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
      marginTop: "120px",
    },
    [theme.breakpoints.up("xl")]: {
      margin: "auto",
      width: "70%",
      justifyContent: "space-between",
      display: "block",
    },
  },
}));

export default function LegendaryCompare(props) {
  const classes = useStyles();
  const contentType = useSelector((state) => state.contentType);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const { t, i18n } = useTranslation();

  let tierSets = [
    {
      name: "Justicar",
      slots: { head: 0, shoulder: 0, chest: 0, wrist: 0, hands: 0, waist: 0, legs: 0, boots: 0 },
      dropLoc: "Karazhan",
      twoSet: { effect: "blah blah blah", hps: 100 },
      fourSet: { effect: "blahblahblahblah", hps: 300 },
      sixSet: { effect: "blahblahblah", hps: 500 },
    },
  ];

  return (
    <div className={classes.header}>
      <Grid item container spacing={1} direction="row">
        {/* ---------------------------------------- Module Title ---------------------------------------- */}
        <Grid item xs={12}>
          <Typography color="primary" variant="h4" align="center" style={{ paddingBottom: 16 }}>
            {t("TierSets.Title")}
          </Typography>
        </Grid>
        {/* ------------------------------ Map the Legendary list into Cards ----------------------------- */}
        <Grid item container spacing={1} direction="row">
          {tierSets.map((set, index) => (
            <TierObject key={index} set={set} player={props.player} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
