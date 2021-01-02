import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  Box,
  AppBar,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import DungeonHeaderIcons from "../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";
import { runUpgradeFinder } from "./UpgradeFinderEngine";
import { bossList, raidList, dungeonList } from "../CooldownPlanner/Data/Data";
import GearContainer from "./GearContainer";
import ReactGA from "react-ga";
import CNimg from "../../Images/Bosses/CastleNathria/loadingScreenArt.png";
import "./ItemUpgrade.css";

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function a11yPropsVert(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

// Test
runUpgradeFinder();
//

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
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
}));

// ==============================================
export default function UpgradeFinder(props) {
  //   useEffect(() => {
  //     ReactGA.pageview(window.location.pathname + window.location.search);
  //   }, []);

  const classes = useStyles();
  const [tabvalue, setTabValue] = React.useState(0);
  const { t, i18n } = useTranslation();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        style={{ padding: "10px 10px 5px 10px" }}
      >
        {t("UpgradeFinder.Header")}
      </Typography>
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "#424242",
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
            <Tab
              icon={
                <div className="container">
                  <div
                    className="centered-ItemCards"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Castle Nathria
                  </div>
                </div>
              }
              {...a11yProps(0)}
              style={{
                backgroundImage: `url(${
                  require("../../Images/Bosses/CastleNathria/loadingScreenArt.png")
                    .default
                })`,
                borderRadius: "4px 0px 0px 0px",
                height: 75,
                whiteSpace: "nowrap",
                textShadow: "3px 3px 4px black",
              }}
            />

            <Tab
              icon={
                <div className="container">
                  {/* <img
                    height={45}
                    src={
                      process.env.PUBLIC_URL + "/Images/Interface/Fae_Sigil.png"
                    }
                    alt="Night Fae"
                  /> */}
                  <div className="centered" style={{ fontSize: "1.1rem" }}>
                    Mythic Plus
                  </div>
                </div>
              }
              {...a11yProps(1)}
              style={{
                backgroundImage: `url(${
                  require("../../Images/Bosses/CastleNathria/loadingScreenArt.png")
                    .default
                })`,
                whiteSpace: "nowrap",
                textShadow: "3px 3px 4px black",
              }}
            />
            <Tab
              icon={
                <div className="container">
                  {/* <img
                    height={45}
                    src={
                      process.env.PUBLIC_URL + "/Images/Interface/Fae_Sigil.png"
                    }
                    alt="Night Fae"
                  />*/}
                  <div className="centered" style={{ fontSize: "1.1rem" }}>
                    PvP
                  </div>
                </div>
              }
              {...a11yProps(2)}
              style={{
                backgroundImage: `url(${
                  require("../../Images/Bosses/PVPHeader.png").default
                })`,
                borderRadius: "4px 0px 0px 0px",
                height: 75,
                whiteSpace: "nowrap",
                textShadow: "3px 3px 4px black",
              }}
            />
            <Tab
              icon={
                <div className="container">
                  {/* <img
                    height={45}
                    src={
                      process.env.PUBLIC_URL + "/Images/Interface/Fae_Sigil.png"
                    }
                    alt="Night Fae"
                  /> */}
                  <div className="centered" style={{ fontSize: "1.1rem" }}>
                    World Bosses
                  </div>
                </div>
              }
              {...a11yProps(3)}
              style={{
                backgroundImage: `url(${
                  require("../../Images/Bosses/WorldBosses.png").default
                })`,
                borderRadius: "0px 4px 0px 0px",
                whiteSpace: "nowrap",
                textShadow: "3px 3px 4px black",
              }}
            />
          </Tabs>
        </AppBar>

        {/* Raid */}
        <TabPanel value={tabvalue} index={0}>
          <div className={classes.panel}>
            <GearContainer pl={props.pl} type="raid" />
          </div>
        </TabPanel>

        {/* Mythic Plus */}
        <TabPanel value={tabvalue} index={1}>
          <div className={classes.panel}>
            <GearContainer pl={props.pl} type="dungeon" />
          </div>
        </TabPanel>

        {/* PVP */}
        <TabPanel value={tabvalue} index={2}>
          <div className={classes.panel}>
            <GearContainer pl={props.pl} type="dungeon" />
          </div>
        </TabPanel>

        {/* World Quests */}
        <TabPanel value={tabvalue} index={3}>
          <div className={classes.panel}>
            <GearContainer pl={props.pl} type="dungeon" />
          </div>
        </TabPanel>

        {/* World Bosses */}
        <TabPanel value={tabvalue} index={4}>
          <div className={classes.panel}>
            <GearContainer pl={props.pl} type="dungeon" />
          </div>
        </TabPanel>
      </div>
    </div>
  );
}

// {dungeonList.map((key) => (
//   <Tab
//     style={{
//       color: "white",
//       padding: 0,
//       fontSize: "12px",
//       width: 100,
//     }}
//     icon={DungeonHeaderIcons(key.zoneID, {
//       height: 64,
//       width: 128,
//       verticalAlign: "middle",
//       marginRight: "-25px",
//     })}
//     label={t("DungeonNames." + key.zoneID)}
//     {...a11yPropsVert(0)}
//   />
// ))}
