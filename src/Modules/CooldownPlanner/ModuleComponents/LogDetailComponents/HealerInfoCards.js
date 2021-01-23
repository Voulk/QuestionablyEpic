import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import classicons from "../../Functions/IconFunctions/ClassIcons.js";
import talentIcons from "../../Functions/IconFunctions/TalentIcons";
import { classColoursJS } from "../../Functions/ClassColourFunctions";
import { useTranslation } from "react-i18next";
// import { getItemIcon } from "../../../Engine/ItemUtilities";
import "./HealerCardInfo.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { STATPERONEPERCENT } from "../../../Engine/STAT";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: "center",
  },
  content: {
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
      minHeight: 0,
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: 0,
    },
    "& .MuiAccordionSummary-content": {
      margin: 0,
      minHeight: 0,
    },
    "& .MuiIconButton-root": {
      padding: 0,
    },
    "& .MuiAccordionSummary-root": {
      minHeight: 0,
    },
  },
}));

export default function HealerInfoCards(props) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const classes = useStyles();

  const roundTo = (value, places) => {
    let power = Math.pow(10, places);
    return Math.round(value * power) / power;
  };

  const masteryCalc = (healClass, mastery) => {
    let statPerc = 0;

    if (healClass === "Paladin-Holy") {
      statPerc = 12 + mastery / 23.33;
    } else if (healClass === "Shaman-Restoration") {
      statPerc = 24 + mastery / 11.66;
    } else if (healClass === "Druid-Restoration") {
      statPerc = 4 + mastery / 70;
    } else if (healClass === "Priest-Holy") {
      statPerc = 10 + mastery / 28;
    } else if (healClass === "Priest-Discipline") {
      statPerc = 10.8 + mastery / 25.93;
    } else if (healClass === "Monk-Mistweaver") {
      statPerc = 24 + mastery / 8.33;
    }
    return statPerc;
  };

  const [expanded, setExpanded] = useState("panel");

  useEffect(() => {
    setExpanded("panel");
  }, [props.heals]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid container spacing={1} style={{ display: "block" }}>
      {props.heals.map((key, index) => (
        <Grid item key={index}>
          <Accordion
            style={{ width: "100%" }}
            elevation={0}
            expanded={expanded === `panel_${index}`}
            onChange={handleChange(`panel_${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              // style={{margin: "8px 0px"}}
              className={classes.content}
              style={{ minHeight: 0 }}
            >
              <Typography
                variant="h6"
                style={{
                  color: classColoursJS(key.type),
                  textAlign: "center",
                }}
              >
                {classicons(key.icon, 20)}
                {key.name} - {t("CooldownPlanner.HealerCards.Item Level")}{" "}
                {key.stats.map((stats) => stats.ilvl)} - {key.icon}
              </Typography>
            </AccordionSummary>
            <Divider style={{ marginTop: 4 }} />
            <AccordionDetails style={{ padding: 0 }}>
              <Grid
                container
                justify="center"
                style={{ margin: 4 }}
                spacing={1}
              >
                <Grid
                  item
                  xs={4}
                  style={{
                    display: "inline-flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Paper
                    variant="outlined"
                    style={{
                      // border: "1px solid rgba(255, 255, 255, 0.12)",
                      width: "100%",
                      height: "fit-content",
                    }}
                  >
                    <Typography
                      className={classes.heading}
                      color="primary"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        borderRadius: "4px 4px 0px 0px",
                      }}
                    >
                      {t("CooldownPlanner.HealerCards.StatsHeading")}
                    </Typography>
                    <Divider />
                    {key.stats.map((stats, i) => (
                      <div key={i}>
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {t("Intellect")}: {stats.intellect}
                        </Typography>
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {t("CooldownPlanner.HealerCards.Crit")}:{" "}
                          {roundTo(stats.crit / STATPERONEPERCENT.CRIT + 5, 2)}
                          {"%"}
                          {/* {"(" + stats.crit + ")"} */}
                        </Typography>
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {t("CooldownPlanner.HealerCards.Haste")}:{" "}
                          {roundTo(stats.haste / STATPERONEPERCENT.HASTE, 2)}
                          {"%"}
                          {/* {"(" + stats.haste + ")"} */}
                        </Typography>
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {t("CooldownPlanner.HealerCards.Mastery")}:{" "}
                          {roundTo(masteryCalc(key.icon, stats.mastery), 2)}
                          {"%"}
                          {/* {"(" + stats.mastery + ")"} */}
                        </Typography>
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {t("CooldownPlanner.HealerCards.Versatility")}:{" "}
                          {roundTo(
                            stats.versatility / STATPERONEPERCENT.VERSATILITY,
                            2
                          )}
                          {"%"}
                          {/* {"(" + stats.versatility + ")"} */}
                        </Typography>
                      </div>
                    ))}
                  </Paper>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid
                  item
                  xs={8}
                  // justify="flex-start"
                  // alignItems="flex-start"
                  style={{ display: "inline" }}
                >
                  <Paper
                    variant="outlined"
                    style={{
                      // padding: "2px 8px 0px 8px",
                      textAlignLast: "center",
                      // borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                      // borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
                      // borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          className={classes.heading}
                          color="primary"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                            borderRadius: "4px 4px 0px 0px",
                          }}
                        >
                          {t("CooldownPlanner.HealerCards.TalentHeader")}
                        </Typography>
                        <Divider />
                        <div
                          style={{
                            textAlignLast: "center",
                            display: "inline-flex",
                          }}
                        >
                          {key.talents.map((talent, i) => (
                            <div key={i}> {talentIcons(talent.guid)} </div>
                          ))}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          className={classes.heading}
                          color="primary"
                          style={{
                            width: "100%",
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                          }}
                        >
                          {t("CooldownPlanner.HealerCards.SoulbindAbilities")}
                        </Typography>
                        <Divider />
                        <div
                          style={{
                            textAlignLast: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {key.soulbindAbilities.map((ability, i) => (
                            <a data-wowhead={"spell=" + ability.guid + "&domain=" + currentLanguage} key={i}>
                              <img
                                style={{
                                  height: 30,
                                  width: 30,
                                  padding: 4,
                                  verticalAlign: "middle",
                                  borderRadius: "4px",
                                }}
                                src={
                                  process.env.PUBLIC_URL +
                                  "/Images/Icons/" +
                                  ability.abilityIcon
                                }
                                alt={"ability" + i}
                              />
                            </a>
                          ))}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          className={classes.heading}
                          color="primary"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                          }}
                        >
                          {t("CooldownPlanner.HealerCards.SoulbindConduits")}
                        </Typography>
                        <Divider />
                        <div
                          style={{
                            textAlignLast: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {key.soulbindConduits.map((conduit, i) => (
                            <a data-wowhead={"spell=" + conduit.guid + "&domain=" + currentLanguage} key={i}>
                              <div className="container-healerCards">
                                <img
                                  style={{
                                    height: 30,
                                    width: 30,
                                    padding: 4,
                                    verticalAlign: "middle",
                                    borderRadius: "4px",
                                  }}
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/Images/Icons/" +
                                    conduit.abilityIcon
                                  }
                                  alt={"coinduit" + i}
                                  // style={{
                                  //   borderRadius: 4,
                                  //   borderWidth: "1px",
                                  //   borderStyle: "solid",
                                  //   borderColor: itemQuality("Uncommon"),
                                  // }}
                                />

                                <div
                                  className="bottom-right-healerCards"
                                  style={{
                                    fontSize: 12,
                                    textShadow: "0px 0px 4px #000000",
                                  }}
                                >
                                  {conduit.total}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
}
