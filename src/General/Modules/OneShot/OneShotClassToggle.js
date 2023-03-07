import * as React from "react";

import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { Grid, ToggleButtonGroup, ToggleButton, Typography, Paper } from "@mui/material";

export default function OneShotClassToggle(props) {
  const { setSelectedClass, selectedClass } = props;
  const classList = ["Evoker", "Druid", "Priest", "Shaman", "Monk", "Warrior", "DemonHunter", "DeathKnight", "Rogue", "Warlock", "Hunter", "Mage"];

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setSelectedClass(newAlignment);
    }
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Paper
        style={{
          border: "1px solid rgba(255, 255, 255, 0.24)",
          padding: "0px 8px 8px 8px",
        }}
        elevation={0}
      >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6" align="left" style={{ width: "100%" }} color="primary">
              {"Classes"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ToggleButtonGroup value={selectedClass} exclusive onChange={handleAlignment} aria-label="text alignment" fullWidth>
                  {classList.map((key) => (
                    <ToggleButton value={key} aria-label={key} style={{ padding: 8 }}>
                      {classIcons(key, { maxHeight: 36 })}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
