import React, { useEffect } from "react";
import { Paper, Typography, Grid, Tooltip, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import CircletChart from "./CircletChart";
import HelpText from "../SetupAndMenus/HelpText";
import { useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import ReactGA from "react-ga";
import { embellishmentDB } from "Databases/EmbellishmentDB";
import { getAllCombos, getCircletEffect } from "Retail/Engine/EffectFormulas/Generic/PatchEffectItems/CyrcesCircletData"
import { getEffectValue } from "Retail/Engine/EffectFormulas/EffectEngine";
import MetricToggle from "General/Modules/EmbellishmentAnalysis/MetricToggle";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import { loadBannerAd } from "General/Ads/AllAds";
import { useHistory } from "react-router-dom";
import { themeSelection } from "General/Modules/TrinketAnalysis/Charts/ChartColourThemes";
import { getAllyStatsValue } from "General/Engine/ItemUtilities";
// 
import { CONSTANTS } from "General/Engine/CONSTANTS";
import InformationBox from "General/Modules/GeneralComponents/InformationBox.tsx";
import { trackPageView } from "Analytics";

// [{TrinketID: 90321, i173: 92, i187: 94, i200: 99, i213: 104, i226: 116}]

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      width: "85%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 24,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "80%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 44,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "65%",
      justifyContent: "space-between",
      display: "block",
      marginTop: 24,
    },
    [theme.breakpoints.up("lg")]: {
      // marginTop: 32,
      margin: "auto",
      width: "55%",
      display: "block",
    },
  },
}));

const editSettings = (setting, newValue) => {
  userSettings[setting] = newValue;
};

/* ------------ Converts a bonus_stats dictionary to a singular estimated HPS number. ----------- */
function getEstimatedHPS(bonus_stats, player, contentType, playerSettings) {
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
    else if (key === "allyStats" && playerSettings && playerSettings.includeGroupBenefits && playerSettings.includeGroupBenefits.value && bonus_stats.allyStats) {
      // This is ultimately a slightly underestimation of giving stats to allies, but given we get a fuzzy bundle that's likely to hit half DPS and half HPS 
      // it's a fair approximation. 
      // These embellishments are good, but it's very spread out.
      estHPS += getAllyStatsValue(contentType, value, player, playerSettings) * 0.25 / player.getInt() * player.getHPS(contentType);
    }
  }
  return Math.round(100 * estHPS) / 100;
}

function getEstimatedDPS(bonus_stats, player, contentType, playerSettings) {
  let estDPS = 0;
  for (const [key, value] of Object.entries(bonus_stats)) {
    if (["haste", "crit", "versatility"].includes(key)) {
      estDPS += (value * 0.65 / player.activeStats.intellect) * player.getDPS(contentType);
    } else if (key === "intellect") {
      estDPS += (value / player.activeStats.intellect) * player.getDPS(contentType);
    } 
    else if (key === "dps") {
      estDPS += Math.round(value);
    }
    else if (key === "mastery") {
      estDPS += 0;
    }
    else if (key === "allyStats" && playerSettings && playerSettings.includeGroupBenefits && playerSettings.includeGroupBenefits.value && bonus_stats.allyStats) {
      // This is ultimately a slightly underestimation of giving stats to allies, but given we get a fuzzy bundle that's likely to hit half DPS and half HPS 
      // it's a fair approximation. 
      // These embellishments are good, but it's very spread out.
      estDPS += getAllyStatsValue(contentType, value, player, playerSettings) * 0.75 / player.getInt() * player.getHPS(contentType);
    }
  }
  return Math.round(Math.max(0, Math.round(100 * estDPS) / 100));
}

const getEffectAtLevel = (gemCombo, itemLevel, player, contentType, metric, playerSettings) => {
  const additionalData = {contentType: contentType, settings: playerSettings, setStats: player.activeStats, player: player, setVariables: []};
  const effect = getCircletEffect(gemCombo, itemLevel, additionalData);
  //const effect = getEffectValue({type: "embellishment", name: effectName}, player, player.getActiveModel(contentType), contentType, itemLevel, playerSettings, "Retail", player.activeStats, {});
  const expHPS = getEstimatedHPS(effect, player, contentType, playerSettings) || 0
  const expDPS = getEstimatedDPS(effect, player, contentType, playerSettings) || 0


  let score = 0;
  if (metric === "hps") {
    score = expHPS;
  } else if (metric === "dps") {
    score = expDPS;
  }
  else if (metric === "both") {
    score = expHPS + expDPS;
  }

  //if ("pieces" in embel[0]) score = Math.round(score / embel[0].pieces);

  return Math.max(score, 0);

};

// If a gem is a set bonus, we only need to show the one rank. Otherwise we'll sort gems by the highest rank.
const getHighestScore = (combo) => {
  return combo.i658
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

export default function CircletAnalysis(props) {
  useEffect(() => {
    trackPageView(window.location.pathname + window.location.search);
    loadBannerAd(props.patronStatus);
  }, []);

  const { t } = useTranslation();
  const contentType = useSelector((state) => state.contentType);
  const playerSettings = useSelector((state) => state.playerSettings);
  const [metric, setMetric] = React.useState("both");
  const [theme, setTheme] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };


  let history = useHistory();
  const itemLevels = [ 639, 642, 645, 648, 651, 654, 658];

  const playerSpec = props.player !== null ? props.player.getSpec() : "Unknown";
  const combos = getAllCombos();
  const helpBlurb = [t("EmbellishmentAnalysis.HelpText")];
  const helpText = [
    "Note that the value of the slot some embellishments must be placed on is NOT included in the graph.",
    "This is for informational purposes only. Consult your favourite guides for how to spend your early Sparks."
  ];
  const classes = useStyles();
  let activeCombos = [];

  for (var i = 0; i < combos.length; i++) {
    const gemCombo = combos[i];
    let comboAtLevels = {
      id: i,
      name: gemCombo.join("/"),
      tooltip: []
    };

    for (var x = 0; x < itemLevels.length; x++) { // (gemNames, player, contentType, itemLevel, setStats, settings)
      if (props.player !== null) comboAtLevels["i" + itemLevels[x]] = getEffectAtLevel(gemCombo, itemLevels[x], props.player, contentType, metric, playerSettings); 
      
    }
    comboAtLevels.tooltip = "" // buildRetailEffectTooltip(domGem.effect.name, props.player, 636, playerSettings)
    activeCombos.push(comboAtLevels);
  }

  activeCombos.sort((a, b) => (getHighestScore(a) < getHighestScore(b) ? 1 : -1));
  activeCombos = activeCombos.slice(0, 15);

  return (
    <div className={classes.root}>
      <div style={{ height: 96 }} />
      <div id="banner2"></div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <HelpText blurb={helpBlurb} text={helpText} expanded={false} />
        </Grid>
        <Grid item xs={12}>
          <CharacterPanel
            player={props.player}
            simcSnack={props.simcSnack}
            allChars={props.allChars}
            contentType={contentType}
            singleUpdate={props.singleUpdate}
            hymnalShow={true}
            groupBuffShow={true}
            autoSocket={true}
          />
        </Grid>
        <Grid item xs={12}>
        <InformationBox information="Legendary Skippers was heavily nerfed in 11.1. Check your guide or Top Gear for advice on when or if to replace Circlet." variant="red" />

        <Grid item xs={12} style={{marginTop: "10px"}}>
          <MetricToggle metric={metric} setMetric={setMetric} />
        </Grid>
        <Grid item xs={12}>

          <Grid container spacing={1} justify="center">
            <Grid item xs={12}>
              <Paper style={{ backgroundColor: "rgb(28, 28, 28, 0.5)" }} elevation={1} variant="outlined">
                {<CircletChart data={activeCombos} db={activeCombos} itemLevels={itemLevels} theme={themeSelection(theme ? "candidate2" : "candidate7")} />}
              </Paper>

            </Grid>
            
          </Grid>
          
        </Grid>

      </Grid>
      </Grid>
    <div style={{ height: 200 }} />
    </div>
  );
}