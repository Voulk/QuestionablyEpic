import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Grid, Divider, IconButton } from "@material-ui/core";
import { getTranslatedItemName, buildStatString, getItemIcon } from "../Engine/ItemUtilities";
import "./ItemCard.css";
import DeleteIcon from "@material-ui/icons/Delete";
import socketImage from "../../Images/Resources/EmptySocket.png";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  vault: {
    borderColor: "#0288d1",
    backgroundColor: "#464E5B",
    borderStyle: "dashed",
    minWidth: 250,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  selected: {
    minWidth: 250,
    borderRadius: 3,
    borderColor: "Goldenrod",
    backgroundColor: "#494a3d",
    borderWidth: "2px",
  },
  selectedVault: {
    borderColor: "Goldenrod",
    backgroundColor: "#494a3d",
    minWidth: 250,
    borderStyle: "dashed",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// const useStyles = makeStyles({
//   root: {
//     minWidth: 200,
//     borderRadius: 3,
//     borderColor: "grey",
//     borderWidth: "1px",
//   },

//   vault: {
//     borderColor: "#0288d1",
//     minWidth: 200,
//     borderStyle: "dashed",
//   },

//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: 12,
//   },
//   pos: {
//     marginBottom: 10,
//   },
// });

export default function ItemCard(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const item = props.item;
  const currentLanguage = i18n.language;
  const statString = buildStatString(item.stats, item.effect, currentLanguage);
  const itemLevel = item.level;
  const isLegendary = "effect" in item && item.effect.type === "spec legendary";

  const itemQuality = (itemLevel) => {
    if (isLegendary) return "#ff8000";
    else if (itemLevel >= 183) return "#a73fee";
    else if (itemLevel >= 120) return "#328CE3";
    else return "#1eff00";
  };

  const deleteItemCard = () => {
    props.delete(item.uniqueHash);
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
  let itemName2 = "";
  let isVault = item.vaultItem;
  const deleteActive = item.offhandID === 0;

  if (item.offhandID > 0) {
    itemName = getTranslatedItemName(item.id, currentLanguage);
    itemName2 = getTranslatedItemName(item.offhandID, currentLanguage);
    //console.log(item);
  } else {
    if (isLegendary) itemName = item.effect.name;
    else itemName = getTranslatedItemName(item.id, currentLanguage);
  }

  const socket = props.item.socket ? (
    <div style={{ display: "inline" }}>
      <img src={socketImage} width={15} height={15} style={{ verticalAlign: "middle" }} alt="Socket" />{" "}
    </div>
  ) : null;

  const tertiary = props.item.tertiary !== "" ? <div style={{ display: "inline" }}> / {props.item.tertiary} </div> : null;

  console.log(item)

  // If item.offHandID > 0 then return this card which handles the double names + stats
  if (item.offhandID > 0) {
    return (
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <Card className={item.isEquipped && isVault ? classes.selectedVault : item.isEquipped ? classes.selected : isVault ? classes.vault : classes.root} variant="outlined">
          <Grid container display="inline-flex" wrap="nowrap" justify="space-between">
            <Grid item xs="auto">
              <CardContent
                style={{
                  padding: "4.5px 4.5px 0.5px 4.5px",
                  display: "inline-flex",
                }}
              >
                <div className="container-ItemCards">
                  <img
                    alt="img"
                    width={56}
                    height={56}
                    src={getItemIcon(item.offhandID)}
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: itemQuality(itemLevel),
                      position: "absolute",
                    }}
                  />
                  <img
                    className="et_pb_image.diagonal-overlay"
                    alt="img"
                    width={56}
                    height={56}
                    src={getItemIcon(item.id)}
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: itemQuality(itemLevel),
                      WebkitClipPath: "polygon(0 0, 0% 100%, 100% 0)",
                      clipPath: "polygon(0 0, 0% 100%, 100% 0)",
                    }}
                  />
                  <div className="bottom-right-ItemCards"> {item.level} </div>
                </div>
              </CardContent>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <CardContent style={{ padding: 4, width: "100%" }}>
              <Grid item container display="inline" direction="column" justify="space-around" xs="auto">
                <Grid container item wrap="nowrap" justify="space-between" alignItems="center" style={{ width: "100%" }}>
                  <Grid item xs={10} display="inline">
                    <Typography variant={itemName.length > 30 ? "subtitle2" : "subtitle1"} wrap="nowrap" style={{ display: "inline-flex" }} align="left">
                      <div style={{ color: itemQuality(item.mainHandLevel) }}>{itemName}</div>
                      <div style={{ paddingLeft: 6 }}>{" - " + item.mainHandLevel}</div>
                      {item.mainHandTertiary !== "" ? <div style={{ paddingLeft: 6 }}>{item.mainHandTertiary}</div> : ""}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      paddingLeft: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      wrap="nowrap"
                      display="inline"
                      align="center"
                      style={{
                        color: upgradeColor(props.item.softScore),
                        paddingLeft: "3px",
                        paddingRight: "3px",
                      }}
                    >
                      {Math.round(props.item.softScore)}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item xs={10}>
                  <Typography variant={itemName2.length > 30 ? "subtitle2" : "subtitle1"} wrap="nowrap" style={{ display: "inline-flex" }} align="left">
                    <div style={{ color: itemQuality(item.offHandLevel) }}>{itemName2}</div>
                    <div style={{ paddingLeft: 6 }}>{" - " + item.offHandLevel}</div>
                    {item.offHandTertiary !== "" ? <div style={{ paddingLeft: 6 }}>{item.offHandTertiary}</div> : ""}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Card className={item.isEquipped && isVault ? classes.selectedVault : item.isEquipped ? classes.selected : isVault ? classes.vault : classes.root} variant="outlined">
        <Grid container display="inline-flex" wrap="nowrap" justify="space-between">
          <Grid item xs="auto">
            <CardContent
              style={{
                padding: "4.5px 4.5px 0.5px 4.5px",
                display: "inline-flex",
              }}
            >
              <div className="container-ItemCards">
                <a data-wowhead={item.slot === "Trinket" ? "item=" + item.id + "&" + "ilvl=" + item.level + "&bonus=" + item.bonusIDS + "&domain=" + currentLanguage : ""}>
                  <img
                    alt="img"
                    width={56}
                    height={56}
                    src={getItemIcon(item.id)}
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: itemQuality(itemLevel),
                    }}
                  />
                </a>
                <div className="bottom-right-ItemCards"> {item.level} </div>
              </div>
            </CardContent>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <CardContent style={{ padding: 4, width: "100%" }}>
            <Grid item container display="inline" direction="column" justify="space-around" xs="auto">
              <Grid container item wrap="nowrap" justify="space-between" alignItems="center" style={{ width: "100%" }}>
                <Grid item xs={10} display="inline">
                  <Typography variant={itemName.length > 30 ? "subtitle2" : "subtitle1"} wrap="nowrap" display="inline" align="left" style={{ color: itemQuality(itemLevel) }}>
                    {itemName}
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    paddingLeft: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    wrap="nowrap"
                    display="inline"
                    align="center"
                    style={{
                      color: upgradeColor(props.item.softScore),
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    {Math.round(props.item.softScore)}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid item container display="inline" direction="row" xs="auto" justify="space-between">
                <Grid item xs={11}>
                  <Typography variant="subtitle2" wrap="nowrap" display="block" style={{ paddingTop: "4px" }} align="left">
                    {socket} {statString} {tertiary} {isVault ? " / " + t("itemTags.greatvault") : ""}
                  </Typography>
                </Grid>

                <Grid item xs={1} display="inline-flex" align="center">
                  {deleteActive ? (
                    <IconButton onClick={deleteItemCard} aria-label="delete" size="small">
                      <DeleteIcon style={{ color: "#ad2c34", paddingTop: 2 }} fontSize="small" />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
}
