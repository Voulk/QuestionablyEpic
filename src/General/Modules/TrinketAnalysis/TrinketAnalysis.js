import React, { useEffect } from "react";
import { Paper, Typography, Grid, Tooltip, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";
import Item from "../Player/Item";
import ClassicItem from "../Player/ClassicItem";
import { getItemAllocations, calcStatsAtLevel, getItemProp, scoreTrinket, scoreItem, getEffectValue, getTranslatedItemName, getItemDB } from "../../Engine/ItemUtilities";
import VerticalChart from "./Charts/VerticalChart";
import BCChart from "./Charts/ClassicTrinketChart";
import HelpText from "../SetupAndMenus/HelpText";
import { useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import ReactGA from "react-ga";
import CharacterPanel from "../CharacterPanel/CharacterPanel";
import SourceToggle from "./SourceToggle";
import ToggleButton from "@mui/material/ToggleButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { themeSelection } from "./Charts/ChartColourThemes";
import { loadBottomBannerAd, loadBannerAd } from "General/Ads/AllAds";
import { getTrinketDescription, buildRetailEffectTooltip } from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketDescriptions";
import { buildClassicEffectTooltip } from "General/Modules/TrinketAnalysis/ClassicDeepDive";

import TrinketDeepDive from "General/Modules/TrinketAnalysis/TrinketDeepDive";
import InformationBox from "General/Modules/1. GeneralComponents/InformationBox.tsx";

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
  item.softScore = scoreTrinket(item, player, contentType, "Retail", playerSettings);

  return item.softScore;
};

//
const setupItemCardData = (trinketList, contentType, player, playerSettings) => {
  const itemData = [];
  const additionalData = {contentType: contentType, settings: playerSettings, castModel: player.getActiveModel(contentType)}
  trinketList.forEach((trinket) => {
    //const data = getTrinketDescription(trinket.name, player, additionalData);
    const data = null;
    if (data) {
      data.name = trinket.name;
      data.id = trinket.id;
      (data.slot = "Trinkets"), itemData.push(data);
    }
  });

  /*
  const data = {
    metrics: ["HPS: 500", "DPS: 500"],
    name: "Glowing Shard of the Elements",
    slot: "Trinkets",
    id: 191492,
    description:
      "This trinket is a small, glowing shard of crystal that seems to pulse with elemental energy. It emits a faint humming sound when held. The Glowing Shard of the Elements has the power to enhance the wearer's elemental abilities and grant additional resistance to elemental attacks. When activated, the trinket glows brightly, releasing a burst of energy that can damage nearby enemies and heal nearby allies. This effect can only be used once every few minutes, but the trinket also has a passive effect that increases the wearer's spell power and critical strike chance with elemental spells. The Glowing Shard of the Elements is highly sought after by spellcasters who specialize in elemental magic.",
  }; */

  return itemData;
};

// Wrath of the Lich King
const getTrinketAtContentLevel = (id, difficulty, player, contentType) => {
  /*
  let temp = getItemDB(gameType).filter(function (item) {
    return item.id === trinketID;
  });

  const itemDifficulties = temp[0].difficulties;

  console.log(itemDifficulties); */

  return getClassicTrinketScore(id, player, difficulty);

  //return item.softScore;
};

const getClassicTrinketScore = (id, player) => {
  const itemLevel = getItemProp(id, "itemLevel", "Classic");
  let item = new Item(id, "", "trinket", false, "", 0, itemLevel, "", "Classic");
  
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
  const [tabIndex, setTabIndex] = React.useState(0);
  const [sources, setSources] = React.useState(() => ["The Rest", "Raids", "Dungeons"]); //, "LegionTimewalking"
  const [theme, setTheme] = React.useState(false);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  /* ---------------------------------------------------------------------------------------------- */
  /*                                    Trinket Source Filtering                                    */
  /* ---------------------------------------------------------------------------------------------- */
  const sourceHandler = (array, sources, playerSpec) => {
    let results = [];
    const raidSources = [
      //1190, // Castle Nathria
      //1193, // Sanctum of Domination
      //1195, // Sepulcher
      1200, // Vault of the Incarnates
      1208, // Aberrus
      1207, // Amirdrassil
      1273, // Palace
    ];
    const dungeonSources = [
      -1, // General Dungeons
    ];
    const otherSources = [
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
            ((otherSources.includes(item["sources"][0]["instanceId"]) && sources.includes("The Rest")) ||
              (raidSources.includes(item["sources"][0]["instanceId"]) && sources.includes("Raids")) ||
              (dungeonSources.includes(item["sources"][0]["instanceId"]) && sources.includes("Dungeons"))))
        );
      });
    }

    results = results.filter((item) => {
      return ("classRestriction" in item && item.classRestriction.includes(playerSpec)) || !("classRestriction" in item);
    });

    return results;
  };

  const handleSource = (event, newSources) => {
    if (newSources.length) {
      setSources(newSources);
    }
  };
  const contentType = useSelector((state) => state.contentType);
  const playerSettings = useSelector((state) => state.playerSettings);
  const itemLevels = [584, 590, 597, 603, 610, 616, 619, 623, 626, 629, 632, 639];

  const gameType = useSelector((state) => state.gameType);
  const trinketDB = getItemDB(gameType).filter(
    (key) =>
      key.slot === "Trinket" && 'levelRange' in key && key.levelRange.length > 0);
  const filteredTrinketDB = sourceHandler(trinketDB, sources, props.player.spec);

  const itemCardData = setupItemCardData(trinketDB, contentType, props.player, playerSettings);

  const helpBlurb = [t("TrinketAnalysis.HelpText")];
  const helpText = [
    "The graph is generic to your spec and content type. Use it as general guidance. You can get results accurate to your character in the Top Gear module.",
    "This is a sampling of available trinkets only. You can add ones that aren't on the list in Top Gear.",
  ];
  const classes = useStyles();


  let activeTrinkets = [];
  let finalDB = gameType === "Retail" ? filteredTrinketDB : trinketDB;

  for (var i = 0; i < finalDB.length; i++) {
    const trinket = finalDB[i];
    const trinketName = getItemProp(trinket.id, "name", gameType);
    let trinketAtLevels = {
      id: trinket.id,
      name: trinketName,
    };

    if (gameType === "Classic") {
      /*const difficulties = ["10N", "10H", "25N", "25H"]
      for (var x = 0; x < difficulties.length; x++) {
          trinketAtLevels[difficulties[x]] = getTrinketAtContentLevel(trinket.id, difficulties[x], props.player, "Raid");
      }*/
      const trinketScore = getClassicTrinketScore(trinket.id, props.player);
      if (activeTrinkets.filter((key) => key.name === trinketName).length > 0) {
        // Trinket already exists
        const existingTrinket = activeTrinkets.filter((key) => key.name === trinketName)[0]
        existingTrinket["heroic"] = trinketScore;
        existingTrinket["heroicilvl"] = trinket.itemLevel;
        existingTrinket["tooltip"] = buildClassicEffectTooltip(trinketName, props.player, trinket.itemLevel);
      }
      else {
        trinketAtLevels["normal"] = trinketScore;
        trinketAtLevels["normalilvl"] = trinket.itemLevel;
        trinketAtLevels["tooltip"] = buildRetailEffectTooltip(trinketName, props.player, trinket.itemLevel, playerSettings);
        activeTrinkets.push(trinketAtLevels);
      }

    } else {
        for (var x = 0; x < itemLevels.length; x++) {

          trinketAtLevels["i" + itemLevels[x]] = getTrinketAtItemLevel(trinket.id, itemLevels[x], props.player, contentType, playerSettings);
        }
        trinketAtLevels["tooltip"] = buildRetailEffectTooltip(trinketName, props.player, trinket.levelRange[trinket.levelRange.length - 1], playerSettings);
        activeTrinkets.push(trinketAtLevels);
    }
  }

  if (gameType === "Classic") {
    // Sort. We'll need to use the retail "highest level" code here.
    const getHighestClassicScore = (trinket) => {return trinket.heroic || trinket.normal || 0}
    activeTrinkets.sort((a, b) => (getHighestClassicScore(a) < getHighestClassicScore(b) ? 1 : -1));
  } else {
    activeTrinkets.sort((a, b) => (getHighestTrinketScore(finalDB, a, gameType) < getHighestTrinketScore(finalDB, b, gameType) ? 1 : -1));
  }

  const trinketText = gameType === "Retail" ? "Tuning is ongoing. All results subject to change."  :
                                              "";

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
          <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
            <Tab label={"Trinkets at a Glance"} />
            {gameType === "" ? <Tab label={"Trinket Deep Dive"} /> : null}
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            <Grid container spacing={1} justifyContent="center" sx={{ marginTop: "16px" }}>
              <InformationBox information={trinketText} variant="yellow" />

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
                        <VerticalChart data={activeTrinkets} db={finalDB} itemLevels={itemLevels} theme={themeSelection(theme ? "candidate2" : "candidate21")} />
                      </Grid>
                    ) : (
                      <Grid item xs={12}>
                        <BCChart data={activeTrinkets} db={trinketDB} theme={themeSelection("candidate2")} />
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Grid>

              {gameType === "Retail" ? (
                <Grid item xs={12}>
                  <Grid container spacing={0} direction="row" justifyContent="flex-end">
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
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </TabPanel>

          <TabPanel value={tabIndex} index={1}>
            <TrinketDeepDive 
              itemCardData={itemCardData}
              tabIndex={tabIndex}
            />
            {/*<Grid container spacing={1} sx={{ marginTop: "16px" }}>
              {itemCardData.map((item) => (
                <Grid item xs={6}>
                  <ItemDetailCard item={item} />
                </Grid>
              ))}
            </Grid>*/}
          </TabPanel> 

        </Grid>
      </Grid>

      <div id="qelivead2"></div>
      <div style={{ height: 300 }} />
    </div>
  );
}
