import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classicons from "../../Functions/IconFunctions/ClassIcons.js";
import talentIcons from "../../Functions/IconFunctions/TalentIcons";
import { classColoursJS } from "../../Functions/ClassColourFunctions";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { getItemIcon } from "../../../Engine/ItemUtilities";
import "./HealerCardInfo.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container spacing={1} style={{ display: "block" }}>
      {props.heals.map((key, index) => (
        <Grid container item key={index} direction="row">
          <Accordion style={{ width: "100%" }} elevation={0}>
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
                {key.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0 }}>
              <Grid
                container
                item
                justify="center"
                style={{ margin: 4 }}
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
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
                      {t("CooldownPlannerHealerCards.StatsHeading")}
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
                          {t("CooldownPlannerHealerCards.Item Level")}:{" "}
                          {stats.ilvl}
                        </Typography>
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {t("CooldownPlannerHealerCards.Crit")}: {stats.crit}
                        </Typography>
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {t("CooldownPlannerHealerCards.Haste")}: {stats.haste}
                        </Typography>
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {t("CooldownPlannerHealerCards.Mastery")}:{" "}
                          {stats.mastery}
                        </Typography>
                        <Typography
                          style={{
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            fontSize: 14,
                          }}
                        >
                          {t("CooldownPlannerHealerCards.Versatility")}:{" "}
                          {stats.versatility}
                        </Typography>
                      </div>
                    ))}
                  </Paper>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid
                  item
                  xs={9}
                  justify="flex-start"
                  alignItems="flex-start"
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
                          {t("CooldownPlannerHealerCards.TalentHeader")}
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
                          {t("CooldownPlannerHealerCards.SoulbindAbilities")}
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
                            <a data-wowhead={"spell=" + ability.guid} key={i}>
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
                          {t("CooldownPlannerHealerCards.SoulbindConduits")}
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
                            <a data-wowhead={"spell=" + conduit.guid} key={i}>
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
