import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Card, CardContent, Typography, Grid, Divider, Stack } from "@mui/material";
import { getTranslatedItemName, getItemIcon } from "../../../Engine/ItemUtilities";
import "./ItemUpgrade.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { encounterDB } from "../../../../Databases/InstanceDB";
import { getTranslatedPvP } from "locale/pvpLocale";
import WowheadTooltip from "General/Modules/1. GeneralComponents/WHTooltips.tsx";

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  dom: {
    borderColor: "#1286E5",
    //backgroundColor: "#515751",
    borderStyle: "dashed",
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
  const isLegendary = false; // Legendaries are currently so rare that we can just ID them when necessary. 
  const itemDifferential = item.score;
  const isTierPiece = false; // item.isTierPiece();
  const gameType = useSelector((state) => state.gameType);
  const wowheadDomain = (gameType === "Classic" ? "wotlk-" : "") + currentLanguage;

  // We can probably merge a lot of these into a more central location.
  const itemTooltips = {
    207171: "Blossom of Amirdrassil holds up quite well in normal and heroic raid content but tends to fall off as the difficulty ramps up. Note that lack of intellect. Particularly rough on specs that don't enjoy Haste.",
    207172: "Belor'relos isn't a healing trinket but it does excellent damage which makes it a competitive choice in Mythic+."
  }
  // Add tier set check too and report a generic message for those.

  const itemQuality = "#a73fee" //item.getQualityColor();

  const upgradeColor = (num) => {
    if (num > 0) {
      return "#FFDF14"; // #60e421
    } else {
      return "#C16719";
    }
  };

  const itemID = item.item;
  const itemName = getTranslatedItemName(itemID, currentLanguage, "", gameType);
  

  const sourceName = (item) => {
    /* ------------------------------ Dungeon Name ------------------------------ */
    if (item.source.instanceId === -1) {
      let dungeons = { ...encounterDB["-1"] };
      dungeons = Object.assign(dungeons, encounterDB[123]);

      return dungeons[item.source.encounterId].name[currentLanguage];
    } else if (item.source.instanceId === 1194) {
      return encounterDB[1194][item.source.encounterId].name[currentLanguage] + " (Tazavesh)";
    }
    /* ----------------------------- Raid Boss Name ----------------------------- */
    if (item.source.instanceId === 1200 && item.source.encounterId > 0) {
      return encounterDB[1200].bosses[item.source.encounterId].name[currentLanguage];
    }
    if (item.source.instanceId === 1208 && item.source.encounterId > 0) {
      return encounterDB[1208].bosses[item.source.encounterId].name[currentLanguage];
    }
    if (item.source.instanceId === 1207 && item.source.encounterId > 0) {
      return encounterDB[1207].bosses[item.source.encounterId].name[currentLanguage];
    }
    if (item.source.instanceId === 1193 && item.source.encounterId > 0) {
      return encounterDB[1193].bosses[item.source.encounterId].name[currentLanguage];
    }
    if (item.source.instanceId === 1195 && item.source.encounterId > 0) {
      return encounterDB[1195].bosses[item.source.encounterId].name[currentLanguage];
    }
    /* -------------------------- Classic Bosses ---------------------- */
    if ([745, 746].includes(item.source.instanceId)) {
      return encounterDB[item.source.instanceId].bosses[item.source.encounterId].name[currentLanguage];
    }
    /* ------------------------------ World Bosses ------------------------------ */
    if (item.source.instanceId === 1205 && item.source.encounterId > 0) {
      return encounterDB[1205][item.source.encounterId].name[currentLanguage];
    }
    /* ---------------------------------- Honor --------------------------------- */
    if (item.source.instanceId === -30 || item.source.encounterId === -30) {
      return getTranslatedPvP("-30", currentLanguage);
    }
    /* ----------------------- Creation Catalyst --------------------------------- */
    if (item.source.instanceId === -22) {
      return t("CreationCatalyst");
    }
    /* -------------------------------- Conquest -------------------------------- */
    if (item.source.instanceId === -31 || item.source.encounterId === -31) {
      return getTranslatedPvP("-31", currentLanguage);
    }
    /* -------------------------------- TBC Badge Gear -------------------------------- */
    if (item.source.instanceId === -4) {
      return t("BadgeGear");
    }
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
      <Card className={itemDifferential == 0 ? classes.downgrade : isTierPiece ? classes.dom : classes.root} variant="outlined">
        <Grid container display="inline-flex" wrap="nowrap" justifyContent="space-between">
          <Grid item xs="auto">
            <CardContent
              style={{
                padding: "4.5px 4.5px 0.5px 4.5px",
                display: "inline-flex",
              }}
            >
              <WowheadTooltip type="item" id={itemID} level={item.level} bonusIDS={item.bonusIDS} domain={wowheadDomain}>
                <div className="container-ItemCards" style={{ height: props.slotPanel ? 44 : 30 }}>
                  <img
                    alt="img"
                    width={props.slotPanel ? 42 : 28}
                    height={props.slotPanel ? 42 : 28}
                    src={getItemIcon(itemID, gameType)}
                    style={{
                      borderRadius: 4,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: itemQuality,
                    }}
                  />
                  <div className="bottom-right-ItemCards"> {item.level} </div>
                </div>
              </WowheadTooltip>
            </CardContent>
          </Grid>
          <Divider orientation="vertical" flexItem />
            {itemTooltips[itemID] ? <Tooltip title={itemTooltips[itemID]}>
              <IconButton sx={{ color: 'goldenrod' }}>
                <HelpOutlineIcon />
              </IconButton>
          </Tooltip> : ""}
          <CardContent style={{ padding: 4, width: "100%", alignSelf: "center" }}>
            <Grid item container display="inline" direction="column" justifyContent="space-around" xs="auto">
              <Grid container item wrap="nowrap" justifyContent="space-between" alignItems="center" style={{ width: "100%" }}>
                <Grid item xs={10} display="inline">
                  <Typography
                    variant={itemName.length > 30 || props.slotPanel ? "subtitle2" : "subtitle1"}
                    wrap="nowrap"
                    display="inline"
                    align="left"
                    style={{ color: itemQuality, justifyContent: "center" }}
                  >
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
                    variant="subtitle2" // h6 formerly // subtitle1 formerly
                    wrap="nowrap"
                    display="inline"
                    align="center"
                    style={{
                      color: upgradeColor(itemDifferential),
                      paddingLeft: "3px",
                      paddingRight: "3px",
                      justifyContent: "center",
                    }}
                  >
                    {itemDifferential > 0 && itemDifferential < 0.2 ? "+" + Math.round(10000 * itemDifferential) / 100 + "%" : "+" + itemDifferential}
                  </Typography>
                </Grid>
              </Grid>
              {/* Source Location for Slot Panel */}
              {props.slotPanel ? (
                <Grid item xs={12}>
                  <Divider />
                  <Typography variant={props.slotPanel ? "subtitle2" : "subtitle1"} style={{ paddingTop: 4, lineHeight: props.slotPanel ? "normal" : 1.57 }}>
                    Source: {sourceName(item)}{" "}
                  </Typography>
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
