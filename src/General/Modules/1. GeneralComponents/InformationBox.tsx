import { Grid, Paper, Typography } from "@mui/material";

// Could add an optional color here too.
export default function InformationBox(props: { information: string, color?: string }) {
  //prettier-ignore
  const boxColor = props.color ? props.color : "goldenrod";
  return (
    <Paper elevation={0} style={{ border: "1px", borderStyle: "solid", padding: 16, borderColor: boxColor, width: "100%" }}>
      <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography style={{ lineHeight: "17px" }} align="left" variant="body1">
              {props.information}
            </Typography>
          </Grid>
      </Grid>
    </Paper>
  );
}
