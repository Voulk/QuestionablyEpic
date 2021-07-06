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

const getDomScoreAtRank = (effectName, rank, player, contentType, metric) => {
  const gemEffect = getDominationGemEffect(effectName, player, contentType, rank)
  return gemEffect[metric] || 0;

};

const getBCTrinketScore = (id, player) => {
  let item = new BCItem(id, "", "Trinket", "");
  item.softScore = scoreItem(item, player, "Raid", "BurningCrusade");

  return item.softScore;
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
  const ranks = [0, 1, 2, 3, 4]
  const metric = "hps";
  //const itemLevels = [187, 194, 200, 207, 213, 220, 226, 230, 233, 239, 246, 252, 259];

  const db = dominationGemDB.filter((gem => gem.effect.rank === 0));
  const helpText = [t("TrinketAnalysis.HelpText")];
  const classes = useStyles();

  let activeGems = [];

  for (var i = 0; i < db.length; i++) {
    const domGem = db[i];
    let gemAtLevels = {
      id: domGem.gemID,
      name: domGem.name["en"]
    };

      for (var x = 0; x <= 4; x++) {
        gemAtLevels["r" + x] = getDomScoreAtRank(domGem.name["en"], x, props.player, contentType, metric);
      }
      activeGems.push(gemAtLevels);
  }


    //activeGems.sort((a, b) => (getHighestTrinketScore(trinketDB, a, gameType) < getHighestTrinketScore(trinketDB, b, gameType) ? 1 : -1));

  console.log(activeGems);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 5px 10px" }} color="primary">
            {t("TrinketAnalysis.Header")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <HelpText text={helpText} />
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
