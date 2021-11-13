import React from "react";
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Slider } from "@mui/material";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  slider: {
    width: "90%",
    margin: "0px 20px 35px 20px",
    textAlign: "center",
  },
}));

const theme = createTheme(adaptV4Theme({
  overrides: {
    MuiSlider: {
      markLabel: {
        width: 70,
        whiteSpace: "wrap",
        textAlign: "center",
        color: "#fff",
      },
      markLabelActive: {
        color: "#F2BF59",
      },
    },
  },
}));

export default function UpgradeFinderSlider(props) {
  const classes = useStyles();
  // const { t, i18n } = useTranslation();

  function valuetext(value) {
    return `${value}`;
  }

  function valueLabelFormat(value) {
    return props.marks.findIndex((mark) => mark.value === value) + 1;
  }
  return (
    <Grid item xs={12}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Slider
            className={classes.slider}
            style={props.style}
            defaultValue={props.defaultValue}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-restrict"
            step={props.step}
            valueLabelDisplay="off"
            marks={props.marks}
            max={props.max}
            onChangeCommitted={props.change}
          />
        </ThemeProvider>
      </StyledEngineProvider>
    </Grid>
  );
}
