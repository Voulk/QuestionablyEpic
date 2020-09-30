import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {
  getTranslatedItemName,
  buildStatString,
  getItemIcon,
} from "../Player/PlayerUtilities";
import "./ItemCard.css";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import socketImage from "../../../Images/Resources/EmptySocket.png";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
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
        return "#328CE3"; // Previously #0070dd
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

  const socket =
    props.item.socket === "Yes" ? (
      <div style={{ display: "inline" }}>
        <img
          src={socketImage}
          width={15}
          height={15}
          style={{ verticalAlign: "middle" }}
        />{" "}
        /
      </div>
    ) : null;

  const tertiary =
    props.item.tertiary !== "None" ? (
      <div style={{ display: "inline" }}> / {props.item.tertiary} </div>
    ) : null;

  return (
    <Grid item xs={4}>
      <Card className={classes.root} variant="outlined">
        {/* <CardActionArea disabled={true}> */}
        <Grid
          container
          display="inline-flex"
          wrap="nowrap"
          justify="space-between"
        >
          <Grid item xs="auto">
            <CardContent
              style={{
                padding: "4.5px 4.5px 0.5px 4.5px",
                display: "inline-flex",
              }}
            >
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
          <CardContent style={{ padding: 4, width: "100%" }}>
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
                <Grid item xs={11} display="inline-flex">
                  <Typography
                    variant="subtitle1"
                    wrap="nowrap"
                    display="inline-flex"
                    align="left"
                    style={{ color: itemQuality("Uncommon") }}
                  >
                    {getTranslatedItemName(item.id, props.lang)}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  justify="flex-end"
                  style={{ display: "inline-flex" }}
                >
                  <Divider orientation="vertical" flexItem />
                  <Typography
                    variant="subtitle1"
                    wrap="nowrap"
                    display="inline-flex"
                    align="right"
                    style={{
                      color: upgradeColor(props.item.softScore),
                      paddingLeft: "4px",
                    }}
                  >
                    {props.item.softScore}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                item
                container
                display="inline-flex"
                direction="row"
                xs="auto"
                justify="space-between"
              >
                <Grid item xs={11}>
                  <Typography
                    variant="subtitle1"
                    wrap="nowrap"
                    display="block"
                    align="left"
                  >
                    {socket} {statString} {tertiary}
                  </Typography>
                </Grid>

                <Grid item xs={1} display="inline-flex" justify="flex-end" align="right"
>
                  <IconButton aria-label="delete" size="small" >
                    <DeleteIcon
                      style={{ color: "#ad2c34", paddingTop: 2 }}
                      fontSize="small"
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        {/* </CardActionArea> */}
      </Card>
    </Grid>
  );
}