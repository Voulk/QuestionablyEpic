import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Card, CardContent, CardActionArea, Typography, Grid, Divider, Tooltip } from "@mui/material";
import { getTranslatedItemName, buildStatString, getItemIcon, getItemProp, getGemProp } from "../../Engine/ItemUtilities";
import { buildPrimGems } from "../../Engine/InterfaceUtilities";
import "./MiniItemCard.css";
import hasteSocket from "../../../Images/Resources/hasteSocket.jpg";
import critSocket from "../../../Images/Resources/critSocket.jpg";
import masterySocket from "../../../Images/Resources/masterySocket.jpg";
import versSocket from "../../../Images/Resources/versSocket.jpg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

const useStyles = makeStyles({
  root: {
    minWidth: 210,
    borderColor: "grey",
    borderRadius: "5px",
  },
  catalyst: {
    borderColor: "plum",
    backgroundColor: "#5c4755",
    borderStyle: "dashed",
    borderWidth: "1px",
    minWidth: 210,
  },
  vault: {
    borderColor: "#0288d1",
    backgroundColor: "#3E4651",
    minWidth: 210,
    borderStyle: "dashed",
  },
  notequipped: {
    borderColor: "#CECE02",
    backgroundColor: "#3E4651",
    minWidth: 210,
    borderStyle: "dashed",
    borderWidth: "1px",
  },
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ItemCardReport(props) {
  const classes = useStyles();
  const item = props.item;
  const enchants = props.enchants;
  const { t, i18n } = useTranslation();
  const gameType = useSelector((state) => state.gameType);
  const currentLanguage = i18n.language;
  const statString = gameType === "Classic" ? "" : buildStatString(item.stats, item.effect, currentLanguage);
  const itemLevel = item.level || item.ilvl;
  const isLegendary = "effect" in item && (item.effect.type === "spec legendary" || item.effect.type === "unity");
  const wowheadDom = (gameType === "Classic" ? "wotlk-" : "") + currentLanguage;
  let gemString = gameType === "Classic" ? props.gems : "&gems=" + item.gemString;
  const socketImage = getGemProp(enchants["Gems"], "icon");
  const tier = item.setID !== "" && item.slot !== "Trinket" ? <div style={{ fontSize: 10, lineHeight: 1, color: "yellow" }}>{t("Tier")}</div> : null;
  const tertiary = "tertiary" in item && item.tertiary !== "" ? <div style={{ fontSize: 10, lineHeight: 1, color: "lime" }}>{t(item.tertiary)}</div> : null;
  const isCatalysable = item.isCatalystItem;
  const catalyst = isCatalysable ? <div style={{ fontSize: 10, lineHeight: 1, color: "plum" }}>{t("Catalyst")}</div> : null;

  // TODO: Items should track their own quality, and this function shouldn't be in ItemCard.
  const itemQuality = (itemLevel, itemID) => {
    if (gameType !== "Retail") {
      const quality = getItemProp(itemID, "quality", gameType);
      if (quality === 5) return "#ff8000";
      else if (quality === 4) return "#a73fee";
      else if (quality === 3) return "#328CE3";
      else if (quality === 2) return "#1eff00";
      else return "#ffffff";
    } else {
      if (isLegendary || itemID === 204177) return "#ff8000";
      else if (itemLevel >= 183) return "#a73fee";
      else if (itemLevel >= 120) return "#328CE3";
      else return "#1eff00";
    }
  };

  let itemName = "";
  let isVault = item.vaultItem;

  let socket = [];

  if (item.id === 203460) {
    const gemCombo = props.primGems;
    const gemData = buildPrimGems(gemCombo);
    socket = gemData.socket;
    gemString = gemData.string;
  } else if (item.socket) {
    let socketCount = item.socket;

    if (props.firstSlot) {
      // This is our first gem and we can socket int here.
      socket.push(
        <div style={{ display: "inline", marginRight: "5px" }}>
          <Tooltip title={capitalizeFirstLetter(getGemProp(enchants["Gems"][0], "name"))} arrow>
            <img src={getGemProp(enchants["Gems"][0], "icon")} width={15} height={15} style={{ verticalAlign: "middle" }} alt="Socket" />
          </Tooltip>
        </div>,
      );
      socketCount -= 1;
    }
    for (let i = 0; i < socketCount; i++) {
      socket.push(
        <div style={{ display: "inline", marginRight: "5px" }}>
          <Tooltip title={capitalizeFirstLetter(getGemProp(enchants["Gems"][1], "name"))} arrow>
            <img src={getGemProp(enchants["Gems"][1], "icon")} width={15} height={15} style={{ verticalAlign: "middle" }} alt="Socket" />
          </Tooltip>
        </div>,
      );
    }
    socket = <div style={{ verticalAlign: "middle" }}>{socket}</div>;
  }
  /*
  const socket = item.socket ? (
    <div style={{ display: "inline" }}>
      <Tooltip title={capitalizeFirstLetter(getGemProp(enchants["Gems"], "name"))} arrow>
        <img src={socketImage} width={15} height={15} style={{ verticalAlign: "middle" }} alt="Socket" />
      </Tooltip>
    </div>
  ) : null; */

  const enchantCheck = (item) => {
    if (item.slot in enchants) {
      let typo = (
        <Typography variant="subtitle2" wrap="nowrap" display="block" align="left" style={{ fontSize: "12px", color: "#36ed21", paddingRight: 4 }}>
          {enchants[item.slot]}
        </Typography>
      );
      return typo;
    }
    return null;
  };

  if (item.offhandID > 0) {
    itemName = getTranslatedItemName(item.id, currentLanguage, "", gameType) + " & " + getTranslatedItemName(item.offhandID, currentLanguage, "", gameType);
  } else {
    if (isLegendary) itemName = item.effect.name;
    else itemName = getTranslatedItemName(item.id, currentLanguage, "", gameType);
  }

  return (
    <Grid item xs={12}>
      <Card
        className={isVault ? classes.vault : !item.isEquipped && item.slot != "CombinedWeapon" ? classes.notequipped : catalyst ? classes.catalyst : classes.root}
        elevation={0}
        style={{ backgroundColor: "rgba(34, 34, 34, 0.52)" }}
      >
        <CardActionArea disabled={false}>
          <Grid container display="inline-flex" wrap="nowrap" justifyContent="space-between">
            <Grid item xs="auto">
              <CardContent
                style={{
                  padding: "2px 2px 0.4px 2px",
                  display: "inline-flex",
                }}
              >
                <div className="container-ItemCards">
                  <WowheadTooltip type="item" id={item.id} level={item.level} bonusIDS={item.bonusIDS} domain={wowheadDom} gems={gemString}>
                    <img
                      alt="img"
                      width={44}
                      height={44}
                      src={getItemIcon(item.id, gameType)}
                      style={{
                        borderRadius: 4,
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: itemQuality(itemLevel, item.id),
                      }}
                    />
                  </WowheadTooltip>
                  <div style={{ position: "absolute", bottom: "4px", right: "4px", fontWeight: "bold", fontSize: "12px", textShadow: "1px 1px 4px black" }}> {item.level} </div>
                </div>
              </CardContent>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <CardContent style={{ padding: 2, width: "100%" }}>
              <Grid item container display="inline" direction="column" justifyContent="space-around" xs="auto">
                <Grid container item wrap="nowrap" justifyContent="space-between" alignItems="center" style={{ width: "100%" }}>
                  <Grid item xs={12} display="inline">
                    <Typography variant="subtitle2" wrap="nowrap" display="block" align="left" style={{ marginLeft: 4, padding: "1px 0px" }}>
                      <div style={{ color: itemQuality(itemLevel, item.id), lineHeight: "normal" }}>{itemName}</div>
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
                </Grid>
                <Divider />
                <Grid item container direction="row" xs={12} justifyContent="space-between" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2" wrap="nowrap" display="block" align="left" style={{ fontSize: "12px", marginLeft: "2px" }}>
                      {statString} {socket}
                    </Typography>
                  </Grid>
                  <Grid item>{enchantCheck(item)}</Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
