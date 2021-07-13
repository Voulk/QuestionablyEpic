import React, { useEffect } from "react";
import { Paper, Typography, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { itemDB } from "../../../Databases/ItemDB";
import Item from "../Player/Item";
import BCItem from "../Player/BCItem";
import { getItemAllocations, calcStatsAtLevel, getItemProp, scoreItem, getTranslatedItemName, getItemDB } from "../../Engine/ItemUtilities";
import VerticalChart from "./Charts/VerticalChart";
import BCChart from "./Charts/BCChart";
import HelpText from "../SetupAndMenus/HelpText";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import MetricToggle from "Retail/Modules/DominationGemAnalysis/MetricToggle";
import SourceToggle from "./SourceToggle";
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

const getTrinketAtItemLevel = (id, itemLevel, player, contentType, gameType) => {
  let item = new Item(id, "", "Trinket", false, "", 0, itemLevel, "");
  let itemAllocations = getItemAllocations(id);
  item.stats = calcStatsAtLevel(itemLevel, "Trinket", itemAllocations, "");
  item.effect = getItemProp(id, "effect");
  item.softScore = scoreItem(item, player, contentType);

  return item.softScore;
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

export default function TrinketAnalysis(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const { t } = useTranslation();
  const [metric, setMetric] = React.useState("hps");
  const [sources, setSources] = React.useState(() => ["World Quests", "Raids", "Dungeons"]);
console.log(sources)
  const handleSource = (event, newSources) => {
    setSources(newSources);
  };
  const contentType = useSelector((state) => state.contentType);
  const itemLevels = [187, 194, 200, 207, 213, 220, 226, 230, 233, 239, 246, 252, 259];
  const gameType = useSelector((state) => state.gameType);
  const trinketDB = getItemDB(gameType).filter(
    (key) =>
      key.slot === "Trinket" &&
      ((gameType === "BurningCrusade" && "phase" in key && key.phase < 2 && (!("class" in key) || props.player.getSpec().includes(key.class))) || (gameType === "Retail" && key.levelRange.length > 0)),
  );
  const helpText = [t("TrinketAnalysis.HelpText")];
  const classes = useStyles();

  let activeTrinkets = [];

  for (var i = 0; i < trinketDB.length; i++) {
    const trinket = trinketDB[i];
    let trinketAtLevels = {
      id: trinket.id,
      name: getTranslatedItemName(trinket.id, "en"),
    };

    if (gameType === "BurningCrusade") {
      trinketAtLevels["i100"] = getBCTrinketScore(trinket.id, props.player);
      activeTrinkets.push(trinketAtLevels);
    } else {
      for (var x = 0; x < itemLevels.length; x++) {
        trinketAtLevels["i" + itemLevels[x]] = getTrinketAtItemLevel(trinket.id, itemLevels[x], props.player, contentType);
      }
      activeTrinkets.push(trinketAtLevels);
    }
  }

  if (gameType === "BurningCrusade") {
    activeTrinkets.sort((a, b) => (a.i100 < b.i100 ? 1 : -1));
  } else {
    activeTrinkets.sort((a, b) => (getHighestTrinketScore(trinketDB, a, gameType) < getHighestTrinketScore(trinketDB, b, gameType) ? 1 : -1));
  }

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

        <Grid item xs={12} container spacing={0} direction="row" justify="space-between">
          <Grid item>
            <MetricToggle metric={metric} setMetric={setMetric} />
          </Grid>

          <Grid item>
            <SourceToggle metric={sources} setMetric={handleSource} />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} justify="center">
            <Grid item xs={12}>
              <Paper style={{ backgroundColor: "rgb(28, 28, 28, 0.5)" }} elevation={1} variant="outlined">
                {gameType === "Retail" ? <VerticalChart data={activeTrinkets} db={trinketDB} /> : <BCChart data={activeTrinkets} db={trinketDB} />}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
