import React, { useEffect } from "react";
import { Paper, Typography, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getItemAllocations, calcStatsAtLevel, getItemProp, scoreItem, getTranslatedItemName, getItemDB } from "General/Engine/ItemUtilities";
import DomChart from "./DominationGemChart";
import HelpText from "../../../General/Modules/SetupAndMenus/HelpText";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import { dominationGemDB } from "Databases/DominationGemDB";
import { getDominationGemEffect } from "Retail/Engine/EffectFormulas/Generic/GenericEffectFormulas";
import MetricToggle from "./MetricToggle";
import CharacterPanel from "General/Modules/CharacterPanel/CharacterPanel";
import userSettings from "General/Modules/Settings/SettingsObject";
// import Settings from "../Settings/Settings";
// import userSettings from "../Settings/SettingsObject";

// [{TrinketID: 90321, i173: 92, i187: 94, i200: 99, i213: 104, i226: 116}]

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
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

const getHighestTrinketScore = (db, trinket, gameType) => {
  const trinketID = trinket.id;

  let temp = db.filter(function (item) {
    return item.id === trinketID;
  });

  const item = temp[0];
  const highestLevel = item.levelRange[item.levelRange.length - 1];

  return trinket["i" + highestLevel];
};

// const editSettings = (setting, newValue) => {
//   userSettings[setting] = newValue;
// };

export default function DominationAnalysis(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const { t } = useTranslation();
  const contentType = useSelector((state) => state.contentType);
  const [metric, setMetric] = React.useState("hps");

  //const itemLevels = [187, 194, 200, 207, 213, 220, 226, 230, 233, 239, 246, 252, 259];

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

  //console.log(activeGems);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 1px 10px" }} color="primary">
            {t("DominationSocketAnalysis.Header")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <HelpText blurb={helpText} />
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
          <MetricToggle metric={metric} setMetric={setMetric} />
        </Grid>
        {/* <Grid item xs={12}>
          <Settings player={props.player} userSettings={userSettings} editSettings={editSettings} hymnalShow={true} groupBuffShow={true} />
        </Grid> */}
        <Grid item xs={12}>
          <Grid container spacing={1} justify="center">
            <Grid item xs={12}>
              <Paper style={{ backgroundColor: "rgb(28, 28, 28, 0.5)" }} elevation={1} variant="outlined">
                {<DomChart data={activeGems} db={db} />}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
