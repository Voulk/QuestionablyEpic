import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

export default function MessageOfTheDay(props) {
  //prettier-ignore
  const gameType = props.gameType || "Retail";
  const messageOfTheDay = {
    "Retail": [
      "-> THIS IS THE TEST VERSION OF QE LIVE. Results and tools in general may not be stable.",
  ],
  "Classic": [""]
  }
;

  return (
    <Paper elevation={0} style={{ border: "1px", borderStyle: "solid", padding: 16, borderColor: "goldenrod" }}>
      <Grid container spacing={1}>
        {messageOfTheDay[gameType].map((key, i) => (
          <Grid item xs={12} key={i}>
            <Typography style={{ lineHeight: "11px" }} align="left" variant="body1" key={i}>
              {key}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
