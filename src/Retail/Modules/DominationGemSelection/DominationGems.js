import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Divider, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import DominationGemSelection from "./DominationGemSelection";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  details: {
    alignItems: "center",
  },
}));

export default function DominationGems(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={true} disabled={false} elevation={0}>
        {/* -------------------------------------------- Title ------------------------------------------- */}
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <Typography className={classes.heading}>{t("DominationSelection.HeaderTitle")}</Typography>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails className={classes.details}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* ------------------------------------------ Help Text -----------------------------------------  */}
              <Typography style={{ color: "limegreen", fontSize: 14 }} noWrap>
                Add the Shards you have in your bag and QE Live will automatically select your best combo!
              </Typography>
            </Grid>
            {/* ---------------------------------- Domination Gem Selectors ----------------------------------  */}
            <Grid item xs={12}>
              <DominationGemSelection player={props.player} singleUpdate={props.singleUpdate} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
