import { Grid, Paper, Typography } from "@mui/material";

export default function MessageOfTheDay({ gameType = "Retail" }) {
  //prettier-ignore
  const messageOfTheDay: string[] = gameType === "Retail" ?
   [
    "Prepatch support next week will be limited as usual. Full support will return for Midnight."
  ] : 
  [
    "Please report any bugs you find to the QE Live Discord.",
  ]
;
  if (messageOfTheDay.length === 0) return;
  return (
    
  <div style={{ position: "relative", paddingTop: "12px" }}>
    <div
      style={{
        position: "absolute",
        top: "0.2em",
        left: 16,
        backgroundColor: "#424242", 
        padding: "0 4px",
        fontWeight: "bold",
        color: "#EFB73E",
        fontSize: "0.9rem",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
      The Latest
    </div>

    <Paper
      elevation={0}
      style={{
        border: "1.5px solid goldenrod",
        borderRadius: "5px",
        padding: "16px 20px"
      }}
        
    >
      <Grid container spacing={1}>
        {messageOfTheDay.map((key, i) => (
          <Grid item xs={12} key={i}>
            <Typography style={{ lineHeight: "16px" }} align="left" variant="body1">
              {key}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  </div>
  );
}
