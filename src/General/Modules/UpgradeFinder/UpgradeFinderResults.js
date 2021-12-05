import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
import { Button, Tabs, Tab, Box, AppBar, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDifferentialByID } from "../../Engine/ItemUtilities";
import MythicPlusGearContainer from "./Panels/PanelMythicPlus";
import PvPGearContainer from "./Panels/PanelPvP";
import RaidGearContainer from "./Panels/PanelRaid";
import WorldBossGearContainer from "./Panels/PanelWorldBosses";
import SlotsContainer from "./Panels/PanelSlots";
import TazaveshGearContainer from "./Panels/TazaveshPanel";
import LegionTimewalking from "./Panels/PanelLegionTimewalking";
import "./Panels/ItemUpgrade.css";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    flexGrow: 1,
    maxWidth: "70%",
  },
  panel: {
    flexGrow: 1,
    backgroundColor: "#323232",
    display: "flex",
    borderRadius: "0px 0px 4px 4px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  raidHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/SanctumOfDomination/SanctumArt.png").default})`,
    borderRadius: "4px 0px 0px 4px",
    // whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "auto 100%",
  },
  raidBCHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/BurningCrusade/RaidHeader.jpg").default})`,
    borderRadius: "4px 0px 0px 4px",
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  mythicPlusHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/MythicPlus.png").default})`,
    // whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "auto 100%",
  },
  dungeonBCPlusHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/BurningCrusade/DungeonHeader.jpg").default})`,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  pvpHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/PVPHeader.png").default})`,
    // whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "auto 100%",
  },
  pvpBCHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/BurningCrusade/PVP/PVPHeader.jpg").default})`,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  worldBossHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/WorldBosses.png").default})`,
    // whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "auto 100%",
  },
  slotsHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/AllSlots.png").default})`,
    borderRadius: "0px 4px 4px 0px",
    // whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "auto 100%",
  },
  slotsBCHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/BurningCrusade/SlotsHeader.jpg").default})`,
    borderRadius: "0px 4px 4px 0px",
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  tazaveshStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/TazaveshHeader.png").default})`,
    borderRadius: "0px 4px 4px 0px",
    // whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "auto 100%",
  },
  LegionTimewalkingStyle: {
    backgroundImage: `url(${require("../../../Images/MythicPlus/LegionTimewalking/LegionTimeWalkingHeader.png").default})`,
    borderRadius: "0px 4px 4px 0px",
    // whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 60%",
    backgroundSize: "auto 100%",
  },
  header: {
    [theme.breakpoints.down("md")]: {
      marginTop: 120,
      margin: "auto",
      width: "90%",
      justifyContent: "center",
      display: "block",
      marginTop: 140,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "auto",
      width: "85%",
      justifyContent: "center",
      display: "block",
      marginTop: 120,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 32,
      margin: "auto",
      width: "85%",
      justifyContent: "center",
      display: "block",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: 32,
      margin: "auto",
      width: "70%",
      justifyContent: "center",
      display: "block",
    },
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UpgradeFinderResults(props) {
  //   useEffect(() => {
  //     ReactGA.pageview(window.location.pathname + window.location.search);
  //   }, []);

  const classes = useStyles();
  const [tabvalue, setTabValue] = React.useState(0);
  const { t } = useTranslation();
  const result = props.itemSelection;
  const itemList = result.itemSet;
  const itemDifferentials = result.differentials;
  const gameType = useSelector((state) => state.gameType);
  itemList.sort((a, b) => (getDifferentialByID(itemDifferentials, a.id, a.level) < getDifferentialByID(itemDifferentials, b.id, b.level) ? 1 : -1));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const returnToSetup = () => {
    props.setShowReport(false);
  };

  const upgradeFinderResultsRetail = () => {
    return (
      <div className={classes.header}>
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
                <Tab className={classes.raidHeaderStyle} label={t("UpgradeFinder.CurrentRaid")} {...a11yProps(0)} />
                {/* Mythic Plus */}
                <Tab className={classes.mythicPlusHeaderStyle} label={t("UpgradeFinder.MythicPlus")} {...a11yProps(1)} />
                {/* Legion Timewalking */}
                <Tab className={classes.LegionTimewalkingStyle} label={t("UpgradeFinder.LegionTimewalking")} {...a11yProps(2)} />
                {/* Tazavesh */}
                <Tab className={classes.tazaveshStyle} label={t("DungeonNames.1194")} {...a11yProps(3)} />
                {/* PVP */}
                <Tab className={classes.pvpHeaderStyle} label={t("UpgradeFinder.PvP")} {...a11yProps(4)} />
                {/* World Bosses */}
                <Tab className={classes.worldBossHeaderStyle} label={t("UpgradeFinder.WorldBosses")} {...a11yProps(5)} />
                {/* Slots */}
                <Tab className={classes.slotsHeaderStyle} label={t("UpgradeFinder.UpgradeBySlot")} {...a11yProps(6)} />
              </Tabs>
            </AppBar>
          </Grid>

          {/* Raid */}
          <Grid item xs={12}>
            <TabPanel value={tabvalue} index={0}>
              <div className={classes.panel}>
                <Grid container>
                  <RaidGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
                </Grid>
              </div>
            </TabPanel>
          </Grid>

          {/* Mythic Plus */}
          <Grid item xs={12}>
            <TabPanel value={tabvalue} index={1}>
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
            </TabPanel>
          </Grid>

          {/* Legion Timewalking */}
          <Grid item xs={12}>
            <TabPanel value={tabvalue} index={2}>
              <div className={classes.panel}>
                <Grid container>
                  <LegionTimewalking
                    setDungeonDifficulty={props.setDungeonDifficulty}
                    player={props.player}
                    itemList={itemList}
                    itemDifferentials={itemDifferentials}
                    playerSettings={props.playerSettings}
                  />
                </Grid>
              </div>
            </TabPanel>
          </Grid>

          {/* Tazavesh */}
          <Grid item xs={12}>
            <TabPanel value={tabvalue} index={3}>
              <div className={classes.panel}>
                <Grid container>
                  <TazaveshGearContainer
                    setDungeonDifficulty={props.setDungeonDifficulty}
                    player={props.player}
                    itemList={itemList}
                    itemDifferentials={itemDifferentials}
                    playerSettings={props.playerSettings}
                  />
                </Grid>
              </div>
            </TabPanel>
          </Grid>

          {/* PVP */}
          <Grid item xs={12}>
            <TabPanel value={tabvalue} index={4}>
              <div className={classes.panel}>
                <Grid container>
                  <PvPGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
                </Grid>
              </div>
            </TabPanel>
          </Grid>

          {/* World Bosses */}
          <Grid item xs={12}>
            <TabPanel value={tabvalue} index={5}>
              <div className={classes.panel}>
                <Grid container>
                  <WorldBossGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
                </Grid>
              </div>
            </TabPanel>
          </Grid>

          {/* Slots */}
          <Grid item xs={12}>
            <TabPanel value={tabvalue} index={6}>
              <div className={classes.panel}>
                <Grid container>
                  <SlotsContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
                </Grid>
              </div>
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    );
  };

  const upgradeFinderResultsBC = () => {
    return (
      <div className={classes.header}>
        <div>
          <Button color="primary" variant="outlined" onClick={() => returnToSetup()} style={{ position: "absolute" }}>
            {t("UpgradeFinder.BackButton")}
          </Button>
          <Typography variant="h4" color="primary" align="center" style={{ padding: "1px 1px 1px 1px" }}>
            {t("UpgradeFinder.Header")}
          </Typography>
        </div>
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

        {/* Raid */}
        <TabPanel value={tabvalue} index={0}>
          <div className={classes.panel}>
            <Grid container>
              <RaidGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
            </Grid>
          </div>
        </TabPanel>

        {/* Mythic Plus */}
        <TabPanel value={tabvalue} index={1}>
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
        </TabPanel>

        {/* PVP */}
        <TabPanel value={tabvalue} index={2}>
          <div className={classes.panel}>
            <Grid container>{/*<PvPGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} /> */}</Grid>
          </div>
        </TabPanel>

        {/* World Bosses */}
        {/* <TabPanel value={tabvalue} index={3}>
          <div className={classes.panel}>
            <Grid container>
              <WorldBossGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
            </Grid>
          </div>
        </TabPanel> */}

        {/* Slots */}
        <TabPanel value={tabvalue} index={3}>
          <div className={classes.panel}>
            <Grid container>
              <SlotsContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
            </Grid>
          </div>
        </TabPanel>
      </div>
    );
  };

  return <div>{gameType === "Retail" ? upgradeFinderResultsRetail() : upgradeFinderResultsBC()}</div>;
}
