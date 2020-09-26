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
import "./ItemCard.css";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import RemoveIcon from "@material-ui/icons/Remove";

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

  const upgradeColor = (num) => {
    if (num > 0) {
      return "#4CBB17";
    } else if (num < 0) {
      return "#ad2c34";
    } else {
      return "#fff";
    }
  };

  const upgradeArrow = (num) => {
    if (num > 0) {
      return <KeyboardArrowUpIcon style={{ color: "#4CBB17" }} />;
    } else if (num > 0) {
      return <KeyboardArrowDownIcon style={{ color: "#ad2c34" }} />;
    } else {
      return <RemoveIcon style={{ color: "#fff" }} />;
    }
  };

  const socket = props.item.socket ? (
    <div style={{ display: "inline" }}>
      {" "}
      <img width={15} height={15} /> /{" "}
    </div>
  ) : null;

  const tertiary =
    props.item.tertiary !== "" ? (
      <div style={{ display: "inline" }}> / {props.item.tertiary} </div>
    ) : null;

  return (
    <Grid item xs={4}>
      <Card className={classes.root} variant="outlined">
        <CardActionArea disabled={false}>
          <Grid
            container
            display="inline-flex"
            wrap="nowrap"
            justify="space-between"
          >
            <Grid item xs="auto">
              <CardContent style={{ padding: "8.5px", display: "inline-flex" }}>
                <div className="container">
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
                  <div className="bottom-right"> {item.level} </div>
                </div>
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
                  justify="space-between"
                  alignItems="center"
                  style={{ width: "100%" }}
                >
                  <Grid item xs="auto" display="inline-f">
                    <Typography
                      variant="subtitle1"
                      // component="subtitle1"
                      wrap="nowrap"
                      display="inline-flex"
                      align="left"
                      style={{ color: itemQuality("Uncommon") }}
                    >
                      {getTranslatedItemName(item.id, props.lang)}
                    </Typography>
                  </Grid>
                  <Grid item xs="auto" style={{display:"inline-flex"}}>
                    <Typography
                      variant="subtitle1"
                      // component="subtitle1"
                      wrap="nowrap"
                      display="inline-flex"
                      align="Right"
                      style={{ color: upgradeColor(props.item.softScore) }}
                    >
                      {props.item.softScore}
                    </Typography>
                    {upgradeArrow(props.item.softScore)}
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
                  <Grid item style={{ marginTop: "4px" }}>
                    <Typography
                      variant="subtitle1"
                      // component="subtitle1"
                      wrap="nowrap"
                      display="block"
                      align="left"
                    >
                      {socket} {statString} {tertiary}
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