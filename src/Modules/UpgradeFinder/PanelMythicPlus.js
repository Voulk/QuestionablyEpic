import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { dungeonList } from "../CooldownPlanner/Data/Data";
import { useTranslation } from "react-i18next";
import {
  filterItemListBySource,
  getDifferentialByID,
} from "../Engine/ItemUtilities";
import { encounterDB } from "../Player/InstanceDB";

// TODO: Move these to somewhere more accessible since they are used in multiple places.
const itemLevels = {
  raid: [187, 200, 213, 226],
  dungeon: [184, 184, 187, 190, 194, 194, 197, 200, 200, 200, 203, 203, 207, 207, 207, 210],
  pvp: [200, 207, 213, 220, 226],
}

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
  const raidID = 1190;
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.dungeon;

  const contentGenerator = (type) => {
    return encounterDB[1]
      .map((key) => (
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <div style={{ width: 200 }} className="container-UpgradeCards">
                {DungeonHeaderIcons(key, {
                  verticalAlign: "middle",
                  // marginRight: "-75px",
                })}
                <Typography
                  variant="h6"
                  noWrap
                  className="centered-UpgradeCards-Dungeons"
                >
                  {t("DungeonNames." + key)}
                </Typography>
              </div>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              style={{ marginRight: 4 }}
            />
            <Grid item xs={12} sm container spacing={1}>
            
              {[...filterItemListBySource(itemList, -1, key, itemLevels.dungeon[difficulty])].map((item, index) => (       
                <ItemUpgradeCard
                  key={index}
                  item={item}
                  itemDifferential={getDifferentialByID(
                    itemDifferentials,
                    item.id,
                    item.level,
                )}
              />
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))
      .map((key) => [
        key,
        <Grid item xs={12}>
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
