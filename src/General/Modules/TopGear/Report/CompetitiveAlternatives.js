import React from "react";
import { useTranslation } from "react-i18next";
import { Paper, Typography, Divider, Grid } from "@mui/material";
import { getGemIcon, getItemIcon, getItemProp } from "../../../Engine/ItemUtilities";
import { useSelector } from "react-redux";
import WowheadTooltip from "General/Modules/GeneralComponents/WHTooltips.tsx";
import { reforgeIDs } from "Databases/ReforgeDB";

function CompetitiveAlternatives(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // const item = props.item
  const differentials = props.differentials;
  const gameType = props.gameType;
  const wowheadDom = (gameType === "Classic" ? "mop-classic" : currentLanguage);
  const itemQuality = (item, gameType) => {
    if (gameType === "Retail") {
      const isLegendary = false; // item.effect.type === "spec legendary";
      if (isLegendary) return "#ff8000";
      else if (item.level >= 183) return "#a73fee";
      else if (item.level >= 120) return "#328CE3";
      else return "#1eff00";
    } else {
      const quality = getItemProp(item.id, "quality", "Classic");
      if (quality === 5) return "#ff8000";
      else if (quality === 4) return "#a73fee";
      else if (quality === 3) return "#328CE3";
      else if (quality === 2) return "#1eff00";
      else return "#ffffff";
    }
  };
  const getGemString = (item) => {
    return gameType === "Classic" ? "&gems=" + item.socketedGems.join(':') : "&gems=" + item.gemString;
  } 
  // TODO: Gems

  // Reforges
  //let reforgeText = null;
  const getReforgeID = (item) => {
    if (gameType === "Classic" && item.flags.filter(flag => flag.includes("Reforged")).length > 0) {
      const reforge = item.flags.filter(flag => flag.includes("Reforged"))[0];
  
      //reforgeText = /*gameType === "Classic" && item.flags && item.flags.includes("reforge") ?*/ <div style={{ fontSize: 12, color: "orange" }}>{item.flags.filter(flag => flag.includes("Reforged"))[0]}</div> /*: null;*/
      return reforgeIDs[reforge];
    }
    else return 0;
  }


  /* -------------------------------------- Rounding Function ------------------------------------- */
  const roundTo = (value, places) => {
    if (value === 0) return "<0.01";
    let power = Math.pow(10, places);
    let diff = (Math.round(value * power) / power) * -1;
    if (Math.abs(diff) < 0.01) return "<0.01";
    return Math.abs(diff);
  };

  return (
    <Grid item xs={12}>
      <Paper style={{ padding: 8 }} elevation={0}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
              {t("TopGear.CompetitiveAlternative")}
            </Typography>
            <Typography variant="body2" align="left" style={{ width: "100%", color: "#ffffff", fontStyle: "italic" }} color="secondary">
              {t("TopGear.CompetitiveAlternativeHelp")}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid item container spacing={0}>
              {differentials.map((key, i) => (
                <Grid item xs={12} sm={12} md={12} lg={6} xl={4} key={i}>
                  <Paper
                    elevation={0}
                    variant="outlined"
                    style={{
                      padding: 6,
                      backgroundColor: "rgba(34, 34, 34, 0.52)",
                    }}
                  >
                    <Grid item container direction="row" alignItems="center" xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Grid item container xs={10} spacing={1}>
                        {key.items.map((item, i) => {
                          let itemArray = [];
                          // scuffed breakdown of weapon combos to seperate them for the report
                          itemArray = [item];
                          return itemArray.map((item) => (
                            <Grid item key={i}>
                              <WowheadTooltip type="item" id={item.id} level={item.level} bonusIDS={item.bonusIDS} craftedStats={item.craftedStats} domain={wowheadDom} gems={getGemString(item)} forg={getReforgeID(item)}>
                                <div className="container-ItemCards" style={{ height: 42 }}>
                                  <img
                                    alt="img"
                                    width={40}
                                    height={40}
                                    src={getItemIcon(item.id, gameType)}
                                    style={{
                                      borderRadius: 4,
                                      borderWidth: item.vaultItem ? "2px" : "1px",
                                      borderStyle: item.vaultItem ? "dashed" : "solid",
                                      borderColor: item.vaultItem ? "#0288d1" : itemQuality(item, gameType),
                                    }}
                                  />
                                  <div className="bottom-right-ItemCards"> {item.level} </div>
                                </div>
                              </WowheadTooltip>
                            </Grid>
                          ));
                        })}
                        {key.gems.map((gem, i) => {
                          let itemArray = [];
                          // 
                          itemArray = [gem];
                          return itemArray.map((item) => (
                            <Grid item key={i}>
                              <WowheadTooltip type="item" id={gem} domain={wowheadDom}>
                                <div className="container-ItemCards" style={{ height: 42 }}>
                                  <img
                                    alt="img"
                                    width={40}
                                    height={40}
                                    src={getGemIcon(gem, gameType)}
                                    style={{
                                      borderRadius: 4,
                                      borderWidth: item.vaultItem ? "2px" : "1px",
                                      borderStyle: item.vaultItem ? "dashed" : "solid",
                                      borderColor: "purple",//item.vaultItem ? "#0288d1" : itemQuality(item, gameType),
                                    }}
                                  />
                                  {/*<div className="bottom-right-ItemCards"> {item.level} </div> */}
                                </div>
                              </WowheadTooltip>
                            </Grid>
                          ));
                        })}
                      </Grid>
                      <Grid item container justifyContent="flex-end" xs={2}>
                        <Grid item xs={12}>
                          <Typography
                            variant="caption" // h6 formerly
                            display="inline"
                            align="right"
                            style={{
                              color: "#f20d0d",
                              whiteSpace: "nowrap",
                              float: "right",
                            }}
                          >
                            {/*roundTo(key.scoreDifference, 2) + "%"*/}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant="caption" // h6 formerly
                            wrap="nowrap"
                            display="inline"
                            align="right"
                            style={{
                              color: "#F58114",
                              whiteSpace: "nowrap",
                              float: "right",
                              fontSize: 14,
                            }}
                          >
                            {(gameType === "Classic" ? Math.round(key.rawDifference / 60) : key.rawDifference) + " HPS (" + roundTo(key.scoreDifference, 2) + "%)"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default CompetitiveAlternatives;
// This component shows sets that are similar in strength to the best.
