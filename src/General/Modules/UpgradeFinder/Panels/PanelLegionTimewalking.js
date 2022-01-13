import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, Divider, Paper } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "../../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { itemLevels } from "../../../../Databases/itemLevelsDB";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: 4,
    padding: 4,
  },
}));

export default function LegionTimewalkingGearContainer(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const difficulty = props.playerSettings.dungeon;

  const imagePosition = (dungeon) => {
    switch (dungeon) {
      case 716:
        // Eye of Azshara
        return "100% 60%";
      case 707:
        // Vault of the VaultOfTheWardens
        return "0% 60%";
      default:
        return "center 60%";
    }
  };

  const contentGenerator = () => {
    return encounterDB[3].map((key, i) => (
      <Grid item xs={12} key={"LegionTimewalkingContainer-" + i}>
        <Paper style={{ backgroundColor: "#191c23", border: "1px solid rgba(255, 255, 255, 0.22)" }}>
          <Grid container>
            <Grid item xs={12} sm="auto">
              <div
                style={{
                  width: 207,
                  height: "100%",
                  backgroundImage: `url(${DungeonHeaderIcons(key)})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: imagePosition(key),
                  backgroundSize: "auto 100%",
                }}
                className="container-UpgradeCards"
              >
                <Typography variant="h6" style={{ width: "100%" }} className="centered-UpgradeCards-Dungeons">
                  {t("DungeonNames." + key)}
                </Typography>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm container spacing={1} style={{ padding: 8 }}>
              {[...filterItemListBySource(itemList, -1, key, itemLevels.dungeon[difficulty])].map((item, index) => (
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
        {contentGenerator()}
      </Grid>
    </div>
  );
}
