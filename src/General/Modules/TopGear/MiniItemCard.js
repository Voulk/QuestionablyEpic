import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Grid, Divider } from "@material-ui/core";
import { getTranslatedItemName, buildStatString, getItemIcon, getItemProp, getGemIcon } from "../../Engine/ItemUtilities";
import "./MiniItemCard.css";
// import DeleteIcon from "@material-ui/icons/Delete";
import socketImage from "../../../Images/Resources/EmptySocket.png";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CardActionArea from "@material-ui/core/CardActionArea";
import { dominationGemDB } from "../../../Databases/DominationGemDB";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    borderRadius: 3,
    borderColor: "grey",
    borderWidth: "1px",
  },
  selected: {
    minWidth: 200,
    borderRadius: 3,
    borderColor: "Goldenrod",
    backgroundColor: "#494a3d",
    borderWidth: "2px",
  },
  vault: {
    borderColor: "#0288d1",
    minWidth: 200,
    borderStyle: "dashed",
  },
  selectedVault: {
    borderColor: "Goldenrod",
    backgroundColor: "#494a3d",
    minWidth: 200,
    borderStyle: "dashed",
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
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const item = props.item;
  const statString = buildStatString(item.stats, item.effect, currentLanguage);
  const itemLevel = item.level;
  const isLegendary = "effect" in item && item.effect.type === "spec legendary";
  const gameType = useSelector((state) => state.gameType);
  const itemQuality = item.getQualityColor();

  // TODO: Items should track their own quality, and this function shouldn't be in ItemCard.
  /*
  const itemQuality = (itemLevel, itemID) => {
    if (gameType !== "Retail") {
      const quality = getItemProp(itemID, "quality", gameType)
      if (quality === 5) return "#ff8000";
      else if (quality === 4) return "#a73fee";
      else if (quality === 3) return "#328CE3";
      else if (quality === 2) return "#1eff00";
      else return "#ffffff";
    }
    else {
      if (isLegendary) return "#ff8000";
      else if (itemLevel >= 183) return "#a73fee";
      else if (itemLevel >= 120) return "#328CE3";
      else return "#1eff00";
    }
  };
  */

  const activateItemCard = () => {
    props.activateItem(item.uniqueHash, item.active);
  };

  let itemName = "";
  let isVault = item.vaultItem;
  // const deleteActive = item.offhandID === 0;

  if (item.offhandID > 0) {
    itemName = getTranslatedItemName(item.id, currentLanguage, "", gameType) + " & " + getTranslatedItemName(item.offhandID, currentLanguage, "", gameType);
  } else {
    if (isLegendary) itemName = item.effect.name;
    else itemName = getTranslatedItemName(item.id, currentLanguage, "", gameType);
  }

  const socket = props.item.socket ? (
    <div style={{ display: "inline" }}>
      <img src={socketImage} width={15} height={15} style={{ verticalAlign: "middle" }} alt="Socket" />{" "}
    </div>
  ) : null;

  const tertiary = ('tertiary' in props.item && props.item.tertiary !== "") ? <div style={{ display: "inline" }}> / {props.item.tertiary} </div> : null;

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Card className={item.active && isVault ? classes.selectedVault : item.active ? classes.selected : isVault ? classes.vault : classes.root} elevation={0} variant="outlined">
        <CardActionArea onClick={activateItemCard}>
          <Grid container display="inline-flex" wrap="nowrap" justify="space-between">
            <Grid item xs="auto">
              <CardContent
                style={{
                  padding: "2px 2px 0px 2px",
                  display: "inline-flex",
                }}
              >
                <div className="container-MiniItemCards">
                  <a data-wowhead={item.slot === "Trinket" ? "item=" + item.id + "&" + "ilvl=" + item.level + "&bonus=" + item.bonusIDS + "&domain=" + currentLanguage : ""}>
                    <img
                      alt="img"
                      width={42}
                      height={42}
                      src={getItemIcon(item.id, gameType)}
                      style={{
                        borderRadius: 4,
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: itemQuality,
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
                  <Grid item xs={11} display="inline">
                    <Typography variant="subtitle2" wrap="nowrap" display="inline" align="left" style={{ color: itemQuality }}>
                      {itemName}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item container display="inline" direction="row" xs="auto" justify="space-between">
                  <Grid item xs={11}>
                    <Typography variant="subtitle2" wrap="nowrap" display="block" align="left" style={{ fontSize: "12px" }}>
                    {item.domGemID !== 0 ? (
                      <a data-wowhead={"item=" + item.domGemID + "&domain=" + currentLanguage}>
                        <img
                          style={{
                            height: 16,
                            width: 16,
                            margin: "0px 5px 0px 0px",
                            verticalAlign: "middle",
                            borderRadius: 4,
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                          }}
                          src={getGemIcon(item.domGemID)}
                          alt={dominationGemDB.filter((key) => key.id === item.domGemID).map((key) => key.name[currentLanguage])[0]}
                        />
                      </a>
                    ) : (
                      ""
                    )}
                      {socket} {statString} {tertiary} {isVault ? " / " + t("itemTags.greatvault") : ""}
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
