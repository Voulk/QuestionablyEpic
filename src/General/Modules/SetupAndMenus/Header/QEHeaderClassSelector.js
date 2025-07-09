// TODO

import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { classColours } from "General/Engine/ClassData";
import classIcons from "General/Modules/IconFunctions/ClassIcons"; // Replace if needed

const classList = [
  "Restoration Druid",
  "Discipline Priest",
  "Holy Priest",
  "Restoration Shaman",
  "Holy Paladin",
  "Mistweaver Monk",
  "Preservation Evoker",
];

export default function HeaderClassSelect({selectedSpec, setSelectedSpec}) {

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="class-select-label">Current Spec</InputLabel>
      <Select
        labelId="class-select-label"
        value={selectedSpec}
        label="Select Class"
        onChange={(e) => setSelectedSpec(e.target.value)}
        renderValue={(value) => (
          <Box display="flex" alignItems="center" gap={1}>
            {classIcons(value, { width: 20, height: 20 })}
            <Typography>{value}</Typography>
          </Box>
        )}
      >
        {classList.map((playerClass) => (
          <MenuItem key={playerClass} value={playerClass}>
            <Box display="flex" alignItems="center" gap={1}>
              {classIcons(playerClass, { width: 20, height: 20 })}
              <Typography style={{ color: classColours(playerClass) }}>
                {playerClass}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
