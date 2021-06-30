import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

export default function MessageOfTheDay() {
  //prettier-ignore
  const messageOfTheDay = [
    "- Expect ALL information to change as blizzard are making rapid hotfixes.",
    "- There are two very overtuned trinkets. These are likely to be nerfed before the raid opens.",
    "- The Upgrade Finder will return later this week.",
];

  return (
    <Paper elevation={0} style={{ border: "1px", padding: 16 }}>
      <Grid container spacing={1}>
        {messageOfTheDay.map((key, i) => (
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
