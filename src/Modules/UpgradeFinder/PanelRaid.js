import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import UpgradeFinderBossImages from "./BossImages";
import "./Panels.css";
import { encounterDB } from "../Player/InstanceDB";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, getDifferentialByID } from "../Engine/ItemUtilities";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
    padding: 4,
  },
}));

const getDifficultyName = (difficulty) => {
  switch (difficulty) {
    case 0:
      return "LFR";
      break;
    case 1:
      return "Normal";
      break;
    case 2:
      return "Heroic";
      break;
    case 3:
      return "Mythic";
      break;
  }
};

const getDifficultyBaseLevel = (difficulty) => {
  switch (difficulty) {
    case 0:
      return 187;
      break;
    case 1:
      return 200;
      break;
    case 2:
      return 213;
      break;
    case 3:
      return 226;
      break;
  }
};

export default function RaidGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const raidID = 1190;
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const difficulties = props.playerSettings.raid;
  difficulties.sort().reverse();
  const firstDifficulty = difficulties[0];
  const secondDifficulty = difficulties.length === 2 ? difficulties[1] : -1;

  const contentGenerator = (items) => {
    // Raid Panel

    return (
      encounterDB[1190]
        //.filter((key) => key === raidID)
        .map((key) => (
          <Grid item xs={12}>
            <Grid container spacing={2} justify="center" alignItems="flex-start">
              <Grid item style={{ alignSelf: "center" }}>
                <div style={{ paddingLeft: 10 }} className="container-UpgradeCards">
                  {UpgradeFinderBossImages(key, {
                    width: "100%",
                    height: "auto",
                  })}
                  <Typography variant="h6" noWrap className="centered-UpgradeCards">
                    {t("BossNames." + key)}
                  </Typography>
                </div>
              </Grid>
              <Divider orientation="vertical" flexItem style={{ marginRight: 4 }} />
              <Grid item xs={12} sm container direction="column" spacing={1}>
                <Grid item xs={12} container spacing={1}>
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
                      {getDifficultyName(firstDifficulty)}
                    </Typography>
                  </Grid>

                  {[...filterItemListBySource(itemList, 1190, key, getDifficultyBaseLevel(firstDifficulty))].map((item, index) => (
                    <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} />
                  ))}
                </Grid>

                {secondDifficulty !== -1 ? (
                  <Grid item xs={12} sm container spacing={1}>
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
                        {getDifficultyName(secondDifficulty)}
                      </Typography>
                    </Grid>

                    {[...filterItemListBySource(itemList, 1190, key, getDifficultyBaseLevel(secondDifficulty))].map((item, index) => (
                      <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} />
                    ))}
                  </Grid>
                ) : (
                  ""
                )}
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
