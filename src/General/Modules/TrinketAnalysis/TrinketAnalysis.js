import React, { useEffect } from "react";
import { Paper, Typography, Grid, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import Item from "../Player/Item";
import ClassicItem from "../Player/ClassicItem";
import { getItemAllocations, calcStatsAtLevel, getItemProp, scoreItem, getTranslatedItemName, getItemDB } from "../../Engine/ItemUtilities";
import VerticalChart from "./Charts/VerticalChart";
import BCChart from "./Charts/BCChart";
import HelpText from "../SetupAndMenus/HelpText";
import { useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import ReactGA from "react-ga";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import userSettings from "../Settings/SettingsObject";
import SourceToggle from "./SourceToggle";
import ToggleButton from "@mui/material/ToggleButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { themeSelection } from "./Charts/ChartColourThemes";
import { loadBottomBannerAd, loadBannerAd } from "General/Ads/AllAds";
import ItemDetailCard from "../1. GeneralComponents/ItemDetailCard";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
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

const getTrinketAtItemLevel = (id, itemLevel, player, contentType, playerSettings) => {
  let item = new Item(id, "", "Trinket", false, "", 0, itemLevel, "");
  let itemAllocations = getItemAllocations(id);
  item.stats = calcStatsAtLevel(itemLevel, "Trinket", itemAllocations, "");
  item.effect = getItemProp(id, "effect");
  item.softScore = scoreItem(item, player, contentType, "Retail", playerSettings);

  return item.softScore;
};

// Wrath of the Lich King
const getTrinketAtContentLevel = (id, difficulty, player, contentType) => {
  /*
  let temp = getItemDB(gameType).filter(function (item) {
    return item.id === trinketID;
  });

  const itemDifficulties = temp[0].difficulties;

  console.log(itemDifficulties); */

  return getBCTrinketScore(id, player, difficulty);

  //return item.softScore;
};

const getBCTrinketScore = (id, player) => {
  let item = new ClassicItem(id, "", "Trinket", "");
  item.softScore = scoreItem(item, player, "Raid", "Classic");

  return item.softScore;
};

const getHighestTrinketScore = (db, trinket) => {
  const trinketID = trinket.id;

  let temp = db.filter(function (item) {
    return item.id === trinketID;
  });

  const item = temp[0];
  const highestLevel = item.levelRange[item.levelRange.length - 1];

  return trinket["i" + highestLevel];
};

export default function TrinketAnalysis(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    loadBannerAd(props.patronStatus);
    loadBottomBannerAd(props.patronStatus);
  }, []);

  const { t } = useTranslation();
  const [sources, setSources] = React.useState(() => ["The Rest", "Raids", "Dungeons"]); //, "LegionTimewalking"
  const [theme, setTheme] = React.useState(false);

  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Trinket Source Filtering                                    */
  /* ---------------------------------------------------------------------------------------------- */
  const sourceHandler = (array, sources) => {
    let results = [];
    const shadowlandsRaids = [
      //1190, // Castle Nathria
      //1193, // Sanctum of Domination
      //1195, // Sepulcher
      1200, // Vault of the Incarnates
    ];
    const shadowlandsDungeons = [
      -1, // General Dungeons
      1182, // Necrotic Wake,
      1183, // Plaguefall,
      1184, // Mists of Tirna Scithe,
      1185, // Halls of Atonement,
      1186, // Spires of Ascension,
      1187, // Theater of Pain,
      1188, // De Other Side,
      1189, // Sanguine Depths,
      1194, // Tazavesh

      1198, // Nokhud Offensive
      1203, // The Azure Vault
      1202, // Ruby Life Pools
      1197, // Uldaman
      1204, // Halls of Infusion
      1199, // Neltharus
      1196, // Brackenhide Hollow
      1201, // Alge'thar Academy
      721, // Halls of Valor
      537, // Shadowmoon Burial Ground
      313, // Jade Serpent
      800, // Court of Stars
    ];
    const legionTimewalking = [];
    const shadowlandsTheRest = [
      1192, // World Bosses
      1205, // DF World Bosses
      -18, // PVP
      -17, // PVP
    ];

    /* ---------------------------------------------------------------------------------------------- */
    /*                                   The Rest & Raids & Dungeons                                  */
    /* ---------------------------------------------------------------------------------------------- */
    if (sources.includes("The Rest") === true && sources.includes("Raids") === true && sources.includes("Dungeons") === true) {
      results = array;
    } else {
      results = array.filter((item) => {
        return (
          (item["sources"] === undefined && sources.includes("The Rest")) ||
          (item["sources"] &&
            ((shadowlandsTheRest.includes(item["sources"][0]["instanceId"]) && sources.includes("The Rest")) ||
              (shadowlandsRaids.includes(item["sources"][0]["instanceId"]) && sources.includes("Raids")) ||
              (shadowlandsDungeons.includes(item["sources"][0]["instanceId"]) && !legionTimewalking.includes(item["sources"][0]["encounterId"]) && sources.includes("Dungeons"))))
        );
      });
    }

    return results;
  };

  const handleSource = (event, newSources) => {
    if (newSources.length) {
      setSources(newSources);
    }
  };
  const contentType = useSelector((state) => state.contentType);
  const playerSettings = useSelector((state) => state.playerSettings);
  const itemLevels = [359, 372, 379, 382, 385, 389, 395, 405, 408, 411, 415, 418, 421, 424];

  const gameType = useSelector((state) => state.gameType);
  const trinketDB = getItemDB(gameType).filter(
    (key) =>
      key.slot === "Trinket" &&
      ((gameType === "Classic" && "phase" in key && key.phase === 1 && (!("class" in key) || props.player.getSpec().includes(key.class))) || (gameType === "Retail" && key.levelRange.length > 0)),
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

    if (gameType === "Classic") {
      /*const difficulties = ["10N", "10H", "25N", "25H"]
      for (var x = 0; x < difficulties.length; x++) {
          trinketAtLevels[difficulties[x]] = getTrinketAtContentLevel(trinket.id, difficulties[x], props.player, "Raid");
      }*/
      trinketAtLevels["i100"] = getBCTrinketScore(trinket.id, props.player);
      activeTrinkets.push(trinketAtLevels);
    } else {
      for (var x = 0; x < itemLevels.length; x++) {
        trinketAtLevels["i" + itemLevels[x]] = getTrinketAtItemLevel(trinket.id, itemLevels[x], props.player, contentType, playerSettings);
      }
      activeTrinkets.push(trinketAtLevels);
    }
  }

  if (gameType === "Classic") {
    activeTrinkets.sort((a, b) => (a.i100 < b.i100 ? 1 : -1));
  } else {
    activeTrinkets.sort((a, b) => (getHighestTrinketScore(finalDB, a, gameType) < getHighestTrinketScore(finalDB, b, gameType) ? 1 : -1));
  }

  return (
    <div className={classes.root}>
      <div style={{ height: 96 }} />
      <div id="banner2"></div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ padding: "10px 10px 0px 10px" }} color="primary">
            {t("TrinketAnalysis.Header")}
          </Typography>
        </Grid>

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

        <Grid item xs={12}>
          <Grid container spacing={0} justifyContent="center">
            <Grid item xs={12}>
              <Paper style={{ backgroundColor: "rgb(28, 28, 28, 0.5)" }} elevation={1} variant="outlined">
                <Grid container spacing={1} direction="row" justifyContent="flex-end" alignItems="center">
                  {gameType === "Retail" ? (
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
                  ) : (
                    ""
                  )}
                  {gameType === "Retail" ? (
                    <Grid item>
                      <SourceToggle sources={sources} setSources={handleSource} />
                    </Grid>
                  ) : (
                    ""
                  )}
                  {gameType === "Retail" ? (
                    <Grid item xs={12}>
                      <VerticalChart data={activeTrinkets} db={finalDB} theme={themeSelection(theme ? "candidate2" : "candidate7")} />
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <BCChart data={activeTrinkets} db={trinketDB} theme={themeSelection("candidate2")} />
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {gameType === "Retail" ? (
          <Grid item xs={12} container spacing={0} direction="row" justifyContent="flex-end">
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
      
      <Grid container spacing={1} direction="row">
        <Grid item xs={6}>
          <ItemDetailCard />
        </Grid>
      </Grid>

      <div id="qelivead2"></div>
      <div style={{ height: 300 }} />
    </div>
  );
}
