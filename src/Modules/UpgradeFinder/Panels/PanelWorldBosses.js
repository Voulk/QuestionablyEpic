import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider, Paper } from "@material-ui/core";
import ItemUpgradeCard from "./ItemUpgradeCard";
import UpgradeFinderBossImages from "./BossImages";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { encounterDB } from "../../Player/InstanceDB";
import { filterItemListBySource, getDifferentialByID } from "../../Engine/ItemUtilities";

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
      <Grid item xs={12} key={"worldBossContainer-" + i} style={{ padding: "4px 0px" }}>
        <Paper style={{ backgroundColor: "#191c23", padding: 8, border: "1px solid rgba(255, 255, 255, 0.22)" }}>
          <Grid container spacing={2}>
            <Grid item>
              <div
                style={{
                  width: 175,
                  height: 181,
                  paddingLeft: 8,
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
            <Divider orientation="vertical" flexItem style={{ marginRight: 4 }} />
            <Grid item xs={12} sm container spacing={1} style={{ marginRight: 6 }}>
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
