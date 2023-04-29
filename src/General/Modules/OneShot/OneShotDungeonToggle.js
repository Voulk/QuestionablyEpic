import * as React from "react";

import { Grid, ToggleButtonGroup, ToggleButton, Typography, Paper } from "@mui/material";
import DungeonHeaderIcons from "../CooldownPlanner/Functions/IconFunctions/DungeonHeaderIcons";

export default function OneShotDungeonToggle(props) {
  const { selectedDungeon, setSelectedDungeon, dungeonList } = props;

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setSelectedDungeon(newAlignment);
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
              {"Dungeons"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ToggleButtonGroup value={selectedDungeon} exclusive onChange={handleAlignment} aria-label="dungeonToggle" fullWidth>
                  {dungeonList.map((key) => (
                    <ToggleButton value={key} aria-label={key} style={{ padding: 8 }}>
                      <img src={DungeonHeaderIcons(key)} style={{ maxWidth: "100%" }} />
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
