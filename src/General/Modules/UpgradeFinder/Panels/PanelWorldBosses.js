import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, Divider, Paper } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import UpgradeFinderBossImages from "./BossImages";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { filterItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";
import i18n from "i18next";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import withStyles from "@mui/styles/withStyles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import bossHeaders from "General/Modules/CooldownPlanner/Functions/IconFunctions/BossHeaderIcons";

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

export default function WorldBossGearContainer(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const currentLanguage = i18n.language;

  const contentGenerator = () => {
    return encounterDB[1192].bossOrder.map((key, i) => (
      <Accordion key={encounterDB[1192][key].name[currentLanguage] + "-accordian" + i} elevation={0} style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ verticalAlign: "middle" }}>
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
            {encounterDB[1192][key].name[currentLanguage]} -{" "}
            {[...filterItemListBySource(itemList, 1192, key, 207)].map((item) => getDifferentialByID(itemDifferentials, item.id, item.level)).filter((item) => item !== 0).length} Upgrades
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} container spacing={1}>
            {[...filterItemListBySource(itemList, 1192, key, 207)].map((item, index) => (
              <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
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
          {contentGenerator(props.type)}
        </Grid>
      </Grid>
    </div>
  );
}
