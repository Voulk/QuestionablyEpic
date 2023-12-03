import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Card, CardContent, Typography, Grid, Divider, IconButton, Tooltip } from "@mui/material";
import { getTranslatedItemName, buildStatString, getItemIcon } from "../../Engine/ItemUtilities";
import { buildPrimGems } from "../../Engine/InterfaceUtilities";
import "./MiniItemCard.css";
import socketImage from "../../../Images/Resources/EmptySocket.png";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CardActionArea from "@mui/material/CardActionArea";
import ItemCardButtonWithMenu from "../1. GeneralComponents/ItemCardButtonWithMenu";
import { Difference } from "@mui/icons-material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";


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
  offspec: {
    borderColor: "red",
    backgroundColor: "#544444",
    borderStyle: "solid",
    minWidth: 250,
    height: 52,
  }
});

export default function ItemCard(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemKey = props.key;
  const item = props.item;
  const itemLevel = item.level;
  const statString = buildStatString(item.stats, item.effect, currentLanguage);
  const isLegendary = false; // "effect" in item && (item.effect.type === "spec legendary" || item.effect.type === "unity");
  const isCatalystItem = item.isCatalystItem;
  const gameType = useSelector((state) => state.gameType);
  const itemQuality = item.getQualityColor();
  const deleteActive = item.offhandID === 0;
  const tertiary = "leech" in item.stats && item.stats.leech !== 0 ? <div style={{ fontSize: 10, lineHeight: 1, color: "lime" }}>{t("Leech")}</div> : null;
  const tier = item.isTierPiece() ? <div style={{ fontSize: 10, lineHeight: 1, color: "yellow" }}>{t("Tier")}</div> : null;

  const catalyst = isCatalystItem ? <div style={{ fontSize: 10, lineHeight: 1, color: "plum" }}>{t("Catalyst")}</div> : null;

  let socket = [];
  const className = item.flags.includes('offspecWeapon') ? 'offspec' : item.active && item.vaultItem ? 'selectedVault' : item.active ? 'selected' : item.vaultItem ? 'vault' : 'root';


  // Onyx Annulet
  if (item.id === 203460) {
    const gemCombo = props.primGems;
    const gemData = buildPrimGems(gemCombo);
    socket = gemData.socket;
    //gemString = gemData.string;
  } else if (item.socket) {
    for (let i = 0; i < item.socket; i++) {
      socket.push(
        <div style={{ marginRight: 4, display: "inline" }}>
          <img src={socketImage} width={15} height={15} alt="Socket" />
        </div>,
      );
    }
    socket = <div style={{ verticalAlign: "middle" }}>{socket}</div>;
  }

  const activateItemCard = () => {
    props.activateItem(item.uniqueHash, item.active);
  };

  const deleteItemCard = () => {
    props.delete(item.uniqueHash);
  };

  const catalyseItemCard = () => {
    props.catalyze(item);
  };

  let itemName = "";
  let isVault = item.vaultItem;

  if (item.offhandID > 0) {
    itemName = getTranslatedItemName(item.id, currentLanguage, "", gameType) + " & " + getTranslatedItemName(item.offhandID, currentLanguage, "", gameType);
  } else {
    if (isLegendary) itemName = item.effect.name;
    else itemName = getTranslatedItemName(item.id, currentLanguage, "", gameType);
  }

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", right: 4, bottom: 2, zIndex: 1, padding: 0 }}>
          <Grid container display="inline-flex" wrap="nowrap" spacing={0} sx={{ verticalAlign: "middle" }}>
            <Grid item>
              <ItemCardButtonWithMenu
                key={itemKey}
                deleteActive={deleteActive}
                deleteItem={deleteItemCard}
                canBeCatalyzed={item.canBeCatalyzed()}
                catalyseItemCard={catalyseItemCard}
                itemLevel={itemLevel}
                upgradeItem={props.upgradeItem}
                item={item}
              />
            </Grid>
          </Grid>
        </div>
        <Card
          className={classes[className]}
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
                    <WowheadTooltip type={item.slot === "Trinket" ? "item" : "none"} id={item.id} level={itemLevel} bonusIDS={item.bonusIDS} domain={currentLanguage}>
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
                    </WowheadTooltip>
                    <div style={{ position: "absolute", bottom: "4px", right: "4px", fontWeight: "bold", fontSize: "12px", textShadow: "1px 1px 4px black" }}> {itemLevel} </div>
                  </div>
                </CardContent>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <CardContent style={{ padding: 0, width: "100%" }}>
                <Grid item container direction="column" justifyContent="space-around" xs="auto">
                  <Grid container item wrap="nowrap" justifyContent="space-between" alignItems="center" style={{ width: "100%" }}>
                    <Grid item xs={11} display="inline">
                      <Typography variant="subtitle2" wrap="nowrap" display="block" align="left" style={{ marginLeft: 4, padding: "1px 0px" }}>
                        <div
                          style={{
                            color: itemQuality,
                            lineHeight: tertiary || isVault || tier || catalyst ? "normal" : 1.57,
                          }}
                        >
                          {itemName}
                        </div>
                        {tertiary || isVault || tier || catalyst ? (
                          <div style={{ display: "flex" }}>
                            {tertiary}
                            {tertiary && isVault ? <div style={{ fontSize: 10, lineHeight: 1, marginLeft: 4, marginRight: 4 }}>{"/"}</div> : ""}
                            {isVault ? <div style={{ fontSize: 10, lineHeight: 1, color: "aqua" }}>{t("itemTags.greatvault")}</div> : ""}
                            {(tertiary && tier) || (isVault && tier) ? <div style={{ fontSize: 10, lineHeight: 1, marginLeft: 4, marginRight: 4 }}>{"/"}</div> : ""}
                            {tier}
                            {(tertiary && catalyst) || (isVault && catalyst) || (tier && catalyst) ? <div style={{ fontSize: 10, lineHeight: 1, marginLeft: 4, marginRight: 4 }}>{"/"}</div> : ""}
                            {catalyst}
                          </div>
                        ) : (
                          ""
                        )}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        visibility: "hidden",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        wrap="nowrap"
                        display="inline"
                        align="center"
                        style={{
                          color: "#FFDF14",
                          paddingLeft: "3px",
                          paddingRight: "3px",
                        }}
                      >
                        ""
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid item container xs={12} display="inline-flex" direction="row" justifyContent="space-between" style={{ marginTop: 2 }}>
                    <Grid item xs={11}>
                      <div style={{ display: "inline-flex", marginLeft: 4, height: 15, verticalAlign: "middle" }}>
                        {socket}
                        <Typography variant="subtitle2" wrap="nowrap" display="block" align="left" style={{ fontSize: "12px", lineHeight: "normal" }}>
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
