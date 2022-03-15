import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

export default function MessageOfTheDay(props) {
  //prettier-ignore
  const gameType = props.gameType || "Retail";
  const messageOfTheDay = {
    "Retail": [
      "Raiders should prioritize Tier from the Great Vault.",
      "Holy Priest Tier & Legendary support coming soon.",
      "So'leah's hotfix nerfed in-game, and the change is live in QEL.",
  ],
  "BurningCrusade": ["Enjoy MH / BT!"]
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
