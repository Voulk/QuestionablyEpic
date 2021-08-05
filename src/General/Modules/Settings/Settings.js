import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Divider } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@material-ui/icons/Settings";
import RetailSettings from "./Modules/RetailSettings";
import BurningCrusadeSettings from "./Modules/BurningCrusadeSettings";
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

export default function Settings(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  /* --------------------------------- Determine current GameType --------------------------------- */
  const gameType = useSelector((state) => state.gameType);

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Settings Shown                                         */
  /* ---------------------------------------------------------------------------------------------- */
  /* ---------------- True or False determines what settings are shown to the user. --------------- */
  /* ---- We can add checks for player specialisations here to only show for certain specs etc ---- */

  /* ------------------------------------ Retail Settings Shown ----------------------------------- */
  const retailSettingsShown = {
    // Show Hymnal Settings
    hymnalShow: true,
    // Show the Group buffs treated as players Settings
    groupBuffShow: true,
    // Show the Auto Socket Settings
    autoSocket: true,
  };

  /* ------------------------------- Burning Crusade Settings Shown ------------------------------- */
  const burningCrusadeSettingsShown = {
    // Nothing Yet
  };

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={true} disabled={false} elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={classes.column}>
            <SettingsIcon style={{ marginRight: 4 }} />
            <Typography className={classes.heading}>{t("Settings.SettingsTitle")}</Typography>
          </div>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails className={classes.details}>
          {/* ---- If gameType = "Retail" show Retail Settings, otherwise show Burning Crusade Settings ---- */}
          {gameType === "Retail" ? (
            <RetailSettings player={props.player} contentType={props.contentType} userSettings={props.userSettings} editSettings={props.editSettings} singleUpdate={props.singleUpdate} {...retailSettingsShown} />
          ) : (
            <BurningCrusadeSettings player={props.player} userSettings={props.userSettings} editSettings={props.editSettings} {...burningCrusadeSettingsShown} />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
