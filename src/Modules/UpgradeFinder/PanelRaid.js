import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import bossHeaders from "../CooldownPlanner/Functions/IconFunctions/BossHeaderIcons";
import "./Panels.css";
import { bossList } from "../CooldownPlanner/Data/Data";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
    padding: 4,
  },
}));

export default function RaidGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const contentGenerator = (items) => {
    // Raid Panel

    return bossList
      .filter((key) => key.zoneID === 2296)
      .map((key) => (
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item style={{ alignSelf: "center" }}>
              <div
                style={{ width: 200, paddingLeft: 10 }}
                className="container-UpgradeCards"
              >
                {bossHeaders(key.id)}
                <Typography
                  variant="h6"
                  noWrap
                  className="centered-UpgradeCards"
                >
                  {t("BossNames." + key.id)}
                </Typography>
              </div>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              style={{ marginRight: 4 }}
            />
            <Grid item xs={12} sm container direction="column" spacing={1}>
              <Grid item xs={12} sm container direction="row" spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color="primary"
                    align="center"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      height: "100%",
                      borderRadius: 4,
                    }}
                  >
                    Mythic
                  </Typography>
                </Grid>
                <Grid item xs={12} sm container spacing={1}>
                  {[...props.pl.getActiveItems("1H Weapon")].map(
                    (item, index) => (
                      <ItemUpgradeCard key={index} item={item} />
                    )
                  )}
                </Grid>
              </Grid>

              <Grid item>
                <Divider />
              </Grid>

              <Grid item xs={12} sm container direction="row" spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color="primary"
                    align="center"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      height: "100%",
                      borderRadius: 4,
                    }}
                  >
                    Heroic
                  </Typography>
                </Grid>
                <Grid item xs={12} sm container spacing={1}>
                  {[...props.pl.getActiveItems("1H Weapon")].map(
                    (item, index) => (
                      <ItemUpgradeCard key={index} item={item} />
                    )
                  )}
                </Grid>
              </Grid>
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
        {contentGenerator()}
      </Grid>
    </div>
  );
}
