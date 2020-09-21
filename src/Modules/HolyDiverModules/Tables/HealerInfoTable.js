import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classicons from "../Functions/IconFunctions/ClassIcons";
import talentIcons from "../Functions/IconFunctions/TalentIcons";
import { classColoursJS } from "../Functions/ClassColourFunctions";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

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
    textAlign: "center",
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
              style={{ color: classColoursJS(key.type), textAlign: "center" }}
              className={classes.heading}
            >
              {classicons(key.icon, 16)}
              {key.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card
              style={{
                width: "100%",
                display: "inline-flex",
                backgroundColor: "#353535",
              }}
              raised
            >
              <CardContent style={{ padding: 8 }}>
                <Typography className={classes.heading} color="primary">
                  {t("HDAccordianTitles.StatsHeading")}
                </Typography>
                <Divider />
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
              </CardContent>
              <div style={{ display: "block" }}>
                <CardContent style={{ padding: 8 }}>
                  <Typography className={classes.heading} color="primary">
                    {t("HDAccordianTitles.TalentHeader")}
                  </Typography>
                  <Divider />
                  {key.talents.map((talent) => talentIcons(talent.guid))}
                </CardContent>
                <CardContent style={{ padding: 8 }}>
                  <Typography className={classes.heading} color="primary">
                    {t("HDAccordianTitles.CovenantHeader")}
                  </Typography>
                  <Divider />
                </CardContent>
                <CardContent style={{ padding: 8 }}>
                  <Typography className={classes.heading} color="primary">
                    {t("HDAccordianTitles.LegendaryHeader")}
                  </Typography>
                  <Divider />
                </CardContent>
              </div>
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}