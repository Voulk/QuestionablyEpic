import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Typography, Grid, Divider, Paper } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "../../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, filterBCItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { itemLevels } from "../../../../Databases/itemLevelsDB";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: 4,
    padding: 4,
  },
}));

export default function MythicPlusGearContainer(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.dungeon;
  const gameType = useSelector((state) => state.gameType);
  const contentGenerator = () => {
    return encounterDB[1].map((key, i) => (
      <Grid item xs={12} key={"mythicContainer-" + i} style={{ padding: "4px 0px" }}>
        <Paper style={{ backgroundColor: "#191c23", padding: 8, border: "1px solid rgba(255, 255, 255, 0.22)" }}>
          <Grid container spacing={2}>
            <Grid item style={{ padding: 0 }}>
              <div
                style={{
                  width: 207,
                  height: "100%",
                  paddingLeft: 8,
                  backgroundImage: `url(${DungeonHeaderIcons(key)})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 60%",
                  backgroundSize: "auto 100%",
                }}
                className="container-UpgradeCards"
              >
                <Typography variant="h6" style={{ width: "100%" }} className="centered-UpgradeCards-Dungeons">
                  {t("DungeonNames." + key)}
                </Typography>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem style={{ marginRight: 4 }} />
            <Grid item xs={12} sm container spacing={1} style={{ marginRight: 6 }}>
              {[...filterItemListBySource(itemList, -1, key, itemLevels.dungeon[difficulty])].map((item, index) => (
                <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    ));
  };

  const contentGeneratorBC = () => {
    return encounterDB[123].map((key, i) => (
      <Grid item xs={12} key={"mythicContainer-" + i} style={{ padding: "4px 0px" }}>
        <Paper style={{ backgroundColor: "#191c23", padding: 8, border: "1px solid rgba(255, 255, 255, 0.22)" }}>
          <Grid container spacing={2}>
            <Grid item style={{ padding: 0 }}>
              <div
                style={{
                  width: 300,
                  height: 150,
                  // paddingLeft: 8,
                  backgroundImage: `url(${DungeonHeaderIcons(key)})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 60%",
                  backgroundSize: "auto 100%",
                }}
                className="container-UpgradeCards"
              >
                <Typography variant="h6" noWrap className="centered-UpgradeCards-Dungeons">
                  {t("BurningCrusade.Dungeons." + key)}
                </Typography>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem style={{ marginRight: 4 }} />
            <Grid item xs={12} sm container spacing={1} style={{ marginRight: 6 }}>
              {[...filterBCItemListBySource(itemList, -1, key)].map((item, index) => (
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
        {gameType === "Retail" ? contentGenerator() : contentGeneratorBC()}
      </Grid>
    </div>
  );
}
