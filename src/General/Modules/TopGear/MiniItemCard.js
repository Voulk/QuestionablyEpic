import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Card, CardContent, Typography, Grid, Divider, IconButton, Tooltip } from "@mui/material";
import { getTranslatedItemName, buildStatString, getItemIcon, getItemProp, getGemIcon } from "../../Engine/ItemUtilities";
import "./MiniItemCard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import socketImage from "../../../Images/Resources/EmptySocket.png";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CardActionArea from "@mui/material/CardActionArea";
import { dominationGemDB } from "../../../Databases/DominationGemDB";
import { Difference } from "@mui/icons-material";

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
  catalyst: {
    borderColor: "plum",
    backgroundColor: "#5c4755",
    borderStyle: "dashed",
    minWidth: 200,
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
  const isLegendary = "effect" in item && (item.effect.type === "spec legendary" || item.effect.type === "unity");
  const gameType = useSelector((state) => state.gameType);
  const itemQuality = item.getQualityColor();
  const deleteActive = item.offhandID === 0;

  const activateItemCard = () => {
    props.activateItem(item.uniqueHash, item.active);
  };

  const deleteItemCard = () => {
    props.delete(item.uniqueHash);
  };

  const catalyseItemCard = () => {
    // props.catalyse(item.uniqueHash);
  };

  const tertiaryStyle = (tertiary) => {
    if (tertiary === "Leech") {
      return "lime";
    } else if (tertiary === "Avoidance") {
      return "khaki";
    } else {
      return "#fff";
    }
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

  const tertiary =
    "tertiary" in props.item && props.item.tertiary !== "" ? <div style={{ fontSize: 10, lineHeight: 1, color: tertiaryStyle(props.item.tertiary) }}>{t(props.item.tertiary)}</div> : null;

  const tier = item.isTierPiece() ? <div style={{ fontSize: 10, lineHeight: 1, color: "yellow" }}>{t("Tier")}</div> : null;

  const socket = props.item.socket ? (
    <div style={{ display: "inline", verticalAlign: "middle", marginTop: tertiary || isVault || tier ? 0 : 2, marginRight: 4 }}>
      <img src={socketImage} width={15} height={15} alt="Socket" />
    </div>
  ) : null;

  const isCatalysable = true;
  const catalyst = isCatalysable ? <div style={{ fontSize: 10, lineHeight: 1, color: "plum" }}>{t("Catalyst")}</div> : null;

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", right: 4, bottom: 3, zIndex: 1, padding: 0 }}>
          <Grid container display="inline-flex" wrap="nowrap" spacing={0}>
            <Grid item>
              {isCatalysable ? (
                <Tooltip arrow title="Catalyse: Create a catalysed version of this item">
                  <IconButton sx={{ padding: 0 }} onClick={catalyseItemCard} aria-label="catalyse" size="small">
                    <Difference style={{ color: "plum" }} fontSize="small" />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </Grid>
            <Grid item>
              {deleteActive ? (
                <IconButton sx={{ padding: 0 }} onClick={deleteItemCard} aria-label="delete" size="small">
                  <DeleteIcon style={{ color: "#ad2c34" }} fontSize="small" />
                </IconButton>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </div>
        <Card
          className={item.active && isVault ? classes.selectedVault : item.active ? classes.selected : catalyst ? classes.catalyst : isVault ? classes.vault : classes.root}
          elevation={0}
          variant="outlined"
        >
          <CardActionArea onClick={activateItemCard}>
            <Grid container display="inline-flex" wrap="nowrap" justifyContent="space-between">
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
                        width={44}
                        height={44}
                        src={getItemIcon(item.id, gameType)}
                        style={{
                          borderRadius: 4,
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: itemQuality,
                        }}
                      />
                    </a>
                    <div style={{ position: "absolute", bottom: "4px", right: "4px", fontWeight: "bold", fontSize: "12px", textShadow: "1px 1px 4px black" }}> {item.level} </div>
                  </div>
                </CardContent>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <CardContent style={{ padding: 0, width: "100%" }}>
                <Grid item container direction="column" justifyContent="space-around" xs="auto">
                  <Grid item xs={12} display="inline">
                    <Typography variant="subtitle2" wrap="nowrap" display="block" align="left" style={{ marginLeft: 4, padding: "1px 0px" }}>
                      <div style={{ color: itemQuality, lineHeight: "normal" }}>{itemName}</div>
                      <div style={{ display: "flex" }}>
                        {tertiary}
                        {tertiary && isVault ? <div style={{ fontSize: 10, lineHeight: 1, marginLeft: 4, marginRight: 4 }}>{"/"}</div> : ""}
                        {isVault ? <div style={{ fontSize: 10, lineHeight: 1, color: "aqua" }}>{t("itemTags.greatvault")}</div> : ""}
                        {(tertiary && tier) || (isVault && tier) ? <div style={{ fontSize: 10, lineHeight: 1, marginLeft: 4, marginRight: 4 }}>{"/"}</div> : ""}
                        {tier}
                        {(tertiary && catalyst) || (isVault && catalyst) || (tier && catalyst) ? <div style={{ fontSize: 10, lineHeight: 1, marginLeft: 4, marginRight: 4 }}>{"/"}</div> : ""}
                        {catalyst}
                      </div>
                    </Typography>
                  </Grid>
                  <Divider />
                  <Grid item container xs={12} display="inline-flex" direction="row" justifyContent="space-between" style={{ marginTop: 2 }}>
                    <Grid item xs={11}>
                      <div style={{ display: "inline-flex", marginLeft: 4 }}>
                        {socket}
                        <Typography variant="subtitle2" wrap="nowrap" display="block" align="left" style={{ fontSize: "12px", marginTop: 3, lineHeight: "normal" }}>
                          {statString}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </CardActionArea>
        </Card>
      </div>
    </Grid>
  );
}
