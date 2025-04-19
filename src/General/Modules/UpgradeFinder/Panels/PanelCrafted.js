import React from "react";
import { dungeonStyles } from "./PanelStyles";
import { Typography, Grid, Divider, AppBar, Tabs, Tab } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "General/Modules/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, getDifferentialByID, getNumUpgrades } from "../../../Engine/ItemUtilities";
import { filterClassicItemListBySource } from "../../../Engine/ItemUtilitiesClassic";
import { encounterDB, craftedDB } from "../../../../Databases/InstanceDB";
import { itemLevels } from "../../../../Databases/itemLevelsDB";
import { useSelector } from "react-redux";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UFAccordion from "./ufComponents/ufAccordian";
import UFAccordionSummary from "./ufComponents/ufAccordianSummary";
import UFTabPanel from "./ufComponents/ufTabPanel";
import InformationBox from "General/Modules/1. GeneralComponents/InformationBox.tsx";

export default function CraftedGearContainer(props) {
  const classes = dungeonStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.craftedLevel;
  const gameType = useSelector((state) => state.gameType);
  const craftedIntro = "You have a lot of decisions you can make when crafting items. While you can fine tune stats, you're usually quite safe just picking out a \
                        strong default missive for your spec rather than changing secondaries every time you get a new piece of gear. \
                        \n\n \
                        Note that this section isn't ideal for handling embellishments and you should do that via Top Gear or your favorite guide. \
                        Keep in mind that crafting after your embellishments is much lower value than in Dragonflight and you might be better off just upgrading items instead."

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

  const contentGenerator = () => {
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
                
              </AppBar>
            </Grid>
            <Grid>
            <InformationBox  information={craftedIntro} variant="yellow" />
            </Grid>
            
            <Grid item xs={12}>
            
              <UFTabPanel key={"panel2"} value={tabvalue} index={0}>
                <div className={classes.panel}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      {Object.keys(craftedDB).map((key, i) => (
                        <UFAccordion
                          key={craftedDB[key] + "-accordian" + i}
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
                              {/*<img style={{ height: 36, verticalAlign: "middle" }} src={DungeonHeaderIcons(key)} alt={encounterDB["-1"][key].name[currentLanguage]} /> */}
                              <Divider flexItem orientation="vertical" style={{ margin: "0px 5px 0px 0px" }} />
                              {craftedDB[key]} -{" "}
                              {
                                [...filterItemListBySource(itemDifferentials, "-4", key, itemLevels.crafted[difficulty])].length
                              }{" "}
                              Upgrades
                            </Typography>
                          </UFAccordionSummary>
                          <AccordionDetails style={{ backgroundColor: "#191c23" }}>
                            <Grid xs={12} container spacing={1}>
                              {[...filterItemListBySource(itemDifferentials, "-4", key, itemLevels.crafted[difficulty])].map((item, index) => (
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

            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  };

  const contentGeneratorBC = () => {
    return encounterDB[123].bossOrder.map((key, i) => (
      <UFAccordion
        key={encounterDB[123][key].name[currentLanguage] + "-accordian" + i}
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
          {gameType === "Retail" ? contentGenerator() : contentGeneratorBC()}
        </Grid>
      </Grid>
    </div>
  );
}
