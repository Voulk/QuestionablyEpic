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

const classNames = {"Retail": [
    "Restoration Druid",
    "Holy Priest",
    "Discipline Priest",
    "Restoration Shaman",
    "Holy Paladin",
    "Mistweaver Monk",
    "Preservation Evoker",
  ], 
  "Classic": [
    "Restoration Druid Classic",
    "Holy Priest Classic",
    "Discipline Priest Classic",
    //"Restoration Shaman Classic",
    "Holy Paladin Classic",
    "Mistweaver Monk Classic",
  ]};

export default function HeaderClassSelect({gameType, selectedSpec, setSelectedSpec}) {

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
            <Typography style={{ color: classColours(value) }}>{value.replace(" Classic", "")}</Typography>
          </Box>
        )}
      >
        {classNames[gameType].map((playerClass) => (
          <MenuItem key={playerClass} value={playerClass}>
            <Box display="flex" alignItems="center" gap={1}>
              {classIcons(playerClass, { width: 20, height: 20 })}
              <Typography style={{ color: classColours(playerClass) }}>
                {playerClass.replace(" Classic", "")} 
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
