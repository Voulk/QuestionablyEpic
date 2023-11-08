import * as React from "react";
import { Grid, Typography, Box, Slider, Paper } from "@mui/material";

function valuetext(value) {
  return `${value}`;
}

export default function OneShotSlider(props) {
  const { sliderValue, setSliderValue } = props;
  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const marks = [];

  // loop 30 times and push a new object into the array each time
  for (let i = 10; i < 33; i++) {
    marks.push({
      value: i,
      label: i,
    });
  }

  return (
    <Grid item xs={12}>
      <Paper
        style={{
          border: "1px solid rgba(255, 255, 255, 0.24)",
          //   backgroundColor: "#2c2c2c",

          padding: "0px 8px 8px 8px",
        }}
        elevation={0}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
              {"Dungeon Level"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Box sx={{ width: "98%", padding: "0px 8px 0px 8px" }}>
              <Slider
                value={sliderValue}
                onChange={handleChange}
                aria-label="dungeonLevel"
                defaultValue={20}
                getAriaValueText={valuetext}
                valueLabelDisplay="off"
                step={1}
                marks={marks}
                min={10}
                max={32}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
