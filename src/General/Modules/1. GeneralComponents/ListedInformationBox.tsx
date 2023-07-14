import { Grid, Paper, Typography, ListItem, List, ListItemText } from "@mui/material";

// The listed Information Box is one that includes introduction text and then a list of strings.
export default function ListedInformationBox(props: { introText: string, bulletPoints: string[], color?: string }) {
console.log(props.bulletPoints);

return (
  <Paper elevation={0} style={{ border: "1px", borderStyle: "solid", padding: 16, borderColor: "goldenrod" }}>
    <Grid item xs={12}>
      <Typography style={{ color: "##fffff7", marginBottom: 0, width: "100%" }} align="left" variant="subtitle1" display="inline" paragraph>
        {props.introText}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      {props.bulletPoints.map((key, i) => (
          <List disablePadding dense={true} style={{ paddingTop: 0, paddingBottom: 0, margin: 0, listStyleType: 'disc' }}>
            <ListItem style={{ lineHeight: 1, margin: 0 }}>
              <ListItemText style={{ display: 'list-item'}} primary={key} />
            </ListItem>
          </List>
      ))}
      </Grid>
  </Paper>
);
}
