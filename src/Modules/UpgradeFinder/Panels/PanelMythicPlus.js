import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "../../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, getDifferentialByID } from "../../Engine/ItemUtilities";
import { encounterDB } from "../../Player/InstanceDB";
import { itemLevels } from "../../../Databases/itemLevelsDB";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
    padding: 4,
  },
}));

export default function MythicPlusGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.dungeon;

  const contentGenerator = (type) => {
    return encounterDB[1]
      .map((key, i) => (
        <Grid item xs={12} key={"mythicContainer-" + i}>
          <Grid container spacing={2}>
            <Grid item style={{ padding: 0 }}>
              <div style={{ width: 207, paddingLeft: 8 }} className="container-UpgradeCards">
                {DungeonHeaderIcons(key, {
                  verticalAlign: "middle",
                  marginTop: 8,
                })}
                <Typography variant="h6" noWrap className="centered-UpgradeCards-Dungeons">
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
        </Grid>
      ))
      .map((key, i) => [
        key,
        <Grid item xs={12} key={"mythicDivider-" + i}>
          <Divider />
        </Grid>,
      ]);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {contentGenerator(props.type)}
      </Grid>
    </div>
  );
}
