import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, Divider, Paper } from "@mui/material";
import ItemUpgradeCard from "./ItemUpgradeCard";
// import UpgradeFinderBossImages from "./BossImages";
import "./Panels.css";
import { useTranslation } from "react-i18next";
import { filterItemListBySource, getDifferentialByID } from "../../../Engine/ItemUtilities";
import { encounterDB } from "../../../../Databases/InstanceDB";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: 4,
    padding: 4,
  },
}));

export default function TazaveshGearContainer(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const itemList = props.itemList;
  const itemDifferentials = props.itemDifferentials;
  const contentGenerator = () => {
    return encounterDB[1194].map((key, i) => (
      <Grid item xs={12} key={"mythicContainer-" + i}>
        <Paper style={{ backgroundColor: "#191c23", border: "1px solid rgba(255, 255, 255, 0.22)" }}>
          <Grid container>
            <Grid item style={{ alignSelf: "center" }}>
              <div
                style={{
                  width: 181,
                  height: 175,
                  paddingLeft: 8,
                  // backgroundImage: `url(${UpgradeFinderBossImages(key, "", 1194)})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 60%",
                  backgroundSize: "auto 100%",
                }}
                className="container-UpgradeCards"
              >
                <Typography variant="h6" style={{ width: "100%" }} className="centered-UpgradeCards-Dungeons">
                  {t("BossNames.Tazavesh." + key)}
                </Typography>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem style={{ marginRight: 4 }} />
            <Grid item xs={12} sm container direction="row" spacing={1} style={{ padding: 8 }}>
              <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color="primary"
                    align="center"
                    style={{
                      backgroundColor: "#35383e",
                      borderRadius: 4,
                    }}
                  >
                    {"Mythic"}
                  </Typography>
                </Grid>

                {[...filterItemListBySource(itemList, 1194, key, 226)].map((item, index) => (
                  <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                ))}
              </Grid>
              <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color="primary"
                    align="center"
                    style={{
                      backgroundColor: "#35383e",
                      borderRadius: 4,
                    }}
                  >
                    {"Hard Mode"}
                  </Typography>
                </Grid>

                {[...filterItemListBySource(itemList, 1194, key, 233)].map((item, index) => (
                  <ItemUpgradeCard key={index} item={item} itemDifferential={getDifferentialByID(itemDifferentials, item.id, item.level)} slotPanel={false} />
                ))}
              </Grid>
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
