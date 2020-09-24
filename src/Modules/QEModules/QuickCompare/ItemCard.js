import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 350,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ItemCard(props) {
  const classes = useStyles();

  const test = false;

  // change test to props.socket (true/false)
  const socket = test ? <img width={15} height={15} /> : null;
  const stat1 = test ? props.stat1 : null;
  const stat2 = test ? props.stat2 : null;
  const tertiary = test ? props.tertiary : null;
  const effect = test ? props.effect : null;

  return (
    <Card className={classes.root} variant="outlined">
      {/* // disabled disables..the card action area, i.e selecting items would have it as false, if no selection required then true */}
      <CardActionArea disabled={false}>
        <Grid container spacing={1} display="block" wrap="nowrap">
          <Grid item xs="auto">
            <CardContent style={{ padding: 10 }}>
              <img width={56} height={56} />

              <Typography
                variant="body2"
                component="p"
                style={{ textAlign: "center" }}
              >
                Ilvl - {props.ilvl}
              </Typography>
            </CardContent>
          </Grid>
          <CardContent style={{ padding: 10 }}>
            <Grid
              item
              container
              display="block"
              direction="column"
              xs="auto"
              spacing={1}
            >
              <Grid
                container
                item
                style={{ minHeight: 64 }}
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    variant="h6"
                    component="h2"
                    wrap="nowrap"
                    display="block"
                    align="center"
                  >
                    {props.item.name}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                item
                container
                display="block"
                direction="column"
                xs="auto"
                spacing={1}
                justify="flex-end"
              >
                <Grid item>
                  <Typography variant="body2" component="p" align="center">
                    {socket} {stat1} / {stat2} / {tertiary} / {effect}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </CardActionArea>
    </Card>
  );
}