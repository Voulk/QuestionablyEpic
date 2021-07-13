import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

export default function MessageOfTheDay() {
  //prettier-ignore
  const messageOfTheDay = [
    "9.1: The Shadowed Orb & Titanic Ocular Gland buffs are live in all modules.",
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
