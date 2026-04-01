import React from "react";
import { Paper, Typography, Grid, Tooltip, Button } from "@mui/material";
import Item from "../../Items/Item";
import { getItemAllocations, calcStatsAtLevel, getItemProp, scoreTrinket, scoreItem, getItemDB } from "../../Engine/ItemUtilities";
import VerticalChart from "./Charts/VerticalChart";
import BCChart from "./Charts/ClassicTrinketChart";
import { useSelector } from "react-redux";
import ReactGA from "react-ga";
import SourceToggle from "./SourceToggle";
import ToggleButton from "@mui/material/ToggleButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { themeSelection } from "./Charts/ChartColourThemes";
import { buildRetailEffectTooltip, getTrinketData } from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketDescriptions";
import { buildClassicEffectTooltip } from "General/Modules/TrinketAnalysis/ClassicDeepDive";
import UpgradeFinderSlider from "General/Modules/UpgradeFinder/Slider";
import { reforgeIDs } from "General/Modules/TopGear/Report/TopGearExports";
import InformationBox from "General/Modules/GeneralComponents/InformationBox.tsx";
import { downloadJson } from "./TrinketJSONDownload";
import { getAllTrinketData } from "Retail/Engine/EffectFormulas/Generic/Trinkets/TrinketEffectFormulas.js";

const getTrinketAtItemLevel = (id, itemLevel, player, contentType, playerSettings) => {
  let item = new Item(id, "", "Trinket", false, "", 0, itemLevel, "");
  let itemAllocations = getItemAllocations(id);

  item.stats = calcStatsAtLevel(itemLevel, "Trinket", itemAllocations, "");
  item.effect = getItemProp(id, "effect");
  item.softScore = scoreTrinket(item, player, contentType, "Retail", playerSettings);

  return item.softScore;
};

const getClassicTrinketScore = (id, player, itemLevel) => {
  let item = new Item(id, "", "trinket", false, "", 0, itemLevel, "", "Classic");
  item.softScore = scoreItem(item, player, "Raid", "Classic");
  return item.softScore;
};

export const getHighestTrinketScore = (db, trinket, maxLevel) => {
  const trinketID = trinket.id;
  const temp = db.filter((item) => item.id === trinketID);
  const highestLevel = Math.min(trinket.highestLevel, maxLevel);
  return trinket["i" + highestLevel];
};

const handleDownload = () => {
  const allTrinketData = getAllTrinketData();
  const toPrint = {};
  allTrinketData.forEach((trinketX) => {
    toPrint[trinketX.name] = { description: trinketX.addonDescription || "" };
    if ("effects" in trinketX && "ppm" in trinketX.effects[0]) {
      toPrint[trinketX.name].ppm = trinketX.effects[0].ppm;
    }
  });
  downloadJson(JSON.stringify(toPrint), "QE-trinket-data.json");
};

export const sourceHandler = (array, sources, playerSpec) => {
  const raidSources = [1314, 1308, 1307];
  const dungeonSources = [-1];
  const delveSources = [-69];
  const otherSources = [1192, 1205, -18, -17, -85, -4];
  const timewalkingSources = [-12];

  let results;
  if (
    sources.includes("The Rest") &&
    sources.includes("Raids") &&
    sources.includes("Timewalking") &&
    sources.includes("Dungeons") &&
    sources.includes("Delves")
  ) {
    results = array;
  } else {
    results = array.filter((item) => {
      return (
        (item["sources"] === undefined && sources.includes("The Rest")) ||
        (item["sources"] &&
          ((otherSources.includes(item["sources"][0]["instanceId"]) && sources.includes("The Rest")) ||
            (raidSources.includes(item["sources"][0]["instanceId"]) && sources.includes("Raids")) ||
            (delveSources.includes(item["sources"][0]["instanceId"]) && sources.includes("Delves")) ||
            (timewalkingSources.includes(item["sources"][0]["instanceId"]) && sources.includes("Timewalking")) ||
            (dungeonSources.includes(item["sources"][0]["instanceId"]) && sources.includes("Dungeons"))))
      );
    });
  }

  return results.filter(
    (item) => !("classRestriction" in item) || item.classRestriction.includes(playerSpec)
  );
};

const getReforgeInstructions = (player, stats) => {
  const playerStatPriorityList = player.getActiveProfile("Raid").autoReforgeOrder;
  const trinketSecondary = Object.keys(stats).find((key) => stats[key] !== 0);

  if (trinketSecondary && trinketSecondary !== "intellect" && trinketSecondary !== "stamina") {
    const trinketSecondaryPos = playerStatPriorityList.indexOf(trinketSecondary);
    if (trinketSecondaryPos !== 0) {
      return reforgeIDs[`Reforged: ${trinketSecondary} -> ${playerStatPriorityList[0]}`] || 0;
    }
  }
  return 0;
};

/**
 * Reusable trinket chart component. Accepts a player prop and reads
 * contentType, gameType, and playerSettings from Redux.
 */
export default function TrinketChart({ player }) {
  const contentType = useSelector((state) => state.contentType);
  const gameType = useSelector((state) => state.gameType);
  const playerSettings = useSelector((state) => state.playerSettings);

  const [sources, setSources] = React.useState(() => ["The Rest", "Raids", "Dungeons", "Delves"]);
  const [theme, setTheme] = React.useState(false);
  const [levelCap, setLevelCap] = React.useState(289);

  const maxLevelMarks = [
    { value: 0, label: "237" },
    { value: 1, label: "250" },
    { value: 2, label: "263" },
    { value: 3, label: "276" },
    { value: 4, label: "289" },
  ];

  const changeLevelCap = (event, newValue) => {
    setLevelCap(parseInt(maxLevelMarks[newValue].label));
  };

  const handleSource = (event, newSources) => {
    if (newSources.length) setSources(newSources);
  };

  const allItemLevels =
    gameType === "Retail"
      ? [233, 237, 243, 250, 256, 263, 272, 276, 285, 289]
      : [458, 463, 476, 483, 484, 489, 496, 502, 509, 510, 517, 522, 528, 535, 541];

  const itemLevels = allItemLevels.filter((level) => level <= levelCap || gameType === "Classic");

  const trinketDB = getItemDB(gameType).filter(
    (key) => key.slot === "Trinket" && "levelRange" in key && key.levelRange.length > 0
  );
  const filteredTrinketDB = sourceHandler(trinketDB, sources, player.spec);
  const finalDB = gameType === "Retail" ? filteredTrinketDB : trinketDB;

  let activeTrinkets = [];

  for (var i = 0; i < finalDB.length; i++) {
    const trinket = finalDB[i];
    const trinketName = getItemProp(trinket.id, "name", gameType);
    const trinketStats = getItemProp(trinket.id, "stats", gameType);
    const trinketData = getTrinketData(trinketName);

    let trinketAtLevels = {
      id: trinket.id,
      name: trinketName,
      highestLevel: getItemProp(trinket.id, "levelRange", gameType).at(-1) || 0,
    };

    if (trinketData && trinketData.warningFlag) trinketAtLevels.warningFlag = true;

    if (false && gameType === "Classic") {
      const trinketLevel = trinket.itemLevel;
      const trinketScore = getClassicTrinketScore(trinket.id, player, trinketLevel);
      const pos = trinket.levelRange.indexOf(trinket.itemLevel);

      let difficulty = "";
      if (trinket.levelRange.length > 1 && trinket.levelRange.length === pos + 1 && trinketName !== "Jade Magistrate Figurine") difficulty = "heroic";
      else if ((trinket.levelRange.length === 3 || trinketName === "Jade Magistrate Figurine") && pos === 0) difficulty = "lfr";
      else difficulty = "normal";

      if (activeTrinkets.filter((key) => key.name === trinketName).length > 0) {
        const existingTrinket = activeTrinkets.filter((key) => key.name === trinketName)[0];
        existingTrinket[difficulty] = trinketScore;
        existingTrinket[difficulty + "ilvl"] = trinketLevel;
        existingTrinket["tooltip"] = buildClassicEffectTooltip(trinketName, player, trinketLevel, trinket.id);
        existingTrinket.highestLevel = Math.max(existingTrinket.highestLevel, trinketLevel);
      } else {
        trinketAtLevels[difficulty] = trinketScore;
        trinketAtLevels[difficulty + "ilvl"] = trinketLevel;
        trinketAtLevels["tooltip"] = buildClassicEffectTooltip(trinketName, player, trinketLevel, trinket.id);
        trinketAtLevels.highestLevel = Math.max(trinketAtLevels.highestLevel, trinketLevel);
        if (trinketStats.intellect === 0) {
          const reforge = getReforgeInstructions(player, trinketStats);
          if (reforge) trinketAtLevels.reforgeID = reforge;
        }
        activeTrinkets.push(trinketAtLevels);
      }
    } else {
      for (var x = 0; x < itemLevels.length; x++) {
        if (gameType === "Retail") {
          trinketAtLevels["i" + itemLevels[x]] = getTrinketAtItemLevel(trinket.id, itemLevels[x], player, contentType, playerSettings);
        } else {
          if (activeTrinkets.filter((key) => key.name === trinketName).length === 0) {
            trinketAtLevels["i" + itemLevels[x]] = getClassicTrinketScore(trinket.id, player, itemLevels[x]);
          }
        }
      }
      if (gameType === "Retail") {
        trinketAtLevels["tooltip"] = buildRetailEffectTooltip(trinketName, player, trinket.levelRange[trinket.levelRange.length - 1], playerSettings, trinket.id);
      } else {
        trinketAtLevels["tooltip"] = buildClassicEffectTooltip(trinketName, player, trinket.levelRange[trinket.levelRange.length - 1], trinket.id);
      }
      if (Object.keys(trinketAtLevels).length > 4) activeTrinkets.push(trinketAtLevels);
    }
  }

  if (gameType === "Classicc") {
    const getHighestClassicScore = (trinket) => trinket.heroic || trinket.normal || 0;
    activeTrinkets.sort((a, b) => (getHighestClassicScore(a) < getHighestClassicScore(b) ? 1 : -1));
  } else {
    activeTrinkets.sort((a, b) =>
      getHighestTrinketScore(finalDB, a, itemLevels.at(-1)) < getHighestTrinketScore(finalDB, b, itemLevels.at(-1)) ? 1 : -1
    );
  }

  const trinketText =
    gameType === "Retail"
      ? "31/3 Trinket changes are in."
      : "Rankings use a sample stat profile, use Top Gear to fine tune results for your specific loadout.";

  return (
    <Grid container spacing={1}>
      {gameType === "Retail" ? (
        <Grid item xs={12}>
          <Paper elevation={0} style={{ textAlign: "center", width: "80%", margin: "auto" }}>
            <div style={{ padding: 4 }}>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                  <Typography color="primary" align="center" variant="h5">
                    {"Chart Max Level"}
                  </Typography>
                </Grid>
              </Grid>
              <UpgradeFinderSlider
                style={{ color: "#52af77" }}
                containerStyle={{ paddingRight: 8 }}
                defaultValue={4}
                step={null}
                valueLabelDisplay="off"
                marks={maxLevelMarks}
                max={4}
                change={changeLevelCap}
              />
            </div>
          </Paper>
        </Grid>
      ) : null}

      <Grid item xs={12}>
      <Grid container spacing={1} justifyContent="center" sx={{ marginTop: "16px" }}>
        <InformationBox information={trinketText} variant="yellow" />

        <Grid item xs={12}>
          <Paper style={{ backgroundColor: "rgb(28, 28, 28, 0.5)" }} elevation={0} variant="outlined">
            <Grid container spacing={1} direction="row" alignItems="center">
              {gameType === "Retail" ? (
                <Grid item>
                  <div style={{ padding: "8px 0px 8px 8px" }}>
                    <Tooltip
                      title={
                        <Typography align="center" variant="body2">
                          {"Filter by source"}
                        </Typography>
                      }
                      style={{ marginTop: -5 }}
                      placement="top-start"
                    >
                      <Typography variant="h6">{"Filter"}:</Typography>
                    </Tooltip>
                  </div>
                </Grid>
              ) : null}
              {gameType === "Retail" ? (
                <Grid item>
                  <SourceToggle sources={sources} setSources={handleSource} />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <VerticalChart
                  data={activeTrinkets}
                  db={finalDB}
                  itemLevels={itemLevels}
                  theme={themeSelection(theme ? "candidate2" : "candidate21")}
                  gameType={gameType}
                />
              </Grid>
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
                    onChange={() => setTheme(!theme)}
                  >
                    <VisibilityIcon />
                  </ToggleButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleDownload}>
                  Download JSON
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
      </Grid>
    </Grid>
  );
}
