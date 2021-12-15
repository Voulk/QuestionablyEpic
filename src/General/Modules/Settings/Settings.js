import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";
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
    marginRight: 4,
  },
  details: {
    alignItems: "center",
    padding: 0,
    marginTop: 8,
    marginBottom: 8,
  },
  column: {
    // flexBasis: "33.33%",
    display: "inline-flex",
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
      <Accordion defaultExpanded={false} disabled={false} elevation={0}>
        <AccordionSummary style={{ padding: 0 }} expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={classes.column}>
            <SettingsIcon style={{ marginRight: 4, width: 22, height: 22 }} />
            <Typography className={classes.heading}>{t("Settings.SettingsTitle")}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {/* ---- If gameType = "Retail" show Retail Settings, otherwise show Burning Crusade Settings ---- */}
          {gameType === "Retail" ? (
            <RetailSettings
              player={props.player}
              contentType={props.contentType}
              userSettings={props.userSettings}
              editSettings={props.editSettings}
              singleUpdate={props.singleUpdate}
              {...retailSettingsShown}
            />
          ) : (
            <BurningCrusadeSettings player={props.player} userSettings={props.userSettings} editSettings={props.editSettings} {...burningCrusadeSettingsShown} />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
