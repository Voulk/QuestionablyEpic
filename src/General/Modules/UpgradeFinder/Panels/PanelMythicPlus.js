import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, Divider, Paper } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "../../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, filterClassicItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { itemLevels } from "../../../../Databases/itemLevelsDB";
import { useSelector } from "react-redux";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import withStyles from "@mui/styles/withStyles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: 4,
    padding: 4,
  },
}));

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
    padding: "0px 16px 0px 0px",
    backgroundColor: "#35383e",
    "&$expanded": {
      backgroundColor: "rgb(255 255 255 / 10%)",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

export default function MythicPlusGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.dungeon;
  const gameType = useSelector((state) => state.gameType);

  const contentGenerator = () => {
    return encounterDB["-1"].bossOrder.map((key, i) => (
      <Accordion
        key={encounterDB["-1"][key].name[currentLanguage] + "-accordian" + i}
        elevation={0}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <AccordionSummary
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
            <img style={{ height: 36, verticalAlign: "middle" }} src={DungeonHeaderIcons(key)} alt={encounterDB["-1"][key].name[currentLanguage]} />
            <Divider flexItem orientation="vertical" style={{ margin: "0px 5px 0px 0px" }} />
            {encounterDB["-1"][key].name[currentLanguage]} -{" "}
            {
              [...filterItemListBySource(itemList, "-1", key, itemLevels.dungeon[difficulty])].map((item) => getDifferentialByID(itemDifferentials, item.id, item.level)).filter((item) => item !== 0)
                .length
            }{" "}
            Upgrades
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} container spacing={1}>
            {[...filterItemListBySource(itemList, "-1", key, itemLevels.dungeon[difficulty])].map((item, index) => (
              <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    ));
  };

  const contentGeneratorBC = () => {
    return encounterDB[123].bossOrder.map((key, i) => (
      <Accordion
        key={encounterDB[123][key].name[currentLanguage] + "-accordian" + i}
        elevation={0}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <AccordionSummary
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
            {[...filterClassicItemListBySource(itemList, -1, key)].map((item) => getDifferentialByID(itemDifferentials, item.id, item.level)).filter((item) => item !== 0).length} Upgrades
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} container spacing={1}>
            {[...filterClassicItemListBySource(itemList, -1, key)].map((item, index) => (
              <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      // <Grid item xs={12} key={"mythicContainer-" + i}>
      //   <Paper style={{ backgroundColor: "#191c23", border: "1px solid rgba(255, 255, 255, 0.22)" }}>
      //     <Grid container>
      //       <Grid item xs={12} sm="auto">
      //         <div
      //           style={{
      //             width: 300,
      //             height: "100%",
      //             // paddingLeft: 8,
      //             backgroundImage: `url(${DungeonHeaderIcons(parseInt(key))})`,
      //             backgroundRepeat: "no-repeat",
      //             backgroundPosition: "center 60%",
      //             backgroundSize: "auto 100%",
      //           }}
      //           className="container-UpgradeCards"
      //         >
      //           <Typography variant="h6" noWrap className="centered-UpgradeCards-Dungeons">
      //             {encounterDB[123][key].name[currentLanguage]}
      //           </Typography>
      //         </div>
      //       </Grid>
      //       <Divider orientation="vertical" flexItem />
      //       <Grid item xs={12} sm container spacing={1} style={{ padding: 8 }}>
      //         {[...filterClassicItemListBySource(itemList, -1, key)].map((item, index) => (
      //           <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
      //         ))}
      //       </Grid>
      //     </Grid>
      //   </Paper>
      // </Grid>
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
