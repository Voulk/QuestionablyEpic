import React, { useEffect } from "react";
import { Button, Tabs, Tab, AppBar, Typography, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDifferentialByID } from "../../Engine/ItemUtilities";
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



export default function UpgradeFinderReport(props) {
  //   useEffect(() => {
  //     ReactGA.pageview(window.location.pathname + window.location.search);
  //   }, []);

  const classes = UpgradeFinderStyles();
  const [tabvalue, setTabValue] = React.useState(0);
  const { t } = useTranslation();
  const result = props.itemSelection;
  const report = props.report;
  
  const itemList = result.itemSet;
  const itemDifferentials = result.differentials;
  //console.log("Total Item Count: " + itemDifferentials.length);
  //console.log(JSON.stringify(itemDifferentials));
  
  const gameType = useSelector((state) => state.gameType);
  itemList.sort((a, b) => (getDifferentialByID(itemDifferentials, a.id, a.level) < getDifferentialByID(itemDifferentials, b.id, b.level) ? 1 : -1));
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const returnToSetup = () => {
    props.setShowReport(false);
  };

  useEffect(() => {
    if (result/* && result.new*/) {
      if (process.env.PUBLIC_URL.includes("live")) {
        window.history.pushState('QE Live Report', 'Title', 'live/upgradefinder/' + report.id);
      }
      else if (process.env.PUBLIC_URL.includes("dev")) {
        window.history.pushState('QE Live Report', 'Title', 'dev/upgradefinder/' + report.id);
      }
      else {
        // Call Error
      }
  
    }
    }, []);

  const upgradeFinderResultsRetail = () => {
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
                value={tabvalue}
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
            <UFTabPanel value={tabvalue} index={0}>
              <div className={classes.panel}>
                <Grid container>
                  <RaidGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* Mythic Plus */}
          <Grid item xs={12}>
            <UFTabPanel value={tabvalue} index={1}>
              <div className={classes.panel}>
                <Grid container>
                  <MythicPlusGearContainer
                    setDungeonDifficulty={props.setDungeonDifficulty}
                    player={props.player}
                    itemList={itemList}
                    itemDifferentials={itemDifferentials}
                    playerSettings={props.playerSettings}
                  />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* PVP 
          <Grid item xs={12}>
            <UFTabPanel value={tabvalue} index={2}>
              <div className={classes.panel}>
                <Grid container>
                  <PvPGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>*/}

          {/* World Bosses */}
          <Grid item xs={12}>
            <UFTabPanel value={tabvalue} index={2}>
              <div className={classes.panel}>
                <Grid container>
                  <WorldBossGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* Slots */}
          <Grid item xs={12}>
            <UFTabPanel value={tabvalue} index={3}>
              <div className={classes.panel}>
                <Grid container>
                  <SlotsContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
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
                value={tabvalue}
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
            <UFTabPanel value={tabvalue} index={0}>
              <div className={classes.panel}>
                <Grid container>
                  <RaidGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* Mythic Plus */}
          <Grid item xs={12}>
            <UFTabPanel value={tabvalue} index={1}>
              <div className={classes.panel}>
                <Grid container>
                  <MythicPlusGearContainer
                    setDungeonDifficulty={props.setDungeonDifficulty}
                    player={props.player}
                    itemList={itemList}
                    itemDifferentials={itemDifferentials}
                    playerSettings={props.playerSettings}
                  />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* PVP */}
          <Grid item xs={12}>
            <UFTabPanel value={tabvalue} index={2}>
              <div className={classes.panel}>
                <Grid container>{/*<PvPGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} /> */}</Grid>
              </div>
            </UFTabPanel>
          </Grid>

          {/* World Bosses */}
          {/* <UFTabPanel value={tabvalue} index={3}>
          <div className={classes.panel}>
            <Grid container>
              <WorldBossGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
            </Grid>
          </div>
        </UFTabPanel> */}

          {/* Slots */}
          <Grid item xs={12}>
            <UFTabPanel value={tabvalue} index={3}>
              <div className={classes.panel}>
                <Grid container>
                  <SlotsContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
                </Grid>
              </div>
            </UFTabPanel>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      {gameType === "Retail" ? upgradeFinderResultsRetail() : upgradeFinderResultsBC()} <div style={{ height: 400 }} />
    </div>
  );
}
