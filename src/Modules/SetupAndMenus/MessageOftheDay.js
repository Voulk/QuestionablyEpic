import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

export default function MessageOfTheDay(props) {
  //prettier-ignore
  const messageOfTheDay = [
    "Legendary effects coming soon for Priests. Mistweaver now live!",
    "Upgrade Finder now live!"
];

  return (
    <Paper elevation={0} style={{ border: "1px", padding: 16 }}>
      <Grid container spacing={1}>
        {messageOfTheDay.map((key) => (
          <Grid item xs={12}>
            <Typography style={{ color: "limegreen", lineHeight: "10px" }} align="left" variant="body1">
              • {key}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
