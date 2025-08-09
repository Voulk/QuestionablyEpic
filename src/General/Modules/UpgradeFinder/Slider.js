import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Slider } from "@mui/material";

const useStyles = makeStyles(() => ({
  slider: {
    width: "90%",
    margin: "0px 20px 35px 20px",
    textAlign: "center",
  },
}));

export default function UpgradeFinderSlider(props) {
  const classes = useStyles();

  function valuetext(value) {
    return `${value}`;
  }

  function valueLabelFormat(value) {
    return props.marks.findIndex((mark) => mark.value === value) + 1;
  }
  return (
    <Grid item xs={12}>
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
        value={props.value}
      />
    </Grid>
  );
}
