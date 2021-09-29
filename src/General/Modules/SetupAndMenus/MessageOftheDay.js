import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

export default function MessageOfTheDay(props) {
  //prettier-ignore
  const gameType = props.gameType || "Retail";
  const messageOfTheDay = {
    "Retail": [
      "The new Domination Gem Panel is now live!",
  ],
  "BurningCrusade": ["Enjoy SSC / TK!"]
  }
;

  return (
    <Paper elevation={0} style={{ border: "1px", padding: 16 }}>
      <Grid container spacing={1}>
        {messageOfTheDay[gameType].map((key, i) => (
          <Grid item xs={12} key={i}>
            <Typography style={{ lineHeight: "10px" }} align="left" variant="body1" key={i}>
              {key}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
