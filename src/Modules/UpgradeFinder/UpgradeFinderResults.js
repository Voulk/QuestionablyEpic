import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Box, AppBar, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { runUpgradeFinder } from "./UpgradeFinderEngine";
import UpgradeFinderResult from "./UpgradeFinderResult";
import { getDifferentialByID } from "../Engine/ItemUtilities";
import MythicPlusGearContainer from "./PanelMythicPlus";
import PvPGearContainer from "./PanelPvP";
import RaidGearContainer from "./PanelRaid";
import WorldBossGearContainer from "./PanelWorldBosses";
import ReactGA from "react-ga";
import "./ItemUpgrade.css";

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
    backgroundColor: "#191c23",
    display: "flex",
    borderRadius: "0px 0px 4px 4px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  raidHeaderStyle: {
    backgroundImage: `url(${
      require("../../Images/Bosses/CastleNathria/loadingScreenArt.png").default
    })`,
    borderRadius: "4px 0px 0px 0px",
    height: 75,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  mythicPlusHeaderStyle: {
    backgroundImage: `url(${
      require("../../Images/Bosses/MythicPlus.png").default
    })`,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  pvpHeaderStyle: {
    backgroundImage: `url(${
      require("../../Images/Bosses/PVPHeader.png").default
    })`,
    borderRadius: "4px 0px 0px 0px",
    height: 75,
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
  },
  worldBossHeaderStyle: {
    backgroundImage: `url(${
      require("../../Images/Bosses/WorldBosses.png").default
    })`,
    borderRadius: "0px 4px 0px 0px",
    whiteSpace: "nowrap",
    textShadow: "3px 3px 4px black",
    color: "#fff",
    fontSize: "1.1rem",
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
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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
  //const raidItems = filterItemSetBySource(itemList, 1190, 0);
  console.log(itemList);

  itemList.sort((a, b) => (getDifferentialByID(itemDifferentials, a.id, a.level) < getDifferentialByID(itemDifferentials, b.id, b.level) ? 1 : -1));


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        style={{ padding: "10px 10px 5px 10px" }}
      >
        {t("UpgradeFinder.Header") + " - " + props.contentType}
      </Typography>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#000",
          borderRadius: "4px 4px 0px 0px",
        }}
        elevation={0}
      >
        <Tabs
          value={tabvalue}
          onChange={handleTabChange}
          aria-label="simple tabs example"
          variant="fullWidth"
          TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
        >
          {/* Raid */}
          <Tab
            className={classes.raidHeaderStyle}
            label="Castle Nathria"
            {...a11yProps(0)}
          />
          {/* Mythic Plus */}
          <Tab
            className={classes.mythicPlusHeaderStyle}
            label="Mythic Plus"
            {...a11yProps(1)}
          />
          {/* PVP */}
          <Tab
            className={classes.pvpHeaderStyle}
            label="PvP"
            {...a11yProps(2)}
          />
          {/* World Bosses */}
          <Tab
            className={classes.worldBossHeaderStyle}
            label="World Bosses"
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>

      {/* Raid */}
      <TabPanel value={tabvalue} index={0}>
        <div className={classes.panel}>
          <RaidGearContainer pl={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
        </div>
      </TabPanel>

      {/* Mythic Plus */}
      <TabPanel value={tabvalue} index={1}>
        <div className={classes.panel}>
          <MythicPlusGearContainer pl={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
        </div>
      </TabPanel>

      {/* PVP */}
      <TabPanel value={tabvalue} index={2}>
        <div className={classes.panel}>
          <PvPGearContainer pl={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings} />
        </div>
      </TabPanel>

      {/* World Bosses */}
      <TabPanel value={tabvalue} index={3}>
        <div className={classes.panel}>
          <WorldBossGearContainer pl={props.player} itemList={itemList} itemDifferentials={itemDifferentials} playerSettings={props.playerSettings}/>
        </div>
      </TabPanel>
    </div>
  );
}
