import React from "react";
import { raidStyles } from "./PanelStyles";
import { Typography, Grid, Divider, AppBar, Tabs, Tab } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import "./Panels.css";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, filterItemListByDropLoc, getDifferentialByID, getNumUpgrades } from "../../../Engine/ItemUtilities";
import { useSelector } from "react-redux";
import bossHeaders from "General/Modules/IconFunctions/BossHeaderIcons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import UFAccordion from "./ufComponents/ufAccordian";
import UFAccordionSummary from "./ufComponents/ufAccordianSummary";
import UFTabPanel from "./ufComponents/ufTabPanel";

import { CONSTANTS } from "General/Engine/CONSTANTS"

const getDifficultyName = (difficulty, gameType = "Retail") => {
  if (gameType === "Retail") {
    switch (difficulty) {
      case 0:
        return "LFR";
      case 1:
        return "LFR (Max)";
      case 2:
        return "Normal";
      case 3:
        return "Normal (Max)";
      case 4:
        return "Heroic";
      case 5:
        return "Heroic (Max)";
      case 6:
        return "Mythic";
      case 7:
        return "Mythic (Max)";
    }
  }
  else {
    switch (difficulty) {
      case 0:
        return "Normal";
      case 1:
        return "Heroic";
    }
  
  }

};


export default function RaidGearContainer(props) {
  const classes = raidStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;

  const gameType = useSelector((state) => state.gameType);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [tabvalue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getTranslatedRaidName = (raid) => {

    //const raidName = encounterDB.filter((obj) => {
     // return obj.raidID === raid;
    //})[0]["name"][currentLanguage];
    const raidName = encounterDB[raid].name;
    return raidName;
  };



  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Retail                                          */
  /* ---------------------------------------------------------------------------------------------- */

  const contentGenerator = () => {
    // Raid Panel
    const raidList = [CONSTANTS.currentRaidID]; // This is an array because there are sometimes multiple raids at a time (fated etc);
    const difficulties = props.playerSettings.raid;

    difficulties.sort().reverse();
    const firstDifficulty = difficulties[0];
    const secondDifficulty = difficulties.length === 2 ? difficulties[1] : -1;

    return (
      <Grid item xs={12}>
        <div className={classes.header}>
          <Grid item container spacing={1}>
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
                  {/* ------------------------------------------  ------------------------------------------ */}
                  <Tab className={classes.nerubarPalaceHeader} label={getTranslatedRaidName(CONSTANTS.currentRaidID)} {...a11yProps(0)} />
                  {/* ------------------------------------------  ------------------------------------------ 
                  <Tab className={classes.aberrusHeader} label={getTranslatedRaidName(1208)} {...a11yProps(1)} />*/}
                  {/* ------------------------------------------  ------------------------------------------ 
                  <Tab className={classes.amirdrassilHeader} label={getTranslatedRaidName(1207)} {...a11yProps(2)} />*/}
                </Tabs>
              </AppBar>
            </Grid>

            <Grid item xs={12}>
              {raidList.map((raidID, index) => (
                <UFTabPanel key={"panel" + index} value={tabvalue} index={index}>
                  <div className={classes.panel}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        {encounterDB[raidID].bossOrder
                          //.filter((key) => key === raidID)
                          .map((key, i) => (
                            <UFAccordion key={encounterDB[raidID].bosses[key] + "-accordian" + i} defaultExpanded={true} elevation={0} style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
                              <UFAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ verticalAlign: "middle" }}>
                                <Typography
                                  variant="h6"
                                  color="primary"
                                  align="left"
                                  style={{
                                    // backgroundColor: "#35383e",
                                    borderRadius: "4px 4px 0px 0px",
                                    display: "flex",
                                  }}
                                >
                                  {bossHeaders(key, { height: 36, verticalAlign: "middle" }, "UpgradeFinder")}
                                  <Divider flexItem orientation="vertical" style={{ margin: "0px 5px 0px 0px" }} />
                                  {encounterDB[raidID].bosses[key]} -{" "}
                                  {getNumUpgrades(itemDifferentials, raidID, key, firstDifficulty) +
                                    (secondDifficulty !== -1
                                      ? getNumUpgrades(itemDifferentials, raidID, key, secondDifficulty)
                                      : 0)}{" "}
                                  Upgrades
                                </Typography>
                              </UFAccordionSummary>
                              <AccordionDetails style={{ backgroundColor: "#191c23" }}>
                                <Grid item xs={12} sm container direction="row" spacing={1}>
                                  <Grid item xs={12} container spacing={1}>
                                    <Grid item xs={12}>
                                      <Typography
                                        variant="h6"
                                        color="primary"
                                        align="left"
                                        style={{
                                          backgroundColor: "#35383e",
                                          borderRadius: 4,
                                        }}
                                      >
                                        <div style={{ marginLeft: 8 }}>
                                          {getDifficultyName(firstDifficulty)} -{" "}
                                          {
                                            getNumUpgrades(itemDifferentials, raidID, key, firstDifficulty)
                                          }{" "}
                                          Upgrades
                                        </div>
                                      </Typography>
                                    </Grid>

                                    {[...filterItemListByDropLoc(itemDifferentials, raidID, key, "Raid", firstDifficulty)].map((item, index) => (
                                      <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                                    ))}
                                  </Grid>

                                  {secondDifficulty !== -1 ? (
                                    <Grid item xs={12} container spacing={1}>
                                      <Grid item xs={12}>
                                        <Typography
                                          variant="h6"
                                          color="primary"
                                          align="left"
                                          style={{
                                            backgroundColor: "#35383e",
                                            borderRadius: 4,
                                          }}
                                        >
                                          <div style={{ marginLeft: 8 }}>
                                            {getDifficultyName(secondDifficulty)} -{" "}
                                            {
                                              getNumUpgrades(itemDifferentials, raidID, key, secondDifficulty)
                                            }{" "}
                                            Upgrades
                                          </div>
                                        </Typography>
                                      </Grid>

                                      {[...filterItemListByDropLoc(itemDifferentials, raidID, key, "Raid", secondDifficulty)].map((item, index) => (
                                        <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                                      ))}
                                    </Grid>
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                              </AccordionDetails>
                            </UFAccordion>
                          ))}
                      </Grid>
                    </Grid>
                  </div>
                </UFTabPanel>
              ))}
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  };

  /* ---------------------------------------------------------------------------------------------- */
  /*                                         Burning Crusade                                        */
  /* ---------------------------------------------------------------------------------------------- */

  const contentGeneratorBC = () => {
    // Raid Panel

    const raidList = [
      //72, // Bastion
      //73, // Blackwing Descent
      //74, // Throne of Four Winds

      330, // Heart of Fear


    ];
    const firstDifficulty = 1;
    const secondDifficulty = 0;
    // const firstDifficulty = difficulties[0];
    // const secondDifficulty = difficulties.length === 2 ? difficulties[1] : -1;

    return (
      <Grid item xs={12}>
        <div className={classes.header}>
          <Grid item container spacing={1}>
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
                  {raidList.map((raidID, index) => (
                    <Tab className={classes.bastionHeaderStyle} label={encounterDB[raidID].name} {...a11yProps(index)} />

                  ))}

                  {/* ------------------------------------------ Bastion of Twilight ------------------------------------------ 
                  <Tab className={classes.bastionHeaderStyle} label={encounterDB[330].name} {...a11yProps(0)} />*/}
                  {/* ---------------------------------------- BWD ---------------------------------------- 
                  <Tab className={classes.blackwingDescentHeaderStyle} label={encounterDB[330].name} {...a11yProps(1)} />*/}
                  {/* ------------------------------------ Throne of Four Winds ------------------------------------ 
                  <Tab className={classes.throneOfFourWindsHeaderStyle} label={encounterDB[330].name} {...a11yProps(2)} />*/}
  
                </Tabs>
              </AppBar>
            </Grid>

            <Grid item xs={12}>
              {raidList.map((raidID, index) => (
                <UFTabPanel key={"panel" + index} value={tabvalue} index={index}>
                  <div className={classes.panel}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        {encounterDB[raidID].bossOrder
                          //.filter((key) => key === raidID)
                          .map((key, i) => (
                            <UFAccordion key={encounterDB[raidID].bosses[key] + "-accordian" + i} defaultExpanded={true} elevation={0} style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
                              <UFAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ verticalAlign: "middle" }}>
                                <Typography
                                  variant="h6"
                                  color="primary"
                                  align="left"
                                  style={{
                                    // backgroundColor: "#35383e",
                                    borderRadius: "4px 4px 0px 0px",
                                    display: "flex",
                                  }}
                                >
                                  {bossHeaders(key, { height: 36, verticalAlign: "middle" }, "UpgradeFinder")}
                                  <Divider flexItem orientation="vertical" style={{ margin: "0px 5px 0px 0px" }} />
                                  {encounterDB[raidID].bosses[key]} -{" "}
                                  {getNumUpgrades(itemDifferentials, raidID, key, firstDifficulty) +
                                    (secondDifficulty !== -1
                                      ? getNumUpgrades(itemDifferentials, raidID, key, secondDifficulty)
                                      : 0)}{" "}
                                  Upgrades
                                </Typography>
                              </UFAccordionSummary>
                              <AccordionDetails style={{ backgroundColor: "#191c23" }}>
                                <Grid item xs={12} sm container direction="row" spacing={1}>
                                  <Grid item xs={12} container spacing={1}>
                                    <Grid item xs={12}>
                                      <Typography
                                        variant="h6"
                                        color="primary"
                                        align="left"
                                        style={{
                                          backgroundColor: "#35383e",
                                          borderRadius: 4,
                                        }}
                                      >
                                        <div style={{ marginLeft: 8 }}>
                                          {getDifficultyName(firstDifficulty, "Classic")} -{" "}
                                          {
                                            getNumUpgrades(itemDifferentials, raidID, key, 0)
                                          }{" "}
                                          Upgrades
                                        </div>
                                      </Typography>
                                    </Grid>

                                    {[...filterItemListByDropLoc(itemDifferentials, raidID, key, "Raid", firstDifficulty)].map((item, index) => (
                                      <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                                    ))}
                                  </Grid>

                                  {secondDifficulty !== -1 ? (
                                    <Grid item xs={12} container spacing={1}>
                                      <Grid item xs={12}>
                                        <Typography
                                          variant="h6"
                                          color="primary"
                                          align="left"
                                          style={{
                                            backgroundColor: "#35383e",
                                            borderRadius: 4,
                                          }}
                                        >
                                          <div style={{ marginLeft: 8 }}>
                                            {getDifficultyName(secondDifficulty, "Classic")} -{" "}
                                            {
                                              getNumUpgrades(itemDifferentials, raidID, key, secondDifficulty)
                                            }{" "}
                                            Upgrades
                                          </div>
                                        </Typography>
                                      </Grid>

                                      {[...filterItemListByDropLoc(itemDifferentials, raidID, key, "Raid", secondDifficulty)].map((item, index) => (
                                        <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                                      ))}
                                    </Grid>
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                              </AccordionDetails>
                            </UFAccordion>
                          ))}
                      </Grid>
                    </Grid>
                  </div>
                </UFTabPanel>
              ))}
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {gameType === "Retail" ? contentGenerator() : contentGeneratorBC()}
      </Grid>
    </div>
  );
}
