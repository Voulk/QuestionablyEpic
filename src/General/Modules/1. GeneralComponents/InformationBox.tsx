import { Grid, Paper, Typography } from "@mui/material";

// Could add an optional color here too.
export default function InformationBox(props: { information: string, variant?: string }) {
  //prettier-ignore
  let boxColor = "goldenrod"
  let backgroundColor = "#424242"

  // Variants
  if (props.variant === "brick") {
    boxColor = "firebrick";
    backgroundColor = "#6B4242";
  }
  else if (props.variant === "yellow") {
    boxColor = "goldenrod";
    backgroundColor = "#685C42";
  }


  return (
    <Paper elevation={0} style={{ border: "1px", borderStyle: "solid", padding: 15, borderColor: boxColor, backgroundColor: backgroundColor, width: "100%" }}>
      <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography style={{ lineHeight: "18px" }} align="left" variant="body1">
              {props.information}
            </Typography>
          </Grid>
      </Grid>
    </Paper>
  );
}
