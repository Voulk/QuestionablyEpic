import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import bossHeaders from "../CooldownPlanner/Functions/IconFunctions/BossHeaderIcons";
import "./Panels.css";
import { worldBosses } from "../CooldownPlanner/Data/Data";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
    padding: 4,
  },
}));

export default function WorldBossGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const contentGenerator = (type) => {
    return worldBosses
      .map((key) => (
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <div
                style={{ width: 200, paddingLeft: 10 }}
                className="container-UpgradeCards"
              >
                {bossHeaders(key.id)}
                <Typography
                  variant="h6"
                  noWrap
                  className="centered-UpgradeCards-Dungeons"
                >
                  {t("WorldBosses." + key.id)}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm container spacing={1}>
              <Divider
                orientation="vertical"
                flexItem
                style={{ marginRight: 4 }}
              />
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
