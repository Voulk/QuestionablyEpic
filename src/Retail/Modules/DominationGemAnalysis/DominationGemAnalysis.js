import React, { useEffect } from "react";
import { Paper, Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import DomChart from "./DominationGemChart";
import HelpText from "../../../General/Modules/SetupAndMenus/HelpText";
import { useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import ReactGA from "react-ga";
import { dominationGemDB } from "Databases/DominationGemDB";
import { getDominationGemEffect } from "Retail/Engine/EffectFormulas/Generic/GenericEffectFormulas";
import MetricToggle from "./MetricToggle";
import CharacterPanel from "General/Modules/CharacterPanel/CharacterPanel";
import userSettings from "General/Modules/Settings/SettingsObject";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      width: "85%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 140,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: 32,
      margin: "auto",
      width: "55%",
      display: "block",
    },
  },
}));

/* ------------ Converts a bonus_stats dictionary to a singular estimated HPS number. ----------- */
// TODO: Remove this. It's just for testing.
function getEstimatedHPS(bonus_stats, player, contentType) {
  let estHPS = 0;
  for (const [key, value] of Object.entries(bonus_stats)) {
    if (["haste", "mastery", "crit", "versatility", "leech"].includes(key)) {
      estHPS += ((value * player.getStatWeight(contentType, key)) / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "intellect") {
      estHPS += (value / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "hps") {
      estHPS += value;
    }
  }
  return Math.round(100 * estHPS) / 100;
}

const getDomScoreAtRank = (effectName, rank, player, contentType, metric) => {
  const gemEffect = getDominationGemEffect(effectName, player, contentType, rank);

  if (metric === "hps") {
    return getEstimatedHPS(gemEffect, player, contentType);
  } else if (metric === "dps") {
    return Math.round(100 * gemEffect.dps) / 100 || 0;
  }
};

// If a gem is a set bonus, we only need to show the one rank. Otherwise we'll sort gems by the highest rank.
const getHighestDomScore = (gem) => {
  if ("r5" in gem) return gem.r5;
  else return gem.r1;
};

export default function DominationAnalysis(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const { t } = useTranslation();
  const contentType = useSelector((state) => state.contentType);
  const [metric, setMetric] = React.useState("hps");

  const db = dominationGemDB.filter((gem) => gem.effect.rank === 0);
  const helpText = [t("DominationSocketAnalysis.HelpText")];
  const classes = useStyles();

  const editSettings = (setting, newValue) => {
    userSettings[setting] = newValue;
  };

  let activeGems = [];

  for (var i = 0; i < db.length; i++) {
    const domGem = db[i];
    let gemAtLevels = {
      id: domGem.gemID,
      name: domGem.name["en"],
    };

    for (var x = 1; x <= 5; x++) {
      gemAtLevels["r" + x] = getDomScoreAtRank(domGem.name["en"], x - 1, props.player, contentType, metric);
    }
    activeGems.push(gemAtLevels);
  }

  activeGems.sort((a, b) => (getHighestDomScore(a) < getHighestDomScore(b) ? 1 : -1));

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 1px 10px" }} color="primary">
            {t("DominationSocketAnalysis.Header")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <HelpText blurb={helpText} expanded={true} />
        </Grid>
        <Grid item xs={12}>
          <CharacterPanel
            player={props.player}
            simcSnack={props.simcSnack}
            allChars={props.allChars}
            contentType={contentType}
            userSettings={userSettings}
            editSettings={editSettings}
            singleUpdate={props.singleUpdate}
            hymnalShow={true}
            groupBuffShow={true}
            autoSocket={true}
          />
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ backgroundColor: "rgb(28, 28, 28, 0.5)" }} variant="outlined">
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12}>
                <MetricToggle metric={metric} setMetric={setMetric} />
              </Grid>
              <Grid item xs={12}>
                <DomChart data={activeGems} db={db} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
