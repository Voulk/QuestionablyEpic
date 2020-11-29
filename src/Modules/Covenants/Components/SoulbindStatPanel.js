import React from "react";
import { Paper, Grid, Typography, Divider } from "@material-ui/core";

// The soulbind stat panel sums up all of the active soulbinds in the tree.
export default function SoulbindStatPanel(props) {
  const covAbilityEst = props.covAbility > 0 ? props.covAbility : "NA";

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
              Summary
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 16 }}
                variant="body1"
                align="center"
              >
                Score: {props.hps + props.covAbility}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 16 }}
                variant="body1"
                align="center"
              >
                Covenant Ability Est: {covAbilityEst}
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
        </Grid>
      </Paper>
    </Grid>
    // </div>
  );
}
