import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Divider, Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderColor: "limegreen",
    borderWidth: "1px",
    borderStyle: "Solid",
    borderRadius: "5px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
    padding: "8px 16px 8px 16px",
  },
  column: {
    // flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function HelpText(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const helpText = props.text;
  const helpBlurb = props.blurb;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={true} elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={classes.column} style={{ display: "inline-flex" }}>
            <HelpIcon />
            <Typography className={classes.heading} style={{ color: "limegreen", marginLeft: 4 }} align="left" variant="h6">
              {t("HowToUse")}
            </Typography>
          </div>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails className={classes.details}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.heading} style={{ color: "##fffff7", marginBottom: 0, width: "100%" }} align="left" variant="subtitle1" display="inline" paragraph>
                {helpBlurb}
              </Typography>
            </Grid>

            {helpText.map((key, i) => (
              <Grid item xs={12} key={"helpText" + i}>
                <Typography className={classes.secondaryHeading} style={{ color: "##fffff7", marginBottom: 0, width: "100%" }} align="left" variant="subtitle1" display="inline">
                  {bull} {key}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
