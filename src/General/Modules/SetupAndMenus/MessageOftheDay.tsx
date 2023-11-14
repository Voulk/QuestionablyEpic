import { Grid, Paper, Typography } from "@mui/material";

export default function MessageOfTheDay() {
  //prettier-ignore
  const messageOfTheDay: string[] = [
      "-> Expect changes through the week. Amirdrassil tier sets will be in with season release.",
  ]
;

  return (
    <Paper elevation={0} style={{ border: "1px", borderStyle: "solid", padding: 16, borderColor: "red" }}>
      <Grid container spacing={1}>
        {messageOfTheDay.map((key, i) => (
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
