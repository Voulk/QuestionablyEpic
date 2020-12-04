import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  IconButton,
} from "@material-ui/core";
import {
  getTranslatedItemName,
  buildStatString,
  getItemIcon,
} from "../Engine/ItemUtilities";
import "./MiniItemCard.css";
import DeleteIcon from "@material-ui/icons/Delete";
import socketImage from "../../Images/Resources/EmptySocket.png";
import { useTranslation } from "react-i18next";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    borderRadius: 1,
    borderColor: "grey",
    borderRadius: "5px",
  },
  selected: {
    minWidth: 200,
    borderRadius: 3,
    borderColor: "Green",
    borderRadius: "5px",
    backgroundColor: "#424E42"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 10,
  },
});

export default function ItemCard(props) {
  const classes = useStyles();
  const item = props.item;
  const statString = buildStatString(item.stats, item.effect);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemLevel = item.level;

  const itemQuality = (itemLevel) => {
    if (itemLevel >= 183) return "#a73fee";
    else if (itemLevel >= 120) return "#328CE3";
    else return "#1eff00";
  };

  const activateItemCard = () => {
      console.log("Activating item with Hash: " + item.uniqueHash)
    props.activateItem(item.uniqueHash);
  };

  const upgradeColor = (num) => {
    if (num > 0) {
      return "#FFDF14"; // #60e421
    } else if (num < 0) {
      return "#ad2c34";
    } else {
      return "#fff";
    }
  };

  let itemName = "";
  const deleteActive = item.offhandID === 0;

  if (item.offhandID > 0) {
    itemName =
      getTranslatedItemName(item.id, currentLanguage) +
      " & " +
      getTranslatedItemName(item.offhandID, currentLanguage);
  } else {
    itemName = getTranslatedItemName(item.id, currentLanguage);
  }

  const socket = props.item.socket ? (
    <div style={{ display: "inline" }}>
      <img
        src={socketImage}
        width={15}
        height={15}
        style={{ verticalAlign: "middle" }}
        alt="Socket"  
      />{" "}
      
    </div>
  ) : null;

  const tertiary =
    props.item.tertiary !== "" ? (
      <div style={{ display: "inline" }}> / {props.item.tertiary} </div>
    ) : null;

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Card className={item.active ? classes.selected : classes.root} variant="outlined">
        <CardActionArea onClick={activateItemCard}> 
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
                padding: "2px 2px 0.4px 2px",
                display: "inline-flex",
              }}
            >
              <div className="container-ItemCards">
                <img
                  alt="img"
                  width={44}
                  height={44}
                  src={getItemIcon(item.id)}
                  style={{
                    borderRadius: 4,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: itemQuality(itemLevel),
                  }}
                />
                <div className="bottom-right-ItemCards"> {item.level} </div>
              </div>
            </CardContent>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <CardContent style={{ padding: 2, width: "100%" }}>
            <Grid
              item
              container
              display="inline"
              direction="column"
              justify="space-around"
              xs="auto"
            >
              <Grid
                container
                item
                wrap="nowrap"
                justify="space-between"
                alignItems="center"
                style={{ width: "100%" }}
              >
                <Grid item xs={11} display="inline">
                  <Typography
                    variant="subtitle2"
                    wrap="nowrap"
                    display="inline"
                    align="left"
                    style={{ color: itemQuality(itemLevel) }}
                  >
                    {itemName}
                  </Typography>
                </Grid>

              </Grid>
              <Divider />
              <Grid
                item
                container
                display="inline"
                direction="row"
                xs="auto"
                justify="space-between"
              >
                <Grid item xs={11}>
                  <Typography
                    variant="subtitle2"
                    wrap="nowrap"
                    display="block"
                    align="left"
                    style={{fontSize: '12px'}}
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
