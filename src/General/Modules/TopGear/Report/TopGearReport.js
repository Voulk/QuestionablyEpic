import React, { useEffect, useState } from "react";
import ItemCardReport from "../MiniItemCardReport";
import TopSetStatsPanel from "./TopSetStatsPanel";
// import { testList, differentialsTest } from "./TestData";
import { apiGetPlayerImage3 } from "../../SetupAndMenus/ConnectionUtilities";
import { useTranslation } from "react-i18next";
import {
  Button,
  Paper,
  Typography,
  Divider,
  Grid,
  Tooltip,
} from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";
import { classColours } from "General/Engine/ClassData";
import CompetitiveAlternatives from "./CompetitiveAlternatives";
import { useSelector } from "react-redux";
import classIcons from "General/Modules/IconFunctions/ClassIcons";
//import { formatReport, exportGearSet } from "General/Modules/TopGear/Engine/TopGearEngineShared";
import { exportWowheadGearList, exportReforgeLite } from "./TopGearExports";
import MenuDropdown from "General/Modules/TopGear/Report/MenuDropdown";
import GenericDialog from "General/Modules/TopGear/Report/GenericDialog";
import { getItemProp } from "General/Engine/ItemUtilities";
import ListedInformationBox from "General/Modules/GeneralComponents/ListedInformationBox";
import InformationBox from "General/Modules/GeneralComponents/InformationBox";
import { getDynamicAdvice } from "./DynamicAdvice";
import ManaSourcesComponent from "./ManaComponent";
import { getTranslatedClassName } from "locale/ClassNames";
import {
  getManaRegen,
  getManaPool,
  getAdditionalManaEffects,
} from "General/Modules/Player/ClassDefaults/Generic/ClassicBase";
import SpellDataAccordion from "./SpellDataAccordion";
import { getWHData } from "./WowheadGearPlannerExport";
import { trackPageView } from "Analytics";

async function fetchReport(reportCode, setResult, setBackgroundImage) {
  // Check that the reportCode is acceptable.
  /*const requestOptions = {
    method: 'GET',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
  };*/

  const url =
    "https://questionablyepic.com/api/getReport.php?reportID=" + reportCode;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);

      if (typeof data === "string") {
        const jsonData = JSON.parse(data);
        setBackgroundImage(
          apiGetPlayerImage3(
            jsonData.player.name,
            jsonData.player.realm,
            jsonData.player.region,
            setBackgroundImage
          )
        );
        setResult(JSON.parse(data));
      } else if (typeof data === "object") {
        if ("status" in data && data.status === "Report not found")
          console.log("INVALID REPORT");
      } else {
        console.error("Invalid Report Data Type");
      }
    });

  //.catch(err => { throw err });
}

const classIcon = (spec) => {
  switch (spec) {
    case "Holy Paladin":
    case "Holy Paladin Classic":
      return require("Images/Classes/Paladin/icon-paladin.png");
    case "Restoration Shaman":
    case "Restoration Shaman Classic":
      return require("Images/Classes/Shaman/icon-shaman.png");
    case "Holy Priest":
    case "Holy Priest Classic":
    case "Discipline Priest":
    case "Discipline Priest Classic":
      return require("Images/Classes/Priest/icon-priest.png");
    case "Restoration Druid":
    case "Restoration Druid Classic":
      return require("Images/Classes/Druid/icon-druid.png");
    case "Preservation Evoker":
      return require("Images/Classes/Evoker/icon_dracthyr.png");
    case "Mistweaver Monk":
    case "Mistweaver Monk Classic":
      return require("Images/Classes/Monk/icon-monk.png");
    default:
      break;
  }
};

const checkResult = (result) => {
  const setOk =
    result !== null &&
    result !== "undefined" &&
    result &&
    result.itemSet.setStats &&
    result.itemSet.itemList;
  return setOk; //&& result.itemSet.hardScore > 1;
};

function TopGearReport(props) {
  let contentType = "";
  const [result, setResult] = useState(props.result);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [dialogText, setDialogText] = useState("");
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const location = useLocation();

  /* ----------------------------- On Component load get player image ----------------------------- */
  useEffect(() => {
    if (result && result.new) {
      if (process.env.PUBLIC_URL.includes("live")) {
        window.history.replaceState(
          "QE Live Report",
          "Title",
          "live/report/" + result.id
        );
        window.scrollTo(0, 0);
        if (!result.player.spec.includes("Classic"))
          apiGetPlayerImage3(
            result.player.name,
            result.player.realm,
            result.player.region,
            setBackgroundImage
          );
      } else if (process.env.PUBLIC_URL.includes("ptr")) {
        window.history.replaceState(
          "QE Live Report",
          "Title",
          "ptr/report/" + result.id
        );
        window.scrollTo(0, 0);
        if (!result.player.spec.includes("Classic"))
          apiGetPlayerImage3(
            result.player.name,
            result.player.realm,
            result.player.region,
            setBackgroundImage
          );
      } else {
        // Call Error
      }
    }

    if (result !== null && checkResult(result)) {
      trackPageView("/live/report");
      displayReport(
        result,
        result.player,
        contentType,
        currentLanguage,
        t,
        backgroundImage,
        setBackgroundImage
      );
    } else {
      // No result queued. Check URL for report code and load that.
      fetchReport(
        location.pathname.split("/")[2],
        setResult,
        setBackgroundImage
      );
    }
  }, []);

  if (result !== null && checkResult(result)) {
    return displayReport(
      result,
      result.player,
      contentType,
      currentLanguage,
      t,
      backgroundImage,
      setBackgroundImage,
      dialogOpen,
      setDialogOpen,
      dialogText,
      setDialogText
    );
  } else {
    return <div style={{}}>Loading...</div>;
    //return fetchReport("pbnzfwyv");
  }
}

function displayReport(
  result,
  player,
  contentType,
  currentLanguage,
  t,
  backgroundImage,
  setBackgroundImage,
  dialogOpen,
  setDialogOpen,
  dialogText,
  setDialogText
) {
  const boxWidth = "60%";

  let resultValid = true;
  //let result = props.result;
  let topSet = "";
  let enchants = {};
  let gemStats = [];
  let differentials = {};
  let itemList = {};
  let statList = {};

  if (result === null) {
    // They shouldn't be here. Send them back to the home page.
    //history.push("/")
    const location = useLocation();
    fetchReport(location.pathname.split("/")[3]);

    //reportError("", "Top Gear Report", "Top Gear Report accessed without Report")
  }
  const gameType = player.spec.includes("Classic") ? "Classic" : "Retail";
  const advice = getDynamicAdvice(result, player, result.contentType, gameType);

  topSet = result.itemSet;
  enchants = topSet.enchantBreakdown;
  const retailGems = topSet.retailGemBreakdown
    ? JSON.parse(topSet.retailGemBreakdown)
    : [];
  differentials = result.differentials;
  itemList = topSet.itemList;
  contentType = result.contentType;
  gemStats =
    gameType === "Classic" && "socketInformation" in topSet
      ? topSet.socketInformation
      : "";
  statList = topSet.setStats;
  const manaSources = {};

  // Setup Slots / Set IDs.
  let gemCount = 0;
  itemList.forEach((item) => {
    item.slot = getItemProp(item.id, "slot", gameType);
    item.setID = getItemProp(item.id, "itemSetId", gameType);
    item.sources = getItemProp(item.id, "sources", gameType);
    if (item.sources) item.source = item.sources[0];
    item.socketedGems =
      topSet.socketedGems && item.id in topSet.socketedGems
        ? topSet.socketedGems[item.id]
        : [];
    if (item.id in topSet.reforges) item.flags.push(topSet.reforges[item.id]);

    if (item.socket) {
      item.socketedGems = [];
      for (var i = 0; i < item.socket; i++) {
        item.socketedGems.push(retailGems.shift());
        //console.log("PUshing gem to ite:")
      }
    }
  });

  const handleExportMenuClick = (buttonClicked) => {
    //alert("Exporting to " + buttonClicked, result.id);
    if (buttonClicked === "ReforgeLite Export") {
      setDialogOpen(true);
      setDialogText(exportReforgeLite(player, itemList, topSet.reforges));
    } else if (buttonClicked === "Wowhead BIS List") {
      setDialogOpen(true);
      setDialogText(exportWowheadGearList(itemList, player.spec, gameType));
    } else if (buttonClicked === "Wowhead Gear Planner") {
      setDialogOpen(true);
      setDialogText(getWHData(player, itemList, topSet.reforges, enchants));
    } else {
    }
  };

  //exportGearSet(itemList, player.spec);

  if (gameType === "Classic") {
    manaSources.pool = Math.round(
      getManaPool(statList, player.spec.replace(" Classic", "")) + 22000
    ); // Mana pot
    manaSources.regen = Math.round(
      getManaRegen(statList, player.spec.replace(" Classic", "")) * 7 * 12
    );
    manaSources.additional = getAdditionalManaEffects(
      statList,
      player.spec.replace(" Classic", "")
    );
    //console.log("Total mana spend: " + (regen + pool))
    //console.log(manaSources);
    manaSources.totalMana = Math.round(
      manaSources.pool +
        manaSources.regen +
        manaSources.additional.additionalMP5 * 12 * 7
    );
  }

  // Build Vault items
  // Take the top set, and every differential, and if it contains a vault item we haven't included yet, include it with the score differential compared to our *current* set.

  //if (props.player.spec === "Discipline Priest" && contentType === "Raid") formatReport(topSet.report);

  const getGemIDs = (slot) => {
    if (gameType === "Retail" || !gemStats) return "";
    else {
      let gemString = "&gems=";
      for (var i = 0; i < gemStats.socketsAvailable.length; i++) {
        if (gemStats.socketsAvailable[i].slot === slot) {
          for (var j = 0; j < gemStats.socketedPieces[i].length; j++) {
            gemString += gemStats.socketedPieces[i][j]["id"].toString() + ":";
          }
        }
      }
      return gemString.slice(0, -1);
    }
  };

  const handleBackClick = () => {
    window.history.back(); // Goes back to the previous page in history
  };

  const topInfo = {
    color: player.model.includes("Beta") ? "brick" : "transparent",
    info: player.model.includes("Beta")
      ? "This is a Beta playstyle model. Take results with a small degree of caution over the next few days."
      : "This is your best set of gear. You can see how close other sets are below!",
  };

  //backgroundImage = "https://i.imgur.com/uA1E2iE.png" // Tester
  return (
    <div
      style={{
        margin: "auto",
        width: boxWidth,
        display: "block",
      }}
    >
      <div style={{ height: 90 }} />
      {resultValid ? (
        <Grid  item xs={12} spacing={1} style={{ paddingBottom: 1}}>
          {gameType === "Vaults" ? <ListedInformationBox introText={"Your early vaults are vital choices where you have to balance short term and long term goals along with your future crafts. While QE Live will help with short term, consider the following when picking a vault:"} bulletPoints={["Tier Pieces can be very good choices early on.", "Key effect items like strong trinkets can be excellent pick ups since competition for them can be fierce.", 
            "Consider which items you might upgrade or craft this week, or upgrade them in QE Live before hitting go.", "Ask in your class discord for a second opinion if you are unsure."]} color={"#0288d1"} title={"Vault Advice - READ THIS"} /> : ""}
          {/*<Grid item xs={12}>
          <InformationBox variant={topInfo.color} title={"Top Set"} information={topInfo.info}></InformationBox>
          </Grid>*/}
          <Grid item xs={12}>
            <Paper elevation={0} style={{ padding: 0 }}>
              <div
                style={{
                  justifyContent: "center",
                  // backgroundImage: `url("${backgroundImage}")`,
                  backgroundColor: "#262633",
                  backgroundSize: "cover",
                  backgroundPositionY: "-160px",
                  padding: 16,
                  borderRadius: 4,
                }}
              >
                <div
                  display={{ xs: "none", lg: "block" }}
                  position="relative"
                  width="0"
                  height={0}
                  margin="auto"
                >
                  {/* <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "45%",
                      transform: "translate(-25%, -10%)",

                      backgroundImage: `url("${backgroundImage}")`,
                      justifyContent: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPositionY: "-160px",
                      margin: "auto",
                      maxHeight: "750px",
                      height: "100%",
                      width: "100%",
                    }}
                  ></div> */}
                </div>

                <Grid container direction="row" spacing={1}>
                  <Grid item xs={12}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Button
                          color="primary"
                          variant="outlined"
                          component={Link}
                          to={"/topgear"}
                        >
                          {t("TopGear.BackToGearSelection")}
                        </Button>
                      </Grid>

                      <Grid item>
                        <MenuDropdown
                          handleClicked={handleExportMenuClick}
                          gameType={gameType}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={{ xs: "column", md: "row" }}
                      width="100%"
                      margin="auto"
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={4}
                        style={{ width: "100%" }}
                      >
                        {/* ---------------------------------------------------------------------------------------------- */
                        /*                                         Left Side Items                                        */
                        /* ---------------------------------------------------------------------------------------------- */}
                        <Grid container spacing={1}>
                          {itemList
                            //.filter((key) => key.slot === "Head" || key.slot === "Neck" || key.slot === "Back" || key.slot === "Shoulder" || key.slot === "Chest" || key.slot === "Wrist" || key.slot === "1H Weapon" || key.slot === "Offhands" || key.slot === "2H Weapon")
                            .filter((key) =>
                              [
                                "Head",
                                "Neck",
                                "Back",
                                "Shoulder",
                                "Chest",
                                "Wrist",
                                "1H Weapon",
                                "2H Weapon",
                                "Offhands",
                                "Offhand",
                                "Shield",
                              ].includes(key.slot)
                            )
                            .map((item, index) => (
                              <ItemCardReport
                                key={index}
                                item={item}
                                activateItem={true}
                                enchants={enchants}
                                gems={getGemIDs(item.slot)}
                                firstSlot={topSet.firstSocket === item.slot}
                                primGems={topSet.primGems || ""}
                                gameType={gameType}
                              />
                            ))}
                          {/*newWeaponCombos.map((item, index) => (
                            <ItemCardReport key={index + "weapons"} item={item} activateItem={true} enchants={enchants} gems={getGemIDs(item.slot)} firstSlot={topSet.firstSocket === item.slot}  />
                          ))*/}
                        </Grid>
                      </Grid>
                      <Grid item xs={0} lg={4} height={500} display={{ xs: "none", lg: "block" }}>
                        <img
                          src={backgroundImage}
                          alt="Background"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "150%",
                              transform: "translateY(-160px)",
                            }}
                          />
                        
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={4}
                        style={{ width: "100%" }}
                      >
                        {/* ---------------------------------------------------------------------------------------------- */
                        /*                                        Right Side Items                                        */
                        /* ---------------------------------------------------------------------------------------------- */}
                        <Grid container spacing={1}>
                          {itemList
                            .filter((key) =>
                              [
                                "Hands",
                                "Waist",
                                "Legs",
                                "Feet",
                                "Finger",
                                "Trinket",
                                "Relics & Wands",
                              ].includes(key.slot)
                            )
                            .map((item, index) => (
                              <ItemCardReport
                                key={index}
                                item={item}
                                activateItem={true}
                                enchants={enchants}
                                gems={getGemIDs(item.slot)}
                                firstSlot={topSet.firstSocket === item.slot}
                                primGems={topSet.primGems || ""}
                                gameType={gameType}
                              />
                            ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {/* ---------------------------------------------------------------------------------------------- */
                    /*                                           Stat Panel                                           */
                    /* ---------------------------------------------------------------------------------------------- */}
                    <Grid
                      container
                      spacing={1}
                      direction={{ xs: "column", md: "row" }}
                      justifyContent={{ xs: "center", lg: "space-between" }}
                    >
                      <Grid item xs={12} md={4} style={{ paddingBottom: 8 }}>
                        <Grid container justifyContent="flex-start" width="100%">
                          <TopSetStatsPanel
                            statList={statList}
                            spec={player.spec}
                            currentLanguage={currentLanguage}
                            gameType={gameType}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        style={{ paddingBottom: 8, alignSelf: "flex-end" }}
                        margin={{ xs: "auto", md: "inherit" }}
                      >
                        <Grid container justifyContent="flex-end" width={{ xs: "auto", md: "350px" }}>
                          <Paper
                            elevation={0}
                            style={{
                              fontSize: "12px",
                              textAlign: "left",
                              width: "100%",
                              // maxWidth: 350,
                              backgroundColor: "rgba(44, 44, 44, 0.5)",
                              display: "block",
                            }}
                          >
                            <Grid container direction="row">
                              <Grid item xs="auto" width={80} height={80} margin="auto">
                                <Grid container direction="row">
                                  <img
                                    src={classIcon(player.spec)}
                                    height={80}
                                    width={80}
                                    style={{ padding: 4 }
                                  }
                                  />
                                </Grid>
                              </Grid>
                              <Grid item xs={8} margin="auto">
                                <Grid
                                  container
                                  direction="row"
                                  style={{ paddingTop: 8 }}
                                >
                                  <Grid item xs={12}>
                                    <div
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Typography
                                        variant="h5"
                                        wrap="nowrap"
                                        display="inline"
                                        align="left"
                                        style={{
                                          color: classColours(player.spec),
                                        }}
                                      >
                                        {player.name}
                                      </Typography>

                                      <Tooltip
                                        title={getTranslatedClassName(
                                          player.spec
                                        )}
                                        style={{
                                          color: classColours(player.spec),
                                        }}
                                        placement="top"
                                        arrow
                                      >
                                        {classIcons(player.spec, {
                                          height: 22,
                                          width: 22,
                                          marginLeft: 4,
                                          verticalAlign: "middle",
                                          borderRadius: 4,
                                          border:
                                            "1px solid " +
                                            classColours(player.spec),
                                        })}
                                      </Tooltip>
                                    </div>

                                    <Divider />
                                  </Grid>
                                  {gameType === "Retail" ? (
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        item
                                        direction="row"
                                        spacing={0}
                                      >
                                        <Grid item xs={12}>
                                          <Typography
                                            variant="caption"
                                            align="left"
                                          >
                                            {"Content: " + t(contentType)}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Typography
                                            variant="caption"
                                            align="left"
                                          >
                                            {"Playstyle: " + player.model}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Typography
                                            variant="caption"
                                            align="left"
                                          >
                                            {"Version: " +
                                              (result.version || "")}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  ) : (
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        item
                                        direction="row"
                                        spacing={0}
                                      >
                                        <Grid item xs={12}>
                                          <Typography
                                            variant="caption"
                                            wrap="nowrap"
                                            display="inline"
                                            align="left"
                                          >
                                            {player.race} {player.region}-
                                            {player.realm}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Typography
                                            variant="caption"
                                            align="left"
                                          >
                                            {"Version: " +
                                              (result.version || "")}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
          {/* ---------------------------------------------------------------------------------------------- */
          /*                                    Competitive Alternatives                                    */
          /* ----------------------------------------------------------------------------------------------  */}
          <Grid item xs={12}>
            <CompetitiveAlternatives
              differentials={differentials}
              player={player}
              gameType={gameType}
            />
          </Grid>
          <Grid item xs={12}>
            {advice && advice.length > 0 ? (
              <ListedInformationBox
                introText="Here are some notes on your set:"
                bulletPoints={advice}
                color="green"
                backgroundCol="#304434"
                title="Insights - Set Notes"
              />
            ) : (
              ""
            )}
          </Grid>
          {gameType === "Classic" ? (
            <Grid item xs={12}>
              <ManaSourcesComponent manaSources={manaSources} />
            </Grid>
          ) : null}
          {gameType === "Classic" ? (
            <Grid item xs={12}>
              <SpellDataAccordion
                spec={player.spec}
                statList={statList}
                talents={null}
              />
            </Grid>
          ) : null}
          <Grid item style={{ height: 60 }} xs={12} />{" "}
          {/* This adds space to the bottom of the page to improve scrolling. */}
        </Grid>
      ) : (
        <Typography style={{ textAlign: "center", color: "white" }}>
          {t("TopGear.ErrorMessage")}
        </Typography>
      )}

      <GenericDialog
        dialogText={dialogText}
        isDialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
}

export default TopGearReport;
