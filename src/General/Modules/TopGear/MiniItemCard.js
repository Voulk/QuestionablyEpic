import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Card, CardContent, Typography, Grid, Divider, IconButton } from "@mui/material";
import { getTranslatedItemName, buildStatString, getItemIcon, getItemProp, getGemIcon } from "../../Engine/ItemUtilities";
import "./MiniItemCard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import socketImage from "../../../Images/Resources/EmptySocket.png";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CardActionArea from "@mui/material/CardActionArea";
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
  const deleteActive = item.offhandID === 0;

  const activateItemCard = () => {
    props.activateItem(item.uniqueHash, item.active);
  };

  const deleteItemCard = () => {
    props.delete(item.uniqueHash);
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

  const tertiary = "tertiary" in props.item && props.item.tertiary !== "" ? <div style={{ display: "inline" }}> / {props.item.tertiary} </div> : null;

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Card className={item.active && isVault ? classes.selectedVault : item.active ? classes.selected : isVault ? classes.vault : classes.root} elevation={0} variant="outlined">
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
                  <div className="bottom-right-ItemCards"> {item.level} </div>
                </div>
              </CardContent>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <CardContent style={{ padding: 4, width: "100%" }}>
              <Grid item container display="inline" direction="column" justifyContent="space-around" xs="auto">
                {/* <Grid container item wrap="nowrap" justifyContent="space-between" alignItems="center" style={{ width: "100%" }}> */}
                <Grid item xs={12} display="inline">
                  <Typography variant="subtitle2" wrap="nowrap" display="inline" align="left" style={{ color: itemQuality, lineHeight: 1.4 }}>
                    {itemName}
                  </Typography>
                </Grid>
                {/* </Grid> */}
                <Divider />
                <Grid item container xs={12} display="inline-flex" direction="row" justifyContent="space-between" style={{marginTop: 2}}>
                  <Grid item xs={11}>
                    <Typography variant="subtitle2" wrap="nowrap" display="block" align="left" style={{ fontSize: "12px", marginTop: 1 }}>
                      {item.domGemID !== 0 && gameType === "Retail" ? (
                        <a data-wowhead={"item=" + item.domGemID + "&domain=" + currentLanguage}>
                          <img
                            style={{
                              height: 16,
                              width: 16,
                              // margin: "0px 5px 0px 0px",
                              verticalAlign: "middle",
                              borderRadius: 4,
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                            }}
                            src={process.env.PUBLIC_URL + "/Images/Icons/" + dominationGemDB.filter((key) => key.gemID === item.domGemID).map((key) => key.icon)[0] + ".jpg"}
                            alt={dominationGemDB.filter((key) => key.id === item.domGemID).map((key) => key.name[currentLanguage])[0]}
                          />
                        </a>
                      ) : (
                        ""
                      )}
                      {socket} {statString} {tertiary} {isVault ? " / " + t("itemTags.greatvault") : ""}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} align="center">
                    {deleteActive ? (
                      <div>
                        <IconButton onClick={deleteItemCard} style={{ padding: 0 }} aria-label="delete" size="small">
                          <DeleteIcon style={{ color: "#ad2c34" }} fontSize="small" />
                        </IconButton>
                      </div>
                    ) : (
                      ""
                    )}
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
