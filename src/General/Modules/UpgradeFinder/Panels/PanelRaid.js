import React from "react";
import { raidStyles, sharedAccordionStyles, sharedAccordionSummaryStyles, sharedAccordionDetailsStyles } from "./PanelStyles";
import { Typography, Grid, Divider, AppBar, Tabs, Tab } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import "./Panels.css";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, filterItemListByDropLoc, getDifferentialByID, getNumUpgrades, getRollExpectedValue, getBonusRollChanceUpgrade } from "../../../Engine/ItemUtilities";
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
        return "Normal";
      case 2:
        return "Heroic";
      case 3:
        return "Mythic";
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
  const subpanelsEnabled = props.playerSettings.itemTypes || ["Drop", "Upgraded", "Bonus Roll"]

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

  const getRaidHeaderClass = (raidID) => {
    switch (raidID) {
      case 1314:
        return classes.dreamriftHeader;
      case 1308:
        return classes.marchOnQueldanasHeader;
      case 1307:
        return classes.voidspireHeader;
      case 1305:
        return classes.sporefallHeader;
      case 1320:
        return classes.venomousAbyssHeader;
      case 1317:
        return classes.tideboundGrottoHeader;
      default:
        return classes.defaultHeader;
    }
  };

  /* ---------------------------------------------------------------------------------------------- */
  /*                                           Retail                                          */
  /* ---------------------------------------------------------------------------------------------- */

  const contentGenerator = () => {
    // Raid Panel
    const raidList = CONSTANTS.currentRaidIDs;
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
                  background: "linear-gradient(180deg, rgba(12, 14, 18, 0.96) 0%, rgba(22, 25, 32, 0.92) 100%)",
                  borderRadius: 12,
                }}
                elevation={0}
              >
                <Tabs
                  value={tabvalue}
                  onChange={handleTabChange}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  style={{ borderRadius: 12, border: "1px solid rgba(255, 255, 255, 0.12)" }}
                  TabIndicatorProps={{ style: { backgroundColor: "#F2BF59", height: 3, borderRadius: 999 } }}
                >
                  {raidList.map((raidID, index) => (
                    <Tab key={raidID} className={getRaidHeaderClass(raidID)} label={getTranslatedRaidName(raidID)} {...a11yProps(index)} />
                  ))}
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
                            <UFAccordion
                              key={encounterDB[raidID].bosses[key] + "-accordian" + i}
                              defaultExpanded={false}
                              elevation={0}
                              style={sharedAccordionStyles}
                            >
                              <UFAccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={sharedAccordionSummaryStyles}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    gap: 12,
                                  }}
                                >
                                  <Typography
                                    variant="h6"
                                    color="primary"
                                    align="left"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                                    }}
                                  >
                                    {bossHeaders({ id: key, style: { height: 36, verticalAlign: "middle" } })}
                                    <Divider flexItem orientation="vertical" style={{ margin: "0px 5px 0px 0px" }} />
                                    {encounterDB[raidID].bosses[key]} -{" "}
                                    {getNumUpgrades(itemDifferentials, raidID, key, firstDifficulty) +
                                      (secondDifficulty !== -1
                                        ? getNumUpgrades(itemDifferentials, raidID, key, secondDifficulty)
                                        : 0)}{" "}
                                    Upgrades
                                  </Typography>

                                  <div
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: 12,
                                      color: "rgba(255, 255, 255, 0.82)",
                                      fontSize: "0.84rem",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    <span>Bonus roll chance: {Math.round(getBonusRollChanceUpgrade(itemDifferentials, raidID, key, firstDifficulty)) + "%"}</span>
                                    <span>Roll Expected Value: {getRollExpectedValue(itemDifferentials, raidID, key, firstDifficulty).toFixed(2) + "%"}</span>
                                  </div>
                                </div>
                              </UFAccordionSummary>
                              <AccordionDetails style={sharedAccordionDetailsStyles}>
                                <Grid item xs={12} sm container direction="row" spacing={1}>
                                  {subpanelsEnabled.includes("Bonus") ? <Grid item xs={12} container spacing={1}>
                                    <Grid item xs={12}>
                                      <div
                                        style={{
                                          background: "linear-gradient(180deg, rgba(242, 191, 89, 0.16) 0%, rgba(242, 191, 89, 0.08) 100%)",
                                          borderRadius: 8,
                                          padding: "7px 12px",
                                          border: "1px solid rgba(242, 191, 89, 0.34)",
                                          boxShadow: "inset 0 0 0 1px rgba(242, 191, 89, 0.14)",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          gap: 12,
                                        }}
                                      >
                                        <Typography variant="h6" color="primary" align="left">
                                          {getDifficultyName(firstDifficulty)} - Upgraded Bonus Rolls
                                        </Typography>
                                      </div>
                                    </Grid>

                                    {[...filterItemListByDropLoc(itemDifferentials, raidID, key, "Raid", firstDifficulty, "bonus")].map((item, index) => (
                                      <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                                    ))}
                                  </Grid> : null}

                                  {subpanelsEnabled.includes("Upgraded") ?<Grid item xs={12} container spacing={1}>
                                    <Grid item xs={12}>
                                      <Typography
                                        variant="h6"
                                        color="primary"
                                        align="left"
                                        style={{
                                          background: "rgba(255, 255, 255, 0.06)",
                                          borderRadius: 8,
                                          padding: "6px 10px",
                                        }}
                                      >
                                        {getDifficultyName(firstDifficulty) + " - Upgraded "} -{" "}
                                        {getNumUpgrades(itemDifferentials, raidID, key, firstDifficulty)} Upgrades
                                      </Typography>
                                    </Grid>

                                    {[...filterItemListByDropLoc(itemDifferentials, raidID, key, "Raid", firstDifficulty, "max")].map((item, index) => (
                                      <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                                    ))}
                                  </Grid> : null }

                                  {firstDifficulty !== -1 && subpanelsEnabled.includes("Drop") ? (
                                    <Grid item xs={12} container spacing={1}>
                                      <Grid item xs={12}>
                                        <Typography
                                          variant="h6"
                                          color="primary"
                                          align="left"
                                          style={{
                                            background: "rgba(255, 255, 255, 0.06)",
                                            borderRadius: 8,
                                            padding: "6px 10px",
                                          }}
                                        >
                                          {getDifficultyName(firstDifficulty)} -{" "}
                                          {getNumUpgrades(itemDifferentials, raidID, key, firstDifficulty)} Upgrades
                                        </Typography>
                                      </Grid>

                                      {[...filterItemListByDropLoc(itemDifferentials, raidID, key, "Raid", firstDifficulty, "drop")].map((item, index) => (
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
      317, // Mogushan Vaults
      330, // Heart of Fear
      320, // Terrace of Endless Springs


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
                  //backgroundColor: "#000",
                  borderRadius: "4px 4px 4px 4px",
                }}
                elevation={1}
              >
                <div style={{ display: "flex", justifyContent: "center", /*backgroundColor: "#323232",*/ }}>
                <Tabs
                  value={tabvalue}
                  onChange={handleTabChange}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  style={{ borderRadius: 4, width: '80%',  border: "1px solid rgba(255, 255, 255, 0.22)" }}
                  TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
                >
                  {/*raidList.map((raidID, index) => (
                    <Tab className={classes.bastionHeaderStyle} label={encounterDB[raidID].name} {...a11yProps(index)} />

                  ))*/}

                  {/* ------------------------------------------ Mogushan Vaults ------------------------------------------ */
                  <Tab className={classes.mogushanVaultsHeaderStyle} label={encounterDB[317].name} {...a11yProps(0)} />}
                  {/* ---------------------------------------- Heart of Fear ---------------------------------------- */
                  <Tab className={classes.heartOfFearHeaderStyle} label={encounterDB[330].name} {...a11yProps(1)} />}
                  {/* ------------------------------------ Terrace ------------------------------------  */
                  <Tab className={classes.terraceOfEndlessSpringHeaderStyle} label={encounterDB[320].name} {...a11yProps(2)} />}

                </Tabs>
                </div>
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
