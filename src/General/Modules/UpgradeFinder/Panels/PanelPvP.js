import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, Divider, Paper } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { getTranslatedPvP } from "locale/pvpLocale";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: 4,
    padding: 4,
  },
}));

const getPVPItemLevel = (sourceID, difficulty) => {
  if (sourceID === -17) {
    return itemLevels.pvp[difficulty];
  } else if (sourceID === -16) return 203;
  else return -1;
};

const pvpIcons = {
  "-16": require("Images/Bosses/HonorIcon.jpg").default,
  "-17": require("Images/Bosses/HonorIcon.jpg").default,
};

const itemLevels = {
  raid: [187, 200, 213, 226],
  dungeon: [184, 184, 187, 190, 194, 194, 197, 200, 200, 200, 203, 203, 207, 207, 207, 210],
  pvp: [249, 252, 255, 259, 262, 265, 268, 272, 275],
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
      <Grid item xs={12} key={"pvpContainer-" + i}>
        <Paper style={{ backgroundColor: "#191c23", border: "1px solid rgba(255, 255, 255, 0.22)" }}>
          <Grid container>
            <Grid item>
              <div style={{ width: 181 }} className="container-UpgradeCards">
                <img src={pvpIcons[key]} style={{ borderRadius: 4 }} />
                <Typography variant="h6" noWrap className="centered-UpgradeCards-Dungeons">
                  {getTranslatedPvP(key, currentLanguage)}
                </Typography>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />

            <Grid item xs={12} sm container spacing={1} style={{ padding: 8 }}>
              {[...filterItemListBySource(itemList, key, 0, getPVPItemLevel(key, difficulty), difficulty)].map((item, index) => (
                <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    ));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {contentGenerator(props.type)}
      </Grid>
    </div>
  );
}
