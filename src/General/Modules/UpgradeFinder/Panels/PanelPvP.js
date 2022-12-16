import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, Divider, Paper } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { getTranslatedPvP } from "locale/pvpLocale";
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

const getPVPItemLevel = (sourceID, difficulty) => {
  if (sourceID === -31) {
    return itemLevels.pvp[difficulty];
  } else if (sourceID === -30) return 359;
  else return -1;
};

const pvpIcons = {
  "-30": require("Images/Bosses/HonorIcon.jpg").default,
  "-31": require("Images/Bosses/ConquestIcon.jpg").default,
};

const itemLevels = {
  raid: [187, 200, 213, 226],
  dungeon: [184, 184, 187, 190, 194, 194, 197, 200, 200, 200, 203, 203, 207, 207, 207, 210],
  pvp: [382, 385, 389, 392, 395, 398, 402, 405, 408]
};

export default function PvPGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.pvp;

  const contentGenerator = () => {
    return encounterDB[2].map((key, i) => (
      <Accordion
        key={getTranslatedPvP(key, currentLanguage) + "-accordian" + i}
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
            <img src={pvpIcons[key]} style={{ borderRadius: 4, height: 36 }} />
            <Divider flexItem orientation="vertical" style={{ margin: "0px 5px 0px 0px" }} />
            {getTranslatedPvP(key, currentLanguage)} -{" "}
            {
              [...filterItemListBySource(itemList, key, 0, getPVPItemLevel(key, difficulty), difficulty)]
                .map((item) => getDifferentialByID(itemDifferentials, item.id, item.level))
                .filter((item) => item !== 0).length
            }{" "}
            Upgrades
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} container spacing={1}>
            {[...filterItemListBySource(itemList, key, 0, getPVPItemLevel(key, difficulty), difficulty)].map((item, index) => (
              <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      // <Grid item xs={12} key={"pvpContainer-" + i}>
      //   <Paper style={{ backgroundColor: "#191c23", border: "1px solid rgba(255, 255, 255, 0.22)" }}>
      //     <Grid container>
      //       <Grid item>
      //         <div style={{ width: 181 }} className="container-UpgradeCards">
      //           <img src={pvpIcons[key]} style={{ borderRadius: 4 }} />
      //           <Typography variant="h6" noWrap className="centered-UpgradeCards-Dungeons">
      //             {getTranslatedPvP(key, currentLanguage)}
      //           </Typography>
      //         </div>
      //       </Grid>
      //       <Divider orientation="vertical" flexItem />

      //       <Grid item xs={12} sm container spacing={1} style={{ padding: 8 }}>
      //         {[...filterItemListBySource(itemList, key, 0, getPVPItemLevel(key, difficulty), difficulty)].map((item, index) => (
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
          {contentGenerator(props.type)}
        </Grid>
      </Grid>
    </div>
  );
}
