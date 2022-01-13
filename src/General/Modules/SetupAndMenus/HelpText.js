import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Divider, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import HelpIcon from "@mui/icons-material/Help";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    borderColor: "limegreen",
    borderWidth: "1px",
    borderStyle: "Solid",
    borderRadius: "5px",
    margin: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    color: "limegreen",
    marginLeft: 4,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.secondary,
  },
  details: {
    alignItems: "center",
    padding: "8px 16px 8px 16px",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
}));

export default function HelpText(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const text = props.text;
  const blurb = props.blurb;
  const bull = <span className={classes.bullet}>•</span>;
  const expandedDefault = props.expanded

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={expandedDefault} elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div style={{ display: "inline-flex" }}>
            <HelpIcon />
            <Typography className={classes.heading} align="left" variant="h6">
              {t("HowToUse")}
            </Typography>
          </div>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails className={classes.details}>
          <Grid container>
            {
              /* ---------------------------------------------------------------------------------------------- */
              /*                                Main blurb explaining the module                                */
              /* ---------------------------------------------------------------------------------------------- */
              // Pass a text string as "helpBlurb" to this explaining the main function of the module
            }
            <Grid item xs={12}>
              <Typography className={classes.heading} style={{ color: "##fffff7", marginBottom: 0, width: "100%" }} align="left" variant="subtitle1" display="inline" paragraph>
                {blurb}
              </Typography>
            </Grid>

            {
              /* ---------------------------------------------------------------------------------------------- */
              /*                              Optional further explations / details                              */
              /* ----------------------------------------------------------------------------------------------  */
              // Pass an array of strings as "helpText" to this with any further instructions / explations the module may need
            }
            {text !== undefined
              ? text.map((key, i) => (
                  <Grid item xs={12} key={"helpText" + i}>
                    <Typography className={classes.secondaryHeading} style={{ color: "##fffff7", marginBottom: 0, width: "100%" }} align="left" variant="subtitle1" display="inline">
                      {bull} {key}
                    </Typography>
                  </Grid>
                ))
              : ""}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
