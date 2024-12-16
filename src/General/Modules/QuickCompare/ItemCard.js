import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Card, CardContent, Typography, Grid, Divider, IconButton, Tooltip } from "@mui/material";
import { getTranslatedItemName, buildStatString, getItemIcon, getPrimordialImage } from "../../Engine/ItemUtilities";
import { buildPrimGems } from "../../Engine/InterfaceUtilities";
import "./ItemCard.css";
import socketImage from "../../../Images/Resources/EmptySocket.png";
import blueSocket from "../../../Images/Resources/socketBlue.png"
import redSocket from "../../../Images/Resources/socketRed.png"
import yellowSocket from "../../../Images/Resources/socketYellow.png"
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ItemCardButtonWithMenu from "../1. GeneralComponents/ItemCardButtonWithMenu";

import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    height: 52,
  },
  vault: {
    borderColor: "#0288d1",
    backgroundColor: "#464E5B",
    borderStyle: "dashed",
    minWidth: 250,
    height: 52,
  },
  catalyst: {
    borderColor: "plum",
    backgroundColor: "#5c4755",
    borderStyle: "dashed",
    minWidth: 250,
    height: 52,
  },
  selected: {
    minWidth: 250,
    borderRadius: 3,
    //borderColor: "Goldenrod",
    //backgroundColor: "#494a3d",
    borderWidth: "1px",
    height: 52,
  },
  selectedVault: {
    borderColor: "Goldenrod",
    backgroundColor: "#494a3d",
    minWidth: 250,
    borderStyle: "dashed",
    height: 52,
  },
  offspec: {
    borderColor: "red",
    backgroundColor: "#544444",
    borderStyle: "solid",
    minWidth: 250,
    height: 52,
  }
});

function getSockets(item, gameType)  {
  let socket = [];
  // Retail sockets: 1-3 Prismatic gems
  if (gameType === "Retail") {
    if (item.id === 228411) {
      const gemData = buildPrimGems([228639, 228638, 228640])
      socket = gemData.socket;
    }
    if (item.socket) {
      for (let i = 0; i < item.socket; i++) {
        socket.push(
          <div style={{ marginRight: 4, display: "inline" }}>
            <img src={socketImage} width={15} height={15} alt="Socket" />
          </div>,
        );
      }
    }
  }
  else if (gameType === "Classic") {
    // We probably want some way to tell them what we actually socketed but maybe we'll use tooltip for that.
    if (item.classicSockets) {
      for (let i = 0; i < item.classicSockets.length; i++) {
        const color = item.classicSockets[i];
        let sock = null;
        if (color === "blue") sock = blueSocket;
        else if (color === "red") sock = redSocket;
        else if (color === "yellow") sock = yellowSocket;
        else if (color === "meta") sock = socketImage;
        else if (color === "prismatic") sock = socketImage;
        socket.push(
          <div style={{ marginRight: 4, display: "inline" }}>
            <img src={sock} width={15} height={15} alt="Socket" />
          </div>,
        );
      }
    }
  }

  return <div style={{ verticalAlign: "middle" }}>{socket}</div>;
}

export default function ItemCard(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const item = props.item;

  const itemKey = props.key;
  const statString = buildStatString(item.stats, item.effect, currentLanguage);
  const isLegendary = false; //"effect" in item && (item.effect.type === "spec legendary" || item.effect.type === "unity");
  const isCatalystItem = item.isCatalystItem;
  const gameType = useSelector((state) => state.gameType);
  const itemQuality = item.getQualityColor();
  let itemName = "";
  let itemName2 = "";
  let isVault = item.vaultItem;
  const deleteActive = item.offhandID === 0;
  const wowheadDom = (gameType === "Classic" ? "cata" : currentLanguage);
  let gemString = gameType === "Retail" && item.gemString ? "&gems=" + item.gemString : "";
  const catalyst = isCatalystItem ? <div style={{ fontSize: 10, lineHeight: 1, color: "plum" }}>{t("Catalyst")}</div> : null;
  const tier = item.isTierPiece() ? <div style={{ fontSize: 10, lineHeight: 1, color: "yellow" }}>{t("Tier")}</div> : null;
  const tertiary = "leech" in item.stats && item.stats.leech !== 0 ? <div style={{ fontSize: 10, lineHeight: 1, color: "lime" }}>{t("Leech")}</div> : null;
  let socket = getSockets(item, gameType);

  const className = item.flags.includes('offspecWeapon') ? 'offspec' : item.isEquipped && isVault ? 'selectedVault' : item.isEquipped ? 'selected' : isVault ? 'vault' : 'root';

  /*
  const socket = item.socket ? (
    <div style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }}>
      <img src={socketImage} width={15} height={15} alt="Socket" />
    </div>
  ) : null; */

  const deleteItemCard = () => {
    props.delete(item.uniqueHash);
  };

  const catalyseItemCard = () => {
    props.catalyze(item);
  };

  if (item.offhandID > 0) {
    itemName = getTranslatedItemName(item.id, currentLanguage, "", gameType);
    itemName2 = getTranslatedItemName(item.offhandID, currentLanguage, "", gameType);
  } else {
    if (isLegendary) itemName = item.effect.name;
    else itemName = getTranslatedItemName(item.id, currentLanguage, "", gameType);
  }

  // If item.offHandID > 0 then return this card which handles the double names + stats
  if (item.offhandID > 0) {
    return (
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <Card className={classes[className]} variant="outlined">
          <Grid container display="inline-flex" wrap="nowrap" justifyContent="space-between">
            <Grid item xs="auto">
              <CardContent
                style={{
                  padding: "2px 2px 0px 2px",
                  display: "inline-flex",
                }}
              >
                <div className="container-ItemCards">
                  <img
                    alt="img"
                    width={46}
                    height={46}
                    src={getItemIcon(item.offhandID, gameType)}
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: itemQuality,
                      position: "absolute",
                    }}
                  />
                  <div style={{ content: "", position: "absolute", borderTop: "1px solid", borderColor: itemQuality, width: "65.05px", transform: "rotate(135deg)", transformOrigin: "23px 11px" }} />

                  <img
                    className="et_pb_image.diagonal-overlay"
                    alt="img"
                    width={46}
                    height={46}
                    src={getItemIcon(item.id, gameType)}
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: itemQuality,
                      WebkitClipPath: "polygon(0 0, 0% 100%, 100% 0)",
                      clipPath: "polygon(0 0, 0% 100%, 100% 0)",
                    }}
                  />
                  <div className="top-left-ItemCards-QC">{item.mainHandLevel}</div>
                  <div className="bottom-right-ItemCards-QC">{item.offHandLevel}</div>
                </div>
              </CardContent>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <CardContent style={{ padding: 0, width: "100%" }}>
              <Grid item container display="inline" direction="column" justifyContent="space-around" xs="auto">
                <Grid container item wrap="nowrap" justifyContent="space-between" alignItems="center" style={{ width: "100%" }}>
                  <Grid item xs={10} display="inline">
                    <Typography variant="subtitle2" wrap="nowrap" style={{ display: "block", marginLeft: 4 }} align="left">
                      <div style={{ color: itemQuality, lineHeight: item.mainHandTertiary ? "normal" : 1.57 }}>{itemName}</div>
                      {item.mainHandTertiary !== "" ? <div style={{ fontSize: 10, lineHeight: 1, color: "lime" }}>{item.mainHandTertiary}</div> : ""}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
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
                      {Math.round(item.softScore)}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item xs={10}>
                  <Typography variant="subtitle2" wrap="nowrap" style={{ display: "block", marginLeft: 4 }} align="left">
                    <div style={{ color: itemQuality, lineHeight: item.offHandTertiary ? "normal" : 1.57 }}>{itemName2}</div>
                    {item.offHandTertiary !== "" ? <div style={{ fontSize: 10, lineHeight: 1, color: "lime" }}>{item.offHandTertiary}</div> : ""}
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
                itemLevel={item.level}
                upgradeItem={props.upgradeItem}
                embellishItem={props.embellishItem}
                item={item}
                gameType={gameType}

              />
            </Grid>
          </Grid>
        </div>
        <Card
          className={classes[className]}
          variant="outlined"
        >
          <Grid container display="inline-flex" wrap="nowrap" justifyContent="space-between">
            <Grid item xs="auto">
              <CardContent
                style={{
                  padding: "2px 2px 0px 2px",
                  display: "inline-flex",
                }}
              >
                <div className="container-ItemCards">
                  <WowheadTooltip type="item" id={item.id} level={item.level} gems={gemString} bonusIDS={item.bonusIDS} domain={wowheadDom}>
                    <img
                      alt="img"
                      width={46}
                      height={46}
                      src={getItemIcon(item.id, gameType)}
                      style={{
                        borderRadius: 4,
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: itemQuality,
                      }}
                    />
                  </WowheadTooltip>
                  <div style={{ position: "absolute", bottom: "4px", right: "4px", fontWeight: "bold", fontSize: "12px", textShadow: "1px 1px 4px black" }}> {item.level} </div>
                </div>
              </CardContent>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <CardContent style={{ padding: 0, width: "100%" }}>
              <Grid item container display="inline" direction="column" justifyContent="space-around" xs="auto">
                <Grid container item wrap="nowrap" justifyContent="space-between" alignItems="center" style={{ width: "100%" }}>
                  <Grid item xs={10} display="inline">
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
                  <Divider orientation="vertical" flexItem />
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
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
                      {Math.round(item.softScore)}
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
        </Card>
      </div>
    </Grid>
  );
}
