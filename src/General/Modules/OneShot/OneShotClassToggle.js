import * as React from "react";

import classIcons from "../CooldownPlanner/Functions/IconFunctions/ClassIcons";
import { Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";

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
      <ToggleButtonGroup value={selectedClass} exclusive onChange={handleAlignment} aria-label="text alignment" fullWidth>
        {classList.map((key) => (
          <ToggleButton value={key} aria-label={key} style={{ padding: 8 }}>
            {classIcons(key, { maxHeight: 36 })}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Grid>
  );
}
