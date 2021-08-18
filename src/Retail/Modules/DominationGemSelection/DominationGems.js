import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Divider, Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@material-ui/icons/Settings";
import DominationGemSelection from "./DominationGemSelection";
import { useSelector } from "react-redux";
// import userSettings from "./SettingsObject";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
    padding: 8,
  },
  column: {
    // flexBasis: "33.33%",
    display: "inline-flex",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function DominationGems(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={true} disabled={false} elevation={0}>
        {/* ---------------------------------------------------------------------------------------------- */
        /*                                         Accordian Title                                         */
        /* ---------------------------------------------------------------------------------------------- */}
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={classes.column}>
            <Typography className={classes.heading}>{t("DominationSelection.HeaderTitle")}</Typography>
          </div>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails className={classes.details}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* ------------------------------------------ Help Text -----------------------------------------  */}
              <Typography style={{ marginLeft: 8, color: "limegreen" }} noWrap>
                Add the Shards you have in your bag and QE Live will automatically select your best combo!
              </Typography>
            </Grid>
            {/* ---------------------------------- Domination Gem Selectors ----------------------------------  */}
            <Grid item xs={12}>
              <DominationGemSelection />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
