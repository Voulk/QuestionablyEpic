import React from "react";
import { useTranslation } from "react-i18next";
import { Paper, Typography, Divider, Grid } from "@material-ui/core";
import { getItemIcon } from "../../Engine/ItemUtilities";

function CompetitiveAlternatives(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const item = props.item
  const differentials = props.differentials

  const itemQuality = (itemLevel, effect) => {
    const isLegendary = effect.type === "spec legendary";
    if (isLegendary) return "#ff8000";
    else if (itemLevel >= 183) return "#a73fee";
    else if (itemLevel >= 120) return "#328CE3";
    else return "#1eff00";
  };

  /* -------------------------------------- Rounding Function ------------------------------------- */
  const roundTo = (value, places) => {
    let power = Math.pow(10, places);
    let diff = (Math.round(value * power) / power) * -1;
    if (Math.abs(diff) < 0.01) return "<0.01";
    return diff;
  };

  return (
    <Grid item xs={12}>
      <Paper style={{ padding: 16 }} elevation={0}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
              {t("TopGear.CompetitiveAlternative")}
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid item container spacing={0}>
              {differentials.map((key) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
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
                        {key.items.map((item) => (
                          <Grid item>
                            <a data-wowhead={"item=" + item.id + "&" + "ilvl=" + item.level + "&bonus=" + item.bonusIDS + "&domain=" + currentLanguage}>
                              <div className="container-ItemCards" style={{ height: 42 }}>
                                <img
                                  alt="img"
                                  width={40}
                                  height={40}
                                  src={getItemIcon(item.id)}
                                  style={{
                                    borderRadius: 4,
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderColor: itemQuality(item.level, item.effect),
                                  }}
                                />
                                <div className="bottom-right-ItemCards"> {item.level} </div>
                              </div>
                            </a>
                          </Grid>
                        ))}
                      </Grid>
                      <Grid item container justify="flex-end" xs={2}>
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
                            {roundTo(key.scoreDifference, 2) + "%"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant="caption" // h6 formerly
                            wrap="nowrap"
                            display="inline"
                            align="right"
                            style={{
                              color: "#f20d0d",
                              whiteSpace: "nowrap",
                              float: "right",
                              fontSize: 12,
                            }}
                          >
                            {key.rawDifference + " HPS"}
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
