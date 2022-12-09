import React, { useEffect } from "react";
import { Paper, Typography, Grid, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getItemAllocations, calcStatsAtLevel, getItemProp, scoreItem, getTranslatedItemName, getItemDB } from "General/Engine/ItemUtilities";
import EmbelChart from "./EmbellishmentChart";
import HelpText from "../../../General/Modules/SetupAndMenus/HelpText";
import { useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import ReactGA from "react-ga";
import { dominationGemDB } from "Databases/DominationGemDB";
import { embellishmentDB } from "Databases/EmbellishmentDB";
import { getDominationGemEffect } from "Retail/Engine/EffectFormulas/Generic/GenericEffectFormulas";
import { getEffectValue } from "Retail/Engine/EffectFormulas/EffectEngine";
import MetricToggle from "./MetricToggle";
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
function getEstimatedHPS(bonus_stats, player, contentType) {
  let estHPS = 0;
  for (const [key, value] of Object.entries(bonus_stats)) {
    if (["haste", "mastery", "crit", "versatility", "leech"].includes(key)) {
      estHPS += ((value * player.getStatWeight(contentType, key)) / player.activeStats.intellect) * player.getHPS(contentType);
    } else if (key === "intellect") {
      estHPS += (value / player.activeStats.intellect) * player.getHPS(contentType);
    } 
    else if (key === "mana") {
      estHPS += value * player.getSpecialQuery("OneManaHealing", contentType)
    }
    else if (key === "hps") {
      estHPS += value;
    }
  }
  return Math.round(100 * estHPS) / 100;
}

function getEstimatedDPS(bonus_stats, player, contentType) {
  let estDPS = 0;
  for (const [key, value] of Object.entries(bonus_stats)) {
    if (["haste", "crit", "versatility"].includes(key)) {
      estDPS += (value * 0.35 / player.activeStats.intellect) * player.getDPS(contentType);
    } else if (key === "intellect") {
      estDPS += (value / player.activeStats.intellect) * player.getHPS(contentType);
    } 
    else if (key === "dps") {
      estDPS += value;
    }
  }
  return Math.round(100 * estDPS) / 100;
}

const getEmbellishAtLevel = (effectName, itemLevel, player, contentType, metric) => {
  const effect = getEffectValue({type: "embellishment", name: effectName}, player, player.getActiveModel(contentType), contentType, itemLevel, {}, "Retail", player.activeStats);
  const embel = embellishmentDB.filter(function (emb) {
    return emb.effect.name === effectName;
  });

  let score = 0;
  if (metric === "hps") {
    score =  getEstimatedHPS(effect, player, contentType) || 0;
  } else if (metric === "dps") {
    score = getEstimatedDPS(effect, player, contentType) || 0;
  }
  else if (metric === "both") {
    score = getEstimatedHPS(effect, player, contentType) + getEstimatedDPS(effect, player, contentType);
  }

  if ("pieces" in embel[0]) score = Math.round(score / embel[0].pieces);

  return score;

};

// If a gem is a set bonus, we only need to show the one rank. Otherwise we'll sort gems by the highest rank.
const getHighestDomScore = (gem) => {
  return gem.r408 //gem.r5;
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

export default function EmbellishmentAnalysis(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const { t } = useTranslation();
  const contentType = useSelector((state) => state.contentType);
  const [metric, setMetric] = React.useState("hps");

  const itemLevels = [356, 369, 382, 395, 408];

  const db = embellishmentDB.filter((gem) => gem.effect.rank === 0);
  const helpText = [t("DominationSocketAnalysis.HelpText")];
  const classes = useStyles();

  let activeGems = [];

  for (var i = 0; i < db.length; i++) {
    const domGem = db[i];
    let gemAtLevels = {
      id: domGem.id,
      name: domGem.name["en"],
    };

    for (var x = 0; x < itemLevels.length; x++) {
      gemAtLevels["r" + itemLevels[x]] = getEmbellishAtLevel(domGem.effect.name, itemLevels[x], props.player, contentType, metric);
    }
    activeGems.push(gemAtLevels);
  }

  activeGems.sort((a, b) => (getHighestDomScore(a) < getHighestDomScore(b) ? 1 : -1));

  console.log(activeGems);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
            {t("DominationSocketAnalysis.Header")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <HelpText text={helpText} />
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
                {<EmbelChart data={activeGems} db={db} />}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}