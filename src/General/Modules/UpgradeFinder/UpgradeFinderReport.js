import React, { useEffect, useState } from "react";
import { Button, Tabs, Tab, AppBar, Typography, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDifferentialByID, getItem } from "../../Engine/ItemUtilities";
import MythicPlusGearContainer from "./Panels/PanelMythicPlus";
import PvPGearContainer from "./Panels/PanelPvP";
import RaidGearContainer from "./Panels/PanelRaid";
import WorldBossGearContainer from "./Panels/PanelWorldBosses";
import SlotsContainer from "./Panels/PanelSlots";
import "./Panels/ItemUpgrade.css";
import { useSelector } from "react-redux";
import UFTabPanel from "./Panels/ufComponents/ufTabPanel";
import { UpgradeFinderStyles } from "./UpgradeFinderStyles";
import { generateReportCode } from "General/Modules/TopGear/Engine/TopGearEngineShared";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

async function fetchUpgradeReport(reportCode, setResult, setBackgroundImage) {
  // Check that the reportCode is acceptable.
  /*const requestOptions = {
    method: 'GET',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
  };*/

  const url = "https://questionablyepic.com/api/getUpgradeReport.php?reportID=" + reportCode;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      if (typeof(data) === "string") {
        const jsonData = JSON.parse(data);
        //const img = apiGetPlayerImage3(jsonData.player.name, jsonData.player.realm, jsonData.player.region, setBackgroundImage);
        setResult(JSON.parse(data))
        
      }
      else if (typeof(data) === "object"){
        if ('status' in data && data.status === "Report not found") console.log("INVALID REPORT: " + reportCode);
      }
      else {
        console.error("Invalid Report Data Type");
      }

    })

    //.catch(err => { throw err });
}

const handleTabChange = (event, newValue) => {
  setTabValue(newValue);
};


// Our short report only contains differential information which means we have to set up a few things ourselves.
const addItemSources = (diffList) => {
  diffList.forEach((item) => {
    item.source = getItem(item.item).sources[0];
    item.slot = getItem(item.item).slot;
  });
  
  return diffList;
}

export default function UpgradeFinderReport(props) {
  //   useEffect(() => {
  //     ReactGA.pageview(window.location.pathname + window.location.search);
  //   }, []);

  const classes = UpgradeFinderStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const gameType = useSelector((state) => state.gameType);
  const [result, setResult] = useState(props.result);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  //const result = props.itemSelection;
  //const result = props.result;



  const returnToSetup = () => {
    props.setShowReport(false);
  };

  useEffect(() => {
    if (result && result.new) {
      if (process.env.PUBLIC_URL.includes("live")) {
        window.history.pushState('QE Live Report', 'Title', 'live/upgradereport/' + result.id);
      }
      else if (process.env.PUBLIC_URL.includes("dev")) {
        window.history.pushState('QE Live Report', 'Title', 'dev/upgradereport/' + result.id);
      }
      else {
        // Call Error
      }
  
    }

    if (result !== null/* && checkResult(result)*/) {

      upgradeFinderResultsRetail(result, t, result.player, tabValue, setTabValue, classes);
    }
    else {
      // No result queued. Check URL for report code and load that.
      fetchUpgradeReport(location.pathname.split("/").pop(), setResult, /*setBackgroundImage*/);
    }

    }, []);

    if (result !== null) {
      return upgradeFinderResultsRetail(result, t, result.player, tabValue, setTabValue, classes);
    }
  
  } //

  function upgradeFinderResultsRetail(result, t, player, tabValue, setTabValue, classes) {
    const ufSettings = result.ufSettings;
    //const report = props.report;
    
    const itemList = result.itemSet;
    const itemDifferentials = addItemSources(result.results);
    
    //itemList.sort((a, b) => (getDifferentialByID(itemDifferentials, a.id, a.level) < getDifferentialByID(itemDifferentials, b.id, b.level) ? 1 : -1));
    itemDifferentials.sort((a, b) => (getDifferentialByID(itemDifferentials, a.id, a.level) < getDifferentialByID(itemDifferentials, b.id, b.level) ? 1 : -1));
    return (
      <div className={classes.header}>
        <div style={{ height: 96 }} />
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div>
              <Button color="primary" variant="outlined" onClick={() => returnToSetup()} style={{ position: "absolute" }}>
                {t("UpgradeFinder.BackButton")}
              </Button>
              <Typography variant="h4" color="primary" align="center" style={{ padding: "1px 1px 1px 1px" }}>
                {t("UpgradeFinder.Header") + " - " + result.contentType}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "#000",
                borderRadius: "4px 4px 4px 4px",
              }}
              elevation={1}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="simple tabs example"
                variant="fullWidth"
                style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.22)" }}
                TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
              >
                {/* Raid */}
                <Tab className={classes.raidHeaderStyle} label={t("Raid")} {...a11yProps(0)} />
                {/* Mythic Plus */}
                <Tab className={classes.mythicPlusHeaderStyle} label={t("Dungeon")} {...a11yProps(1)} />
                {/* PVP */}
                {/* <Tab className={classes.pvpHeaderStyle} label={t("UpgradeFinder.PvP")} {...a11yProps(2)} /> */}
                {/* World Bosses */}
                <Tab className={classes.worldBossHeaderStyle} label={t("UpgradeFinder.WorldBosses")} {...a11yProps(2)} />
                {/* Slots */}
                <Tab className={classes.slotsHeaderStyle} label={t("UpgradeFinder.UpgradeBySlot")} {...a11yProps(3)} />
              </Tabs>
            </AppBar>
          </Grid>

          {/* Raid */}
          <Grid item xs={12}>
            <UFTabPanel value={tabValue} index={0}>
              <div className={classes.panel}>
                <Grid container>
                  <RaidGearContainer player={player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={ufSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>
              
          {/* Mythic Plus */}
          <Grid item xs={12}>
            <UFTabPanel value={tabValue} index={1}>
              <div className={classes.panel}>
                <Grid container>
                  <MythicPlusGearContainer
                    //setDungeonDifficulty={props.setDungeonDifficulty}
                    player={player}
                    itemList={itemList}
                    itemDifferentials={itemDifferentials}
                    playerSettings={ufSettings}
                  />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* PVP 
          <Grid item xs={12}>
            <UFTabPanel value={tabValue} index={2}>
              <div className={classes.panel}>
                <Grid container>
                  <PvPGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>*/}

          {/* World Bosses */}
          <Grid item xs={12}>
            <UFTabPanel value={tabValue} index={2}>
              <div className={classes.panel}>
                <Grid container>
                  <WorldBossGearContainer player={player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={ufSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* Slots */}
          <Grid item xs={12}>
            <UFTabPanel value={tabValue} index={3}>
              <div className={classes.panel}>
                <Grid container>
                  <SlotsContainer player={player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={ufSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>
        </Grid>
      </div>
    );
  };

  const upgradeFinderResultsBC = () => {
    return (
      <div className={classes.header}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div>
              <Button color="primary" variant="outlined" onClick={() => returnToSetup()} style={{ position: "absolute" }}>
                {t("UpgradeFinder.BackButton")}
              </Button>
              <Typography variant="h4" color="primary" align="center" style={{ padding: "1px 1px 1px 1px" }}>
                {t("UpgradeFinder.Header")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "#000",
                borderRadius: "4px 4px 4px 4px",
              }}
              elevation={1}
            >
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="simple tabs example"
                variant="fullWidth"
                style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.22)" }}
                TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
              >
                {/* -------------------------------------------- Raid -------------------------------------------- */}
                <Tab className={classes.raidBCHeaderStyle} label={t("Raids")} {...a11yProps(0)} />
                {/* ------------------------------------------- Dungeon ------------------------------------------ */}
                <Tab className={classes.dungeonBCPlusHeaderStyle} label={t("Dungeons")} {...a11yProps(1)} />
                {/* --------------------------------------------- PVP -------------------------------------------- */}
                <Tab className={classes.pvpBCHeaderStyle} label={t("UpgradeFinder.PvP")} {...a11yProps(2)} />
                {/* -------------------------------------------- Slots ------------------------------------------- */}
                <Tab className={classes.slotsBCHeaderStyle} label={t("UpgradeFinder.UpgradeBySlot")} {...a11yProps(3)} />
              </Tabs>
            </AppBar>
          </Grid>
          {/* Raid */}
          <Grid item xs={12}>
            <UFTabPanel value={tabValue} index={0}>
              <div className={classes.panel}>
                <Grid container>
                  <RaidGearContainer player={player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={ufSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* Mythic Plus */}
          <Grid item xs={12}>
            <UFTabPanel value={tabValue} index={1}>
              <div className={classes.panel}>
                <Grid container>
                  <MythicPlusGearContainer
                    //setDungeonDifficulty={props.setDungeonDifficulty}
                    player={player}
                    itemList={itemList}
                    itemDifferentials={itemDifferentials}
                    playerSettings={ufSettings}
                  />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* PVP */}
          <Grid item xs={12}>
            <UFTabPanel value={tabValue} index={2}>
              <div className={classes.panel}>
                <Grid container>{/*<PvPGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} /> */}</Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* World Bosses */}
          {/* <UFTabPanel value={tabValue} index={3}>
          <div className={classes.panel}>
            <Grid container>
              <WorldBossGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
            </Grid>
          </div>
        </UFTabPanel> */}

          {/* Slots */}
          <Grid item xs={12}>
            <UFTabPanel value={tabValue} index={3}>
              <div className={classes.panel}>
                <Grid container>
                  <SlotsContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={ufSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>
        </Grid>
      </div>
    );
  };

  /*
  return (
    <div>
      {gameType === "Retail" ? upgradeFinderResultsRetail() : upgradeFinderResultsBC()} <div style={{ height: 400 }} />
    </div>
  );*/
