import React from "react";
import { Paper, Grid, Typography, Divider } from "@mui/material";
import { getMasteryPercentage, STATCONVERSION } from "../../../Engine/STAT";
import { useTranslation } from "react-i18next";

/* ---------------------------------------------------------------------------------------------- */
/*                   This is the stats panel for the Top Gear current best set.                   */
/* ---------------------------------------------------------------------------------------------- */

export default function TopSetStatsPanel(props) {
  const statList = props.statList;
  const { t } = useTranslation();
  const gameType = props.gameType;
  const stats =
    gameType === "Retail"
      ? [
          ["Intellect", statList.intellect],
          ["Haste", statList.haste / STATCONVERSION.HASTE],
          ["Crit", statList.crit / STATCONVERSION.CRIT],
          ["Mastery", getMasteryPercentage(statList.mastery, props.spec)],
          ["Versatility", statList.versatility / STATCONVERSION.VERSATILITY],
          ["Leech", statList.leech / STATCONVERSION.LEECH],
        ]
      : [
          ["Spellpower", statList.spellpower],
          ["Intellect", statList.intellect],
          ["Spirit", statList.spirit],
          ["Crit", statList.crit],
          ["Haste", statList.haste],
          ["Mastery", statList.mastery],
        ];

  /* ----------------------- Returns a formatted string for the stat panel. ----------------------- */
  function printStat(stat, value, gameType) {
    if (gameType === "Retail" && ["Haste", "Crit", "Versatility", "Mastery", "Leech"].includes(stat)) {
      return t(stat) + ": " + Math.round(100 * value) / 100 + "%";
    } 
    else return t(stat) + ": " + Math.floor(value);
  }

  function addMods(spec, stat, value) {
    if (spec === "Holy Paladin") {
      if (stat === "Crit") return value + 0.04;
      else if (stat === "Haste") return value * 1.04;
      else if (stat === "Mastery") return value + 0.06;
    }

  }

  return (
    <Paper
      elevation={0}
      style={{
        fontSize: "12px",
        textAlign: "left",
        minHeight: 90,
        maxWidth: 300,
        backgroundColor: "rgba(44, 44, 44, 0.5)",
        margin: "auto"
      }}
    >
      <Grid container direction="column" spacing={1} width={{xs:"100%", sm:"300px"}} >
        {/* -------------------------------------- Stat Panel Title -------------------------------------- */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center" color="primary">
            {t("TopGear.StatPanel.AvgStats")}
          </Typography>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12} style={{ padding: "4px 16px 16px 16px" }} >
          <Grid container direction={{ xs: "column", sm: "row" }} spacing={0}>
            {/* --------------------------------- Map the stats for the Panel -------------------------------- */}
            {stats.map((stat, index) => (
              <Grid item xs={6} key={index}>
                <Typography style={{ marginLeft: "4px" }} variant="subtitle2" align="left">
                  {printStat(stat[0], stat[1], gameType)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
