import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, InputLabel, Accordion, Grid, AccordionDetails, AccordionSummary, FormControl, Select, Typography, Divider, TextField, Tooltip } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";
import { setBounds } from "../Engine/CONSTRAINTS";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SettingsIcon from "@material-ui/icons/Settings";

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
    // flexBasis: "33.33%",
    display: "inline-flex",
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

const menuStyle = {
  style: { marginTop: 5 },
  MenuListProps: {
    style: { paddingTop: 0, paddingBottom: 0 },
  },
  PaperProps: {
    style: {
      border: "1px solid rgba(255, 255, 255, 0.23)",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

export default function TopGearSettingsAccordion(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const playerSpec = props.player.getSpec();
  // Hymnal State
  const [hymnalValue, setHymnalValue] = useState(props.userSettings.hymnalAllies);
  const [groupValue, setgroupValue] = useState(props.userSettings.includeGroupBenefits);
  const [discTalent, setDiscTalent] = useState(109964);

  const updateHymnal = (value) => {
    props.editSettings("hymnalAllies", setBounds(value, 0, 4));
    setHymnalValue(setBounds(value, 0, 4));
  };

  const updateGroupValue = (value) => {
    props.editSettings("includeGroupBenefits", value);
    setgroupValue(value);
  };

  const options = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];
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
            <SettingsIcon style={{ marginRight: 4 }} />
            <Typography className={classes.heading}>{t("Settings.SettingsTitle")}</Typography>
          </div>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails className={classes.details}>
          <Grid container spacing={1} direction="row">
            {/* ------------------------- Cabalist's Hymnal Item ------------------------- */}
            <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <div style={{ display: "inline-flex" }}>
                    <Typography color="primary" style={{ marginRight: 4 }}>
                      {t("Settings.Setting0Title")}
                    </Typography>
                    <Tooltip title={t("Settings.Setting0Tooltip")} placement="top-start">
                      <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
                    </Tooltip>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={t("Settings.Setting0TextFieldLabel")}
                    id="AlliesNumber"
                    value={hymnalValue}
                    style={{ maxWidth: 115 }}
                    onChange={(e) => updateHymnal(e.target.value)}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Divider orientation="vertical" flexItem style={{ height: "100%" }} />
            </Grid>
            {/* ------------------------- Group Buff (Treat Buff as Personal Throughput) ------------------------- */}
            <Grid item xs={12} sm={4} md={4} lg={2} xl={2}>
              <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                <Grid item xs={12}>
                  <div style={{ display: "inline-flex" }}>
                    <Typography color="primary" style={{ marginRight: 4 }}>
                      {t("Settings.Setting1Title")}
                    </Typography>
                    <Tooltip title={t("Settings.Setting1Tooltip")} placement="top-start">
                      <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
                    </Tooltip>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" size="small">
                    <InputLabel id="groupValue">{}</InputLabel>
                    <Select labelId="groupValue" value={groupValue} onChange={(e) => updateGroupValue(e.target.value)} MenuProps={menuStyle}>
                      <MenuItem value={true}>{t("Yes")}</MenuItem>
                      <MenuItem value={false}>{t("No")}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem />
            {/* {playerSpec === "Discipline Priest" ? (
              <Grid item xs={2}>
                <Grid container spacing={1} style={{ paddingLeft: 8 }}>
                  <Grid item xs={12}>
                    <div style={{ display: "inline-flex" }}>
                      <Typography color="primary" style={{ marginRight: 4 }}>
                        {t("Settings.Setting2Title")}
                      </Typography>
                      <Tooltip title={t("Settings.Setting2Tooltip")} placement="top-start">
                        <InfoOutlinedIcon style={{ height: 15, width: 15 }} fontSize="small" />
                      </Tooltip>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" size="small">
                      <InputLabel id="slots">{}</InputLabel>
                      <Select labelId="slots" value={discTalent} onChange={(e) => setDiscTalent(e.target.value)} MenuProps={menuStyle}>
                        <MenuItem id="spiritShell" value={109964}>
                          {t("CooldownPlanner.ClassAbilities.109964")}
                        </MenuItem>
                        <MenuItem id="evangelism" value={246287}>
                          {t("CooldownPlanner.ClassAbilities.246287")}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              ""
            )} */}
            {/*
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
