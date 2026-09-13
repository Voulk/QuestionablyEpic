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
import ClassIcon from "General/Modules/IconFunctions/ClassIcons"; // Replace if needed
import { CONSTANTS } from "General/Engine/CONSTANTS";

const classNames = {"Retail": CONSTANTS.specs, 
  "Classic": CONSTANTS.classicSpecs,
  "Forever": CONSTANTS.foreverSpecs
};

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
            <ClassIcon name={value} style={{ width: 20, height: 20 }} />
            <Typography style={{ color: classColours(value) }}>{value.replace(" Classic", "")}</Typography>
          </Box>
        )}
      >
        {classNames[gameType].map((playerClass) => (
          <MenuItem key={playerClass} value={playerClass}>
            <Box display="flex" alignItems="center" gap={1}>
              <ClassIcon name={playerClass} style={{ width: 20, height: 20 }} />
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
