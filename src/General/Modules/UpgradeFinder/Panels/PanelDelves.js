import React from "react";
import { rootStyles } from "./PanelStyles";
import { Typography, Grid } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { getDifferentialByID } from "../../../Engine/ItemUtilities";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getTranslatedSlotName } from "locale/slotsLocale";
import UFAccordion from "./ufComponents/ufAccordian";
import UFAccordionSummary from "./ufComponents/ufAccordianSummary";

function filterItemListBySlot(itemList, slot) {
  const excludedInstance = [748, 749, 750, 751, 321, 752];

  let temp = itemList.filter(function (item) {
    if ("source" in item && !excludedInstance.includes(item.source.instanceId) && item.source.encounterId !== 249) {
      if (slot === "AllMainhands") {
        return item.slot === "1H Weapon" || item.slot === "2H Weapon";
      } else if (slot === "Offhands") {
        return item.slot === "Holdable" || item.slot === "Offhand" || item.slot === "Shield";
      } else {
        return item.slot === slot;
      }
    } else {
      return false;
    }
  });

  return temp;
}

export default function DelvesContainer(props) {
  const classes = rootStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemDifferentials = props.itemDifferentials.filter(item => item.dropLoc === "Delves");
  const spec = props.spec;

  //const itemList = props.itemList.filter((item) => item.source.instanceId === -69);
  //console.log(itemDifferentials);

  itemDifferentials.sort((a, b) => (a.score < b.score ? 1 : -1));

  const slotList = [
    { slot: "Head", label: "head" },
    { slot: "Neck", label: "neck" },
    { slot: "Shoulder", label: "shoulder" },
    { slot: "Back", label: "back" },
    { slot: "Chest", label: "chest" },
    { slot: "Wrist", label: "wrists" },
    { slot: "Hands", label: "hands" },
    { slot: "Waist", label: "waist" },
    { slot: "Legs", label: "legs" },
    { slot: "Feet", label: "feet" },
    { slot: "Finger", label: "finger" },
    { slot: "Trinket", label: "trinket" },
    { slot: "AllMainhands", label: "weapons" },
    { slot: "Offhands", label: "offhands" },
  ];

  const iconReturn = (slot, spec) => {
    console.log(slot, spec);
    switch (spec) {
      case "Restoration Druid":
      case "Restoration Druid Classic":
        return require("Images/UpgradeFinderIcons/Leather/" + slot + ".jpg");
      case "Mistweaver Monk":
        return require("Images/UpgradeFinderIcons/Leather/" + slot + ".jpg");
      case "Holy Paladin":
      case "Holy Paladin Classic":
        return require("Images/UpgradeFinderIcons/Plate/" + slot + ".jpg");
      case "Restoration Shaman":
      case "Preservation Evoker":
      case "Restoration Shaman Classic":
        return require("Images/UpgradeFinderIcons/Mail/" + slot + ".jpg");
      case "Holy Priest":
      case "Holy Priest Classic":
      case "Discipline Priest":
        return require("Images/UpgradeFinderIcons/Cloth/" + slot + ".jpg");
      default:
        return [-1];
    }
  };
  const contentGenerator = () => {
    return slotList.map((key, i) => (
      <UFAccordion key={getTranslatedSlotName(key.label, currentLanguage) + "-accordian" + i} elevation={0} style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
        <UFAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ verticalAlign: "middle" }}>
          <img src={iconReturn(key.slot, spec)} height={30} width={30} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
          <Typography align="center" variant="h6" noWrap color="primary">
            {getTranslatedSlotName(key.label, currentLanguage)} -{" "}
            {[...filterItemListBySlot(itemDifferentials, key.slot)].filter((item) => item.score > 0).length} Upgrades
          </Typography>
        </UFAccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} container spacing={1}>
            {[...filterItemListBySlot(itemDifferentials, key.slot)].map((item, index) => (
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
          {contentGenerator()}
        </Grid>
      </Grid>
    </div>
  );
}
