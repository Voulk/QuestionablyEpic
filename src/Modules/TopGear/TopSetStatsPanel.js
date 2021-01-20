// This is the stats panel for the Top Gear current best set.

import React from "react";
import { Paper, Grid, Typography, Divider } from "@material-ui/core";
import { STATPERONEPERCENT, translatedStat } from "../Engine/STAT";
import { useTranslation } from "react-i18next";

// The soulbind stat panel sums up all of the active soulbinds in the tree.
export default function TopSetStatsPanel(props) {
  const covAbilityEst = props.covAbility > 0 ? props.covAbility : "NA";
  const statList = props.statList;
  const { t, i18n } = useTranslation();
  const currentLanguage = props.currentLanguage;

  const stats = [
    ["intellect", statList.intellect],
    ["haste", statList.haste / STATPERONEPERCENT.HASTE],
    ["crit", statList.crit / STATPERONEPERCENT.CRIT],
    ["mastery", statList.mastery / STATPERONEPERCENT.MASTERYA[props.spec]],
    ["versatility", statList.versatility / STATPERONEPERCENT.VERSATILITY],
    ["leech", statList.leech / STATPERONEPERCENT.LEECH],
    ["bonus HPS", statList.hps],
    ["bonus DPS", statList.dps],
  ];

  // Returns a formatted string for the stat panel.
  function printStat(stat, value) {
    if (["haste", "crit", "versatility", "mastery", "leech"].includes(stat)) {
      console.log(stat + ": " + translatedStat[stat]["de"]);
      console.log("CL: " + currentLanguage);
      return translatedStat[stat][currentLanguage] + ": " + Math.round(100 * value) / 100 + "%";
    } else return translatedStat[stat][currentLanguage] + ": " + Math.round(value);
  }

  return (
    // <div className="statPanel">

    <Paper
      // elevation={0}
      // variant="outlined"
      style={{
        fontSize: "12px",
        textAlign: "left",
        minHeight: 90,
        maxWidth: 400,
        backgroundColor: "rgba(44, 44, 44, 0.5)",
      }}
    >
      <Grid container direction="column" spacing={1}>
        <Grid item xs={12}>
          <Typography
            style={{ fontSize: 18 }}
            variant="h6"
            align="center"
            color="primary"
          >
            {t("TopGear.StatPanel.AvgStats")}
          </Typography>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12} style={{ padding: "4px 16px 16px 16px" }}>
          <Grid container direction="row" spacing={1}>
            {stats.map((stat, index) => (
              <Grid item xs={6} key={index}>
                <Typography
                  style={{ fontSize: 16, marginLeft: "4px" }}
                  variant="body1"
                  align="left"
                >
                  {printStat(stat[0], stat[1])}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/*}
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 16 }}
                variant="body1"
                align="center"
              >
                Int: {props.hps + props.covAbility}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 16 }}
                variant="body1"
                align="center"
              >
                Haste: {covAbilityEst}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 16 }}
                variant="body1"
                align="center"
              >
                Selected Nodes: {props.hps}
              </Typography>
            </Grid>
          
          </Grid>
          */}
      </Grid>
    </Paper>
    // </div>
  );
}
