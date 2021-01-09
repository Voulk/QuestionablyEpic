import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import DungeonHeaderIcons from "../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";
import "./Panels.css";
import { dungeonList } from "../CooldownPlanner/Data/Data";
import { useTranslation } from "react-i18next";

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

  const contentGenerator = (type) => {
    return dungeonList
      .map((key) => (
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <div style={{ width: 200 }} className="container-UpgradeCards">
                {DungeonHeaderIcons(key.zoneID, {
                  verticalAlign: "middle",
                  // marginRight: "-75px",
                })}
                <Typography
                  variant="h6"
                  noWrap
                  className="centered-UpgradeCards-Dungeons"
                >
                  {t("DungeonNames." + key.zoneID)}
                </Typography>
              </div>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              style={{ marginRight: 4 }}
            />
            <Grid item xs={12} sm container spacing={1}>
              {[...props.pl.getActiveItems("1H Weapon")].map((item, index) => (
                <ItemUpgradeCard key={index} item={item} />
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
