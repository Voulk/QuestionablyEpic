import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classicons from "../CooldownTable/ClassIcons";
import talentIcons from "../CooldownTable/TalentIcons";
import { classColoursJS } from "../CooldownTable/ClassColourFunctions";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiAccordionSummary-root": {
      minHeight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  content: {
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
    "& .MuiIconButton-root": {
      padding: 0,
    },
  },
}));

export default function SimpleAccordion(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {console.log(props.heals)}
      {props.heals.map((key, index) => (
        <Accordion>
          <AccordionSummary
            className={classes.content}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={"panel" + index + "a-content"}
            id={"panel" + index + "a-header"}
          >
            <Typography
              style={{ color: classColoursJS(key.type) }}
              className={classes.heading}
            >
              {classicons(key.icon, 16)}
              {key.name}
            </Typography>
          </AccordionSummary>
          <AccordionSummary className={classes.content}>
            <Typography className={classes.heading}>
              {t("HDAccordianTitles.StatsHeading")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Paper style={{ width: "100%", display: "flex" }} elevation={3}>
              {key.stats.map((stats) => (
                <Typography style={{ textAlign: "center" }}>
                  {t("HDAccordianTitles.Item Level")} {stats.ilvl}
                </Typography>
              ))}
              {key.stats.map((stats) => (
                <Typography style={{ textAlign: "center" }}>
                  {t("HDAccordianTitles.Crit")} {stats.crit}
                </Typography>
              ))}
              {key.stats.map((stats) => (
                <Typography style={{ textAlign: "center" }}>
                  {t("HDAccordianTitles.Haste")} {stats.haste}
                </Typography>
              ))}
              {key.stats.map((stats) => (
                <Typography style={{ textAlign: "center" }}>
                  {t("HDAccordianTitles.Mastery")} {stats.mastery}
                </Typography>
              ))}
              {key.stats.map((stats) => (
                <Typography style={{ textAlign: "center" }}>
                  {t("HDAccordianTitles.Versatility")} {stats.versatility}
                </Typography>
              ))}
            </Paper>
          </AccordionDetails>

          <AccordionSummary className={classes.content}>
            <Typography className={classes.heading}>
              {t("HDAccordianTitles.TalentHeader")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper
              style={{ width: "100%", display: "flex", padding: 4 }}
              elevation={3}
            >
              {key.talents.map((talent) => talentIcons(talent.guid))}
            </Paper>
          </AccordionDetails>
          <AccordionSummary className={classes.content}>
            <Typography className={classes.heading}>
              {t("HDAccordianTitles.CovenantHeader")}
            </Typography>
          </AccordionSummary>
          <AccordionSummary className={classes.content}>
            <Typography className={classes.heading}>
              {t("HDAccordianTitles.LegendaryHeader")}
            </Typography>
          </AccordionSummary>
        </Accordion>
      ))}
    </div>
  );
}