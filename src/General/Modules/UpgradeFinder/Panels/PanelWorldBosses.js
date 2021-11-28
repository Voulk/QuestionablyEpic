import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, Divider, Paper } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
import UpgradeFinderBossImages from "./BossImages";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { filterItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 4,
    padding: 4,
  },
}));

export default function WorldBossGearContainer(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;

  const contentGenerator = (type) => {
    return encounterDB[1192].map((key, i) => (
      <Grid item xs={12} key={"worldBossContainer-" + i}>
        <Paper style={{ backgroundColor: "#191c23", border: "1px solid rgba(255, 255, 255, 0.22)" }}>
          <Grid container>
            <Grid item>
              <div
                style={{
                  width: 94,
                  height: 100,
                  backgroundImage: `url(${UpgradeFinderBossImages(key)})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 60%",
                  backgroundSize: "auto 100%",
                }}
                className="container-UpgradeCards"
              >
                <Typography variant="h6" noWrap className="centered-UpgradeCards-Dungeons">
                  {t("WorldBosses." + key)}
                </Typography>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm container spacing={1} style={{ padding: 8 }}>
              {[...filterItemListBySource(itemList, 1192, key, 207)].map((item, index) => (
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
