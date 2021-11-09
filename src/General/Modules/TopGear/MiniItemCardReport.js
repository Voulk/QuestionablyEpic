import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardActionArea, Typography, Grid, Divider } from "@material-ui/core";
import { getTranslatedItemName, buildStatString, getItemIcon, getItemProp, getGemIcon } from "../../Engine/ItemUtilities";
import "./MiniItemCard.css";
import hasteSocket from "../../../Images/Resources/hasteSocket.jpg";
import critSocket from "../../../Images/Resources/critSocket.jpg";
import masterySocket from "../../../Images/Resources/masterySocket.jpg";
import versSocket from "../../../Images/Resources/versSocket.jpg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { dominationGemDB } from "../../../Databases/DominationGemDB";

const useStyles = makeStyles({
  root: {
    minWidth: 210,
    borderColor: "grey",
    borderRadius: "5px",
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

export default function ItemCardReport(props) {
  const classes = useStyles();
  const item = props.item;
  const enchants = props.enchants;
  const { i18n } = useTranslation();
  const gameType = useSelector((state) => state.gameType);

  const currentLanguage = i18n.language;
  const statString = gameType === "BurningCrusade" ? "" : buildStatString(item.stats, item.effect, currentLanguage);
  const itemLevel = item.level;
  const isLegendary = "effect" in item && item.effect.type === "spec legendary";
  const socketImg = {
    haste: hasteSocket,
    crit: critSocket,
    mastery: masterySocket,
    versatility: versSocket,
  };
  const wowheadDom = (gameType === "BurningCrusade" ? "tbc-" : "") + currentLanguage;
  const gemString = gameType === "BurningCrusade" ? props.gems : "&gems=" + item.gemString;
  const socketImage = socketImg[enchants["Gems"]];
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
      if (isLegendary) return "#ff8000";
      else if (itemLevel >= 183) return "#a73fee";
      else if (itemLevel >= 120) return "#328CE3";
      else return "#1eff00";
    }
  };

  let itemName = "";
  let isVault = item.vaultItem;

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

  const tertiary = "tertiary" in props.item && props.item.tertiary !== "" ? <div style={{ display: "inline" }}> / {props.item.tertiary} </div> : null;

  return (
    <Grid item xs={12}>
      <Card
        className={isVault ? classes.vault : !item.isEquipped && item.slot != "CombinedWeapon" ? classes.notequipped : classes.root}
        elevation={0}
        style={{ backgroundColor: "rgba(34, 34, 34, 0.52)" }}
      >
        <CardActionArea disabled={false}>
          <Grid container display="inline-flex" wrap="nowrap" justify="space-between">
            <Grid item xs="auto">
              <CardContent
                style={{
                  padding: "2px 2px 0.4px 2px",
                  display: "inline-flex",
                }}
              >
                <div className="container-ItemCards">
                  <a data-wowhead={"item=" + item.id + "&" + "ilvl=" + item.level + "&bonus=" + item.bonusIDS + "&domain=" + wowheadDom + gemString}>
                    <img
                      alt="img"
                      width={38}
                      height={38}
                      src={getItemIcon(item.id, gameType)}
                      style={{
                        borderRadius: 4,
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: itemQuality(itemLevel, item.id),
                      }}
                    />
                  </a>
                  <div className="bottom-right-ItemCards"> {item.level} </div>
                </div>
              </CardContent>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <CardContent style={{ padding: 2, width: "100%" }}>
              <Grid item container display="inline" direction="column" justify="space-around" xs="auto">
                <Grid container item wrap="nowrap" justify="space-between" alignItems="center" style={{ width: "100%" }}>
                  <Grid item xs={12} display="inline">
                    <Typography variant="subtitle2" wrap="nowrap" display="inline" align="left" style={{ color: itemQuality(itemLevel, item.id) }}>
                      {itemName}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item container display="inline" direction="row" xs="auto" justify="space-between">
                  <Grid item xs={12} style={{ display: "contents" }}>
                    <Typography variant="subtitle2" wrap="nowrap" display="block" align="left" style={{ fontSize: "12px", marginLeft: "2px" }}>
                      {"domGemID" in item && item.domGemID !== 0 ? (
                        <a data-wowhead={"item=" + item.domGemID + "&domain=" + currentLanguage}>
                          <img
                            style={{
                              height: 16,
                              width: 16,
                              margin: "0px 0px 0px 0px",
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
                      {socket} {statString} {tertiary} {isVault ? " / Vault" : ""}
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
