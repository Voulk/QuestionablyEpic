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
          maxWidth: 235,
          fontSize: "12px",
          textAlign: "center",
          minHeight: 60,
          paddingTop: 16,
          borderRadius: 0,
        }}
      >
        <div> Estimated Throughput: {props.hps} HPS</div>
      </Paper>
    </Grid>
    // </div>
  );
}
