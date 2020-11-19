import React from "react";
import { Paper, Grid } from "@material-ui/core";

// The soulbind stat panel sums up all of the active soulbinds in the tree.
export default function SoulbindStatPanel(props) {
  return (
    // <div className="statPanel">
    <Grid item xs={12} style={{ paddingBottom: 4 }}>
      <Paper
        elevation={0}
        // variant="outlined"
        style={{
          maxWidth: 193,
          width: 193,
          fontSize: "12px",
          textAlign: "left",
          minHeight: 90,
          paddingTop: 22,
          paddingLeft: 40,
          borderRadius: 0,
        }}
      >
        <div style={{fontSize: '16px'}}> Score: {props.hps + props.covAbility}</div>
        <div> Covenant Ability Est: {props.covAbility}</div>
        <div> Selected Nodes: {props.hps}</div>
      </Paper>
    </Grid>
    // </div>
  );
}
