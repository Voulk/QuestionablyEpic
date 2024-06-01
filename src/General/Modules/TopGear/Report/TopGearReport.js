import React, { useEffect, useState } from "react";
import ItemCardReport from "../MiniItemCardReport";
import TopSetStatsPanel from "./TopSetStatsPanel";
// import { testList, differentialsTest } from "./TestData";
import { apiGetPlayerImage3 } from "../../SetupAndMenus/ConnectionUtilities";
import { useTranslation } from "react-i18next";
import { Button, Paper, Typography, Divider, Grid, Tooltip } from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";
import { classColoursJS } from "../../CooldownPlanner/Functions/ClassColourFunctions";
import CompetitiveAlternatives from "./CompetitiveAlternatives";
import { useSelector } from "react-redux";
import classIcons from "../../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { formatReport } from "General/Modules/TopGear/Engine/TopGearEngineShared";
import { getTranslatedClassName } from "locale/ClassNames";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";
import { sample } from "./SampleReportData.js";
import { getItemProp } from "General/Engine/ItemUtilities"
import ListedInformationBox from "General/Modules/1. GeneralComponents/ListedInformationBox";
import { getDynamicAdvice } from "./DynamicAdvice";
import ManaSourcesComponent from "./ManaComponent";

import { getManaRegen, getManaPool, getAdditionalManaEffects } from "Retail/Engine/EffectFormulas/Generic/RampGeneric/ClassicBase"

async function fetchReport(reportCode, setResult, setBackgroundImage) {
  // Check that the reportCode is acceptable.
  /*const requestOptions = {
    method: 'GET',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
  };*/

  const url = "https://questionablyepic.com/api/getReport.php?reportID=" + reportCode;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      //console.log(data);

      if (typeof(data) === "string") {
        const jsonData = JSON.parse(data);
        setBackgroundImage(apiGetPlayerImage3(jsonData.player.name, jsonData.player.realm, jsonData.player.region, setBackgroundImage));
        setResult(JSON.parse(data))
        
      }
      else if (typeof(data) === "object"){
        if ('status' in data && data.status === "Report not found") console.log("INVALID REPORT");
      }
      else {
        console.error("Invalid Report Data Type");
      }

    })

    //.catch(err => { throw err });
}



  const classIcon = (spec) => {
    switch (spec) {
      case "Holy Paladin":
        return require("Images/Classes/Paladin/icon-paladin.png");
      case "Holy Paladin Classic":
        return require("Images/Classes/Paladin/icon-paladin.png");
      case "Restoration Shaman":
        return require("Images/Classes/Shaman/icon-shaman.png");
      case "Restoration Shaman Classic":
        return require("Images/Classes/Shaman/icon-shaman.png");
      case "Holy Priest":
        return require("Images/Classes/Priest/icon-priest.png");
      case "Holy Priest Classic":
        return require("Images/Classes/Priest/icon-priest.png");
      case "Discipline Priest":
        return require("Images/Classes/Priest/icon-priest.png");
      case "Restoration Druid":
        return require("Images/Classes/Druid/icon-druid.png");
      case "Preservation Evoker":
        return require("Images/Classes/Evoker/icon_dracthyr.png");
      case "Restoration Druid Classic":
        return require("Images/Classes/Druid/icon-druid.png");
      case "Mistweaver Monk":
        return require("Images/Classes/Monk/icon-monk.png");
      default:
        break;
    }
  };

  const checkResult = (result) => {
    const setOk = result !== null && result !== "undefined" && result && result.itemSet.setStats && result.itemSet.itemList;
    return setOk;//&& result.itemSet.hardScore > 1;
  };

function TopGearReport(props) {

  let contentType = "";
  const [result, setResult] = useState(props.result);
  const [backgroundImage, setBackgroundImage] = useState("");
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const gameType = useSelector((state) => state.gameType);
  const location = useLocation();
  
  /* ----------------------------- On Component load get player image ----------------------------- */
  useEffect(() => {
    if (result && result.new) {
      
      
      if (process.env.PUBLIC_URL.includes("live")) {
        window.history.pushState('QE Live Report', 'Title', 'live/report/' + result.id);
        //apiGetPlayerImage3(result.player.name, result.player.realm, result.player.region, setBackgroundImage)
      }
      else if (process.env.PUBLIC_URL.includes("ptr")) {
        window.history.pushState('QE Live Report', 'Title', 'dev/ptr/' + result.id);
      }
      else {
        // Call Error
      }
    }

    if (result !== null && checkResult(result)) {
      displayReport(result, result.player, contentType, currentLanguage, gameType, t, backgroundImage, setBackgroundImage);
    }
    else {
      // No result queued. Check URL for report code and load that.
      fetchReport(location.pathname.split("/")[2], setResult, setBackgroundImage);
    }


  }, []);


  if (result !== null && checkResult(result)) {
    return displayReport(result, result.player, contentType, currentLanguage, gameType, t, backgroundImage, setBackgroundImage);
  }
  else {
    return   (  <div
    style={{

    }}
    >
    Loading...
    </div>
    )
    //return fetchReport("pbnzfwyv");
  }
}

function displayReport(result, player, contentType, currentLanguage, gameType, t, backgroundImage, setBackgroundImage) {

  const boxWidth = gameType === "Classic" ? "60%" : "60%";

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
    fetchReport(location.pathname.split("/")[3])

    //reportError("", "Top Gear Report", "Top Gear Report accessed without Report")
  }
    const advice = getDynamicAdvice(result, player, result.contentType, gameType);
    const gameType = player.spec.includes("Classic") ? "Classic" : "Retail";
    topSet = result.itemSet;
    enchants = topSet.enchantBreakdown;
    differentials = result.differentials;
    itemList = topSet.itemList;
    contentType = result.contentType;
    gemStats = gameType === "Classic" && "socketInformation" in topSet ? topSet.socketInformation : "";
    statList = topSet.setStats;
    const manaSources = {}

    // Setup Slots / Set IDs.
  itemList.forEach(item => {
      item.slot = getItemProp(item.id, "slot", gameType)
      item.setID = getItemProp(item.id, "itemSetId", gameType)
    })


    if (gameType === "Classic") {
      manaSources.pool = Math.round(getManaPool(statList, player.spec) + 22000); // Mana pot
      manaSources.regen = Math.round((getManaRegen(statList, player.spec.replace(" Classic", ""))) * 7 * 12);
      manaSources.additional = getAdditionalManaEffects(statList, player.spec.replace(" Classic", ""));
      //console.log("Total mana spend: " + (regen + pool))

      manaSources.totalMana =  Math.round(manaSources.pool + manaSources.regen + manaSources.additional.additionalMP5 * 12 * 7);
      console.log("Total Mana" + manaSources.totalMana)

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


  return (
    <div
      style={{
        margin: "auto",
        width: boxWidth,
        display: "block",
      }}
    >
      <div style={{ height: 96 }} />
      {resultValid ? (
        <Grid container spacing={1}>
          {/*<ListedInformationBox introText={"Your early vaults are vital choices where you have to balance short term and long term goals. While QE Live will help with short term, consider the following when picking a vault:"} bulletPoints={["Tier Pieces can be very good choices early on.", "Key effect items like Pip's Emerald Friendship Badge can be excellent pick ups since competition for them can be fierce.", 
            "Consider which items you might upgrade, or upgrade them in QE Live before hitting go."]} color={"#0288d1"} title={"Vault Advice"} /> */}
          <Grid item xs={12}>
            <Paper elevation={0} style={{ padding: 0 }}>
              <div
                style={{
                  justifyContent: "center",
                  backgroundImage: `url("${backgroundImage}")`,
                  backgroundColor: "#0F0E04",
                  backgroundSize: "cover",
                  backgroundPositionY: "-160px",
                  padding: 16,
                  borderRadius: 4,
                }}
              >
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={12}>
                    <Button color="primary" variant="outlined" component={Link} to={"/topgear"}>
                      {t("TopGear.BackToGearSelection")}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction="row">
                      <Grid item xs={4} style={{ width: "100%" }}>
                        {/* ---------------------------------------------------------------------------------------------- */
                        /*                                         Left Side Items                                        */
                        /* ---------------------------------------------------------------------------------------------- */}
                        <Grid container spacing={1}>
                          {itemList
                            //.filter((key) => key.slot === "Head" || key.slot === "Neck" || key.slot === "Back" || key.slot === "Shoulder" || key.slot === "Chest" || key.slot === "Wrist" || key.slot === "1H Weapon" || key.slot === "Offhands" || key.slot === "2H Weapon")
                            .filter((key => ["Head", "Neck", "Back", "Shoulder", "Chest", "Wrist", "1H Weapon", "2H Weapon", "Offhands", "Offhand", "Shield"].includes(key.slot)))
                            .map((item, index) => (
                              <ItemCardReport key={index} item={item} activateItem={true} enchants={enchants} gems={getGemIDs(item.slot)} firstSlot={topSet.firstSocket === item.slot}  primGems={topSet.primGems || ""} />
                            ))}
                          {/*newWeaponCombos.map((item, index) => (
                            <ItemCardReport key={index + "weapons"} item={item} activateItem={true} enchants={enchants} gems={getGemIDs(item.slot)} firstSlot={topSet.firstSocket === item.slot}  />
                          ))*/}
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <div style={{ width: "40%" }} />
                      </Grid>
                      <Grid item xs={4} style={{ width: "100%" }}>
                        {/* ---------------------------------------------------------------------------------------------- */
                        /*                                        Right Side Items                                        */
                        /* ---------------------------------------------------------------------------------------------- */}
                        <Grid container spacing={1}>
                          {itemList
                            .filter(
                              (key) => ["Hands", "Waist", "Legs", "Feet", "Finger", "Trinket", "Relics & Wands"].includes(key.slot)
                            )
                            .map((item, index) => (
                              <ItemCardReport key={index} item={item} activateItem={true} enchants={enchants} gems={getGemIDs(item.slot)} firstSlot={topSet.firstSocket === item.slot}  primGems={topSet.primGems || ""} />
                            ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {/* ---------------------------------------------------------------------------------------------- */
                    /*                                           Stat Panel                                           */
                    /* ---------------------------------------------------------------------------------------------- */}
                    <Grid container spacing={1} direction="row" justifyContent="space-between">
                      <Grid item xs={4} style={{ paddingBottom: 8 }}>
                        <Grid container justifyContent="flex-start">
                          <TopSetStatsPanel statList={statList} spec={player.spec} currentLanguage={currentLanguage} gameType={gameType} />
                        </Grid>
                      </Grid>
                      <Grid item xs={4} style={{ paddingBottom: 8, alignSelf: "flex-end" }}>
                        <Grid container justifyContent="flex-end">
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
                              <Grid item xs="auto">
                                <Grid container direction="row">
                                  <img src={classIcon(player.spec)} height={80} width={80} style={{ padding: 4 }} />
                                </Grid>
                              </Grid>
                              <Grid item xs={8}>
                                <Grid container direction="row" style={{ paddingTop: 8 }}>
                                  <Grid item xs={12}>
                                    <div style={{ display: "inline-flex", alignItems: "center" }}>
                                      <Typography
                                        variant="h5"
                                        wrap="nowrap"
                                        display="inline"
                                        align="left"
                                        style={{
                                          color: classColoursJS(player.spec),
                                        }}
                                      >
                                        {player.name}
                                      </Typography>

                                      <Tooltip title={getTranslatedClassName(player.spec)} style={{ color: classColoursJS(player.spec) }} placement="top" arrow>
                                        {classIcons(player.spec, {
                                          height: 22,
                                          width: 22,
                                          marginLeft: 4,
                                          verticalAlign: "middle",
                                          borderRadius: 4,
                                          border: "1px solid " + classColoursJS(player.spec),
                                        })}
                                      </Tooltip>
                                    </div>

                                    <Divider />
                                  </Grid>
                                  {gameType === "Retail" ? (
                                    <Grid item xs={12}>
                                      <Grid container item direction="row" spacing={0}>
                                        <Grid item xs={12}>
                                          <Typography variant="caption" align="left">
                                            {"Content: " + t(contentType)}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Typography variant="caption" align="left">
                                            {"Playstyle: " + player.model}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  ) : (
                                    <Grid item xs={12}>
                                      <Typography variant="caption" wrap="nowrap" display="inline" align="left">
                                        {player.region}-{player.realm}
                                      </Typography>
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
           <Grid item xs={12}><CompetitiveAlternatives differentials={differentials} player={player} /></Grid>
           <Grid item xs={12}>{(advice && advice.length > 0) ? <ListedInformationBox introText="Here are some notes on your set:" bulletPoints={advice} color="green" backgroundCol="#304434" title="Insights - Set Notes" /> : ""}</Grid>                     
          {gameType === "Classic" ? <Grid item xs={12}><ManaSourcesComponent manaSources={manaSources}/></Grid> : null}
          <Grid item style={{ height: 60 }} xs={12} />

        </Grid>
      ) : (
        <Typography style={{ textAlign: "center", color: "white" }}>{t("TopGear.ErrorMessage")}</Typography>
      )}

    </div>
  );
}

export default TopGearReport;
