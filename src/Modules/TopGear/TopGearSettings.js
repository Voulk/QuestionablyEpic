import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, Grid, AccordionDetails, AccordionSummary, Typography, Divider, TextField, Tooltip } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";
import { setBounds } from "../Engine/CONSTRAINTS";

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

export default function TopGearSettingsAccordion(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  // Hymnal State
  const [hymnalValue, setHymnalValue] = useState(0);

  const updateHymnal = (value) => {
    props.editSettings("hymnalAllies", setBounds(value, 0, 4));
    setHymnalValue(setBounds(value, 0, 4));
  }
  // Free State
  const [value1, setValue1] = useState(5);
  // Free State
  const [value2, setValue2] = useState(5);
  // Free State
  const [value3, setValue3] = useState(5);
  // Free State
  const [value4, setValue4] = useState(5);
  // Free State
  const [value5, setValue5] = useState(5);

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={false} disabled={false} elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={classes.column}>
            <Typography className={classes.heading}>{t("Settings.SettingsTitle")}</Typography>
          </div>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails className={classes.details}>
          <Grid container spacing={1} direction="row" wrap="nowrap">
            {/* ------------------------- Cabalist's Hymnal Item ------------------------- */}
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip title={t("Settings.Setting0Tooltip")} placement="top-start">
                    <Typography color="primary">{t("Settings.Setting0Title")}</Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t("Settings.Setting0TextFieldLabel")}
                    id="AlliesNumber"
                    value={hymnalValue}
                    style={{ maxWidth: 70 }}
                    onChange={(e) => updateHymnal(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            {/* <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title={t("Settings.Setting1Tooltip")}
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {t("Settings.Setting1Title")}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t("Settings.Setting1TextFieldLabel")}
                    id="AlliesNumber"
                    value={value1}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue1(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title={t("Settings.Setting2Tooltip")}
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {t("Settings.Setting2Title")}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t("Settings.Setting2TextFieldLabel")}
                    id="AlliesNumber"
                    value={value2}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue2(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title={t("Settings.Setting3Tooltip")}
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {t("Settings.Setting3Title")}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t("Settings.Setting3TextFieldLabel")}
                    id="AlliesNumber"
                    value={value3}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue3(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title={t("Settings.Setting4Tooltip")}
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {t("Settings.Setting4Title")}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t("Settings.Setting4TextFieldLabel")}
                    id="AlliesNumber"
                    value={value4}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue4(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <Tooltip
                    title={t("Settings.Setting5Tooltip")}
                    placement="top-start"
                  >
                    <Typography color="primary">
                      {t("Settings.Setting5Title")}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t("Settings.Setting5TextFieldLabel")}
                    id="AlliesNumber"
                    value={value5}
                    style={{ maxWidth: 75 }}
                    onChange={(e) => setValue5(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
