import React from "react";
import { rootStyles } from "./PanelStyles";
import { Typography, Grid, Divider } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { filterItemListBySource, getDifferentialByID, getNumUpgrades } from "../../../Engine/ItemUtilities";
import i18n from "i18next";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import bossHeaders from "General/Modules/CooldownPlanner/Functions/IconFunctions/BossHeaderIcons";
import UFAccordion from "./ufComponents/ufAccordian";
import UFAccordionSummary from "./ufComponents/ufAccordianSummary";

export default function WorldBossGearContainer(props) {
  const classes = rootStyles();
  const { t } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const currentLanguage = i18n.language;

  const contentGenerator = () => {
    return encounterDB[1205].bossOrder.map((key, i) => (
      <UFAccordion key={encounterDB[1205][key].name[currentLanguage] + "-accordian" + i} elevation={0} style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
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
            {encounterDB[1205][key].name[currentLanguage]} -{" "}
            {getNumUpgrades(itemDifferentials, 1205, key, 0)} Upgrades
            {/*[...filterItemListBySource(itemDifferentials, 1205, key, key === 2531 ? 415 : 389)].map((item) => getDifferentialByID(itemDifferentials, item.id, item.level)).filter((item) => item !== 0).length} Upgrades */}
          </Typography>
        </UFAccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} container spacing={1}>
            {[...filterItemListBySource(itemDifferentials, 1205, key, key === 2531 ? 415 : 389)].map((item, index) => (
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
          {contentGenerator(props.type)}
        </Grid>
      </Grid>
    </div>
  );
}
