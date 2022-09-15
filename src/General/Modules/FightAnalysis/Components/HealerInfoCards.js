import React, { useState, useEffect } from "react";
import { Typography, Paper, Divider, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import classicons from "../../CooldownPlanner/Functions/IconFunctions/ClassIcons.js";
import talentIcons from "../../CooldownPlanner/Functions/IconFunctions/TalentIcons";
import { classColoursJS } from "../../CooldownPlanner/Functions/ClassColourFunctions";
import { useTranslation } from "react-i18next";
import "./HealerCardInfo.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { STATPERONEPERCENT } from "../../../Engine/STAT";
import { getTranslatedStats } from "locale/statsLocale.js";

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

  /* ---------------------------- Rounding Function --------------------------- */

  const roundTo = (value, places) => {
    let power = Math.pow(10, places);
    return Math.round(value * power) / power;
  };

  /* --------------------------- Mastery Calculator --------------------------- */
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

  /* ---------------------- Accordian Expansion Handling ---------------------- */
  const [expanded, setExpanded] = useState("panel");

  useEffect(() => {
    setExpanded("panel");
  }, [props.heals]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid container spacing={1} style={{ display: "block" }}>
      {/* ----------- Here we map an Accordian for each healer in the log ----------  */}
      {props.heals.map((key, index) => (
        <Grid item key={index}>
          <Accordion style={{ width: "100%" }} elevation={0} expanded={expanded === `panel_${index}`} onChange={handleChange(`panel_${index}`)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" className={classes.content} style={{ minHeight: 0 }}>
              {/* ------------------------ Healer Name + Ilvl + Spec -----------------------  */}
              <Typography
                variant="h6"
                style={{
                  color: classColoursJS(key.type),
                  textAlign: "center",
                  display: "inline-flex",
                }}
              >
                {classicons(key.icon, { width: 22, height: 22, verticalAlign: "middle", marginRight: 4, borderRadius: 4 })}
                {key.name} - {t("Item Level")} {key.stats.map((stats) => stats.ilvl)} - {key.icon}
              </Typography>
            </AccordionSummary>
            <Divider style={{ marginTop: 4 }} />
            <AccordionDetails style={{ padding: 8 }}>
              <Grid container justifyContent="center" spacing={1}>
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
                      width: "100%",
                      height: "fit-content",
                    }}
                  >
                    {/* ------------------------------ Stat Heading ------------------------------  */}
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

                    {/* ---------------- Here we map the stat string for each stat ---------------  */}
                    {key.stats.map((stats, i) => (
                      <div key={i}>
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {getTranslatedStats("Intellect", currentLanguage)}: {stats.intellect}
                        </Typography>

                        {/* ----------------------------- Critical Strike ----------------------------  */}
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {getTranslatedStats("Crit", currentLanguage)}: {roundTo(stats.crit / STATPERONEPERCENT.Retail.CRIT + 5, 2)}
                          {"%"}
                        </Typography>

                        {/* ---------------------------------- Haste ---------------------------------  */}
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {getTranslatedStats("Haste", currentLanguage)}: {roundTo(stats.haste / STATPERONEPERCENT.Retail.HASTE, 2)}
                          {"%"}
                        </Typography>

                        {/* --------------------------------- Mastery --------------------------------  */}
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {getTranslatedStats("Mastery", currentLanguage)}: {roundTo(masteryCalc(key.icon, stats.mastery), 2)}
                          {"%"}
                        </Typography>

                        {/* ------------------------------- Versatility ------------------------------  */}
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {getTranslatedStats("Versatility", currentLanguage)}: {roundTo(stats.versatility / STATPERONEPERCENT.Retail.VERSATILITY, 2)}
                          {"%"}
                        </Typography>
                      </div>
                    ))}
                  </Paper>
                </Grid>

                {/* ---------- Container for the Talents / Conduits / Soulbind Info ----------  */}
                <Grid item xs={8} style={{ display: "inline" }}>
                  <Paper
                    variant="outlined"
                    style={{
                      textAlignLast: "center",
                    }}
                  >
                    <Grid container>
                      {/* --------------------------- Talent Information ---------------------------  */}
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

                      {/* --------------------------- Soulbind Abilities ---------------------------  */}
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
                          {key.soulbindAbilities
                            .filter((filter) => filter.guid !== 0)
                            .map((ability, i) => (
                              <a data-wowhead={"spell=" + ability.guid + "&domain=" + currentLanguage} key={i}>
                                <img
                                  style={{
                                    height: 30,
                                    width: 30,
                                    margin: 4,
                                    verticalAlign: "middle",
                                    borderRadius: "4px",
                                    border: "1px solid rgb(89, 89, 89)",
                                  }}
                                  src={process.env.PUBLIC_URL + "/Images/Icons/" + ability.abilityIcon}
                                  alt={"ability" + i}
                                />
                              </a>
                            ))}
                        </div>
                      </Grid>

                      {/* ---------------------------- Soulbind Conduits ---------------------------  */}
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
                            <a data-wowhead={"spell=" + conduit.guid + "&domain=" + currentLanguage + "&ilvl=" + conduit.total} key={i}>
                              <div className="container-healerCards">
                                <img
                                  style={{
                                    height: 30,
                                    width: 30,
                                    margin: 4,
                                    verticalAlign: "middle",
                                    borderRadius: "4px",
                                    border: "1px solid rgb(89, 89, 89)",
                                  }}
                                  src={process.env.PUBLIC_URL + "/Images/Icons/" + conduit.abilityIcon}
                                  alt={"coinduit" + i}
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
