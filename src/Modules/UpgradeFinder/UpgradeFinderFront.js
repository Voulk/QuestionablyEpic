import React from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Paper, Grid, Typography, Slider, Divider } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import HelpText from "../SetupAndMenus/HelpText";

import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "55%",
  },
  slider: {
    width: "90%",
    margin: "0px 20px 50px 20px",
    textAlign: "center",
  },
  button: {
    width: 200,
    height: 75,
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiSlider: {
      markLabel: {
        width: 50,
        whiteSpace: "wrap",
        textAlign: "center",
        color: "#fff",
      },
      markLabelActive: {
        color: "#F2BF59",
      },
    },
  },
});

const raidDifficulty = ["Raid Finder", "Normal", "Heroic", "Mythic"];
const pvpCurrency = ["Honor", "Conquest"];

const marks = [
  {
    value: 0,
    label: "M0 184ilvl",
  },
  {
    value: 1,
    label: "M2 187ilvl",
  },
  {
    value: 2,
    label: "M3 190ilvl",
  },
  {
    value: 4,
    label: "M4-5 193ilvl",
  },
  {
    value: 5,
    label: "M6 197ilvl",
  },
  {
    value: 8,
    label: "M7-9 200ilvl",
  },
  {
    value: 10,
    label: "M10-11 203ilvl",
  },
  {
    value: 13,
    label: "M12-14 207ilvl",
  },
  {
    value: 14,
    label: "M15 210ilvl",
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function UpgradeFinderFront(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const helpText = t("UpgradeFinderFront.HelpText");
  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        style={{ padding: "10px 10px 5px 10px" }}
      >
        {t("UpgradeFinderFront.Header")}
      </Typography>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <HelpText text={helpText} />
        </Grid>
        <Grid item xs={12} spacing={1}>
          <Paper elevation={0} style={{ padding: 10 }}>
            <Typography
              color="primary"
              align="center"
              variant="h4"
              style={{ padding: "10px 10px 5px 10px" }}
            >
              {t("UpgradeFinderFront.RaidDifficultyHeader")}
            </Typography>

            <Grid container justify="center" spacing={1}>
              {raidDifficulty.map((key) => (
                <Grid item justify="center" xs="auto">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    {key}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={0} style={{ textAlign: "center" }}>
            <Typography
              color="primary"
              align="center"
              variant="h4"
              style={{ padding: "10px 10px 5px 10px" }}
            >
              {t("UpgradeFinderFront.MythicPlusHeader")}
            </Typography>

            <ThemeProvider theme={theme}>
              <Slider
                className={classes.slider}
                style={{ color: "#52af77" }}
                defaultValue={0}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="off"
                marks={marks}
                max={14}
              />
            </ThemeProvider>
          </Paper>
        </Grid>
        <Grid item xs={12} spacing={1}>
          <Paper elevation={0} style={{ padding: 10 }}>
            <Typography
              color="primary"
              align="center"
              variant="h4"
              style={{ padding: "10px 10px 5px 10px" }}
            >
              {t("UpgradeFinderFront.PvPHeader")}
            </Typography>

            <Grid container justify="center" spacing={1}>
              {pvpCurrency.map((key) => (
                <Grid item justify="center" xs="auto">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    {key}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
