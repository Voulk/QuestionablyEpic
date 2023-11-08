import React, { useEffect } from "react";
import { Paper, Typography, Grid, Tooltip, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import EmbelChart from "./EmbellishmentChart";
import HelpText from "../../../General/Modules/SetupAndMenus/HelpText";
import { useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import ReactGA from "react-ga";
import { embellishmentDB } from "Databases/EmbellishmentDB";

import { getEffectValue } from "Retail/Engine/EffectFormulas/EffectEngine";
import MetricToggle from "./MetricToggle";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import { loadBannerAd } from "General/Ads/AllAds";
import { useHistory } from "react-router-dom";
import { themeSelection } from "General/Modules/TrinketAnalysis/Charts/ChartColourThemes";
import { getEmbellishmentDescription } from "General/Modules/EmbellishmentAnalysis/EmbellishmentDescriptions";

// 
import { CONSTANTS } from "General/Engine/CONSTANTS";
import EmbellishmentDeepDive from "General/Modules/EmbellishmentAnalysis/EmbellishmentDeepDive";
import InformationBox from "General/Modules/1. GeneralComponents/InformationBox.tsx";

// [{TrinketID: 90321, i173: 92, i187: 94, i200: 99, i213: 104, i226: 116}]

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );
}

const setupItemCardData = (embList, contentType, player, playerSettings) => {
  const itemData = [];
  const additionalData = {contentType: contentType, settings: playerSettings, castModel: player.getActiveModel(contentType), setStats: player.activeStats}
  embList.forEach((emb) => {
    const data = getEmbellishmentDescription(emb.name['en'], player, additionalData);
    //const data = null;
    if (data) {
      data.name = emb.name['en'];
      data.id = emb.id;
      itemData.push(data);
    }
  });

  return itemData;
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
    else if (key === "allyStats") {
      // This is ultimately a slightly underestimation of giving stats to allies, but given we get a fuzzy bundle that's likely to hit half DPS and half HPS 
      // it's a fair approximation. 
      // These embellishments are good, but it's very spread out.
      estHPS += ((value * CONSTANTS.allyStatWeight) / player.activeStats.intellect) * player.getHPS(contentType) * 0.25;
    }
  }
  return Math.round(100 * estHPS) / 100;
}

function getEstimatedDPS(bonus_stats, player, contentType) {
  let estDPS = 0;
  for (const [key, value] of Object.entries(bonus_stats)) {
    if (["haste", "crit", "versatility"].includes(key)) {
      estDPS += (value * 0.4 / player.activeStats.intellect) * player.getDPS(contentType);
    } else if (key === "intellect") {
      estDPS += (value / player.activeStats.intellect) * player.getDPS(contentType);
    } 
    else if (key === "dps") {
      estDPS += Math.round(value);
    }
    else if (key === "mastery") {
      estDPS += 0;
    }
    else if (key === "allyStats") {
      // This is ultimately a slightly underestimation of giving stats to allies, but given we get a fuzzy bundle that's likely to hit half DPS and half HPS 
      // it's a fair approximation. 
      // These embellishments are good, but it's very spread out.
      estDPS += CONSTANTS.allyDPSPerPoint * 0.75 * value;
    }
  }
  return Math.round(Math.max(0, Math.round(100 * estDPS) / 100));
}

const getEmbellishAtLevel = (effectName, itemLevel, player, contentType, metric, playerSettings) => {
  const effect = getEffectValue({type: "embellishment", name: effectName}, player, player.getActiveModel(contentType), contentType, itemLevel, playerSettings, "Retail", player.activeStats);
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

  return Math.max(score, 0);

};

// If a gem is a set bonus, we only need to show the one rank. Otherwise we'll sort gems by the highest rank.
const getHighestDomScore = (gem) => {
  return gem.r486 //gem.r5;
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
    loadBannerAd(props.patronStatus);
  }, []);

  const { t } = useTranslation();
  const contentType = useSelector((state) => state.contentType);
  const playerSettings = useSelector((state) => state.playerSettings);
  const [metric, setMetric] = React.useState("hps");
  const [theme, setTheme] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };


  let history = useHistory();
  const itemLevels = [447, 460, 470, 473, 477, 480, 483, 486];

  const playerSpec = props.player !== null ? props.player.getSpec() : "Unknown";
  const db = embellishmentDB.filter((embel) => {
    return embel.armorType === 0 ||
      (embel.armorType === 4 && playerSpec === "Holy Paladin") ||
      (embel.armorType === 3 && (playerSpec === "Restoration Shaman" || playerSpec === "Preservation Evoker")) ||
      (embel.armorType === 2 && (playerSpec === "Restoration Druid" || playerSpec === "Mistweaver Monk")) ||
      (embel.armorType === 1 && (playerSpec === "Holy Priest" || playerSpec === "Discipline Priest"))
  });
  const helpBlurb = [t("EmbellishmentAnalysis.HelpText")];
  const helpText = [
    "Embellishments were extremely difficult to test and numbers might change as more data comes in.",
    "Chilled Clarity potion was nerfed in 10.1, and so extending them is no longer of any value.",
    "Note that the value of the slot some embellishments must be placed on is NOT included in the graph.",
    "This is for informational purposes only. Consult your favourite guides for how to spend your early Sparks."
  ];
  const classes = useStyles();
  const itemCardData = setupItemCardData(db, contentType, props.player, playerSettings);
  console.log(itemCardData);
  let activeGems = [];

  for (var i = 0; i < db.length; i++) {
    const domGem = db[i];
    let gemAtLevels = {
      id: domGem.id,
      name: domGem.name["en"],
    };

    for (var x = 0; x < itemLevels.length; x++) {
      if (props.player !== null) gemAtLevels["r" + itemLevels[x]] = getEmbellishAtLevel(domGem.effect.name, itemLevels[x], props.player, contentType, metric, playerSettings);
      
    }
    activeGems.push(gemAtLevels);
  }

  activeGems.sort((a, b) => (getHighestDomScore(a) < getHighestDomScore(b) ? 1 : -1));


  return (
    <div className={classes.root}>
      <div style={{ height: 96 }} />
      <div id="banner2"></div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <HelpText blurb={helpBlurb} text={helpText} expanded={true} />
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
        <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth" style={{marginBottom: "10px"}}>
            <Tab label={"Embellishments at a Glance"} />
            <Tab label={"Embellishment Deep Dive"} />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
        <InformationBox information="Embellishments that give Vers to your group will look undervalued on the HPS chart but can be great choices, particularly for Cloth and Mail wearers. Flourishing Dream Helm will require live testing before it's added to the list." color="firebrick" />

        <Grid item xs={12} style={{marginTop: "10px"}}>
          <MetricToggle metric={metric} setMetric={setMetric} />
        </Grid>
        <Grid item xs={12}>

          <Grid container spacing={1} justify="center">
            <Grid item xs={12}>
              <Paper style={{ backgroundColor: "rgb(28, 28, 28, 0.5)" }} elevation={1} variant="outlined">
                {<EmbelChart data={activeGems} db={db} theme={themeSelection(theme ? "candidate2" : "candidate7")} />}
              </Paper>

            </Grid>
            
          </Grid>
          
        </Grid>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <EmbellishmentDeepDive 
            itemCardData={itemCardData}
            tabIndex={tabIndex}
          />
        </TabPanel> 
      </Grid>
      </Grid>
    <div style={{ height: 200 }} />
    </div>
  );
}