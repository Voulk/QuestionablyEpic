import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  Grid,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
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

export default function TopGearSettingsdAccordion() {
  const classes = useStyles();
  const [value, setValue] = useState(5);

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={false} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Settings</Typography>
          </div>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails className={classes.details}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography> Allies With Hymnal </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Allies"
                    id="AlliesNumber"
                    value={value}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue(e.target.value)}
                    defaultValue={5}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
