import React from "react";
import { Paper, Grid, Typography, Divider } from "@material-ui/core";
import { STATPERONEPERCENT } from "../../Engine/STAT";
import { useTranslation } from "react-i18next";

/* ---------------------------------------------------------------------------------------------- */
/*                   This is the stats panel for the Top Gear current best set.                   */
/* ---------------------------------------------------------------------------------------------- */

export default function TopSetStatsPanel(props) {
  const statList = props.statList;
  const { t } = useTranslation();
  const gameType = props.gameType

  const stats = gameType === "Retail" ? 
  [
    ["Intellect", statList.intellect],
    ["Haste", statList.haste / STATPERONEPERCENT.Retail.HASTE],
    ["Crit", statList.crit / STATPERONEPERCENT.Retail.CRIT],
    ["Mastery", statList.mastery / STATPERONEPERCENT.Retail.MASTERYA[props.spec]],
    ["Versatility", statList.versatility / STATPERONEPERCENT.Retail.VERSATILITY],
    ["Leech", statList.leech / STATPERONEPERCENT.Retail.LEECH],
    ["Bonus HPS", statList.hps],
    ["Bonus DPS", statList.dps],
  ] :
  [
    ["Bonus Healing", statList.bonushealing],
    ["Intellect", statList.intellect],
    ["Spirit", statList.spirit],
    ["MP5", statList.mp5],
    ["Crit", statList.spellcrit / STATPERONEPERCENT.BurningCrusade.CRIT],
    ["Haste", statList.spellhaste / STATPERONEPERCENT.BurningCrusade.HASTE],
    
  ]
  
  ;

  /* ----------------------- Returns a formatted string for the stat panel. ----------------------- */
  function printStat(stat, value) {
    if (["Haste", "Crit", "Versatility", "Mastery", "Leech"].includes(stat)) {
      return t(stat) + ": " + Math.round(100 * value) / 100 + "%";
    } else return t(stat) + ": " + Math.floor(value);
  }

  return (
    <Paper
      style={{
        fontSize: "12px",
        textAlign: "left",
        minHeight: 90,
        maxWidth: 400,
        backgroundColor: "rgba(44, 44, 44, 0.5)",
      }}
    >
      <Grid container direction="column" spacing={1}>
        {/* -------------------------------------- Stat Panel Title -------------------------------------- */}
        <Grid item xs={12}>
          <Typography style={{ fontSize: 18 }} variant="h6" align="center" color="primary">
            {t("TopGear.StatPanel.AvgStats")}
          </Typography>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={12} style={{ padding: "4px 16px 16px 16px" }}>
          <Grid container direction="row" spacing={1}>
            {/* --------------------------------- Map the stats for the Panel -------------------------------- */}
            {stats.map((stat, index) => (
              <Grid item xs={6} key={index}>
                <Typography style={{ fontSize: 16, marginLeft: "4px" }} variant="body1" align="left">
                  {printStat(stat[0], stat[1])}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
