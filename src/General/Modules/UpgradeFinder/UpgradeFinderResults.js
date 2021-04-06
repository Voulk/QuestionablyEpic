import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Box, AppBar, Typography, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getDifferentialByID } from "../../Engine/ItemUtilities";
import MythicPlusGearContainer from "./Panels/PanelMythicPlus";
import PvPGearContainer from "./Panels/PanelPvP";
import RaidGearContainer from "./Panels/PanelRaid";
import WorldBossGearContainer from "./Panels/PanelWorldBosses";
import SlotsContainer from "./Panels/PanelSlots";
import ReactGA from "react-ga";
import "./Panels/ItemUpgrade.css";

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
    backgroundImage: `url(${require("../../../Images/Bosses/CastleNathria/loadingScreenArt.png").default})`,
    borderRadius: "4px 0px 0px 4px",
    height: 75,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  mythicPlusHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/MythicPlus.png").default})`,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  pvpHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/PVPHeader.png").default})`,
    height: 75,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  worldBossHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/WorldBosses.png").default})`,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  slotsHeaderStyle: {
    backgroundImage: `url(${require("../../../Images/Bosses/AllSlots.png").default})`,
    borderRadius: "0px 4px 4px 0px",
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  header: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 120,
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      flexGrow: 1,
      maxWidth: "70%",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 32,
      justifyContent: "center",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      flexGrow: 1,
      maxWidth: "70%",
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
  const { t, i18n } = useTranslation();
  const result = props.itemSelection;
  const itemList = result.itemSet;
  const itemDifferentials = result.differentials;

  itemList.sort((a, b) => (getDifferentialByID(itemDifferentials, a.id, a.level) < getDifferentialByID(itemDifferentials, b.id, b.level) ? 1 : -1));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.header}>
      <Typography variant="h4" color="primary" align="center" style={{ padding: "10px 10px 5px 10px" }}>
        {result.contentType + " " + t("UpgradeFinder.Header")}
      </Typography>
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
          {/* PVP */}
          <Tab className={classes.pvpHeaderStyle} label={t("UpgradeFinder.PvP")} {...a11yProps(2)} />
          {/* World Bosses */}
          <Tab className={classes.worldBossHeaderStyle} label={t("UpgradeFinder.WorldBosses")} {...a11yProps(3)} />
          {/* Slots */}
          <Tab className={classes.slotsHeaderStyle} label={t("UpgradeFinder.UpgradeBySlot")} {...a11yProps(4)} />
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
          <Grid container>
            <PvPGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
          </Grid>
        </div>
      </TabPanel>

      {/* World Bosses */}
      <TabPanel value={tabvalue} index={3}>
        <div className={classes.panel}>
          <Grid container>
            <WorldBossGearContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
          </Grid>
        </div>
      </TabPanel>

      {/* Slots */}
      <TabPanel value={tabvalue} index={4}>
        <div className={classes.panel}>
          <Grid container>
            <SlotsContainer player={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
          </Grid>
        </div>
      </TabPanel>
    </div>
  );
}
