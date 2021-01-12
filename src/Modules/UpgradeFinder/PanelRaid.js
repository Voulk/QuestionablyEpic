import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import UpgradeFinderBossImages from "./BossImages";
import "./Panels.css";
import { bossList } from "../CooldownPlanner/Data/Data";
import { encounterDB } from "../Player/InstanceDB";
import { useTranslation } from "react-i18next";
import {
  filterItemListBySource,
  getDifferentialByID,
} from "../Engine/ItemUtilities";

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
  const raidID = 1190;
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;

  const contentGenerator = (items) => {
    // Raid Panel

    return (
      encounterDB[1190]
        //.filter((key) => key === raidID)
        .map((key) => (
          <Grid item xs={12}>
            {console.log(key)}
            <Grid container spacing={2}>
              <Grid item style={{ alignSelf: "center" }}>
                <div
                  style={{ paddingLeft: 10 }}
                  className="container-UpgradeCards"
                >
                  {UpgradeFinderBossImages(key, {
                    width: "100%",
                    height: "auto",
                  })}
                  <Typography
                    variant="h6"
                    noWrap
                    className="centered-UpgradeCards"
                  >
                    {t("BossNames." + key)}
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
                        borderRadius: 4,
                      }}
                    >
                      Mythic
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm container spacing={1}>
                    {[...filterItemListBySource(itemList, 1190, key)].map(
                      (item, index) => (
                        <ItemUpgradeCard
                          key={index}
                          item={item}
                          itemDifferential={getDifferentialByID(
                            itemDifferentials,
                            item.id
                          )}
                        />
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
                        borderRadius: 4,
                      }}
                    >
                      Heroic
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm container spacing={1}>
                    {[...filterItemListBySource(itemList, 1190, key)].map(
                      (item, index) => (
                        <ItemUpgradeCard
                          key={index}
                          item={item}
                          itemDifferential={0}
                        />
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
        ])
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {contentGenerator()}
      </Grid>
    </div>
  );
}
