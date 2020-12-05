// This is the stats panel for the Top Gear current best set. 


import React from "react";
import { Paper, Grid, Typography, Divider } from "@material-ui/core";

// The soulbind stat panel sums up all of the active soulbinds in the tree.
export default function TopSetStatsPanel(props) {
  const covAbilityEst = props.covAbility > 0 ? props.covAbility : "NA";
  const statList = props.statList;
  const stats = [
      ["Int", statList.intellect],
      ["Haste", statList.haste],
      ["Crit", statList.crit],
      ["Mastery", statList.mastery],
      ["Versatility", statList.versatility],
      ["Bonus HPS", statList.hps],
      ["Bonus DPS", statList.dps],
]

  return (
    // <div className="statPanel">
    <Grid item xs={12} style={{ paddingBottom: 8 }}>
      <Paper
        // elevation={0}
        // variant="outlined"
        style={{
          fontSize: "12px",
          textAlign: "left",
          minHeight: 90,
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
              Stats
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <div>
          <Grid container direction="column">
          {stats.map((stat, index) => (
            
            <Grid item xs={12}
                style={{marginLeft: '7px'}}>
            <Typography
                style={{ fontSize: 16, marginLeft: '4px' }}
                variant="body1"
                align="left"
            >
                {stat[0] + ": " + stat[1]} 
            </Typography>
            </Grid>

            ))}
            </Grid>
        </div>
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
    </Grid>
    // </div>
  );
}
