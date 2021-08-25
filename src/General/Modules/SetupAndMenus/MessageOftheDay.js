import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

export default function MessageOfTheDay(props) {
  //prettier-ignore
  const gameType = props.gameType;
  const messageOfTheDay = {
    "Retail": [
      "The new Domination Gem Panel is now live!",
      "QE Live will automatically select and socket gems for you."
  ],
  "BurningCrusade": ["Tier 5 / phase 2 support will go live shortly before the patch."]
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
