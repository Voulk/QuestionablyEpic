import React, { useEffect } from "react";
import { Paper, Typography, Grid, Tooltip, Select, MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Item from "../Player/Item";
import BCItem from "../Player/BCItem";
import { getItemAllocations, calcStatsAtLevel, getItemProp, scoreItem, getTranslatedItemName, getItemDB } from "../../Engine/ItemUtilities";
import VerticalChart from "./Charts/VerticalChart";
import BCChart from "./Charts/BCChart";
import HelpText from "../SetupAndMenus/HelpText";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import userSettings from "../Settings/SettingsObject";
// import MetricToggle from "Retail/Modules/DominationGemAnalysis/MetricToggle";
import SourceToggle from "./SourceToggle";
import ToggleButton from "@material-ui/lab/ToggleButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { themeSelection } from "./Charts/ChartColourThemes";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

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

const menuStyle = {
  style: { marginTop: 5 },
  MenuListProps: {
    style: { paddingTop: 0, paddingBottom: 0 },
  },
  PaperProps: {
    style: {
      border: "1px solid rgba(255, 255, 255, 0.23)",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

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
  const [sources, setSources] = React.useState(() => [
    "The Rest",
    "Raids",
    "Dungeons",
    "LegionTimewalking"
  ]);
  const [theme, setTheme] = React.useState(false);

  // const availableThemes = ["candidate1", "candidate2", "candidate3", "candidate4", "candidate5", "candidate6", "candidate7", "IBM", "wong", "candidate10", "candidate11", "candidate12", "candidate13"];

  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Trinket Source Filtering                                    */
  /* ---------------------------------------------------------------------------------------------- */
  const sourceHandler = (array, sources) => {
    let results = [];
    const shadowlandsRaids = [
      /* --------------------------------------- Castle Nathria --------------------------------------- */
      1190,
      /* ------------------------------------ Sanctum of Domination ----------------------------------- */
      1193,
    ];
    const shadowlandsDungeons = [
      /* -------------------------------------- General Dungeons -------------------------------------- */
      -1,
      /* ------------------------------------------ Tazavesh ------------------------------------------ */
      1194,
    ];
    const legionTimewalking = [
      -24,
      707, // Vault of the Wardens
      716, // Eye of Azshara
      740, // Black Rook Hold
      762, // Darkheart Thicket
      767, // Neltharion's Lair
      800, // Court of Stars
    ];
    const shadowlandsTheRest = [
      1192,
      -18,
      -17,
      //undefined
      /* ---------------------------------------- World Bosses ---------------------------------------- */
    ];
    console.log(sources)


    /* ---------------------------------------------------------------------------------------------- */
    /*                                   The Rest & Raids & Dungeons                                  */
    /* ---------------------------------------------------------------------------------------------- */
    if (sources.includes("The Rest") === true && sources.includes("Raids") === true && sources.includes("Dungeons") === true && sources.includes("LegionTimewalking") === true) {
      results = array;
    }
    else {
      results = array.filter((item) => {
        return (item["sources"] === undefined && sources.includes("The Rest")) ||
                (item["sources"] && (
                (shadowlandsTheRest.includes(item["sources"][0]["instanceId"]) && sources.includes("The Rest")) ||
                (shadowlandsRaids.includes(item["sources"][0]["instanceId"]) && sources.includes("Raids")) ||
                (shadowlandsDungeons.includes(item["sources"][0]["instanceId"]) && (!legionTimewalking.includes(item["sources"][0]["encounterId"])) && sources.includes("Dungeons")) ||
                (legionTimewalking.includes(item["sources"][0]["encounterId"]) && sources.includes("LegionTimewalking"))))
              
              })
    }
    
    return results;
  };

  const handleSource = (event, newSources) => {
    if (newSources.length) {
      setSources(newSources);
    }
  };
  const contentType = useSelector((state) => state.contentType);
  const itemLevels = [187, 194, 200, 207, 213, 220, 226, 230, 233, 239, 246, 252, 259];
  const gameType = useSelector((state) => state.gameType);
  const trinketDB = getItemDB(gameType).filter(
    (key) =>
      key.slot === "Trinket" &&
      ((gameType === "BurningCrusade" && "phase" in key && key.phase < 2 && (!("class" in key) || props.player.getSpec().includes(key.class))) || (gameType === "Retail" && key.levelRange.length > 0)),
  );
  const filteredTrinketDB = sourceHandler(trinketDB, sources);

  const helpBlurb = [t("TrinketAnalysis.HelpText")];
  const helpText = [
    "The graph is generic to your spec and content type. You can get results accurate to your character in the Top Gear module.",
    "This is a sampling of available trinkets only. You can add ones that aren't on the list in Top Gear.",
  ];
  const classes = useStyles();

  const editSettings = (setting, newValue) => {
    userSettings[setting] = newValue;
  };

  let activeTrinkets = [];
  let finalDB = gameType === "Retail" ? filteredTrinketDB : trinketDB;

  for (var i = 0; i < finalDB.length; i++) {
    const trinket = finalDB[i];
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
    activeTrinkets.sort((a, b) => (getHighestTrinketScore(finalDB, a, gameType) < getHighestTrinketScore(finalDB, b, gameType) ? 1 : -1));
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 0px 10px" }} color="primary">
            {t("TrinketAnalysis.Header")}
          </Typography>
        </Grid>

        {/* <Grid item xs={12}>
          <Typography color="primary" variant="subtitle2" align="center" style={{ paddingBottom: 8 }}>
            {"Current Playstyle selected: " + props.player.getActiveModel(contentType).modelName + " - " + contentType}
          </Typography>
        </Grid> */}
        <Grid item xs={12}>
          <HelpText blurb={helpBlurb} text={helpText} expanded={false} />
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
        {/* <Grid item xs={12}>
          <Settings player={props.player} userSettings={userSettings} editSettings={editSettings} hymnalShow={true} groupBuffShow={true} />
        </Grid> */}
        {/* {gameType === "Retail" ? (
          <Grid item xs={12}>
            <Grid item>
              <MetricToggle metric={metric} setMetric={setMetric} />
            </Grid>
          </Grid>
        ) : (
          ""
        )} */}
        <Grid item xs={12}>
          <Grid container spacing={0} justify="center">
            <Grid item xs={12}>
              <Paper style={{ backgroundColor: "rgb(28, 28, 28, 0.5)" }} elevation={1} variant="outlined">
                <Grid container spacing={1} direction="row" justify="flex-end" alignItems="center">
                  <Grid item>
                    <div style={{ padding: "8px 0px 8px 8px" }}>
                      <Tooltip
                        title={
                          <Typography align="center" variant="body2">
                            {t("SourceToggle.FilterTooltip")}
                          </Typography>
                        }
                        style={{ marginTop: -5 }}
                        placement="top-start"
                      >
                        <Typography variant="h6">{t("Filter")}:</Typography>
                      </Tooltip>
                    </div>
                  </Grid>
                  <Grid item>
                    <SourceToggle metric={sources} setMetric={handleSource} />
                  </Grid>
                  {gameType === "Retail" ? (
                    <Grid item xs={12}>
                      <VerticalChart data={activeTrinkets} db={finalDB} theme={themeSelection(theme ? "candidate2" : "candidate7")} />
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <BCChart data={activeTrinkets} db={trinketDB} />
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {gameType === "Retail" ? (
          <Grid item xs={12} container spacing={0} direction="row" justify="flex-end">
            {/* <Grid item>
              <Select key={"themeSelector"} labelId="themeSelectorID" variant="outlined" value={theme} onChange={(e) => setTheme(e.target.value)} MenuProps={menuStyle} label={"Cooldowns Shown"}>
                {availableThemes.map((key) => (
                  <MenuItem value={key}>{key}</MenuItem>
                ))}
              </Select>
            </Grid> */}
            <Grid item>
              <Tooltip title={"Alternate Theme"} arrow>
                <ToggleButton
                  value="check"
                  selected={theme}
                  onChange={() => {
                    setTheme(!theme);
                  }}
                >
                  <VisibilityIcon />
                </ToggleButton>
              </Tooltip>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
}
