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
    backgroundColor: "#424E42",
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

export default function ItemCardReport(props) {
  const classes = useStyles();
  const item = props.item;
  const statString = buildStatString(item.stats, item.effect);
  const enchants = props.enchants;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemLevel = item.level;
  const isLegendary = "effect" in item && item.effect.type === "spec legendary";

  const itemQuality = (itemLevel) => {
    if (isLegendary) return "#ff8000";
    if (itemLevel >= 183) return "#a73fee";
    else if (itemLevel >= 120) return "#328CE3";
    else return "#1eff00";
  };

  const activateItemCard = () => {
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
    if (isLegendary) itemName = item.effect.name;
    // Add translations to this.
    else itemName = getTranslatedItemName(item.id, currentLanguage);
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

  const enchantCheck = (item) => {
    if (
      item.slot === "Chest" ||
      item.slot === "Wrist" ||
      item.slot === "Finger" ||
      item.slot === "Back" ||
      item.slot === "CombinedWeapon"
    ) {
      let typo = (
        <Typography
          variant="subtitle2"
          wrap="nowrap"
          display="block"
          align="left"
          style={{ fontSize: "12px", color: "#36ed21", paddingRight: 4 }}
        >
          {enchants[item.slot]}
        </Typography>
      );
      return typo;
    }

    return null;
  };

  const tertiary =
    props.item.tertiary !== "" ? (
      <div style={{ display: "inline" }}> / {props.item.tertiary} </div>
    ) : null;

  return (
    <Grid item xs={12}>
      <Card
        className={item.active ? classes.selected : classes.root}
        elevation={0}
        style={{ backgroundColor: "rgba(34, 34, 34, 0.52)" }}
      >
        <CardActionArea disbled={true}>
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
                  <Grid item xs={12} display="inline">
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
                  <Grid item xs={12} style={{ display: "contents" }}>
                    <Typography
                      variant="subtitle2"
                      wrap="nowrap"
                      display="block"
                      align="left"
                      style={{ fontSize: "12px" }}
                    >
                      {socket} {statString} {tertiary}
                    </Typography>
                    {enchantCheck(item)}
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
