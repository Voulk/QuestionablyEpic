import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { getDifferentialByID } from "../../../Engine/ItemUtilities";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import withStyles from "@mui/styles/withStyles";

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

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "#35383e",
    "&$expanded": {
      backgroundColor: "rgb(255 255 255 / 10%)",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    padding: "8px 5px",
  },
}));

export default function SlotsContainer(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;

  itemList.sort((a, b) => (getDifferentialByID(itemDifferentials, a.id, a.level) < getDifferentialByID(itemDifferentials, b.id, b.level) ? 1 : -1));

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
    switch (spec) {
      case "Restoration Druid":
      case "Restoration Druid BC":
        return require("Images/UpgradeFinderIcons/Leather/" + slot + ".jpg").default;
      case "Mistweaver Monk":
        return require("Images/UpgradeFinderIcons/Leather/" + slot + ".jpg").default;
      case "Holy Paladin":
      case "Holy Paladin BC":
        return require("Images/UpgradeFinderIcons/Plate/" + slot + ".jpg").default;
      case "Restoration Shaman":
      case "Restoration Shaman BC":
        return require("Images/UpgradeFinderIcons/Mail/" + slot + ".jpg").default;
      case "Holy Priest":
      case "Holy Priest BC":
      case "Discipline Priest":
        return require("Images/UpgradeFinderIcons/Cloth/" + slot + ".jpg").default;
      default:
        return [-1];
    }
  };

  const contentGenerator = () => {
    return slotList.map((key, i) => (
      <Accordion key={t("slotNames." + key.label) + "-accordian" + i} elevation={0} style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ verticalAlign: "middle" }}>
          <img src={iconReturn(key.slot, props.player.spec)} height={30} width={30} style={{ borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} />
          <Typography align="center" variant="h6" noWrap color="primary">
            {t("slotNames." + key.label)} -{" "}
            {[...filterItemListBySlot(itemList, key.slot)].map((item) => getDifferentialByID(itemDifferentials, item.id, item.level)).filter((item) => item !== 0).length} Upgrades
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} sm container spacing={1}>
            {[...filterItemListBySlot(itemList, key.slot)].map((item, index) => (
              <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={true} />
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
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
