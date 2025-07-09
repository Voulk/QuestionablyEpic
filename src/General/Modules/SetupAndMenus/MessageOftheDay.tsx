import { Grid, Paper, Typography } from "@mui/material";

export default function MessageOfTheDay(gameType: gameTypes = "Retail") {
  //prettier-ignore
  const messageOfTheDay: string[] = gameType === "Retail" ?
   [
    "For Dinar advice, cross reference with your favorite guide. Dinars are at least partially a longer-term decision and taking your best immediate upgrade is not guaranteed to be your best overall selection."
  ] : 
  [
    "Mists of Pandaria is in a Beta state. Please report any bugs you find to the QE Live Discord.",
  ]
;
  if (messageOfTheDay.length === 0) return;
  return (
    
    <Paper elevation={0} style={{ border: "1px", borderStyle: "solid", padding: 16, borderColor: "goldenrod" }}>
      <Grid container spacing={1}>
        {messageOfTheDay.map((key, i) => (
          <Grid item xs={12} key={i}>
            <Typography style={{ lineHeight: "16px" }} align="left" variant="body1" key={i}>
              {key}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
