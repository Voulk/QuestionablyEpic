import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "../../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListByType, getDifferentialByID } from "../../Engine/ItemUtilities";
import { encounterDB } from "../../Player/InstanceDB";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// TODO: Move these to somewhere more accessible since they are used in multiple places.
const itemLevels = {
  raid: [187, 200, 213, 226],
  dungeon: [184, 184, 187, 190, 194, 194, 197, 200, 200, 200, 203, 203, 207, 207, 207, 210],
  pvp: [200, 207, 213, 220, 226],
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 8,
  },
}));

export default function SlotsContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.dungeon;
  console.log(props.player.spec);
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
        return require("../../../Images/UpgradeFinderIcons/Leather/" + slot + ".jpg").default;
      case "Mistweaver Monk":
        return require("../../../Images/UpgradeFinderIcons/Leather/" + slot + ".jpg").default;
      case "Holy Paladin":
        return require("../../../Images/UpgradeFinderIcons/Plate/" + slot + ".jpg").default;
      case "Restoration Shaman":
        return require("../../../Images/UpgradeFinderIcons/Mail/" + slot + ".jpg").default;
      case "Holy Priest":
      case "Discipline Priest":
        return require("../../../Images/UpgradeFinderIcons/Cloth/" + slot + ".jpg").default;
      default:
        return [-1];
    }
  };

  const contentGenerator = (type) => {
    return slotList.map((key, i) => (
      // <Grid item xs={12} key={"slotContainer-" + key.label}>
      //   <Grid container spacing={1} style={{ padding: 4 }}>
      //     <Grid item xs={12}>
      <Accordion elevation={0} style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ verticalAlign: "middle" }}>
          <img src={iconReturn(key.slot, props.player.spec)} height={30} width={30} style={{ paddingRight: 6, borderRadius: 4 }} />
          <Typography align="center" variant="h6" noWrap color="primary">
            {t("slotNames." + key.label)} -{" "}
            {[...filterItemListByType(itemList, key.slot)].map((item, index) => getDifferentialByID(itemDifferentials, item.id, item.level)).filter((item) => item !== 0).length}{" "}
            Upgrades
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} sm container spacing={1}>
            {[...filterItemListByType(itemList, key.slot)].map((item, index) => (
              <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={true} />
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      //       <Typography
      //         align="center"
      //         variant="h6"
      //         noWrap
      //         color="primary"
      //         style={{
      //           backgroundColor: "rgba(255, 255, 255, 0.12)",
      //           borderRadius: 4,
      //         }}
      //       >
      //         {t("slotNames." + key.label)}
      //       </Typography>
      //     </Grid>
      //     <Grid item xs={12} sm container spacing={1}>
      //       {[...filterItemListByType(itemList, key.slot)].map((item, index) => (
      //         <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} />
      //       ))}
      //     </Grid>
      //   </Grid>
      // </Grid>
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
