import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Grid, Divider } from "@material-ui/core";
import { getTranslatedItemName, getItemIcon } from "../../../Engine/ItemUtilities";
import "./ItemUpgrade.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  dom: {
    borderColor: "#05d102",
    //backgroundColor: "#515751",
    borderStyle: "solid",
    minWidth: 250,
  },
  downgrade: {
    minWidth: 250,
    backgroundColor: "#303030",
    opacity: 0.5,
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
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const itemLevel = item.level;
  const isLegendary = "effect" in item && item.effect.type === "spec legendary";
  const itemDifferential = props.itemDifferential;
  const hasDom = item.hasDomSocket;
  const gameType = useSelector((state) => state.gameType);
  const wowheadDomain = (gameType === "BurningCrusade" ? "tbc-" : "") + currentLanguage;

  /*
  const itemQuality = (itemLevel) => {
    if (isLegendary) return "#ff8000";
    else if (itemLevel >= 183) return "#a73fee";
    else if (itemLevel >= 120) return "#328CE3";
    else return "#1eff00";
  }; */
  const itemQuality = item.getQualityColor();

  const upgradeColor = (num) => {
    if (num > 0) {
      return "#FFDF14"; // #60e421
    } else {
      return "#C16719";
    }
  };

  let itemName = "";

  if (item.offhandID > 0) {
    itemName = getTranslatedItemName(item.id, currentLanguage, "", gameType) + " & " + getTranslatedItemName(item.offhandID, currentLanguage, "", gameType);
  } else {
    if (isLegendary) itemName = item.effect.name;
    else itemName = getTranslatedItemName(item.id, currentLanguage, "", gameType);
  }

  const sourceName = (item) => {
    /* ------------------------------ Dungeon Name ------------------------------ */
    if (item.source.instanceId === -1) {
      return t("DungeonNames." + item.source.encounterId);
    }
    /* ----------------------------- Raid Boss Name ----------------------------- */
    if (item.source.instanceId === 1190 && item.source.encounterId > 0) {
      return t("BossNames." + item.source.encounterId);
    }
    /* -------------------------- BC Bosses ---------------------- */
    if ([745, 746].includes(item.source.instanceId)) {
      return t("BossNames." + item.source.encounterId);
    }
    /* ------------------------------ World Bosses ------------------------------ */
    if (item.source.instanceId === 1192 && item.source.encounterId > 0) {
      return t("WorldBosses." + item.source.encounterId);
    }
    /* ---------------------------------- Honor --------------------------------- */
    if (item.source.instanceId === -16 || item.source.encounterId === -16) {
      return t("PvPCurrency.-16");
    }
    /* -------------------------------- Conquest -------------------------------- */
    if (item.source.instanceId === -17 || item.source.encounterId === -17) {
      return t("PvPCurrency.-17");
    }
        /* -------------------------------- TBC Badge Gear -------------------------------- */
        if (item.source.instanceId === -4) {
          return t("BadgeGear");
        }
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
      <Card className={itemDifferential == 0 ? classes.downgrade : hasDom ? classes.dom : classes.root} variant="outlined">
        <Grid container display="inline-flex" wrap="nowrap" justify="space-between">
          <Grid item xs="auto">
            <CardContent
              style={{
                padding: "4.5px 4.5px 0.5px 4.5px",
                display: "inline-flex",
              }}
            >
              <a data-wowhead={"item=" + item.id + "&" + "ilvl=" + item.level + "&domain=" + wowheadDomain}>
                <div className="container-ItemCards">
                  <img
                    alt="img"
                    width={props.slotPanel ? 54 : 28}
                    height={props.slotPanel ? 54 : 28}
                    src={getItemIcon(item.id, gameType)}
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: itemQuality,
                    }}
                  />
                  <div className="bottom-right-ItemCards"> {item.level} </div>
                </div>
              </a>
            </CardContent>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <CardContent style={{ padding: 4, width: "100%" }}>
            <Grid item container display="inline" direction="column" justify="space-around" xs="auto">
              <Grid container item wrap="nowrap" justify="space-between" alignItems="center" style={{ width: "100%" }}>
                <Grid item xs={10} display="inline">
                  <Typography variant={itemName.length > 30 ? "subtitle2" : "subtitle1"} wrap="nowrap" display="inline" align="left" style={{ color: itemQuality }}>
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
                    variant="subtitle1" // h6 formerly
                    wrap="nowrap"
                    display="inline"
                    align="center"
                    style={{
                      color: upgradeColor(itemDifferential),
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    {"+" + itemDifferential + "%"}
                  </Typography>
                </Grid>
              </Grid>
              {/* Source Location for Slot Panel */}
              {props.slotPanel ? (
                <Grid item xs={12}>
                  <Divider />
                  <Typography style={{ paddingTop: 4 }}>Source: {sourceName(item)} </Typography>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
}
