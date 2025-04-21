import React from "react";
import { dungeonStyles } from "./PanelStyles";
import { Typography, Grid, Divider, AppBar, Tabs, Tab } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "General/Modules/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, getDifferentialByID, getNumUpgrades, filterItemListByDropLoc } from "../../../Engine/ItemUtilities";
import { filterClassicItemListBySource } from "../../../Engine/ItemUtilitiesClassic";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { itemLevels } from "../../../../Databases/ItemLevelsDB";
import { useSelector } from "react-redux";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UFAccordion from "./ufComponents/ufAccordian";
import UFAccordionSummary from "./ufComponents/ufAccordianSummary";
import UFTabPanel from "./ufComponents/ufTabPanel";

export default function MythicPlusGearContainer(props) {
  const classes = dungeonStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemList = props.itemList;

  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.dungeon;
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


  const contentGenerator = (gameType) => {
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
                {/*<Tabs
                  value={tabvalue}
                  onChange={handleTabChange} 
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.22)" }}
                  TabIndicatorProps={{ style: { backgroundColor: "#F2BF59" } }}
              > */}
                  {/* ------------------------------------------ Mythic + ------------------------------------------*/}
                  {/*<Tab className={classes.mythicPlusHeader} label={"Mythic +"} {...a11yProps(0)} /> */}
                  {/* ------------------------------------------ Mythic 0 ------------------------------------------ */}
                  {/*<Tab className={classes.mythicHeader} label={"Dawn of the Infinite"} {...a11yProps(1)} /> */}
                {/*</Tabs> */}
              </AppBar>
            </Grid>
            <Grid item xs={12}>
              <UFTabPanel key={"panel2"} value={tabvalue} index={0}>
                <div className={classes.panel}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      {encounterDB["-1"][gameType].bossOrderMythicPlus.map((key, i) => (
                        <UFAccordion
                          key={encounterDB["-1"][gameType][key] + "-accordian" + i}
                          elevation={0}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                          }}
                        >
                          <UFAccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{
                              verticalAlign: "middle",
                            }}
                          >
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
                              <img style={{ height: 36, width: 72, verticalAlign: "middle" }} src={DungeonHeaderIcons(key)} alt={encounterDB["-1"][gameType][key]} />
                              <Divider flexItem orientation="vertical" style={{ margin: "0px 5px 0px 0px" }} />
                              {encounterDB["-1"][gameType][key]} -{" "}
                              {
                                getNumUpgrades(itemDifferentials, -1, key, difficulty)
                              }{" "}
                              Upgrades
                            </Typography>
                          </UFAccordionSummary>
                          <AccordionDetails style={{ backgroundColor: "#191c23" }}>
                            <Grid xs={12} container spacing={1}>
                              {[...filterItemListByDropLoc(itemDifferentials, -1, key, "Dungeon", difficulty)].map((item, index) => (
                                <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                              ))}
                            </Grid>
                          </AccordionDetails>
                        </UFAccordion>
                      ))}
                    </Grid>
                  </Grid>
                </div>
              </UFTabPanel>

              {/*<UFTabPanel key={"panel1"} value={tabvalue} index={1}>
                <div className={classes.panel}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      {encounterDB[1209].bossOrder.map((key, i) => (
                        <UFAccordion
                          key={encounterDB[1209][key].name[currentLanguage] + "-accordian" + i}
                          elevation={0}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                          }}
                        >
                          <UFAccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{
                              verticalAlign: "middle",
                            }}
                          >
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
                              {encounterDB[1209][key].name[currentLanguage]} -{" "}
                              {[...filterItemListBySource(itemDifferentials, 1209, key, 441)].map((item) => getDifferentialByID(itemDifferentials, item.id, item.level)).filter((item) => item !== 0).length}{" "}
                              Upgrades
                            </Typography>
                          </UFAccordionSummary>
                          <AccordionDetails style={{ backgroundColor: "#191c23" }}>
                            <Grid xs={12} container spacing={1}>
                              {[...filterItemListBySource(itemDifferentials, 1209, key, 441)].map((item, index) => (
                                <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                              ))}
                            </Grid>
                          </AccordionDetails>
                        </UFAccordion>
                      ))}
                    </Grid>
                  </Grid>
                </div>
                    </UFTabPanel> */}
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  };

  const contentGeneratorBC = () => {
    return encounterDB[-1].bossOrder.map((key, i) => (
      <UFAccordion
        key={encounterDB[-1][key].name[currentLanguage] + "-accordian" + i}
        elevation={0}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <UFAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{
            verticalAlign: "middle",
          }}
        >
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
            <img style={{ height: 36, verticalAlign: "middle" }} src={DungeonHeaderIcons(key)} alt={encounterDB[123][key].name[currentLanguage]} />
            <Divider flexItem orientation="vertical" style={{ margin: "0px 5px 0px 0px" }} />
            {encounterDB[123][key].name[currentLanguage]} -{" "}
            {[...filterClassicItemListBySource(itemDifferentials, -1, key)].map((item) => getDifferentialByID(itemDifferentials, item.id, item.level)).filter((item) => item !== 0).length} Upgrades
          </Typography>
        </UFAccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} container spacing={1}>
            {[...filterClassicItemListBySource(itemDifferentials, -1, key)].map((item, index) => (
              <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
            ))}
          </Grid>
        </AccordionDetails>
      </UFAccordion>
    ));
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {true ? contentGenerator(gameType) : contentGeneratorBC()}
        </Grid>
      </Grid>
    </div>
  );
}
