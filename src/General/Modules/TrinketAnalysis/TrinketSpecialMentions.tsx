import { Grid, Paper, Typography } from "@mui/material";

// Has not yet been built.
export default function TrinketSpecialMentions(props: { information: string, variant?: string }) {
  //prettier-ignore
  let boxColor = "goldenrod"
  let backgroundColor = "#424242"
  const paragraphs = props.information.split('\n\n');

  // Variants
  if (props.variant === "brick") {
    boxColor = "firebrick";
    backgroundColor = "#6B4242";
  }
  else if (props.variant === "yellow") {
    boxColor = "goldenrod";
    backgroundColor = "#685C42";
  }
  else if (props.variant === "transparent") {
    boxColor = "goldenrod";
    backgroundColor = "rgba(104, 105, 20, 0.5)";
  }


  return (
    <Paper elevation={2} style={{ border: "1px solid", padding: 15, borderColor: boxColor, backgroundColor: backgroundColor, width: "100%" }}>
      <Grid container spacing={1}>
        {paragraphs.map((paragraph, index) => (
          <Grid item xs={12} key={index}>
            <Typography style={{ lineHeight: "18px" }} align="left" variant="body1">
              {paragraph}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
