import { Grid, Paper, Typography } from "@mui/material";

export default function MessageOfTheDay() {
  //prettier-ignore
  const messageOfTheDay: string[] = [
    "QE Live TWW is now available in a limited format. Note that changes are being made in-game every single day!"
  ]
;
  if (messageOfTheDay.length === 0) return;
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
