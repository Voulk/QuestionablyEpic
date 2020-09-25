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
import {
  getTranslatedItemName,
  buildStatString,
  getItemIcon,
} from "../Player/PlayerUtilities";

const icons = require.context("../../../../public/Images/Items", true);

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
  const item = props.item;
  const statString = buildStatString(item.stats);
  console.log(Object.keys(props.item.stats).map((key) => key));
  const test = false;

  const itemQuality = (quality) => {
    switch (quality) {
      case "Legendary":
        return "#ff8000";
        break;
      case "Epic":
        return "#a335ee";
        break;
      case "Uncommon":
        return "#0070dd";
        break;
      case "Common":
        return "#1eff00";
        break;
      default:
        return "#fff";
    }
  };

  // change test to props.socket (true/false)
  const socket = test ? <img width={15} height={15} /> : null;

  return (
    <Grid item xs={4}>
      <Card className={classes.root} variant="outlined">
        <CardActionArea disabled={false}>
          <Grid container display="inline-flex" wrap="nowrap">
            <Grid item xs="auto" justify="space-between">
              <CardContent style={{ padding: "8.5px", display: "inline-flex" }}>
                <img
                  src={getItemIcon(item.id)}
                  width={56}
                  height={56}
                  style={{
                    borderRadius: 4,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: itemQuality("Uncommon"),
                  }}
                />
              </CardContent>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <CardContent style={{ padding: 8, width: "100%" }}>
              <Grid
                item
                container
                display="inline-flex"
                direction="column"
                justify="space-around"
                xs="auto"
              >
                <Grid
                  container
                  item
                  // style={{ minHeight: 64 }}
                  alignItems="center"
                  style={{ width: "100%" }}
                >
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      component="subtitle1"
                      wrap="nowrap"
                      display="block"
                      align="left"
                      style={{ color: itemQuality("Uncommon") }}
                    >
                      {getTranslatedItemName(item.id, props.lang)}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid
                  item
                  container
                  display="inline-flex"
                  direction="column"
                  xs="auto"
                  // justify="flex-end"
                >
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      component="subtitle1"
                      wrap="nowrap"
                      display="block"
                      align="left"
                    >
                      Ilvl {item.level} / {socket} {statString}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
}