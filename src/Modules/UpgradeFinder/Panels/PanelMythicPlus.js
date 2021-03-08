import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider, Paper } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "../../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, getDifferentialByID } from "../../Engine/ItemUtilities";
import { encounterDB } from "../../Player/InstanceDB";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import UpgradeFinderSlider from "../Slider";

// TODO: Move these to somewhere more accessible since they are used in multiple places.
const itemLevels = {
  raid: [187, 200, 213, 226],
  dungeon: [184, 184, 187, 190, 194, 194, 197, 200, 200, 200, 203, 203, 207, 207, 207, 210],
  pvp: [200, 207, 213, 220, 226],
};



// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     marginTop: 10,
//     padding: 4,
//   },
// }));

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
    "&$expanded": {
      backgroundColor: "rgb(255 255 255 / 10%)",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 8,
  },
  slider: {
    width: "90%",
    margin: "0px 20px 50px 20px",
    textAlign: "center",
  },
  labels: {fontSize: 12},
  1182: {
    backgroundImage: `url(${require("../../../Images/MythicPlus/TheNecroticWake/NecroticBannerLarge.png").default})`,
    backgroundSize: "100%",
    // borderRadius: "4px 0px 0px 0px",
    height: 60,
    // whiteSpace: "nowrap",
    // textShadow: "3px 3px 4px black",
    // color: "#fff",
    // fontSize: "1.1rem",
  },
  1183: {
    backgroundImage: `url(${require("../../../Images/MythicPlus/Plaguefall/PlaguefallBannerLarge.png").default})`,
    backgroundSize: "100%",
    // borderRadius: "4px 0px 0px 0px",
    height: 60,
    // whiteSpace: "nowrap",
    // textShadow: "3px 3px 4px black",
    // color: "#fff",
    // fontSize: "1.1rem",
  },
}));



export default function MythicPlusGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.dungeon;
  const marks = [
    {
      value: 0,
      label: (
        <div className={classes.labels}>
          <div>Rank 1 (184)</div>
          <div>M 0</div>
        </div>
      ),
    },
    {
      value: 1,
      label: (
        <div className={classes.labels}>
          <div>Rank 2 (187)</div>
          <div>M 2</div>
        </div>
      ),
    },
    {
      value: 2,
      label: (
        <div className={classes.labels}>
          <div>Rank 3 (190)</div>
          <div>M 3</div>
        </div>
      ),
    },
    {
      value: 3,
      label: (
        <div className={classes.labels}>
          <div>Rank 4 (194)</div>
          <div>M 4-5</div>
        </div>
      ),
    },
    {
      value: 4,
      label: (
        <div className={classes.labels}>
          <div>Rank 5 (197)</div>
          <div>M 6</div>
        </div>
      ),
    },
    {
      value: 5,
      label: (
        <div className={classes.labels}>
          <div>Rank 6 (200)</div>
          <div>M 7-9</div>
        </div>
      ),
    },
    {
      value: 6,
      label: (
        <div className={classes.labels}>
          <div>Rank 7 (203)</div>
          <div>M 10-11</div>
        </div>
      ),
    },
    {
      value: 7,
      label: (
        <div className={classes.labels}>
          <div>Rank 8 (207)</div>
          <div>M 12-14</div>
        </div>
      ),
    },
    {
      value: 8,
      label: (
        <div className={classes.labels}>
          <div>Rank 9 (210)</div>
          <div>M 15</div>
        </div>
      ),
    },
    {
      value: 9,
      label: (
        <div className={classes.labels}>
          <div>Rank 10 (213)</div>
        </div>
      ),
    },
    {
      value: 10,
      label: (
        <div className={classes.labels}>
          <div>Rank 11 (216)</div>
        </div>
      ),
    },
    {
      value: 11,
      label: (
        <div className={classes.labels}>
          <div>Rank 12 (220)</div>
        </div>
      ),
    },
    {
      value: 12,
      label: (
        <div className={classes.labels}>
          <div>Great Vault (226)</div>
        </div>
      ),
    },
  ];

  const contentGenerator = (type) => {
    return encounterDB[1]
      .map((key, i) => (

        <Accordion elevation={0} style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}>
          {console.log(key)}
        <AccordionSummary className={classes.[key]} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" style={{ verticalAlign: "middle" }}>
          {/* <img src={iconReturn(key.slot, props.player.spec)} height={30} width={30} style={{ marginRight: 6, borderRadius: 4, border: "1px solid rgba(255, 255, 255, 0.12)" }} /> */}
          <Typography align="center" variant="h6" noWrap color="primary">
            {t("DungeonNames." + key)} -{" "}
            {[...filterItemListBySource(itemList, -1, key, itemLevels.dungeon[difficulty])].map((item, index) => getDifferentialByID(itemDifferentials, item.id, item.level)).filter((item) => item !== 0).length}{" "}
            Upgrades
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#191c23" }}>
          <Grid xs={12} sm container spacing={1}>
          {[...filterItemListBySource(itemList, -1, key, itemLevels.dungeon[difficulty])].map((item, index) => (
                <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
              ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

        // <Grid item xs={12} key={"mythicContainer-" + i}>
        //   <Grid container spacing={2}>
        //     <Grid item>
        //       <div style={{ width: 181, paddingLeft: 10 }} className="container-UpgradeCards">
        //         {DungeonHeaderIcons(key, {
        //           verticalAlign: "middle",
        //         })}
        //         <Typography variant="h6" noWrap className="centered-UpgradeCards-Dungeons">
        //           {t("DungeonNames." + key)}
        //         </Typography>
        //       </div>
        //     </Grid>
        //     <Divider orientation="vertical" flexItem style={{ marginRight: 4 }} />
        //     <Grid item xs={12} sm container spacing={1} style={{ marginRight: 6 }}>
        //       {[...filterItemListBySource(itemList, -1, key, itemLevels.dungeon[difficulty])].map((item, index) => (
        //         <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
        //       ))}
        //     </Grid>
        //   </Grid>
        // </Grid>
      ))
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        
        <Grid item xs={12}>
          <Paper elevation={0} style={{ padding: "10px 10px 10px 10px", textAlign: "center" }}>
            <Grid container justify="center" spacing={1}>
              <Grid item xs={12}>
                <Typography color="primary" align="center" variant="h5">
                  {t("UpgradeFinderFront.MythicPlusHeader")}
                </Typography>
                <Grid item xs={12}>
                  <Typography align="center">{t("UpgradeFinderFront.MythicPlusBody")}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <UpgradeFinderSlider
              className={classes.slider}
              style={{ color: "#52af77", }}
              defaultValue={0}
              step={null}
              valueLabelDisplay="off"
              marks={marks}
              max={12}
              change={props.setDungeonDifficulty}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
        {contentGenerator(props.type)}
        </Grid>
      </Grid>
    </div>
  );
}
