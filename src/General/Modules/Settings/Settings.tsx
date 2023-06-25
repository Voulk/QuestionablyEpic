import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";
import RetailSettings from "./Modules/RetailSettings";
import BurningCrusadeSettings from "./Modules/BurningCrusadeSettings";
import { useSelector } from "react-redux";
import { RootState } from "Redux/Reducers/RootReducer";

const useStyles = makeStyles((theme: any) => ({
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

export default function Settings(props : any) {
  const classes = useStyles();
  const { t } = useTranslation();
  /* --------------------------------- Determine current GameType --------------------------------- */
  const gameType = useSelector((state: RootState) => state.gameType);

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
              singleUpdate={props.singleUpdate}
            />
          ) : (
            <BurningCrusadeSettings player={props.player} userSettings={props.userSettings} editSettings={props.editSettings} {...burningCrusadeSettingsShown} />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
